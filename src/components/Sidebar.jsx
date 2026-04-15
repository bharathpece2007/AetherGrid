import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Shield, Layout, Settings, HelpCircle, Zap } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">
          <Zap size={20} color="#000" fill="#000" />
        </div>
        <div className="brand-info">
          <h2 className="brand-title">Grid Control</h2>
          <span className="brand-subtitle">VPP Node 042</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <Grid size={18} />
          <span>User Dashboard</span>
        </NavLink>
        <NavLink to="/admin" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <Shield size={18} />
          <span>Admin Center</span>
        </NavLink>
        <NavLink to="/explorer" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <Layout size={18} />
          <span>System Explorer</span>
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <button className="btn-switch-role">Switch Role</button>
        <nav className="sidebar-nav bottom-nav">
          <NavLink to="/settings" className="nav-item">
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>
          <NavLink to="/support" className="nav-item">
            <HelpCircle size={18} />
            <span>Support</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
