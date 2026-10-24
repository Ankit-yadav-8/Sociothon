import { useState, useEffect, useRef } from 'react';
import {
  Truck, CheckCircle2, MapPin, IndianRupee, Scale, Award,
  Clock, Shield, ArrowUpRight, Phone, Navigation, AlertCircle,
  QrCode, KeyRound, Check, Camera, Upload, Send, FileText,
  AlertTriangle, Eye, RefreshCw, Building2, User, Search, X
} from 'lucide-react';
import toast from 'react-hot-toast';
import { platformStore } from '../../services/platformStore';

export default function CollectorDashboard() {
  const [stats, setStats] = useState(platformStore.getPlatformStats());
  const [rates, setRates] = useState(platformStore.getRewardRates());
  const [recyclers, setRecyclers] = useState(platformStore.getRecyclers());
  const [collections, setCollections] = useState(platformStore.getCollections());
  
  // Tab Filter
  const [activeTab, setActiveTab] = useState('all'); // all, proposed, accepted, collected, recycler

  // Proposal Creation Form State
  const [volunteerSearchId, setVolunteerSearchId] = useState('');
  const [validatedVolunteer, setValidatedVolunteer] = useState(null);
  const [volunteerSearchError, setVolunteerSearchError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(rates[0]?.id || 'plastic_pet');
  const [measuredWeight, setMeasuredWeight] = useState('');
  const [pickupLocation, setPickupLocation] = useState('Sarojini Bhawan, IIT Roorkee');
  const [isSubmittingProposal, setIsSubmittingProposal] = useState(false);

  // Camera & Photo Evidence State for Collection Record
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Delivery Proof Modal State
  const [deliveryModalItem, setDeliveryModalItem] = useState(null);
  const [receiptNo, setReceiptNo] = useState('');
  const [weighbridgeGross, setWeighbridgeGross] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Correction Request Modal State
  const [correctionModalItem, setCorrectionModalItem] = useState(null);
  const [correctionWeight, setCorrectionWeight] = useState('');
  const [correctionReason, setCorrectionReason] = useState('');

  const refreshData = () => {
    setCollections(platformStore.getCollections());
    setRates(platformStore.getRewardRates());
    setRecyclers(platformStore.getRecyclers());
    setStats(platformStore.getPlatformStats());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Volunteer ID Search Validation
  const handleValidateVolunteer = () => {
    setVolunteerSearchError('');
    if (!volunteerSearchId.trim()) {
      setVolunteerSearchError('Please enter a Volunteer ID.');
      setValidatedVolunteer(null);
      return;
    }
    const found = platformStore.findVolunteerById(volunteerSearchId);
    if (found) {
      setValidatedVolunteer(found);
      if (found.address) setPickupLocation(found.address);
      toast.success(`Verified: ${found.name} (${found.volunteerId})`);
    } else {
      setValidatedVolunteer(null);
      setVolunteerSearchError(`Volunteer ID "${volunteerSearchId.toUpperCase()}" not found in verified registry.`);
      toast.error('Unregistered Volunteer ID.');
    }
  };

  // Selected Category Object & Live Estimated Value Calculation
  const activeCategoryObj = rates.find(r => r.id === selectedCategory) || rates[0];
  const calculatedEstimatedReward = activeCategoryObj && measuredWeight
    ? (parseFloat(measuredWeight) * activeCategoryObj.ratePerKg).toFixed(2)
    : '0.00';

  // Camera handling for garbage photos
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('WebRTC Camera API is not supported in this browser context or insecure HTTP.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } }
      });
      streamRef.current = stream;
      setCameraActive(true);
      setCapturedPhoto(null);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(e => console.warn('Camera play error:', e));
        }
      }, 50);
      toast.success('Camera active. Capture photo of garbage batch.');
    } catch (err) {
      console.warn('Camera stream error:', err);
      const msg = err.name === 'NotAllowedError'
        ? 'Camera permission denied. Please allow camera access in browser address bar.'
        : err.message || 'Camera hardware unavailable.';
      setCameraError(msg);
      setCameraActive(false);
      toast.error(msg);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    setCapturedPhoto(dataUrl);
    stopCamera();
    toast.success('Garbage photo captured and attached to record.');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedPhoto(event.target.result);
        toast.success('Photo uploaded and attached to record.');
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  // Submit New Collection Proposal
  const handleCreateProposal = (e) => {
    e.preventDefault();
    if (!validatedVolunteer) {
      toast.error('Please validate a Volunteer ID first.');
      return;
    }
    if (!measuredWeight || parseFloat(measuredWeight) <= 0) {
      toast.error('Please enter a valid weight in kilograms.');
      return;
    }

    setIsSubmittingProposal(true);
    try {
      const proposal = platformStore.createProposal({
        volunteerId: validatedVolunteer.volunteerId,
        collectorId: 'COL-2026-KABADI-01',
        collectorName: 'Ramesh Kumar',
        category: selectedCategory,
        weightKg: parseFloat(measuredWeight),
        location: pickupLocation,
        wastePhoto: capturedPhoto || undefined
      });

      toast.success(`Proposal #${proposal.id} sent to ${validatedVolunteer.name}! Notification & email dispatched.`);
      refreshData();
      
      // Reset form
      setMeasuredWeight('');
      setCapturedPhoto(null);
      setValidatedVolunteer(null);
      setVolunteerSearchId('');
    } catch (err) {
      toast.error(err.message || 'Failed to create proposal.');
    } finally {
      setIsSubmittingProposal(false);
    }
  };

  // Collector Finalizes Physical Collection (Only allowed if VOLUNTEER_ACCEPTED)
  const handleFinalizeCollection = (collection) => {
    try {
      const measuredTare = prompt(`Confirm actual calibrated digital scale weight for Lot #${collection.id} (kg):`, collection.proposedWeightKg);
      if (!measuredTare) return;
      const weight = parseFloat(measuredTare);
      if (isNaN(weight) || weight <= 0) {
        toast.error('Invalid weight entered.');
        return;
      }

      platformStore.finalizeCollection(collection.id, weight, null, 'Ramesh Kumar');
      toast.success(`Physical collection finalized for Lot #${collection.id} (${weight} kg). Submitted for Admin verification.`);
      refreshData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Submit Recycler Delivery Proof
  const handleSubmitDeliveryProof = (e) => {
    e.preventDefault();
    if (!deliveryModalItem) return;
    try {
      platformStore.submitDeliveryProof(deliveryModalItem.id, {
        receiptNo: receiptNo || `RCP-${Math.floor(10000 + Math.random() * 90000)}`,
        weighbridgeGrossKg: weighbridgeGross || deliveryModalItem.actualWeightKg,
        notes: deliveryNotes
      }, 'Ramesh Kumar');

      toast.success(`Delivery proof submitted for Lot #${deliveryModalItem.id}. Awaiting Admin verification.`);
      setDeliveryModalItem(null);
      setReceiptNo('');
      setWeighbridgeGross('');
      setDeliveryNotes('');
      refreshData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Submit Auditable Correction Request
  const handleSubmitCorrection = (e) => {
    e.preventDefault();
    if (!correctionModalItem) return;
    if (!correctionWeight || !correctionReason.trim()) {
      toast.error('Please enter revised weight and audit justification.');
      return;
    }
    try {
      platformStore.submitCorrectionRequest(correctionModalItem.id, {
        revisedWeightKg: parseFloat(correctionWeight),
        revisedCategoryId: correctionModalItem.category,
        reason: correctionReason
      }, 'Ramesh Kumar');

      toast.success(`Correction request logged in audit trail for Admin review.`);
      setCorrectionModalItem(null);
      setCorrectionWeight('');
      setCorrectionReason('');
      refreshData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Filter Collections
  const safeCollections = Array.isArray(collections) ? collections : [];
  const filteredCollections = safeCollections.filter(c => {
    if (!c) return false;
    if (activeTab === 'proposed') return c.status === 'PROPOSED';
    if (activeTab === 'accepted') return c.status === 'VOLUNTEER_ACCEPTED';
    if (activeTab === 'collected') return c.status === 'COLLECTED';
    if (activeTab === 'recycler') return ['RECYCLER_ASSIGNED', 'DELIVERED', 'DELIVERY_VERIFIED'].includes(c.status);
    return true;
  });

  return (
    <div className="container-max" style={{ paddingBottom: '3rem' }}>
      
      {/* Hidden processing canvas & file input */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <input ref={fileInputRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={handleFileUpload} />

      {/* Header Banner */}
      <div className="neo-card" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="neo-badge neo-badge-green">
                <Truck size={14} /> Certified Field Collector &amp; Aggregator
              </span>
              <span className="neo-badge neo-badge-blue">
                ID: COL-2026-KABADI-01
              </span>
              <span className="neo-badge neo-badge-orange">
                Vehicle: UK-08-EV-4421 (IIT Roorkee Ward)
              </span>
            </div>
            <h1 className="font-display" style={{ fontSize: '1.85rem', fontWeight: 800 }}>
              Collector &amp; Hauler Console
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Create verified pickup records for registered volunteers, weigh recyclable lots, and deliver to designated recycling plants with cryptographic proof.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="neo-btn" onClick={() => toast.success('Digital bluetooth tare scale calibrated.')}>
              <Scale size={16} /> Calibrate Tare Scale
            </button>
            <button className="neo-btn neo-btn-primary" onClick={refreshData}>
              <RefreshCw size={16} /> Sync Live Data
            </button>
          </div>
        </div>

        {/* Quick Collector Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-green)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Active Proposals</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-green-dark)', marginTop: '0.25rem' }}>
              {safeCollections.filter(c => c && c.status === 'PROPOSED').length}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Awaiting volunteer confirmation</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-blue)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Ready for Physical Pickup</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-blue)', marginTop: '0.25rem' }}>
              {safeCollections.filter(c => c && c.status === 'VOLUNTEER_ACCEPTED').length}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Volunteer accepted • Go collect</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-orange)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Total Collected Weight</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-orange)', marginTop: '0.25rem' }}>
              {safeCollections.reduce((sum, c) => sum + (c ? (c.actualWeightKg || c.proposedWeightKg || 0) : 0), 0).toFixed(1)} <span style={{ fontSize: '0.875rem' }}>kg</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Across all materials</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-purple)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Recycler Transfers</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-purple)', marginTop: '0.25rem' }}>
              {safeCollections.filter(c => c && ['RECYCLER_ASSIGNED', 'DELIVERED', 'PAID'].includes(c.status)).length}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dispatched to plant</span>
          </div>

        </div>
      </div>

      {/* Main Grid: Form on Left, Proposals List on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.15fr) minmax(320px, 1.35fr)', gap: '1.75rem' }}>
        
        {/* Left Column: Create Garbage Collection Record & Proposal */}
        <div className="neo-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <div className="neo-circle-btn" style={{ width: '38px', height: '38px', background: 'var(--accent-green)', color: '#0A0E17' }}>
              <Scale size={18} />
            </div>
            <div>
              <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                Create Collection Record
              </h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Issue an auditable proposal to a registered volunteer. Physical collection is locked until accepted.
              </p>
            </div>
          </div>

          <form onSubmit={handleCreateProposal} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            
            {/* Step 1: Volunteer ID Search & Validation */}
            <div className="neo-inset" style={{ padding: '1rem', borderRadius: '12px' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Volunteer ID Lookup <span style={{ color: 'var(--accent-red)' }}>*</span>
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="e.g. VOL-2026-E47A91BC"
                  value={volunteerSearchId}
                  onChange={(e) => setVolunteerSearchId(e.target.value.toUpperCase())}
                  className="neo-input"
                  style={{ textTransform: 'uppercase', fontFamily: 'monospace', fontWeight: 700, fontSize: '0.9rem' }}
                />
                <button
                  type="button"
                  onClick={handleValidateVolunteer}
                  className="neo-btn neo-btn-primary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                >
                  <Search size={14} /> Validate
                </button>
              </div>

              {/* Quick Volunteer Selector Suggestions */}
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quick Select:</span>
                {platformStore.getAllVolunteers().map(v => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      setVolunteerSearchId(v.volunteerId);
                      setValidatedVolunteer(v);
                      if (v.address) setPickupLocation(v.address);
                      setVolunteerSearchError('');
                    }}
                    style={{
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      padding: '2px 6px',
                      cursor: 'pointer',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {v.name} ({v.volunteerId.slice(-4)})
                  </button>
                ))}
              </div>

              {/* Validation Status Display */}
              {validatedVolunteer && (
                <div style={{ marginTop: '0.75rem', padding: '0.65rem 0.85rem', background: 'rgba(46, 204, 113, 0.1)', border: '1px solid var(--accent-green)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--accent-green)' }}>
                      ✓ {validatedVolunteer.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {validatedVolunteer.email} • {validatedVolunteer.volunteerId}
                    </div>
                  </div>
                  <span className="neo-badge neo-badge-green" style={{ fontSize: '0.68rem' }}>Verified Donor</span>
                </div>
              )}

              {volunteerSearchError && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <AlertCircle size={14} /> {volunteerSearchError}
                </div>
              )}
            </div>

            {/* Step 2: Garbage Category Selection */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Garbage Category (Admin Configured Rates) <span style={{ color: 'var(--accent-red)' }}>*</span>
              </label>
              <select
                className="neo-input"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ width: '100%', fontSize: '0.875rem' }}
              >
                {rates.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.icon} {r.name} — ₹{r.ratePerKg.toFixed(2)}/kg
                  </option>
                ))}
              </select>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.3rem' }}>
                Rate: <strong>₹{activeCategoryObj.ratePerKg.toFixed(2)} / kg</strong> ({activeCategoryObj.description})
              </div>
            </div>

            {/* Step 3: Measured Weight & Transparent Reward Calculation */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Weight (kg) <span style={{ color: 'var(--accent-red)' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    placeholder="e.g. 12.5"
                    value={measuredWeight}
                    onChange={(e) => setMeasuredWeight(e.target.value)}
                    className="neo-input"
                    style={{ width: '100%', fontSize: '1.1rem', fontWeight: 800 }}
                    required
                  />
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    kg
                  </span>
                </div>
              </div>

              <div style={{ padding: '0.75rem', borderRadius: '10px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Estimated Reward
                </span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent-green)', marginTop: '0.15rem' }}>
                  ₹{calculatedEstimatedReward}
                </div>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>
                  Transparent: {measuredWeight || '0'} kg × ₹{activeCategoryObj.ratePerKg}/kg
                </span>
              </div>
            </div>

            {/* Step 4: Collection Location */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Collection Location <span style={{ color: 'var(--accent-red)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="e.g. Sarojini Bhawan Room 204, IIT Roorkee"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="neo-input"
                  style={{ paddingLeft: '2.4rem', width: '100%', fontSize: '0.85rem' }}
                  required
                />
              </div>
            </div>

            {/* Step 5: Camera & Photo Capture of Garbage */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Garbage Photo Evidence (Camera or Upload)
              </label>
              
              {/* Camera viewfinder box if camera is active */}
              {cameraActive && (
                <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '10px', overflow: 'hidden', background: '#000', marginBottom: '0.75rem' }}>
                  <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: '10px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                    <button type="button" onClick={capturePhoto} className="neo-btn neo-btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                      <Camera size={14} /> Capture Image
                    </button>
                    <button type="button" onClick={stopCamera} className="neo-btn" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Photo preview if captured */}
              {capturedPhoto && !cameraActive && (
                <div style={{ position: 'relative', width: '100%', height: '140px', borderRadius: '10px', overflow: 'hidden', marginBottom: '0.75rem', border: '1px solid var(--accent-green)' }}>
                  <img src={capturedPhoto} alt="Captured garbage" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button
                    type="button"
                    onClick={() => setCapturedPhoto(null)}
                    style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.7)', color: '#fff', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <X size={14} />
                  </button>
                  <div style={{ position: 'absolute', bottom: '6px', left: '8px', background: 'rgba(0,0,0,0.75)', color: 'var(--accent-green)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>
                    ✓ Photo Attached to Audit Record
                  </div>
                </div>
              )}

              {/* Action Buttons to open camera or upload */}
              {!cameraActive && !capturedPhoto && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={startCamera}
                    className="neo-btn"
                    style={{ flex: 1, padding: '0.6rem', fontSize: '0.8rem', justifyContent: 'center' }}
                  >
                    <Camera size={15} /> Open Camera
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="neo-btn"
                    style={{ flex: 1, padding: '0.6rem', fontSize: '0.8rem', justifyContent: 'center' }}
                  >
                    <Upload size={15} /> Upload Photo
                  </button>
                </div>
              )}

              {cameraError && (
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-red)', marginTop: '0.4rem' }}>
                  {cameraError}
                </div>
              )}
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmittingProposal || !validatedVolunteer}
              className="neo-btn neo-btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', justifyContent: 'center', marginTop: '0.5rem' }}
            >
              <Send size={16} /> Send Collection Proposal to Volunteer
            </button>
          </form>
        </div>

        {/* Right Column: Collection Proposals & Pickups Pipeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Filter Pills */}
          <div className="neo-card-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', padding: '0.75rem 1rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700 }}>Filter Worklist:</span>
            <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto' }}>
              {[
                { id: 'all', label: `All (${safeCollections.length})` },
                { id: 'proposed', label: `Awaiting Volunteer (${safeCollections.filter(c => c && c.status === 'PROPOSED').length})` },
                { id: 'accepted', label: `Ready to Collect (${safeCollections.filter(c => c && c.status === 'VOLUNTEER_ACCEPTED').length})` },
                { id: 'collected', label: `Admin Review (${safeCollections.filter(c => c && c.status === 'COLLECTED').length})` },
                { id: 'recycler', label: `Recycler Orders (${safeCollections.filter(c => c && ['RECYCLER_ASSIGNED', 'DELIVERED', 'DELIVERY_VERIFIED'].includes(c.status)).length})` },
              ].map(t => (

                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`neo-btn ${activeTab === t.id ? 'active' : ''}`}
                  style={{ fontSize: '0.72rem', padding: '0.35rem 0.65rem', whiteSpace: 'nowrap' }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* List of Collection Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredCollections.length === 0 ? (
              <div className="neo-card" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-tertiary)' }}>
                <FileText size={36} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
                <p>No collections found in this filter view.</p>
              </div>
            ) : (
              filteredCollections.map(item => {
                const isVolunteerAccepted = item.status === 'VOLUNTEER_ACCEPTED';
                const isProposed = item.status === 'PROPOSED';
                const isCollected = item.status === 'COLLECTED';
                const isRecyclerAssigned = item.status === 'RECYCLER_ASSIGNED';
                const isDelivered = item.status === 'DELIVERED';
                const isPaid = item.status === 'PAID';

                return (
                  <div
                    key={item.id}
                    className="neo-card"
                    style={{
                      borderLeft: isPaid
                        ? '4px solid var(--accent-green)'
                        : isVolunteerAccepted
                        ? '4px solid var(--neo-blue)'
                        : isProposed
                        ? '4px solid var(--accent-orange)'
                        : '4px solid var(--border-medium)',
                      padding: '1.25rem'
                    }}
                  >
                    {/* Card Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                          <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.95rem' }}>
                            {item.id}
                          </span>
                          <span className={`neo-badge ${
                            isPaid ? 'neo-badge-green' :
                            isVolunteerAccepted ? 'neo-badge-blue' :
                            isProposed ? 'neo-badge-orange' : 'neo-badge-purple'
                          }`} style={{ fontSize: '0.7rem' }}>
                            {item.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {item.volunteerName} <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--text-tertiary)' }}>({item.volunteerId})</span>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                          {item.actualWeightKg ? 'Measured' : 'Proposed'} Weight
                        </div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800 }}>
                          {item.actualWeightKg || item.proposedWeightKg} <span style={{ fontSize: '0.8rem' }}>kg</span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 700 }}>
                          ₹{item.finalReward || item.estimatedReward}
                        </div>
                      </div>
                    </div>

                    {/* Metadata Specs */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.6rem', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '8px', fontSize: '0.78rem', marginBottom: '0.85rem' }}>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>Category:</span>
                        <div style={{ fontWeight: 600 }}>{item.categoryName}</div>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>Rate Applied:</span>
                        <div style={{ fontWeight: 600 }}>₹{item.ratePerKg.toFixed(2)}/kg</div>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>Location:</span>
                        <div style={{ fontWeight: 600 }}>{item.location}</div>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>Date Logged:</span>
                        <div style={{ fontWeight: 600 }}>{new Date(item.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>

                    {/* Assigned Recycler Info if Available */}
                    {item.assignedRecycler && (
                      <div style={{ padding: '0.65rem 0.85rem', background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.25)', borderRadius: '8px', marginBottom: '0.85rem', fontSize: '0.78rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--neo-blue)', fontWeight: 700, marginBottom: '0.2rem' }}>
                          <Building2 size={14} /> Assigned Recycler: {item.assignedRecycler.name}
                        </div>
                        <div style={{ color: 'var(--text-secondary)' }}>
                          Facility: {item.assignedRecycler.facility} ({item.assignedRecycler.cpcbReg})
                        </div>
                      </div>
                    )}

                    {/* Dynamic Action Controls based on Explicit States */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                      
                      {/* State 1: PROPOSED -> Waiting for volunteer */}
                      {isProposed && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--accent-orange)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Clock size={14} /> Awaiting Volunteer confirmation. Doorstep pickup locked.
                        </div>
                      )}

                      {/* State 2: VOLUNTEER_ACCEPTED -> Collector can finalize physical pickup */}
                      {isVolunteerAccepted && (
                        <button
                          onClick={() => handleFinalizeCollection(item)}
                          className="neo-btn neo-btn-primary"
                          style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                        >
                          <Scale size={14} /> Finalize Tare Weight &amp; Collect
                        </button>
                      )}

                      {/* State 3: COLLECTED -> Under admin review */}
                      {isCollected && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Shield size={14} /> Submitted to Admin. Awaiting verification &amp; recycler routing.
                        </div>
                      )}

                      {/* State 7: RECYCLER_ASSIGNED -> Deliver to plant */}
                      {isRecyclerAssigned && (
                        <button
                          onClick={() => {
                            setDeliveryModalItem(item);
                            setWeighbridgeGross(item.actualWeightKg?.toString() || '');
                          }}
                          className="neo-btn neo-btn-primary"
                          style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                        >
                          <Truck size={14} /> Deliver to Recycler &amp; Upload Proof
                        </button>
                      )}

                      {/* State 8: DELIVERED -> Waiting for Recycler signoff */}
                      {isDelivered && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--accent-orange)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Clock size={14} /> Handover submitted to {item.assignedRecycler?.name || 'Recycling Plant'}. Awaiting Recycler secure intake confirmation.
                        </div>
                      )}

                      {/* State 8c: DELIVERY_VERIFIED -> Recycler confirmed secure handover */}
                      {item.status === 'DELIVERY_VERIFIED' && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <CheckCircle2 size={14} /> Recycler Confirmed Secure Intake ({item.recyclerIntake?.intakeSlipNo || 'Verified'})! Updated to Admin for Payment Approval.
                        </div>
                      )}

                      {/* Auditable Correction Request Button (Always available for integrity) */}
                      {!isPaid && (
                        <button
                          onClick={() => {
                            setCorrectionModalItem(item);
                            setCorrectionWeight((item.actualWeightKg || item.proposedWeightKg)?.toString() || '');
                          }}
                          className="neo-btn"
                          style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem' }}
                          title="Submit an auditable correction for weight or category"
                        >
                          Audit Correction
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* MODAL 1: Upload Recycler Delivery Proof */}
      {deliveryModalItem && (
        <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="neo-card" style={{ maxWidth: '520px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                Upload Delivery Proof for Lot #{deliveryModalItem.id}
              </h3>
              <button onClick={() => setDeliveryModalItem(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Designated Plant: <strong>{deliveryModalItem.assignedRecycler?.name}</strong> ({deliveryModalItem.assignedRecycler?.facility})
            </p>

            <form onSubmit={handleSubmitDeliveryProof} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Weighbridge / Plant Receipt Slip Number <span style={{ color: 'var(--accent-red)' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. RCP-REL-2026-9901"
                  value={receiptNo}
                  onChange={(e) => setReceiptNo(e.target.value)}
                  className="neo-input"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Intake Net Gross Mass Confirmed (kg) <span style={{ color: 'var(--accent-red)' }}>*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={weighbridgeGross}
                  onChange={(e) => setWeighbridgeGross(e.target.value)}
                  className="neo-input"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Delivery Notes / Inspector Seal
                </label>
                <textarea
                  placeholder="e.g. Received at bay 03, moisture <2.5%, tare seal intact"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="neo-input"
                  rows={3}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" className="neo-btn neo-btn-primary" style={{ flex: 1, padding: '0.75rem' }}>
                  Confirm Delivery &amp; Request Admin Verification
                </button>
                <button type="button" onClick={() => setDeliveryModalItem(null)} className="neo-btn" style={{ padding: '0.75rem' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Auditable Correction Request */}
      {correctionModalItem && (
        <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="neo-card" style={{ maxWidth: '480px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={18} color="var(--accent-orange)" />
                <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  Audit Correction Request
                </h3>
              </div>
              <button onClick={() => setCorrectionModalItem(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
              Collectors cannot unilaterally modify approved weights, volunteer identities, or rewards. All modifications are logged in the cryptographic audit trail for Admin review.
            </p>

            <form onSubmit={handleSubmitCorrection} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Revised Measured Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={correctionWeight}
                  onChange={(e) => setCorrectionWeight(e.target.value)}
                  className="neo-input"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Reason for Correction (Auditable) <span style={{ color: 'var(--accent-red)' }}>*</span>
                </label>
                <textarea
                  placeholder="e.g. Tare tare scale calibration offset detected; corrected with certified 10kg standard mass"
                  value={correctionReason}
                  onChange={(e) => setCorrectionReason(e.target.value)}
                  className="neo-input"
                  rows={3}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" className="neo-btn neo-btn-primary" style={{ flex: 1, padding: '0.75rem' }}>
                  Submit Correction to Admin Audit
                </button>
                <button type="button" onClick={() => setCorrectionModalItem(null)} className="neo-btn" style={{ padding: '0.75rem' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
