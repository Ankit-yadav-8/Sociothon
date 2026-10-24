import { useState } from 'react';
import {
  Award, ShieldCheck, CheckCircle2, Download, ExternalLink,
  FileText, IndianRupee, Layers, Search, Filter, RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

const EPR_CERTIFICATES = [
  {
    certNumber: 'CPCB-EPR-2026-CAT1-09412',
    category: 'Category I: Rigid Plastic Packaging',
    tonnage: '120.0 MT',
    recycler: 'GreenLoop Recyclers Hub',
    brandPurchaser: 'Nestlé India Consumer Products',
    issueDate: '18 Oct 2026',
    pricePerTon: '₹3,400',
    totalValue: '₹4,08,000',
    status: 'Surrendered & Audited'
  },
  {
    certNumber: 'CPCB-EPR-2026-CAT2-08819',
    category: 'Category II: Flexible Plastic Packaging',
    tonnage: '85.5 MT',
    recycler: 'EcoPlastic Polymer Solutions',
    brandPurchaser: 'Parle Agro Ltd',
    issueDate: '21 Oct 2026',
    pricePerTon: '₹2,950',
    totalValue: '₹2,52,225',
    status: 'Verified Available'
  },
  {
    certNumber: 'CPCB-EPR-2026-CAT3-04410',
    category: 'Category III: Multi-layered Plastic (MLP)',
    tonnage: '210.0 MT',
    recycler: 'Okhla Waste-to-Energy Co-processing',
    brandPurchaser: 'ITC Foods Division',
    issueDate: '23 Oct 2026',
    pricePerTon: '₹1,850',
    totalValue: '₹3,88,500',
    status: 'Verified Available'
  },
  {
    certNumber: 'CPCB-EPR-2026-EWASTE-0112',
    category: 'EPR E-Waste Schedule I (Telecom)',
    tonnage: '18.4 MT',
    recycler: 'Urban Mining Metallurgical Plant',
    brandPurchaser: 'Samsung India Electronics',
    issueDate: '24 Oct 2026',
    pricePerTon: '₹14,500',
    totalValue: '₹2,66,800',
    status: 'Surrendered & Audited'
  }
];

export default function EPRCredits() {
  const [certs, setCerts] = useState(EPR_CERTIFICATES);
  const [activeTab, setActiveTab] = useState('ALL');

  const filteredCerts = activeTab === 'ALL'
    ? certs
    : certs.filter(c => c.status.toLowerCase().includes(activeTab.toLowerCase()));

  const handlePurchase = (cert) => {
    toast.success(`🎉 Purchase order for ${cert.tonnage} (${cert.category}) submitted to CPCB Common Portal registry!`);
  };

  return (
    <div className="container-max" style={{ paddingBottom: '3rem' }}>
      
      {/* Header */}
      <div className="neo-card" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="neo-badge neo-badge-green">
                <ShieldCheck size={13} /> CPCB Common EPR Portal API Integration
              </span>
              <span className="neo-badge neo-badge-blue">
                Plastic Waste Management Rules (PWM) 2022 / 2026
              </span>
            </div>
            <h1 className="font-display" style={{ fontSize: '1.85rem', fontWeight: 800 }}>
              Extended Producer Responsibility (EPR) Registry
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Statutory credit certificate issuance, trading, and brand compliance offsetting directly verified with the Central Pollution Control Board (CPCB).
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="neo-btn neo-btn-primary" onClick={() => toast.success('CPCB EPR Portal digital signature token refreshed.')}>
              <RefreshCw size={16} /> Sync CPCB Ledger
            </button>
          </div>
        </div>

        {/* Brand Compliance Target Meters */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-green)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>FY 2026-27 EPR Compliance</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-green-dark)', marginTop: '0.25rem' }}>
              94.2% Fulfilled
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>1,840 MT of 1,950 MT target</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-blue)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Available Market Tonnage</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-blue)', marginTop: '0.25rem' }}>
              434.0 MT
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ready for immediate transfer</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-orange)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Total Trading Volume</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-orange)', marginTop: '0.25rem' }}>
              ₹1.32 Cr
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Through automated escrow</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-purple)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Audited Provenance Logs</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-purple)', marginTop: '0.25rem' }}>
              100% Verified
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SHA-256 Hash Chained</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {['ALL', 'Available', 'Audited'].map((tab) => (
          <button
            key={tab}
            className={`neo-btn ${activeTab === tab ? 'active' : ''}`}
            style={{ fontWeight: activeTab === tab ? 700 : 500 }}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'ALL' ? 'All EPR Certificates' : `${tab} Credits`}
          </button>
        ))}
      </div>

      {/* Certificate Table */}
      <div className="neo-card">
        <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
          Official CPCB Registered Credit Certificates
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.06)', color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.75rem' }}>Certificate Reference</th>
                <th style={{ padding: '0.75rem' }}>EPR Category</th>
                <th style={{ padding: '0.75rem' }}>Certified Tonnage</th>
                <th style={{ padding: '0.75rem' }}>Accredited Recycler</th>
                <th style={{ padding: '0.75rem' }}>Certificate Value</th>
                <th style={{ padding: '0.75rem' }}>Audit Status</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCerts.map((cert) => (
                <tr key={cert.certNumber} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                  <td style={{ padding: '0.875rem 0.75rem', fontWeight: 700, color: 'var(--neo-blue)' }}>
                    {cert.certNumber}
                  </td>
                  <td style={{ padding: '0.875rem 0.75rem' }}>
                    <strong>{cert.category}</strong>
                  </td>
                  <td style={{ padding: '0.875rem 0.75rem', fontWeight: 700 }}>
                    {cert.tonnage}
                  </td>
                  <td style={{ padding: '0.875rem 0.75rem', color: 'var(--text-secondary)' }}>
                    {cert.recycler}
                  </td>
                  <td style={{ padding: '0.875rem 0.75rem' }}>
                    <strong>{cert.totalValue}</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{cert.pricePerTon}/MT</div>
                  </td>
                  <td style={{ padding: '0.875rem 0.75rem' }}>
                    <span className={`neo-badge ${cert.status.includes('Available') ? 'neo-badge-green' : 'neo-badge-blue'}`}>
                      {cert.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.875rem 0.75rem', textAlign: 'right' }}>
                    {cert.status.includes('Available') ? (
                      <button
                        className="neo-btn neo-btn-primary"
                        style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                        onClick={() => handlePurchase(cert)}
                      >
                        Purchase Credit
                      </button>
                    ) : (
                      <button
                        className="neo-btn"
                        style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                        onClick={() => toast('CPCB statutory certificate PDF downloaded.', { icon: '📄' })}
                      >
                        <Download size={12} /> View PDF
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
