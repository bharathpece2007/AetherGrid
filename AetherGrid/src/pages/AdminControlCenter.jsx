import React, { useState } from 'react';
import { Sliders, AlertOctagon, ZapOff, CheckCircle, ShieldAlert } from 'lucide-react';
import './Admin.css';

const AdminControlCenter = () => {
  const [globalThrottle, setGlobalThrottle] = useState(100);

  return (
    <div className="admin-tab-container fade-slide-up">
      <div className="tab-header mb-xl">
        <div>
          <h1>Control Center</h1>
          <p className="text-muted">Master override controls and demand response triggers.</p>
        </div>
      </div>

      <div className="flex justify-center">
        {/* Sliders and Throttles */}
        <div className="surface-card p-xl" style={{ maxWidth: '800px', width: '100%' }}>
          <div className="flex items-center gap-md border-b pb-md mb-lg">
            <Sliders size={24} className="text-blue" />
            <h2 className="m-0">Global Throttling</h2>
          </div>

          <div className="throttle-block mb-xl">
            <div className="flex justify-between items-end mb-sm">
              <span className="font-bold text-sm uppercase text-muted">Baseline Allowance</span>
              <span className="text-2xl font-bold font-code text-blue">{globalThrottle}%</span>
            </div>
            <input 
              type="range" 
              min="30" max="100" 
              value={globalThrottle} 
              onChange={(e) => setGlobalThrottle(e.target.value)} 
              className="range-slider blue-slider master-slider mt-sm" 
            />
            <p className="text-xs text-muted mt-sm italic">
              Adjusting this limits the max output threshold across all non-critical DER nodes.
            </p>
          </div>

          <div className="grid-2 gap-md">
            <div className="bg-subtle p-md rounded-md">
              <span className="block text-xs uppercase text-muted mb-xs font-bold">HVAC Cap</span>
              <div className="flex justify-between">
                <span>Auto AI</span>
                <label className="toggle-switch small">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
            <div className="bg-subtle p-md rounded-md">
              <span className="block text-xs uppercase text-muted mb-xs font-bold">EV Delay</span>
              <div className="flex justify-between">
                <span>Forced</span>
                <label className="toggle-switch small">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminControlCenter;
