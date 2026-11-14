import { Cpu, Layers } from 'lucide-react';

/** Decorative illustration of an image being scanned. Hidden from assistive tech. */
export default function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="scan-card">
        <div className="scan-card__header">
          <span className="scan-card__dots">
            <i /> <i /> <i />
          </span>
          <span className="scan-card__title">authenticity_scan</span>
        </div>

        <div className="scan-frame">
          <svg className="scan-frame__art" viewBox="0 0 240 280" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="faceStroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#a78bfa" />
                <stop offset="1" stopColor="#60a5fa" />
              </linearGradient>
              <pattern id="dotGrid" width="12" height="12" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.1" fill="rgba(148,163,255,0.22)" />
              </pattern>
            </defs>
            <rect width="240" height="280" fill="url(#dotGrid)" />
            {/* Abstract face mesh */}
            <g fill="none" stroke="url(#faceStroke)" strokeWidth="1.6" strokeLinecap="round">
              <path d="M120 40c-40 0-64 30-64 72 0 30 9 56 24 74 12 15 26 24 40 24s28-9 40-24c15-18 24-44 24-74 0-42-24-72-64-72Z" />
              <path d="M84 116c8-6 20-6 28 0M128 116c8-6 20-6 28 0" />
              <path d="M120 122v34c0 4-4 7-10 7" />
              <path d="M98 184c14 9 30 9 44 0" />
              <path opacity=".45" d="M56 112h128M64 150h112M80 70h80M76 196h88M120 40v170" />
            </g>
            {/* Feature points */}
            <g fill="#c4b5fd">
              {[
                [98, 116], [142, 116], [120, 156], [98, 184], [142, 184],
                [70, 140], [170, 140], [120, 60], [88, 212], [152, 212],
              ].map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" className="scan-point" />
              ))}
            </g>
            {/* Region of interest */}
            <rect x="80" y="100" width="80" height="34" rx="6" fill="rgba(239,68,68,.08)" stroke="#f87171" strokeDasharray="4 4" />
          </svg>
          <span className="scan-frame__corner scan-frame__corner--tl" />
          <span className="scan-frame__corner scan-frame__corner--tr" />
          <span className="scan-frame__corner scan-frame__corner--bl" />
          <span className="scan-frame__corner scan-frame__corner--br" />
          <span className="scan-frame__line" />
        </div>

        <div className="scan-card__footer">
          <div className="scan-bar">
            <span>Real</span>
            <div className="scan-bar__track"><div className="scan-bar__fill scan-bar__fill--real" /></div>
          </div>
          <div className="scan-bar">
            <span>Fake</span>
            <div className="scan-bar__track"><div className="scan-bar__fill scan-bar__fill--fake" /></div>
          </div>
        </div>
      </div>

      <div className="float-chip float-chip--top">
        <Layers size={14} /> Feature maps
      </div>
      <div className="float-chip float-chip--bottom">
        <Cpu size={14} /> Pattern analysis
      </div>
    </div>
  );
}
