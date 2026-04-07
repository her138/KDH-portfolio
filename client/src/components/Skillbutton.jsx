// src/components/SkillButton.jsx
import React from 'react';
import './SkillButton.css'; // We'll create this CSS file next

const SkillButton = ({ children }) => {
  return (
    <div className="button-wrap">
      <button>
        <span>{children}</span>
      </button>
      <div className="button-shadow"></div>
    </div>
  );
};

export default SkillButton;