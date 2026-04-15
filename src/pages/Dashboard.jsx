import React from 'react';
import StatusCard from '../components/StatusCard';
import EnergyDial from '../components/EnergyDial';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h2>Grid Control</h2>
          <p className="text-muted">VPP Node 042</p>
        </div>
        <button className="btn-primary">Optimize Flow</button>
      </header>

      <div className="dashboard-grid">
        <div className="main-section flex-col gap-lg">
          <div className="hero-section surface-card">
            <h1>Live Consumption</h1>
            <p className="text-muted">
              Real-time monitoring of your residential DER node. Balancing localized generation with grid demand response.
            </p>
          </div>

          <div className="metrics-grid">
            <StatusCard 
              title="Peak Demand" 
              value="6.8" 
              unit="kW" 
              status="critical" 
              subtitle="System is requesting temporary reduction. EARN 50 Credits/Hr by enabling."
            />
            <StatusCard 
              title="Avg Efficiency" 
              value="94.2" 
              unit="%" 
              status="stable" 
            />
            <StatusCard 
              title="Net Flow" 
              value="+1.2" 
              unit="kW" 
              status="stable" 
              subtitle="Exporting excess power to Neighbors Node 043. Current credit rate: $0.18/kWh."
            />
          </div>
        </div>

        <aside className="side-section flex-col gap-lg">
          <div className="dials-panel surface-card flex-col gap-md">
            <h3>System Equilibrium</h3>
            <div className="flex justify-between align-center">
              <EnergyDial title="Battery" percentage={78} color="var(--tertiary)" />
              <EnergyDial title="Solar" percentage={45} color="var(--secondary)" />
            </div>
          </div>

          <div className="weather-panel surface-low rounded-lg p-lg">
            <h3>Weather Outlook</h3>
            <div className="weather-forecast glass-panel">
              <h4>Cloudy Skies</h4>
              <p>Solar drop expected (14:00)</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
