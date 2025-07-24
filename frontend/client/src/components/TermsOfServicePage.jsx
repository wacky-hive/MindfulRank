import React from 'react';
import { Container, Row, Col, Card, Alert, Badge } from 'react-bootstrap';
import { 
  FaGavel, FaShieldAlt, FaUserCheck, FaCreditCard, FaGlobe,
  FaCheckCircle, FaExclamationTriangle, FaEnvelope, FaCalendarAlt,
  FaCogs, FaTrash, FaBan, FaDownload, FaUsers, FaServer,
  FaEuroSign, FaLock, FaFileContract, FaBalanceScale, FaHandshake
} from 'react-icons/fa';

const TermsOfServicePage = () => {
  return (
    <>
      {/* Terms of Service Hero */}
      <section style={{ 
        background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', 
        color: 'white',
        padding: '4rem 0 2rem',
        marginTop: '76px'
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
                <FaGavel className="react-icon icon-left" style={{ color: '#ffd700' }} />
                <span className="fw-bold">Legal Agreement</span>
              </div>

              <h1 className="display-3 fw-bold mb-4">
                Terms of Service
              </h1>
              
              <p className="fs-4 mb-4" style={{ opacity: '0.9', maxWidth: '700px', margin: '0 auto' }}>
                Clear, fair terms that protect both you and us while you use our LLM optimization platform.
              </p>

              <Alert variant="warning" className="text-start">
                <FaCalendarAlt className="react-icon me-2" />
                <strong>Last Updated:</strong> June 20, 2025 | <strong>Effective Date:</strong> June 20, 2025
              </Alert>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="my-5">
        <Row>
          <Col lg={8} className="mx-auto">
            
            {/* Introduction */}
            <Card className="card-modern mb-4">
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3">
                  <FaHandshake className="react-icon icon-left text-primary" />
                  Agreement to Terms
                </h2>
                <p className="text-lg mb-3">
                  Welcome to MindfulRank! These Terms of Service ("Terms") govern your use of our LLM optimization platform and services operated by MindfulRank ("we," "our," or "us").
                </p>
                <p className="mb-3">
                  By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the service.
                </p>
                <Alert variant="info" className="mb-0">
                  <FaCheckCircle className="react-icon me-2" />
                  <strong>Simple Agreement:</strong> Using our platform means you accept these terms. Please read them carefully.
                </Alert>
              </Card.Body>
            </Card>

            {/* Service Description */}
            <Card className="card-modern mb-4">
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3">
                  <FaCogs className="react-icon icon-left text-primary" />
                  Our Service
                </h2>

                <h4 className="fw-bold mb-3">What We Provide</h4>
                <p className="mb-3">MindfulRank is an AI optimization platform that:</p>
                <ul className="mb-4">
                  <li><strong>Generates LLM Files:</strong> Creates llms.txt and llms-full.txt files for your websites</li>
                  <li><strong>Website Analysis:</strong> Automatically discovers and analyzes your website content</li>
                  <li><strong>Content Processing:</strong> Extracts and optimizes content for AI models</li>
                  <li><strong>File Management:</strong> Provides download and management tools for generated files</li>
                </ul>

                <h4 className="fw-bold mb-3">Service Limitations</h4>
                <ul className="mb-4">
                  <li>Service is provided "as-is" without guarantees of specific outcomes</li>
                  <li>We cannot guarantee AI model adoption of your optimized content</li>
                  <li>Processing speed may vary based on website size and complexity</li>
                  <li>Some websites may not be compatible with our analysis tools</li>
                </ul>

                <Alert variant="success" className="mb-0">
                  <FaEuroSign className="react-icon me-2" />
                  <strong>Great Value:</strong> All features included for just €19.99/year with unlimited websites!
                </Alert>
              </Card.Body>
            </Card>

            {/* User Accounts */}
            <Card className="card-modern mb-4">
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3">
                  <FaUserCheck className="react-icon icon-left text-primary" />
                  User Accounts & Responsibilities
                </h2>
                
                <h4 className="fw-bold mb-3">Account Requirements</h4>
                <p className="mb-3">To use our service, you must:</p>
                <ul className="mb-4">
                  <li>Be at least 16 years old</li>
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Have legal ownership or permission to optimize the websites you add</li>
                </ul>

                <h4 className="fw-bold mb-3">Your Responsibilities</h4>
                <Row className="g-3 mb-4">
                  <Col md={6}>
                    <div className="p-3 border rounded">
                      <h5 className="fw-bold mb-2">
                        <FaLock className="react-icon icon-left text-success" />
                        Account Security
                      </h5>
                      <ul className="mb-0 small">
                        <li>Keep login credentials secure</li>
                        <li>Notify us of unauthorized access</li>
                        <li>Use strong, unique passwords</li>
                        <li>Log out on shared devices</li>
                      </ul>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="p-3 border rounded">
                      <h5 className="fw-bold mb-2">
                        <FaGlobe className="react-icon icon-left text-info" />
                        Website Ownership
                      </h5>
                      <ul className="mb-0 small">
                        <li>Only add websites you own or control</li>
                        <li>Ensure content is legally yours</li>
                        <li>Respect third-party rights</li>
                        <li>Comply with applicable laws</li>
                      </ul>
                    </div>
                  </Col>
                </Row>

                <Alert variant="warning">
                  <FaExclamationTriangle className="react-icon me-2" />
                  <strong>Account Responsibility:</strong> You are fully responsible for all activity under your account.
                </Alert>
              </Card.Body>
            </Card>

            {/* Acceptable Use */}
            <Card className="card-modern mb-4">
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3">
                  <FaCheckCircle className="react-icon icon-left text-primary" />
                  Acceptable Use Policy
                </h2>
                
                <h4 className="fw-bold mb-3">You May Use Our Service To:</h4>
                <Row className="g-3 mb-4">
                  <Col md={6}>
                    <div className="p-3" style={{ background: '#f0fdf4', borderRadius: '8px' }}>
                      <h5 className="fw-bold mb-2 text-success">✅ Allowed Uses</h5>
                      <ul className="mb-0 small">
                        <li>Optimize your own websites</li>
                        <li>Generate LLM files for clients (with permission)</li>
                        <li>Improve AI discoverability of legitimate content</li>
                        <li>Download and use generated files</li>
                        <li>Access our platform features normally</li>
                      </ul>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="p-3" style={{ background: '#fef2f2', borderRadius: '8px' }}>
                      <h5 className="fw-bold mb-2 text-danger">❌ Prohibited Uses</h5>
                      <ul className="mb-0 small">
                        <li>Process websites you don't own</li>
                        <li>Generate files for illegal content</li>
                        <li>Attempt to hack or disrupt our service</li>
                        <li>Share your account with others</li>
                        <li>Abuse or overload our systems</li>
                      </ul>
                    </div>
                  </Col>
                </Row>

                <h4 className="fw-bold mb-3">Prohibited Content</h4>
                <p className="mb-3">You may not use our service to process websites containing:</p>
                <ul className="mb-4">
                  <li>Illegal, harmful, or fraudulent content</li>
                  <li>Malware, viruses, or malicious code</li>
                  <li>Copyright-infringing material</li>
                  <li>Hate speech, harassment, or discriminatory content</li>
                  <li>Adult content or material harmful to minors</li>
                  <li>Spam, phishing, or deceptive content</li>
                </ul>

                <Alert variant="danger" className="mb-0">
                  <FaBan className="react-icon me-2" />
                  <strong>Violation Consequences:</strong> Accounts violating these terms may be suspended or terminated immediately.
                </Alert>
              </Card.Body>
            </Card>

            {/* Payment Terms */}
            <Card className="card-modern mb-4">
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3">
                  <FaCreditCard className="react-icon icon-left text-primary" />
                  Payment Terms & Pricing
                </h2>
                
                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <div className="p-4 text-center" style={{ background: '#f8f9fa', borderRadius: '12px' }}>
                      <FaEuroSign className="text-success mb-2" style={{ fontSize: '2rem' }} />
                      <h4 className="fw-bold mb-2">Simple Pricing</h4>
                      <div className="h2 fw-bold text-success">€19.99/year</div>
                      <ul className="list-unstyled mb-0">
                        <li>✅ Unlimited websites</li>
                        <li>✅ Unlimited file generation</li>
                        <li>✅ All features included</li>
                        <li>✅ No hidden fees</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-4" style={{ background: '#fff7ed', borderRadius: '12px' }}>
                      <h4 className="fw-bold mb-3">Payment Details</h4>
                      <ul className="mb-3">
                        <li><strong>Billing Cycle:</strong> Annual subscription</li>
                        <li><strong>Payment Methods:</strong> Credit/debit cards, PayPal</li>
                        <li><strong>Currency:</strong> Euros (EUR)</li>
                        <li><strong>Auto-Renewal:</strong> Unless cancelled</li>
                      </ul>
                      <small className="text-muted">Prices include applicable taxes where required by law.</small>
                    </div>
                  </div>
                </div>

                <h4 className="fw-bold mb-3">Billing & Renewals</h4>
                <ul className="mb-4">
                  <li>Subscriptions automatically renew annually unless cancelled</li>
                  <li>You will be notified before renewal charges</li>
                  <li>Cancel anytime through your account dashboard</li>
                  <li>Cancellation takes effect at the end of your billing period</li>
                  <li>No partial refunds for cancelled subscriptions</li>
                </ul>

                <Alert variant="info" className="mb-0">
                  <FaExclamationTriangle className="react-icon me-2" />
                  <strong>No Refund Policy:</strong> Due to our low €19.99/year pricing, we do not offer refunds. Please ensure you need our service before subscribing.
                </Alert>
              </Card.Body>
            </Card>

            {/* Intellectual Property */}
            <Card className="card-modern mb-4">
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3">
                  <FaFileContract className="react-icon icon-left text-primary" />
                  Intellectual Property Rights
                </h2>
                
                <h4 className="fw-bold mb-3">Your Content & Data</h4>
                <div className="p-3 mb-4" style={{ background: '#f0fdf4', borderRadius: '8px' }}>
                  <p className="mb-2"><strong>You retain full ownership of:</strong></p>
                  <ul className="mb-2">
                    <li>Your website content and data</li>
                    <li>Generated LLM files</li>
                    <li>Any intellectual property you provide</li>
                    <li>Content processed through our service</li>
                  </ul>
                  <small className="text-muted">We only process your content to provide the service - we don't claim ownership.</small>
                </div>

                <h4 className="fw-bold mb-3">Our Platform & Technology</h4>
                <div className="p-3 mb-4" style={{ background: '#fef3c7', borderRadius: '8px' }}>
                  <p className="mb-2"><strong>We retain ownership of:</strong></p>
                  <ul className="mb-2">
                    <li>MindfulRank platform and software</li>
                    <li>Our algorithms and processing methods</li>
                    <li>Platform design and user interface</li>
                    <li>Our trademarks and brand assets</li>
                  </ul>
                  <small className="text-muted">Our technology remains our intellectual property while serving you.</small>
                </div>

                <h4 className="fw-bold mb-3">License to Use Our Service</h4>
                <p className="mb-3">We grant you a limited, non-exclusive, non-transferable license to:</p>
                <ul className="mb-4">
                  <li>Access and use our platform for its intended purpose</li>
                  <li>Generate and download LLM files for your websites</li>
                  <li>Use our service in accordance with these Terms</li>
                </ul>

                <Alert variant="warning" className="mb-0">
                  <FaLock className="react-icon me-2" />
                  <strong>Usage Restrictions:</strong> You may not reverse engineer, copy, or redistribute our platform technology.
                </Alert>
              </Card.Body>
            </Card>

            {/* Service Availability */}
            <Card className="card-modern mb-4">
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3">
                  <FaServer className="react-icon icon-left text-primary" />
                  Service Availability & Limitations
                </h2>
                
                <h4 className="fw-bold mb-3">Service Uptime</h4>
                <p className="mb-3">We strive to maintain high service availability, but we cannot guarantee 100% uptime. Service may be interrupted for:</p>
                <ul className="mb-4">
                  <li>Scheduled maintenance and updates</li>
                  <li>Emergency security patches</li>
                  <li>Technical issues beyond our control</li>
                  <li>Force majeure events</li>
                </ul>

                <h4 className="fw-bold mb-3">Service Limitations</h4>
                <div className="table-responsive mb-4">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Resource</th>
                        <th>Limitation</th>
                        <th>Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>File Storage</td>
                        <td>Generated files stored for 1 year</td>
                        <td>Storage management</td>
                      </tr>
                      <tr>
                        <td>Website Processing</td>
                        <td>Up to 1000 pages per website</td>
                        <td>Performance optimization</td>
                      </tr>
                      <tr>
                        <td>Concurrent Requests</td>
                        <td>Reasonable use limits</td>
                        <td>Fair usage for all users</td>
                      </tr>
                      <tr>
                        <td>Support Response</td>
                        <td>48-72 hours</td>
                        <td>Quality support delivery</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <Alert variant="info" className="mb-0">
                  <FaCheckCircle className="react-icon me-2" />
                  <strong>Fair Usage:</strong> These limits ensure quality service for all users while keeping costs low.
                </Alert>
              </Card.Body>
            </Card>

            {/* Disclaimers & Warranties */}
            <Card className="card-modern mb-4">
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3">
                  <FaBalanceScale className="react-icon icon-left text-primary" />
                  Disclaimers & Warranties
                </h2>
                
                <h4 className="fw-bold mb-3">Service Disclaimer</h4>
                <div className="p-3 mb-4" style={{ background: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
                  <p className="mb-2"><strong>IMPORTANT:</strong> Our service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind.</p>
                  <ul className="mb-0">
                    <li>We don't guarantee specific AI ranking improvements</li>
                    <li>Results may vary based on your content and AI model changes</li>
                    <li>We cannot control how AI models use your optimized files</li>
                    <li>No warranty that the service will be error-free or uninterrupted</li>
                  </ul>
                </div>

                <h4 className="fw-bold mb-3">Limitation of Liability</h4>
                <p className="mb-3">To the maximum extent permitted by law:</p>
                <ul className="mb-4">
                  <li>Our total liability is limited to the amount you paid for our service (€19.99)</li>
                  <li>We are not liable for indirect, consequential, or punitive damages</li>
                  <li>We are not responsible for loss of profits, data, or business opportunities</li>
                  <li>You use our service at your own risk</li>
                </ul>

                <h4 className="fw-bold mb-3">Your Acknowledgment</h4>
                <div className="p-3" style={{ background: '#f0f9ff', borderRadius: '8px' }}>
                  <p className="mb-2">By using our service, you acknowledge that:</p>
                  <ul className="mb-0">
                    <li>AI search optimization is an emerging field with no guarantees</li>
                    <li>Our €19.99/year pricing reflects the experimental nature of the service</li>
                    <li>You are responsible for backing up your important data</li>
                    <li>You understand the limitations and risks involved</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>

            {/* Termination */}
            <Card className="card-modern mb-4">
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3">
                  <FaBan className="react-icon icon-left text-primary" />
                  Account Termination
                </h2>
                
                <h4 className="fw-bold mb-3">Your Right to Terminate</h4>
                <p className="mb-3">You may terminate your account at any time by:</p>
                <ul className="mb-4">
                  <li>Cancelling your subscription in your dashboard</li>
                  <li>Contacting our support team</li>
                  <li>Your termination takes effect at the end of your billing period</li>
                  <li>You retain access to your files until termination</li>
                </ul>

                <h4 className="fw-bold mb-3">Our Right to Terminate</h4>
                <div className="p-3 mb-4" style={{ background: '#fef2f2', borderRadius: '8px' }}>
                  <p className="mb-2"><strong>We may terminate or suspend your account if you:</strong></p>
                  <ul className="mb-2">
                    <li>Violate these Terms of Service</li>
                    <li>Use our service for prohibited purposes</li>
                    <li>Fail to pay subscription fees</li>
                    <li>Engage in abusive or harmful behavior</li>
                    <li>Attempt to compromise our platform security</li>
                  </ul>
                  <small className="text-muted">We will provide notice when possible, except for serious violations.</small>
                </div>

                <h4 className="fw-bold mb-3">Effect of Termination</h4>
                <ul className="mb-4">
                  <li>Your access to the platform will cease immediately</li>
                  <li>Generated files will be available for download for 30 days</li>
                  <li>Your personal data will be deleted according to our Privacy Policy</li>
                  <li>You remain responsible for any outstanding charges</li>
                </ul>

                <Alert variant="warning" className="mb-0">
                  <FaTrash className="react-icon me-2" />
                  <strong>Data Backup:</strong> Download your files before termination - we cannot recover deleted data.
                </Alert>
              </Card.Body>
            </Card>

            {/* Governing Law */}
            <Card className="card-modern mb-4">
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3">
                  <FaGavel className="react-icon icon-left text-primary" />
                  Governing Law & Disputes
                </h2>
                
                <h4 className="fw-bold mb-3">Applicable Law</h4>
                <p className="mb-4">
                  These Terms are governed by and construed in accordance with the laws of the European Union and the jurisdiction where our company is incorporated, without regard to conflict of law principles.
                </p>

                <h4 className="fw-bold mb-3">Dispute Resolution</h4>
                <div className="p-3 mb-4" style={{ background: '#f0f9ff', borderRadius: '8px' }}>
                  <p className="mb-2"><strong>We prefer to resolve disputes amicably:</strong></p>
                  <ol className="mb-0">
                    <li><strong>Contact Us First:</strong> Email support@mindfulrank.com with your concerns</li>
                    <li><strong>Good Faith Discussion:</strong> We'll work together to find a solution</li>
                    <li><strong>Mediation:</strong> If needed, we can engage a neutral third party</li>
                    <li><strong>Legal Action:</strong> As a last resort, through EU courts</li>
                  </ol>
                </div>

                <h4 className="fw-bold mb-3">Class Action Waiver</h4>
                <p className="mb-0">
                  You agree to resolve disputes individually and waive the right to participate in class actions or collective proceedings against us.
                </p>
              </Card.Body>
            </Card>

            {/* Changes to Terms */}
            <Card className="card-modern mb-4">
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3">
                  <FaCalendarAlt className="react-icon icon-left text-primary" />
                  Changes to These Terms
                </h2>
                
                <p className="mb-3">We may update these Terms from time to time to reflect:</p>
                <ul className="mb-4">
                  <li>Changes in our service features</li>
                  <li>Legal or regulatory requirements</li>
                  <li>Industry best practices</li>
                  <li>User feedback and improvements</li>
                </ul>

                <h4 className="fw-bold mb-3">How We Notify You</h4>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <div className="p-3" style={{ background: '#f0fdf4', borderRadius: '8px' }}>
                      <h5 className="fw-bold mb-2">Minor Changes</h5>
                      <ul className="mb-0 small">
                        <li>Updated date on this page</li>
                        <li>Dashboard notification</li>
                        <li>30 days to review</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3" style={{ background: '#fef3c7', borderRadius: '8px' }}>
                      <h5 className="fw-bold mb-2">Major Changes</h5>
                      <ul className="mb-0 small">
                        <li>Email notification</li>
                        <li>Dashboard alert</li>
                        <li>60 days to review</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Alert variant="info" className="mb-0">
                  <FaCheckCircle className="react-icon me-2" />
                  <strong>Your Acceptance:</strong> Continued use of our service after changes constitutes acceptance of the new terms.
                </Alert>
              </Card.Body>
            </Card>

            {/* Contact Information */}
            <Card className="card-modern mb-4">
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3">
                  <FaEnvelope className="react-icon icon-left text-primary" />
                  Contact & Support
                </h2>
                
                <p className="mb-4">
                  If you have questions about these Terms or need support with our service, please reach out to us:
                </p>
                
                <Row className="g-4">
                  <Col md={6}>
                    <div className="p-3" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                      <h5 className="fw-bold mb-2">General Support</h5>
                      <p className="mb-1"><strong>Email:</strong> support@mindfulrank.com</p>
                      <p className="mb-1"><strong>Response Time:</strong> 48-72 hours</p>
                      <p className="mb-0"><strong>Languages:</strong> English</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="p-3" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                      <h5 className="fw-bold mb-2">Legal Inquiries</h5>
                      <p className="mb-1"><strong>Email:</strong> legal@mindfulrank.com</p>
                      <p className="mb-1"><strong>For:</strong> Terms questions, disputes</p>
                      <p className="mb-0"><strong>Response:</strong> Within 5 business days</p>
                    </div>
                  </Col>
                </Row>

                <div className="mt-4 p-3" style={{ background: '#e8f5e8', borderRadius: '8px' }}>
                  <h5 className="fw-bold mb-2">
                    <FaHandshake className="react-icon icon-left text-success" />
                    Our Commitment
                  </h5>
                  <p className="mb-0">
                    We're committed to providing clear terms, fair service, and responsive support. Your success with AI optimization is our goal, and we're here to help you achieve it within these reasonable terms.
                  </p>
                </div>
              </Card.Body>
            </Card>

            {/* Summary */}
            <Card className="card-modern mb-4" style={{ border: '2px solid #10b981' }}>
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3 text-success">
                  <FaCheckCircle className="react-icon icon-left" />
                  Terms Summary (TL;DR)
                </h2>
                
                <Row className="g-3">
                  <Col md={6}>
                    <div className="p-3" style={{ background: '#f0fdf4', borderRadius: '8px' }}>
                      <h5 className="fw-bold mb-2">✅ What You Get</h5>
                      <ul className="mb-0 small">
                        <li>LLM optimization service for €19.99/year</li>
                        <li>Unlimited websites and file generation</li>
                        <li>Your content remains yours</li>
                        <li>Fair usage and responsive support</li>
                      </ul>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="p-3" style={{ background: '#fef2f2', borderRadius: '8px' }}>
                      <h5 className="fw-bold mb-2">⚠️ What You Must Do</h5>
                      <ul className="mb-0 small">
                        <li>Only process websites you own/control</li>
                        <li>Use the service legally and appropriately</li>
                        <li>Pay your subscription and follow these terms</li>
                        <li>No refunds due to low pricing</li>
                      </ul>
                    </div>
                  </Col>
                </Row>

                <div className="mt-3 text-center">
                  <Badge bg="success" className="px-3 py-2">
                    <FaBalanceScale className="react-icon me-2" />
                    Fair Terms • Clear Service • Great Value
                  </Badge>
                </div>
              </Card.Body>
            </Card>

          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TermsOfServicePage; 