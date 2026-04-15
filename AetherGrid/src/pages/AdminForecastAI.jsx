import React from 'react';
import { Lightbulb, CloudLightning, TrendingUp, BarChart2, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Admin.css';

const AdminForecastAI = ({ theme }) => {
  const forecastData = [
    { hour: 0, load: 140.0 }, { hour: 1, load: 139.5 }, { hour: 2, load: 139.0 },
    { hour: 3, load: 138.5 }, { hour: 4, load: 138.0 }, { hour: 5, load: 137.5 },
    { hour: 6, load: 137.0 }, { hour: 7, load: 136.5 }, { hour: 8, load: 136.0 },
    { hour: 9, load: 135.5 }, { hour: 10, load: 135.0 }, { hour: 11, load: 134.5 },
    { hour: 12, load: 134.0 }, { hour: 13, load: 132.0 }, { hour: 14, load: 130.0 },
    { hour: 15, load: 128.0 }, { hour: 16, load: 126.0 }, { hour: 17, load: 124.0 },
    { hour: 18, load: 122.0 }, { hour: 19, load: 120.0 }, { hour: 20, load: 118.0 },
    { hour: 21, load: 120.5 }, { hour: 22, load: 123.0 }, { hour: 23, load: 125.5 },
    { hour: 24, load: 128.0 }, { hour: 25, load: 130.5 }, { hour: 26, load: 133.0 },
    { hour: 27, load: 135.5 }, { hour: 28, load: 138.0 }, { hour: 29, load: 140.5 },
    { hour: 30, load: 143.0 }, { hour: 31, load: 145.5 }, { hour: 32, load: 148.0 },
    { hour: 33, load: 149.2 }, { hour: 34, load: 150.4 }, { hour: 35, load: 151.6 },
    { hour: 36, load: 152.8 }, { hour: 37, load: 154.0 }, { hour: 38, load: 155.2 },
    { hour: 39, load: 156.4 }, { hour: 40, load: 157.6 }, { hour: 41, load: 158.8 },
    { hour: 42, load: 160.0 }, { hour: 43, load: 161.2 }, { hour: 44, load: 162.4 },
    { hour: 45, load: 163.6 }, { hour: 46, load: 164.8 }, { hour: 47, load: 166.0 }
  ];

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
                 <div className="flex items-center gap-xs text-red text-xs font-bold uppercase tracking-wider">
                    <AlertTriangle size={14} /> Spike Detected (H40+)
                 </div>
              </div>
              <p className="text-sm text-muted mb-lg">Machine learning ensemble predicting multi-directional flow constraints over incoming cold front.</p>
              
              <div style={{ height: '350px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={forecastData}>
                    <defs>
                      <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#1e293b' : '#e2e8f0'} />
                    <XAxis dataKey="hour" fontSize={11} stroke="#8c9baf" tickFormatter={(v) => `H${v}`} />
                    <YAxis fontSize={11} stroke="#8c9baf" domain={['dataMin - 10', 'dataMax + 10']} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: theme === 'dark' ? '#000' : '#fff', border: '1px solid #eab308', borderRadius: '8px' }} 
                      itemStyle={{ color: '#eab308', fontWeight: 'bold' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="load" 
                      stroke="#eab308" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorLoad)" 
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
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
