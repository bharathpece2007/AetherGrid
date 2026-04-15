import React from 'react';
import { Sun, Battery, ArrowRightLeft, Cloud, Activity } from 'lucide-react';
import StatusCard from '../components/StatusCard';
import EnergyDial from '../components/EnergyDial';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      
      {/* Title Header Section */}
      <div className="dashboard-hero">
        <div className="hero-text">
          <h1>Live Consumption</h1>
          <p className="subtitle">
            Real-time monitoring of your residential DER node.<br/>
            Balancing localized generation with grid demand response.
          </p>
        </div>
        
        <div className="hero-badges flex gap-md">
          <div className="status-badge">
            <span className="badge-label">GRID STATUS</span>
            <div className="badge-value">
              <span className="dot-green"></span>
              <span className="font-bold text-green">Stable</span>
            </div>
          </div>
          <div className="status-badge">
            <span className="badge-label">DER NODE</span>
            <div className="badge-value">
              <Activity size={16} color="var(--accent-blue)" />
              <span className="font-bold text-blue">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="dashboard-grid">
        
        {/* Left Col - Massive Dial */}
        <div className="main-dial-card surface-card flex-col items-center justify-center">
          <EnergyDial title="" percentage={4.2} color="var(--accent-blue)" unit="KW / HOUR" />
          
          <div className="dial-stats-row flex justify-between w-full mt-lg">
            <div className="dial-stat text-center">
              <div className="stat-label">PEAK DEMAND</div>
              <div className="stat-val font-bold">6.8 <span className="text-muted">kW</span></div>
            </div>
            <div className="dial-stat text-center">
              <div className="stat-label">AVG EFFICIENCY</div>
              <div className="stat-val font-bold text-green">94.2%</div>
            </div>
            <div className="dial-stat text-center">
              <div className="stat-label">NET FLOW</div>
              <div className="stat-val font-bold text-blue">+1.2 <span className="text-muted">kW</span></div>
            </div>
          </div>
        </div>

        {/* Right Col - Reduce Usage + Weather */}
        <div className="side-column flex-col gap-lg">
          <StatusCard 
            variant="dark"
            icon={Activity}
            title="Reduce Usage"
            subtitle="System is requesting temporary reduction. EARN 50 Credits/Hr by enabling."
            badge="+12.5% Bonus"
          />
          
          <StatusCard 
            title="WEATHER OUTLOOK"
            icon={Cloud}
            status="cloudy"
            value="Cloudy Skies"
            subtitle="Solar drop expected (14:00)"
            badge="Next 2 Hours"
          />
        </div>
      </div>

      {/* 3 Small Status Cards */}
      <div className="metrics-grid">
        <StatusCard 
          title="SOLAR GENERATION" 
          value="2.4" 
          unit="kW" 
          icon={Sun}
          progress={65}
          progressColor="var(--accent-green)"
          subtitle="LOWER YIELD"
          badge="TARGET: 3.5KW"
        />
        <StatusCard 
          title="BATTERY STORAGE" 
          value="88" 
          unit="%" 
          icon={Battery}
          progress={88}
          progressColor="var(--accent-green)"
          subtitle="PRE-CHARGE ACTIVE"
          badge="OPTIMIZED"
        />
        <StatusCard 
          title="GRID SHARING" 
          value="1.2" 
          unit="kW" 
          icon={ArrowRightLeft}
          subtitle="Exporting excess power to Neighbors Node 043. Current credit rate: $0.18/kWh."
        />
      </div>

      {/* Bottom Chart Card */}
      <div className="chart-card surface-card">
        <div className="chart-header flex justify-between items-center mb-xl">
          <h2 className="font-display">System Equilibrium Flow</h2>
          <div className="time-tabs">
            <button className="tab active">24H</button>
            <button className="tab">7D</button>
            <button className="tab">1M</button>
          </div>
        </div>
        
        <div className="chart-area">
          {/* Mockup of chart shown in image */}
          <div className="chart-bars">
            <div className="bar-wrapper"><div className="bar" style={{height: '30%'}}></div></div>
            <div className="bar-wrapper"><div className="bar" style={{height: '45%'}}></div></div>
            <div className="bar-wrapper"><div className="bar" style={{height: '30%'}}></div></div>
            <div className="bar-wrapper"><div className="bar" style={{height: '60%'}}></div></div>
            <div className="bar-wrapper"><div className="bar" style={{height: '45%'}}></div></div>
            <div className="bar-wrapper"><div className="bar" style={{height: '80%'}}></div></div>
            <div className="bar-wrapper"><div className="bar" style={{height: '30%'}}></div></div>
            <div className="bar-wrapper"><div className="bar" style={{height: '40%'}}></div></div>
            <div className="bar-wrapper"><div className="bar" style={{height: '20%'}}></div></div>
            <div className="bar-wrapper"><div className="bar" style={{height: '15%'}}></div></div>
            <div className="bar-wrapper"><div className="bar" style={{height: '50%'}}></div></div>
          </div>
          <div className="chart-labels justify-between flex">
            <span>00:00</span>
            <span>04:00</span>
            <span>08:00</span>
            <span>12:00</span>
            <span>16:00</span>
            <span>20:00</span>
            <span>23:59</span>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
