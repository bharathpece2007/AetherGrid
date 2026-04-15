import React from 'react';
import { Activity, Users, MapPin, AlertCircle, TrendingUp, Zap, BarChart2, ShieldAlert, Layout, Sun } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { fetchCurrentWeather } from '../services/weatherService';
import './Admin.css'; 

const AdminOverview = ({ theme, setActiveTab }) => {
  const [weather, setWeather] = React.useState(null);
  const [liveData, setLiveData] = React.useState({
    demand: 142.5,
    supply: 155.0,
    nodes: 4192
  });

  React.useEffect(() => {
    const getW = async () => {
      const data = await fetchCurrentWeather();
      setWeather(data);
    };
    getW();

    const interval = setInterval(() => {
      setLiveData(prev => ({
        demand: +(prev.demand + (Math.random() * 0.4 - 0.2)).toFixed(1),
        supply: +(prev.supply + (Math.random() * 0.2 - 0.1)).toFixed(1),
        nodes: prev.nodes + (Math.random() > 0.8 ? 1 : 0)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  const data = [
    { hour: 0, demand: 150, supply: 160 },
    { hour: 1, demand: 145, supply: 158 },
    { hour: 2, demand: 142, supply: 157 },
    { hour: 3, demand: 140, supply: 156 },
    { hour: 4, demand: 138, supply: 155 },
    { hour: 5, demand: 135, supply: 153 },
    { hour: 6, demand: 132, supply: 152 },
    { hour: 7, demand: 130, supply: 150 },
    { hour: 8, demand: 128, supply: 148 },
    { hour: 9, demand: 125, supply: 147 },
    { hour: 10, demand: 120, supply: 145 },
    { hour: 11, demand: 115, supply: 143 },
    { hour: 12, demand: 112, supply: 140 },
    { hour: 13, demand: 110, supply: 142 },
    { hour: 14, demand: 112, supply: 145 },
    { hour: 15, demand: 115, supply: 148 },
    { hour: 16, demand: 120, supply: 150 },
    { hour: 17, demand: 125, supply: 152 },
    { hour: 18, demand: 130, supply: 155 },
    { hour: 19, demand: 135, supply: 158 },
    { hour: 20, demand: 140, supply: 160 },
    { hour: 21, demand: 145, supply: 162 },
    { hour: 22, demand: 150, supply: 165 },
    { hour: 23, demand: 155, supply: 168 },
  ];
  return (
    <div className="admin-tab-container fade-slide-up">
      <div className="tab-header mb-xl flex justify-between items-center px-lg">
        <div>
          <h1 className="flex items-center gap-md m-0">Grid Overview 
            {weather && (
              <span className="text-[10px] font-black px-sm py-xs bg-black/40 rounded border border-white/10 flex items-center gap-xs ml-md text-gold uppercase tracking-widest">
                <Sun size={12} className="text-gold" />
                {Math.round(weather.main.temp)}°C in {weather.name}
              </span>
            )}
          </h1>
          <p className="text-muted text-xs uppercase font-black tracking-widest mt-xs uppercase">Master diagnostic suite for the Mysuru Metropolitan VPP network.</p>
        </div>
        <div className="status-badge live admin-pulse">
          <span className="dot pulse bg-gold"></span>
          System Online
        </div>
      </div>

      <div className="admin-kpis grid-4 gap-xl mb-xl">
        <div className={`surface-card p-xl hover-lift border-gold/20`}>
          <div className="flex justify-between items-center mb-md">
            <span className="text-muted font-black text-[10px] uppercase tracking-widest">TOTAL DEMAND</span>
            <Activity className="text-gold" size={20} />
          </div>
          <h2 className="m-0 text-3xl font-black">{liveData.demand.toLocaleString()} <span className="text-lg text-muted">MW</span></h2>
          <div className="flex items-center gap-xs mt-sm text-xs font-bold text-gold">
            <TrendingUp size={14} /> <span>+2.4% vs avg</span>
          </div>
        </div>

        <div className="surface-card p-xl hover-lift border-gold/20">
          <div className="flex justify-between items-center mb-md">
            <span className="text-muted font-black text-[10px] uppercase tracking-widest">TOTAL SUPPLY</span>
            <Zap className="text-gold" size={20} />
          </div>
          <h2 className="m-0 text-3xl font-black">{liveData.supply.toLocaleString()} <span className="text-lg text-muted">MW</span></h2>
          <div className="flex items-center gap-xs mt-sm text-xs font-bold text-muted">
            <span>Surplus ~{(liveData.supply - liveData.demand).toFixed(1)}MW</span>
          </div>
        </div>

        <div className="surface-card p-xl hover-lift border-gold/20">
          <div className="flex justify-between items-center mb-md">
            <span className="text-muted font-black text-[10px] uppercase tracking-widest">ACTIVE NODES</span>
            <Users className="text-gold" size={20} />
          </div>
          <h2 className="m-0 text-3xl font-black">{liveData.nodes.toLocaleString()}</h2>
          <div className="flex items-center gap-xs mt-sm text-xs font-bold text-gold">
            <span>+14 joined today</span>
          </div>
        </div>

        <div className={`surface-card p-xl hover-lift ${liveData.demand > liveData.supply * 0.92 ? 'border-red-tactical' : 'border-gold/30'}`}>
          <div className="flex justify-between items-center mb-md">
            <span className="text-muted font-black text-[10px] uppercase tracking-widest">GRID STATUS</span>
            <MapPin className="text-gold" size={20} />
          </div>
          <h2 className={`m-0 text-3xl font-black ${liveData.demand > liveData.supply * 0.92 ? 'text-red' : 'text-gold'}`}>
            {liveData.demand > liveData.supply * 0.92 ? 'Critical' : 'Stable'}
          </h2>
          <div className="flex items-center gap-xs mt-sm text-xs text-muted font-bold">
            <span>Grid load within normal parameters</span>
          </div>
        </div>
      </div>

      <div className="grid-2 gap-xl">
        <div className="surface-card p-xl">
           <div className="flex justify-between items-center mb-lg">
             <h3 className="m-0 flex items-center gap-sm font-black text-xs uppercase tracking-widest"><BarChart2 size={20} className="text-gold" /> Demand vs Supply (24H)</h3>
           </div>
           <div style={{ height: '350px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#e2e8f0'} vertical={false} />
                  <XAxis 
                    dataKey="hour" 
                    stroke="#8c9baf" 
                    fontSize={10} 
                    tickFormatter={(val) => `${val}:00`}
                  />
                  <YAxis stroke="#8c9baf" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#050505', 
                      border: '1px solid rgba(186,184,108,0.3)', 
                      borderRadius: '8px', 
                      color: '#fff',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                    }} 
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Line 
                    type="monotone" 
                    dataKey="demand" 
                    stroke="#BAB86C" 
                    strokeWidth={4} 
                    dot={false} 
                    name="Demand (MW)"
                    activeDot={{ r: 8, fill: '#BAB86C', stroke: '#fff' }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="supply" 
                    stroke="rgba(255,255,255,0.6)" 
                    strokeWidth={2} 
                    dot={false}
                    name="Supply (MW)"
                  />
                </LineChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Emergency Grid Alerts Panel */}
        <div 
          className="surface-card p-0 flex flex-col border-red overflow-hidden cursor-pointer hover-lift transition-all" 
          style={{ 
            background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.05) 0%, rgba(0,0,0,0) 100%)',
            boxShadow: '0 0 30px rgba(239, 68, 68, 0.15)'
          }}
          onClick={() => setActiveTab('control-center')}
        >
          <div className="p-xl bg-black/40 flex justify-between items-center border-b border-red/20">
            <div>
              <h3 className="m-0 flex items-center gap-sm text-red font-black text-xs uppercase tracking-widest"><ShieldAlert size={24} /> EMERGENCY GRID ALERTS</h3>
              <p className="m-0 text-[10px] text-muted mt-xs font-black uppercase tracking-widest">Click to take control</p>
            </div>
            <div className="px-sm py-xs bg-red text-white text-[9px] font-black uppercase rounded animate-pulse">ACTIVE ALARM</div>
          </div>
          
          <div className="p-xl flex flex-col gap-lg h-full justify-center">
            <div className="p-xl rounded-2xl bg-black/60 border border-red/50 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-2 h-full bg-red"></div>
               <h4 className="m-0 text-red flex items-center gap-sm uppercase tracking-widest text-xs mb-md font-black">
                  <AlertCircle size={18} /> Major Outage: South Hub
               </h4>
               <p className="m-0 text-sm line-height-relaxed text-white font-bold opacity-80">
                  Primary Transformer T-09 de-synchronized. Cascading voltage drop detected in Sectors 7 & 8. Grid isolation required.
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* Solar Section Section */}
      <div className="mt-xl">
        <div className="flex items-center gap-md mb-xl">
           <div className="w-[40px] h-[2px] bg-gold"></div>
           <h2 className="m-0 uppercase tracking-tighter font-black text-lg text-white">Solar Energy Ecosystem</h2>
           <div className="flex-1 h-[1px] bg-white/5"></div>
        </div>

        <div className="grid-3 gap-xl">
           {/* Solar Generation Bar Chart */}
           <div className="surface-card p-xl col-span-2 bg-black/40 border-white/10">
              <h3 className="m-0 mb-xl flex items-center gap-sm font-black text-xs uppercase tracking-widest"><Layout size={20} className="text-gold" /> Hourly Solar Yield vs Demand</h3>
              <div style={{ height: '300px' }}>
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.map(d => ({ ...d, solar: d.supply * (0.1 + Math.random() * 0.15) }))}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                       <XAxis dataKey="hour" fontSize={11} stroke="#8c9baf" tickFormatter={(v) => `${v}h`} />
                       <YAxis fontSize={11} stroke="#8c9baf" axisLine={false} tickLine={false} />
                       <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(186,184,108,0.3)', borderRadius: '8px' }} />
                       <Bar dataKey="solar" fill="#BAB86C" radius={[4, 4, 0, 0]} name="Solar (MW)" />
                       <Bar dataKey="demand" fill="rgba(255,255,255,0.2)" radius={[4, 4, 0, 0]} name="Grid Demand (MW)" />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Source Distribution Pie */}
           <div className="surface-card p-xl flex flex-col items-center bg-black/40 border-white/10">
              <h3 className="m-0 mb-xl text-center self-stretch font-black text-xs uppercase tracking-widest text-gold text-center">Energy Source Mix</h3>
              <div style={{ height: '220px', width: '100%' }}>
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie
                          data={[
                             { name: 'Solar', value: 35, fill: '#BAB86C' },
                             { name: 'Wind', value: 25, fill: 'rgba(255,255,255,0.4)' },
                             { name: 'Thermal', value: 40, fill: 'rgba(255,255,255,0.1)' }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                       >
                          <Cell stroke="none" />
                       </Pie>
                       <Tooltip />
                    </PieChart>
                 </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-lg w-full mt-xl">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest"><span className="text-gold">SUN PRODUCED</span> <span>35%</span></div>
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest"><span className="text-white/40">RENEWABLE WIND</span> <span>25%</span></div>
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest"><span className="text-white/20">TRADITIONAL GRID</span> <span>40%</span></div>
              </div>
           </div>
        </div>

        {/* Solar vs Grid Electricity Comparison Profile */}
        <div className="surface-card p-xl mt-xl bg-black/40 border-white/10">
           <h3 className="m-0 mb-xl flex items-center gap-sm font-black text-xs uppercase tracking-widest text-gold text-center w-full"><TrendingUp size={20} /> Solar vs Grid Profile</h3>
           <div style={{ height: '280px' }}>
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={data.map(d => ({ 
                   ...d, 
                   solar: d.supply * (0.1 + Math.random() * 0.1),
                   grid: d.demand 
                 }))}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="hour" fontSize={11} stroke="#8c9baf" tickFormatter={(v) => `${v}:00`} />
                    <YAxis fontSize={11} stroke="#8c9baf" axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(186,184,108,0.3)', borderRadius: '8px' }} />
                    <Legend />
                    <Area type="monotone" dataKey="solar" stroke="#BAB86C" fill="#BAB86C" fillOpacity={0.1} name="Solar Harvested (MW)" />
                    <Area type="monotone" dataKey="grid" stroke="rgba(255,255,255,0.2)" fill="rgba(255,255,255,0.05)" name="Grid Electricity (MW)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
           <p className="text-[10px] text-muted mt-xl italic text-center font-black uppercase tracking-widest px-2xl">
              Cross-referenced comparison between renewable solar contribution and base-load grid demand over 24-hour cycle.
           </p>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
