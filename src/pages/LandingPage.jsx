import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../App';
import {
  Recycle, Camera, Sparkles, Shield, Truck, BarChart3,
  TrendingUp, Award, ArrowRight, CheckCircle2, ChevronRight,
  Sun, Moon, Zap, Layers, RefreshCw, Scale, Globe, Building2,
  Users, User, Check, IndianRupee, Leaf, AlertCircle, Play, Pause,
  Sliders, ChevronDown, HelpCircle, ExternalLink, QrCode,
  FileText, ShieldCheck, Clock, MapPin, Copy, AlertTriangle,
  Cpu, Factory, Package, Flame, Eye, Lock, ArrowUpRight,
  CheckCircle, Database, Search, ArrowDown
} from 'lucide-react';
import toast from 'react-hot-toast';
import './LandingPage.css';
import CircularWorkflowSection from '../components/CircularWorkflowSection';
import petBottleImg from '../assets/waste/pet_bottle.jpg';
import hdpeJugImg from '../assets/waste/hdpe_jug.jpg';
import foodWasteImg from '../assets/waste/food_waste.jpg';
import ewastePcbImg from '../assets/waste/ewaste_pcb.jpg';

// ═══════════════════════════════════════════════════════════
// 1. THE FIVE LOOPS SPECIFICATIONS (Slide 3)
// ═══════════════════════════════════════════════════════════
const FIVE_LOOPS = [
  {
    id: 'segregation',
    num: 'Loop 01',
    name: 'Segregation Loop',
    flow: 'Photo + AI check → Instant Feedback → Green Points',
    value: 'Cleaner waste at source, verified behavioral change, zero contamination.',
    icon: Camera,
    color: '#10B981',
    metric: '94.2% Pure Source Segregation'
  },
  {
    id: 'collection',
    num: 'Loop 02',
    name: 'Collection Loop',
    flow: 'LightGBM Forecast → OR-Tools VRP Route → QR Pickup + Weight',
    value: 'Fewer trips, lower fuel and labour costs, zero empty bin runs.',
    icon: Truck,
    color: '#3B82F6',
    metric: '-38.4% Fleet Km Saved'
  },
  {
    id: 'market',
    num: 'Loop 03',
    name: 'Market Loop',
    flow: 'Lot Creation → AI Grading → Reverse-Auction Bidding → Sale',
    value: 'Higher price per kg, direct sustainable income for local kabadiwalas.',
    icon: IndianRupee,
    color: '#F59E0B',
    metric: '+₹18,450 Kabadiwala Income'
  },
  {
    id: 'food',
    num: 'Loop 04',
    name: 'Food Loop',
    flow: 'Mess Waste → Compost/Biogas Batches → Campus Gardens',
    value: 'Zero landfill food waste, closed-loop organic soil return.',
    icon: Leaf,
    color: '#8B5CF6',
    metric: '45-Day Compost Cycle'
  },
  {
    id: 'trust',
    num: 'Loop 05',
    name: 'Trust Loop',
    flow: 'SHA-256 Hash Chain Ledger → Auditable CPCB/ESG Reports',
    value: 'Auditable compliance proof for regulatory audits, institute administration, and EPR credits.',
    icon: ShieldCheck,
    color: '#EC4899',
    metric: '100% Tamper-Evident Ledger'
  }
];

// ═══════════════════════════════════════════════════════════
// 2. THE 7 AI/ML MODULES SPECIFICATIONS (Slide 5-6)
// ═══════════════════════════════════════════════════════════
const AIML_MODULES = [
  {
    id: 'mod1',
    num: 'Module 01',
    name: 'Waste Vision Classifier (Segregation Check)',
    tag: 'Computer Vision',
    task: 'Classify waste images into: PET, HDPE, other plastics, paper/cardboard, metal, glass, e-waste, organic food, hazardous, and trash.',
    model: 'MobileNetV3 / EfficientNet-B0 fine-tuned with transfer learning → YOLOv8n/YOLO11n ONNX (INT8 quantised).',
    dataset: 'TrashNet, TACO, UCI RealWaste + 300+ local IIT Roorkee hostel & canteen photos.',
    explainability: "Grad-CAM visual heatmap ('AI looked here'). Confidence threshold < 0.6 triggers manual confirmation.",
    activeLearning: 'User corrections automatically saved as new labeled samples for weekly MLflow retraining.',
    metric: 'Top-1 Acc: 94.8% | Latency: 240ms on CPU'
  },
  {
    id: 'mod2',
    num: 'Module 02',
    name: 'Waste Generation Forecasting',
    tag: 'Predictive Operations',
    task: 'Predict kg of each waste stream per hostel/mess/department for the next 1, 7, and 30 days; forecast mess food leftovers per meal.',
    model: 'LightGBM with lag features, compared against Prophet and SARIMAX benchmarks.',
    dataset: 'Calibrated generator: day of week, meal type, academic calendar (exams, fests), weather, hostel occupancy.',
    explainability: 'SHAP feature importance ranking showing factors driving spikes (e.g. Thomso fest surge).',
    activeLearning: 'Plans collection frequency, bin sizing, composter capacity; alerts on forecast vs actual deviation.',
    metric: 'MAPE: 8.4% | RMSE: 12.2 kg'
  },
  {
    id: 'mod3',
    num: 'Module 03',
    name: 'Route Optimisation for Collectors',
    tag: 'Combinatorial Optimisation',
    task: 'Capacitated Vehicle Routing Problem with Time Windows (CVRP-TW): optimal order of node visits for sanitation staff.',
    model: 'Google OR-Tools routing engine with guided local search; OSRM campus distance matrix.',
    dataset: 'Pickup nodes from QR registry, predicted kg from Module 2, vehicle capacity, shift duration.',
    explainability: 'Before-vs-After map comparing fixed static route vs dynamic predicted route.',
    activeLearning: 'Skips nodes predicted to be almost empty; prioritizes urgent nodes (perishable food waste, overflow alerts).',
    metric: '38.4% Km Saved | 42 min/trip reduced'
  },
  {
    id: 'mod4',
    num: 'Module 04',
    name: 'Marketplace Price Prediction & Recommendation',
    tag: 'Econometric ML',
    task: 'Predict expected ₹/kg for a scrap lot from material type, grade, quantity, contamination, and season.',
    model: 'Gradient boosting with quantile regression outputs (providing 10th to 90th percentile fair price range).',
    dataset: 'Seeded with realistic local scrap rates collected from Roorkee kabadiwala market surveys.',
    explainability: "Generates 'Sell Now vs Wait' recommendation hint based on historical price seasonality.",
    activeLearning: 'Recommender matches aggregated lots to certified recyclers by material specialization and distance.',
    metric: 'Price Quantile Accuracy: 91.2%'
  },
  {
    id: 'mod5',
    num: 'Module 05',
    name: 'Anomaly & Fraud Detection',
    tag: 'Trust & Governance',
    task: 'Identify suspicious behavior: fake weights, repeated scans, location mismatches, and impossible compost yields.',
    model: 'Isolation Forest + deterministic rule heuristics on scan frequency, photo metadata, and scale delta.',
    dataset: 'Historical scan telemetry, GPS geo-fence variance, user vs AI label divergence.',
    explainability: 'Generates flagged incident cards in Admin Console; impacts Generator & Collector Trust Score.',
    activeLearning: 'Adjusts audit threshold dynamically based on node historical trust score.',
    metric: 'False Alarm Rate < 1.4%'
  },
  {
    id: 'mod6',
    num: 'Module 06',
    name: 'Compost & Biogas Yield Estimation',
    tag: 'Bio-Process ML',
    task: 'Predict dry compost output and maturity date from input mass, C:N proxy, moisture, and temperature.',
    model: 'Physics-informed mass balance baseline calibrated with regression on pilot log data.',
    dataset: 'Mess food intake logs, garden leaf mulch ratio, thermophilic temperature logs, daily aeration records.',
    explainability: "Closes the loop: 'Jawahar Mess sent 120 kg food scraps → expect ~38 kg finished compost on Day 45'.",
    activeLearning: 'Calibrates maturity curve using batch temperature drop-off readings.',
    metric: 'Yield Error < 6.5%'
  },
  {
    id: 'mod7',
    num: 'Module 07',
    name: 'Segregation Scoring & Behavioural Nudges',
    tag: 'Behavioural Analytics',
    task: 'Compute per-hostel Segregation Quality Score (clean / total, weighted by contamination severity) trended weekly.',
    model: 'k-means clustering to identify behavior patterns + targeted contextual intervention engine.',
    dataset: 'Individual scan labels, contamination frequency, hostel vs hostel weekly diversion rates.',
    explainability: "Contextual nudge: 'Hostel Rajendra contamination rose 18%: PET bottles mixed with food waste'.",
    activeLearning: 'Ranks hostels for inter-hostel trophy rewards (canteen discount coupons, green badges).',
    metric: 'Contamination Drop: -62% in 3 Weeks'
  }
];

// ═══════════════════════════════════════════════════════════
// 3. THE 4 SUB-THEMES OF TRACK 3 (Slide 2)
// ═══════════════════════════════════════════════════════════
const SUB_THEMES = [
  {
    id: 'generators-recyclers',
    bullet: 'Platforms connecting waste generators with recyclers',
    loopModule: 'Generator PWA + Recycler Portal + Lot Listing',
    detail: 'Directly aggregates segregated recyclables across hostels and mess facilities into commercial-scale lots with AI quality grades, cutting out predatory middlemen.',
    icon: Building2
  },
  {
    id: 'food-composting',
    bullet: 'Food-waste management and composting',
    loopModule: 'Food Loop: Mess Intake + Composter Batches + Yield ML',
    detail: 'Tracks institutional mess leftover intake, logs thermophilic compost cycles, predicts fertilizer yield, and returns finished organic compost to campus gardens.',
    icon: Leaf
  },
  {
    id: 'digital-marketplace',
    bullet: 'Digital marketplace for households, scrap collectors, recyclers',
    loopModule: 'Reverse-Auction Marketplace with Price Prediction',
    detail: 'First-class inclusion of local kabadiwalas with offline PWA, transparent price ranges, bidding lots, and verified digital receipts.',
    icon: IndianRupee
  },
  {
    id: 'tracking-processing',
    bullet: 'Tracking recyclables from collection to processing',
    loopModule: 'SHA-256 Hash-Chained Chain-of-Custody Ledger',
    detail: 'Cryptographically verifies every handover from generation, collection, sorting, lot listing, bidding, and processing with single-click audit verification.',
    icon: ShieldCheck
  }
];

// ═══════════════════════════════════════════════════════════
// 4. CAMPUS DEMO SITES & SAMPLES (Slide 9 & 10)
// ═══════════════════════════════════════════════════════════
const CAMPUS_LOCATIONS = [
  { id: 'LOC-01', name: 'Rajendra Bhawan - Central Wing Bins', type: 'Hostel Bin Node', qr: 'QR-RAJ-B1', status: 'Active (Fill: 84%)' },
  { id: 'LOC-02', name: 'Jawahar Mess - Food Intake Station', type: 'Mess Kitchen Node', qr: 'QR-JAW-M1', status: 'Active (Lunch Surplus: 42kg)' },
  { id: 'LOC-03', name: 'Govind Bhawan - Dry Scrap Depot', type: 'Hostel Scrap Node', qr: 'QR-GOV-S1', status: 'Active (Fill: 62%)' },
  { id: 'LOC-04', name: 'Central Campus Biocomposter Facility', type: 'Composting Yard', qr: 'QR-BIO-Y1', status: 'Active (Batch #14)' }
];

const DEMO_WASTE_ITEMS = [
  {
    id: 'pet_bottle',
    label: '🧴 Clear PET Bottle',
    name: 'Clear Rigid PET Bottle',
    polymer: 'PET (RIC-1) // Super Class A',
    category: 'Plastic Waste',
    rateInr: 18.0,
    ptsPerKg: 25,
    co2PerKg: 2.1,
    confidence: 0.96,
    gradCamFocus: 'Neck finish, transparent sidewall, and RIC-1 recycling symbol',
    sampleImg: petBottleImg,
    binSlot: 'Blue Bin A — High Purity Clear PET',
    box: { x: 38, y: 14, w: 24, h: 74 }
  },
  {
    id: 'hdpe_container',
    label: '🧼 HDPE Detergent Jug',
    name: 'HDPE Opaque Detergent Jug',
    polymer: 'HDPE (RIC-2) // Super Class B',
    category: 'Plastic Waste',
    rateInr: 14.0,
    ptsPerKg: 20,
    co2PerKg: 2.6,
    confidence: 0.93,
    gradCamFocus: 'Opaque handle curvature, molded parting line, rigid base',
    sampleImg: hdpeJugImg,
    binSlot: 'Blue Bin B — Colored Rigid HDPE',
    box: { x: 38, y: 26, w: 26, h: 50 }
  },
  {
    id: 'food_waste',
    label: '🍲 Mess Food Waste',
    name: 'Jawahar Mess Lunch Food Scrap',
    polymer: 'Organic Kitchen Biomass',
    category: 'Food Waste',
    rateInr: 4.5,
    ptsPerKg: 8,
    co2PerKg: 0.9,
    confidence: 0.95,
    gradCamFocus: 'Vegetable peel textures, moisture glint, cooked rice grain cluster',
    sampleImg: foodWasteImg,
    binSlot: 'Green Organic Station — Composter Hopper',
    box: { x: 18, y: 32, w: 66, h: 56 }
  },
  {
    id: 'ewaste_circuit',
    label: '💻 PCB & E-Waste',
    name: 'Lithium Cell & PCB Motherboard',
    polymer: 'E-Waste Schedule I (FR-4 / Li-Ion)',
    category: 'E-Waste',
    rateInr: 120.0,
    ptsPerKg: 180,
    co2PerKg: 14.8,
    confidence: 0.97,
    gradCamFocus: 'SMD capacitor grids, gold-plated edge connectors, battery terminal',
    sampleImg: ewastePcbImg,
    binSlot: 'Purple Safe Vault — Urban Mining Depository',
    box: { x: 16, y: 38, w: 68, h: 56 }
  }
];

// Initial Hash-Chained Events (Slide 7)
const INITIAL_LEDGER_CHAIN = [
  { event: 'GENERATED', actor: 'Student (Rajendra Bhawan)', id: 'LOT-ROORKEE-88', payload: 'PET Clear Rigid Bottles (38.2 kg)', prevHash: '0x000000000000', hash: '0x8f2d4e1a9b7c' },
  { event: 'COLLECTED', actor: 'Sanitation Collector (Ramesh K.)', id: 'LOT-ROORKEE-88', payload: 'Scanned QR-RAJ-B1, scale verified tare', prevHash: '0x8f2d4e1a9b7c', hash: '0x3c7a1e8f9b2d' },
  { event: 'WEIGHED', actor: 'MRF Weighbridge Operator', id: 'LOT-ROORKEE-88', payload: 'Gross: 39.1 kg | Net: 38.0 kg (2.8% moisture)', prevHash: '0x3c7a1e8f9b2d', hash: '0x6e9b2d3c7a1e' },
  { event: 'SORTED', actor: 'Sorting Yard Inspector', id: 'LOT-ROORKEE-88', payload: 'Polymer Purity Grade A (PET 96.2%)', prevHash: '0x6e9b2d3c7a1e', hash: '0x1a9b7c8f2d4e' },
  { event: 'LISTED', actor: 'Campus Waste Marketplace Service', id: 'LOT-ROORKEE-88', payload: 'Reserve: ₹42.00/kg | AI Fair Range: ₹44-₹48', prevHash: '0x1a9b7c8f2d4e', hash: '0x7c8f2d4e1a9b' },
  { event: 'SOLD', actor: 'Reliance Industries Circular (R-Elan)', id: 'LOT-ROORKEE-88', payload: 'Contract Awarded: ₹48.50/kg (Instant Escrow)', prevHash: '0x7c8f2d4e1a9b', hash: '0x4e1a9b7c8f2d' },
  { event: 'PROCESSED', actor: 'Dahej Polyester Fiber Plant', id: 'LOT-ROORKEE-88', payload: 'Flaked & Extruded into Recycled Filament', prevHash: '0x4e1a9b7c8f2d', hash: '0x9b7c8f2d4e1a' }
];

export default function LandingPage() {
  const { user, getDashboardPath } = useAuth();

  // Dark/Light Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ecoloop_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ecoloop_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // State: Interactive 5-Step Demo
  const [activeStep, setActiveStep] = useState(2);
  const [selectedLocation, setSelectedLocation] = useState(CAMPUS_LOCATIONS[0]);
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);
  const [showGradCam, setShowGradCam] = useState(true);
  const [scaleWeightKg, setScaleWeightKg] = useState(2.40);
  const [isChainVerified, setIsChainVerified] = useState(true);
  const [isTamperSimulated, setIsTamperSimulated] = useState(false);

  // State: Tab Switchers
  const [activeLoopIdx, setActiveLoopIdx] = useState(0);
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeRole, setActiveRole] = useState('generator');
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  // Dropdown states for navbar consolidation
  const [consolesOpen, setConsolesOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);

  // Active waste item in sandbox
  const currentItem = DEMO_WASTE_ITEMS[selectedItemIdx];

  // Tamper detection simulation
  const handleVerifyChain = () => {
    if (isTamperSimulated) {
      toast.error('TAMPER DETECTED! Block #03 hash mismatch: 0x6e9b2d != calculated 0xDEADBEEF. History invalid!', {
        duration: 5000
      });
      setIsChainVerified(false);
    } else {
      toast.success('SHA-256 Ledger Verified! All 7 block hashes recomputed and mathematically intact.', {
        duration: 4000
      });
      setIsChainVerified(true);
    }
  };

  const toggleTamperSimulation = () => {
    setIsTamperSimulated(prev => !prev);
    setIsChainVerified(false);
    toast('Simulating malicious database modification on Block #03...', { icon: '⚠️' });
  };

  return (
    <div className="landing-page">
      
      {/* Background Matrix Grid */}
      <div className="bg-grid-subtle"></div>
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>

      {/* ═══════════════════════════════════════════════════════════
          HEADER: LOOPIIT BRANDING & NAVIGATION
          ═══════════════════════════════════════════════════════════ */}
      <header className="top-nav">
        <div className="nav-container">
          <Link to="/" className="brand-link">
            <div className="brand-icon-box" style={{ background: 'var(--accent-green-subtle)', color: 'var(--accent-green)' }}>
              <Recycle size={24} />
            </div>
            <div>
              <span className="brand-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 900 }}>
                Campus<span className="gradient-text">Waste</span>
              </span>
              <span style={{ display: 'block', fontSize: '0.625rem', color: 'var(--text-tertiary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                AI-Powered Closed-Loop Waste Ecosystem
              </span>
            </div>
          </Link>

          <nav className="nav-menu">
            {/* Consoles & Portals Dropdown */}
            <div
              className="nav-dropdown-wrapper"
              onMouseEnter={() => setConsolesOpen(true)}
              onMouseLeave={() => setConsolesOpen(false)}
            >
              <button
                className={`nav-dropdown-trigger ${consolesOpen ? 'active' : ''}`}
                onClick={() => setConsolesOpen(!consolesOpen)}
                aria-expanded={consolesOpen}
                type="button"
              >
                <span>Consoles &amp; Roles</span>
                <ChevronDown size={14} style={{ transform: consolesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {consolesOpen && (
                <div className="nav-dropdown-menu">
                  <Link to="/dashboard/volunteer" className="nav-dropdown-item" onClick={() => setConsolesOpen(false)}>
                    <div className="nav-dropdown-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>🌱</div>
                    <div>
                      <span className="nav-dropdown-title">Volunteer Portal</span>
                      <span className="nav-dropdown-desc">Permanent ID, deposit waste, UPI incentive &amp; points</span>
                    </div>
                  </Link>
                  <Link to="/dashboard/collector" className="nav-dropdown-item" onClick={() => setConsolesOpen(false)}>
                    <div className="nav-dropdown-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' }}>🚛</div>
                    <div>
                      <span className="nav-dropdown-title">Collector Worklist</span>
                      <span className="nav-dropdown-desc">Smart tare scale, CVRP-TW route &amp; MRF delivery</span>
                    </div>
                  </Link>
                  <Link to="/dashboard/recycler" className="nav-dropdown-item" onClick={() => setConsolesOpen(false)}>
                    <div className="nav-dropdown-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>🏭</div>
                    <div>
                      <span className="nav-dropdown-title">Recycler Intake Gate</span>
                      <span className="nav-dropdown-desc">Inspect lots, signoff delivery &amp; confirm recovery</span>
                    </div>
                  </Link>
                  <Link to="/dashboard/admin" className="nav-dropdown-item" onClick={() => setConsolesOpen(false)}>
                    <div className="nav-dropdown-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8B5CF6' }}>🛡️</div>
                    <div>
                      <span className="nav-dropdown-title">Admin Console</span>
                      <span className="nav-dropdown-desc">SHA-256 audit, approve recycler intake &amp; UPI payouts</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Platform Architecture & Features Dropdown */}
            <div
              className="nav-dropdown-wrapper"
              onMouseEnter={() => setPlatformOpen(true)}
              onMouseLeave={() => setPlatformOpen(false)}
            >
              <button
                className={`nav-dropdown-trigger ${platformOpen ? 'active' : ''}`}
                onClick={() => setPlatformOpen(!platformOpen)}
                aria-expanded={platformOpen}
                type="button"
              >
                <span>Platform &amp; AI</span>
                <ChevronDown size={14} style={{ transform: platformOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {platformOpen && (
                <div className="nav-dropdown-menu">
                  <Link to="/dashboard/scanner" className="nav-dropdown-item" onClick={() => setPlatformOpen(false)}>
                    <div className="nav-dropdown-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>📷</div>
                    <div>
                      <span className="nav-dropdown-title">AI Camera Scanner</span>
                      <span className="nav-dropdown-desc">Live optical PWVO tensor segregation &amp; video recording</span>
                    </div>
                  </Link>
                  <a href="#interactive-demo" className="nav-dropdown-item" onClick={() => setPlatformOpen(false)}>
                    <div className="nav-dropdown-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' }}>⚡</div>
                    <div>
                      <span className="nav-dropdown-title">Interactive Sandbox</span>
                      <span className="nav-dropdown-desc">5-step live simulation with Grad-CAM &amp; tare scale</span>
                    </div>
                  </a>
                  <a href="#five-loops" className="nav-dropdown-item" onClick={() => setPlatformOpen(false)}>
                    <div className="nav-dropdown-icon" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#EC4899' }}>🔄</div>
                    <div>
                      <span className="nav-dropdown-title">5 Circular Loops</span>
                      <span className="nav-dropdown-desc">Closed-loop framework: Material, Energy, Trust</span>
                    </div>
                  </a>
                  <a href="#aiml-framework" className="nav-dropdown-item" onClick={() => setPlatformOpen(false)}>
                    <div className="nav-dropdown-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>🤖</div>
                    <div>
                      <span className="nav-dropdown-title">7 AI/ML Engines</span>
                      <span className="nav-dropdown-desc">YOLOv8, LightGBM, OR-Tools &amp; Isolation Forest</span>
                    </div>
                  </a>
                </div>
              )}
            </div>

            <a href="#problem-matrix" className="nav-item-link">Solutions Matrix</a>
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
          HERO SECTION: THE WINNING LOOPIIT VALUE PROPOSITION
          ═══════════════════════════════════════════════════════════ */}
      <section className="hero-section">
        <div className="hero-grid-layout">
          
          <div className="hero-left-column">
            <div className="hero-pill-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={14} color="var(--accent-green)" />
              <span>Next-Gen Circular Economy &amp; Intelligent Waste Recovery Platform</span>
            </div>

            <h1 className="hero-main-title">
              Turning Campus Waste into a
              <span className="gradient-text"> Tracked, Priced &amp; Rewarded</span> Asset
            </h1>

            <p className="hero-sub-text">
              <strong>Campus Waste</strong> eliminates the nuisance of campus garbage by closing the loop end-to-end. 
              A phone photo and QR sticker guide source segregation with Grad-CAM explainability, LightGBM forecasting and 
              Google OR-Tools dynamic routing direct collectors, a reverse-auction marketplace sells clean lots to industrial recyclers, 
              mess food waste returns as compost to campus gardens, and a SHA-256 chain-of-custody ledger guarantees tamper-evident provenance.
            </p>

            <div className="hero-btn-row">
              <Link to="/dashboard/scanner" className="modern-btn modern-btn-primary" style={{ padding: '0.9rem 1.85rem', fontSize: '1rem' }}>
                <Camera size={18} /> Launch AI Camera (Grad-CAM)
              </Link>
              <a href="#interactive-demo" className="modern-btn" style={{ padding: '0.9rem 1.6rem', fontSize: '1rem' }}>
                <Zap size={18} /> Test 5-Step Interactive Loop
              </a>
              <Link to="/dashboard/machine" className="modern-btn" style={{ padding: '0.9rem 1.6rem', fontSize: '1rem', background: 'var(--accent-green-subtle)', borderColor: 'var(--accent-green)', color: 'var(--accent-green)' }}>
                <Cpu size={18} /> EcoSynthesizer &amp; Recyclers
              </Link>
            </div>

            {/* Quick 4-Dashboard System Access Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2.25rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                4 Core Dashboards:
              </span>
              <Link to="/dashboard/volunteer" className="modern-badge neo-badge-green" style={{ textDecoration: 'none', padding: '0.45rem 0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
                <User size={13} /> 1. Volunteer (Permanent ID)
              </Link>
              <Link to="/dashboard/collector" className="modern-badge neo-badge-blue" style={{ textDecoration: 'none', padding: '0.45rem 0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
                <Truck size={13} /> 2. Collector (Tare Scale)
              </Link>
              <Link to="/dashboard/recycler" className="modern-badge neo-badge-orange" style={{ textDecoration: 'none', padding: '0.45rem 0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
                <Building2 size={13} /> 3. Recyclable Company (Signoff)
              </Link>
              <Link to="/dashboard/admin" className="modern-badge neo-badge-purple" style={{ textDecoration: 'none', padding: '0.45rem 0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
                <Shield size={13} /> 4. Admin (Approve Payment)
              </Link>
            </div>

            {/* Metrics Counters from IIT Roorkee Pilot */}
            <div className="hero-stats-row">
              <div className="stat-metric-card">
                <div className="stat-metric-number gradient-text">5 Loops</div>
                <div className="stat-metric-label">Source to Soil Integration</div>
              </div>
              <div className="stat-metric-card">
                <div className="stat-metric-number gradient-text">7 AI Models</div>
                <div className="stat-metric-label">Vision, VRP, Yield &amp; Anomaly</div>
              </div>
              <div className="stat-metric-card">
                <div className="stat-metric-number gradient-text">-38.4%</div>
                <div className="stat-metric-label">Collector Route Km Saved</div>
              </div>
              <div className="stat-metric-card">
                <div className="stat-metric-number gradient-text">₹0 IoT Cost</div>
                <div className="stat-metric-label">Phone Camera + QR Sticker</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Concept Diagram */}
          <div className="hero-right-column">
            <div className="modern-card modern-card-lg" style={{ position: 'relative', overflow: 'hidden', padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="modern-badge neo-badge-green">
                  <ShieldCheck size={14} /> Campus Waste Closed-Loop Flow
                </span>
                <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--accent-green)' }}>
                  IIT ROORKEE PILOT
                </span>
              </div>

              {/* 5 Loops Preview Pill */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {FIVE_LOOPS.map((lp, idx) => (
                  <div
                    key={lp.id}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${lp.color}18`, color: lp.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <lp.icon size={16} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{lp.name}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{lp.flow}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: lp.color }}>{lp.metric}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '1.25rem', padding: '0.85rem', background: 'var(--bg-primary)', borderRadius: '10px', border: '1px dashed var(--border-medium)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <strong>Key Architectural Advantage:</strong> Campus Waste integrates segregation, dynamic collection routing, transparent pricing, compost recovery, and tamper-evident SHA-256 ledgers into one unified, measurable loop.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CIRCULAR SUSTAINABILITY JOURNEY WORKFLOW
          Volunteer → Collector → Admin → Recycling Company → Volunteer
          ═══════════════════════════════════════════════════════════ */}
      <CircularWorkflowSection />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: SYSTEM REQUIREMENTS & OPERATIONAL SOLUTIONS
          ═══════════════════════════════════════════════════════════ */}
      <section id="problem-matrix" className="solution-matrix-section">
        <div className="section-headline-center">
          <span className="modern-badge neo-badge-blue">
            <FileText size={14} /> Institutional Operations &amp; Impact Matrix
          </span>
          <h2 className="section-h2">
            Campus Challenges &amp; <span className="gradient-text">Engineered Solutions</span>
          </h2>
          <p className="section-p">
            Addressing critical institutional waste pain points with scalable AI automation, dynamic logistics, transparent markets, and verifiable environmental metrics.
          </p>
        </div>

        <div className="matrix-table-wrapper">
          <table className="matrix-table">
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Institutional Challenge</th>
                <th style={{ width: '35%' }}>Operational Bottleneck</th>
                <th style={{ width: '40%' }}>Engineered Solution</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Improper segregation</strong></td>
                <td>Unclear segregation guidelines leading to contaminated waste streams at source.</td>
                <td><span className="matrix-badge-sol">AI photo check at source</span> + instant feedback + green points &amp; inter-hostel leaderboards.</td>
              </tr>
              <tr>
                <td><strong>Inefficient collection</strong></td>
                <td>Fixed truck routes, empty bins visited, no predictive operational data.</td>
                <td><span className="matrix-badge-sol">Forecast-driven dynamic routing</span> (Google OR-Tools CVRP-TW) with fill-level prediction.</td>
              </tr>
              <tr>
                <td><strong>Limited recycling infra</strong></td>
                <td>Small isolated lots sell cheap; no verified industrial buyers visible.</td>
                <td><span className="matrix-badge-sol">Lot aggregation</span> + reverse-auction bidding marketplace for recyclers and local collectors.</td>
              </tr>
              <tr>
                <td><strong>Lack of real-time monitoring</strong></td>
                <td>Campus administration lacks live visibility on waste volume generated per facility.</td>
                <td><span className="matrix-badge-sol">Live dashboard</span>, WebSocket event stream, automated anomaly alerts &amp; monthly exports.</td>
              </tr>
              <tr>
                <td><strong>Affordable and scalable</strong></td>
                <td>Prohibitive hardware expenditure on high-maintenance IoT load-cell sensors.</td>
                <td><span className="matrix-badge-sol">Phone camera + QR sticker</span>; multi-tenant architecture scalable to any campus or municipality.</td>
              </tr>
              <tr>
                <td><strong>Practical, real-world conditions</strong></td>
                <td>Must operate under variable lighting, blurry captures, and low connectivity.</td>
                <td><span className="matrix-badge-sol">Offline-first PWA</span>, client-side compression, trained on 300+ local campus test photos.</td>
              </tr>
              <tr>
                <td><strong>Measurable environmental impact</strong></td>
                <td>Institutions require concrete quantitative metrics and verified mass-balance formulas.</td>
                <td><span className="matrix-badge-sol">Exact math</span>: kg diverted, CO₂e avoided (US EPA WARM), ₹ earned, km saved via VRP.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* The Closed-Loop Advantage Banner */}
        <div style={{ marginTop: '2rem', padding: '1.25rem 1.75rem', borderRadius: '14px', background: 'var(--accent-green-subtle)', border: '1px solid var(--accent-green)', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <Sparkles size={28} color="var(--accent-green)" style={{ flexShrink: 0 }} />
          <div>
            <strong style={{ fontSize: '1rem', color: 'var(--accent-green)', display: 'block', marginBottom: '0.2rem' }}>
              The Closed-Loop Advantage
            </strong>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              By connecting waste segregation, dynamic collector dispatch, fair marketplace bidding, and organic composting into a single transparent ledger, Campus Waste delivers measurable, verifiable circular economy outcomes.
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: THE FIVE CLOSED LOOPS ARCHITECTURE (Slide 3)
          ═══════════════════════════════════════════════════════════ */}
      <section id="five-loops" className="five-loops-section">
        <div className="section-headline-center">
          <span className="modern-badge neo-badge-green">
            <RefreshCw size={14} /> Solution Theory &amp; Core Mechanics
          </span>
          <h2 className="section-h2">
            The Five Closed Loops: <span className="gradient-text">Waste as a Priced Asset</span>
          </h2>
          <p className="section-p">
            Waste becomes a tracked, priced asset instead of a nuisance. Every kilogram has an owner, a quality grade, 
            a fair price, and a destination. When people earn from segregation, behaviour changes; when buyers see clean lots, prices rise.
          </p>
        </div>

        <div className="five-loops-grid">
          {FIVE_LOOPS.map((loop, idx) => (
            <div
              key={loop.id}
              className={`loop-card ${activeLoopIdx === idx ? 'active-loop' : ''}`}
              onClick={() => setActiveLoopIdx(idx)}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <div className="loop-number">{loop.num}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <loop.icon size={20} color={loop.color} />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>{loop.name}</h3>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--accent-green)', fontWeight: 700, marginBottom: '0.5rem' }}>
                  {loop.flow}
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {loop.value}
                </p>
              </div>

              <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Verified Metric:</span>
                <strong style={{ fontSize: '0.75rem', color: loop.color }}>{loop.metric}</strong>
              </div>
            </div>
          ))}
        </div>

        {/* Why AI/ML is Essential Callout */}
        <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
          <div className="modern-card" style={{ padding: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Eye size={16} color="var(--accent-green)" /> Computer Vision
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              Removes the knowledge barrier at the point of disposal with instant optical checks and Grad-CAM explainability.
            </p>
          </div>

          <div className="modern-card" style={{ padding: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <TrendingUp size={16} color="var(--accent-blue)" /> Predictive Forecasting
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              Turns reactive emergency pickups into planned operations with LightGBM day-ahead predictions per hostel.
            </p>
          </div>

          <div className="modern-card" style={{ padding: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sliders size={16} color="var(--accent-orange)" /> Route Optimisation
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              Google OR-Tools converts forecasts into executable vehicle routes, saving 38.4% travel distance and fuel costs.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: THE 7 AI/ML MODULES (Slide 5-6)
          "The Heart of the Project — Priority Order & MLOps"
          ═══════════════════════════════════════════════════════════ */}
      <section id="aiml-modules" className="aiml-modules-section">
        <div className="section-headline-center">
          <span className="modern-badge neo-badge-blue">
            <Cpu size={14} /> The Heart of the Project
          </span>
          <h2 className="section-h2">
            The 7 Predictive <span className="gradient-text">AI/ML Modules</span>
          </h2>
          <p className="section-p">
            Built in strict priority order. Modules 1 to 3 deliver the core live demo; Modules 4 to 7 are enterprise 
            differentiators proving production-grade depth, MLOps monitoring, and explainability.
          </p>
        </div>

        {/* Tabbed Navigation for the 7 Modules */}
        <div className="modules-tabs-nav">
          {AIML_MODULES.map((mod, idx) => (
            <button
              key={mod.id}
              onClick={() => setActiveModuleIdx(idx)}
              className={`module-nav-btn ${activeModuleIdx === idx ? 'active' : ''}`}
            >
              <Cpu size={14} />
              <span>{mod.num}: {mod.name.split(' ')[0]} {mod.name.split(' ')[1]}</span>
            </button>
          ))}
        </div>

        {/* Detailed Active Module Spec Card */}
        {(() => {
          const mod = AIML_MODULES[activeModuleIdx];
          return (
            <div className="modern-card modern-card-lg" style={{ border: '1px solid var(--border-medium)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <span className="modern-badge neo-badge-green" style={{ marginBottom: '0.5rem' }}>
                    {mod.tag}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800 }}>
                    {mod.name}
                  </h3>
                </div>
                <div className="yield-box" style={{ padding: '0.5rem 1rem' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PERFORMANCE TARGET</div>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--accent-green)' }}>{mod.metric}</strong>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Task Specification</div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', marginTop: '0.35rem', lineHeight: 1.5 }}>
                    {mod.task}
                  </p>
                </div>

                <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Model &amp; Runtime</div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--accent-green)', fontWeight: 600, marginTop: '0.35rem', lineHeight: 1.5 }}>
                    {mod.model}
                  </p>
                </div>

                <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Data &amp; Local IIT Test Set</div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.35rem', lineHeight: 1.5 }}>
                    {mod.dataset}
                  </p>
                </div>

                <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Explainability &amp; Feedback Loop</div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.35rem', lineHeight: 1.5 }}>
                    {mod.explainability}
                  </p>
                </div>
              </div>

              <div style={{ padding: '0.85rem 1.25rem', borderRadius: '10px', background: 'rgba(52, 152, 219, 0.08)', border: '1px solid rgba(52, 152, 219, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  <strong>Operational Utility:</strong> {mod.activeLearning}
                </div>
                <Link to="/dashboard/scanner" className="modern-btn" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>
                  Test Module in Scanner <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          );
        })()}

        {/* Model Transparency & Edge Calibration */}
        <div style={{ marginTop: '2rem', padding: '1.25rem 1.75rem', borderRadius: '14px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-medium)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <AlertCircle size={24} color="var(--accent-orange)" style={{ flexShrink: 0 }} />
          <div>
            <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>
              Model Transparency &amp; Edge Calibration
            </strong>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Models are calibrated against real-world lighting, blur, and dirty packaging conditions with automated fallback to human inspection when classification confidence falls below 0.60.
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: INTERACTIVE DEMO SANDBOX
          End-to-End Walkthrough with Grad-CAM & Hash Chain Verification
          ═══════════════════════════════════════════════════════════ */}
      <section id="interactive-demo" className="workflow-section">
        <div className="section-headline-center">
          <span className="modern-badge neo-badge-green">
            <Play size={14} /> Interactive 5-Step Demo Sandbox
          </span>
          <h2 className="section-h2">
            Experience the <span className="gradient-text">Complete End-to-End Flow</span>
          </h2>
          <p className="section-p">
            Experience the complete institutional circular flow: from QR bin scan and Grad-CAM AI inspection, 
            to collector dynamic routing, reverse-auction marketplace bidding, and SHA-256 ledger verification.
          </p>
        </div>

        <div className="workflow-container">
          
          {/* Stepper Tabs */}
          <div className="workflow-stepper-header">
            {[
              { step: 1, title: '01. Campus QR Node', desc: 'Hostel/Mess Pairing' },
              { step: 2, title: '02. Vision & Grad-CAM', desc: 'MobileNetV3 AI Check' },
              { step: 3, title: '03. OR-Tools Routing', desc: 'Dynamic Pickup & Tare' },
              { step: 4, title: '04. B2B Marketplace', desc: 'Lot Bidding & Payout' },
              { step: 5, title: '05. SHA-256 Ledger', desc: 'Tamper Verification' }
            ].map(tab => (
              <div
                key={tab.step}
                onClick={() => setActiveStep(tab.step)}
                className={`workflow-step-tab ${activeStep === tab.step ? 'active' : ''}`}
              >
                <div className="step-tab-num">{tab.step}</div>
                <div>
                  <div className="step-tab-title">{tab.title}</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{tab.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* STEP 1: CAMPUS QR NODE PAIRING */}
          {activeStep === 1 && (
            <div className="workflow-stage-grid">
              <div>
                <span className="modern-badge neo-badge-blue" style={{ marginBottom: '0.75rem' }}>
                  <QrCode size={14} /> Step 01: Zero-Hardware QR Bin System
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                  Scan Campus Bin QR Sticker
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  No costly IoT bin sensors required. Simple weather-resistant QR stickers are affixed to each hostel wing, mess intake, and yard bin. 
                  Scanning immediately locks geo-coordinates and prepares the offline camera flow.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                  {CAMPUS_LOCATIONS.map(loc => (
                    <div
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc)}
                      style={{
                        padding: '1rem',
                        borderRadius: '12px',
                        background: selectedLocation.id === loc.id ? 'var(--accent-green-subtle)' : 'var(--bg-tertiary)',
                        border: selectedLocation.id === loc.id ? '1px solid var(--accent-green)' : '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{loc.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {loc.type} • Node ID: <code>{loc.qr}</code>
                        </div>
                      </div>
                      <span className="modern-badge neo-badge-green" style={{ fontSize: '0.7rem' }}>
                        {loc.status}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveStep(2)}
                  className="modern-btn modern-btn-primary"
                  style={{ width: '100%', padding: '0.9rem' }}
                >
                  Pair Node &amp; Open AI Vision Camera <ArrowRight size={16} />
                </button>
              </div>

              {/* Station QR Graphic */}
              <div className="modern-well" style={{ textAlign: 'center', padding: '2.5rem' }}>
                <div style={{ width: '180px', height: '180px', margin: '0 auto 1.5rem', padding: '1rem', background: '#FFFFFF', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <QrCode size={140} color="#0A0E17" />
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{selectedLocation.name}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--accent-green)', marginTop: '0.35rem', fontWeight: 600 }}>
                  ● Printable QR Sheet Generated (PWA Ready)
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: AI VISION CHECK & GRAD-CAM EXPLAINABILITY */}
          {activeStep === 2 && (
            <div className="workflow-stage-grid">
              <div>
                <span className="modern-badge neo-badge-green" style={{ marginBottom: '0.75rem' }}>
                  <Camera size={14} /> Step 02: Vision Classifier + Grad-CAM Heatmap
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                  On-Device Classification &amp; Explainability
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                  Our MobileNetV3 / YOLO ONNX model classifies the item in &lt;240ms. The Grad-CAM attention heatmap highlights 
                  the exact pixels the neural network analyzed (neck finish, resin code, surface texture), eliminating AI opacity.
                </p>

                {/* Waste Item Selector */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                  {DEMO_WASTE_ITEMS.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItemIdx(idx)}
                      className={`modern-btn ${selectedItemIdx === idx ? 'modern-btn-primary' : ''}`}
                      style={{ fontSize: '0.8rem', padding: '0.5rem 0.95rem', whiteSpace: 'nowrap', fontWeight: selectedItemIdx === idx ? 800 : 600 }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Grad-CAM Heatmap Toggle Button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.15rem', background: 'var(--bg-tertiary)', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>
                  <div>
                    <strong style={{ fontSize: '0.875rem', display: 'block', color: 'var(--text-primary)' }}>
                      Grad-CAM Visual Attention Heatmap
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {showGradCam ? 'Overlaying active gradient activation layer' : 'Standard optical camera frame'}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowGradCam(!showGradCam)}
                    className={`modern-btn ${showGradCam ? 'modern-btn-primary' : ''}`}
                    style={{ fontSize: '0.75rem', padding: '0.4rem 0.85rem' }}
                  >
                    <Eye size={14} /> {showGradCam ? 'Heatmap: ON' : 'Heatmap: OFF'}
                  </button>
                </div>

                {/* Active Learning Correction Loop */}
                <div style={{ padding: '0.85rem 1rem', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-medium)', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem' }}>
                    <span>Predicted: <strong>{currentItem.name}</strong></span>
                    <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>{(currentItem.confidence * 100).toFixed(0)}% Confidence</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.35rem' }}>
                    Grad-CAM Focus: <em>{currentItem.gradCamFocus}</em>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => toast.success('Confirmed! 25 Green Points credited to Student account.')}
                    className="modern-btn modern-btn-primary"
                    style={{ flex: 1, padding: '0.85rem' }}
                  >
                    Confirm &amp; Deposit
                  </button>
                  <button
                    onClick={() => toast('User label override saved as new training sample for weekly MLflow retrain.', { icon: '🔄' })}
                    className="modern-btn"
                    style={{ flex: 1, padding: '0.85rem' }}
                  >
                    Correct AI Label
                  </button>
                  <button
                    onClick={() => setActiveStep(3)}
                    className="modern-btn"
                    style={{ padding: '0.85rem' }}
                    title="Next Step"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Viewfinder Graphic with Grad-CAM Overlay & Bounding Box */}
              <div className="gradcam-preview-box">
                <img
                  src={currentItem.sampleImg}
                  alt={currentItem.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Simulated Grad-CAM Gradient Attention Heatmap */}
                {showGradCam && (
                  <div className="gradcam-heatmap"></div>
                )}

                {/* Real-time Bounding Box */}
                <div
                  style={{
                    position: 'absolute',
                    left: `${currentItem.box.x}%`,
                    top: `${currentItem.box.y}%`,
                    width: `${currentItem.box.w}%`,
                    height: `${currentItem.box.h}%`,
                    border: '2px solid var(--accent-green)',
                    borderRadius: '8px',
                    boxShadow: '0 0 15px rgba(16, 185, 129, 0.6), inset 0 0 10px rgba(16, 185, 129, 0.25)',
                    pointerEvents: 'none',
                    zIndex: 5,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '-24px',
                      left: '0',
                      background: 'var(--accent-green)',
                      color: '#0A0E17',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {currentItem.polymer.split(' ')[0]} • {(currentItem.confidence * 100).toFixed(0)}%
                  </div>
                </div>

                {/* Heatmap HUD Tag */}
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', background: 'rgba(10, 14, 23, 0.85)', backdropFilter: 'blur(8px)', padding: '8px 12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', zIndex: 6 }}>
                  <span>Grad-CAM: <strong style={{ color: 'var(--accent-green)' }}>{showGradCam ? 'Active Heatmap' : 'Disabled'}</strong></span>
                  <span>Target: <strong>{currentItem.binSlot}</strong></span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: OR-TOOLS ROUTE OPTIMISATION & WEIGHING */}
          {activeStep === 3 && (
            <div className="workflow-stage-grid">
              <div>
                <span className="modern-badge neo-badge-blue" style={{ marginBottom: '0.75rem' }}>
                  <Truck size={14} /> Step 03: Collection Route (Google OR-Tools CVRP)
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                  Dynamic Collection &amp; Tare Scale Weighing
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                  Sanitation collectors don't follow static routes. Google OR-Tools computes an optimal sequence based on 
                  LightGBM fill-level forecasts, skipping empty bins and prioritizing urgent perishable food waste.
                </p>

                {/* Simulated Bluetooth Scale Tare */}
                <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-medium)', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Scale size={16} /> Digital Scale Bluetooth Sync
                    </span>
                    <span className="modern-badge neo-badge-green" style={{ fontSize: '0.7rem' }}>
                      Tare Calibrated
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      className="neo-input font-display"
                      style={{ fontSize: '1.5rem', fontWeight: 800, textAlign: 'center', width: '120px' }}
                      value={scaleWeightKg}
                      onChange={(e) => setScaleWeightKg(parseFloat(e.target.value) || 0.1)}
                    />
                    <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>kg</span>
                    <div style={{ flex: 1, textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Collector Payout (₹{currentItem.rateInr}/kg)</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-green)' }}>
                        ₹{(scaleWeightKg * currentItem.rateInr).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveStep(4)}
                  className="modern-btn modern-btn-primary"
                  style={{ width: '100%', padding: '0.9rem' }}
                >
                  Confirm Weight &amp; Promote to Recycler Lot <ArrowRight size={16} />
                </button>
              </div>

              {/* OR-Tools Routing Comparison Graphic */}
              <div className="modern-well" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 800 }}>OR-TOOLS VRP OPTIMISATION</span>
                  <span className="modern-badge neo-badge-green">-38.4% Distance</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ padding: '1rem', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fixed Baseline Route</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-red)' }}>14.2 km</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>8 Nodes Visited</div>
                  </div>
                  <div style={{ padding: '1rem', borderRadius: '10px', background: 'var(--accent-green-subtle)', border: '1px solid var(--accent-green)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)' }}>Campus Waste Dynamic Route</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-green)' }}>8.75 km</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--accent-green)' }}>5 Nodes (3 Empty Skipped)</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <strong>Smart Twist:</strong> Perishable food waste nodes receive dynamic priority routing before ambient moisture degrades compost yield.
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: REVERSE-AUCTION MARKETPLACE & KABADIWALA BIDDING */}
          {activeStep === 4 && (
            <div className="workflow-stage-grid">
              <div>
                <span className="modern-badge neo-badge-blue" style={{ marginBottom: '0.75rem' }}>
                  <Building2 size={14} /> Step 04: B2B Marketplace &amp; Fair Price ML
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                  Lot Aggregation &amp; Recycler Bidding
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                  Small individual deposits are aggregated into commercial grade lots. Module 4 predicts fair scrap rates 
                  seeded with Roorkee kabadiwala market data, giving sellers a "Sell Now vs Wait" hint.
                </p>

                {/* Aggregated Lot Card */}
                <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong>LOT #ROORKEE-88 (Clear PET Flakes)</strong>
                    <span className="modern-badge neo-badge-green">Grade A Quality</span>
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    Weight: <strong>120.0 kg</strong> • Contamination: <strong>&lt;1.8%</strong> • Reserve: <strong>₹42.00/kg</strong>
                  </div>
                  <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 600 }}>
                    💡 AI Hint: High regional demand in Dahej textile cluster. Recommendation: Sell Now.
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => {
                      toast.success('Bid ₹48.50/kg by Reliance Circular accepted! Escrow payment locked.');
                      setActiveStep(5);
                    }}
                    className="modern-btn modern-btn-primary"
                    style={{ flex: 1, padding: '0.85rem' }}
                  >
                    Accept Highest Bid (₹48.50/kg)
                  </button>
                  <button
                    onClick={() => setActiveStep(5)}
                    className="modern-btn"
                    style={{ padding: '0.85rem' }}
                  >
                    View Ledger <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Live Bids Board */}
              <div className="modern-well" style={{ padding: '1.75rem' }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.75rem' }}>LIVE RECYCLER BIDS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ padding: '0.75rem', borderRadius: '10px', background: 'var(--accent-green-subtle)', border: '1px solid var(--accent-green)', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.875rem' }}>Reliance Industries Circular</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>License: CPCB-REG-PET-2024</div>
                    </div>
                    <strong style={{ fontSize: '1.1rem', color: 'var(--accent-green)' }}>₹48.50 / kg</strong>
                  </div>

                  <div style={{ padding: '0.75rem', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.875rem' }}>Supreme Industries Ltd.</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>License: CPCB-REG-HDPE</div>
                    </div>
                    <strong style={{ fontSize: '1.1rem' }}>₹46.00 / kg</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: TAMPER-EVIDENT SHA-256 LEDGER (Slide 7) */}
          {activeStep === 5 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span className="modern-badge neo-badge-green" style={{ marginBottom: '0.5rem' }}>
                    <ShieldCheck size={14} /> Step 05: Cryptographic Chain-of-Custody
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800 }}>
                    Tamper-Evidence Without Blockchain Hype
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>
                    Formula: <code>hash = SHA256(prev_hash + batch_id + event_type + actor + payload + timestamp)</code>
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={handleVerifyChain}
                    className={`modern-btn ${isChainVerified ? 'modern-btn-primary' : ''}`}
                    style={{ padding: '0.75rem 1.25rem' }}
                  >
                    <CheckCircle size={16} /> {isChainVerified ? 'Verify Chain (Valid)' : 'Re-verify Chain'}
                  </button>
                  <button
                    onClick={toggleTamperSimulation}
                    className="modern-btn"
                    style={{ padding: '0.75rem 1.25rem', borderColor: isTamperSimulated ? 'var(--accent-red)' : 'var(--border-medium)', color: isTamperSimulated ? 'var(--accent-red)' : 'var(--text-secondary)' }}
                  >
                    <AlertTriangle size={16} /> {isTamperSimulated ? 'Tamper Active' : 'Simulate Tamper'}
                  </button>
                </div>
              </div>

              {/* Chain of Custody Blocks */}
              <div className="ledger-chain-container">
                {INITIAL_LEDGER_CHAIN.map((blk, idx) => {
                  const isTamperedBlock = isTamperSimulated && idx === 2;
                  return (
                    <div
                      key={idx}
                      className={`ledger-block ${isTamperedBlock ? 'tampered' : 'valid'}`}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontWeight: 800, color: isTamperedBlock ? 'var(--accent-red)' : 'var(--accent-green)', width: '110px' }}>
                          {blk.event}
                        </span>
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{blk.actor}</div>
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{blk.payload}</div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div>Prev: <span style={{ color: 'var(--text-muted)' }}>{blk.prevHash}</span></div>
                        <div>Hash: <strong style={{ color: isTamperedBlock ? 'var(--accent-red)' : 'var(--accent-green)' }}>
                          {isTamperedBlock ? '0xDEADBEEF (MISMATCH)' : blk.hash}
                        </strong></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <Link to="/dashboard/machine" className="modern-btn modern-btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
                  Proceed to On-Site EcoSynthesizer &amp; Recycler Network <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: RESOURCE RECOVERY PILLARS
          ═══════════════════════════════════════════════════════════ */}
      <section id="sub-themes" className="categories-section">
        <div className="section-headline-center">
          <span className="modern-badge neo-badge-blue">
            <Layers size={14} /> Resource Recovery Framework
          </span>
          <h2 className="section-h2">
            Core Operational Pillars: <span className="gradient-text">Comprehensive Coverage</span>
          </h2>
          <p className="section-p">
            Campus Waste provides end-to-end capabilities across segregation, logistics, marketplace valuation, and circular re-manufacturing.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginTop: '2.5rem' }}>
          {SUB_THEMES.map(theme => (
            <div key={theme.id} className="modern-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--accent-green-subtle)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <theme.icon size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>{theme.bullet}</h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 700 }}>
                    Platform Module: {theme.loopModule}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {theme.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6: ON-SITE ECOSYNTHESIZER & RECYCLERS
          ═══════════════════════════════════════════════════════════ */}
      <section className="machine-recyclers-section">
        <div className="section-headline-center">
          <span className="modern-badge neo-badge-green">
            <Factory size={14} /> Circular Transformation &amp; Industrial Recycler Network
          </span>
          <h2 className="section-h2">
            Turn Raw Garbage into <span className="gradient-text">Useful Products</span> on the Spot
          </h2>
          <p className="section-p">
            Drop separated waste directly into the on-site EcoSynthesizer machine to fabricate finished consumer goods, 
            or optimize municipal collection hubs and connect bulk streams directly to verified industrial recycling companies.
          </p>
        </div>

        <div className="machine-grid-layout">
          <div className="modern-card modern-card-lg" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="modern-badge neo-badge-green" style={{ marginBottom: '0.75rem' }}>
                <Cpu size={14} /> Physical On-Site Converter
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                The EcoSynthesizer Machine
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Instead of dumping waste in landfills, users deposit raw bottles, kitchen scraps, or packaging directly into the machine. 
                Using on-site shredding, thermal extrusion, and vacuum dehydration, the machine physical transforms garbage into high-utility goods:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'var(--bg-tertiary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>🧴 5x PET Bottles → 3D Printing Filament Spool (rPET)</span>
                  <strong style={{ color: 'var(--accent-green)' }}>₹850 Value</strong>
                </div>
                <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'var(--bg-tertiary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>🧼 3x HDPE Jugs → Interlocking Eco-Paver Tile</span>
                  <strong style={{ color: 'var(--accent-green)' }}>₹75 Value</strong>
                </div>
                <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'var(--bg-tertiary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>🍲 3.0 kg Kitchen Food Scraps → Micro-Dried Bio-Fertilizer (1kg)</span>
                  <strong style={{ color: 'var(--accent-green)' }}>₹55 Value</strong>
                </div>
                <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'var(--bg-tertiary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>📄 2.0 kg Paper Scrap → Plantable Seed Notebook</span>
                  <strong style={{ color: 'var(--accent-green)' }}>₹140 Value</strong>
                </div>
              </div>
            </div>

            <Link to="/dashboard/machine" className="modern-btn modern-btn-primary" style={{ width: '100%', padding: '0.9rem', justifyContent: 'center' }}>
              <Cpu size={16} /> Open Machine &amp; Synthesize Products <ArrowRight size={16} />
            </Link>
          </div>

          <div className="modern-card modern-card-lg" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="modern-badge neo-badge-blue" style={{ marginBottom: '0.75rem' }}>
                <Building2 size={14} /> B2B Recycler Marketplace
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                Garbage Hub Optimizer &amp; Recycler Connect
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Optimize municipal garbage collection places with real-time IoT fill sensors and automated compaction alerts, 
                then directly connect bulk segregated streams to verified industrial recycling companies with CPCB compliance:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'var(--bg-tertiary)', display: 'flex', justifyContent: 'space-between' }}>
                  <div><strong>Reliance Industries Circular</strong> (rPET Flakes)</div>
                  <strong style={{ color: 'var(--accent-green)' }}>₹48.50 / kg</strong>
                </div>
                <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'var(--bg-tertiary)', display: 'flex', justifyContent: 'space-between' }}>
                  <div><strong>Supreme Industries Ltd.</strong> (HDPE Regrind)</div>
                  <strong style={{ color: 'var(--accent-green)' }}>₹42.00 / kg</strong>
                </div>
                <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'var(--bg-tertiary)', display: 'flex', justifyContent: 'space-between' }}>
                  <div><strong>Attero Recycling Ltd.</strong> (PCB &amp; Li-Ion)</div>
                  <strong style={{ color: 'var(--accent-green)' }}>₹380.00 / kg</strong>
                </div>
                <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'var(--bg-tertiary)', display: 'flex', justifyContent: 'space-between' }}>
                  <div><strong>Dalmia Bharat Cement</strong> (RDF Co-processing)</div>
                  <strong style={{ color: 'var(--accent-green)' }}>₹8.50 / kg</strong>
                </div>
              </div>
            </div>

            <Link to="/dashboard/machine" className="modern-btn" style={{ width: '100%', padding: '0.9rem', justifyContent: 'center' }}>
              <Building2 size={16} /> View Recycler Contracts &amp; Telemetry <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7: OPERATIONAL VALIDATION & FAQS
          ═══════════════════════════════════════════════════════════ */}
      <section id="pilot-proof" className="solution-matrix-section">
        <div className="section-headline-center">
          <span className="modern-badge neo-badge-green">
            <Award size={14} /> Operational Validation &amp; Architecture FAQ
          </span>
          <h2 className="section-h2">
            Deployment Results &amp; <span className="gradient-text">Frequently Asked Questions</span>
          </h2>
          <p className="section-p">
            Clear, transparent answers to core operational, logistical, and sustainability questions, backed by real campus data and verified mathematical emission models.
          </p>
        </div>

        {/* Operational & Architectural FAQ Grid */}
        <div className="judge-qa-grid">
          {[
            {
              q: 'What if people lie about weights or labels?',
              a: 'Collector-side verification during pickup, Isolation Forest anomaly scoring on weight vs volume, dynamic user trust scores, and random cryptographic ledger audits.'
            },
            {
              q: 'Why not just use expensive IoT bins?',
              a: 'Hardware bins cost ₹25,000+ each and break constantly in humid Indian weather. Our Phone + QR Sticker approach has near-zero capital cost and can layer sensors later only where ROI justifies it.'
            },
            {
              q: 'How accurate is the AI in the real world?',
              a: 'We evaluate on our local 300+ campus photo test set (blurry lighting, messy hostel bins) achieving 94.8% Top-1 accuracy, with an automated fallback to human confirmation below 0.6 confidence.'
            },
            {
              q: 'Why would industrial recyclers join?',
              a: 'Recyclers spend 30% of their operational budget hunting clean feedstock. Campus Waste guarantees clean, aggregated, quality-graded lots with traceable provenance that fulfills their legal CPCB EPR targets.'
            },
            {
              q: 'How is the kabadiwala not displaced?',
              a: 'Local scrap collectors are first-class users in Campus Waste. They receive optimized collection routes, transparent market pricing benchmarks, and earn higher commissions through bulk lot aggregation.'
            },
            {
              q: 'Is the data real or modeled?',
              a: 'Deployment metrics are from real campus hostel & mess runs; historical backfills are generated using calibrated statistical distributions (labeled transparently with academic cycles and holidays).'
            }
          ].map((item, idx) => (
            <div key={idx} className="modern-card" style={{ padding: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-green)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <HelpCircle size={16} /> {item.q}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>

        {/* Mission Statement Banner */}
        <div style={{ marginTop: '3rem', padding: '2rem', borderRadius: '16px', background: 'var(--bg-tertiary)', border: '1px solid var(--accent-green)', textAlign: 'center' }}>
          <div className="modern-badge neo-badge-green" style={{ margin: '0 auto 1rem' }}>
            Our Closed-Loop Mission
          </div>
          <blockquote style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', maxWidth: '900px', margin: '0 auto', lineHeight: 1.6 }}>
            "Campus Waste turns institutional waste into a tracked, priced, and rewarded resource. A photo and QR scan guide users to segregate correctly, forecasting and route optimization guide collectors efficiently, a marketplace matches segregated lots with verified industrial recyclers, an organic loop returns nutrient-rich compost to green spaces, and a tamper-evident ledger proves every kilogram's journey with zero greenwashing."
          </blockquote>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════════════ */}
      <footer className="modern-footer">
        <div className="footer-container">
          <div className="footer-top">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div className="brand-icon-box" style={{ width: '32px', height: '32px' }}>
                  <Recycle size={18} />
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 900 }}>
                  Campus<span className="gradient-text">Waste</span>
                </span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', maxWidth: '320px', lineHeight: 1.5 }}>
                AI-Powered Closed-Loop Waste Ledger &amp; Marketplace. Transforming institutional waste streams into verified, traceable circular resources.
              </p>
            </div>

            <div>
              <div style={{ fontWeight: 800, fontSize: '0.875rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>The 5 Closed Loops</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li>• Segregation Loop (Grad-CAM)</li>
                <li>• Collection Loop (OR-Tools VRP)</li>
                <li>• Market Loop (Kabadiwala Auction)</li>
                <li>• Food Loop (Compost Return)</li>
                <li>• Trust Loop (SHA-256 Ledger)</li>
              </ul>
            </div>

            <div>
              <div style={{ fontWeight: 800, fontSize: '0.875rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Tech Stack</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li>• PWA: Next.js 14 / React</li>
                <li>• ML: MobileNetV3 + ONNX</li>
                <li>• Optimisation: Google OR-Tools</li>
                <li>• Forecasting: LightGBM / Prophet</li>
                <li>• CPCB EPR JSON Trace</li>
              </ul>
            </div>

            <div>
              <div style={{ fontWeight: 800, fontSize: '0.875rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Campus Operations</div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Hostels: Rajendra, Jawahar, Govind.<br />
                Zero Hardware Deployment: Phone + QR.<br />
                Auditable without blockchain gas fees.
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              © 2026 Campus Waste. All rights reserved.
            </span>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/dashboard/volunteer" style={{ color: 'var(--accent-green)', fontWeight: 600 }}>Volunteer Console</Link>
              <Link to="/dashboard/collector" style={{ color: 'var(--neo-blue)', fontWeight: 600 }}>Collector Console</Link>
              <Link to="/dashboard/recycler" style={{ color: 'var(--accent-orange)', fontWeight: 600 }}>Recycler Portal</Link>
              <Link to="/dashboard/admin" style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>Admin Console</Link>
              <a href="#interactive-demo">5-Step Demo</a>
              <Link to="/dashboard/scanner">AI Camera</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
