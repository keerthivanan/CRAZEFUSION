"use client";

export function CricketAvatar() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="cBg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#1a3a6b" />
          <stop offset="100%" stopColor="#060e1f" />
        </radialGradient>
      </defs>

      {/* Background */}
      <circle cx="50" cy="50" r="50" fill="url(#cBg)" />
      <circle cx="50" cy="50" r="47" fill="none" stroke="#e8a000" strokeWidth="1.2" opacity="0.5" />

      {/* Ground line */}
      <line x1="12" y1="76" x2="88" y2="76" stroke="#e8a000" strokeWidth="0.8" opacity="0.4" />

      {/* ── WICKETS (right side) ── */}
      <rect x="72" y="62" width="2" height="14" rx="0.5" fill="#e8a000" opacity="0.9" />
      <rect x="77" y="62" width="2" height="14" rx="0.5" fill="#e8a000" opacity="0.9" />
      <rect x="82" y="62" width="2" height="14" rx="0.5" fill="#e8a000" opacity="0.9" />
      <rect x="70" y="61" width="16" height="2.5" rx="0.5" fill="#e8a000" opacity="0.9" />

      {/* ── LEFT PLAYER — Bowler ── */}
      {/* head */}
      <circle cx="20" cy="36" r="5.5" fill="#e8a000" opacity="0.85" />
      {/* torso */}
      <path d="M16,42 C16,50 15,58 15,63 L19,63 L20,55 L21,63 L25,63 C25,58 24,50 24,42 Z"
        fill="#e8a000" opacity="0.85" />
      {/* bowling arm raised back */}
      <line x1="24" y1="45" x2="32" y2="37" stroke="#e8a000" strokeWidth="2.8" strokeLinecap="round" opacity="0.85" />
      {/* ball in hand */}
      <circle cx="33" cy="36" r="3.5" fill="#dc2626" />
      <path d="M30,34 Q33,32 36,34" stroke="#fff" strokeWidth="0.7" fill="none" opacity="0.7" />
      {/* legs */}
      <path d="M17,63 L15,76 L19,76 L21,63 Z" fill="#e8a000" opacity="0.85" />
      <path d="M23,63 L25,76 L21,76 L21,63 Z" fill="#e8a000" opacity="0.85" />

      {/* ── CENTER PLAYER — Batsman (hero) ── */}
      {/* head */}
      <circle cx="50" cy="25" r="7.5" fill="white" />
      {/* helmet visor */}
      <path d="M42.5,24 Q50,16 57.5,24" fill="#e8a000" />
      {/* torso */}
      <path d="M43,33 C42,42 41,53 41,59 L46,59 L50,50 L54,59 L59,59 C59,53 58,42 57,33 Z" fill="white" />
      {/* batting arm (extends right, up) */}
      <line x1="57" y1="37" x2="67" y2="30" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      {/* bat blade */}
      <path d="M65,22 L70,25 L62,47 L57,44 Z" fill="#e8a000" />
      {/* bat handle */}
      <rect x="62" y="45" width="4" height="7" rx="1" fill="white" opacity="0.9" />
      {/* front leg */}
      <path d="M44,59 L41,76 L46,76 L49,59 Z" fill="white" />
      {/* back leg */}
      <path d="M56,59 L59,76 L54,76 L51,59 Z" fill="white" />

      {/* ── RIGHT PLAYER — Fielder ── */}
      <circle cx="80" cy="36" r="5.5" fill="#e8a000" opacity="0.85" />
      <path d="M76,42 C76,50 75,58 75,63 L79,63 L80,55 L81,63 L85,63 C85,58 84,50 84,42 Z"
        fill="#e8a000" opacity="0.85" />
      {/* arms spread to catch */}
      <line x1="76" y1="45" x2="68" y2="41" stroke="#e8a000" strokeWidth="2.8" strokeLinecap="round" opacity="0.85" />
      <line x1="84" y1="45" x2="91" y2="42" stroke="#e8a000" strokeWidth="2.8" strokeLinecap="round" opacity="0.85" />
      {/* legs */}
      <path d="M77,63 L75,76 L79,76 L81,63 Z" fill="#e8a000" opacity="0.85" />
      <path d="M83,63 L85,76 L81,76 L81,63 Z" fill="#e8a000" opacity="0.85" />

      {/* ★ Three stars ★ */}
      <text x="50" y="92" textAnchor="middle" fill="#e8a000" fontSize="9" opacity="0.95">★  ★  ★</text>
    </svg>
  );
}

export function BasketballAvatar() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="bBg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#3d1a6e" />
          <stop offset="100%" stopColor="#100820" />
        </radialGradient>
      </defs>

      {/* Background */}
      <circle cx="50" cy="50" r="50" fill="url(#bBg)" />
      <circle cx="50" cy="50" r="47" fill="none" stroke="#e8a000" strokeWidth="1.2" opacity="0.5" />

      {/* Court line */}
      <line x1="12" y1="76" x2="88" y2="76" stroke="#e8a000" strokeWidth="0.8" opacity="0.4" />

      {/* ── LEFT PLAYER — Dribbling ── */}
      <circle cx="19" cy="34" r="5.5" fill="#e8a000" opacity="0.85" />
      <path d="M15,40 C15,48 14,57 14,62 L18,62 L19,54 L20,62 L24,62 C24,57 23,48 23,40 Z"
        fill="#e8a000" opacity="0.85" />
      {/* dribbling arm down */}
      <line x1="15" y1="44" x2="11" y2="54" stroke="#e8a000" strokeWidth="2.8" strokeLinecap="round" opacity="0.85" />
      {/* ball on floor */}
      <circle cx="11" cy="58" r="4.5" fill="#e8620a" opacity="0.9" />
      <path d="M7,58 Q11,55 15,58" stroke="#111" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M7,58 Q11,61 15,58" stroke="#111" strokeWidth="0.8" fill="none" opacity="0.6" />
      <line x1="11" y1="53" x2="11" y2="63" stroke="#111" strokeWidth="0.8" opacity="0.6" />
      {/* other arm */}
      <line x1="23" y1="44" x2="28" y2="50" stroke="#e8a000" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
      {/* legs */}
      <path d="M16,62 L14,76 L18,76 L20,62 Z" fill="#e8a000" opacity="0.85" />
      <path d="M22,62 L24,76 L20,76 L20,62 Z" fill="#e8a000" opacity="0.85" />

      {/* ── CENTER PLAYER — Dunking (hero) ── */}
      <circle cx="50" cy="22" r="7.5" fill="white" />
      <path d="M43,30 C42,39 42,49 42,55 L47,55 L50,46 L53,55 L58,55 C58,49 58,39 57,30 Z" fill="white" />
      {/* arms raised for dunk */}
      <line x1="43" y1="33" x2="35" y2="25" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="57" y1="33" x2="64" y2="25" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      {/* basketball above */}
      <circle cx="50" cy="11" r="8" fill="#e8620a" />
      <path d="M42,11 Q50,7 58,11" stroke="#111" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M42,11 Q50,15 58,11" stroke="#111" strokeWidth="1" fill="none" opacity="0.6" />
      <line x1="50" y1="3" x2="50" y2="19" stroke="#111" strokeWidth="1" opacity="0.6" />
      {/* jumping legs */}
      <path d="M44,55 L40,70 L45,71 L48,55 Z" fill="white" />
      <path d="M56,55 L60,70 L55,71 L52,55 Z" fill="white" />

      {/* ── RIGHT PLAYER — Shooting ── */}
      <circle cx="81" cy="34" r="5.5" fill="#e8a000" opacity="0.85" />
      <path d="M77,40 C77,48 76,57 76,62 L80,62 L81,54 L82,62 L86,62 C86,57 85,48 85,40 Z"
        fill="#e8a000" opacity="0.85" />
      {/* shooting arm raised */}
      <line x1="85" y1="43" x2="92" y2="34" stroke="#e8a000" strokeWidth="2.8" strokeLinecap="round" opacity="0.85" />
      {/* ball at fingertip */}
      <circle cx="93" cy="31" r="4" fill="#e8620a" opacity="0.9" />
      {/* other arm */}
      <line x1="77" y1="43" x2="71" y2="48" stroke="#e8a000" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
      {/* legs */}
      <path d="M78,62 L76,76 L80,76 L82,62 Z" fill="#e8a000" opacity="0.85" />
      <path d="M84,62 L86,76 L82,76 L82,62 Z" fill="#e8a000" opacity="0.85" />

      {/* ★ Three stars ★ */}
      <text x="50" y="92" textAnchor="middle" fill="#e8a000" fontSize="9" opacity="0.95">★  ★  ★</text>
    </svg>
  );
}

export function FootballAvatar() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="fBg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#0d3b20" />
          <stop offset="100%" stopColor="#040c06" />
        </radialGradient>
      </defs>

      {/* Background */}
      <circle cx="50" cy="50" r="50" fill="url(#fBg)" />
      <circle cx="50" cy="50" r="47" fill="none" stroke="#e8a000" strokeWidth="1.2" opacity="0.5" />

      {/* Grass */}
      <line x1="12" y1="76" x2="88" y2="76" stroke="#4ade80" strokeWidth="0.8" opacity="0.35" />

      {/* ── LEFT PLAYER — Celebrating ── */}
      <circle cx="19" cy="34" r="5.5" fill="#e8a000" opacity="0.85" />
      <path d="M15,40 C15,48 14,57 14,62 L18,62 L19,54 L20,62 L24,62 C24,57 23,48 23,40 Z"
        fill="#e8a000" opacity="0.85" />
      {/* both arms raised high */}
      <line x1="15" y1="43" x2="8" y2="34" stroke="#e8a000" strokeWidth="2.8" strokeLinecap="round" opacity="0.85" />
      <line x1="23" y1="43" x2="30" y2="34" stroke="#e8a000" strokeWidth="2.8" strokeLinecap="round" opacity="0.85" />
      {/* legs */}
      <path d="M16,62 L14,76 L18,76 L20,62 Z" fill="#e8a000" opacity="0.85" />
      <path d="M22,62 L24,76 L20,76 L20,62 Z" fill="#e8a000" opacity="0.85" />

      {/* ── CENTER PLAYER — Kicking (hero) ── */}
      <circle cx="50" cy="23" r="7.5" fill="white" />
      <path d="M43,31 C42,40 42,50 42,56 L47,56 L50,47 L53,56 L58,56 C58,50 58,40 57,31 Z" fill="white" />
      {/* balance arm */}
      <line x1="42" y1="35" x2="32" y2="41" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      {/* other arm */}
      <line x1="58" y1="35" x2="66" y2="31" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      {/* standing leg */}
      <path d="M44,56 L42,72 L47,72 L50,56 Z" fill="white" />
      {/* kicking leg (raised, bent knee) */}
      <path d="M56,56 L62,63 L58,66 L52,57 Z" fill="white" />
      <path d="M62,63 L68,72 L64,74 L58,65 Z" fill="white" />
      {/* football (near kicking boot) */}
      <circle cx="72" cy="71" r="8" fill="white" />
      {/* pentagon pattern on ball */}
      <polygon points="72,65 76,68 74,73 70,73 68,68" fill="#111" opacity="0.8" />
      <line x1="72" y1="63" x2="72" y2="65" stroke="#555" strokeWidth="0.8" opacity="0.5" />
      <line x1="78" y1="65" x2="76" y2="68" stroke="#555" strokeWidth="0.8" opacity="0.5" />
      <line x1="75" y1="73" x2="74" y2="73" stroke="#555" strokeWidth="0.8" opacity="0.5" />
      <line x1="66" y1="65" x2="68" y2="68" stroke="#555" strokeWidth="0.8" opacity="0.5" />
      <line x1="69" y1="73" x2="70" y2="73" stroke="#555" strokeWidth="0.8" opacity="0.5" />

      {/* ── RIGHT PLAYER — Goalkeeper ── */}
      <circle cx="81" cy="34" r="5.5" fill="#e8a000" opacity="0.85" />
      <path d="M77,40 C77,48 76,57 76,62 L80,62 L81,54 L82,62 L86,62 C86,57 85,48 85,40 Z"
        fill="#e8a000" opacity="0.85" />
      {/* diving arm */}
      <line x1="85" y1="43" x2="93" y2="37" stroke="#e8a000" strokeWidth="2.8" strokeLinecap="round" opacity="0.85" />
      <line x1="77" y1="43" x2="70" y2="47" stroke="#e8a000" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
      {/* legs */}
      <path d="M78,62 L76,76 L80,76 L82,62 Z" fill="#e8a000" opacity="0.85" />
      <path d="M84,62 L86,76 L82,76 L82,62 Z" fill="#e8a000" opacity="0.85" />

      {/* ★ Three stars ★ */}
      <text x="50" y="92" textAnchor="middle" fill="#e8a000" fontSize="9" opacity="0.95">★  ★  ★</text>
    </svg>
  );
}
