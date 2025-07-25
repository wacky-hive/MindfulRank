import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaBrain, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer style={{ 
      background: isDark ? 'var(--neutral-900)' : 'var(--neutral-800)',
      color: 'var(--neutral-200)',
      marginTop: 'auto',
      paddingTop: '3rem',
      paddingBottom: '2rem',
      borderTop: '1px solid var(--border-primary)'
    }}>
      <Container>
        <Row className="g-4">
          {/* Brand Section */}
          <Col lg={4} md={6}>
            <div className="mb-4">
              <h5 className="fw-bold mb-3" style={{ color: 'white' }}>
                <FaBrain className="react-icon icon-left" style={{ color: 'var(--primary-400)' }} />
                MindfulRank
              </h5>
              <p className="mb-3" style={{ lineHeight: '1.7', color: 'var(--neutral-300)' }}>
                Optimize your website content for AI language models with our automated platform. 
                Generate LLM-friendly files that boost discoverability.
              </p>

            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={3} sm={6}>
            <h6 className="fw-semibold mb-3" style={{ color: 'white' }}>Platform</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link 
                  to="/" 
                  className="text-decoration-none"
                  style={{ 
                    color: 'var(--neutral-300)',
                    transition: 'all var(--transition-base)'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--primary-400)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--neutral-300)'}
                >
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/about" 
                  className="text-decoration-none"
                  style={{ 
                    color: 'var(--neutral-300)',
                    transition: 'all var(--transition-base)'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--primary-400)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--neutral-300)'}
                >
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/pricing" 
                  className="text-decoration-none"
                  style={{ 
                    color: 'var(--neutral-300)',
                    transition: 'all var(--transition-base)'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--primary-400)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--neutral-300)'}
                >
                  Pricing
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/dashboard" 
                  className="text-decoration-none"
                  style={{ 
                    color: 'var(--neutral-300)',
                    transition: 'all var(--transition-base)'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--primary-400)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--neutral-300)'}
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </Col>

          {/* Resources */}
          <Col lg={2} md={3} sm={6}>
            <h6 className="fw-semibold mb-3" style={{ color: 'white' }}>Resources</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link 
                  to="/documentation" 
                  className="text-decoration-none"
                  style={{ 
                    color: 'var(--neutral-300)',
                    transition: 'all var(--transition-base)'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--primary-400)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--neutral-300)'}
                >
                  Documentation
                </Link>
              </li>

              <li className="mb-2">
                <a 
                  href="#" 
                  className="text-decoration-none"
                  style={{ 
                    color: 'var(--neutral-300)',
                    transition: 'all var(--transition-base)'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--primary-400)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--neutral-300)'}
                >
                  Support
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  className="text-decoration-none"
                  style={{ 
                    color: 'var(--neutral-300)',
                    transition: 'all var(--transition-base)'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--primary-400)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--neutral-300)'}
                >
                  Community
                </a>
              </li>
            </ul>
          </Col>

          {/* Legal */}
          <Col lg={2} md={6} sm={6}>
            <h6 className="fw-semibold mb-3" style={{ color: 'white' }}>Legal</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link 
                  to="/privacy-policy" 
                  className="text-decoration-none"
                  style={{ 
                    color: 'var(--neutral-300)',
                    transition: 'all var(--transition-base)'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--primary-400)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--neutral-300)'}
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/terms-of-service" 
                  className="text-decoration-none"
                  style={{ 
                    color: 'var(--neutral-300)',
                    transition: 'all var(--transition-base)'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--primary-400)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--neutral-300)'}
                >
                  Terms of Service
                </Link>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  className="text-decoration-none"
                  style={{ 
                    color: 'var(--neutral-300)',
                    transition: 'all var(--transition-base)'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--primary-400)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--neutral-300)'}
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </Col>

          {/* Contact */}
          <Col lg={2} md={6} sm={6}>
            <h6 className="fw-semibold mb-3" style={{ color: 'white' }}>Contact</h6>
            <div className="mb-2">
              <FaEnvelope className="react-icon icon-left" style={{ color: 'var(--primary-400)' }} />
              <span style={{ fontSize: '0.9rem', color: 'var(--neutral-300)' }}>
                support@mindfulrank.com
              </span>
            </div>

          </Col>
        </Row>

        {/* Version Section */}
        <Row className="justify-content-center text-center my-4">
          <Col lg={8}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: '12px',
              padding: '1.5rem',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10b981',
                  animation: 'pulse 2s infinite'
                }}></div>
                <span className="fw-bold" style={{ 
                  color: 'white',
                  fontSize: '1.1rem'
                }}>
                  Platform Status: LIVE & UPDATED
                </span>
              </div>
              
              <div className="row g-3 align-items-center">
                <div className="col-md-4">
                  <div style={{ color: 'var(--neutral-300)' }}>
                    <div className="fw-semibold">Version</div>
                    <div style={{ color: '#ffd700', fontSize: '1.1rem', fontWeight: 'bold' }}>v2.1.0</div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div style={{ color: 'var(--neutral-300)' }}>
                    <div className="fw-semibold">Last Updated</div>
                    <div style={{ color: 'white', fontSize: '0.95rem' }}>June 2025</div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div style={{ color: 'var(--neutral-300)' }}>
                    <div className="fw-semibold">AI Standards</div>
                    <div style={{ color: '#10b981', fontSize: '0.95rem', fontWeight: 'bold' }}>Latest LLM Specs</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <small style={{ 
                  color: 'var(--neutral-400)',
                  fontStyle: 'italic'
                }}>
                  🚀 Always following the latest AI and LLM market standards • Continuously updated for optimal performance
                </small>
              </div>
            </div>
          </Col>
        </Row>

        {/* Bottom Section */}
        <hr style={{ 
          border: '1px solid var(--neutral-700)', 
          margin: '2rem 0 1.5rem 0' 
        }} />
        
        <Row className="align-items-center">
          <Col md={6}>
            <p className="mb-0" style={{ 
              fontSize: '0.9rem', 
              color: 'var(--neutral-400)'
            }}>
              © 2025 MindfulRank. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="mb-0" style={{ 
              fontSize: '0.9rem', 
              color: 'var(--neutral-400)'
            }}>
              Made with <FaHeart className="react-icon" style={{ color: '#dc3545' }} /> for developers
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 