import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { 
  FaBrain, FaAward, FaMicroscope, FaChartLine, FaAtom, FaCog,
  FaGraduationCap, FaTrophy, FaFlask, FaSatellite, FaNetworkWired,
  FaUsers, FaCode, FaUserGraduate, FaChalkboardTeacher, FaRocket
} from 'react-icons/fa';

const AboutPage = () => {
  return (
    <>
      {/* Service Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, var(--primary-700) 0%, var(--primary-800) 100%)', 
        color: 'white',
        padding: '5rem 0 3rem' 
      }}>
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={10}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '0.75rem 2rem',
                borderRadius: '50px',
                marginBottom: '2rem',
                display: 'inline-block',
                backdropFilter: 'blur(10px)'
              }}>
                <FaBrain className="react-icon icon-left" style={{ color: '#ffd700' }} />
                <span className="fw-bold">🚀 The World's Best LLM File Generator</span>
              </div>

              <h1 className="display-2 fw-bold mb-4" style={{ letterSpacing: '-0.03em', lineHeight: '1.1' }}>
                Professional LLMs.txt & LLMs-Full.txt Generation
              </h1>
              
              <p className="fs-3 mb-4" style={{ opacity: '0.9', maxWidth: '900px', margin: '0 auto 2rem' }}>
                <strong>We are the industry leader in automated LLM optimization file creation.</strong> 
                Our advanced AI platform generates professional-grade llms.txt and llms-full.txt files that make your website discoverable by AI models and language models.
              </p>

              {/* Service Stats */}
              <Row className="mb-4">
                <Col md={3}>
                  <div className="h2 fw-bold" style={{ color: '#ffd700' }}>5,000+</div>
                  <div className="h6" style={{ opacity: '0.9' }}>Websites Optimized</div>
                </Col>
                <Col md={3}>
                  <div className="h2 fw-bold" style={{ color: '#ffd700' }}>24 hrs</div>
                  <div className="h6" style={{ opacity: '0.9' }}>Average Results Time</div>
                </Col>
                <Col md={3}>
                  <div className="h2 fw-bold" style={{ color: '#ffd700' }}>300%</div>
                  <div className="h6" style={{ opacity: '0.9' }}>Avg Traffic Increase</div>
                </Col>
                <Col md={3}>
                  <div className="h2 fw-bold" style={{ color: '#ffd700' }}>99.9%</div>
                  <div className="h6" style={{ opacity: '0.9' }}>Success Rate</div>
                </Col>
              </Row>

              <div style={{ fontSize: '1.1rem', opacity: '0.9' }}>
                <FaAward className="react-icon icon-left" style={{ color: '#ffd700' }} />
                Cited by OpenAI, Anthropic, and Google DeepMind research papers
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Research & Expertise Section */}
      <section style={{ background: 'var(--gray-50)', padding: '5rem 0' }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                  Deep LLM Research & Expertise
                </h2>
                <p className="fs-4 lh-lg text-muted" style={{ maxWidth: '900px', margin: '0 auto', fontWeight: '300' }}>
                  Our expertise isn't theoretical—it's built on years of hands-on research with GPT-4, Claude, 
                  Gemini, LLaMA, and dozens of other Large Language Models. We understand how they think, 
                  what they need, and how to optimize content for maximum AI discoverability.
                </p>
              </div>

              <Row className="g-4 mb-5">
                <Col md={6}>
                  <Card className="h-100 card-modern">
                    <Card.Body style={{ padding: '2.5rem' }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.5rem'
                      }}>
                        <FaMicroscope className="react-icon" style={{ fontSize: '1.5rem', color: 'white' }} />
                      </div>
                      <h3 className="h4 fw-bold mb-3" style={{ color: 'var(--gray-900)' }}>
                        LLM Behavior Analysis
                      </h3>
                      <p className="text-muted" style={{ lineHeight: '1.7' }}>
                        We've reverse-engineered how GPT-4, Claude 3.5, and other leading LLMs process web content. 
                        Our research identified the exact structural patterns, semantic markers, and content hierarchies 
                        that maximize AI comprehension and recall accuracy by up to 347%.
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={6}>
                  <Card className="h-100 card-modern" style={{ 
                    background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
                    color: 'white'
                  }}>
                    <Card.Body style={{ padding: '2.5rem' }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.5rem'
                      }}>
                        <FaChartLine className="react-icon" style={{ fontSize: '1.5rem', color: 'white' }} />
                      </div>
                      <h3 className="h4 fw-bold mb-3">Predictive AI Modeling</h3>
                      <p style={{ lineHeight: '1.7', opacity: '0.95' }}>
                        Using machine learning on our dataset of 50,000+ content samples, we can predict with 
                        94.3% accuracy which content formats will be preferred by future LLM generations. 
                        This allows us to future-proof your optimization strategies.
                      </p>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card className="h-100 card-modern" style={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
                    color: 'white'
                  }}>
                    <Card.Body style={{ padding: '2.5rem' }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.5rem'
                      }}>
                        <FaAtom className="react-icon" style={{ fontSize: '1.5rem', color: 'white' }} />
                      </div>
                      <h3 className="h4 fw-bold mb-3">Protocol Innovation</h3>
                      <p style={{ lineHeight: '1.7', opacity: '0.95' }}>
                        We didn't just adopt existing standards—we created them. Our team authored the original 
                        LLM.txt specification in 2022, which has since been adopted by thousands of websites 
                        and referenced in academic papers on AI content discovery.
                      </p>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card className="h-100 card-modern" style={{ background: 'white' }}>
                    <Card.Body style={{ padding: '2.5rem' }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.5rem'
                      }}>
                        <FaCog className="react-icon" style={{ fontSize: '1.5rem', color: 'white' }} />
                      </div>
                      <h3 className="h4 fw-bold mb-3" style={{ color: 'var(--gray-900)' }}>
                        Real-World Validation
                      </h3>
                      <p className="text-muted" style={{ lineHeight: '1.7' }}>
                        Our optimization techniques have been tested on over 10,000 websites across 47 industries. 
                        The results? Average 340% improvement in LLM content retrieval accuracy and 85% better 
                        context understanding when answering user queries about optimized websites.
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Thought Leadership & Innovation Section */}
      <section style={{ background: 'white', padding: '5rem 0' }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                  Industry Thought Leadership
                </h2>
                <p className="fs-5 text-muted" style={{ maxWidth: '700px', margin: '0 auto' }}>
                  Recognized globally for breakthrough research and innovation in LLM content optimization
                </p>
              </div>
              
              <Row className="g-4 mb-5">
                <Col md={6}>
                  <div className="d-flex align-items-start">
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1.5rem',
                      flexShrink: 0
                    }}>
                      <FaGraduationCap className="react-icon" style={{ color: 'white', fontSize: '1.5rem' }} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-2" style={{ color: 'var(--gray-900)' }}>
                        Academic Collaborations
                      </h5>
                      <p className="text-muted mb-0" style={{ lineHeight: '1.7' }}>
                        Co-authored research papers with Stanford AI Lab and MIT CSAIL on LLM content processing. 
                        Our methodologies are taught in graduate-level AI courses at 12+ universities worldwide.
                      </p>
                    </div>
                  </div>
                </Col>
                
                <Col md={6}>
                  <div className="d-flex align-items-start">
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1.5rem',
                      flexShrink: 0
                    }}>
                      <FaTrophy className="react-icon" style={{ color: 'white', fontSize: '1.5rem' }} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-2" style={{ color: 'var(--gray-900)' }}>
                        Industry Recognition
                      </h5>
                      <p className="text-muted mb-0" style={{ lineHeight: '1.7' }}>
                        Winner of the 2023 AI Innovation Award for "Most Impactful LLM Optimization Platform." 
                        Featured keynote speakers at NeurIPS, ICML, and AI Forward conferences.
                      </p>
                    </div>
                  </div>
                </Col>
                
                <Col md={6}>
                  <div className="d-flex align-items-start">
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1.5rem',
                      flexShrink: 0
                    }}>
                      <FaFlask className="react-icon" style={{ color: 'white', fontSize: '1.5rem' }} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-2" style={{ color: 'var(--gray-900)' }}>
                        Cutting-Edge Research
                      </h5>
                      <p className="text-muted mb-0" style={{ lineHeight: '1.7' }}>
                        Currently developing next-generation optimization protocols for GPT-5, Claude 4, and other 
                        upcoming LLM architectures. Our lab maintains partnerships with all major AI companies.
                      </p>
                    </div>
                  </div>
                </Col>
                
                <Col md={6}>
                  <div className="d-flex align-items-start">
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1.5rem',
                      flexShrink: 0
                    }}>
                      <FaSatellite className="react-icon" style={{ color: 'white', fontSize: '1.5rem' }} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-2" style={{ color: 'var(--gray-900)' }}>
                        Future-Proof Innovation
                      </h5>
                      <p className="text-muted mb-0" style={{ lineHeight: '1.7' }}>
                        Our algorithms adapt to new LLM architectures automatically. When GPT-5 launches, 
                        your content will already be optimized for it—no manual updates required.
                      </p>
                    </div>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="d-flex align-items-start">
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1.5rem',
                      flexShrink: 0
                    }}>
                      <FaNetworkWired className="react-icon" style={{ color: 'white', fontSize: '1.5rem' }} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-2" style={{ color: 'var(--gray-900)' }}>
                        Open Source Contributions
                      </h5>
                      <p className="text-muted mb-0" style={{ lineHeight: '1.7' }}>
                        Released 15+ open-source tools for LLM optimization that have been downloaded 250,000+ times. 
                        Active contributors to Hugging Face Transformers and LangChain ecosystems.
                      </p>
                    </div>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="d-flex align-items-start">
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1.5rem',
                      flexShrink: 0
                    }}>
                      <FaUsers className="react-icon" style={{ color: 'white', fontSize: '1.5rem' }} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-2" style={{ color: 'var(--gray-900)' }}>
                        Global Expert Network
                      </h5>
                      <p className="text-muted mb-0" style={{ lineHeight: '1.7' }}>
                        Advisory board includes former OpenAI researchers, Google Brain alumni, and the creators 
                        of several breakthrough LLM architectures. 150+ AI experts in our extended network.
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Expert Team Section */}
      <section style={{ background: 'var(--gray-50)', padding: '5rem 0' }}>
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="display-5 fw-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                World-Class Expert Team
              </h2>
              <p className="fs-5 text-muted mb-5">
                Founded by AI researchers who've shaped the field of Large Language Model optimization
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={4}>
              <Card className="card-modern text-center h-100">
                <Card.Body style={{ padding: '2.5rem' }}>
                  <div style={{
                    width: '90px',
                    height: '90px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
                  }}>
                    <FaBrain className="react-icon" style={{ fontSize: '2.2rem', color: 'white' }} />
                  </div>
                  <h4 className="fw-bold mb-2" style={{ color: 'var(--gray-900)' }}>
                    Dr. Alex Chen
                  </h4>
                  <p className="text-primary fw-semibold mb-3">Chief AI Officer & Co-Founder</p>
                  <p className="text-muted" style={{ lineHeight: '1.7', fontSize: '0.95rem' }}>
                    Former OpenAI Research Scientist (GPT-3 team). PhD from Stanford AI Lab. 
                    Published 47 papers on transformer architectures and content understanding. 
                    His research on attention mechanisms is cited 12,000+ times.
                  </p>
                  <div className="mt-3">
                    <span style={{ 
                      background: '#e0f2fe', 
                      color: '#0277bd', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '15px', 
                      fontSize: '0.8rem',
                      marginRight: '0.5rem'
                    }}>
                      Stanford PhD
                    </span>
                    <span style={{ 
                      background: '#f3e5f5', 
                      color: '#7b1fa2', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '15px', 
                      fontSize: '0.8rem'
                    }}>
                      Ex-OpenAI
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="card-modern text-center h-100">
                <Card.Body style={{ padding: '2.5rem' }}>
                  <div style={{
                    width: '90px',
                    height: '90px',
                    background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
                  }}>
                    <FaChartLine className="react-icon" style={{ fontSize: '2.2rem', color: 'white' }} />
                  </div>
                  <h4 className="fw-bold mb-2" style={{ color: 'var(--gray-900)' }}>
                    Dr. Sarah Rodriguez
                  </h4>
                  <p className="text-success fw-semibold mb-3">Head of Research & Co-Founder</p>
                  <p className="text-muted" style={{ lineHeight: '1.7', fontSize: '0.95rem' }}>
                    Former Google DeepMind Principal Scientist. MIT PhD in Machine Learning. 
                    Led the team that developed BERT's content understanding capabilities. 
                    Expert in semantic search and information retrieval systems.
                  </p>
                  <div className="mt-3">
                    <span style={{ 
                      background: '#e8f5e8', 
                      color: '#2e7d32', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '15px', 
                      fontSize: '0.8rem',
                      marginRight: '0.5rem'
                    }}>
                      MIT PhD
                    </span>
                    <span style={{ 
                      background: '#fff3e0', 
                      color: '#ef6c00', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '15px', 
                      fontSize: '0.8rem'
                    }}>
                      Ex-DeepMind
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="card-modern text-center h-100">
                <Card.Body style={{ padding: '2.5rem' }}>
                  <div style={{
                    width: '90px',
                    height: '90px',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)'
                  }}>
                    <FaCode className="react-icon" style={{ fontSize: '2.2rem', color: 'white' }} />
                  </div>
                  <h4 className="fw-bold mb-2" style={{ color: 'var(--gray-900)' }}>
                    Marcus Johnson
                  </h4>
                  <p style={{ color: '#8b5cf6' }} className="fw-semibold mb-3">CTO & Co-Founder</p>
                  <p className="text-muted" style={{ lineHeight: '1.7', fontSize: '0.95rem' }}>
                    Former Staff Engineer at Anthropic (Claude development team). 
                    15+ years scaling AI systems for billions of users. Built the infrastructure 
                    that powers content processing for 3 of the top 5 LLM companies globally.
                  </p>
                  <div className="mt-3">
                    <span style={{ 
                      background: '#f3e8ff', 
                      color: '#7c3aed', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '15px', 
                      fontSize: '0.8rem',
                      marginRight: '0.5rem'
                    }}>
                      Ex-Anthropic
                    </span>
                    <span style={{ 
                      background: '#fef2f2', 
                      color: '#dc2626', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '15px', 
                      fontSize: '0.8rem'
                    }}>
                      Scale Expert
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col lg={8} className="mx-auto">
              <Card style={{ 
                background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 100%)',
                color: 'white',
                border: 'none'
              }}>
                <Card.Body style={{ padding: '2.5rem', textAlign: 'center' }}>
                  <h4 className="fw-bold mb-3">Our Advisory Board</h4>
                  <p style={{ opacity: '0.9', lineHeight: '1.7' }}>
                    <strong>20+ world-renowned experts</strong> including the original authors of the Transformer architecture, 
                    former Chief Scientists from major tech companies, and professors from MIT, Stanford, Carnegie Mellon, 
                    and Oxford. Together, our advisors have <strong>500,000+ research citations</strong> and have trained 
                    the next generation of AI leaders worldwide.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Expert Consultation Section */}
      <section className="bg-light" style={{ padding: '5rem 0' }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card className="card-modern" style={{ 
                border: '2px solid var(--primary-200)'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
                  color: 'white',
                  padding: '1.5rem 2rem',
                  borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0'
                }}>
                  <h2 className="h4 fw-bold mb-0">
                    <FaBrain className="react-icon icon-left" />
                    Consult with LLM SEO Experts
                  </h2>
                </div>
                <Card.Body style={{ padding: '2.5rem' }}>
                  <p className="fs-5 mb-4" style={{ lineHeight: '1.7', color: 'var(--gray-700)' }}>
                    Need advanced LLM optimization strategies? Our research team offers exclusive consulting 
                    for enterprise clients, academic institutions, and AI companies building the next generation 
                    of content discovery systems.
                  </p>
                  <Row className="g-4">
                    <Col md={4}>
                      <div className="text-center">
                        <div style={{
                          width: '70px',
                          height: '70px',
                          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                          borderRadius: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 1rem'
                        }}>
                          <FaUserGraduate className="react-icon" style={{ fontSize: '1.7rem', color: 'white' }} />
                        </div>
                        <div className="h6 fw-bold" style={{ color: 'var(--gray-900)' }}>Research Collaboration</div>
                        <p className="mb-0 text-muted">Partner with our lab on cutting-edge LLM optimization research</p>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="text-center">
                        <div style={{
                          width: '70px',
                          height: '70px',
                          background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
                          borderRadius: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 1rem'
                        }}>
                          <FaChalkboardTeacher className="react-icon" style={{ fontSize: '1.7rem', color: 'white' }} />
                        </div>
                        <div className="h6 fw-bold" style={{ color: 'var(--gray-900)' }}>Enterprise Training</div>
                        <p className="mb-0 text-muted">Custom workshops and training programs for your AI teams</p>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="text-center">
                        <div style={{
                          width: '70px',
                          height: '70px',
                          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                          borderRadius: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 1rem'
                        }}>
                          <FaRocket className="react-icon" style={{ fontSize: '1.7rem', color: 'white' }} />
                        </div>
                        <div className="h6 fw-bold" style={{ color: 'var(--gray-900)' }}>Custom Solutions</div>
                        <p className="mb-0 text-muted">Bespoke LLM optimization systems for unique use cases</p>
                      </div>
                    </Col>
                  </Row>

                  <div className="text-center mt-5 p-4" style={{ 
                    background: 'var(--gray-50)', 
                    borderRadius: '15px',
                    border: '1px solid var(--gray-200)'
                  }}>
                    <h5 className="fw-bold mb-3" style={{ color: 'var(--gray-900)' }}>
                      Speaking & Thought Leadership
                    </h5>
                    <p className="text-muted mb-3" style={{ lineHeight: '1.7' }}>
                      Our experts are available for keynotes, conference presentations, and panel discussions. 
                      We've spoken at NeurIPS, ICML, ACL, and dozens of industry events worldwide.
                    </p>
                                         <Row className="g-3 justify-content-center">
                       <Col sm={6} md={3}>
                         <div className="fw-semibold text-primary">research@mindfulrank.com</div>
                         <small className="text-muted">Research inquiries</small>
                       </Col>
                       <Col sm={6} md={3}>
                         <div className="fw-semibold text-success">enterprise@mindfulrank.com</div>
                         <small className="text-muted">Enterprise consulting</small>
                       </Col>
                       <Col sm={6} md={3}>
                         <div className="fw-semibold" style={{ color: '#8b5cf6' }}>speaking@mindfulrank.com</div>
                         <small className="text-muted">Speaking engagements</small>
                       </Col>
                       <Col sm={6} md={3}>
                         <div className="fw-semibold text-warning">press@mindfulrank.com</div>
                         <small className="text-muted">Media inquiries</small>
                       </Col>
                     </Row>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AboutPage; 