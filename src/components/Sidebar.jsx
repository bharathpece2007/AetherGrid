import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, LayoutDashboard, Settings, Bolt } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar surface-lowest ghost-border">
      <div className="sidebar-header">
        <Bolt className="brand-icon" size={32} />
        <span className="brand-text">Kinetic Grid</span>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/nodes" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <Activity size={20} />
          <span>Live Nodes</span>
        </NavLink>
        <NavLink to="/settings" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
