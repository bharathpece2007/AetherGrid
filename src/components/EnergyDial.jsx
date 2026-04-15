import React from 'react';
import './EnergyDial.css';

const EnergyDial = ({ title, percentage, color = 'var(--primary)' }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="energy-dial-container">
      <h3 className="dial-title">{title}</h3>
      <div className="dial-wrapper">
        <svg fill="transparent" width="160" height="160" viewBox="0 0 160 160">
          <circle
            className="dial-bg"
            cx="80"
            cy="80"
            r={radius}
            strokeWidth="12"
          />
          <circle
            className="dial-progress"
            cx="80"
            cy="80"
            r={radius}
            strokeWidth="12"
            stroke={color}
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            strokeLinecap="round"
            transform="rotate(-90 80 80)"
          />
        </svg>
        <div className="dial-content">
          <span className="dial-value display-num">{percentage}</span>
          <span className="dial-percent">%</span>
        </div>
      </div>
    </div>
  );
};

export default EnergyDial;
