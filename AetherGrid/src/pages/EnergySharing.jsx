import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, ArrowDownRight, RefreshCw, 
  Activity, CheckCircle, Clock, Zap, Target, 
  ShieldCheck, TrendingDown, TrendingUp, Cpu, Server, Network
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import './Admin.css';

// Mock Data Generators
const generateNode = () => `ND-${Math.floor(100 + Math.random() * 900)}`;
const generatePrice = (base) => +(base + (Math.random() * 0.08 - 0.04)).toFixed(3);
const generateVol = () => +(Math.random() * 3 + 0.5).toFixed(1);
const generateDist = () => +(Math.random() * 4 + 0.1).toFixed(1);

const EnergySharing = () => {
  // Prosumer Network State
  const [autoTrade, setAutoTrade] = useState(true);
  const [walletBalance, setWalletBalance] = useState(14.50); // Starting earnings
  
  // Real-time Node Energy State
  const [myNode, setMyNode] = useState({
    solarGen: 5.2,
    consumption: 2.1,
    battery: 88,
    minReserve: 30 // Safety constraint limit
  });
  
  // User Set Prices
  const [sellingPrice, setSellingPrice] = useState(0.18);
  const [buyingLimit, setBuyingLimit] = useState(0.12);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [isSavingBuyLimit, setIsSavingBuyLimit] = useState(false);
  const [dbStatusMsg, setDbStatusMsg] = useState("");

  // Market Order Book
  const [marketAsks, setMarketAsks] = useState([]); // Sellers
  const [marketBids, setMarketBids] = useState([]); // Buyers
  
  // Transaction Ledger
  const [ledger, setLedger] = useState([
    { id: 'tx-281', type: 'SELL', node: 'ND-081', vol: 2.4, rate: 0.160, total: 0.38, time: '14:22:11', status: 'COMPLETED' },
    { id: 'tx-280', type: 'BUY', node: 'GRID', vol: 1.0, rate: 0.220, total: 0.22, time: '09:14:00', status: 'COMPLETED' }
  ]);

  // Derived Constraints
  const rawSurplus = myNode.solarGen - myNode.consumption;
  const exportable = myNode.battery > myNode.minReserve ? rawSurplus : 0; 
  const isSurplus = rawSurplus > 0;
  
  // Backend Sync Handlers
  const handleBroadcastOffer = async () => {
    setIsBroadcasting(true);
    setDbStatusMsg("Syncing DB...");
    try {
      if(supabase) {
        await supabase
          .from('der_registry')
          .update({ status: `Selling Surplus @ $${sellingPrice}`, updated_at: new Date().toISOString() })
          .eq('node_id', 'ND-0842');
      }
      await new Promise(r => setTimeout(r, 600)); // Network delay simulation
      setDbStatusMsg("Success!");
    } catch (e) {
      console.warn("Backend error", e);
    } finally {
      setIsBroadcasting(false);
      setTimeout(() => setDbStatusMsg(""), 2000);
    }
  };

  const handleSaveBuyLimit = async () => {
    setIsSavingBuyLimit(true);
    setDbStatusMsg("Syncing DB...");
    try {
      if(supabase) {
        await supabase
          .from('der_registry')
          .update({ status: `Auto-Buy Limit @ $${buyingLimit}`, updated_at: new Date().toISOString() })
          .eq('node_id', 'ND-0842');
      }
      await new Promise(r => setTimeout(r, 600)); 
      setDbStatusMsg("Success!");
    } catch (e) {
      console.warn("Backend error", e);
    } finally {
      setIsSavingBuyLimit(false);
      setTimeout(() => setDbStatusMsg(""), 2000);
    }
  };

  // Simulated Market Generator
  useEffect(() => {
    const marketInterval = setInterval(() => {
      // Simulate new orders entering the market
      if(Math.random() > 0.4) {
        setMarketAsks(prev => {
          const newAsk = { id: Date.now(), node: generateNode(), rate: generatePrice(0.19), vol: generateVol(), dist: generateDist() };
          return [newAsk, ...prev].slice(0, 5).sort((a,b) => a.rate - b.rate); // Sort cheapest asks first
        });
      }
      
      if(Math.random() > 0.4) {
        setMarketBids(prev => {
          const newBid = { id: Date.now()+1, node: generateNode(), rate: generatePrice(0.15), vol: generateVol(), dist: generateDist() };
          return [newBid, ...prev].slice(0, 5).sort((a,b) => b.rate - a.rate); // Sort highest bids first
        });
      }
    }, 2500);
    
    // Simulate initial load
    setMarketAsks([...Array(4)].map((_,i) => ({ id: i, node: generateNode(), rate: generatePrice(0.19), vol: generateVol(), dist: generateDist() })).sort((a,b) => a.rate - b.rate));
    setMarketBids([...Array(4)].map((_,i) => ({ id: i+10, node: generateNode(), rate: generatePrice(0.15), vol: generateVol(), dist: generateDist() })).sort((a,b) => b.rate - a.rate));
    
    return () => clearInterval(marketInterval);
  }, []);

  // Trading Match Engine (Runs every 3 seconds)
  useEffect(() => {
    if (!autoTrade) return;

    const matchEngine = setInterval(() => {
      // Logic: If we have exportable surplus to SELL
      if (isSurplus && exportable > 1) {
        const bestBid = marketBids[0]; // Highest buyer
        
        // If buyer is willing to pay our set price or more
        if (bestBid && bestBid.rate >= sellingPrice) {
          executeTrade('SELL', bestBid);
        }
      } 
      // Logic: If we are in DEFICIT, we need to BUY
      else if (!isSurplus && myNode.battery < myNode.minReserve) {
        const bestAsk = marketAsks[0]; // Cheapest seller
        
        // If seller is offering below our buying limit
        if (bestAsk && bestAsk.rate <= buyingLimit) {
          executeTrade('BUY', bestAsk);
        } else if (!bestAsk || bestAsk.rate > buyingLimit) {
          // grid fallback Logic
          executeGridFallback();
        }
      }
    }, 3000);
    
    return () => clearInterval(matchEngine);
  }, [autoTrade, marketBids, marketAsks, isSurplus, exportable, sellingPrice, buyingLimit, myNode]);

  const executeTrade = (type, counterpartyObj) => {
    const totalTraded = type === 'SELL' 
      ? counterpartyObj.rate * counterpartyObj.vol // We earn money
      : -(counterpartyObj.rate * counterpartyObj.vol); // We spend money
      
    // Update Ledger
    const newTx = {
      id: `tx-${Math.floor(Math.random() * 1000)}`,
      type: type,
      node: counterpartyObj.node,
      vol: counterpartyObj.vol,
      rate: counterpartyObj.rate,
      total: Math.abs(totalTraded),
      time: new Date().toLocaleTimeString(),
      status: 'COMPLETED'
    };
    
    setLedger(prev => [newTx, ...prev].slice(0, 10));
    setWalletBalance(prev => prev + totalTraded);
    
    // Remove from orderbook
    if(type === 'SELL') {
      setMarketBids(prev => prev.filter(b => b.id !== counterpartyObj.id));
    } else {
      setMarketAsks(prev => prev.filter(a => a.id !== counterpartyObj.id));
    }
  };

  const executeGridFallback = () => {
    const deficitVolume = Math.abs(rawSurplus).toFixed(1);
    const gridRate = 0.220; // Fixed grid rate
    const cost = deficitVolume * gridRate;
    
    const newTx = {
      id: `tx-grid-${Math.floor(Math.random() * 1000)}`,
      type: 'BUY',
      node: 'MAIN_GRID',
      vol: deficitVolume,
      rate: gridRate,
      total: cost,
      time: new Date().toLocaleTimeString(),
      status: 'FALLBACK'
    };
    
    setLedger(prev => [newTx, ...prev].slice(0, 10));
    setWalletBalance(prev => prev - cost);
  };

  return (
    <div className="admin-tab-container fade-slide-up">
      <div className="tab-header mb-xl flex justify-between items-center px-lg">
        <div>
          <h1 className="flex items-center gap-md m-0">
             <Network className="text-gold" /> Prosumer P2P Exchange
          </h1>
          <p className="text-muted text-xs uppercase font-black tracking-widest mt-xs">
             Decentralized local energy marketplace with automated node matchmaking.
          </p>
        </div>
        <div className="flex items-center gap-xl">
           <div className="text-right">
              <span className="text-[10px] text-muted font-bold tracking-widest uppercase block mb-xs">Net Earnings</span>
              <span className="text-2xl font-black text-gold">${walletBalance.toFixed(2)}</span>
           </div>
           <div className="status-badge live admin-pulse">
              <span className="dot pulse bg-gold"></span>
              <span className="text-[10px] font-black tracking-widest uppercase text-gold">Market Online</span>
           </div>
        </div>
      </div>

      {/* Main Trading Interface */}
      <div className="grid-2 px-lg gap-xl" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
        
        {/* LEFT COL: Node Status & Trading Desk */}
        <div className="flex flex-col gap-lg">
          
          {/* Diagnostic Safety Constraints */}
          <div className="surface-card p-xl bg-black/40 border-gold/10">
            <h3 className="m-0 mb-md flex items-center gap-sm font-black text-xs uppercase tracking-widest">
               <Cpu size={16} className="text-gold" /> Node Diagnostics
            </h3>
            <div className="flex gap-lg items-center">
               <div className="flex-1">
                  <span className="text-xs text-muted font-bold block mb-1">Live Surplus/Deficit</span>
                  <span className={`text-2xl font-black ${isSurplus ? 'text-green-500' : 'text-red-400'}`}>
                    {isSurplus ? '+' : ''}{rawSurplus.toFixed(1)} <span className="text-sm text-muted">KW</span>
                  </span>
               </div>
               <div className="h-10 w-[1px] bg-white/10"></div>
               <div className="flex-1">
                  <span className="text-xs text-muted font-bold block mb-1">Battery Reserve Limit</span>
                  <span className="text-2xl font-black">{myNode.battery}% <span className="text-xs text-gold ml-1">Limit: {myNode.minReserve}%</span></span>
               </div>
               <div className="h-10 w-[1px] bg-white/10"></div>
               <div className="flex-1">
                  <span className="text-xs text-muted font-bold block mb-1">Exportable Payload</span>
                  <span className="text-2xl font-black text-white">{exportable > 0 ? exportable.toFixed(1) : '0.0'} <span className="text-sm text-muted">KW</span></span>
               </div>
            </div>
          </div>

          {/* Configuration Desk */}
          <div className="grid-2 gap-lg">
             {/* Sell Terminal */}
             <div className="surface-card p-xl bg-gold/5 border-gold/20 flex flex-col justify-between">
                <div>
                   <div className="flex justify-between items-center mb-md">
                     <span className="text-gold font-black text-[10px] uppercase tracking-widest flex items-center gap-1">
                       <ArrowUpRight size={14}/> Sell Configuration
                     </span>
                     {isBroadcasting && <span className="text-[10px] text-gold animate-pulse tracking-widest uppercase">{dbStatusMsg}</span>}
                     {!isBroadcasting && dbStatusMsg === "Success!" && <span className="text-[10px] text-green-500 tracking-widest uppercase flex items-center gap-1"><CheckCircle size={10}/> Synced</span>}
                   </div>
                   <p className="text-xs text-muted font-medium mb-lg">Set the minimum acceptable rate to export your surplus energy to the local network.</p>
                   
                   <div className="flex flex-col gap-sm mb-lg">
                      <div className="flex justify-between items-baseline">
                         <span className="text-[10px] text-muted font-bold">MIN SELLING PRICE ($/KWh)</span>
                         <span className="text-2xl font-black text-gold">${sellingPrice.toFixed(3)}</span>
                      </div>
                      <input 
                         type="range" 
                         min="0.050" max="0.300" step="0.005" 
                         value={sellingPrice} 
                         onChange={(e) => setSellingPrice(Number(e.target.value))}
                         className="w-full bg-black/40 h-2 rounded-full cursor-pointer" 
                         style={{ accentColor: '#BAB86C', outline: 'none' }}
                      />
                   </div>
                </div>
                {exportable > 0 ? (
                  <button 
                    onClick={handleBroadcastOffer} 
                    disabled={isBroadcasting}
                    className="bg-gold/20 text-gold border border-gold/40 hover:bg-gold/30 hover:shadow-glow-gold transition-all w-full py-md rounded-lg font-black text-xs tracking-widest uppercase"
                  >
                    Broadcast Offer
                  </button>
                ) : (
                  <button className="bg-white/5 text-white/20 border border-white/5 w-full py-md rounded-lg font-black text-xs tracking-widest uppercase cursor-not-allowed">
                    No Surplus to Match
                  </button>
                )}
             </div>

             {/* Buy Terminal */}
             <div className="surface-card p-xl bg-black/40 border-white/10 flex flex-col justify-between">
                <div>
                   <div className="flex justify-between items-center mb-md">
                     <span className="text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-1">
                       <ArrowDownRight size={14}/> Buy Configuration
                     </span>
                     {isSavingBuyLimit && <span className="text-[10px] text-white animate-pulse tracking-widest uppercase">{dbStatusMsg}</span>}
                   </div>
                   <p className="text-xs text-muted font-medium mb-lg">Set the maximum rate you are willing to pay peers before falling back to main grid.</p>
                   
                   <div className="flex flex-col gap-sm mb-lg">
                      <div className="flex justify-between items-baseline">
                         <span className="text-[10px] text-muted font-bold">MAX BUYING LIMIT ($/KWh)</span>
                         <span className="text-2xl font-black">${buyingLimit.toFixed(3)}</span>
                      </div>
                      <input 
                         type="range" 
                         min="0.050" max="0.300" step="0.005" 
                         value={buyingLimit} 
                         onChange={(e) => setBuyingLimit(Number(e.target.value))}
                         className="w-full bg-white/20 h-2 rounded-full cursor-pointer" 
                         style={{ accentColor: '#ffffff', outline: 'none' }}
                      />
                   </div>
                </div>
                <button 
                  onClick={handleSaveBuyLimit} 
                  disabled={isSavingBuyLimit}
                  className="bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all w-full py-md rounded-lg font-black text-xs tracking-widest uppercase mt-4"
                >
                  Lock Buy Limit
                </button>
             </div>
          </div>
          
        </div>

        {/* RIGHT COL: Order Book Marketplace */}
        <div className="surface-card p-0 bg-black/40 border-gold/10 overflow-hidden flex flex-col">
          <div className="p-lg bg-black/60 border-b border-white/5 flex justify-between items-center">
             <h3 className="m-0 flex items-center gap-sm font-black text-xs uppercase tracking-widest">
                <Activity size={16} className="text-gold" /> Live Network Order Book
             </h3>
             <label className="flex items-center gap-sm cursor-pointer">
               <span className={`text-[10px] font-black uppercase tracking-widest ${autoTrade ? 'text-gold pulse-slow' : 'text-muted'}`}>Auto Trading Engine</span>
               <div className={`relative w-10 h-5 rounded-full transition-colors ${autoTrade ? 'bg-gold/40' : 'bg-white/10'}`}>
                 <input type="checkbox" className="hidden" checked={autoTrade} onChange={() => setAutoTrade(!autoTrade)} />
                 <div className={`absolute top-1 w-3 h-3 rounded-full transition-all ${autoTrade ? 'left-6 bg-gold shadow-glow-gold' : 'left-1 bg-white/40'}`}></div>
               </div>
             </label>
          </div>

          <div className="p-lg flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-xl">
             
             {/* Bids (Buyers seeking energy) */}
             <div>
                <span className="text-[10px] text-green-500 font-black tracking-widest uppercase block mb-md">Peer Network Bids (Seeking to Buy)</span>
                <div className="flex flex-col gap-1">
                  {marketBids.map((bid, i) => (
                    <div key={bid.id} className="flex justify-between items-center p-sm bg-green-500/5 hover:bg-green-500/10 border border-transparent hover:border-green-500/20 rounded transition-colors group">
                       <span className="font-mono text-xs text-white/80 w-20">{bid.node}</span>
                       <span className="font-black text-xs text-muted w-16 text-right">{bid.vol} KW</span>
                       <span className="font-mono text-xs text-muted/60 w-16 text-right flex items-center justify-end gap-1"><Target size={10}/> {bid.dist}km</span>
                       <span className={`font-black text-sm w-16 text-right ${bid.rate >= sellingPrice ? 'text-green-400 group-hover:scale-110' : 'text-white/40'}`}>${bid.rate.toFixed(3)}</span>
                    </div>
                  ))}
                </div>
             </div>

             {/* Asks (Sellers offering energy) */}
             <div>
                <span className="text-[10px] text-red-500/80 font-black tracking-widest uppercase block mb-md">Peer Network Asks (Offering to Sell)</span>
                <div className="flex flex-col gap-1">
                  {marketAsks.map((ask, i) => (
                    <div key={ask.id} className="flex justify-between items-center p-sm bg-red-500/5 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded transition-colors group">
                       <span className="font-mono text-xs text-white/80 w-20">{ask.node}</span>
                       <span className="font-black text-xs text-muted w-16 text-right">{ask.vol} KW</span>
                       <span className="font-mono text-xs text-muted/60 w-16 text-right flex items-center justify-end gap-1"><Target size={10}/> {ask.dist}km</span>
                       <span className={`font-black text-sm w-16 text-right ${ask.rate <= buyingLimit ? 'text-red-400 group-hover:scale-110' : 'text-white/40'}`}>${ask.rate.toFixed(3)}</span>
                    </div>
                  ))}
                </div>
             </div>
             
          </div>
        </div>

      </div>

      {/* FULL WIDTH: Transaction Ledger */}
      <div className="px-lg mt-xl mb-2xl">
         <div className="surface-card p-0 bg-black/40 border-gold/10 overflow-hidden">
             <div className="p-lg bg-black/60 border-b border-white/5 flex justify-between items-center">
                 <h3 className="m-0 flex items-center gap-sm font-black text-xs uppercase tracking-widest">
                    <Server size={16} className="text-gold" /> P2P Contract Ledger
                 </h3>
             </div>
             <div className="p-xl">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="border-b border-white/10 uppercase text-[10px] font-black tracking-widest text-muted">
                     <th className="pb-sm pr-lg font-mono">Tx Hash</th>
                     <th className="pb-sm pr-lg">Match Node</th>
                     <th className="pb-sm pr-lg">Action</th>
                     <th className="pb-sm pr-lg text-right">Volume</th>
                     <th className="pb-sm pr-lg text-right">Settled Rate</th>
                     <th className="pb-sm pr-lg text-right">Net Return</th>
                     <th className="pb-sm pl-lg">Status</th>
                   </tr>
                 </thead>
                 <tbody>
                   {ledger.map((tx, idx) => (
                     <tr key={tx.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                       <td className="py-md pr-lg font-mono text-xs text-muted font-bold tracking-wider">{tx.id}</td>
                       <td className="py-md pr-lg font-mono text-xs text-white">{tx.node}</td>
                       <td className="py-md pr-lg">
                          {tx.type === 'SELL' ? 
                            <span className="text-[10px] text-green-500 font-bold bg-green-500/10 px-2 py-1 rounded inline-flex items-center gap-1"><TrendingUp size={10}/> SELL</span> : 
                            <span className="text-[10px] text-blue-400 font-bold bg-blue-400/10 px-2 py-1 rounded inline-flex items-center gap-1"><TrendingDown size={10}/> BUY</span>
                          }
                       </td>
                       <td className="py-md pr-lg font-black text-sm text-right">{tx.vol.toFixed(1)} KW</td>
                       <td className="py-md pr-lg font-black text-sm text-right text-muted">${tx.rate.toFixed(3)}</td>
                       <td className={`py-md pr-lg font-black text-sm text-right ${tx.type === 'SELL' ? 'text-gold shadow-glow-gold' : 'text-white'}`}>
                          {tx.type === 'SELL' ? '+' : '-'}${tx.total.toFixed(2)}
                       </td>
                       <td className="py-md pl-lg text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                          {tx.status === 'FALLBACK' ? 
                            <span className="text-orange-400 flex items-center gap-1"><ShieldCheck size={12}/> {tx.status}</span> :
                            <span className="text-green-500 flex items-center gap-1"><CheckCircle size={12}/> {tx.status}</span>
                          }
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
         </div>
      </div>

    </div>
  );
};

export default EnergySharing;
