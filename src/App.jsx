import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        {/* Main Dashboard route */}
        <Route index element={<Dashboard />} />
        
        {/* Placeholder routes for future features */}
        <Route path="nodes" element={<div className="surface-card">Nodes page placeholder</div>} />
        <Route path="settings" element={<div className="surface-card">Settings page placeholder</div>} />
      </Route>
    </Routes>
  );
}

export default App;
