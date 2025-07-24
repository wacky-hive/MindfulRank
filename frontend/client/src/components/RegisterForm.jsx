import React, { useState } from 'react';
import { Form, Button, Alert, InputGroup } from 'react-bootstrap';
import axiosInstance from '../api/axiosInstance';
import { FaEnvelope, FaLock, FaCheckCircle, FaTimesCircle, FaUserPlus } from 'react-icons/fa';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 1, label: 'Weak', color: '#dc2626' };
    if (password.length < 8) return { strength: 2, label: 'Fair', color: '#f59e0b' };
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { strength: 4, label: 'Strong', color: '#10b981' };
    }
    return { strength: 3, label: 'Good', color: '#3b82f6' };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    if (!email || !password) {
      setMessage('Email and password are required.');
      setMessageType('danger');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageType('danger');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long.');
      setMessageType('danger');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post('/users/register', {
        email,
        password,
      });
      setMessage('Registration successful! You can now log in.');
      setMessageType('success');
      
      // Clear form
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(`${error.response.data.detail}`);
      } else {
        setMessage('An unexpected error occurred.');
      }
      setMessageType('danger');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {message && (
        <Alert 
          variant={messageType} 
          className="mb-4"
          style={{
            borderRadius: 'var(--radius-lg)',
            border: 'none',
            background: messageType === 'success' ? '#f0fdf4' : '#fef2f2',
            color: messageType === 'success' ? '#15803d' : '#dc2626',
            fontSize: '0.9rem'
          }}
        >
          <i className={`fas ${messageType === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
          {message}
        </Alert>
      )}
      
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold" style={{ color: 'var(--neutral-700)', marginBottom: 'var(--spacing-sm)' }}>
                      <FaEnvelope className="react-icon icon-left" style={{ color: 'var(--neutral-500)' }} />
          Email Address
        </Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          style={{
            padding: 'var(--spacing-md) var(--spacing-lg)',
            borderRadius: 'var(--radius-lg)',
            border: '2px solid var(--neutral-200)',
            fontSize: '1rem',
            transition: 'all var(--transition-base)'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--primary-500)';
            e.target.style.boxShadow = '0 0 0 0.2rem rgba(102, 126, 234, 0.15)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--neutral-200)';
            e.target.style.boxShadow = 'none';
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold" style={{ color: 'var(--neutral-700)', marginBottom: 'var(--spacing-sm)' }}>
                      <FaLock className="react-icon icon-left" style={{ color: 'var(--neutral-500)' }} />
          Password
        </Form.Label>
        <InputGroup>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={{
              padding: 'var(--spacing-md) var(--spacing-lg)',
              borderRadius: 'var(--radius-lg) 0 0 var(--radius-lg)',
              border: '2px solid var(--neutral-200)',
              borderRight: 'none',
              fontSize: '1rem',
              transition: 'all var(--transition-base)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--primary-500)';
              e.target.style.boxShadow = '0 0 0 0.2rem rgba(102, 126, 234, 0.15)';
              e.target.parentNode.querySelector('.input-group-text').style.borderColor = 'var(--primary-500)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--neutral-200)';
              e.target.style.boxShadow = 'none';
              e.target.parentNode.querySelector('.input-group-text').style.borderColor = 'var(--neutral-200)';
            }}
          />
          <InputGroup.Text
            onClick={() => setShowPassword(!showPassword)}
            style={{
              borderRadius: '0 var(--radius-lg) var(--radius-lg) 0',
              border: '2px solid var(--neutral-200)',
              borderLeft: 'none',
              cursor: 'pointer',
              background: 'var(--neutral-50)',
              transition: 'all var(--transition-base)'
            }}
          >
            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} style={{ color: 'var(--neutral-500)' }}></i>
          </InputGroup.Text>
        </InputGroup>
        
        {/* Password Strength Indicator */}
        {password && (
          <div className="mt-2">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <small style={{ color: 'var(--neutral-600)' }}>Password strength:</small>
              <small style={{ color: passwordStrength.color, fontWeight: '600' }}>
                {passwordStrength.label}
              </small>
            </div>
            <div style={{
              width: '100%',
              height: '4px',
              background: 'var(--neutral-200)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${(passwordStrength.strength / 4) * 100}%`,
                height: '100%',
                background: passwordStrength.color,
                borderRadius: '2px',
                transition: 'all var(--transition-base)'
              }}></div>
            </div>
          </div>
        )}
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold" style={{ color: 'var(--neutral-700)', marginBottom: 'var(--spacing-sm)' }}>
                      <FaCheckCircle className="react-icon icon-left" style={{ color: 'var(--neutral-500)' }} />
          Confirm Password
        </Form.Label>
        <InputGroup>
          <Form.Control
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
            style={{
              padding: 'var(--spacing-md) var(--spacing-lg)',
              borderRadius: 'var(--radius-lg) 0 0 var(--radius-lg)',
              border: `2px solid ${confirmPassword && confirmPassword !== password ? '#dc2626' : 'var(--neutral-200)'}`,
              borderRight: 'none',
              fontSize: '1rem',
              transition: 'all var(--transition-base)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--primary-500)';
              e.target.style.boxShadow = '0 0 0 0.2rem rgba(102, 126, 234, 0.15)';
              e.target.parentNode.querySelector('.input-group-text').style.borderColor = 'var(--primary-500)';
            }}
            onBlur={(e) => {
              const borderColor = confirmPassword && confirmPassword !== password ? '#dc2626' : 'var(--neutral-200)';
              e.target.style.borderColor = borderColor;
              e.target.style.boxShadow = 'none';
              e.target.parentNode.querySelector('.input-group-text').style.borderColor = borderColor;
            }}
          />
          <InputGroup.Text
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{
              borderRadius: '0 var(--radius-lg) var(--radius-lg) 0',
              border: `2px solid ${confirmPassword && confirmPassword !== password ? '#dc2626' : 'var(--neutral-200)'}`,
              borderLeft: 'none',
              cursor: 'pointer',
              background: 'var(--neutral-50)',
              transition: 'all var(--transition-base)'
            }}
          >
            <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`} style={{ color: 'var(--neutral-500)' }}></i>
          </InputGroup.Text>
        </InputGroup>
        
        {/* Password Match Indicator */}
        {confirmPassword && (
          <div className="mt-2">
            {password === confirmPassword ? (
              <small style={{ color: '#10b981' }}>
                <FaCheckCircle className="react-icon icon-left-sm" />
                Passwords match
              </small>
            ) : (
              <small style={{ color: '#dc2626' }}>
                <FaTimesCircle className="react-icon icon-left-sm" />
                Passwords do not match
              </small>
            )}
          </div>
        )}
      </Form.Group>

      <div className="mb-4">
        <Form.Check
          type="checkbox"
          id="terms-agreement"
          required
          style={{ fontSize: '0.9rem', color: 'var(--neutral-600)' }}
          label={
            <span>
              I agree to the{' '}
              <a href="#" className="text-decoration-none" style={{ color: 'var(--primary-600)' }}>
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="#" className="text-decoration-none" style={{ color: 'var(--primary-600)' }}>
                Privacy Policy
              </a>
            </span>
          }
        />
      </div>

      <Button 
        type="submit" 
        disabled={isLoading || password !== confirmPassword}
        className="w-100 fw-semibold"
        style={{
          padding: 'var(--spacing-md) var(--spacing-lg)',
          borderRadius: 'var(--radius-lg)',
          border: 'none',
          background: 'linear-gradient(135deg, var(--success) 0%, #10b981 100%)',
          fontSize: '1rem',
          transition: 'all var(--transition-base)',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          if (!isLoading && password === confirmPassword) {
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.boxShadow = 'var(--shadow-lg)';
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}
      >
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Creating account...
          </>
        ) : (
          <>
            <FaUserPlus className="react-icon icon-left" />
            Create Account
          </>
        )}
      </Button>
    </Form>
  );
};

export default RegisterForm; 