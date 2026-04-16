import React, { useState, useEffect } from 'react';
import { 
  User, Shield, Palette, Save, CheckCircle, 
  Trash2, Mail, Lock, Bell, Eye, EyeOff, LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Settings = ({ theme }) => {
  const navigate = useNavigate();
  const [activeInternalTab, setActiveInternalTab] = useState('account');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Account State
  const [profile, setProfile] = useState({
    name: localStorage.getItem('userName') || 'Demo User',
    email: localStorage.getItem('userEmail') || 'user@aethergrid.io',
    role: localStorage.getItem('userRole') || 'user'
  });

  // Security State
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  // Appearance State
  const [intensity, setIntensity] = useState(localStorage.getItem('radiantIntensity') || 'high');

  const handleSave = () => {
    setIsSaving(true);
    // Simulate backend call
    setTimeout(() => {
      localStorage.setItem('userName', profile.name);
      localStorage.setItem('userEmail', profile.email);
      localStorage.setItem('radiantIntensity', intensity);
      
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("ARE YOU SURE? This action will permanently terminate your AetherGrid node access and wipe all telemetry history.")) {
      setIsSaving(true);
      setTimeout(() => {
        localStorage.clear();
        navigate('/login');
      }, 2000);
    }
  };

  const renderAccount = () => (
    <div className="settings-section fade-in">
      <h3 className="section-title">Profile Configuration</h3>
      <div className="settings-grid">
        <div className="input-group">
          <label>Display Name</label>
          <div className="tactical-input-wrapper">
             <User size={16} />
             <input 
               type="text" 
               value={profile.name} 
               onChange={(e) => setProfile({...profile, name: e.target.value})}
               placeholder="Enter full name"
             />
          </div>
        </div>
        <div className="input-group">
          <label>Access Email</label>
          <div className="tactical-input-wrapper">
             <Mail size={16} />
             <input 
               type="email" 
               value={profile.email} 
               onChange={(e) => setProfile({...profile, email: e.target.value})}
               placeholder="email@aethergrid.io"
             />
          </div>
        </div>
      </div>
      <div className="role-indicator">
        <Shield size={14} />
        <span>Current Permissions: <strong>{profile.role.toUpperCase()}</strong></span>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="settings-section fade-in">
      <h3 className="section-title">Security & Credentials</h3>
      <div className="settings-grid">
        <div className="input-group full-width">
          <label>Current Password</label>
          <div className="tactical-input-wrapper">
             <Lock size={16} />
             <input 
               type={showPassword ? "text" : "password"} 
               value={passwords.current}
               onChange={(e) => setPasswords({...passwords, current: e.target.value})}
               placeholder="••••••••"
             />
             <button className="utility-peek" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
             </button>
          </div>
        </div>
        <div className="input-group">
          <label>New Password</label>
          <div className="tactical-input-wrapper">
             <Lock size={16} />
             <input type="password" placeholder="Min 8 characters" />
          </div>
        </div>
        <div className="input-group">
          <label>Confirm Password</label>
          <div className="tactical-input-wrapper">
             <Lock size={16} />
             <input type="password" placeholder="Verify password" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="settings-section fade-in">
      <h3 className="section-title">Visual Experience</h3>
      <div className="appearance-options">
        <div className="intensity-selector">
           <label>Radiant Border Intensity</label>
           <div className="tactical-toggle-group">
              {['low', 'medium', 'high'].map(level => (
                <button 
                  key={level}
                  className={intensity === level ? 'active' : ''}
                  onClick={() => setIntensity(level)}
                >
                  {level.toUpperCase()}
                </button>
              ))}
           </div>
        </div>
        <div className="theme-preview">
           <div className={`preview-box ${theme}`}>
              <div className="preview-header"></div>
              <div className="preview-body"></div>
           </div>
           <p className="text-muted text-[10px] mt-sm uppercase font-black">Current Mode: {theme.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-tab-container fade-slide-up">
      <div className="tab-header mb-xl px-lg">
        <h1 className="flex items-center gap-md m-0">
          <Palette className="text-gold" /> System Settings
        </h1>
        <p className="text-muted text-xs uppercase font-black tracking-widest mt-xs">
          Manage your account preferences and global interface parameters.
        </p>
      </div>

      <div className="settings-layout px-lg">
        <div className="settings-tabs-nav surface-card p-sm mb-xl">
           <button 
             className={activeInternalTab === 'account' ? 'active' : ''} 
             onClick={() => setActiveInternalTab('account')}
           >
             <User size={16} /> Account
           </button>
           <button 
             className={activeInternalTab === 'security' ? 'active' : ''} 
             onClick={() => setActiveInternalTab('security')}
           >
             <Shield size={16} /> Security
           </button>
           <button 
             className={activeInternalTab === 'appearance' ? 'active' : ''} 
             onClick={() => setActiveInternalTab('appearance')}
           >
             <Palette size={16} /> Appearance
           </button>
        </div>

        <div className="settings-content-area surface-card p-2xl">
           {activeInternalTab === 'account' && renderAccount()}
           {activeInternalTab === 'security' && renderSecurity()}
           {activeInternalTab === 'appearance' && renderAppearance()}
           
           <div className="settings-footer mt-2xl pt-xl border-t border-white/10 flex justify-between items-center">
              <button className="danger-zone-btn" onClick={handleDeleteAccount}>
                 <Trash2 size={16} /> Delete Account
              </button>
              <button 
                className={`save-btn ${isSaving ? 'loading' : ''} ${showSuccess ? 'success' : ''}`}
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <span className="flex items-center gap-sm">Saving...</span>
                ) : showSuccess ? (
                  <span className="flex items-center gap-sm"><CheckCircle size={18} /> Changes Saved</span>
                ) : (
                  <span className="flex items-center gap-sm"><Save size={18} /> Save Settings</span>
                )}
              </button>
           </div>
        </div>
      </div>

      <style>{`
        .settings-tabs-nav {
          display: flex;
          gap: 10px;
          background: rgba(255,255,255,0.02);
          border-radius: 12px;
        }
        .settings-tabs-nav button {
          background: none;
          border: none;
          color: rgba(255,255,255,0.5);
          padding: 12px 24px;
          cursor: pointer;
          font-weight: 800;
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        .settings-tabs-nav button.active {
          background: #BAB86C22;
          color: #BAB86C;
        }
        .section-title {
          margin: 0 0 30px 0;
          font-size: 18px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 900;
        }
        .settings-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
        }
        .input-group label {
          display: block;
          margin-bottom: 10px;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.1em;
        }
        .tactical-input-wrapper {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          display: flex;
          align-items: center;
          padding: 0 15px;
          transition: all 0.3s ease;
        }
        .tactical-input-wrapper:focus-within {
          border-color: #BAB86C55;
          background: rgba(255,255,255,0.05);
          box-shadow: 0 0 20px rgba(186,184,108,0.1);
        }
        .tactical-input-wrapper input {
          background: none;
          border: none;
          padding: 15px;
          color: #fff;
          font-family: inherit;
          width: 100%;
          outline: none;
          font-size: 14px;
        }
        .tactical-input-wrapper svg {
          color: rgba(255,255,255,0.3);
        }
        .role-indicator {
          margin-top: 30px;
          padding: 15px;
          background: rgba(186,184,108,0.05);
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          color: #BAB86C;
        }
        .tactical-toggle-group {
          background: rgba(0,0,0,0.3);
          padding: 5px;
          border-radius: 10px;
          display: inline-flex;
          gap: 5px;
          margin-top: 10px;
        }
        .tactical-toggle-group button {
          background: none;
          border: none;
          color: rgba(255,255,255,0.4);
          padding: 8px 16px;
          font-size: 10px;
          font-weight: 900;
          cursor: pointer;
          border-radius: 6px;
        }
        .tactical-toggle-group button.active {
          background: #BAB86C;
          color: #000;
        }
        .save-btn {
          background: #BAB86C;
          color: #000;
          border: none;
          padding: 16px 32px;
          border-radius: 14px;
          font-weight: 900;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .save-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(186,184,108,0.3);
        }
        .save-btn.success {
          background: #22c55e;
        }
        .danger-zone-btn {
          background: none;
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
          padding: 12px 20px;
          border-radius: 10px;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .danger-zone-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          border-color: #ef4444;
        }
      `}</style>
    </div>
  );
};

export default Settings;
