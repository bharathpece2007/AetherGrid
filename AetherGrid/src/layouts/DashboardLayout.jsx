import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../pages/Dashboard';
import EnergyFlow from '../pages/EnergyFlow';
import BatteryTab from '../pages/BatteryTab';
import SmartControl from '../pages/SmartControl';
import EnergySharing from '../pages/EnergySharing';
import WeatherAlerts from '../pages/WeatherAlerts';

import AdminOverview from '../pages/AdminOverview';
import AdminLiveMonitoring from '../pages/AdminLiveMonitoring';
import AdminControlCenter from '../pages/AdminControlCenter';
import AdminDERManagement from '../pages/AdminDERManagement';
import AdminForecastAI from '../pages/AdminForecastAI';
import AdminEnergyDistribution from '../pages/AdminEnergyDistribution';
import AdminResilience from '../pages/AdminResilience';
import AdminDataset from '../pages/AdminDataset';

import { Bell, User, CloudRain, Sun, Moon, Link as LinkIcon, Shield, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem('userRole') || 'user');
  const [activeTab, setActiveTab] = useState(role === 'admin' ? 'grid-overview' : 'overview');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  // Sync default tab if role changes
  useEffect(() => {
    setActiveTab(role === 'admin' ? 'grid-overview' : 'overview');
  }, [role]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  // Render main content dynamically based on activeTab
  const renderContent = () => {
    // Shared user dash
    // Shared user dash
    if (activeTab === 'overview') return <Dashboard role={role} theme={theme} />;
    
    // User Tabs
    if (activeTab === 'energy-flow') return <EnergyFlow theme={theme} />;
    if (activeTab === 'battery') return <BatteryTab theme={theme} />;
    if (activeTab === 'smart-control') return <SmartControl theme={theme} />;
    if (activeTab === 'energy-sharing') return <EnergySharing theme={theme} />;
    if (activeTab === 'weather-alerts') return <WeatherAlerts theme={theme} />;

    // Admin Tabs
    if (activeTab === 'grid-overview') return <AdminOverview theme={theme} />;
    if (activeTab === 'live-monitoring') return <AdminLiveMonitoring theme={theme} />;
    if (activeTab === 'control-center') return <AdminControlCenter theme={theme} />;
    if (activeTab === 'der-management') return <AdminDERManagement theme={theme} />;
    if (activeTab === 'forecast-ai') return <AdminForecastAI theme={theme} />;
    if (activeTab === 'energy-distribution') return <AdminEnergyDistribution theme={theme} />;
    if (activeTab === 'resilience') return <AdminResilience theme={theme} />;
    if (activeTab === 'dataset') return <AdminDataset theme={theme} />;

    // Fallback
    return null;
  };

  return (
    <div className={`layout-container ${theme}-theme`}>
      <Sidebar role={role} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="layout-main">
        {/* Top Header Bar inside Main Content */}
        <header className="top-header">
          <nav className="top-nav" style={{ flex: 1 }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>
              {activeTab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </h2>
          </nav>
          
          <div className="top-header-actions">
            
            <div className="header-chip" style={{ color: role === 'admin' ? 'var(--accent-green)' : 'inherit' }}>
              {role === 'admin' ? <Shield size={16} /> : <User size={16} />}
              <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>{role === 'admin' ? 'ADMIN' : 'USER'}</span>
            </div>

            <div className="header-chip">
              <CloudRain size={16} />
              <span>Cloudy: Solar drop</span>
            </div>

            <button className="icon-btn theme-toggle" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button className="icon-btn" onClick={handleLogout} style={{ color: 'var(--text-danger)' }} title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        <main className="main-content" style={{ animation: 'fadeIn 0.3s ease-out' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
