import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { 
  FaStar, FaRocket, FaShieldAlt, FaEuroSign, FaMagic,
  FaBrain, FaBullseye, FaCheckCircle, FaCogs, FaFileAlt, FaListUl,
  FaRobot, FaDatabase, FaSearch, FaCheck, FaClock,
  FaHeadset, FaUsers, FaChartPie, FaHistory, FaCommentDots, FaSignInAlt,
  FaArrowRight, FaGem, FaInfinity
} from 'react-icons/fa';
import TestimonialForm from './TestimonialForm';
import { isAuthenticated } from '../utils/auth';

const HomePage = () => {
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const navigate = useNavigate();
  
  // Check if user is properly authenticated (not just if token exists)
  const isLoggedIn = isAuthenticated();

  const handleLeaveComment = () => {
    if (isLoggedIn) {
      setShowTestimonialForm(true);
    } else {
      // Redirect to login page
      navigate('/login');
    }
  };

  return (
    <>
      {/* Revolutionary Hero Section */}
      <section className="hero-gradient text-white section-modern overflow-hidden relative">
        <Container className="container-modern">
          <Row className="justify-content-center text-center">
            <Col lg={10} className="fade-in relative z-10">
              {/* Floating Badge */}
              <div className="glass-card d-inline-flex align-items-center px-4 py-2 mb-4 float-animation">
                <FaStar className="react-icon icon-left" />
                <span className="fw-semibold">Revolutionary AI Optimization Platform</span>
              </div>

              {/* Hero Title */}
              <div className="mb-4">
                <h1 className="text-6xl fw-bold mb-4" style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}>
                  <span className="text-gradient-hero">Dominate AI Search</span>
                  <span className="d-block text-4xl opacity-90 mt-2">& Get Discovered by LLMs</span>
              </h1>
              </div>
              
              <h2 className="text-3xl fw-bold mb-4 slide-up" style={{ animationDelay: '0.2s' }}>
                Transform Your Website into an 
                <span className="text-gradient-hero"> AI-Friendly Powerhouse</span>
              </h2>
              
              <p className="text-xl mb-5 opacity-90 slide-up" style={{ 
                maxWidth: '800px', 
                margin: '0 auto 3rem',
                animationDelay: '0.4s'
              }}>
                <strong className="text-warning">Transform any website into an AI-discoverable powerhouse in minutes, not hours, <span className="text-4xl">for €19.99/year</span></strong>
              </p>

              {/* Value Highlights */}
              <Row className="mb-5 slide-up" style={{ animationDelay: '0.6s' }}>
                <Col md={4} className="mb-3">
                  <div className="glass-card p-3 h-100">
                    <FaRocket className="react-icon text-warning mb-2" style={{ fontSize: '1.5rem' }} />
                    <div className="fw-bold">Instant Optimization</div>
                    <small className="opacity-75">Results in 24 hours</small>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="glass-card p-3 h-100">
                    <FaBrain className="react-icon text-warning mb-2" style={{ fontSize: '1.5rem' }} />
                    <div className="fw-bold">AI-First Approach</div>
                    <small className="opacity-75">Built for LLMs</small>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="glass-card p-3 h-100">
                    <FaShieldAlt className="react-icon text-warning mb-2" style={{ fontSize: '1.5rem' }} />
                    <div className="fw-bold">Professional Results</div>
                    <small className="opacity-75">Enterprise-grade quality</small>
                  </div>
                </Col>
              </Row>

              {/* CTA Buttons */}
              <div className="d-flex gap-4 justify-content-center flex-wrap slide-up" style={{ animationDelay: '0.8s' }}>
                <Button 
                  as={Link} 
                  to="/register" 
                  className="btn-modern btn-primary-modern"
                  size="lg" 
                >
                  <FaRocket className="react-icon icon-left" />
                  Start Optimizing Now
                  <FaArrowRight className="react-icon icon-right" />
                </Button>
                <Button 
                  as={Link} 
                  to="/about" 
                  className="btn-modern btn-secondary-modern"
                  size="lg" 
                >
                  <FaGem className="react-icon icon-left" />
                  See How It Works
                </Button>
              </div>
              
              <p className="mt-4 opacity-75 slide-up" style={{ animationDelay: '1s' }}>
                <FaShieldAlt className="react-icon icon-left-sm" />
                No refunds - Please be sure you need it • Get started in minutes
              </p>
            </Col>
          </Row>
        </Container>
        
        {/* Animated Background Elements */}
        <div className="absolute" style={{
          top: '10%',
          left: '10%',
          width: '100px',
          height: '100px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div className="absolute" style={{
          bottom: '20%',
          right: '15%',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>
      </section>

      {/* Auto-Discovery Feature Showcase */}
      <section className="section-modern bg-light">
        <Container className="container-modern">
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <div className="glass-card d-inline-flex align-items-center px-4 py-2 mb-4">
                <FaMagic className="react-icon icon-left text-primary" />
                <span className="fw-bold text-primary">Game-Changing Auto-Discovery</span>
              </div>
              <h2 className="text-5xl fw-bold mb-4 slide-up">
                <span className="text-gradient-dark">Tier-Based Auto-Discovery</span> Saves Hours of Manual Work
              </h2>
              <p className="text-xl text-muted mb-5 slide-up" style={{ animationDelay: '0.2s' }}>
                Our revolutionary AI automatically scans and discovers your entire website structure with tier-based limits: Starter (100 pages), Professional (300 pages), Enterprise (unlimited)
              </p>
            </Col>
          </Row>
          
          <Row className="g-4 mb-5">
            <Col lg={6} className="slide-up" style={{ animationDelay: '0.4s' }}>
              <Card className="card-modern h-100 border-0 shadow-lg">
                <Card.Body className="p-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="feature-icon me-3">
                      <FaSearch className="react-icon" style={{ fontSize: '1.5rem', color: 'white' }} />
                    </div>
                    <h4 className="text-2xl fw-bold mb-0">Smart Website Scanning</h4>
                  </div>
                  <p className="text-muted text-lg mb-4" style={{ lineHeight: '1.7' }}>
                    Our AI crawls your entire website automatically, discovering every page, section, and piece of content without any manual intervention.
                  </p>
                  <ul className="text-muted text-lg" style={{ lineHeight: '1.8', listStyle: 'none', paddingLeft: '0' }}>
                    <li className="mb-3 d-flex align-items-start">
                      <FaCheckCircle className="react-icon text-success me-3 mt-1 flex-shrink-0" />
                      <span><strong>Complete Site Mapping:</strong> Discovers all pages and content structure</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <FaCheckCircle className="react-icon text-success me-3 mt-1 flex-shrink-0" />
                      <span><strong>Content Analysis:</strong> Identifies key topics, keywords, and themes</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <FaCheckCircle className="react-icon text-success me-3 mt-1 flex-shrink-0" />
                      <span><strong>Priority Detection:</strong> Automatically ranks content importance</span>
                    </li>
                    <li className="d-flex align-items-start">
                      <FaCheckCircle className="react-icon text-success me-3 mt-1 flex-shrink-0" />
                      <span><strong>Zero Manual Work:</strong> No need to manually list pages or content</span>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6} className="slide-up" style={{ animationDelay: '0.6s' }}>
              <Card className="card-modern h-100 border-0 shadow-lg">
                <Card.Body className="p-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="feature-icon me-3">
                      <FaRobot className="react-icon" style={{ fontSize: '1.5rem', color: 'white' }} />
                    </div>
                    <h4 className="text-2xl fw-bold mb-0">Intelligent Optimization</h4>
                  </div>
                  <p className="text-muted text-lg mb-4" style={{ lineHeight: '1.7' }}>
                    The AI doesn't just discover content - it intelligently optimizes it for maximum AI model discoverability and understanding.
                  </p>
                  <ul className="text-muted text-lg" style={{ lineHeight: '1.8', listStyle: 'none', paddingLeft: '0' }}>
                    <li className="mb-3 d-flex align-items-start">
                      <FaCheckCircle className="react-icon text-success me-3 mt-1 flex-shrink-0" />
                      <span><strong>Smart Formatting:</strong> Structures content for optimal AI consumption</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <FaCheckCircle className="react-icon text-success me-3 mt-1 flex-shrink-0" />
                      <span><strong>Context Enhancement:</strong> Adds relevant metadata and descriptions</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <FaCheckCircle className="react-icon text-success me-3 mt-1 flex-shrink-0" />
                      <span><strong>SEO Integration:</strong> Incorporates existing SEO data seamlessly</span>
                    </li>
                    <li className="d-flex align-items-start">
                      <FaCheckCircle className="react-icon text-success me-3 mt-1 flex-shrink-0" />
                      <span><strong>Future-Proof Output:</strong> Adapts to evolving AI model requirements</span>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Time Savings Comparison */}
          <Row className="justify-content-center slide-up" style={{ animationDelay: '0.8s' }}>
            <Col lg={10}>
              <Card className="card-modern overflow-hidden" style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none'
              }}>
                <Card.Body className="p-5">
                  <div className="text-center mb-4">
                    <h3 className="text-3xl fw-bold mb-3">Massive Time Savings</h3>
                    <p className="text-xl opacity-90">
                      Compare the time investment: traditional manual work vs our auto-discovery
                    </p>
                  </div>
                  
                  <Row className="g-4">
                    <Col md={6} className="text-center">
                      <div className="glass-card p-4 h-100">
                        <FaClock className="react-icon text-warning mb-3" style={{ fontSize: '2.5rem' }} />
                        <h5 className="fw-bold mb-3">Manual Process</h5>
                        <div className="text-4xl fw-bold text-warning mb-2">8-16 Hours</div>
                        <ul className="text-start opacity-90" style={{ listStyle: 'none', paddingLeft: '0' }}>
                          <li className="mb-2">• Manual page-by-page analysis</li>
                          <li className="mb-2">• Content categorization</li>
                          <li className="mb-2">• SEO data compilation</li>
                          <li>• File structure planning</li>
                        </ul>
                      </div>
                    </Col>
                    
                    <Col md={6} className="text-center">
                      <div className="glass-card p-4 h-100">
                        <FaMagic className="react-icon text-warning mb-3" style={{ fontSize: '2.5rem' }} />
                        <h5 className="fw-bold mb-3">Auto-Discovery</h5>
                        <div className="text-4xl fw-bold text-warning mb-2">2-5 Minutes</div>
                        <ul className="text-start opacity-90" style={{ listStyle: 'none', paddingLeft: '0' }}>
                          <li className="mb-2">• Instant website scanning</li>
                          <li className="mb-2">• Automated content analysis</li>
                          <li className="mb-2">• Smart optimization</li>
                          <li>• Ready-to-deploy files</li>
                        </ul>
                      </div>
                    </Col>
                  </Row>

                  <div className="text-center mt-4 p-4" style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: '15px' }}>
                    <h6 className="fw-bold mb-2 text-warning">🎯 Tier-Based Limits</h6>
                    <p className="mb-0 opacity-90 text-lg">
                      <strong>Starter:</strong> 100 pages • <strong>Professional:</strong> 300 pages • <strong>Enterprise:</strong> Unlimited pages
                    </p>
                    <p className="mb-0 opacity-90 text-sm mt-2">
                      Choose the plan that fits your website size and scale as you grow.
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Benefits Comparison Section */}
      <section className="section-modern bg-light">
        <Container className="container-modern">
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h2 className="text-5xl fw-bold mb-4 text-gradient-dark slide-up">
                Why Choose Our Solution?
              </h2>
              <p className="text-xl text-muted mb-5 slide-up" style={{ animationDelay: '0.2s' }}>
                Compare what you get with traditional approaches vs our AI-optimized platform
              </p>
            </Col>
          </Row>
          
          <Row className="justify-content-center slide-up" style={{ animationDelay: '0.4s' }}>
            <Col lg={10}>
              <div className="card-modern p-4">
                <Row className="align-items-center">
                  <Col md={3} className="text-center mb-3 mb-md-0 stagger-animation">
                    <div className="p-3">
                      <h5 className="fw-bold text-muted">Manual SEO</h5>
                      <div className="text-2xl text-muted mb-2">
                        <FaClock className="react-icon mb-1" />
                      </div>
                      <small className="text-muted">Weeks of research & writing</small>
                      <div className="mt-2 text-danger">❌ AI-blind content</div>
                    </div>
                  </Col>
                  <Col md={3} className="text-center mb-3 mb-md-0 stagger-animation">
                    <div className="p-3">
                      <h5 className="fw-bold text-muted">Hiring Agencies</h5>
                      <div className="text-2xl text-muted mb-2">
                        <FaUsers className="react-icon mb-1" />
                      </div>
                      <small className="text-muted">Expensive & slow delivery</small>
                      <div className="mt-2 text-danger">❌ Generic solutions</div>
                    </div>
                  </Col>
                  <Col md={3} className="text-center mb-3 mb-md-0 stagger-animation">
                    <div className="p-3">
                      <h5 className="fw-bold text-muted">Building In-House</h5>
                      <div className="text-2xl text-muted mb-2">
                        <FaCogs className="react-icon mb-1" />
                      </div>
                      <small className="text-muted">Months of development</small>
                      <div className="mt-2 text-danger">❌ Complex maintenance</div>
                    </div>
                  </Col>
                  <Col md={3} className="text-center stagger-animation">
                    <div className="glass-card p-4 relative">
                      <div className="absolute" style={{
                        top: '-8px',
                        right: '-8px',
                        background: 'var(--gradient-warm)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: 'white'
                      }}>
                        SMART CHOICE
                      </div>
                      <h5 className="fw-bold mb-2">MindfulRank</h5>
                      <div className="text-2xl text-gradient mb-2">
                        <FaMagic className="react-icon mb-1" />
                      </div>
                      <small className="opacity-75">Instant AI optimization</small>
                      <div className="mt-2 text-success">✅ Future-proof solution</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Social Proof & Results Section */}
      <section className="section-modern">
        <Container className="container-modern">
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h2 className="text-5xl fw-bold mb-4 slide-up">
                Real Results from <span className="text-gradient-dark">Smart Businesses</span>
              </h2>
              <p className="text-xl text-muted mb-5 slide-up" style={{ animationDelay: '0.2s' }}>
                Join thousands who are already dominating AI search results
              </p>
            </Col>
          </Row>
          
          {/* Stats Row */}
          <Row className="text-center mb-5">
            <Col md={3} className="mb-4 stagger-animation">
              <div className="card-modern p-4 h-100">
                <div className="text-4xl fw-bold text-gradient-dark mb-2">5,000+</div>
                <p className="text-muted mb-0">Websites Optimized</p>
              </div>
            </Col>
            <Col md={3} className="mb-4 stagger-animation">
              <div className="card-modern p-4 h-100">
                <div className="text-4xl fw-bold text-gradient-dark mb-2">300%</div>
                <p className="text-muted mb-0">Average Traffic Boost</p>
              </div>
            </Col>
            <Col md={3} className="mb-4 stagger-animation">
              <div className="card-modern p-4 h-100">
                <div className="text-4xl fw-bold text-gradient-dark mb-2">24hr</div>
                <p className="text-muted mb-0">Average Setup Time</p>
              </div>
            </Col>
            <Col md={3} className="mb-4 stagger-animation">
              <div className="card-modern p-4 h-100">
                <div className="text-4xl fw-bold text-gradient-dark mb-2">99.9%</div>
                <p className="text-muted mb-0">Customer Satisfaction</p>
              </div>
            </Col>
          </Row>

          {/* Testimonials */}
          <Row className="justify-content-center">
            <Col lg={10}>
              <Row>
                <Col md={4} className="mb-4 stagger-animation">
                  <Card className="card-modern h-100">
                    <Card.Body className="p-4">
                      <div className="mb-3">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="react-icon text-warning me-1" />
                        ))}
                      </div>
                      <p className="mb-3 text-lg" style={{ fontStyle: 'italic' }}>
                        "€19.99/year? I was paying €300/year for a similar service. This is incredible value!"
                      </p>
                      <div className="d-flex align-items-center">
                        <div className="feature-icon me-3" style={{ 
                          width: '48px', 
                          height: '48px',
                          fontSize: '1.2rem'
                        }}>
                          M
                        </div>
                        <div>
                          <div className="fw-semibold">Maria K.</div>
                          <small className="text-muted">E-commerce Owner</small>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} className="mb-4 stagger-animation">
                  <Card className="card-modern h-100">
                    <Card.Body className="p-4">
                      <div className="mb-3">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="react-icon text-warning me-1" />
                        ))}
                      </div>
                      <p className="mb-3 text-lg" style={{ fontStyle: 'italic' }}>
                        "Finally, a solution that doesn't break the bank. My AI search rankings improved within weeks."
                      </p>
                      <div className="d-flex align-items-center">
                        <div className="feature-icon me-3" style={{ 
                          width: '48px', 
                          height: '48px',
                          fontSize: '1.2rem'
                        }}>
                          D
                        </div>
                        <div>
                          <div className="fw-semibold">David L.</div>
                          <small className="text-muted">SaaS Founder</small>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} className="mb-4 stagger-animation">
                  <Card className="card-modern h-100">
                    <Card.Body className="p-4">
                      <div className="mb-3">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="react-icon text-warning me-1" />
                        ))}
                      </div>
                      <p className="mb-3 text-lg" style={{ fontStyle: 'italic' }}>
                        "The auto-discovery feature alone saves me hours. And at this price? No-brainer."
                      </p>
                      <div className="d-flex align-items-center">
                        <div className="feature-icon me-3" style={{ 
                          width: '48px', 
                          height: '48px',
                          fontSize: '1.2rem'
                        }}>
                          A
                        </div>
                        <div>
                          <div className="fw-semibold">Anna S.</div>
                          <small className="text-muted">Digital Marketer</small>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Leave a Comment Section */}
              <Row className="justify-content-center mt-5 slide-up">
                <Col lg={8} className="text-center">
                  <div className="glass-card p-4">
                    <FaCommentDots className="react-icon text-primary mb-3" style={{ fontSize: '3rem' }} />
                    <h4 className="fw-bold mb-3">
                      Share Your Experience
                    </h4>
                    <p className="text-muted mb-4 text-lg">
                      Have you used MindfulRank? We'd love to hear about your experience!
                    </p>
                    <Button
                      onClick={handleLeaveComment}
                      className={`btn-modern ${isLoggedIn ? 'btn-primary-modern' : 'btn-secondary-modern'}`}
                      size="lg"
                    >
                      {isLoggedIn ? (
                        <>
                          <FaCommentDots className="react-icon icon-left" />
                          Leave a Comment
                          <FaArrowRight className="react-icon icon-right" />
                        </>
                      ) : (
                        <>
                          <FaSignInAlt className="react-icon icon-left" />
                          Login to Leave a Comment
                        </>
                      )}
                    </Button>
                    {!isLoggedIn && (
                      <p className="mt-3 mb-0 text-muted">
                        Please login to share your testimonial with our community
                      </p>
                    )}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Premium Features Section */}
      <section className="section-modern bg-light">
        <Container className="container-modern">
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="text-5xl fw-bold mb-4 slide-up">
                <span className="text-gradient-dark">Premium Features</span> at Startup Prices
              </h2>
              <p className="text-xl text-muted mb-5 slide-up" style={{ 
                maxWidth: '700px', 
                margin: '0 auto',
                animationDelay: '0.2s'
              }}>
                Get enterprise-level AI optimization without the enterprise price tag
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            <Col md={6} lg={3} className="stagger-animation">
              <Card className="card-modern h-100 text-center">
                <Card.Body className="p-4">
                  <div className="feature-icon">
                    <FaEuroSign className="react-icon" style={{ color: 'white', fontSize: '1.5rem' }} />
                  </div>
                  <Card.Title className="text-2xl fw-bold mb-3">
                    95% Cost Savings
                  </Card.Title>
                  <Card.Text className="text-muted text-lg" style={{ lineHeight: '1.7' }}>
                    Pay €19.99/year instead of €200+ elsewhere. Same results, fraction of the cost.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={3} className="stagger-animation">
              <Card className="card-modern h-100 text-center">
                <Card.Body className="p-4">
                  <div className="feature-icon">
                    <FaMagic className="react-icon" style={{ color: 'white', fontSize: '1.5rem' }} />
                  </div>
                  <Card.Title className="text-2xl fw-bold mb-3">
                    Auto-Discovery
                  </Card.Title>
                  <Card.Text className="text-muted text-lg" style={{ lineHeight: '1.7' }}>
                    Automatically finds and optimizes your website pages. No manual work required.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={3} className="stagger-animation">
              <Card className="card-modern h-100 text-center">
                <Card.Body className="p-4">
                  <div className="feature-icon">
                    <FaRocket className="react-icon" style={{ color: 'white', fontSize: '1.5rem' }} />
                  </div>
                  <Card.Title className="text-2xl fw-bold mb-3">
                    Instant Setup
                  </Card.Title>
                  <Card.Text className="text-muted text-lg" style={{ lineHeight: '1.7' }}>
                    Get your LLM files in minutes, not weeks. No technical expertise needed.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={3} className="stagger-animation">
              <Card className="card-modern h-100 text-center">
                <Card.Body className="p-4">
                  <div className="feature-icon">
                    <FaShieldAlt className="react-icon" style={{ color: 'white', fontSize: '1.5rem' }} />
                  </div>
                  <Card.Title className="text-2xl fw-bold mb-3">
                    Low-Risk Investment
                  </Card.Title>
                  <Card.Text className="text-muted text-lg" style={{ lineHeight: '1.7' }}>
                    Just €19.99/year - less than a dinner out. No refunds, but minimal risk.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* What We Do - Service Explanation */}
      <section className="section-modern">
        <Container className="container-modern">
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <div className="glass-card d-inline-flex align-items-center px-4 py-2 mb-4">
                <FaFileAlt className="react-icon icon-left text-primary" />
                <span className="fw-bold text-primary">Industry Leading Service</span>
              </div>
              <h2 className="text-5xl fw-bold mb-4 slide-up">
                We Generate <span className="text-gradient-dark">LLMs.txt & LLMs-Full.txt</span> Files
              </h2>
              <p className="text-xl text-muted mb-5 slide-up" style={{ 
                maxWidth: '800px', 
                margin: '0 auto',
                animationDelay: '0.2s'
              }}>
                The world's best automated service for creating professional LLM optimization files that make your website discoverable by AI models
              </p>
            </Col>
          </Row>

          {/* Service Overview Cards */}
          <Row className="g-4 mb-5">
            <Col lg={6} className="slide-up" style={{ animationDelay: '0.4s' }}>
              <Card className="card-modern h-100">
                <Card.Body className="p-5">
                  <div className="feature-icon mb-4">
                    <FaFileAlt className="react-icon" style={{ fontSize: '1.5rem', color: 'white' }} />
                  </div>
                  <h4 className="text-2xl fw-bold mb-4">LLMs.txt Generation</h4>
                  <p className="text-muted text-lg mb-4" style={{ lineHeight: '1.7' }}>
                    Our core service automatically generates optimized <code>llms.txt</code> files that tell AI models exactly how to understand and index your website content.
                  </p>
                  <ul className="text-muted text-lg" style={{ lineHeight: '1.8', listStyle: 'none', paddingLeft: '0' }}>
                    <li className="mb-3 d-flex align-items-start">
                      <FaCheckCircle className="react-icon text-success me-3 mt-1 flex-shrink-0" />
                      <span><strong>Smart Content Analysis:</strong> AI scans your entire website structure</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <FaCheckCircle className="react-icon text-success me-3 mt-1 flex-shrink-0" />
                      <span><strong>Automated Optimization:</strong> Creates perfect LLM-readable format</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <FaCheckCircle className="react-icon text-success me-3 mt-1 flex-shrink-0" />
                      <span><strong>Industry Standards:</strong> Follows latest AI model requirements</span>
                    </li>
                    <li className="d-flex align-items-start">
                      <FaCheckCircle className="react-icon text-success me-3 mt-1 flex-shrink-0" />
                      <span><strong>Instant Deployment:</strong> Ready-to-upload files in minutes</span>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6} className="slide-up" style={{ animationDelay: '0.6s' }}>
              <Card className="card-modern h-100">
                <Card.Body className="p-5">
                  <div className="feature-icon mb-4">
                    <FaDatabase className="react-icon" style={{ fontSize: '1.5rem', color: 'white' }} />
                  </div>
                  <h4 className="text-2xl fw-bold mb-4">LLMs-Full.txt Generation</h4>
                  <p className="text-muted text-lg mb-4" style={{ lineHeight: '1.7' }}>
                    Advanced comprehensive files that include your complete website content in AI-optimized format for maximum discoverability and training data quality.
                  </p>
                  <ul className="text-muted text-lg" style={{ lineHeight: '1.8', listStyle: 'none', paddingLeft: '0' }}>
                    <li className="mb-3 d-flex align-items-start">
                      <FaCheckCircle className="react-icon text-success me-3 mt-1 flex-shrink-0" />
                      <span><strong>Complete Content:</strong> Full website text and metadata</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <FaCheckCircle className="react-icon text-success me-3 mt-1 flex-shrink-0" />
                      <span><strong>Structured Format:</strong> Optimized for AI training and analysis</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <FaCheckCircle className="react-icon text-success me-3 mt-1 flex-shrink-0" />
                      <span><strong>Maximum Coverage:</strong> Ensures no important content is missed</span>
                    </li>
                    <li className="d-flex align-items-start">
                      <FaCheckCircle className="react-icon text-success me-3 mt-1 flex-shrink-0" />
                      <span><strong>Enterprise Quality:</strong> Professional-grade output files</span>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Why We're The Best */}
          <Row className="justify-content-center slide-up" style={{ animationDelay: '0.8s' }}>
            <Col lg={10}>
              <Card className="card-modern overflow-hidden" style={{ 
                background: 'var(--gradient-primary)',
                color: 'white',
                border: 'none'
              }}>
                <Card.Body className="p-5">
                  <div className="text-center mb-4">
                    <h3 className="text-3xl fw-bold mb-3">Why We're The Industry Leader</h3>
                    <p className="text-xl opacity-90">
                      The most advanced LLM file generation technology available
                    </p>
                  </div>
                  
                  <Row className="g-4">
                    <Col md={4} className="text-center">
                      <div className="glass-card p-4 h-100">
                        <FaRobot className="react-icon text-warning mb-3" style={{ fontSize: '2.5rem' }} />
                        <h5 className="fw-bold mb-3">AI-Powered Analysis</h5>
                        <p className="opacity-90">
                          Our AI understands website structure better than any human or competitor
                        </p>
                      </div>
                    </Col>
                    
                    <Col md={4} className="text-center">
                      <div className="glass-card p-4 h-100">
                        <FaCogs className="react-icon text-warning mb-3" style={{ fontSize: '2.5rem' }} />
                        <h5 className="fw-bold mb-3">Automated Perfection</h5>
                        <p className="opacity-90">
                          Zero manual work - our system handles everything from analysis to file creation
                        </p>
                      </div>
                    </Col>
                    
                    <Col md={4} className="text-center">
                      <div className="glass-card p-4 h-100">
                        <FaRocket className="react-icon text-warning mb-3" style={{ fontSize: '2.5rem' }} />
                        <h5 className="fw-bold mb-3">Instant Results</h5>
                        <p className="opacity-90">
                          Get professional-quality LLM files in minutes, not weeks like manual services
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="section-modern bg-light">
        <Container className="container-modern">
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="text-5xl fw-bold mb-4 slide-up">
                How <span className="text-gradient-dark">It Works</span>
              </h2>
              <p className="text-xl text-muted mb-5 slide-up" style={{ 
                maxWidth: '700px', 
                margin: '0 auto',
                animationDelay: '0.2s'
              }}>
                From website analysis to file deployment - the complete LLM optimization process
              </p>
            </Col>
          </Row>
          
          <Row className="g-4 mb-5">
            <Col md={6} lg={3} className="stagger-animation">
              <div className="text-center">
                <div className="step-indicator">
                  1
                </div>
                <h4 className="text-xl fw-bold mb-3">
                  Website Analysis
                </h4>
                <p className="text-muted text-lg" style={{ lineHeight: '1.7' }}>
                  Input your website URL and our AI automatically scans your entire site structure, content, and metadata for comprehensive analysis
                </p>
              </div>
            </Col>
            
            <Col md={6} lg={3} className="stagger-animation">
              <div className="text-center">
                <div className="step-indicator">
                  2
                </div>
                <h4 className="text-xl fw-bold mb-3">
                  Content Processing
                </h4>
                <p className="text-muted text-lg" style={{ lineHeight: '1.7' }}>
                  Our advanced AI extracts and processes your content, identifying key pages, structures, and optimization opportunities
                </p>
              </div>
            </Col>
            
            <Col md={6} lg={3} className="stagger-animation">
              <div className="text-center">
                <div className="step-indicator">
                  3
                </div>
                <h4 className="text-xl fw-bold mb-3">
                  File Generation
                </h4>
                <p className="text-muted text-lg" style={{ lineHeight: '1.7' }}>
                  Generate both <strong>llms.txt</strong> (structure guide) and <strong>llms-full.txt</strong> (complete content) files optimized for AI models
                </p>
              </div>
            </Col>
            
            <Col md={6} lg={3} className="stagger-animation">
              <div className="text-center">
                <div className="step-indicator">
                  4
                </div>
                <h4 className="text-xl fw-bold mb-3">
                  Instant Download
                </h4>
                <p className="text-muted text-lg" style={{ lineHeight: '1.7' }}>
                  Download your professional-grade files immediately and deploy them to your website root directory for instant AI optimization
                </p>
              </div>
            </Col>
          </Row>

          {/* File Usage Guide */}
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card className="card-modern" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', border: 'none' }}>
                <Card.Body className="p-5">
                  <div className="text-center mb-4">
                    <h3 className="text-2xl fw-bold mb-3" style={{ color: 'var(--neutral-900)' }}>
                      🚀 How to Use Your Generated Files
                    </h3>
                    <p className="text-lg text-muted">
                      The llms.txt and llms-full.txt files should be uploaded to the root directory of your website
                    </p>
                  </div>
                  
                  <Row className="g-4">
                    <Col md={6}>
                      <div className="text-center p-4" style={{ background: 'white', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                        <div style={{
                          width: '60px',
                          height: '60px',
                          background: 'var(--gradient-primary)',
                          borderRadius: '15px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 1rem',
                          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                        }}>
                          <FaFileAlt className="react-icon" style={{ fontSize: '1.5rem', color: 'white' }} />
                        </div>
                        <h5 className="fw-bold mb-3" style={{ color: 'var(--neutral-900)' }}>LLMs.txt File</h5>
                        <ul className="text-start text-muted" style={{ listStyle: 'none', paddingLeft: '0' }}>
                          <li className="mb-2">✅ Upload to root: <code>yoursite.com/llms.txt</code></li>
                          <li className="mb-2">✅ Guides AI models to your content</li>
                          <li className="mb-2">✅ Specifies content priorities</li>
                          <li>✅ Small file size (~1-5KB)</li>
                        </ul>
                      </div>
                    </Col>
                    
                    <Col md={6}>
                      <div className="text-center p-4" style={{ background: 'white', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                        <div style={{
                          width: '60px',
                          height: '60px',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          borderRadius: '15px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 1rem',
                          boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                        }}>
                          <FaDatabase className="react-icon" style={{ fontSize: '1.5rem', color: 'white' }} />
                        </div>
                        <h5 className="fw-bold mb-3" style={{ color: 'var(--neutral-900)' }}>LLMs-Full.txt File</h5>
                        <ul className="text-start text-muted" style={{ listStyle: 'none', paddingLeft: '0' }}>
                          <li className="mb-2">✅ Upload to root: <code>yoursite.com/llms-full.txt</code></li>
                          <li className="mb-2">✅ Complete website content</li>
                          <li className="mb-2">✅ Maximum AI training data</li>
                          <li>✅ Enterprise-grade coverage</li>
                        </ul>
                      </div>
                    </Col>
                  </Row>

                  <div className="text-center mt-4 p-4" style={{ background: 'rgba(102, 126, 234, 0.1)', borderRadius: '15px' }}>
                    <h6 className="fw-bold mb-2" style={{ color: 'var(--primary-700)' }}>💡 Pro Tip</h6>
                    <p className="mb-0 text-muted">
                      Deploy both files for maximum AI optimization. Most customers see traffic increases within 24-48 hours of deployment!
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="section-modern">
        <Container className="container-modern">
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="text-5xl fw-bold mb-4 slide-up">
                Ready to <span className="text-gradient-dark">Dominate AI Search?</span>
              </h2>
              <p className="text-xl text-muted mb-5 slide-up" style={{ animationDelay: '0.2s' }}>
                Join thousands of businesses already getting discovered by AI models and boosting their online presence
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap slide-up" style={{ animationDelay: '0.4s' }}>
                <Button 
                  as={Link} 
                  to="/register" 
                  className="btn-modern btn-primary-modern"
                  size="lg" 
                >
                  <FaRocket className="react-icon icon-left" />
                  Start Optimizing Today
                  <FaArrowRight className="react-icon icon-right" />
                </Button>
                <Button 
                  as={Link} 
                  to="/about" 
                  className="btn-modern btn-secondary-modern"
                  size="lg" 
                >
                  <FaGem className="react-icon icon-left" />
                  See Success Stories
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="section-modern overflow-hidden relative" style={{ 
        background: 'var(--gradient-primary)', 
        color: 'white'
      }}>
        <Container className="container-modern relative z-10">
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="text-5xl fw-bold mb-4 slide-up">
                Ready to Future-Proof Your Business?
              </h2>
              <p className="text-2xl mb-5 opacity-90 slide-up" style={{ 
                lineHeight: '1.6',
                animationDelay: '0.2s'
              }}>
                Join 5,000+ smart businesses who are already <strong>dominating AI search results</strong> and staying ahead of the competition
              </p>
              
              {/* Benefits Urgency */}
              <div className="glass-card p-4 d-inline-block mb-5 slide-up" style={{ animationDelay: '0.4s' }}>
                <FaBrain className="react-icon icon-left text-warning" style={{ fontSize: '1.5rem' }} />
                <span className="fw-bold text-warning text-lg">AI Revolution is Here: Don't Get Left Behind</span>
                <div className="mt-2 opacity-90">Be among the early adopters who gain competitive advantage through AI optimization.</div>
              </div>

              <div className="slide-up" style={{ animationDelay: '0.6s' }}>
                <Button 
                  as={Link} 
                  to="/register" 
                  className="btn-modern"
                  size="lg" 
                  style={{ 
                    background: 'white',
                    color: 'var(--primary-600)',
                    fontWeight: '700',
                    fontSize: '1.1rem'
                  }}
                >
                  <FaRocket className="react-icon icon-left" />
                  Start Your AI Optimization Journey
                  <FaArrowRight className="react-icon icon-right" />
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
        
        {/* Background Elements */}
        <div className="absolute" style={{
          top: '20%',
          left: '5%',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        <div className="absolute" style={{
          bottom: '10%',
          right: '10%',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite reverse'
        }}></div>
      </section>

      {/* Testimonial Form Modal */}
      <TestimonialForm 
        show={showTestimonialForm} 
        onHide={() => setShowTestimonialForm(false)}
      />
    </>
  );
};

export default HomePage; 
