import React, { useEffect, useState } from 'react';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import RegisterForm from './RegisterForm';
import { FaBrain, FaInfoCircle } from 'react-icons/fa';

const RegisterPage = ({ token }) => {
  const location = useLocation();
  const [planMessage, setPlanMessage] = useState('');

  // Redirect to dashboard if already logged in
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  useEffect(() => {
    // Check if we came from pricing page with a plan selection
    if (location.state?.selectedPlan) {
      setPlanMessage(`Welcome! You've selected the ${location.state.selectedPlan} plan. Complete registration to get started!`);
    }
  }, [location.state]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '5rem',
      paddingBottom: '2rem'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card style={{
              borderRadius: 'var(--radius-xl)',
              border: 'none',
              boxShadow: 'var(--shadow-2xl)',
              overflow: 'hidden'
            }}>
              <Card.Header style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                textAlign: 'center',
                padding: '2rem 1.5rem 1.5rem'
              }}>
                <div className="text-center">
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                  }}>
                    <FaBrain style={{ color: 'white', fontSize: '1.5rem' }} />
                  </div>
                  <h3 className="fw-bold text-white mb-2">Join MindfulRank</h3>
                  <p className="text-white mb-0" style={{ opacity: 0.9 }}>
                    Create your account to get started
                  </p>
                </div>
              </Card.Header>
              
              <Card.Body style={{ padding: '2rem' }}>
                {planMessage && (
                  <div className="mb-4 p-3" style={{
                    background: '#e1f5fe',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #81d4fa'
                  }}>
                    <div className="d-flex align-items-start">
                      <FaInfoCircle className="react-icon icon-left" style={{ color: '#0277bd', marginTop: '2px', flexShrink: 0 }} />
                      <div style={{ fontSize: '0.9rem', color: '#01579b', lineHeight: '1.5' }}>
                        <strong>Start your SEO journey</strong><br />
                        Get access to powerful AI-driven content generation tools and analytics.
                      </div>
                    </div>
                  </div>
                )}

                <RegisterForm />
                
                <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid var(--neutral-200)' }}>
                  <p className="mb-0" style={{ color: 'var(--neutral-600)' }}>
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="text-decoration-none fw-semibold"
                      style={{ color: 'var(--primary-600)' }}
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage; 