import React from 'react';
import { 
  FaStar, FaRocket, FaShieldAlt, FaCheck, FaCogs, FaDatabase, 
  FaHome, FaHeart, FaPlus, FaEye, FaEyeSlash, FaTimes,
  FaGlobe, FaFileAlt, FaUser, FaLock, FaEnvelope
} from 'react-icons/fa';

const IconTest = () => {
  return (
    <div style={{ padding: '20px', background: '#f8f9fa', margin: '20px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
      <h3 style={{ marginBottom: '20px', color: '#495057' }}>React Icons with CSS Classes - Recommended Approach</h3>
      
      <div style={{ marginBottom: '15px', padding: '10px', background: '#fff', borderRadius: '5px' }}>
        <strong>Basic Usage Examples:</strong>
        <div style={{ marginTop: '10px' }}>
          <div style={{ marginBottom: '10px', padding: '8px', background: '#f8f9fa', borderRadius: '4px', fontFamily: 'monospace', fontSize: '14px' }}>
            {'<FaStar className="react-icon icon-left" />Dashboard'}
          </div>
          <div style={{ marginBottom: '10px' }}>
            Example: <FaStar className="react-icon icon-left" />Dashboard
          </div>
          
          <div style={{ marginBottom: '10px', padding: '8px', background: '#f8f9fa', borderRadius: '4px', fontFamily: 'monospace', fontSize: '14px' }}>
            {'<FaCheck className="react-icon icon-interactive" />'}
          </div>
          <div style={{ marginBottom: '10px' }}>
            Interactive: <FaCheck className="react-icon icon-interactive" /> (hover over me)
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '15px', padding: '10px', background: '#fff', borderRadius: '5px' }}>
        <strong>Size Classes with React Icons:</strong>
        <div style={{ marginTop: '10px' }}>
          <span style={{ marginRight: '20px' }}>
            Small: <FaStar className="react-icon" style={{ fontSize: '0.875rem' }} />
          </span>
          <span style={{ marginRight: '20px' }}>
            Medium: <FaStar className="react-icon" style={{ fontSize: '1rem' }} />
          </span>
          <span style={{ marginRight: '20px' }}>
            Large: <FaStar className="react-icon" style={{ fontSize: '1.125rem' }} />
          </span>
          <span style={{ marginRight: '20px' }}>
            XL: <FaStar className="react-icon" style={{ fontSize: '1.25rem' }} />
          </span>
          <span>
            2XL: <FaStar className="react-icon" style={{ fontSize: '1.5rem' }} />
          </span>
        </div>
      </div>

      <div style={{ marginBottom: '15px', padding: '10px', background: '#fff', borderRadius: '5px' }}>
        <strong>Common Icons Collection:</strong>
        <div style={{ marginTop: '10px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
          <div><FaStar className="react-icon icon-left" />Star</div>
          <div><FaRocket className="react-icon icon-left" />Rocket</div>
          <div><FaShieldAlt className="react-icon icon-left" />Shield</div>
          <div><FaCheck className="react-icon icon-left" />Check</div>
          <div><FaCogs className="react-icon icon-left" />Settings</div>
          <div><FaDatabase className="react-icon icon-left" />Database</div>
          <div><FaHome className="react-icon icon-left" />Home</div>
          <div><FaHeart className="react-icon icon-left" />Heart</div>
          <div><FaPlus className="react-icon icon-left" />Plus</div>
          <div><FaEye className="react-icon icon-left" />Eye</div>
          <div><FaEyeSlash className="react-icon icon-left" />Eye Slash</div>
          <div><FaTimes className="react-icon icon-left" />Times</div>
          <div><FaGlobe className="react-icon icon-left" />Globe</div>
          <div><FaFileAlt className="react-icon icon-left" />File</div>
          <div><FaUser className="react-icon icon-left" />User</div>
          <div><FaLock className="react-icon icon-left" />Lock</div>
          <div><FaEnvelope className="react-icon icon-left" />Envelope</div>
        </div>
      </div>

      <div style={{ marginBottom: '15px', padding: '10px', background: '#fff', borderRadius: '5px' }}>
        <strong>Icon States with React Icons:</strong>
        <div style={{ marginTop: '10px' }}>
          <span style={{ marginRight: '20px' }}>
            Normal: <FaHeart className="react-icon" style={{ fontSize: '1.125rem' }} />
          </span>
          <span style={{ marginRight: '20px' }}>
            Muted: <FaHeart className="react-icon" style={{ fontSize: '1.125rem', opacity: 0.7, color: '#9ca3af' }} />
          </span>
          <span style={{ marginRight: '20px' }}>
            Disabled: <FaHeart className="react-icon" style={{ fontSize: '1.125rem', opacity: 0.5, color: '#d1d5db' }} />
          </span>
          <span>
            Interactive: <FaHeart className="react-icon icon-interactive" style={{ fontSize: '1.125rem' }} />
          </span>
        </div>
      </div>

      <div style={{ marginBottom: '15px', padding: '10px', background: '#fff', borderRadius: '5px' }}>
        <strong>Spacing Examples:</strong>
        <div style={{ marginTop: '10px' }}>
          <div style={{ marginBottom: '8px' }}>
            Left spacing: <FaRocket className="react-icon icon-left" />Text with left margin
          </div>
          <div style={{ marginBottom: '8px' }}>
            Right spacing: Text with right margin<FaRocket className="react-icon icon-right" />
          </div>
          <div style={{ marginBottom: '8px' }}>
            Small left: <FaRocket className="react-icon icon-left-sm" />Text with small left margin
          </div>
        </div>
      </div>

      <div style={{ padding: '10px', background: '#e8f4f8', borderRadius: '5px', border: '1px solid #bee5eb' }}>
        <strong style={{ color: '#0c5460' }}>React Icons + CSS Classes Benefits:</strong>
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#495057' }}>
          <div>✅ <strong>Reliable imports</strong> - No missing icon issues</div>
          <div>✅ <strong>TypeScript support</strong> - Auto-completion and type safety</div>
          <div>✅ <strong>Consistent styling</strong> - CSS classes control appearance</div>
          <div>✅ <strong>Tree shaking</strong> - Only imports icons you actually use</div>
          <div>✅ <strong>Easy to replace</strong> - Just change the import and component name</div>
          <div>✅ <strong>No version conflicts</strong> - Direct React components</div>
        </div>
      </div>
    </div>
  );
};

export default IconTest; 