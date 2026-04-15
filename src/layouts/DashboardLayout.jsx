import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Bell, User, CloudRain, Sun, Moon, LogOut, UserCircle } from 'lucide-react';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const navigate = useNavigate();

  const userName = localStorage.getItem('userName') || 'Guest User';
  const userEmail = localStorage.getItem('userEmail') || 'guest@aethergrid.com';

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

  return (
    <div className={`layout-container ${theme}-theme`}>
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

            <button className="icon-btn theme-toggle" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button className="icon-btn">
              <Bell size={20} />
            </button>

            <div className="profile-container">
              <button 
                className={`icon-btn profile-trigger ${isProfileOpen ? 'active' : ''}`}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <User size={20} />
              </button>

              {isProfileOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <p className="user-name">{userName}</p>
                    <p className="user-email">{userEmail}</p>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item">
                    <UserCircle size={18} />
                    <span>Profile</span>
                  </button>
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
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
