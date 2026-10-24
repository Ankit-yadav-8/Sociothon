import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../App';
import {
  Recycle, ArrowRight, Shield, Users, Truck, Factory,
  Building2, Globe, Sparkles, AlertCircle, Camera, CheckCircle2,
  Lock, ArrowLeft
} from 'lucide-react';
import toast from 'react-hot-toast';
import { platformStore } from '../services/platformStore';
import './AuthPages.css';

export const DEMO_PERSONAS = [
  {
    role: 'admin',
    name: 'Priya Sharma',
    email: 'admin@ecoloop.in',
    volunteerId: 'VOL-2026-ADM9901A',
    avatar: 'PS',
    badge: 'Platform Administrator',
    icon: Shield,
    color: '#8B5CF6',
    tag: 'Full Governance Access',
    description: 'Master control center: SHA-256 ledger audits, CPCB reporting, reward rate configuration & instant UPI payout authorization.',
    capabilities: [
      'SHA-256 tamper-evident ledger audits',
      'Benchmark waste reward rate matrix',
      'Authorize recycler-verified UPI disbursements'
    ],
    path: '/dashboard/admin'
  },
  {
    role: 'volunteer',
    name: 'Ananya Deshmukh',
    email: 'volunteer@ecoloop.in',
    volunteerId: 'VOL-2026-E47A91BC',
    avatar: 'AD',
    badge: 'Volunteer Donor',
    icon: Users,
    color: '#10B981',
    tag: 'Campus Resident / Student',
    description: 'Individual contributor console: AI optical camera scanner, permanent Volunteer ID, green points balance & instant UPI redemption.',
    capabilities: [
      'Live AI camera scanner with Grad-CAM',
      'Permanent Volunteer ID & doorstep requests',
      'Green points balance & instant UPI redemption'
    ],
    path: '/dashboard/volunteer'
  },
  {
    role: 'collector',
    name: 'Ramesh Kumar',
    email: 'collector@ecoloop.in',
    volunteerId: 'VOL-2026-COL4421K',
    collectorId: 'COL-2026-KABADI-01',
    avatar: 'RK',
    badge: 'Field Collector',
    icon: Truck,
    color: '#3B82F6',
    tag: 'Sanitation Hauler',
    description: 'Field operations portal: OR-Tools CVRP-TW route optimizer, Bluetooth tare scale, QR verification & MRF delivery manifest.',
    capabilities: [
      'OR-Tools dynamic route optimizer (-38.4% km)',
      'Digital tare scale weight calibration',
      'Delivery manifest signoff to MRF / recyclers'
    ],
    path: '/dashboard/collector'
  },
  {
    role: 'recycler',
    name: 'Reliance Circular Industries',
    email: 'recycler@ecoloop.in',
    volunteerId: 'VOL-2026-REC08491',
    recyclerId: 'REC-001',
    avatar: 'RC',
    badge: 'Recycling Company',
    icon: Factory,
    color: '#F59E0B',
    tag: 'Certified Recovery Partner',
    description: 'Intake processing gate: B2B scrap lot auction, gross/tare weighbridge inspection & CPCB EPR credit compliance generation.',
    capabilities: [
      'B2B scrap lot intake gate inspection',
      'Weighbridge gross vs tare verification',
      'CPCB EPR credit compliance registry'
    ],
    path: '/dashboard/recycler'
  },
  {
    role: 'hostel',
    name: 'Rajendra Bhawan Mess',
    email: 'hostel@ecoloop.in',
    volunteerId: 'VOL-2026-H992A01F',
    avatar: 'RB',
    badge: 'Hostel / Institution',
    icon: Building2,
    color: '#06B6D4',
    tag: 'Bulk Generator',
    description: 'Mess facility console: Winnow AI food residue vision scanner, predictive meal leftover forecast, 45-day compost yield telemetry.',
    capabilities: [
      'Winnow AI optical food residue scanner',
      'Predictive mess food leftover forecast',
      '45-day organic compost yield telemetry'
    ],
    path: '/dashboard/hostel'
  },
  {
    role: 'ngo',
    name: 'Green Earth Foundation',
    email: 'ngo@ecoloop.in',
    volunteerId: 'VOL-2026-NGO7712E',
    avatar: 'GE',
    badge: 'NGO Partner',
    icon: Globe,
    color: '#10B981',
    tag: 'Social Sustainability Partner',
    description: 'Community environmental console: campus cleanup campaign drives, volunteer satisfaction metrics & carbon abatement analytics.',
    capabilities: [
      'Campus & city cleanup campaign drives',
      'Volunteer satisfaction & diversion metrics',
      'Environmental carbon abatement reports'
    ],
    path: '/dashboard/ngo'
  }
];

export default function LoginPage({ isSignupRedirect = false }) {
  const { user, login, getDashboardPath } = useAuth();
  const navigate = useNavigate();

  const handleSelectDemo = (persona) => {
    // Ensure persona is verified and registered in platformStore
    const registeredUser = platformStore.ensureVolunteerRegistered(persona);
    const activeSession = { ...persona, ...registeredUser };
    login(activeSession);
    toast.success(`Access granted! Welcome, ${persona.name} (${persona.badge}).`, {
      icon: '🚀',
      duration: 3500
    });
    navigate(persona.path || getDashboardPath(persona.role));
  };

  return (
    <div className="auth-page demo-access-page">
      <div className="auth-bg">
        <div className="auth-orb auth-orb-1"></div>
        <div className="auth-orb auth-orb-2"></div>
      </div>

      <div className="demo-portal-wrapper">
        {/* Top Header */}
        <div className="demo-portal-top-bar">
          <Link to="/" className="brand-link" style={{ textDecoration: 'none' }}>
            <div className="brand-icon-box" style={{ background: 'var(--accent-green-subtle)', color: 'var(--accent-green)', width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Recycle size={22} />
            </div>
            <div>
              <span className="brand-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 900 }}>
                Campus<span className="gradient-text">Waste</span>
              </span>
              <span style={{ display: 'block', fontSize: '0.625rem', color: 'var(--text-tertiary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                AI-Powered Closed-Loop Waste Ecosystem
              </span>
            </div>
          </Link>

          <Link to="/" className="neo-btn" style={{ fontSize: '0.8125rem', padding: '0.45rem 0.95rem' }}>
            <ArrowLeft size={15} /> Back to Overview
          </Link>
        </div>

        {/* Notice Banner: Registration & Manual Password Logins Paused */}
        <div className="demo-notice-banner">
          <div className="demo-notice-icon">
            <Lock size={18} />
          </div>
          <div className="demo-notice-content">
            <div className="demo-notice-title">
              {isSignupRedirect
                ? 'Public Registration Paused for Hackathon Prototype'
                : 'Manual Sign-In & Password Logins Paused'}
              <span className="demo-status-pill">Instant Demo Mode Active</span>
            </div>
            <p className="demo-notice-sub">
              To provide evaluators and hackathon judges immediate, zero-friction exploration with rich real-time data, traditional email/password input is paused. Select any of the <strong>6 verified role consoles</strong> below to launch its dashboard instantly with 1 click.
            </p>
          </div>
        </div>

        {/* Currently Active Banner if already logged in */}
        {user && (
          <div className="current-user-active-bar">
            <span>Currently Active Session: <strong>{user.name}</strong> ({user.role?.toUpperCase()})</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className="neo-btn neo-btn-primary"
                style={{ fontSize: '0.78rem', padding: '0.35rem 0.85rem' }}
                onClick={() => navigate(getDashboardPath(user.role))}
              >
                Open Active Console <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}

        {/* Demo Personas Grid */}
        <div className="demo-personas-grid">
          {DEMO_PERSONAS.map((persona) => {
            const Icon = persona.icon;
            const isCurrent = user?.email === persona.email;
            return (
              <div
                key={persona.email}
                className={`demo-card modern-card ${isCurrent ? 'active-demo-card' : ''}`}
                onClick={() => handleSelectDemo(persona)}
              >
                <div className="demo-card-header">
                  <div className="demo-avatar" style={{ background: `${persona.color}20`, color: persona.color, border: `1.5px solid ${persona.color}40` }}>
                    {persona.avatar}
                  </div>
                  <div className="demo-header-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <span className="demo-role-badge" style={{ background: `${persona.color}15`, color: persona.color, border: `1px solid ${persona.color}35` }}>
                        <Icon size={13} /> {persona.badge}
                      </span>
                      {isCurrent && (
                        <span className="demo-current-tag">
                          <CheckCircle2 size={12} /> Active Now
                        </span>
                      )}
                    </div>
                    <h3 className="demo-user-name">{persona.name}</h3>
                    <div className="demo-user-email">{persona.email}</div>
                  </div>
                </div>

                <div className="demo-capabilities-list">
                  {persona.capabilities.map((cap, i) => (
                    <div key={i} className="demo-capability-item">
                      <span className="cap-bullet" style={{ background: persona.color }}></span>
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>

                <div className="demo-card-footer">
                  <button
                    className="modern-btn modern-btn-primary demo-launch-btn"
                    style={{
                      width: '100%',
                      background: `linear-gradient(135deg, ${persona.color}, ${persona.color}dd)`,
                      boxShadow: `0 4px 14px ${persona.color}30`
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectDemo(persona);
                    }}
                  >
                    <span>Launch {persona.badge}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Direct Module Launchers */}
        <div className="demo-direct-launchers">
          <span className="direct-launchers-label">Direct Feature Access:</span>
          <div className="direct-launchers-row">
            <Link to="/dashboard/scanner" className="neo-btn" style={{ fontSize: '0.8rem' }}>
              <Camera size={15} /> AI Camera Vision Scanner
            </Link>
            <Link to="/dashboard/tracking" className="neo-btn" style={{ fontSize: '0.8rem' }}>
              <Truck size={15} /> Conveyor &amp; Fleet Telematics
            </Link>
            <Link to="/dashboard/machine" className="neo-btn" style={{ fontSize: '0.8rem' }}>
              <Factory size={15} /> EcoSynthesizer Up-Cycling
            </Link>
            <Link to="/dashboard/marketplace" className="neo-btn" style={{ fontSize: '0.8rem' }}>
              <Sparkles size={15} /> Scrap Lot Marketplace
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
