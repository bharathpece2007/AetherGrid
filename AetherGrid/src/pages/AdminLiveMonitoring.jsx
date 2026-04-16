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

  // Define static nodes covering Mysuru
  const [nodes, setNodes] = useState([
    { id: 'ND-PALACE', name: 'Palace Central Grid', pos: [12.3051, 76.6551], gen: 4.0, load: 4.4, status: 'Sync', type: 'stable', color: '#22c55e' },
    { id: 'ND-HOOTA', name: 'Hootagalli Ind.', pos: [12.3250, 76.5950], gen: 1.5, load: 8.8, status: 'Spike', type: 'danger', color: '#ef4444' },
    { id: 'ND-HEBBAL', name: 'Hebbal Substation', pos: [12.3550, 76.6350], gen: 6.9, load: 4.0, status: 'Sync', type: 'stable', color: '#22c55e' },
    { id: 'ND-CHAMU', name: 'Chamundi Hills', pos: [12.2750, 76.6710], gen: 2.4, load: 1.4, status: 'Sync', type: 'stable', color: '#22c55e' },
    { id: 'ND-SIDDA', name: 'Siddhartha Layout', pos: [12.3080, 76.6850], gen: 3.1, load: 2.7, status: 'Sync', type: 'stable', color: '#22c55e' },
    { id: 'ND-KRS', name: 'KRS Road Sector', pos: [12.3450, 76.6150], gen: 5.4, load: 2.2, status: 'Sync', type: 'stable', color: '#22c55e' },
    { id: 'ND-JAYA', name: 'Jayalakshmipuram Zone', pos: [12.3210, 76.6340], gen: 1.8, load: 7.4, status: 'Spike', type: 'danger', color: '#ef4444' },
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
          const isSpike = newLoad > 7.0;
          
          return {
            ...n,
            load: parseFloat(newLoad.toFixed(1)),
            status: isSpike ? 'Spike' : 'Sync',
            type: isSpike ? 'danger' : 'stable',
            color: isSpike ? '#ef4444' : '#22c55e'
          };
        });

        // Update stream
        setStream(prevStream => {
          const sorted = [...updated].sort((a, b) => b.load - a.load);
          const active = sorted.slice(0, 10).map(s => ({ ...s, time: 'Live' }));
          return active;
        });

        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="admin-tab-container fade-slide-up">
      <div className="tab-header mb-xl flex flex-col items-center text-center">
        <div className="flex items-center gap-md mb-xs">
          <Activity className="text-white" size={32} />
          <h1 className="m-0 text-5xl font-black tracking-tighter uppercase">Live Grid Monitoring</h1>
          <div className="header-chip-pinned admin-hz-pill py-1 px-4 bg-black/60 border border-white/20 rounded-lg ml-md flex items-center gap-2">
             <span className="font-black text-xl text-white">50.01</span>
             <span className="text-[10px] text-muted-main font-black uppercase tracking-widest opacity-70">Hz (Optimal)</span>
          </div>
        </div>
        <p className="text-muted-main text-[12px] uppercase tracking-[0.3em] font-black opacity-60">High-precision node tracking across Mysuru Metropolitan Area</p>
      </div>

      <div className="grid-2 gap-xl" style={{ gridTemplateColumns: '1.6fr 1.0fr' }}>
        
        {/* Left Column: Map + Frequency */}
        <div className="flex flex-col gap-xl">
          {/* Map Area */}
          <div className="surface-card p-0 flex flex-col relative overflow-hidden" style={{ minHeight: '600px' }}>
            <div className="p-xl pb-md border-b border-white/10 flex justify-between items-center z-10 bg-black/40">
              <h3 className="m-0 flex items-center gap-sm font-black text-sm uppercase tracking-widest"><Map size={20} className="text-white" /> Geographical Node Distribution</h3>
              <div className="flex gap-lg text-[10px] font-black uppercase tracking-widest">
                  <span className="flex items-center gap-xs"><span className="w-2 h-2 rounded-full bg-red-500"></span> Critical</span>
                  <span className="flex items-center gap-xs"><span className="w-2 h-2 rounded-full bg-green-500"></span> Optimal</span>
              </div>
            </div>
            
            <div className="map-container relative flex-1" style={{ height: '450px', zIndex: 1 }}>
              <MapContainer 
                center={mapState.center} 
                zoom={mapState.zoom} 
                scrollWheelZoom={false}
                zoomControl={true}
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
                    radius={node.type === 'danger' ? 24 : 14}
                    pathOptions={{ 
                      color: node.color, 
                      fillColor: node.color, 
                      fillOpacity: 0.5,
                      weight: 2
                    }}
                    className={node.type === 'danger' ? 'admin-pulse' : ''}
                  >
                    <LeafletTooltip permanent direction="top" offset={[0, -15]} opacity={1} className="tactical-tooltip-node">
                        <span className="font-black text-[10px] uppercase tracking-tighter">{node.name}</span>
                    </LeafletTooltip>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>
          </div>

          {/* Grid Frequency Stability Monitor */}
          <div className="surface-card p-xl">
            <div className="flex justify-between items-center mb-xl">
              <div>
                <h3 className="m-0 flex items-center gap-sm font-black text-sm uppercase tracking-widest">
                  <TrendingUp size={20} className="text-white" /> Grid Frequency Stability Monitor
                </h3>
                <p className="m-0 text-[10px] text-muted-main mt-xs font-black uppercase tracking-widest opacity-60">Real-time Hz pulse mapping (Target: 50.00Hz)</p>
              </div>
              <div className="flex items-center gap-md">
                <div className="flex items-center gap-xs">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Live Scanning</span>
                </div>
              </div>
            </div>

            <div style={{ height: '220px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={frequencyData.slice(-24)}>
                  <defs>
                    <linearGradient id="colorHz" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
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
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '8px',
                      fontSize: '10px',
                      color: '#fff'
                    }} 
                  />
                  <ReferenceLine y={50.00} stroke="#EF4444" strokeDasharray="3 3" label={{ position: 'right', value: '50Hz', fill: '#EF4444', fontSize: 10, fontWeight: '900' }} />
                  
                  <Area 
                    type="monotone" 
                    dataKey="hz" 
                    stroke="#22c55e" 
                    strokeWidth={3} 
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
        <div className="flex flex-col gap-lg overflow-hidden h-full">
          <div className="surface-card flex-1 p-0 flex flex-col overflow-hidden" style={{ minHeight: '850px' }}>
            <div className="p-xl border-b border-white/10 bg-black/40 flex justify-between items-center">
              <div>
                <h3 className="m-0 flex items-center gap-sm font-black text-sm uppercase tracking-widest"><Server size={20} className="text-white" /> Real-Time Node Stream</h3>
                <p className="m-0 text-[10px] text-muted-main mt-xs font-black uppercase tracking-widest opacity-60">Active load fluctuations for tracked VPP clusters</p>
              </div>
            </div>
            
            <div className="streaming-list p-md flex flex-col gap-sm overflow-y-auto h-full scrollbar-hide">
              {stream.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleNodeClick(item)}
                  className={`stream-row p-xl rounded-xl transition-all cursor-pointer bg-black/20 border border-white/5 hover:border-white/10 relative group`} 
                  style={{ marginBottom: '8px' }}
                >
                   {/* Live indicator */}
                   <div className="absolute top-4 right-4 flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.type === 'danger' ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                      <span className="text-[9px] font-black uppercase tracking-tighter text-muted-main">{item.time}</span>
                   </div>

                  <div className="flex flex-col gap-0.5 mb-md">
                    <span className="font-black text-sm text-white tracking-widest">{item.id}</span>
                    <span className="text-[11px] text-muted-main uppercase font-black tracking-widest">{item.name}</span>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-baseline gap-1.5">
                       <span className="text-[9px] text-muted-main uppercase font-black opacity-60">Gen:</span>
                       <span className="text-[11px] font-black text-orange-400">{(item.gen).toFixed(1)}kW</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                       <span className="text-[9px] text-muted-main uppercase font-black opacity-60">Load:</span>
                       <span className={`text-[11px] font-black ${item.type === 'danger' ? 'text-red-500' : 'text-white'}`}>{(item.load).toFixed(1)}kW</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                       <span className="text-[9px] text-muted-main uppercase font-black opacity-60">Status:</span>
                       <span className={`text-[11px] font-black uppercase tracking-widest ${item.color === '#ef4444' ? 'text-red-500' : 'text-green-500'}`}>{item.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      
      <style>{`
        .tactical-tooltip-node {
          background: rgba(0,0,0,0.85) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 4px !important;
          padding: 2px 8px !important;
          color: #fff !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5) !important;
        }
        .tactical-tooltip-node:before {
          border-top-color: rgba(255,255,255,0.1) !important;
        }
        .admin-pulse {
          animation: nodePulse 2s infinite ease-in-out;
        }
        @keyframes nodePulse {
          0% { stroke-width: 2; fill-opacity: 0.5; }
          50% { stroke-width: 8; fill-opacity: 0.8; }
          100% { stroke-width: 2; fill-opacity: 0.5; }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default AdminLiveMonitoring;

