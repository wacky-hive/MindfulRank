import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Alert, Modal, Table } from 'react-bootstrap';
import { 
  FaCrown, FaCheck, FaTimes, FaCalendarAlt, FaCreditCard,
  FaExclamationTriangle, FaInfoCircle, FaSpinner, FaArrowUp
} from 'react-icons/fa';
import axiosInstance from '../api/axiosInstance';
import Swal from 'sweetalert2';

const SubscriptionManager = ({ token }) => {
  const [subscription, setSubscription] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [reactivateLoading, setReactivateLoading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [error, setError] = useState('');
  const [syncLoading, setSyncLoading] = useState(false);

  useEffect(() => {
    if (token) {
      fetchSubscription();
      fetchPlans();
    }
  }, [token]);

  const fetchSubscription = async () => {
    try {
      const response = await axiosInstance.get('/payments/subscription');
      setSubscription(response.data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
      setError('Failed to load subscription information.');
    } finally {
      setLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await axiosInstance.get('/payments/plans');
      console.log('Fetched plans from backend:', response.data);
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const handleUpgrade = async (planId) => {
    try {
      const plan = plans.find(p => p.id === planId);
      console.log('Selected plan for upgrade:', plan);
      console.log('Available plans:', plans);
      if (!plan) return;

      const requestData = {
        price_id: plan.stripe_price_id,
        success_url: `${window.location.origin}/payment-success`,
        cancel_url: `${window.location.origin}/payment-cancel`
      };
      
      console.log('Creating checkout session with data:', requestData);
      const response = await axiosInstance.post('/payments/create-checkout-session', requestData);

      // Redirect to Stripe Checkout
      window.location.href = response.data.checkout_url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      let errorMessage = 'Failed to initiate payment. Please try again.';
      
      if (error.response?.status === 401) {
        errorMessage = 'Your session has expired. Please log out and log back in to continue.';
      } else if (error.response?.status === 422) {
        // Handle validation errors
        const validationDetails = error.response?.data?.detail;
        if (Array.isArray(validationDetails)) {
          errorMessage = `Validation error: ${validationDetails.map(v => v.msg).join(', ')}`;
        } else if (typeof validationDetails === 'string') {
          errorMessage = validationDetails;
        } else {
          errorMessage = 'Invalid request data. Please try again.';
        }
      } else if (error.response?.status === 503) {
        errorMessage = error.response.data.detail || 'Payment system is currently being set up. Please contact support.';
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }
      
      setError(errorMessage);
    }
  };

  const handleCancelSubscription = async () => {
    const result = await Swal.fire({
      title: 'Cancel Subscription?',
      text: 'Your subscription will remain active until the end of your current billing period.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, cancel it',
      cancelButtonText: 'Keep subscription'
    });

    if (!result.isConfirmed) return;

    setCancelLoading(true);
    try {
      await axiosInstance.post('/payments/cancel-subscription');
      setError('');
      
      await Swal.fire({
        title: 'Subscription Canceled!',
        text: 'Your subscription has been canceled and will end at the current billing period.',
        icon: 'success',
        confirmButtonColor: '#0d6efd'
      });
      
      fetchSubscription(); // Refresh subscription data
    } catch (error) {
      console.error('Error canceling subscription:', error);
      setError('Failed to cancel subscription. Please try again.');
    } finally {
      setCancelLoading(false);
    }
  };

  const handleReactivateSubscription = async () => {
    setReactivateLoading(true);
    try {
      await axiosInstance.post('/payments/reactivate-subscription');
      setError('');
      
      await Swal.fire({
        title: 'Subscription Reactivated!',
        text: 'Your subscription has been successfully reactivated.',
        icon: 'success',
        confirmButtonColor: '#198754'
      });
      
      fetchSubscription(); // Refresh subscription data
    } catch (error) {
      console.error('Error reactivating subscription:', error);
      setError('Failed to reactivate subscription. Please try again.');
    } finally {
      setReactivateLoading(false);
    }
  };

  const handleSyncSubscription = async () => {
    setSyncLoading(true);
    try {
      const response = await axiosInstance.post('/payments/manual-update-subscription');
      setError('');
      
      await Swal.fire({
        title: 'Subscription Synced!',
        text: 'Your subscription status has been successfully updated.',
        icon: 'success',
        confirmButtonColor: '#0dcaf0'
      });
      
      fetchSubscription(); // Refresh subscription data
      console.log('Sync response:', response.data);
    } catch (error) {
      console.error('Error syncing subscription:', error);
      let errorMessage = 'Failed to sync subscription. Please try again.';
      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }
      setError(errorMessage);
    } finally {
      setSyncLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': { bg: 'success', text: 'Active', icon: FaCheck },
      'inactive': { bg: 'danger', text: 'Subscription Required', icon: FaExclamationTriangle },
      'past_due': { bg: 'warning', text: 'Past Due', icon: FaExclamationTriangle },
      'canceled': { bg: 'danger', text: 'Canceled', icon: FaTimes }
    };
    
    const config = statusConfig[status] || { bg: 'secondary', text: status, icon: FaInfoCircle };
    const IconComponent = config.icon;
    
    return (
      <Badge bg={config.bg} className="d-flex align-items-center gap-1">
        <IconComponent style={{ fontSize: '0.8rem' }} />
        {config.text}
      </Badge>
    );
  };

  const getPlanName = (planId) => {
    if (planId === 'inactive') return 'No Active Plan';
    const plan = plans.find(p => p.id === planId);
    return plan ? plan.name : planId;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <Card className="card-modern">
        <Card.Body className="text-center py-5">
          <FaSpinner className="fa-spin fa-2x text-muted mb-3" />
          <p className="text-muted">Loading subscription information...</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Card className="card-modern mb-4">
        <Card.Header style={{ 
          background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
          color: 'white'
        }}>
          <div className="d-flex align-items-center">
            <FaCrown className="react-icon icon-left" />
            <h4 className="mb-0 fw-bold">Subscription Management</h4>
          </div>
        </Card.Header>
        
        <Card.Body style={{ padding: '2rem' }}>
          {error && (
            <Alert variant="danger" className="mb-4">
              <FaExclamationTriangle className="me-2" />
              {error}
            </Alert>
          )}

          <div className="row g-4">
            <div className="col-md-6">
              <div className="border rounded p-3" style={{ background: 'var(--neutral-50)' }}>
                <h6 className="fw-bold mb-3" style={{ color: 'var(--neutral-800)' }}>
                  Current Plan
                  <small className="text-muted fw-normal ms-2">(This is your active subscription)</small>
                </h6>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="fw-semibold">{getPlanName(subscription?.subscription_plan)}</span>
                  {getStatusBadge(subscription?.subscription_status)}
                </div>
                {subscription?.subscription_status === 'active' && subscription?.current_period_end && (
                  <div className="d-flex align-items-center text-muted">
                    <FaCalendarAlt className="me-2" style={{ fontSize: '0.8rem' }} />
                    <small>Automatically renews on {formatDate(subscription.current_period_end)}</small>
                  </div>
                )}
                
                {subscription?.subscription_status === 'active' && (
                  <div className="mt-2 p-2 rounded" style={{ background: '#f0fdf4', border: '1px solid #16a34a' }}>
                    <small style={{ color: '#15803d' }}>
                      <FaCheck className="me-1" />
                      <strong>All good!</strong> Your subscription is active and you have full access to all platform features.
                    </small>
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="border rounded p-3" style={{ background: 'var(--neutral-50)' }}>
                <h6 className="fw-bold mb-3" style={{ color: 'var(--neutral-800)' }}>Quick Actions</h6>
                
                {subscription?.subscription_status === 'inactive' || subscription?.subscription_plan === 'inactive' ? (
                  <>
                    <Alert variant="warning" className="mb-3">
                      <FaExclamationTriangle className="me-2" />
                      <strong>Subscription Required:</strong> You need an active subscription to use the platform features.
                    </Alert>
                    
                    <Button
                      onClick={() => setShowUpgradeModal(true)}
                      className="fw-semibold w-100 mb-2"
                      style={{ 
                        background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
                        border: 'none',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      <FaCrown className="react-icon icon-left" />
                      Choose Your Plan
                    </Button>
                    
                    <div className="mt-3 p-4 rounded" style={{ 
                      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', 
                      border: '2px solid #0ea5e9',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '-1px',
                        left: '1rem',
                        background: '#0ea5e9',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0 0 8px 8px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                      }}>
                        💡 HELP
                      </div>
                      
                      <div className="mt-2">
                        <h6 className="fw-bold mb-2" style={{ color: '#0369a1' }}>
                          <FaInfoCircle className="me-2" />
                          What does "Refresh Subscription Status" do?
                        </h6>
                        
                        <div className="mb-3" style={{ fontSize: '0.9rem', color: '#0369a1' }}>
                          <div className="mb-2">
                            <strong>🔄 This button checks with our payment system</strong> to see if your subscription is now active.
                          </div>
                          
                          <div className="mb-2">
                            <strong>⏰ Use it when:</strong>
                            <ul className="mb-0 mt-1" style={{ paddingLeft: '1.2rem' }}>
                              <li>You just completed a payment</li>
                              <li>Your subscription should be active but shows as inactive</li>
                              <li>You want to double-check your current plan status</li>
                            </ul>
                          </div>
                          
                          <div className="mb-2">
                            <strong>✨ What happens:</strong> We contact Stripe (our payment processor) to get your latest subscription information and update your account.
                          </div>
                        </div>
                        
                        <Button
                          onClick={handleSyncSubscription}
                          variant="primary"
                          className="fw-semibold w-100"
                          disabled={syncLoading}
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                            border: 'none',
                            padding: '0.75rem'
                          }}
                        >
                          {syncLoading ? (
                            <>
                              <FaSpinner className="fa-spin react-icon icon-left" />
                              Checking with payment system...
                            </>
                          ) : (
                            <>
                              <FaInfoCircle className="react-icon icon-left" />
                              Refresh My Subscription Status
                            </>
                          )}
                        </Button>
                        
                        <small className="text-muted d-block mt-2 text-center">
                          💳 This is safe to use - it only reads your payment information
                        </small>
                      </div>
                    </div>
                  </>
                ) : subscription?.subscription_status === 'active' ? (
                  <div className="d-grid gap-2">
                    <div>
                      <Button
                        onClick={() => setShowUpgradeModal(true)}
                        variant="outline-primary"
                        className="fw-semibold w-100"
                        style={{ borderRadius: 'var(--radius-md)' }}
                      >
                        <FaArrowUp className="react-icon icon-left" />
                        Upgrade or Downgrade Plan
                      </Button>
                      <small className="text-muted d-block mt-1 text-center">
                        💡 Switch to a different plan that better fits your needs
                      </small>
                    </div>
                    
                    <div>
                      <Button
                        onClick={handleCancelSubscription}
                        variant="outline-danger"
                        className="fw-semibold w-100"
                        disabled={cancelLoading}
                        style={{ borderRadius: 'var(--radius-md)' }}
                      >
                        {cancelLoading ? (
                          <FaSpinner className="fa-spin react-icon icon-left" />
                        ) : (
                          <FaTimes className="react-icon icon-left" />
                        )}
                        Cancel Subscription
                      </Button>
                      <small className="text-muted d-block mt-1 text-center">
                        ⚠️ You'll keep access until your current billing period ends
                      </small>
                    </div>
                  </div>
                ) : subscription?.subscription_status === 'canceled' && (
                  <div>
                    <Button
                      onClick={handleReactivateSubscription}
                      variant="success"
                      className="fw-semibold w-100"
                      disabled={reactivateLoading}
                      style={{ borderRadius: 'var(--radius-md)' }}
                    >
                      {reactivateLoading ? (
                        <FaSpinner className="fa-spin react-icon icon-left" />
                      ) : (
                        <FaCheck className="react-icon icon-left" />
                      )}
                      Reactivate Subscription
                    </Button>
                    <small className="text-muted d-block mt-1 text-center">
                      ✅ Resume your subscription and regain full access to all features
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Upgrade Modal */}
      <Modal show={showUpgradeModal} onHide={() => setShowUpgradeModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <FaCrown className="react-icon icon-left text-warning" />
            Choose Your Plan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row g-3">
            {plans.map((plan) => (
              <div key={plan.id} className="col-md-4">
                <Card className={`h-100 ${subscription?.subscription_plan === plan.id ? 'border-primary' : ''}`}>
                  <Card.Body className="text-center p-4">
                    <h5 className="fw-bold mb-3">{plan.name}</h5>
                    <div className="mb-3">
                      <span className="h3 fw-bold">${(plan.price / 100).toFixed(0)}</span>
                      <small className="text-muted">/{plan.interval}</small>
                    </div>
                    
                    <ul className="list-unstyled text-start mb-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="mb-2">
                          <FaCheck className="text-success me-2" style={{ fontSize: '0.8rem' }} />
                          <small>{feature}</small>
                        </li>
                      ))}
                    </ul>
                    
                    {subscription?.subscription_plan === plan.id ? (
                      <Badge bg="primary" className="w-100 py-2">Current Plan</Badge>
                    ) : (
                      <Button
                        onClick={() => handleUpgrade(plan.id)}
                        className="w-100 fw-semibold"
                        style={{ 
                          background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
                          border: 'none',
                          borderRadius: 'var(--radius-md)'
                        }}
                      >
                        <FaCreditCard className="react-icon icon-left" />
                        Select Plan
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SubscriptionManager; 