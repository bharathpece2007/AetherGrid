import React from 'react';
import { Database, Zap, ShieldCheck, Server } from 'lucide-react';
import './Admin.css';

const AdminDERManagement = () => {
  return (
    <div className="admin-tab-container fade-slide-up">
      <div className="tab-header mb-xl flex flex-col items-center text-center">
        <div className="flex items-center gap-md mb-xs">
          <Server className="text-gold" size={32} />
          <h1 className="m-0 text-3xl font-black tracking-tighter uppercase">Assets & Solar Management</h1>
        </div>
        <p className="text-muted text-[10px] uppercase tracking-widest font-black">Distributed Energy Resource master node registry and status tracking</p>
      </div>

      <div className="flex-col gap-lg px-lg">
        <div className="surface-card p-0 overflow-hidden border border-white/10 bg-black/40">
          <div className="p-xl border-b border-white/10 bg-black/40 flex justify-between items-center px-2xl">
            <h3 className="m-0 flex items-center gap-md font-black text-xs uppercase tracking-widest"><Database size={20} className="text-gold" /> Master Node Registry</h3>
            <div className="flex gap-xl">
               <div className="text-[10px] text-muted font-black uppercase tracking-widest">Total Nodes: 4,192</div>
               <div className="text-[10px] text-gold font-black uppercase tracking-widest border border-gold/30 px-sm py-1 rounded bg-gold/10">Uptime: 99.98%</div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="admin-table w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-xl text-[10px] font-black text-muted uppercase tracking-widest">Node ID</th>
                  <th className="p-xl text-[10px] font-black text-muted uppercase tracking-widest">Location / Zone</th>
                  <th className="p-xl text-[10px] font-black text-muted uppercase tracking-widest">Capacity</th>
                  <th className="p-xl text-[10px] font-black text-muted uppercase tracking-widest">Load</th>
                  <th className="p-xl text-[10px] font-black text-muted uppercase tracking-widest">Status</th>
                  <th className="p-xl text-[10px] font-black text-muted uppercase tracking-widest">Region</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { id: 'ND-0842', zone: 'Mysuru North', cap: '150kW', load: '122kW', status: 'Online', region: 'Sector 4', type: 'stable' },
                  { id: 'ND-2219', zone: 'Hebbal Sub.', cap: '450kW', load: '410kW', status: 'Stressed', region: 'Sector 2', type: 'danger' },
                  { id: 'ND-1104', zone: 'Chamundi Hills', cap: '80kW', load: '12kW', status: 'Online', region: 'Sector 9', type: 'stable' },
                  { id: 'ND-5582', zone: 'Siddhartha Lyut', cap: '210kW', load: '185kW', status: 'Warning', region: 'Sector 5', type: 'warning' },
                  { id: 'ND-9021', zone: 'Palace Central', cap: '500kW', load: '320kW', status: 'Online', region: 'Sector 1', type: 'stable' },
                  { id: 'ND-3344', zone: 'West Hub', cap: '300kW', load: '290kW', status: 'Stressed', region: 'Sector 3', type: 'danger' },
                  { id: 'ND-7766', zone: 'East Hub', cap: '120kW', load: '45kW', status: 'Online', region: 'Sector 7', type: 'stable' },
                  { id: 'ND-4455', zone: 'South Grid', cap: '250kW', load: '210kW', status: 'Online', region: 'Sector 8', type: 'stable' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors cursor-pointer group">
                    <td className="p-xl font-black text-gold text-sm tracking-widest">{row.id}</td>
                    <td className="p-xl text-white font-black text-[11px] uppercase tracking-tighter">{row.zone}</td>
                    <td className="p-xl text-white/60 font-black text-xs">{row.cap}</td>
                    <td className="p-xl">
                      <div className="flex items-center gap-md">
                        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden min-w-[80px]">
                           <div className="h-full bg-gold shadow-glow-gold" style={{ width: `${(parseInt(row.load)/parseInt(row.cap))*100}%` }}></div>
                        </div>
                        <span className="text-[11px] font-black text-white">{row.load}</span>
                      </div>
                    </td>
                    <td className="p-xl">
                      <span className={`px-md py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        row.type === 'danger' ? 'bg-red/10 text-red border-red/30' : 
                        (row.type === 'warning' ? 'bg-gold/10 text-gold border-gold/30' : 'bg-gold/10 text-gold border-gold/30')
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-xl text-muted text-[10px] font-black uppercase tracking-widest">{row.region}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-xl bg-black/40 text-center border-t border-white/10">
             <button className="text-[10px] text-gold font-black uppercase tracking-widest border border-gold/20 bg-gold/5 px-2xl py-md rounded-xl cursor-pointer hover:bg-gold hover:text-black transition-all">
                View All {4192} Nodes in Dataset Explorer
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDERManagement;
