import React from 'react';
import { Map, Activity, Clock, Server } from 'lucide-react';
import './Admin.css';

const AdminLiveMonitoring = () => {
  return (
    <div className="admin-tab-container fade-slide-up">
      <div className="tab-header mb-xl">
        <div>
          <h1>Live Monitoring</h1>
          <p className="text-muted">Real-time geographical tracking and frequency distribution</p>
        </div>
        <div className="flex gap-md">
          <div className="system-hz-badge">
            <span className="font-bold text-xl">50.02</span>
            <span className="text-xs text-muted ml-sm">Hz (Optimal)</span>
          </div>
        </div>
      </div>

      <div className="grid-2 gap-xl" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
        
        {/* Heatmap Area */}
        <div className="surface-card p-0 flex flex-col relative overflow-hidden" style={{ minHeight: '500px' }}>
          <div className="p-xl pb-md border-b flex justify-between items-center z-10 bg-surface">
             <h3 className="m-0 flex items-center gap-sm"><Map size={20} className="text-blue" /> Grid Heatmap Map</h3>
             <div className="flex gap-sm text-xs">
                <span className="flex items-center gap-xs"><span className="dot bg-red"></span> High Demand</span>
                <span className="flex items-center gap-xs ml-md"><span className="dot bg-green"></span> Stable Flow</span>
             </div>
          </div>
          
          <div className="map-container relative flex-1 bg-darker">
             {/* Mock Map / Heatmap rendering */}
             <div className="wireframe-map absolute inset-0 opacity-20" style={{
               backgroundImage: 'radial-gradient(var(--accent-blue) 1px, transparent 1px)',
               backgroundSize: '20px 20px'
             }}></div>
             
             {/* Node Zones */}
             <div className="node-zone absolute hover-scale pulse-slow" style={{ top: '30%', left: '40%', width: '120px', height: '120px', background: 'radial-gradient(circle, rgba(239,68,68,0.4) 0%, transparent 70%)' }}>
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 dot bg-red shadow-glow-red"></span>
             </div>

             <div className="node-zone absolute hover-scale" style={{ top: '60%', left: '70%', width: '180px', height: '180px', background: 'radial-gradient(circle, rgba(0,208,132,0.2) 0%, transparent 70%)' }}>
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 dot bg-green shadow-glow-green"></span>
             </div>
             
             <div className="node-zone absolute hover-scale" style={{ top: '20%', left: '80%', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(0,208,132,0.1) 0%, transparent 70%)' }}>
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 dot bg-green"></span>
             </div>

             {/* UI Overlay on Map */}
             <div className="absolute bottom-4 left-4 surface-card p-md shadow-lg" style={{ opacity: 0.9 }}>
                <p className="m-0 text-sm font-bold flex items-center gap-xs"><Activity size={14} className="text-red" /> Sector B Criticality</p>
                <span className="text-xs text-muted block mt-xs">Auto-routing surplus from Sector C...</span>
             </div>
          </div>
        </div>

        {/* Live Data Feed */}
        <div className="flex-col gap-lg">
          <div className="surface-card flex-1 p-0 flex flex-col overflow-hidden">
            <div className="p-lg border-b">
              <h3 className="m-0 flex items-center gap-sm"><Server size={20} className="text-green" /> Node Stream</h3>
            </div>
            
            <div className="streaming-list p-md flex-col gap-sm overflow-y-auto" style={{ maxHeight: '400px' }}>
              
              <div className="stream-row bg-subtle p-md rounded-md border-l-green">
                <div className="flex justify-between items-center mb-xs">
                  <span className="font-code text-sm">ND-8192-A</span>
                  <span className="text-xs text-muted"><Clock size={10} className="inline mr-xs" />1ms ago</span>
                </div>
                <div className="grid-3 text-xs">
                  <div>Gen: <span className="text-yellow">2.4kW</span></div>
                  <div>Load: <span>1.8kW</span></div>
                  <div>Status: <span className="text-green">Sync</span></div>
                </div>
              </div>

              <div className="stream-row bg-subtle p-md rounded-md border-l-red bg-danger-subtle opacity-90">
                <div className="flex justify-between items-center mb-xs">
                  <span className="font-code text-sm">ND-4101-B</span>
                  <span className="text-xs text-muted"><Clock size={10} className="inline mr-xs" />12ms ago</span>
                </div>
                <div className="grid-3 text-xs">
                  <div>Gen: <span className="text-yellow opacity-50">0.2kW</span></div>
                  <div>Load: <span className="text-red">6.8kW</span></div>
                  <div>Status: <span className="text-red">Spike</span></div>
                </div>
              </div>

              <div className="stream-row bg-subtle p-md rounded-md border-l-green">
                <div className="flex justify-between items-center mb-xs">
                  <span className="font-code text-sm">ND-8195-A</span>
                  <span className="text-xs text-muted"><Clock size={10} className="inline mr-xs" />14ms ago</span>
                </div>
                <div className="grid-3 text-xs">
                  <div>Gen: <span className="text-yellow">3.8kW</span></div>
                  <div>Load: <span>1.1kW</span></div>
                  <div>Status: <span className="text-green">Sync</span></div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLiveMonitoring;
