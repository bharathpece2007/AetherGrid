import React from 'react';
import { Battery, Zap, AlertTriangle, TrendingUp, Clock, Power } from 'lucide-react';
import './BatteryTab.css';

const BatteryTab = () => {
  return (
    <div className="battery-container fade-in">
      <div className="battery-header mb-lg">
        <h1>Battery Storage</h1>
        <p className="text-muted">Advanced monitoring and deep cycle control</p>
      </div>

      <div className="battery-grid">
        {/* Big Visual: The Battery Level */}
        <div className="surface-card battery-main-card">
          <div className="battery-graphic-wrapper">
            <div className="battery-svg-visual">
              <div className="battery-cap"></div>
              <div className="battery-body">
                <div className="battery-fill" style={{ height: '85%' }}></div>
                <div className="battery-text-overlay">
                  <span className="big-percent">85%</span>
                  <span className="battery-status">Discharging (Low)</span>
                </div>
              </div>
            </div>
            
            <div className="battery-kpis">
              <div className="bkpi">
                <span className="bkpi-label">Current State</span>
                <span className="bkpi-val text-green">Stable</span>
              </div>
              <div className="bkpi">
                <span className="bkpi-label">Cycle Health</span>
                <span className="bkpi-val">98% (Optimal)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info & Actions */}
        <div className="battery-side-cluster flex-col gap-lg">
          
          <div className="surface-card p-xl flex gap-lg stats-card">
            <div className="stat-block">
              <Zap size={24} className="text-blue mb-sm" />
              <span className="text-muted text-sm uppercase font-bold">Discharge Rate</span>
              <h3 className="m-0 mt-sm">2.1 kW</h3>
            </div>
            <div className="stat-block">
              <Clock size={24} className="text-yellow mb-sm" />
              <span className="text-muted text-sm uppercase font-bold">Backup Time Rem.</span>
              <h3 className="m-0 mt-sm text-yellow">14h 20m</h3>
            </div>
          </div>

          <div className="surface-card p-xl alert-card warning">
            <div className="flex items-center gap-sm mb-md">
              <AlertTriangle size={20} className="text-yellow" />
              <h3 className="m-0">Pre-charge Alert</h3>
            </div>
            <p className="text-sm line-height-relaxed m-0 text-muted">
              Severe thunder system approaching in 4 hours. Automated safety protocol suggests holding peak charge.
            </p>
          </div>

          <div className="surface-card p-xl">
            <h3 className="mt-0 mb-md">Smart Actions</h3>
            <div className="action-buttons flex-col gap-sm">
              <button className="btn-action primary-action">
                <div className="icon-wrap"><TrendingUp size={18} /></div>
                <div className="action-text">
                  <strong>Charge Now</strong>
                  <span>Low tariff active ($0.08/kWh)</span>
                </div>
              </button>
              
              <button className="btn-action secondary-action">
                <div className="icon-wrap"><Power size={18} /></div>
                <div className="action-text">
                  <strong>Discharge to Grid</strong>
                  <span>Export at high incentive rate</span>
                </div>
              </button>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default BatteryTab;
