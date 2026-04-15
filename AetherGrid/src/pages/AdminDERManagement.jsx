import React from 'react';
import { Database, Zap, ArrowDown, ArrowUp, Activity } from 'lucide-react';
import './Admin.css';

const AdminDERManagement = () => {
  const nodes = [
    { id: 'ND-0842', zone: 'Sector A', gen: 4.2, load: 1.8, status: 'stable', role: 'producer' },
    { id: 'ND-0911', zone: 'Sector A', gen: 2.1, load: 5.4, status: 'demand', role: 'consumer' },
    { id: 'ND-1102', zone: 'Sector B', gen: 0.5, load: 8.2, status: 'critical', role: 'consumer' },
    { id: 'ND-1455', zone: 'Sector C', gen: 5.5, load: 0.5, status: 'stable', role: 'producer' },
    { id: 'ND-1481', zone: 'Sector C', gen: 3.2, load: 3.0, status: 'balanced', role: 'neutral' },
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
            <h3 className="m-0 flex items-center gap-sm"><Database size={20} className="text-blue" /> Unified Node Registry</h3>
            <div className="flex gap-md">
              <span className="text-xs text-muted font-bold tracking-widest"><span className="text-green">PRODUCING:</span> 1,482</span>
              <span className="text-xs text-muted font-bold tracking-widest"><span className="text-red">CONSUMING:</span> 2,710</span>
            </div>
         </div>

         <div className="overflow-x-auto">
           <table className="admin-table w-full text-left border-collapse">
             <thead>
               <tr className="bg-darker text-muted text-xs uppercase tracking-wider">
                 <th className="p-md pl-xl border-b b-muted font-normal">Node ID</th>
                 <th className="p-md border-b b-muted font-normal">Zone</th>
                 <th className="p-md border-b b-muted font-normal">Current Gen (kW)</th>
                 <th className="p-md border-b b-muted font-normal">Current Load (kW)</th>
                 <th className="p-md border-b b-muted font-normal">Net Status</th>
                 <th className="p-md pr-xl border-b b-muted font-normal">Action</th>
               </tr>
             </thead>
             <tbody>
               {nodes.map(node => (
                 <tr key={node.id} className="hover-row transition border-b b-muted-subtle cursor-pointer">
                   <td className="p-md pl-xl font-code text-sm font-bold">{node.id}</td>
                   <td className="p-md text-sm text-muted">{node.zone}</td>
                   <td className="p-md text-sm"><span className="text-yellow">{node.gen.toFixed(1)}</span></td>
                   <td className="p-md text-sm"><span>{node.load.toFixed(1)}</span></td>
                   <td className="p-md">
                     {node.status === 'stable' && <span className="admin-chip chip-green"><ArrowUp size={12}/> Producer</span>}
                     {node.status === 'demand' && <span className="admin-chip chip-gray"><ArrowDown size={12}/> Consumer</span>}
                     {node.status === 'critical' && <span className="admin-chip chip-red pulse-slow"><Activity size={12}/> Critical Load</span>}
                     {node.status === 'balanced' && <span className="admin-chip chip-blue">Balanced</span>}
                   </td>
                   <td className="p-md pr-xl text-right">
                      <button className="btn-sm bg-transparent border b-muted text-muted hover-light">Details</button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>

         <div className="p-md border-t b-muted flex justify-center bg-darker">
           <button className="btn-sm bg-transparent border-none text-blue font-bold">Load Next 50 Nodes...</button>
         </div>
      </div>
    </div>
  );
};

export default AdminDERManagement;
