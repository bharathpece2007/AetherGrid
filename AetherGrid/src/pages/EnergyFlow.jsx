import React, { useState, useEffect } from 'react';
import { 
  Zap, Sun, BatteryFull, Activity, 
  ArrowDownRight, ArrowUpRight, Cloud, CheckCircle, Lightbulb
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './EnergyFlow.css';

const EnergyFlow = ({ theme }) => {
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // 1. Plot real dataset using AI-structured query fetching history ranges
    const fetchDataset = async () => {
      if (!supabase) {
        console.warn("Supabase not initialized. Using procedural data baseline.");
        setChartData([
          { time: '00:00', home: 218, solar: 78, battery: 46 },
          { time: '04:00', home: 120, solar: 65, battery: 22 },
          { time: '08:00', home: 320, solar: 116, battery: 56 },
          { time: '12:00', home: 450, solar: 300, battery: 85 },
          { time: '16:00', home: 380, solar: 220, battery: 72 },
          { time: '20:00', home: 550, solar: 20, battery: 40 },
          { time: '24:00', home: 210, solar: 0, battery: 30 }
        ]);
        return;
      }

      const { data, error } = await supabase
        .from('energy_logs')
        .select('timestamp, usage_kw, generation_kw, battery_level')
        .order('timestamp', { ascending: true })
        .limit(24);
      if (data && data.length > 0) {
        const parsed = data.map(d => ({
          time: new Date(d.timestamp).getHours() + ':00',
          home: d.usage_kw,
          solar: d.generation_kw,
          battery: d.battery_level
        }));
        setChartData(parsed);
      } else {
        // Fallback UI data
        setChartData([
          { time: '00:00', home: 218, solar: 78, battery: 46 },
          { time: '04:00', home: 120, solar: 65, battery: 22 },
          { time: '08:00', home: 320, solar: 116, battery: 56 },
          { time: '12:00', home: 450, solar: 300, battery: 85 },
          { time: '16:00', home: 380, solar: 220, battery: 72 },
          { time: '20:00', home: 550, solar: 20, battery: 40 },
          { time: '24:00', home: 210, solar: 0, battery: 30 }
        ]);
      }
    };
    fetchDataset();
  }, []);

  return (
    <div className="energy-flow-container fade-in">
      
      {/* 1. Header */}
      <div className="tab-header">
        <div className="header-text">
          <h1>Energy Flow</h1>
          <p>Real-time dataset visualization</p>
        </div>
        <div className="header-actions">
          <div className="status-badge live">
            <span className="dot pulse"></span>
            Live Status
          </div>
          <div className="optimize-toggle">
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={autoOptimize} 
                onChange={() => setAutoOptimize(!autoOptimize)} 
              />
              <span className="slider"></span>
            </label>
            <span>Auto Optimize</span>
          </div>
        </div>
      </div>

      {/* 2. KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card surface-card">
          <div className="kpi-icon bg-yellow"><Sun size={20} /></div>
          <div className="kpi-data">
            <span className="kpi-label">Total Generation</span>
            <span className="kpi-value text-yellow">4.2 kW</span>
          </div>
        </div>
        <div className="kpi-card surface-card">
          <div className="kpi-icon bg-blue"><Activity size={20} /></div>
          <div className="kpi-data">
            <span className="kpi-label">Total Consumption</span>
            <span className="kpi-value">3.8 kW</span>
          </div>
        </div>
        <div className="kpi-card surface-card">
          <div className="kpi-icon bg-green"><ArrowUpRight size={20} /></div>
          <div className="kpi-data">
            <span className="kpi-label">Net Flow (Grid Export)</span>
            <span className="kpi-value text-green">+0.4 kW</span>
          </div>
        </div>
        <div className="kpi-card surface-card">
          <div className="kpi-icon bg-gray"><Cloud size={20} /></div>
          <div className="kpi-data">
            <span className="kpi-label">Grid Dependency</span>
            <span className="kpi-value">0%</span>
          </div>
        </div>
      </div>

      <div className="flow-main-layout">
        
        {/* Left Section: Chart */}
        <div className="flow-left-section flex-col gap-lg">
          <div className="surface-card p-xl">
            <h3>24h Real-time Overlay Plot</h3>
            <div className="trends-chart-mockup" style={{ height: '220px', marginLeft: '-20px' }}>
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                   <defs>
                     <linearGradient id="colorHome" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4}/>
                       <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                     </linearGradient>
                     <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#eab308" stopOpacity={0.4}/>
                       <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <XAxis dataKey="time" stroke={theme === 'dark' ? '#8c9baf' : '#64748b'} fontSize={11} tickLine={false} axisLine={false} />
                   <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#122136' : '#ffffff', border: 'none', borderRadius: '8px', color: theme === 'dark' ? '#fff' : '#000', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                   <Area type="monotone" dataKey="home" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorHome)" />
                   <Area type="monotone" dataKey="solar" stroke="#eab308" strokeWidth={3} fillOpacity={1} fill="url(#colorSolar)" />
                 </AreaChart>
               </ResponsiveContainer>
               
               <div className="chart-legend mt-sm" style={{ paddingLeft: '20px' }}>
                 <span><span className="dot bg-yellow"></span> Solar kW</span>
                 <span><span className="dot bg-blue"></span> Home kW</span>
                 <span><span className="dot bg-green"></span> Battery %</span>
               </div>
            </div>
          </div>
          
          <div className="surface-card p-xl ai-insights">
            <div className="insights-header">
              <Lightbulb size={20} className="text-yellow" />
              <h3>AI Optima Insights</h3>
            </div>
            <ul className="insights-list">
              <li>Sell excess generation. Rate is high at $0.14/kWh. <button className="btn-sm">Execute</button></li>
              <li>Charge battery fully. Incoming severe weather expected tonight.</li>
            </ul>
          </div>
        </div>

        {/* 3. Main Section: Flow Diagram */}
        <div className="flow-center-section surface-card">
          <h3 className="section-title">System Flow Diagram</h3>
          <p className="section-subtitle">Efficiency: <span className="text-green font-bold">96%</span></p>

          <div className="flow-diagram">
            
            {/* Diagram Nodes */}
            <div className="node solar-node">
              <Sun size={28} />
              <span>Solar</span>
              <strong>4.2 kW</strong>
            </div>
            
            <div className="node grid-node">
              <Activity size={28} />
              <span>Grid</span>
              <strong>+0.4 kW</strong>
            </div>
            
            <div className="node home-node main">
              <Zap size={32} />
              <span>Home</span>
              <strong>3.8 kW</strong>
            </div>
            
            <div className="node battery-node">
              <BatteryFull size={28} />
              <span>Battery (85%)</span>
              <strong>0.0 kW</strong>
            </div>

            {/* Connecting Animated Lines */}
            <div className="line line-solar-home">
              <div className="animated-flow flow-down"></div>
            </div>
            
            <div className="line line-home-grid">
              <div className="animated-flow flow-right"></div>
            </div>
            
            <div className="line line-home-battery">
              {/* No flow currently, battery mostly full/idle, but let's say floating */}
              <div className="animated-flow flow-idle"></div>
            </div>

          </div>
        </div>

        {/* 5. Right Section: Activity Feed */}
        <div className="flow-right-section surface-card p-xl">
          <h3>Live Activity</h3>
          <div className="activity-feed">
            <div className="feed-item">
              <div className="feed-icon text-green"><CheckCircle size={16} /></div>
              <div className="feed-content">
                <p>Grid export initiated to Node 043.</p>
                <span className="timestamp">Just now</span>
              </div>
            </div>
            <div className="feed-item">
              <div className="feed-icon text-yellow"><Sun size={16} /></div>
              <div className="feed-content">
                <p>Solar generation peaked at 4.2 kW.</p>
                <span className="timestamp">5 mins ago</span>
              </div>
            </div>
            <div className="feed-item">
              <div className="feed-icon"><Activity size={16} /></div>
              <div className="feed-content">
                <p>HVAC system scaled down by AI.</p>
                <span className="timestamp">12 mins ago</span>
              </div>
            </div>
            <div className="feed-item">
              <div className="feed-icon text-green"><BatteryFull size={16} /></div>
              <div className="feed-content">
                <p>Battery stabilized at 85%.</p>
                <span className="timestamp">25 mins ago</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EnergyFlow;
