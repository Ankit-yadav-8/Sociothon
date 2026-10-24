import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardLayout from './components/DashboardLayout';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import NGODashboard from './pages/dashboards/NGODashboard';
import VolunteerDashboard from './pages/dashboards/VolunteerDashboard';
import HostelDashboard from './pages/dashboards/HostelDashboard';
import AIScanner from './pages/AIScanner';
import Marketplace from './pages/Marketplace';
import Tracking from './pages/Tracking';
import Analytics from './pages/Analytics';
import Pickups from './pages/Pickups';
import EPRCredits from './pages/EPRCredits';

export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ecoloop_user');
    return saved ? JSON.parse(saved) : null;
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
      ngo: '/dashboard/ngo',
      volunteer: '/dashboard/volunteer',
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
          <Route path="/login" element={user ? <Navigate to={getDashboardPath(user.role)} /> : <LoginPage />} />
          <Route path="/signup" element={user ? <Navigate to={getDashboardPath(user.role)} /> : <SignupPage />} />
          
          <Route path="/dashboard" element={user ? <DashboardLayout /> : <Navigate to="/login" />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="ngo" element={<NGODashboard />} />
            <Route path="volunteer" element={<VolunteerDashboard />} />
            <Route path="hostel" element={<HostelDashboard />} />
            <Route path="scanner" element={<AIScanner />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="tracking" element={<Tracking />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="pickups" element={<Pickups />} />
            <Route path="epr-credits" element={<EPRCredits />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
