import React, { useState, useEffect } from 'react';
import { Lightbulb, CloudLightning, TrendingUp, BarChart2, AlertTriangle, Sun } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchCurrentWeather } from '../services/weatherService';
import './Admin.css';

const AdminForecastAI = ({ theme }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getW = async () => {
      const data = await fetchCurrentWeather();
      setWeather(data);
    };
    getW();
  }, []);
  const forecastData = [
    { hour: 0, load: 140.0 }, { hour: 1, load: 139.5 }, { hour: 2, load: 139.0 },
    { hour: 3, load: 138.5 }, { hour: 4, load: 138.0 }, { hour: 5, load: 137.5 },
    { hour: 6, load: 137.0 }, { hour: 7, load: 136.5 }, { hour: 8, load: 136.0 },
    { hour: 9, load: 135.5 }, { hour: 10, load: 135.0 }, { hour: 11, load: 134.5 },
    { hour: 12, load: 134.0 }, { hour: 13, load: 132.0 }, { hour: 14, load: 130.0 },
    { hour: 15, load: 128.0 }, { hour: 16, load: 126.0 }, { hour: 17, load: 124.0 },
    { hour: 18, load: 122.0 }, { hour: 19, load: 120.0 }, { hour: 20, load: 118.0 },
    { hour: 21, load: 120.5 }, { hour: 22, load: 123.0 }, { hour: 23, load: 125.5 },
    { hour: 24, load: 128.0 }, { hour: 25, load: 130.5 }, { hour: 26, load: 133.0 },
    { hour: 27, load: 135.5 }, { hour: 28, load: 138.0 }, { hour: 29, load: 140.5 },
    { hour: 30, load: 143.0 }, { hour: 31, load: 145.5 }, { hour: 32, load: 148.0 },
    { hour: 33, load: 149.2 }, { hour: 34, load: 150.4 }, { hour: 35, load: 151.6 },
    { hour: 36, load: 152.8 }, { hour: 37, load: 154.0 }, { hour: 38, load: 155.2 },
    { hour: 39, load: 156.4 }, { hour: 40, load: 157.6 }, { hour: 41, load: 158.8 },
    { hour: 42, load: 160.0 }, { hour: 43, load: 161.2 }, { hour: 44, load: 162.4 },
    { hour: 45, load: 163.6 }, { hour: 46, load: 164.8 }, { hour: 47, load: 166.0 }
  ];

  return (
    <div className="admin-tab-container fade-slide-up">
      <div className="tab-header mb-xl flex flex-col items-center text-center">
        <div className="flex items-center gap-md mb-xs">
          <TrendingUp className="text-gold" size={32} />
          <h1 className="m-0 text-3xl font-black tracking-tighter uppercase">Forecast & AI Intelligence</h1>
        </div>
        <p className="text-muted text-[10px] uppercase tracking-widest font-black">Predictive mapping and machine learning optimization recommendations</p>
      </div>

      <div className="grid-2 gap-xl" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        
        {/* Forecast Graph */}
        <div className="flex-col gap-lg overflow-hidden">
           <div className="surface-card p-xl bg-black/40 border border-white/10">
              <div className="flex justify-between items-center mb-xl px-lg">
                 <h3 className="m-0 flex items-center gap-sm font-black text-xs uppercase tracking-widest"><BarChart2 size={20} className="text-gold" /> Predicted Load Manifold (48H)</h3>
                 <div className="flex items-center gap-xs text-red text-[10px] font-black uppercase tracking-widest border border-red/30 px-sm py-1 rounded bg-red/10 animate-pulse">
                    <AlertTriangle size={14} /> Critical Spike (H40+)
                 </div>
              </div>
              
              <div style={{ height: '350px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={forecastData}>
                    <defs>
                      <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#BAB86C" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#BAB86C" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="hour" fontSize={10} stroke="#8c9baf" tickFormatter={(v) => `H${v}`} />
                    <YAxis fontSize={10} stroke="#8c9baf" domain={['dataMin - 10', 'dataMax + 10']} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#050505', 
                        border: '1px solid rgba(186,184,108,0.3)', 
                        borderRadius: '8px',
                        fontSize: '10px',
                        color: '#fff' 
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="load" 
                      stroke="#BAB86C" 
                      strokeWidth={4} 
                      fillOpacity={1} 
                      fill="url(#colorLoad)" 
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>
        </div>

        {/* AI Recommendations */}
        <div className="flex flex-col gap-lg">
           <div className="surface-card p-xl flex-1 relative overflow-hidden bg-black/40 border border-white/10">
              <div className="absolute -right-4 -top-4 opacity-5"><Lightbulb size={200} className="text-gold" /></div>
              
              <h3 className="m-0 flex items-center gap-sm mb-xl text-gold font-black text-xs uppercase tracking-widest"><Lightbulb size={20} /> AI Protocol Stream</h3>
              
              <div className="ai-rec-list flex flex-col gap-lg relative z-10">
                 <div className="bg-black/40 p-xl rounded-2xl border border-white/5 hover:border-gold/30 transition-all">
                    <div className="flex justify-between items-center mb-md">
                       <span className="text-[10px] font-black uppercase tracking-widest text-gold bg-gold/10 px-md py-1 rounded-full border border-gold/20">Critical Alert</span>
                       <span className="text-[10px] text-muted font-black uppercase">Block 18:00</span>
                    </div>
                    <p className="m-0 font-black mb-xs text-sm uppercase tracking-tighter">Initiate Sector Throttling</p>
                    <p className="m-0 text-[11px] text-muted mb-xl font-medium leading-relaxed">Predictive model indicates a severe load spike. recommend 15% global throttle on non-critical sectors.</p>
                    <button className="w-full py-md bg-gold text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all cursor-pointer">Auto-Apply Protocol</button>
                 </div>
                 
                 <div className="bg-black/40 p-xl rounded-2xl border border-white/5">
                    <p className="m-0 font-black mb-xs text-sm uppercase tracking-tighter">Pre-Charge Strategy</p>
                    <p className="m-0 text-[11px] text-muted font-medium leading-relaxed">Commence force-charging all regional EV/Battery endpoints before 12:00 to avoid stacking load during the cold front.</p>
                 </div>
              </div>
           </div>
           
            <div className="surface-card p-xl flex items-center justify-between border border-white/10">
              <div className="flex items-center gap-md">
                <div className="p-md bg-gold/10 rounded-xl border border-gold/20">
                   {weather?.weather[0]?.main === 'Clear' ? <Sun size={24} className="text-gold" /> : <CloudLightning size={24} className="text-gold" />}
                </div>
                <div>
                  <h4 className="m-0 text-white font-black text-sm uppercase tracking-tighter">{weather ? `${Math.round(weather.main.temp)}°C ${weather.weather[0].main}` : 'Syncing Live...'}</h4>
                  <span className="text-[10px] text-muted font-black uppercase tracking-widest mt-1 block">
                    {weather ? `${weather.weather[0].description} in Mysuru` : 'Connecting Stream...'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-muted uppercase tracking-widest block mb-xs font-black">Forecast Status</span>
                <span className="text-[10px] font-black text-gold bg-gold/10 px-md py-1 rounded-full border border-gold/20 uppercase tracking-widest animate-pulse">Active Feed</span>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default AdminForecastAI;
