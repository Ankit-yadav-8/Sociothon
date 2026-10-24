import { useState } from 'react';
import {
  BarChart3, TrendingUp, Leaf, IndianRupee, Download,
  Layers, Calendar, Filter, ArrowUpRight, ShieldCheck
} from 'lucide-react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import toast from 'react-hot-toast';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('6M');

  return (
    <div className="container-max" style={{ paddingBottom: '3rem' }}>
      
      {/* Header */}
      <div className="neo-card" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="neo-badge neo-badge-green">
                <BarChart3 size={13} /> ESG &amp; Circularity Intelligence
              </span>
              <span className="neo-badge neo-badge-blue">
                GHG Protocol Scope 3 Certified
              </span>
            </div>
            <h1 className="font-display" style={{ fontSize: '1.85rem', fontWeight: 800 }}>
              Landfill Diversion &amp; Impact Analytics
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Multi-stream data intelligence computing carbon abatement, tipping fee economics, and circular diversion rates across all wards.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              className="neo-btn neo-btn-primary"
              onClick={() => toast.success('Audited ESG Compliance Report (PDF) exported successfully!')}
            >
              <Download size={16} /> Export ESG Report
            </button>
          </div>
        </div>

        {/* Impact Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-green)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Net Landfill Diversion</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-green-dark)', marginTop: '0.25rem' }}>
              89.4%
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+6.8% vs municipal average</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid #27AE60' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>CO₂e Abatement</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#27AE60', marginTop: '0.25rem' }}>
              412.8 MT
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Equivalent to 1,920 trees</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-blue)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Tipping Fees Saved</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-blue)', marginTop: '0.25rem' }}>
              ₹38.4 Lakhs
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Avoided landfill gate charges</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-purple)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Purity High-Grade Yield</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-purple)', marginTop: '0.25rem' }}>
              98.2%
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Food-grade flake quality</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.3fr) minmax(320px, 1fr)', gap: '1.75rem', marginBottom: '1.75rem' }}>
        
        {/* Monthly Diversion Trends */}
        <div className="neo-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              Monthly Diversion by Waste Category (Metric Tons)
            </h2>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {['1M', '3M', '6M', '1Y'].map(t => (
                <button
                  key={t}
                  className={`neo-btn ${timeRange === t ? 'active' : ''}`}
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                  onClick={() => setTimeRange(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ height: '280px' }}>
            <Line
              data={{
                labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [
                  {
                    label: 'Rigid Plastics (PET / HDPE)',
                    data: [42, 54, 62, 78, 86, 95],
                    borderColor: '#2ECC71',
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    fill: true,
                    tension: 0.35
                  },
                  {
                    label: 'Organic Kitchen Scraps',
                    data: [35, 42, 51, 60, 68, 76],
                    borderColor: '#E67E22',
                    backgroundColor: 'rgba(230, 126, 34, 0.05)',
                    fill: true,
                    tension: 0.35
                  },
                  {
                    label: 'Paper & Cardboard (OCC)',
                    data: [28, 34, 38, 45, 52, 58],
                    borderColor: '#3498DB',
                    tension: 0.35
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11 } } } },
                scales: { y: { beginAtZero: true } }
              }}
            />
          </div>
        </div>

        {/* Polymer Breakdown Doughnut */}
        <div className="neo-card">
          <h2 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
            Polymer Super-Class Composition (PWVO)
          </h2>
          <div style={{ height: '250px', display: 'flex', justifyContent: 'center' }}>
            <Doughnut
              data={{
                labels: ['PET (RIC-1)', 'HDPE (RIC-2)', 'PP (RIC-5)', 'MLP Film (RIC-7)', 'E-Waste', 'Organic'],
                datasets: [{
                  data: [34, 24, 16, 12, 8, 6],
                  backgroundColor: ['#2ECC71', '#3498DB', '#9B59B6', '#E67E22', '#E74C3C', '#27AE60'],
                  borderWidth: 0
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } }
                },
                cutout: '62%'
              }}
            />
          </div>
        </div>

      </div>

    </div>
  );
}
