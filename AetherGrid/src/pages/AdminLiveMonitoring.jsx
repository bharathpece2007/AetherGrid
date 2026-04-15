import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip as LeafletTooltip } from 'react-leaflet';
import { Map, Activity, Clock, Server, TrendingUp, BarChart2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import './Admin.css';

const AdminLiveMonitoring = ({ theme }) => {
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
    { id: 'ND-PALACE', name: 'Palace Central Grid', pos: [12.3051, 76.6551], gen: 4.2, load: 3.8, status: 'Sync', type: 'stable', color: '#00D084' },
    { id: 'ND-HOOTA', name: 'Hootagalli Ind.', pos: [12.3250, 76.5950], gen: 1.2, load: 8.5, status: 'Spike', type: 'danger', color: '#EF4444' },
    { id: 'ND-HEBBAL', name: 'Hebbal Substation', pos: [12.3550, 76.6350], gen: 6.8, load: 4.1, status: 'Sync', type: 'stable', color: '#00D084' },
    { id: 'ND-CHAMU', name: 'Chamundi Hills', pos: [12.2750, 76.6710], gen: 2.5, load: 1.2, status: 'Sync', type: 'stable', color: '#00D084' },
    { id: 'ND-SIDDA', name: 'Siddhartha Layout', pos: [12.3080, 76.6850], gen: 3.1, load: 2.9, status: 'Sync', type: 'stable', color: '#0ea5e9' },
    { id: 'ND-KRS', name: 'KRS Road Sector', pos: [12.3450, 76.6150], gen: 5.5, load: 2.2, status: 'Sync', type: 'stable', color: '#EAB308' },
  ]);

  const [stream, setStream] = useState([]);

  useEffect(() => {
    // Initial stream state
    setStream(nodes.map(n => ({ ...n, time: 'Init' })));

    const interval = setInterval(() => {
      // Pick a random node to "fluctuate"
      const targetIdx = Math.floor(Math.random() * nodes.length);
      
      setNodes(prevNodes => {
        const updated = [...prevNodes];
        const n = updated[targetIdx];
        
        // Fluctuate data
        const loadChange = (Math.random() - 0.5) * 1.5;
        const newLoad = Math.max(0.1, n.load + loadChange);
        const isSpike = newLoad > 7.0;
        
        updated[targetIdx] = {
          ...n,
          load: parseFloat(newLoad.toFixed(1)),
          status: isSpike ? 'Critical' : 'Sync',
          type: isSpike ? 'danger' : (newLoad > 5.0 ? 'warning' : 'stable'),
          color: isSpike ? '#EF4444' : (newLoad > 5.0 ? '#EAB308' : '#00D084')
        };

        // Add to stream
        setStream(prevStream => {
          const entry = { ...updated[targetIdx], time: 'Just now' };
          return [entry, ...prevStream.filter(s => s.id !== entry.id)].slice(0, 12);
        });

        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="admin-tab-container fade-slide-up">
      <div className="tab-header mb-xl">
        <div>
          <h1 className="flex items-center gap-md"><Activity className="text-blue" /> Live Grid Monitoring</h1>
          <p className="text-muted">High-precision node tracking across Mysuru Metropolitan Area</p>
        </div>
        <div className="flex gap-md">
          <div className="system-hz-badge">
            <span className="font-bold text-xl">50.01</span>
            <span className="text-xs text-muted ml-sm">Hz (Optimal)</span>
          </div>
        </div>
      </div>

      <div className="grid-2 gap-xl" style={{ gridTemplateColumns: theme === 'dark' ? '1.6fr 1.0fr' : '1.4fr 1.2fr' }}>
        
        {/* Left Column: Map + Frequency */}
        <div className="flex flex-col gap-xl">
          {/* Map Area */}
          <div className="surface-card p-0 flex flex-col relative overflow-hidden" style={{ minHeight: '550px' }}>
            <div className="p-xl pb-md border-b flex justify-between items-center z-10 bg-surface">
              <h3 className="m-0 flex items-center gap-sm"><Map size={20} className="text-blue" /> Geographical Node Distribution</h3>
              <div className="flex gap-sm text-xs">
                  <span className="flex items-center gap-xs"><span className="dot bg-red"></span> Critical</span>
                  <span className="flex items-center gap-xs ml-md"><span className="dot bg-green"></span> Optimal</span>
              </div>
            </div>
            
            <div className="map-container relative flex-1" style={{ height: '400px', zIndex: 1 }}>
              <MapContainer 
                center={[12.3080, 76.6450]} 
                zoom={13} 
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%', filter: theme === 'dark' ? 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)' : 'none' }}
              >
                <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
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
                    <LeafletTooltip permanent direction="top" offset={[0, -10]} opacity={0.9}>
                        <span style={{ fontWeight: 700, fontSize: '11px', fontFamily: 'var(--font-body)' }}>{node.name}</span>
                    </LeafletTooltip>
                    <Popup>
                      <div style={{ color: '#000' }}>
                        <strong>{node.id}</strong><br/>
                        {node.name}<br/>
                        Load: {node.load} kW
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>

              <div className="absolute top-2 left-4 z-20 flex flex-col gap-sm">
                  <div className="surface-card p-sm shadow-lg text-xs font-bold bg-opacity-90" style={{ borderLeft: '4px solid #00D084' }}>96.2% STABILITY</div>
                  <div className="surface-card p-sm shadow-lg text-xs font-bold bg-opacity-90" style={{ borderLeft: '4px solid #EF4444' }}>1 NODE STRESSED</div>
              </div>
            </div>
          </div>

          {/* Frequency Monitoring Area */}
          <div className="surface-card p-xl">
            <div className="flex justify-between items-center mb-xl">
              <div>
                <h3 className="m-0 flex items-center gap-sm">
                  <TrendingUp size={20} className="text-blue" /> Grid Frequency Stability Monitor
                </h3>
                <p className="m-0 text-xs text-muted mt-xs">Real-time Hz pulse mapping (Target: 50.00Hz)</p>
              </div>
              <div className="flex items-center gap-md">
                <div className="flex items-center gap-xs">
                   <div className="dot bg-blue animate-pulse"></div>
                   <span className="text-xs font-bold uppercase">Live Scanning</span>
                </div>
              </div>
            </div>

            <div style={{ height: '220px', width: '100%', marginLeft: '-20px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={frequencyData.slice(-24)}>
                  <defs>
                    <linearGradient id="colorHz" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#B5C99A" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#B5C99A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#1e293b' : '#e2e8f0'} />
                  <XAxis dataKey="time" hide />
                  <YAxis 
                    domain={[0, 60]} 
                    tickCount={6} 
                    fontSize={11} 
                    stroke={theme === 'dark' ? '#8c9baf' : '#64748b'} 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: theme === 'dark' ? '#000' : '#fff', 
                      border: '1px solid var(--primary)', 
                      borderRadius: '8px',
                      fontSize: '12px'
                    }} 
                    itemStyle={{ color: 'var(--primary)', fontWeight: 'bold' }}
                  />
                  <ReferenceLine y={50.00} stroke="#EF4444" strokeDasharray="3 3" label={{ position: 'right', value: '50Hz TARGET', fill: '#EF4444', fontSize: 12, fontWeight: 'bold' }} />
                  
                  <ReferenceLine x="20:00" stroke="transparent" label={{ position: 'top', value: 'BLACKOUT', fill: '#EF4444', fontSize: 10, fontWeight: 'bold' }} />
                  
                  <Area 
                    type="monotone" 
                    dataKey="hz" 
                    stroke="#B5C99A" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorHz)" 
                    animationDuration={2000}
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      if (payload.hz === 0) {
                        return (
                          <circle cx={cx} cy={cy} r={6} fill="#EF4444" stroke="white" strokeWidth={2} className="admin-pulse" />
                        );
                      }
                      return null;
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid-4 gap-md mt-lg">
               {['0.00Hz (BLACKOUT)', '50.23Hz (Max)', 'Status: CRITICAL FAILURE', 'Variance: -100%'].map((txt, i) => (
                 <div key={i} className={`text-[10px] font-bold uppercase tracking-wider p-xs bg-darker rounded border border-white/5 text-center ${txt.includes('BLACKOUT') || txt.includes('FAILURE') ? 'text-red' : 'text-muted'}`}>
                    {txt}
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Right Column: Emergency Alert Stream */}
        <div className="flex-col gap-lg overflow-hidden">
          <div className="surface-card flex-1 p-0 flex flex-col overflow-hidden border-danger" style={{ minHeight: '800px', background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.05) 0%, rgba(0,0,0,0) 100%)' }}>
            <div className="p-lg border-b-danger bg-surface flex justify-between items-center">
              <div>
                <h3 className="m-0 flex items-center gap-sm text-red"><ShieldAlert size={20} /> Emergency Grid Alerts</h3>
                <p className="m-0 text-xs text-muted mt-xs">Critical thermal and load triggers detected</p>
              </div>
              <div className="status-badge bg-red text-white border-none animate-pulse">ACTIVE ALARM</div>
            </div>
            
            <div className="streaming-list p-md flex-col gap-sm overflow-y-auto" style={{ maxHeight: '720px' }}>
              
              {/* Critical Trigger box from screenshot */}
              <div className="p-xl rounded-md bg-darker border border-danger mb-md relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-red"></div>
                 <h4 className="m-0 text-red flex items-center gap-sm uppercase tracking-widest text-sm mb-sm">
                    <AlertOctagon size={16} /> Critical Trigger
                 </h4>
                 <p className="m-0 text-sm line-height-relaxed text-gray-200">
                    Delta Substation (Sector 4) approaching 96% thermal limit. Auto-throttling localized DER HVAC reserves mapped to node ID range #4000-#4200.
                 </p>
              </div>

              {stream.map((item, idx) => (
                <div key={idx} className={`stream-row p-md rounded-md border-l-4 transition-all ${item.type === 'danger' ? 'border-l-red bg-danger-subtle' : 'border-l-yellow bg-surface-gray'}`} style={{ marginBottom: '8px', animation: 'fadeInLeft 0.3s ease-out' }}>
                  <div className="flex justify-between items-center mb-xs">
                    <div className="flex flex-col">
                      <span className="font-code text-sm font-bold">{item.id}</span>
                      <span className="text-[10px] text-muted uppercase font-bold">{item.name}</span>
                    </div>
                    <span className="text-xs text-muted flex items-center gap-xs"><Clock size={10} />{item.time}</span>
                  </div>
                  <div className="grid-3 text-xs gap-sm mt-sm">
                    <div>Gen: <span className="text-yellow">{item.gen.toFixed(1)}kW</span></div>
                    <div>Load: <span className="text-red font-bold">{item.load.toFixed(1)}kW</span></div>
                    <div>Status: <span className="text-red font-bold">EMERGENCY</span></div>
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
