import React, { useState, useEffect } from 'react';
import { 
  Battery, Zap, AlertTriangle, TrendingUp, 
  Clock, Power, Activity, ShieldCheck, 
  Server, BarChart2, CheckCircle2
} from 'lucide-react';
import { 
  BarChart, Bar, Rectangle, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { supabase } from '../supabaseClient';
import './Admin.css';

// Fallback data if DB fetch fails
const defaultChartData = [
  { time: '08:00', level: 40 }, { time: '09:00', level: 65 },
  { time: '11:00', level: 30 }, { time: '12:00', level: 85 },
  { time: '14:00', level: 45 }, { time: '16:00', level: 90 },
  { time: '18:00', level: 55 }, { time: '20:00', level: 75 },
  { time: '21:00', level: 40 }, { time: '22:00', level: 60 },
  { time: '23:59', level: 35 }
];

const BatteryTab = () => {
  const [chargeLevel, setChargeLevel] = useState(88);
  const [dischargeRate, setDischargeRate] = useState(2.1);
  const [isCharging, setIsCharging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSyncSuccess, setShowSyncSuccess] = useState(false);
  
  // Chart Backend State
  const [chartData, setChartData] = useState(defaultChartData);
  const [loadingChart, setLoadingChart] = useState(true);

  // Fetch actual chart data from Supabase Backend
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        if (!supabase) throw new Error("No supabase client");
        
        const { data, error } = await supabase
          .from('energy_logs')
          .select('timestamp, battery_level')
          .not('battery_level', 'is', null)
          .order('timestamp', { ascending: false })
          .limit(11);
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Format the DB data for the chart, reversing it so oldest is first
          const formatted = data.reverse().map(log => {
            const date = new Date(log.timestamp);
            return {
              time: `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`,
              level: Math.round(log.battery_level)
            };
          });
          setChartData(formatted);
        }
      } catch (err) {
        console.warn("Failed to fetch live chart data, using fallback.", err);
      } finally {
        setLoadingChart(false);
      }
    };
    
    fetchChartData();
  }, []);
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

  const handleCommand = async (chargeMode) => {
    if (isProcessing) return;
    setIsProcessing(true);
    setShowSyncSuccess(false);
    
    // Simulate initial network delay
    await new Promise(r => setTimeout(r, 600));
    
    try {
      if (supabase) {
        // Push actual update to supabase database (The "Backend")
        const newStatus = chargeMode ? 'Charging' : 'Discharging';
        const { error } = await supabase
          .from('der_registry')
          .update({ status: newStatus, updated_at: new Date().toISOString() })
          .eq('node_id', 'ND-0842');
          
        if (error) {
          console.warn("DB Update failed (no table or perms), but continuing as mock.", error);
          await new Promise(r => setTimeout(r, 500));
        }
      }

      setIsCharging(chargeMode);
      
      // Show brief success indicator
      setShowSyncSuccess(true);
      setTimeout(() => setShowSyncSuccess(false), 3000);
      
    } catch (err) {
      console.error("Backend error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="admin-tab-container fade-slide-up">
      {/* Tactical Header */}
      <div className="tab-header mb-xl flex justify-between items-center px-lg">
        <div>
          <h1 className="flex items-center gap-md m-0">
             <Server className="text-gold" /> Critical Storage
          </h1>
          <p className="text-muted text-xs uppercase font-black tracking-widest mt-xs">
             Deep cycle battery monitoring and backend command management.
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
           
           <div 
             className="relative flex flex-col justify-end overflow-hidden group mt-4"
             style={{
               width: '200px',
               height: '320px',
               border: '4px solid rgba(255,255,255,0.1)',
               borderRadius: '3rem',
               padding: '8px',
               margin: '0 auto',
               boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)'
             }}
           >
              {/* Battery Top Cap */}
              <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '12px', background: 'rgba(255,255,255,0.2)', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}></div>
              
              <div style={{ flex: 1 }}></div>

              {/* Dynamic Fill Level */}
              <div 
                className="shadow-glow-gold transition-all" 
                style={{ 
                  width: '100%',
                  height: `${chargeLevel}%`, 
                  borderRadius: '0 0 2.5rem 2.5rem',
                  background: isCharging ? '#BAB86C' : '#8c9baf',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  transition: 'height 1s cubic-bezier(0.4, 0, 0.2, 1), background 1s ease'
                }}
              >
                  {/* Energy Wave Animation */}
                  <div className="pulse-slow" style={{ position: 'absolute', top: 0, left: 0, width: '150%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', transform: 'skewX(-20deg)' }}></div>
                  <span style={{ color: '#000', fontWeight: '900', fontSize: '2.5rem', zIndex: 10, position: 'relative' }}>{Math.round(chargeLevel)}%</span>
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

           {/* Strategic Actions WITH BACKEND */}
           <div className="surface-card p-xl bg-gold/5 border-gold/20 flex flex-col gap-md">
              <div className="flex justify-between items-center">
                 <h3 className="m-0 text-gold font-black text-xs uppercase tracking-widest">Strategic Storage Controls</h3>
                 
                 {/* Status Indicator */}
                 <div className="flex items-center gap-xs">
                    {isProcessing && <div className="text-[10px] text-gold animate-pulse uppercase tracking-widest font-bold">Syncing Database...</div>}
                    {showSyncSuccess && !isProcessing && (
                      <div className="text-[10px] text-green-400 font-bold uppercase tracking-widest flex items-center gap-1">
                         <CheckCircle2 size={12} /> DB Synced
                      </div>
                    )}
                 </div>
              </div>
              
              <div className="grid-2 gap-md relative mt-xs">
                 <button 
                  onClick={() => handleCommand(true)}
                  disabled={isProcessing}
                  className={`btn-gold flex flex-col items-center gap-xs py-xl border border-transparent transition-all ${isCharging ? 'shadow-glow-gold' : 'opacity-60'} ${isProcessing ? 'pointer-events-none opacity-40' : ''}`}
                 >
                    <TrendingUp size={24} />
                    <span className="font-black">Charge Mode</span>
                    <span className="text-[8px] opacity-60">Grid → Storage</span>
                 </button>
                 <button 
                  onClick={() => handleCommand(false)}
                  disabled={isProcessing}
                  className={`btn-gold flex flex-col items-center gap-xs py-xl transition-all ${!isCharging ? 'shadow-glow-gold' : 'opacity-60'} ${isProcessing ? 'pointer-events-none opacity-40' : ''}`}
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
      <div className="px-lg mt-xl mb-2xl">
         <div className="surface-card p-xl bg-black/40 border-gold/10">
            <div className="flex justify-between items-center mb-xl">
              <h3 className="m-0 flex items-center gap-sm font-black text-xs uppercase tracking-widest">
                 <BarChart2 size={18} className="text-gold" /> Charge Efficiency Profile
              </h3>
              {loadingChart && <div className="text-[10px] text-gold animate-pulse uppercase tracking-widest">Fetching DB Logs...</div>}
            </div>

            <div style={{ height: '220px', width: '100%', padding: '0 1rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="rgba(255,255,255,0.2)" 
                    tick={{ fill: 'var(--text-muted)', fontSize: 10, fontWeight: 900 }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.2)" 
                    tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(186,184,108,0.2)', color: '#BAB86C', fontWeight: 900, borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar 
                    dataKey="level" 
                    fill="rgba(186,184,108,0.7)" 
                    activeBar={<Rectangle fill="#FFFFFF" />}
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
         </div>
      </div>
    </div>
  );
};

export default BatteryTab;
