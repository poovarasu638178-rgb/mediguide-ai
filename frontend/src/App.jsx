import React, { useState, useEffect } from 'react';

const GlobalStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      
      body {
        margin: 0;
        background-color: #000000;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        color: #ededed;
        font-size: 14px;
        line-height: 1.5;
        overflow-x: hidden;
      }
      
      * {
        box-sizing: border-box;
      }
      
      h1 {
        font-size: 28px;
        font-weight: 700;
        margin: 0;
        color: #ededed;
      }
      
      h2 {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 16px 0;
        color: #ededed;
      }

      h3 {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 12px 0;
        color: #ededed;
      }
      
      .label {
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-weight: 600;
        color: #888888;
        display: block;
        margin-bottom: 6px;
      }
      
      .card {
        background-color: #111111;
        border: 1px solid #333333;
        border-radius: 8px;
        padding: 24px;
      }
      
      .result-card {
        background-color: #111111;
        border: 1px solid #333333;
        border-left: 4px solid #0070f3;
        border-radius: 6px;
        padding: 20px;
        margin-bottom: 16px;
      }
      
      .result-card.success { border-left-color: #10b981; }
      .result-card.emergency { border-left-color: #ef4444; }
      .result-card.muted { border-left-color: #888888; }
      
      .input-field {
        background-color: #000000;
        border: 1px solid #333333;
        color: #ededed;
        border-radius: 6px;
        padding: 10px 12px;
        outline: none;
        transition: border-color 0.2s;
        font-family: inherit;
        font-size: 14px;
        width: 100%;
      }
      
      .input-field:focus {
        border-color: #0070f3;
        box-shadow: 0 0 0 1px #0070f3;
      }
      
      .checkbox-container {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        font-size: 14px;
        color: #ededed;
        user-select: none;
      }
      
      .checkbox-input {
        accent-color: #0070f3;
        width: 16px;
        height: 16px;
        margin: 0;
      }
      
      .btn-primary {
        background-color: #ededed;
        color: #000000;
        border: none;
        border-radius: 6px;
        padding: 12px 16px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        width: 100%;
      }
      
      .btn-primary:hover:not(:disabled) {
        background-color: #ffffff;
      }
      
      .btn-primary:active:not(:disabled) {
        background-color: #d4d4d4;
      }
      
      .btn-primary:disabled {
        background-color: #333333;
        color: #888888;
        cursor: not-allowed;
      }

      .top-banner {
        background-color: #111111;
        border-bottom: 1px solid #333333;
        padding: 8px;
        text-align: center;
        font-size: 13px;
        color: #888888;
        font-weight: 500;
      }
      
      .emergency-banner {
        background-color: rgba(239, 68, 68, 0.1);
        border: 1px solid #ef4444;
        border-radius: 6px;
        padding: 16px;
        display: flex;
        align-items: flex-start;
        gap: 12px;
        margin-bottom: 24px;
      }
      
      .spinner {
        width: 18px;
        height: 18px;
        border: 2px solid rgba(0, 0, 0, 0.3);
        border-radius: 50%;
        border-top-color: #000000;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: #000000; }
      ::-webkit-scrollbar-thumb { background: #333333; border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: #444444; }
      
      .progress-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      .progress-item {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .progress-icon {
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `}
  </style>
);

const CrossIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M2 12h20" />
  </svg>
);

const AlertIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const FileTextIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const CircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
);

const LoaderIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ededed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
    <line x1="12" y1="2" x2="12" y2="6"></line>
    <line x1="12" y1="18" x2="12" y2="22"></line>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
    <line x1="2" y1="12" x2="6" y2="12"></line>
    <line x1="18" y1="12" x2="22" y2="12"></line>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
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

  const [status, setStatus] = useState('idle'); // idle, analyzing, success, error
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const analysisSteps = [
    "Validating patient demographics",
    "Parsing subjective symptom presentation",
    "Cross-referencing global epidemiological data",
    "Formulating differential diagnosis",
    "Generating resource-constrained treatment plan"
  ];

  useEffect(() => {
    if (status === 'analyzing') {
      let current = 0;
      const interval = setInterval(() => {
        current++;
        if (current < analysisSteps.length) {
          setLoadingStep(current);
        } else {
          clearInterval(interval);
        }
      }, 800);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.symptoms) return;

    setStatus('analyzing');
    setLoadingStep(0);
    setResult(null);
    setError(null);

    try {
      const res = await fetch('http://localhost:8000/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: formData.age,
          gender: formData.gender,
          location: formData.location,
          symptoms: formData.symptoms,
          resources: formData.resources
        })
      });
      const data = await res.json();
      setResult(data);
      setStatus('success');
    } catch (err) {
      setError('Failed to connect to agent');
      setStatus('idle');
    }
  };

  return (
    <>
      <GlobalStyles />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        <div className="top-banner">
          🏥 Built for Microsoft Agents League Hackathon 2026
        </div>
        
        <header style={{ padding: '24px 32px', borderBottom: '1px solid #333333', backgroundColor: '#000000', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h1>MediGuide AI</h1>
            <div style={{ color: '#888888', fontSize: '14px', marginTop: '4px' }}>
              Clinical Decision Support for Resource-Limited Settings
            </div>
          </div>
        </header>

        <main style={{ flex: 1, padding: '32px', maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
          
          {/* LEFT: Patient Input Form */}
          <aside style={{ flex: '0 0 400px' }}>
            <div className="card">
              <h2>Patient Case Data</h2>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <label className="label">Age</label>
                    <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Yrs" className="input-field" required />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="label">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} className="input-field" required style={{ appearance: 'none' }}>
                      <option value="" disabled>Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label">Location / Facility Context</label>
                  <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. Rural Clinic, Ward B" className="input-field" />
                </div>

                <div>
                  <label className="label">Clinical Presentation</label>
                  <textarea 
                    name="symptoms" 
                    value={formData.symptoms} 
                    onChange={handleInputChange} 
                    placeholder="Enter chief complaint and history of present illness..." 
                    className="input-field" 
                    style={{ minHeight: '160px', resize: 'vertical' }} 
                    required 
                  />
                </div>

                <div>
                  <label className="label" style={{ marginBottom: '12px' }}>Available Facility Resources</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', backgroundColor: '#000000', border: '1px solid #333333', borderRadius: '6px' }}>
                    <label className="checkbox-container">
                      <input type="checkbox" name="lab" checked={formData.resources.lab} onChange={handleCheckboxChange} className="checkbox-input" />
                      Basic Laboratory (CBC, CMP)
                    </label>
                    <label className="checkbox-container">
                      <input type="checkbox" name="imaging" checked={formData.resources.imaging} onChange={handleCheckboxChange} className="checkbox-input" />
                      Diagnostic Imaging (X-Ray/US)
                    </label>
                    <label className="checkbox-container">
                      <input type="checkbox" name="iv" checked={formData.resources.iv} onChange={handleCheckboxChange} className="checkbox-input" />
                      Intravenous Access / Fluids
                    </label>
                    <label className="checkbox-container">
                      <input type="checkbox" name="specialist" checked={formData.resources.specialist} onChange={handleCheckboxChange} className="checkbox-input" />
                      Specialist Tele-consultation
                    </label>
                  </div>
                </div>

                <div style={{ marginTop: '8px' }}>
                  <button type="submit" className="btn-primary" disabled={!formData.symptoms || status === 'analyzing'}>
                    {status === 'analyzing' ? (
                      <><span className="spinner"></span> Processing...</>
                    ) : (
                      <>Run Clinical Assessment &rarr;</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </aside>

          {/* RIGHT: Results Panel */}
          <section style={{ flex: 1, minHeight: '600px' }}>
            
            {status === 'idle' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#888888' }}>
                <CrossIcon />
                <div style={{ marginTop: '16px', fontSize: '16px', fontWeight: '500' }}>Select a patient case to begin</div>
                <div style={{ fontSize: '14px', marginTop: '4px' }}>Fill out the patient form to generate a clinical assessment.</div>
              </div>
            )}

            {status === 'analyzing' && (
              <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '100%', maxWidth: '400px' }}>
                  <h3 style={{ textAlign: 'center', marginBottom: '32px', color: '#ededed' }}>Running Assessment Protocol</h3>
                  <div className="progress-container">
                    {analysisSteps.map((step, idx) => {
                      let Icon = CircleIcon;
                      if (idx < loadingStep) Icon = CheckIcon;
                      if (idx === loadingStep) Icon = LoaderIcon;
                      
                      const isFuture = idx > loadingStep;
                      
                      return (
                        <div key={idx} className="progress-item" style={{ opacity: isFuture ? 0.4 : 1 }}>
                          <div className="progress-icon">
                            <Icon />
                          </div>
                          <div style={{ fontSize: '14px', color: isFuture ? '#888888' : '#ededed', fontWeight: idx === loadingStep ? '500' : '400' }}>
                            {step}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {error && status === 'idle' && (
              <div className="emergency-banner" style={{ marginBottom: 0 }}>
                <div style={{ paddingTop: '2px' }}><AlertIcon /></div>
                <div>
                  <div style={{ color: '#ef4444', fontWeight: '700', fontSize: '14px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Connection Error</div>
                  <div style={{ color: '#ededed', fontSize: '14px' }}>{error}</div>
                </div>
              </div>
            )}

            {status === 'success' && result && (
              <div style={{ animation: 'slideUpFade 0.4s ease-out forwards' }}>

                {/* Clinical Response */}
                <div className="card" style={{ marginBottom: '24px' }}>
                  <h2>Clinical Assessment</h2>
                  <div className="result-card success" style={{ marginBottom: 0, fontSize: '15px', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                    {result.response}
                  </div>
                </div>

                {/* Reasoning Steps */}
                {Array.isArray(result.reasoning_steps) && result.reasoning_steps.length > 0 && (
                  <div className="card" style={{ marginBottom: '24px' }}>
                    <h2>Reasoning Steps</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {result.reasoning_steps.map((step, idx) => (
                        <div key={idx} className="result-card" style={{ marginBottom: 0, display: 'flex', gap: '16px' }}>
                          <div style={{ color: '#888888', fontWeight: '600', width: '24px', flexShrink: 0 }}>{idx + 1}.</div>
                          <div style={{ fontSize: '14px', lineHeight: '1.6' }}>{typeof step === 'object' ? (step.content || step.step || JSON.stringify(step)) : step}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Citations */}
                {Array.isArray(result.citations) && result.citations.length > 0 && (
                  <div className="card">
                    <h3>Evidentiary Citations</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {result.citations.map((c, i) => (
                        <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <div style={{ marginTop: '2px' }}><FileTextIcon /></div>
                          <div>
                            {typeof c === 'string' ? (
                              <div style={{ color: '#ededed', fontSize: '13px' }}>{c}</div>
                            ) : (
                              <>
                                {c.id && <div style={{ fontWeight: '500', color: '#ededed', fontSize: '13px' }}>{c.id}</div>}
                                {c.title && <div style={{ color: '#888888', fontSize: '13px', marginTop: '2px' }}>{c.title}</div>}
                                {!c.id && !c.title && <div style={{ color: '#ededed', fontSize: '13px' }}>{JSON.stringify(c)}</div>}
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

          </section>
        </main>
      </div>
    </>
  );
}
