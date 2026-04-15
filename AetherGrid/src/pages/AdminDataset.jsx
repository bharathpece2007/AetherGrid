import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMapEvents, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  Database, User, Zap, CreditCard, Sun, 
  MapPin, MousePointer2, Activity, Filter,
  TrendingDown, Search, ArrowLeft
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import 'leaflet/dist/leaflet.css';
import './Admin.css';

// Fix for default marker icons in Leaflet + React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// --- HELPER COMPONENTS ---

const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 1.5 });
  }, [center, zoom, map]);
  return null;
};

const AdminDataset = ({ theme }) => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(13);
  const [mapCenter, setMapCenter] = useState([12.3025, 76.6394]); // Mysuru Center
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [filter, setFilter] = useState('all'); // all, high, medium, low
  const [viewMode, setViewMode] = useState('map'); // map, table

  // Procedural Data Generation (Mysuru Neighborhoods)
  const generateHouses = () => {
    const neighborhoods = [
      { name: 'Jayalakshmipuram', center: [12.3218, 76.6318] },
      { name: 'Hebbal', center: [12.3565, 76.6186] },
      { name: 'Chamundi Hills', center: [12.2741, 76.6669] },
      { name: 'Kuvempunagar', center: [12.2899, 76.6212] }
    ];

    const mockHouses = [];
    neighborhoods.forEach((nb) => {
      for (let i = 0; i < 25; i++) {
        const lat = nb.center[0] + (Math.random() - 0.5) * 0.015;
        const lng = nb.center[1] + (Math.random() - 0.5) * 0.015;
        const consumption = 1 + Math.random() * 8; // kWh
        mockHouses.push({
          id: `${nb.name.substring(0,3).toUpperCase()}-${1000 + i}`,
          name: `${nb.name} Sector Node ${i + 1}`,
          position: [lat, lng],
          consumption: consumption.toFixed(2),
          bill: (consumption * 7.5).toFixed(0),
          energy_generated: (Math.random() * 5.5).toFixed(2),
          neighborhood: nb.name,
          status: consumption > 6.5 ? 'high' : consumption > 3.5 ? 'medium' : 'low'
        });
      }
    });
    return mockHouses;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!supabase) {
          throw new Error('Supabase not initialized');
        }
        const { data, error } = await supabase.from('house_metrics').select('*');
        if (data && data.length > 0) {
          setHouses(data);
        } else {
          setHouses(generateHouses());
        }
      } catch(e) { 
        console.warn('Using simulation data due to database error:', e.message);
        setHouses(generateHouses());
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const MapEvents = () => {
    const map = useMapEvents({
      zoomend: () => setZoomLevel(map.getZoom()),
      click: (e) => {
        setIsScanning(true);
        setMapCenter([e.latlng.lat, e.latlng.lng]);
        setZoomLevel(16);
        setTimeout(() => setIsScanning(false), 800);
      }
    });
    return null;
  };

  const filteredHouses = houses.filter(h => filter === 'all' || h.status === filter);
  
  // Tactical Deployment Logic: AUTO-DEPLOY at zoom 15+
  const isDeployed = zoomLevel >= 15;
  const getTacticalRadius = () => isDeployed ? 16 : 8;

  return (
    <div className="admin-tab-container fade-slide-up h-full flex flex-col gap-md">
      <div className="tab-header flex justify-between items-center px-lg">
        <div className="flex items-center gap-xl">
           <div>
             <h1 className="flex items-center gap-md m-0">
               <Database className="text-gold" /> Grid Intelligence Map
             </h1>
             <p className="text-muted text-xs uppercase font-black tracking-widest mt-xs">
               {viewMode === 'map' ? (isDeployed ? 'Tactical Nodes Deployed' : 'Scanning Regional Hubs...') : 'Global Data Ledger'}
             </p>
           </div>

           {/* View Toggle */}
           <div className="flex bg-white/5 rounded-full p-1 border border-white/10 glass-header ml-xl">
              <button 
                 onClick={() => setViewMode('map')}
                 className={`px-md py-xs rounded-full text-[10px] font-black uppercase transition-all flex items-center gap-xs cursor-pointer ${viewMode === 'map' ? 'bg-gold text-black' : 'text-muted hover:text-white'}`}
              >
                <MapPin size={12} /> Map View
              </button>
              <button 
                 onClick={() => setViewMode('table')}
                 className={`px-md py-xs rounded-full text-[10px] font-black uppercase transition-all flex items-center gap-xs cursor-pointer ${viewMode === 'table' ? 'bg-gold text-black' : 'text-muted hover:text-white'}`}
              >
                <Activity size={12} /> Data Ledger
              </button>
           </div>
        </div>
        
        <div className="flex items-center gap-xl">
           <div className="flex bg-white/5 rounded-full p-1 border border-white/10 glass-header">
              {['all', 'high', 'medium', 'low'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-sm py-xs rounded-full text-[9px] font-black uppercase transition-all min-w-[60px] cursor-pointer ${filter === f ? 'bg-gold text-black shadow-glow-gold' : 'text-muted hover:text-white'}`}
                >
                  {f}
                </button>
              ))}
           </div>
           <div className={`status-badge live admin-pulse`}>
             <span className={`dot pulse bg-gold`}></span>
             <span className="font-bold text-xs uppercase tracking-widest">{filteredHouses.length} Nodes Detected</span>
           </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex gap-xl px-xl pb-xl">
        {viewMode === 'map' ? (
          <>
            {/* LEFT COLUMN: THE MAP (BIGGER) */}
            <div className="flex-[2.5] relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-black">
              <MapContainer 
                center={mapCenter} 
                zoom={zoomLevel} 
                style={{ height: '100%', width: '100%' }}
                doubleClickZoom={false}
                zoomControl={false}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; CARTO'
                />
                
                <MapEvents />
                <MapController center={mapCenter} zoom={zoomLevel} />

                {filteredHouses.map((house) => (
                  <CircleMarker 
                    key={house.id}
                    center={house.position} 
                    radius={getTacticalRadius()} 
                    pathOptions={{ 
                      color: house.status === 'high' ? '#BAB86C' : house.status === 'medium' ? 'rgba(186, 184, 108, 0.7)' : 'rgba(255, 255, 255, 0.4)',
                      fillColor: house.status === 'high' ? '#BAB86C' : house.status === 'medium' ? '#BAB86C' : '#FFFFFF',
                      fillOpacity: house.status === 'low' ? 0.2 : 0.8,
                      weight: isDeployed ? 2 : 1
                    }}
                    eventHandlers={{
                      click: (e) => {
                        L.DomEvent.stopPropagation(e);
                        setSelectedHouse(house);
                        setMapCenter(house.position);
                        setZoomLevel(18);
                      }
                    }}
                  >
                    <Tooltip direction="top" offset={[0, -10]} opacity={1} className="tactical-tooltip">
                       <div className="flex flex-col gap-1 p-xs min-w-[120px]">
                          <div className="flex justify-between items-center border-b border-white/20 pb-1 mb-1">
                            <span className="font-black text-[10px] uppercase text-white">{house.id}</span>
                            <Zap size={10} className="text-gold" />
                          </div>
                          <div className="flex justify-between text-[11px]">
                             <span className="text-white/60 font-bold">USE:</span>
                             <span className="text-white font-black">{house.consumption} kW</span>
                          </div>
                          <div className="flex justify-between text-[11px]">
                             <span className="text-gold/60 font-bold">GEN:</span>
                             <span className="text-gold font-black">{house.energy_generated} kW</span>
                          </div>
                       </div>
                    </Tooltip>
                  </CircleMarker>
                ))}
              </MapContainer>

              <div className="absolute left-md bottom-md z-[1000]">
                 <button 
                    onClick={() => { setSelectedHouse(null); setZoomLevel(13); setMapCenter([12.3025, 76.6394]); }}
                    className="bg-black/95 backdrop-blur-3xl px-lg py-md rounded-2xl border border-white/20 text-white hover:border-gold transition-all flex items-center gap-sm shadow-2xl pointer-events-auto cursor-pointer font-black text-[10px] uppercase tracking-widest"
                 >
                   <ArrowLeft size={16} className="text-gold" /> Reset Regional Hub
                 </button>
              </div>

              {isScanning && (
                <div className="absolute inset-0 bg-gold/5 backdrop-blur-[2px] z-[1001] flex items-center justify-center pointer-events-none">
                  <div className="bg-black/80 border border-gold/50 px-xl py-lg rounded-2xl flex flex-col items-center gap-md">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gold animate-pulse">Scanning Grid Nodes...</span>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: INTELLIGENCE PANEL */}
            <div className="flex-1 min-w-[400px] flex flex-col gap-xl">
               <div className="surface-card p-xl flex flex-col gap-md bg-black/40 border border-white/10 rounded-[2rem] shadow-xl">
                  <h4 className="m-0 text-[10px] font-black uppercase tracking-widest text-muted">Tactical Load Intelligence</h4>
                  <div className="flex justify-between items-center px-xs">
                     <span className="text-xs font-bold text-white/60 uppercase">Sector Avg</span>
                     <span className="text-xl font-black text-gold">3.82 kW</span>
                  </div>
                  <div className="flex justify-between items-center px-xs">
                     <span className="text-xs font-bold text-white/60 uppercase">P2P Revenue</span>
                     <span className="text-xl font-black text-white">₹ 14,280</span>
                  </div>
               </div>

               {selectedHouse ? (
                  <div className="surface-card flex-1 p-2xl flex flex-col radiant-card border border-white/10 shadow-glow-gold rounded-[2rem] overflow-y-auto">
                     <div className="flex justify-between items-start mb-2xl">
                        <div className="flex flex-col gap-1">
                           <span className="text-[10px] font-black tracking-widest text-muted uppercase">Consumer Identity</span>
                           <h2 className="m-0 text-3xl font-black">{selectedHouse.id}</h2>
                           <p className="text-muted m-0 italic text-[10px] uppercase tracking-tighter">{selectedHouse.name}</p>
                        </div>
                        <div className={`px-lg py-sm rounded-xl text-[10px] font-black uppercase border glass-border ${selectedHouse.status}-status-bg`}>
                           {selectedHouse.status} load
                        </div>
                     </div>

                     <div className="bg-black/60 rounded-[2.5rem] p-2xl flex-1 border border-white/5 shadow-inner flex flex-col gap-xl">
                        <div className="flex items-center gap-xl">
                           <div className="p-lg bg-gold/10 rounded-2xl border border-gold/20 shadow-glow-gold">
                              <Activity className="text-gold" size={24} />
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase text-muted">Energy Consumption</span>
                              <span className="text-2xl font-black">{selectedHouse.consumption} <span className="text-sm font-normal opacity-50">kW</span></span>
                           </div>
                        </div>

                        <div className="flex items-center gap-xl">
                           <div className="p-lg bg-white/10 rounded-2xl border border-white/20">
                              <CreditCard className="text-white" size={24} />
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase text-muted">Monthly Bill</span>
                              <span className="text-2xl font-black">₹ {selectedHouse.bill}</span>
                           </div>
                        </div>

                        <div className="flex items-center gap-xl">
                           <div className="p-lg bg-gold/10 rounded-2xl border border-gold/20">
                              <Sun className="text-gold" size={24} />
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase text-muted">Solar Generation</span>
                              <span className="text-2xl font-black">{selectedHouse.energy_generated} <span className="text-sm font-normal opacity-50">kW</span></span>
                           </div>
                        </div>

                        <div className="mt-auto pt-xl border-t border-white/10 flex flex-col gap-md">
                           <div className="flex justify-between items-baseline">
                              <span className="text-[10px] text-muted font-black uppercase tracking-widest">Grid Dependency</span>
                              <span className="text-xl font-black">{(100 - (selectedHouse.energy_generated / selectedHouse.consumption * 100)).toFixed(1)}%</span>
                           </div>
                           <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gold shadow-glow-gold" 
                                style={{ width: `${100 - (selectedHouse.energy_generated / selectedHouse.consumption * 100)}%` }}
                              ></div>
                           </div>
                        </div>
                     </div>

                     <button 
                      onClick={() => setSelectedHouse(null)}
                      className="mt-xl w-full bg-white text-black py-lg rounded-2xl font-black text-[10px] uppercase cursor-pointer hover:bg-gold transition-all shadow-2xl"
                     >
                       Close Details
                     </button>
                  </div>
               ) : (
                  <div className="surface-card flex-1 flex flex-col items-center justify-center p-2xl text-center opacity-50 border-dashed border-2 border-white/10 rounded-[2rem]">
                     <div className="p-xl bg-white/5 rounded-full mb-xl">
                        <MousePointer2 size={32} className="text-muted" />
                     </div>
                     <h3 className="m-0 font-black uppercase tracking-widest text-white text-sm">Select Node</h3>
                     <p className="text-[11px] mt-md px-xl text-muted">Tap on any house marker on the geographical grid to pull up real-time billing and consumption intelligence.</p>
                  </div>
               )}
            </div>
          </>
        ) : (

          /* DATA LEDGER VIEW (TABLE) */
          <div className="flex-1 surface-card overflow-hidden flex flex-col border border-white/10">
             <div className="overflow-y-auto h-full">
                <table className="admin-table w-full text-left" style={{ borderCollapse: 'collapse' }}>
                   <thead className="sticky top-0 bg-black z-10 border-b border-white/10">
                      <tr>
                         <th className="p-xl text-[10px] font-black text-muted uppercase tracking-widest">Node ID</th>
                         <th className="p-xl text-[10px] font-black text-muted uppercase tracking-widest">Sector Name</th>
                         <th className="p-xl text-[10px] font-black text-muted uppercase tracking-widest">Hub Location</th>
                         <th className="p-xl text-[10px] font-black text-muted uppercase tracking-widest">Load Status</th>
                         <th className="p-xl text-[10px] font-black text-muted uppercase tracking-widest">Consumption</th>
                         <th className="p-xl text-[10px] font-black text-muted uppercase tracking-widest">Generation</th>
                         <th className="p-xl text-[10px] font-black text-muted uppercase tracking-widest">Net Revenue</th>
                         <th className="p-xl text-[10px] font-black text-muted uppercase tracking-widest">Action</th>
                      </tr>
                   </thead>
                   <tbody>
                      {filteredHouses.map(house => (
                        <tr key={house.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                           <td className="p-xl font-black text-gold">{house.id}</td>
                           <td className="p-xl font-bold">{house.name}</td>
                           <td className="p-xl text-xs uppercase text-muted">{house.neighborhood}</td>
                           <td className="p-xl">
                              <span className={`px-sm py-xs rounded text-[9px] font-black uppercase ${house.status === 'high' ? 'bg-red/20 text-red border border-red/30' : house.status === 'medium' ? 'bg-gold/20 text-gold border border-gold/30' : 'bg-white/10 text-muted border border-white/20'}`}>
                                 {house.status} load
                              </span>
                           </td>
                           <td className="p-xl font-bold">{house.consumption} kW</td>
                           <td className="p-xl text-gold font-bold">{house.energy_generated} kW</td>
                           <td className="p-xl">₹ {house.bill}</td>
                           <td className="p-xl">
                              <button 
                                 className="px-sm py-xs bg-white/5 border border-white/10 rounded text-[10px] font-black uppercase hover:border-gold transition-all cursor-pointer"
                                 onClick={() => { setSelectedHouse(house); setViewMode('map'); setMapCenter(house.position); setZoomLevel(18); }}
                              >
                                 Investigate
                              </button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}
      </div>

      <style>{`
        .premium-popup .leaflet-popup-content-wrapper,
        .tactical-tooltip {
          background: #050505 !important;
          color: white !important;
          border-radius: 12px !important;
          border: 1px solid rgba(186, 184, 108, 0.3) !important;
          backdrop-filter: blur(15px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.8) !important;
        }
        .tactical-tooltip {
          padding: 12px !important;
          border-left: 4px solid var(--primary) !important;
        }
        .premium-popup .leaflet-popup-tip {
          background: #050505 !important;
        }
        .high-status-bg { background-color: rgba(186, 184, 108, 0.2); color: #BAB86C; border-color: rgba(186, 184, 108, 0.5); }
        .medium-status-bg { background-color: rgba(186, 184, 108, 0.1); color: #BAB86C; border-color: rgba(186, 184, 108, 0.3); }
        .low-status-bg { background-color: rgba(255, 255, 255, 0.05); color: #8c9baf; border-color: rgba(255, 255, 255, 0.1); }
        .radiant-card {
           background: linear-gradient(135deg, rgba(186,184,108,0.05) 0%, transparent 100%) !important;
        }
        .bg-gold { background-color: #BAB86C !important; }
        .shadow-glow-gold { box-shadow: 0 0 15px rgba(186, 184, 108, 0.4); }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default AdminDataset;
