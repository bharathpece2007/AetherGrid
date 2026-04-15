import React from 'react';
import { Wind, CornerRightDown, ArrowRightLeft } from 'lucide-react';
import './Admin.css';

const AdminEnergyDistribution = () => {
  return (
    <div className="admin-tab-container fade-slide-up">
      <div className="tab-header mb-xl">
        <div>
          <h1>Energy Distribution</h1>
          <p className="text-muted">Inter-zone energy transfer logistics and routing topology.</p>
        </div>
      </div>

      <div className="grid-2 gap-xl" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
        
        {/* Flow Map Visual */}
        <div className="surface-card p-xl bg-surface relative min-h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute top-4 left-4 z-10 flex items-center gap-xs text-sm font-bold shadow-md p-md bg-darker rounded-md">
            <Wind size={16} className="text-blue" /> Inter-Zone Routing Live
          </div>
          
          <div className="flow-nodes-container relative w-[300px] h-[300px]">
             
             {/* Substation Nodes */}
             <div className="dist-node" style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)', borderColor: 'var(--accent-green)'}}>
                <span className="font-bold">North Hub</span>
                <span className="text-xs text-muted block text-green">+4.5MW</span>
             </div>
             <div className="dist-node" style={{ bottom: '-30px', left: 0, transform: 'translate(-50%, 50%)', borderColor: '#eab308'}}>
                <span className="font-bold">West Hub</span>
                <span className="text-xs text-muted block text-yellow">-1.2MW</span>
             </div>
             <div className="dist-node" style={{ bottom: '-30px', right: 0, transform: 'translate(50%, 50%)', borderColor: '#ef4444'}}>
                <span className="font-bold">East Hub</span>
                <span className="text-xs text-muted block text-red">-3.3MW</span>
             </div>

             {/* Animated SVG Connections */}
             <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible', zIndex: -1 }}>
                {/* North to West */}
                <path d="M 150 0 C 150 150, 0 150, 0 300" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                <path d="M 150 0 C 150 150, 0 150, 0 300" fill="none" stroke="var(--accent-green)" strokeWidth="4" className="flow-dash-anim" strokeDasharray="10 15" />
                
                {/* North to East */}
                <path d="M 150 0 C 150 150, 300 150, 300 300" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                <path d="M 150 0 C 150 150, 300 150, 300 300" fill="none" stroke="var(--accent-green)" strokeWidth="4" className="flow-dash-anim-fast" strokeDasharray="10 15" />
             </svg>
          </div>
        </div>

        {/* Transfer Logs & Manual Actions */}
        <div className="flex-col gap-lg">
           <div className="surface-card p-xl bg-surface flex-1">
             <h3 className="m-0 mb-lg">Active Supply Routes</h3>
             <div className="flex-col gap-md">
               <div className="bg-subtle p-md rounded-md flex justify-between items-center border-l-green">
                 <div>
                   <span className="text-xs uppercase text-muted block font-bold mb-xs">Transferring Surplus</span>
                   <div className="text-sm font-bold flex items-center gap-xs">North Hub <CornerRightDown size={14} className="text-green" /> East Hub</div>
                 </div>
                 <div className="text-right">
                   <span className="block text-xl font-code font-bold">2.4 <span className="text-sm">MW</span></span>
                 </div>
               </div>
               
               <div className="bg-subtle p-md rounded-md flex justify-between items-center border-l-yellow">
                 <div>
                   <span className="text-xs uppercase text-muted block font-bold mb-xs">Sub-routing</span>
                   <div className="text-sm font-bold flex items-center gap-xs">North Hub <CornerRightDown size={14} className="text-green" /> West Hub</div>
                 </div>
                 <div className="text-right">
                   <span className="block text-xl font-code font-bold">1.2 <span className="text-sm">MW</span></span>
                 </div>
               </div>
             </div>
             
             <div className="mt-xl">
               <h4 className="m-0 mb-md">Manual Override</h4>
               <button className="btn-market buy-btn bg-blue text-dark font-bold border-none w-full flex items-center justify-center gap-sm">
                 <ArrowRightLeft size={16} /> Re-configure Regional Distribution
               </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEnergyDistribution;
