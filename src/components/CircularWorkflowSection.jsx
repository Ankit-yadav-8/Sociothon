import { useState, useEffect } from 'react';
import {
  User, Truck, Settings, Factory, Trash2, Leaf, Check,
  Play, Pause, RotateCcw, ArrowRight, ShieldCheck, Sparkles, CheckCircle2
} from 'lucide-react';
import toast from 'react-hot-toast';
import './CircularWorkflowSection.css';

// 3D Visual Assets matching the reference design
import earthCenterImg from '../assets/workflow/earth_center.jpg';
import volunteerImg from '../assets/workflow/volunteer.jpg';
import collectorImg from '../assets/workflow/collector.jpg';
import adminImg from '../assets/workflow/admin.jpg';
import recyclerImg from '../assets/workflow/recycler.jpg';

const WORKFLOW_STAGES = [
  {
    id: 'volunteer',
    role: 'Volunteer',
    accentColor: '#10B981',
    badgeIcon: User,
    img: volunteerImg,
    headline: 'Collects and provides segregated waste with unique volunteer ID.',
    checks: [
      'Provides waste details',
      'Gets confirmation',
      'Earns rewards'
    ],
    flowStepNumber: '1',
    flowTitle: '1. Waste Handover',
    flowDesc: 'Volunteer provides segregated waste to the collector.',
    flowIcon: Trash2,
    flowIconColor: '#10B981',
    statusLabel: 'Awaiting Volunteer Confirmation',
    demoDetail: 'Volunteer Priya (ID: VOL-8842) deposited 2.4kg PET Clear Bottles via AI Camera Scanner.'
  },
  {
    id: 'collector',
    role: 'Collector',
    accentColor: '#3B82F6',
    badgeIcon: Truck,
    img: collectorImg,
    headline: 'Verifies, updates and approves the collected waste in the system.',
    checks: [
      'Updates waste type & weight',
      'Sends message to volunteer',
      'Gets admin approval'
    ],
    flowStepNumber: '2',
    flowTitle: '2. Data Verification',
    flowDesc: 'Collector updates the details and sends them to the admin for approval.',
    flowIcon: Settings,
    flowIconColor: '#3B82F6',
    statusLabel: 'Pending Admin Approval',
    demoDetail: 'Collector Ramesh K. verified gross weight: 2.45kg on digital tare scale, route node verified.'
  },
  {
    id: 'admin',
    role: 'Admin',
    accentColor: '#8B5CF6',
    badgeIcon: Settings,
    img: adminImg,
    headline: 'Reviews, verifies and approves the collected waste and updates the system.',
    checks: [
      'Checks all details',
      'Approves the collection',
      'Notifies the recycling company'
    ],
    flowStepNumber: '3',
    flowTitle: '3. Transfer to Recycling',
    flowDesc: 'Approved waste is sent to the recycling company for processing.',
    flowIcon: Factory,
    flowIconColor: '#8B5CF6',
    statusLabel: 'Approved for Recycling',
    demoDetail: 'Master Admin verified SHA-256 hash chain and approved lot dispatch to Reliance Recycler.'
  },
  {
    id: 'recycler',
    role: 'Recycling Company',
    accentColor: '#F59E0B',
    badgeIcon: Factory,
    img: recyclerImg,
    headline: 'Processes the waste and converts it into reusable products.',
    checks: [
      'Receives approved waste',
      'Processes and recycles',
      'Provides confirmation'
    ],
    flowStepNumber: '4',
    flowTitle: '4. Impact & Reward',
    flowDesc: 'Recycled material creates value and supports a cleaner environment.',
    flowIcon: Leaf,
    flowIconColor: '#F59E0B',
    statusLabel: 'Recycling Completed & Rewarded',
    demoDetail: 'Reliance Circular intake inspected 96.2% purity: ₹37.20 instant UPI settled, 5.04 kg CO₂e saved.'
  }
];

export default function CircularWorkflowSection() {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-advancing continuous workflow cycle
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStageIdx(prev => (prev + 1) % WORKFLOW_STAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentStage = WORKFLOW_STAGES[activeStageIdx];

  const handleStageClick = (idx) => {
    setActiveStageIdx(idx);
    toast(`Stage ${idx + 1}: ${WORKFLOW_STAGES[idx].role} — ${WORKFLOW_STAGES[idx].statusLabel}`, {
      icon: idx === 0 ? '🌱' : idx === 1 ? '🚛' : idx === 2 ? '🛡️' : '🏭'
    });
  };

  const handleReplay = () => {
    setActiveStageIdx(0);
    setIsPlaying(true);
    toast.success('Workflow cycle restarted from Volunteer Handover!');
  };

  return (
    <section className="circular-workflow-section" id="circular-journey-workflow">
      
      {/* Background dashed concentric aesthetic rings */}
      <div className="workflow-bg-rings" />

      {/* Top Header Row matching reference design */}
      <div className="workflow-header-row">
        <div className="workflow-headline-box">
          <h2 className="workflow-main-title">
            Together for a <br />
            <span className="gradient-text">Cleaner Tomorrow</span>
          </h2>
          <p className="workflow-subtitle">
            A smart waste management ecosystem that connects volunteers, collectors, 
            admins and recycling companies for a sustainable future.
          </p>
        </div>

        {/* Top-Right Eco Badge */}
        <div className="workflow-eco-pill">
          <Leaf size={22} color="#10B981" />
          <div>
            <span className="pill-title">Reduce • Reuse • Recycle</span>
            <span className="pill-sub">Small actions. Big impact.</span>
          </div>
        </div>
      </div>

      {/* Live Flow Controller Bar */}
      <div className="workflow-controller-bar">
        <div className="controller-status-tag">
          <span 
            className="controller-status-dot" 
            style={{ background: currentStage.accentColor, boxShadow: `0 0 10px ${currentStage.accentColor}` }} 
          />
          <span>
            Stage {activeStageIdx + 1} of 4: <strong>{currentStage.role}</strong> &bull;{' '}
            <span style={{ color: currentStage.accentColor }}>{currentStage.statusLabel}</span>
          </span>
        </div>

        <div className="controller-btns-group">
          {WORKFLOW_STAGES.map((stg, i) => (
            <button
              key={stg.id}
              className={`modern-btn ${activeStageIdx === i ? 'modern-btn-primary' : ''}`}
              style={{
                fontSize: '0.75rem',
                padding: '0.35rem 0.75rem',
                background: activeStageIdx === i ? stg.accentColor : undefined,
                color: activeStageIdx === i ? '#FFFFFF' : undefined,
                borderColor: activeStageIdx === i ? stg.accentColor : undefined
              }}
              onClick={() => handleStageClick(i)}
            >
              {i + 1}. {stg.role}
            </button>
          ))}

          <button
            className="modern-btn"
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause auto cycle' : 'Resume auto cycle'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            className="modern-btn"
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
            onClick={handleReplay}
            title="Restart from Stage 1"
          >
            <RotateCcw size={14} />
            <span>Replay</span>
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          CIRCULAR WORKFLOW CANVAS (DESKTOP)
          ═══════════════════════════════════════════════════════════ */}
      <div className="circular-canvas-container">
        
        {/* SVG Directional Curved Arrows and Traveling Light Particles */}
        <svg className="circular-svg-overlay" viewBox="0 0 980 980">
          <defs>
            {/* Arrowhead Markers */}
            <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
            </marker>
            <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#3B82F6" />
            </marker>
            <marker id="arrow-purple" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#8B5CF6" />
            </marker>
            <marker id="arrow-orange" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#F59E0B" />
            </marker>
          </defs>

          {/* Background Outer Guide Circle */}
          <circle cx="490" cy="490" r="330" fill="none" stroke="rgba(16, 185, 129, 0.12)" strokeWidth="2" strokeDasharray="6 6" />

          {/* Arc 1: Volunteer (Top) → Collector (Right) */}
          <path
            id="arc-path-1"
            d="M 570 170 A 330 330 0 0 1 810 410"
            fill="none"
            stroke="#10B981"
            strokeWidth={activeStageIdx === 0 ? "4.5" : "3"}
            strokeDasharray={activeStageIdx === 0 ? "none" : "8 5"}
            markerEnd="url(#arrow-green)"
            style={{ filter: activeStageIdx === 0 ? 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))' : 'none', transition: 'all 0.3s ease' }}
          />

          {/* Arc 2: Collector (Right) → Admin (Bottom) */}
          <path
            id="arc-path-2"
            d="M 810 570 A 330 330 0 0 1 570 810"
            fill="none"
            stroke="#3B82F6"
            strokeWidth={activeStageIdx === 1 ? "4.5" : "3"}
            strokeDasharray={activeStageIdx === 1 ? "none" : "8 5"}
            markerEnd="url(#arrow-blue)"
            style={{ filter: activeStageIdx === 1 ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))' : 'none', transition: 'all 0.3s ease' }}
          />

          {/* Arc 3: Admin (Bottom) → Recycler (Left) */}
          <path
            id="arc-path-3"
            d="M 410 810 A 330 330 0 0 1 170 570"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth={activeStageIdx === 2 ? "4.5" : "3"}
            strokeDasharray={activeStageIdx === 2 ? "none" : "8 5"}
            markerEnd="url(#arrow-purple)"
            style={{ filter: activeStageIdx === 2 ? 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))' : 'none', transition: 'all 0.3s ease' }}
          />

          {/* Arc 4: Recycler (Left) → Volunteer (Top) */}
          <path
            id="arc-path-4"
            d="M 170 410 A 330 330 0 0 1 410 170"
            fill="none"
            stroke="#F59E0B"
            strokeWidth={activeStageIdx === 3 ? "4.5" : "3"}
            strokeDasharray={activeStageIdx === 3 ? "none" : "8 5"}
            markerEnd="url(#arrow-orange)"
            style={{ filter: activeStageIdx === 3 ? 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))' : 'none', transition: 'all 0.3s ease' }}
          />

          {/* Continuously Travelling Glowing Flow Particles */}
          <circle r="6" fill="#10B981" filter="drop-shadow(0 0 6px #10B981)">
            <animateMotion repeatCount="indefinite" dur="3.2s">
              <mpath href="#arc-path-1" />
            </animateMotion>
          </circle>

          <circle r="6" fill="#3B82F6" filter="drop-shadow(0 0 6px #3B82F6)">
            <animateMotion repeatCount="indefinite" dur="3.2s">
              <mpath href="#arc-path-2" />
            </animateMotion>
          </circle>

          <circle r="6" fill="#8B5CF6" filter="drop-shadow(0 0 6px #8B5CF6)">
            <animateMotion repeatCount="indefinite" dur="3.2s">
              <mpath href="#arc-path-3" />
            </animateMotion>
          </circle>

          <circle r="6" fill="#F59E0B" filter="drop-shadow(0 0 6px #F59E0B)">
            <animateMotion repeatCount="indefinite" dur="3.2s">
              <mpath href="#arc-path-4" />
            </animateMotion>
          </circle>
        </svg>

        {/* Center Sustainability Hub */}
        <div className="workflow-center-hub">
          <div className="center-earth-image-wrapper">
            <img src={earthCenterImg} alt="The Circular Journey" className="center-earth-img" />
          </div>
          <h3 className="center-title">The Circular Journey</h3>
          <p className="center-subtitle">From Waste to a Better Planet</p>
          <div className="center-accent-line" />
        </div>

        {/* ═══════════════════════════════════════════════════════════
            CARD 1: VOLUNTEER (TOP)
            ═══════════════════════════════════════════════════════════ */}
        <div 
          className={`role-workflow-card pos-top ${activeStageIdx === 0 ? 'active-stage' : ''}`}
          style={{ borderColor: activeStageIdx === 0 ? '#10B981' : 'transparent' }}
          onClick={() => handleStageClick(0)}
        >
          <div className="role-card-badge" style={{ background: '#10B981' }}>
            <User size={22} />
          </div>
          <div className="role-card-img-wrapper">
            <img src={volunteerImg} alt="Volunteer" className="role-card-img" />
          </div>
          <div className="role-card-body">
            <h4 className="role-card-title">Volunteer</h4>
            <p className="role-card-desc">Collects and provides segregated waste with unique volunteer ID.</p>
            <div className="role-checkmarks-list">
              <div className="role-check-item">
                <span className="check-icon-circle" style={{ background: '#10B981' }}><Check size={11} /></span>
                <span>Provides waste details</span>
              </div>
              <div className="role-check-item">
                <span className="check-icon-circle" style={{ background: '#10B981' }}><Check size={11} /></span>
                <span>Gets confirmation</span>
              </div>
              <div className="role-check-item">
                <span className="check-icon-circle" style={{ background: '#10B981' }}><Check size={11} /></span>
                <span>Earns rewards</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            CARD 2: COLLECTOR (RIGHT)
            ═══════════════════════════════════════════════════════════ */}
        <div 
          className={`role-workflow-card pos-right ${activeStageIdx === 1 ? 'active-stage' : ''}`}
          style={{ borderColor: activeStageIdx === 1 ? '#3B82F6' : 'transparent' }}
          onClick={() => handleStageClick(1)}
        >
          <div className="role-card-badge" style={{ background: '#3B82F6' }}>
            <Truck size={22} />
          </div>
          <div className="role-card-img-wrapper">
            <img src={collectorImg} alt="Collector" className="role-card-img" />
          </div>
          <div className="role-card-body">
            <h4 className="role-card-title">Collector</h4>
            <p className="role-card-desc">Verifies, updates and approves the collected waste in the system.</p>
            <div className="role-checkmarks-list">
              <div className="role-check-item">
                <span className="check-icon-circle" style={{ background: '#3B82F6' }}><Check size={11} /></span>
                <span>Updates waste type &amp; weight</span>
              </div>
              <div className="role-check-item">
                <span className="check-icon-circle" style={{ background: '#3B82F6' }}><Check size={11} /></span>
                <span>Sends message to volunteer</span>
              </div>
              <div className="role-check-item">
                <span className="check-icon-circle" style={{ background: '#3B82F6' }}><Check size={11} /></span>
                <span>Gets admin approval</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            CARD 3: ADMIN (BOTTOM)
            ═══════════════════════════════════════════════════════════ */}
        <div 
          className={`role-workflow-card pos-bottom ${activeStageIdx === 2 ? 'active-stage' : ''}`}
          style={{ borderColor: activeStageIdx === 2 ? '#8B5CF6' : 'transparent' }}
          onClick={() => handleStageClick(2)}
        >
          <div className="role-card-badge" style={{ background: '#8B5CF6' }}>
            <Settings size={22} />
          </div>
          <div className="role-card-img-wrapper">
            <img src={adminImg} alt="Admin" className="role-card-img" />
          </div>
          <div className="role-card-body">
            <h4 className="role-card-title">Admin</h4>
            <p className="role-card-desc">Reviews, verifies and approves the collected waste and updates the system.</p>
            <div className="role-checkmarks-list">
              <div className="role-check-item">
                <span className="check-icon-circle" style={{ background: '#8B5CF6' }}><Check size={11} /></span>
                <span>Checks all details</span>
              </div>
              <div className="role-check-item">
                <span className="check-icon-circle" style={{ background: '#8B5CF6' }}><Check size={11} /></span>
                <span>Approves the collection</span>
              </div>
              <div className="role-check-item">
                <span className="check-icon-circle" style={{ background: '#8B5CF6' }}><Check size={11} /></span>
                <span>Notifies the recycling company</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            CARD 4: RECYCLING COMPANY (LEFT)
            ═══════════════════════════════════════════════════════════ */}
        <div 
          className={`role-workflow-card pos-left ${activeStageIdx === 3 ? 'active-stage' : ''}`}
          style={{ borderColor: activeStageIdx === 3 ? '#F59E0B' : 'transparent' }}
          onClick={() => handleStageClick(3)}
        >
          <div className="role-card-badge" style={{ background: '#F59E0B' }}>
            <Factory size={22} />
          </div>
          <div className="role-card-img-wrapper">
            <img src={recyclerImg} alt="Recycling Company" className="role-card-img" />
          </div>
          <div className="role-card-body">
            <h4 className="role-card-title">Recycling Company</h4>
            <p className="role-card-desc">Processes the waste and converts it into reusable products.</p>
            <div className="role-checkmarks-list">
              <div className="role-check-item">
                <span className="check-icon-circle" style={{ background: '#F59E0B' }}><Check size={11} /></span>
                <span>Receives approved waste</span>
              </div>
              <div className="role-check-item">
                <span className="check-icon-circle" style={{ background: '#F59E0B' }}><Check size={11} /></span>
                <span>Processes and recycles</span>
              </div>
              <div className="role-check-item">
                <span className="check-icon-circle" style={{ background: '#F59E0B' }}><Check size={11} /></span>
                <span>Provides confirmation</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            4 INTERMEDIATE FLOW CALLOUTS
            ═══════════════════════════════════════════════════════════ */}
        {/* Stage 1: Top-Right */}
        <div className="flow-stage-callout stage-1">
          <div className="flow-stage-badge-row">
            <div className="flow-stage-icon-badge" style={{ background: '#10B981' }}>
              <Trash2 size={16} />
            </div>
            <h5 className="flow-stage-title">1. Waste Handover</h5>
          </div>
          <p className="flow-stage-desc">Volunteer provides segregated waste to the collector.</p>
        </div>

        {/* Stage 2: Bottom-Right */}
        <div className="flow-stage-callout stage-2">
          <div className="flow-stage-badge-row">
            <div className="flow-stage-icon-badge" style={{ background: '#3B82F6' }}>
              <Settings size={16} />
            </div>
            <h5 className="flow-stage-title">2. Data Verification</h5>
          </div>
          <p className="flow-stage-desc">Collector updates the details and sends them to the admin for approval.</p>
        </div>

        {/* Stage 3: Bottom-Left */}
        <div className="flow-stage-callout stage-3">
          <div className="flow-stage-badge-row">
            <div className="flow-stage-icon-badge" style={{ background: '#8B5CF6' }}>
              <Factory size={16} />
            </div>
            <h5 className="flow-stage-title">3. Transfer to Recycling</h5>
          </div>
          <p className="flow-stage-desc">Approved waste is sent to the recycling company for processing.</p>
        </div>

        {/* Stage 4: Top-Left */}
        <div className="flow-stage-callout stage-4">
          <div className="flow-stage-badge-row">
            <div className="flow-stage-icon-badge" style={{ background: '#F59E0B' }}>
              <Leaf size={16} />
            </div>
            <h5 className="flow-stage-title">4. Impact &amp; Reward</h5>
          </div>
          <p className="flow-stage-desc">Recycled material creates value and supports a cleaner environment.</p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          MOBILE / TABLET VERTICAL TIMELINE (≤ 992px)
          ═══════════════════════════════════════════════════════════ */}
      <div className="mobile-vertical-workflow">
        <div className="mobile-vertical-track" />
        
        {WORKFLOW_STAGES.map((stg, i) => {
          const BadgeIcon = stg.badgeIcon;
          return (
            <div key={stg.id} className="mobile-card-row">
              <div className="mobile-role-badge-anchor" style={{ background: stg.accentColor }}>
                <BadgeIcon size={20} />
              </div>
              <div 
                className="mobile-role-card" 
                style={{ borderColor: activeStageIdx === i ? stg.accentColor : 'transparent' }}
                onClick={() => handleStageClick(i)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <img 
                    src={stg.img} 
                    alt={stg.role} 
                    style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }} 
                  />
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: stg.accentColor, textTransform: 'uppercase' }}>
                      Stage {i + 1}
                    </span>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>{stg.role}</h4>
                  </div>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  {stg.headline}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {stg.checks.map((c, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                      <span style={{ width: '15px', height: '15px', borderRadius: '50%', background: stg.accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.6rem' }}>✓</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Footer Row matching reference design */}
      <div className="workflow-footer-row">
        <div className="handwritten-motto">
          Less Waste<br />More Value
        </div>

        <div className="workflow-slogan-pill">
          <Leaf size={18} color="#10B981" />
          <span>Smart Waste Management for a Sustainable Future</span>
        </div>
      </div>
    </section>
  );
}
