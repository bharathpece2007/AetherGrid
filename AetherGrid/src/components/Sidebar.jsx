import { 
  Grid, Shield, Layout, Settings, Zap, 
  Activity, Navigation, Sun, Wind, CloudRain, ShieldAlert, Database,
  CreditCard, Network
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ role, activeTab, setActiveTab }) => {
  const adminTabs = [
    { id: 'grid-overview', label: 'System Overview', icon: Grid },
    { id: 'live-monitoring', label: 'Network Monitoring', icon: Activity },
    { id: 'control-center', label: 'Operations and Control', icon: Navigation },
    { id: 'der-management', label: 'Assets & Solar Management', icon: Zap },
    { id: 'weather-center', label: 'Weather Intelligence', icon: Sun },
    { id: 'forecast-ai', label: 'Forecasting and Intelligence', icon: Layout },
    { id: 'dataset', label: 'Data and Analytics', icon: Database }
  ];

  const userTabs = [
    { id: 'overview', label: 'Node Overview', icon: Grid },
    { id: 'energy-sharing', label: 'P2P Exchange', icon: Network },
    { id: 'battery', label: 'Critical Storage', icon: Zap },
    { id: 'weather-alerts', label: 'Weather Intel', icon: Sun }
  ];

  const tabs = role === 'admin' ? adminTabs : userTabs;

  return (
    <aside className="sidebar">
      <div className="sidebar-nav-container">
        <nav className="sidebar-nav">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <nav className="sidebar-nav bottom-nav">
          <button 
            onClick={() => setActiveTab('settings')}
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
