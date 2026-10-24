import { useState, useEffect } from 'react';
import {
  MapPin, Truck, Layers, ShieldCheck, Activity, RefreshCw,
  Cpu, Radio, ArrowRight, Zap, CheckCircle2, AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Tracking() {
  const [conveyorRunning, setConveyorRunning] = useState(true);
  const [sortedCount, setSortedCount] = useState(14820);
  const [purityRate, setPurityRate] = useState(99.2);

  // Live optical sorting simulation
  useEffect(() => {
    if (!conveyorRunning) return;
    const interval = setInterval(() => {
      setSortedCount(prev => prev + 1);
    }, 1200);
    return () => clearInterval(interval);
  }, [conveyorRunning]);

  return (
    <div className="container-max" style={{ paddingBottom: '3rem' }}>
      
      {/* Header */}
      <div className="neo-card" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="neo-badge neo-badge-green">
                <Radio size={13} /> Greyparrot Multi-Spectral Optical Analyzer
              </span>
              <span className="neo-badge neo-badge-blue">
                Pneumatic Air Jet Ejection &amp; RFID Telematics
              </span>
            </div>
            <h1 className="font-display" style={{ fontSize: '1.85rem', fontWeight: 800 }}>
              MRF Optical Sorting &amp; Fleet Telematics
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Real-time conveyor belt computer vision guided pneumatic air jets, vehicle GPS tracking, and RFID bin lift verifications.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              className={`neo-btn ${conveyorRunning ? 'neo-btn-primary' : ''}`}
              onClick={() => {
                setConveyorRunning(!conveyorRunning);
                toast(conveyorRunning ? 'Conveyor line paused.' : 'High-speed conveyor started at 2.4 m/s.');
              }}
            >
              {conveyorRunning ? 'Pause Conveyor' : 'Start Conveyor (2.4 m/s)'}
            </button>
          </div>
        </div>

        {/* Live Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-green)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Items Sorted Today</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-green-dark)', marginTop: '0.25rem' }}>
              {sortedCount.toLocaleString()}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Throughput: 84 items/minute</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-blue)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Optical Purity Index</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-blue)', marginTop: '0.25rem' }}>
              {purityRate}%
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Contamination &lt;0.8%</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-orange)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Pneumatic Jet Solenoids</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-orange)', marginTop: '0.25rem' }}>
              128 Valves Active
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Air pressure: 6.2 bar</span>
          </div>

          <div className="neo-card-sm" style={{ borderLeft: '4px solid var(--neo-purple)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Active Fleet Trucks</div>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neo-purple)', marginTop: '0.25rem' }}>
              18 / 20 En Route
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>GPS telematics linked</span>
          </div>
        </div>
      </div>

      {/* Conveyor Visualizer */}
      <div className="neo-card" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={20} color="var(--neo-green-dark)" />
            Conveyor Belt Optical Sorter Simulation (MRF Okhla Station #02)
          </h2>
          <span className="neo-badge neo-badge-green">
            Line Speed: 2.4 m/sec
          </span>
        </div>

        <div
          className="neo-inset"
          style={{
            position: 'relative',
            height: '160px',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            background: '#0B1118',
            display: 'flex',
            alignItems: 'center',
            padding: '0 2rem'
          }}
        >
          {/* Moving Conveyor Lines */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'repeating-linear-gradient(90deg, #121A24, #121A24 40px, #17222F 40px, #17222F 80px)',
              animation: conveyorRunning ? 'shimmer 2s linear infinite' : 'none',
              opacity: 0.8
            }}
          ></div>

          {/* Overhead Multi-Spectral Camera Rig */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '42%',
              padding: '4px 14px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(46, 204, 113, 0.2)',
              border: '1px solid var(--neo-green)',
              color: 'var(--neo-green)',
              fontSize: '0.72rem',
              fontWeight: 700,
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Activity size={12} /> Overhead Optical Sensor Array Active
          </div>

          {/* Target Ejection Zones */}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: 'relative', zIndex: 5 }}>
            {[
              { label: 'Ejection Zone 1 (PET Bottles)', count: '4,820 kg', color: '#2ECC71' },
              { label: 'Ejection Zone 2 (HDPE Jugs)', count: '3,410 kg', color: '#3498DB' },
              { label: 'Ejection Zone 3 (Multilayer MLP)', count: '2,190 kg', color: '#E67E22' },
              { label: 'Residual Stream (Inert)', count: '840 kg', color: '#95A5A6' },
            ].map((zone, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  background: 'rgba(10, 15, 24, 0.9)',
                  border: `1.5px solid ${zone.color}`,
                  textAlign: 'center',
                  minWidth: '150px'
                }}
              >
                <div style={{ fontSize: '0.7rem', color: zone.color, fontWeight: 700 }}>{zone.label}</div>
                <strong style={{ fontSize: '1rem', color: '#FFFFFF' }}>{zone.count}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fleet Telematics Live GPS Grid */}
      <div className="neo-card">
        <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
          Municipal Fleet Telematics &amp; RFID Bin Lift Verification
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {[
            { id: 'TRK-01 (EV Tipper)', driver: 'Vikram Singh', route: 'Sector 15-22 Noida', progress: '84%', rfidScans: 48, status: 'On Route' },
            { id: 'TRK-04 (Compactor)', driver: 'Deepak Verma', route: 'South Delhi Ward 12', progress: '92%', rfidScans: 64, status: 'Discharging at MRF' },
            { id: 'TRK-09 (Organic Van)', driver: 'Manoj Kumar', route: 'CyberCity Hubs', progress: '65%', rfidScans: 31, status: 'On Route' }
          ].map((truck, idx) => (
            <div key={idx} className="neo-card-sm">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <strong style={{ fontSize: '0.9375rem' }}>{truck.id}</strong>
                <span className="neo-badge neo-badge-green" style={{ fontSize: '0.7rem' }}>{truck.status}</span>
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Driver: <strong>{truck.driver}</strong> • Route: <strong>{truck.route}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.35rem' }}>
                <span>RFID Verified Bins: {truck.rfidScans}</span>
                <span>Route Completed: {truck.progress}</span>
              </div>
              <div className="neo-progress-track">
                <div className="neo-progress-fill" style={{ width: truck.progress }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
