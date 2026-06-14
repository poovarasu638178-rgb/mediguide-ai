import React, { useState, useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════
   MEDIGUIDE AI  —  Premium Business UI
   Palette: Authentic Teal #035352  ·  Sidecar Yellow #F3E8BC
   Microsoft Agents League Hackathon 2026
   Logo/Favicon: favicon.png (user asset)
═══════════════════════════════════════════════════════════ */

const CSS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Outfit:wght@300;400;500;600;700;800&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --t9: #010e0e;
      --t8: #01201f;
      --t7: #022b2a;
      --t6: #035352;
      --t5: #046a69;
      --t4: #05817f;
      --t3: #2aaba9;
      --t2: #6fcfcd;
      --y:  #F3E8BC;
      --yd: rgba(243,232,188,0.75);
      --ym: rgba(243,232,188,0.45);
      --yl: rgba(243,232,188,0.18);
      --yx: rgba(243,232,188,0.08);
      --glass: rgba(3,83,82,0.35);
      --glass2: rgba(1,32,31,0.6);
      --gb: rgba(243,232,188,0.12);
      --green: #3dd68c;
      --red:   #f87171;
      --r: 16px;
      --rs: 10px;
      --rx: 6px;
      --shadow: 0 4px 32px rgba(0,0,0,0.35);
      --shadow-lg: 0 8px 64px rgba(0,0,0,0.5);
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--t9);
      color: var(--y);
      font-family: 'Outfit', sans-serif;
      font-size: 14px;
      line-height: 1.6;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* ─── Background ─── */
    body::before {
      content: '';
      position: fixed; inset: 0; z-index: 0;
      background:
        radial-gradient(ellipse 90% 70% at -5% -5%,  rgba(5,129,127,0.22) 0%, transparent 55%),
        radial-gradient(ellipse 70% 90% at 105% 105%, rgba(3,83,82,0.30) 0%, transparent 55%),
        radial-gradient(ellipse 40% 40% at 50% 50%,  rgba(243,232,188,0.025) 0%, transparent 70%);
      pointer-events: none;
    }

    #root { position: relative; z-index: 1; display: flex; flex-direction: column; min-height: 100vh; }

    /* ─── Typography ─── */
    .serif { font-family: 'Playfair Display', serif; }
    h1 { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 500; color: var(--y); }
    h2 { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 500; color: var(--y); margin-bottom: 20px; }
    h3 { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ym); margin-bottom: 14px; }

    /* ─── Label ─── */
    .lbl {
      font-size: 10.5px; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--ym); display: block; margin-bottom: 7px;
    }

    /* ─── Glass Card ─── */
    .card {
      background: var(--glass);
      border: 1px solid var(--gb);
      border-radius: var(--r);
      padding: 28px;
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: var(--shadow);
      transition: border-color .25s, box-shadow .25s;
    }
    .card:hover { border-color: rgba(243,232,188,0.2); }
    .card-dark {
      background: var(--glass2);
      border: 1px solid var(--gb);
      border-radius: var(--r);
      padding: 28px;
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: var(--shadow);
    }

    /* ─── Input ─── */
    .inp {
      width: 100%;
      background: rgba(1,14,14,0.6);
      border: 1px solid rgba(243,232,188,0.15);
      color: var(--y);
      border-radius: var(--rs);
      padding: 11px 14px;
      font-family: 'Outfit', sans-serif;
      font-size: 13.5px;
      outline: none;
      transition: border-color .2s, box-shadow .2s, background .2s;
    }
    .inp::placeholder { color: rgba(243,232,188,0.25); }
    .inp:focus { border-color: rgba(243,232,188,0.5); box-shadow: 0 0 0 3px rgba(243,232,188,0.06); background: rgba(1,14,14,0.8); }
    select.inp { appearance: none; cursor: pointer; }
    select.inp option { background: #022b2a; }
    textarea.inp { resize: vertical; min-height: 140px; line-height: 1.7; }

    /* ─── Checkbox Row ─── */
    .chk {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 14px; border-radius: var(--rs);
      border: 1px solid rgba(243,232,188,0.1);
      cursor: pointer; user-select: none;
      font-size: 13px; color: var(--yd);
      transition: background .15s, border-color .15s;
    }
    .chk:hover { background: var(--yx); border-color: rgba(243,232,188,0.22); }
    .chk input { accent-color: var(--t3); width: 15px; height: 15px; flex-shrink: 0; }
    .chk-icon { font-size: 15px; flex-shrink: 0; }

    /* ─── Primary CTA Button ─── */
    .btn {
      width: 100%; border: none; border-radius: var(--rs);
      padding: 13px 20px; cursor: pointer;
      font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700;
      display: flex; align-items: center; justify-content: center; gap: 10px;
      transition: transform .15s, box-shadow .2s, filter .2s;
      position: relative; overflow: hidden;
    }
    .btn-cta { background: var(--y); color: var(--t9); }
    .btn-cta::after {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%);
      opacity: 0; transition: opacity .2s;
    }
    .btn-cta:hover:not(:disabled)::after { opacity: 1; }
    .btn-cta:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 36px rgba(243,232,188,0.22); filter: brightness(1.04); }
    .btn-cta:active:not(:disabled) { transform: translateY(0); }
    .btn-cta:disabled { background: rgba(243,232,188,0.12); color: rgba(243,232,188,0.3); cursor: not-allowed; }
    .btn-ghost {
      background: transparent; color: var(--ym);
      border: 1px solid rgba(243,232,188,0.18);
      padding: 9px 18px; width: auto; border-radius: var(--rs); font-size: 13px; font-weight: 600;
    }
    .btn-ghost:hover { border-color: rgba(243,232,188,0.4); color: var(--y); background: var(--yx); }

    /* ─── Tag / Pill ─── */
    .pill {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 3px 10px; border-radius: 100px;
      font-size: 10.5px; font-weight: 700; letter-spacing: 0.06em;
      border: 1px solid; white-space: nowrap;
    }
    .pill-yellow { background: rgba(243,232,188,0.1); border-color: rgba(243,232,188,0.2); color: var(--ym); }
    .pill-green  { background: rgba(61,214,140,0.1); border-color: rgba(61,214,140,0.3); color: var(--green); }
    .pill-teal   { background: rgba(5,129,127,0.15); border-color: rgba(5,129,127,0.3); color: var(--t2); }

    /* ─── Spinner ─── */
    .spin {
      width: 16px; height: 16px; border-radius: 50%; flex-shrink: 0;
      border: 2px solid rgba(3,83,82,0.4); border-top-color: var(--t9);
      animation: rotate .75s linear infinite;
    }
    @keyframes rotate { to { transform: rotate(360deg); } }

    /* ─── Pulsing dot ─── */
    .pdot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--green); flex-shrink: 0;
      animation: pdot 2s ease-in-out infinite;
    }
    @keyframes pdot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.7);opacity:.45} }

    /* ─── Divider ─── */
    .divider { height: 1px; background: var(--gb); margin: 22px 0; }

    /* ─── Step tracker ─── */
    .step { display: flex; align-items: center; gap: 14px; padding: 13px 0; border-bottom: 1px solid var(--yx); }
    .step:last-child { border-bottom: none; }
    .step-ico {
      width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700;
      transition: all .3s;
    }
    .step-ico.done   { background: rgba(61,214,140,0.12); color: var(--green); border: 1.5px solid rgba(61,214,140,0.3); }
    .step-ico.active { background: rgba(243,232,188,0.1); color: var(--y); border: 1.5px solid rgba(243,232,188,0.35); animation: stepglow 1.4s ease-in-out infinite; }
    .step-ico.pend   { background: var(--yx); color: rgba(243,232,188,0.2); border: 1.5px solid rgba(243,232,188,0.08); }
    @keyframes stepglow { 0%,100%{box-shadow:0 0 0 0 rgba(243,232,188,0.15)} 50%{box-shadow:0 0 0 7px rgba(243,232,188,0)} }

    /* ─── Result block ─── */
    .rb {
      background: rgba(1,14,14,0.45); border: 1px solid rgba(243,232,188,0.1);
      border-radius: var(--rs); padding: 18px 20px; margin-bottom: 12px;
      transition: border-color .2s;
    }
    .rb:last-child { margin-bottom: 0; }
    .rb:hover { border-color: rgba(243,232,188,0.22); }
    .rb.yl { border-left: 3px solid var(--y); }
    .rb.gr { border-left: 3px solid var(--green); }
    .rb.rd { border-left: 3px solid var(--red); }

    /* ─── Number badge ─── */
    .nbadge {
      width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
      background: rgba(243,232,188,0.08); border: 1px solid rgba(243,232,188,0.15);
      color: var(--ym); font-size: 11px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
    }

    /* ─── Error Banner ─── */
    .err-banner {
      background: rgba(248,113,113,0.09); border: 1px solid rgba(248,113,113,0.3);
      border-radius: var(--rs); padding: 13px 16px;
      display: flex; gap: 12px; align-items: flex-start;
      font-size: 13px; color: #fca5a5;
    }

    /* ─── Emergency Banner ─── */
    .eme-banner {
      background: rgba(248,113,113,0.08); border: 1px solid rgba(248,113,113,0.35);
      border-radius: var(--rs); padding: 16px 20px;
      display: flex; gap: 14px; align-items: flex-start; margin-bottom: 22px;
      animation: slideDown .4s ease-out;
    }

    /* ─── Scrollbar ─── */
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(243,232,188,0.12); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(243,232,188,0.25); }

    /* ─── Animations ─── */
    @keyframes slideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
    @keyframes slideUp   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn    { from{opacity:0} to{opacity:1} }

    .au  { animation: slideUp .45s ease-out both; }
    .au1 { animation-delay: .07s; }
    .au2 { animation-delay: .14s; }
    .au3 { animation-delay: .22s; }

    /* ─── Citation ─── */
    .cit { display: flex; gap: 12px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid var(--yx); }
    .cit:last-child { border-bottom: none; padding-bottom: 0; }
    .cit-num {
      width: 26px; height: 26px; border-radius: 7px; flex-shrink: 0;
      background: var(--yx); border: 1px solid rgba(243,232,188,0.12);
      color: var(--ym); font-size: 10px; font-weight: 800;
      display: flex; align-items: center; justify-content: center; margin-top: 1px;
    }

    /* ─── Metric tile ─── */
    .metric {
      background: var(--yx); border: 1px solid var(--gb);
      border-radius: var(--rs); padding: 16px 20px; text-align: center;
    }
    .metric-val { font-family:'Playfair Display',serif; font-size: 26px; font-weight:500; color: var(--y); line-height: 1; }
    .metric-lbl { font-size: 10px; font-weight: 700; letter-spacing:.08em; text-transform:uppercase; color: var(--ym); margin-top: 5px; }

    /* ─── Top Banner ─── */
    .topbar {
      background: linear-gradient(90deg, var(--t8) 0%, #023e3d 50%, var(--t8) 100%);
      border-bottom: 1px solid rgba(243,232,188,0.1);
      padding: 8px 24px; display: flex; align-items: center; justify-content: center; gap: 16px;
    }

    /* ─── Header ─── */
    .header {
      padding: 0 40px; height: 64px;
      border-bottom: 1px solid var(--gb);
      background: rgba(1,14,14,0.85);
      backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px);
      position: sticky; top: 0; z-index: 200;
      display: flex; align-items: center; justify-content: space-between;
    }

    /* ─── Logo ─── */
    .logo-wrap {
      display: flex; align-items: center; gap: 12px; text-decoration: none;
    }
    .logo-ico {
      width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
      background: linear-gradient(135deg, var(--t5) 0%, var(--t6) 100%);
      border: 1px solid rgba(243,232,188,0.2);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 12px rgba(3,83,82,0.6);
    }

    /* ─── Sidebar ─── */
    .sidebar { flex: 0 0 390px; position: sticky; top: 88px; align-self: flex-start; }

    /* ─── Progress Bar ─── */
    .prog-bar {
      height: 3px; border-radius: 2px;
      background: linear-gradient(90deg, var(--t3), var(--y));
      animation: progAnim 2s ease-in-out infinite alternate;
    }
    @keyframes progAnim { from{opacity:.5;transform:scaleX(.7)} to{opacity:1;transform:scaleX(1)} }
    .prog-wrap { background: rgba(243,232,188,0.08); border-radius: 2px; overflow: hidden; }

    /* ─── Hackathon ribbon ─── */
    .hack-badge {
      position: fixed; top: 52px; right: -32px; z-index: 300;
      background: linear-gradient(135deg, #F3E8BC, #e8d9a0);
      color: #035352; font-size: 9.5px; font-weight: 800;
      letter-spacing: 0.08em; text-transform: uppercase;
      padding: 6px 44px; transform: rotate(45deg);
      box-shadow: 0 2px 12px rgba(0,0,0,0.3);
    }
    
    /* ─── Mobile Responsiveness ─── */
    @media (max-width: 900px) {
      .main-layout { flex-direction: column !important; padding: 20px !important; }
      .sidebar { flex: 1 1 auto !important; position: static !important; width: 100% !important; }
      .header { padding: 0 20px !important; }
      .header-right-text { display: none !important; }
    }
  `}</style>
);

/* ── Logo image component using user's favicon.png ── */
const LogoImg = ({ size = 32, style = {} }) => (
  <img src="/favicon.png" alt="MediGuide AI Logo"
    width={size} height={size}
    style={{ borderRadius: 8, objectFit: 'contain', display: 'block', ...style }}
  />
);

/* ══════════════ SVG ICONS ══════════════ */

const CheckIco = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const SpinIco = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{animation:'rotate .75s linear infinite'}}>
    <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
    <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
  </svg>
);

const AlertIco = ({ color = '#f87171' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:1}}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const FileIco = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(243,232,188,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:2}}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

const BrainIco = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(243,232,188,0.45)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.04-4.69A2 2 0 0 1 4 12a2 2 0 0 1 2-2 2.5 2.5 0 0 1 3.5-3.5z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.04-4.69A2 2 0 0 0 20 12a2 2 0 0 0-2-2 2.5 2.5 0 0 0-3.5-3.5z"/>
  </svg>
);

const ArrowIco = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const ShieldIco = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(243,232,188,0.45)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const GridIco = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(243,232,188,0.45)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);

/* ══════════════ EMPTY STATE ══════════════ */
const EmptyState = () => (
  <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:520,gap:24,textAlign:'center',padding:40}}>
    <div style={{
      width:96,height:96,borderRadius:24,
      background:'linear-gradient(135deg,rgba(3,83,82,0.5),rgba(4,106,105,0.3))',
      border:'1px solid rgba(243,232,188,0.1)',
      display:'flex',alignItems:'center',justifyContent:'center',
      boxShadow:'0 0 48px rgba(3,83,82,0.4)',
    }}>
      <LogoImg size={60} style={{borderRadius:12}} />
    </div>
    <div>
      <div style={{fontSize:20,fontFamily:'DM Serif Display,serif',color:'rgba(243,232,188,0.55)',marginBottom:8}}>
        Awaiting Clinical Case
      </div>
      <div style={{fontSize:13,color:'rgba(243,232,188,0.25)',maxWidth:300,lineHeight:1.7}}>
        Enter patient demographics and symptoms in the form to generate an AI-powered clinical assessment.
      </div>
    </div>
    <div style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center'}}>
      {['Demographics','Symptom Analysis','RAG Citations'].map(t=>(
        <div key={t} className="pill pill-teal">{t}</div>
      ))}
    </div>
  </div>
);

/* ══════════════ LOADING PANEL ══════════════ */
const LoadingPanel = ({ step, steps }) => (
  <div className="card" style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:520}}>
    <div style={{width:'100%',maxWidth:400}}>
      <div style={{textAlign:'center',marginBottom:40}}>
        <div style={{
          width:72,height:72,borderRadius:20,
          background:'linear-gradient(135deg,rgba(3,83,82,0.6),rgba(4,106,105,0.4))',
          border:'1px solid rgba(243,232,188,0.15)',
          display:'flex',alignItems:'center',justifyContent:'center',
          margin:'0 auto 20px',
          boxShadow:'0 0 40px rgba(3,83,82,0.5)',
          animation:'stepglow 1.4s ease-in-out infinite',
          padding:8,
        }}>
          <LogoImg size={48} style={{borderRadius:10}} />
        </div>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(243,232,188,0.4)',marginBottom:6}}>
          Azure AI Foundry
        </div>
        <h2 style={{margin:0,fontSize:22}}>Agent Processing</h2>
      </div>

      {/* Progress bar */}
      <div className="prog-wrap" style={{marginBottom:36}}>
        <div className="prog-bar" style={{width:`${Math.round(((step+1)/steps.length)*100)}%`}} />
      </div>

      <div>
        {steps.map((s, i) => {
          const isDone = i < step;
          const isAct  = i === step;
          return (
            <div key={i} className="step" style={{opacity: i > step ? 0.35 : 1, transition:'opacity .4s'}}>
              <div className={`step-ico ${isDone?'done':isAct?'active':'pend'}`}>
                {isDone ? <CheckIco /> : isAct ? <SpinIco /> : <span style={{fontSize:11}}>{i+1}</span>}
              </div>
              <div style={{
                fontSize:13.5, lineHeight:1.4,
                fontWeight: isAct ? 600 : 400,
                color: isDone ? 'rgba(243,232,188,0.6)' : isAct ? 'var(--y)' : 'rgba(243,232,188,0.3)',
              }}>
                {s}
              </div>
              {isAct && (
                <div className="pill pill-yellow" style={{marginLeft:'auto',fontSize:9.5}}>Running</div>
              )}
              {isDone && (
                <div style={{marginLeft:'auto',color:'var(--green)',fontSize:11}}>✓</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

/* ══════════════ MAIN APP ══════════════ */
const API_URL = import.meta.env.VITE_API_URL || 'https://mediguide-ai-backend-1w8b.onrender.com';

export default function App() {
  const [form, setForm] = useState({
    age: '', gender: '', location: '', symptoms: '',
    resources: { lab: false, imaging: false, iv: false, specialist: false }
  });
  const [status, setStatus]       = useState('idle');
  const [loadStep, setLoadStep]   = useState(0);
  const [result, setResult]       = useState(null);
  const [error, setError]         = useState(null);
  const [caseCount, setCaseCount] = useState(0);
  const resultsRef = useRef(null);

  const STEPS = [
    'Validating patient demographics',
    'Parsing clinical symptom presentation',
    'Cross-referencing WHO & CDC guidelines',
    'Formulating differential diagnosis',
    'Generating resource-adapted protocol',
  ];

  /* animate steps while loading */
  useEffect(() => {
    if (status !== 'analyzing') return;
    let i = 0;
    const iv = setInterval(() => { i++; if (i < STEPS.length) setLoadStep(i); else clearInterval(iv); }, 950);
    return () => clearInterval(iv);
  }, [status]);

  /* scroll to results */
  useEffect(() => {
    if (status === 'success' && resultsRef.current) {
      setTimeout(() => resultsRef.current.scrollIntoView({ behavior:'smooth', block:'start' }), 100);
    }
  }, [status]);

  const setField  = e => setForm({ ...form, [e.target.name]: e.target.value });
  const setCheck  = e => setForm({ ...form, resources: { ...form.resources, [e.target.name]: e.target.checked } });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.symptoms.trim()) return;
    setStatus('analyzing'); setLoadStep(0); setResult(null); setError(null);
    try {
      const res = await fetch(`${API_URL}/api/diagnose`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: form.age, gender: form.gender, location: form.location,
          symptoms: form.symptoms, resources: form.resources
        })
      });
      const data = await res.json();
      setResult(data);
      setStatus('success');
      setCaseCount(n => n + 1);
    } catch {
      setError('Unable to reach the MediGuide AI agent. Check that the backend is running and accessible.');
      setStatus('idle');
    }
  };

  const reset = () => {
    setStatus('idle'); setResult(null); setError(null);
    setForm({ age:'', gender:'', location:'', symptoms:'', resources:{lab:false,imaging:false,iv:false,specialist:false} });
  };

  const busy = status === 'analyzing';

  return (
    <>
      <CSS />

      <header className="header">
        {/* Logo */}
        <a className="logo-wrap" href="#" onClick={e=>e.preventDefault()}>
          <div className="logo-ico" style={{padding:4,background:'transparent',border:'none',boxShadow:'none'}}>
            <LogoImg size={34} style={{borderRadius:8}} />
          </div>
          <div>
            <div style={{fontSize:17,fontFamily:'Playfair Display,serif',fontWeight:500,color:'var(--y)',lineHeight:1}}>MediGuide AI</div>
            <div style={{fontSize:10,color:'rgba(243,232,188,0.38)',fontWeight:600,letterSpacing:'0.07em',textTransform:'uppercase',marginTop:2}}>
              Clinical Decision Support
            </div>
          </div>
        </a>

        {/* Header right */}
        <div style={{display:'flex',alignItems:'center',gap:16}}>
          {caseCount > 0 && (
            <div className="header-right-text" style={{display:'flex',alignItems:'center',gap:7,fontSize:12,color:'rgba(243,232,188,0.4)'}}>
              <GridIco />
              <span>{caseCount} case{caseCount>1?'s':''} analyzed</span>
            </div>
          )}
          <div className="header-right-text" style={{width:1,height:20,background:'rgba(243,232,188,0.1)'}}/>
          <div style={{display:'flex',alignItems:'center',gap:7}}>
            <div className="pdot"/>
            <span style={{fontSize:12,color:'rgba(243,232,188,0.4)',fontWeight:500}}>Agent Online</span>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <main className="main-layout" style={{flex:1,display:'flex',gap:28,padding:'32px 40px',maxWidth:1360,margin:'0 auto',width:'100%',alignItems:'flex-start'}}>

        {/* ════════ SIDEBAR / FORM ════════ */}
        <aside className="sidebar">

          {/* Form card */}
          <div className="card" style={{marginBottom:16}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:22}}>
              <h2 style={{margin:0,fontSize:18}}>Patient Case</h2>
              <div className="pill pill-yellow">New</div>
            </div>

            <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:16}}>

              {/* Age + Gender */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div>
                  <label className="lbl">Age</label>
                  <input type="number" name="age" value={form.age} onChange={setField}
                    placeholder="yrs" className="inp" min="0" max="120" />
                </div>
                <div>
                  <label className="lbl">Gender</label>
                  <select name="gender" value={form.gender} onChange={setField} className="inp">
                    <option value="" disabled>Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="lbl">Facility / Location</label>
                <input type="text" name="location" value={form.location} onChange={setField}
                  placeholder="e.g. Rural Clinic, Ward B, KIOT Hospital" className="inp" />
              </div>

              {/* Symptoms */}
              <div>
                <label className="lbl">Clinical Presentation</label>
                <textarea name="symptoms" value={form.symptoms} onChange={setField}
                  placeholder="Chief complaint, onset, duration, associated symptoms, vitals…"
                  className="inp" required />
              </div>

              {/* Resources */}
              <div>
                <label className="lbl" style={{marginBottom:10}}>Available Resources</label>
                <div style={{display:'flex',flexDirection:'column',gap:8}}>
                  {[
                    ['lab','🧪','Basic Lab (CBC / CMP)'],
                    ['imaging','🔬','Imaging (X-Ray / Ultrasound)'],
                    ['iv','💉','IV Access & Fluids'],
                    ['specialist','📡','Specialist Tele-consult'],
                  ].map(([name,ico,label])=>(
                    <label key={name} className="chk">
                      <input type="checkbox" name={name} checked={form.resources[name]} onChange={setCheck}/>
                      <span className="chk-icon">{ico}</span>
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="err-banner">
                  <AlertIco />
                  <span>{error}</span>
                </div>
              )}

              <div style={{height:4}}/>

              {/* Submit */}
              <button type="submit" className="btn btn-cta" disabled={!form.symptoms.trim()||busy}>
                {busy
                  ? <><div className="spin"/>Processing Assessment…</>
                  : <>Run Clinical Assessment &nbsp;<ArrowIco/></>
                }
              </button>

              {/* Reset when done */}
              {status==='success' && (
                <button type="button" className="btn btn-ghost" style={{width:'100%'}} onClick={reset}>
                  ← New Assessment
                </button>
              )}
            </form>
          </div>

          {/* Info card */}
          <div className="card-dark" style={{padding:20}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
              <ShieldIco/>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(243,232,188,0.4)'}}>
                Clinical Notice
              </span>
            </div>
            <p style={{fontSize:12,color:'rgba(243,232,188,0.3)',lineHeight:1.7,margin:0}}>
              For decision support only. Always apply professional medical judgement.
              Not a substitute for direct patient care or specialist consultation.
            </p>
          </div>
        </aside>

        {/* ════════ RESULTS PANEL ════════ */}
        <section style={{flex:1}} ref={resultsRef}>

          {/* IDLE */}
          {status==='idle' && <EmptyState />}

          {/* ANALYZING */}
          {status==='analyzing' && <LoadingPanel step={loadStep} steps={STEPS}/>}

          {/* SUCCESS */}
          {status==='success' && result && (
            <div style={{animation:'slideUp .45s ease-out'}}>

              {/* ── Top metrics row ── */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14,marginBottom:22}}>
                <div className="metric">
                  <div className="metric-val">✓</div>
                  <div className="metric-lbl">Assessment Complete</div>
                </div>
                <div className="metric">
                  <div className="metric-val" style={{fontSize:20}}>
                    {Array.isArray(result.reasoning_steps) ? result.reasoning_steps.length : '—'}
                  </div>
                  <div className="metric-lbl">Reasoning Steps</div>
                </div>
                <div className="metric">
                  <div className="metric-val" style={{fontSize:20}}>
                    {Array.isArray(result.citations) ? result.citations.length : '—'}
                  </div>
                  <div className="metric-lbl">Citations</div>
                </div>
              </div>

              {/* ── Clinical Assessment ── */}
              <div className="card au" style={{marginBottom:18}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:18}}>
                  <div style={{
                    width:34,height:34,borderRadius:9,
                    background:'rgba(61,214,140,0.1)',border:'1px solid rgba(61,214,140,0.25)',
                    display:'flex',alignItems:'center',justifyContent:'center',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3dd68c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h2 style={{margin:0}}>Clinical Assessment</h2>
                  <div className="pill pill-green" style={{marginLeft:'auto'}}>AI Generated</div>
                </div>
                <div className="rb yl" style={{marginBottom:0,fontSize:14.5,lineHeight:1.85,whiteSpace:'pre-wrap',color:'var(--y)'}}>
                  {result.response}
                </div>
              </div>

              {/* ── Reasoning Steps ── */}
              {Array.isArray(result.reasoning_steps) && result.reasoning_steps.length > 0 && (
                <div className="card au au1" style={{marginBottom:18}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:18}}>
                    <BrainIco/>
                    <h2 style={{margin:0}}>Agent Reasoning Chain</h2>
                    <div className="pill pill-teal" style={{marginLeft:'auto'}}>{result.reasoning_steps.length} steps</div>
                  </div>
                  {result.reasoning_steps.map((s,i)=>(
                    <div key={i} style={{display:'flex',gap:14,padding:'13px 0',borderBottom:'1px solid rgba(243,232,188,0.07)'}}>
                      <div className="nbadge">{i+1}</div>
                      <div style={{fontSize:13.5,lineHeight:1.7,color:'rgba(243,232,188,0.75)',paddingTop:2}}>
                        {typeof s==='object'?(s.content||s.step||JSON.stringify(s)):s}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Citations ── */}
              {Array.isArray(result.citations) && result.citations.length > 0 && (
                <div className="card au au2">
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                    <FileIco/>
                    <h2 style={{margin:0}}>Evidence Citations</h2>
                    <div className="pill pill-yellow" style={{marginLeft:'auto'}}>{result.citations.length} sources</div>
                  </div>
                  {result.citations.map((c,i)=>(
                    <div key={i} className="cit">
                      <div className="cit-num">{i+1}</div>
                      <div style={{flex:1}}>
                        {typeof c==='string'
                          ? <div style={{fontSize:13,color:'var(--y)',lineHeight:1.6}}>{c}</div>
                          : <>
                              {c.id    && <div style={{fontSize:10.5,fontWeight:800,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--ym)',marginBottom:4}}>{c.id}</div>}
                              {c.title && <div style={{fontSize:13.5,color:'var(--y)',lineHeight:1.55,fontWeight:500}}>{c.title}</div>}
                              {c.url   && <a href={c.url} target="_blank" rel="noreferrer"
                                style={{display:'inline-block',marginTop:5,fontSize:11.5,color:'var(--t2)',textDecoration:'none'}}>
                                ↗ {c.url}
                              </a>}
                              {c.snippet && <div style={{fontSize:12,color:'rgba(243,232,188,0.35)',marginTop:6,lineHeight:1.65}}>{c.snippet}</div>}
                              {!c.id&&!c.title&&<div style={{fontSize:13,color:'var(--y)'}}>{JSON.stringify(c)}</div>}
                            </>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Footer actions ── */}
              <div className="au au3" style={{marginTop:20,display:'flex',justifyContent:'flex-end',gap:10}}>
                <button className="btn btn-ghost" onClick={reset}>← New Assessment</button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* ── Footer ── */}
      <footer style={{borderTop:'1px solid var(--gb)',padding:'20px 40px',display:'flex',alignItems:'center',justifyContent:'center',gap:16}}>
        <LogoImg size={26} style={{borderRadius:7,opacity:0.7}} />
        <span style={{fontSize:13,color:'rgba(243,232,188,0.45)',fontWeight:500,letterSpacing:'0.01em'}}>
          <strong style={{color:'rgba(243,232,188,0.7)',fontFamily:'DM Serif Display,serif',fontWeight:400,fontSize:14}}>MediGuide AI</strong>
          {' '}—{' '}
          Created by <strong style={{color:'rgba(243,232,188,0.65)',fontWeight:600}}>Poovarasu S</strong>{' '}
          for{' '}
          <strong style={{color:'rgba(243,232,188,0.65)',fontWeight:600}}>Microsoft Agents League Hackathon 2026</strong>
        </span>
        <span style={{fontSize:16}}>🏆</span>
      </footer>
    </>
  );
}
