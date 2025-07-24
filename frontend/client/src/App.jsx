import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import theme provider
import { ThemeProvider } from './contexts/ThemeContext';
import StripeProvider from './contexts/StripeContext';

// Import auth utilities
import { isAuthenticated, clearAuth, isTokenExpired } from './utils/auth';

// Import components
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import PricingPage from './components/PricingPage';
import DocumentationPage from './components/DocumentationPage';
import APIReferencePage from './components/APIReferencePage';
import APIPricingPage from './components/APIPricingPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentCancel from './components/PaymentCancel';
import Footer from './components/Footer';

// Create a component that uses the navigate hook
function AppContent() {
  const [token, setToken] = useState(() => {
    // Only set token if it's valid (not expired)
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken && !isTokenExpired(storedToken)) {
      return storedToken;
    }
    // Clear invalid/expired token
    if (storedToken) {
      localStorage.removeItem('accessToken');
    }
    return null;
  });
  const navigate = useNavigate();

  // Check for token validity periodically
  React.useEffect(() => {
    const checkTokenValidity = () => {
      const currentToken = localStorage.getItem('accessToken');
      
      // If no token in storage but we have one in state, clear it
      if (!currentToken && token) {
        setToken(null);
        return;
      }
      
      // If token exists but is expired, clear it and logout
      if (currentToken && isTokenExpired(currentToken)) {
        localStorage.removeItem('accessToken');
        setToken(null);
        navigate('/login?sessionExpired=1', { replace: true });
        return;
      }
      
      // If token in storage differs from state, update state
      if (currentToken !== token) {
        setToken(currentToken);
      }
    };

    // Check immediately
    checkTokenValidity();

    // Check every 30 seconds (less frequent than before)
    const interval = setInterval(checkTokenValidity, 30000);
    
    return () => clearInterval(interval);
  }, [token, navigate]);

  const handleLoginSuccess = (newToken) => {
    localStorage.setItem('accessToken', newToken);
    setToken(newToken);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    clearAuth();
    setToken(null);
    navigate('/login', { replace: true });
  };

  return (
    <div className="app">
      <Navigation token={token} onLogout={handleLogout} />
      
      <main className="main-content">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
          <Route path="/api-reference" element={<APIReferencePage />} />
          <Route path="/api-pricing" element={<APIPricingPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          
          {/* Auth routes */}
          <Route 
            path="/login" 
            element={token ? <Navigate to="/dashboard" replace /> : <LoginPage token={token} onLoginSuccess={handleLoginSuccess} />} 
          />
          <Route 
            path="/register" 
            element={token ? <Navigate to="/dashboard" replace /> : <RegisterPage token={token} />} 
          />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={token ? <DashboardPage token={token} /> : <Navigate to="/login" replace />} 
          />
          
          {/* Payment routes */}
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
          
          {/* Redirect old paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

// Main App component that provides Router and Theme context
function App() {
  return (
    <ThemeProvider>
      <StripeProvider>
        <Router>
          <AppContent />
        </Router>
      </StripeProvider>
    </ThemeProvider>
  );
}

export default App;
