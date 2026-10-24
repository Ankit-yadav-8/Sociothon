import { Link } from 'react-router-dom';
import { useAuth } from '../App';
import {
  Recycle, Leaf, BarChart3, Shield, Zap, Globe, Users,
  ArrowRight, Star, Sparkles, TrendingUp, Camera, Truck,
  Award, ChevronRight, Play, CheckCircle2, Building2
} from 'lucide-react';
import './LandingPage.css';

const stats = [
  { value: '12,500+', label: 'Tons Recycled', icon: Recycle },
  { value: '45,000+', label: 'Active Users', icon: Users },
  { value: '98.7%', label: 'AI Accuracy', icon: Sparkles },
  { value: '₹2.5Cr+', label: 'Paid to Citizens', icon: TrendingUp },
];

const features = [
  {
    icon: Camera,
    title: 'AI Waste Classification',
    description: 'YOLOE-powered edge AI scans and classifies 47+ plastic types in under 440ms — completely offline.',
    gradient: 'green',
    tag: 'Computer Vision'
  },
  {
    icon: Truck,
    title: 'Smart Collection Network',
    description: 'Algorithmic dispatching optimizes pickup routes. OTP-verified doorstep collections with instant UPI payments.',
    gradient: 'blue',
    tag: 'Logistics AI'
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Track CO₂e impact, landfill diversion rates, and spending visibility across every waste stream.',
    gradient: 'purple',
    tag: 'Data Intelligence'
  },
  {
    icon: Shield,
    title: 'EPR Compliance Engine',
    description: 'Automated Extended Producer Responsibility certificate generation and trading on government registries.',
    gradient: 'orange',
    tag: 'Regulatory Tech'
  },
  {
    icon: Globe,
    title: 'B2B Marketplace',
    description: 'Connect waste generators with certified recyclers. Real-time e-auctions and transparent price discovery.',
    gradient: 'cyan',
    tag: 'Digital Commerce'
  },
  {
    icon: Leaf,
    title: 'Food Waste Intelligence',
    description: 'Predictive prep optimization and surplus recovery via "Surprise Bags" — reducing kitchen waste by 60%.',
    gradient: 'green',
    tag: 'Predictive AI'
  },
];

const wasteTypes = [
  { name: 'Plastic', color: '#10b981', desc: 'PET, HDPE, PP, LDPE', icon: '♻️' },
  { name: 'E-Waste', color: '#3b82f6', desc: 'Electronics & Appliances', icon: '🔌' },
  { name: 'Organic', color: '#f97316', desc: 'Food & Kitchen Waste', icon: '🍃' },
  { name: 'Paper', color: '#a855f7', desc: 'Paper & Cardboard', icon: '📄' },
  { name: 'Metal', color: '#eab308', desc: 'Ferrous & Non-ferrous', icon: '🔧' },
  { name: 'Glass', color: '#06b6d4', desc: 'Bottles & Containers', icon: '🫙' },
];

const roles = [
  { title: 'Admin', icon: Shield, desc: 'Full platform management, analytics, and user oversight', color: 'green' },
  { title: 'NGO Partner', icon: Building2, desc: 'Campaign management, volunteer coordination, and impact tracking', color: 'blue' },
  { title: 'Volunteer', icon: Users, desc: 'Collection assignments, earnings tracker, and route optimization', color: 'purple' },
  { title: 'Hostel / Institution', icon: Award, desc: 'Waste generation tracking, compliance reports, and scheduling', color: 'orange' },
];

export default function LandingPage() {
  const { user, getDashboardPath } = useAuth();

  return (
    <div className="landing">
      {/* Animated Background */}
      <div className="landing-bg">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
        <div className="bg-grid"></div>
      </div>

      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <div className="logo-icon">
              <Recycle size={24} />
            </div>
            <span className="logo-text">Eco<span className="gradient-text">Loop</span></span>
          </Link>

          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#waste-types">Waste Types</a>
            <a href="#roles">Dashboards</a>
          </div>

          <div className="nav-actions">
            {user ? (
              <Link to={getDashboardPath(user.role)} className="btn btn-primary">
                Go to Dashboard <ArrowRight size={16} />
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">Sign In</Link>
                <Link to="/signup" className="btn btn-primary">
                  Get Started <ArrowRight size={16} />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge animate-fade-in">
            <Sparkles size={14} />
            <span>AI-Powered Waste Intelligence Platform</span>
          </div>
          
          <h1 className="hero-title animate-slide-up">
            Transform Waste Into
            <span className="gradient-text"> Wealth</span>
            <br />With Intelligent
            <span className="gradient-text-accent"> Recycling</span>
          </h1>
          
          <p className="hero-subtitle animate-slide-up" style={{ animationDelay: '100ms' }}>
            EcoLoop connects households, NGOs, volunteers, and recyclers through AI-powered waste 
            classification, real-time tracking, and instant financial incentives — building a 
            circular economy for India.
          </p>

          <div className="hero-cta animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Link to="/signup" className="btn btn-primary btn-lg">
              <Zap size={20} />
              Start Recycling Now
            </Link>
            <Link to="/dashboard/scanner" className="btn btn-outline btn-lg">
              <Camera size={18} />
              Launch AI Camera Scanner
            </Link>
          </div>

          <div className="hero-stats animate-fade-in" style={{ animationDelay: '400ms' }}>
            {stats.map((stat, i) => (
              <div key={i} className="hero-stat">
                <stat.icon size={20} className="hero-stat-icon" />
                <div className="hero-stat-value">{stat.value}</div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual animate-scale-in" style={{ animationDelay: '300ms' }}>
          <div className="hero-mockup">
            <div className="mockup-header">
              <div className="mockup-dots">
                <span></span><span></span><span></span>
              </div>
              <span className="mockup-title">EcoLoop AI Scanner</span>
            </div>
            <div className="mockup-content">
              <div className="scan-animation">
                <div className="scan-circle">
                  <Recycle size={48} />
                </div>
                <div className="scan-ring"></div>
                <div className="scan-ring scan-ring-2"></div>
                <div className="scan-particles">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="scan-particle" style={{
                      '--angle': `${i * 45}deg`,
                      '--delay': `${i * 0.2}s`
                    }}></div>
                  ))}
                </div>
              </div>
              <div className="scan-results">
                <div className="scan-result-item">
                  <CheckCircle2 size={14} />
                  <span>PET Bottle — 98.2% confidence</span>
                </div>
                <div className="scan-result-item">
                  <CheckCircle2 size={14} />
                  <span>HDPE Container — 95.7% confidence</span>
                </div>
                <div className="scan-result-item">
                  <CheckCircle2 size={14} />
                  <span>PP Wrapper — 91.3% confidence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">
              <Sparkles size={14} /> Core Capabilities
            </span>
            <h2 className="section-title">
              Intelligent Features for a
              <span className="gradient-text"> Cleaner Future</span>
            </h2>
            <p className="section-subtitle">
              Powered by edge AI, predictive analytics, and blockchain-grade traceability
            </p>
          </div>

          <div className="features-grid stagger-children">
            {features.map((f, i) => (
              <div key={i} className={`feature-card feature-${f.gradient} animate-slide-up`}>
                <div className="feature-icon-wrap">
                  <f.icon size={24} />
                </div>
                <div className="feature-tag">{f.tag}</div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
                <div className="feature-link">
                  Learn more <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section section-dark">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">
              <Zap size={14} /> Simple Process
            </span>
            <h2 className="section-title">
              How EcoLoop
              <span className="gradient-text-accent"> Works</span>
            </h2>
          </div>

          <div className="steps-timeline">
            {[
              { step: '01', title: 'Station QR Verification', desc: 'Scan the station QR code to geo-locate and lock your active deposit session at Potheri Ward 3 Waste Bank or Smart Kiosks.', icon: Camera },
              { step: '02', title: 'Real-Time Edge AI Vision', desc: 'Lightweight YOLOE-26 model classifies waste into 47 PWVO polymer categories in <440ms completely offline.', icon: Sparkles },
              { step: '03', title: 'Tactile Neomorphic Guidance', desc: 'Extruded tactile guidance card delivers live material values (pts/kg) and step-by-step pre-disposal preparation instructions.', icon: Shield },
              { step: '04', title: 'Integrated Smart Scale Weighing', desc: 'Deposit items on calibrated digital scales with automated confidence gating (>=0.40 auto-accepted; <0.40 triggers human review).', icon: Truck },
              { step: '05', title: 'Instant UPI & CPCB EPR Trace', desc: 'Wallet increments via rolling counter, instant UPI payouts, and cryptographic JSON audit log uploaded to CPCB EPR portal.', icon: TrendingUp }
            ].map((s, i) => (
              <div key={i} className="step-item animate-slide-up" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="step-number">{s.step}</div>
                <div className="step-icon"><s.icon size={28} /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waste Types */}
      <section id="waste-types" className="section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">
              <Recycle size={14} /> Coverage
            </span>
            <h2 className="section-title">
              Every Waste Stream,
              <span className="gradient-text"> One Platform</span>
            </h2>
          </div>

          <div className="waste-types-grid stagger-children">
            {wasteTypes.map((w, i) => (
              <div key={i} className="waste-type-card animate-scale-in"
                   style={{ '--accent': w.color }}>
                <div className="waste-type-emoji">{w.icon}</div>
                <h3>{w.name}</h3>
                <p>{w.desc}</p>
                <div className="waste-type-bar">
                  <div className="waste-type-fill" style={{ width: `${70 + Math.random() * 30}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Dashboards */}
      <section id="roles" className="section section-dark">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">
              <Users size={14} /> Multi-Role Platform
            </span>
            <h2 className="section-title">
              Dashboards for
              <span className="gradient-text-accent"> Everyone</span>
            </h2>
            <p className="section-subtitle">
              Tailored experiences for every stakeholder in the waste management ecosystem
            </p>
          </div>

          <div className="roles-grid stagger-children">
            {roles.map((r, i) => (
              <div key={i} className={`role-card role-${r.color} animate-slide-up`}>
                <div className="role-icon">
                  <r.icon size={28} />
                </div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
                <Link to="/signup" className="btn btn-outline btn-sm">
                  Get Access <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-glow"></div>
          <h2>Ready to Join the<br /><span className="gradient-text">Circular Economy?</span></h2>
          <p>Start scanning, sorting, and earning today. Every piece of waste recycled is a step toward a cleaner India.</p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn btn-primary btn-lg">
              <Sparkles size={18} /> Create Free Account
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Sign In <ArrowRight size={16} />
            </Link>
          </div>
          <div className="cta-trust">
            <Star size={14} />
            <span>Trusted by 500+ organizations across India</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="nav-logo">
                <div className="logo-icon"><Recycle size={24} /></div>
                <span className="logo-text">Eco<span className="gradient-text">Loop</span></span>
              </div>
              <p>AI-powered waste intelligence platform building a sustainable circular economy for India.</p>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <h4>Platform</h4>
                <a href="#features">Features</a>
                <a href="#how-it-works">How It Works</a>
                <a href="#waste-types">Waste Types</a>
                <a href="#roles">Dashboards</a>
              </div>
              <div className="footer-col">
                <h4>Resources</h4>
                <a href="#">API Docs</a>
                <a href="#">EPR Portal</a>
                <a href="#">Compliance</a>
                <a href="#">Support</a>
              </div>
              <div className="footer-col">
                <h4>Company</h4>
                <a href="#">About</a>
                <a href="#">Careers</a>
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 EcoLoop. Built with 💚 for a cleaner India.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
