import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../App';
import {
  Recycle, LayoutDashboard, Camera, ShoppingBag, MapPin, BarChart3,
  Truck, Award, Bell, Settings, LogOut, Menu, X, ChevronDown,
  Search, Moon, Sun, User, Sparkles, Zap, Building2, Users, Shield
} from 'lucide-react';
import toast from 'react-hot-toast';
import './DashboardLayout.css';

const getNavItems = (role) => {
  return [
    { path: `/dashboard/${role}`, icon: LayoutDashboard, label: 'Dashboard', end: true },
    { path: '/dashboard/scanner', icon: Camera, label: 'AI Scanner & Deposit', highlight: true },
    { path: '/dashboard/marketplace', icon: ShoppingBag, label: 'B2B Marketplace' },
    { path: '/dashboard/tracking', icon: MapPin, label: 'MRF & Logistics' },
    { path: '/dashboard/analytics', icon: BarChart3, label: 'Impact Analytics' },
    { path: '/dashboard/pickups', icon: Truck, label: 'Doorstep Pickups' },
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
      admin: { name: 'Priya Sharma', role: 'admin', email: 'admin@ecoloop.in', avatar: 'PS' },
      ngo: { name: 'Green Earth NGO', role: 'ngo', email: 'ngo@ecoloop.in', avatar: 'GE' },
      volunteer: { name: 'Arjun Patel', role: 'volunteer', email: 'volunteer@ecoloop.in', avatar: 'AP' },
      hostel: { name: 'IIT Delhi Hostel', role: 'hostel', email: 'hostel@ecoloop.in', avatar: 'ID' }
    };
    login(roleProfiles[newRole]);
    navigate(getDashboardPath(newRole));
    setRoleSwitchOpen(false);
    toast.success(`Switched role to ${newRole.toUpperCase()} Console!`);
  };

  const roleLabels = {
    admin: 'Platform Admin',
    ngo: 'NGO Partner',
    volunteer: 'Volunteer Agent',
    hostel: 'Hostel Manager'
  };

  return (
    <div className={`dashboard-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <NavLink to="/" className="sidebar-logo">
            <div className="neo-circle-btn" style={{ width: '38px', height: '38px', background: 'var(--neo-green)', color: '#fff' }}>
              <Recycle size={20} />
            </div>
            {sidebarOpen && (
              <span className="font-display" style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
                Eco<span style={{ color: 'var(--neo-green-dark)' }}>Loop</span>
              </span>
            )}
          </NavLink>
          <button className="neo-circle-btn sidebar-toggle" style={{ width: '34px', height: '34px' }} onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Quick Launch Scanner Button */}
        {sidebarOpen && (
          <div style={{ padding: '0.875rem 0.875rem 0' }}>
            <NavLink
              to="/dashboard/scanner"
              className="neo-btn neo-btn-primary"
              style={{ width: '100%', fontSize: '0.875rem', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              <Zap size={16} /> AI Camera Scanner
            </NavLink>
          </div>
        )}

        <nav className="sidebar-nav">
          <div className="nav-section">
            {sidebarOpen && <div className="nav-section-title">Operations Console</div>}
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                style={item.highlight ? { borderLeft: '3px solid var(--neo-green-dark)' } : {}}
              >
                <item.icon size={19} />
                {sidebarOpen && <span>{item.label}</span>}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer with Quick Role Switcher */}
        <div className="sidebar-footer">
          <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
            <button
              className="neo-btn"
              style={{ width: '100%', fontSize: '0.78rem', padding: '0.45rem', justifyContent: 'space-between' }}
              onClick={() => setRoleSwitchOpen(!roleSwitchOpen)}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Shield size={14} color="var(--neo-green-dark)" />
                {sidebarOpen ? `Role: ${roleLabels[user?.role] || user?.role}` : 'Role'}
              </span>
              {sidebarOpen && <ChevronDown size={14} />}
            </button>

            {roleSwitchOpen && (
              <div className="neo-card-sm" style={{ position: 'absolute', bottom: '105%', left: 0, right: 0, zIndex: 100, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Switch Role Dashboard</div>
                {[
                  { role: 'admin', label: 'Admin Console' },
                  { role: 'ngo', label: 'NGO Console' },
                  { role: 'volunteer', label: 'Volunteer Console' },
                  { role: 'hostel', label: 'Hostel Console' }
                ].map(r => (
                  <button
                    key={r.role}
                    className={`neo-btn ${user?.role === r.role ? 'active' : ''}`}
                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.6rem', textAlign: 'left', justifyContent: 'flex-start' }}
                    onClick={() => handleQuickRoleSwitch(r.role)}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="nav-item logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-wrapper">
        
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <button className="mobile-menu neo-circle-btn" style={{ width: '38px', height: '38px' }} onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={18} />
            </button>
            <div className="header-search neo-inset" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Search size={16} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Search polymer, CPCB lot, pickup ID..."
                style={{ width: '100%', fontSize: '0.85rem' }}
              />
            </div>
          </div>

          <div className="header-right">
            {/* Quick Action: Open AI Scanner */}
            <NavLink to="/dashboard/scanner" className="neo-btn neo-btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}>
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
