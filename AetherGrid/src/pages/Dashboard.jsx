import React, { useState, useEffect } from 'react';
import { 
  Sun, Battery, Activity, Zap, ShieldAlert, 
  TrendingUp, Cloud, CloudRain, Wind, 
  Layout, BarChart2, ThermometerSun 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { fetchCurrentWeather } from '../services/weatherService';
import './Admin.css'; // Reuse admin styles for the premium tactical look

const Dashboard = ({ theme }) => {
  const [weather, setWeather] = useState(null);
  const [liveMetrics, setLiveMetrics] = useState({
    consumption: 4.2,
    solarLabel: 'Optimal',
    gridStatus: 'Syncing',
    batteryLevel: 88
  });

  useEffect(() => {
    const getW = async () => {
      const data = await fetchCurrentWeather();
      setWeather(data);
    };
    getW();

    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        ...prev,
        consumption: +(prev.consumption + (Math.random() * 0.2 - 0.1)).toFixed(2),
        batteryLevel: Math.max(0, Math.min(100, prev.batteryLevel + (Math.random() * 0.1 - 0.05)))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const hourlyData = [
    { time: '00:00', load: 2.1, solar: 0 },
    { time: '04:00', load: 1.8, solar: 0 },
    { time: '08:00', load: 3.5, solar: 1.2 },
    { time: '12:00', load: 4.8, solar: 3.5 },
    { time: '16:00', load: 4.2, solar: 2.1 },
    { time: '20:00', load: 3.2, solar: 0 },
    { time: '23:59', load: 2.5, solar: 0 },
  ];

  return (
    <div className="admin-tab-container fade-slide-up">
      {/* Tactical Header */}
      <div className="tab-header mb-xl flex justify-between items-center px-lg">
        <div>
          <h1 className="flex items-center gap-md m-0">
             <Layout className="text-gold" /> Node Overview
          </h1>
          <p className="text-muted text-xs uppercase font-black tracking-widest mt-xs">
            Real-time residential DER node telemetry for the Mysuru Grid.
          </p>
        </div>
        <div className="status-badge live admin-pulse">
          <span className="dot pulse bg-gold"></span>
          <span className="text-xs font-black uppercase tracking-widest text-gold">{liveMetrics.gridStatus}</span>
        </div>
      </div>

      <div className="admin-kpis grid-4 gap-xl mb-xl px-lg">
        {/* KPI: Real-time Consumption */}
        <div className="surface-card p-xl bg-black/40 border-gold/20 hover-lift">
          <div className="flex justify-between items-center mb-md">
            <span className="text-muted font-black text-[10px] uppercase tracking-widest">LIVE CONSUMPTION</span>
            <Activity className="text-gold" size={18} />
          </div>
          <h2 className="m-0 text-3xl font-black">{liveMetrics.consumption} <span className="text-lg text-muted">KW</span></h2>
          <div className="text-[10px] text-muted font-bold mt-sm uppercase tracking-widest">Household Base Load</div>
        </div>

        {/* KPI: Renewable Generation */}
        <div className="surface-card p-xl bg-black/40 border-gold/20 hover-lift">
          <div className="flex justify-between items-center mb-md">
            <span className="text-muted font-black text-[10px] uppercase tracking-widest">RENEWABLE YIELD</span>
            <Sun className="text-gold" size={18} />
          </div>
          <h2 className="m-0 text-3xl font-black">2.45 <span className="text-lg text-muted">KW</span></h2>
          <div className="text-[10px] text-gold font-bold mt-sm uppercase tracking-widest">Harvest: {liveMetrics.solarLabel}</div>
        </div>

        {/* KPI: Battery Level */}
        <div className="surface-card p-xl bg-black/40 border-gold/20 hover-lift">
          <div className="flex justify-between items-center mb-md">
            <span className="text-muted font-black text-[10px] uppercase tracking-widest">STORAGE RESERVE</span>
            <Battery className="text-gold" size={18} />
          </div>
          <h2 className="m-0 text-3xl font-black">{Math.round(liveMetrics.batteryLevel)} <span className="text-lg text-muted">%</span></h2>
          <div className="w-full h-1 bg-white/5 rounded-full mt-sm overflow-hidden">
             <div className="h-full bg-gold shadow-glow-gold" style={{ width: `${liveMetrics.batteryLevel}%` }}></div>
          </div>
        </div>

        {/* KPI: Local Grid Status */}
        <div className="surface-card p-xl bg-black/40 border-gold/20 hover-lift relative overflow-hidden">
          <div className="flex justify-between items-center mb-md z-10 relative">
            <span className="text-muted font-black text-[10px] uppercase tracking-widest">GRID MANIFOLD</span>
            <ShieldAlert className="text-gold" size={18} />
          </div>
          <h2 className="m-0 text-2xl font-black text-gold z-10 relative uppercase italic">OPTIMAL</h2>
          <div className="text-[10px] text-muted font-bold mt-sm uppercase tracking-widest z-10 relative">50.01 HZ SYNCED</div>
          <div className="absolute inset-0 bg-gold/5 animate-pulse"></div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid-2 gap-xl px-lg">
        {/* Equilibrium Flow Chart */}
        <div className="surface-card p-xl flex flex-col bg-black/40">
           <div className="flex justify-between items-center mb-xl">
             <h3 className="m-0 flex items-center gap-sm font-black text-xs uppercase tracking-widest">
                <TrendingUp size={16} className="text-gold" /> System Equilibrium Flow
             </h3>
             <div className="px-lg py-xs bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest">Live Feed</div>
           </div>
           
           <div style={{ height: '300px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={hourlyData}>
                    <defs>
                       <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#BAB86C" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#BAB86C" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="time" stroke="#8c9baf" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis stroke="#8c9baf" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(186,184,108,0.3)', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="load" stroke="#BAB86C" strokeWidth={4} fillOpacity={1} fill="url(#colorLoad)" name="Load Demand" />
                    <Area type="monotone" dataKey="solar" stroke="rgba(255,255,255,0.3)" fill="rgba(255,255,255,0.05)" name="Renewable Input" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Weather Intelligence Card */}
        <div className="surface-card p-0 flex flex-col bg-black/40 overflow-hidden relative">
          <div className="p-xl bg-gold/5 border-b border-gold/10 flex justify-between items-center">
            <div>
              <h3 className="m-0 flex items-center gap-sm font-black text-xs uppercase tracking-widest">
                 <ThermometerSun size={18} className="text-gold" /> Weather Intelligence
              </h3>
              <p className="m-0 text-[10px] text-muted mt-xs font-black uppercase tracking-widest">Localized Environmental Impact</p>
            </div>
            {weather && <div className="text-xl font-black">{Math.round(weather.main.temp)}°C</div>}
          </div>

          <div className="p-xl flex flex-col gap-lg flex-1 justify-center">
             <div className="flex justify-between items-center bg-black/40 p-lg rounded-2xl border border-white/5 transition-all hover:bg-white/5">
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-black text-muted uppercase">Atmosphere</span>
                   <span className="text-sm font-black uppercase text-white">{weather?.weather[0]?.description || 'Scanning..'}</span>
                </div>
                {weather?.weather[0]?.main === 'Clear' ? <Sun className="text-gold" /> : <Cloud className="text-white/40" />}
             </div>

             <div className="flex justify-between items-center bg-black/40 p-lg rounded-2xl border border-white/5 transition-all hover:bg-white/5">
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-black text-muted uppercase">Wind synergy</span>
                   <span className="text-sm font-black uppercase text-white">{weather?.wind?.speed} m/s Velocity</span>
                </div>
                <Wind className="text-white/40" size={20} />
             </div>

             <div className="bg-gold/5 border border-gold/20 p-2xl rounded-2xl text-center">
                <div className="text-[10px] font-black text-gold uppercase tracking-widest mb-xs">Recommendation</div>
                <p className="m-0 text-sm font-bold text-white leading-relaxed">
                   High solar potential detected. Recommendation: Maximize battery storage cycle until sunset.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
