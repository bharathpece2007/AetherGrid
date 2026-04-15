import React from 'react';
import { 
  Grid, Shield, Layout, Settings, Zap, 
  Activity, Navigation, Sun, Wind, CloudRain, ShieldAlert, Database
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ role, activeTab, setActiveTab }) => {
  const adminTabs = [
    { id: 'grid-overview', label: 'Grid Overview', icon: Grid },
    { id: 'live-monitoring', label: 'Live Monitoring', icon: Activity },
    { id: 'control-center', label: 'Control Center', icon: Navigation },
    { id: 'der-management', label: 'DER Management', icon: Zap },
    { id: 'forecast-ai', label: 'Forecast & AI', icon: Layout },
    { id: 'energy-distribution', label: 'Energy Distribution', icon: Wind },
    { id: 'resilience', label: 'Resilience', icon: ShieldAlert },
    { id: 'dataset', label: 'Dataset Explorer', icon: Database }
  ];

  const userTabs = [
    { id: 'overview', label: 'Overview', icon: Grid },
    { id: 'energy-flow', label: 'Energy Flow', icon: Activity },
    { id: 'battery', label: 'Battery', icon: Zap },
    { id: 'smart-control', label: 'Smart Control', icon: Settings },
    { id: 'energy-sharing', label: 'Energy Sharing', icon: Sun },
    { id: 'weather-alerts', label: 'Weather & Alerts', icon: CloudRain }
  ];

  const tabs = role === 'admin' ? adminTabs : userTabs;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">
          <Zap size={20} color="#000" fill="#000" />
        </div>
        <div className="brand-info">
          <h2 className="brand-title">Grid Control</h2>
          <span className="brand-subtitle">{role === 'admin' ? 'Admin Center' : 'VPP Node 042'}</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <nav className="sidebar-nav bottom-nav">
          <button className="nav-item" style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
