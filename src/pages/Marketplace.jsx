import { useState } from 'react';
import {
  ShoppingBag, TrendingUp, Gavel, ArrowUpRight, Search,
  Filter, ShieldCheck, Check, Clock, IndianRupee, Layers, Tag
} from 'lucide-react';
import toast from 'react-hot-toast';

const COMMODITY_LOTS = [
  {
    id: 'LOT-9921',
    title: 'High-Purity Baled PET Flakes (Clear Food-Grade)',
    seller: 'GreenLoop MRF Okhla',
    quantity: '24.5 Tons',
    purity: '99.4%',
    currentBid: '₹54,200 / Ton',
    reservePrice: '₹50,000 / Ton',
    bidsCount: 18,
    timeLeft: '02h 45m',
    polymer: 'PET (RIC-1)',
    cpcbCertified: true,
    location: 'New Delhi, NCR',
    img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'LOT-9924',
    title: 'Baled Natural HDPE Regrind Pellets',
    seller: 'EcoRecycle Gujarat Pvt Ltd',
    quantity: '40.0 Tons',
    purity: '98.8%',
    currentBid: '₹68,500 / Ton',
    reservePrice: '₹65,000 / Ton',
    bidsCount: 24,
    timeLeft: '05h 12m',
    polymer: 'HDPE (RIC-2)',
    cpcbCertified: true,
    location: 'Ahmedabad, Gujarat',
    img: 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'LOT-9930',
    title: 'Dismantled Telecom PCB & Precious Metal Ore',
    seller: 'Urban Mining Corporation',
    quantity: '3.8 Tons',
    purity: 'Grade AAA (Gold/Copper Yield)',
    currentBid: '₹3,40,000 / Ton',
    reservePrice: '₹3,20,000 / Ton',
    bidsCount: 31,
    timeLeft: '01h 05m',
    polymer: 'E-Waste Schedule I',
    cpcbCertified: true,
    location: 'Bangalore, Karnataka',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'LOT-9935',
    title: 'Densified Clean Cardboard OCC & Kraft Bales',
    seller: 'PaperRecycle Hub',
    quantity: '65.0 Tons',
    purity: 'Moisture <8%',
    currentBid: '₹14,800 / Ton',
    reservePrice: '₹13,500 / Ton',
    bidsCount: 12,
    timeLeft: '08h 20m',
    polymer: 'OCC Grade 11',
    cpcbCertified: true,
    location: 'Mumbai, Maharashtra',
    img: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80'
  }
];

export default function Marketplace() {
  const [lots, setLots] = useState(COMMODITY_LOTS);
  const [filterPolymer, setFilterPolymer] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [activeBiddingLot, setActiveBiddingLot] = useState(null);

  const handlePlaceBid = (lot) => {
    setActiveBiddingLot(lot);
  };

  const confirmBid = () => {
    if (!bidAmount) {
      toast.error('Please enter a competitive bid amount.');
      return;
    }
    toast.success(`🎉 Bid of ₹${bidAmount} placed for ${activeBiddingLot.title}! Escrow verified.`);
    setActiveBiddingLot(null);
    setBidAmount('');
  };

  const filtered = lots.filter(l => {
    const matchesFilter = filterPolymer === 'ALL' || l.polymer.includes(filterPolymer);
    const matchesSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) || l.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container-max" style={{ paddingBottom: '3rem' }}>
      
      {/* Header */}
      <div className="neo-card" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="neo-badge neo-badge-green">
                <Gavel size={13} /> Competitive Real-Time E-Auctions
              </span>
              <span className="neo-badge neo-badge-blue">
                B2B Scrapo-Grade Digital Trading
              </span>
            </div>
            <h1 className="font-display" style={{ fontSize: '1.85rem', fontWeight: 800 }}>
              Secondary Raw Material Marketplace
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Connect waste generators and MRFs directly with authorized recyclers. Transparent price discovery and escrow settlement.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="neo-btn neo-btn-primary" onClick={() => toast('Lot listing wizard launched.', { icon: '📦' })}>
              <Tag size={16} /> List Commodity Lot
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem', alignItems: 'center' }}>
          <div className="neo-inset" style={{ flex: '1 1 300px', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.625rem 1rem' }}>
            <Search size={18} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search by polymer, purity, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', fontSize: '0.875rem' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['ALL', 'PET', 'HDPE', 'E-Waste', 'OCC'].map((p) => (
              <button
                key={p}
                className={`neo-btn ${filterPolymer === p ? 'active' : ''}`}
                style={{
                  fontSize: '0.8125rem',
                  padding: '0.5rem 0.875rem',
                  fontWeight: filterPolymer === p ? 700 : 500
                }}
                onClick={() => setFilterPolymer(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lot Listings Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filtered.map((lot) => (
          <div key={lot.id} className="neo-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ position: 'relative', height: '170px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1rem' }}>
                <img src={lot.img} alt={lot.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span
                  className="neo-badge neo-badge-green"
                  style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.7)', color: '#2ECC71' }}
                >
                  <ShieldCheck size={13} /> {lot.purity} Purity
                </span>
                <span
                  className="neo-badge neo-badge-orange"
                  style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', color: '#E67E22' }}
                >
                  <Clock size={13} /> {lot.timeLeft}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)' }}>{lot.id} • {lot.location}</span>
                <span className="neo-badge neo-badge-blue" style={{ fontSize: '0.7rem' }}>{lot.polymer}</span>
              </div>

              <h3 className="font-display" style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', lineHeight: 1.4 }}>
                {lot.title}
              </h3>

              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Generator: <strong>{lot.seller}</strong> • Quantity: <strong>{lot.quantity}</strong>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Highest Active Bid</div>
                  <strong className="font-display" style={{ fontSize: '1.25rem', color: 'var(--neo-green-dark)' }}>
                    {lot.currentBid}
                  </strong>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {lot.bidsCount} e-bids placed
                </div>
              </div>

              <button
                className="neo-btn neo-btn-primary"
                style={{ width: '100%', padding: '0.75rem' }}
                onClick={() => handlePlaceBid(lot)}
              >
                <Gavel size={16} /> Place E-Auction Bid
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bid Modal */}
      {activeBiddingLot && (
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
          onClick={() => setActiveBiddingLot(null)}
        >
          <div
            className="neo-card-lg"
            style={{ maxWidth: '480px', width: '100%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Place E-Auction Bid
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Bidding on <strong>{activeBiddingLot.title}</strong> ({activeBiddingLot.quantity}). Current bid is {activeBiddingLot.currentBid}.
            </p>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Enter Bid Amount per Ton (INR)
              </label>
              <input
                type="number"
                placeholder="e.g. 56000"
                className="neo-input font-display"
                style={{ fontSize: '1.35rem', fontWeight: 800 }}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button className="neo-btn" onClick={() => setActiveBiddingLot(null)}>
                Cancel
              </button>
              <button className="neo-btn neo-btn-primary" onClick={confirmBid}>
                Submit Authenticated Bid
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
