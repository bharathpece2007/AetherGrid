import React from 'react';
import { CreditCard, Download, Printer, QrCode } from 'lucide-react';
import './Admin.css';

const AdminBilling = ({ theme }) => {
  const billData = {
    consumerId: "RES-4421",
    consumerName: "Mysuru Residential Node 8",
    transactionId: "TXN-00991823",
    period: {
      previous: "22/06/24",
      present: "22/07/24"
    },
    reading: {
      previous: 2450,
      present: 2685,
      adjustment: 0,
      totalUnits: 235,
      maxDemand: 2.10
    },
    payable: [
      { dueDate: "01/08/2024", amountBefore: 1842.00, amountAfter: 1910.00 },
    ],
    rebate: 45.50,
    totalPayable: 1796.50
  };

  return (
    <div className="admin-tab-container fade-slide-up h-full flex flex-col">
      {/* Tactical Header */}
      <div className="tab-header mb-xl flex justify-between items-center px-lg">
        <div>
          <h1 className="flex items-center gap-md m-0">
             <CreditCard className="text-gold" /> Node Invoice Hub
          </h1>
          <p className="text-muted text-xs uppercase font-black tracking-widest mt-xs">
            Viewing authenticated residential electricity artifacts for the Mysuru sector.
          </p>
        </div>
        <div className="flex gap-md">
           <button className="bg-white/5 border border-white/10 p-md rounded-xl text-white hover:border-gold transition-all flex items-center gap-sm font-black text-[10px] uppercase cursor-pointer">
              <Printer size={14} className="text-gold" /> Print Artifact
           </button>
           <button className="bg-gold text-black p-md rounded-xl hover:shadow-glow-gold transition-all flex items-center gap-sm font-black text-[10px] uppercase cursor-pointer">
              <Download size={14} /> Save Locally
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex items-center justify-center p-2xl">
        {/* PHYSICAL BILL REPLICA - FORCED WHITE THEME FOR REALISM */}
        <div 
          className="w-[580px] rounded-sm overflow-hidden flex flex-col relative font-mono shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
          style={{ 
            border: '8px solid #BAB86C', 
            background: '#ffffff', 
            color: '#000000',
            padding: '40px'
          }}
        >
          {/* Header Section */}
          <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-8">
             <div className="flex flex-col gap-1">
                <span className="font-bold text-[10px] uppercase tracking-tight opacity-60">AetherGrid Power Intelligence</span>
                <span className="text-2xl font-black tracking-tighter">TAX INVOICE [RES]</span>
                <div className="mt-4">
                   <span className="text-[10px] font-bold uppercase opacity-50 block">Customer ID</span>
                   <span className="text-lg font-bold">{billData.consumerId}</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-gray-700">{billData.consumerName}</span>
             </div>
             <div className="text-right flex flex-col gap-1">
                <span className="font-bold text-[10px] uppercase opacity-60">Residential Sector</span>
                <div className="mt-4">
                   <span className="text-[10px] font-bold uppercase opacity-50 block">Transaction ID</span>
                   <span className="text-base font-bold">{billData.transactionId}</span>
                </div>
                <span className="text-[11px] font-bold text-gray-900 mt-2">DATED: 16-APR-2026</span>
             </div>
          </div>

          {/* Meter Readings Table */}
          <div className="flex flex-col gap-4 mb-10">
             <div className="grid grid-cols-3 text-[10px] font-black border-b border-black pb-2 opacity-70">
                <span>METER DESCRIPTION</span>
                <span className="text-center">READING DATE</span>
                <span className="text-right">UNITS (KWH)</span>
             </div>
             <div className="grid grid-cols-3 items-center text-xs py-1">
                <span className="uppercase font-bold">PREVIOUS READING</span>
                <span className="text-center">{billData.period.previous}</span>
                <span className="text-right font-bold">{billData.reading.previous}</span>
             </div>
             <div className="grid grid-cols-3 items-center text-xs py-1">
                <span className="uppercase font-bold">CURRENT READING</span>
                <span className="text-center">{billData.period.present}</span>
                <span className="text-right font-bold">{billData.reading.present}</span>
             </div>
             <div className="grid grid-cols-3 items-center border-y-2 border-black py-4 mt-2 font-black bg-gray-50">
                <span className="uppercase text-sm">TOTAL CONSUMPTION</span>
                <span></span>
                <span className="text-right text-xl">{billData.reading.totalUnits} UNITS</span>
             </div>
             <div className="flex justify-between items-center text-[10px] italic px-2 font-bold text-gray-500">
                <span className="uppercase tracking-tighter">MAXIMUM GRID DEMAND RECORDED</span>
                <span className="font-mono">{billData.reading.maxDemand.toFixed(2)} KVA</span>
             </div>
          </div>

          {/* Billing Summary Section */}
          <div className="flex flex-col gap-4 mb-2">
             <h3 className="m-0 font-black text-center text-sm uppercase tracking-[0.3em] border-b-2 border-black pb-3">BILLING SUMMARY</h3>
             <div className="flex flex-col gap-3">
                <div className="grid grid-cols-3 text-[10px] font-bold opacity-40 border-b border-black/10 pb-2">
                   <span>DUE DATE</span>
                   <span className="text-center">WITH REBATE</span>
                   <span className="text-right">FULL AMOUNT</span>
                </div>
                {billData.payable.map((p, idx) => (
                   <div key={idx} className="grid grid-cols-3 items-center py-2">
                      <span className="font-bold text-sm tracking-tighter">{p.dueDate}</span>
                      <span className="text-center font-black text-xl">₹ {p.amountBefore.toFixed(2)}</span>
                      <span className="text-right text-gray-500 font-bold">₹ {p.amountAfter.toFixed(2)}</span>
                   </div>
                ))}
             </div>
          </div>

          {/* Economic Calculation */}
          <div className="flex flex-col gap-2 border-t-2 border-black pt-6 mt-4">
             <div className="flex justify-between items-center text-[11px] px-2 italic font-bold">
                <span className="uppercase tracking-tight text-gray-600">Solar Grid Feed-in Rebate Applied</span>
                <span className="font-black text-red-600">- ₹ {billData.rebate.toFixed(2)}</span>
             </div>
             <div className="bg-black text-white p-6 mt-4 flex justify-between items-center shadow-2xl skew-x-[-2deg]">
                <div className="flex flex-col">
                   <span className="font-bold text-[10px] uppercase tracking-widest opacity-60">NET PAYABLE AMOUNT</span>
                   <span className="font-bold text-xs uppercase tracking-tighter italic">Valid for electronic settlement</span>
                </div>
                <span className="font-bold text-4xl tracking-tighter">₹ {billData.totalPayable.toFixed(2)}</span>
             </div>
          </div>

          {/* Footer Logistics */}
          <div className="mt-12 flex items-end justify-between border-t border-black pt-8 border-dashed">
             <div className="flex gap-6 items-center">
                <div className="p-2 bg-white border-2 border-black rotate-3">
                   <QrCode size={70} className="text-black" />
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-black uppercase italic tracking-widest underline">AUTHENTICATION HUB</span>
                   <p className="m-0 text-[10px] font-bold text-gray-600 max-w-[220px] leading-tight">
                      This is a computer generated artifact and requires no physical signature. Verified by AetherGrid Security Protocol 7.2.
                   </p>
                </div>
             </div>
             <span className="text-[120px] font-black absolute -bottom-10 -left-6 text-black/[0.04] pointer-events-none -rotate-12 z-0">
                OFFICIAL
             </span>
             <div className="text-right z-10">
                <span className="text-[10px] font-bold uppercase block opacity-60">Digital Settlement Portal</span>
                <span className="text-[9px] font-black border border-black px-2 py-1 mt-1 block">SCAN TO SETTLE NOW</span>
             </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .font-mono {
            font-family: 'Courier New', Courier, monospace !important;
        }
        .skew-x-[-2deg] {
            transform: skewX(-2deg);
        }
      `}</style>
    </div>
  );
};

export default AdminBilling;
