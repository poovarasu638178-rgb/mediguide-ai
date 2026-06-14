import React, { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   COLOR TOKENS
   Primary Dark  : #035352  (Authentic Teal)
   Accent Warm   : #F3E8BC  (Sidecar Yellow)
───────────────────────────────────────────── */

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --teal-900: #011f1f;
      --teal-800: #022b2b;
      --teal-700: #035352;
      --teal-600: #046a69;
      --teal-500: #058584;
      --teal-400: #2aa5a4;
      --yellow:   #F3E8BC;
      --yellow-dim: rgba(243,232,188,0.12);
      --yellow-muted: rgba(243,232,188,0.55);
      --glass: rgba(3,83,82,0.45);
      --glass-border: rgba(243,232,188,0.15);
      --red: #e05252;
      --green: #4ecca3;
      --radius: 14px;
      --radius-sm: 8px;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--teal-900);
      color: var(--yellow);
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      line-height: 1.6;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* Animated background mesh */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background:
        radial-gradient(ellipse 80% 60% at 10% 10%, rgba(5,133,132,0.18) 0%, transparent 60%),
        radial-gradient(ellipse 60% 80% at 90% 90%, rgba(3,83,82,0.25) 0%, transparent 60%),
        radial-gradient(ellipse 50% 50% at 50% 50%, rgba(243,232,188,0.03) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }

    #root { position: relative; z-index: 1; }

    /* ── Typography ── */
    h1 { font-family: 'DM Serif Display', serif; font-size: 30px; font-weight: 400; color: var(--yellow); letter-spacing: -0.3px; }
    h2 { font-family: 'DM Serif Display', serif; font-size: 20px; font-weight: 400; color: var(--yellow); margin-bottom: 18px; }
    h3 { font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--yellow-muted); margin-bottom: 14px; }

    /* ── Glass Card ── */
    .card {
      background: var(--glass);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius);
      padding: 28px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      transition: border-color 0.3s;
    }
    .card:hover { border-color: rgba(243,232,188,0.25); }

    /* ── Label ── */
    .label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      color: var(--yellow-muted);
      display: block;
      margin-bottom: 8px;
    }

    /* ── Input ── */
    .input-field {
      width: 100%;
      background: rgba(1,31,31,0.7);
      border: 1px solid rgba(243,232,188,0.18);
      color: var(--yellow);
      border-radius: var(--radius-sm);
      padding: 11px 14px;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      outline: none;
      transition: border-color 0.25s, box-shadow 0.25s;
    }
    .input-field::placeholder { color: rgba(243,232,188,0.3); }
    .input-field:focus {
      border-color: rgba(243,232,188,0.55);
      box-shadow: 0 0 0 3px rgba(243,232,188,0.07);
    }
    select.input-field option { background: #022b2b; }

    /* ── Checkbox ── */
    .check-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      border-radius: var(--radius-sm);
      border: 1px solid rgba(243,232,188,0.1);
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s;
      user-select: none;
      font-size: 13px;
      color: var(--yellow);
    }
    .check-row:hover { background: rgba(243,232,188,0.06); border-color: rgba(243,232,188,0.25); }
    .check-row input[type=checkbox] { accent-color: var(--teal-400); width: 15px; height: 15px; flex-shrink: 0; }

    /* ── Primary Button ── */
    .btn-primary {
      width: 100%;
      background: var(--yellow);
      color: var(--teal-900);
      border: none;
      border-radius: var(--radius-sm);
      padding: 14px 20px;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.04em;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
      position: relative;
      overflow: hidden;
    }
    .btn-primary::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
      opacity: 0;
      transition: opacity 0.2s;
    }
    .btn-primary:hover:not(:disabled)::after { opacity: 1; }
    .btn-primary:hover:not(:disabled) { background: #fdf5d5; box-shadow: 0 8px 32px rgba(243,232,188,0.25); transform: translateY(-1px); }
    .btn-primary:active:not(:disabled) { transform: translateY(0); }
    .btn-primary:disabled { background: rgba(243,232,188,0.15); color: rgba(243,232,188,0.35); cursor: not-allowed; }

    /* ── Spinner ── */
    .spinner {
      width: 17px; height: 17px;
      border: 2px solid rgba(3,83,82,0.4);
      border-top-color: var(--teal-900);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      flex-shrink: 0;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── Pulse dot ── */
    .pulse-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: var(--green);
      animation: pulse 1.8s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.6); opacity: 0.5; }
    }

    /* ── Top banner ── */
    .top-banner {
      background: linear-gradient(90deg, var(--teal-800) 0%, var(--teal-700) 50%, var(--teal-800) 100%);
      border-bottom: 1px solid rgba(243,232,188,0.12);
      padding: 9px 16px;
      text-align: center;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.06em;
      color: var(--yellow-muted);
      text-transform: uppercase;
    }

    /* ── Header ── */
    .site-header {
      padding: 22px 40px;
      border-bottom: 1px solid rgba(243,232,188,0.1);
      background: rgba(1,31,31,0.8);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    /* ── Step tracker ── */
    .step-item {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 12px 0;
      border-bottom: 1px solid rgba(243,232,188,0.07);
      transition: opacity 0.4s;
    }
    .step-item:last-child { border-bottom: none; }
    .step-icon {
      width: 32px; height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 13px;
      font-weight: 700;
    }
    .step-icon.done { background: rgba(78,204,163,0.15); color: var(--green); border: 1px solid rgba(78,204,163,0.3); }
    .step-icon.active { background: rgba(243,232,188,0.12); color: var(--yellow); border: 1px solid rgba(243,232,188,0.3); animation: stepPulse 1.2s ease-in-out infinite; }
    .step-icon.pending { background: rgba(243,232,188,0.05); color: rgba(243,232,188,0.25); border: 1px solid rgba(243,232,188,0.1); }
    @keyframes stepPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(243,232,188,0.2); }
      50% { box-shadow: 0 0 0 6px rgba(243,232,188,0); }
    }

    /* ── Result blocks ── */
    .result-block {
      background: rgba(1,31,31,0.5);
      border: 1px solid rgba(243,232,188,0.12);
      border-radius: var(--radius-sm);
      padding: 18px 20px;
      margin-bottom: 12px;
      transition: border-color 0.25s;
    }
    .result-block:last-child { margin-bottom: 0; }
    .result-block:hover { border-color: rgba(243,232,188,0.25); }
    .result-block.accent { border-left: 3px solid var(--yellow); border-color: rgba(243,232,188,0.25); }
    .result-block.success { border-left: 3px solid var(--green); }
    .result-block.danger  { border-left: 3px solid var(--red); }

    /* ── Emergency banner ── */
    .emergency-banner {
      background: rgba(224,82,82,0.1);
      border: 1px solid rgba(224,82,82,0.4);
      border-radius: var(--radius-sm);
      padding: 16px 20px;
      display: flex;
      gap: 14px;
      align-items: flex-start;
      margin-bottom: 22px;
      animation: fadeSlideDown 0.4s ease-out;
    }

    /* ── Animations ── */
    @keyframes fadeSlideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .anim-up { animation: fadeSlideUp 0.45s ease-out both; }
    .anim-up-1 { animation-delay: 0.05s; }
    .anim-up-2 { animation-delay: 0.12s; }
    .anim-up-3 { animation-delay: 0.20s; }

    /* ── Empty state ── */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-height: 500px;
      gap: 16px;
      text-align: center;
      color: rgba(243,232,188,0.35);
    }

    /* ── Citation item ── */
    .citation-item {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      padding: 14px 0;
      border-bottom: 1px solid rgba(243,232,188,0.08);
    }
    .citation-item:last-child { border-bottom: none; padding-bottom: 0; }

    /* ── Number badge ── */
    .num-badge {
      width: 26px; height: 26px;
      border-radius: 50%;
      background: rgba(243,232,188,0.1);
      border: 1px solid rgba(243,232,188,0.2);
      color: var(--yellow-muted);
      font-size: 11px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
    }

    /* ── Divider ── */
    .divider {
      height: 1px;
      background: rgba(243,232,188,0.08);
      margin: 20px 0;
    }

    /* ── Tag ── */
    .tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(243,232,188,0.1);
      border: 1px solid rgba(243,232,188,0.2);
      border-radius: 100px;
      padding: 3px 10px;
      font-size: 11px;
      font-weight: 600;
      color: var(--yellow-muted);
      letter-spacing: 0.04em;
    }

    /* ── Scrollbar ── */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(243,232,188,0.15); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(243,232,188,0.3); }
  `}</style>
);

/* ── Icons ── */
const MedCrossIcon = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <rect x="1" y="1" width="50" height="50" rx="14" stroke="rgba(243,232,188,0.15)" strokeWidth="1.5"/>
    <rect x="20" y="10" width="12" height="32" rx="4" fill="rgba(243,232,188,0.12)"/>
    <rect x="10" y="20" width="32" height="12" rx="4" fill="rgba(243,232,188,0.12)"/>
  </svg>
);

const CheckSvg = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const SpinnerSvg = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{animation:'spin 0.9s linear infinite'}}>
    <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
    <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
  </svg>
);

const AlertSvg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e05252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const FileSvg = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(243,232,188,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

const ArrowSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const BrainSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(243,232,188,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.04-4.69A2 2 0 0 1 4 12a2 2 0 0 1 2-2 2.5 2.5 0 0 1 3.5-3.5z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.04-4.69A2 2 0 0 0 20 12a2 2 0 0 0-2-2 2.5 2.5 0 0 0-3.5-3.5z"/>
  </svg>
);

/* ── Main App ── */
export default function App() {
  const [formData, setFormData] = useState({
    age: '', gender: '', location: '', symptoms: '',
    resources: { lab: false, imaging: false, iv: false, specialist: false }
  });
  const [status, setStatus] = useState('idle'); // idle | analyzing | success
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const resultsRef = useRef(null);

  const analysisSteps = [
    'Validating patient demographics',
    'Parsing symptom presentation',
    'Cross-referencing clinical guidelines',
    'Formulating differential diagnosis',
    'Generating resource-adapted plan',
  ];

  useEffect(() => {
    if (status === 'analyzing') {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        if (i < analysisSteps.length) setLoadingStep(i);
        else clearInterval(iv);
      }, 900);
      return () => clearInterval(iv);
    }
  }, [status]);

  useEffect(() => {
    if (status === 'success' && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [status]);

  const handleInput = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleCheck = e => setFormData({ ...formData, resources: { ...formData.resources, [e.target.name]: e.target.checked } });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.symptoms) return;
    setStatus('analyzing');
    setLoadingStep(0);
    setResult(null);
    setError(null);
    try {
      const res = await fetch('https://literate-space-giggle-g4vq4v4xp7xrfp74r-8000.app.github.dev/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: formData.age, gender: formData.gender,
          location: formData.location, symptoms: formData.symptoms,
          resources: formData.resources
        })
      });
      const data = await res.json();
      setResult(data);
      setStatus('success');
    } catch (err) {
      setError('Failed to connect to agent. Please ensure the backend is running.');
      setStatus('idle');
    }
  };

  const isAnalyzing = status === 'analyzing';
  const isSuccess   = status === 'success';

  return (
    <>
      <GlobalStyles />

      {/* Top Banner */}
      <div className="top-banner">
        🏥 &nbsp; Microsoft Agents League Hackathon 2026 &nbsp; · &nbsp; Built with Azure AI Foundry
      </div>

      {/* Header */}
      <header className="site-header">
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'linear-gradient(135deg, #035352, #058584)',
              border: '1px solid rgba(243,232,188,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F3E8BC" strokeWidth="2.2" strokeLinecap="round">
                <path d="M12 2v20M2 12h20"/>
              </svg>
            </div>
            <div>
              <h1 style={{ fontSize: 22, lineHeight: 1 }}>MediGuide AI</h1>
              <div style={{ fontSize: 11, color: 'rgba(243,232,188,0.45)', marginTop: 3, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Clinical Decision Support
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="pulse-dot" />
            <span style={{ fontSize: 12, color: 'rgba(243,232,188,0.45)', fontWeight: 500 }}>Agent Online</span>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main style={{ maxWidth: 1320, margin: '0 auto', padding: '36px 40px', display: 'flex', gap: 28, alignItems: 'flex-start' }}>

        {/* ── LEFT PANEL: Form ── */}
        <aside style={{ flex: '0 0 380px', position: 'sticky', top: 92 }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>Patient Case</h2>
              <div className="tag">New</div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

              {/* Age + Gender */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label className="label">Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleInput}
                    placeholder="yrs" className="input-field" min="0" max="120" />
                </div>
                <div>
                  <label className="label">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleInput} className="input-field" style={{ appearance: 'none' }}>
                    <option value="" disabled>Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="label">Facility / Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleInput}
                  placeholder="e.g. Rural Clinic, Ward B" className="input-field" />
              </div>

              {/* Symptoms */}
              <div>
                <label className="label">Clinical Presentation</label>
                <textarea name="symptoms" value={formData.symptoms} onChange={handleInput}
                  placeholder="Chief complaint, onset, duration, associated symptoms..."
                  className="input-field" required
                  style={{ minHeight: 148, resize: 'vertical', lineHeight: 1.65 }} />
              </div>

              {/* Resources */}
              <div>
                <label className="label" style={{ marginBottom: 10 }}>Available Resources</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    ['lab',       '🧪', 'Basic Laboratory (CBC, CMP)'],
                    ['imaging',   '🔬', 'Diagnostic Imaging (X-Ray / US)'],
                    ['iv',        '💉', 'Intravenous Access & Fluids'],
                    ['specialist','📡', 'Specialist Tele-consultation'],
                  ].map(([name, icon, label]) => (
                    <label key={name} className="check-row">
                      <input type="checkbox" name={name} checked={formData.resources[name]} onChange={handleCheck} />
                      <span style={{ fontSize: 15 }}>{icon}</span>
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div style={{
                  background: 'rgba(224,82,82,0.1)', border: '1px solid rgba(224,82,82,0.35)',
                  borderRadius: 8, padding: '12px 14px', fontSize: 13, color: '#f08080',
                  display: 'flex', gap: 10, alignItems: 'flex-start'
                }}>
                  <AlertSvg />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit */}
              <button type="submit" className="btn-primary" disabled={!formData.symptoms || isAnalyzing}>
                {isAnalyzing ? (
                  <><div className="spinner" /> Processing Assessment...</>
                ) : (
                  <>Run Clinical Assessment &nbsp;<ArrowSvg /></>
                )}
              </button>
            </form>
          </div>

          {/* Disclaimer */}
          <p style={{ fontSize: 11, color: 'rgba(243,232,188,0.28)', marginTop: 14, lineHeight: 1.6, textAlign: 'center', padding: '0 4px' }}>
            For clinical decision support only. Always apply professional medical judgement. Not a substitute for direct patient care.
          </p>
        </aside>

        {/* ── RIGHT PANEL: Results ── */}
        <section style={{ flex: 1 }} ref={resultsRef}>

          {/* IDLE */}
          {status === 'idle' && !error && (
            <div className="empty-state">
              <MedCrossIcon />
              <div>
                <div style={{ fontSize: 17, fontWeight: 500, color: 'rgba(243,232,188,0.5)', marginBottom: 6 }}>
                  Awaiting Patient Case
                </div>
                <div style={{ fontSize: 13, color: 'rgba(243,232,188,0.28)', maxWidth: 280 }}>
                  Complete the form on the left to generate an AI-powered clinical assessment.
                </div>
              </div>
            </div>
          )}

          {/* ANALYZING */}
          {isAnalyzing && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 480 }}>
              <div style={{ width: '100%', maxWidth: 380 }}>
                <div style={{ textAlign: 'center', marginBottom: 36 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(243,232,188,0.4)', marginBottom: 8 }}>
                    Agent Reasoning
                  </div>
                  <h2 style={{ margin: 0, fontSize: 22 }}>Running Assessment Protocol</h2>
                </div>

                <div>
                  {analysisSteps.map((step, idx) => {
                    const isDone   = idx < loadingStep;
                    const isActive = idx === loadingStep;
                    const isPending = idx > loadingStep;
                    return (
                      <div key={idx} className="step-item" style={{ opacity: isPending ? 0.38 : 1 }}>
                        <div className={`step-icon ${isDone ? 'done' : isActive ? 'active' : 'pending'}`}>
                          {isDone ? <CheckSvg /> : isActive ? <SpinnerSvg /> : <span style={{ fontSize: 11 }}>{idx + 1}</span>}
                        </div>
                        <div style={{ fontSize: 14, fontWeight: isActive ? 600 : 400, color: isActive ? 'var(--yellow)' : 'rgba(243,232,188,0.6)' }}>
                          {step}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* SUCCESS */}
          {isSuccess && result && (
            <div>

              {/* ── Clinical Assessment ── */}
              <div className="card anim-up" style={{ marginBottom: 22 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(78,204,163,0.15)', border: '1px solid rgba(78,204,163,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ecca3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h2 style={{ margin: 0 }}>Clinical Assessment</h2>
                </div>
                <div className="result-block accent" style={{ marginBottom: 0, fontSize: 14.5, lineHeight: 1.8, whiteSpace: 'pre-wrap', color: 'var(--yellow)' }}>
                  {result.response}
                </div>
              </div>

              {/* ── Reasoning Steps ── */}
              {Array.isArray(result.reasoning_steps) && result.reasoning_steps.length > 0 && (
                <div className="card anim-up anim-up-1" style={{ marginBottom: 22 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                    <BrainSvg />
                    <h2 style={{ margin: 0 }}>Agent Reasoning Chain</h2>
                    <div className="tag" style={{ marginLeft: 'auto' }}>{result.reasoning_steps.length} steps</div>
                  </div>
                  <div>
                    {result.reasoning_steps.map((step, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: '1px solid rgba(243,232,188,0.07)' }}
                        className={idx === result.reasoning_steps.length - 1 ? '' : ''}>
                        <div className="num-badge">{idx + 1}</div>
                        <div style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(243,232,188,0.8)', paddingTop: 2 }}>
                          {typeof step === 'object' ? (step.content || step.step || JSON.stringify(step)) : step}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Citations ── */}
              {Array.isArray(result.citations) && result.citations.length > 0 && (
                <div className="card anim-up anim-up-2">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <FileSvg />
                    <h2 style={{ margin: 0 }}>Evidence Citations</h2>
                    <div className="tag" style={{ marginLeft: 'auto' }}>{result.citations.length} sources</div>
                  </div>
                  <div>
                    {result.citations.map((c, i) => (
                      <div key={i} className="citation-item">
                        <div style={{
                          width: 28, height: 28, borderRadius: 6,
                          background: 'rgba(243,232,188,0.08)',
                          border: '1px solid rgba(243,232,188,0.15)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          fontSize: 11, fontWeight: 700, color: 'var(--yellow-muted)'
                        }}>
                          {i + 1}
                        </div>
                        <div>
                          {typeof c === 'string' ? (
                            <div style={{ fontSize: 13, color: 'var(--yellow)', lineHeight: 1.5 }}>{c}</div>
                          ) : (
                            <>
                              {c.id    && <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--yellow-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>{c.id}</div>}
                              {c.title && <div style={{ fontSize: 13, color: 'var(--yellow)', lineHeight: 1.5 }}>{c.title}</div>}
                              {c.url   && <a href={c.url} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: 'var(--teal-400)', textDecoration: 'none', marginTop: 4, display: 'inline-block' }}>{c.url}</a>}
                              {c.snippet && <div style={{ fontSize: 12, color: 'rgba(243,232,188,0.4)', marginTop: 5, lineHeight: 1.6 }}>{c.snippet}</div>}
                              {!c.id && !c.title && <div style={{ fontSize: 13, color: 'var(--yellow)' }}>{JSON.stringify(c)}</div>}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Re-assess button */}
              <div className="anim-up anim-up-3" style={{ marginTop: 20, textAlign: 'right' }}>
                <button onClick={() => { setStatus('idle'); setResult(null); setFormData({ age:'', gender:'', location:'', symptoms:'', resources:{ lab:false, imaging:false, iv:false, specialist:false }}); }}
                  style={{ background: 'transparent', border: '1px solid rgba(243,232,188,0.2)', color: 'rgba(243,232,188,0.55)', borderRadius: 8, padding: '10px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.target.style.borderColor='rgba(243,232,188,0.45)'; e.target.style.color='var(--yellow)'; }}
                  onMouseLeave={e => { e.target.style.borderColor='rgba(243,232,188,0.2)'; e.target.style.color='rgba(243,232,188,0.55)'; }}>
                  ← New Assessment
                </button>
              </div>

            </div>
          )}
        </section>
      </main>
    </>
  );
}
