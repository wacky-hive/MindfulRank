import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';

const DarkModeDemo = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <Container className="my-5">
      <Row>
        <Col lg={8} className="mx-auto">
          <Card className="card-modern">
            <Card.Header>
              <h4 className="mb-0">
                <i className="fas fa-palette me-2"></i>
                Theme Test Component
                <Badge bg={isDark ? 'light' : 'dark'} className="ms-2">
                  {isDark ? 'Dark Mode' : 'Light Mode'}
                </Badge>
              </h4>
            </Card.Header>
            <Card.Body>
              <p className="lead">
                This component demonstrates the theme switching functionality.
              </p>
              
              <div className="d-flex gap-3 mb-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="outline-secondary">Secondary Button</Button>
                <Button variant="success">Success Button</Button>
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <h5>Current Theme Info:</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>Theme:</strong> {theme}
                    </li>
                    <li className="list-group-item">
                      <strong>Is Dark:</strong> {isDark ? 'Yes' : 'No'}
                    </li>
                    <li className="list-group-item">
                      <strong>HTML data-theme:</strong> {document.documentElement.getAttribute('data-theme')}
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h5>Theme Colors:</h5>
                  <div className="d-flex flex-wrap gap-2">
                    <div 
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: 'var(--bg-primary)', 
                        border: '2px solid var(--border-primary)',
                        borderRadius: '8px'
                      }}
                      title="Background Primary"
                    ></div>
                    <div 
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: 'var(--bg-card)', 
                        border: '2px solid var(--border-primary)',
                        borderRadius: '8px'
                      }}
                      title="Card Background"
                    ></div>
                    <div 
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: 'var(--primary-500)', 
                        border: '2px solid var(--border-primary)',
                        borderRadius: '8px'
                      }}
                      title="Primary Color"
                    ></div>
                  </div>
                </div>
              </div>
              
              <hr />
              
              <div className="text-center">
                <Button 
                  variant="outline-primary" 
                  onClick={toggleTheme}
                  size="lg"
                >
                  <i className={`fas fa-${isDark ? 'sun' : 'moon'} me-2`}></i>
                  Switch to {isDark ? 'Light' : 'Dark'} Mode
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DarkModeDemo; 