import { useState, useEffect } from 'react';
import {
  User, ShieldCheck, Mail, Copy, Check, Sparkles, Scale, IndianRupee,
  Award, Clock, CheckCircle2, XCircle, ArrowRight, Truck, MapPin,
  Calendar, RefreshCw, AlertCircle, FileText, Send, Building2, Bell,
  QrCode, ExternalLink
} from 'lucide-react';
import toast from 'react-hot-toast';
import { platformStore } from '../../services/platformStore';
import { useAuth } from '../../App';

export default function VolunteerDashboard() {
  const { user } = useAuth();
  
  const DEFAULT_VOLUNTEER = {
    id: 'USR-VOL-001',
    name: 'Ananya Deshmukh',
    role: 'volunteer',
    email: 'volunteer@ecoloop.in',
    volunteerId: 'VOL-2026-E47A91BC',
    emailVerified: true,
    upiId: 'ananya@okhdfcbank',
    avatar: 'AD',
    address: 'Sarojini Bhawan Room 204, IIT Roorkee'
  };

  // Real or active volunteer profile
  const [currentVolunteer, setCurrentVolunteer] = useState(() => {
    // If logged in user is volunteer, retrieve their full profile from store
    const storeUser = platformStore.getUserByEmail(user?.email || 'volunteer@ecoloop.in');
    return storeUser || (platformStore.getUsers() && platformStore.getUsers().find(u => u.role === 'volunteer')) || DEFAULT_VOLUNTEER;
  });

  const [metrics, setMetrics] = useState(() => 
    platformStore.getVolunteerMetrics(currentVolunteer?.volunteerId || DEFAULT_VOLUNTEER.volunteerId)
  );

  const [collections, setCollections] = useState(() =>
    platformStore.getCollectionsForVolunteer(currentVolunteer?.volunteerId || DEFAULT_VOLUNTEER.volunteerId)
  );

  const [rates] = useState(platformStore.getRewardRates());
  const [copiedId, setCopiedId] = useState(false);

  // Email verification simulation state
  const [isResendingEmail, setIsResendingEmail] = useState(false);

  // New Collection Request Form State
  const [newCategory, setNewCategory] = useState(rates[0]?.id || 'plastic_pet');
  const [newEstWeight, setNewEstWeight] = useState('');
  const [newLocation, setNewLocation] = useState(currentVolunteer?.address || 'Sarojini Bhawan Room 204, IIT Roorkee');
  const [newNotes, setNewNotes] = useState('');
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

  const refreshData = () => {
    const updatedUser = platformStore.getUserByEmail(currentVolunteer?.email);
    if (updatedUser) setCurrentVolunteer(updatedUser);
    if (currentVolunteer?.volunteerId) {
      setCollections(platformStore.getCollectionsForVolunteer(currentVolunteer.volunteerId));
      setMetrics(platformStore.getVolunteerMetrics(currentVolunteer.volunteerId));
    }
  };

  useEffect(() => {
    refreshData();
  }, [currentVolunteer?.volunteerId]);

  const copyVolunteerId = () => {
    if (currentVolunteer?.volunteerId) {
      navigator.clipboard.writeText(currentVolunteer.volunteerId);
      setCopiedId(true);
      toast.success('Volunteer ID copied to clipboard!');
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleResendVerification = () => {
    setIsResendingEmail(true);
    try {
      platformStore.resendVerificationEmail(currentVolunteer.email);
      toast.success(`Verification link sent to ${currentVolunteer.email}. Check inbox or verify in-app.`);
    } catch (err) {
      toast.error(err.message || 'Error sending verification email.');
    } finally {
      setIsResendingEmail(false);
    }
  };

  const handleSimulateInstantVerify = () => {
    // Helper for quick testing/demo
    const users = platformStore.getUsers();
    const idx = users.findIndex(u => u.email === currentVolunteer.email);
    if (idx !== -1) {
      users[idx].isEmailVerified = true;
      platformStore.setStorage('users', users);
      setCurrentVolunteer({ ...users[idx] });
      toast.success('Account successfully verified! Doorstep pickups unlocked.');
    }
  };

  // Accept or Reject a Proposal from Collector
  const handleProposalResponse = (collectionId, isAccepted) => {
    try {
      platformStore.respondToProposal(collectionId, isAccepted, currentVolunteer.name);
      if (isAccepted) {
        toast.success(`Proposal #${collectionId} accepted! Collector notified to proceed with tare weighing.`);
      } else {
        toast('Proposal declined. Collector notified.', { icon: 'ℹ️' });
      }
      refreshData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Submit a Request for Pickup
  const handleSubmitPickupRequest = (e) => {
    e.preventDefault();
    if (!newEstWeight || parseFloat(newEstWeight) <= 0) {
      toast.error('Please enter estimated weight in kilograms.');
      return;
    }

    setIsSubmittingRequest(true);
    try {
      // Find a default collector to pair with
      const collector = platformStore.getAllCollectors()[0] || { collectorId: 'COL-2026-KABADI-01', name: 'Ramesh Kumar' };
      
      const proposal = platformStore.createProposal({
        volunteerId: currentVolunteer.volunteerId,
        collectorId: collector.collectorId,
        collectorName: collector.name,
        category: newCategory,
        weightKg: parseFloat(newEstWeight),
        location: newLocation
      });

      toast.success(`Collection request #${proposal.id} submitted! Collector ${collector.name} assigned.`);
      setNewEstWeight('');
      setNewNotes('');
      refreshData();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  const safeRates = Array.isArray(rates) ? rates : [];
  const safeCollections = Array.isArray(collections) ? collections : [];
  const activeCategoryObj = safeRates.find(r => r && r.id === newCategory) || safeRates[0] || { id: 'plastic_pet', name: 'PET Bottles', ratePerKg: 18 };
  const pendingProposals = safeCollections.filter(c => c && c.status === 'PROPOSED');
  const activePickups = safeCollections.filter(c => c && ['VOLUNTEER_ACCEPTED', 'COLLECTED', 'ADMIN_APPROVED', 'RECYCLER_ASSIGNED', 'DELIVERED'].includes(c.status));
  const completedCollections = safeCollections.filter(c => c && c.status === 'PAID');


  return (
    <div className="container-max" style={{ paddingBottom: '3rem' }}>
      
      {/* ═══════════════════════════════════════════════════════════
          HERO BANNER & PROMINENT VOLUNTEER ID BADGE
          ═══════════════════════════════════════════════════════════ */}
      <div className="neo-card-lg" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
              <span className="neo-badge neo-badge-green">
                <Sparkles size={14} /> Certified Citizen Recycler
              </span>
              {currentVolunteer?.isEmailVerified ? (
                <span className="neo-badge neo-badge-blue" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <ShieldCheck size={13} /> Email Verified
                </span>
              ) : (
                <span className="neo-badge neo-badge-orange" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <AlertCircle size={13} /> Email Unverified
                </span>
              )}
            </div>
            
            <h1 className="font-display" style={{ fontSize: '1.85rem', fontWeight: 800 }}>
              Welcome, {currentVolunteer?.name || 'Volunteer'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              {currentVolunteer?.email} • {currentVolunteer?.address || 'Campus Resident'}
            </p>
          </div>

          {/* PERMANENT VOLUNTEER ID DISPLAY BOX (Requirement 2A & 3) */}
          <div
            style={{
              padding: '1.1rem 1.4rem',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(59, 130, 246, 0.08))',
              border: '2px solid var(--accent-green)',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              minWidth: '280px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-green)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Permanent Unique Volunteer ID
              </span>
              <span style={{ fontSize: '0.68rem', background: 'var(--accent-green)', color: '#0A0E17', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                IMMUTABLE
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '1.35rem', fontWeight: 900, letterSpacing: '0.04em', color: 'var(--text-primary)' }}>
                {currentVolunteer?.volunteerId || 'GENERATING...'}
              </span>
              <button
                onClick={copyVolunteerId}
                className="neo-btn"
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
                title="Copy Volunteer ID"
              >
                {copiedId ? <Check size={14} color="var(--accent-green)" /> : <Copy size={14} />}
                {copiedId ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)', lineHeight: 1.3 }}>
              Server-generated collision-resistant ID. Share with collectors to link pickup proposals &amp; receive UPI payments.
            </div>
          </div>
        </div>

        {/* EMAIL VERIFICATION CALLOUT (Requirement 4) */}
        {!currentVolunteer?.isEmailVerified && (
          <div style={{ marginTop: '1.25rem', padding: '1rem', borderRadius: '10px', background: 'rgba(230, 126, 34, 0.12)', border: '1px solid rgba(230, 126, 34, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <AlertCircle size={20} color="var(--accent-orange)" />
              <div>
                <strong style={{ fontSize: '0.875rem', display: 'block', color: 'var(--text-primary)' }}>
                  Verify your email address to unlock verified pickups
                </strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  A verification link was sent to <strong>{currentVolunteer?.email}</strong>. Verified accounts earn instant automated UPI rewards.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handleResendVerification}
                disabled={isResendingEmail}
                className="neo-btn"
                style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}
              >
                <Mail size={14} /> Resend Email Link
              </button>
              <button
                onClick={handleSimulateInstantVerify}
                className="neo-btn neo-btn-primary"
                style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}
              >
                <CheckCircle2 size={14} /> Quick Verify (Demo)
              </button>
            </div>
          </div>
        )}

        {/* Volunteer Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--accent-green)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Verified Waste Donated</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-green)', marginTop: '0.25rem' }}>
              {metrics.totalDivertedKg.toFixed(1)} <span style={{ fontSize: '0.875rem' }}>kg</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Diverted from campus landfills</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-blue)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Total Payouts Credited</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-blue)', marginTop: '0.25rem' }}>
              ₹{metrics.totalEarnings.toFixed(2)}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Direct UPI to {currentVolunteer?.upiId || 'Wallet'}</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--accent-orange)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Pending Escrow Rewards</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-orange)', marginTop: '0.25rem' }}>
              ₹{metrics.pendingEarnings.toFixed(2)}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Awaiting recycler delivery</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-purple)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Green Karma Points</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-purple)', marginTop: '0.25rem' }}>
              {metrics.greenKarmaPoints} <span style={{ fontSize: '0.875rem' }}>pts</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>1 pt = ₹1.00 campus store discount</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: PENDING PROPOSALS FROM COLLECTORS (ACTION REQUIRED)
          ═══════════════════════════════════════════════════════════ */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="neo-circle-btn" style={{ width: '34px', height: '34px', background: 'var(--accent-orange)', color: '#0A0E17' }}>
              <Bell size={16} />
            </div>
            <h2 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800 }}>
              Collection Proposals Requiring Your Confirmation
            </h2>
          </div>
          <span className="neo-badge neo-badge-orange" style={{ fontWeight: 800 }}>
            {pendingProposals.length} Pending
          </span>
        </div>

        {pendingProposals.length === 0 ? (
          <div className="neo-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <CheckCircle2 size={36} color="var(--accent-green)" style={{ margin: '0 auto 0.75rem' }} />
            <p style={{ fontWeight: 600 }}>All caught up! No pending collection proposals from collectors.</p>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              When a collector visits your hostel or scans your waste bin, their proposal will appear here for one-click approval.
            </span>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {pendingProposals.map(prop => (
              <div key={prop.id} className="neo-card" style={{ borderLeft: '4px solid var(--accent-orange)', padding: '1.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.95rem' }}>
                      {prop.id}
                    </span>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: '0.2rem' }}>
                      Collector: {prop.collectorName} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({prop.collectorId})</span>
                    </div>
                  </div>
                  <span className="neo-badge neo-badge-orange" style={{ fontSize: '0.7rem' }}>
                    Awaiting Your Approval
                  </span>
                </div>

                <div style={{ background: 'var(--bg-tertiary)', padding: '0.85rem', borderRadius: '10px', marginBottom: '1rem', fontSize: '0.8125rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Material Category:</span>
                    <strong>{prop.categoryName}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Proposed Weight:</span>
                    <strong>{prop.proposedWeightKg} kg</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Category Benchmark Rate:</span>
                    <strong>₹{prop.ratePerKg.toFixed(2)} / kg</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.4rem', marginTop: '0.4rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>Estimated Reward:</span>
                    <strong style={{ color: 'var(--accent-green)', fontSize: '1.05rem' }}>₹{prop.estimatedReward}</strong>
                  </div>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '1.15rem' }}>
                  <MapPin size={13} style={{ display: 'inline', marginRight: '4px' }} /> Location: {prop.location}
                </div>

                {/* ACCEPT / REJECT PROPOSAL ACTIONS (Requirement 2A) */}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => handleProposalResponse(prop.id, true)}
                    className="neo-btn neo-btn-primary"
                    style={{ flex: 1, padding: '0.7rem', fontSize: '0.85rem', justifyContent: 'center' }}
                  >
                    <CheckCircle2 size={16} /> Accept Proposal
                  </button>
                  <button
                    onClick={() => handleProposalResponse(prop.id, false)}
                    className="neo-btn"
                    style={{ padding: '0.7rem', fontSize: '0.85rem', color: 'var(--accent-red)' }}
                    title="Reject Proposal"
                  >
                    <XCircle size={16} /> Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: SUBMIT COLLECTION REQUEST / PROPOSAL (LEFT) + ACTIVE LIFECYCLE (RIGHT)
          ═══════════════════════════════════════════════════════════ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 1.4fr)', gap: '1.75rem', marginBottom: '2.5rem' }}>
        
        {/* Left Column: Submit New Collection Request */}
        <div className="neo-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <div className="neo-circle-btn" style={{ width: '38px', height: '38px', background: 'var(--neo-green)', color: '#0A0E17' }}>
              <Scale size={18} />
            </div>
            <div>
              <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                Request Doorstep Collection
              </h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Have recyclable waste ready? Submit a request to dispatch campus hauler Ramesh Kumar.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmitPickupRequest} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Waste Category <span style={{ color: 'var(--accent-red)' }}>*</span>
              </label>
              <select
                className="neo-input"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                style={{ width: '100%', fontSize: '0.875rem' }}
              >
                {rates.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.icon} {r.name} — ₹{r.ratePerKg.toFixed(2)}/kg
                  </option>
                ))}
              </select>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.3rem' }}>
                Configured Payout Rate: <strong>₹{activeCategoryObj.ratePerKg.toFixed(2)} / kg</strong>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Estimated Weight (kg) <span style={{ color: 'var(--accent-red)' }}>*</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                placeholder="e.g. 5.5"
                value={newEstWeight}
                onChange={(e) => setNewEstWeight(e.target.value)}
                className="neo-input"
                style={{ width: '100%', fontSize: '1.1rem', fontWeight: 800 }}
                required
              />
              {newEstWeight && (
                <div style={{ fontSize: '0.78rem', color: 'var(--accent-green)', marginTop: '0.3rem', fontWeight: 700 }}>
                  Estimated Earnings: ₹{(parseFloat(newEstWeight) * activeCategoryObj.ratePerKg).toFixed(2)}
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Pickup Location / Room <span style={{ color: 'var(--accent-red)' }}>*</span>
              </label>
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="neo-input"
                style={{ width: '100%', fontSize: '0.85rem' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Special Instructions (Optional)
              </label>
              <textarea
                placeholder="e.g. In blue bag outside Room 204, caps already removed"
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                className="neo-input"
                rows={2}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingRequest}
              className="neo-btn neo-btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', justifyContent: 'center' }}
            >
              <Send size={16} /> Submit Pickup Request
            </button>
          </form>
        </div>

        {/* Right Column: Active Lifecycle Tracking (10-Stage Pipeline) */}
        <div className="neo-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                Active Collection &amp; Recycling Pipeline
              </h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Track the physical movement of your waste from doorstep pickup to factory recycling and UPI payment.
              </p>
            </div>
            <button className="neo-circle-btn" onClick={refreshData} title="Refresh Live Status">
              <RefreshCw size={15} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', maxHeight: '520px' }}>
            {activePickups.length === 0 ? (
              <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                <Clock size={32} style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
                <p>No active collections currently in-transit.</p>
              </div>
            ) : (
              activePickups.map(item => {
                const stages = [
                  { key: 'PROPOSED', label: '1. Proposed' },
                  { key: 'VOLUNTEER_ACCEPTED', label: '2. Accepted' },
                  { key: 'COLLECTED', label: '3. Picked Up' },
                  { key: 'RECYCLER_ASSIGNED', label: '4. Routed' },
                  { key: 'DELIVERED', label: '5. Arrived' },
                  { key: 'DELIVERY_VERIFIED', label: '6. Recycler Signed' },
                  { key: 'PAID', label: '7. Paid' }
                ];

                const stageMap = {
                  'PROPOSED': 0,
                  'VOLUNTEER_ACCEPTED': 1,
                  'COLLECTED': 2,
                  'ADMIN_APPROVED': 3,
                  'RECYCLER_ASSIGNED': 3,
                  'DELIVERED': 4,
                  'DELIVERY_VERIFIED': 5,
                  'REWARD_APPROVED': 5,
                  'PAYMENT_PENDING': 5,
                  'PAID': 6
                };

                const currentStageIdx = stageMap[item.status] ?? 0;

                return (
                  <div key={item.id} className="neo-inset" style={{ padding: '1.2rem', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div>
                        <strong style={{ fontFamily: 'monospace', fontSize: '0.95rem' }}>{item.id}</strong>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                          {item.categoryName} • {item.actualWeightKg || item.proposedWeightKg} kg
                        </span>
                      </div>
                      <span className="neo-badge neo-badge-green" style={{ fontSize: '0.7rem' }}>
                        {item.status.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Visual Progress Steps */}
                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${stages.length}, 1fr)`, gap: '4px', margin: '0.75rem 0' }}>
                      {stages.map((st, i) => {
                        const isDone = i <= currentStageIdx;
                        const isCurrent = i === currentStageIdx;
                        return (
                          <div key={st.key} style={{ textAlign: 'center' }}>
                            <div
                              style={{
                                height: '6px',
                                borderRadius: '3px',
                                background: isDone ? 'var(--accent-green)' : 'var(--border-medium)',
                                boxShadow: isCurrent ? '0 0 8px var(--accent-green)' : 'none'
                              }}
                            />
                            <div style={{ fontSize: '0.62rem', color: isDone ? 'var(--text-primary)' : 'var(--text-muted)', marginTop: '4px', fontWeight: isDone ? 700 : 500 }}>
                              {st.label.split('. ')[1]}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Progress Detail */}
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.4 }}>
                      {item.assignedRecycler && (
                        <div style={{ color: 'var(--neo-blue)', fontWeight: 600 }}>
                          🏭 Processing Facility: {item.assignedRecycler.name} ({item.assignedRecycler.facility})
                        </div>
                      )}
                      <div>
                        Latest Audit Note: <em>{item.history?.[item.history.length - 1]?.note || 'Processing in progress'}</em>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: VERIFIED CONTRIBUTION HISTORY & PAYMENT PROOF (Requirement 2A)
          ═══════════════════════════════════════════════════════════ */}
      <div className="neo-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800 }}>
              Verified Contribution History &amp; UPI Escrow Ledger
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Complete auditable ledger of all recycling contributions finalized and credited.
            </p>
          </div>
          <span className="neo-badge neo-badge-green">
            {completedCollections.length} Completed Batches
          </span>
        </div>

        {completedCollections.length === 0 ? (
          <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <FileText size={36} style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
            <p>No completed payment records yet. Completed collections will generate instant UPI payment receipts here.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="neo-table" style={{ width: '100%', fontSize: '0.85rem' }}>
              <thead>
                <tr>
                  <th>Collection ID</th>
                  <th>Category</th>
                  <th>Verified Mass</th>
                  <th>Rate Applied</th>
                  <th>Amount Credited</th>
                  <th>Recycling Facility</th>
                  <th>Payment Ref (UTR)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {completedCollections.map(item => (
                  <tr key={item.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>{item.id}</td>
                    <td>{item.categoryName}</td>
                    <td><strong>{item.actualWeightKg} kg</strong></td>
                    <td>₹{item.ratePerKg.toFixed(2)}/kg</td>
                    <td style={{ color: 'var(--accent-green)', fontWeight: 800, fontSize: '0.95rem' }}>
                      ₹{item.payment?.amount?.toFixed(2)}
                    </td>
                    <td>{item.assignedRecycler?.name || 'Authorized MRF'}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {item.payment?.utr || 'PROCESSED'}
                    </td>
                    <td>
                      <span className="neo-badge neo-badge-green" style={{ fontSize: '0.68rem' }}>
                        PAID &amp; VERIFIED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
