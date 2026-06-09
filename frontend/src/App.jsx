import React, { useState } from 'react';

const GlobalStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      
      body {
        margin: 0;
        background-color: #0b1120;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #e2e8f0;
      }
      
      * {
        box-sizing: border-box;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }
      
      @keyframes slideUpFade {
        from { opacity: 0; transform: translateY(15px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .input-field:focus {
        border-color: #0ea5e9 !important;
        box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15) !important;
      }
      
      .submit-btn:hover:not(:disabled) {
        background-color: #0284c7 !important;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(14, 165, 233, 0.4) !important;
      }
      
      .submit-btn:active:not(:disabled) {
        transform: translateY(1px);
      }
      
      .animate-enter {
        animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      .delay-1 { animation-delay: 0.1s; }
      .delay-2 { animation-delay: 0.2s; }
      .delay-3 { animation-delay: 0.3s; }

      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: #475569; }
    `}
  </style>
);

export default function App() {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    symptoms: '',
    history: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, analyzing, success
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.symptoms) return;

    setStatus('analyzing');
    setResult(null);

    // Mock API simulation for analysis steps
    setTimeout(() => {
      setStatus('success');
      setResult({
        reasoning: [
          "Patient presents with reported symptoms.",
          "Analyzing symptom cross-correlations against medical literature...",
          "Evaluating patient demographic and medical history...",
          "Generating differential diagnosis matrix.",
          "Refining probabilities based on epidemiological data."
        ],
        diagnosis: "Preliminary analysis indicates a high probability of Acute Upper Respiratory Infection (URI). However, depending on symptom progression, Allergic Rhinitis should be considered as a differential. Recommend rest, hydration, and over-the-counter symptom management. If fever exceeds 102°F or symptoms persist beyond 7 days, seek in-person clinical evaluation.",
        citations: [
          { id: 1, title: "Clinical Practice Guidelines for Acute Respiratory Infections", source: "Journal of Medical AI, 2025, Vol 12(4)" },
          { id: 2, title: "Symptom Correlation Matrix for Triage Systems", source: "Health Informatics Database, Section 4.2" }
        ]
      });
    }, 3000);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem 1rem',
    },
    header: {
      width: '100%',
      maxWidth: '1200px',
      marginBottom: '2.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    logoContainer: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 24px rgba(14, 165, 233, 0.4)',
    },
    logoIcon: {
      color: 'white',
    },
    titleWrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: '700',
      background: 'linear-gradient(to right, #e0f2fe, #7dd3fc)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: 0,
      letterSpacing: '-0.02em',
    },
    subtitle: {
      fontSize: '0.85rem',
      color: '#94a3b8',
      margin: '0.2rem 0 0 0',
      fontWeight: '500',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    main: {
      display: 'flex',
      flexDirection: 'row',
      gap: '2rem',
      width: '100%',
      maxWidth: '1200px',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
    },
    card: {
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRadius: '20px',
      padding: '2.5rem',
      flex: '1',
      minWidth: '320px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#f8fafc',
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    iconWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
      borderRadius: '8px',
      backgroundColor: 'rgba(14, 165, 233, 0.1)',
      color: '#38bdf8',
    },
    row: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1.5rem',
      flexWrap: 'wrap',
    },
    col: {
      flex: 1,
      minWidth: '120px',
    },
    formGroup: {
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      color: '#94a3b8',
      marginBottom: '0.5rem',
      fontWeight: '500',
    },
    input: {
      width: '100%',
      backgroundColor: '#0f172a',
      border: '1px solid #334155',
      borderRadius: '10px',
      padding: '0.875rem 1rem',
      color: '#e2e8f0',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.2s ease',
    },
    textarea: {
      width: '100%',
      backgroundColor: '#0f172a',
      border: '1px solid #334155',
      borderRadius: '10px',
      padding: '0.875rem 1rem',
      color: '#e2e8f0',
      fontSize: '1rem',
      minHeight: '120px',
      resize: 'vertical',
      outline: 'none',
      transition: 'all 0.2s ease',
      lineHeight: '1.5',
    },
    button: {
      width: '100%',
      padding: '1rem',
      backgroundColor: '#0ea5e9',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      marginTop: '1rem',
      boxShadow: '0 4px 14px 0 rgba(14, 165, 233, 0.2)',
    },
    buttonDisabled: {
      width: '100%',
      padding: '1rem',
      backgroundColor: '#334155',
      color: '#64748b',
      border: 'none',
      borderRadius: '10px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'not-allowed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      marginTop: '1rem',
    },
    loader: {
      width: '20px',
      height: '20px',
      border: '2px solid rgba(255,255,255,0.3)',
      borderRadius: '50%',
      borderTopColor: 'white',
    },
    resultContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    reasoningBox: {
      backgroundColor: 'rgba(15, 23, 42, 0.4)',
      borderLeft: '4px solid #8b5cf6',
      padding: '1.25rem',
      borderRadius: '0 12px 12px 0',
    },
    reasoningTitle: {
      color: '#a78bfa',
      fontSize: '0.9rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    reasoningStep: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      marginBottom: '0.875rem',
      color: '#cbd5e1',
      fontSize: '0.95rem',
      lineHeight: '1.5',
    },
    stepDot: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      backgroundColor: '#8b5cf6',
      marginTop: '8px',
      flexShrink: 0,
    },
    diagnosisBox: {
      backgroundColor: 'rgba(14, 165, 233, 0.05)',
      border: '1px solid rgba(14, 165, 233, 0.2)',
      padding: '1.5rem',
      borderRadius: '16px',
      position: 'relative',
      overflow: 'hidden',
    },
    diagnosisHighlight: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '4px',
      background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)',
    },
    diagnosisTitle: {
      color: '#38bdf8',
      fontSize: '1.1rem',
      fontWeight: '600',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    diagnosisText: {
      color: '#f0f9ff',
      lineHeight: '1.6',
      fontSize: '1rem',
      margin: 0,
    },
    citationsBox: {
      backgroundColor: 'rgba(15, 23, 42, 0.4)',
      padding: '1.25rem',
      borderRadius: '12px',
      border: '1px dashed rgba(100, 116, 139, 0.3)',
    },
    citationTitle: {
      color: '#94a3b8',
      fontSize: '0.85rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    citationItem: {
      fontSize: '0.875rem',
      color: '#cbd5e1',
      marginBottom: '0.75rem',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.5rem',
      lineHeight: '1.4',
    },
    emptyState: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      minHeight: '400px',
      color: '#475569',
      textAlign: 'center',
    },
    emptyIcon: {
      marginBottom: '1.5rem',
      opacity: 0.5,
    },
    emptyText: {
      fontSize: '1.1rem',
      fontWeight: '500',
      color: '#64748b',
    },
    emptySubtext: {
      fontSize: '0.9rem',
      marginTop: '0.5rem',
      maxWidth: '250px',
      lineHeight: '1.5',
    },
    analyzingState: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      minHeight: '400px',
    },
    pulseRing: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      backgroundColor: 'rgba(14, 165, 233, 0.1)',
      border: '2px solid rgba(14, 165, 233, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '2rem',
    },
    pulseText: {
      color: '#38bdf8',
      fontSize: '1.1rem',
      fontWeight: '500',
      letterSpacing: '0.02em',
    }
  };

  return (
    <>
      <GlobalStyles />
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.logoContainer}>
            <svg style={styles.logoIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div style={styles.titleWrapper}>
            <h1 style={styles.title}>MediGuide AI</h1>
            <p style={styles.subtitle}>Clinical Decision Support</p>
          </div>
        </header>

        <main style={styles.main}>
          {/* Input Form Column */}
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>
              <div style={styles.iconWrapper}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              Patient Profile
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div style={styles.row}>
                <div style={styles.col}>
                  <label style={styles.label}>Age</label>
                  <input 
                    type="number" 
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="e.g. 45" 
                    style={styles.input} 
                    className="input-field"
                  />
                </div>
                <div style={styles.col}>
                  <label style={styles.label}>Gender</label>
                  <select 
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    style={{...styles.input, appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65rem auto'}} 
                    className="input-field"
                  >
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Primary Symptoms</label>
                <textarea 
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  placeholder="Describe the patient's symptoms in detail..." 
                  style={styles.textarea} 
                  className="input-field"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Medical History (Optional)</label>
                <textarea 
                  name="history"
                  value={formData.history}
                  onChange={handleInputChange}
                  placeholder="Relevant past illnesses, medications, allergies..." 
                  style={{...styles.textarea, minHeight: '80px'}} 
                  className="input-field"
                />
              </div>

              <button 
                type="submit" 
                style={!formData.symptoms || status === 'analyzing' ? styles.buttonDisabled : styles.button}
                className="submit-btn"
                disabled={!formData.symptoms || status === 'analyzing'}
              >
                {status === 'analyzing' ? (
                  <>
                    <div style={{...styles.loader, animation: 'spin 1s linear infinite'}} />
                    Analyzing Data...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Generate Assessment
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Column */}
          <div style={styles.card}>
            {status === 'idle' && (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <div style={styles.emptyText}>Awaiting Patient Data</div>
                <div style={styles.emptySubtext}>Enter patient symptoms and details to generate an AI-powered clinical assessment.</div>
              </div>
            )}

            {status === 'analyzing' && (
              <div style={styles.analyzingState}>
                <div style={styles.pulseRing} className="pulse">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div style={styles.pulseText} className="pulse">Processing clinical indicators...</div>
              </div>
            )}

            {status === 'success' && result && (
              <div style={styles.resultContainer} className="animate-enter">
                <h2 style={styles.sectionTitle}>
                  <div style={styles.iconWrapper}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  Analysis Report
                </h2>

                <div style={styles.reasoningBox} className="animate-enter delay-1">
                  <div style={styles.reasoningTitle}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 16 16 12 12 8" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                    Reasoning Steps
                  </div>
                  {result.reasoning.map((step, index) => (
                    <div key={index} style={styles.reasoningStep}>
                      <div style={styles.stepDot} />
                      <div>{step}</div>
                    </div>
                  ))}
                </div>

                <div style={styles.diagnosisBox} className="animate-enter delay-2">
                  <div style={styles.diagnosisHighlight} />
                  <div style={styles.diagnosisTitle}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    Primary Assessment
                  </div>
                  <p style={styles.diagnosisText}>{result.diagnosis}</p>
                </div>

                <div style={styles.citationsBox} className="animate-enter delay-3">
                  <div style={styles.citationTitle}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                    Evidence & Citations
                  </div>
                  {result.citations.map((cit) => (
                    <div key={cit.id} style={styles.citationItem}>
                      <span style={{ color: '#64748b' }}>[{cit.id}]</span>
                      <div>
                        <div style={{ color: '#e2e8f0', fontWeight: '500' }}>{cit.title}</div>
                        <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.1rem' }}>{cit.source}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
