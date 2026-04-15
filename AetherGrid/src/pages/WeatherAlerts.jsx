import React, { useState, useEffect } from 'react';
import { 
  Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, 
  RefreshCw, CloudSun, Calendar, Zap, AlertTriangle, ThermometerSun
} from 'lucide-react';
import { fetchCurrentWeather, fetchForecast } from '../services/weatherService';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Admin.css';

const WeatherAlerts = ({ theme }) => {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());

  const refreshWeather = async () => {
    try {
      setLoading(true);
      const cData = await fetchCurrentWeather();
      const fData = await fetchForecast();
      setCurrent(cData);
      setForecast(fData);
      setLastSync(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Telemetery Stream Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshWeather();
    const interval = setInterval(refreshWeather, 300000); // Sync every 5 mins
    return () => clearInterval(interval);
  }, []);

  if (loading && !current) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="admin-pulse text-gold font-black tracking-widest text-xl uppercase">Decrypting Meteorological Stream...</div>
      </div>
    );
  }

  // Process forecast data for chart
  const chartData = forecast?.list?.slice(0, 8).map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temp: Math.round(item.main.temp),
    clouds: item.clouds.all
  })) || [];

  return (
    <div className="admin-tab-container fade-slide-up flex flex-col gap-xl">
      <div className="tab-header flex justify-between items-center px-lg mb-xl">
        <div>
          <h1 className="flex items-center gap-md m-0"><CloudSun className="text-gold" /> Weather Intelligence</h1>
          <p className="text-muted text-[10px] uppercase font-black tracking-widest mt-xs uppercase">Live environmental telemetry for Mysuru Metropolitan Area</p>
        </div>
        <div className="flex items-center gap-lg">
           <div className="text-right">
              <div className="text-[10px] font-black uppercase text-muted">Satellite Sync</div>
              <div className="text-xs font-bold text-white">{lastSync}</div>
           </div>
           <button 
            onClick={refreshWeather}
            className={`p-md rounded-xl bg-white/5 border border-white/10 hover:border-gold/50 transition-all cursor-pointer ${loading ? 'animate-spin' : ''}`}
           >
             <RefreshCw size={18} className="text-gold" />
           </button>
        </div>
      </div>

      <div className="grid-3 gap-xl px-lg">
        {/* Main Current Weather Card */}
        <div className="col-span-2 surface-card p-2xl flex flex-col relative overflow-hidden radiant-card">
          <div className="absolute top-0 right-0 p-2xl opacity-10">
            {current?.weather[0]?.main === 'Clear' ? <Sun size={200} className="text-gold" /> : <Cloud size={200} className="text-gold" />}
          </div>
          
          <div className="flex justify-between items-start z-10">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black tracking-widest text-gold uppercase">Current Conditions</span>
              <h2 className="text-6xl font-black m-0">{Math.round(current?.main?.temp || 0)}°C</h2>
              <div className="flex items-center gap-md mt-sm">
                <span className="text-2xl font-bold uppercase tracking-tighter">{current?.weather[0]?.description}</span>
                <span className="px-lg py-xs bg-gold/10 rounded-full text-[10px] font-black border border-gold/20 uppercase">Humidity: {current?.main?.humidity}%</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-md text-right">
               <div className="flex items-center gap-sm justify-end">
                  <Wind size={20} className="text-gold" />
                  <span className="text-xl font-black">{current?.wind?.speed} m/s</span>
               </div>
               <span className="text-[10px] text-muted font-black uppercase tracking-widest">Wind Velocity</span>
            </div>
          </div>

          <div className="mt-2xl z-10 grid-4 gap-xl">
             <div className="flex flex-col p-lg bg-black/40 rounded-2xl border border-white/5">
                <span className="text-[10px] font-black text-muted uppercase">Feels Like</span>
                <span className="text-xl font-bold">{Math.round(current?.main?.feels_like || 0)}°C</span>
             </div>
             <div className="flex flex-col p-lg bg-black/40 rounded-2xl border border-white/5">
                <span className="text-[10px] font-black text-muted uppercase">Visibility</span>
                <span className="text-xl font-bold">{(current?.visibility / 1000).toFixed(1)} km</span>
             </div>
             <div className="flex flex-col p-lg bg-black/40 rounded-2xl border border-white/5">
                <span className="text-[10px] font-black text-muted uppercase">Pressure</span>
                <span className="text-xl font-bold">{current?.main?.pressure} hPa</span>
             </div>
             <div className="flex flex-col p-lg bg-black/40 rounded-2xl border border-white/5">
                <span className="text-[10px] font-black text-muted uppercase tracking-widest">Solar Potential</span>
                <span className={`text-xl font-black ${current?.clouds?.all < 20 ? 'text-gold' : 'text-white/60'}`}>
                  {100 - current?.clouds?.all}%
                </span>
             </div>
          </div>
        </div>

        {/* Forecast Summary List */}
        <div className="surface-card p-xl flex flex-col gap-lg overflow-hidden border border-white/10 shadow-inner">
          <h3 className="m-0 text-[10px] font-black uppercase tracking-widest text-muted border-b border-white/5 pb-md flex items-center gap-sm">
            <Calendar size={14} className="text-gold" /> 24-Hour Pulse Forecast
          </h3>
          <div className="flex flex-col gap-md overflow-y-auto pr-sm h-full">
            {forecast?.list?.slice(0, 8).map((item, i) => (
              <div key={i} className="flex justify-between items-center p-md bg-black/60 rounded-2xl border border-white/5 hover:border-gold/20 transition-all">
                <div className="flex flex-col">
                  <span className="text-xs font-black">{new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <span className="text-[9px] text-muted font-black uppercase tracking-widest">{item.weather[0].main}</span>
                </div>
                <div className="flex items-center gap-lg">
                   <div className="text-right">
                      <div className="text-sm font-black text-white">{Math.round(item.main.temp)}°C</div>
                      <div className="text-[8px] text-gold font-black uppercase">{item.clouds.all}% Cloud Cover</div>
                   </div>
                   {item.weather[0].main === 'Clear' ? <Sun size={20} className="text-gold" /> : <Cloud size={20} className="text-white/40" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-2 gap-xl px-lg">
        {/* Temperature Trend Chart */}
        <div className="surface-card p-xl border border-white/10 bg-black/40">
           <h3 className="m-0 text-[10px] font-black uppercase tracking-widest text-muted mb-xl px-lg">Atmospheric Temperature Trend</h3>
           <div style={{ height: '250px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#BAB86C" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#BAB86C" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" hide />
                  <YAxis tickCount={5} fontSize={10} stroke="#8c9baf" axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#050505', 
                      border: '1px solid rgba(186,184,108,0.3)', 
                      borderRadius: '8px', 
                      fontSize: '10px',
                      color: '#fff' 
                    }}
                  />
                  <Area type="monotone" dataKey="temp" stroke="#BAB86C" strokeWidth={4} fillOpacity={1} fill="url(#colorTemp)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Cloud Cover & Grid Impact */}
        <div className="surface-card p-xl flex flex-col border border-white/10 bg-black/40">
           <h3 className="m-0 text-[10px] font-black uppercase tracking-widest text-muted mb-xl px-lg">Cloud Coverage & Grid Impact</h3>
           <div className="flex-1 flex flex-col gap-lg px-lg">
              <div className="flex flex-col gap-sm">
                 <div className="flex justify-between items-baseline">
                    <span className="text-[11px] font-black uppercase tracking-widest text-white/80">Solar Efficiency (Predicted)</span>
                    <span className="text-xl font-black text-gold">{100 - (current?.clouds?.all || 0)}%</span>
                 </div>
                 <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gold shadow-glow-gold" style={{ width: `${100 - (current?.clouds?.all || 0)}%` }}></div>
                 </div>
              </div>

              <div className="flex flex-col gap-sm mt-md">
                 <div className="flex justify-between items-baseline">
                    <span className="text-[11px] font-black uppercase tracking-widest text-white/80">Wind Turbine Synergy</span>
                    <span className="text-xl font-black text-white">{Math.min(100, (current?.wind?.speed || 0) * 10).toFixed(0)}%</span>
                 </div>
                 <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-white/40" style={{ width: `${Math.min(100, (current?.wind?.speed || 0) * 10)}%` }}></div>
                 </div>
              </div>

              <div className="mt-auto p-lg bg-gold/5 border border-gold/20 rounded-2xl flex items-center gap-md">
                 <AlertTriangle size={24} className="text-gold" />
                 <p className="m-0 text-[10px] font-black text-gold uppercase leading-relaxed tracking-widest">
                   Atmospheric conditions are STABLE. No immediate impact on DER deployment. Solar potential is MAXIMIZED for the next 4 hours.
                 </p>
              </div>
           </div>
        </div>
      </div>

      <style>{`
        .radiant-card {
           background: linear-gradient(135deg, rgba(186, 184, 108, 0.05) 0%, transparent 100%) !important;
           border-left: 4px solid #BAB86C !important;
        }
        .shadow-glow-gold { box-shadow: 0 0 15px rgba(186, 184, 108, 0.4); }
      `}</style>
    </div>
  );
};

export default WeatherAlerts;
