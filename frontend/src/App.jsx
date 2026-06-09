import React, { useState, useEffect } from 'react';

const GlobalStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      
      body {
        margin: 0;
        background-color: #0a0f1e;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #e2e8f0;
        overflow-x: hidden;
      }
      
      * {
        box-sizing: border-box;
      }

      @keyframes pulse-ring {
        0% { transform: scale(0.8); opacity: 0.5; }
        100% { transform: scale(1.3); opacity: 0; }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      
      @keyframes slideUpFade {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 15px rgba(0, 212, 255, 0.4); }
        50% { box-shadow: 0 0 25px rgba(0, 212, 255, 0.7); }
      }
      
      @keyframes progress {
        from { width: 0%; }
        to { width: 100%; }
      }
      
      .glass-card {
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 24px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      }
      
      .input-field {
        background: rgba(10, 15, 30, 0.6);
        border: 1px solid rgba(0, 212, 255, 0.2);
        color: #e2e8f0;
        border-radius: 12px;
        padding: 1rem;
        outline: none;
        transition: all 0.3s ease;
        font-family: inherit;
        font-size: 1rem;
      }
      
      .input-field:focus {
        border-color: #00d4ff;
        box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.2);
      }
      
      .checkbox-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        font-size: 0.95rem;
        color: #cbd5e1;
        transition: color 0.2s;
      }
      
      .checkbox-label:hover {
        color: #00d4ff;
      }
      
      .btn-primary {
        background: linear-gradient(135deg, #00d4ff, #0088ff);
        color: white;
        border: none;
        border-radius: 12px;
        padding: 1.25rem;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.75rem;
        animation: glow 3s infinite;
      }
      
      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 212, 255, 0.6);
      }
      
      .btn-primary:active {
        transform: translateY(0);
      }
      
      .btn-primary:disabled {
        background: #1e293b;
        color: #64748b;
        animation: none;
        box-shadow: none;
        cursor: not-allowed;
        transform: none;
      }
      
      .animate-enter {
        animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        opacity: 0;
      }
      
      .delay-1 { animation-delay: 0.2s; }
      .delay-2 { animation-delay: 0.4s; }
      .delay-3 { animation-delay: 0.6s; }
      .delay-4 { animation-delay: 0.8s; }
      
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: #0a0f1e; }
      ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      ::-webkit-scrollbar-thumb:hover { background: #00d4ff; }
      
      .citation-badge {
        background: rgba(0, 212, 255, 0.1);
        border: 1px solid rgba(0, 212, 255, 0.3);
        color: #00d4ff;
        padding: 0.4rem 0.8rem;
        border-radius: 20px;
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.2s ease;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
      }
      
      .citation-badge:hover {
        background: rgba(0, 212, 255, 0.2);
        transform: translateY(-2px);
      }
      
      .confidence-bar-bg {
        background: rgba(255, 255, 255, 0.1);
        height: 8px;
        border-radius: 4px;
        overflow: hidden;
        width: 100%;
        margin-top: 0.5rem;
      }
      
      .confidence-bar-fill {
        background: linear-gradient(90deg, #00d4ff, #00ff88);
        height: 100%;
        border-radius: 4px;
        animation: progress 1.5s ease-out forwards;
      }
      
      .pulse-icon-container {
        position: relative;
        width: 64px;
        height: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .pulse-ring-effect {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px solid #00d4ff;
        animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
      }
    `}
  </style>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const AlertIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const BrainIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'float 3s ease-in-out infinite' }}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
  </svg>
);

const FileTextIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

export default function App() {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    location: '',
    symptoms: '',
    resources: {
      lab: false,
      imaging: false,
      specialist: false,
    }
  });

  const [status, setStatus] = useState('idle'); // idle, analyzing, success
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);

  const loadingSteps = [
    "Initializing neural networks...",
    "Cross-referencing global medical literature...",
    "Analyzing symptom vectors...",
    "Evaluating demographic risk factors...",
    "Generating probabilistic diagnostic models...",
    "Formulating treatment protocols...",
    "Finalizing assessment report..."
  ];

  useEffect(() => {
    if (status === 'analyzing') {
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        if (currentStep < loadingSteps.length) {
          setLoadingStep(currentStep);
        } else {
          clearInterval(interval);
        }
      }, 700);
      
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      resources: { ...formData.resources, [e.target.name]: e.target.checked }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.symptoms) return;

    setStatus('analyzing');
    setLoadingStep(0);
    setResult(null);

    // Mock API simulation
    setTimeout(() => {
      setStatus('success');
      
      const requiresAlert = formData.symptoms.toLowerCase().includes('chest pain') || 
                            formData.symptoms.toLowerCase().includes('shortness of breath');

      setResult({
        isEmergency: requiresAlert,
        reasoning: [
          "Patient presentation analyzed against 15M+ clinical cases.",
          "Symptom cluster isolates primary systemic involvement.",
          "Location data applied to adjust for regional epidemiological factors.",
          "Available resources factored into diagnostic pathing."
        ],
        diagnosis: requiresAlert 
          ? "Critical Acute Event - Suspected Acute Coronary Syndrome or Pulmonary Embolism."
          : "Community-Acquired Pneumonia (CAP) with high probability. Differential includes Bronchitis and severe URI.",
        confidence: requiresAlert ? 94 : 89,
        treatments: requiresAlert
          ? [
              "IMMEDIATE TRANSFER to Emergency Department via EMS.",
              "Administer Aspirin 325mg (chewed) if no contraindications.",
              "Continuous cardiac monitoring and high-flow oxygen."
            ]
          : [
              "Empiric antibiotic therapy (e.g., Amoxicillin 1g TID or Doxycycline 100mg BID).",
              "Symptomatic relief with antipyretics and hydration.",
              "If symptoms worsen after 48h, order chest X-ray and CBC."
            ],
        citations: [
          { id: "C1", title: "Global Respiratory Guidelines 2026", link: "#" },
          { id: "C2", title: "AI-Augmented Triage Efficacy", link: "#" },
          { id: "C3", title: "Regional Epidemiological Data (Q2 2026)", link: "#" }
        ]
      });
    }, 5500);
  };

  return (
    <>
      <GlobalStyles />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Navigation / Header */}
        <nav style={{ padding: '1.5rem 3rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="pulse-icon-container" style={{ width: '40px', height: '40px' }}>
              <div className="pulse-ring-effect" style={{ borderColor: '#00ff88', animationDuration: '3s' }}></div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.03em', background: 'linear-gradient(90deg, #fff, #00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              MediGuide AI
            </span>
          </div>
          <div style={{ fontSize: '0.9rem', color: '#94a3b8', display: 'flex', gap: '2rem' }}>
            <span style={{ cursor: 'pointer' }}>Clinical Dashboard</span>
            <span style={{ cursor: 'pointer' }}>Settings</span>
            <span style={{ color: '#00d4ff', cursor: 'pointer', fontWeight: '500' }}>Dr. A. Carter</span>
          </div>
        </nav>

        <main style={{ flex: 1, padding: '3rem', maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          {/* Hero Section */}
          <section style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '700', margin: '0 0 1rem 0', lineHeight: 1.1, letterSpacing: '-0.04em' }}>
              Global Clinical <br />
              <span style={{ background: 'linear-gradient(90deg, #00d4ff, #00ff88)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Decision Support
              </span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
              Advanced neural diagnostic models powered by Microsoft Foundry IQ. Provide patient data for real-time assessment and protocol generation.
            </p>
          </section>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
            
            {/* Input Form */}
            <div className="glass-card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(0, 212, 255, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#00d4ff' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <h2 style={{ fontSize: '1.5rem', margin: 0, fontWeight: '600' }}>Patient Data</h2>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '500' }}>Age</label>
                    <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="e.g. 34" className="input-field" required />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '500' }}>Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} className="input-field" required style={{ appearance: 'none' }}>
                      <option value="" disabled>Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '500' }}>Location / Region</label>
                  <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. Sub-Saharan Africa, Urban" className="input-field" />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '500' }}>Clinical Presentation (Symptoms)</label>
                  <textarea 
                    name="symptoms" 
                    value={formData.symptoms} 
                    onChange={handleInputChange} 
                    placeholder="Describe symptoms, duration, severity... (try 'chest pain' for emergency flow)" 
                    className="input-field" 
                    style={{ minHeight: '120px', resize: 'vertical', lineHeight: '1.5' }} 
                    required 
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1rem', background: 'rgba(0, 0, 0, 0.2)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <label style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.25rem' }}>Available Facility Resources</label>
                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <label className="checkbox-label">
                      <input type="checkbox" name="lab" checked={formData.resources.lab} onChange={handleCheckboxChange} style={{ accentColor: '#00d4ff', width: '18px', height: '18px' }} />
                      Basic Lab (CBC, CMP)
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="imaging" checked={formData.resources.imaging} onChange={handleCheckboxChange} style={{ accentColor: '#00d4ff', width: '18px', height: '18px' }} />
                      Imaging (X-Ray, US)
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="specialist" checked={formData.resources.specialist} onChange={handleCheckboxChange} style={{ accentColor: '#00d4ff', width: '18px', height: '18px' }} />
                      Specialist Consult
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn-primary" disabled={!formData.symptoms || status === 'analyzing'} style={{ marginTop: '0.5rem' }}>
                  {status === 'analyzing' ? 'Processing...' : 'Generate Assessment'}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </form>
            </div>

            {/* Results Display Area */}
            <div style={{ minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
              
              {status === 'idle' && (
                <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem', textAlign: 'center', borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1.5rem' }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                  <h3 style={{ fontSize: '1.25rem', color: '#94a3b8', margin: '0 0 0.5rem 0', fontWeight: '500' }}>Awaiting Input</h3>
                  <p style={{ color: '#64748b', margin: 0, maxWidth: '280px', lineHeight: 1.5 }}>Provide patient parameters to initiate the AI diagnostic sequence.</p>
                </div>
              )}

              {status === 'analyzing' && (
                <div className="glass-card animate-enter" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem', textAlign: 'center', background: 'rgba(0, 212, 255, 0.02)' }}>
                  <div style={{ marginBottom: '2.5rem', position: 'relative' }}>
                    <div className="pulse-ring-effect" style={{ width: '120px', height: '120px', left: '-40px', top: '-40px', animationDuration: '1.5s', opacity: 0.3 }}></div>
                    <div className="pulse-ring-effect" style={{ width: '160px', height: '160px', left: '-60px', top: '-60px', animationDuration: '2s', animationDelay: '0.5s', opacity: 0.2 }}></div>
                    <BrainIcon />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', color: '#00d4ff', margin: '0 0 1.5rem 0', fontWeight: '500', letterSpacing: '0.02em' }}>
                    Analyzing Patient Data
                  </h3>
                  
                  <div style={{ width: '100%', maxWidth: '300px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', height: '6px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                    <div style={{ height: '100%', background: '#00d4ff', width: `${((loadingStep + 1) / loadingSteps.length) * 100}%`, transition: 'width 0.5s ease-out' }}></div>
                  </div>
                  
                  <div style={{ height: '24px', color: '#94a3b8', fontSize: '0.95rem', fontStyle: 'italic' }}>
                    {loadingSteps[loadingStep]}
                  </div>
                </div>
              )}

              {status === 'success' && result && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  {result.isEmergency && (
                    <div className="glass-card animate-enter" style={{ background: 'rgba(255, 0, 50, 0.1)', border: '1px solid rgba(255, 0, 50, 0.4)', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', boxShadow: '0 0 30px rgba(255, 0, 50, 0.2)' }}>
                      <div style={{ color: '#ff3366', marginTop: '0.25rem' }}><AlertIcon /></div>
                      <div>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#ff3366', fontSize: '1.25rem' }}>CRITICAL ALERT</h3>
                        <p style={{ margin: 0, color: '#f8fafc', lineHeight: 1.5 }}>Symptoms suggest a life-threatening condition. Immediate escalation required.</p>
                      </div>
                    </div>
                  )}

                  <div className="glass-card animate-enter delay-1" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                      <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        Diagnostic Assessment
                      </h3>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#00ff88' }}>{result.confidence}%</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Confidence</div>
                      </div>
                    </div>
                    
                    <p style={{ fontSize: '1.1rem', color: '#e2e8f0', lineHeight: 1.6, margin: '0 0 1.5rem 0', padding: '1rem', background: 'rgba(0, 0, 0, 0.2)', borderRadius: '12px', borderLeft: '4px solid #00d4ff' }}>
                      {result.diagnosis}
                    </p>

                    <div className="confidence-bar-bg">
                      <div className="confidence-bar-fill" style={{ width: `${result.confidence}%` }}></div>
                    </div>
                  </div>

                  <div className="glass-card animate-enter delay-2" style={{ padding: '2rem' }}>
                    <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                      Treatment Protocol
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {result.treatments.map((step, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '12px' }}>
                          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0, 212, 255, 0.1)', color: '#00d4ff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.85rem', fontWeight: '700', flexShrink: 0 }}>
                            {idx + 1}
                          </div>
                          <div style={{ color: '#cbd5e1', lineHeight: 1.5 }}>{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="animate-enter delay-3">
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                      <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Reasoning Matrix</h4>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {result.reasoning.map((r, i) => (
                          <li key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                            <div style={{ marginTop: '0.25rem', color: '#00ff88' }}><CheckIcon /></div>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                      <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Citations</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
                        {result.citations.map((c, i) => (
                          <a key={i} href={c.link} className="citation-badge">
                            <FileTextIcon /> {c.id}: {c.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>
        </main>

        {/* Footer */}
        <footer style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)', marginTop: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
            Powered by 
            <span style={{ color: '#f8fafc', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              Microsoft Foundry IQ
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
