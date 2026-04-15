import React from 'react';
import { ShieldAlert, ServerCrash, Power, HardDrive, ShieldCheck } from 'lucide-react';
import './Admin.css';

const AdminResilience = () => {
  return (
    <div className="admin-tab-container fade-slide-up">
      <div className="tab-header mb-xl flex flex-col items-center text-center">
        <div className="flex items-center gap-md mb-xs">
          <ShieldAlert className="text-gold" size={32} />
          <h1 className="m-0 text-3xl font-black tracking-tighter uppercase">Grid Resilience & Recovery</h1>
        </div>
        <p className="text-muted text-[10px] uppercase tracking-widest font-black">Disaster recovery, failure zone mapping, and black start readiness protocols</p>
      </div>

      <div className="grid-3 gap-lg mb-xl px-lg">
        <div className="surface-card p-xl border border-white/10 bg-black/40 flex items-center justify-between rounded-2xl">
          <div className="flex items-center gap-md">
            <div className="p-md bg-white/5 rounded-xl border border-white/10 flex items-center justify-center"><ServerCrash size={20} className="text-white/40" /></div>
            <div>
              <span className="block text-[10px] uppercase text-white/40 font-black tracking-widest">Failure Zones</span>
              <span className="block text-xl font-black text-white">0 ACTIVE</span>
            </div>
          </div>
        </div>
        <div className="surface-card p-xl border border-white/10 bg-black/40 flex items-center justify-between rounded-2xl">
          <div className="flex items-center gap-md">
            <div className="p-md bg-gold/10 rounded-xl border border-gold/20 flex items-center justify-center"><HardDrive size={20} className="text-gold" /></div>
            <div>
              <span className="block text-[10px] uppercase text-muted font-black tracking-widest">Backup Relays</span>
              <span className="block text-xl font-black text-gold">4/4 STANDBY</span>
            </div>
          </div>
        </div>
        <div className="surface-card p-xl border border-gold/30 bg-gold/5 flex items-center justify-between rounded-2xl relative overflow-hidden">
          <div className="flex items-center gap-md z-10">
            <div className="p-md bg-gold/20 rounded-xl border border-gold/30 flex items-center justify-center"><Power size={20} className="text-gold" /></div>
            <div>
              <span className="block text-[10px] uppercase text-gold font-black tracking-widest">Black Start Protocol</span>
              <span className="block text-xl font-black text-gold animate-pulse">ARMED</span>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gold opacity-10"></div>
        </div>
      </div>

      <div className="grid-2 gap-xl px-lg" style={{ gridTemplateColumns: '1fr 1.5fr' }}>
        <div className="surface-card p-xl border border-white/10 bg-black/40">
          <h3 className="flex items-center gap-sm m-0 text-gold font-black text-xs uppercase tracking-widest"><ShieldAlert size={20} /> Risk Assessment Panel</h3>
          <p className="text-[11px] font-medium text-muted mt-md">Tracking 3 potential vulnerabilities within the current manifold.</p>

          <div className="flex flex-col gap-lg mt-xl">
            <div className="bg-black/40 p-xl rounded-2xl border-l-4 border-l-gold border-r border-t border-b border-white/5 relative overflow-hidden transition-all hover:bg-white/5">
              <span className="font-black text-sm block mb-xs relative z-10 uppercase tracking-tighter">North Hub Overload Limit</span>
              <span className="text-[11px] text-muted block relative z-10 font-medium">Thermal capacity at 88% due to active export. (Critical Threshold: 92%)</span>
            </div>
            <div className="bg-black/40 p-xl rounded-2xl border-l-4 border-l-white/20 border-r border-t border-b border-white/5 opacity-60">
              <span className="font-black text-sm block mb-xs uppercase tracking-tighter text-white/80">Sector C Backup offline</span>
              <span className="text-[11px] text-muted block font-medium">Secondary storage array undergoing programmed maintenance.</span>
            </div>
          </div>
        </div>

        <div className="surface-card p-xl bg-black/40 border border-white/10 flex flex-col">
          <div className="flex justify-between items-center mb-xl border-b border-white/10 pb-md px-lg">
            <h3 className="m-0 font-black text-xs uppercase tracking-widest text-gold text-center w-full">System Recovery Topology</h3>
          </div>
          <div className="topology-visual flex items-center justify-center flex-1 bg-black/20 rounded-2xl border border-white/5">
            <div className="flex flex-col gap-lg w-full max-w-[500px] p-xl">
              <div className="flex justify-between items-baseline bg-black/40 p-xl rounded-2xl border border-white/5 hover:border-gold/20 transition-all group">
                <div className="font-black text-sm flex items-center gap-sm uppercase tracking-tighter"><HardDrive size={16} className="text-gold" /> DB Relay A [Primary] <span className="text-[9px] font-black text-gold ml-md tracking-widest border border-gold/20 px-md py-1 rounded bg-gold/10 uppercase">Active</span></div>
                <div className="font-code text-[10px] text-muted uppercase tracking-widest">PING: 12ms</div>
              </div>
              <div className="flex justify-between items-baseline bg-black/40 p-xl rounded-2xl border border-white/5 hover:border-gold/20 transition-all group">
                <div className="font-black text-sm flex items-center gap-sm uppercase tracking-tighter"><HardDrive size={16} className="text-gold" /> DB Relay B [Mirror] <span className="text-[9px] font-black text-white/40 ml-md tracking-widest border border-white/10 px-md py-1 rounded bg-white/5 uppercase">Standby-Sync</span></div>
                <div className="font-code text-[10px] text-muted uppercase tracking-widest">PING: 14ms</div>
              </div>
              <div className="flex justify-between items-baseline bg-black/40 p-xl rounded-2xl border border-white/5 opacity-20 filter grayscale">
                <div className="font-black text-sm flex items-center gap-sm uppercase tracking-tighter"><HardDrive size={16} /> Deep Cold Storage C</div>
                <div className="font-code text-[10px] uppercase tracking-widest">OFFLINE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResilience;
