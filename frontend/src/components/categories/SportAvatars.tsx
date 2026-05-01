"use client";

export function CricketAvatar() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="cBg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#1a3a6b" />
          <stop offset="100%" stopColor="#050d1c" />
        </radialGradient>
      </defs>

      {/* Background */}
      <circle cx="50" cy="50" r="50" fill="url(#cBg)" />
      <circle cx="50" cy="50" r="47" fill="none" stroke="#e8a000" strokeWidth="1.5" opacity="0.6" />

      {/* TOP LABEL */}
      <text x="50" y="13" textAnchor="middle" fill="#e8a000" fontSize="5.5"
        fontFamily="sans-serif" letterSpacing="2.5" fontWeight="700" opacity="0.9">
        CRICKET LEGENDS
      </text>
      <line x1="14" y1="15.5" x2="86" y2="15.5" stroke="#e8a000" strokeWidth="0.6" opacity="0.4" />

      {/* THREE JERSEY CIRCLES */}
      {/* Left — Dhoni #7 */}
      <circle cx="22" cy="40" r="14" fill="none" stroke="#e8a000" strokeWidth="1.2" opacity="0.5" />
      <circle cx="22" cy="40" r="13" fill="#e8a00018" />
      <text x="22" y="37" textAnchor="middle" fill="#e8a000" fontSize="14"
        fontFamily="sans-serif" fontWeight="900" opacity="0.95">7</text>
      <text x="22" y="48" textAnchor="middle" fill="white" fontSize="4.8"
        fontFamily="sans-serif" letterSpacing="0.5" opacity="0.85">DHONI</text>

      {/* Center — Virat #18 (bigger, hero) */}
      <circle cx="50" cy="39" r="17" fill="none" stroke="#e8a000" strokeWidth="1.8" opacity="0.8" />
      <circle cx="50" cy="39" r="16" fill="#e8a00025" />
      <text x="50" y="36" textAnchor="middle" fill="#e8a000" fontSize="17"
        fontFamily="sans-serif" fontWeight="900" opacity="1">18</text>
      <text x="50" y="48" textAnchor="middle" fill="white" fontSize="5"
        fontFamily="sans-serif" letterSpacing="0.5" opacity="0.9">VIRAT</text>

      {/* Right — Rohit #45 */}
      <circle cx="78" cy="40" r="14" fill="none" stroke="#e8a000" strokeWidth="1.2" opacity="0.5" />
      <circle cx="78" cy="40" r="13" fill="#e8a00018" />
      <text x="78" y="37" textAnchor="middle" fill="#e8a000" fontSize="12"
        fontFamily="sans-serif" fontWeight="900" opacity="0.95">45</text>
      <text x="78" y="48" textAnchor="middle" fill="white" fontSize="4.8"
        fontFamily="sans-serif" letterSpacing="0.5" opacity="0.85">ROHIT</text>

      {/* Cricket bat + ball decoration */}
      <line x1="30" y1="72" x2="38" y2="58" stroke="white" strokeWidth="2.5"
        strokeLinecap="round" opacity="0.25" />
      <rect x="28" y="72" width="7" height="3" rx="1" fill="white" opacity="0.2" />
      <circle cx="62" cy="68" r="4" fill="#dc2626" opacity="0.35" />

      {/* Bottom divider + stars */}
      <line x1="14" y1="80" x2="86" y2="80" stroke="#e8a000" strokeWidth="0.6" opacity="0.4" />
      <text x="50" y="91" textAnchor="middle" fill="#e8a000" fontSize="9"
        fontFamily="sans-serif" opacity="0.9">★  ★  ★</text>
    </svg>
  );
}

export function BasketballAvatar() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="bBg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#3d1a6e" />
          <stop offset="100%" stopColor="#0e0520" />
        </radialGradient>
      </defs>

      {/* Background */}
      <circle cx="50" cy="50" r="50" fill="url(#bBg)" />
      <circle cx="50" cy="50" r="47" fill="none" stroke="#e8a000" strokeWidth="1.5" opacity="0.6" />

      {/* TOP LABEL */}
      <text x="50" y="13" textAnchor="middle" fill="#e8a000" fontSize="5.5"
        fontFamily="sans-serif" letterSpacing="2.5" fontWeight="700" opacity="0.9">
        NBA LEGENDS
      </text>
      <line x1="14" y1="15.5" x2="86" y2="15.5" stroke="#e8a000" strokeWidth="0.6" opacity="0.4" />

      {/* Left — Jordan #23 */}
      <circle cx="22" cy="40" r="14" fill="none" stroke="#e8620a" strokeWidth="1.2" opacity="0.6" />
      <circle cx="22" cy="40" r="13" fill="#e8620a18" />
      <text x="22" y="37" textAnchor="middle" fill="#e8620a" fontSize="14"
        fontFamily="sans-serif" fontWeight="900" opacity="0.95">23</text>
      <text x="22" y="48" textAnchor="middle" fill="white" fontSize="4.2"
        fontFamily="sans-serif" letterSpacing="0.3" opacity="0.85">JORDAN</text>

      {/* Center — Kobe #24 (hero) */}
      <circle cx="50" cy="39" r="17" fill="none" stroke="#e8a000" strokeWidth="1.8" opacity="0.9" />
      <circle cx="50" cy="39" r="16" fill="#e8a00025" />
      <text x="50" y="36" textAnchor="middle" fill="#e8a000" fontSize="17"
        fontFamily="sans-serif" fontWeight="900" opacity="1">24</text>
      <text x="50" y="48" textAnchor="middle" fill="white" fontSize="5"
        fontFamily="sans-serif" letterSpacing="0.5" opacity="0.9">KOBE</text>

      {/* Right — LeBron #6 */}
      <circle cx="78" cy="40" r="14" fill="none" stroke="#e8620a" strokeWidth="1.2" opacity="0.6" />
      <circle cx="78" cy="40" r="13" fill="#e8620a18" />
      <text x="78" y="37" textAnchor="middle" fill="#e8620a" fontSize="14"
        fontFamily="sans-serif" fontWeight="900" opacity="0.95">6</text>
      <text x="78" y="48" textAnchor="middle" fill="white" fontSize="4.2"
        fontFamily="sans-serif" letterSpacing="0.3" opacity="0.85">LEBRON</text>

      {/* Basketball decoration */}
      <circle cx="50" cy="67" r="7" fill="#e8620a" opacity="0.2" />
      <path d="M43,67 Q50,63 57,67" stroke="#e8620a" strokeWidth="0.8" fill="none" opacity="0.3" />
      <path d="M43,67 Q50,71 57,67" stroke="#e8620a" strokeWidth="0.8" fill="none" opacity="0.3" />
      <line x1="50" y1="60" x2="50" y2="74" stroke="#e8620a" strokeWidth="0.8" opacity="0.3" />

      {/* Bottom */}
      <line x1="14" y1="80" x2="86" y2="80" stroke="#e8a000" strokeWidth="0.6" opacity="0.4" />
      <text x="50" y="91" textAnchor="middle" fill="#e8a000" fontSize="9"
        fontFamily="sans-serif" opacity="0.9">★  ★  ★</text>
    </svg>
  );
}

export function FootballAvatar() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="fBg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#0d3b20" />
          <stop offset="100%" stopColor="#030c07" />
        </radialGradient>
      </defs>

      {/* Background */}
      <circle cx="50" cy="50" r="50" fill="url(#fBg)" />
      <circle cx="50" cy="50" r="47" fill="none" stroke="#e8a000" strokeWidth="1.5" opacity="0.6" />

      {/* TOP LABEL */}
      <text x="50" y="13" textAnchor="middle" fill="#e8a000" fontSize="5.5"
        fontFamily="sans-serif" letterSpacing="2" fontWeight="700" opacity="0.9">
        FOOTBALL LEGENDS
      </text>
      <line x1="14" y1="15.5" x2="86" y2="15.5" stroke="#e8a000" strokeWidth="0.6" opacity="0.4" />

      {/* Left — Messi #10 */}
      <circle cx="22" cy="40" r="14" fill="none" stroke="#4ade80" strokeWidth="1.2" opacity="0.5" />
      <circle cx="22" cy="40" r="13" fill="#4ade8015" />
      <text x="22" y="37" textAnchor="middle" fill="#4ade80" fontSize="14"
        fontFamily="sans-serif" fontWeight="900" opacity="0.9">10</text>
      <text x="22" y="48" textAnchor="middle" fill="white" fontSize="4.5"
        fontFamily="sans-serif" letterSpacing="0.3" opacity="0.85">MESSI</text>

      {/* Center — Ronaldo #7 (hero) */}
      <circle cx="50" cy="39" r="17" fill="none" stroke="#e8a000" strokeWidth="1.8" opacity="0.9" />
      <circle cx="50" cy="39" r="16" fill="#e8a00025" />
      <text x="50" y="36" textAnchor="middle" fill="#e8a000" fontSize="17"
        fontFamily="sans-serif" fontWeight="900" opacity="1">7</text>
      <text x="50" y="48" textAnchor="middle" fill="white" fontSize="4.5"
        fontFamily="sans-serif" letterSpacing="0.3" opacity="0.9">RONALDO</text>

      {/* Right — Mbappé #10 */}
      <circle cx="78" cy="40" r="14" fill="none" stroke="#4ade80" strokeWidth="1.2" opacity="0.5" />
      <circle cx="78" cy="40" r="13" fill="#4ade8015" />
      <text x="78" y="37" textAnchor="middle" fill="#4ade80" fontSize="14"
        fontFamily="sans-serif" fontWeight="900" opacity="0.9">10</text>
      <text x="78" y="48" textAnchor="middle" fill="white" fontSize="4.5"
        fontFamily="sans-serif" letterSpacing="0.3" opacity="0.85">MBAPPÉ</text>

      {/* Football decoration */}
      <circle cx="50" cy="67" r="7" fill="white" opacity="0.12" />
      <polygon points="50,61 53,64 52,68 48,68 47,64" fill="white" opacity="0.15" />

      {/* Bottom */}
      <line x1="14" y1="80" x2="86" y2="80" stroke="#e8a000" strokeWidth="0.6" opacity="0.4" />
      <text x="50" y="91" textAnchor="middle" fill="#e8a000" fontSize="9"
        fontFamily="sans-serif" opacity="0.9">★  ★  ★</text>
    </svg>
  );
}
