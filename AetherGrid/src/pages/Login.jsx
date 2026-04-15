import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Shield, UserRound } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Safety check: Fallback if Supabase is offline/unconfigured
    if (!supabase) {
      console.warn("Supabase is not configured. Falling back to local check.");
      if (email === '1' && password === '1') {
        localStorage.setItem('userRole', 'user');
        localStorage.setItem('userName', 'User');
        localStorage.setItem('userEmail', email);
        navigate('/user/dashboard');
        return;
      }
      if (email === '2' && password === '2') {
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userName', 'Admin User');
        localStorage.setItem('userEmail', email);
        navigate('/admin/dashboard');
        return;
      }
      alert("Supabase is offline. Use '1/1' or '2/2' for local testing.");
      return;
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', email)
      .eq('password', password)
      .single();

    if (error || !data) {
      alert("Invalid credentials. Try '1' for User or '2' for Admin.");
      return;
    }

    if (data.role === 'admin') {
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userName', 'Admin User');
      localStorage.setItem('userEmail', email);
      navigate('/admin/dashboard');
    } else {
      localStorage.setItem('userRole', 'user');
      localStorage.setItem('userName', 'User');
      localStorage.setItem('userEmail', email);
      navigate('/user/dashboard');
    }
  };

  return (
    <div className="login-screen">
      <div className={`login-shell ${role}`}>
        <div className="role-toggle" role="tablist" aria-label="Role toggle">
          <button type="button" className={role === 'user' ? 'active' : ''} onClick={() => setRole('user')}>
            <UserRound size={16} /> User
          </button>
          <button type="button" className={role === 'admin' ? 'active' : ''} onClick={() => setRole('admin')}>
            <Shield size={16} /> Admin
          </button>
        </div>

        <h1>{role === 'admin' ? 'Admin Control Login' : 'User Energy Login'}</h1>
        <p>Secure access to the AetherGrid command environment.</p>

        <form onSubmit={handleSubmit}>
          <label>
            Email
            <div className="field">
              <Mail size={16} />
              <input
                type="text"
                required
                placeholder={role === 'admin' ? 'admin@aethergrid.io' : 'user@aethergrid.io'}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </label>

          <label>
            Password
            <div className="field">
              <Lock size={16} />
              <input
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </label>

          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>

        <button type="button" className="back-link" onClick={() => navigate('/about')}>
          Back to About
        </button>
      </div>
    </div>
  );
}

export default Login;
