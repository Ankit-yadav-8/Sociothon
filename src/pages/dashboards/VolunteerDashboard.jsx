import { useState } from 'react';
import {
  Truck, CheckCircle2, MapPin, IndianRupee, Scale, Award,
  Clock, Shield, ArrowUpRight, Phone, Navigation, AlertCircle,
  QrCode, KeyRound, Check
} from 'lucide-react';
import toast from 'react-hot-toast';

const ASSIGNED_PICKUPS = [
  {
    id: 'PKP-1092',
    name: 'Suresh Kumar (Flat 402, Lotus Greens)',
    address: 'Sector 62, Noida, UP',
    phone: '+91 98112 34567',
    distance: '1.2 km away',
    timeSlot: '11:00 AM - 12:00 PM',
    estKg: 14.5,
    items: 'PET Bottles, Cardboard Boxes, Broken Toaster',
    otp: '4829',
    status: 'in-transit',
    amount: '₹340.00'
  },
  {
    id: 'PKP-1095',
    name: 'Ananya Deshmukh (Hostel Block C)',
    address: 'SRM Nagar, Potheri',
    phone: '+91 98401 23456',
    distance: '3.4 km away',
    timeSlot: '01:30 PM - 02:30 PM',
    estKg: 28.0,
    items: 'Aluminium Beverage Cans, HDPE Milk Jugs',
    otp: '7712',
    status: 'pending',
    amount: '₹620.00'
  },
  {
    id: 'PKP-1088',
    name: 'TechPark Cafeteria (Bulk Food Waste)',
    address: 'DLF CyberCity, Gurugram',
    phone: '+91 99100 88221',
    distance: '4.8 km away',
    timeSlot: '04:00 PM - 05:00 PM',
    estKg: 45.0,
    items: 'Kitchen Scraps & Coffee Pulp for Micro-Drying',
    otp: '9150',
    status: 'pending',
    amount: '₹450.00'
  }
];

export default function VolunteerDashboard() {
  const [pickups, setPickups] = useState(ASSIGNED_PICKUPS);
  const [selectedPickup, setSelectedPickup] = useState(ASSIGNED_PICKUPS[0]);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [scaleWeight, setScaleWeight] = useState(14.2);
  const [isVerifying, setIsVerifying] = useState(false);
  const [dailyEarnings, setDailyEarnings] = useState(1420);
  const [totalCompleted, setTotalCompleted] = useState(8);

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!enteredOtp) {
      toast.error('Please enter the customer OTP.');
      return;
    }

    if (enteredOtp !== selectedPickup.otp && enteredOtp !== '1234') {
      toast.error('Invalid OTP! Verification failed.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setPickups(prev =>
        prev.map(p => p.id === selectedPickup.id ? { ...p, status: 'completed' } : p)
      );
      setSelectedPickup(prev => ({ ...prev, status: 'completed' }));
      setDailyEarnings(prev => prev + 340);
      setTotalCompleted(prev => prev + 1);
      toast.success(`Doorstep verification successful! Paid ₹340 via UPI instant payout.`);
      setEnteredOtp('');
    }, 700);
  };

  return (
    <div className="container-max" style={{ paddingBottom: '3rem' }}>
      
      {/* Header */}
      <div className="neo-card" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <span className="neo-badge neo-badge-green" style={{ marginBottom: '0.5rem' }}>
              <Shield size={13} /> Certified Green Logistics Partner
            </span>
            <h1 className="font-display" style={{ fontSize: '1.85rem', fontWeight: 800 }}>
              Volunteer &amp; Hauler Console
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Welcome, <strong>Arjun Patel</strong>. Route telematics active for Vehicle DL-01-EV-4421.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="neo-btn" onClick={() => toast.success('Smart scale auto-calibrated via Bluetooth!')}>
              <Scale size={16} /> Sync Digital Scale
            </button>
            <button className="neo-btn neo-btn-primary" onClick={() => toast.success('Live turn-by-turn route loaded.')}>
              <Navigation size={16} /> Start Optimized Route
            </button>
          </div>
        </div>

        {/* Quick Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-green)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Today's Earnings</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-green-dark)', marginTop: '0.25rem' }}>
              ₹{dailyEarnings.toLocaleString()}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Direct UPI to HDFC •••• 9214</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-blue)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Pickups Completed</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-blue)', marginTop: '0.25rem' }}>
              {totalCompleted} <span style={{ fontSize: '0.875rem' }}>/ 12</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>4 remaining on route</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-orange)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Collected Mass</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-orange)', marginTop: '0.25rem' }}>
              184.6 <span style={{ fontSize: '0.875rem' }}>kg</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Payload capacity: 62%</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-purple)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Safety &amp; Compliance</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-purple)', marginTop: '0.25rem' }}>
              100%
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PPE Level 2 Verified</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.25fr) minmax(320px, 1fr)', gap: '1.75rem' }}>
        
        {/* Left Column: Assigned Pickups List */}
        <div className="neo-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={20} color="var(--neo-blue)" /> Scheduled Doorstep Jobs
            </h2>
            <span className="neo-badge neo-badge-blue">Live Route Active</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {pickups.map((p) => {
              const isSelected = selectedPickup.id === p.id;
              return (
                <div
                  key={p.id}
                  className={isSelected ? 'neo-inset' : 'neo-card-sm'}
                  style={{
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    border: isSelected ? '1.5px solid var(--neo-blue)' : 'none'
                  }}
                  onClick={() => setSelectedPickup(p)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)' }}>{p.id} • {p.timeSlot}</span>
                      <strong style={{ fontSize: '1rem', display: 'block', marginTop: '2px' }}>{p.name}</strong>
                    </div>
                    <span className={`neo-badge ${p.status === 'completed' ? 'neo-badge-green' : p.status === 'in-transit' ? 'neo-badge-orange' : 'neo-badge-blue'}`}>
                      {p.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                    <MapPin size={14} color="var(--neo-blue)" /> {p.address} ({p.distance})
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.625rem' }}>
                    📦 {p.items} (~{p.estKg} kg)
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--neo-green-dark)' }}>
                      Est. Payout: {p.amount}
                    </span>
                    <a
                      href={`tel:${p.phone}`}
                      className="neo-btn"
                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Phone size={12} /> Call Customer
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Doorstep Verification & Digital Scale */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="neo-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <KeyRound size={20} color="var(--neo-green-dark)" />
              <h2 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                Doorstep OTP Authentication
              </h2>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Verify pickup for <strong>{selectedPickup.name}</strong>. Customer will receive a 4-digit token on their EcoLoop App.
            </p>

            <div className="neo-card-sm" style={{ background: 'var(--neo-bg-alt)', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>
                <span>Job Reference:</span>
                <strong>{selectedPickup.id}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>
                <span>Scheduled Window:</span>
                <strong>{selectedPickup.timeSlot}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                <span>Demo Passcode:</span>
                <strong style={{ color: 'var(--neo-blue)' }}>{selectedPickup.otp} (or 1234)</strong>
              </div>
            </div>

            {selectedPickup.status === 'completed' ? (
              <div className="neo-inset" style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(46, 204, 113, 0.08)' }}>
                <CheckCircle2 size={36} color="var(--neo-green)" style={{ margin: '0 auto 0.5rem' }} />
                <h3 className="font-display" style={{ fontWeight: 800, color: 'var(--neo-green-dark)' }}>
                  Pickup Verified &amp; Settled
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  Digital invoice emitted to customer. {scaleWeight} kg loaded to vehicle bin.
                </p>
              </div>
            ) : (
              <form onSubmit={handleVerifyOtp}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Enter 4-Digit Customer OTP
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="e.g. 4829"
                    className="neo-input font-display"
                    style={{ fontSize: '1.5rem', letterSpacing: '0.3em', textAlign: 'center', fontWeight: 800 }}
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    <span>Calibrated Weight (Digital Scale)</span>
                    <span style={{ color: 'var(--neo-green-dark)' }}>Bluetooth Connected</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input
                      type="number"
                      step="0.1"
                      className="neo-input font-display"
                      style={{ fontSize: '1.25rem', fontWeight: 800 }}
                      value={scaleWeight}
                      onChange={(e) => setScaleWeight(parseFloat(e.target.value) || 0)}
                    />
                    <span style={{ fontWeight: 700 }}>kg</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="neo-btn neo-btn-primary"
                  style={{ width: '100%', padding: '0.875rem' }}
                  disabled={isVerifying}
                >
                  {isVerifying ? 'Verifying on Ledger...' : 'Authenticate & Settle UPI'}
                </button>
              </form>
            )}
          </div>

          {/* Worker Safety Checklist */}
          <div className="neo-card">
            <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={18} color="var(--neo-orange)" /> Regulated Safety Protocol
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check size={14} color="var(--neo-green-dark)" /> Anti-puncture cut-resistant nitrile gloves active
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check size={14} color="var(--neo-green-dark)" /> Battery hazard isolation kit present in boot
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check size={14} color="var(--neo-green-dark)" /> QR scanner scanner lens cleaned for MRF handover
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
