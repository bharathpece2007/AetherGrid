import React, { useState } from 'react';
import { Sliders, AlertOctagon, ZapOff, CheckCircle, ShieldAlert } from 'lucide-react';
import './Admin.css';

const AdminControlCenter = () => {
  const [globalThrottle, setGlobalThrottle] = useState(100);

  return (
    <div className="admin-tab-container fade-slide-up">
      <div className="tab-header mb-xl flex flex-col items-center text-center">
        <div className="flex items-center gap-md mb-xs">
          <ShieldAlert className="text-gold" size={32} />
          <h1 className="m-0 text-3xl font-black tracking-tighter uppercase">Operations Control Center</h1>
        </div>
        <p className="text-muted text-[10px] uppercase tracking-widest font-black">Master override controls and automated demand response triggers</p>
      </div>

      <div className="flex flex-col gap-lg px-lg">
        {/* Massive Emergency Response Card */}
        <div className="surface-card p-0 border border-red/30 bg-black/40 overflow-hidden rounded-3xl">
          <div className="p-xl border-b border-red/20 bg-red/5 flex justify-between items-center px-2xl">
            <h2 className="m-0 flex items-center gap-md text-red font-black text-xs uppercase tracking-widest"><ShieldAlert size={28} /> Emergency Response Unit</h2>
            <div className="flex gap-sm">
              <div className="bg-red text-[10px] font-black text-white px-md py-1 rounded-full animate-pulse uppercase tracking-widest">4 Critical Events Deterred</div>
            </div>
          </div>

          <div className="p-2xl grid-2 gap-xl">
            {/* Alert 1: Cascading Failure - RED EMERGENCY */}
            <div className="p-xl rounded-2xl bg-black/40 border border-red/30 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-red"></div>
              <div className="flex justify-between items-start mb-md">
                <h3 className="m-0 text-red font-black uppercase tracking-widest text-[11px] flex items-center gap-sm">
                  <AlertOctagon size={18} /> South Hub: Cascading Failure
                </h3>
                <span className="text-[9px] font-black bg-red/20 text-red px-md py-1 rounded-full uppercase">Immediate Action</span>
              </div>
              <p className="text-[11px] text-muted font-medium leading-relaxed mb-xl">
                Primary Transformer T-09 de-synchronized. Voltage drop in Sector 7/8. Outage imminent if not isolated.
              </p>
              <div className="flex gap-md">
                <button className="flex-1 bg-red text-white border-none py-md rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer transition-all hover:bg-white hover:text-black">Isolate Grid</button>
                <button className="flex-1 bg-transparent text-muted border border-white/10 py-md rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-white/5">Shed Load</button>
              </div>
            </div>

            {/* Alert 2: Thermal Overload - GOLD ALERT */}
            <div className="p-xl rounded-2xl bg-black/40 border border-gold/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gold"></div>
              <div className="flex justify-between items-start mb-md">
                <h3 className="m-0 text-gold font-black uppercase tracking-widest text-[11px] flex items-center gap-sm">
                  <AlertOctagon size={18} /> Delta Substation: Multi-Node Heat
                </h3>
                <span className="text-[9px] font-black bg-gold/20 text-gold px-md py-1 rounded-full uppercase">Thermal Spike</span>
              </div>
              <p className="text-[11px] text-muted font-medium leading-relaxed mb-xl">
                Sector 4 thermal limits reached at 96.2%. HVAC reserves exhausted. Localized brownout potential high.
              </p>
              <div className="flex gap-md">
                <button className="flex-1 bg-gold text-black border-none py-md rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-white transition-all">Throttle Area</button>
                <button className="flex-1 bg-transparent text-muted border border-white/10 py-md rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-white/5">Override AI</button>
              </div>
            </div>

            {/* Alert 3: Frequency Stabilized - GOLD SAFE */}
            <div className="p-xl rounded-2xl bg-black/40 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gold/40"></div>
              <div className="flex justify-between items-start mb-md">
                <h3 className="m-0 text-gold font-black uppercase tracking-widest text-[11px] flex items-center gap-sm">
                  <CheckCircle size={18} /> Frequency Synchronized
                </h3>
                <span className="text-[9px] font-black bg-gold/10 text-gold px-md py-1 rounded-full uppercase">Sync Fixed</span>
              </div>
              <p className="text-[11px] text-muted font-medium leading-relaxed mb-xl">
                VPP Cluster #4000 frequency drift corrected (50.0Hz). Regional solar harvest re-established.
              </p>
              <div className="flex gap-md">
                <button className="flex-1 bg-gold text-black border-none py-md rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-white transition-all">View Logs</button>
                <button className="flex-1 bg-transparent text-muted border border-white/10 py-md rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-white/5">Dismiss Alert</button>
              </div>
            </div>

            {/* Alert 4: Connectivity Restored - GOLD SAFE */}
            <div className="p-xl rounded-2xl bg-black/40 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gold/40"></div>
              <div className="flex justify-between items-start mb-md">
                <h3 className="m-0 text-gold font-black uppercase tracking-widest text-[11px] flex items-center gap-sm">
                  <CheckCircle size={18} /> Telemetry Link Restored
                </h3>
                <span className="text-[9px] font-black bg-white/10 text-white px-md py-1 rounded-full uppercase tracking-widest">Online</span>
              </div>
              <p className="text-[11px] text-muted font-medium leading-relaxed mb-xl">
                Connection established with 14 nodes in Siddhartha Layout. Real-time telemetry feed active.
              </p>
              <div className="flex gap-md">
                <button className="flex-1 bg-gold text-black border-none py-md rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-white transition-all">Acknowledge</button>
                <button className="flex-1 bg-transparent text-muted border border-white/10 py-md rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-white/5">End Protocol</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminControlCenter;
