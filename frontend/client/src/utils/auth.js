/**
 * Authentication utility functions for JWT token handling
 */

/**
 * Decode a JWT token (without verification)
 * @param {string} token - The JWT token to decode
 * @returns {object|null} - Decoded payload or null if invalid
 */
export const decodeToken = (token) => {
  if (!token) return null;
  
  try {
    // JWT has 3 parts separated by dots: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    // Decode the payload (second part)
    const payload = parts[1];
    // Add padding if needed for base64 decoding
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
    const decodedPayload = atob(paddedPayload.replace(/-/g, '+').replace(/_/g, '/'));
    
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Check if a JWT token is expired
 * @param {string} token - The JWT token to check
 * @returns {boolean} - True if expired, false if still valid
 */
export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  
  // exp is in seconds, Date.now() is in milliseconds
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

/**
 * Get the expiration time of a JWT token
 * @param {string} token - The JWT token
 * @returns {Date|null} - Expiration date or null if invalid
 */
export const getTokenExpiration = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return null;
  
  return new Date(decoded.exp * 1000);
};

/**
 * Check if the current stored token is valid
 * @returns {boolean} - True if valid token exists, false otherwise
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return false;
  
  return !isTokenExpired(token);
};

/**
 * Clear authentication data from localStorage
 */
export const clearAuth = () => {
  localStorage.removeItem('accessToken');
};

/**
 * Get time until token expires in minutes
 * @param {string} token - The JWT token
 * @returns {number} - Minutes until expiration, negative if already expired
 */
export const getMinutesUntilExpiration = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return -1;
  
  const currentTime = Date.now() / 1000;
  const timeUntilExpiration = decoded.exp - currentTime;
  
  return Math.floor(timeUntilExpiration / 60);
}; 