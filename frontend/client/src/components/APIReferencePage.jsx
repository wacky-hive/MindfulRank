import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaCode, FaKey, FaServer, FaDownload, FaUpload, FaGlobe,
  FaCheckCircle, FaInfoCircle, FaExclamationTriangle, FaLightbulb,
  FaRocket, FaCogs, FaDatabase, FaLock, FaUsers, FaQuestionCircle,
  FaPlay, FaCopy, FaFileCode
} from 'react-icons/fa';

const APIReferencePage = () => {
  const [activeEndpoint, setActiveEndpoint] = useState('overview');
  const [copiedCode, setCopiedCode] = useState('');

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <>
      {/* API Hero */}
      <section style={{ 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)', 
        color: 'white',
        padding: '4rem 0 2rem' 
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
                <FaCode className="react-icon icon-left" style={{ color: '#ffd700' }} />
                <span className="fw-bold">⚡ Developer API</span>
              </div>

              <h1 className="display-3 fw-bold mb-4">
                LLM Optimization API
                <span className="d-block" style={{ color: '#ffd700' }}>Reference Guide</span>
              </h1>
              
              <p className="fs-4 mb-4" style={{ opacity: '0.9', maxWidth: '600px', margin: '0 auto' }}>
                Integrate professional LLM file generation directly into your applications and workflows
              </p>

              <div className="d-flex gap-3 justify-content-center flex-wrap mb-4">
                <Badge bg="success" className="px-3 py-2">REST API</Badge>
                <Badge bg="info" className="px-3 py-2">JSON Response</Badge>
                <Badge bg="warning" className="px-3 py-2">Rate Limited</Badge>
                <Badge bg="primary" className="px-3 py-2">Authenticated</Badge>
              </div>

              <div className="d-flex gap-3 justify-content-center">
                <Button 
                  as={Link}
                  to="/api-pricing"
                  variant="light" 
                  size="lg"
                >
                  <FaRocket className="react-icon icon-left" />
                  View Pricing
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg"
                  onClick={() => setActiveEndpoint('overview')}
                >
                  <FaPlay className="react-icon icon-left" />
                  Quick Start
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="my-5">
        <Row>
          {/* API Navigation Sidebar */}
          <Col lg={3} className="mb-4">
            <Card className="card-modern position-sticky" style={{ top: '100px' }}>
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3">API Endpoints</h5>
                <nav>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <Button 
                        variant="link" 
                        className={`text-start p-0 text-decoration-none ${activeEndpoint === 'overview' ? 'fw-bold text-primary' : 'text-muted'}`}
                        onClick={() => setActiveEndpoint('overview')}
                      >
                        Getting Started
                      </Button>
                    </li>
                    <li className="mb-2">
                      <Button 
                        variant="link" 
                        className={`text-start p-0 text-decoration-none ${activeEndpoint === 'auth' ? 'fw-bold text-primary' : 'text-muted'}`}
                        onClick={() => setActiveEndpoint('auth')}
                      >
                        Authentication
                      </Button>
                    </li>
                    <li className="mb-2">
                      <Button 
                        variant="link" 
                        className={`text-start p-0 text-decoration-none ${activeEndpoint === 'generate' ? 'fw-bold text-primary' : 'text-muted'}`}
                        onClick={() => setActiveEndpoint('generate')}
                      >
                        Generate Files
                      </Button>
                    </li>
                    <li className="mb-2">
                      <Button 
                        variant="link" 
                        className={`text-start p-0 text-decoration-none ${activeEndpoint === 'status' ? 'fw-bold text-primary' : 'text-muted'}`}
                        onClick={() => setActiveEndpoint('status')}
                      >
                        Check Status
                      </Button>
                    </li>
                    <li className="mb-2">
                      <Button 
                        variant="link" 
                        className={`text-start p-0 text-decoration-none ${activeEndpoint === 'download' ? 'fw-bold text-primary' : 'text-muted'}`}
                        onClick={() => setActiveEndpoint('download')}
                      >
                        Download Files
                      </Button>
                    </li>
                    <li className="mb-2">
                      <Button 
                        variant="link" 
                        className={`text-start p-0 text-decoration-none ${activeEndpoint === 'webhooks' ? 'fw-bold text-primary' : 'text-muted'}`}
                        onClick={() => setActiveEndpoint('webhooks')}
                      >
                        Webhooks
                      </Button>
                    </li>
                    <li className="mb-2">
                      <Button 
                        variant="link" 
                        className={`text-start p-0 text-decoration-none ${activeEndpoint === 'errors' ? 'fw-bold text-primary' : 'text-muted'}`}
                        onClick={() => setActiveEndpoint('errors')}
                      >
                        Error Codes
                      </Button>
                    </li>
                  </ul>
                </nav>
              </Card.Body>
            </Card>
          </Col>

          {/* Main API Content */}
          <Col lg={9}>
            {/* Getting Started */}
            <section className="mb-5">
              <Card className="card-modern">
                <Card.Body className="p-5">
                  <h2 className="text-3xl fw-bold mb-4">
                    <FaRocket className="react-icon icon-left text-primary" />
                    Getting Started
                  </h2>
                  
                  <Alert variant="info" className="mb-4">
                    <FaInfoCircle className="react-icon me-2" />
                    <strong>Base URL:</strong> <code>https://api.mindfulrank.com/v1</code>
                  </Alert>

                  <p className="text-lg mb-4">
                    The MindfulRank API allows you to programmatically generate LLM optimization files for any website. 
                    Perfect for agencies, SaaS platforms, and automated workflows.
                  </p>

                  <h4 className="fw-bold mb-3">Use Cases</h4>
                  <Row className="g-4 mb-4">
                    <Col md={6}>
                      <div className="p-4 border rounded">
                        <h6 className="fw-bold mb-2">
                          <FaUsers className="react-icon icon-left text-primary" />
                          Agency Integration
                        </h6>
                        <p className="mb-0 text-muted">Offer LLM optimization as part of your SEO services</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="p-4 border rounded">
                        <h6 className="fw-bold mb-2">
                          <FaCogs className="react-icon icon-left text-primary" />
                          Automated Workflows
                        </h6>
                        <p className="mb-0 text-muted">Integrate with CI/CD pipelines and deployment systems</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="p-4 border rounded">
                        <h6 className="fw-bold mb-2">
                          <FaGlobe className="react-icon icon-left text-primary" />
                          Multi-Site Management
                        </h6>
                        <p className="mb-0 text-muted">Manage LLM optimization for hundreds of websites</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="p-4 border rounded">
                        <h6 className="fw-bold mb-2">
                          <FaDatabase className="react-icon icon-left text-primary" />
                          Platform Integration
                        </h6>
                        <p className="mb-0 text-muted">Build LLM optimization into your existing platform</p>
                      </div>
                    </Col>
                  </Row>

                  <h4 className="fw-bold mb-3">Quick Start</h4>
                  <div className="p-4 bg-dark text-white rounded mb-3 position-relative">
                    <Button 
                      variant="outline-light" 
                      size="sm" 
                      className="position-absolute top-0 end-0 m-2"
                      onClick={() => copyToClipboard('curl -X POST https://api.mindfulrank.com/v1/generate \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"url": "https://example.com"}\'', 'quickstart')}
                    >
                      {copiedCode === 'quickstart' ? <FaCheckCircle /> : <FaCopy />}
                    </Button>
                    <pre className="mb-0">
                      <code>{`curl -X POST https://api.mindfulrank.com/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com"}'`}</code>
                    </pre>
                  </div>
                </Card.Body>
              </Card>
            </section>

            {/* Authentication */}
            <section className="mb-5">
              <Card className="card-modern">
                <Card.Body className="p-5">
                  <h2 className="text-3xl fw-bold mb-4">
                    <FaLock className="react-icon icon-left text-primary" />
                    Authentication
                  </h2>
                  
                  <p className="text-lg mb-4">
                    All API requests require authentication using an API key. Include your API key in the Authorization header.
                  </p>

                  <Alert variant="warning" className="mb-4">
                    <FaExclamationTriangle className="react-icon me-2" />
                    <strong>Security:</strong> Never expose your API key in client-side code. Always use server-side requests.
                  </Alert>

                  <h4 className="fw-bold mb-3">Getting Your API Key</h4>
                  <ol className="mb-4">
                    <li>Log in to your MindfulRank dashboard</li>
                    <li>Navigate to API Settings</li>
                    <li>Generate a new API key</li>
                    <li>Copy and securely store your key</li>
                  </ol>

                  <h4 className="fw-bold mb-3">Authentication Example</h4>
                  <div className="p-4 bg-dark text-white rounded mb-3 position-relative">
                    <Button 
                      variant="outline-light" 
                      size="sm" 
                      className="position-absolute top-0 end-0 m-2"
                      onClick={() => copyToClipboard('Authorization: Bearer sk_live_1234567890abcdef', 'auth')}
                    >
                      {copiedCode === 'auth' ? <FaCheckCircle /> : <FaCopy />}
                    </Button>
                    <pre className="mb-0">
                      <code>Authorization: Bearer sk_live_1234567890abcdef</code>
                    </pre>
                  </div>

                  <h4 className="fw-bold mb-3">Rate Limits</h4>
                  <Table bordered className="mb-4">
                    <thead>
                      <tr>
                        <th>Plan</th>
                        <th>Requests/Hour</th>
                        <th>Requests/Day</th>
                        <th>Concurrent Jobs</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Starter</td>
                        <td>100</td>
                        <td>1,000</td>
                        <td>5</td>
                      </tr>
                      <tr>
                        <td>Professional</td>
                        <td>500</td>
                        <td>10,000</td>
                        <td>25</td>
                      </tr>
                      <tr>
                        <td>Enterprise</td>
                        <td>2,000</td>
                        <td>50,000</td>
                        <td>100</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </section>

            {/* Generate Files Endpoint */}
            <section className="mb-5">
              <Card className="card-modern">
                <Card.Body className="p-5">
                  <h2 className="text-3xl fw-bold mb-4">
                    <FaFileCode className="react-icon icon-left text-primary" />
                    Generate LLM Files
                  </h2>
                  
                  <Badge bg="primary" className="mb-3">POST /v1/generate</Badge>
                  
                  <p className="text-lg mb-4">
                    Creates LLM optimization files for a specified website. This endpoint analyzes the website and generates both llms.txt and llms-full.txt files.
                  </p>

                  <h4 className="fw-bold mb-3">Request Parameters</h4>
                  <Table bordered className="mb-4">
                    <thead>
                      <tr>
                        <th>Parameter</th>
                        <th>Type</th>
                        <th>Required</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>url</code></td>
                        <td>string</td>
                        <td>Yes</td>
                        <td>The website URL to analyze</td>
                      </tr>
                      <tr>
                        <td><code>include_full</code></td>
                        <td>boolean</td>
                        <td>No</td>
                        <td>Generate llms-full.txt file (default: true)</td>
                      </tr>
                      <tr>
                        <td><code>max_pages</code></td>
                        <td>integer</td>
                        <td>No</td>
                        <td>Maximum pages to analyze (default: 1000)</td>
                      </tr>
                      <tr>
                        <td><code>webhook_url</code></td>
                        <td>string</td>
                        <td>No</td>
                        <td>Webhook URL for completion notification</td>
                      </tr>
                    </tbody>
                  </Table>

                  <h4 className="fw-bold mb-3">Example Request</h4>
                  <div className="p-4 bg-dark text-white rounded mb-3 position-relative">
                    <Button 
                      variant="outline-light" 
                      size="sm" 
                      className="position-absolute top-0 end-0 m-2"
                      onClick={() => copyToClipboard(`curl -X POST https://api.mindfulrank.com/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com",
    "include_full": true,
    "max_pages": 500,
    "webhook_url": "https://yoursite.com/webhook"
  }'`, 'generate')}
                    >
                      {copiedCode === 'generate' ? <FaCheckCircle /> : <FaCopy />}
                    </Button>
                    <pre className="mb-0">
                      <code>{`curl -X POST https://api.mindfulrank.com/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com",
    "include_full": true,
    "max_pages": 500,
    "webhook_url": "https://yoursite.com/webhook"
  }'`}</code>
                    </pre>
                  </div>

                  <h4 className="fw-bold mb-3">Example Response</h4>
                  <div className="p-4 bg-light rounded mb-3">
                    <pre className="mb-0">
                      <code>{`{
  "job_id": "job_1234567890abcdef",
  "status": "processing",
  "url": "https://example.com",
  "created_at": "2024-01-15T10:30:00Z",
  "estimated_completion": "2024-01-15T10:35:00Z",
  "files": {
    "llms_txt": null,
    "llms_full_txt": null
  }
}`}</code>
                    </pre>
                  </div>
                </Card.Body>
              </Card>
            </section>

            {/* Status Check Endpoint */}
            <section className="mb-5">
              <Card className="card-modern">
                <Card.Body className="p-5">
                  <h2 className="text-3xl fw-bold mb-4">
                    <FaServer className="react-icon icon-left text-primary" />
                    Check Job Status
                  </h2>
                  
                  <Badge bg="success" className="mb-3">GET /v1/jobs/&#123;job_id&#125;</Badge>
                  
                  <p className="text-lg mb-4">
                    Check the status of a file generation job. Returns current progress and download links when complete.
                  </p>

                  <h4 className="fw-bold mb-3">Example Request</h4>
                  <div className="p-4 bg-dark text-white rounded mb-3 position-relative">
                    <Button 
                      variant="outline-light" 
                      size="sm" 
                      className="position-absolute top-0 end-0 m-2"
                      onClick={() => copyToClipboard('curl -H "Authorization: Bearer YOUR_API_KEY" \\\n  https://api.mindfulrank.com/v1/jobs/job_1234567890abcdef', 'status')}
                    >
                      {copiedCode === 'status' ? <FaCheckCircle /> : <FaCopy />}
                    </Button>
                    <pre className="mb-0">
                      <code>{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.mindfulrank.com/v1/jobs/job_1234567890abcdef`}</code>
                    </pre>
                  </div>

                  <h4 className="fw-bold mb-3">Example Response (Completed)</h4>
                  <div className="p-4 bg-light rounded mb-3">
                    <pre className="mb-0">
                      <code>{`{
  "job_id": "job_1234567890abcdef",
  "status": "completed",
  "url": "https://example.com",
  "created_at": "2024-01-15T10:30:00Z",
  "completed_at": "2024-01-15T10:34:30Z",
  "files": {
    "llms_txt": {
      "size": 2048,
      "download_url": "https://api.mindfulrank.com/v1/download/llms_abc123.txt"
    },
    "llms_full_txt": {
      "size": 524288,
      "download_url": "https://api.mindfulrank.com/v1/download/llms_full_abc123.txt"
    }
  },
  "statistics": {
    "pages_analyzed": 247,
    "content_size": "1.2MB",
    "processing_time": "4.5s"
  }
}`}</code>
                    </pre>
                  </div>

                  <h4 className="fw-bold mb-3">Status Values</h4>
                  <Table bordered className="mb-4">
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><Badge bg="warning">pending</Badge></td>
                        <td>Job is queued for processing</td>
                      </tr>
                      <tr>
                        <td><Badge bg="primary">processing</Badge></td>
                        <td>Currently analyzing website and generating files</td>
                      </tr>
                      <tr>
                        <td><Badge bg="success">completed</Badge></td>
                        <td>Files generated successfully and ready for download</td>
                      </tr>
                      <tr>
                        <td><Badge bg="danger">failed</Badge></td>
                        <td>Job failed due to error (see error field)</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </section>

            {/* Download Files */}
            <section className="mb-5">
              <Card className="card-modern">
                <Card.Body className="p-5">
                  <h2 className="text-3xl fw-bold mb-4">
                    <FaDownload className="react-icon icon-left text-primary" />
                    Download Files
                  </h2>
                  
                  <Badge bg="success" className="mb-3">GET /v1/download/&#123;file_id&#125;</Badge>
                  
                  <p className="text-lg mb-4">
                    Download generated LLM files using the download URLs provided in the job status response.
                  </p>

                  <Alert variant="info" className="mb-4">
                    <FaInfoCircle className="react-icon me-2" />
                    <strong>File Expiry:</strong> Download links are valid for 7 days after generation.
                  </Alert>

                  <h4 className="fw-bold mb-3">Example Request</h4>
                  <div className="p-4 bg-dark text-white rounded mb-3 position-relative">
                    <Button 
                      variant="outline-light" 
                      size="sm" 
                      className="position-absolute top-0 end-0 m-2"
                      onClick={() => copyToClipboard('curl -H "Authorization: Bearer YOUR_API_KEY" \\\n  https://api.mindfulrank.com/v1/download/llms_abc123.txt \\\n  --output llms.txt', 'download')}
                    >
                      {copiedCode === 'download' ? <FaCheckCircle /> : <FaCopy />}
                    </Button>
                    <pre className="mb-0">
                      <code>{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.mindfulrank.com/v1/download/llms_abc123.txt \\
  --output llms.txt`}</code>
                    </pre>
                  </div>
                </Card.Body>
              </Card>
            </section>

            {/* Error Codes */}
            <section className="mb-5">
              <Card className="card-modern">
                <Card.Body className="p-5">
                  <h2 className="text-3xl fw-bold mb-4">
                    <FaExclamationTriangle className="react-icon icon-left text-primary" />
                    Error Codes
                  </h2>
                  
                  <p className="text-lg mb-4">
                    The API uses standard HTTP status codes and provides detailed error messages in JSON format.
                  </p>

                  <Table bordered className="mb-4">
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Status</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>200</td>
                        <td>OK</td>
                        <td>Request successful</td>
                      </tr>
                      <tr>
                        <td>201</td>
                        <td>Created</td>
                        <td>Job created successfully</td>
                      </tr>
                      <tr>
                        <td>400</td>
                        <td>Bad Request</td>
                        <td>Invalid request parameters</td>
                      </tr>
                      <tr>
                        <td>401</td>
                        <td>Unauthorized</td>
                        <td>Invalid or missing API key</td>
                      </tr>
                      <tr>
                        <td>404</td>
                        <td>Not Found</td>
                        <td>Job or resource not found</td>
                      </tr>
                      <tr>
                        <td>429</td>
                        <td>Too Many Requests</td>
                        <td>Rate limit exceeded</td>
                      </tr>
                      <tr>
                        <td>500</td>
                        <td>Internal Server Error</td>
                        <td>Server error occurred</td>
                      </tr>
                    </tbody>
                  </Table>

                  <h4 className="fw-bold mb-3">Error Response Format</h4>
                  <div className="p-4 bg-light rounded mb-3">
                    <pre className="mb-0">
                      <code>{`{
  "error": {
    "code": "invalid_url",
    "message": "The provided URL is not accessible or invalid",
    "details": "HTTP 404 returned when attempting to access https://invalid-site.com"
  }
}`}</code>
                    </pre>
                  </div>
                </Card.Body>
              </Card>
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default APIReferencePage; 