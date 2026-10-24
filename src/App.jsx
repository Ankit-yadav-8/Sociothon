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

export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ecoloop_user');
    if (saved) return JSON.parse(saved);
    const demoUser = { name: 'Priya Sharma (Demo)', role: 'admin', email: 'admin@ecoloop.in', avatar: 'PS' };
    localStorage.setItem('ecoloop_user', JSON.stringify(demoUser));
    return demoUser;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('ecoloop_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecoloop_user');
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
          <Route path="/login" element={user ? <Navigate to={getDashboardPath(user.role)} /> : <LoginPage />} />
          <Route path="/signup" element={user ? <Navigate to={getDashboardPath(user.role)} /> : <SignupPage />} />
          
          <Route path="/dashboard" element={user ? <DashboardLayout /> : <Navigate to="/login" />}>
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
          </Route>

          <Route path="/scanner" element={<Navigate to="/dashboard/scanner" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
