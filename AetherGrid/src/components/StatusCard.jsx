import React from 'react';
import './StatusCard.css';

const StatusCard = ({ 
  title, 
  value, 
  unit, 
  status = 'neutral', 
  subtitle,
  icon: Icon,
  progress,
  progressColor = 'var(--accent-green)',
  variant = 'default',
  badge
}) => {
  if (variant === 'dark') {
    return (
      <div className={`status-card dark-card`}>
        <div className="dark-card-header">
          <div className="icon-wrapper blue-bg">
            {Icon && <Icon size={16} color="#fff" />}
          </div>
          <h3>{title}</h3>
          
          {/* Custom Toggle Switch for Reduce Usage */}
          <div className="custom-toggle">
            <div className="toggle-thumb" />
          </div>
        </div>
        <p className="dark-card-text text-muted">{subtitle}</p>
        {badge && (
          <div className="dark-card-footer">
            <span className="footer-label">Current Incentive</span>
            <span className="text-green font-bold">{badge}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`status-card surface-card`}>
      <div className="status-header">
        <h3 className="status-title">{title}</h3>
        {Icon && <Icon size={20} className={status === 'cloudy' ? 'text-muted' : 'text-blue'} />}
      </div>
      
      {value && (
        <div className="status-body">
          <span className="display-num value">{value}</span>
          {unit && <span className="unit">{unit}</span>}
        </div>
      )}

      {progress !== undefined && (
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%`, backgroundColor: progressColor }} />
        </div>
      )}

      {(subtitle || badge) && (
        <div className="status-footer justify-between flex items-center">
           <div className={`status-subtitle ${status === 'cloudy' ? 'text-danger' : 'text-muted'}`}>
              {subtitle}
           </div>
           {badge && <div className={status === 'cloudy' ? 'text-muted' : 'text-green font-bold text-xs badge badge-outline'}>{badge}</div>}
        </div>
      )}
    </div>
  );
};

export default StatusCard;
