import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Accordion, Badge, Table } from 'react-bootstrap';
import { 
  FaFileAlt, FaDatabase, FaCode, FaDownload, FaUpload, FaGlobe,
  FaCheckCircle, FaInfoCircle, FaExclamationTriangle, FaLightbulb,
  FaRocket, FaCogs, FaSearch, FaBrain, FaUsers, FaQuestionCircle
} from 'react-icons/fa';

const DocumentationPage = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Documentation Hero */}
      <section style={{ 
        background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 100%)', 
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
                <FaFileAlt className="react-icon icon-left" style={{ color: '#ffd700' }} />
                <span className="fw-bold">📚 Complete Documentation</span>
              </div>

              <h1 className="display-3 fw-bold mb-4">
                LLMs.txt & LLMs-Full.txt
                <span className="d-block" style={{ color: '#ffd700' }}>Generation Guide</span>
              </h1>
              
              <p className="fs-4 mb-4" style={{ opacity: '0.9', maxWidth: '600px', margin: '0 auto' }}>
                Everything you need to know about our AI optimization file generation service
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="my-5">
        <Row>
          {/* Table of Contents Sidebar */}
          <Col lg={3} className="mb-4">
            <Card className="card-modern position-sticky" style={{ top: '100px' }}>
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3">Table of Contents</h5>
                <nav>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <Button 
                        variant="link" 
                        className={`text-start p-0 text-decoration-none ${activeSection === 'overview' ? 'fw-bold text-primary' : 'text-muted'}`}
                        onClick={() => scrollToSection('overview')}
                      >
                        Overview
                      </Button>
                    </li>
                    <li className="mb-2">
                      <Button 
                        variant="link" 
                        className={`text-start p-0 text-decoration-none ${activeSection === 'what-we-do' ? 'fw-bold text-primary' : 'text-muted'}`}
                        onClick={() => scrollToSection('what-we-do')}
                      >
                        What We Do
                      </Button>
                    </li>
                    <li className="mb-2">
                      <Button 
                        variant="link" 
                        className={`text-start p-0 text-decoration-none ${activeSection === 'file-types' ? 'fw-bold text-primary' : 'text-muted'}`}
                        onClick={() => scrollToSection('file-types')}
                      >
                        File Types
                      </Button>
                    </li>
                    <li className="mb-2">
                      <Button 
                        variant="link" 
                        className={`text-start p-0 text-decoration-none ${activeSection === 'how-it-works' ? 'fw-bold text-primary' : 'text-muted'}`}
                        onClick={() => scrollToSection('how-it-works')}
                      >
                        How It Works
                      </Button>
                    </li>
                    <li className="mb-2">
                      <Button 
                        variant="link" 
                        className={`text-start p-0 text-decoration-none ${activeSection === 'deployment' ? 'fw-bold text-primary' : 'text-muted'}`}
                        onClick={() => scrollToSection('deployment')}
                      >
                        Deployment Guide
                      </Button>
                    </li>
                    <li className="mb-2">
                      <Button 
                        variant="link" 
                        className={`text-start p-0 text-decoration-none ${activeSection === 'technical' ? 'fw-bold text-primary' : 'text-muted'}`}
                        onClick={() => scrollToSection('technical')}
                      >
                        Technical Specs
                      </Button>
                    </li>
                    <li className="mb-2">
                      <Button 
                        variant="link" 
                        className={`text-start p-0 text-decoration-none ${activeSection === 'faq' ? 'fw-bold text-primary' : 'text-muted'}`}
                        onClick={() => scrollToSection('faq')}
                      >
                        FAQ
                      </Button>
                    </li>
                  </ul>
                </nav>
              </Card.Body>
            </Card>
          </Col>

          {/* Main Documentation Content */}
          <Col lg={9}>
            {/* Overview Section */}
            <section id="overview" className="mb-5">
              <Card className="card-modern">
                <Card.Body className="p-5">
                  <h2 className="text-3xl fw-bold mb-4">
                    <FaInfoCircle className="react-icon icon-left text-primary" />
                    Overview
                  </h2>
                  <p className="text-lg mb-4">
                    MindfulRank is the world's leading automated service for generating professional LLM optimization files. 
                    We create <strong>llms.txt</strong> and <strong>llms-full.txt</strong> files that make your website discoverable 
                    and understandable by AI models and language models.
                  </p>
                  
                  <Row className="g-4">
                    <Col md={6}>
                      <div className="p-4" style={{ background: 'var(--primary-50)', borderRadius: '15px' }}>
                        <h5 className="fw-bold mb-3">🎯 What We Solve</h5>
                        <ul className="mb-0">
                          <li>AI models can't find your content</li>
                          <li>Poor LLM training data quality</li>
                          <li>Manual file creation is time-consuming</li>
                          <li>Technical complexity of optimization</li>
                        </ul>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="p-4" style={{ background: 'var(--success-50)', borderRadius: '15px' }}>
                        <h5 className="fw-bold mb-3">✅ What You Get</h5>
                        <ul className="mb-0">
                          <li>Professional-grade LLM files</li>
                          <li>Automated generation in minutes</li>
                          <li>Maximum AI discoverability</li>
                          <li>Enterprise-quality optimization</li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </section>

            {/* What We Do Section */}
            <section id="what-we-do" className="mb-5">
              <Card className="card-modern">
                <Card.Body className="p-5">
                  <h2 className="text-3xl fw-bold mb-4">
                    <FaBrain className="react-icon icon-left text-primary" />
                    What We Do
                  </h2>
                  <p className="text-lg mb-4">
                    Our AI-powered platform analyzes your website and automatically generates two types of optimization files 
                    specifically designed for Large Language Models (LLMs) and AI search engines.
                  </p>

                  <div className="alert alert-info d-flex align-items-center mb-4">
                    <FaLightbulb className="react-icon me-3" style={{ fontSize: '1.5rem' }} />
                    <div>
                      <strong>Why This Matters:</strong> As AI becomes the primary way people search for information, 
                      having properly formatted LLM files is becoming as essential as traditional SEO.
                    </div>
                  </div>

                  <h4 className="fw-bold mb-3">Our Core Services:</h4>
                  <Row className="g-4">
                    <Col md={6}>
                      <div className="p-4 border rounded">
                        <h5 className="fw-bold mb-3">
                          <FaFileAlt className="react-icon icon-left text-primary" />
                          Website Analysis
                        </h5>
                        <p>Our AI scans your entire website structure, content, and metadata to understand your site's architecture and identify optimization opportunities.</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="p-4 border rounded">
                        <h5 className="fw-bold mb-3">
                          <FaCogs className="react-icon icon-left text-primary" />
                          Content Processing
                        </h5>
                        <p>Advanced algorithms extract and process your content, organizing it in formats that AI models can easily understand and utilize.</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="p-4 border rounded">
                        <h5 className="fw-bold mb-3">
                          <FaRocket className="react-icon icon-left text-primary" />
                          File Generation
                        </h5>
                        <p>Automated creation of professional-grade llms.txt and llms-full.txt files following the latest AI model requirements and best practices.</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="p-4 border rounded">
                        <h5 className="fw-bold mb-3">
                          <FaDownload className="react-icon icon-left text-primary" />
                          Instant Delivery
                        </h5>
                        <p>Download your optimized files immediately and deploy them to your website for instant AI optimization benefits.</p>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </section>

            {/* File Types Section */}
            <section id="file-types" className="mb-5">
              <Card className="card-modern">
                <Card.Body className="p-5">
                  <h2 className="text-3xl fw-bold mb-4">
                    <FaDatabase className="react-icon icon-left text-primary" />
                    File Types Explained
                  </h2>
                  
                  <Row className="g-4">
                    <Col lg={6}>
                      <Card className="h-100" style={{ border: '2px solid var(--primary-200)' }}>
                        <Card.Body className="p-4">
                          <div style={{
                            width: '60px',
                            height: '60px',
                            background: 'var(--gradient-primary)',
                            borderRadius: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem'
                          }}>
                            <FaFileAlt className="react-icon" style={{ fontSize: '1.5rem', color: 'white' }} />
                          </div>
                          
                          <h4 className="fw-bold text-center mb-3">llms.txt</h4>
                          <p className="text-muted mb-3">
                            A structured guide file that tells AI models how to navigate and understand your website content.
                          </p>
                          
                          <h6 className="fw-bold mb-2">Contains:</h6>
                          <ul className="list-unstyled mb-3">
                            <li className="mb-1">✅ Site structure information</li>
                            <li className="mb-1">✅ Content priority directives</li>
                            <li className="mb-1">✅ Navigation guidelines</li>
                            <li className="mb-1">✅ Key page identifiers</li>
                          </ul>
                          
                          <Badge bg="primary" className="w-100 p-2">
                            File Size: 1-5KB | Format: Plain Text
                          </Badge>
                        </Card.Body>
                      </Card>
                    </Col>
                    
                    <Col lg={6}>
                      <Card className="h-100" style={{ border: '2px solid var(--success-200)' }}>
                        <Card.Body className="p-4">
                          <div style={{
                            width: '60px',
                            height: '60px',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            borderRadius: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem'
                          }}>
                            <FaDatabase className="react-icon" style={{ fontSize: '1.5rem', color: 'white' }} />
                          </div>
                          
                          <h4 className="fw-bold text-center mb-3">llms-full.txt</h4>
                          <p className="text-muted mb-3">
                            A comprehensive file containing your complete website content in AI-optimized format for maximum training data quality.
                          </p>
                          
                          <h6 className="fw-bold mb-2">Contains:</h6>
                          <ul className="list-unstyled mb-3">
                            <li className="mb-1">✅ Full page content</li>
                            <li className="mb-1">✅ Metadata and descriptions</li>
                            <li className="mb-1">✅ Structured data markup</li>
                            <li className="mb-1">✅ Complete text corpus</li>
                          </ul>
                          
                          <Badge bg="success" className="w-100 p-2">
                            File Size: 10KB-1MB+ | Format: Structured Text
                          </Badge>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="mb-5">
              <Card className="card-modern">
                <Card.Body className="p-5">
                  <h2 className="text-3xl fw-bold mb-4">
                    <FaCogs className="react-icon icon-left text-primary" />
                    How It Works
                  </h2>
                  
                  <div className="row g-4">
                    <div className="col-12">
                      <div className="d-flex align-items-center mb-4 p-4" style={{ background: 'var(--neutral-50)', borderRadius: '15px' }}>
                        <div className="step-indicator me-4">1</div>
                        <div>
                          <h5 className="fw-bold mb-2">Input Your Website URL</h5>
                          <p className="mb-0 text-muted">Simply provide your website URL through our platform. Our system begins immediate analysis of your site structure and content.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <div className="d-flex align-items-center mb-4 p-4" style={{ background: 'var(--neutral-50)', borderRadius: '15px' }}>
                        <div className="step-indicator me-4">2</div>
                        <div>
                          <h5 className="fw-bold mb-2">AI-Powered Analysis</h5>
                          <p className="mb-0 text-muted">Our advanced AI crawls your website, analyzing content structure, identifying key pages, and understanding your site's information architecture.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <div className="d-flex align-items-center mb-4 p-4" style={{ background: 'var(--neutral-50)', borderRadius: '15px' }}>
                        <div className="step-indicator me-4">3</div>
                        <div>
                          <h5 className="fw-bold mb-2">Content Processing</h5>
                          <p className="mb-0 text-muted">Content is extracted, cleaned, and organized according to LLM requirements. We optimize formatting for maximum AI comprehension.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <div className="d-flex align-items-center mb-4 p-4" style={{ background: 'var(--primary-50)', borderRadius: '15px' }}>
                        <div className="step-indicator me-4">4</div>
                        <div>
                          <h5 className="fw-bold mb-2">File Generation & Download</h5>
                          <p className="mb-0 text-muted">Both llms.txt and llms-full.txt files are generated automatically. Download them instantly and deploy to your website root directory.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </section>

            {/* Deployment Guide Section */}
            <section id="deployment" className="mb-5">
              <Card className="card-modern">
                <Card.Body className="p-5">
                  <h2 className="text-3xl fw-bold mb-4">
                    <FaUpload className="react-icon icon-left text-primary" />
                    Deployment Guide
                  </h2>
                  
                  <div className="alert alert-warning d-flex align-items-center mb-4">
                    <FaExclamationTriangle className="react-icon me-3" />
                    <div>
                      <strong>Important:</strong> Both files must be uploaded to your website's root directory for AI models to discover them properly.
                    </div>
                  </div>

                  <h4 className="fw-bold mb-3">Step-by-Step Deployment:</h4>
                  
                  <Accordion className="mb-4">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <strong>Step 1: Download Your Files</strong>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>After generation is complete, download both files from your dashboard:</p>
                        <ul>
                          <li><code>llms.txt</code> - Your structure guide file</li>
                          <li><code>llms-full.txt</code> - Your complete content file</li>
                        </ul>
                        <p className="mb-0">Save them to your local computer in an easily accessible location.</p>
                      </Accordion.Body>
                    </Accordion.Item>
                    
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        <strong>Step 2: Access Your Website Root Directory</strong>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>Connect to your website's root directory using one of these methods:</p>
                        <ul>
                          <li><strong>FTP/SFTP:</strong> Use FileZilla, WinSCP, or similar FTP client</li>
                          <li><strong>cPanel File Manager:</strong> Through your hosting control panel</li>
                          <li><strong>WordPress Admin:</strong> Via file manager plugin or direct access</li>
                          <li><strong>Server SSH:</strong> Direct command-line access</li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                    
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        <strong>Step 3: Upload to Root Directory</strong>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>Upload both files to the same directory where your main website files are located (alongside index.html, robots.txt, etc.):</p>
                        <div className="p-3 bg-light rounded mb-3">
                          <code>
                            yourwebsite.com/llms.txt<br/>
                            yourwebsite.com/llms-full.txt
                          </code>
                        </div>
                        <p className="mb-0"><strong>DO NOT</strong> upload to subdirectories like /content/ or /files/</p>
                      </Accordion.Body>
                    </Accordion.Item>
                    
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>
                        <strong>Step 4: Verify Deployment</strong>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>Test that your files are accessible by visiting these URLs in your browser:</p>
                        <ul>
                          <li><code>https://yoursite.com/llms.txt</code></li>
                          <li><code>https://yoursite.com/llms-full.txt</code></li>
                        </ul>
                        <p className="mb-0">If you can see the file contents, deployment was successful!</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  <div className="p-4" style={{ background: 'var(--success-50)', borderRadius: '15px' }}>
                    <h5 className="fw-bold mb-2">
                      <FaCheckCircle className="react-icon icon-left text-success" />
                      Expected Results
                    </h5>
                    <p className="mb-0">
                      Most customers see improvements in AI discoverability within 24-48 hours of deployment. 
                      Full optimization benefits typically appear within 1-2 weeks as AI models index your updated content.
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </section>

            {/* Technical Specifications */}
            <section id="technical" className="mb-5">
              <Card className="card-modern">
                <Card.Body className="p-5">
                  <h2 className="text-3xl fw-bold mb-4">
                    <FaCode className="react-icon icon-left text-primary" />
                    Technical Specifications
                  </h2>
                  
                  <Row className="g-4">
                    <Col md={6}>
                      <h4 className="fw-bold mb-3">File Specifications</h4>
                      <Table bordered className="mb-4">
                        <tbody>
                          <tr>
                            <td><strong>File Format</strong></td>
                            <td>Plain Text (.txt)</td>
                          </tr>
                          <tr>
                            <td><strong>Encoding</strong></td>
                            <td>UTF-8</td>
                          </tr>
                          <tr>
                            <td><strong>Line Endings</strong></td>
                            <td>LF (Unix-style)</td>
                          </tr>
                          <tr>
                            <td><strong>Max File Size</strong></td>
                            <td>10MB (llms-full.txt)</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                    
                    <Col md={6}>
                      <h4 className="fw-bold mb-3">Server Requirements</h4>
                      <Table bordered className="mb-4">
                        <tbody>
                          <tr>
                            <td><strong>Web Server</strong></td>
                            <td>Any (Apache, Nginx, IIS)</td>
                          </tr>
                          <tr>
                            <td><strong>MIME Type</strong></td>
                            <td>text/plain</td>
                          </tr>
                          <tr>
                            <td><strong>Permissions</strong></td>
                            <td>644 (readable by web server)</td>
                          </tr>
                          <tr>
                            <td><strong>Cache Headers</strong></td>
                            <td>Optional but recommended</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>

                  <h4 className="fw-bold mb-3">Supported AI Models</h4>
                  <p className="mb-3">Our files are compatible with major AI and language models including:</p>
                  <Row className="g-3">
                    <Col md={3}>
                      <Badge bg="primary" className="w-100 p-2">GPT Models</Badge>
                    </Col>
                    <Col md={3}>
                      <Badge bg="primary" className="w-100 p-2">Claude</Badge>
                    </Col>
                    <Col md={3}>
                      <Badge bg="primary" className="w-100 p-2">Gemini</Badge>
                    </Col>
                    <Col md={3}>
                      <Badge bg="primary" className="w-100 p-2">LLaMA</Badge>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="mb-5">
              <Card className="card-modern">
                <Card.Body className="p-5">
                  <h2 className="text-3xl fw-bold mb-4">
                    <FaQuestionCircle className="react-icon icon-left text-primary" />
                    Frequently Asked Questions
                  </h2>
                  
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>How long does file generation take?</Accordion.Header>
                      <Accordion.Body>
                        File generation typically takes 2-10 minutes depending on your website size. 
                        Most sites under 100 pages are processed within 5 minutes.
                      </Accordion.Body>
                    </Accordion.Item>
                    
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Do I need both llms.txt and llms-full.txt files?</Accordion.Header>
                      <Accordion.Body>
                        For maximum AI optimization, we recommend deploying both files. The llms.txt provides structure guidance 
                        while llms-full.txt offers complete content coverage. However, you can use either file independently.
                      </Accordion.Body>
                    </Accordion.Item>
                    
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>How often should I regenerate the files?</Accordion.Header>
                      <Accordion.Body>
                        Regenerate your files whenever you make significant content updates, add new pages, or restructure your site. 
                        For active sites, monthly regeneration is recommended.
                      </Accordion.Body>
                    </Accordion.Item>
                    
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>Will these files affect my website performance?</Accordion.Header>
                      <Accordion.Body>
                        No, LLM files are static text files that have minimal impact on website performance. 
                        They are only accessed by AI crawlers and don't affect regular user browsing.
                      </Accordion.Body>
                    </Accordion.Item>
                    
                    <Accordion.Item eventKey="4">
                      <Accordion.Header>Are the files compatible with existing SEO efforts?</Accordion.Header>
                      <Accordion.Body>
                        Yes! LLM optimization files complement traditional SEO and don't interfere with robots.txt, 
                        sitemaps, or other SEO tools. They work alongside your existing optimization strategies.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
              </Card>
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DocumentationPage; 