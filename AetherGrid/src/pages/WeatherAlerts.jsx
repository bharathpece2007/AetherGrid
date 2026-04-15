import React from 'react';
import { CloudRain, Sun, AlertTriangle, Wind, Droplets } from 'lucide-react';
import './WeatherAlerts.css';

const WeatherAlerts = () => {
  return (
    <div className="weather-alerts-container fade-in">
      <div className="tab-header mb-lg">
        <div>
          <h1>Weather & Alerts</h1>
          <p className="text-muted">Predictive planning and automated response triggers</p>
        </div>
      </div>

      <div className="weather-grid">
        
        {/* Big Live Weather Panel */}
        <div className="surface-card flex-col items-center justify-center weather-main-card">
          <div className="flex items-center gap-xl">
            <CloudRain size={80} className="text-gray" />
            <div className="current-temp">
              <h2>22°C</h2>
              <p>Heavy Cloud Cover</p>
            </div>
          </div>
          
          <div className="weather-stats mt-xl w-full flex justify-around border-t pt-lg">
             <div className="text-center">
               <span className="block text-xs text-muted font-bold mb-xs">WIND SPEED</span>
               <span className="flex items-center justify-center gap-sm font-bold"><Wind size={16} /> 12 km/h</span>
             </div>
             <div className="text-center">
               <span className="block text-xs text-muted font-bold mb-xs">HUMIDITY</span>
               <span className="flex items-center justify-center gap-sm font-bold"><Droplets size={16} /> 78%</span>
             </div>
             <div className="text-center">
               <span className="block text-xs text-muted font-bold mb-xs">SOLAR INDEX</span>
               <span className="flex items-center justify-center gap-sm font-bold text-yellow"><Sun size={16} /> Low (2.1)</span>
             </div>
          </div>
        </div>

        {/* Alerts & Timeline */}
        <div className="flex-col gap-lg">
          
          <div className="surface-card p-xl bg-danger-subtle border-danger">
            <div className="flex items-start gap-md">
              <AlertTriangle size={24} className="text-red mt-xs" />
              <div>
                <h3 className="m-0 text-red mb-xs">High Demand Expected</h3>
                <p className="m-0 text-sm opacity-90">
                  Regional grid operator has flagged a severe capacity constraint expected between 18:00 - 21:00 due to weather front. "Reduce Usage" active.
                </p>
              </div>
            </div>
          </div>

          <div className="surface-card p-xl border-warning">
            <div className="flex items-start gap-md">
              <Sun size={24} className="text-yellow mt-xs opacity-50" />
              <div>
                <h3 className="m-0 text-yellow mb-xs">Solar Yield Drop</h3>
                <p className="m-0 text-sm opacity-90">
                  Cloud cover has reduced theoretical output by 65%. System is currently relying heavier on grid baseline.
                </p>
              </div>
            </div>
          </div>

          <div className="surface-card p-xl flex-1">
            <h3 className="mt-0 mb-lg">6 Hour Forecast Timeline</h3>
            <div className="forecast-timeline flex justify-between">
              
              <div className="timeline-item">
                <span className="time">Now</span>
                <CloudRain size={24} className="text-gray" />
                <span className="temp">22°</span>
              </div>
              <div className="timeline-item">
                <span className="time">+1H</span>
                <CloudRain size={24} className="text-gray" />
                <span className="temp">21°</span>
              </div>
              <div className="timeline-item">
                <span className="time">+2H</span>
                <Sun size={24} className="text-yellow opacity-50" />
                <span className="temp">20°</span>
              </div>
              <div className="timeline-item">
                <span className="time">+4H</span>
                <Sun size={24} className="text-yellow" />
                <span className="temp">18°</span>
              </div>
              <div className="timeline-item">
                <span className="time">+6H</span>
                <Sun size={24} className="text-yellow" />
                <span className="temp">17°</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WeatherAlerts;
