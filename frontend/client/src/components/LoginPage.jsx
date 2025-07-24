import React from 'react';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import LoginForm from './LoginForm';
import { FaBrain, FaClock } from 'react-icons/fa';

const LoginPage = ({ token, onLoginSuccess }) => {
  const location = useLocation();
  const sessionExpired = new URLSearchParams(location.search).get("sessionExpired");
  
  // Redirect to dashboard if already logged in
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '5rem'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23667eea" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        zIndex: 1
      }}></div>

      <Container style={{ position: 'relative', zIndex: 2 }}>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            {sessionExpired && (
              <Alert 
                variant="warning" 
                className="mb-4"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  border: 'none',
                  background: '#fff3cd',
                  color: '#856404',
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 12px rgba(133, 100, 4, 0.1)'
                }}
              >
                <FaClock className="me-2" />
                <strong>Session Expired:</strong> Your session has expired for security reasons. Please log in again.
              </Alert>
            )}
            
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
                  <h3 className="fw-bold text-white mb-2">Welcome Back</h3>
                  <p className="text-white mb-0" style={{ opacity: 0.9 }}>
                    Sign in to your MindfulRank account
                  </p>
                </div>
              </Card.Header>
              
              <Card.Body style={{ padding: '2rem' }}>
                <LoginForm onLogin={onLoginSuccess} />
                
                <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid var(--neutral-200)' }}>
                  <p className="mb-0" style={{ color: 'var(--neutral-600)' }}>
                    Don't have an account?{' '}
                    <Link 
                      to="/register" 
                      className="text-decoration-none fw-semibold"
                      style={{ color: 'var(--primary-600)' }}
                    >
                      Sign up here
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

export default LoginPage; 