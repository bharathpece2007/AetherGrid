import React, { useState } from 'react';
import { Settings, Wind, Car, Droplets, Zap, ShieldCheck } from 'lucide-react';
import './SmartControl.css';

const ApplianceCard = ({ icon: Icon, name, usage, status, setStatus }) => (
  <div className={`appliance-card surface-card ${status ? 'active' : ''}`}>
    <div className="flex justify-between items-start mb-md">
      <div className="icon-wrap bg-blue-subtle">
        <Icon size={24} className={status ? 'text-blue' : 'text-muted'} />
      </div>
      <label className="toggle-switch">
        <input type="checkbox" checked={status} onChange={() => setStatus(!status)} />
        <span className="slider"></span>
      </label>
    </div>
    <div className="appliance-info">
      <h3>{name}</h3>
      <p className="text-muted">{status ? `Consuming ${usage} kW` : 'Standby / Off'}</p>
    </div>
    {status && (
      <div className="slider-container mt-md">
        <div className="flex justify-between text-xs text-muted mb-xs">
          <span>Power Limit</span>
          <span>Max</span>
        </div>
        <input type="range" min="1" max="100" defaultValue="100" className="range-slider" />
      </div>
    )}
  </div>
);

const SmartControl = () => {
  const [autoLoad, setAutoLoad] = useState(true);
  const [reduceUsage, setReduceUsage] = useState(false);
  const [shiftUsage, setShiftUsage] = useState(false);

  const [acState, setAcState] = useState(true);
  const [evState, setEvState] = useState(true);
  const [washState, setWashState] = useState(false);

  return (
    <div className="admin-tab-container fade-slide-up">
      <div className="tab-header mb-xl flex justify-between items-center">
        <div>
          <h1>Smart Control</h1>
          <p className="text-muted">Automated demand-side reduction configuration.</p>
        </div>
        <div className="flex items-center gap-xl">
          <div className="incentive-badge bg-green-subtle px-xl py-md rounded-2xl flex flex-col items-end">
            <span className="text-[10px] font-black tracking-widest uppercase text-muted">Earned [Monthly]</span>
            <span className="text-xl font-black text-green">₹ 2,450</span>
          </div>
          <div className="status-badge live admin-pulse">
            <span className="dot pulse bg-blue"></span>
            AI Active
          </div>
        </div>
      </div>

      <div className="control-grid">
        {/* Master Controls */}
        <div className="master-controls surface-card pb-xl">
          <div className="flex items-center gap-sm mb-lg border-b pb-md">
            <ShieldCheck size={24} className="text-blue" />
            <h2 className="m-0">Master Protocols</h2>
          </div>

          <div className="master-toggles flex-col gap-lg">
            <div className="m-toggle-row">
              <div className="mt-info">
                <h4>Auto Load Control</h4>
                <p>AI will automatically throttle non-critical appliances during grid stress.</p>
              </div>
              <label className="toggle-switch large">
                <input type="checkbox" checked={autoLoad} onChange={() => setAutoLoad(!autoLoad)} />
                <span className="slider"></span>
              </label>
            </div>

            <div className="m-toggle-row">
              <div className="mt-info">
                <h4>Force Reduce Usage</h4>
                <p>Instantly cap household consumption to 50% baseline.</p>
              </div>
              <label className="toggle-switch large">
                <input type="checkbox" checked={reduceUsage} onChange={() => setReduceUsage(!reduceUsage)} />
                <span className="slider"></span>
              </label>
            </div>

            <div className="m-toggle-row">
              <div className="mt-info">
                <h4>Shift Usage Allocation</h4>
                <p>Delay scheduled high-load tasks (EV charge, Laundry) to midnight.</p>
              </div>
              <label className="toggle-switch large">
                <input type="checkbox" checked={shiftUsage} onChange={() => setShiftUsage(!shiftUsage)} />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Individual Appliances */}
        <div className="appliance-grid">
          <ApplianceCard icon={Wind} name="HVAC System" usage="1.8" status={acState} setStatus={setAcState} />
          <ApplianceCard icon={Car} name="EV Charger (Tesla)" usage="7.2" status={evState} setStatus={setEvState} />
          <ApplianceCard icon={Droplets} name="Washing Machine" usage="0.5" status={washState} setStatus={setWashState} />
          <ApplianceCard icon={Zap} name="Water Heater" usage="2.0" status={true} setStatus={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default SmartControl;
