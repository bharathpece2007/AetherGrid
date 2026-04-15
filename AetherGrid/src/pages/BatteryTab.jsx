import React, { useState, useEffect } from 'react';
import { 
  Battery, Zap, AlertTriangle, TrendingUp, 
  Clock, Power, Activity, ShieldCheck, 
  Server, BarChart2 
} from 'lucide-react';
import './Admin.css'; // Consistent tactical CSS

const BatteryTab = () => {
  const [chargeLevel, setChargeLevel] = useState(88);
  const [dischargeRate, setDischargeRate] = useState(2.1);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setChargeLevel(prev => {
        if (isCharging) return Math.min(100, prev + 0.05);
        return Math.max(0, prev - 0.02);
      });
      setDischargeRate(prev => +(prev + (Math.random() * 0.1 - 0.05)).toFixed(2));
    }, 2000);
    return () => clearInterval(interval);
  }, [isCharging]);

  return (
    <div className="admin-tab-container fade-slide-up">
      {/* Tactical Header */}
      <div className="tab-header mb-xl flex justify-between items-center px-lg">
        <div>
          <h1 className="flex items-center gap-md m-0">
             <Server className="text-gold" /> Critical Storage
          </h1>
          <p className="text-muted text-xs uppercase font-black tracking-widest mt-xs">
             Deep cycle battery monitoring and backup reserve management.
          </p>
        </div>
        <div className="status-badge live admin-pulse">
           <span className="dot pulse bg-gold"></span>
           <span className="text-xs font-black uppercase tracking-widest text-gold">Storage Active</span>
        </div>
      </div>

      <div className="grid-2 gap-xl px-lg" style={{ gridTemplateColumns: '1fr 1.4fr' }}>
        {/* Left Column: The Massive Canister Visual */}
        <div className="surface-card flex flex-col items-center justify-center p-2xl bg-black/40 border-gold/10 relative overflow-hidden">
           <div className="text-[10px] font-black uppercase text-muted tracking-[0.4em] mb-2xl">Energy Reserve Manifold</div>
           
           <div className="relative w-48 h-80 border-4 border-white/10 rounded-[3rem] p-2 flex flex-col justify-end overflow-hidden group">
              {/* Battery Top Cap */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/10 rounded-t-xl"></div>
              
              {/* Dynamic Fill Level */}
              <div 
                className="w-full bg-gold shadow-glow-gold transition-all duration-1000 relative flex items-center justify-center overflow-hidden" 
                style={{ height: `${chargeLevel}%`, borderRadius: '0 0 2.5rem 2.5rem' }}
              >
                  {/* Energy Wave Animation */}
                  <div className="absolute top-0 left-0 w-[200%] h-full bg-white/10 -translate-x-1/2 animate-pulse skew-x-12"></div>
                  <span className="text-black font-black text-4xl z-10">{Math.round(chargeLevel)}%</span>
              </div>
           </div>

           <div className="mt-2xl flex flex-col items-center gap-sm">
              <span className={`text-xs font-black uppercase tracking-widest ${isCharging ? 'text-gold' : 'text-white/60'}`}>
                 {isCharging ? 'Charge Cycle: Active' : 'Discharge Cycle: Operational'}
              </span>
              <div className="flex gap-1">
                 {[1,2,3].map(i => (
                    <div key={i} className={`w-2 h-2 rounded-full ${isCharging ? 'bg-gold animate-bounce' : 'bg-white/10'}`} style={{ animationDelay: `${i*100}ms` }}></div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Column: Telemetry & Actions */}
        <div className="flex flex-col gap-lg">
           <div className="grid-2 gap-lg">
              <div className="surface-card p-xl bg-black/40 border-gold/10">
                 <div className="flex justify-between items-center mb-md">
                    <span className="text-muted font-black text-[10px] uppercase tracking-widest">Discharge Rate</span>
                    <Zap className="text-gold" size={18} />
                 </div>
                 <h2 className="m-0 text-3xl font-black">{dischargeRate} <span className="text-sm text-muted">KW</span></h2>
              </div>
              <div className="surface-card p-xl bg-black/40 border-gold/10">
                 <div className="flex justify-between items-center mb-md">
                    <span className="text-muted font-black text-[10px] uppercase tracking-widest">Backup Life</span>
                    <Clock className="text-gold" size={18} />
                 </div>
                 <h2 className="m-0 text-3xl font-black">14.3 <span className="text-sm text-muted">HRS</span></h2>
              </div>
           </div>

           <div className="surface-card p-xl bg-black/40 border-gold/10">
              <h3 className="m-0 mb-xl flex items-center gap-sm font-black text-xs uppercase tracking-widest">
                 <ShieldCheck size={18} className="text-gold" /> Storage Health Metrics
              </h3>
              <div className="flex flex-col gap-lg">
                 <div className="flex justify-between items-baseline mb-xs">
                    <span className="text-xs font-bold text-muted uppercase">Cycle Degradation</span>
                    <span className="text-sm font-black">2.1% (Optimal)</span>
                 </div>
                 <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gold" style={{ width: '98%' }}></div>
                 </div>

                 <div className="flex justify-between items-baseline mb-xs mt-md">
                    <span className="text-xs font-bold text-muted uppercase">Thermal Stability</span>
                    <span className="text-sm font-black">32.4°C</span>
                 </div>
                 <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gold/40" style={{ width: '45%' }}></div>
                 </div>
              </div>
           </div>

           {/* Strategic Actions */}
           <div className="surface-card p-xl bg-gold/5 border-gold/20">
              <h3 className="m-0 mb-xl text-gold font-black text-xs uppercase tracking-widest">Strategic Storage Controls</h3>
              <div className="grid-2 gap-md">
                 <button 
                  onClick={() => setIsCharging(true)}
                  className={`btn-gold flex flex-col items-center gap-xs py-xl ${isCharging ? 'shadow-glow-gold' : 'opacity-60'}`}
                 >
                    <TrendingUp size={24} />
                    <span className="font-black">Charge Mode</span>
                    <span className="text-[8px] opacity-60">Grid → Storage</span>
                 </button>
                 <button 
                  onClick={() => setIsCharging(false)}
                  className={`btn-gold flex flex-col items-center gap-xs py-xl ${!isCharging ? 'shadow-glow-gold' : 'opacity-60'}`}
                  style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
                 >
                    <Power size={24} />
                    <span className="font-black">Safe Discharge</span>
                    <span className="text-[8px] opacity-60">Storage → Node</span>
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Analytics Subsection */}
      <div className="px-lg mt-xl">
         <div className="surface-card p-xl bg-black/40 border-gold/10">
            <h3 className="m-0 mb-xl flex items-center gap-sm font-black text-xs uppercase tracking-widest">
               <BarChart2 size={18} className="text-gold" /> Charge Efficiency Profile
            </h3>
            <div className="flex gap-xl h-48 items-end justify-between px-xl">
               {[40, 65, 30, 85, 45, 90, 55, 75, 40, 60, 35].map((h, i) => (
                  <div key={i} className="flex-1 bg-white/5 relative group cursor-help" style={{ height: `${h}%` }}>
                     <div className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-40 transition-all"></div>
                  </div>
               ))}
            </div>
            <div className="flex justify-between text-[10px] text-muted font-black mt-md uppercase tracking-widest px-xl">
               <span>08:00</span>
               <span>12:00</span>
               <span>16:00</span>
               <span>20:00</span>
               <span>23:59</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default BatteryTab;
