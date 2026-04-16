import React, { useState } from 'react';
import { Sliders, AlertOctagon, ZapOff, CheckCircle, ShieldAlert } from 'lucide-react';
import './Admin.css';

const AdminControlCenter = () => {
  const [globalThrottle, setGlobalThrottle] = useState(100);

  return (
    <div className="admin-tab-container fade-slide-up">
      <div className="tab-header mb-xl flex flex-col items-center text-center">
        <div className="flex items-center gap-md mb-xs">
          <ShieldAlert className="text-red" size={32} />
          <h1 className="m-0 text-3xl font-black tracking-tighter uppercase text-red">Operations Control Center</h1>
        </div>
        <p className="text-muted text-[10px] uppercase tracking-widest font-black">Master override controls and automated demand response triggers</p>
      </div>

      <div className="flex flex-col gap-lg px-lg">
        {/* Massive Emergency Response Card */}
        <div className="surface-card p-0 border border-red/40 bg-black/40 overflow-hidden rounded-3xl">
          <div className="p-xl border-b border-red/20 bg-red/5 flex justify-between items-center px-2xl">
            <h2 className="m-0 flex items-center gap-md text-red font-black text-xl uppercase tracking-widest"><ShieldAlert size={32} /> Emergency Response Unit</h2>
            <div className="flex gap-sm">
              <div className="border border-red text-[10px] font-black text-red px-md py-1 rounded-full animate-pulse uppercase tracking-widest bg-red/10">4 Critical Events Deterred</div>
            </div>
          </div>

          <div className="p-2xl grid-2 gap-xl">
            {/* Alert 1: Cascading Failure - RED EMERGENCY */}
            <div className="surface-card border-red-tactical relative overflow-hidden group" style={{ padding: '20px' }}>
              <div className="flex justify-between items-start mb-md">
                <h3 className="m-0 text-red font-black uppercase tracking-widest text-sm flex items-center gap-sm">
                  <AlertOctagon size={18} /> South Hub: Cascading Failure
                </h3>
                <span className="text-[10px] font-black border border-red text-red px-md py-1 rounded uppercase tracking-widest">Immediate Action</span>
              </div>
              <p className="text-[11px] text-white/80 font-medium leading-relaxed mb-xl">
                Primary Transformer T-09 de-synchronized. Voltage drop in Sector 7/8. Outage imminent if not isolated.
              </p>
              <div className="flex gap-md">
                <button className="flex-1 bg-red text-white border-none py-md rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer transition-all hover:scale-105 active:scale-95">Isolate Grid</button>
                <button className="flex-1 bg-transparent text-red border border-red py-md rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-red/10">Shed Load</button>
              </div>
            </div>

            {/* Alert 2: Thermal Overload - YELLOW ALERT */}
            <div className="surface-card border-yellow-tactical relative overflow-hidden" style={{ padding: '20px' }}>
              <div className="flex justify-between items-start mb-md">
                <h3 className="m-0 text-yellow-500 font-black uppercase tracking-widest text-sm flex items-center gap-sm">
                  <AlertOctagon size={18} /> Delta Substation: Multi-Node Heat
                </h3>
                <span className="text-[10px] font-black border border-yellow-500 text-yellow-500 px-md py-1 rounded uppercase tracking-widest">Thermal Spike</span>
              </div>
              <p className="text-[11px] text-white/80 font-medium leading-relaxed mb-xl">
                Sector 4 thermal limits reached at 96.2%. HVAC reserves exhausted. Localized brownout potential high.
              </p>
              <div className="flex gap-md">
                <button className="flex-1 bg-yellow-500 text-black border-none py-md rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:scale-105 active:scale-95 transition-all">Throttle Area</button>
                <button className="flex-1 bg-transparent text-yellow-500 border border-yellow-500 py-md rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-yellow-500/10">Override AI</button>
              </div>
            </div>

            {/* Alert 3: Frequency Synchronized - GREEN SAFE */}
            <div className="surface-card border-green-tactical relative overflow-hidden" style={{ padding: '20px' }}>
              <div className="flex justify-between items-start mb-md">
                <h3 className="m-0 text-green-500 font-black uppercase tracking-widest text-sm flex items-center gap-sm">
                  <CheckCircle size={18} /> Frequency Synchronized
                </h3>
                <span className="text-[10px] font-black border border-green-500 text-green-500 px-md py-1 rounded uppercase tracking-widest">Sync Fixed</span>
              </div>
              <p className="text-[11px] text-white/80 font-medium leading-relaxed mb-xl">
                VPP Cluster #4000 frequency drift corrected (50.0Hz). Regional solar harvest re-established.
              </p>
              <div className="flex gap-md">
                <button className="flex-1 bg-green-500 text-black border-none py-md rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:scale-105 active:scale-95 transition-all">View Logs</button>
                <button className="flex-1 bg-transparent text-green-500 border border-green-500 py-md rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-green-500/10">Dismiss Alert</button>
              </div>
            </div>

            {/* Alert 4: Connectivity Restored - GREEN SAFE */}
            <div className="surface-card border-green-tactical relative overflow-hidden" style={{ padding: '20px' }}>
              <div className="flex justify-between items-start mb-md">
                <h3 className="m-0 text-green-500 font-black uppercase tracking-widest text-sm flex items-center gap-sm">
                  <CheckCircle size={18} /> Telemetry Link Restored
                </h3>
                <span className="text-[10px] font-black border border-green-500 text-green-500 px-md py-1 rounded uppercase tracking-widest">Online</span>
              </div>
              <p className="text-[11px] text-white/80 font-medium leading-relaxed mb-xl">
                Connection established with 14 nodes in Siddhartha Layout. Real-time telemetry feed active.
              </p>
              <div className="flex gap-md">
                <button className="flex-1 bg-green-500 text-black border-none py-md rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:scale-105 active:scale-95 transition-all">Acknowledge</button>
                <button className="flex-1 bg-transparent text-green-500 border border-green-500 py-md rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-green-500/10">End Protocol</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminControlCenter;
