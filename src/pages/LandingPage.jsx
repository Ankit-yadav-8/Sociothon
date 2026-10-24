import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../App';
import {
  Recycle, Camera, Sparkles, Shield, Truck, BarChart3,
  TrendingUp, Award, ArrowRight, CheckCircle2, ChevronRight,
  Sun, Moon, Zap, Layers, RefreshCw, Scale, Globe, Building2,
  Users, Check, IndianRupee, Leaf, AlertCircle, Play, Pause,
  Sliders, ChevronDown, HelpCircle, ExternalLink, Terminal,
  Cpu, HardDrive, Binary, ShieldCheck
} from 'lucide-react';
import './LandingPage.css';

// 5 Interactive Waste Classification Samples with PWVO Ontology
const WASTE_SAMPLES = [
  {
    id: 'pet_bottle',
    name: 'PET Clear Rigid Bottle',
    polymer: 'PET (Polyethylene Terephthalate)',
    code: 'RIC-1 // PET',
    category: 'Rigid Plastic — Class A',
    eprCategory: 'Category I (Rigid Packaging)',
    confidence: 98.4,
    box: { top: '15%', left: '24%', width: '52%', height: '68%' },
    color: '#00FF85',
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
    code: 'RIC-2 // HDPE',
    category: 'Rigid Plastic — Class B',
    eprCategory: 'Category I (Rigid Packaging)',
    confidence: 94.8,
    box: { top: '12%', left: '20%', width: '60%', height: '74%' },
    color: '#00F0FF',
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
    code: 'RIC-7 // MLP',
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
    code: 'E-WASTE // SCH-I',
    category: 'Electronic Scrap & Urban Ore',
    eprCategory: 'E-Waste Schedule I',
    confidence: 97.9,
    box: { top: '10%', left: '16%', width: '68%', height: '76%' },
    color: '#A855F7',
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
    code: 'BIO // RECOVERY',
    category: 'Kitchen Surplus & Post-Consumer',
    eprCategory: 'Municipal Solid Waste Rules',
    confidence: 96.3,
    box: { top: '14%', left: '18%', width: '64%', height: '70%' },
    color: '#00FF85',
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
      
      {/* Cyberpunk Matrix Grid Background */}
      <div className="cyber-grid-bg"></div>

      {/* Glowing Ambient Orbs */}
      <div className="cyber-orb cyber-orb-1"></div>
      <div className="cyber-orb cyber-orb-2"></div>
      <div className="cyber-orb cyber-orb-3"></div>

      {/* ═══════════════════════════════════════════════════════════
          CYBER FROSTED NAVIGATION BAR
          ═══════════════════════════════════════════════════════════ */}
      <header className="cyber-nav">
        <div className="cyber-nav-container">
          <Link to="/" className="cyber-brand">
            <div className="cyber-brand-icon">
              <Recycle size={22} />
            </div>
            <span className="cyber-brand-name">
              &lt;Eco<span className="gradient-text">Loop</span> /&gt;
            </span>
          </Link>

          <nav className="cyber-nav-links">
            <a href="#ai-scanner" className="cyber-nav-link">// AI_SCANNER</a>
            <a href="#pipeline" className="cyber-nav-link">// PIPELINE</a>
            <a href="#calculator" className="cyber-nav-link">// CALCULATOR</a>
            <a href="#consoles" className="cyber-nav-link">// CONSOLES</a>
            <a href="#faq" className="cyber-nav-link">// FAQ</a>
          </nav>

          <div className="cyber-nav-actions">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="cyber-circle-btn"
              title={`Switch to ${theme === 'dark' ? 'Light High-Tech' : 'Dark Obsidian'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {user ? (
              <Link to={getDashboardPath(user.role)} className="cyber-btn cyber-btn-primary">
                Launch Console <ArrowRight size={15} />
              </Link>
            ) : (
              <>
                <Link to="/login" className="cyber-btn">Sign In</Link>
                <Link to="/signup" className="cyber-btn cyber-btn-primary">
                  Get Started <ArrowRight size={15} />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION (SYNTAX ERROR TECH AESTHETIC)
          ═══════════════════════════════════════════════════════════ */}
      <section className="cyber-hero">
        <div className="hero-grid">
          
          {/* Left Hero */}
          <div className="hero-left">
            <div className="hero-tag-badge">
              <Terminal size={14} />
              <span>SYSTEM: ONLINE // YOLOE-26 EDGE AI // CPCB EPR VERIFIED</span>
            </div>

            <h1 className="hero-title">
              RE-ENGINEERING<br />
              <span className="gradient-text">&lt;WASTE INTO WEALTH/&gt;</span><br />
              VIA REAL-TIME VISION.
            </h1>

            <p className="hero-desc">
              India's circular economy operating system. Combining sub-440ms edge computer vision, 
              47-category PWVO polymer ontology, calibrated smart-scale confidence gating, and instant UPI payouts.
            </p>

            <div className="hero-cta-group">
              <Link to="/signup" className="cyber-btn cyber-btn-primary" style={{ padding: '0.9rem 1.85rem', fontSize: '1rem' }}>
                <Zap size={18} /> Initialize Platform
              </Link>
              <Link to="/dashboard/scanner" className="cyber-btn" style={{ padding: '0.9rem 1.6rem', fontSize: '1rem' }}>
                <Camera size={18} /> Test AI Camera
              </Link>
            </div>

            {/* Telemetry HUD Cards */}
            <div className="hero-hud-strip">
              <div className="hud-stat-box">
                <div className="hud-val gradient-text">47+</div>
                <div className="hud-lbl">PWVO Polymer Classes</div>
              </div>
              <div className="hud-stat-box">
                <div className="hud-val">
                  <span>&lt;440</span><span style={{ fontSize: '1rem', color: 'var(--cyber-green)' }}>ms</span>
                </div>
                <div className="hud-lbl">Edge Neural Latency</div>
              </div>
              <div className="hud-stat-box">
                <div className="hud-val">
                  <span>₹2.4</span><span style={{ fontSize: '1rem', color: 'var(--cyber-green)' }}>Cr+</span>
                </div>
                <div className="hud-lbl">Direct UPI Disbursed</div>
              </div>
            </div>
          </div>

          {/* Right Hero: Cyberpunk AI Scanner Console */}
          <div id="ai-scanner" className="ai-hud-console">
            <div className="hud-header">
              <div className="hud-tag">
                <Cpu size={15} />
                <span>YOLOE-26_EDGE_RUNTIME</span>
              </div>
              <span className="cyber-badge cyber-badge-green">
                <Binary size={12} /> ONNX ACTIVE
              </span>
            </div>

            {/* Polymer Selector Chips */}
            <div className="hud-item-strip">
              {WASTE_SAMPLES.map(sample => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`hud-item-chip ${selectedSample.id === sample.id ? 'active' : ''}`}
                >
                  {sample.code}
                </button>
              ))}
            </div>

            {/* Optical Scanner Viewport with HUD Crosshairs */}
            <div className="hud-scan-viewport">
              <img
                src={selectedSample.img}
                alt={selectedSample.name}
                className="hud-viewport-img"
              />
              
              {/* Target HUD Corners */}
              <div className="hud-crosshair-tl"></div>
              <div className="hud-crosshair-tr"></div>
              <div className="hud-crosshair-bl"></div>
              <div className="hud-crosshair-br"></div>

              {/* Scanning Laser Line */}
              {isScanning && <div className="scan-laser-line"></div>}

              {/* Dynamic Bounding Box */}
              <div
                className="hud-bounding-box"
                style={{
                  top: selectedSample.box.top,
                  left: selectedSample.box.left,
                  width: selectedSample.box.width,
                  height: selectedSample.box.height,
                  borderColor: selectedSample.color
                }}
              >
                <div
                  className="hud-bounding-tag"
                  style={{ background: selectedSample.color }}
                >
                  {selectedSample.code} // {scanConfidence}%
                </div>
              </div>
            </div>

            {/* Guidance HUD Card */}
            <div className="hud-guidance-panel">
              <div className="hud-guidance-header">
                <div>
                  <h4 className="hud-guidance-title">{selectedSample.name}</h4>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                    {selectedSample.category}
                  </span>
                </div>
                <span className="cyber-badge cyber-badge-cyan">
                  {selectedSample.eprCategory}
                </span>
              </div>

              {/* Step instructions */}
              <ul className="hud-guidance-steps">
                {selectedSample.instructions.slice(0, 2).map((inst, i) => (
                  <li key={i} className="hud-step-item">
                    <span className="hud-step-idx">0{i + 1}</span>
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>

              {/* Yield Strip */}
              <div className="hud-yield-strip">
                <div className="hud-yield-cell">
                  <div className="hud-yield-val">₹{selectedSample.inrPerKg}/kg</div>
                  <div className="hud-yield-lbl">Citizen Rate</div>
                </div>
                <div className="hud-yield-cell">
                  <div className="hud-yield-val">+{selectedSample.ptsPerKg} pts</div>
                  <div className="hud-yield-lbl">Green Points</div>
                </div>
                <div className="hud-yield-cell">
                  <div className="hud-yield-val">-{selectedSample.co2PerKg} kg</div>
                  <div className="hud-yield-lbl">CO₂ Abated</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          5-STEP CIRCULAR PIPELINE (BENTO GRID)
          ═══════════════════════════════════════════════════════════ */}
      <section id="pipeline" className="pipeline-section">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="cyber-badge cyber-badge-green" style={{ marginBottom: '0.85rem' }}>
            <Layers size={14} /> ARCHITECTURE PIPELINE
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800 }}>
            Zero-Contamination <span className="gradient-text">Physical-to-Digital Flow</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0.75rem auto 0', fontSize: '1rem' }}>
            A verified chain of custody from household deposit to official CPCB EPR statutory trading.
          </p>
        </div>

        <div className="bento-pipeline-grid">
          {[
            {
              step: '01 // PAIRING',
              title: 'Station QR Lock',
              desc: 'Physical QR scan with GPS geofencing locks deposit session at Smart Kiosks or Ward 3 Waste Bank.'
            },
            {
              step: '02 // INFERENCE',
              title: 'Edge AI Vision',
              desc: 'Lightweight quantized YOLOE-26 classifies 47 plastic polymers in <440ms completely offline.'
            },
            {
              step: '03 // GUIDANCE',
              title: 'Prep Guidance',
              desc: 'Interactive HUD instructs cap unscrewing, liquid flush, and slot allocation to eliminate contamination.'
            },
            {
              step: '04 // GATING',
              title: 'Confidence Gate',
              desc: 'Smart scale digital weight logging. Confidence >=0.40 auto-accepted; lower flags human inspector.'
            },
            {
              step: '05 // LEDGER',
              title: 'Instant UPI & Trace',
              desc: 'Rolling wallet increment, instant UPI transfer, and cryptographic JSON audit synced to National Portal.'
            }
          ].map((pipe, idx) => (
            <div key={idx} className="bento-pipe-card">
              <div className="bento-pipe-tag">{pipe.step}</div>
              <h3 className="bento-pipe-title">{pipe.title}</h3>
              <p className="bento-pipe-desc">{pipe.desc}</p>
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
            <span className="cyber-badge cyber-badge-cyan" style={{ marginBottom: '1rem' }}>
              <Sliders size={14} /> SIMULATOR TERMINAL
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Simulate Your <span className="gradient-text">Recovery Yield</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9375rem' }}>
              Live econometric calculation of citizen payouts, avoided landfill emissions, and CPCB EPR credits.
            </p>

            {/* Material Stream Selector */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', marginBottom: '0.75rem' }}>
                // SELECT MATERIAL STREAM
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'plastic', label: '01 // PLASTICS' },
                  { id: 'ewaste', label: '02 // E-WASTE' },
                  { id: 'organic', label: '03 // ORGANIC' },
                  { id: 'paper', label: '04 // PAPER' },
                  { id: 'metal', label: '05 // METALS' }
                ].map(stream => (
                  <button
                    key={stream.id}
                    onClick={() => setCalcCategory(stream.id)}
                    className={`hud-item-chip ${calcCategory === stream.id ? 'active' : ''}`}
                  >
                    {stream.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Volume Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', fontWeight: 700 }}>MONTHLY VOLUME</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--cyber-green)' }}>
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
                className="cyber-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                <span>10 kg (Household)</span>
                <span>500 kg (Society)</span>
                <span>2,500 kg (Institution)</span>
              </div>
            </div>
          </div>

          {/* Dials */}
          <div className="calc-dial-grid">
            <div className="calc-dial-card">
              <div className="calc-dial-icon">
                <IndianRupee size={22} />
              </div>
              <div className="calc-dial-num gradient-text">
                ₹{totalInr.toLocaleString()}
              </div>
              <div className="calc-dial-lbl">// CITIZEN CASH SETTLED</div>
            </div>

            <div className="calc-dial-card">
              <div className="calc-dial-icon" style={{ color: 'var(--cyber-cyan)', borderColor: 'rgba(0, 240, 255, 0.3)' }}>
                <Leaf size={22} />
              </div>
              <div className="calc-dial-num">
                {totalCo2} <span style={{ fontSize: '1rem', color: 'var(--cyber-cyan)' }}>kg</span>
              </div>
              <div className="calc-dial-lbl">// CO2e GREENHOUSE ABATED</div>
            </div>

            <div className="calc-dial-card">
              <div className="calc-dial-icon" style={{ color: 'var(--cyber-green)' }}>
                <Globe size={22} />
              </div>
              <div className="calc-dial-num">
                {totalTrees}
              </div>
              <div className="calc-dial-lbl">// TREES SAVED EQUIVALENT</div>
            </div>

            <div className="calc-dial-card">
              <div className="calc-dial-icon" style={{ color: 'var(--cyber-purple)', borderColor: 'rgba(168, 85, 247, 0.3)' }}>
                <Award size={22} />
              </div>
              <div className="calc-dial-num">
                {totalEpr} <span style={{ fontSize: '1rem', color: 'var(--cyber-purple)' }}>pts</span>
              </div>
              <div className="calc-dial-lbl">// CPCB EPR CREDIT TOKENS</div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ECOSYSTEM CONSOLES (ROLE TABS)
          ═══════════════════════════════════════════════════════════ */}
      <section id="consoles" className="roles-matrix">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="cyber-badge cyber-badge-purple" style={{ marginBottom: '0.85rem' }}>
            <Users size={14} /> MULTI-STAKEHOLDER ECOSYSTEM
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800 }}>
            Dedicated Command Consoles for <span className="gradient-text">Every Role</span>
          </h2>
        </div>

        {/* Tab Buttons */}
        <div className="role-tab-bar">
          {[
            { id: 'admin', label: '01 // PLATFORM_ADMIN' },
            { id: 'ngo', label: '02 // NGO_PARTNER' },
            { id: 'volunteer', label: '03 // VOLUNTEER_HAULER' },
            { id: 'hostel', label: '04 // HOSTEL_MESS' }
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

        {/* Dynamic Role Display */}
        <div className="role-screen-display" key={activeRole}>
          {activeRole === 'admin' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'center' }}>
              <div>
                <span className="cyber-badge cyber-badge-green" style={{ marginBottom: '0.85rem' }}>
                  CENTRAL POLLUTION CONTROL BOARD COMMAND
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>
                  Municipal Throughput & Brand EPR Offset Registry
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                  Monitors live municipal processing across 12 zonal MRFs, automated statutory credit allocations, 
                  and brand liability matching with tamper-proof cryptographic audit logs.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link to="/signup" className="cyber-btn cyber-btn-primary">
                    Launch Admin Console <ArrowRight size={15} />
                  </Link>
                  <Link to="/dashboard/analytics" className="cyber-btn">
                    View Impact Ledger
                  </Link>
                </div>
              </div>
              <div className="cyber-well">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.8125rem' }}>ZONAL DIVERSION RATE</span>
                  <span className="cyber-badge cyber-badge-green">94.2% VERIFIED</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.35rem' }}>
                      <span>Ward 3 Potheri Waste Bank</span>
                      <strong>1,420 kg/day</strong>
                    </div>
                    <div className="cyber-slider" style={{ height: '6px', pointerEvents: 'none' }}></div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.35rem' }}>
                      <span>Tambaram MRF Conveyor Sorting</span>
                      <strong>3,890 kg/day</strong>
                    </div>
                    <div className="cyber-slider" style={{ height: '6px', pointerEvents: 'none' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeRole === 'ngo' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'center' }}>
              <div>
                <span className="cyber-badge cyber-badge-cyan" style={{ marginBottom: '0.85rem' }}>
                  COMMUNITY CAMPAIGN DISPATCH
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>
                  Neighborhood Cleanups & Volunteer Orchestration
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                  Organize grassroots waste drives, track volunteer milestone completions, dispatch educational kits, 
                  and view verified environmental metrics (trees protected, water conserved).
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link to="/signup" className="cyber-btn cyber-btn-primary">
                    Register NGO Portal <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
              <div className="cyber-well" style={{ textAlign: 'center' }}>
                <Building2 size={38} color="var(--cyber-cyan)" style={{ margin: '0 auto 0.75rem' }} />
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>
                  14,800+ Volunteers
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.35rem' }}>
                  Active across 42 Municipalities
                </div>
              </div>
            </div>
          )}

          {activeRole === 'volunteer' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'center' }}>
              <div>
                <span className="cyber-badge cyber-badge-purple" style={{ marginBottom: '0.85rem' }}>
                  LAST-MILE LOGISTICS FLEET
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>
                  Doorstep Collection & Bluetooth Scale Sync
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                  Optimized route waypoints, digital scale calibration via Bluetooth, customer OTP verification, 
                  and automated UPI commission transfers directly to your bank account.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link to="/signup" className="cyber-btn cyber-btn-primary">
                    Join Hauler Network <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
              <div className="cyber-well">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Truck size={24} color="var(--cyber-purple)" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#fff' }}>Pickup #9021 in Progress</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Sector 4, Dwarka — 12.4 kg Segregated</div>
                  </div>
                </div>
                <span className="cyber-badge cyber-badge-green">OTP VERIFIED // ₹186 SETTLED</span>
              </div>
            </div>
          )}

          {activeRole === 'hostel' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'center' }}>
              <div>
                <span className="cyber-badge" style={{ marginBottom: '0.85rem', color: '#F59E0B', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                  KITCHEN BULK BIOWASTE RECOVERY
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>
                  Mess Food Waste Tracking & "Surprise Bags"
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                  Overhead optical food recognition, real-time prep overproduction alerts, surplus meal redistribution 
                  via "Surprise Bags", and on-site thermomechanical dehydration into odorless dry animal feed powder.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link to="/signup" className="cyber-btn cyber-btn-primary">
                    Institution Setup <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
              <div className="cyber-well">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.8125rem' }}>MILL RECYCLER DEHYDRATOR</span>
                  <span className="cyber-badge cyber-badge-green">ACTIVE • 84°C</span>
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  Dehydrating 45 kg kitchen scraps into 8.2 kg stable organic powder.
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--cyber-green)' }}>
                  SURPLUS BAGS CLAIMED: 28 MEALS RESCUED
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          BENTO FAQ ACCORDION
          ═══════════════════════════════════════════════════════════ */}
      <section id="faq" style={{ padding: '5rem 1.75rem', maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="cyber-badge cyber-badge-cyan" style={{ marginBottom: '0.85rem' }}>
            <HelpCircle size={14} /> CLARIFICATIONS
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800 }}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            {
              q: 'How does the YOLOE-26 Edge AI classify polymers offline without internet?',
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
              className="cyber-card"
              style={{ cursor: 'pointer', padding: '1.5rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF' }}>
                  {faq.q}
                </h4>
                <div
                  className="cyber-circle-btn"
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
          CALL TO ACTION TERMINAL
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '4rem 1.75rem 6rem', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="cyber-card cyber-card-lg" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden', borderColor: 'var(--cyber-green)' }}>
          <div className="pulse-led" style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--cyber-green)', margin: '0 auto 1.25rem' }}></div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.6rem', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>
            Ready to Build a <span className="gradient-text">Circular India?</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto 2.25rem', fontSize: '1.05rem' }}>
            Join thousands of citizens, institutions, NGOs, and recyclers monetizing waste and abating landfill methane.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/signup" className="cyber-btn cyber-btn-primary" style={{ padding: '0.95rem 2.2rem', fontSize: '1.05rem' }}>
              <Zap size={18} /> Initialize Free Account
            </Link>
            <Link to="/dashboard/scanner" className="cyber-btn" style={{ padding: '0.95rem 1.85rem', fontSize: '1.05rem' }}>
              <Camera size={18} /> Launch AI Scanner
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CYBER FOOTER
          ═══════════════════════════════════════════════════════════ */}
      <footer className="cyber-footer">
        <div className="footer-container">
          <div className="footer-top">
            <div>
              <div className="cyber-brand" style={{ marginBottom: '1.25rem' }}>
                <div className="cyber-brand-icon">
                  <Recycle size={20} />
                </div>
                <span className="cyber-brand-name">
                  &lt;Eco<span className="gradient-text">Loop</span> /&gt;
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '340px' }}>
                Next-generation circular economy marketplace and edge AI waste intelligence compliant with CPCB EPR mandates.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.8125rem', marginBottom: '1rem', color: '#fff' }}>// PLATFORM</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <li><Link to="/dashboard/scanner">AI Camera Scanner</Link></li>
                <li><Link to="/dashboard/marketplace">B2B Commodity Market</Link></li>
                <li><Link to="/dashboard/tracking">MRF & Telematics</Link></li>
                <li><Link to="/dashboard/epr-credits">CPCB EPR Registry</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.8125rem', marginBottom: '1rem', color: '#fff' }}>// CONSOLES</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <li><Link to="/dashboard/admin">Platform Admin</Link></li>
                <li><Link to="/dashboard/ngo">NGO Partner</Link></li>
                <li><Link to="/dashboard/volunteer">Volunteer Hauler</Link></li>
                <li><Link to="/dashboard/hostel">Hostel & Institution</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.8125rem', marginBottom: '1rem', color: '#fff' }}>// PROTOCOL</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <li><a href="#" target="_blank" rel="noreferrer">CPCB Portal Spec</a></li>
                <li><a href="#" target="_blank" rel="noreferrer">PWVO 47-Ontology</a></li>
                <li><a href="#" target="_blank" rel="noreferrer">Data Cryptography</a></li>
                <li><a href="#" target="_blank" rel="noreferrer">Open API Docs</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 EcoLoop Platform. Built for the Sociothon Challenge.</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="pulse-led" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--cyber-green)', display: 'inline-block' }}></span>
              ALL SYSTEMS OPERATIONAL // 440MS
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
