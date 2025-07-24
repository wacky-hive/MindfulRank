import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { FaStar, FaPaperPlane, FaTimes } from 'react-icons/fa';
import axiosInstance from '../api/axiosInstance';

const TestimonialForm = ({ show, onHide, token }) => {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [testimonial, setTestimonial] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!testimonial.trim() || testimonial.length < 20) {
      setError('Please write at least 20 characters for your testimonial.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await axiosInstance.post('/testimonials', {
        rating,
        testimonial: testimonial.trim(),
        company: company.trim(),
        job_title: jobTitle.trim()
      });

      if (response.status === 201) {
        setShowSuccess(true);
        // Reset form
        setTestimonial('');
        setCompany('');
        setJobTitle('');
        setRating(5);
        
        // Close modal after success message
        setTimeout(() => {
          setShowSuccess(false);
          onHide();
        }, 2000);
      }
    } catch (err) {
      console.error('Testimonial error:', err);
      if (err.response && err.response.data) {
        setError(err.response.data.detail || 'Failed to submit testimonial. Please try again.');
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isActive = starValue <= (hoveredRating || rating);
      
      return (
        <FaStar
          key={index}
          className="react-icon"
          style={{
            fontSize: '2rem',
            color: isActive ? '#ffd700' : '#e4e5e9',
            cursor: 'pointer',
            marginRight: '0.25rem',
            transition: 'color 0.2s ease'
          }}
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
        />
      );
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header style={{ borderBottom: '1px solid var(--border)' }}>
        <Modal.Title className="d-flex align-items-center">
          <FaStar className="react-icon icon-left" style={{ color: '#ffd700' }} />
          Share Your Experience
        </Modal.Title>
        <Button
          variant="link"
          onClick={onHide}
          className="p-0 ms-auto border-0"
          style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}
        >
          <FaTimes className="react-icon" />
        </Button>
      </Modal.Header>

      <Modal.Body style={{ padding: '2rem' }}>
        {showSuccess && (
          <Alert variant="success" className="mb-4">
            <strong>Thank you!</strong> Your testimonial has been submitted and will be reviewed before publication.
          </Alert>
        )}

        {!showSuccess && (
          <Form onSubmit={handleSubmit}>
            {error && (
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
            )}

            {/* Rating Section */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold mb-3">How would you rate MindfulRank?</Form.Label>
              <div className="d-flex align-items-center mb-2">
                {renderStars()}
                <span className="ms-3 text-muted">
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent'}
                </span>
              </div>
            </Form.Group>

            {/* Testimonial Text */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Your Experience</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Tell us about your experience with MindfulRank. How has it helped your business? What results have you seen?"
                value={testimonial}
                onChange={(e) => setTestimonial(e.target.value)}
                required
                style={{
                  borderRadius: 'var(--radius-lg)',
                  border: '2px solid var(--border)',
                  fontSize: '1rem',
                  padding: '1rem'
                }}
              />
              <Form.Text className="text-muted">
                Minimum 20 characters ({testimonial.length}/20)
              </Form.Text>
            </Form.Group>

            {/* Company */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Company (Optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                style={{
                  borderRadius: 'var(--radius-lg)',
                  border: '2px solid var(--border)',
                  fontSize: '1rem',
                  padding: '1rem'
                }}
              />
            </Form.Group>

            {/* Job Title */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Job Title (Optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your role or profession"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                style={{
                  borderRadius: 'var(--radius-lg)',
                  border: '2px solid var(--border)',
                  fontSize: '1rem',
                  padding: '1rem'
                }}
              />
            </Form.Group>

            {/* Submit Button */}
            <div className="d-flex justify-content-end gap-3">
              <Button
                variant="outline-secondary"
                onClick={onHide}
                disabled={isSubmitting}
                style={{ borderRadius: 'var(--radius-lg)', padding: '0.75rem 1.5rem' }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting || testimonial.length < 20}
                style={{ borderRadius: 'var(--radius-lg)', padding: '0.75rem 1.5rem' }}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="react-icon icon-left" />
                    Submit Testimonial
                  </>
                )}
              </Button>
            </div>

            <div className="mt-4 p-3" style={{ background: 'var(--bg-light)', borderRadius: 'var(--radius-lg)' }}>
              <small className="text-muted">
                <strong>Privacy Notice:</strong> Your testimonial will be reviewed before publication. 
                We may edit for length and clarity. Your name will be displayed as initials only (e.g., "John D.").
              </small>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default TestimonialForm; 