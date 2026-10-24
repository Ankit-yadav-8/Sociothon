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
import toast from 'react-hot-toast';
import './LandingPage.css';

// 5 Interactive Waste Classification Samples
const WASTE_SAMPLES = [
  {
    id: 'pet_bottle',
    name: 'PET Clear Rigid Bottle',
    polymer: 'PET (Polyethylene Terephthalate)',
    code: 'RIC-1',
    category: 'Rigid Plastic — Class A',
    eprCategory: 'Category I (Rigid Packaging)',
    confidence: 98.4,
    box: { top: '15%', left: '24%', width: '52%', height: '68%' },
    color: '#10B981',
    inrPerKg: 16.5,
    ptsPerKg: 25,
    co2PerKg: 2.1,
    img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80',
    instructions: [
      'Unscrew polypropylene cap and pull off security seal ring.',
      'Rinse out liquid remnant to eliminate bacterial contaminants.',
      'Compress bottle vertically to optimize baler frame volume.',
      'Deposit into Blue Bin A (Slot #01 — High Purity Stream).'
    ]
  },
  {
    id: 'hdpe_jug',
    name: 'HDPE Opaque Detergent Jug',
    polymer: 'HDPE (High-Density Polyethylene)',
    code: 'RIC-2',
    category: 'Rigid Plastic — Class B',
    eprCategory: 'Category I (Rigid Packaging)',
    confidence: 94.8,
    box: { top: '12%', left: '20%', width: '60%', height: '74%' },
    color: '#3B82F6',
    inrPerKg: 22.0,
    ptsPerKg: 35,
    co2PerKg: 2.6,
    img: 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=800&auto=format&fit=crop&q=80',
    instructions: [
      'Flush soap residue with 50ml warm water before deposit.',
      'Remove pump nozzle if spring contains metallic components.',
      'Flatten bottle body along side seams.',
      'Deposit into Blue Bin B (Slot #02 — Colored HDPE).'
    ]
  },
  {
    id: 'mlp_pouch',
    name: 'Multilayer Metallized Chip Pouch',
    polymer: 'MLP (PE / Aluminium / BOPP)',
    code: 'RIC-7',
    category: 'Flexible Multilayer Film',
    eprCategory: 'Category III (Multi-layered Plastic)',
    confidence: 91.2,
    box: { top: '18%', left: '22%', width: '56%', height: '62%' },
    color: '#F59E0B',
    inrPerKg: 7.5,
    ptsPerKg: 12,
    co2PerKg: 1.4,
    img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
    instructions: [
      'Empty any residual crumbs or oily seasoning residue.',
      'Dry wipe interior foil surface with a clean cloth.',
      'Fold into compact bundle for pneumatic baling.',
      'Deposit into Orange Bin C (Cement Kiln Co-processing).'
    ]
  },
  {
    id: 'ewaste_pcb',
    name: 'PCB Motherboard & Battery Cell',
    polymer: 'FR-4 Copper Alloy / Li-Ion',
    code: 'E-Waste',
    category: 'Electronic Scrap & Urban Ore',
    eprCategory: 'E-Waste Schedule I',
    confidence: 97.9,
    box: { top: '10%', left: '16%', width: '68%', height: '76%' },
    color: '#8B5CF6',
    inrPerKg: 115.0,
    ptsPerKg: 180,
    co2PerKg: 15.2,
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    instructions: [
      'Do not pierce, deform or puncture the lithium polymer cell.',
      'Insulate exposed terminal leads with non-conductive tape.',
      'Store in dry anti-static foam pouch.',
      'Handover to Urban Mining Vault (Station Safe #09).'
    ]
  },
  {
    id: 'food_waste',
    name: 'Institutional Mess Kitchen Scraps',
    polymer: 'Organic Bio-Mass',
    code: 'Bio-1',
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
      'Separate bone fragments and tough fibrous stems.',
      'Drain free liquid broth to below 15% moisture content.',
      'Feed into on-site Mill Thermomechanical Dehydrator.',
      'Harvest nutrient-dense dry organic animal feed powder.'
    ]
  }
];

export default function LandingPage() {
  const { user, getDashboardPath } = useAuth();
  
  // Theme State
  const [theme, setTheme] = useState(() => localStorage.getItem('ecoloop_theme') || 'light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ecoloop_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // AI Scanner Playground State
  const [selectedSample, setSelectedSample] = useState(WASTE_SAMPLES[0]);
  const [isScanning, setIsScanning] = useState(true);
  const [scanConfidence, setScanConfidence] = useState(WASTE_SAMPLES[0].confidence);

  const handleSelectSample = (sample) => {
    setIsScanning(false);
    setSelectedSample(sample);
    setScanConfidence(0);
    
    // Simulate re-scan sweep
    setTimeout(() => {
      setIsScanning(true);
      let count = 60;
      const interval = setInterval(() => {
        count += 4;
        if (count >= sample.confidence) {
          setScanConfidence(sample.confidence);
          clearInterval(interval);
        } else {
          setScanConfidence(count);
        }
      }, 30);
    }, 200);
  };

  // Calculator State
  const [calcKg, setCalcKg] = useState(150);
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
      
      {/* ═══════════════════════════════════════════════════════════
          STICKY NEOMORPHIC NAVIGATION BAR
          ═══════════════════════════════════════════════════════════ */}
      <header className="neo-nav">
        <div className="neo-nav-container">
          <Link to="/" className="neo-brand">
            <div className="neo-brand-icon">
              <Recycle size={24} />
            </div>
            <span className="neo-brand-name">
              Eco<span className="gradient-text">Loop</span>
            </span>
          </Link>

          <nav className="neo-nav-links">
            <a href="#ai-scanner" className="neo-nav-link">AI Scanner</a>
            <a href="#how-it-works" className="neo-nav-link">5-Step Pipeline</a>
            <a href="#calculator" className="neo-nav-link">Yield Calculator</a>
            <a href="#roles" className="neo-nav-link">Consoles</a>
            <a href="#faq" className="neo-nav-link">FAQ</a>
          </nav>

          <div className="neo-nav-actions">
            {/* Tactile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="neo-circle-btn"
              title={`Switch to ${theme === 'light' ? 'Dark Obsidian' : 'Soft Light'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {user ? (
              <Link to={getDashboardPath(user.role)} className="neo-btn neo-btn-primary">
                Console <ArrowRight size={16} />
              </Link>
            ) : (
              <>
                <Link to="/login" className="neo-btn">Sign In</Link>
                <Link to="/signup" className="neo-btn neo-btn-primary">
                  Get Started <ArrowRight size={16} />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION WITH INTEGRATED AI SCANNER PREVIEW
          ═══════════════════════════════════════════════════════════ */}
      <section className="neo-hero">
        <div className="hero-grid">
          
          {/* Left Hero Content */}
          <div className="hero-left">
            <div className="hero-badge-pill">
              <Sparkles size={15} />
              <span>YOLOE-26 Edge AI & CPCB EPR Architecture</span>
            </div>

            <h1 className="hero-title">
              Intelligent Waste Recovery.<br />
              <span className="gradient-text">Instant Cash Yield.</span><br />
              Zero Contamination.
            </h1>

            <p className="hero-desc">
              EcoLoop bridges households, waste pickers, bulk generators, and authorized recyclers. 
              Featuring real-time sub-440ms computer vision classification across 47 polymer streams, 
              automated digital scale confidence gating, and instant UPI payouts.
            </p>

            <div className="hero-cta-group">
              <Link to="/signup" className="neo-btn neo-btn-primary" style={{ padding: '0.9rem 1.85rem', fontSize: '1rem' }}>
                <Zap size={18} /> Start Depositing & Earn
              </Link>
              <Link to="/dashboard/scanner" className="neo-btn" style={{ padding: '0.9rem 1.6rem', fontSize: '1rem' }}>
                <Camera size={18} /> Launch AI Scanner
              </Link>
            </div>

            {/* Inset Metric Wells */}
            <div className="hero-metrics-strip">
              <div className="metric-well">
                <div className="metric-well-val">
                  <span className="gradient-text">47+</span>
                </div>
                <div className="metric-well-lbl">PWVO Polymer Classes</div>
              </div>
              <div className="metric-well">
                <div className="metric-well-val">
                  <span>&lt;440</span><span style={{ fontSize: '0.9rem', color: 'var(--neo-green)' }}>ms</span>
                </div>
                <div className="metric-well-lbl">Offline Edge Latency</div>
              </div>
              <div className="metric-well">
                <div className="metric-well-val">
                  <span>₹2.4</span><span style={{ fontSize: '0.9rem', color: 'var(--neo-green)' }}>Cr+</span>
                </div>
                <div className="metric-well-lbl">Disbursed via UPI</div>
              </div>
            </div>
          </div>

          {/* Right Hero: Live Interactive AI Classification Playground */}
          <div id="ai-scanner" className="ai-preview-console">
            <div className="console-header">
              <div className="console-tag">
                <Camera size={16} />
                <span>Edge Vision Sandbox (YOLOE-26)</span>
              </div>
              <span className="neo-badge neo-badge-green">
                <Check size={12} /> Live Engine
              </span>
            </div>

            {/* Waste Item Selector Strip */}
            <div className="item-selector-strip">
              {WASTE_SAMPLES.map(sample => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`item-chip ${selectedSample.id === sample.id ? 'active' : ''}`}
                >
                  <span>{sample.code}</span> {sample.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Viewport with Animated Laser Line & Bounding Box */}
            <div className="scan-viewport">
              <img
                src={selectedSample.img}
                alt={selectedSample.name}
                className="viewport-img"
              />
              
              {isScanning && <div className="scan-laser-line"></div>}

              {/* Dynamic Bounding Box */}
              <div
                className="bounding-box"
                style={{
                  top: selectedSample.box.top,
                  left: selectedSample.box.left,
                  width: selectedSample.box.width,
                  height: selectedSample.box.height,
                  borderColor: selectedSample.color
                }}
              >
                <div
                  className="bounding-tag"
                  style={{ background: selectedSample.color }}
                >
                  {selectedSample.code} • {scanConfidence}%
                </div>
              </div>
            </div>

            {/* Neomorphic Tactile Guidance Card */}
            <div className="guidance-panel">
              <div className="guidance-header">
                <div>
                  <h4 className="guidance-title">{selectedSample.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {selectedSample.category}
                  </span>
                </div>
                <span className="neo-badge neo-badge-blue">
                  {selectedSample.eprCategory}
                </span>
              </div>

              {/* Instructions */}
              <ul className="guidance-steps">
                {selectedSample.instructions.slice(0, 2).map((inst, i) => (
                  <li key={i} className="guidance-step-item">
                    <span className="step-num-pill">{i + 1}</span>
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>

              {/* Yield metrics */}
              <div className="guidance-yield-grid">
                <div className="yield-pill">
                  <div className="yield-val">₹{selectedSample.inrPerKg}/kg</div>
                  <div className="yield-lbl">Citizen Rate</div>
                </div>
                <div className="yield-pill">
                  <div className="yield-val">+{selectedSample.ptsPerKg} pts</div>
                  <div className="yield-lbl">Green Points</div>
                </div>
                <div className="yield-pill">
                  <div className="yield-val">-{selectedSample.co2PerKg} kg</div>
                  <div className="yield-lbl">CO₂ Abated</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          5-STEP CIRCULAR RECOVERY PIPELINE
          ═══════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="steps-section">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="neo-badge neo-badge-green" style={{ marginBottom: '0.75rem' }}>
            <Layers size={14} /> End-to-End Workflow
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 800 }}>
            How EcoLoop <span className="gradient-text">Eliminates Contamination</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0.75rem auto 0' }}>
            A synchronized physical-to-digital chain of custody from deposit to CPCB EPR certificate trading.
          </p>
        </div>

        <div className="steps-pipeline-grid">
          {[
            {
              step: '01',
              title: 'Station Pairing',
              desc: 'Scan the station physical QR code with GPS geofencing (e.g. Potheri Ward 3 Waste Bank - Station #04).'
            },
            {
              step: '02',
              title: 'Edge AI Vision',
              desc: 'Open-vocabulary neural model classifies polymers across 47 categories completely offline in <440ms.'
            },
            {
              step: '03',
              title: 'Tactile Guidance',
              desc: 'Physical affordance card guides pre-disposal preparation: cap removal, contaminant wash, and bin slot.'
            },
            {
              step: '04',
              title: 'Confidence Gating',
              desc: 'Smart scale digital logging. Auto-accepted if confidence >=0.40; otherwise flagged for manual review.'
            },
            {
              step: '05',
              title: 'Instant UPI & Trace',
              desc: 'Automated UPI payout settlement and cryptographic JSON audit log synced to the National CPCB Portal.'
            }
          ].map((pipe, idx) => (
            <div key={idx} className="step-pipe-card">
              <div className="step-pipe-idx">{pipe.step}</div>
              <h3 className="step-pipe-title">{pipe.title}</h3>
              <p className="step-pipe-desc">{pipe.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          DYNAMIC EPR & INCENTIVE CALCULATOR
          ═══════════════════════════════════════════════════════════ */}
      <section id="calculator" className="calc-section">
        <div className="calc-grid">
          
          {/* Controls */}
          <div className="calc-control-panel">
            <span className="neo-badge neo-badge-blue" style={{ marginBottom: '1rem' }}>
              <Sliders size={14} /> Interactive Yield Estimator
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Simulate Your <span className="gradient-text">Circular Yield</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9375rem' }}>
              Calculate citizen payouts, avoided greenhouse gases, and CPCB EPR compliance credits in real time.
            </p>

            {/* Waste Stream Buttons */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
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
                    className={`item-chip ${calcCategory === stream.id ? 'active' : ''}`}
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
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--neo-green-dark)' }}>
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
                className="neo-slider"
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
            <div className="calc-dial-card">
              <div className="calc-dial-icon">
                <IndianRupee size={24} />
              </div>
              <div className="calc-dial-num gradient-text">
                ₹{totalInr.toLocaleString()}
              </div>
              <div className="calc-dial-lbl">Direct Citizen Payout</div>
            </div>

            <div className="calc-dial-card">
              <div className="calc-dial-icon" style={{ color: 'var(--neo-blue)' }}>
                <Leaf size={24} />
              </div>
              <div className="calc-dial-num">
                {totalCo2} <span style={{ fontSize: '1rem' }}>kg</span>
              </div>
              <div className="calc-dial-lbl">CO₂e Abatement</div>
            </div>

            <div className="calc-dial-card">
              <div className="calc-dial-icon" style={{ color: 'var(--neo-green-dark)' }}>
                <Globe size={24} />
              </div>
              <div className="calc-dial-num">
                {totalTrees}
              </div>
              <div className="calc-dial-lbl">Equivalent Trees Protected</div>
            </div>

            <div className="calc-dial-card">
              <div className="calc-dial-icon" style={{ color: 'var(--neo-purple)' }}>
                <Award size={24} />
              </div>
              <div className="calc-dial-num">
                {totalEpr} <span style={{ fontSize: '1rem' }}>pts</span>
              </div>
              <div className="calc-dial-lbl">CPCB EPR Credit Tokens</div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MULTI-ROLE PLATFORM SANDBOX (INTERACTIVE TABS)
          ═══════════════════════════════════════════════════════════ */}
      <section id="roles" className="roles-sandbox">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="neo-badge neo-badge-purple" style={{ marginBottom: '0.75rem' }}>
            <Users size={14} /> Ecosystem Consoles
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 800 }}>
            Dedicated Consoles for <span className="gradient-text">Every Stakeholder</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0.75rem auto 0' }}>
            Experience tailored controls whether you manage municipal throughput or collect doorstep bags.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="role-tabs-strip">
          {[
            { id: 'admin', label: '🛡️ Platform Admin', role: 'admin' },
            { id: 'ngo', label: '🏢 NGO Partner', role: 'ngo' },
            { id: 'volunteer', label: '🚚 Volunteer Hauler', role: 'volunteer' },
            { id: 'hostel', label: '🎓 Hostel & Institution', role: 'hostel' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveRole(tab.id)}
              className={`role-tab-btn ${activeRole === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Role Screen Display */}
        <div className="role-console-display" key={activeRole}>
          {activeRole === 'admin' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'center' }}>
              <div>
                <span className="neo-badge neo-badge-green" style={{ marginBottom: '0.75rem' }}>
                  City-Wide Command
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>
                  Central Pollution Control Board Regulatory Command
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Monitors real-time municipal throughput across 12 zonal MRFs, automated certificate allocation, 
                  and brand EPR liability matching with tamper-proof cryptographic audit ledgers.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link to="/signup" className="neo-btn neo-btn-primary">
                    Launch Admin Console <ArrowRight size={16} />
                  </Link>
                  <Link to="/dashboard/analytics" className="neo-btn">
                    View Impact Ledger
                  </Link>
                </div>
              </div>
              <div className="neo-inset" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Zonal Diversion KPIs</span>
                  <span className="neo-badge neo-badge-green">94.2% Verified</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.25rem' }}>
                      <span>Ward 3 Potheri Waste Bank</span>
                      <strong>1,420 kg/day</strong>
                    </div>
                    <div className="neo-slider" style={{ height: '8px', pointerEvents: 'none' }}></div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.25rem' }}>
                      <span>Tambaram MRF Sorting Line</span>
                      <strong>3,890 kg/day</strong>
                    </div>
                    <div className="neo-slider" style={{ height: '8px', pointerEvents: 'none' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeRole === 'ngo' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'center' }}>
              <div>
                <span className="neo-badge neo-badge-blue" style={{ marginBottom: '0.75rem' }}>
                  Community Organizing
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>
                  Grassroots Drives & Volunteer Marshaling
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Organize neighborhood cleanups, track volunteer task execution, dispatch educational kits to schools, 
                  and view verified environmental metrics (trees protected, water conserved).
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link to="/signup" className="neo-btn neo-btn-primary">
                    Register NGO Portal <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
              <div className="neo-inset" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <Building2 size={36} color="var(--neo-blue)" style={{ margin: '0 auto 0.75rem' }} />
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800 }}>
                  14,800+ Volunteers
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Active across 42 Indian Municipalities
                </div>
              </div>
            </div>
          )}

          {activeRole === 'volunteer' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'center' }}>
              <div>
                <span className="neo-badge neo-badge-purple" style={{ marginBottom: '0.75rem' }}>
                  Last-Mile Logistics
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>
                  Doorstep Collection & Bluetooth Scale Sync
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Optimized route waypoints, digital scale calibration via Bluetooth, customer OTP verification, 
                  and automated UPI commission transfers directly to your bank account.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link to="/signup" className="neo-btn neo-btn-primary">
                    Join Volunteer Network <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
              <div className="neo-inset" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Truck size={24} color="var(--neo-purple)" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Pickup #9021 in Progress</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sector 4, Dwarka — 12.4 kg Segregated</div>
                  </div>
                </div>
                <span className="neo-badge neo-badge-green">OTP Verified • ₹186 Settled</span>
              </div>
            </div>
          )}

          {activeRole === 'hostel' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'center' }}>
              <div>
                <span className="neo-badge neo-badge-orange" style={{ marginBottom: '0.75rem' }}>
                  Kitchen & Bulk Waste
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>
                  Mess Food Waste Tracking & "Surprise Bags"
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Inspired by Winnow Vision & Too Good To Go: overhead optical food recognition, real-time prep 
                  overproduction alerts, surplus meal redistribution, and on-site Mill Recycler dehydration.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link to="/signup" className="neo-btn neo-btn-primary">
                    Institution Setup <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
              <div className="neo-inset" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Mill Recycler Status</span>
                  <span className="neo-badge neo-badge-green">Active • 84°C</span>
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  Dehydrating 45 kg Dal & Rice scrap into 8.2 kg stable biomass powder.
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Surplus Bags Claimed: 28 meals saved today
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ACCORDION FAQ
          ═══════════════════════════════════════════════════════════ */}
      <section id="faq" style={{ padding: '4.5rem 1.5rem', maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="neo-badge neo-badge-blue" style={{ marginBottom: '0.75rem' }}>
            <HelpCircle size={14} /> Clear Answers
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 800 }}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {[
            {
              q: 'How does the YOLOE-26 Edge AI classify waste offline without internet?',
              a: 'EcoLoop uses a quantized ONNX neural runtime optimized for web browsers and low-power IoT cameras. It analyzes the visual texture, opacity, specular reflection, and contour features against the 47-category Plastic Waste Vocabulary Ontology (PWVO) in <440ms completely on-device.'
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
              className="neo-card"
              style={{ cursor: 'pointer', padding: '1.5rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {faq.q}
                </h4>
                <div
                  className="neo-circle-btn"
                  style={{
                    width: '32px',
                    height: '32px',
                    transform: openFaq === i ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s ease'
                  }}
                >
                  <ChevronDown size={16} />
                </div>
              </div>
              {openFaq === i && (
                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, animation: 'fadeIn 0.2s ease' }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TACTILE NEOMORPHIC CALL TO ACTION
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '4rem 1.5rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div className="neo-card-lg" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div className="pulse-led" style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--neo-green)', margin: '0 auto 1.25rem' }}></div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
            Ready to Build a <span className="gradient-text">Circular India?</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto 2.25rem', fontSize: '1.05rem' }}>
            Join thousands of citizens, institutions, NGOs, and recyclers monetizing waste and abating landfill methane.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/signup" className="neo-btn neo-btn-primary" style={{ padding: '0.95rem 2rem', fontSize: '1.05rem' }}>
              <Zap size={20} /> Create Free Account
            </Link>
            <Link to="/dashboard/scanner" className="neo-btn" style={{ padding: '0.95rem 1.85rem', fontSize: '1.05rem' }}>
              <Camera size={18} /> Test AI Scanner Now
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          NEOMORPHIC FOOTER
          ═══════════════════════════════════════════════════════════ */}
      <footer className="neo-footer">
        <div className="footer-container">
          <div className="footer-top">
            <div>
              <div className="neo-brand" style={{ marginBottom: '1rem' }}>
                <div className="neo-brand-icon">
                  <Recycle size={22} />
                </div>
                <span className="neo-brand-name">
                  Eco<span className="gradient-text">Loop</span>
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: '320px' }}>
                Next-generation circular economy marketplace and edge AI waste intelligence compliant with CPCB EPR mandates.
              </p>
            </div>

            <div>
              <h4 style={{ fontWeight: 800, fontSize: '0.875rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>PLATFORM</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <li><Link to="/dashboard/scanner">AI Camera Scanner</Link></li>
                <li><Link to="/dashboard/marketplace">B2B Commodity Market</Link></li>
                <li><Link to="/dashboard/tracking">MRF & Telematics</Link></li>
                <li><Link to="/dashboard/epr-credits">CPCB EPR Registry</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontWeight: 800, fontSize: '0.875rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>CONSOLES</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <li><Link to="/dashboard/admin">Platform Admin</Link></li>
                <li><Link to="/dashboard/ngo">NGO Partner</Link></li>
                <li><Link to="/dashboard/volunteer">Volunteer Hauler</Link></li>
                <li><Link to="/dashboard/hostel">Hostel & Institution</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontWeight: 800, fontSize: '0.875rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>REGULATORY</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <li><a href="#" target="_blank" rel="noreferrer">CPCB Portal Guide</a></li>
                <li><a href="#" target="_blank" rel="noreferrer">PWVO 47-Ontology</a></li>
                <li><a href="#" target="_blank" rel="noreferrer">Data Integrity & Privacy</a></li>
                <li><a href="#" target="_blank" rel="noreferrer">API Documentation</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 EcoLoop Platform. Built for the Sociothon Challenge. All rights reserved.</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="pulse-led" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--neo-green)', display: 'inline-block' }}></span>
              All Systems Operational
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
