import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../App';
import {
  Recycle, Camera, Sparkles, Shield, Truck, BarChart3,
  TrendingUp, Award, ArrowRight, CheckCircle2, ChevronRight,
  Sun, Moon, Zap, Layers, RefreshCw, Scale, Globe, Building2,
  Users, Check, IndianRupee, Leaf, AlertCircle, Play, Pause,
  Sliders, ChevronDown, HelpCircle, ExternalLink, QrCode,
  FileText, ShieldCheck, Clock, MapPin, Copy, AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';
import './LandingPage.css';

// 6 Interactive Waste Items matching YOLOE-26 & 47-Class PWVO Ontology
const WORKFLOW_ITEMS = [
  {
    id: 'pet_bottle',
    name: 'Clear Rigid PET Bottle',
    polymer: 'PET (Polyethylene Terephthalate)',
    pwvoCode: 'RIC-1 // Super Class A',
    category: 'Plastic Waste',
    rateInr: 18.0,
    ptsPerKg: 25,
    co2PerKg: 2.1,
    box: { top: '16%', left: '25%', width: '50%', height: '68%' },
    color: '#10B981',
    confidence: 0.96,
    frameCoverage: '36.8%',
    instructions: [
      'Unscrew polypropylene cap and pull off security seal ring.',
      'Rinse liquid residue with water to eliminate sugar & bacterial contaminants.',
      'Compress bottle vertically along accordion ridges to optimize baler frame volume.',
      'Deposit into Blue Bin A (Slot #01 — High Purity Clear PET Stream).'
    ],
    sampleImg: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80',
    binSlot: 'Blue Bin A — Slot #01'
  },
  {
    id: 'hdpe_jug',
    name: 'Colored HDPE Detergent Jug',
    polymer: 'HDPE (High-Density Polyethylene)',
    pwvoCode: 'RIC-2 // Super Class B',
    category: 'Plastic Waste',
    rateInr: 12.0,
    ptsPerKg: 18,
    co2PerKg: 2.6,
    box: { top: '14%', left: '20%', width: '60%', height: '72%' },
    color: '#3B82F6',
    confidence: 0.94,
    frameCoverage: '44.2%',
    instructions: [
      'Flush remaining detergent residue with 50ml warm water.',
      'Detach dispensing nozzle pump if internal spring contains metal.',
      'Flatten bottle body along side seams for baling.',
      'Deposit into Blue Bin B (Slot #02 — Colored HDPE Rigids).'
    ],
    sampleImg: 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=800&auto=format&fit=crop&q=80',
    binSlot: 'Blue Bin B — Slot #02'
  },
  {
    id: 'mlp_pouch',
    name: 'Multilayer Metallized Snack Pouch',
    polymer: 'MLP (PE / Aluminium / BOPP)',
    pwvoCode: 'RIC-7 // Category III Film',
    category: 'Plastic Waste',
    rateInr: 3.0,
    ptsPerKg: 5,
    co2PerKg: 1.4,
    box: { top: '18%', left: '22%', width: '56%', height: '62%' },
    color: '#F59E0B',
    confidence: 0.89,
    frameCoverage: '28.5%',
    instructions: [
      'Empty any residual food crumbs or seasoning.',
      'Dry wipe interior foil surface before compaction.',
      'Fold into tight bundle for pneumatic baling.',
      'Deposit into Orange Bin C (Co-processing & Cement Kilns).'
    ],
    sampleImg: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
    binSlot: 'Orange Bin C — Slot #03'
  },
  {
    id: 'food_waste',
    name: 'Institutional Kitchen Food Surplus',
    polymer: 'Organic Bio-Mass',
    pwvoCode: 'Bio-Organic // Kitchen Stream',
    category: 'Organic Waste',
    rateInr: 4.5,
    ptsPerKg: 8,
    co2PerKg: 0.9,
    box: { top: '14%', left: '18%', width: '64%', height: '70%' },
    color: '#10B981',
    confidence: 0.95,
    frameCoverage: '58.0%',
    instructions: [
      'Separate bone fragments, packaging wrappers, and fibrous stems.',
      'Drain free liquid broth to lower moisture content below 15%.',
      'Feed into on-site Mill Thermomechanical Food Recycler.',
      'Harvest odorless dry organic byproduct for soil amendment.'
    ],
    sampleImg: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    binSlot: 'Green Organic Station — Mill Dehydrator'
  },
  {
    id: 'ewaste_pcb',
    name: 'PCB Motherboard & Battery Cell',
    polymer: 'FR-4 Copper Alloy / Li-Ion',
    pwvoCode: 'E-Waste // Schedule I',
    category: 'E-Waste',
    rateInr: 110.0,
    ptsPerKg: 180,
    co2PerKg: 15.2,
    box: { top: '10%', left: '16%', width: '68%', height: '76%' },
    color: '#8B5CF6',
    confidence: 0.97,
    frameCoverage: '52.0%',
    instructions: [
      'Do not pierce, deform or puncture the lithium polymer cell.',
      'Insulate exposed terminal leads with non-conductive tape.',
      'Store in dry anti-static foam pouch.',
      'Handover to Authorized Urban Mining Vault (Station Safe #09).'
    ],
    sampleImg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    binSlot: 'Purple Safe Vault — Urban Mining #09'
  },
  {
    id: 'cardboard_scrap',
    name: 'Corrugated Cardboard & Paper',
    polymer: 'Cellulose Kraft Fiber',
    pwvoCode: 'Dry Scrap // Grade A',
    category: 'Dry Scrap',
    rateInr: 12.0,
    ptsPerKg: 16,
    co2PerKg: 1.6,
    box: { top: '15%', left: '18%', width: '64%', height: '70%' },
    color: '#3B82F6',
    confidence: 0.93,
    frameCoverage: '48.0%',
    instructions: [
      'Remove packing adhesive tapes, shipping labels, and plastic bands.',
      'Flatten boxes completely along creased edge folds.',
      'Bundle securely with natural twine.',
      'Deposit on calibrated scale for doorstep OTP collection.'
    ],
    sampleImg: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=80',
    binSlot: 'Yellow Scrap Bay — Slot #04'
  }
];

// Available Smart Bin Stations
const STATIONS = [
  { id: 'STATION_04', name: 'Potheri Ward 3 Waste Bank — Station #04', location: '12.8231° N, 80.0452° E' },
  { id: 'STATION_09', name: 'IIT Delhi Campus Hub — Station #09', location: '28.5450° N, 77.1926° E' },
  { id: 'STATION_02', name: 'Pune Urban Mining Kiosk — Station #02', location: '18.5204° N, 73.8567° E' }
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

  // ═══════════════════════════════════════════════════════════
  // WORKFLOW SANDBOX STATE (THE USER'S SPECIFIED 5-STEP ENGINE)
  // ═══════════════════════════════════════════════════════════
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(1);
  const [selectedStation, setSelectedStation] = useState(STATIONS[0]);
  const [selectedItem, setSelectedItem] = useState(WORKFLOW_ITEMS[0]);
  const [isScanning, setIsScanning] = useState(true);
  const [testWeightKg, setTestWeightKg] = useState(1.85);
  const [isLowConfidenceTest, setIsLowConfidenceTest] = useState(false);
  const [depositCompleted, setDepositCompleted] = useState(false);

  // Compute confidence and payout
  const currentConfidence = isLowConfidenceTest ? 0.32 : selectedItem.confidence;
  const isAutoAccepted = currentConfidence >= 0.40;
  const effectiveRate = isAutoAccepted ? selectedItem.rateInr : selectedItem.rateInr * 0.20; // 80% penalty cut if < 0.40
  const calculatedPayoutInr = (testWeightKg * effectiveRate).toFixed(2);
  const calculatedPoints = Math.round(testWeightKg * (isAutoAccepted ? selectedItem.ptsPerKg : selectedItem.ptsPerKg * 0.20));

  // Switch waste items in sandbox
  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setIsScanning(false);
    setTimeout(() => setIsScanning(true), 150);
  };

  // Reset or run deposit
  const handleConfirmDeposit = () => {
    setDepositCompleted(true);
    setActiveWorkflowStep(5);
    toast.success(`Deposit Settled! ₹${calculatedPayoutInr} credited via UPI.`);
  };

  // Generated JSON Scan Provenance Payload
  const cpcbAuditJson = JSON.stringify({
    event_id: `EVT-${selectedStation.id}-${Date.now().toString().slice(-6)}`,
    station_id: selectedStation.id,
    gps_coordinates: selectedStation.location,
    timestamp_utc: new Date().toISOString(),
    depositor_vpa: 'citizen.98402@okhdfcbank',
    pwvo_classification: selectedItem.pwvoCode,
    polymer_name: selectedItem.polymer,
    optical_confidence: currentConfidence,
    confidence_gate_status: isAutoAccepted ? 'AUTO_ACCEPTED_GE_0.40' : 'OPERATOR_REVIEW_FLAGGED_LT_0.40',
    scale_weight_kg: testWeightKg,
    market_rate_inr_per_kg: selectedItem.rateInr,
    payout_settlement_inr: parseFloat(calculatedPayoutInr),
    green_points_credited: calculatedPoints,
    cpcb_epr_hash_sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
  }, null, 2);

  const copyJsonTrace = () => {
    navigator.clipboard.writeText(cpcbAuditJson);
    toast.success('CPCB EPR JSON Trace copied to clipboard!');
  };

  // ═══════════════════════════════════════════════════════════
  // 5 MAJOR WASTE CATEGORIES TAB STATE (FEATURE 2)
  // ═══════════════════════════════════════════════════════════
  const [activeCategoryTab, setActiveCategoryTab] = useState('plastics');

  // ═══════════════════════════════════════════════════════════
  // CALCULATOR STATE (FEATURE 3)
  // ═══════════════════════════════════════════════════════════
  const [calcKg, setCalcKg] = useState(350);
  const [calcCategory, setCalcCategory] = useState('plastic');

  const streamMultipliers = {
    plastic: { inr: 18.0, co2: 2.2, tree: 0.12, epr: 1.0 },
    ewaste: { inr: 110.0, co2: 14.5, tree: 0.85, epr: 2.5 },
    organic: { inr: 4.5, co2: 0.9, tree: 0.05, epr: 0.4 },
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

  // FAQ Accordion
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
          TOP NAVIGATION BAR
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
            <a href="#interactive-workflow" className="nav-item-link">Interactive Workflow</a>
            <a href="#waste-categories" className="nav-item-link">5 Waste Streams</a>
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
          
          {/* Left Column */}
          <div className="hero-left-column">
            <div className="hero-pill-badge">
              <Sparkles size={14} />
              <span>India's AI-Driven Waste Recovery & CPCB EPR Marketplace</span>
            </div>

            <h1 className="hero-main-title">
              Transforming Waste into
              <span className="gradient-text"> Wealth</span>
              <br />with Intelligent Recycling
            </h1>

            <p className="hero-sub-text">
              An enterprise circular economy platform connecting households, commercial kitchens, NGOs, 
              and certified recyclers. Featuring real-time edge AI classification across 47 polymer classes, 
              digital scale confidence gating, instant UPI rewards, and statutory CPCB EPR compliance.
            </p>

            <div className="hero-btn-row">
              <a href="#interactive-workflow" className="modern-btn modern-btn-primary" style={{ padding: '0.9rem 1.85rem', fontSize: '1rem' }}>
                <Zap size={18} /> Test Interactive Workflow
              </a>
              <Link to="/dashboard/scanner" className="modern-btn" style={{ padding: '0.9rem 1.6rem', fontSize: '1rem' }}>
                <Camera size={18} /> Launch AI Camera
              </Link>
            </div>

            {/* Metrics Row */}
            <div className="hero-stats-row">
              <div className="stat-metric-card">
                <div className="stat-metric-number gradient-text">47+</div>
                <div className="stat-metric-label">PWVO Polymer Classes</div>
              </div>
              <div className="stat-metric-card">
                <div className="stat-metric-number">
                  <span>&lt;440</span><span style={{ fontSize: '1rem', color: 'var(--accent-green)' }}>ms</span>
                </div>
                <div className="stat-metric-label">Edge AI Offline Latency</div>
              </div>
              <div className="stat-metric-card">
                <div className="stat-metric-number">
                  <span>₹2.5</span><span style={{ fontSize: '1rem', color: 'var(--accent-green)' }}>Cr+</span>
                </div>
                <div className="stat-metric-label">Disbursed via Instant UPI</div>
              </div>
              <div className="stat-metric-card">
                <div className="stat-metric-number" style={{ color: 'var(--accent-blue)' }}>
                  100%
                </div>
                <div className="stat-metric-label">CPCB EPR Audit Trace</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Quick AI Scanner Card */}
          <div className="scanner-demo-card">
            <div className="scanner-card-header">
              <div className="scanner-header-title">
                <Camera size={16} />
                <span>YOLOE-26 Edge Neural Net Preview</span>
              </div>
              <span className="modern-badge neo-badge-green">
                <Check size={12} /> ONNX Offline Active
              </span>
            </div>

            {/* Material Stream Selector Tabs */}
            <div className="stream-chips-scroll">
              {WORKFLOW_ITEMS.slice(0, 4).map(item => (
                <button
                  key={item.id}
                  onClick={() => handleItemSelect(item)}
                  className={`stream-chip-btn ${selectedItem.id === item.id ? 'active' : ''}`}
                >
                  {item.name.split(' ')[0]} {item.name.split(' ')[1]}
                </button>
              ))}
            </div>

            {/* Camera Viewport */}
            <div className="camera-viewport-frame">
              <img
                src={selectedItem.sampleImg}
                alt={selectedItem.name}
                className="camera-preview-img"
              />

              {isScanning && <div className="scan-laser-line"></div>}

              {/* Dynamic Bounding Box */}
              <div
                className="viewport-target-box"
                style={{
                  top: selectedItem.box.top,
                  left: selectedItem.box.left,
                  width: selectedItem.box.width,
                  height: selectedItem.box.height,
                  borderColor: selectedItem.color
                }}
              >
                <div
                  className="target-badge-label"
                  style={{ background: selectedItem.color }}
                >
                  {selectedItem.pwvoCode.split('//')[0]} • {(selectedItem.confidence * 100).toFixed(0)}%
                </div>
              </div>
            </div>

            {/* Pre-Disposal Guidance Drawer */}
            <div className="guidance-drawer">
              <div className="guidance-drawer-header">
                <div>
                  <h4 className="guidance-material-name">{selectedItem.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {selectedItem.category} • Coverage {selectedItem.frameCoverage}
                  </span>
                </div>
                <span className="modern-badge neo-badge-blue">
                  ₹{selectedItem.rateInr}/kg Rate Card
                </span>
              </div>

              {/* Instructions */}
              <ul className="guidance-steps-list">
                {selectedItem.instructions.slice(0, 2).map((inst, i) => (
                  <li key={i} className="guidance-step-row">
                    <span className="step-number-circle">{i + 1}</span>
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>

              {/* Yield Strip */}
              <div className="yield-stats-strip">
                <div className="yield-box">
                  <div className="yield-amount">₹{selectedItem.rateInr}/kg</div>
                  <div className="yield-sublabel">Citizen Rate</div>
                </div>
                <div className="yield-box">
                  <div className="yield-amount">+{selectedItem.ptsPerKg} pts</div>
                  <div className="yield-sublabel">Green Points</div>
                </div>
                <div className="yield-box">
                  <div className="yield-amount">-{selectedItem.co2PerKg} kg</div>
                  <div className="yield-sublabel">CO₂ Abated</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FEATURE 1: LIVE INTERACTIVE END-TO-END WORKFLOW SANDBOX
          (User Finds Waste -> Scan QR -> AI Vision -> Guidance -> Deposit -> UPI Settlement)
          ═══════════════════════════════════════════════════════════ */}
      <section id="interactive-workflow" className="workflow-sandbox-section">
        <div className="section-headline-center">
          <span className="modern-badge neo-badge-green">
            <Zap size={14} /> Complete Circular Workflow Simulation
          </span>
          <h2 className="section-h2">
            Try the Complete <span className="gradient-text">Deposit & UPI Reward Flow</span>
          </h2>
          <p className="section-p">
            Experience the exact journey from station pairing and edge AI optical recognition to tactile guidance, 
            confidence gating, and instant UPI settlement.
          </p>
        </div>

        <div className="workflow-container">
          
          {/* Stepper Header Navigation */}
          <div className="workflow-stepper-header">
            {[
              { step: 1, title: '01. Find Waste & QR Pair', desc: 'Scan Station QR' },
              { step: 2, title: '02. Edge AI Scan', desc: 'YOLOE-26 Analysis' },
              { step: 3, title: '03. Tactile Guidance', desc: 'Prep & Slot Clean' },
              { step: 4, title: '04. Digital Scale & Gate', desc: 'Weight & Conf Gating' },
              { step: 5, title: '05. Instant UPI & CPCB', desc: 'Disbursement & Ledger' }
            ].map(tab => (
              <div
                key={tab.step}
                onClick={() => setActiveWorkflowStep(tab.step)}
                className={`workflow-step-tab ${activeWorkflowStep === tab.step ? 'active' : ''}`}
              >
                <div className="step-tab-num">{tab.step}</div>
                <div>
                  <div className="step-tab-title">{tab.title}</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{tab.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* STEP 1: FIND WASTE & PAIR STATION QR */}
          {activeWorkflowStep === 1 && (
            <div className="workflow-stage-grid">
              <div>
                <span className="modern-badge neo-badge-blue" style={{ marginBottom: '0.75rem' }}>
                  <QrCode size={14} /> Step 01: Physical Station Pairing
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>
                  Select Smart Kiosk & Authenticate Deposit Session
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Citizens scan the physical QR code affixed to municipal kiosks or community waste banks. 
                  GPS validation locks the session and confirms the calibrated digital scales are operational.
                </p>

                {/* Station Picker */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                  {STATIONS.map(st => (
                    <div
                      key={st.id}
                      onClick={() => setSelectedStation(st)}
                      style={{
                        padding: '1rem',
                        borderRadius: '12px',
                        background: selectedStation.id === st.id ? 'var(--accent-green-subtle)' : 'var(--bg-tertiary)',
                        border: selectedStation.id === st.id ? '1px solid var(--accent-green)' : '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{st.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <MapPin size={12} /> {st.location}
                        </div>
                      </div>
                      {selectedStation.id === st.id && <CheckCircle2 size={18} color="var(--accent-green)" />}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveWorkflowStep(2)}
                  className="modern-btn modern-btn-primary"
                  style={{ width: '100%', padding: '0.9rem' }}
                >
                  Pair Station & Open AI Camera <ArrowRight size={16} />
                </button>
              </div>

              {/* Station QR Graphic */}
              <div className="modern-well" style={{ textAlign: 'center', padding: '2.5rem' }}>
                <div style={{ width: '180px', height: '180px', margin: '0 auto 1.5rem', padding: '1rem', background: '#FFFFFF', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <QrCode size={140} color="#0A0E17" />
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{selectedStation.name}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--accent-green)', marginTop: '0.35rem', fontWeight: 600 }}>
                  ● GPS Verified & Ready for Deposit
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: EDGE AI CAMERA SCAN & CLASSIFICATION */}
          {activeWorkflowStep === 2 && (
            <div className="workflow-stage-grid">
              <div>
                <span className="modern-badge neo-badge-green" style={{ marginBottom: '0.75rem' }}>
                  <Camera size={14} /> Step 02: On-Device Neural Classification
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>
                  YOLOE-26 & 47-Class PWVO Detection in &lt;440ms
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                  Choose a waste item below to simulate pointing your smartphone camera. The system detects polymer super-class, 
                  surface opacity, and calculates 2D frame coverage completely offline.
                </p>

                {/* Waste Item Chips */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  {WORKFLOW_ITEMS.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleItemSelect(item)}
                      className={`stream-chip-btn ${selectedItem.id === item.id ? 'active' : ''}`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>

                <div className="gating-status-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 600 }}>Detected Polymer:</span>
                    <strong style={{ color: 'var(--accent-green)' }}>{selectedItem.polymer}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 600 }}>Ontology Super-Class:</span>
                    <span>{selectedItem.pwvoCode}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                    <span style={{ fontWeight: 600 }}>Frame Coverage:</span>
                    <span>{selectedItem.frameCoverage}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveWorkflowStep(3)}
                  className="modern-btn modern-btn-primary"
                  style={{ width: '100%', padding: '0.9rem' }}
                >
                  View Preparation Instructions <ArrowRight size={16} />
                </button>
              </div>

              {/* Camera Frame */}
              <div className="camera-hud-frame">
                <img src={selectedItem.sampleImg} alt={selectedItem.name} className="camera-hud-img" />
                <div className="scan-laser-line"></div>
                <div
                  className="hud-target-box"
                  style={{
                    top: selectedItem.box.top,
                    left: selectedItem.box.left,
                    width: selectedItem.box.width,
                    height: selectedItem.box.height,
                    borderColor: selectedItem.color
                  }}
                >
                  <div className="hud-pill-tag" style={{ background: selectedItem.color }}>
                    {selectedItem.name} • {(selectedItem.confidence * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: TACTILE NEOMORPHIC INSTRUCTION CARD */}
          {activeWorkflowStep === 3 && (
            <div className="workflow-stage-grid">
              <div>
                <span className="modern-badge neo-badge-purple" style={{ marginBottom: '0.75rem' }}>
                  <ShieldCheck size={14} /> Step 03: Tactile Preparation Card
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>
                  Pre-Disposal Instructions to Eliminate Contamination
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Contamination in dry waste degrades baler feedstock value. Follow the tactile instructions card before 
                  dropping the item into the designated smart bin slot.
                </p>

                <div className="tactile-instruction-card" style={{ marginBottom: '1.5rem' }}>
                  <div className="tactile-instruction-header">
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{selectedItem.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Target Slot: {selectedItem.binSlot}</div>
                    </div>
                    <span className="modern-badge neo-badge-green">Quality Card</span>
                  </div>

                  <ul className="instruction-step-list">
                    {selectedItem.instructions.map((inst, idx) => (
                      <li key={idx} className="instruction-step-item">
                        <span className="instruction-num-dot">{idx + 1}</span>
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-card)', borderRadius: '10px', fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="var(--accent-green)" />
                    <span>Follow steps 1–4 to guarantee 100% full payout tariff without contamination deduction.</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveWorkflowStep(4)}
                  className="modern-btn modern-btn-primary"
                  style={{ width: '100%', padding: '0.9rem' }}
                >
                  Proceed to Smart Scale Weighing <ArrowRight size={16} />
                </button>
              </div>

              {/* Visual Guidance Illustration */}
              <div className="modern-well" style={{ padding: '2rem' }}>
                <h4 style={{ fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>Smart Bin Slot Allocation</h4>
                <div style={{ padding: '1.25rem', borderRadius: '12px', background: 'var(--bg-card)', border: '2px dashed var(--accent-green)', textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>📥</div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-green)' }}>{selectedItem.binSlot}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    Door solenoid unlocked for active session
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="yield-box">
                    <div className="yield-amount">₹{selectedItem.rateInr}/kg</div>
                    <div className="yield-sublabel">Base Scrap Rate</div>
                  </div>
                  <div className="yield-box">
                    <div className="yield-amount">+{selectedItem.ptsPerKg} pts</div>
                    <div className="yield-sublabel">Green Points/kg</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: DIGITAL SCALE WEIGHING & CONFIDENCE GATING */}
          {activeWorkflowStep === 4 && (
            <div className="workflow-stage-grid">
              <div>
                <span className="modern-badge neo-badge-blue" style={{ marginBottom: '0.75rem' }}>
                  <Scale size={14} /> Step 04: Digital Weighing & Confidence Gating
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>
                  Calibrated Load Cell & Confidence Cutoff ($\ge 0.40$)
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Deposit items on the calibrated digital scale. High confidence scans ($\ge 0.40$) are automatically 
                  credited at the full polymer card rate. Low confidence scans trigger an automatic 80% penalty cut or 
                  human operator review.
                </p>

                {/* Weight Slider Simulation */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>Simulate Deposit Net Weight</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-green)' }}>
                      {testWeightKg} kg
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="10.0"
                    step="0.1"
                    value={testWeightKg}
                    onChange={(e) => setTestWeightKg(parseFloat(e.target.value))}
                    className="modern-slider"
                  />
                </div>

                {/* Toggle Low Confidence Test */}
                <div style={{ padding: '0.85rem 1rem', borderRadius: '10px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Test Low Confidence Scenario (&lt; 0.40)</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Simulate blurry photo or citizen-flagged scan</div>
                  </div>
                  <button
                    onClick={() => setIsLowConfidenceTest(!isLowConfidenceTest)}
                    className="modern-btn"
                    style={{
                      background: isLowConfidenceTest ? 'var(--accent-red)' : 'var(--bg-card)',
                      color: isLowConfidenceTest ? '#fff' : 'var(--text-primary)',
                      padding: '0.4rem 0.85rem',
                      fontSize: '0.8125rem'
                    }}
                  >
                    {isLowConfidenceTest ? 'Flagged (<0.40)' : 'Normal (>=0.40)'}
                  </button>
                </div>

                <div className="gating-status-card" style={{ borderColor: isAutoAccepted ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    {isAutoAccepted ? (
                      <CheckCircle2 size={18} color="var(--accent-green)" />
                    ) : (
                      <AlertTriangle size={18} color="var(--accent-red)" />
                    )}
                    <strong style={{ fontSize: '0.9375rem', color: isAutoAccepted ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                      {isAutoAccepted ? 'Auto-Accepted (100% Tariff Rate)' : 'Low Confidence Flagged (80% Penalty Cut)'}
                    </strong>
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    Optical Confidence: {(currentConfidence * 100).toFixed(0)}% • Threshold: $\ge 0.40$ • Effective Rate: ₹{effectiveRate}/kg
                  </div>
                </div>

                <button
                  onClick={handleConfirmDeposit}
                  className="modern-btn modern-btn-primary"
                  style={{ width: '100%', padding: '0.9rem' }}
                >
                  Confirm Deposit & Settle Instant UPI <ArrowRight size={16} />
                </button>
              </div>

              {/* Digital Scale Display */}
              <div className="modern-well" style={{ textAlign: 'center', padding: '2.5rem' }}>
                <Scale size={42} color="var(--accent-green)" style={{ margin: '0 auto 1rem' }} />
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  {testWeightKg.toFixed(2)} <span style={{ fontSize: '1.25rem', color: 'var(--accent-green)' }}>KG</span>
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Calibrated Digital Load Cell • Station #04
                </div>

                <div style={{ padding: '1rem', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Formula: Scale Weight ({testWeightKg} kg) × Tariff (₹{effectiveRate}/kg)</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-green)', marginTop: '0.25rem' }}>
                    = ₹{calculatedPayoutInr} UPI Credit
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: INSTANT UPI SETTLEMENT & CPCB EPR JSON LOG */}
          {activeWorkflowStep === 5 && (
            <div className="workflow-stage-grid">
              <div>
                <span className="modern-badge neo-badge-green" style={{ marginBottom: '0.75rem' }}>
                  <Award size={14} /> Step 05: Instant Settlement & Provenance Ledger
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>
                  Instant UPI Payout & CPCB Cryptographic JSON
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Funds disburse immediately to the citizen's linked bank account via UPI. Simultaneously, a tamper-proof 
                  JSON record is generated and synced to the National CPCB Extended Producer Responsibility portal.
                </p>

                {/* Instant UPI Receipt Card */}
                <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'var(--accent-green-subtle)', border: '1px solid var(--accent-green)', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--accent-green)' }}>UPI Transaction Successful</div>
                    <span className="modern-badge neo-badge-green">Instant Settlement</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    +₹{calculatedPayoutInr}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    Credited to: citizen.98402@okhdfcbank • Ref: UPI-{Date.now().toString().slice(-8)}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--accent-green)', marginTop: '0.5rem', fontWeight: 600 }}>
                    +{calculatedPoints} Green Points added to circular wallet!
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={copyJsonTrace}
                    className="modern-btn"
                    style={{ flex: 1, padding: '0.85rem' }}
                  >
                    <Copy size={16} /> Copy CPCB JSON Trace
                  </button>
                  <button
                    onClick={() => setActiveWorkflowStep(1)}
                    className="modern-btn modern-btn-primary"
                    style={{ flex: 1, padding: '0.85rem' }}
                  >
                    <RefreshCw size={16} /> Start New Deposit
                  </button>
                </div>
              </div>

              {/* JSON Trace Viewer */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    CPCB Common EPR Portal Schema (Audit Ready)
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--accent-blue)', fontFamily: 'monospace' }}>
                    SHA-256 SIGNED
                  </span>
                </div>
                <pre className="json-provenance-box">
                  {cpcbAuditJson}
                </pre>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FEATURE 2: 5 MAJOR WASTE RECOVERY CATEGORIES DEEP-DIVE
          (Plastics, Food Waste, E-Waste, Dry Scrap, Municipal Logistics)
          ═══════════════════════════════════════════════════════════ */}
      <section id="waste-categories" className="categories-section">
        <div className="section-headline-center">
          <span className="modern-badge neo-badge-blue">
            <Layers size={14} /> Comprehensive Stream Workflows
          </span>
          <h2 className="section-h2">
            The 5 Pillar <span className="gradient-text">Waste Recovery Architectures</span>
          </h2>
          <p className="section-p">
            Tailored digital workflows engineered for plastics, commercial hospitality kitchens, electronic urban mining, 
            household dry scrap, and municipal service orchestration.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs-bar">
          {[
            { id: 'plastics', label: '1. Plastics (Waste Bank)', icon: Recycle },
            { id: 'food', label: '2. Food & Kitchen (Commercial)', icon: Leaf },
            { id: 'ewaste', label: '3. E-Waste (Urban Mining)', icon: Zap },
            { id: 'dryscrap', label: '4. Dry Scrap (Paper/Metal)', icon: Truck },
            { id: 'municipal', label: '5. Municipal (Logistics)', icon: Globe }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategoryTab(tab.id)}
              className={`category-tab-btn ${activeCategoryTab === tab.id ? 'active' : ''}`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Detailed Category View */}
        <div className="category-detail-card" key={activeCategoryTab}>
          
          {/* TAB 1: PLASTIC WASTE */}
          {activeCategoryTab === 'plastics' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span className="modern-badge neo-badge-green" style={{ marginBottom: '0.5rem' }}>Community & Plastic Waste Bank Model</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    PlastiVision-Edge & 47-Category PWVO Ontology
                  </h3>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span className="modern-badge neo-badge-blue">Scrapo Trading Ready</span>
                  <span className="modern-badge neo-badge-green">CPCB EPR Portal</span>
                </div>
              </div>

              <div className="category-workflow-grid">
                <div className="cat-subflow-box">
                  <div className="subflow-idx">Step 01 // Source Segregation</div>
                  <h4 className="subflow-title">Household Polymer Sorting</h4>
                  <p className="subflow-desc">
                    Households sort dry plastic waste into color-coded bags by polymer super-class (PET, HDPE, PP, LDPE, Multilayer, EPS).
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Step 02 // Point-of-Deposit</div>
                  <h4 className="subflow-title">YOLOE-26 Edge Inference</h4>
                  <p className="subflow-desc">
                    Waste bank operator takes a photo using PlastiVision-Edge running offline in ~440ms, calculating 2D pixel coverage.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Step 03 // Confidence Gating</div>
                  <h4 className="subflow-title">Automated Threshold ($ \ge 0.40 $)</h4>
                  <p className="subflow-desc">
                    Confidence $\ge 0.40$ auto-credits at full rate. Low-confidence scans trigger an 80% penalty cut or manual operator review.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Step 04 // Dynamic Tariffs</div>
                  <h4 className="subflow-title">Polymer Market Cards</h4>
                  <p className="subflow-desc">
                    Citizens receive specific scrap rates: PET (₹18/kg), PP (₹14/kg), HDPE (₹12/kg), LDPE (₹10/kg), Multilayer (₹3/kg).
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Step 05 // EPR Traceability</div>
                  <h4 className="subflow-title">CPCB Provenance JSON</h4>
                  <p className="subflow-desc">
                    Generates verifiable JSON logs containing GPS, timestamp, depositor ID, polymer class, and mass uploaded to the Common EPR Portal.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Step 06 // B2B Trading</div>
                  <h4 className="subflow-title">Scrapo Marketplace</h4>
                  <p className="subflow-desc">
                    Sorted plastics are baled and supplied directly to certified recyclers or traded globally via B2B digital marketplaces like Scrapo.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FOOD & ORGANIC WASTE */}
          {activeCategoryTab === 'food' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span className="modern-badge neo-badge-green" style={{ marginBottom: '0.5rem' }}>Commercial Kitchens & Campus Mess</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Orbisk & Winnow Vision Optical Prep Intelligence
                  </h3>
                </div>
                <span className="modern-badge" style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#F59E0B', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                  Too Good To Go Surprise Bags
                </span>
              </div>

              <div className="category-workflow-grid">
                <div className="cat-subflow-box">
                  <div className="subflow-idx">Phase 01 // Vision Capture</div>
                  <h4 className="subflow-title">Above-Bin & In-Bin Optics</h4>
                  <p className="subflow-desc">
                    Above-bin cameras (Orbisk-style) scan leftover food on trays; in-bin load cells (Winnow-style) trigger snapshots as food drops into bins.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Phase 02 // Categorization</div>
                  <h4 className="subflow-title">1,000+ Ingredient Neural Net</h4>
                  <p className="subflow-desc">
                    Onboard neural models classify discarded ingredients in real time, logging exact monetary food cost and avoided greenhouse $\text{CO}_2\text{e}$.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Phase 03 // Predictive Prep</div>
                  <h4 className="subflow-title">Fullsoon Menu Optimization</h4>
                  <p className="subflow-desc">
                    Historical waste logs combine with POS transaction data, room occupancy, and weather forecasts to recommend right-sized prep quotas.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Phase 04 // Dynamic Clearance</div>
                  <h4 className="subflow-title">"Surprise Bags" Redistribution</h4>
                  <p className="subflow-desc">
                    Unsold prepared meals near close-of-business are packaged into discounted "Surprise Bags" for hyper-local student pickup.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Phase 05 // Dehydration</div>
                  <h4 className="subflow-title">Mill Thermomechanical Recycler</h4>
                  <p className="subflow-desc">
                    On-site processing units apply heat & mechanical shear, evaporating 70%–80% water content and reducing scrap volume by 80%.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Phase 06 // Circular Byproduct</div>
                  <h4 className="subflow-title">Dry Soil Amendment Feed</h4>
                  <p className="subflow-desc">
                    Yields odorless, nutrient-dense organic dry feed powder for campus landscaping or regional poultry farms.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: E-WASTE & URBAN MINING */}
          {activeCategoryTab === 'ewaste' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span className="modern-badge neo-badge-purple" style={{ marginBottom: '0.5rem' }}>Formal Urban Mining & Recovery</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Ecoex & Recykal Model Electronic Waste Hub
                  </h3>
                </div>
                <span className="modern-badge neo-badge-purple">Schedule I Compliant</span>
              </div>

              <div className="category-workflow-grid">
                <div className="cat-subflow-box">
                  <div className="subflow-idx">Stage 01 // Requirement Listing</div>
                  <h4 className="subflow-title">Corporate Bulk Inventory</h4>
                  <p className="subflow-desc">
                    Bulk generators and consumers log obsolete servers, appliances, and mobile hardware onto digital auction marketplaces.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Stage 02 // E-Auctions</div>
                  <h4 className="subflow-title">Algorithmic Match Engine</h4>
                  <p className="subflow-desc">
                    Evaluates device category, logistics geometry, and volume, hosting competitive live e-auctions with certified dismantlers.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Stage 03 // Formal Channelization</div>
                  <h4 className="subflow-title">Formalized Kabadiwalas</h4>
                  <p className="subflow-desc">
                    Pickup logistics dispatched to licensed haulers and formalized informal scrap collectors with worker safety protocols and OTP.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Stage 04 // Precious Metal Mining</div>
                  <h4 className="subflow-title">Urban Ore Extraction</h4>
                  <p className="subflow-desc">
                    Authorized processing facilities safely extract gold, silver, copper, and rare earth elements while isolating toxic lead & mercury.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Stage 05 // Statutory Certificates</div>
                  <h4 className="subflow-title">CPCB EPR Credit Generation</h4>
                  <p className="subflow-desc">
                    Certified recyclers record processed tonnage on CPCB portals, generating unique EPR credit certificates purchased by brand owners.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Stage 06 // Secondary Foundry</div>
                  <h4 className="subflow-title">Smelting & Circular Ingot</h4>
                  <p className="subflow-desc">
                    Recovered non-ferrous and precious alloys return directly into domestic electronics and EV battery manufacturing supply chains.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GENERAL HOUSEHOLD DRY SCRAP */}
          {activeCategoryTab === 'dryscrap' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span className="modern-badge neo-badge-blue" style={{ marginBottom: '0.5rem' }}>Paper, Cardboard, Glass & Metal Scrap</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Scrapp & The Kabadiwala Doorstep Flow
                  </h3>
                </div>
                <span className="modern-badge neo-badge-blue">Greyparrot MRF Sorting</span>
              </div>

              <div className="category-workflow-grid">
                <div className="cat-subflow-box">
                  <div className="subflow-idx">Step 01 // Barcode Guidance</div>
                  <h4 className="subflow-title">Scrapp-Inspired Scanning</h4>
                  <p className="subflow-desc">
                    Consumers scan product retail barcodes prior to disposal, receiving instant municipal recycling rules and prep guidance.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Step 02 // Price Transparency</div>
                  <h4 className="subflow-title">Live Dynamic Scrap Tariff</h4>
                  <p className="subflow-desc">
                    Residents view daily market cards for corrugated cardboard (₹12/kg), copper (₹420/kg), aluminum (₹110/kg), and glass.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Step 03 // Doorstep OTP</div>
                  <h4 className="subflow-title">Verified Hauler Pickup</h4>
                  <p className="subflow-desc">
                    Assigned scrap agent arrives on scheduled date; the collection event is authenticated via customer app OTP verification.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Step 04 // On-Site Weighing</div>
                  <h4 className="subflow-title">Digital Scale Settlement</h4>
                  <p className="subflow-desc">
                    Items weighed on Bluetooth digital scales, logged into the hauler console, and settled instantly via UPI alongside digital invoices.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Step 05 // MRF Optical Sort</div>
                  <h4 className="subflow-title">Greyparrot Multi-Spectral</h4>
                  <p className="subflow-desc">
                    Conveyor belts pass beneath multi-spectral camera arrays guiding high-speed pneumatic air jets to sort into purity streams.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Step 06 // Mill Supply</div>
                  <h4 className="subflow-title">Paper & Foundry Bales</h4>
                  <p className="subflow-desc">
                    High-density compressed bales supply kraft paper mills and secondary aluminum foundries across India.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MUNICIPAL & COMMERCIAL SERVICE ORCHESTRATION */}
          {activeCategoryTab === 'municipal' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span className="modern-badge neo-badge-green" style={{ marginBottom: '0.5rem' }}>Fleet Telematics & City Operations</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    RUBICONConnect Service Orchestration
                  </h3>
                </div>
                <span className="modern-badge neo-badge-green">Ward-Level Analytics</span>
              </div>

              <div className="category-workflow-grid">
                <div className="cat-subflow-box">
                  <div className="subflow-idx">Engine 01 // Service Requests</div>
                  <h4 className="subflow-title">Automated Schedule Triggers</h4>
                  <p className="subflow-desc">
                    Commercial businesses or municipal departments submit pickup triggers or smart-bin fill-level alerts via cloud portals.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Engine 02 // Algorithmic Routing</div>
                  <h4 className="subflow-title">Dynamic Route Geometry</h4>
                  <p className="subflow-desc">
                    Central dispatch engines evaluate route distance, fleet availability, and tipping fee economics to optimize vehicle turns.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Engine 03 // Telematics Verification</div>
                  <h4 className="subflow-title">GPS & RFID Bin Lifts</h4>
                  <p className="subflow-desc">
                    Drivers log bin lifts using mobile telematics apps, RFID tag scanners, and vehicle cameras to document street-level service.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Engine 04 // Tipping Analytics</div>
                  <h4 className="subflow-title">MRF Weight Integrations</h4>
                  <p className="subflow-desc">
                    Vehicles tip loads at MRFs where weighbridge scale readings feed directly into central city sustainability databases.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Engine 05 // Diversion KPIs</div>
                  <h4 className="subflow-title">Landfill Methane Abatement</h4>
                  <p className="subflow-desc">
                    Automated dashboards compute zonal diversion percentages, operational spending visibility, and greenhouse gas metrics.
                  </p>
                </div>

                <div className="cat-subflow-box">
                  <div className="subflow-idx">Engine 06 // Statutory Reports</div>
                  <h4 className="subflow-title">National Urban Portal Sync</h4>
                  <p className="subflow-desc">
                    Exports verified municipal compliance metrics matching Ministry of Housing and Urban Affairs (MoHUA) standards.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FEATURE 3: DYNAMIC EPR & INCENTIVE CALCULATOR
          ═══════════════════════════════════════════════════════════ */}
      <section id="calculator" className="calc-section">
        <div className="calc-grid-layout">
          
          {/* Controls */}
          <div className="calc-panel">
            <span className="modern-badge neo-badge-blue" style={{ marginBottom: '1rem' }}>
              <Sliders size={14} /> Econometric Simulator
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
                  { id: 'organic', label: '🍃 Kitchen Scraps' },
                  { id: 'paper', label: '📄 Paper/Cardboard' },
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
                <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>Monthly Volume</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-green)' }}>
                  {calcKg.toLocaleString()} kg
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="5000"
                step="10"
                value={calcKg}
                onChange={(e) => setCalcKg(Number(e.target.value))}
                className="modern-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>10 kg (Individual)</span>
                <span>500 kg (Society)</span>
                <span>5,000 kg (Commercial)</span>
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
          FEATURE 4: MULTI-ROLE CONSOLES SECTION
          ═══════════════════════════════════════════════════════════ */}
      <section id="consoles" className="consoles-section">
        <div className="section-headline-center">
          <span className="modern-badge neo-badge-purple" style={{ marginBottom: '0.75rem' }}>
            <Users size={14} /> Multi-Role Platform Ecosystem
          </span>
          <h2 className="section-h2">
            Tailored Experiences for <span className="gradient-text">Every Stakeholder</span>
          </h2>
          <p className="section-p">
            Dedicated command dashboards for municipal administrators, NGO coordinators, volunteer haulers, and campus institutions.
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
          FAQ SECTION
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
              q: 'How does the on-device AI classify polymers offline in ~440ms?',
              a: 'EcoLoop uses a lightweight quantized ONNX neural runtime optimized for web browsers and low-power IoT cameras. It analyzes the visual texture, opacity, specular reflection, and contour features against the 47-category Plastic Waste Vocabulary Ontology (PWVO) in <440ms completely on-device without internet.'
            },
            {
              q: 'How does Confidence Gating (>= 0.40) protect against misclassification?',
              a: 'Scans meeting the confidence threshold (>= 0.40) are credited automatically at 100% of the polymer rate card. Low confidence scans (< 0.40) trigger an automatic 80% penalty cut or route to a community waste bank human operator for manual verification before payment authorization.'
            },
            {
              q: 'Does EcoLoop generate valid Extended Producer Responsibility (EPR) certificates?',
              a: 'Yes. Every deposit generates an auditable cryptographic JSON record containing the event_id, GPS coordinates, timestamp, depositor_id, PWVO classification, and mass in grams matching Central Pollution Control Board (CPCB) standards for statutory corporate offset trading.'
            },
            {
              q: 'How does the Commercial Kitchen mess system prevent food waste?',
              a: 'Our solution tracks mess plates through overhead optical recognition (Orbisk & Winnow Vision inspired) to identify overproduced food items, enables immediate discounted redistribution through "Surprise Bags" (inspired by Too Good To Go), and processes unrecoverable scraps on-site into odorless dry feed powder.'
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
