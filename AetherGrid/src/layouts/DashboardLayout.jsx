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
import WeatherCenter from '../pages/WeatherCenter';
import AdminForecastAI from '../pages/AdminForecastAI';
import AdminEnergyDistribution from '../pages/AdminEnergyDistribution';
import AdminResilience from '../pages/AdminResilience';
import AdminDataset from '../pages/AdminDataset';
import AdminBilling from '../pages/AdminBilling';
import AIChatBot from '../components/AIChatBot';

import { 
  Bell, User, CloudRain, Sun, Moon, Link as LinkIcon, Shield, LogOut,
  Grid, Activity, Zap, Server, TrendingUp, BarChart2, ShieldAlert,
  Database, Layout, ThermometerSun, CreditCard, Network
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentWeather } from '../services/weatherService';
import logo from '../assets/logo.png';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem('userRole') || 'user');
  const [activeTab, setActiveTab] = useState(role === 'admin' ? 'grid-overview' : 'overview');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [weather, setWeather] = useState(null);

  const adminTabs = [
    { id: 'grid-overview', label: 'System Overview', icon: Grid },
    { id: 'live-monitoring', label: 'Network Monitoring', icon: Activity },
    { id: 'control-center', label: 'Operations and Control', icon: Zap },
    { id: 'der-management', label: 'Assets & Solar Management', icon: Server },
    { id: 'weather-center', label: 'Weather Intelligence', icon: ThermometerSun },
    { id: 'forecast-ai', label: 'Forecasting and Intelligence', icon: TrendingUp },
    { id: 'resilience', label: 'Resilience and Recovery', icon: ShieldAlert },
    { id: 'dataset', label: 'Data and Analytics', icon: Database },
    { id: 'billing', label: 'Finance & Billing', icon: CreditCard },
  ];

  const userTabs = [
    { id: 'overview', label: 'Node Overview', icon: Layout },
    { id: 'energy-sharing', label: 'P2P Exchange', icon: Network },
    { id: 'battery', label: 'Critical Storage', icon: Server },
    { id: 'weather-alerts', label: 'Weather Intel', icon: ThermometerSun },
    { id: 'billing', label: 'Finance & Billing', icon: CreditCard },
  ];

  const tabs = role === 'admin' ? adminTabs : userTabs;

  useEffect(() => {
    const getW = async () => {
      const data = await fetchCurrentWeather();
      setWeather(data);
    };
    getW();
  }, []);

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
    if (activeTab === 'grid-overview') return <AdminOverview theme={theme} setActiveTab={setActiveTab} />;
    if (activeTab === 'live-monitoring') return <AdminLiveMonitoring theme={theme} setActiveTab={setActiveTab} />;
    if (activeTab === 'control-center') return <AdminControlCenter theme={theme} setActiveTab={setActiveTab} />;
    if (activeTab === 'der-management') return <AdminDERManagement theme={theme} setActiveTab={setActiveTab} />;
    if (activeTab === 'weather-center') return <WeatherCenter theme={theme} setActiveTab={setActiveTab} />;
    if (activeTab === 'forecast-ai') return <AdminForecastAI theme={theme} setActiveTab={setActiveTab} />;
    if (activeTab === 'resilience') return <AdminResilience theme={theme} setActiveTab={setActiveTab} />;
    if (activeTab === 'dataset') return <AdminDataset theme={theme} setActiveTab={setActiveTab} />;
    if (activeTab === 'billing') return <AdminBilling theme={theme} setActiveTab={setActiveTab} />;

    // Fallback
    return null;
  };

  return (
    <div className={`layout-container ${theme}-theme flex-row`}>
      {/* Tactical Sidebar Restored to Left */}
      <Sidebar role={role} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="layout-main-segment flex-col flex-1 min-screen relative">
        {/* Pinned Command Header: THEME SYNCHRONIZED */}
        <header className="pinned-header glass-header">
          <div className="header-left-command flex items-center gap-xl">
            <div className="branding-pinned">
              <div className="logo-fallback-gold">AG</div>
              <span className="brand-name-pinned">AETHER GRID</span>
            </div>
          </div>

          <div className="header-right-command flex items-center gap-xl">
            <div className="header-utilities-pinned flex items-center gap-lg">
              <div className="header-chip-pinned weather-pill">
                {weather?.weather[0]?.main === 'Clear' ? <Sun size={14} className="text-white" /> : <CloudRain size={14} className="text-white" />}
                <span className="text-white font-bold">{weather ? `${Math.round(weather.main.temp)}°C` : '--°C'}</span>
              </div>

              <div className="command-actions-pinned flex gap-md">
                <button className="icon-utility-btn theme-toggle" onClick={toggleTheme} title="Toggle Atmosphere">
                  {theme === 'dark' ? <Sun size={18} className="text-white" /> : <Moon size={18} className="text-white" />}
                </button>

                <button className="icon-utility-btn logout-btn-pinned" onClick={handleLogout} title="Terminate Session">
                  <LogOut size={18} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="main-viewport-segment overflow-y-auto" style={{ animation: 'fadeIn 0.4s ease-out' }}>
          {renderContent()}
        </main>
      </div>

      {/* AI Chatbot Floating Widget */}
      <AIChatBot />
    </div>
  );
};

export default DashboardLayout;
