const BASE = { x: 185, y: 192 };           // boom pivot
const TIP = { x: 318, y: 44 };             // boom tip

function Lattice() {
  // two chords + zig-zag braces along the boom
  const dx = TIP.x - BASE.x, dy = TIP.y - BASE.y;
  const len = Math.hypot(dx, dy);
  const nx = (-dy / len) * 6, ny = (dx / len) * 6; // half-width normal
  const n = 9;
  const pts = Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, w = 1 - t * 0.55; // boom narrows toward the tip
    const cx = BASE.x + dx * t, cy = BASE.y + dy * t;
    return { a: [cx + nx * w, cy + ny * w], b: [cx - nx * w, cy - ny * w] };
  });
  return (
    <g stroke="#1b2a3a" strokeWidth="2.2" strokeLinecap="round" fill="none">
      <polyline points={pts.map((p) => p.a.join(",")).join(" ")} />
      <polyline points={pts.map((p) => p.b.join(",")).join(" ")} />
      {pts.slice(0, -1).map((p, i) => (
        <g key={i} strokeWidth="1.6">
          <line x1={p.a[0]} y1={p.a[1]} x2={pts[i + 1].b[0]} y2={pts[i + 1].b[1]} />
          <line x1={p.b[0]} y1={p.b[1]} x2={p.a[0]} y2={p.a[1]} />
        </g>
      ))}
    </g>
  );
}

export default function CraneFallback({ className = "" }) {
  return (
    <svg viewBox="0 0 400 300" className={className} role="img" aria-label="Animated crawler crane lifting the RV sign">
      <defs>
        <linearGradient id="cf-yellow" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFD052" />
          <stop offset="1" stopColor="#F6B21B" />
        </linearGradient>
      </defs>

      {/* ground */}
      <line x1="20" y1="272" x2="380" y2="272" stroke="#ffffff" strokeOpacity=".25" strokeWidth="2" strokeDasharray="6 8" className="cf-ground" />

      {/* tracks */}
      <rect x="62" y="236" width="170" height="36" rx="18" fill="#1b2a3a" />
      {[82, 147, 212].map((cx) => (
        <g key={cx} className="cf-wheel" style={{ transformOrigin: `${cx}px 254px` }}>
          <circle cx={cx} cy="254" r="11" fill="#2f475f" />
          <line x1={cx - 9} y1="254" x2={cx + 9} y2="254" stroke="#8fb0cc" strokeWidth="2" />
          <line x1={cx} y1="245" x2={cx} y2="263" stroke="#8fb0cc" strokeWidth="2" />
        </g>
      ))}

      {/* body, counterweight, cab */}
      <rect x="64" y="204" width="146" height="36" rx="6" fill="url(#cf-yellow)" />
      <rect x="52" y="208" width="26" height="28" rx="4" fill="#D99A0B" />
      <path d="M152 204 V176 Q152 168 160 168 H192 L206 190 V204 Z" fill="url(#cf-yellow)" />
      <path d="M160 175 H186 L197 192 H160 Z" fill="#bfe3f5" />
      <g stroke="#D99A0B" strokeWidth="2">
        <line x1="84" y1="214" x2="130" y2="214" /><line x1="84" y1="220" x2="130" y2="220" /><line x1="84" y1="226" x2="130" y2="226" />
      </g>

      {/* A-frame mast + pendant to boom tip */}
      <polyline points="126,204 146,122 164,204" fill="none" stroke="#1b2a3a" strokeWidth="3" strokeLinejoin="round" />
      <line x1="146" y1="122" x2={TIP.x} y2={TIP.y} stroke="#1b2a3a" strokeWidth="1.2" />

      {/* boom (gently luffs up and down) */}
      <g className="cf-boom" style={{ transformOrigin: `${BASE.x}px ${BASE.y}px` }}>
        <Lattice />
        <circle cx={TIP.x} cy={TIP.y} r="6" fill="#1b2a3a" />
        <circle cx={TIP.x} cy={TIP.y} r="2.5" fill="#F6B21B" />
      </g>

      {/* hook + RV sign swinging from the tip */}
      <g className="cf-hook" style={{ transformOrigin: `${TIP.x}px ${TIP.y}px` }}>
        <line x1={TIP.x} y1={TIP.y} x2={TIP.x} y2="112" stroke="#1b2a3a" strokeWidth="1.5" />
        <path d={`M${TIP.x - 7} 112 h14 l-3 18 h-8 z`} fill="#F6B21B" />
        <path d={`M${TIP.x} 130 v6 a5 5 0 1 1 -5 5`} fill="none" stroke="#1b2a3a" strokeWidth="2.4" strokeLinecap="round" />
        <line x1={TIP.x} y1="140" x2={TIP.x - 38} y2="168" stroke="#1b2a3a" strokeWidth="1" />
        <line x1={TIP.x} y1="140" x2={TIP.x + 38} y2="168" stroke="#1b2a3a" strokeWidth="1" />
        <rect x={TIP.x - 44} y="166" width="88" height="46" rx="5" fill="#16293F" stroke="#F6B21B" strokeWidth="2" />
        <rect x={TIP.x - 44} y="166" width="88" height="9" rx="4" fill="#F6B21B" />
        <text x={TIP.x} y="198" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="22" fill="#fff" letterSpacing="2">
          R<tspan fill="#F6B21B">V</tspan>
        </text>
      </g>
    </svg>
  );
}
