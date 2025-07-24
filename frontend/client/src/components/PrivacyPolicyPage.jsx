import React from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { 
  FaShieldAlt, FaLock, FaUserShield, FaDatabase, FaGlobe,
  FaCheckCircle, FaExclamationTriangle, FaEnvelope, FaCalendarAlt,
  FaCogs, FaTrash, FaEdit, FaDownload, FaUsers, FaServer
} from 'react-icons/fa';

const PrivacyPolicyPage = () => {
  return (
    <>
      {/* Privacy Policy Hero */}
      <section style={{ 
        background: 'linear-gradient(135deg, #1e40af 0%, #3730a3 100%)', 
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
                <FaShieldAlt className="react-icon icon-left" style={{ color: '#ffd700' }} />
                <span className="fw-bold">Privacy & Security</span>
              </div>

              <h1 className="display-3 fw-bold mb-4">
                Privacy Policy
              </h1>
              
              <p className="fs-4 mb-4" style={{ opacity: '0.9', maxWidth: '700px', margin: '0 auto' }}>
                Your privacy is our priority. Learn how we protect, collect, and use your data responsibly.
              </p>

              <Alert variant="info" className="text-start">
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
                  <FaUserShield className="react-icon icon-left text-primary" />
                  Introduction
                </h2>
                <p className="text-lg mb-3">
                  Welcome to MindfulRank ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our LLM optimization platform and services.
                </p>
                <p className="mb-3">
                  By using our service, you consent to the data practices described in this policy. If you do not agree with this policy, please do not use our services.
                </p>
                <Alert variant="success" className="mb-0">
                  <FaCheckCircle className="react-icon me-2" />
                  <strong>Our Commitment:</strong> We are committed to protecting your privacy and being transparent about our data practices.
                </Alert>
              </Card.Body>
            </Card>

            {/* Information We Collect */}
            <Card className="card-modern mb-4">
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3">
                  <FaDatabase className="react-icon icon-left text-primary" />
                  Information We Collect
                </h2>

                <h4 className="fw-bold mb-3">Personal Information</h4>
                <p className="mb-3">We collect the following personal information:</p>
                <ul className="mb-4">
                  <li><strong>Account Information:</strong> Email address, encrypted password</li>
                  <li><strong>Website Data:</strong> URLs and names of websites you add to our platform</li>
                  <li><strong>Usage Data:</strong> How you interact with our platform (pages visited, features used)</li>
                  <li><strong>Communication Data:</strong> Messages you send us, testimonials you submit</li>
                </ul>

                <h4 className="fw-bold mb-3">Automatically Collected Information</h4>
                <ul className="mb-4">
                  <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
                  <li><strong>Log Data:</strong> Access times, pages viewed, errors encountered</li>
                  <li><strong>Cookies:</strong> Authentication tokens, preferences, analytics data</li>
                </ul>

                <h4 className="fw-bold mb-3">Website Content Data</h4>
                <p className="mb-0">
                  When you use our LLM file generation service, we temporarily access and process the public content of your websites to create optimization files. This content is processed automatically and is not stored permanently on our servers.
                </p>
              </Card.Body>
            </Card>

            {/* How We Use Information */}
            <Card className="card-modern mb-4">
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3">
                  <FaCogs className="react-icon icon-left text-primary" />
                  How We Use Your Information
                </h2>
                
                <p className="mb-3">We use your information for the following purposes:</p>
                
                <Row className="g-3 mb-4">
                  <Col md={6}>
                    <div className="p-3 border rounded">
                      <h5 className="fw-bold mb-2">
                        <FaGlobe className="react-icon icon-left text-success" />
                        Service Delivery
                      </h5>
                      <ul className="mb-0 small">
                        <li>Generate LLM optimization files</li>
                        <li>Process website content</li>
                        <li>Provide dashboard analytics</li>
                        <li>Maintain user accounts</li>
                      </ul>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="p-3 border rounded">
                      <h5 className="fw-bold mb-2">
                        <FaUsers className="react-icon icon-left text-info" />
                        Communication
                      </h5>
                      <ul className="mb-0 small">
                        <li>Send service notifications</li>
                        <li>Respond to support requests</li>
                        <li>Share platform updates</li>
                        <li>Process testimonials</li>
                      </ul>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="p-3 border rounded">
                      <h5 className="fw-bold mb-2">
                        <FaShieldAlt className="react-icon icon-left text-warning" />
                        Security & Legal
                      </h5>
                      <ul className="mb-0 small">
                        <li>Protect against fraud</li>
                        <li>Ensure platform security</li>
                        <li>Comply with legal obligations</li>
                        <li>Enforce terms of service</li>
                      </ul>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="p-3 border rounded">
                      <h5 className="fw-bold mb-2">
                        <FaCheckCircle className="react-icon icon-left text-primary" />
                        Improvement
                      </h5>
                      <ul className="mb-0 small">
                        <li>Analyze usage patterns</li>
                        <li>Improve our services</li>
                        <li>Develop new features</li>
                        <li>Fix technical issues</li>
                      </ul>
                    </div>
                  </Col>
                </Row>

                <Alert variant="warning">
                  <FaExclamationTriangle className="react-icon me-2" />
                  <strong>No Marketing:</strong> We do not use your data for marketing purposes or sell it to third parties.
                </Alert>
              </Card.Body>
            </Card>

            {/* Data Sharing */}
            <Card className="card-modern mb-4">
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3">
                  <FaUsers className="react-icon icon-left text-primary" />
                  How We Share Your Information
                </h2>
                
                <p className="mb-3">We do not sell, trade, or rent your personal information. We may share information only in these limited circumstances:</p>
                
                <div className="mb-4">
                  <h4 className="fw-bold mb-3">Service Providers</h4>
                  <p className="mb-2">We work with trusted third-party service providers who help us operate our platform:</p>
                  <ul className="mb-3">
                    <li><strong>Cloud Hosting:</strong> To store and process data securely</li>
                    <li><strong>Payment Processing:</strong> To handle subscription payments</li>
                    <li><strong>Analytics:</strong> To understand platform usage (anonymized data only)</li>
                  </ul>
                  <small className="text-muted">All service providers are contractually bound to protect your data and use it only for specified purposes.</small>
                </div>

                <div className="mb-4">
                  <h4 className="fw-bold mb-3">Legal Requirements</h4>
                  <p className="mb-0">We may disclose information if required by law, court order, or to:</p>
                  <ul className="mb-0">
                    <li>Comply with legal processes</li>
                    <li>Protect our rights and property</li>
                    <li>Ensure user safety</li>
                    <li>Investigate fraud or security issues</li>
                  </ul>
                </div>

                <Alert variant="info" className="mb-0">
                  <FaShieldAlt className="react-icon me-2" />
                  <strong>Transparency:</strong> We will notify you of any data requests unless prohibited by law.
                </Alert>
              </Card.Body>
            </Card>

            {/* Data Security */}
            <Card className="card-modern mb-4">
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3">
                  <FaLock className="react-icon icon-left text-primary" />
                  Data Security
                </h2>
                
                <p className="mb-4">We implement robust security measures to protect your information:</p>
                
                <Row className="g-3 mb-4">
                  <Col md={6}>
                    <div className="p-3" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                      <h5 className="fw-bold mb-2">
                        <FaServer className="react-icon icon-left text-success" />
                        Technical Safeguards
                      </h5>
                      <ul className="mb-0 small">
                        <li>SSL/TLS encryption in transit</li>
                        <li>AES-256 encryption at rest</li>
                        <li>Secure database configurations</li>
                        <li>Regular security audits</li>
                      </ul>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="p-3" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                      <h5 className="fw-bold mb-2">
                        <FaUserShield className="react-icon icon-left text-warning" />
                        Access Controls
                      </h5>
                      <ul className="mb-0 small">
                        <li>JWT token authentication</li>
                        <li>Role-based access control</li>
                        <li>Principle of least privilege</li>
                        <li>Regular access reviews</li>
                      </ul>
                    </div>
                  </Col>
                </Row>

                <Alert variant="warning">
                  <FaExclamationTriangle className="react-icon me-2" />
                  <strong>Data Breach Policy:</strong> In the unlikely event of a data breach, we will notify affected users within 72 hours and take immediate corrective action.
                </Alert>
              </Card.Body>
            </Card>

            {/* Your Rights */}
            <Card className="card-modern mb-4">
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3">
                  <FaUserShield className="react-icon icon-left text-primary" />
                  Your Privacy Rights
                </h2>
                
                <p className="mb-4">You have the following rights regarding your personal information:</p>
                
                <Row className="g-3 mb-4">
                  <Col md={6}>
                    <div className="d-flex align-items-start">
                      <FaEdit className="react-icon text-primary me-3 mt-1" />
                      <div>
                        <h5 className="fw-bold mb-1">Access & Update</h5>
                        <p className="mb-0 small">View and modify your account information and website data through your dashboard.</p>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="d-flex align-items-start">
                      <FaDownload className="react-icon text-success me-3 mt-1" />
                      <div>
                        <h5 className="fw-bold mb-1">Data Export</h5>
                        <p className="mb-0 small">Download your generated LLM files and account data at any time.</p>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="d-flex align-items-start">
                      <FaTrash className="react-icon text-danger me-3 mt-1" />
                      <div>
                        <h5 className="fw-bold mb-1">Delete Account</h5>
                        <p className="mb-0 small">Request complete deletion of your account and associated data.</p>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="d-flex align-items-start">
                      <FaExclamationTriangle className="react-icon text-warning me-3 mt-1" />
                      <div>
                        <h5 className="fw-bold mb-1">Correct Data</h5>
                        <p className="mb-0 small">Request correction of inaccurate or incomplete information.</p>
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="p-3" style={{ background: '#e3f2fd', borderRadius: '8px' }}>
                  <h5 className="fw-bold mb-2">How to Exercise Your Rights</h5>
                  <p className="mb-2">To exercise any of these rights:</p>
                  <ul className="mb-2">
                    <li>Use the settings in your dashboard for basic changes</li>
                    <li>Contact us at <strong>privacy@mindfulrank.com</strong> for complex requests</li>
                    <li>We will respond within 30 days of receiving your request</li>
                  </ul>
                  <small className="text-muted">Some requests may require identity verification for security purposes.</small>
                </div>
              </Card.Body>
            </Card>

            {/* Data Retention */}
            <Card className="card-modern mb-4">
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3">
                  <FaCalendarAlt className="react-icon icon-left text-primary" />
                  Data Retention
                </h2>
                
                <p className="mb-3">We retain your information for different periods based on the type of data:</p>
                
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Data Type</th>
                        <th>Retention Period</th>
                        <th>Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Account Information</td>
                        <td>Until account deletion</td>
                        <td>Service provision</td>
                      </tr>
                      <tr>
                        <td>Generated LLM Files</td>
                        <td>Until manually deleted</td>
                        <td>User access and downloads</td>
                      </tr>
                      <tr>
                        <td>Website Content (temporary)</td>
                        <td>Processing only (not stored)</td>
                        <td>File generation</td>
                      </tr>
                      <tr>
                        <td>Usage Logs</td>
                        <td>90 days</td>
                        <td>Security and troubleshooting</td>
                      </tr>
                      <tr>
                        <td>Payment Records</td>
                        <td>7 years</td>
                        <td>Legal and tax requirements</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <Alert variant="info" className="mb-0">
                  <FaTrash className="react-icon me-2" />
                  <strong>Automatic Deletion:</strong> When you delete your account, all personal data is permanently deleted within 30 days.
                </Alert>
              </Card.Body>
            </Card>

            {/* International Transfers */}
            <Card className="card-modern mb-4">
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3">
                  <FaGlobe className="react-icon icon-left text-primary" />
                  International Data Transfers
                </h2>
                
                <p className="mb-3">
                  Our servers are located in the European Union. If you are accessing our service from outside the EU, your information may be transferred to and processed in the EU.
                </p>
                
                <p className="mb-3">
                  We ensure adequate protection for international transfers through:
                </p>
                
                <ul className="mb-4">
                  <li>GDPR-compliant data processing agreements</li>
                  <li>Standard Contractual Clauses (SCCs) where applicable</li>
                  <li>Adequacy decisions by the European Commission</li>
                  <li>Strong technical and organizational security measures</li>
                </ul>

                <Alert variant="success" className="mb-0">
                  <FaCheckCircle className="react-icon me-2" />
                  <strong>EU Standards:</strong> All data processing meets or exceeds European Union privacy standards.
                </Alert>
              </Card.Body>
            </Card>

            {/* Children's Privacy */}
            <Card className="card-modern mb-4">
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3">
                  <FaUserShield className="react-icon icon-left text-primary" />
                  Children's Privacy
                </h2>
                
                <p className="mb-3">
                  Our service is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16.
                </p>
                
                <p className="mb-3">
                  If we learn that we have collected personal information from a child under 16, we will take steps to delete such information promptly.
                </p>

                <Alert variant="warning" className="mb-0">
                  <FaExclamationTriangle className="react-icon me-2" />
                  <strong>Parent/Guardian Notice:</strong> If you believe your child has provided us with personal information, please contact us immediately at privacy@mindfulrank.com.
                </Alert>
              </Card.Body>
            </Card>

            {/* Changes to Policy */}
            <Card className="card-modern mb-4">
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3">
                  <FaEdit className="react-icon icon-left text-primary" />
                  Changes to This Privacy Policy
                </h2>
                
                <p className="mb-3">
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.
                </p>
                
                <p className="mb-3">When we make changes:</p>
                <ul className="mb-4">
                  <li>We will update the "Last Updated" date at the top of this policy</li>
                  <li>For material changes, we will notify you via email or dashboard notification</li>
                  <li>You will have 30 days to review changes before they take effect</li>
                  <li>Continued use of our service constitutes acceptance of the updated policy</li>
                </ul>

                <Alert variant="info" className="mb-0">
                  <FaEnvelope className="react-icon me-2" />
                  <strong>Stay Informed:</strong> We recommend reviewing this policy periodically to stay informed about how we protect your information.
                </Alert>
              </Card.Body>
            </Card>

            {/* Contact Information */}
            <Card className="card-modern mb-4">
              <Card.Body className="p-4">
                <h2 className="h3 fw-bold mb-3">
                  <FaEnvelope className="react-icon icon-left text-primary" />
                  Contact Us
                </h2>
                
                <p className="mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                
                <Row className="g-4">
                  <Col md={6}>
                    <div className="p-3" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                      <h5 className="fw-bold mb-2">Privacy Inquiries</h5>
                      <p className="mb-1"><strong>Email:</strong> privacy@mindfulrank.com</p>
                      <p className="mb-1"><strong>Response Time:</strong> Within 48 hours</p>
                      <p className="mb-0"><strong>Language:</strong> English</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="p-3" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                      <h5 className="fw-bold mb-2">Data Protection Officer</h5>
                      <p className="mb-1"><strong>Email:</strong> dpo@mindfulrank.com</p>
                      <p className="mb-1"><strong>For:</strong> GDPR-related requests</p>
                      <p className="mb-0"><strong>Response:</strong> Within 30 days</p>
                    </div>
                  </Col>
                </Row>

                <div className="mt-4 p-3" style={{ background: '#e8f5e8', borderRadius: '8px' }}>
                  <h5 className="fw-bold mb-2">
                    <FaCheckCircle className="react-icon icon-left text-success" />
                    Our Commitment to You
                  </h5>
                  <p className="mb-0">
                    We are committed to protecting your privacy and handling your data responsibly. Your trust is important to us, and we strive to be transparent about our data practices and responsive to your concerns.
                  </p>
                </div>
              </Card.Body>
            </Card>

          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PrivacyPolicyPage; 