import React from 'react';
import { Activity, Users, MapPin, AlertCircle, TrendingUp, Zap, BarChart2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Admin.css'; // Shared CSS for admin components to manage global admin animations

const AdminOverview = ({ theme }) => {
  const data = [
    { hour: 0, demand: 150, supply: 160 },
    { hour: 1, demand: 145, supply: 158 },
    { hour: 2, demand: 142, supply: 157 },
    { hour: 3, demand: 140, supply: 156 },
    { hour: 4, demand: 138, supply: 155 },
    { hour: 5, demand: 135, supply: 153 },
    { hour: 6, demand: 132, supply: 152 },
    { hour: 7, demand: 130, supply: 150 },
    { hour: 8, demand: 128, supply: 148 },
    { hour: 9, demand: 125, supply: 147 },
    { hour: 10, demand: 120, supply: 145 },
    { hour: 11, demand: 115, supply: 143 },
    { hour: 12, demand: 112, supply: 140 },
    { hour: 13, demand: 110, supply: 142 },
    { hour: 14, demand: 112, supply: 145 },
    { hour: 15, demand: 115, supply: 148 },
    { hour: 16, demand: 120, supply: 150 },
    { hour: 17, demand: 125, supply: 152 },
    { hour: 18, demand: 130, supply: 155 },
    { hour: 19, demand: 135, supply: 158 },
    { hour: 20, demand: 140, supply: 160 },
    { hour: 21, demand: 145, supply: 162 },
    { hour: 22, demand: 150, supply: 165 },
    { hour: 23, demand: 155, supply: 168 },
  ];
  return (
    <div className="admin-tab-container fade-slide-up">
      <div className="tab-header mb-xl">
        <div>
          <h1>Grid Macro-Overview</h1>
          <p className="text-muted">Total system capacity, demand mapping, and active VPP node tracking.</p>
        </div>
        <div className="status-badge live admin-pulse">
          <span className="dot pulse bg-blue"></span>
          System Online
        </div>
      </div>

      <div className="admin-kpis grid-4 gap-xl mb-xl">
        <div className="surface-card p-xl hover-lift">
          <div className="flex justify-between items-center mb-md">
            <span className="text-muted font-bold text-sm">TOTAL DEMAND</span>
            <Activity className="text-blue" size={20} />
          </div>
          <h2 className="m-0 text-3xl font-bold">142.5 <span className="text-lg text-muted">MW</span></h2>
          <div className="flex items-center gap-xs mt-sm text-sm text-green">
            <TrendingUp size={14} /> <span>+2.4% vs avg</span>
          </div>
        </div>

        <div className="surface-card p-xl hover-lift">
          <div className="flex justify-between items-center mb-md">
            <span className="text-muted font-bold text-sm">TOTAL SUPPLY</span>
            <Zap className="text-yellow" size={20} />
          </div>
          <h2 className="m-0 text-3xl font-bold">155.0 <span className="text-lg text-muted">MW</span></h2>
          <div className="flex items-center gap-xs mt-sm text-sm text-blue">
            <span>Surplus ~12.5MW</span>
          </div>
        </div>

        <div className="surface-card p-xl hover-lift">
          <div className="flex justify-between items-center mb-md">
            <span className="text-muted font-bold text-sm">ACTIVE NODES</span>
            <Users className="text-green" size={20} />
          </div>
          <h2 className="m-0 text-3xl font-bold">4,192</h2>
          <div className="flex items-center gap-xs mt-sm text-sm text-green">
            <span>+14 joined today</span>
          </div>
        </div>

        <div className="surface-card p-xl hover-lift border-warning-subtle">
          <div className="flex justify-between items-center mb-md">
            <span className="text-muted font-bold text-sm">GRID STATUS</span>
            <MapPin className="text-yellow" size={20} />
          </div>
          <h2 className="m-0 text-3xl font-bold text-yellow">Stressed</h2>
          <div className="flex items-center gap-xs mt-sm text-sm text-muted">
            <span>Zone B load critical</span>
          </div>
        </div>
      </div>

      <div className="grid-2 gap-xl">
        <div className="surface-card p-xl">
           <div className="flex justify-between items-center mb-lg">
             <h3 className="m-0 flex items-center gap-sm"><BarChart2 size={20} className="text-blue" /> Demand vs Supply (24H)</h3>
           </div>
           <div style={{ height: '350px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#2a3b4f' : '#e2e8f0'} vertical={false} />
                  <XAxis 
                    dataKey="hour" 
                    stroke={theme === 'dark' ? '#8c9baf' : '#64748b'} 
                    fontSize={12} 
                    tickFormatter={(val) => `${val}:00`}
                  />
                  <YAxis stroke={theme === 'dark' ? '#8c9baf' : '#64748b'} fontSize={12} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: theme === 'dark' ? '#122136' : '#ffffff', 
                      border: 'none', 
                      borderRadius: '8px', 
                      color: theme === 'dark' ? '#fff' : '#000',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Line 
                    type="monotone" 
                    dataKey="demand" 
                    stroke="#98bf64" 
                    strokeWidth={3} 
                    dot={false} 
                    name="Demand (MW)"
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="supply" 
                    stroke="#eab308" 
                    strokeWidth={3} 
                    dot={false}
                    name="Supply (MW)"
                  />
                </LineChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="flex-col gap-lg">
           <div className="surface-card p-lg flex items-start gap-md border-danger">
              <AlertCircle size={24} className="text-red mt-xs pulse-slow" />
              <div>
                <h4 className="m-0 text-red mb-xs text-uppercase tracking-wider">Critical Trigger</h4>
                <p className="m-0 text-sm">Delta Substation (Sector 4) approaching 96% thermal limit. Auto-throttling localized DER HVAC reserves mapped to node ID range #4000-#4200.</p>
              </div>
           </div>
           <div className="surface-card p-lg" style={{ flex: 1, minHeight: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
             <Zap size={32} className="text-muted mb-md opacity-50" />
             <p className="text-muted text-sm text-center">System is rendering baseline stability across 8/9 main grids. No further anomalous capacity drains detected.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
