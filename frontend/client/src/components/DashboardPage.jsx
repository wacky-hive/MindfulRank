import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Badge, Alert } from 'react-bootstrap';
import WebsiteManager from './WebsiteManager';
import SubscriptionManager from './SubscriptionManager';
import axiosInstance from '../api/axiosInstance';
import { isAuthenticated, isTokenExpired } from '../utils/auth';

const DashboardPage = ({ token }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    websitesCount: 0,
    generatedFiles: 0,
    storageUsed: '0 KB',
    filesByType: { 'llms.txt': 0, 'llms_full.txt': 0 },
    recentActivity: [],
    avgFilesPerWebsite: 0
  });
  const [planMessage, setPlanMessage] = useState('');
  const [subscription, setSubscription] = useState(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);

  // Additional check for token validity (redundant safety check)
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login?sessionExpired=1', { replace: true });
      return;
    }
  }, [navigate]);

  // Check subscription status on component mount
  useEffect(() => {
    if (token) {
      checkSubscriptionStatus();
    }
  }, [token]);

  const checkSubscriptionStatus = async () => {
    try {
      const response = await axiosInstance.get('/payments/subscription');
      setSubscription(response.data);
      
      // Redirect to pricing if user doesn't have active subscription
      if (!response.data.subscription_status || 
          response.data.subscription_status === 'inactive' || 
          response.data.subscription_plan === 'inactive') {
        
        navigate('/pricing', { 
          state: { 
            message: 'Please choose a subscription plan to access the platform features.',
            redirectedFromDashboard: true
          }
        });
        return;
      }
      
      // Only fetch stats if user has active subscription
      fetchStats();
    } catch (error) {
      console.error('Error checking subscription:', error);
      if (error.response?.status === 402) {
        navigate('/pricing', { 
          state: { 
            message: 'Active subscription required to access the dashboard.',
            redirectedFromDashboard: true
          }
        });
      }
    } finally {
      setSubscriptionLoading(false);
    }
  };

  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      const websitesResponse = await axiosInstance.get('/websites/');
      
      let generatedFiles = 0;
      let totalSizeKB = 0;
      let filesByType = { 'llms.txt': 0, 'llms_full.txt': 0 };
      let recentActivity = [];
      
      // Get files for each website
      for (const website of websitesResponse.data) {
        try {
          const filesResponse = await axiosInstance.get(`/llm-files/websites/${website.id}`);
          
          console.log(`Files for website ${website.id}:`, filesResponse.data);
          
          // Count only successfully generated files
          const successfulFiles = filesResponse.data.filter(file => file.status === 'generated');
          generatedFiles += successfulFiles.length;
          
          console.log(`Generated files for website ${website.id}:`, successfulFiles.length, 'out of', filesResponse.data.length);
          
          // Track files by type and recent activity
          successfulFiles.forEach(file => {
            // Count by type
            if (file.file_type === 'llms.txt') {
              filesByType['llms.txt']++;
            } else if (file.file_type === 'llms_full.txt') {
              filesByType['llms_full.txt']++;
            }
            
            // Add real file size to total (convert bytes to KB)
            if (file.file_size && file.file_size > 0) {
              totalSizeKB += file.file_size / 1024;
            }
            
            // Add to recent activity
            recentActivity.push({
              websiteName: website.name,
              fileType: file.file_type,
              createdAt: file.generated_at || file.created_at,
              websiteId: website.id
            });
          });
          
        } catch (error) {
          // No files for this website yet (404 is expected for new websites)
          console.log(`No files for website ${website.id}:`, error.response?.status);
        }
      }
      
      // Format storage size
      let storageDisplay = '0 KB';
      if (totalSizeKB > 1024) {
        storageDisplay = `${(totalSizeKB / 1024).toFixed(1)} MB`;
      } else if (totalSizeKB > 0) {
        storageDisplay = `${totalSizeKB.toFixed(1)} KB`;
      }
      
      // Sort recent activity by date (newest first) and limit to 5
      recentActivity.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      recentActivity = recentActivity.slice(0, 5);
      
      const avgFilesPerWebsite = websitesResponse.data.length > 0 
        ? (generatedFiles / websitesResponse.data.length).toFixed(1) 
        : 0;
      
      setStats({
        websitesCount: websitesResponse.data.length,
        generatedFiles: generatedFiles,
        storageUsed: storageDisplay,
        filesByType: filesByType,
        recentActivity: recentActivity,
        avgFilesPerWebsite: avgFilesPerWebsite
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchStats();
    }
  }, [token]);

  useEffect(() => {
    // Check if we came from pricing page with a plan selection message
    if (location.state?.message) {
      setPlanMessage(location.state.message);
      // Clear the message after showing it
      setTimeout(() => setPlanMessage(''), 5000);
    }
  }, [location.state]);

  return (
    <>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-700) 100%)',
        color: 'white',
        padding: '6rem 0 4rem',
        marginTop: '76px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          zIndex: 1
        }}></div>

        <Container style={{ position: 'relative', zIndex: 2 }}>
          {planMessage && (
            <Row className="justify-content-center mb-4">
              <Col lg={8}>
                <Alert 
                  variant="info" 
                  dismissible
                  onClose={() => setPlanMessage('')}
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.95)',
                    color: 'var(--primary-700)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <i className="fas fa-info-circle me-2"></i>
                  {planMessage}
                </Alert>
              </Col>
            </Row>
          )}
          
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                marginBottom: '2rem',
                backdropFilter: 'blur(10px)'
              }}>
                <i className="fas fa-gauge me-2" style={{ fontSize: '1.1rem' }}></i>
                <span className="fw-semibold">Dashboard</span>
              </div>
              
              <h1 className="display-3 fw-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
                Welcome to Your Dashboard
              </h1>
              <p className="lead fs-4 mb-4" style={{ opacity: '0.95', maxWidth: '600px', margin: '0 auto 2rem' }}>
                Manage your websites and generate AI-optimized LLM files to boost your content's discoverability
              </p>
              
              {/* Quick Stats */}
              <div className="d-flex justify-content-center gap-4 flex-wrap stats-container">
                <div style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '1rem 1.5rem',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <div className="h4 fw-bold mb-1">{stats.websitesCount}</div>
                  <div style={{ opacity: '0.9', fontSize: '0.9rem' }}>Active Websites</div>
                </div>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '1rem 1.5rem',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <div className="h4 fw-bold mb-1">{stats.generatedFiles}</div>
                  <div style={{ opacity: '0.9', fontSize: '0.9rem' }}>Generated Files</div>
                </div>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '1rem 1.5rem',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <div className="h4 fw-bold mb-1">{stats.storageUsed}</div>
                  <div style={{ opacity: '0.9', fontSize: '0.9rem' }}>Storage Used</div>
                </div>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '1rem 1.5rem',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <div className="h4 fw-bold mb-1">{stats.avgFilesPerWebsite}</div>
                  <div style={{ opacity: '0.9', fontSize: '0.9rem' }}>Avg Files/Website</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Enhanced Analytics Section */}
      <section style={{ background: 'white', padding: '3rem 0' }}>
        <Container style={{ maxWidth: '1400px' }}>
          <Row className="g-4">
            {/* File Types Breakdown */}
            <Col md={6} lg={4}>
              <div style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                border: '1px solid var(--neutral-200)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <h5 className="fw-bold mb-3 d-flex align-items-center" style={{ color: 'var(--neutral-900)' }}>
                  <i className="fas fa-chart-pie me-2" style={{ color: 'var(--primary-500)' }}></i>
                  File Types
                </h5>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-file-alt me-2" style={{ color: 'var(--primary-500)' }}></i>
                      <span>llms.txt</span>
                    </div>
                    <Badge bg="primary">{stats.filesByType['llms.txt']}</Badge>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-file-code me-2" style={{ color: 'var(--success)' }}></i>
                      <span>llms_full.txt</span>
                    </div>
                    <Badge bg="success">{stats.filesByType['llms_full.txt']}</Badge>
                  </div>
                </div>
              </div>
            </Col>

            {/* Recent Activity */}
            <Col md={6} lg={8}>
              <div style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                border: '1px solid var(--neutral-200)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <h5 className="fw-bold mb-3 d-flex align-items-center" style={{ color: 'var(--neutral-900)' }}>
                  <i className="fas fa-clock me-2" style={{ color: 'var(--primary-500)' }}></i>
                  Recent Activity
                </h5>
                {stats.recentActivity.length > 0 ? (
                  <div className="d-flex flex-column gap-2">
                    {stats.recentActivity.map((activity, index) => (
                      <div key={index} className="d-flex justify-content-between align-items-center py-2" style={{
                        borderBottom: index < stats.recentActivity.length - 1 ? '1px solid var(--neutral-100)' : 'none'
                      }}>
                        <div className="d-flex align-items-center gap-3">
                          <div style={{
                            width: '32px',
                            height: '32px',
                            background: activity.fileType === 'llms.txt' ? 'var(--primary-100)' : 'var(--success-100)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <i className={`fas ${activity.fileType === 'llms.txt' ? 'fa-file-alt' : 'fa-file-code'}`} 
                               style={{ 
                                 fontSize: '0.8rem', 
                                 color: activity.fileType === 'llms.txt' ? 'var(--primary-600)' : 'var(--success-600)' 
                               }}></i>
                          </div>
                          <div>
                            <div className="fw-semibold" style={{ fontSize: '0.9rem', color: 'var(--neutral-900)' }}>
                              {activity.fileType} generated
                            </div>
                            <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                              for {activity.websiteName}
                            </div>
                          </div>
                        </div>
                        <small className="text-muted">
                          {new Date(activity.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </small>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-3 text-muted">
                    <i className="fas fa-history fa-2x mb-2" style={{ opacity: '0.3' }}></i>
                    <p className="mb-0">No recent activity</p>
                    <small>Generate some files to see activity here</small>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Main Dashboard Content */}
      <section style={{ background: 'var(--neutral-50)', padding: '4rem 0', minHeight: '60vh' }}>
        <Container style={{ maxWidth: '1400px' }}>
          <SubscriptionManager token={token} />
          <WebsiteManager token={token} onStatsUpdate={fetchStats} />
        </Container>
      </section>
    </>
  );
};

export default DashboardPage; 