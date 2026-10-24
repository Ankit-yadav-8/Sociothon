import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../App';
import {
  Recycle, Camera, Sparkles, Shield, Truck, BarChart3,
  TrendingUp, Award, ArrowRight, CheckCircle2, ChevronRight,
  Sun, Moon, Zap, Layers, RefreshCw, Scale, Globe, Building2,
  Users, Check, IndianRupee, Leaf, AlertCircle, Play, Pause,
  Sliders, ChevronDown, HelpCircle, ExternalLink
} from 'lucide-react';
import './LandingPage.css';

// 5 Interactive Waste Classification Samples with PWVO Ontology
const WASTE_SAMPLES = [
  {
    id: 'pet_bottle',
    name: 'Clear PET Plastic Bottle',
    polymer: 'PET (Polyethylene Terephthalate)',
    code: 'PET (RIC-1)',
    category: 'Rigid Plastic — High Purity Stream',
    eprCategory: 'Category I (Rigid Packaging)',
    confidence: 98.4,
    box: { top: '15%', left: '24%', width: '52%', height: '68%' },
    color: '#10B981',
    inrPerKg: 16.5,
    ptsPerKg: 25,
    co2PerKg: 2.1,
    img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80',
    instructions: [
      'Unscrew the polypropylene cap and remove security seal ring.',
      'Rinse liquid remnant with water to eliminate contaminants.',
      'Compress bottle vertically to optimize collection volume.',
      'Deposit into Blue Bin A (Slot #01 — High Purity Stream).'
    ]
  },
  {
    id: 'hdpe_jug',
    name: 'HDPE Detergent Container',
    polymer: 'HDPE (High-Density Polyethylene)',
    code: 'HDPE (RIC-2)',
    category: 'Rigid Plastic — Colored Grade',
    eprCategory: 'Category I (Rigid Packaging)',
    confidence: 94.8,
    box: { top: '12%', left: '20%', width: '60%', height: '74%' },
    color: '#3B82F6',
    inrPerKg: 22.0,
    ptsPerKg: 35,
    co2PerKg: 2.6,
    img: 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=800&auto=format&fit=crop&q=80',
    instructions: [
      'Flush soap and detergent residue with warm water.',
      'Remove pump nozzle if spring contains metallic components.',
      'Flatten bottle along side seams for baling.',
      'Deposit into Blue Bin B (Slot #02 — Colored HDPE).'
    ]
  },
  {
    id: 'mlp_pouch',
    name: 'Multi-Layer Snack Food Foil',
    polymer: 'MLP (PE / Aluminium / BOPP)',
    code: 'MLP (RIC-7)',
    category: 'Flexible Packaging & Films',
    eprCategory: 'Category III (Multi-layered Plastic)',
    confidence: 91.2,
    box: { top: '18%', left: '22%', width: '56%', height: '62%' },
    color: '#F59E0B',
    inrPerKg: 7.5,
    ptsPerKg: 12,
    co2PerKg: 1.4,
    img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
    instructions: [
      'Empty any residual food crumbs or seasoning.',
      'Dry wipe interior foil surface before compaction.',
      'Fold tightly into bundles for transport.',
      'Deposit into Orange Bin C (Co-processing & Cement Kilns).'
    ]
  },
  {
    id: 'ewaste_pcb',
    name: 'Circuit Board & Lithium Battery',
    polymer: 'FR-4 Copper Alloy / Li-Ion',
    code: 'E-Waste',
    category: 'Electronic Scrap & Urban Mining',
    eprCategory: 'E-Waste Schedule I',
    confidence: 97.9,
    box: { top: '10%', left: '16%', width: '68%', height: '76%' },
    color: '#8B5CF6',
    inrPerKg: 115.0,
    ptsPerKg: 180,
    co2PerKg: 15.2,
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    instructions: [
      'Do not pierce, deform or crush the lithium battery cell.',
      'Insulate exposed terminal leads with non-conductive tape.',
      'Store in dry anti-static protective pouches.',
      'Handover to Authorized Urban Mining Vault (Station Safe #09).'
    ]
  },
  {
    id: 'food_waste',
    name: 'Institutional Mess Food Surplus',
    polymer: 'Organic Bio-Mass',
    code: 'Bio-Organic',
    category: 'Kitchen Surplus & Post-Consumer',
    eprCategory: 'Municipal Solid Waste Rules',
    confidence: 96.3,
    box: { top: '14%', left: '18%', width: '64%', height: '70%' },
    color: '#10B981',
    inrPerKg: 4.5,
    ptsPerKg: 8,
    co2PerKg: 0.9,
    img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    instructions: [
      'Separate tough fibrous stems and large bone pieces.',
      'Drain excess gravy broth to optimize dehydration efficiency.',
      'Feed into on-site Mill Thermomechanical Dehydrator.',
      'Harvest stable, nutrient-dense dry organic feed powder.'
    ]
  }
];

export default function LandingPage() {
  const { user, getDashboardPath } = useAuth();
  
  // Theme State
  const [theme, setTheme] = useState(() => localStorage.getItem('ecoloop_theme') || 'dark');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ecoloop_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // AI Scanner Playground State
  const [selectedSample, setSelectedSample] = useState(WASTE_SAMPLES[0]);
  const [isScanning, setIsScanning] = useState(true);
  const [scanConfidence, setScanConfidence] = useState(WASTE_SAMPLES[0].confidence);

  const handleSelectSample = (sample) => {
    setIsScanning(false);
    setSelectedSample(sample);
    setScanConfidence(0);
    
    // Simulate real-time neural sweep
    setTimeout(() => {
      setIsScanning(true);
      let count = 55;
      const interval = setInterval(() => {
        count += 5;
        if (count >= sample.confidence) {
          setScanConfidence(sample.confidence);
          clearInterval(interval);
        } else {
          setScanConfidence(count);
        }
      }, 25);
    }, 180);
  };

  // Calculator State
  const [calcKg, setCalcKg] = useState(250);
  const [calcCategory, setCalcCategory] = useState('plastic');

  const streamMultipliers = {
    plastic: { inr: 18.5, co2: 2.2, tree: 0.12, epr: 1.0 },
    ewaste: { inr: 110.0, co2: 14.5, tree: 0.85, epr: 2.5 },
    organic: { inr: 5.0, co2: 0.9, tree: 0.05, epr: 0.4 },
    paper: { inr: 12.0, co2: 1.6, tree: 0.18, epr: 0.7 },
    metal: { inr: 32.0, co2: 5.4, tree: 0.35, epr: 1.2 }
  };

  const currentMult = streamMultipliers[calcCategory];
  const totalInr = Math.round(calcKg * currentMult.inr);
  const totalCo2 = (calcKg * currentMult.co2).toFixed(1);
  const totalTrees = Math.round(calcKg * currentMult.tree);
  const totalEpr = Math.round(calcKg * currentMult.epr);

  // Active Role Tab
  const [activeRole, setActiveRole] = useState('admin');

  // FAQ Toggle State
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (idx) => {
    setOpenFaq(prev => prev === idx ? null : idx);
  };

  return (
    <div className="landing-page">
      
      {/* Background Matrix Grid */}
      <div className="bg-grid-subtle"></div>

      {/* Ambient Lighting Glows */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>

      {/* ═══════════════════════════════════════════════════════════
          CLEAN TOP NAVIGATION BAR
          ═══════════════════════════════════════════════════════════ */}
      <header className="top-nav">
        <div className="nav-container">
          <Link to="/" className="brand-link">
            <div className="brand-icon-box">
              <Recycle size={22} />
            </div>
            <span className="brand-title">
              Eco<span className="gradient-text">Loop</span>
            </span>
          </Link>

          <nav className="nav-menu">
            <a href="#ai-scanner" className="nav-item-link">AI Scanner</a>
            <a href="#how-it-works" className="nav-item-link">How It Works</a>
            <a href="#calculator" className="nav-item-link">Impact Calculator</a>
            <a href="#consoles" className="nav-item-link">Role Consoles</a>
            <a href="#faq" className="nav-item-link">FAQ</a>
          </nav>

          <div className="nav-actions">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="modern-circle-btn"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {user ? (
              <Link to={getDashboardPath(user.role)} className="modern-btn modern-btn-primary">
                Open Console <ArrowRight size={15} />
              </Link>
            ) : (
              <>
                <Link to="/login" className="modern-btn">Sign In</Link>
                <Link to="/signup" className="modern-btn modern-btn-primary">
                  Get Started <ArrowRight size={15} />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════ */}
      <section className="hero-section">
        <div className="hero-grid-layout">
          
          {/* Left Hero Content */}
          <div className="hero-left-column">
            <div className="hero-pill-badge">
              <Sparkles size={14} />
              <span>AI-Powered Waste Intelligence Platform</span>
            </div>

            <h1 className="hero-main-title">
              Transform Waste into
              <span className="gradient-text"> Wealth</span>
              <br />with Intelligent Recycling
            </h1>

            <p className="hero-sub-text">
              EcoLoop connects households, waste pickers, NGOs, and certified recyclers. 
              Featuring real-time edge AI classification across 47 polymer categories, calibrated digital 
              scale confidence gating, and instant UPI cash incentives.
            </p>

            <div className="hero-btn-row">
              <Link to="/signup" className="modern-btn modern-btn-primary" style={{ padding: '0.9rem 1.85rem', fontSize: '1rem' }}>
                <Zap size={18} /> Start Recycling Now
              </Link>
              <Link to="/dashboard/scanner" className="modern-btn" style={{ padding: '0.9rem 1.6rem', fontSize: '1rem' }}>
                <Camera size={18} /> Launch AI Scanner
              </Link>
            </div>

            {/* Metrics Row */}
            <div className="hero-stats-row">
              <div className="stat-metric-card">
                <div className="stat-metric-number gradient-text">47+</div>
                <div className="stat-metric-label">Polymer Categories</div>
              </div>
              <div className="stat-metric-card">
                <div className="stat-metric-number">
                  <span>&lt;440</span><span style={{ fontSize: '1rem', color: 'var(--accent-green)' }}>ms</span>
                </div>
                <div className="stat-metric-label">Edge AI Latency</div>
              </div>
              <div className="stat-metric-card">
                <div className="stat-metric-number">
                  <span>₹2.5</span><span style={{ fontSize: '1rem', color: 'var(--accent-green)' }}>Cr+</span>
                </div>
                <div className="stat-metric-label">Disbursed to Citizens</div>
              </div>
            </div>
          </div>

          {/* Right Hero: Interactive AI Scanner Showcase */}
          <div id="ai-scanner" className="scanner-demo-card">
            <div className="scanner-card-header">
              <div className="scanner-header-title">
                <Camera size={16} />
                <span>Live AI Vision Preview</span>
              </div>
              <span className="modern-badge neo-badge-green">
                <Check size={12} /> Model Active
              </span>
            </div>

            {/* Material Stream Selector Tabs */}
            <div className="stream-chips-scroll">
              {WASTE_SAMPLES.map(sample => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`stream-chip-btn ${selectedSample.id === sample.id ? 'active' : ''}`}
                >
                  {sample.code}
                </button>
              ))}
            </div>

            {/* Camera Viewport with Animated Laser and Dynamic Box */}
            <div className="camera-viewport-frame">
              <img
                src={selectedSample.img}
                alt={selectedSample.name}
                className="camera-preview-img"
              />

              {/* Laser Scan Sweep */}
              {isScanning && <div className="scan-laser-line"></div>}

              {/* Dynamic Bounding Box */}
              <div
                className="viewport-target-box"
                style={{
                  top: selectedSample.box.top,
                  left: selectedSample.box.left,
                  width: selectedSample.box.width,
                  height: selectedSample.box.height,
                  borderColor: selectedSample.color
                }}
              >
                <div
                  className="target-badge-label"
                  style={{ background: selectedSample.color }}
                >
                  {selectedSample.code} • {scanConfidence}%
                </div>
              </div>
            </div>

            {/* Pre-Disposal Guidance Drawer */}
            <div className="guidance-drawer">
              <div className="guidance-drawer-header">
                <div>
                  <h4 className="guidance-material-name">{selectedSample.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {selectedSample.category}
                  </span>
                </div>
                <span className="modern-badge neo-badge-blue">
                  {selectedSample.eprCategory}
                </span>
              </div>

              {/* Instructions */}
              <ul className="guidance-steps-list">
                {selectedSample.instructions.slice(0, 2).map((inst, i) => (
                  <li key={i} className="guidance-step-row">
                    <span className="step-number-circle">{i + 1}</span>
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>

              {/* Yield Strip */}
              <div className="yield-stats-strip">
                <div className="yield-box">
                  <div className="yield-amount">₹{selectedSample.inrPerKg}/kg</div>
                  <div className="yield-sublabel">Citizen Payout</div>
                </div>
                <div className="yield-box">
                  <div className="yield-amount">+{selectedSample.ptsPerKg} pts</div>
                  <div className="yield-sublabel">Green Points</div>
                </div>
                <div className="yield-box">
                  <div className="yield-amount">-{selectedSample.co2PerKg} kg</div>
                  <div className="yield-sublabel">CO₂ Abated</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          5-STEP CIRCULAR PIPELINE SECTION
          ═══════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="pipeline-section">
        <div className="section-headline-center">
          <span className="modern-badge neo-badge-green">
            <Layers size={14} /> End-to-End Workflow
          </span>
          <h2 className="section-h2">
            How EcoLoop <span className="gradient-text">Eliminates Contamination</span>
          </h2>
          <p className="section-p">
            A synchronized physical-to-digital chain of custody from household deposit to CPCB EPR certificate trading.
          </p>
        </div>

        <div className="pipeline-cards-grid">
          {[
            {
              step: 'Step 01',
              title: 'Station QR Pairing',
              desc: 'Scan the station physical QR code with live GPS validation to unlock your active deposit session.'
            },
            {
              step: 'Step 02',
              title: 'Real-Time Edge AI',
              desc: 'On-device neural network analyzes material and polymer category in under 440ms completely offline.'
            },
            {
              step: 'Step 03',
              title: 'Preparation Guidance',
              desc: 'Tactile card instructs cap removal, liquid rinse, and compaction to eliminate downstream contamination.'
            },
            {
              step: 'Step 04',
              title: 'Smart Scale Weighing',
              desc: 'Integrated digital scale logs net weight with automated confidence threshold acceptance (>=0.40).'
            },
            {
              step: 'Step 05',
              title: 'Instant UPI & Trace',
              desc: 'Immediate payment settlement to your UPI ID and cryptographic JSON audit log synced to the CPCB portal.'
            }
          ].map((pipe, idx) => (
            <div key={idx} className="pipeline-step-box">
              <div className="step-serial-num">{pipe.step}</div>
              <h3 className="step-card-title">{pipe.title}</h3>
              <p className="step-card-desc">{pipe.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          DYNAMIC CALCULATOR SECTION
          ═══════════════════════════════════════════════════════════ */}
      <section id="calculator" className="calc-section">
        <div className="calc-grid-layout">
          
          {/* Controls */}
          <div className="calc-panel">
            <span className="modern-badge neo-badge-blue" style={{ marginBottom: '1rem' }}>
              <Sliders size={14} /> Interactive Yield Estimator
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Simulate Your <span className="gradient-text">Circular Yield</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9375rem' }}>
              Calculate estimated citizen cash payouts, avoided greenhouse gases, and CPCB EPR compliance credits.
            </p>

            {/* Stream Buttons */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                SELECT MATERIAL STREAM
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'plastic', label: '♻️ Plastics' },
                  { id: 'ewaste', label: '💻 E-Waste' },
                  { id: 'organic', label: '🍃 Organic' },
                  { id: 'paper', label: '📄 Paper' },
                  { id: 'metal', label: '🔧 Metals' }
                ].map(stream => (
                  <button
                    key={stream.id}
                    onClick={() => setCalcCategory(stream.id)}
                    className={`stream-chip-btn ${calcCategory === stream.id ? 'active' : ''}`}
                  >
                    {stream.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Volume Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>Monthly Deposit Volume</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-green)' }}>
                  {calcKg.toLocaleString()} kg
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="2500"
                step="10"
                value={calcKg}
                onChange={(e) => setCalcKg(Number(e.target.value))}
                className="modern-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>10 kg (Individual)</span>
                <span>500 kg (Society)</span>
                <span>2,500 kg (Institution)</span>
              </div>
            </div>
          </div>

          {/* Dials */}
          <div className="calc-dial-grid">
            <div className="calc-stat-card">
              <div className="calc-icon-bubble">
                <IndianRupee size={24} />
              </div>
              <div className="calc-number-big gradient-text">
                ₹{totalInr.toLocaleString()}
              </div>
              <div className="calc-label-text">Direct Citizen Payout</div>
            </div>

            <div className="calc-stat-card">
              <div className="calc-icon-bubble" style={{ color: 'var(--accent-blue)', background: 'var(--accent-blue-subtle)' }}>
                <Leaf size={24} />
              </div>
              <div className="calc-number-big">
                {totalCo2} <span style={{ fontSize: '1.1rem' }}>kg</span>
              </div>
              <div className="calc-label-text">CO₂e Abatement</div>
            </div>

            <div className="calc-stat-card">
              <div className="calc-icon-bubble" style={{ color: 'var(--accent-green)' }}>
                <Globe size={24} />
              </div>
              <div className="calc-number-big">
                {totalTrees}
              </div>
              <div className="calc-label-text">Equivalent Trees Saved</div>
            </div>

            <div className="calc-stat-card">
              <div className="calc-icon-bubble" style={{ color: 'var(--accent-purple)', background: 'rgba(139, 92, 246, 0.12)' }}>
                <Award size={24} />
              </div>
              <div className="calc-number-big">
                {totalEpr} <span style={{ fontSize: '1.1rem' }}>pts</span>
              </div>
              <div className="calc-label-text">CPCB EPR Credit Tokens</div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ECOSYSTEM CONSOLES SECTION
          ═══════════════════════════════════════════════════════════ */}
      <section id="consoles" className="consoles-section">
        <div className="section-headline-center">
          <span className="modern-badge neo-badge-purple" style={{ marginBottom: '0.75rem' }}>
            <Users size={14} /> Multi-Stakeholder Ecosystem
          </span>
          <h2 className="section-h2">
            Tailored Experiences for <span className="gradient-text">Every Role</span>
          </h2>
          <p className="section-p">
            Dedicated command dashboards for municipal administrators, NGO coordinators, volunteer haulers, and institutions.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="console-tab-row">
          {[
            { id: 'admin', label: 'Platform Admin' },
            { id: 'ngo', label: 'NGO Partner' },
            { id: 'volunteer', label: 'Volunteer Hauler' },
            { id: 'hostel', label: 'Hostel & Institution' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveRole(tab.id)}
              className={`console-tab-btn ${activeRole === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Role Console View */}
        <div className="console-display-card" key={activeRole}>
          {activeRole === 'admin' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'center' }}>
              <div>
                <span className="modern-badge neo-badge-green" style={{ marginBottom: '0.85rem' }}>
                  Regulatory Command
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  CPCB Compliance & City-Wide Throughput
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                  Monitors real-time municipal processing across 12 zonal MRFs, automated statutory credit allocations, 
                  and brand liability matching with tamper-proof cryptographic audit logs.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link to="/signup" className="modern-btn modern-btn-primary">
                    Launch Admin Console <ArrowRight size={15} />
                  </Link>
                  <Link to="/dashboard/analytics" className="modern-btn">
                    View Impact Ledger
                  </Link>
                </div>
              </div>
              <div className="modern-well">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Zonal Diversion Rate</span>
                  <span className="modern-badge neo-badge-green">94.2% Verified</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.35rem' }}>
                      <span>Ward 3 Potheri Waste Bank</span>
                      <strong>1,420 kg/day</strong>
                    </div>
                    <div className="modern-slider" style={{ height: '6px', pointerEvents: 'none' }}></div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.35rem' }}>
                      <span>Tambaram MRF Sorting Line</span>
                      <strong>3,890 kg/day</strong>
                    </div>
                    <div className="modern-slider" style={{ height: '6px', pointerEvents: 'none' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeRole === 'ngo' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'center' }}>
              <div>
                <span className="modern-badge neo-badge-blue" style={{ marginBottom: '0.85rem' }}>
                  Community Organizing
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  Grassroots Drives & Volunteer Coordination
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                  Organize neighborhood cleanups, track volunteer task execution, dispatch educational kits to schools, 
                  and view verified environmental impact metrics.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link to="/signup" className="modern-btn modern-btn-primary">
                    Register NGO Portal <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
              <div className="modern-well" style={{ textAlign: 'center' }}>
                <Building2 size={38} color="var(--accent-blue)" style={{ margin: '0 auto 0.75rem' }} />
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  14,800+ Volunteers
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                  Active across 42 Municipalities
                </div>
              </div>
            </div>
          )}

          {activeRole === 'volunteer' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'center' }}>
              <div>
                <span className="modern-badge neo-badge-purple" style={{ marginBottom: '0.85rem' }}>
                  Last-Mile Logistics
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  Doorstep Collection & Digital Scale Sync
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                  Optimized route waypoints, digital scale calibration via Bluetooth, customer OTP verification, 
                  and automated UPI commission transfers directly to your bank account.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link to="/signup" className="modern-btn modern-btn-primary">
                    Join Hauler Network <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
              <div className="modern-well">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Truck size={24} color="var(--accent-purple)" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>Pickup #9021 in Progress</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Sector 4, Dwarka — 12.4 kg Segregated</div>
                  </div>
                </div>
                <span className="modern-badge neo-badge-green">OTP Verified • ₹186 Settled</span>
              </div>
            </div>
          )}

          {activeRole === 'hostel' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'center' }}>
              <div>
                <span className="modern-badge" style={{ marginBottom: '0.85rem', color: '#F59E0B', borderColor: 'rgba(245, 158, 11, 0.3)', background: 'rgba(245, 158, 11, 0.12)' }}>
                  Campus & Mess Food Waste
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  Kitchen Surplus Tracking & "Surprise Bags"
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                  Overhead optical food recognition, real-time prep overproduction alerts, surplus meal redistribution 
                  via "Surprise Bags", and on-site thermomechanical dehydration into odorless dry animal feed powder.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link to="/signup" className="modern-btn modern-btn-primary">
                    Institution Setup <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
              <div className="modern-well">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.8125rem' }}>Mill Recycler Dehydrator</span>
                  <span className="modern-badge neo-badge-green">Active • 84°C</span>
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  Dehydrating 45 kg kitchen scraps into 8.2 kg stable organic powder.
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 600 }}>
                  Surplus Bags Claimed: 28 meals rescued today
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MODERN FAQ SECTION
          ═══════════════════════════════════════════════════════════ */}
      <section id="faq" style={{ padding: '5rem 1.75rem', maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="section-headline-center">
          <span className="modern-badge neo-badge-blue" style={{ marginBottom: '0.75rem' }}>
            <HelpCircle size={14} /> Clear Answers
          </span>
          <h2 className="section-h2">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            {
              q: 'How does the AI classify polymers offline without internet?',
              a: 'EcoLoop uses a lightweight quantized ONNX neural runtime optimized for web browsers and low-power IoT cameras. It analyzes the visual texture, opacity, specular reflection, and contour features against the 47-category Plastic Waste Vocabulary Ontology (PWVO) in <440ms completely on-device.'
            },
            {
              q: 'How are instant UPI payouts calculated and credited?',
              a: 'Once waste is classified and deposited on the calibrated digital scale, confidence scores >=0.40 trigger instant payout calculations using official market scrap yields. UPI payment gateways trigger immediate disbursement directly to your phone number or UPI VPA.'
            },
            {
              q: 'Does EcoLoop generate valid Extended Producer Responsibility (EPR) certificates?',
              a: 'Yes. Every deposit generates an auditable cryptographic JSON record containing the event_id, GPS coordinates, timestamp, depositor_id, PWVO classification, and mass in grams matching Central Pollution Control Board (CPCB) standards for statutory corporate offset trading.'
            },
            {
              q: 'How does the Hostel & Institutional Mess system prevent food waste?',
              a: 'Our solution tracks mess plates through overhead optical recognition to identify overproduced food items, enables immediate discounted redistribution through "Surprise Bags" (inspired by Too Good To Go), and processes unrecoverable scraps on-site into odorless dry feed powder.'
            }
          ].map((faq, i) => (
            <div
              key={i}
              onClick={() => toggleFaq(i)}
              className="modern-card"
              style={{ cursor: 'pointer', padding: '1.5rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {faq.q}
                </h4>
                <div
                  className="modern-circle-btn"
                  style={{
                    width: '32px',
                    height: '32px',
                    transform: openFaq === i ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s ease'
                  }}
                >
                  <ChevronDown size={15} />
                </div>
              </div>
              {openFaq === i && (
                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.7, animation: 'fadeIn 0.2s ease' }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CALL TO ACTION SECTION
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '4rem 1.75rem 6rem', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="modern-card modern-card-lg" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div className="pulse-led" style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-green)', margin: '0 auto 1.25rem' }}></div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Ready to Build a <span className="gradient-text">Circular India?</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto 2.25rem', fontSize: '1.05rem' }}>
            Join thousands of citizens, institutions, NGOs, and recyclers monetizing waste and abating landfill emissions.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/signup" className="modern-btn modern-btn-primary" style={{ padding: '0.95rem 2.2rem', fontSize: '1.05rem' }}>
              <Zap size={18} /> Create Free Account
            </Link>
            <Link to="/dashboard/scanner" className="modern-btn" style={{ padding: '0.95rem 1.85rem', fontSize: '1.05rem' }}>
              <Camera size={18} /> Launch AI Scanner
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MODERN FOOTER
          ═══════════════════════════════════════════════════════════ */}
      <footer className="modern-footer">
        <div className="footer-container">
          <div className="footer-top">
            <div>
              <div className="brand-link" style={{ marginBottom: '1.25rem' }}>
                <div className="brand-icon-box">
                  <Recycle size={20} />
                </div>
                <span className="brand-title">
                  Eco<span className="gradient-text">Loop</span>
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '340px' }}>
                Next-generation circular economy marketplace and edge AI waste intelligence compliant with CPCB Extended Producer Responsibility mandates.
              </p>
            </div>

            <div>
              <h4 style={{ fontWeight: 800, fontSize: '0.875rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Platform</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <li><Link to="/dashboard/scanner">AI Camera Scanner</Link></li>
                <li><Link to="/dashboard/marketplace">B2B Commodity Market</Link></li>
                <li><Link to="/dashboard/tracking">MRF & Logistics</Link></li>
                <li><Link to="/dashboard/epr-credits">CPCB EPR Registry</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontWeight: 800, fontSize: '0.875rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Consoles</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <li><Link to="/dashboard/admin">Platform Admin</Link></li>
                <li><Link to="/dashboard/ngo">NGO Partner</Link></li>
                <li><Link to="/dashboard/volunteer">Volunteer Hauler</Link></li>
                <li><Link to="/dashboard/hostel">Hostel & Institution</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontWeight: 800, fontSize: '0.875rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Compliance</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <li><a href="#" target="_blank" rel="noreferrer">CPCB Portal Spec</a></li>
                <li><a href="#" target="_blank" rel="noreferrer">PWVO 47-Ontology</a></li>
                <li><a href="#" target="_blank" rel="noreferrer">Data Cryptography</a></li>
                <li><a href="#" target="_blank" rel="noreferrer">Open API Docs</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 EcoLoop Platform. Built for the Sociothon Challenge. All rights reserved.</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="pulse-led" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-green)', display: 'inline-block' }}></span>
              All Systems Operational
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
