import React from 'react';
import { Database, Zap, ArrowDown, ArrowUp, Activity } from 'lucide-react';
import './Admin.css';

const AdminDERManagement = () => {
  const derData = [
    { timestamp: "2026-04-13 00:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 3.8, current_load_kw: 2.1, net_status: "Producer" },
    { timestamp: "2026-04-13 01:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 3.5, current_load_kw: 2.0, net_status: "Producer" },
    { timestamp: "2026-04-13 02:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 3.2, current_load_kw: 1.9, net_status: "Producer" },
    { timestamp: "2026-04-13 03:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 3.0, current_load_kw: 1.8, net_status: "Producer" },
    { timestamp: "2026-04-13 04:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 2.9, current_load_kw: 1.7, net_status: "Producer" },
    { timestamp: "2026-04-13 05:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 3.5, current_load_kw: 2.0, net_status: "Producer" },
    { timestamp: "2026-04-13 06:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 4.5, current_load_kw: 2.3, net_status: "Producer" },
    { timestamp: "2026-04-13 07:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 5.2, current_load_kw: 2.6, net_status: "Producer" },
    { timestamp: "2026-04-13 08:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 5.8, current_load_kw: 3.0, net_status: "Producer" },
    { timestamp: "2026-04-13 09:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 6.2, current_load_kw: 3.4, net_status: "Producer" },
    { timestamp: "2026-04-13 10:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 6.5, current_load_kw: 3.8, net_status: "Producer" },
    { timestamp: "2026-04-13 11:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 6.8, current_load_kw: 4.0, net_status: "Producer" },
    { timestamp: "2026-04-13 12:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 7.0, current_load_kw: 4.2, net_status: "Producer" },
    { timestamp: "2026-04-13 13:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 6.7, current_load_kw: 4.5, net_status: "Producer" },
    { timestamp: "2026-04-13 14:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 6.3, current_load_kw: 4.8, net_status: "Producer" },
    { timestamp: "2026-04-13 15:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 5.9, current_load_kw: 4.6, net_status: "Producer" },
    { timestamp: "2026-04-13 16:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 5.2, current_load_kw: 4.3, net_status: "Producer" },
    { timestamp: "2026-04-13 17:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 4.6, current_load_kw: 4.1, net_status: "Producer" },
    { timestamp: "2026-04-13 18:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 4.0, current_load_kw: 4.5, net_status: "Consumer" },
    { timestamp: "2026-04-13 19:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 3.5, current_load_kw: 4.8, net_status: "Consumer" },
    { timestamp: "2026-04-13 20:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 3.2, current_load_kw: 5.0, net_status: "Consumer" },
    { timestamp: "2026-04-13 21:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 3.0, current_load_kw: 4.7, net_status: "Consumer" },
    { timestamp: "2026-04-13 22:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 2.8, current_load_kw: 4.2, net_status: "Consumer" },
    { timestamp: "2026-04-13 23:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 2.6, current_load_kw: 3.8, net_status: "Consumer" },
    { timestamp: "2026-04-14 00:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 3.7, current_load_kw: 2.2, net_status: "Producer" },
    { timestamp: "2026-04-14 01:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 3.4, current_load_kw: 2.1, net_status: "Producer" },
    { timestamp: "2026-04-14 02:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 3.1, current_load_kw: 2.0, net_status: "Producer" },
    { timestamp: "2026-04-14 03:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 2.9, current_load_kw: 1.9, net_status: "Producer" },
    { timestamp: "2026-04-14 04:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 2.8, current_load_kw: 1.8, net_status: "Producer" },
    { timestamp: "2026-04-14 05:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 3.4, current_load_kw: 2.1, net_status: "Producer" },
    { timestamp: "2026-04-14 06:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 4.4, current_load_kw: 2.4, net_status: "Producer" },
    { timestamp: "2026-04-14 07:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 5.1, current_load_kw: 2.8, net_status: "Producer" },
    { timestamp: "2026-04-14 08:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 5.7, current_load_kw: 3.2, net_status: "Producer" },
    { timestamp: "2026-04-14 09:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 6.1, current_load_kw: 3.6, net_status: "Producer" },
    { timestamp: "2026-04-14 10:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 6.4, current_load_kw: 3.9, net_status: "Producer" },
    { timestamp: "2026-04-14 11:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 6.7, current_load_kw: 4.1, net_status: "Producer" },
    { timestamp: "2026-04-14 12:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 6.9, current_load_kw: 4.3, net_status: "Producer" },
    { timestamp: "2026-04-14 13:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 6.6, current_load_kw: 4.6, net_status: "Producer" },
    { timestamp: "2026-04-14 14:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 6.2, current_load_kw: 4.9, net_status: "Producer" },
    { timestamp: "2026-04-14 15:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 5.8, current_load_kw: 4.7, net_status: "Producer" },
    { timestamp: "2026-04-14 16:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 5.1, current_load_kw: 4.4, net_status: "Producer" },
    { timestamp: "2026-04-14 17:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 4.5, current_load_kw: 4.2, net_status: "Producer" },
    { timestamp: "2026-04-14 18:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 3.9, current_load_kw: 4.6, net_status: "Consumer" },
    { timestamp: "2026-04-14 19:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 3.4, current_load_kw: 4.9, net_status: "Consumer" },
    { timestamp: "2026-04-14 20:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 3.1, current_load_kw: 5.1, net_status: "Consumer" },
    { timestamp: "2026-04-14 21:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 2.9, current_load_kw: 4.8, net_status: "Consumer" },
    { timestamp: "2026-04-14 22:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 2.7, current_load_kw: 4.3, net_status: "Consumer" },
    { timestamp: "2026-04-14 23:00", node_id: "ND-0842", zone: "Sector A", current_gen_kw: 2.5, current_load_kw: 3.9, net_status: "Consumer" },
  ];

  return (
    <div className="admin-tab-container fade-slide-up">
      <div className="tab-header mb-xl">
        <div>
          <h1>DER Management</h1>
          <p className="text-muted">Distributed Energy Resource master node list.</p>
        </div>
      </div>

      <div className="surface-card p-0 flex flex-col overflow-hidden">
         <div className="p-xl border-b flex justify-between items-center bg-surface">
            <h3 className="m-0 flex items-center gap-sm"><Database size={20} className="text-blue" /> Node Management Log</h3>
            <div className="flex gap-md">
              <span className="text-xs text-muted font-bold tracking-widest"><span className="text-green">RECORDS:</span> {derData.length}</span>
            </div>
         </div>

         <div className="overflow-x-auto" style={{ maxHeight: '600px' }}>
           <table className="admin-table w-full text-left border-collapse">
             <thead>
               <tr className="bg-darker text-muted text-xs uppercase tracking-wider">
                 <th className="p-md pl-xl border-b b-muted font-normal">timestamp</th>
                 <th className="p-md border-b b-muted font-normal">node_id</th>
                 <th className="p-md border-b b-muted font-normal">zone</th>
                 <th className="p-md border-b b-muted font-normal">current_gen_kw</th>
                 <th className="p-md border-b b-muted font-normal">current_load_kw</th>
                 <th className="p-md pr-xl border-b b-muted font-normal">net_status</th>
               </tr>
             </thead>
             <tbody>
               {derData.map((row, idx) => (
                 <tr key={idx} className="hover-row transition border-b b-muted-subtle cursor-pointer">
                   <td className="p-md pl-xl text-sm text-muted">{row.timestamp}</td>
                   <td className="p-md font-code text-sm font-bold">{row.node_id}</td>
                   <td className="p-md text-sm text-muted">{row.zone}</td>
                   <td className="p-md text-sm"><span className="text-yellow">{row.current_gen_kw.toFixed(1)}</span></td>
                   <td className="p-md text-sm"><span>{row.current_load_kw.toFixed(1)}</span></td>
                   <td className="p-md pr-xl">
                      {row.net_status === 'Producer' ? (
                        <span className="admin-chip chip-green"><ArrowUp size={12}/> Producer</span>
                      ) : (
                        <span className="admin-chip chip-gray"><ArrowDown size={12}/> Consumer</span>
                      )}
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>

         <div className="p-md border-t b-muted flex justify-center bg-darker">
           <button className="btn-sm bg-transparent border-none text-blue font-bold">End of Dataset</button>
         </div>
      </div>
    </div>
  );
};

export default AdminDERManagement;
