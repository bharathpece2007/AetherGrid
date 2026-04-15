import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import About from './pages/About';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/" element={<DashboardLayout />}>
        {/* Main Dashboard route */}
        <Route index element={<Dashboard />} />
        
        {/* Admin Center route */}
        <Route path="admin" element={
          <div className="surface-card" style={{padding: '24px'}}>
            <h2>Admin Command Center</h2>
            <p style={{color: 'var(--text-secondary)'}}>Welcome to the administrative portal.</p>
          </div>
        } />
        
        {/* Placeholder routes for future features */}
        <Route path="nodes" element={<div className="surface-card">Nodes page placeholder</div>} />
        <Route path="settings" element={<div className="surface-card">Settings page placeholder</div>} />
      </Route>
    </Routes>
  );
}

export default App;
