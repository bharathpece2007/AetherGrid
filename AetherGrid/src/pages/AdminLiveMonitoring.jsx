import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip as LeafletTooltip, useMap } from 'react-leaflet';
import { Map, Activity, Clock, Server, TrendingUp, BarChart2, AlertTriangle, AlertOctagon, ShieldAlert, Sun, CloudRain } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { fetchCurrentWeather } from '../services/weatherService';
import './Admin.css';

const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 1 });
  }, [center, zoom, map]);
  return null;
};

const AdminLiveMonitoring = ({ theme }) => {
  const [weather, setWeather] = useState(null);
  const [mapState, setMapState] = useState({ center: [12.3080, 76.6450], zoom: 13 });

  const handleNodeClick = (node) => {
    setMapState({ center: node.pos, zoom: 16 });
  };

  useEffect(() => {
    const getW = async () => {
      const data = await fetchCurrentWeather();
      setWeather(data);
    };
    getW();
  }, []);
  const frequencyData = [
    { time: "00:00", hz: 49.92, status: "Normal" },
    { time: "01:00", hz: 49.88, status: "Normal" },
    { time: "02:00", hz: 49.85, status: "Normal" },
    { time: "03:00", hz: 49.83, status: "Low" },
    { time: "04:00", hz: 49.87, status: "Normal" },
    { time: "05:00", hz: 49.95, status: "Normal" },
    { time: "06:00", hz: 50.02, status: "Normal" },
    { time: "07:00", hz: 50.08, status: "Normal" },
    { time: "08:00", hz: 50.12, status: "High" },
    { time: "09:00", hz: 50.15, status: "High" },
    { time: "10:00", hz: 50.18, status: "High" },
    { time: "11:00", hz: 50.20, status: "High" },
    { time: "12:00", hz: 50.22, status: "High" },
    { time: "13:00", hz: 50.19, status: "High" },
    { time: "14:00", hz: 50.14, status: "High" },
    { time: "15:00", hz: 50.10, status: "Normal" },
    { time: "16:00", hz: 50.05, status: "Normal" },
    { time: "17:00", hz: 49.98, status: "Normal" },
    { time: "18:00", hz: 49.90, status: "Normal" },
    { time: "19:00", hz: 49.85, status: "Low" },
    { time: "20:00", hz: 0.00, status: "Critical" },
    { time: "21:00", hz: 49.82, status: "Low" },
    { time: "22:00", hz: 49.88, status: "Normal" },
    { time: "23:00", hz: 49.91, status: "Normal" },
    { time: "00:00", hz: 49.93, status: "Normal" },
    { time: "01:00", hz: 49.89, status: "Normal" },
    { time: "02:00", hz: 49.86, status: "Normal" },
    { time: "03:00", hz: 49.84, status: "Low" },
    { time: "04:00", hz: 49.88, status: "Normal" },
    { time: "05:00", hz: 49.96, status: "Normal" },
    { time: "06:00", hz: 50.01, status: "Normal" },
    { time: "07:00", hz: 50.07, status: "Normal" },
    { time: "08:00", hz: 50.11, status: "High" },
    { time: "09:00", hz: 50.16, status: "High" },
    { time: "10:00", hz: 50.19, status: "High" },
    { time: "11:00", hz: 50.21, status: "High" },
    { time: "12:00", hz: 50.23, status: "High" },
    { time: "13:00", hz: 50.18, status: "High" },
    { time: "14:00", hz: 50.13, status: "High" },
    { time: "15:00", hz: 50.09, status: "Normal" },
    { time: "16:00", hz: 50.04, status: "Normal" },
    { time: "17:00", hz: 49.97, status: "Normal" },
    { time: "18:00", hz: 49.91, status: "Normal" },
    { time: "19:00", hz: 49.86, status: "Low" },
    { time: "20:00", hz: 49.79, status: "Critical" },
    { time: "21:00", hz: 49.83, status: "Low" },
    { time: "22:00", hz: 49.89, status: "Normal" },
    { time: "23:00", hz: 49.92, status: "Normal" },
  ];
  // Define 6 static nodes covering Mysuru
  const [nodes, setNodes] = useState([
    { id: 'ND-PALACE', name: 'Palace Central Grid', pos: [12.3051, 76.6551], gen: 4.2, load: 3.8, status: 'Sync', type: 'stable', color: '#BAB86C' },
    { id: 'ND-HOOTA', name: 'Hootagalli Ind.', pos: [12.3250, 76.5950], gen: 1.2, load: 8.5, status: 'Spike', type: 'danger', color: '#EF4444' },
    { id: 'ND-HEBBAL', name: 'Hebbal Substation', pos: [12.3550, 76.6350], gen: 6.8, load: 4.1, status: 'Sync', type: 'stable', color: '#BAB86C' },
    { id: 'ND-CHAMU', name: 'Chamundi Hills', pos: [12.2750, 76.6710], gen: 2.5, load: 1.2, status: 'Sync', type: 'stable', color: '#BAB86C' },
    { id: 'ND-SIDDA', name: 'Siddhartha Layout', pos: [12.3080, 76.6850], gen: 3.1, load: 2.9, status: 'Sync', type: 'stable', color: '#BAB86C' },
    { id: 'ND-KRS', name: 'KRS Road Sector', pos: [12.3450, 76.6150], gen: 5.5, load: 2.2, status: 'Sync', type: 'stable', color: '#EAB308' },
    { id: 'ND-JAYA', name: 'Jayalakshmipuram Zone', pos: [12.3210, 76.6340], gen: 1.8, load: 7.2, status: 'Warning', type: 'warning', color: '#BAB86C' },
  ]);

  const [stream, setStream] = useState([]);

  useEffect(() => {
    // Initial stream state
    setStream(nodes.map(n => ({ ...n, time: 'Init' })));

    const interval = setInterval(() => {
      setNodes(prevNodes => {
        const updated = prevNodes.map(n => {
          // Subtle fluctuation for all nodes
          const loadChange = (Math.random() - 0.5) * 0.4;
          const newLoad = Math.max(0.2, n.load + loadChange);
          const isSpike = newLoad > 7.5;
          
          return {
            ...n,
            load: parseFloat(newLoad.toFixed(1)),
            status: isSpike ? 'Spike' : (newLoad > 5.5 ? 'Warning' : 'Sync'),
            type: isSpike ? 'danger' : (newLoad > 5.5 ? 'warning' : 'stable'),
            color: isSpike ? '#EF4444' : (newLoad > 5.5 ? '#EAB308' : '#BAB86C')
          };
        });

        // Push top changes to stream
        setStream(prevStream => {
          const sorted = [...updated].sort((a, b) => b.load - a.load);
          const top3 = sorted.slice(0, 3).map(s => ({ ...s, time: 'Live' }));
          const combined = [...top3, ...prevStream];
          // Unique by ID, keep latest
          const unique = [];
          const seen = new Set();
          for (const item of combined) {
            if (!seen.has(item.id)) {
              unique.push(item);
              seen.add(item.id);
            }
          }
          return unique.slice(0, 10);
        });

        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="admin-tab-container fade-slide-up">
      <div className="tab-header mb-xl flex flex-col items-center text-center">
        <div className="flex items-center gap-md mb-xs">
          <Activity className="text-gold" size={32} />
          <h1 className="m-0 text-3xl font-black tracking-tighter uppercase">Live Grid Monitoring</h1>
          <div className="header-chip-pinned admin-hz-pill py-1 px-3 bg-black/40 border border-white/10 rounded-full ml-sm">
             <span className="font-extrabold text-sm text-gold">50.01</span>
             <span className="text-[10px] text-muted ml-1 font-black uppercase">Hz (Optimal)</span>
          </div>
        </div>
        <p className="text-muted text-[10px] uppercase tracking-widest font-black">High-precision node tracking across Mysuru Metropolitan Area</p>
      </div>

      <div className="grid-2 gap-xl" style={{ gridTemplateColumns: '1.6fr 1.0fr' }}>
        
        {/* Left Column: Map + Frequency */}
        <div className="flex flex-col gap-xl">
          {/* Map Area */}
          <div className="surface-card p-0 flex flex-col relative overflow-hidden" style={{ minHeight: '550px' }}>
            <div className="p-xl pb-md border-b border-white/10 flex justify-between items-center z-10 bg-black/40">
              <h3 className="m-0 flex items-center gap-sm font-black text-xs uppercase tracking-widest"><Map size={20} className="text-gold" /> Geographical Node Distribution</h3>
              <div className="flex gap-sm text-[10px] font-black uppercase">
                  <span className="flex items-center gap-xs"><span className="w-2 h-2 rounded-full bg-red"></span> Critical</span>
                  <span className="flex items-center gap-xs ml-md"><span className="w-2 h-2 rounded-full bg-gold"></span> Optimal</span>
              </div>
            </div>
            
            <div className="map-container relative flex-1" style={{ height: '400px', zIndex: 1 }}>
              <MapContainer 
                center={mapState.center} 
                zoom={mapState.zoom} 
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; CARTO'
                />
                <MapController center={mapState.center} zoom={mapState.zoom} />
                {nodes.map((node, i) => (
                  <CircleMarker 
                    key={i}
                    center={node.pos}
                    radius={node.type === 'danger' ? 22 : 12}
                    pathOptions={{ 
                      color: node.color, 
                      fillColor: node.color, 
                      fillOpacity: 0.6,
                      weight: 2
                    }}
                    className={node.type === 'danger' ? 'admin-pulse' : ''}
                  >
                    <LeafletTooltip permanent direction="top" offset={[0, -10]} opacity={0.9} className="tactical-tooltip-small">
                        <span className="font-black text-[9px] uppercase">{node.id}</span>
                    </LeafletTooltip>
                  </CircleMarker>
                ))}
              </MapContainer>

              <div className="absolute top-4 left-4 z-20 flex flex-col gap-sm">
                  <div className="bg-black/80 backdrop-blur-3xl px-md py-xs rounded border border-gold/30 text-[9px] font-black uppercase tracking-widest text-gold shadow-glow-gold">96.2% STABILITY</div>
                  <div className="bg-black/80 backdrop-blur-3xl px-md py-xs rounded border border-red/30 text-[9px] font-black uppercase tracking-widest text-red">1 NODE STRESSED</div>
              </div>
            </div>
          </div>

          {/* Frequency Monitoring Area */}
          <div className="surface-card p-xl">
            <div className="flex justify-between items-center mb-xl px-lg">
              <div>
                <h3 className="m-0 flex items-center gap-sm font-black text-xs uppercase tracking-widest">
                  <TrendingUp size={20} className="text-gold" /> Grid Frequency Stability
                </h3>
                <p className="m-0 text-[10px] text-muted mt-xs font-black uppercase tracking-widest">Pulse mapping (Target: 50.00Hz)</p>
              </div>
              <div className="flex items-center gap-md">
                <div className="flex items-center gap-xs">
                   <div className="dot bg-gold animate-pulse"></div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-gold">Live Scanning</span>
                </div>
              </div>
            </div>

            <div style={{ height: '220px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={frequencyData.slice(-24)}>
                  <defs>
                    <linearGradient id="colorHz" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#BAB86C" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#BAB86C" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" hide />
                  <YAxis 
                    domain={[49.5, 50.5]} 
                    tickCount={5} 
                    fontSize={10} 
                    stroke="#8c9baf" 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#050505', 
                      border: '1px solid rgba(186,184,108,0.3)', 
                      borderRadius: '8px',
                      fontSize: '10px',
                      color: '#fff'
                    }} 
                  />
                  <ReferenceLine y={50.00} stroke="#EF4444" strokeDasharray="3 3" label={{ position: 'right', value: '50Hz', fill: '#EF4444', fontSize: 10, fontWeight: '900' }} />
                  
                  <Area 
                    type="monotone" 
                    dataKey="hz" 
                    stroke="#BAB86C" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorHz)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Real-Time Node Stream */}
        <div className="flex-col gap-lg overflow-hidden">
          <div className="surface-card flex-1 p-0 flex flex-col overflow-hidden" style={{ minHeight: '800px' }}>
            <div className="p-xl border-b border-white/10 bg-black/40 flex justify-between items-center">
              <div>
                <h3 className="m-0 flex items-center gap-sm font-black text-xs uppercase tracking-widest"><Server size={20} className="text-gold" /> Real-Time Node Stream</h3>
                <p className="m-0 text-[10px] text-muted mt-xs font-black uppercase tracking-widest">Active load fluctuations</p>
              </div>
            </div>
            
            <div className="streaming-list p-md flex flex-col gap-sm overflow-y-auto h-full">
              {stream.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleNodeClick(item)}
                  className={`stream-row p-xl rounded-2xl border-l-4 transition-all cursor-pointer hover:translate-x-1 bg-black/40 border border-white/5 ${item.type === 'danger' ? 'border-l-red' : 'border-l-gold'}`} 
                  style={{ marginBottom: '12px' }}
                >
                  <div className="flex justify-between items-center mb-md">
                    <div className="flex flex-col gap-1">
                      <span className="font-black text-sm text-gold tracking-widest">{item.id}</span>
                      <span className="text-[10px] text-muted uppercase font-black tracking-widest">{item.name}</span>
                    </div>
                    <span className="text-[9px] text-muted flex items-center gap-xs font-black uppercase tracking-widest"><Clock size={10} />{item.time}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <div className="flex flex-col gap-1">
                       <span className="text-muted">Generation</span>
                       <span className="text-white">{(item.gen + (Math.random()*0.4 - 0.2)).toFixed(1)} kW</span>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                       <span className="text-muted">Load</span>
                       <span className={item.type === 'danger' ? 'text-red' : 'text-white'}>{(item.load + (Math.random()*0.5 - 0.25)).toFixed(1)} kW</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLiveMonitoring;
