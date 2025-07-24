import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { FaCheckCircle, FaHome, FaTachometerAlt, FaCrown } from 'react-icons/fa';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Simulate loading time to allow webhook processing
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '5rem'
      }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={5}>
              <Card style={{
                borderRadius: 'var(--radius-xl)',
                border: 'none',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
              }}>
                <Card.Body className="text-center p-5">
                  <Spinner animation="border" variant="success" style={{ width: '3rem', height: '3rem' }} />
                  <h3 className="mt-4 mb-3">Processing Your Payment...</h3>
                  <p className="text-muted">
                    Please wait while we confirm your subscription and set up your account.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
        background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        zIndex: 1
      }}></div>

      <Container style={{ position: 'relative', zIndex: 2 }}>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card style={{
              borderRadius: 'var(--radius-xl)',
              border: 'none',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
            }}>
              <Card.Body className="text-center p-5">
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 2rem'
                }}>
                  <FaCheckCircle style={{ color: 'white', fontSize: '2.5rem' }} />
                </div>

                <h2 className="fw-bold mb-3" style={{ color: 'var(--neutral-900)' }}>
                  Payment Successful!
                </h2>
                
                <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                  🎉 Welcome to your new subscription! Your account has been upgraded and you now have access to all premium features.
                </p>

                {sessionId && (
                  <Alert variant="success" className="mb-4">
                    <small>
                      <strong>Session ID:</strong> {sessionId.substring(0, 20)}...
                      <br />
                      <em>Your receipt has been sent to your email address.</em>
                    </small>
                  </Alert>
                )}

                <div className="d-grid gap-3">
                  <Button
                    as={Link}
                    to="/dashboard"
                    className="fw-semibold"
                    style={{
                      background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.75rem 1.5rem'
                    }}
                  >
                    <FaTachometerAlt className="react-icon icon-left" />
                    Go to Dashboard
                  </Button>
                  
                  <Button
                    as={Link}
                    to="/"
                    variant="outline-secondary"
                    className="fw-semibold"
                    style={{
                      borderRadius: 'var(--radius-md)',
                      padding: '0.75rem 1.5rem'
                    }}
                  >
                    <FaHome className="react-icon icon-left" />
                    Back to Home
                  </Button>
                </div>

                <div className="mt-4 pt-3" style={{ borderTop: '1px solid var(--neutral-200)' }}>
                  <div className="d-flex align-items-center justify-content-center text-muted">
                    <FaCrown className="me-2" style={{ color: '#ffd700' }} />
                    <small>You're now a premium member!</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PaymentSuccess; 