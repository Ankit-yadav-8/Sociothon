import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { Recycle, Mail, Lock, ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import './AuthPages.css';

import { platformStore } from '../services/platformStore';

const DEMO_USERS = {
  'admin@ecoloop.in': { name: 'Priya Sharma', role: 'admin', email: 'admin@ecoloop.in', avatar: 'PS' },
  'collector@ecoloop.in': { name: 'Ramesh Kumar', role: 'collector', email: 'collector@ecoloop.in', avatar: 'RK', collectorId: 'COL-2026-KABADI-01' },
  'volunteer@ecoloop.in': { name: 'Ananya Deshmukh', role: 'volunteer', email: 'volunteer@ecoloop.in', avatar: 'AD', volunteerId: 'VOL-2026-E47A91BC' },
  'recycler@ecoloop.in': { name: 'Reliance Circular Industries', role: 'recycler', email: 'recycler@ecoloop.in', avatar: 'RC', recyclerId: 'REC-001' },
  'hostel@ecoloop.in': { name: 'Rajendra Bhawan Mess', role: 'hostel', email: 'hostel@ecoloop.in', avatar: 'RB' },
  'ngo@ecoloop.in': { name: 'Green Earth Foundation', role: 'ngo', email: 'ngo@ecoloop.in', avatar: 'GE' },
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, getDashboardPath } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate auth network response
    await new Promise(r => setTimeout(r, 600));
    
    // Check platformStore users first, then fall back to DEMO_USERS
    const storeUser = platformStore.getUserByEmail(email.toLowerCase());
    const demoUser = DEMO_USERS[email.toLowerCase()];
    const user = storeUser || demoUser;

    if (user && password.length >= 4) {
      login(user);
      toast.success(`Welcome back, ${user.name}!`);
      navigate(getDashboardPath(user.role));
    } else {
      toast.error('Invalid credentials. Try a demo account below.');
    }
    setLoading(false);
  };

  const quickLogin = (userEmail) => {
    const storeUser = platformStore.getUserByEmail(userEmail.toLowerCase());
    const user = storeUser || DEMO_USERS[userEmail];
    login(user);
    toast.success(`Welcome, ${user.name}!`);
    navigate(getDashboardPath(user.role));
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-orb auth-orb-1"></div>
        <div className="auth-orb auth-orb-2"></div>
      </div>

      <div className="auth-container">
        {/* Left Panel */}
        <div className="auth-hero">
          <Link to="/" className="auth-logo">
            <div className="logo-icon"><Recycle size={24} /></div>
            <span className="logo-text">Campus<span className="gradient-text">Waste</span></span>
          </Link>
          
          <div className="auth-hero-content">
            <h2>Welcome Back to<br /><span className="gradient-text">Campus Waste</span></h2>
            <p>Sign in to continue managing your recycling operations, track impact, and contribute to the circular economy.</p>
            
            <div className="auth-features">
              {['AI Waste Scanner', 'Real-time Analytics', 'Instant UPI Payments', 'EPR Compliance'].map((f, i) => (
                <div key={i} className="auth-feature">
                  <Sparkles size={14} />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="auth-hero-visual">
            <div className="hero-circles">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
              <div className="circle circle-3"></div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="auth-form-panel">
          <div className="auth-form-wrapper">
            <div className="auth-form-header">
              <h1>Sign In</h1>
              <p>Enter your credentials to access your dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} />
                  <input
                    type="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-with-icon">
                  <Lock size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="input-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-row">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="form-link">Forgot password?</a>
              </div>

              <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
                {loading ? (
                  <div className="spinner"></div>
                ) : (
                  <>Sign In <ArrowRight size={18} /></>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>Quick Demo Access</span>
            </div>

            <div className="demo-accounts">
              {Object.entries(DEMO_USERS).map(([email, user]) => (
                <button key={email} className="demo-account-btn" onClick={() => quickLogin(email)}>
                  <div className={`avatar avatar-sm bg-${user.role}`}>{user.avatar}</div>
                  <div className="demo-account-info">
                    <span className="demo-account-name">{user.name}</span>
                    <span className="demo-account-role">{user.role}</span>
                  </div>
                  <ArrowRight size={14} />
                </button>
              ))}
            </div>

            <p className="auth-switch">
              Don't have an account? <Link to="/signup">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
