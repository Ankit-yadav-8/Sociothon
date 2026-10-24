import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { Recycle, Mail, Lock, User, ArrowRight, Eye, EyeOff, Building2, Users, Shield, Award, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import './AuthPages.css';

const ROLES = [
  { value: 'admin', label: 'Admin', icon: Shield, desc: 'Platform administrator' },
  { value: 'ngo', label: 'NGO Partner', icon: Building2, desc: 'Organization managing campaigns' },
  { value: 'volunteer', label: 'Volunteer', icon: Users, desc: 'Collection volunteer / agent' },
  { value: 'hostel', label: 'Hostel / Institution', icon: Award, desc: 'Institutional waste manager' },
];

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'volunteer', phone: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { login, getDashboardPath } = useAuth();
  const navigate = useNavigate();

  const update = (key, val) => setFormData(p => ({ ...p, [key]: val }));

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    
    const user = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      avatar: formData.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    };
    
    login(user);
    toast.success(`Welcome to EcoLoop, ${user.name}! 🎉`);
    navigate(getDashboardPath(user.role));
    setLoading(false);
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
            <span className="logo-text">Eco<span className="gradient-text">Loop</span></span>
          </Link>
          
          <div className="auth-hero-content">
            <h2>Join the<br /><span className="gradient-text">Circular Economy</span></h2>
            <p>Create your account and start making an impact. Turn waste into wealth with AI-powered recycling technology.</p>
            
            <div className="auth-features">
              {['Free to join', 'Instant payments', 'AI-powered tools', 'Government compliance'].map((f, i) => (
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
              <h1>Create Account</h1>
              <p>Step {step} of 2 — {step === 1 ? 'Choose your role' : 'Enter your details'}</p>
              <div className="step-progress">
                <div className={`step-dot ${step >= 1 ? 'active' : ''}`}></div>
                <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
                <div className={`step-dot ${step >= 2 ? 'active' : ''}`}></div>
              </div>
            </div>

            {step === 1 ? (
              <div className="role-selection">
                {ROLES.map(r => (
                  <button
                    key={r.value}
                    className={`role-select-card ${formData.role === r.value ? 'selected' : ''}`}
                    onClick={() => update('role', r.value)}
                  >
                    <div className="role-select-icon">
                      <r.icon size={24} />
                    </div>
                    <div className="role-select-info">
                      <span className="role-select-label">{r.label}</span>
                      <span className="role-select-desc">{r.desc}</span>
                    </div>
                    <div className="role-select-check">
                      {formData.role === r.value && <div className="check-dot"></div>}
                    </div>
                  </button>
                ))}
                <button className="btn btn-primary btn-lg auth-submit" onClick={() => setStep(2)}>
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSignup} className="auth-form">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <div className="input-with-icon">
                    <User size={18} />
                    <input type="text" className="form-input" placeholder="Enter your full name"
                      value={formData.name} onChange={e => update('name', e.target.value)} required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="input-with-icon">
                    <Mail size={18} />
                    <input type="email" className="form-input" placeholder="you@example.com"
                      value={formData.email} onChange={e => update('email', e.target.value)} required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-with-icon">
                    <Lock size={18} />
                    <input type={showPassword ? 'text' : 'password'} className="form-input"
                      placeholder="Create a strong password"
                      value={formData.password} onChange={e => update('password', e.target.value)} required />
                    <button type="button" className="input-toggle" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="form-row">
                  <label className="checkbox-label">
                    <input type="checkbox" required />
                    <span>I agree to the <a href="#" className="form-link">Terms & Privacy</a></span>
                  </label>
                </div>

                <div className="form-buttons">
                  <button type="button" className="btn btn-secondary btn-lg" onClick={() => setStep(1)}>Back</button>
                  <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
                    {loading ? <div className="spinner"></div> : <>Create Account <ArrowRight size={18} /></>}
                  </button>
                </div>
              </form>
            )}

            <p className="auth-switch">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
