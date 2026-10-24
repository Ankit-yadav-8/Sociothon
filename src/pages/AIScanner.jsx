import { useState, useRef, useEffect } from 'react';
import {
  Camera, QrCode, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck,
  RefreshCw, MapPin, Scale, ArrowRight, Download, Eye, Award,
  Leaf, IndianRupee, Layers, Check, Cpu, Trash2, Zap, SlidersHorizontal
} from 'lucide-react';
import toast from 'react-hot-toast';

// 47-Category PWVO Ontology & YOLOE-26 Detection Profiles
const WASTE_DATABASE = [
  {
    id: 'pet_bottle',
    name: 'PET Clear Rigid Bottle',
    polymer: 'PET (Polyethylene Terephthalate)',
    code: 'RIC-1',
    category: 'Rigid Plastic - Super Class A',
    eprCategory: 'Category I (Rigid Packaging)',
    confidence: 0.94,
    frameCoverage: '36.8%',
    valuePerKg: 18,
    inrPerKg: 15.5,
    co2PerKg: 2.1,
    box: { x: 22, y: 18, w: 56, h: 64 },
    color: '#2ECC71',
    instructions: [
      { step: 1, text: 'Unscrew polypropylene cap and pull off security seal ring.' },
      { step: 2, text: 'Rinse liquid remnants to eliminate sugar/oil contaminants.' },
      { step: 3, text: 'Compress bottle vertically to optimize baler frame volume.' },
      { step: 4, text: 'Deposit into Blue Bin A (Slot #01 - High Purity Stream).' }
    ],
    sampleImg: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'hdpe_container',
    name: 'HDPE Opaque Detergent Jug',
    polymer: 'HDPE (High-Density Polyethylene)',
    code: 'RIC-2',
    category: 'Rigid Plastic - Super Class B',
    eprCategory: 'Category I (Rigid Packaging)',
    confidence: 0.91,
    frameCoverage: '44.2%',
    valuePerKg: 24,
    inrPerKg: 21.0,
    co2PerKg: 2.6,
    box: { x: 18, y: 15, w: 62, h: 70 },
    color: '#3498DB',
    instructions: [
      { step: 1, text: 'Flush detergent residue with 50ml warm water.' },
      { step: 2, text: 'Keep nozzle pump separate if it contains metallic spring.' },
      { step: 3, text: 'Flatten base container.' },
      { step: 4, text: 'Deposit into Blue Bin B (Slot #02 - Colored HDPE).' }
    ],
    sampleImg: 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'multilayer_film',
    name: 'Multilayer Metallized Snack Pouch',
    polymer: 'MLP (PE / Aluminium / BOPP)',
    code: 'RIC-7 (Other)',
    category: 'Flexible Multilayer Film',
    eprCategory: 'Category III (Multi-layered Plastic Packaging)',
    confidence: 0.88,
    frameCoverage: '28.5%',
    valuePerKg: 8,
    inrPerKg: 6.5,
    co2PerKg: 1.4,
    box: { x: 26, y: 22, w: 48, h: 54 },
    color: '#E67E22',
    instructions: [
      { step: 1, text: 'Shake out leftover crumbs and organic particles.' },
      { step: 2, text: 'Dry wipe interior foil surface.' },
      { step: 3, text: 'Fold into tight bundle.' },
      { step: 4, text: 'Deposit into Orange Bin C (Pyrolysis / Cement Kiln Co-processing).' }
    ],
    sampleImg: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'ewaste_circuit',
    name: 'PCB Motherboard & Battery Cell',
    polymer: 'FR-4 Copper Alloy / Li-Ion',
    code: 'E-Waste Class A',
    category: 'Electronic Scrap & Urban Ore',
    eprCategory: 'EPR E-Waste Schedule I',
    confidence: 0.96,
    frameCoverage: '52.0%',
    valuePerKg: 120,
    inrPerKg: 110.0,
    co2PerKg: 14.8,
    box: { x: 15, y: 12, w: 70, h: 72 },
    color: '#9B59B6',
    instructions: [
      { step: 1, text: 'Do not puncture or crush lithium cell component.' },
      { step: 2, text: 'Isolate contacts with non-conductive tape if exposed.' },
      { step: 3, text: 'Handle with anti-static protection if available.' },
      { step: 4, text: 'Handover to Authorized Urban Mining Vault (Station Safe #09).' }
    ],
    sampleImg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'organic_kitchen',
    name: 'Food & Organic Scrap (Coffee/Peels)',
    polymer: 'Biomass Organic',
    code: 'BIO-COMPOST',
    category: 'Commercial Hospitality Organic',
    eprCategory: 'Municipal Solid Waste Rules 2016',
    confidence: 0.89,
    frameCoverage: '41.5%',
    valuePerKg: 6,
    inrPerKg: 4.8,
    co2PerKg: 3.2,
    box: { x: 20, y: 20, w: 60, h: 58 },
    color: '#27AE60',
    instructions: [
      { step: 1, text: 'Separate non-biodegradable food stickers and plastic cutlery.' },
      { step: 2, text: 'Drain excess water to accelerate thermomechanical dehydration.' },
      { step: 3, text: 'Deposit into Smart Composter / Micro-drying Hopper #03.' },
      { step: 4, text: 'Collect organic soil amendment compost credits.' }
    ],
    sampleImg: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80'
  }
];

const STATION_LOCATIONS = [
  { id: 'ST-04', name: 'Potheri Ward 3 Waste Bank - Station #04', lat: 12.8231, lng: 80.0442, ward: 'Ward 3, Chengalpattu', bins: ['Blue A (PET)', 'Blue B (HDPE)', 'Orange C (MLP)'] },
  { id: 'ST-12', name: 'IIT Delhi EcoHub - Central Smart Hub #12', lat: 28.5450, lng: 77.1926, ward: 'Hauz Khas, New Delhi', bins: ['Bin 1 (Rigid)', 'Bin 2 (Film)', 'Bin 3 (E-Waste)'] },
  { id: 'ST-07', name: 'Indiranagar Urban Recovery Kiosk #07', lat: 12.9784, lng: 77.6408, ward: 'East Bangalore, KA', bins: ['Slot Alpha', 'Slot Beta', 'Urban Ore Safe'] },
];

export default function AIScanner() {
  // Station State
  const [station, setStation] = useState(STATION_LOCATIONS[0]);
  const [isStationLocked, setIsStationLocked] = useState(true);
  const [showStationModal, setShowStationModal] = useState(false);

  // User Balances & Gamification
  const [greenPoints, setGreenPoints] = useState(142.50);
  const [inrWallet, setInrWallet] = useState(128.00);
  const [totalDivertedKg, setTotalDivertedKg] = useState(18.4);
  const [co2SavedKg, setCo2SavedKg] = useState(38.64);
  const [citizenPointsTarget, setCitizenPointsTarget] = useState(200);

  // AI Camera State
  const [selectedWasteIndex, setSelectedWasteIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const [inferenceTime, setInferenceTime] = useState(418);
  const [weightKg, setWeightKg] = useState(0.45);
  const [completedSteps, setCompletedSteps] = useState([true, true, true, false]);
  const [lastTraceJson, setLastTraceJson] = useState(null);
  const [showJsonModal, setShowJsonModal] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const currentItem = WASTE_DATABASE[selectedWasteIndex];

  // Camera handling
  const startCamera = async () => {
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      toast.success('Live WebRTC optical feed active!');
    } catch (err) {
      console.warn('Camera stream fallback active:', err);
      toast('Camera permission denied or unavailable. Using High-Res Synthetic Optical Feed.', { icon: '📸' });
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const triggerScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    const mockLatency = Math.floor(380 + Math.random() * 90);
    setInferenceTime(mockLatency);

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      setCompletedSteps([false, false, false, false]);
      toast.success(`YOLOE-26 Edge AI detected ${currentItem.name} (${(currentItem.confidence * 100).toFixed(1)}%) in ${mockLatency}ms!`);
    }, 800);
  };

  const handleStepToggle = (index) => {
    const updated = [...completedSteps];
    updated[index] = !updated[index];
    setCompletedSteps(updated);
  };

  const allStepsDone = completedSteps.every(Boolean);

  const handleDepositConfirm = () => {
    if (currentItem.confidence < 0.40) {
      toast.error('Confidence < 0.40! Sent to community operator for physical verification.');
      return;
    }

    const earnedPoints = parseFloat((weightKg * currentItem.valuePerKg).toFixed(2));
    const earnedInr = parseFloat((weightKg * currentItem.inrPerKg).toFixed(2));
    const earnedCo2 = parseFloat((weightKg * currentItem.co2PerKg).toFixed(2));

    setGreenPoints(prev => +(prev + earnedPoints).toFixed(2));
    setInrWallet(prev => +(prev + earnedInr).toFixed(2));
    setTotalDivertedKg(prev => +(prev + weightKg).toFixed(2));
    setCo2SavedKg(prev => +(prev + earnedCo2).toFixed(2));

    // Generate CPCB EPR Machine-Verifiable JSON record
    const eventRecord = {
      event_id: 'EPR-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      station_id: station.id,
      station_name: station.name,
      gps: { latitude: station.lat, longitude: station.lng, geo_accuracy_m: 2.4 },
      timestamp: new Date().toISOString(),
      depositor_id: 'USR-8829-DELHI',
      pwvo_class: currentItem.polymer,
      material_code: currentItem.code,
      mass_g: Math.round(weightKg * 1000),
      volume_frame_coverage_pct: parseFloat(currentItem.frameCoverage),
      ai_model: 'YOLOE-26 Edge Vision PWVO v4.2',
      inference_ms: inferenceTime,
      confidence_score: currentItem.confidence,
      epr_category: currentItem.eprCategory,
      financial_incentive: {
        points_credited: earnedPoints,
        inr_payout: earnedInr,
        settlement_mode: 'UPI Instant Disbursal'
      },
      provenance_hash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
    };

    setLastTraceJson(eventRecord);
    toast.success(`🎉 Deposit verified! Credited +${earnedPoints} Green Points (+₹${earnedInr}) to your wallet!`, {
      duration: 4000
    });
  };

  const downloadJsonTrace = () => {
    if (!lastTraceJson) return;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(lastTraceJson, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${lastTraceJson.event_id}_cpcb_epr_trace.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success('CPCB EPR JSON audit trace downloaded.');
  };

  return (
    <div className="container-max" style={{ paddingBottom: '3rem' }}>
      
      {/* ═══════════════════════════════════════════════════════════
          MODULE 1: NEOMORPHIC HERO & STATION PAIRING BANNER
          ═══════════════════════════════════════════════════════════ */}
      <div className="neo-card-lg" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="neo-badge neo-badge-green">
                <Sparkles size={14} /> Edge AI Vision Core
              </span>
              <span className="neo-badge neo-badge-blue">
                YOLOE-26 • 47 PWVO Categories
              </span>
            </div>
            <h1 className="font-display" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              AI Waste Scanner &amp; <span className="gradient-text-neo">Smart Deposit</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', maxWidth: '640px' }}>
              Point device camera at any plastic, e-waste, or organic item. Our offline-capable edge model identifies polymer type in &lt;440ms, delivers tactile sorting steps, and credits instant payouts.
            </p>
          </div>

          {/* Floating Action Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              className="neo-btn neo-btn-primary"
              onClick={triggerScan}
              style={{ padding: '0.875rem 1.75rem', fontSize: '1rem' }}
            >
              <Zap size={20} /> Scan &amp; Classify Now
            </button>
            <button
              className="neo-circle-btn"
              onClick={() => setShowStationModal(true)}
              title="Pair with Smart Bin Station QR"
            >
              <QrCode size={22} />
            </button>
          </div>
        </div>

        {/* Dynamic Station Pairing Status */}
        <div className="neo-inset" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div className="pulse-station" style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'var(--neo-green)' }}></div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{station.name}</span>
                <span className="neo-badge neo-badge-green" style={{ fontSize: '0.7rem' }}>
                  <ShieldCheck size={12} /> Geo-Verified
                </span>
              </div>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <MapPin size={13} /> GPS: {station.lat}° N, {station.lng}° E ({station.ward})
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <button
              className="neo-btn"
              style={{ fontSize: '0.8125rem', padding: '0.5rem 1rem' }}
              onClick={() => setShowStationModal(true)}
            >
              <RefreshCw size={14} /> Switch Station
            </button>
          </div>
        </div>

        {/* Real-Time Live User Metrics Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.25rem', marginTop: '1.75rem' }}>
          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-green)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Green Points Balance</span>
              <Award size={18} color="var(--neo-green-dark)" />
            </div>
            <div className="font-display" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--neo-green-dark)', marginTop: '0.35rem' }}>
              {greenPoints.toFixed(2)} <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>pts</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Redeemable at 1 pt = ₹1.00</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-blue)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Direct UPI Wallet</span>
              <IndianRupee size={18} color="var(--neo-blue)" />
            </div>
            <div className="font-display" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--neo-blue)', marginTop: '0.35rem' }}>
              ₹{inrWallet.toFixed(2)}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Instant IMPS/UPI auto-credit</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-orange)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Total Diverted Waste</span>
              <Scale size={18} color="var(--neo-orange)" />
            </div>
            <div className="font-display" style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.35rem' }}>
              {totalDivertedKg.toFixed(2)} <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>kg</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>From landfill diversion</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid #27AE60' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>GHG Saved (CO₂e)</span>
              <Leaf size={18} color="#27AE60" />
            </div>
            <div className="font-display" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#27AE60', marginTop: '0.35rem' }}>
              {co2SavedKg.toFixed(2)} <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>kg</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Equiv to 4.2 trees planted</span>
          </div>
        </div>

        {/* Gamification Progress Bar */}
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--neo-bg-alt)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.8125rem' }}>
            <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              🏆 Rank Level: <strong style={{ color: 'var(--neo-green-dark)' }}>Zero-Waste Citizen Pioneer</strong>
            </span>
            <span style={{ color: 'var(--text-tertiary)' }}>
              {greenPoints.toFixed(0)} / {citizenPointsTarget} pts to <strong>Eco Champion Badge</strong>
            </span>
          </div>
          <div className="neo-progress-track">
            <div className="neo-progress-fill" style={{ width: `${Math.min(100, (greenPoints / citizenPointsTarget) * 100)}%` }}></div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          MODULE 2 & 3: AI CAMERA VIEWFINDER & TACTILE GUIDANCE CARD
          ═══════════════════════════════════════════════════════════ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.25fr) minmax(320px, 1fr)', gap: '2rem' }}>
        
        {/* Left Column: AI Camera Viewfinder (Inset Neomorphic Container) */}
        <div className="neo-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div className="neo-circle-btn" style={{ width: '38px', height: '38px' }}>
                <Camera size={18} />
              </div>
              <h2 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                Live AI Camera Stream
              </h2>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className={`neo-btn ${cameraActive ? 'neo-btn-primary' : ''}`}
                style={{ fontSize: '0.75rem', padding: '0.45rem 0.85rem' }}
                onClick={cameraActive ? stopCamera : startCamera}
              >
                {cameraActive ? 'Stop Stream' : 'Enable Webcam'}
              </button>
            </div>
          </div>

          {/* Quick Item Feed Switcher */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
            {WASTE_DATABASE.map((item, idx) => (
              <button
                key={item.id}
                className={`neo-btn ${selectedWasteIndex === idx ? 'active' : ''}`}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.75rem',
                  whiteSpace: 'nowrap',
                  fontWeight: selectedWasteIndex === idx ? 700 : 500,
                  color: selectedWasteIndex === idx ? 'var(--neo-green-dark)' : 'var(--text-secondary)'
                }}
                onClick={() => {
                  setSelectedWasteIndex(idx);
                  triggerScan();
                }}
              >
                {item.code} {item.name.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Inset Camera Viewfinder */}
          <div
            className="neo-inset-lg"
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              minHeight: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#0B1118'
            }}
          >
            {/* Live Video Feed OR Sample Simulation Image */}
            {cameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
              />
            ) : (
              <img
                src={currentItem.sampleImg}
                alt={currentItem.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  inset: 0,
                  filter: isScanning ? 'brightness(0.7) contrast(1.2)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              />
            )}

            {/* Neural Net Scanning Grid & Laser Reticle */}
            {isScanning && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(rgba(46, 204, 113, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(46, 204, 113, 0.15) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                }}
              >
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, transparent, var(--neo-green), transparent)',
                  boxShadow: '0 0 15px var(--neo-green)',
                  animation: 'shimmer 1.5s infinite linear'
                }}></div>
                <div style={{
                  padding: '0.75rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(0,0,0,0.85)',
                  border: '1px solid var(--neo-green)',
                  color: 'var(--neo-green)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <RefreshCw size={16} className="rotate-icon" style={{ animation: 'spin 1s linear infinite' }} />
                  Running YOLOE-26 Segmentation Tensor...
                </div>
              </div>
            )}

            {/* Dynamic AI Instance Segmentation Bounding Box */}
            {scanComplete && !isScanning && (
              <div
                style={{
                  position: 'absolute',
                  left: `${currentItem.box.x}%`,
                  top: `${currentItem.box.y}%`,
                  width: `${currentItem.box.w}%`,
                  height: `${currentItem.box.h}%`,
                  border: `2px solid ${currentItem.color}`,
                  borderRadius: '12px',
                  boxShadow: `0 0 20px ${currentItem.color}80, inset 0 0 15px ${currentItem.color}30`,
                  pointerEvents: 'none',
                  zIndex: 5,
                  transition: 'all 0.4s ease'
                }}
              >
                {/* Floating Tag */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-32px',
                    left: '0',
                    background: currentItem.color,
                    color: '#FFFFFF',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Cpu size={12} />
                  {currentItem.code} • {(currentItem.confidence * 100).toFixed(1)}%
                </div>

                {/* Target Reticles */}
                <div style={{ position: 'absolute', top: -4, left: -4, width: 12, height: 12, borderTop: `3px solid ${currentItem.color}`, borderLeft: `3px solid ${currentItem.color}` }}></div>
                <div style={{ position: 'absolute', top: -4, right: -4, width: 12, height: 12, borderTop: `3px solid ${currentItem.color}`, borderRight: `3px solid ${currentItem.color}` }}></div>
                <div style={{ position: 'absolute', bottom: -4, left: -4, width: 12, height: 12, borderBottom: `3px solid ${currentItem.color}`, borderLeft: `3px solid ${currentItem.color}` }}></div>
                <div style={{ position: 'absolute', bottom: -4, right: -4, width: 12, height: 12, borderBottom: `3px solid ${currentItem.color}`, borderRight: `3px solid ${currentItem.color}` }}></div>
              </div>
            )}

            {/* Bottom HUD Overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                right: '12px',
                background: 'rgba(10, 15, 24, 0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: 'var(--radius-md)',
                padding: '0.625rem 1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                border: '1px solid rgba(255,255,255,0.1)',
                zIndex: 6
              }}
            >
              <div>
                <span style={{ color: '#9CA3AF' }}>PWVO Ontology: </span>
                <strong style={{ color: currentItem.color }}>{currentItem.polymer}</strong>
              </div>
              <div>
                <span style={{ color: '#9CA3AF' }}>Inference: </span>
                <strong>{inferenceTime} ms</strong> | <strong>{currentItem.frameCoverage}</strong> cov
              </div>
            </div>
          </div>

          {/* Trigger Scan and Manual Override Action Bar */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button
              className="neo-btn neo-btn-primary"
              style={{ flex: 1 }}
              onClick={triggerScan}
              disabled={isScanning}
            >
              <RefreshCw size={16} /> Re-Analyze Frame
            </button>
            <button
              className="neo-btn"
              style={{ fontSize: '0.8125rem' }}
              onClick={() => toast('Operator override console unlocked for manual audit.', { icon: '🛡️' })}
            >
              Manual Override
            </button>
          </div>
        </div>

        {/* Right Column: Tactile Neomorphic Guidance Card (Module 3 & 4) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Tactile Extruded Pop-Up Guidance Card */}
          <div className="neo-card" style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <span
                  className="neo-badge"
                  style={{
                    background: `${currentItem.color}15`,
                    color: currentItem.color,
                    border: `1px solid ${currentItem.color}40`,
                    marginBottom: '0.5rem'
                  }}
                >
                  {currentItem.category}
                </span>
                <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                  {currentItem.name}
                </h2>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>
                  EPR Tier: <strong>{currentItem.eprCategory}</strong>
                </div>
              </div>

              {/* Instant Valuation Tag */}
              <div
                className="neo-card-sm"
                style={{
                  textAlign: 'right',
                  padding: '0.625rem 1rem',
                  border: '1px solid var(--neo-green-glow)'
                }}
              >
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                  Market Yield
                </div>
                <div className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--neo-green-dark)' }}>
                  {currentItem.valuePerKg} pts/kg
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--neo-blue)', fontWeight: 600 }}>
                  ₹{currentItem.inrPerKg.toFixed(2)}/kg
                </div>
              </div>
            </div>

            {/* Interactive Step-by-Step Handling Instructions */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-secondary)' }}>
                  Interactive Pre-Disposal Protocol
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {completedSteps.filter(Boolean).length} of 4 steps completed
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {currentItem.instructions.map((inst, idx) => {
                  const isDone = completedSteps[idx];
                  return (
                    <div
                      key={idx}
                      className={isDone ? 'neo-inset-sm' : 'neo-card-sm'}
                      onClick={() => handleStepToggle(idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.875rem',
                        cursor: 'pointer',
                        transition: 'var(--transition)',
                        background: isDone ? 'rgba(46, 204, 113, 0.06)' : 'var(--neo-bg)'
                      }}
                    >
                      <div
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: isDone ? 'var(--neo-green)' : 'var(--neo-bg)',
                          boxShadow: isDone ? 'none' : 'var(--shadow-extruded-sm)',
                          color: isDone ? '#FFFFFF' : 'var(--text-muted)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          flexShrink: 0
                        }}
                      >
                        {isDone ? <Check size={14} /> : inst.step}
                      </div>

                      <span
                        style={{
                          fontSize: '0.84rem',
                          color: isDone ? 'var(--text-tertiary)' : 'var(--text-primary)',
                          textDecoration: isDone ? 'line-through' : 'none',
                          lineHeight: 1.4
                        }}
                      >
                        {inst.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════
                MODULE 4: SCALE INTEGRATION & DEPOSIT CONFIRMATION
                ═══════════════════════════════════════════════════════════ */}
            <div className="neo-inset" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Scale size={16} /> Integrated Smart Bin Scale
                </span>
                <span className="neo-badge neo-badge-green" style={{ fontSize: '0.6875rem' }}>
                  Live Tare Calibrated
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                  type="number"
                  step="0.05"
                  min="0.1"
                  max="100"
                  className="neo-input font-display"
                  style={{ fontSize: '1.35rem', fontWeight: 800, textAlign: 'center', color: 'var(--neo-green-dark)' }}
                  value={weightKg}
                  onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0.1)}
                />
                <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-secondary)' }}>kg</span>

                <div style={{ flex: 1, textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Settlement Payout</div>
                  <strong style={{ fontSize: '1.15rem', color: 'var(--neo-green-dark)' }}>
                    +{(weightKg * currentItem.valuePerKg).toFixed(2)} pts
                  </strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--neo-blue)', fontWeight: 600 }}>
                    +₹{(weightKg * currentItem.inrPerKg).toFixed(2)} UPI
                  </div>
                </div>
              </div>
            </div>

            {/* Confirm Deposit Action Button */}
            <button
              className="neo-btn neo-btn-primary"
              style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
              onClick={handleDepositConfirm}
            >
              <CheckCircle2 size={20} /> Confirm Deposit &amp; Settle Incentive
            </button>

            {/* Trace Record Prompt & Auditing */}
            {lastTraceJson && (
              <div
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.625rem 0.875rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(52, 152, 219, 0.08)',
                  border: '1px solid rgba(52, 152, 219, 0.3)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem' }}>
                  <ShieldCheck size={16} color="var(--neo-blue)" />
                  <span>
                    Verified Trace: <strong>{lastTraceJson.event_id}</strong>
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="neo-btn"
                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                    onClick={() => setShowJsonModal(true)}
                  >
                    <Eye size={12} /> Inspect
                  </button>
                  <button
                    className="neo-btn"
                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                    onClick={downloadJsonTrace}
                  >
                    <Download size={12} /> JSON
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          MODAL 1: STATION PAIRING QR CODE MODAL
          ═══════════════════════════════════════════════════════════ */}
      {showStationModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setShowStationModal(false)}
        >
          <div
            className="neo-card-lg"
            style={{ maxWidth: '500px', width: '100%', background: 'var(--neo-bg)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <QrCode size={22} color="var(--neo-green-dark)" />
                <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                  Smart Station QR Pairing
                </h3>
              </div>
              <button className="neo-circle-btn" style={{ width: '36px', height: '36px' }} onClick={() => setShowStationModal(false)}>
                ✕
              </button>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              Hold smartphone near the physical QR label printed on the waste bank scale or select an active geo-fenced depot:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '1.5rem' }}>
              {STATION_LOCATIONS.map((st) => (
                <div
                  key={st.id}
                  className={station.id === st.id ? 'neo-inset' : 'neo-card-sm'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    border: station.id === st.id ? '1px solid var(--neo-green)' : 'none'
                  }}
                  onClick={() => {
                    setStation(st);
                    toast.success(`Paired with ${st.name}! Session geo-locked.`);
                    setShowStationModal(false);
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '0.9375rem', display: 'block' }}>{st.name}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                      {st.ward} • {st.bins.length} High-Purity Slots
                    </span>
                  </div>
                  {station.id === st.id && (
                    <span className="neo-badge neo-badge-green" style={{ fontSize: '0.7rem' }}>
                      <Check size={12} /> Connected
                    </span>
                  )}
                </div>
              ))}
            </div>

            <button
              className="neo-btn neo-btn-primary"
              style={{ width: '100%' }}
              onClick={() => {
                toast.success('Simulated QR scan code 0x9928AF. Station verified!');
                setShowStationModal(false);
              }}
            >
              Simulate Instant Bin QR Scan
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          MODAL 2: CPCB EPR AUDITABLE JSON TRACE VIEWER
          ═══════════════════════════════════════════════════════════ */}
      {showJsonModal && lastTraceJson && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setShowJsonModal(false)}
        >
          <div
            className="neo-card-lg"
            style={{ maxWidth: '640px', width: '100%', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  CPCB EPR Digital Provenance Ledger
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                  Machine-verifiable JSON trace compliant with Central Pollution Control Board (India)
                </span>
              </div>
              <button className="neo-circle-btn" style={{ width: '36px', height: '36px' }} onClick={() => setShowJsonModal(false)}>
                ✕
              </button>
            </div>

            <pre
              className="neo-inset"
              style={{
                flex: 1,
                overflowY: 'auto',
                fontSize: '0.78rem',
                fontFamily: 'monospace',
                padding: '1rem',
                background: '#0D131A',
                color: '#34D399',
                borderRadius: 'var(--radius-md)'
              }}
            >
              {JSON.stringify(lastTraceJson, null, 2)}
            </pre>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
              <button className="neo-btn" onClick={() => setShowJsonModal(false)}>
                Close
              </button>
              <button className="neo-btn neo-btn-primary" onClick={downloadJsonTrace}>
                <Download size={16} /> Download .json Payload
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
