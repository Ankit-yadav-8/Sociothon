import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, AlertCircle, CheckCircle2, ArrowRight, Mail, RefreshCw, Sparkles, Award } from 'lucide-react';
import toast from 'react-hot-toast';
import { platformStore } from '../services/platformStore';
import { useAuth } from '../App';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { login, getDashboardPath } = useAuth();

  const [loading, setLoading] = useState(true);
  const [verificationResult, setVerificationResult] = useState(null);
  const [manualToken, setManualToken] = useState('');
  const [resendEmail, setResendEmail] = useState('');
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (token) {
      // Simulate verification latency
      const timer = setTimeout(() => {
        const res = platformStore.verifyEmailToken(token);
        setVerificationResult(res);
        setLoading(false);
        if (res.success) {
          toast.success('Email verified successfully! All verified features unlocked.');
        } else {
          toast.error(res.error || 'Verification failed.');
        }
      }, 900);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleManualVerify = (e) => {
    e.preventDefault();
    if (!manualToken.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const res = platformStore.verifyEmailToken(manualToken.trim());
      setVerificationResult(res);
      setLoading(false);
      if (res.success) {
        toast.success('Email verified successfully!');
      } else {
        toast.error(res.error || 'Verification failed.');
      }
    }, 600);
  };

  const handleResend = (e) => {
    e.preventDefault();
    if (!resendEmail.trim()) {
      toast.error('Please enter your email address.');
      return;
    }
    setResending(true);
    try {
      platformStore.resendVerificationEmail(resendEmail.trim());
      toast.success(`New verification link sent to ${resendEmail.trim()}!`);
      setResendEmail('');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setResending(false);
    }
  };

  const handleGoToDashboard = () => {
    if (verificationResult?.user) {
      login(verificationResult.user);
      navigate(getDashboardPath(verificationResult.user.role));
    } else {
      navigate('/dashboard/volunteer');
    }
  };

  return (
    <div className="auth-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div className="auth-bg">
        <div className="auth-orb auth-orb-1"></div>
        <div className="auth-orb auth-orb-2"></div>
      </div>

      <div className="neo-card" style={{ maxWidth: '540px', width: '100%', padding: '2.5rem', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        
        {loading ? (
          <div style={{ padding: '2rem 0' }}>
            <div className="pulse-station" style={{ width: '48px', height: '48px', margin: '0 auto 1.5rem', borderRadius: '50%', background: 'var(--accent-green)' }}></div>
            <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800 }}>
              Verifying Security Token...
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Validating single-use cryptographic token against the server registry.
            </p>
          </div>
        ) : verificationResult?.success ? (
          /* SUCCESS SCREEN */
          <div>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(46, 204, 113, 0.15)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <CheckCircle2 size={36} />
            </div>

            <h1 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.5rem' }}>
              Email Verified Successfully!
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Welcome, <strong>{verificationResult.user.name}</strong>. Your account has been verified and your permanent Volunteer ID is now active.
            </p>

            {verificationResult.user.volunteerId && (
              <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--accent-green)', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-green)', textTransform: 'uppercase' }}>
                  Your Permanent Unique Volunteer ID
                </span>
                <div style={{ fontFamily: 'monospace', fontSize: '1.35rem', fontWeight: 900, marginTop: '0.2rem' }}>
                  {verificationResult.user.volunteerId}
                </div>
              </div>
            )}

            <button
              onClick={handleGoToDashboard}
              className="neo-btn neo-btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', justifyContent: 'center' }}
            >
              Continue to Verified Dashboard <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          /* FAILURE OR MANUAL ENTRY SCREEN */
          <div>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.15)', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <AlertCircle size={36} />
            </div>

            <h1 className="font-display" style={{ fontSize: '1.65rem', fontWeight: 900, marginBottom: '0.5rem' }}>
              {token ? 'Verification Link Expired or Invalid' : 'Verify Your Email Address'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              {token
                ? verificationResult?.error || 'This single-use verification token is invalid or has expired (24-hour limit).'
                : 'Enter your verification token or request a new time-limited link below.'}
            </p>

            {/* Manual Token Entry */}
            <form onSubmit={handleManualVerify} style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, textAlign: 'left', marginBottom: '0.4rem' }}>
                Enter Verification Token
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="vtok_xxxxxxxxxxxxxxxx"
                  value={manualToken}
                  onChange={(e) => setManualToken(e.target.value)}
                  className="neo-input"
                  style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
                />
                <button type="submit" className="neo-btn neo-btn-primary" style={{ padding: '0.6rem 1rem' }}>
                  Verify
                </button>
              </div>
            </form>

            {/* Request New Link */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Need a new verification link?
              </h3>
              <form onSubmit={handleResend} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)}
                  className="neo-input"
                  style={{ fontSize: '0.85rem' }}
                  required
                />
                <button type="submit" disabled={resending} className="neo-btn" style={{ padding: '0.6rem 1rem', whiteSpace: 'nowrap' }}>
                  <Mail size={14} /> Send Link
                </button>
              </form>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <Link to="/login" style={{ fontSize: '0.85rem', color: 'var(--accent-green)', textDecoration: 'none', fontWeight: 700 }}>
                ← Return to Sign In
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
