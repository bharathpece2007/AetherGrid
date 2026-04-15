import React from 'react';
import { Lightbulb, CloudLightning, TrendingUp, BarChart2 } from 'lucide-react';
import './Admin.css';

const AdminForecastAI = () => {
  return (
    <div className="admin-tab-container fade-slide-up">
      <div className="tab-header mb-xl">
        <div>
          <h1>Forecast & AI</h1>
          <p className="text-muted">Predictive models and machine learning optimization recommendations.</p>
        </div>
      </div>

      <div className="grid-2 gap-xl" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
        
        {/* Forecast Graph */}
        <div className="flex-col gap-lg overflow-hidden">
           <div className="surface-card p-xl bg-surface">
              <div className="flex justify-between items-center mb-md">
                 <h3 className="m-0 flex items-center gap-sm"><BarChart2 size={20} className="text-yellow" /> Load Forecast (48H)</h3>
              </div>
              <p className="text-sm text-muted mb-lg">Machine learning ensemble predicting multi-directional flow constraints over incoming cold front.</p>
              
              <div className="ai-mock-chart relative" style={{ height: '300px' }}>
                 <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                   {/* Normal baseline curve */ }
                   <path d="M0,20 C20,15 40,25 60,10 C80,5 90,30 100,5" fill="none" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="1" />
                   
                   {/* AI Prediction curve */ }
                   <path d="M0,20 C20,22 40,15 60,30 C70,38 80,10 100,10" fill="none" stroke="#eab308" strokeWidth="2" className="draw-path" />
                   
                   {/* Danger Zone Highlight */}
                   <rect x="55" y="25" width="15" height="15" fill="rgba(239, 68, 68, 0.1)" />
                 </svg>
                 
                 <div className="absolute top-[60%] left-[55%] text-xs text-red font-bold font-code bg-darker p-xs rounded shadow-lg transform -translate-y-full -translate-x-1/2">
                   SPIKE DETECTED
                 </div>
              </div>
           </div>
        </div>

        {/* AI Recommendations */}
        <div className="flex-col gap-lg">
           <div className="surface-card p-xl border-l-yellow relative overflow-hidden bg-surface">
              {/* Background accent */}
              <div className="absolute -right-4 -top-4 opacity-10"><Lightbulb size={120} /></div>
              
              <h3 className="m-0 flex items-center gap-sm mb-lg text-yellow"><Lightbulb size={20} /> AI Protocol Recommendations</h3>
              
              <div className="ai-rec-list flex-col gap-md relative z-10">
                 <div className="bg-subtle p-md rounded-md hover-scale border border-transparent transition hover-border-yellow">
                    <p className="m-0 font-bold mb-xs text-sm">Action Requirement: 18:00 Block</p>
                    <p className="m-0 text-xs text-muted mb-md line-height-relaxed">Predictive model indicates a severe spike in node consumption due to weather. Recommend initiating 15% global throttle on non-critical sectors 1 hour prior.</p>
                    <button className="btn-sm bg-yellow text-dark border-none font-bold cursor-pointer">Auto-Apply Protocol</button>
                 </div>
                 
                 <div className="bg-subtle p-md rounded-md border border-transparent">
                    <p className="m-0 font-bold mb-xs text-sm">Pre-Charge Strategy</p>
                    <p className="m-0 text-xs text-muted line-height-relaxed">Commence force-charging all regional EV/Battery endpoints before 12:00 to avoid stacking load.</p>
                 </div>
              </div>
           </div>
           
           <div className="surface-card p-xl flex items-center gap-md">
             <CloudLightning size={24} className="text-blue" />
             <div>
               <h4 className="m-0">Weather Integration Active</h4>
               <span className="text-xs text-muted font-code mt-xs block">Radar feed synced. API Health: 100%</span>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default AdminForecastAI;
