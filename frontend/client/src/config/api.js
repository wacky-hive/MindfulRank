// API Configuration
export const API_BASE_URL = 'http://127.0.0.1:8001';

// Stripe Configuration
export const STRIPE_PUBLISHABLE_KEY = 'pk_test_51234567890_test_key_here'; // Replace with your actual Stripe publishable key

// Helper function to create API URLs
export const createApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

// Helper function to create authenticated headers
export const createAuthHeaders = (token) => {
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}; 