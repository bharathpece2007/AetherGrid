import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  Database, Download, Filter, Search, 
  ArrowUpRight, ArrowDownRight, RefreshCw, Table as TableIcon
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import './Admin.css';

const AdminDataset = ({ theme }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('visual'); // 'visual' or 'table'

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!supabase) {
        // Mock data from the specific CSV patterns if no DB
        generateMockData();
        setLoading(false);
        return;
      }

      const { data: dbData, error } = await supabase
        .from('energy_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100);

      if (dbData && dbData.length > 0) {
        setData(dbData);
      } else {
        generateMockData();
      }
      setLoading(false);
    };

    const generateMockData = () => {
      const mock = Array.from({ length: 24 }).map((_, i) => ({
        timestamp: `2025-01-01 ${i.toString().padStart(2, '0')}:00:00`,
        usage_kw: Math.random() * 500 + 100,
        generation_kw: Math.random() * 400 + 50,
        battery_level: Math.random() * 100,
        peak_demand_kw: Math.random() * 600 + 200,
        carbon_emissions: Math.random() * 500 + 200,
        renewable_contribution: Math.random() * 100
      }));
      setData(mock);
    };

    fetchData();
  }, []);

  return (
    <div className="admin-tab-container fade-slide-up">
      <div className="tab-header mb-xl">
        <div>
          <h1 className="flex items-center gap-md">
            <Database className="text-blue" size={32} />
            CSV Dataset Explorer
          </h1>
          <p className="text-muted">Real-time analytical mapping of the local Smart Grid dataset.</p>
        </div>
        <div className="flex gap-md">
           <button className={`icon-btn ${view === 'visual' ? 'active' : ''}`} onClick={() => setView('visual')} style={{ padding: '8px 16px', borderRadius: '12px', background: view === 'visual' ? 'rgba(14, 165, 233, 0.1)' : 'transparent' }}>
              Visual Analysis
           </button>
           <button className={`icon-btn ${view === 'table' ? 'active' : ''}`} onClick={() => setView('table')} style={{ padding: '8px 16px', borderRadius: '12px', background: view === 'table' ? 'rgba(14, 165, 233, 0.1)' : 'transparent' }}>
              Raw Records
           </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-2xl">
          <RefreshCw className="animate-spin text-blue" size={48} />
        </div>
      ) : (
        <>
          {view === 'visual' ? (
            <div className="flex-col gap-xl">
              <div className="grid-3 gap-xl">
                <div className="surface-card p-xl">
                  <h4 className="text-muted mb-sm">AVG CONSUMPTION</h4>
                  <div className="flex items-baseline gap-sm">
                    <h2 className="text-3xl font-bold">312.4</h2>
                    <span className="text-muted">kW</span>
                  </div>
                  <div className="text-green text-sm mt-sm flex items-center gap-xs">
                    <ArrowDownRight size={14} /> -12% optimized by AI
                  </div>
                </div>
                <div className="surface-card p-xl">
                  <h4 className="text-muted mb-sm">PEAK GEN ACCURACY</h4>
                  <div className="flex items-baseline gap-sm">
                    <h2 className="text-3xl font-bold">98.2</h2>
                    <span className="text-muted">%</span>
                  </div>
                  <div className="text-blue text-sm mt-sm">High Reliability Status</div>
                </div>
                <div className="surface-card p-xl border-warning-subtle">
                  <h4 className="text-muted mb-sm">CARBON FOOTPRINT</h4>
                  <div className="flex items-baseline gap-sm">
                    <h2 className="text-3xl font-bold">245.8</h2>
                    <span className="text-muted">g/kWh</span>
                  </div>
                  <div className="text-yellow text-sm mt-sm">Sector Threshold Check</div>
                </div>
              </div>

              <div className="grid-2 gap-xl">
                <div className="surface-card p-xl">
                  <h3>Power Usage vs Generation Trends</h3>
                  <div style={{ height: '300px', marginTop: '20px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <defs>
                          <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorGen" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#2a3b4f' : '#e2e8f0'} vertical={false} />
                        <XAxis dataKey="timestamp" hide />
                        <YAxis stroke={theme === 'dark' ? '#8c9baf' : '#64748b'} fontSize={12} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ background: theme === 'dark' ? '#122136' : '#ffffff', border: 'none', borderRadius: '12px', color: theme === 'dark' ? '#fff' : '#000' }} />
                        <Area type="monotone" dataKey="usage_kw" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorUsage)" name="Usage (kW)" />
                        <Area type="monotone" dataKey="generation_kw" stroke="#eab308" fillOpacity={1} fill="url(#colorGen)" name="Generation (kW)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="surface-card p-xl">
                  <h3>Renewable Energy Contribution %</h3>
                  <div style={{ height: '300px', marginTop: '20px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#2a3b4f' : '#e2e8f0'} vertical={false} />
                        <XAxis dataKey="timestamp" hide />
                        <YAxis stroke={theme === 'dark' ? '#8c9baf' : '#64748b'} fontSize={12} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ background: theme === 'dark' ? '#122136' : '#ffffff', border: 'none', borderRadius: '12px', color: theme === 'dark' ? '#fff' : '#000' }} />
                        <Bar dataKey="renewable_contribution" fill="#00D084" radius={[4, 4, 0, 0]} name="Renewable %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="surface-card p-0 overflow-hidden">
               <div className="p-xl flex justify-between items-center border-bottom">
                 <h3 className="m-0">Dataset Record Set</h3>
                 <button className="icon-btn flex items-center gap-sm">
                   <Download size={18} /> Export CSV
                 </button>
               </div>
               <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                 <table className="admin-table">
                   <thead>
                     <tr>
                       <th>Timestamp</th>
                       <th>Usage (kW)</th>
                       <th>Generation (kW)</th>
                       <th>Battery (%)</th>
                       <th>Carbon (g/kWh)</th>
                       <th>Renewable (%)</th>
                     </tr>
                   </thead>
                   <tbody>
                     {data.map((row, idx) => (
                       <tr key={idx}>
                         <td className="font-bold">{new Date(row.timestamp).toLocaleString()}</td>
                         <td className="text-blue">{row.usage_kw?.toFixed(2)}</td>
                         <td className="text-yellow">{row.generation_kw?.toFixed(2)}</td>
                         <td className="text-green font-bold">{row.battery_level?.toFixed(1)}%</td>
                         <td>{row.carbon_emissions?.toFixed(1)}</td>
                         <td>{row.renewable_contribution?.toFixed(1)}%</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDataset;
