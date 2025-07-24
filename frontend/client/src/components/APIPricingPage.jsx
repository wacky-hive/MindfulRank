import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Table, Alert, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaCode, FaRocket, FaBolt, FaBuilding, FaCheck, FaTimes,
  FaUsers, FaCogs, FaShieldAlt, FaHeadset, FaCloud, FaGlobe,
  FaChartLine, FaDownload, FaClock, FaLock
} from 'react-icons/fa';

const APIPricingPage = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [estimatedCalls, setEstimatedCalls] = useState(1000);
  const [selectedPlan, setSelectedPlan] = useState('professional');

  const plans = [
    {
      id: 'free',
      name: 'Free Tier',
      price: '€0',
      period: '/month',
      description: 'Perfect for testing and small projects',
      icon: FaCode,
      color: 'success',
      features: [
        { name: '100 API calls/month', included: true },
        { name: 'Basic rate limiting', included: true },
        { name: 'Community support', included: true },
        { name: '7-day file retention', included: true },
        { name: 'Standard response time', included: true },
        { name: 'Webhook notifications', included: false },
        { name: 'Priority support', included: false },
        { name: 'SLA guarantees', included: false }
      ],
      cta: 'Start Free',
      popular: false
    },
    {
      id: 'starter',
      name: 'Starter',
      price: '€29',
      period: '/month',
      description: 'For small agencies and freelancers',
      icon: FaRocket,
      color: 'primary',
      features: [
        { name: '1,000 API calls/month', included: true },
        { name: '50 concurrent jobs', included: true },
        { name: 'Standard support', included: true },
        { name: '7-day file retention', included: true },
        { name: 'Fast response time', included: true },
        { name: 'Basic webhooks', included: true },
        { name: 'Priority support', included: false },
        { name: 'SLA guarantees', included: false }
      ],
      cta: 'Choose Starter',
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '€99',
      period: '/month',
      description: 'Most popular for growing businesses',
      icon: FaBolt,
      color: 'warning',
      features: [
        { name: '10,000 API calls/month', included: true },
        { name: '200 concurrent jobs', included: true },
        { name: 'Priority support', included: true },
        { name: '30-day file retention', included: true },
        { name: 'Fastest response time', included: true },
        { name: 'Advanced webhooks', included: true },
        { name: 'Email + chat support', included: true },
        { name: '99.9% SLA guarantee', included: true }
      ],
      cta: 'Choose Professional',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '€299',
      period: '/month',
      description: 'For large-scale operations',
      icon: FaBuilding,
      color: 'dark',
      features: [
        { name: '50,000 API calls/month', included: true },
        { name: 'Unlimited concurrent jobs', included: true },
        { name: 'Dedicated support', included: true },
        { name: '90-day file retention', included: true },
        { name: 'Ultra-fast response time', included: true },
        { name: 'Custom webhooks', included: true },
        { name: 'Phone + dedicated manager', included: true },
        { name: '99.95% SLA guarantee', included: true }
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const payPerUse = {
    price: '€0.05',
    period: '/call',
    description: 'No monthly commitment required'
  };

  const calculateRecommendedPlan = (calls) => {
    if (calls <= 100) return 'free';
    if (calls <= 1000) return 'starter';
    if (calls <= 10000) return 'professional';
    if (calls <= 50000) return 'enterprise';
    return 'custom';
  };

  const calculateCost = (calls, planId) => {
    const planLimits = { free: 100, starter: 1000, professional: 10000, enterprise: 50000 };
    const planPrices = { free: 0, starter: 29, professional: 99, enterprise: 299 };
    
    if (calls <= planLimits[planId]) {
      return planPrices[planId];
    }
    
    return calls * 0.05; // Pay per use
  };

  return (
    <>
      {/* API Pricing Hero */}
      <section style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)', 
        color: 'white',
        padding: '4rem 0 2rem' 
      }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <div style={{
                background: 'rgba(255, 215, 0, 0.1)',
                padding: '0.75rem 2rem',
                borderRadius: '50px',
                marginBottom: '2rem',
                display: 'inline-block',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 215, 0, 0.2)'
              }}>
                <FaCode className="react-icon icon-left" style={{ color: '#ffd700' }} />
                <span className="fw-bold">⚡ Developer Pricing</span>
              </div>

              <h1 className="display-3 fw-bold mb-4">
                API Pricing Plans
                <span className="d-block" style={{ color: '#ffd700' }}>Built for Scale</span>
              </h1>
              
              <p className="fs-4 mb-4" style={{ opacity: '0.9', maxWidth: '700px', margin: '0 auto' }}>
                Choose the perfect plan for your LLM optimization needs. From testing to enterprise-scale deployments.
              </p>

              <div className="d-flex gap-3 justify-content-center flex-wrap mb-4">
                <Badge bg="success" className="px-3 py-2">Free Tier Available</Badge>
                <Badge bg="info" className="px-3 py-2">99.9% Uptime SLA</Badge>
                <Badge bg="warning" className="px-3 py-2">No Setup Fees</Badge>
                <Badge bg="primary" className="px-3 py-2">Cancel Anytime</Badge>
              </div>

              <div className="d-flex gap-3 justify-content-center">
                <Button 
                  variant="outline-light" 
                  size="lg"
                  onClick={() => setShowCalculator(true)}
                >
                  <FaChartLine className="react-icon icon-left" />
                  Calculate Your Costs
                </Button>
                <Button 
                  as={Link}
                  to="/api-reference"
                  variant="light" 
                  size="lg"
                >
                  <FaCode className="react-icon icon-left" />
                  View API Docs
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="my-5">
        {/* Pay-per-use Banner */}
        <Row className="mb-5">
          <Col>
            <Alert variant="info" className="text-center py-4">
              <h4 className="fw-bold mb-2">
                <FaBolt className="react-icon icon-left text-warning" />
                Pay-Per-Use Option Available
              </h4>
              <p className="mb-2">
                <strong>{payPerUse.price}{payPerUse.period}</strong> - {payPerUse.description}
              </p>
              <small className="text-muted">Perfect for irregular usage patterns or high-volume requirements</small>
            </Alert>
          </Col>
        </Row>

        {/* Pricing Cards */}
        <Row className="g-4 mb-5">
          {plans.map((plan) => (
            <Col lg={3} md={6} key={plan.id}>
              <Card 
                className={`h-100 position-relative card-modern ${plan.popular ? 'border-warning' : ''}`}
                style={{ 
                  transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all var(--transition-base)'
                }}
              >
                {plan.popular && (
                  <div 
                    className="position-absolute top-0 start-50 translate-middle"
                    style={{
                      background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
                      color: '#000',
                      padding: '0.5rem 2rem',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      zIndex: 1
                    }}
                  >
                    Most Popular
                  </div>
                )}

                <Card.Body className="p-4 text-center">
                  <div className="mb-3">
                    <plan.icon 
                      size={48} 
                      className={`text-${plan.color}`}
                    />
                  </div>

                  <h4 className="fw-bold mb-2">{plan.name}</h4>
                  <p className="text-muted mb-3">{plan.description}</p>

                  <div className="mb-4">
                    <span className="display-5 fw-bold">{plan.price}</span>
                    <span className="text-muted">{plan.period}</span>
                  </div>

                  <Button 
                    variant={plan.popular ? 'warning' : 'outline-primary'}
                    size="lg"
                    className="w-100 mb-4"
                  >
                    {plan.cta}
                  </Button>

                  <div className="text-start">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="d-flex align-items-center mb-2">
                        {feature.included ? (
                          <FaCheck className="text-success me-2 flex-shrink-0" />
                        ) : (
                          <FaTimes className="text-muted me-2 flex-shrink-0" />
                        )}
                        <span className={feature.included ? '' : 'text-muted'}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Feature Comparison Table */}
        <Row className="mb-5">
          <Col>
            <Card className="card-modern">
              <Card.Body className="p-4">
                <h3 className="text-center fw-bold mb-4">Detailed Feature Comparison</h3>
                
                <div className="table-responsive">
                  <Table className="mb-0">
                    <thead>
                      <tr>
                        <th className="border-0">Features</th>
                        <th className="border-0 text-center">Free</th>
                        <th className="border-0 text-center">Starter</th>
                        <th className="border-0 text-center bg-warning bg-opacity-10">Professional</th>
                        <th className="border-0 text-center">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="fw-bold">API Calls/Month</td>
                        <td className="text-center">100</td>
                        <td className="text-center">1,000</td>
                        <td className="text-center bg-warning bg-opacity-10">10,000</td>
                        <td className="text-center">50,000</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Concurrent Jobs</td>
                        <td className="text-center">10</td>
                        <td className="text-center">50</td>
                        <td className="text-center bg-warning bg-opacity-10">200</td>
                        <td className="text-center">Unlimited</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">File Retention</td>
                        <td className="text-center">7 days</td>
                        <td className="text-center">7 days</td>
                        <td className="text-center bg-warning bg-opacity-10">30 days</td>
                        <td className="text-center">90 days</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Response Time</td>
                        <td className="text-center">~30s</td>
                        <td className="text-center">~15s</td>
                        <td className="text-center bg-warning bg-opacity-10">~5s</td>
                        <td className="text-center">~3s</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Webhook Support</td>
                        <td className="text-center"><FaTimes className="text-muted" /></td>
                        <td className="text-center"><FaCheck className="text-success" /></td>
                        <td className="text-center bg-warning bg-opacity-10"><FaCheck className="text-success" /></td>
                        <td className="text-center"><FaCheck className="text-success" /></td>
                      </tr>
                      <tr>
                        <td className="fw-bold">SLA Guarantee</td>
                        <td className="text-center">None</td>
                        <td className="text-center">None</td>
                        <td className="text-center bg-warning bg-opacity-10">99.9%</td>
                        <td className="text-center">99.95%</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Support Level</td>
                        <td className="text-center">Community</td>
                        <td className="text-center">Email</td>
                        <td className="text-center bg-warning bg-opacity-10">Priority</td>
                        <td className="text-center">Dedicated</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Use Cases */}
        <Row className="mb-5">
          <Col>
            <h2 className="text-center fw-bold mb-5">Perfect for Every Use Case</h2>
            <Row className="g-4">
              <Col md={3}>
                <Card className="text-center h-100 card-modern">
                  <Card.Body className="p-4">
                    <FaUsers className="text-primary mb-3" size={48} />
                    <h5 className="fw-bold">Small Agencies</h5>
                    <p className="text-muted">
                      Offer LLM optimization to 5-20 clients without breaking the bank
                    </p>
                    <Badge bg="primary">Starter Plan</Badge>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-center h-100 card-modern">
                  <Card.Body className="p-4">
                    <FaCogs className="text-warning mb-3" size={48} />
                    <h5 className="fw-bold">SaaS Platforms</h5>
                    <p className="text-muted">
                      Integrate LLM optimization as a premium feature for your users
                    </p>
                    <Badge bg="warning">Professional</Badge>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-center h-100 card-modern">
                  <Card.Body className="p-4">
                    <FaGlobe className="text-success mb-3" size={48} />
                    <h5 className="fw-bold">Enterprise</h5>
                    <p className="text-muted">
                      Manage hundreds of websites with automated LLM optimization
                    </p>
                    <Badge bg="dark">Enterprise</Badge>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-center h-100 card-modern">
                  <Card.Body className="p-4">
                    <FaCode className="text-info mb-3" size={48} />
                    <h5 className="fw-bold">Developers</h5>
                    <p className="text-muted">
                      Test and prototype with our generous free tier before scaling
                    </p>
                    <Badge bg="success">Free Tier</Badge>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* FAQ */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <h2 className="text-center fw-bold mb-5">Frequently Asked Questions</h2>
            
            <div className="accordion" id="apiPricingFAQ">
              <div className="accordion-item border-0 mb-3 card-modern">
                <h2 className="accordion-header">
                  <button className="accordion-button fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                    What happens if I exceed my plan limits?
                  </button>
                </h2>
                <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#apiPricingFAQ">
                  <div className="accordion-body">
                    You'll automatically be charged at our pay-per-use rate of €0.05 per additional call. No service interruption, no surprises.
                  </div>
                </div>
              </div>

              <div className="accordion-item border-0 mb-3 card-modern">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                    Can I switch plans anytime?
                  </button>
                </h2>
                <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#apiPricingFAQ">
                  <div className="accordion-body">
                    Yes! Upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate your billing.
                  </div>
                </div>
              </div>

              <div className="accordion-item border-0 mb-3 card-modern">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                    Do you offer volume discounts?
                  </button>
                </h2>
                <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#apiPricingFAQ">
                  <div className="accordion-body">
                    Yes! For 100K+ calls/month, we offer custom pricing with significant discounts. Contact our sales team for a quote.
                  </div>
                </div>
              </div>

              <div className="accordion-item border-0 mb-3 card-modern">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                    What's included in the SLA guarantee?
                  </button>
                </h2>
                <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#apiPricingFAQ">
                  <div className="accordion-body">
                    Our SLA covers API uptime, response times, and data availability. If we don't meet our commitments, you get service credits.
                  </div>
                </div>
              </div>

              <div className="accordion-item border-0 mb-3 card-modern">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
                    Is there a free trial for paid plans?
                  </button>
                </h2>
                <div id="faq5" className="accordion-collapse collapse" data-bs-parent="#apiPricingFAQ">
                  <div className="accordion-body">
                    Our Free tier gives you 100 calls/month to test our API. For paid features, we offer a 14-day money-back guarantee.
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* CTA Section */}
        <Row>
          <Col>
            <Card className="card-modern text-center" style={{
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              color: 'white'
            }}>
              <Card.Body className="p-5">
                <h2 className="fw-bold mb-4">Ready to Get Started?</h2>
                <p className="fs-5 mb-4" style={{ opacity: '0.9' }}>
                  Join thousands of developers and agencies already using our API to optimize websites for AI search.
                </p>
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <Button variant="light" size="lg">
                    <FaRocket className="react-icon icon-left" />
                    Start Free Trial
                  </Button>
                  <Button variant="outline-light" size="lg">
                    <FaHeadset className="react-icon icon-left" />
                    Contact Sales
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Cost Calculator Modal */}
      <Modal show={showCalculator} onHide={() => setShowCalculator(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaChartLine className="react-icon icon-left" />
            API Cost Calculator
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="mb-4">
            <label className="form-label fw-bold">Estimated API calls per month:</label>
            <input 
              type="range" 
              className="form-range mb-2"
              min="100" 
              max="100000" 
              step="100"
              value={estimatedCalls}
              onChange={(e) => setEstimatedCalls(parseInt(e.target.value))}
            />
            <div className="d-flex justify-content-between">
              <small className="text-muted">100</small>
              <strong className="text-primary">{estimatedCalls.toLocaleString()} calls</strong>
              <small className="text-muted">100,000+</small>
            </div>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold">Recommended Plan: <Badge bg="warning">{calculateRecommendedPlan(estimatedCalls)}</Badge></h5>
          </div>

          <Row className="g-3">
            {plans.filter(plan => plan.id !== 'free').map((plan) => {
              const cost = calculateCost(estimatedCalls, plan.id);
              const isRecommended = calculateRecommendedPlan(estimatedCalls) === plan.id;
              
              return (
                <Col md={4} key={plan.id}>
                  <Card className={`text-center ${isRecommended ? 'border-warning bg-warning bg-opacity-10' : ''}`}>
                    <Card.Body className="p-3">
                      <h6 className="fw-bold">{plan.name}</h6>
                      <div className="h4 fw-bold text-primary">€{cost}</div>
                      <small className="text-muted">/month</small>
                      {isRecommended && (
                        <div className="mt-2">
                          <Badge bg="warning">Recommended</Badge>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>

          <Alert variant="info" className="mt-4">
            <strong>Pay-per-use alternative:</strong> €{(estimatedCalls * 0.05).toFixed(2)}/month
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCalculator(false)}>
            Close
          </Button>
          <Button variant="primary">
            Choose Plan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default APIPricingPage; 