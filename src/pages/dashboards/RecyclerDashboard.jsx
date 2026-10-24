import { useState, useEffect } from 'react';
import {
  Factory, CheckCircle2, Building2, Truck, Scale, Shield,
  FileText, Clock, AlertTriangle, ArrowRight, Check, Search,
  RefreshCw, Eye, Sparkles, Award, MapPin, QrCode, ExternalLink
} from 'lucide-react';
import toast from 'react-hot-toast';
import { platformStore } from '../../services/platformStore';
import { useAuth } from '../../App';

export default function RecyclerDashboard() {
  const { user } = useAuth();
  const [recyclers] = useState(platformStore.getRecyclers());
  const [selectedRecyclerId, setSelectedRecyclerId] = useState(
    user?.recyclerId || recyclers[0]?.id || 'REC-001'
  );
  
  const [collections, setCollections] = useState(platformStore.getCollections());
  const [stats, setStats] = useState(platformStore.getPlatformStats());

  // Intake confirmation modal / form state
  const [activeLotForIntake, setActiveLotForIntake] = useState(null);
  const [verifiedWeight, setVerifiedWeight] = useState('');
  const [purityPercent, setPurityPercent] = useState('98.0');
  const [intakeSlipNo, setIntakeSlipNo] = useState('');
  const [inspectorNotes, setInspectorNotes] = useState('Passed optical purity & contamination inspection. All garbage received securely in full.');

  const DEFAULT_RECYCLER = {
    id: 'REC-001',
    name: 'Reliance Industries Circular (R-Elan)',
    facility: 'Dahej Polyester Fiber Complex, Gujarat',
    cpcbReg: 'CPCB/EPR/2026/PL-08491',
    categories: ['plastic_pet'],
    rateMultiplier: 1.15,
    contact: 'procurement@reliancerecycle.com',
    status: 'ACTIVE'
  };

  const activeRecycler = (recyclers && recyclers.find(r => r.id === selectedRecyclerId)) || (recyclers && recyclers[0]) || DEFAULT_RECYCLER;

  const refreshData = () => {
    setCollections(platformStore.getCollections());
    setStats(platformStore.getPlatformStats());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Filter lots delivered to this facility or delivered campus-wide
  const incomingShipments = collections.filter(c => 
    c.status === 'DELIVERED' && (!c.assignedRecycler || c.assignedRecycler.id === selectedRecyclerId)
  );

  const verifiedShipments = collections.filter(c => 
    (c.status === 'DELIVERY_VERIFIED' || c.status === 'PAID') && 
    (!c.assignedRecycler || c.assignedRecycler.id === selectedRecyclerId)
  );

  const handleOpenIntakeModal = (lot) => {
    setActiveLotForIntake(lot);
    setVerifiedWeight(lot.deliveryProof?.weighbridgeGrossKg || lot.actualWeightKg || lot.proposedWeightKg || '');
    setIntakeSlipNo(`IN-${activeRecycler.id.slice(0, 3)}-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    setPurityPercent('98.0');
    setInspectorNotes('Passed optical purity inspection. All garbage delivered securely without contamination.');
  };

  const handleConfirmIntake = (e) => {
    e.preventDefault();
    if (!activeLotForIntake) return;

    const netWeight = parseFloat(verifiedWeight);
    if (isNaN(netWeight) || netWeight <= 0) {
      toast.error('Please enter a valid net weight in kg.');
      return;
    }

    try {
      platformStore.recyclerConfirmIntake(activeLotForIntake.id, {
        recyclerName: activeRecycler.name,
        verifiedNetWeightKg: netWeight,
        purityPercentage: parseFloat(purityPercent) || 98.0,
        intakeSlipNo: intakeSlipNo.trim(),
        inspectorName: `${activeRecycler.name} Intake Officer`,
        notes: inspectorNotes.trim()
      });

      toast.success(`Lot #${activeLotForIntake.id} securely confirmed! Admin notified to approve ₹${(netWeight * activeLotForIntake.ratePerKg).toFixed(2)} payment.`);
      setActiveLotForIntake(null);
      refreshData();
    } catch (err) {
      toast.error(err.message || 'Error confirming intake handover.');
    }
  };

  return (
    <div className="container-max" style={{ paddingBottom: '3.5rem' }}>
      
      {/* Recycler Facility Header */}
      <div className="neo-card-lg" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="neo-badge neo-badge-green">
                <Factory size={14} /> Certified Recycling Partner
              </span>
              <span className="neo-badge neo-badge-blue">
                {activeRecycler.cpcbReg}
              </span>
              <span className="neo-badge neo-badge-orange">
                Intake Gate Open
              </span>
            </div>
            <h1 className="font-display" style={{ fontSize: '1.85rem', fontWeight: 800 }}>
              {activeRecycler.name}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
              {activeRecycler.facility}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Switch Plant:</span>
              <select
                value={selectedRecyclerId}
                onChange={(e) => setSelectedRecyclerId(e.target.value)}
                style={{
                  padding: '0.5rem 0.85rem',
                  borderRadius: '10px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                {recyclers.map(r => (
                  <option key={r.id} value={r.id}>{r.name} ({r.id})</option>
                ))}
              </select>
            </div>

            <button className="neo-btn neo-btn-primary" onClick={refreshData}>
              <RefreshCw size={15} /> Refresh Deliveries
            </button>
          </div>
        </div>

        {/* Real-time Logistics Pipeline Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--accent-orange)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Awaiting Intake Confirmation</div>
            <div className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-orange)', marginTop: '0.2rem' }}>
              {incomingShipments.length} <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Trucks Arrived</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Collector delivered • Signoff pending
            </div>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--accent-green)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Confirmed Handover Lots</div>
            <div className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-green)', marginTop: '0.2rem' }}>
              {verifiedShipments.length} <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Verified</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Handover signed • Updated to Admin
            </div>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-blue)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>CPCB EPR Purity Target</div>
            <div className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--neo-blue)', marginTop: '0.2rem' }}>
              &gt; 95.0% <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Grade A</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Intake optical spectrometer threshold
            </div>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--accent-purple)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Accepted Streams</div>
            <div className="font-display" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              {activeRecycler.categories.join(', ').toUpperCase()}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              15% premium contract rate applied
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: INCOMING SHIPMENTS FROM COLLECTORS (ACTION REQUIRED) */}
      <div className="neo-card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={20} color="var(--accent-orange)" />
              <h2 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                Incoming Shipments from Collectors (Awaiting Recycler Signoff)
              </h2>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Confirm that the collector has securely handed over all collected garbage. Once confirmed, Admin is instantly notified to approve payment.
            </p>
          </div>
          <span className="neo-badge neo-badge-orange">{incomingShipments.length} Deliveries at Gate</span>
        </div>

        {incomingShipments.length === 0 ? (
          <div className="neo-inset" style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <CheckCircle2 size={40} color="var(--accent-green)" style={{ margin: '0 auto 0.75rem' }} />
            <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              All Arrived Shipments Inspected &amp; Confirmed!
            </h4>
            <p style={{ fontSize: '0.85rem', maxWidth: '500px', margin: '0 auto' }}>
              No collectors currently waiting at the intake gate. When a collector arrives and submits their delivery slip, it will appear here for verification.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {incomingShipments.map(item => (
              <div
                key={item.id}
                className="neo-inset"
                style={{
                  padding: '1.5rem',
                  borderRadius: '14px',
                  borderLeft: '4px solid var(--accent-orange)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                  
                  {/* Left: Material & Collector Details */}
                  <div style={{ display: 'flex', gap: '1.25rem', flex: 1, minWidth: '280px' }}>
                    {item.wastePhoto && (
                      <img
                        src={item.wastePhoto}
                        alt="Collector Waste"
                        style={{ width: '90px', height: '90px', borderRadius: '10px', objectFit: 'cover', border: '1px solid var(--border-medium)' }}
                      />
                    )}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>{item.id}</span>
                        <span className="neo-badge neo-badge-blue">{item.categoryName}</span>
                        <span className="neo-badge neo-badge-orange">COLLECTOR AT INTAKE</span>
                      </div>

                      <div style={{ fontSize: '0.875rem', fontWeight: 700, marginTop: '0.4rem' }}>
                        Collector: <span style={{ color: 'var(--neo-blue)' }}>{item.collectorName}</span> (Vehicle: UK-08-EV-4421)
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                        Volunteer Donor: <strong>{item.volunteerName}</strong> ({item.volunteerId})
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        Weighbridge Slip: <strong>{item.deliveryProof?.receiptNo || 'RCP-PENDING'}</strong> • Arrived: {item.deliveryProof?.deliveryDate ? new Date(item.deliveryProof.deliveryDate).toLocaleTimeString() : 'Just now'}
                      </div>
                      {item.deliveryProof?.notes && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--accent-orange)', marginTop: '0.25rem', fontStyle: 'italic' }}>
                          Collector Note: "{item.deliveryProof.notes}"
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Middle: Measured Weight Metrics */}
                  <div style={{ background: 'var(--bg-card)', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border-subtle)', textAlign: 'center', minWidth: '160px' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Collector Gross Mass</div>
                    <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {item.deliveryProof?.weighbridgeGrossKg || item.actualWeightKg} kg
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 700, marginTop: '0.2rem' }}>
                      Reward Rate: ₹{item.ratePerKg.toFixed(2)}/kg
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Est. Total: ₹{((item.deliveryProof?.weighbridgeGrossKg || item.actualWeightKg) * item.ratePerKg).toFixed(2)}
                    </div>
                  </div>

                  {/* Right: Confirm Secure Handover CTA */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignSelf: 'center' }}>
                    <button
                      onClick={() => handleOpenIntakeModal(item)}
                      className="neo-btn neo-btn-primary"
                      style={{ padding: '0.75rem 1.4rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 14px var(--accent-green-glow)' }}
                    >
                      <CheckCircle2 size={18} /> Confirm Secure Handover &amp; Sign
                    </button>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                      Updates status to Admin for UPI release
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: VERIFIED HANDOVERS & DISPATCH LEDGER */}
      <div className="neo-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={20} color="var(--accent-green)" />
              <h2 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                Verified Deliveries &amp; Chain-of-Custody Signoffs ({verifiedShipments.length})
              </h2>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Shipments where the recyclable company has verified collector handover and updated Admin.
            </p>
          </div>
          <span className="neo-badge neo-badge-green">CPCB EPR Compliant</span>
        </div>

        {verifiedShipments.length === 0 ? (
          <div className="neo-inset" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            No verified shipments recorded yet.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {verifiedShipments.map(item => (
              <div
                key={item.id}
                className="neo-inset"
                style={{
                  padding: '1.25rem',
                  borderRadius: '12px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  borderLeft: item.status === 'PAID' ? '4px solid var(--accent-green)' : '4px solid var(--neo-blue)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.95rem' }}>{item.id}</span>
                    <span className="neo-badge neo-badge-blue">{item.categoryName}</span>
                    {item.status === 'PAID' ? (
                      <span className="neo-badge neo-badge-green">ADMIN APPROVED &amp; PAID (UTR: {item.payment?.utr || 'UPI/VERIFIED'})</span>
                    ) : (
                      <span className="neo-badge neo-badge-orange">AWAITING ADMIN PAYMENT APPROVAL</span>
                    )}
                  </div>

                  <div style={{ fontSize: '0.875rem', fontWeight: 700, marginTop: '0.3rem' }}>
                    Verified Net Mass: <span style={{ color: 'var(--accent-green)' }}>{item.actualWeightKg} kg</span> • Purity: {item.recyclerIntake?.purityPercentage || '98.0'}%
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    Intake Slip: <strong>{item.recyclerIntake?.intakeSlipNo || item.deliveryProof?.receiptNo}</strong> • Inspector: {item.recyclerIntake?.inspectorName || 'Intake Officer'}
                  </div>

                  {item.recyclerIntake?.handoverHash && (
                    <div style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: 'var(--neo-blue)', marginTop: '0.25rem' }}>
                      Cryptographic Handover Hash: {item.recyclerIntake.handoverHash}
                    </div>
                  )}
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Volunteer Reward Amount</div>
                  <div className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-green)' }}>
                    ₹{item.finalReward?.toFixed(2) || (item.actualWeightKg * item.ratePerKg).toFixed(2)}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    Payee: {item.volunteerName} ({item.volunteerId})
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL: RECYCLER CONFIRM SECURE INTAKE */}
      {activeLotForIntake && (
        <div className="neo-modal-backdrop" onClick={() => setActiveLotForIntake(null)}>
          <div className="neo-modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Factory size={22} color="var(--accent-green)" />
                <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                  Confirm Secure Collector Handover
                </h3>
              </div>
              <button className="neo-btn" style={{ padding: '0.35rem 0.65rem' }} onClick={() => setActiveLotForIntake(null)}>
                ✕
              </button>
            </div>

            <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '10px', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
              <div><strong>Lot ID:</strong> {activeLotForIntake.id} ({activeLotForIntake.categoryName})</div>
              <div><strong>Delivered by Collector:</strong> {activeLotForIntake.collectorName}</div>
              <div><strong>Volunteer Donor:</strong> {activeLotForIntake.volunteerName} ({activeLotForIntake.volunteerId})</div>
              <div><strong>Collector Reported Weight:</strong> {activeLotForIntake.deliveryProof?.weighbridgeGrossKg || activeLotForIntake.actualWeightKg} kg</div>
            </div>

            <form onSubmit={handleConfirmIntake}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    Verified Net Weight (kg) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    required
                    value={verifiedWeight}
                    onChange={e => setVerifiedWeight(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-medium)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    Optical Purity Check (%) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="50"
                    max="100"
                    required
                    value={purityPercent}
                    onChange={e => setPurityPercent(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-medium)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700 }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Intake Hopper / Gate Receipt No. *
                </label>
                <input
                  type="text"
                  required
                  value={intakeSlipNo}
                  onChange={e => setIntakeSlipNo(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-medium)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.9rem', fontFamily: 'monospace' }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Intake Inspection Notes &amp; Quality Signoff
                </label>
                <textarea
                  rows="3"
                  value={inspectorNotes}
                  onChange={e => setInspectorNotes(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-medium)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ padding: '0.85rem', background: 'var(--accent-green-subtle)', borderRadius: '10px', border: '1px solid var(--accent-green)', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-green)' }}>
                    Calculated Volunteer Payout for Admin Approval:
                  </span>
                  <span className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-green)' }}>
                    ₹{((parseFloat(verifiedWeight) || 0) * (activeLotForIntake.ratePerKg || 0)).toFixed(2)}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setActiveLotForIntake(null)}
                  className="neo-btn"
                  style={{ padding: '0.65rem 1.25rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="neo-btn neo-btn-primary"
                  style={{ padding: '0.65rem 1.5rem', fontWeight: 800 }}
                >
                  <CheckCircle2 size={16} /> Confirm Handover &amp; Update Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
