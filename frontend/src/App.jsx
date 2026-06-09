import React, { useState, useEffect } from 'react';

const GlobalStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      
      body {
        margin: 0;
        background-color: #0d1117;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        color: #e8eaed;
        overflow-x: hidden;
      }
      
      * {
        box-sizing: border-box;
      }

      @keyframes slideUpFade {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes pulseHeart {
        0% { transform: scale(1); }
        15% { transform: scale(1.2); }
        30% { transform: scale(1); }
        45% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }
      
      @keyframes pulseEmergency {
        0%, 100% { box-shadow: 0 0 15px rgba(255, 82, 82, 0.4); background-color: rgba(255, 82, 82, 0.15); }
        50% { box-shadow: 0 0 35px rgba(255, 82, 82, 0.8); background-color: rgba(255, 82, 82, 0.25); }
      }
      
      @keyframes glowButton {
        0%, 100% { box-shadow: 0 0 15px rgba(26, 115, 232, 0.5); }
        50% { box-shadow: 0 0 30px rgba(26, 115, 232, 0.8); }
      }
      
      @keyframes progressFill {
        from { width: 0%; }
        to { width: var(--progress-width, 100%); }
      }
      
      .glass-card {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      }
      
      .input-field {
        background: rgba(13, 17, 23, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #e8eaed;
        border-radius: 10px;
        padding: 1rem;
        outline: none;
        transition: border-color 0.3s, box-shadow 0.3s;
        font-family: inherit;
        font-size: 1rem;
        width: 100%;
      }
      
      .input-field:focus {
        border-color: #1a73e8;
        box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.25);
      }
      
      .checkbox-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        font-size: 0.95rem;
        color: #a8b0b9;
        transition: color 0.2s;
        user-select: none;
      }
      
      .checkbox-label:hover {
        color: #1a73e8;
      }
      
      .btn-primary {
        background: linear-gradient(135deg, #1a73e8, #1557b0);
        color: white;
        border: none;
        border-radius: 10px;
        padding: 1.25rem;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.75rem;
        animation: glowButton 3s infinite;
        width: 100%;
      }
      
      .btn-primary:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(26, 115, 232, 0.6);
      }
      
      .btn-primary:disabled {
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.3);
        animation: none;
        box-shadow: none;
        cursor: not-allowed;
      }
      
      .animate-slide-up {
        animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        opacity: 0;
      }
      
      .delay-1 { animation-delay: 0.1s; }
      .delay-2 { animation-delay: 0.2s; }
      .delay-3 { animation-delay: 0.3s; }
      .delay-4 { animation-delay: 0.4s; }
      .delay-5 { animation-delay: 0.5s; }
      
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: #0d1117; }
      ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 10px; }
      ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.25); }
      
      .citation-badge {
        background: rgba(26, 115, 232, 0.1);
        border: 1px solid rgba(26, 115, 232, 0.3);
        color: #64b5f6;
        padding: 0.4rem 0.8rem;
        border-radius: 20px;
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.2s ease;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
      }
      
      .citation-badge:hover {
        background: rgba(26, 115, 232, 0.2);
        transform: translateY(-2px);
      }

      .emergency-banner {
        border: 1px solid #ff5252;
        border-radius: 12px;
        padding: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1.25rem;
        animation: pulseEmergency 2s infinite;
      }

      .progress-bar-container {
        background: rgba(255, 255, 255, 0.1);
        height: 10px;
        border-radius: 5px;
        overflow: hidden;
        width: 100%;
        margin-top: 0.75rem;
      }
      
      .progress-bar-fill {
        background: linear-gradient(90deg, #1a73e8, #00c853);
        height: 100%;
        border-radius: 5px;
        animation: progressFill 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      
      .step-icon {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.85rem;
        font-weight: 700;
        flex-shrink: 0;
      }

      .step-icon-primary {
        background: rgba(26, 115, 232, 0.15);
        color: #1a73e8;
        border: 1px solid rgba(26, 115, 232, 0.3);
      }

      .step-icon-accent {
        background: rgba(0, 200, 83, 0.15);
        color: #00c853;
        border: 1px solid rgba(0, 200, 83, 0.3);
      }
    `}
  </style>
);

const HeartIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ff5252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'pulseHeart 1.5s infinite' }}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const AlertTriangle = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff5252" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const CheckCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00c853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
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
      iv: false,
      specialist: false,
    }
  });

  const [status, setStatus] = useState('idle'); // idle, analyzing, success
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);

  const loadingSteps = [
    "Symptom Analysis...",
    "Differential Diagnosis...",
    "WHO Guidelines...",
    "Treatment Protocol..."
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
      }, 1000);
      
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

    // Mock AI simulation
    setTimeout(() => {
      setStatus('success');
      
      const isEmergency = formData.symptoms.toLowerCase().match(/(chest pain|shortness of breath|bleeding|stroke|unconscious|seizure)/i);

      setResult({
        isEmergency: !!isEmergency,
        reasoning: [
          "Initial parsing of subjective symptom presentation completed.",
          "Vitals and demographic data contextualized against baseline risk models.",
          "Identified primary anatomical system involvement.",
          "Cross-referenced presentation with current WHO epidemiological alerts.",
          "Evaluated available facility resources for diagnostic pathway.",
          "Calculated probabilistic confidence for top differential diagnoses."
        ],
        diagnosis: isEmergency 
          ? "Acute Myocardial Infarction or Pulmonary Embolism (Critical Priority)"
          : "Viral Upper Respiratory Infection or Mild Bronchitis",
        confidence: isEmergency ? 96 : 88,
        treatments: isEmergency
          ? [
              "Activate emergency medical services (EMS) immediately.",
              "Administer 324mg Aspirin chewed (if no allergy/bleeding).",
              "Maintain airway, establish IV access if possible.",
              "Prepare for BLS/ACLS protocols if patient deteriorates."
            ]
          : [
              "Symptomatic management with NSAIDs and adequate hydration.",
              "Rest and isolation to prevent potential transmission.",
              "Monitor for worsening symptoms (e.g., persistent high fever).",
              "Follow up with primary care if no improvement in 72 hours."
            ],
        citations: [
          { id: "WHO-24", title: "WHO Emergency Triage Guidelines", link: "#" },
          { id: "AHA-26", title: "AHA Acute Coronary Syndrome Update", link: "#" },
          { id: "MDG-09", title: "MediGuide Internal Outcome Models", link: "#" }
        ]
      });
    }, 4500);
  };

  return (
    <>
      <GlobalStyles />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Navbar */}
        <nav style={{ padding: '1rem 2.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(13, 17, 23, 0.95)', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(10px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'linear-gradient(135deg, #1a73e8, #00c853)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <span style={{ fontSize: '1.4rem', fontWeight: '700', letterSpacing: '-0.02em', color: '#fff' }}>
              MediGuide AI
            </span>
          </div>
          
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '0.4rem 1rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#a8b0b9' }}>
            Powered by 
            <span style={{ color: '#e8eaed', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              Microsoft Foundry IQ
            </span>
          </div>
        </nav>

        <main style={{ flex: 1, padding: '3rem 2rem', maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          {/* Hero Section */}
          <section className="animate-slide-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '4rem', fontWeight: '800', margin: '0 0 1rem 0', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              Save Lives with <span style={{ color: '#1a73e8' }}>AI</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#a8b0b9', margin: 0, lineHeight: 1.6 }}>
              Enterprise-grade clinical decision support. Input patient parameters below to generate evidence-based assessments and triage protocols in seconds.
            </p>
          </section>

          {/* Two-Column Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem', alignItems: 'start' }}>
            
            {/* LEFT: Patient Input Form */}
            <div className="glass-card animate-slide-up delay-1" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1.5rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>
                <h2 style={{ fontSize: '1.4rem', margin: 0, fontWeight: '600', color: '#fff' }}>Patient Profile</h2>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <label style={{ fontSize: '0.9rem', color: '#a8b0b9', fontWeight: '500' }}>Age</label>
                    <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="e.g. 52" className="input-field" required />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <label style={{ fontSize: '0.9rem', color: '#a8b0b9', fontWeight: '500' }}>Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} className="input-field" required style={{ appearance: 'none' }}>
                      <option value="" disabled>Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <label style={{ fontSize: '0.9rem', color: '#a8b0b9', fontWeight: '500' }}>Location / Facility</label>
                  <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. Rural Clinic, Ward B" className="input-field" />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <label style={{ fontSize: '0.9rem', color: '#a8b0b9', fontWeight: '500' }}>Clinical Presentation (Symptoms)</label>
                  <textarea 
                    name="symptoms" 
                    value={formData.symptoms} 
                    onChange={handleInputChange} 
                    placeholder="Enter detailed symptoms... (e.g., 'Severe chest pain radiating to left arm')" 
                    className="input-field" 
                    style={{ minHeight: '140px', resize: 'vertical', lineHeight: '1.6' }} 
                    required 
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <label style={{ fontSize: '0.9rem', color: '#fff', fontWeight: '500' }}>Available Resources</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <label className="checkbox-label">
                      <input type="checkbox" name="lab" checked={formData.resources.lab} onChange={handleCheckboxChange} style={{ accentColor: '#1a73e8', width: '18px', height: '18px' }} />
                      Basic Lab
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="imaging" checked={formData.resources.imaging} onChange={handleCheckboxChange} style={{ accentColor: '#1a73e8', width: '18px', height: '18px' }} />
                      Imaging (X-Ray/US)
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="iv" checked={formData.resources.iv} onChange={handleCheckboxChange} style={{ accentColor: '#1a73e8', width: '18px', height: '18px' }} />
                      IV Access
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="specialist" checked={formData.resources.specialist} onChange={handleCheckboxChange} style={{ accentColor: '#1a73e8', width: '18px', height: '18px' }} />
                      Specialist Consult
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn-primary" disabled={!formData.symptoms || status === 'analyzing'} style={{ marginTop: '1rem' }}>
                  {status === 'analyzing' ? 'Processing...' : 'Generate Clinical Assessment'}
                  {!status.includes('analyzing') && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>}
                </button>
              </form>
            </div>

            {/* RIGHT: Results Panel */}
            <div style={{ minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
              
              {status === 'idle' && (
                <div className="glass-card animate-slide-up delay-2" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4rem', textAlign: 'center', borderStyle: 'dashed', borderWidth: '2px', borderColor: 'rgba(255,255,255,0.08)' }}>
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1.5rem' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  <h3 style={{ fontSize: '1.5rem', color: '#a8b0b9', margin: '0 0 0.75rem 0', fontWeight: '500' }}>Awaiting Patient Data</h3>
                  <p style={{ color: '#6e7681', margin: 0, maxWidth: '320px', lineHeight: 1.6, fontSize: '1.05rem' }}>Submit the patient form to generate an AI-powered diagnostic and treatment protocol.</p>
                </div>
              )}

              {status === 'analyzing' && (
                <div className="glass-card animate-slide-up" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4rem', textAlign: 'center' }}>
                  <div style={{ marginBottom: '3rem' }}>
                    <HeartIcon />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', color: '#fff', margin: '0 0 2rem 0', fontWeight: '600' }}>
                    Analyzing with Microsoft Foundry IQ...
                  </h3>
                  
                  <div style={{ width: '100%', maxWidth: '350px', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                    {loadingSteps.map((step, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: idx <= loadingStep ? 1 : 0.3, transition: 'opacity 0.3s' }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: idx < loadingStep ? 'none' : '2px solid #1a73e8', background: idx < loadingStep ? '#00c853' : 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          {idx < loadingStep && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                        </div>
                        <span style={{ fontSize: '1rem', color: idx === loadingStep ? '#1a73e8' : '#e8eaed', fontWeight: idx === loadingStep ? '600' : '400' }}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {status === 'success' && result && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  {result.isEmergency && (
                    <div className="emergency-banner animate-slide-up">
                      <AlertTriangle />
                      <div>
                        <h3 style={{ margin: '0 0 0.25rem 0', color: '#ff5252', fontSize: '1.4rem', fontWeight: '800', letterSpacing: '0.02em' }}>EMERGENCY REFERRAL REQUIRED</h3>
                        <p style={{ margin: 0, color: '#fff', fontSize: '1.05rem' }}>Critical condition detected. Initiate emergency protocols immediately.</p>
                      </div>
                    </div>
                  )}

                  <div className="glass-card animate-slide-up delay-1" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                      <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '600' }}>
                        <CheckCircle />
                        Primary Diagnosis
                      </h3>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#00c853', lineHeight: 1 }}>{result.confidence}%</div>
                        <div style={{ fontSize: '0.8rem', color: '#a8b0b9', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.2rem' }}>Confidence</div>
                      </div>
                    </div>
                    
                    <p style={{ fontSize: '1.15rem', color: '#e8eaed', lineHeight: 1.6, margin: '0 0 1.5rem 0', fontWeight: '500' }}>
                      {result.diagnosis}
                    </p>

                    <div className="progress-bar-container">
                      <div className="progress-bar-fill" style={{ '--progress-width': `${result.confidence}%` }}></div>
                    </div>
                  </div>

                  <div className="glass-card animate-slide-up delay-2" style={{ padding: '2rem' }}>
                    <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '600' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      Treatment Protocol
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      {result.treatments.map((step, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                          <div className="step-icon step-icon-primary">{idx + 1}</div>
                          <div style={{ color: '#e8eaed', lineHeight: 1.5, fontSize: '1.05rem', paddingTop: '0.15rem' }}>{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card animate-slide-up delay-3" style={{ padding: '2rem' }}>
                    <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '600' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                      Reasoning Chain
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                      {result.reasoning.map((r, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '10px', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          <div className="step-icon step-icon-accent" style={{ width: '22px', height: '22px', fontSize: '0.75rem' }}>{i + 1}</div>
                          <div style={{ fontSize: '0.9rem', color: '#a8b0b9', lineHeight: 1.5 }}>{r}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card animate-slide-up delay-4" style={{ padding: '1.5rem 2rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.9rem', color: '#a8b0b9', marginRight: '0.5rem', fontWeight: '500' }}>Citations:</span>
                      {result.citations.map((c, i) => (
                        <a key={i} href={c.link} className="citation-badge">
                          {c.id}
                          <ExternalLinkIcon />
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="animate-slide-up delay-5" style={{ textAlign: 'center', padding: '1rem', color: '#6e7681', fontSize: '0.8rem', lineHeight: 1.5 }}>
                    <strong>Disclaimer:</strong> MediGuide AI is a decision support tool and does not replace professional medical judgment. Always independently verify AI-generated protocols.
                  </div>

                </div>
              )}

            </div>
          </div>
        </main>
      </div>
    </>
  );
}
