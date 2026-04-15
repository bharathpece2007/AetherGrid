import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, RefreshCw, Activity, CheckCircle, Clock } from 'lucide-react';
import './EnergySharing.css';

const EnergySharing = () => {
  const [autoTrade, setAutoTrade] = useState(true);

  return (
    <div className="energy-sharing-container fade-in">
      <div className="tab-header mb-lg">
        <div>
          <h1>Energy Sharing</h1>
          <p className="text-muted">P2P neighborhood marketplace exchange</p>
        </div>
        <div className="live-price-flag">
          <span className="price-label">Current Grid Rate:</span>
          <span className="price-value">$0.18 <span className="price-unit">/ kWh</span></span>
        </div>
      </div>

      <div className="sharing-grid">
        {/* Actions Col */}
        <div className="flex-col gap-lg">
          <div className="surface-card p-xl market-action-card sell">
            <div className="m-header">
              <div className="icon bg-green"><ArrowUpRight size={24} color="#fff" /></div>
              <h2>Sell Energy</h2>
            </div>
            <p className="text-muted text-sm mt-sm mb-md">Export excess battery charge to local neighbors at premium rates.</p>
            <div className="m-slider">
              <div className="flex justify-between text-xs mb-xs">
                <span>1 kW</span><span>5 kW</span>
              </div>
              <input type="range" min="1" max="5" defaultValue="2" className="range-slider green-slider" />
            </div>
            <button className="btn-market sell-btn">Initiate Sell Overlay</button>
          </div>

          <div className="surface-card p-xl market-action-card buy">
            <div className="m-header">
              <div className="icon bg-blue"><ArrowDownRight size={24} color="#fff" /></div>
              <h2>Buy Energy</h2>
            </div>
            <p className="text-muted text-sm mt-sm mb-md">Import clean P2P energy from neighborhood solar nodes at discount.</p>
            <div className="m-slider">
              <div className="flex justify-between text-xs mb-xs">
                <span>1 kW</span><span>5 kW</span>
              </div>
              <input type="range" min="1" max="5" defaultValue="1" className="range-slider blue-slider" />
            </div>
            <button className="btn-market buy-btn">Initiate Buy Request</button>
          </div>

          <div className="surface-card p-lg flex justify-between items-center">
            <div className="flex items-center gap-sm">
              <RefreshCw size={20} className={autoTrade ? 'text-green pulse-icon' : 'text-muted'} />
              <div>
                <strong className="block text-sm">Automated Trading</strong>
                <span className="text-xs text-muted">AI buys low, sells high automatically.</span>
              </div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={autoTrade} onChange={() => setAutoTrade(!autoTrade)} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* Chart & History */}
        <div className="flex-col gap-lg">
          <div className="surface-card p-xl chart-mock-card">
            <h3>Market Rate Fluctuation (24h)</h3>
            <div className="mock-price-graph mt-lg">
               <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="graph-line">
                 <path d="M0,25 C10,25 20,28 30,20 C40,12 50,5 60,15 C70,25 80,10 90,8 L100,5" fill="none" stroke="var(--accent-blue)" strokeWidth="2" />
                 {/* Current price marker */}
                 <circle cx="90" cy="8" r="2" fill="var(--accent-green)" />
               </svg>
            </div>
          </div>

          <div className="surface-card p-xl history-card">
            <h3>Recent Transactions</h3>
            <div className="tx-list mt-md">
              <div className="tx-item">
                <div className="tx-icon green"><ArrowUpRight size={16} /></div>
                <div className="tx-details">
                  <strong>Sold to Node 012</strong>
                  <span>2.4 kWh @ $0.16/kWh</span>
                </div>
                <div className="tx-status text-green"><CheckCircle size={14} /> + $0.38</div>
              </div>
              
              <div className="tx-item">
                <div className="tx-icon blue"><ArrowDownRight size={16} /></div>
                <div className="tx-details">
                  <strong>Bought from Node 081</strong>
                  <span>1.0 kWh @ $0.09/kWh</span>
                </div>
                <div className="tx-status text-blue"><CheckCircle size={14} /> - $0.09</div>
              </div>
              
              <div className="tx-item">
                <div className="tx-icon gray"><Clock size={16} /></div>
                <div className="tx-details">
                  <strong>Pending Sale (Node 044)</strong>
                  <span>1.5 kWh @ $0.18/kWh</span>
                </div>
                <div className="tx-status text-muted">Awaiting sync</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EnergySharing;
