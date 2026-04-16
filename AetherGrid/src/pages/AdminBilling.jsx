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
        {/* PORTRAIT BILL - LIGHT GREY PAPER STYLE */}
        <div
          style={{
            width: '520px',
            background: '#e6e5dc',
            border: '3px solid #7a8a3c',
            padding: '32px 36px',
            color: '#1a1a1a',
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '13px',
            lineHeight: '1.7',
            boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
          }}
        >
          {/* HEADER */}
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '15px', letterSpacing: '0.5px' }}>
              AetherGrid Power Intelligence
            </div>
            <div style={{ fontSize: '13px' }}>TAX INVOICE [RES]</div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #7a8a3c', margin: '12px 0' }} />

          {/* CUSTOMER / TRANSACTION INFO */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
            <span>Customer IDRES-4421</span>
            <span style={{ textAlign: 'right' }}>Residential Sector</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
            <span>{billData.consumerName}</span>
            <span style={{ textAlign: 'right' }}>Transaction IDTXN-00991823</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <span>DATED: 16-APR-2026</span>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #7a8a3c', margin: '12px 0' }} />

          {/* METER DETAILS */}
          <div style={{ fontWeight: 'bold', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
            Meter Details
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Courier New', Courier, monospace", fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #aaa' }}>
                <th style={{ textAlign: 'left', fontWeight: 'bold', padding: '2px 0' }}>METER DESCRIPTION</th>
                <th style={{ textAlign: 'center', fontWeight: 'bold', padding: '2px 0' }}>READING DATE</th>
                <th style={{ textAlign: 'right', fontWeight: 'bold', padding: '2px 0' }}>UNITS (KWH)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '2px 0' }}>PREVIOUS READING</td>
                <td style={{ textAlign: 'center', padding: '2px 0' }}>{billData.period.previous}</td>
                <td style={{ textAlign: 'right', padding: '2px 0' }}>{billData.reading.previous}</td>
              </tr>
              <tr>
                <td style={{ padding: '2px 0' }}>CURRENT READING</td>
                <td style={{ textAlign: 'center', padding: '2px 0' }}>{billData.period.present}</td>
                <td style={{ textAlign: 'right', padding: '2px 0' }}>{billData.reading.present}</td>
              </tr>
              <tr>
                <td style={{ padding: '2px 0' }}>TOTAL CONSUMPTION</td>
                <td></td>
                <td style={{ textAlign: 'right', padding: '2px 0' }}>{billData.reading.totalUnits} UNITS</td>
              </tr>
              <tr>
                <td style={{ padding: '2px 0' }}>MAXIMUM GRID DEMAND RECORDED</td>
                <td></td>
                <td style={{ textAlign: 'right', padding: '2px 0' }}>{billData.reading.maxDemand.toFixed(2)} KVA</td>
              </tr>
            </tbody>
          </table>

          <hr style={{ border: 'none', borderTop: '1px solid #7a8a3c', margin: '12px 0' }} />

          {/* BILLING SUMMARY */}
          <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '15px', margin: '4px 0 10px 0', letterSpacing: '1px' }}>
            BILLING SUMMARY
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', padding: '2px 0' }}>
            <span>DUE DATE WITH REBATE</span>
            <span>FULL AMOUNT</span>
          </div>
          {billData.payable.map((p, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
              <span>{p.dueDate}&nbsp;&nbsp;&nbsp;&#8377; {p.amountBefore.toFixed(2)}</span>
              <span>&#8377; {p.amountAfter.toFixed(2)}</span>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0 2px 0' }}>
            <span>Solar Grid Feed-in Rebate Applied</span>
            <span>- &#8377; {billData.rebate.toFixed(2)}</span>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #7a8a3c', margin: '10px 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', padding: '2px 0' }}>
            <span>NET PAYABLE AMOUNT</span>
            <span>&#8377; {billData.totalPayable.toFixed(2)}</span>
          </div>
          <div style={{ fontSize: '11px', marginTop: '4px' }}>Valid for electronic settlement</div>

          <hr style={{ border: 'none', borderTop: '1px solid #7a8a3c', margin: '12px 0' }} />

          {/* FOOTER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              {/* Simple HTML block simulated QR code */}
              <div style={{ fontSize: '36px', lineHeight: '1', letterSpacing: '-2px', fontFamily: 'monospace' }}>
                &#9647;&#9646;<br/>&#9646;&#9647;<br/>&#9647;&#9646;
              </div>
              <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
                <strong>AUTHENTICATION HUB</strong>
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '12px', lineHeight: '1.7' }}>
              <div>OFFICIAL Digital Settlement Portal</div>
              <div><strong>SCAN TO SETTLE NOW</strong></div>
            </div>
          </div>

          <div style={{ fontSize: '10.5px', marginTop: '10px', lineHeight: '1.6', color: '#333' }}>
            This is a computer generated artifact and requires no physical signature. Verified by AetherGrid Security Protocol 7.2.
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
