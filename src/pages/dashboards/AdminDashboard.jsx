import { useState, useEffect } from 'react';
import {
  Users, Recycle, TrendingUp, IndianRupee, ArrowUpRight, ArrowDownRight,
  ArrowRight, MapPin, Clock, CheckCircle2, AlertTriangle, Package, Truck, Shield,
  Award, Building2, Sliders, Mail, FileText, Check, X, Search, RefreshCw,
  Plus, Edit2, ExternalLink
} from 'lucide-react';
import toast from 'react-hot-toast';
import { platformStore } from '../../services/platformStore';

export default function AdminDashboard() {
  const [stats, setStats] = useState(platformStore.getPlatformStats());
  const [collections, setCollections] = useState(platformStore.getCollections());
  const [rates, setRates] = useState(platformStore.getRewardRates());
  const [recyclers, setRecyclers] = useState(platformStore.getRecyclers());
  const [emailLogs, setEmailLogs] = useState(platformStore.getEmailLogs());
  const [auditLogs, setAuditLogs] = useState(platformStore.getAuditLogs());

  // Active Navigation Tab inside Admin Console
  const [activeTab, setActiveTab] = useState('approvals'); // approvals, recyclers, rates, payments, emails, audit, users

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Rate Editing State
  const [editingRateId, setEditingRateId] = useState(null);
  const [tempRateValue, setTempRateValue] = useState('');

  // Recycler Assignment Modal State
  const [assignModalItem, setAssignModalItem] = useState(null);
  const [selectedRecyclerId, setSelectedRecyclerId] = useState('');
  const [assignInstructions, setAssignInstructions] = useState('');

  // Rejection Reason Prompt State
  const [rejectModalItem, setRejectModalItem] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const refreshData = () => {
    setStats(platformStore.getPlatformStats());
    setCollections(platformStore.getCollections());
    setRates(platformStore.getRewardRates());
    setRecyclers(platformStore.getRecyclers());
    setEmailLogs(platformStore.getEmailLogs());
    setAuditLogs(platformStore.getAuditLogs());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Step 5: Admin Approves Contribution
  const handleApproveContribution = (collectionId) => {
    try {
      const item = platformStore.adminReviewCollection(collectionId, true, '', 'Priya Sharma (Admin)');
      toast.success(`Lot #${item.id} approved! Final reward of ₹${item.finalReward} authorized.`);
      refreshData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Step 5b: Admin Rejects Contribution
  const handleRejectContribution = (e) => {
    e.preventDefault();
    if (!rejectModalItem) return;
    try {
      platformStore.adminReviewCollection(rejectModalItem.id, false, rejectionReason || 'Quality non-compliance', 'Priya Sharma (Admin)');
      toast.error(`Lot #${rejectModalItem.id} flagged and rejected.`);
      setRejectModalItem(null);
      setRejectionReason('');
      refreshData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Step 7: Admin Assigns Recycler
  const handleAssignRecyclerSubmit = (e) => {
    e.preventDefault();
    if (!assignModalItem || !selectedRecyclerId) {
      toast.error('Please select a recycling facility.');
      return;
    }
    try {
      const item = platformStore.assignRecycler(assignModalItem.id, selectedRecyclerId, assignInstructions, 'Priya Sharma (Admin)');
      toast.success(`Lot #${item.id} routed to ${item.assignedRecycler.name}! Delivery order dispatched to hauler.`);
      setAssignModalItem(null);
      setSelectedRecyclerId('');
      setAssignInstructions('');
      refreshData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Step 8b: Admin Confirms Recycler Delivery
  const handleVerifyDelivery = (collectionId) => {
    try {
      platformStore.confirmDeliveryVerification(collectionId, 'Priya Sharma (Admin)');
      toast.success(`Weighbridge delivery verified for Lot #${collectionId}. Ready for reward disbursement.`);
      refreshData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Step 10: Admin Finalizes Instant UPI Payment Disbursement
  const handleDisbursePayment = (collectionId) => {
    try {
      const utr = `UPI/2026/${Math.floor(100000000 + Math.random() * 900000000)}`;
      const item = platformStore.authorizeAndDisbursePayment(collectionId, { transactionUtr: utr }, 'Priya Sharma (Admin)');
      toast.success(`Disbursed ₹${item.payment.amount} via instant UPI payout (UTR: ${utr})! Volunteer notified.`);
      refreshData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Rate Configuration Update
  const handleSaveRate = (categoryId) => {
    const val = parseFloat(tempRateValue);
    if (isNaN(val) || val <= 0) {
      toast.error('Please enter a valid positive rate.');
      return;
    }
    try {
      platformStore.updateRewardRate(categoryId, val, 'Priya Sharma (Admin)');
      toast.success(`Updated benchmark rate to ₹${val.toFixed(2)}/kg`);
      setEditingRateId(null);
      setTempRateValue('');
      refreshData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Filtered collections
  const safeCollections = Array.isArray(collections) ? collections : [];
  const pendingApprovals = safeCollections.filter(c => c && c.status === 'COLLECTED');
  const readyForRecycler = safeCollections.filter(c => c && c.status === 'ADMIN_APPROVED');
  const pendingDeliveries = safeCollections.filter(c => c && c.status === 'DELIVERED');
  const verifiedForPayment = safeCollections.filter(c => c && c.status === 'DELIVERY_VERIFIED');

  return (
    <div className="container-max" style={{ paddingBottom: '3rem' }}>
      
      {/* Admin Header */}
      <div className="neo-card-lg" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="neo-badge neo-badge-green">
                <Shield size={14} /> Master Administrator
              </span>
              <span className="neo-badge neo-badge-blue">
                Platform Governance &amp; CPCB Compliance
              </span>
            </div>
            <h1 className="font-display" style={{ fontSize: '1.85rem', fontWeight: 800 }}>
              Campus Waste Administration Console
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Verify garbage collection records, configure transparent category reward rates, manage industrial recycler contracts, and authorize instant UPI payouts.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="neo-btn neo-btn-primary" onClick={refreshData}>
              <RefreshCw size={16} /> Sync Live Registry
            </button>
          </div>
        </div>

        {/* Global KPI Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--accent-green)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Registered Volunteers</div>
            <div className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-green)', marginTop: '0.2rem' }}>
              {stats.totalVolunteers} <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Active</span>
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Unique Volunteer IDs issued</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-blue)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Registered Collectors</div>
            <div className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--neo-blue)', marginTop: '0.2rem' }}>
              {stats.totalCollectors} <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Haulers</span>
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Covering all campus wards</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--accent-orange)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Email Verification Rate</div>
            <div className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-orange)', marginTop: '0.2rem' }}>
              {stats.verificationRate}%
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{stats.verifiedUsersCount} / {stats.totalUsers} verified</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-purple)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Total Mass Diverted</div>
            <div className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--neo-purple)', marginTop: '0.2rem' }}>
              {stats.totalWeightCollectedKg} <span style={{ fontSize: '0.8rem' }}>kg</span>
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>From campus dumpsters</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid #2ECC71' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Disbursed UPI Payouts</div>
            <div className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2ECC71', marginTop: '0.2rem' }}>
              ₹{(stats?.totalPaymentsDisbursed || 0).toFixed(2)}
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Zero transaction fees</span>
          </div>
        </div>
      </div>

      {/* Recycler Handover Confirmed Alert Banner */}
      {verifiedForPayment.length > 0 && (
        <div style={{ padding: '1rem 1.25rem', borderRadius: '14px', background: 'var(--accent-green-subtle)', border: '1px solid var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-green)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IndianRupee size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {verifiedForPayment.length} Recycler-Confirmed Handover(s) Awaiting Payment Approval
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                Recyclable companies have certified intake and verified all garbage was securely delivered. Authorize instant UPI payouts.
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('payments')}
            className="neo-btn neo-btn-primary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.825rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            Review &amp; Approve Payments <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Admin Tab Navigation Bar */}
      <div className="neo-card-sm" style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', marginBottom: '1.5rem', padding: '0.75rem' }}>
        {[
          { id: 'approvals', label: `Pending Approvals (${pendingApprovals.length})`, icon: Shield },
          { id: 'recyclers', label: `Recycler Routing (${readyForRecycler.length})`, icon: Building2 },
          { id: 'payments', label: `Payments & Recycler Verified (${verifiedForPayment.length + pendingDeliveries.length})`, icon: IndianRupee },
          { id: 'rates', label: 'Reward Rate Matrix', icon: Sliders },
          { id: 'emails', label: `Email Notification Logs (${emailLogs.length})`, icon: Mail },
          { id: 'audit', label: `Cryptographic Audit Trail (${auditLogs.length})`, icon: FileText }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`neo-btn ${activeTab === t.id ? 'active' : ''}`}
            style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════
          TAB 1: PENDING CONTRIBUTION APPROVALS QUEUE (Step 5 & 6)
          ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'approvals' && (
        <div className="neo-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h2 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                Pending Contribution Approvals Queue
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Review measured tare weights and photos submitted by collectors. Approving authorizes the transparent reward calculation (Weight × Rate).
              </p>
            </div>
            <span className="neo-badge neo-badge-orange">{pendingApprovals.length} Collections Ready for Verification</span>
          </div>

          {pendingApprovals.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              <CheckCircle2 size={36} color="var(--accent-green)" style={{ margin: '0 auto 0.75rem' }} />
              <p>Queue is clear! No collections currently pending administrator review.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pendingApprovals.map(item => (
                <div key={item.id} className="neo-inset" style={{ padding: '1.25rem', borderRadius: '12px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '280px' }}>
                    {item.wastePhoto && (
                      <img src={item.wastePhoto} alt="Waste Batch" style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover' }} />
                    )}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.95rem' }}>{item.id}</span>
                        <span className="neo-badge neo-badge-blue" style={{ fontSize: '0.7rem' }}>{item.categoryName}</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: '0.2rem' }}>
                        Volunteer: {item.volunteerName} <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-muted)' }}>({item.volunteerId})</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        Collector: {item.collectorName} • Location: {item.location}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', padding: '0 1rem' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Measured Tare</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800 }}>
                      {item.actualWeightKg || 0} kg
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--accent-green)', fontWeight: 700 }}>
                      Rate: ₹{(item.ratePerKg || 0).toFixed(2)}/kg $\rightarrow$ ₹{((item.actualWeightKg || 0) * (item.ratePerKg || 0)).toFixed(2)}
                    </div>

                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleApproveContribution(item.id)}
                      className="neo-btn neo-btn-primary"
                      style={{ padding: '0.6rem 1.1rem', fontSize: '0.85rem' }}
                    >
                      <Check size={16} /> Approve &amp; Calculate Reward
                    </button>
                    <button
                      onClick={() => setRejectModalItem(item)}
                      className="neo-btn"
                      style={{ padding: '0.6rem 0.9rem', fontSize: '0.85rem', color: 'var(--accent-red)' }}
                    >
                      <X size={16} /> Flag / Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          TAB 2: RECYCLER ASSIGNMENT & DISPATCH (Step 7)
          ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'recyclers' && (
        <div className="neo-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h2 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                Recycling Company Assignment &amp; Routing
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Direct approved material streams to certified recycling plants (Reliance, Supreme, Attero, Dalmia, Campus Composter).
              </p>
            </div>
            <span className="neo-badge neo-badge-blue">{readyForRecycler.length} Lots Awaiting Dispatch</span>
          </div>

          {readyForRecycler.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              <Building2 size={36} color="var(--neo-blue)" style={{ margin: '0 auto 0.75rem' }} />
              <p>No lots currently awaiting recycler assignment.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {readyForRecycler.map(item => (
                <div key={item.id} className="neo-inset" style={{ padding: '1.25rem', borderRadius: '12px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.95rem' }}>{item.id}</span>
                      <span className="neo-badge neo-badge-green" style={{ fontSize: '0.7rem' }}>ADMIN APPROVED</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '0.2rem' }}>
                      {item.categoryName} — {item.actualWeightKg} kg (Calculated Reward: ₹{item.finalReward})
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Donor: {item.volunteerName} ({item.volunteerId}) • Current Location: {item.location}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setAssignModalItem(item);
                      // Pre-select matching recycler if category matches
                      const match = recyclers.find(r => r.categories.includes(item.category));
                      if (match) setSelectedRecyclerId(match.id);
                    }}
                    className="neo-btn neo-btn-primary"
                    style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                  >
                    <Building2 size={16} /> Assign Certified Recycler &amp; Dispatch Order
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          TAB 3: DELIVERY VERIFICATION & REWARD PAYOUT (Step 8, 9, 10)
          ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'payments' && (
        <div className="neo-card">
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800 }}>
              Delivery Proof Verification &amp; Instant UPI Payout Authorization
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Verify collector plant delivery slips and disburse authorized rewards to volunteers via instant IMPS / UPI auto-credit.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Subsection A: Delivered lots needing verification */}
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--neo-blue)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={16} /> 1. Recycler Intake Slips Awaiting Admin Verification ({pendingDeliveries.length})
              </h3>

              {pendingDeliveries.length === 0 ? (
                <div className="neo-inset" style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  No pending weighbridge receipts to verify.
                </div>
              ) : (
                pendingDeliveries.map(item => (
                  <div key={item.id} className="neo-inset" style={{ padding: '1rem', borderRadius: '10px', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{item.id} — Delivered to {item.assignedRecycler?.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        Slip: <strong>{item.deliveryProof?.receiptNo}</strong> • Confirmed Intake: <strong>{item.deliveryProof?.weighbridgeGrossKg} kg</strong>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Notes: {item.deliveryProof?.notes}</div>
                    </div>
                    <button
                      onClick={() => handleVerifyDelivery(item.id)}
                      className="neo-btn neo-btn-primary"
                      style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                    >
                      <CheckCircle2 size={15} /> Confirm Weighbridge Proof
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Subsection B: Verified lots ready for UPI payout */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-green)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <IndianRupee size={16} /> 2. Rewards Ready for Disbursement ({verifiedForPayment.length})
              </h3>

              {verifiedForPayment.length === 0 ? (
                <div className="neo-inset" style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  No approved rewards currently queued for payment.
                </div>
              ) : (
                verifiedForPayment.map(item => (
                  <div key={item.id} className="neo-inset" style={{ padding: '1.25rem', borderRadius: '12px', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderLeft: '5px solid var(--accent-green)' }}>
                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.95rem' }}>{item.id}</span>
                        <span className="neo-badge neo-badge-blue">{item.categoryName}</span>
                        <span className="neo-badge neo-badge-green">RECYCLER CONFIRMED SECURE INTAKE</span>
                      </div>
                      
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, marginTop: '0.35rem' }}>
                        Payee: {item.volunteerName} <span style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>({item.volunteerId})</span>
                      </div>

                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                        Recycling Plant: <strong>{item.recyclerIntake?.recyclerName || item.assignedRecycler?.name}</strong> • Collector: <strong>{item.collectorName}</strong>
                      </div>

                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        Intake Gate Slip: <strong>{item.recyclerIntake?.intakeSlipNo || item.deliveryProof?.receiptNo}</strong> • Verified Net: <strong>{item.actualWeightKg} kg</strong> ({item.recyclerIntake?.purityPercentage || 98.0}% optical purity)
                      </div>

                      {item.recyclerIntake?.notes && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontStyle: 'italic', marginTop: '0.25rem' }}>
                          Recycler Signoff: "{item.recyclerIntake.notes}"
                        </div>
                      )}

                      {item.recyclerIntake?.handoverHash && (
                        <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'var(--neo-blue)', marginTop: '0.25rem' }}>
                          Proof Seal: {item.recyclerIntake.handoverHash}
                        </div>
                      )}
                    </div>

                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Authorized Payment Amount</div>
                        <div className="font-display" style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--accent-green)' }}>
                          ₹{(item.finalReward || ((item.actualWeightKg || 0) * (item.ratePerKg || 0)) || 0).toFixed(2)}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          Rate: ₹{(item.ratePerKg || 0).toFixed(2)}/kg × {item.actualWeightKg || 0} kg
                        </div>

                      </div>

                      <button
                        onClick={() => handleDisbursePayment(item.id)}
                        className="neo-btn neo-btn-primary"
                        style={{ fontSize: '0.875rem', padding: '0.7rem 1.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 14px var(--accent-green-glow)' }}
                      >
                        <IndianRupee size={17} /> Approve Payment Amount &amp; Disburse via UPI
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          TAB 4: CONFIGURABLE REWARD RATE MATRIX (Requirement 6)
          ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'rates' && (
        <div className="neo-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h2 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                Transparent Waste Category Reward Matrix
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Admin-controlled benchmark prices per kilogram. Modifying rates here immediately updates collection proposals, transparent calculations, and escrow disbursements platform-wide.
              </p>
            </div>
            <span className="neo-badge neo-badge-green">Formula: Reward = Approved Weight × Configured Rate</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="neo-table" style={{ width: '100%', fontSize: '0.85rem' }}>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Current Benchmark Rate</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rates.map(r => (
                  <tr key={r.id}>
                    <td style={{ fontWeight: 700 }}>
                      <span style={{ fontSize: '1.1rem', marginRight: '6px' }}>{r.icon}</span>
                      {r.name}
                    </td>
                    <td style={{ color: 'var(--text-secondary)', maxWidth: '300px' }}>{r.description}</td>
                    <td>
                      {editingRateId === r.id ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ fontWeight: 700 }}>₹</span>
                          <input
                            type="number"
                            step="0.5"
                            value={tempRateValue}
                            onChange={(e) => setTempRateValue(e.target.value)}
                            className="neo-input"
                            style={{ width: '80px', padding: '4px 8px', fontSize: '0.9rem', fontWeight: 800 }}
                            autoFocus
                          />
                          <span style={{ fontSize: '0.75rem' }}>/ kg</span>
                        </div>
                      ) : (
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-green)' }}>
                          ₹{(r.ratePerKg || 0).toFixed(2)} <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>/ kg</span>
                        </span>

                      )}
                    </td>
                    <td>
                      {editingRateId === r.id ? (
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button
                            onClick={() => handleSaveRate(r.id)}
                            className="neo-btn neo-btn-primary"
                            style={{ fontSize: '0.75rem', padding: '3px 8px' }}
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingRateId(null)}
                            className="neo-btn"
                            style={{ fontSize: '0.75rem', padding: '3px 8px' }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingRateId(r.id);
                            setTempRateValue(r.ratePerKg.toString());
                          }}
                          className="neo-btn"
                          style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                        >
                          <Edit2 size={13} /> Edit Rate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          TAB 5: AUTOMATED EMAIL NOTIFICATION LOGS (Requirement 4 & 6)
          ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'emails' && (
        <div className="neo-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h2 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                Automated Transactional Email Dispatch Logs
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                System-wide audit of all transactional emails sent across the 15 automated lifecycle triggers.
              </p>
            </div>
            <span className="neo-badge neo-badge-blue">Provider: SMTP / Resend Webhook Sync</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="neo-table" style={{ width: '100%', fontSize: '0.8125rem' }}>
              <thead>
                <tr>
                  <th>Log ID</th>
                  <th>Recipient</th>
                  <th>Volunteer ID</th>
                  <th>Event Trigger</th>
                  <th>Subject Line &amp; Body Preview</th>
                  <th>Delivery Status</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {emailLogs.map(log => (
                  <tr key={log.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>{log.id}</td>
                    <td>
                      <div><strong>{log.recipientName}</strong></div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{log.to}</div>
                    </td>
                    <td style={{ fontFamily: 'monospace' }}>{log.volunteerId || '—'}</td>
                    <td>
                      <span className="neo-badge" style={{ fontSize: '0.68rem' }}>{log.event}</span>
                    </td>
                    <td style={{ maxWidth: '340px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{log.subject}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>{log.preview}</div>
                    </td>
                    <td>
                      <span className="neo-badge neo-badge-green" style={{ fontSize: '0.68rem' }}>
                        {log.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      {new Date(log.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          TAB 6: CRYPTOGRAPHIC AUDIT TRAIL (Requirement 6 & 8)
          ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'audit' && (
        <div className="neo-card">
          <div style={{ marginBottom: '1.25rem' }}>
            <h2 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800 }}>
              Immutable Cryptographic Platform Audit Trail
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Complete audit log of all state modifications, rate changes, reviewer approvals, delivery slips, and payout disbursements.
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="neo-table" style={{ width: '100%', fontSize: '0.8125rem' }}>
              <thead>
                <tr>
                  <th>Audit ID</th>
                  <th>Timestamp</th>
                  <th>Actor</th>
                  <th>Action</th>
                  <th>Target Record</th>
                  <th>Audit Notes</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map(a => (
                  <tr key={a.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>{a.id}</td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {new Date(a.timestamp).toLocaleString()}
                    </td>
                    <td style={{ fontWeight: 700 }}>{a.actor}</td>
                    <td>
                      <span className="neo-badge neo-badge-blue" style={{ fontSize: '0.68rem' }}>{a.action}</span>
                    </td>
                    <td style={{ fontFamily: 'monospace' }}>{a.target}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{a.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: Assign Recycler Company */}
      {assignModalItem && (
        <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="neo-card" style={{ maxWidth: '540px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                Assign Recycling Plant for Lot #{assignModalItem.id}
              </h3>
              <button onClick={() => setAssignModalItem(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Category: <strong>{assignModalItem.categoryName}</strong> ({assignModalItem.actualWeightKg} kg)
            </p>

            <form onSubmit={handleAssignRecyclerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Select Certified Recycler Partner <span style={{ color: 'var(--accent-red)' }}>*</span>
                </label>
                <select
                  value={selectedRecyclerId}
                  onChange={(e) => setSelectedRecyclerId(e.target.value)}
                  className="neo-input"
                  style={{ width: '100%' }}
                  required
                >
                  <option value="">-- Choose Recycler --</option>
                  {recyclers.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.name} — {r.facility} ({r.cpcbReg})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Delivery Instructions for Collector
                </label>
                <textarea
                  placeholder="e.g. Deliver to Gate 4 intake hopper. Tare slip must record moisture <3%."
                  value={assignInstructions}
                  onChange={(e) => setAssignInstructions(e.target.value)}
                  className="neo-input"
                  rows={3}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" className="neo-btn neo-btn-primary" style={{ flex: 1, padding: '0.75rem' }}>
                  Confirm Recycler Routing &amp; Alert Collector
                </button>
                <button type="button" onClick={() => setAssignModalItem(null)} className="neo-btn" style={{ padding: '0.75rem' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Rejection Prompt */}
      {rejectModalItem && (
        <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="neo-card" style={{ maxWidth: '480px', width: '100%' }}>
            <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-red)', marginBottom: '0.75rem' }}>
              Flag / Reject Collection #{rejectModalItem.id}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              State the reason for rejecting or flagging this lot. The volunteer and collector will be notified.
            </p>

            <form onSubmit={handleRejectContribution} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <textarea
                placeholder="e.g. Moisture content exceeds allowable threshold; contaminated with unrinsed food residues."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="neo-input"
                rows={3}
                required
              />

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="submit" className="neo-btn" style={{ flex: 1, padding: '0.75rem', background: 'var(--accent-red)', color: '#fff' }}>
                  Confirm Rejection
                </button>
                <button type="button" onClick={() => setRejectModalItem(null)} className="neo-btn" style={{ padding: '0.75rem' }}>
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
