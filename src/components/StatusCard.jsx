import React from 'react';
import './StatusCard.css';

const StatusCard = ({ title, value, unit, status = 'neutral', subtitle }) => {
  return (
    <div className={`status-card surface-card status-${status}`}>
      <div className="status-header">
        <h3 className="status-title">{title}</h3>
        {status !== 'neutral' && (
          <div className={`status-indicator indicator-${status}`} />
        )}
      </div>
      <div className="status-body">
        <span className="display-num value">{value}</span>
        {unit && <span className="unit">{unit}</span>}
      </div>
      {subtitle && <div className="status-subtitle text-muted">{subtitle}</div>}
    </div>
  );
};

export default StatusCard;
