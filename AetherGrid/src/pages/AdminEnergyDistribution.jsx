import React from 'react';
import { Wind, CornerRightDown, ArrowRightLeft } from 'lucide-react';
import './Admin.css';

const AdminEnergyDistribution = () => {
  return (
    <div className="admin-tab-container fade-slide-up">
      <div className="tab-header mb-xl flex flex-col items-center text-center">
        <div className="flex items-center gap-md mb-xs">
          <Wind className="text-gold" size={32} />
          <h1 className="m-0 text-3xl font-black tracking-tighter uppercase">Regional Energy Distribution</h1>
        </div>
        <p className="text-muted text-[10px] uppercase tracking-widest font-black">Inter-zone energy transfer logistics and routing topology manifold</p>
      </div>

      <div className="grid-2 gap-xl px-lg" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        
        {/* Flow Map Visual */}
        <div className="surface-card p-xl bg-black/40 border border-white/10 relative min-h-[550px] flex items-center justify-center overflow-hidden rounded-3xl">
          <div className="absolute top-6 left-6 z-10 flex items-center gap-md text-[10px] font-black uppercase tracking-widest p-md bg-black/60 border border-gold/20 rounded-xl text-gold shadow-glow-gold">
            <Wind size={16} className="text-gold" /> Routing Dynamic Live
          </div>
          
          <div className="flow-nodes-container relative w-[350px] h-[350px]">
             
             {/* Substation Nodes */}
             <div className="dist-node shadow-glow-gold" style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)', borderColor: '#BAB86C', backgroundColor: 'rgba(186,184,108,0.1)'}}>
                <span className="font-black uppercase tracking-tighter text-sm">North Hub</span>
                <span className="text-[10px] text-gold font-black block mt-1">+4.5 MW</span>
             </div>
             <div className="dist-node" style={{ bottom: '-40px', left: 0, transform: 'translate(-50%, 50%)', borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)'}}>
                <span className="font-black uppercase tracking-tighter text-sm text-white/60">West Hub</span>
                <span className="text-[10px] text-muted font-black block mt-1">-1.2 MW</span>
             </div>
             <div className="dist-node" style={{ bottom: '-40px', right: 0, transform: 'translate(50%, 50%)', borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)'}}>
                <span className="font-black uppercase tracking-tighter text-sm text-red">East Hub</span>
                <span className="text-[10px] text-red font-black block mt-1">-3.3 MW</span>
             </div>

             {/* Animated SVG Connections */}
             <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible', zIndex: -1 }}>
                {/* North to West */}
                <path d="M 175 0 C 175 175, 0 175, 0 350" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                <path d="M 175 0 C 175 175, 0 175, 0 350" fill="none" stroke="#BAB86C" strokeWidth="2" className="flow-dash-anim" strokeDasharray="12 20" />
                
                {/* North to East */}
                <path d="M 175 0 C 175 175, 350 175, 350 350" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                <path d="M 175 0 C 175 175, 350 175, 350 350" fill="none" stroke="#BAB86C" strokeWidth="4" className="flow-dash-anim-fast" strokeDasharray="15 25" />
             </svg>
          </div>
        </div>

        {/* Transfer Logs & Manual Actions */}
        <div className="flex flex-col gap-lg">
           <div className="surface-card p-xl bg-black/40 border border-white/10 flex-1 flex flex-col rounded-3xl">
              <h3 className="m-0 mb-xl font-black text-xs uppercase tracking-widest text-gold text-center">Active Distribution Streams</h3>
              <div className="flex flex-col gap-lg flex-1">
                <div className="bg-black/40 p-xl rounded-2xl flex justify-between items-center border border-white/5 hover:border-gold/20 transition-all">
                  <div>
                    <span className="text-[9px] uppercase text-muted font-black tracking-widest block mb-2">Primary Flow Stream</span>
                    <div className="text-sm font-black flex items-center gap-md uppercase tracking-tighter">North Hub <CornerRightDown size={14} className="text-gold" /> East Hub</div>
                  </div>
                  <div className="text-right">
                    <span className="block text-2xl font-black text-gold tracking-tighter">2.4 <span className="text-xs">MW</span></span>
                  </div>
                </div>
                
                <div className="bg-black/40 p-xl rounded-2xl flex justify-between items-center border border-white/5 hover:border-gold/20 transition-all opacity-80">
                  <div>
                    <span className="text-[9px] uppercase text-muted font-black tracking-widest block mb-2">Secondary Sub-route</span>
                    <div className="text-sm font-black flex items-center gap-md uppercase tracking-tighter">North Hub <CornerRightDown size={14} className="text-gold" /> West Hub</div>
                  </div>
                  <div className="text-right">
                    <span className="block text-2xl font-black text-white/60 tracking-tighter">1.2 <span className="text-xs">MW</span></span>
                  </div>
                </div>
              </div>
              
              <div className="mt-2xl">
                <h4 className="m-0 mb-lg font-black text-[10px] uppercase tracking-widest text-muted text-center">Manual Manifold Override</h4>
                <button className="w-full py-xl bg-gold text-black font-black text-[10px] uppercase tracking-widest rounded-2xl cursor-pointer hover:bg-white transition-all flex items-center justify-center gap-md">
                  <ArrowRightLeft size={18} /> Re-configure Regional Streams
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEnergyDistribution;
