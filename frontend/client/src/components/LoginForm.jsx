import React, { useState } from 'react';
import { Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import axiosInstance from '../api/axiosInstance';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const formData = new URLSearchParams({
        username: email,
        password: password,
      });

      const response = await axiosInstance.post('/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('accessToken', data.access_token);
        onLogin(data.access_token);
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data) {
        setError(error.response.data.detail || 'Login failed');
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}
      
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold" style={{ color: 'var(--neutral-800)' }}>
          Email Address
        </Form.Label>
        <InputGroup>
          <InputGroup.Text style={{ 
            background: 'var(--neutral-50)', 
            border: '2px solid var(--neutral-200)',
            borderRight: 'none'
          }}>
            <FaEnvelope className="react-icon" style={{ color: 'var(--neutral-500)' }} />
          </InputGroup.Text>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              borderLeft: 'none',
              border: '2px solid var(--neutral-200)',
              borderRadius: '0 var(--radius-md) var(--radius-md) 0',
              padding: 'var(--spacing-sm) var(--spacing-md)',
              fontSize: '1rem'
            }}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold" style={{ color: 'var(--neutral-800)' }}>
          Password
        </Form.Label>
        <InputGroup>
          <InputGroup.Text style={{ 
            background: 'var(--neutral-50)', 
            border: '2px solid var(--neutral-200)',
            borderRight: 'none'
          }}>
            <FaLock className="react-icon" style={{ color: 'var(--neutral-500)' }} />
          </InputGroup.Text>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              borderLeft: 'none',
              border: '2px solid var(--neutral-200)',
              borderRadius: '0 var(--radius-md) var(--radius-md) 0',
              padding: 'var(--spacing-sm) var(--spacing-md)',
              fontSize: '1rem'
            }}
          />
        </InputGroup>
      </Form.Group>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-100 fw-semibold"
        style={{
          borderRadius: 'var(--radius-md)',
          padding: 'var(--spacing-md) var(--spacing-lg)',
          background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
          border: 'none',
          fontSize: '1.1rem'
        }}
      >
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
            Logging in...
          </>
        ) : (
          <>
            <FaSignInAlt className="react-icon icon-left" />
            Log In
          </>
        )}
      </Button>
    </Form>
  );
};

export default LoginForm; 