// src/components/GlassButton.jsx
import React from 'react';
import './GlassButton.css';

const GlassButton = ({ 
  children, 
  onClick, 
  href, 
  icon: Icon, 
  iconSize = 20,
  className = '',
  type = 'button',
  fullWidth = false,
  disabled = false
}) => {

  const ButtonContent = () => (
    <span className="button-content">
      {Icon && <Icon size={iconSize} className="button-icon" />}
      <span>{children}</span>
    </span>
  );

  if (href) {
    return (
      <div className={`glass-button-wrapper ${fullWidth ? 'w-full' : ''}`}>
        <a href={href} className={`glass-button ${className}`}>
          <ButtonContent />
        </a>
        <div className="button-shadow"></div>
      </div>
    );
  }

  return (
    <div className={`glass-button-wrapper ${fullWidth ? 'w-full' : ''}`}>
      <button 
        onClick={onClick} 
        type={type} 
        disabled={disabled}
        className={`glass-button ${className} ${fullWidth ? 'w-full' : ''}`}
      >
        <ButtonContent />
      </button>
      <div className="button-shadow"></div>
    </div>
  );
};

export default GlassButton;