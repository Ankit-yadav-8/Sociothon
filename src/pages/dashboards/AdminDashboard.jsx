import { useEffect, useRef } from 'react';
import {
  Users, Recycle, TrendingUp, IndianRupee, ArrowUpRight, ArrowDownRight,
  MapPin, Clock, CheckCircle2, AlertTriangle, Package, Truck
} from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement,
  PointElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement,
  PointElement, ArcElement, Title, Tooltip, Legend, Filler);

const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1f2937',
      borderColor: 'rgba(75,85,99,0.4)',
      borderWidth: 1,
      titleFont: { family: 'Inter', size: 13, weight: '600' },
      bodyFont: { family: 'Inter', size: 12 },
      padding: 12,
      cornerRadius: 8,
    }
  },
  scales: {
    x: {
      grid: { color: 'rgba(75,85,99,0.15)' },
      ticks: { color: '#9ca3af', font: { family: 'Inter', size: 11 } }
    },
    y: {
      grid: { color: 'rgba(75,85,99,0.15)' },
      ticks: { color: '#9ca3af', font: { family: 'Inter', size: 11 } }
    }
  }
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

const recentActivities = [
  { type: 'pickup', user: 'Arjun P.', amount: '12.5 kg', material: 'PET Plastic', time: '5 min ago', status: 'completed' },
  { type: 'scan', user: 'Meera K.', amount: '3.2 kg', material: 'HDPE Container', time: '12 min ago', status: 'verified' },
  { type: 'payment', user: 'Ravi S.', amount: '₹245', material: 'Mixed Plastic', time: '18 min ago', status: 'paid' },
  { type: 'pickup', user: 'Sunita D.', amount: '8.7 kg', material: 'E-Waste', time: '25 min ago', status: 'in-transit' },
  { type: 'alert', user: 'System', amount: '', material: 'Low confidence scan flagged', time: '32 min ago', status: 'review' },
  { type: 'scan', user: 'Vikash M.', amount: '5.1 kg', material: 'PP Packaging', time: '45 min ago', status: 'completed' },
];

const topVolunteers = [
  { name: 'Arjun Patel', collections: 342, kg: '1,250', rating: 4.9, avatar: 'AP' },
  { name: 'Meera Krishnan', collections: 298, kg: '1,102', rating: 4.8, avatar: 'MK' },
  { name: 'Ravi Singh', collections: 276, kg: '985', rating: 4.7, avatar: 'RS' },
  { name: 'Priya Das', collections: 245, kg: '890', rating: 4.9, avatar: 'PD' },
  { name: 'Amit Sharma', collections: 231, kg: '842', rating: 4.6, avatar: 'AS' },
];

export default function AdminDashboard() {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div className="page-header-info">
          <h1>Admin Dashboard</h1>
          <p>Overview of platform operations and key metrics</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-secondary">
            <Clock size={16} /> Last 30 days
          </button>
          <button className="btn btn-primary">
            <TrendingUp size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid stagger-children">
        <div className="stat-card green animate-slide-up">
          <div className="stat-icon"><Recycle size={24} /></div>
          <div className="stat-value">12,547</div>
          <div className="stat-label">Total Waste Collected (kg)</div>
          <div className="stat-change positive"><ArrowUpRight size={12} /> +18.2% vs last month</div>
        </div>
        <div className="stat-card blue animate-slide-up">
          <div className="stat-icon"><Users size={24} /></div>
          <div className="stat-value">45,231</div>
          <div className="stat-label">Active Users</div>
          <div className="stat-change positive"><ArrowUpRight size={12} /> +12.5%</div>
        </div>
        <div className="stat-card orange animate-slide-up">
          <div className="stat-icon"><IndianRupee size={24} /></div>
          <div className="stat-value">₹24.5L</div>
          <div className="stat-label">Payments Disbursed</div>
          <div className="stat-change positive"><ArrowUpRight size={12} /> +22.1%</div>
        </div>
        <div className="stat-card purple animate-slide-up">
          <div className="stat-icon"><TrendingUp size={24} /></div>
          <div className="stat-value">89.3%</div>
          <div className="stat-label">Landfill Diversion Rate</div>
          <div className="stat-change positive"><ArrowUpRight size={12} /> +5.4%</div>
        </div>
      </div>

      {/* Charts */}
      <div className="content-grid">
        <div className="card">
          <div className="card-header-row">
            <h3>Collection Trends</h3>
            <div className="chart-legend">
              <span className="legend-dot" style={{ background: '#10b981' }}></span> Plastic
              <span className="legend-dot" style={{ background: '#3b82f6' }}></span> E-Waste
              <span className="legend-dot" style={{ background: '#f97316' }}></span> Organic
            </div>
          </div>
          <div style={{ height: 280 }}>
            <Line
              data={{
                labels: months,
                datasets: [
                  {
                    label: 'Plastic',
                    data: [820, 950, 1100, 1250, 1180, 1350, 1420, 1550, 1680, 1800],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16,185,129,0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                  },
                  {
                    label: 'E-Waste',
                    data: [320, 380, 420, 510, 480, 550, 620, 680, 720, 790],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59,130,246,0.05)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                  },
                  {
                    label: 'Organic',
                    data: [540, 620, 700, 780, 750, 830, 890, 950, 1020, 1100],
                    borderColor: '#f97316',
                    backgroundColor: 'rgba(249,115,22,0.05)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                  }
                ]
              }}
              options={chartDefaults}
            />
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Waste Distribution</h3>
          <div style={{ height: 240, display: 'flex', justifyContent: 'center' }}>
            <Doughnut
              data={{
                labels: ['PET', 'HDPE', 'PP', 'LDPE', 'E-Waste', 'Organic'],
                datasets: [{
                  data: [28, 22, 18, 12, 10, 10],
                  backgroundColor: ['#10b981', '#06b6d4', '#3b82f6', '#a855f7', '#f97316', '#eab308'],
                  borderWidth: 0,
                  spacing: 3,
                  borderRadius: 4,
                }]
              }}
              options={{
                ...chartDefaults,
                cutout: '65%',
                scales: undefined,
                plugins: {
                  ...chartDefaults.plugins,
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: '#9ca3af',
                      padding: 12,
                      usePointStyle: true,
                      pointStyle: 'circle',
                      font: { family: 'Inter', size: 11 }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Activity & Leaderboard */}
      <div className="content-grid content-grid-equal">
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Recent Activity</h3>
          <div className="activity-list">
            {recentActivities.map((a, i) => (
              <div key={i} className="activity-item">
                <div className={`activity-icon ${a.status}`}>
                  {a.type === 'pickup' ? <Truck size={16} /> :
                   a.type === 'scan' ? <Package size={16} /> :
                   a.type === 'payment' ? <IndianRupee size={16} /> :
                   <AlertTriangle size={16} />}
                </div>
                <div className="activity-info">
                  <span className="activity-user">{a.user}</span>
                  <span className="activity-desc">
                    {a.amount && `${a.amount} — `}{a.material}
                  </span>
                </div>
                <div className="activity-meta">
                  <span className={`badge badge-${a.status === 'completed' || a.status === 'verified' ? 'green' : a.status === 'paid' ? 'blue' : a.status === 'in-transit' ? 'orange' : 'red'}`}>
                    {a.status}
                  </span>
                  <span className="activity-time">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Top Volunteers</h3>
          <div className="leaderboard">
            {topVolunteers.map((v, i) => (
              <div key={i} className="leaderboard-item">
                <span className="leaderboard-rank">#{i + 1}</span>
                <div className="avatar avatar-sm" style={{ background: 'rgba(168,85,247,0.2)', color: '#c084fc' }}>
                  {v.avatar}
                </div>
                <div className="leaderboard-info">
                  <span className="leaderboard-name">{v.name}</span>
                  <span className="leaderboard-stat">{v.collections} collections · {v.kg} kg</span>
                </div>
                <div className="leaderboard-rating">
                  ⭐ {v.rating}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Performance */}
      <div className="card">
        <div className="card-header-row">
          <h3>Regional Performance</h3>
          <button className="btn btn-secondary btn-sm">View All</button>
        </div>
        <div style={{ height: 260 }}>
          <Bar
            data={{
              labels: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Pune', 'Hyderabad', 'Kolkata', 'Jaipur'],
              datasets: [
                {
                  label: 'Collection (tons)',
                  data: [45, 38, 42, 31, 28, 35, 22, 19],
                  backgroundColor: 'rgba(16,185,129,0.7)',
                  borderRadius: 6,
                  borderSkipped: false,
                },
                {
                  label: 'Target (tons)',
                  data: [50, 45, 40, 35, 30, 40, 25, 25],
                  backgroundColor: 'rgba(75,85,99,0.3)',
                  borderRadius: 6,
                  borderSkipped: false,
                }
              ]
            }}
            options={{
              ...chartDefaults,
              plugins: {
                ...chartDefaults.plugins,
                legend: {
                  position: 'top',
                  align: 'end',
                  labels: {
                    color: '#9ca3af',
                    padding: 16,
                    usePointStyle: true,
                    pointStyle: 'circle',
                    font: { family: 'Inter', size: 11 }
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
