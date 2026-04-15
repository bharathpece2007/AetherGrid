import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, UserCircle2 } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Role-based logic
    if (userId === '11') {
      localStorage.setItem('userRole', 'user');
      localStorage.setItem('userName', 'User');
      localStorage.setItem('userEmail', 'user@aethergrid.com');
      navigate('/');
    } else if (userId === '22') {
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userName', 'Admin User');
      localStorage.setItem('userEmail', 'admin@aethergrid.com');
      navigate('/admin');
    } else {
      localStorage.setItem('userRole', 'guest');
      localStorage.setItem('userName', 'Guest User');
      localStorage.setItem('userEmail', 'guest@aethergrid.com');
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <ParticleBackground />
      <div className="login-card">
        
        {/* Top-Right About Tab */}
        <div className="about-tab" onClick={() => navigate('/about')} role="button" tabIndex={0}>
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
            <input 
              type="text" 
              placeholder="User ID" 
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required 
            />
            <User size={20} className="input-icon" />
          </div>

          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
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
