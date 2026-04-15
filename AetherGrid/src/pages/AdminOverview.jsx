import React from 'react';
import { Activity, Users, MapPin, AlertCircle, TrendingUp, Zap, BarChart2 } from 'lucide-react';
import './Admin.css'; // Shared CSS for admin components to manage global admin animations

const AdminOverview = () => {
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
           <div className="admin-mock-chart relative" style={{ height: '300px' }}>
              <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                {/* Supply line */ }
                <path d="M0,10 C20,8 30,5 50,15 C70,25 80,10 100,5" fill="none" stroke="var(--accent-yellow)" strokeWidth="1.5" className="draw-path" />
                {/* Demand line */ }
                <path d="M0,20 C10,25 30,22 50,30 C70,35 90,20 100,15" fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" strokeDasharray="2" className="draw-path-delay" />
              </svg>
              <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-muted">
                <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
              </div>
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
