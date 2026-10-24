import {
  Building2, Users, Heart, TrendingUp, ArrowUpRight, MapPin,
  Calendar, Target, Award, Leaf, Globe, Clock
} from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement,
  PointElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement,
  PointElement, ArcElement, Title, Tooltip, Legend, Filler);

const chartOptions = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1f2937', borderColor: 'rgba(75,85,99,0.4)', borderWidth: 1, padding: 12, cornerRadius: 8 } },
  scales: { x: { grid: { color: 'rgba(75,85,99,0.15)' }, ticks: { color: '#9ca3af', font: { size: 11 } } }, y: { grid: { color: 'rgba(75,85,99,0.15)' }, ticks: { color: '#9ca3af', font: { size: 11 } } } }
};

const campaigns = [
  { name: 'Clean Ganga Drive 2026', location: 'Varanasi, UP', volunteers: 128, collected: '2.5 tons', progress: 78, status: 'active' },
  { name: 'Plastic Free Campus', location: 'IIT Delhi', volunteers: 45, collected: '890 kg', progress: 92, status: 'active' },
  { name: 'E-Waste Collection Week', location: 'Bangalore', volunteers: 86, collected: '1.2 tons', progress: 65, status: 'active' },
  { name: 'Beach Cleanup Mumbai', location: 'Juhu Beach', volunteers: 210, collected: '4.1 tons', progress: 100, status: 'completed' },
  { name: 'Rural Awareness Program', location: 'Rajasthan', volunteers: 34, collected: '320 kg', progress: 42, status: 'planning' },
];

const impactMetrics = [
  { label: 'Trees Saved', value: '12,450', icon: '🌳' },
  { label: 'CO₂e Reduced', value: '89 tons', icon: '💨' },
  { label: 'Water Saved', value: '2.4M L', icon: '💧' },
  { label: 'Families Impacted', value: '8,200', icon: '👨‍👩‍👧‍👦' },
];

export default function NGODashboard() {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div className="page-header-info">
          <h1>NGO Dashboard</h1>
          <p>Manage campaigns, volunteers, and track environmental impact</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary">
            <Calendar size={16} /> New Campaign
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid stagger-children">
        <div className="stat-card green animate-slide-up">
          <div className="stat-icon"><Globe size={24} /></div>
          <div className="stat-value">18</div>
          <div className="stat-label">Active Campaigns</div>
          <div className="stat-change positive"><ArrowUpRight size={12} /> +3 this month</div>
        </div>
        <div className="stat-card blue animate-slide-up">
          <div className="stat-icon"><Users size={24} /></div>
          <div className="stat-value">2,456</div>
          <div className="stat-label">Total Volunteers</div>
          <div className="stat-change positive"><ArrowUpRight size={12} /> +156 new</div>
        </div>
        <div className="stat-card orange animate-slide-up">
          <div className="stat-icon"><Leaf size={24} /></div>
          <div className="stat-value">8.9 tons</div>
          <div className="stat-label">Total Waste Collected</div>
          <div className="stat-change positive"><ArrowUpRight size={12} /> +24.3%</div>
        </div>
        <div className="stat-card purple animate-slide-up">
          <div className="stat-icon"><Heart size={24} /></div>
          <div className="stat-value">94.2%</div>
          <div className="stat-label">Volunteer Satisfaction</div>
          <div className="stat-change positive"><ArrowUpRight size={12} /> +2.1%</div>
        </div>
      </div>

      {/* Impact Cards */}
      <div className="impact-cards responsive-grid-4" style={{ marginBottom: '1.5rem' }}>
        {impactMetrics.map((m, i) => (
          <div key={i} className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{m.icon}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700 }}>{m.value}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="content-grid">
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Monthly Collection Growth</h3>
          <div style={{ height: 260 }}>
            <Line
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [{
                  label: 'Collection (kg)',
                  data: [420, 550, 680, 750, 820, 910, 1050, 1180, 1320, 1450],
                  borderColor: '#3b82f6',
                  backgroundColor: 'rgba(59,130,246,0.1)',
                  fill: true,
                  tension: 0.4,
                  pointRadius: 4,
                }]
              }}
              options={chartOptions}
            />
          </div>
        </div>
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Volunteer Engagement</h3>
          <div style={{ height: 260 }}>
            <Bar
              data={{
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                  label: 'Active Volunteers',
                  data: [45, 62, 58, 72, 55, 120, 95],
                  backgroundColor: 'rgba(168,85,247,0.6)',
                  borderRadius: 6,
                  borderSkipped: false,
                }]
              }}
              options={chartOptions}
            />
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="card">
        <div className="card-header-row">
          <h3>Active Campaigns</h3>
          <button className="btn btn-secondary btn-sm">View All</button>
        </div>
        <div className="table-container" style={{ marginTop: '1rem' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Location</th>
                <th>Volunteers</th>
                <th>Collected</th>
                <th>Progress</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</td>
                  <td><MapPin size={14} style={{ display: 'inline', marginRight: 4 }} />{c.location}</td>
                  <td>{c.volunteers}</td>
                  <td>{c.collected}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className="progress-bar" style={{ width: 80 }}>
                        <div className="progress-fill" style={{ width: `${c.progress}%` }}></div>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${c.status === 'active' ? 'green' : c.status === 'completed' ? 'blue' : 'orange'}`}>
                      {c.status}
                    </span>
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
