import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaSignOutAlt, FaTachometerAlt, FaGem } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { isAuthenticated } from '../utils/auth';

const Navigation = ({ token, onLogout }) => {
  const { theme } = useTheme();

  return (
    <Navbar 
      expand="lg" 
      className="py-3"
      style={{
        background: theme === 'dark' 
          ? 'rgba(15, 23, 42, 0.95)' 
          : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease'
      }}
    >
      <Container>
        <Navbar.Brand 
          as={Link} 
          to="/" 
          className="fw-bold d-flex align-items-center"
          style={{ 
            fontSize: '1.5rem',
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          <FaGem className="me-2" style={{ color: 'var(--primary-500)' }} />
          MindfulRank
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className="fw-semibold px-3 py-2 mx-1 rounded-pill nav-link-modern"
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/about" 
              className="fw-semibold px-3 py-2 mx-1 rounded-pill nav-link-modern"
            >
              About
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/pricing" 
              className="fw-semibold px-3 py-2 mx-1 rounded-pill nav-link-modern"
            >
              Pricing
            </Nav.Link>
          </Nav>
          
          <div className="d-flex align-items-center gap-2">
            <ThemeToggle />
            
            {token ? (
              <>
                <Button
                  as={Link}
                  to="/dashboard"
                  className="btn-modern btn-secondary-modern me-2"
                  size="sm"
                >
                  <FaTachometerAlt className="react-icon icon-left" />
                  Dashboard
                </Button>
                <Button
                  onClick={onLogout}
                  className="btn-modern"
                  size="sm"
                  style={{
                    background: 'var(--neutral-100)',
                    color: 'var(--neutral-700)',
                    border: '1px solid var(--neutral-200)'
                  }}
                >
                  <FaSignOutAlt className="react-icon icon-left" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  as={Link}
                  to="/login"
                  className="btn-modern btn-secondary-modern me-2"
                  size="sm"
                >
                  <FaSignInAlt className="react-icon icon-left" />
                  Login
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  className="btn-modern btn-primary-modern"
                  size="sm"
                >
                  <FaUserPlus className="react-icon icon-left" />
                  Get Started
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation; 