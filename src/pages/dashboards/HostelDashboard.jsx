import { useState } from 'react';
import {
  Building2, Utensils, Leaf, TrendingDown, Users, Award,
  Sparkles, CheckCircle2, AlertTriangle, Scale, Clock, RefreshCw,
  ShoppingBag, Flame, Layers
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import toast from 'react-hot-toast';

export default function HostelDashboard() {
  const [activeTab, setActiveTab] = useState('food');
  const [surpriseBagsAvailable, setSurpriseBagsAvailable] = useState(14);
  const [dehydratorActive, setDehydratorActive] = useState(true);

  const handleOrderSurpriseBag = () => {
    if (surpriseBagsAvailable <= 0) {
      toast.error('All Surprise Bags claimed for today!');
      return;
    }
    setSurpriseBagsAvailable(prev => prev - 1);
    toast.success('🎉 Student Surprise Bag reserved! Pickup between 9:30 PM - 10:15 PM at Central Mess counter.');
  };

  return (
    <div className="container-max" style={{ paddingBottom: '3rem' }}>
      
      {/* Header */}
      <div className="neo-card" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="neo-badge neo-badge-green">
                <Building2 size={13} /> Institutional Sustainability Hub
              </span>
              <span className="neo-badge neo-badge-blue">
                Winnow &amp; Orbisk Optical Scale Integration
              </span>
            </div>
            <h1 className="font-display" style={{ fontSize: '1.85rem', fontWeight: 800 }}>
              Campus &amp; Hostel Waste Recovery
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              <strong>IIT Delhi - Aravali &amp; Nilgiri Hostels</strong> (Capacity: 1,450 Residents • Central Dining Mess #2)
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              className="neo-btn"
              onClick={() => toast.success('Micro-drying dehydrator chamber operating at 160°C. 78% moisture evaporated.')}
            >
              <Flame size={16} color="var(--neo-orange)" /> Dehydrator Status: 78% Dry
            </button>
            <button
              className="neo-btn neo-btn-primary"
              onClick={handleOrderSurpriseBag}
            >
              <ShoppingBag size={16} /> Claim Surprise Bag ({surpriseBagsAvailable} left)
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-green)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Mess Kitchen Waste Reduction</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-green-dark)', marginTop: '0.25rem' }}>
              -42.8%
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Via Fullsoon predictive prep AI</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-blue)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Daily Food Saved</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-blue)', marginTop: '0.25rem' }}>
              148 <span style={{ fontSize: '0.875rem' }}>kg/day</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Over 410 student meals rescued</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-orange)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Soil Compost Output</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-orange)', marginTop: '0.25rem' }}>
              62.4 <span style={{ fontSize: '0.875rem' }}>kg</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Nutrient-rich organic amendment</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-purple)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Inter-Hostel Rank</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-purple)', marginTop: '0.25rem' }}>
              #1 in Campus
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Green Campus Trophy Leader</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {[
          { id: 'food', label: 'Commercial Kitchen & Orbisk Camera' },
          { id: 'surprise', label: 'Surplus Recovery ("Surprise Bags")' },
          { id: 'drying', label: 'Thermomechanical Dehydration (Mill)' },
          { id: 'leaderboard', label: 'Inter-Hostel Green League' }
        ].map((tab) => (
          <button
            key={tab.id}
            className={`neo-btn ${activeTab === tab.id ? 'active' : ''}`}
            style={{
              fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? 'var(--neo-green-dark)' : 'var(--text-secondary)'
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Food & Commercial Kitchen AI */}
      {activeTab === 'food' && (
        <div className="responsive-two-col">
          
          <div className="neo-card">
            <h2 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Automated Dish Disposal Logging (Overhead AI Camera)
            </h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Simulating Orbisk/Winnow Vision above-bin optical recognition: scans plate residues before entering hopper, automatically tagging ingredient categories and CO₂e footprint.
            </p>

            <div className="neo-inset" style={{ padding: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.8125rem', fontWeight: 700 }}>
                <span>Latest AI Camera Drop Snapshot:</span>
                <span className="neo-badge neo-badge-green" style={{ fontSize: '0.7rem' }}>44ms Latency</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { ingredient: 'Cooked Basmati Rice & Dal', weight: '0.32 kg', cost: '₹22.40', co2e: '0.84 kg CO₂e', cause: 'Over-serving / Portion size' },
                  { ingredient: 'Paneer Butter Gravy', weight: '0.18 kg', cost: '₹34.20', co2e: '1.12 kg CO₂e', cause: 'Recipe consistency issue' },
                  { ingredient: 'Chopped Vegetable Trimmings', weight: '0.64 kg', cost: '₹18.00', co2e: '0.45 kg CO₂e', cause: 'Prep peeling excess' },
                ].map((item, i) => (
                  <div key={i} className="neo-card-sm" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '0.875rem' }}>{item.ingredient}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Identified via 1,000+ Ingredient Vision Ontology</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontWeight: 700, color: 'var(--neo-orange)' }}>{item.weight}</span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.cost} • {item.co2e}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
                Predictive software recommending: <strong>Reduce dinner rice prep quota by 14%</strong>
              </span>
              <button className="neo-btn neo-btn-primary" style={{ fontSize: '0.8125rem' }} onClick={() => toast.success('Kitchen prep quota sync dispatched to Head Chef.')}>
                Apply AI Prep Quota
              </button>
            </div>
          </div>

          <div className="neo-card">
            <h2 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
              Weekly Mess Waste Reduction
            </h2>
            <div style={{ height: '240px' }}>
              <Bar
                data={{
                  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                  datasets: [
                    {
                      label: 'Actual Waste (kg)',
                      data: [58, 52, 44, 38, 35, 48, 42],
                      backgroundColor: 'rgba(46, 204, 113, 0.75)',
                      borderRadius: 8
                    },
                    {
                      label: 'Baseline Prior to AI (kg)',
                      data: [92, 88, 85, 84, 82, 90, 86],
                      backgroundColor: 'rgba(163, 177, 198, 0.4)',
                      borderRadius: 8
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'top', labels: { boxWidth: 12 } } },
                  scales: { y: { beginAtZero: true } }
                }}
              />
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Surplus Recovery / Surprise Bags */}
      {activeTab === 'surprise' && (
        <div className="neo-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h2 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                Hyper-Local Mess Clearance ("Surprise Bags")
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Inspired by Too Good To Go: Unsold, freshly prepared hygienic meals packaged at close-of-service for discounted student &amp; staff reservation.
              </p>
            </div>
            <span className="neo-badge neo-badge-green" style={{ fontSize: '0.875rem' }}>
              {surpriseBagsAvailable} Bags Available Tonight
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {[
              { title: 'Dinner Surprise Meal Box', timing: '9:30 PM - 10:15 PM', originalPrice: '₹140', discountPrice: '₹45', contents: 'Fresh Paneer Tikka, Jeera Pulao, 2 Phulkas, Dal Makhani' },
              { title: 'Evening High-Tea Snack Pack', timing: '6:30 PM - 7:15 PM', originalPrice: '₹80', discountPrice: '₹25', contents: 'Veg Cutlets, Grilled Sandwich, Banana Cake' },
              { title: 'Healthy Breakfast Recovery Box', timing: '9:45 AM - 10:30 AM', originalPrice: '₹95', discountPrice: '₹30', contents: 'Idli-Vada with Sambhar, Upma, Seasonal Fruits' }
            ].map((box, i) => (
              <div key={i} className="neo-card-sm" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="neo-badge neo-badge-blue" style={{ fontSize: '0.7rem' }}>FSSAI Certified</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}><Clock size={12} style={{ display: 'inline', marginRight: 3 }} />{box.timing}</span>
                  </div>
                  <strong style={{ fontSize: '1rem', display: 'block', marginBottom: '0.35rem' }}>{box.title}</strong>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    {box.contents}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '0.75rem' }}>
                  <div>
                    <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '0.8125rem', marginRight: '0.5rem' }}>{box.originalPrice}</span>
                    <strong style={{ fontSize: '1.15rem', color: 'var(--neo-green-dark)' }}>{box.discountPrice}</strong>
                  </div>
                  <button className="neo-btn neo-btn-primary" style={{ fontSize: '0.8125rem', padding: '0.45rem 0.9rem' }} onClick={handleOrderSurpriseBag}>
                    Reserve Box
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Thermomechanical Dehydration */}
      {activeTab === 'drying' && (
        <div className="neo-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
            <div>
              <h2 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                On-Site Thermomechanical Food Recycler (Mill Unit)
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Applies controlled heat and mechanical shear to inedible scraps, evaporating 75%–80% moisture to produce dry organic fertilizer soil amendment.
              </p>
            </div>
            <span className="neo-badge neo-badge-orange">Batch #48 Active</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            <div className="neo-inset" style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Input Wet Mass</div>
              <div className="font-display" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--neo-orange)', margin: '0.5rem 0' }}>
                240 kg
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Raw kitchen scraps &amp; peelings</span>
            </div>

            <div className="neo-card-sm" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Flame size={32} color="var(--neo-orange)" style={{ marginBottom: '0.5rem' }} />
              <strong style={{ fontSize: '0.9375rem' }}>Thermal Shear Cycle: 160°C</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pathogen sterilization active</span>
            </div>

            <div className="neo-inset" style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Micro-Dried Output</div>
              <div className="font-display" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--neo-green-dark)', margin: '0.5rem 0' }}>
                48 kg
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>80% volume reduction achieved</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Inter-Hostel Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="neo-card">
          <h2 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>
            Campus Inter-Hostel Sustainability League
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { rank: 1, name: 'Aravali Hostel', points: '14,850 pts', diverted: '4.2 tons', reduction: '-48%', badge: '🥇 Gold Leaf Award' },
              { rank: 2, name: 'Nilgiri Hostel', points: '12,420 pts', diverted: '3.6 tons', reduction: '-41%', badge: '🥈 Silver Sprig' },
              { rank: 3, name: 'Kumaon Hostel', points: '10,180 pts', diverted: '2.9 tons', reduction: '-35%', badge: '🥉 Bronze Sprout' },
              { rank: 4, name: 'Jwalamukhi Hostel', points: '8,950 pts', diverted: '2.4 tons', reduction: '-28%', badge: 'Participant' },
            ].map((h) => (
              <div key={h.rank} className="neo-card-sm" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800, width: '32px' }}>
                    #{h.rank}
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.95rem' }}>{h.name}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{h.badge}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong style={{ color: 'var(--neo-green-dark)', fontSize: '1rem' }}>{h.points}</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{h.diverted} diverted ({h.reduction})</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
