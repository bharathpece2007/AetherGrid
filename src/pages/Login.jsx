import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, UserCircle2 } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login and navigate to dashboard
    navigate('/');
  };

  return (
    <div className="login-container">
      <ParticleBackground />
      <div className="login-card">
        
        {/* Top-Right About Tab */}
        <div className="about-tab">
          <img 
            src="/elemental-icon.png" 
            alt="Elemental Icon" 
            className="elemental-icon"
          />
          <span>About</span>
        </div>

        {/* Overlapping User Circle */}
        <div className="user-circle">
          <UserCircle2 size={56} color="#fff" />
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          
          <div className="input-group">
            <input type="text" placeholder="User ID" required />
            <User size={20} className="input-icon" />
          </div>

          <div className="input-group">
            <input type="password" placeholder="Password" required />
            <Lock size={20} className="input-icon" />
          </div>

          <button type="submit" className="login-btn">
            LOGIN
          </button>
          
          <div className="forgot-password">
            <span>Forgot </span><a href="#" className="font-bold">Password ?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
