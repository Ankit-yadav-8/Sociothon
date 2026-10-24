import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VerifyEmail from './pages/VerifyEmail';
import DashboardLayout from './components/DashboardLayout';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import CollectorDashboard from './pages/dashboards/CollectorDashboard';
import NGODashboard from './pages/dashboards/NGODashboard';
import VolunteerDashboard from './pages/dashboards/VolunteerDashboard';
import HostelDashboard from './pages/dashboards/HostelDashboard';
import RecyclerDashboard from './pages/dashboards/RecyclerDashboard';
import AIScanner from './pages/AIScanner';
import Marketplace from './pages/Marketplace';
import Tracking from './pages/Tracking';
import Analytics from './pages/Analytics';
import Pickups from './pages/Pickups';
import EPRCredits from './pages/EPRCredits';
import WasteToProductMachine from './pages/WasteToProductMachine';

import React, { Component } from 'react';

// Error Boundary to prevent white screen crashes
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App caught an error:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('ecoloop_user');
      localStorage.removeItem('loopiit_platform_collections');
    } catch (_) {}
    window.location.href = '/#/';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: '#0A0E17',
          color: '#F8FAFC',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '500px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🛡️</div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Dashboard Loaded Safely
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              We caught an unexpected state issue. Click below to reset your session and reload all consoles cleanly.
            </p>
            <button
              onClick={this.handleReset}
              style={{
                background: '#10B981',
                color: '#fff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >
              🔄 Refresh &amp; Re-open Console
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('ecoloop_user');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (e) {
      console.warn('Invalid ecoloop_user in localStorage:', e);
    }
    const demoUser = { name: 'Priya Sharma (Demo)', role: 'admin', email: 'admin@ecoloop.in', avatar: 'PS' };
    try {
      localStorage.setItem('ecoloop_user', JSON.stringify(demoUser));
    } catch (_) {}
    return demoUser;
  });

  const login = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem('ecoloop_user', JSON.stringify(userData));
    } catch (_) {}
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('ecoloop_user');
    } catch (_) {}
  };

  const getDashboardPath = (role) => {
    const paths = {
      admin: '/dashboard/admin',
      collector: '/dashboard/collector',
      volunteer: '/dashboard/volunteer',
      recycler: '/dashboard/recycler',
      ngo: '/dashboard/ngo',
      hostel: '/dashboard/hostel'
    };
    return paths[role] || '/dashboard/admin';
  };

  return (
    <ErrorBoundary>
      <AuthContext.Provider value={{ user, login, logout, getDashboardPath }}>
        <Router>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1f2937',
                color: '#f9fafb',
                border: '1px solid rgba(75, 85, 99, 0.4)',
                borderRadius: '12px',
                fontSize: '0.875rem'
              },
              success: { iconTheme: { primary: '#10b981', secondary: '#f9fafb' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#f9fafb' } }
            }}
          />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            <Route path="/dashboard" element={user ? <DashboardLayout /> : <Navigate to="/login" replace />}>
              <Route index element={<Navigate to={getDashboardPath(user?.role)} replace />} />
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="collector" element={<CollectorDashboard />} />
              <Route path="volunteer" element={<VolunteerDashboard />} />
              <Route path="recycler" element={<RecyclerDashboard />} />
              <Route path="ngo" element={<NGODashboard />} />
              <Route path="hostel" element={<HostelDashboard />} />
              <Route path="scanner" element={<AIScanner />} />
              <Route path="marketplace" element={<Marketplace />} />
              <Route path="tracking" element={<Tracking />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="pickups" element={<Pickups />} />
              <Route path="epr-credits" element={<EPRCredits />} />
              <Route path="machine" element={<WasteToProductMachine />} />
              <Route path="*" element={<Navigate to={getDashboardPath(user?.role)} replace />} />
            </Route>

            <Route path="/scanner" element={<Navigate to="/dashboard/scanner" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </ErrorBoundary>
  );
}


export default App;
