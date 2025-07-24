import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{
        background: 'none',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        color: theme === 'light' ? '#666' : '#fff'
      }}
    >
      {theme === 'light' ? (
        <FaMoon 
          className="react-icon"
          style={{ fontSize: '1.1rem' }}
        />
      ) : (
        <FaSun 
          className="react-icon"
          style={{ fontSize: '1.1rem' }}
        />
      )}
    </button>
  );
};

export default ThemeToggle; 