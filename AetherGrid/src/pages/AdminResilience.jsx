import React from 'react';
import { ShieldAlert, ServerCrash, Power, HardDrive, ShieldCheck } from 'lucide-react';
import './Admin.css';

const AdminResilience = () => {
  return (
    <div className="admin-tab-container fade-slide-up">
      <div className="tab-header mb-xl">
        <div>
          <h1>Grid Resilience</h1>
          <p className="text-muted">Disaster recovery, failure zone mapping, and black start readiness.</p>
        </div>
        <div className="status-badge live bg-green-subtle text-green border-green">
          <ShieldCheck size={16} />
          <span>System Readiness: 98%</span>
        </div>
      </div>

      <div className="grid-3 gap-lg mb-xl">
        <div className="surface-card p-lg flex items-center justify-between">
          <div className="flex items-center gap-md">
            <div className="admin-chip chip-gray w-[40px] h-[40px] flex items-center justify-center p-0 rounded-full"><ServerCrash size={20} /></div>
            <div>
              <span className="block text-xs uppercase text-muted font-bold">Failure Zones</span>
              <span className="block text-xl font-bold">0 Active</span>
            </div>
          </div>
        </div>
        <div className="surface-card p-lg flex items-center justify-between">
          <div className="flex items-center gap-md">
            <div className="admin-chip chip-blue w-[40px] h-[40px] flex items-center justify-center p-0 rounded-full"><HardDrive size={20} /></div>
            <div>
              <span className="block text-xs uppercase text-muted font-bold">Backup Relays</span>
              <span className="block text-xl font-bold text-blue">4/4 Standby</span>
            </div>
          </div>
        </div>
        <div className="surface-card p-lg flex items-center justify-between border-green overflow-hidden relative">
          <div className="flex items-center gap-md z-10">
            <div className="admin-chip chip-green w-[40px] h-[40px] flex items-center justify-center p-0 rounded-full"><Power size={20} /></div>
            <div>
              <span className="block text-xs uppercase text-green font-bold">Black Start Protocol</span>
              <span className="block text-xl font-bold text-green">ARMED</span>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-green-subtle opacity-20"></div>
        </div>
      </div>

      <div className="grid-2 gap-xl" style={{ gridTemplateColumns: '1fr 1.5fr' }}>
         <div className="surface-card p-xl border-warning-subtle bg-surface">
           <h3 className="flex items-center gap-sm mt-0 text-yellow"><ShieldAlert size={20} /> Risk Assessment Panel</h3>
           <p className="text-sm text-muted">Currently tracking 3 potential vulnerabilities within the smart grid framework.</p>
           
           <div className="flex-col gap-sm mt-xl">
             <div className="bg-subtle p-md rounded-md hover-scale border-l-yellow relative overflow-hidden">
               <span className="font-bold text-sm block mb-xs relative z-10">North Hub Overload Limit</span>
               <span className="text-xs text-muted block relative z-10">Thermal capacity at 88% due to active export. (Warning at 92%)</span>
             </div>
             <div className="bg-subtle p-md rounded-md hover-scale border-l-gray">
               <span className="font-bold text-sm block mb-xs">Sector C Backup offline</span>
               <span className="text-xs text-muted block">Secondary storage array undergoing programmed maintenance.</span>
             </div>
           </div>
         </div>
         
         <div className="surface-card p-xl bg-surface">
           <div className="flex justify-between items-center mb-md border-b pb-md">
             <h3 className="m-0">System Recovery Topology</h3>
           </div>
           <div className="topology-visual flex items-center justify-center min-h-[300px]">
             {/* Abstract topology nodes showing backup connections */}
             <div className="flex-col gap-lg w-full max-w-[500px]">
                <div className="flex justify-between items-center bg-subtle p-md rounded-md opacity-50">
                   <div className="font-bold flex items-center gap-sm"><HardDrive size={16}/> DB Relay A [Primary] <span className="text-xs text-green">(Active)</span></div>
                   <div className="font-code text-xs text-muted">PING: 12ms</div>
                </div>
                <div className="flex justify-between items-center bg-subtle p-md rounded-md">
                   <div className="font-bold flex items-center gap-sm"><HardDrive size={16}/> DB Relay B [Mirror] <span className="text-xs text-blue">(Standby-Sync)</span></div>
                   <div className="font-code text-xs text-muted">PING: 14ms</div>
                </div>
                <div className="flex justify-between items-center bg-subtle p-md rounded-md opacity-20 border border-dashed text-muted">
                   <div className="font-bold flex items-center gap-sm"><HardDrive size={16}/> Deep Cold Storage C</div>
                   <div className="font-code text-xs">OFFLINE</div>
                </div>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
};

export default AdminResilience;
