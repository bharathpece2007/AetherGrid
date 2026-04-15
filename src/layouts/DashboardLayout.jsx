import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Bell, User, CloudRain } from 'lucide-react';
import './DashboardLayout.css';

const DashboardLayout = () => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="layout-main">
        {/* Top Header Bar inside Main Content */}
        <header className="top-header">
          <nav className="top-nav">
            <NavLink to="/" className={({isActive}) => isActive ? 'top-nav-item active' : 'top-nav-item'}>Dashboard</NavLink>
            <NavLink to="/assets" className={({isActive}) => isActive ? 'top-nav-item active' : 'top-nav-item'}>Assets</NavLink>
            <NavLink to="/market" className={({isActive}) => isActive ? 'top-nav-item active' : 'top-nav-item'}>Market</NavLink>
          </nav>
          
          <div className="top-header-actions">
            <div className="header-chip">
              <CloudRain size={16} />
              <span>Cloudy: Solar drop expected</span>
            </div>
            <button className="icon-btn">
              <Bell size={20} />
            </button>
            <button className="icon-btn">
              <User size={20} />
            </button>
          </div>
        </header>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
