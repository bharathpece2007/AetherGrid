import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, 
  LineChart, Line, ComposedChart, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  Cell
} from 'recharts';
import { 
  Zap, Activity, Battery, Sun, Wind, 
  ShieldCheck, Leaf, Cpu, BarChart3, LayoutDashboard
} from 'lucide-react';
import './Admin.css';

// ----------------------------------------------------------------------
// OFFICIAL DATASET MAPPING (Directly from Power_Consumption_and_Generation_Dataset.csv)
// ----------------------------------------------------------------------
const rawData = [
  { time: '00:00', usage: 218.5, demand: 192.5, factor: 55.7, voltage: 236.9, current: 61.4, reactive: 64.8, energy: 134.9, gen: 78.6, renew: 57.7, battery: 46.1, frequency: 49.5, carbon: 474.2 },
  { time: '01:00', usage: 477.8, demand: 370.9, factor: 54.8, voltage: 241.8, current: 82.4, reactive: 17.2, energy: 268.0, gen: 149.4, renew: 51.5, battery: 25.6, frequency: 50.3, carbon: 256.7 },
  { time: '02:00', usage: 379.3, demand: 536.4, factor: 94.3, voltage: 220.0, current: 78.4, reactive: 87.2, energy: 848.1, gen: 280.5, renew: 68.5, battery: 72.7, frequency: 50.2, carbon: 261.1 },
  { time: '03:00', usage: 319.3, demand: 466.1, factor: 54.9, voltage: 234.9, current: 23.8, reactive: 61.3, energy: 790.0, gen: 295.6, renew: 64.9, battery: 7.3, frequency: 50.4, carbon: 360.3 },
  { time: '04:00', usage: 120.2, demand: 503.2, factor: 56.3, voltage: 232.8, current: 23.4, reactive: 15.7, energy: 415.5, gen: 65.4, renew: 42.4, battery: 22.2, frequency: 49.8, carbon: 310.7 },
  { time: '05:00', usage: 120.1, demand: 429.3, factor: 85.5, voltage: 243.3, current: 34.1, reactive: 96.2, energy: 439.1, gen: 126.6, renew: 42.4, battery: 74.8, frequency: 49.9, carbon: 249.7 },
  { time: '06:00', usage: 76.1, demand: 446.1, factor: 66.9, voltage: 246.2, current: 42.4, reactive: 51.8, energy: 580.1, gen: 274.8, renew: 14.0, battery: 43.7, frequency: 49.6, carbon: 495.9 },
  { time: '07:00', usage: 439.7, demand: 524.5, factor: 86.6, voltage: 210.4, current: 46.7, reactive: 7.2, energy: 100.2, gen: 317.2, renew: 51.3, battery: 70.5, frequency: 49.6, carbon: 220.8 },
  { time: '08:00', usage: 320.5, demand: 224.8, factor: 43.9, voltage: 236.9, current: 71.1, reactive: 62.6, energy: 317.1, gen: 116.7, renew: 58.7, battery: 56.7, frequency: 50.0, carbon: 211.0 },
  { time: '09:00', usage: 368.6, demand: 344.7, factor: 69.2, voltage: 212.0, current: 15.1, reactive: 25.3, energy: 287.4, gen: 229.4, renew: 47.6, battery: 95.0, frequency: 49.8, carbon: 445.7 },
  { time: '10:00', usage: 59.2, demand: 210.6, factor: 42.0, voltage: 231.9, current: 13.1, reactive: 80.3, energy: 325.4, gen: 456.9, renew: 32.5, battery: 59.7, frequency: 49.5, carbon: 101.3 },
  { time: '11:00', usage: 486.4, demand: 593.8, factor: 43.7, voltage: 221.5, current: 45.2, reactive: 81.7, energy: 825.3, gen: 499.5, renew: 72.1, battery: 1.4, frequency: 50.3, carbon: 180.5 },
  { time: '12:00', usage: 424.5, demand: 572.0, factor: 94.3, voltage: 222.2, current: 72.7, reactive: 97.8, energy: 351.7, gen: 494.2, renew: 7.4, battery: 35.2, frequency: 49.6, carbon: 336.1 },
];

const AdminDataset = () => {
  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', padding: '40px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* HEADER - NO TAILWIND */}
      <div style={{ marginBottom: '60px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#BAB86C', marginBottom: '15px' }}>
              <LayoutDashboard size={24} />
              <span style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em' }}>Official Grid Analytics</span>
           </div>
           <h1 style={{ margin: 0, fontSize: '64px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', lineHeight: 1 }}>VISUAL DATASETS</h1>
           <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginTop: '10px', maxWidth: '600px', fontWeight: 600 }}>POWER CONSUMPTION & GENERATION METRICS DECOMPOSITION.</p>
        </div>
        <div style={{ padding: '8px 16px', borderRadius: '40px', border: '1px solid #34C759', display: 'flex', alignItems: 'center', gap: '8px' }}>
           <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#34C759' }}></div>
           <span style={{ color: '#34C759', fontWeight: 900, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live Link Active</span>
        </div>
      </div>

      {/* GRAPH CONTAINERS - ALL WITH FIXED HEIGHTS VIA INLINE STYLE */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', maxWidth: '1200px', margin: '0 auto' }}>

        {/* GRAPH 1 */}
        <div className="graph-module">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
             <Zap style={{ color: '#BAB86C' }} />
             <h2 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Usage vs Generation (kW)</h2>
          </div>
          <div className="surface-card" style={{ width: '100%', height: '450px', padding: '20px' }}>
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={rawData}>
                  <defs>
                    <linearGradient id="usageG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#BAB86C" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#BAB86C" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #BAB86C', borderRadius: '20px' }} />
                  <Area type="monotone" dataKey="usage" stroke="#BAB86C" strokeWidth={6} fillOpacity={1} fill="url(#usageG)" name="USAGE" />
                  <Area type="monotone" dataKey="gen" stroke="#FFF" strokeWidth={2} strokeDasharray="5 5" fill="transparent" name="GENERATION" />
                </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* GRAPH 2 */}
        <div className="graph-module">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
             <Leaf style={{ color: '#34C759' }} />
             <h2 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Renewable Contribution (%)</h2>
          </div>
          <div className="surface-card" style={{ width: '100%', height: '400px', padding: '20px' }}>
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rawData}>
                  <XAxis dataKey="time" hide />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#000', border: '1px solid #34C759', borderRadius: '20px' }} />
                  <Bar dataKey="renew" fill="#34C759" radius={[15, 15, 0, 0]} barSize={40} name="RENEWABLE %" />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* GRAPH 3 - SPLIT */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
           <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                 <Cpu size={18} style={{ color: '#BAB86C' }} />
                 <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', opacity: 0.5 }}>Grid Frequency (Hz)</span>
              </div>
              <div className="surface-card" style={{ width: '100%', height: '250px', padding: '15px' }}>
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={rawData}>
                       <YAxis domain={[49, 51]} hide />
                       <Line type="monotone" dataKey="frequency" stroke="#FFCC00" strokeWidth={5} dot={false} name="FREQ (HZ)" />
                    </LineChart>
                 </ResponsiveContainer>
              </div>
           </div>
           <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                 <Battery size={18} style={{ color: '#BAB86C' }} />
                 <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', opacity: 0.5 }}>Battery Storage (%)</span>
              </div>
              <div className="surface-card" style={{ width: '100%', height: '250px', padding: '15px' }}>
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={rawData}>
                       <Area type="step" dataKey="battery" stroke="#BAB86C" strokeWidth={3} fill="#BAB86C33" name="BATTERY %" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>

      </div>

      <style>{`
        body { margin: 0; background-color: #000; }
        .graph-module { animation: fadeIn 1s ease-out; }
        @keyframes fadeIn {
           from { opacity: 0; transform: translateY(20px); }
           to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AdminDataset;
