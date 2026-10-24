import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../App';
import {
  Recycle, LayoutDashboard, Camera, ShoppingBag, MapPin, BarChart3,
  Truck, Award, Bell, Settings, LogOut, Menu, X, ChevronDown,
  Search, Moon, Sun, User, Sparkles, Zap, Building2, Users, Shield, Factory
} from 'lucide-react';
import toast from 'react-hot-toast';
import './DashboardLayout.css';

const getNavItems = (role) => {
  if (role === 'volunteer') {
    return [
      { path: '/dashboard/volunteer', icon: LayoutDashboard, label: 'Volunteer Console', end: true },
      { path: '/dashboard/scanner', icon: Camera, label: 'AI Camera Scanner', highlight: true },
      { path: '/dashboard/tracking', icon: MapPin, label: 'Verified Trace Ledger' },
      { path: '/dashboard/machine', icon: Factory, label: 'EcoSynthesizer' }
    ];
  }
  if (role === 'collector') {
    return [
      { path: '/dashboard/collector', icon: LayoutDashboard, label: 'Collector Worklist', end: true },
      { path: '/dashboard/pickups', icon: Truck, label: 'Dynamic Pickup Route' },
      { path: '/dashboard/scanner', icon: Camera, label: 'AI Tare Inspection', highlight: true },
      { path: '/dashboard/tracking', icon: MapPin, label: 'Delivery Manifest' }
    ];
  }
  if (role === 'recycler') {
    return [
      { path: '/dashboard/recycler', icon: LayoutDashboard, label: 'Recycler Intake Gate', end: true },
      { path: '/dashboard/machine', icon: Factory, label: 'EcoSynthesizer Plant', highlight: true },
      { path: '/dashboard/marketplace', icon: ShoppingBag, label: 'B2B Scrap Lots' },
      { path: '/dashboard/epr-credits', icon: Award, label: 'CPCB EPR Registry' }
    ];
  }
  return [
    { path: '/dashboard/admin', icon: LayoutDashboard, label: 'Master Admin Console', end: true },
    { path: '/dashboard/volunteer', icon: User, label: 'Volunteer View' },
    { path: '/dashboard/collector', icon: Truck, label: 'Collector View' },
    { path: '/dashboard/recycler', icon: Building2, label: 'Recycler Intake View' },
    { path: '/dashboard/scanner', icon: Camera, label: 'AI Scanner & Deposit', highlight: true },
    { path: '/dashboard/machine', icon: Factory, label: 'EcoSynthesizer & Recyclers' },
    { path: '/dashboard/marketplace', icon: ShoppingBag, label: 'B2B Marketplace' },
    { path: '/dashboard/tracking', icon: MapPin, label: 'MRF & Logistics' },
    { path: '/dashboard/analytics', icon: BarChart3, label: 'Impact Analytics' },
    { path: '/dashboard/epr-credits', icon: Award, label: 'CPCB EPR Registry' },
  ];
};

export default function DashboardLayout() {
  const { user, login, logout, getDashboardPath } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('ecoloop_theme') || 'light');
  const [roleSwitchOpen, setRoleSwitchOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ecoloop_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const navItems = getNavItems(user?.role || 'admin');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleQuickRoleSwitch = (newRole) => {
    const roleProfiles = {
      volunteer: { name: 'Ananya Deshmukh', role: 'volunteer', email: 'volunteer@ecoloop.in', avatar: 'AD' },
      collector: { name: 'Ramesh Kumar', role: 'collector', email: 'collector@ecoloop.in', avatar: 'RK' },
      recycler: { name: 'Reliance Circular Industries', role: 'recycler', email: 'recycler@ecoloop.in', avatar: 'RC', recyclerId: 'REC-001' },
      admin: { name: 'Priya Sharma', role: 'admin', email: 'admin@ecoloop.in', avatar: 'PS' }
    };
    const targetUser = roleProfiles[newRole] || roleProfiles.admin;
    login(targetUser);
    navigate(getDashboardPath(newRole));
    setRoleSwitchOpen(false);
    toast.success(`Switched to ${newRole.toUpperCase()} Console!`);
  };

  const roleLabels = {
    volunteer: 'Volunteer Donor',
    collector: 'Field Collector',
    recycler: 'Recycling Company',
    admin: 'Platform Admin'
  };

  return (
    <div className={`dashboard-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      
      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop mobile-only"
          onClick={() => setSidebarOpen(false)}
          title="Close menu"
        />
      )}

      {/* Sidebar - Always properly visible and styled */}
      <aside className="sidebar">
        <div className="sidebar-header" style={{ padding: '1rem 1.25rem', justifyContent: 'space-between' }}>
          <NavLink to="/" className="sidebar-logo" style={{ textDecoration: 'none' }}>
            <div className="neo-circle-btn" style={{ width: '40px', height: '40px', background: 'var(--neo-green)', color: '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Recycle size={22} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2, marginLeft: '0.65rem' }}>
              <span className="font-display" style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                Campus<span style={{ color: 'var(--neo-green-dark)' }}>Waste</span>
              </span>
              <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Smart Recovery System
              </span>
            </div>
          </NavLink>
          <button
            className="neo-circle-btn sidebar-toggle mobile-only"
            style={{ width: '32px', height: '32px', flexShrink: 0 }}
            onClick={() => setSidebarOpen(false)}
            title="Close sidebar"
          >
            <X size={15} />
          </button>
        </div>

        {/* Quick Launch Scanner Button */}
        <div style={{ padding: '0.875rem 1rem 0' }}>
          <NavLink
            to="/dashboard/scanner"
            className="neo-btn neo-btn-primary"
            style={{ width: '100%', fontSize: '0.875rem', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            onClick={() => setSidebarOpen(false)}
          >
            <Zap size={16} /> AI Camera Scanner
          </NavLink>
        </div>

        <nav className="sidebar-nav" style={{ padding: '1.25rem 1rem' }}>
          <div className="nav-section">
            <div className="nav-section-title">Core Dashboards</div>
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                style={{
                  ...(item.highlight ? { borderLeft: '3px solid var(--neo-green-dark)' } : {}),
                  justifyContent: 'flex-start',
                  padding: '0.7rem 1rem'
                }}
                title={item.label}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon size={19} style={{ flexShrink: 0 }} />
                <span style={{ fontWeight: 600 }}>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer with Quick Role Switcher */}
        <div className="sidebar-footer" style={{ padding: '1rem' }}>
          <div style={{ position: 'relative', marginBottom: '0.65rem' }}>
            <button
              className="neo-btn"
              style={{ width: '100%', fontSize: '0.8rem', padding: '0.55rem 0.85rem', justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}
              onClick={() => setRoleSwitchOpen(!roleSwitchOpen)}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield size={15} color="var(--neo-green-dark)" />
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{roleLabels[user?.role] || user?.role}</span>
              </span>
              <ChevronDown size={14} />
            </button>

            {roleSwitchOpen && (
              <div className="neo-card-sm" style={{ position: 'absolute', bottom: '110%', left: 0, right: 0, zIndex: 100, display: 'flex', flexDirection: 'column', gap: '0.35rem', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', width: '100%' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', padding: '0.2rem 0.4rem' }}>Switch Role Dashboard</div>
                {[
                  { role: 'volunteer', label: '🌱 Volunteer Console' },
                  { role: 'collector', label: '🚛 Collector Console' },
                  { role: 'recycler', label: '🏭 Recycler Portal' },
                  { role: 'admin', label: '🛡️ Admin Console' }
                ].map(r => (
                  <button
                    key={r.role}
                    className={`neo-btn ${user?.role === r.role ? 'active neo-btn-primary' : ''}`}
                    style={{ fontSize: '0.78rem', padding: '0.45rem 0.75rem', textAlign: 'left', justifyContent: 'flex-start' }}
                    onClick={() => handleQuickRoleSwitch(r.role)}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="nav-item logout-btn"
            onClick={handleLogout}
            style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--accent-red)', padding: '0.65rem 1rem' }}
            title="Sign Out"
          >
            <LogOut size={18} style={{ flexShrink: 0 }} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-wrapper">
        
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <button className="neo-circle-btn mobile-menu" style={{ width: '38px', height: '38px' }} onClick={() => setSidebarOpen(true)} title="Open navigation drawer">
              <Menu size={18} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="font-display" style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                Campus<span style={{ color: 'var(--neo-green-dark)' }}>Waste</span>
              </span>
              <span className="neo-badge neo-badge-green" style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}>
                {roleLabels[user?.role] || user?.role}
              </span>
            </div>
          </div>

          <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* Unified Role Switcher Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setRoleSwitchOpen(!roleSwitchOpen)}
                className="neo-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.8125rem',
                  fontWeight: 700
                }}
                title="Switch Dashboard Console"
              >
                <span>
                  {user?.role === 'volunteer' && '🌱 Volunteer Console'}
                  {user?.role === 'collector' && '🚛 Collector Worklist'}
                  {user?.role === 'recycler' && '🏭 Recycler Gate'}
                  {user?.role === 'admin' && '🛡️ Admin Console'}
                </span>
                <ChevronDown size={14} style={{ transform: roleSwitchOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
              </button>

              {roleSwitchOpen && (
                <div
                  className="neo-card"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    minWidth: '240px',
                    padding: '0.5rem',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.35)'
                  }}
                >
                  <div style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', padding: '0.35rem 0.5rem' }}>
                    Switch Active Console
                  </div>
                  <button
                    onClick={() => handleQuickRoleSwitch('volunteer')}
                    className={`neo-btn ${user?.role === 'volunteer' ? 'active neo-btn-primary' : ''}`}
                    style={{ justifyContent: 'flex-start', padding: '0.5rem 0.75rem', fontSize: '0.8125rem' }}
                  >
                    🌱 Volunteer (Donor Portal)
                  </button>
                  <button
                    onClick={() => handleQuickRoleSwitch('collector')}
                    className={`neo-btn ${user?.role === 'collector' ? 'active neo-btn-primary' : ''}`}
                    style={{ justifyContent: 'flex-start', padding: '0.5rem 0.75rem', fontSize: '0.8125rem' }}
                  >
                    🚛 Collector (Tare Scale &amp; Route)
                  </button>
                  <button
                    onClick={() => handleQuickRoleSwitch('recycler')}
                    className={`neo-btn ${user?.role === 'recycler' ? 'active neo-btn-primary' : ''}`}
                    style={{ justifyContent: 'flex-start', padding: '0.5rem 0.75rem', fontSize: '0.8125rem' }}
                  >
                    🏭 Recycler (Intake Inspection)
                  </button>
                  <button
                    onClick={() => handleQuickRoleSwitch('admin')}
                    className={`neo-btn ${user?.role === 'admin' ? 'active neo-btn-primary' : ''}`}
                    style={{ justifyContent: 'flex-start', padding: '0.5rem 0.75rem', fontSize: '0.8125rem' }}
                  >
                    🛡️ Admin (Audits &amp; Payouts)
                  </button>
                </div>
              )}
            </div>

            {/* Quick Action: Open AI Scanner */}
            <NavLink to="/dashboard/scanner" className="neo-btn" style={{ padding: '0.45rem 0.85rem', fontSize: '0.8125rem' }}>
              <Camera size={15} /> AI Scanner
            </NavLink>

            {/* Theme Toggle (Tactile Soft UI <-> Sleek Cyber Dark) */}
            <button
              className="neo-circle-btn"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Neomorphic Soft'} Theme`}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Notifications */}
            <button className="neo-circle-btn" onClick={() => toast('No unread regulatory notifications.', { icon: '🔔' })}>
              <Bell size={18} />
            </button>

            {/* User Pill */}
            <div
              className="header-profile neo-card-sm"
              style={{ padding: '0.35rem 0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.625rem' }}
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div
                className="avatar avatar-sm"
                style={{ background: 'var(--neo-green)', color: '#fff', fontWeight: 800, fontSize: '0.75rem' }}
              >
                {user?.avatar || 'U'}
              </div>
              <div className="header-profile-name" style={{ lineHeight: 1.2 }}>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, display: 'block' }}>{user?.name?.split(' ')[0]}</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>{roleLabels[user?.role] || user?.role}</span>
              </div>
              <ChevronDown size={14} />

              {profileOpen && (
                <div
                  className="profile-dropdown neo-card-lg"
                  style={{ position: 'absolute', top: '110%', right: 0, minWidth: '220px', zIndex: 100 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div style={{ marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    <strong>{user?.name}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{user?.email}</div>
                  </div>
                  <NavLink to="/dashboard/scanner" className="neo-btn" style={{ width: '100%', fontSize: '0.8rem', justifyContent: 'flex-start', marginBottom: '0.35rem' }}>
                    <Camera size={14} /> Open AI Scanner
                  </NavLink>
                  <button className="neo-btn" style={{ width: '100%', fontSize: '0.8rem', justifyContent: 'flex-start', color: 'var(--neo-red)' }} onClick={handleLogout}>
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
