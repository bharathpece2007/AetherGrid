import React, { useState } from 'react';
import { 
  Zap, Sun, BatteryFull, Activity, 
  ArrowDownRight, ArrowUpRight, Cloud, CheckCircle, Lightbulb
} from 'lucide-react';
import './EnergyFlow.css';

const EnergyFlow = () => {
  const [autoOptimize, setAutoOptimize] = useState(true);

  return (
    <div className="energy-flow-container fade-in">
      
      {/* 1. Header */}
      <div className="tab-header">
        <div className="header-text">
          <h1>Energy Flow</h1>
          <p>Real-time energy distribution</p>
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
            <h3>24h Trends</h3>
            <div className="trends-chart-mockup">
               {/* 3 lines mimicking solar, battery, consumption */}
               <svg viewBox="0 0 100 50" className="chart-svg">
                 <path d="M0,45 C20,40 30,10 50,5 C70,10 80,40 100,45" fill="none" stroke="var(--accent-yellow)" strokeWidth="2" />
                 <path d="M0,40 C20,35 40,35 60,30 C80,25 90,20 100,10" fill="none" stroke="var(--accent-blue)" strokeWidth="2" />
                 <path d="M0,20 C10,25 30,30 50,25 C70,20 90,30 100,25" fill="none" stroke="var(--accent-green)" strokeWidth="2" strokeDasharray="4" />
               </svg>
               <div className="chart-legend">
                 <span><span className="dot bg-yellow"></span> Solar</span>
                 <span><span className="dot bg-blue"></span> Home</span>
                 <span><span className="dot bg-green"></span> Battery</span>
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
