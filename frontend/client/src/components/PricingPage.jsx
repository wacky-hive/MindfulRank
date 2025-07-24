import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Table, Accordion, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaRocket, FaShieldAlt, FaCheck, FaTimes, FaStar, FaCheckCircle,
  FaBrain, FaChartLine, FaDollarSign, FaClock, FaBullseye,
  FaSearch, FaDatabase, FaUsers, FaBullseye as FaTarget, FaGift, FaCrown,
  FaInfinity, FaMagic, FaBolt, FaGem, FaLightbulb, FaFire, FaCreditCard
} from 'react-icons/fa';
import axiosInstance from '../api/axiosInstance';
import Swal from 'sweetalert2';

const PricingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingPlan, setProcessingPlan] = useState(null);
  const [redirectMessage, setRedirectMessage] = useState('');

  useEffect(() => {
    fetchPlans();
    
    // Check if user was redirected from dashboard
    if (location.state?.redirectedFromDashboard) {
      setRedirectMessage(location.state.message || 'Please choose a subscription plan to continue.');
    }
  }, [location.state]);

  const fetchPlans = async () => {
    try {
      const response = await axiosInstance.get('/payments/plans');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setError('Failed to load pricing plans. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlanSelect = async (plan) => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      // User not logged in, redirect to register with plan info
      navigate('/register', { 
        state: { 
          selectedPlan: plan.name,
          message: `Sign up to get started with the ${plan.name} plan!`
        }
      });
      return;
    }

    // User is logged in, create checkout session
    setProcessingPlan(plan.id);
    try {
      const response = await axiosInstance.post('/payments/create-checkout-session', {
        price_id: plan.stripe_price_id,
        success_url: `${window.location.origin}/payment-success`,
        cancel_url: `${window.location.origin}/payment-cancel`
      });

      // Redirect to Stripe Checkout
      window.location.href = response.data.checkout_url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      let errorMessage = 'Failed to initiate payment. Please try again.';
      
      if (error.response?.status === 503) {
        errorMessage = error.response.data.detail || 'Payment system is currently being set up. Please contact support.';
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }
      
      setError(errorMessage);
      setProcessingPlan(null);
    }
  };

  const handleContactSales = () => {
    Swal.fire({
      title: 'Contact Our Sales Team',
      html: `
        <div style="text-align: left; margin: 20px 0;">
          <p style="margin-bottom: 15px;"><strong>📧 Email:</strong> sales@llmseo.com</p>
          <p style="margin-bottom: 15px;"><strong>📞 Phone:</strong> +1 (555) 123-4567</p>
          <p style="margin-bottom: 0;"><strong>⏱️ Response Time:</strong> Within 24 hours</p>
        </div>
      `,
      icon: 'info',
      confirmButtonColor: '#0d6efd',
      confirmButtonText: 'Got it!',
      showCloseButton: true
    });
  };

  return (
    <>
      {/* Benefits-Focused Hero */}
      <section style={{ 
        background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-700) 100%)', 
        color: 'white',
        padding: '5rem 0 3rem' 
      }}>
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={10}>
              {/* Value Proposition Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.15)',
                padding: '0.75rem 2rem',
                borderRadius: '50px',
                marginBottom: '2rem',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <FaRocket className="react-icon icon-left" style={{ color: '#ffd700' }} />
                <span className="fw-bold">🚀 Transform Your Business with AI Optimization</span>
              </div>

              <h1 className="display-2 fw-bold mb-4" style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}>
                Dominate AI Search Results for
                <span className="d-block" style={{ fontSize: '4rem', color: '#ffd700' }}>€19.99/year</span>
              </h1>
              
              <h2 className="display-6 fw-bold mb-4" style={{ opacity: '0.95' }}>
                Professional AI Optimization for <span style={{ color: '#ffd700' }}>Every Business</span>
              </h2>
              
              <p className="fs-3 mb-4" style={{ opacity: '0.9', maxWidth: '800px', margin: '0 auto 2rem' }}>
                Join <strong>5,000+ smart businesses</strong> getting discovered by AI models and future-proofing their online presence. 
                <span style={{ color: '#ffd700' }}> Start seeing results in 24 hours.</span>
              </p>

              {/* Benefits Preview */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '2rem',
                borderRadius: '20px',
                marginBottom: '2rem',
                backdropFilter: 'blur(10px)'
              }}>
                <Row>
                  <Col md={4}>
                    <div className="h4 fw-bold mb-1" style={{ color: '#90EE90' }}>Traffic Boost</div>
                    <div className="h2">+300%</div>
                    <small style={{ opacity: '0.9' }}>Average increase</small>
                  </Col>
                  <Col md={4}>
                    <div className="h4 fw-bold mb-1" style={{ color: '#ffd700' }}>Setup Time</div>
                    <div className="h2">24 Hours</div>
                    <small style={{ opacity: '0.9' }}>Start seeing results</small>
                  </Col>
                  <Col md={4}>
                    <div className="h4 fw-bold mb-1" style={{ color: '#87CEEB' }}>ROI</div>
                    <div className="h2">30x+</div>
                    <small style={{ opacity: '0.9' }}>Return on investment</small>
                  </Col>
                </Row>
              </div>

              <div style={{ fontSize: '1.1rem', opacity: '0.9' }}>
                <FaShieldAlt className="react-icon icon-left" style={{ color: '#ffd700' }} />
                No refunds - Please be sure you need it • Start in minutes • Enterprise support included
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why This Is Amazing Value */}
      <section style={{ background: '#fffbeb', padding: '4rem 0' }}>
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h2 className="display-4 fw-bold mb-4" style={{ color: 'var(--neutral-900)' }}>
                What You Get for €19.99/Year
              </h2>
              <p className="fs-4 text-muted mb-5">
                Professional AI optimization that transforms your online presence
              </p>
            </Col>
          </Row>

          {/* Benefits Grid */}
          <Row className="g-4 mb-5">
            <Col lg={4} md={6}>
              <div style={{ 
                background: 'white', 
                borderRadius: '20px', 
                padding: '2rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                height: '100%',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
                }}>
                  <FaBrain className="react-icon" style={{ fontSize: '2rem', color: 'white' }} />
                </div>
                <h4 className="fw-bold mb-3" style={{ color: 'var(--neutral-900)' }}>AI-First Technology</h4>
                <p className="text-muted">Built specifically for AI search engines and language models. Future-proof your content.</p>
              </div>
            </Col>

            <Col lg={4} md={6}>
              <div style={{ 
                background: 'white', 
                borderRadius: '20px', 
                padding: '2rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                height: '100%',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
                }}>
                  <FaBolt className="react-icon" style={{ fontSize: '2rem', color: 'white' }} />
                </div>
                <h4 className="fw-bold mb-3" style={{ color: 'var(--neutral-900)' }}>Lightning Fast Setup</h4>
                <p className="text-muted">Get results in 24 hours, not months. Automated optimization that works immediately.</p>
              </div>
            </Col>

            <Col lg={4} md={6}>
              <div style={{ 
                background: 'white', 
                borderRadius: '20px', 
                padding: '2rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                height: '100%',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)'
                }}>
                  <FaInfinity className="react-icon" style={{ fontSize: '2rem', color: 'white' }} />
                </div>
                <h4 className="fw-bold mb-3" style={{ color: 'var(--neutral-900)' }}>Unlimited Everything</h4>
                <p className="text-muted">No limits on websites, optimization runs, or support requests. Scale without worry.</p>
              </div>
            </Col>

            <Col lg={4} md={6}>
              <div style={{ 
                background: 'white', 
                borderRadius: '20px', 
                padding: '2rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                height: '100%',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)'
                }}>
                  <FaChartLine className="react-icon" style={{ fontSize: '2rem', color: 'white' }} />
                </div>
                <h4 className="fw-bold mb-3" style={{ color: 'var(--neutral-900)' }}>Real-Time Analytics</h4>
                <p className="text-muted">Track your progress with detailed analytics and performance insights.</p>
              </div>
            </Col>

            <Col lg={4} md={6}>
              <div style={{ 
                background: 'white', 
                borderRadius: '20px', 
                padding: '2rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                height: '100%',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)'
                }}>
                  <FaUsers className="react-icon" style={{ fontSize: '2rem', color: 'white' }} />
                </div>
                <h4 className="fw-bold mb-3" style={{ color: 'var(--neutral-900)' }}>24/7 Expert Support</h4>
                <p className="text-muted">Get help whenever you need it from our AI optimization experts.</p>
              </div>
            </Col>

            <Col lg={4} md={6}>
              <div style={{ 
                background: 'white', 
                borderRadius: '20px', 
                padding: '2rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                height: '100%',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: '0 8px 25px rgba(6, 182, 212, 0.3)'
                }}>
                  <FaMagic className="react-icon" style={{ fontSize: '2rem', color: 'white' }} />
                </div>
                <h4 className="fw-bold mb-3" style={{ color: 'var(--neutral-900)' }}>Continuous Updates</h4>
                <p className="text-muted">Always stay ahead with automatic updates and new AI optimization features.</p>
              </div>
            </Col>
          </Row>

          <div className="text-center">
            <div style={{ 
              background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
              color: 'white',
              padding: '2rem',
              borderRadius: '20px',
              display: 'inline-block',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
            }}>
              <h4 className="fw-bold mb-2">💡 Smart Investment</h4>
              <p className="mb-0" style={{ opacity: '0.9' }}>
                All of this professional-grade technology for less than €1.67 per month
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Dynamic Pricing Plans */}
      <section style={{ background: 'white', padding: '4rem 0' }}>
        <Container style={{ maxWidth: '1400px' }}>
          {redirectMessage && (
            <Row className="justify-content-center mb-4">
              <Col lg={10}>
                <Alert 
                  variant="info" 
                  className="text-center"
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    border: 'none',
                    background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: '500'
                  }}
                >
                  <i className="fas fa-info-circle me-2"></i>
                  {redirectMessage}
                </Alert>
              </Col>
            </Row>
          )}
          
          <Row className="text-center mb-5">
            <Col>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                marginBottom: '2rem',
                backdropFilter: 'blur(10px)'
              }}>
                <FaCrown className="me-2" style={{ fontSize: '1.1rem' }} />
                <span className="fw-semibold">Choose Your Plan</span>
              </div>
              
              <h1 className="display-2 fw-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
                Start Your AI Content Journey
              </h1>
              <p className="lead fs-3 mb-5" style={{ opacity: '0.95', maxWidth: '700px', margin: '0 auto' }}>
                Choose the perfect plan for your content optimization needs. <br/>
                <strong>All plans include full platform access</strong> - no free trial limitations.
              </p>
            </Col>
          </Row>

          {error && (
            <Row className="justify-content-center mb-4">
              <Col lg={8}>
                <Alert variant="danger">
                  <strong>Error:</strong> {error}
                </Alert>
              </Col>
            </Row>
          )}

          {loading ? (
            <Row className="justify-content-center">
              <Col lg={8} className="text-center">
                <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
                <p className="mt-3 text-muted">Loading pricing plans...</p>
              </Col>
            </Row>
          ) : (
            <Row className="g-4 justify-content-center">
              {plans.map((plan) => (
                <Col lg={4} md={6} key={plan.id}>
                  <Card style={{
                    borderRadius: '20px',
                    border: plan.id === 'professional' ? '3px solid var(--primary-500)' : '1px solid var(--neutral-200)',
                    background: 'white',
                    boxShadow: plan.id === 'professional' ? '0 20px 60px rgba(102, 126, 234, 0.2)' : '0 10px 30px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    position: 'relative',
                    height: '100%'
                  }}>
                    {plan.id === 'professional' && (
                      <div style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                        color: '#333',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        zIndex: 2
                      }}>
                        ⭐ POPULAR
                      </div>
                    )}
                    
                    <Card.Body style={{ padding: '2.5rem 2rem', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        background: plan.id === 'starter' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                                   : plan.id === 'professional' ? 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)'
                                   : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
                      }}>
                        {plan.id === 'starter' && <FaRocket style={{ fontSize: '2rem', color: 'white' }} />}
                        {plan.id === 'professional' && <FaCrown style={{ fontSize: '2rem', color: 'white' }} />}
                        {plan.id === 'enterprise' && <FaGem style={{ fontSize: '2rem', color: 'white' }} />}
                      </div>

                      <h3 className="fw-bold mb-3" style={{ color: 'var(--neutral-900)' }}>
                        {plan.name}
                      </h3>
                      
                      <div className="mb-4">
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.25rem' }}>
                          <span className="display-5 fw-bold" style={{ color: 'var(--neutral-900)' }}>
                            ${(plan.price / 100).toFixed(0)}
                          </span>
                        </div>
                        <div className="text-muted">per {plan.interval}</div>
                      </div>

                      <ul className="list-unstyled text-start mb-4" style={{ flex: 1 }}>
                        {plan.features.map((feature, index) => (
                          <li key={index} className="mb-3 d-flex align-items-start">
                            <FaCheck className="text-success me-3" style={{ fontSize: '1rem', marginTop: '0.25rem' }} />
                            <span style={{ fontSize: '0.95rem' }}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button
                        onClick={() => handlePlanSelect(plan)}
                        disabled={processingPlan === plan.id}
                        style={{ 
                          background: plan.id === 'professional' 
                            ? 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)'
                            : 'linear-gradient(135deg, var(--neutral-700) 0%, var(--neutral-800) 100%)',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '0.75rem 1.5rem',
                          fontSize: '1rem',
                          fontWeight: '600',
                          width: '100%'
                        }}
                      >
                        {processingPlan === plan.id ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <FaCreditCard className="react-icon icon-left" />
                            Choose {plan.name}
                          </>
                        )}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* FAQ Section */}
      <section style={{ background: 'var(--neutral-50)', padding: '5rem 0' }}>
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="display-5 fw-bold mb-4" style={{ color: 'var(--neutral-900)' }}>
                Frequently Asked Questions
              </h2>
              <p className="fs-5 text-muted">Everything you need to know about our platform</p>
            </Col>
          </Row>
          
          <Row className="g-4">
            <Col md={6}>
              <Card className="h-100 card-modern">
                <Card.Body style={{ padding: '2rem' }}>
                  <div className="d-flex align-items-start mb-3">
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'var(--primary-100)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem',
                      flexShrink: 0
                    }}>
                      <FaLightbulb className="react-icon" style={{ color: 'var(--primary-600)' }} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-3" style={{ color: 'var(--neutral-900)' }}>
                        What is AI optimization?
                      </h5>
                      <p className="text-muted mb-0" style={{ lineHeight: '1.7' }}>
                        AI optimization is the process of using artificial intelligence to improve your website's visibility and performance in search engines, particularly for AI-powered search results.
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6}>
              <Card className="h-100 card-modern">
                <Card.Body style={{ padding: '2rem' }}>
                  <div className="d-flex align-items-start mb-3">
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'var(--primary-100)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem',
                      flexShrink: 0
                    }}>
                      <FaDatabase className="react-icon" style={{ color: 'var(--primary-600)' }} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-3" style={{ color: 'var(--neutral-900)' }}>
                        How does MindfulRank work?
                      </h5>
                      <p className="text-muted mb-0" style={{ lineHeight: '1.7' }}>
                        MindfulRank uses advanced AI models to analyze your website's content, structure, and technical aspects. It then generates optimized llms.txt files that help search engines better understand and index your content for AI search.
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6}>
              <Card className="h-100 card-modern">
                <Card.Body style={{ padding: '2rem' }}>
                  <div className="d-flex align-items-start mb-3">
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'var(--primary-100)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem',
                      flexShrink: 0
                    }}>
                      <FaUsers className="react-icon" style={{ color: 'var(--primary-600)' }} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-3" style={{ color: 'var(--neutral-900)' }}>
                        Who is MindfulRank for?
                      </h5>
                      <p className="text-muted mb-0" style={{ lineHeight: '1.7' }}>
                        MindfulRank is perfect for website owners, marketers, and businesses of all sizes who want to leverage AI for SEO. Whether you have one website or hundreds, we provide scalable solutions.
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6}>
              <Card className="h-100 card-modern">
                <Card.Body style={{ padding: '2rem' }}>
                  <div className="d-flex align-items-start mb-3">
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'var(--primary-100)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem',
                      flexShrink: 0
                    }}>
                      <FaBullseye className="react-icon" style={{ color: 'var(--primary-600)' }} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-3" style={{ color: 'var(--neutral-900)' }}>
                        What are the benefits of AI optimization?
                      </h5>
                      <p className="text-muted mb-0" style={{ lineHeight: '1.7' }}>
                        Benefits include increased traffic, higher search engine rankings, better user engagement, and improved conversion rates. AI optimization is particularly valuable for complex, niche, or rapidly evolving industries.
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section style={{ background: 'white', padding: '5rem 0' }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div style={{
                background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-700) 100%)',
                borderRadius: '24px',
                padding: '3rem',
                textAlign: 'center',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                  zIndex: 1
                }}></div>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h2 className="h3 fw-bold mb-3">Ready to optimize your content for AI?</h2>
                  <p className="fs-5 mb-4" style={{ opacity: '0.95' }}>
                    Join hundreds of websites already using our platform to improve their AI discoverability.
                  </p>
                  <Button 
                    variant="light" 
                    size="lg" 
                    className="fw-semibold"
                    onClick={() => handlePlanSelect('Complete')}
                    style={{ 
                      borderRadius: '12px',
                      padding: '0.75rem 2rem',
                      color: 'var(--primary-600)'
                    }}
                  >
                    <FaRocket className="react-icon icon-left" />
                    Get Started Today
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Final Compelling CTA */}
      <section style={{ 
        background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 100%)', 
        color: 'white',
        padding: '5rem 0' 
      }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '0.75rem 2rem',
                borderRadius: '50px',
                marginBottom: '2rem',
                display: 'inline-block',
                backdropFilter: 'blur(10px)'
              }}>
                <FaRocket className="react-icon icon-left" style={{ color: '#ffd700' }} />
                <span className="fw-bold">🚀 Transform Your Business with AI Optimization</span>
              </div>

              <h2 className="display-3 fw-bold mb-4" style={{ lineHeight: '1.1' }}>
                Ready to Dominate AI Search?
              </h2>
              
              <p className="fs-3 mb-4" style={{ opacity: '0.9' }}>
                Join thousands of smart businesses getting discovered by AI models and <span style={{ color: '#ffd700' }}>future-proofing their success</span>
              </p>

              {/* Value Recap */}
              <Row className="mb-5">
                <Col md={4}>
                  <div style={{ 
                    background: 'rgba(255, 255, 255, 0.1)', 
                    padding: '1.5rem', 
                    borderRadius: '15px',
                    margin: '0 0 1rem'
                  }}>
                                            <div className="h3 fw-bold" style={{ color: '#ffd700' }}>€1.67</div>
                    <div className="h6">Per Month Cost</div>
                  </div>
                </Col>
                <Col md={4}>
                  <div style={{ 
                    background: 'rgba(255, 255, 255, 0.1)', 
                    padding: '1.5rem', 
                    borderRadius: '15px',
                    margin: '0 0 1rem'
                  }}>
                    <div className="h3 fw-bold" style={{ color: '#ffd700' }}>24hrs</div>
                    <div className="h6">To See Results</div>
                  </div>
                </Col>
                <Col md={4}>
                  <div style={{ 
                    background: 'rgba(255, 255, 255, 0.1)', 
                    padding: '1.5rem', 
                    borderRadius: '15px',
                    margin: '0 0 1rem'
                  }}>
                    <div className="h3 fw-bold" style={{ color: '#ffd700' }}>∞</div>
                    <div className="h6">Unlimited Websites</div>
                  </div>
                </Col>
              </Row>

              <div className="mb-4">
                <Button 
                  size="lg" 
                  className="fw-bold me-3 mb-3"
                  onClick={() => handlePlanSelect('Complete')}
                  style={{ 
                    background: '#ffd700',
                    border: 'none',
                    color: '#333',
                    padding: '1rem 3rem',
                    borderRadius: '50px',
                    fontSize: '1.2rem',
                    boxShadow: '0 6px 20px rgba(255, 215, 0, 0.4)',
                    transform: 'scale(1.05)'
                  }}
                >
                  🚀 Get Started Now - €19.99/year
                </Button>
              </div>

              <div style={{ opacity: '0.9', fontSize: '1.1rem' }}>
                <FaShieldAlt className="react-icon icon-left" style={{ color: '#ffd700' }} />
                No refunds - Please be sure you need it • No setup fees • Cancel anytime
              </div>

              <div style={{ 
                marginTop: '2rem',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                fontSize: '0.9rem',
                opacity: '0.8'
              }}>
                💡 <strong>Limited Time:</strong> Lock in the €19.99/year rate and get enterprise-level AI optimization at an unbeatable price!
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default PricingPage; 
