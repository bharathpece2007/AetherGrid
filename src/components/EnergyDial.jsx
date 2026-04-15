import React from 'react';
import './EnergyDial.css';

const EnergyDial = ({ title, percentage, color = 'var(--primary)', unit = '%' }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  // Calculate dash offset based on percentage logic for a 3/4 circle
  const dashoffset = circumference - (percentage * 10 / 100) * circumference;

  return (
    <div className="energy-dial-container">
      {title && <h3 className="dial-title">{title}</h3>}
      <div className="dial-wrapper">
        <svg fill="transparent" width="220" height="220" viewBox="0 0 220 220">
          <circle
            className="dial-bg"
            cx="110"
            cy="110"
            r={radius}
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.25} /* make it a partial circle */
            strokeLinecap="round"
            transform="rotate(135 110 110)"
          />
          <circle
            className="dial-progress"
            cx="110"
            cy="110"
            r={radius}
            strokeWidth="14"
            stroke={color}
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            strokeLinecap="round"
            transform="rotate(135 110 110)"
          />
        </svg>
        <div className="dial-content">
          <span className="dial-value display-num font-bold">{percentage}</span>
          <span className="dial-unit">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default EnergyDial;
