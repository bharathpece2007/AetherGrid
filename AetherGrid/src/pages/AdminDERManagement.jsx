import React from 'react';
import { Database, Zap, ShieldCheck } from 'lucide-react';
import './Admin.css';

const AdminDERManagement = () => {
  return (
    <div className="admin-tab-container fade-slide-up">
      <div className="tab-header mb-xl">
        <div>
          <h1>DER Management</h1>
          <p className="text-muted">Distributed Energy Resource master node summary.</p>
        </div>
      </div>

      <div className="grid-2 gap-xl">
        <div className="surface-card p-xl flex flex-col items-center justify-center text-center">
          <Database size={48} className="text-blue mb-md opacity-30" />
          <h3 className="m-0">Table View Decommissioned</h3>
          <p className="text-muted text-sm mt-md max-w-xs">
            The detailed tabular registry has been moved to the <strong>Dataset Explorer</strong> for advanced visual processing.
          </p>
        </div>

        <div className="surface-card p-xl">
          <div className="flex items-center gap-md mb-lg">
            <ShieldCheck size={24} className="text-green" />
            <h3 className="m-0">Node Integrity</h3>
          </div>
          <div className="flex flex-col gap-md">
            <div className="flex justify-between items-center p-md bg-subtle rounded-md">
              <span className="text-sm font-bold">MONITORED NODES</span>
              <span className="text-xl font-bold font-mono">4,192</span>
            </div>
            <div className="flex justify-between items-center p-md bg-subtle rounded-md">
              <span className="text-sm font-bold">SYSTEM UPTIME</span>
              <span className="text-xl font-bold font-mono text-green">99.98%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDERManagement;
