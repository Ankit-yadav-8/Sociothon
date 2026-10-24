import { useState } from 'react';
import {
  Calendar, Truck, Scale, MapPin, IndianRupee, KeyRound,
  CheckCircle2, Clock, Phone, Tag, ShieldCheck, ArrowRight
} from 'lucide-react';
import toast from 'react-hot-toast';

const DAILY_SCRAP_RATES = [
  { item: 'Newspaper & Mixed Paper', rate: '₹14.00 / kg', trend: '+₹1.50', icon: '📄' },
  { item: 'Corrugated Cardboard (OCC)', rate: '₹12.50 / kg', trend: '+₹0.80', icon: '📦' },
  { item: 'PET Plastic Bottles (Clear)', rate: '₹18.00 / kg', trend: '+₹2.00', icon: '🍾' },
  { item: 'HDPE Rigid Plastic Containers', rate: '₹22.00 / kg', trend: '+₹1.20', icon: '🧴' },
  { item: 'Aluminium Cans & Utensils', rate: '₹115.00 / kg', trend: '+₹5.00', icon: '🥫' },
  { item: 'Brass & Copper Wire', rate: '₹420.00 / kg', trend: '+₹18.00', icon: '🔌' },
  { item: 'Iron & Mild Steel Scrap', rate: '₹28.50 / kg', trend: '+₹1.00', icon: '🔩' },
  { item: 'Beer Bottles & Glass Jars', rate: '₹4.00 / kg', trend: 'Stable', icon: '🫙' },
];

export default function Pickups() {
  const [address, setAddress] = useState('Flat 402, Tower B, Godrej Woods, Sector 43');
  const [date, setDate] = useState('Tomorrow, 10:00 AM - 12:00 PM');
  const [wasteTypes, setWasteTypes] = useState(['PET Plastic', 'Cardboard']);
  const [generatedOtp, setGeneratedOtp] = useState('8391');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const toggleWaste = (type) => {
    setWasteTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleBookPickup = (e) => {
    e.preventDefault();
    if (wasteTypes.length === 0) {
      toast.error('Please select at least one material category.');
      return;
    }
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    setBookingConfirmed(true);
    toast.success(`🎉 Doorstep pickup scheduled! Your secure authentication OTP is ${newOtp}`);
  };

  return (
    <div className="container-max" style={{ paddingBottom: '3rem' }}>
      
      {/* Header */}
      <div className="neo-card" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="neo-badge neo-badge-green">
                <Truck size={13} /> Doorstep Kabadiwala &amp; Hauler Network
              </span>
              <span className="neo-badge neo-badge-blue">
                OTP-Authenticated Instant UPI Settlement
              </span>
            </div>
            <h1 className="font-display" style={{ fontSize: '1.85rem', fontWeight: 800 }}>
              Doorstep Scrap Pickup &amp; Price Index
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Schedule verified doorstep pickups. Live digital scale weighing at your doorstep and instant cash or UPI payouts.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Booking Form & Live Scrap Price Board */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.25fr) minmax(320px, 1fr)', gap: '1.75rem' }}>
        
        {/* Left Column: Schedule Doorstep Pickup */}
        <div className="neo-card">
          <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={20} color="var(--neo-green-dark)" /> Schedule Doorstep Collection
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            An authorized municipal hauler with a calibrated Bluetooth digital scale will visit your premises.
          </p>

          {bookingConfirmed ? (
            <div className="neo-inset" style={{ padding: '1.75rem', textAlign: 'center' }}>
              <CheckCircle2 size={44} color="var(--neo-green)" style={{ margin: '0 auto 0.75rem' }} />
              <h3 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--neo-green-dark)' }}>
                Pickup Scheduled Successfully!
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Assigned Hauler: <strong>Arjun Patel (Vehicle DL-01-EV-4421)</strong>
              </p>

              <div className="neo-card-sm" style={{ display: 'inline-block', padding: '1rem 2rem', background: 'var(--neo-bg-alt)', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>Your Secure Handover OTP</span>
                <div className="font-display" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--neo-blue)', letterSpacing: '0.2em' }}>
                  {generatedOtp}
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Share with vendor only after weighing scrap</span>
              </div>

              <div>
                <button className="neo-btn" onClick={() => setBookingConfirmed(false)}>
                  Schedule Another Pickup
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBookPickup}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Doorstep Address
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="text"
                    className="neo-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Preferred Time Slot
                </label>
                <input
                  type="text"
                  className="neo-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Select Materials to Handover
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['PET Plastic', 'HDPE Containers', 'Cardboard', 'Newspaper', 'E-Waste', 'Aluminium Cans', 'Glass Bottles'].map((mat) => {
                    const selected = wasteTypes.includes(mat);
                    return (
                      <button
                        type="button"
                        key={mat}
                        className={`neo-btn ${selected ? 'active' : ''}`}
                        style={{
                          fontSize: '0.8125rem',
                          padding: '0.45rem 0.85rem',
                          color: selected ? 'var(--neo-green-dark)' : 'var(--text-secondary)'
                        }}
                        onClick={() => toggleWaste(mat)}
                      >
                        {mat}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button type="submit" className="neo-btn neo-btn-primary" style={{ width: '100%', padding: '0.875rem' }}>
                <Truck size={18} /> Confirm Doorstep Pickup &amp; Generate OTP
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Dynamic Daily Scrap Price Board */}
        <div className="neo-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IndianRupee size={20} color="var(--neo-green-dark)" /> Daily Market Scrap Rates
            </h2>
            <span className="neo-badge neo-badge-green">Updated Today</span>
          </div>

          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Transparent real-time rates benchmarked against wholesale recycling indices. Zero hidden deductions.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {DAILY_SCRAP_RATES.map((scrap, i) => (
              <div key={i} className="neo-card-sm" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>{scrap.icon}</span>
                  <div>
                    <strong style={{ fontSize: '0.875rem', display: 'block' }}>{scrap.item}</strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--neo-green-dark)' }}>{scrap.trend} this week</span>
                  </div>
                </div>

                <div className="font-display" style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {scrap.rate}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
