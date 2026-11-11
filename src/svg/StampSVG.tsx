import React from "react";

type Props = {
  size?: number; // pixels
  className?: string;
  color?: string;
  topText?: string;
  bottomText?: string;
};

export default function StampSvg({
  size = 120,
  className = "",
  color = "#d84b5a",
  topText = "BIRTHDAY",
  bottomText = "SPECIAL",
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Birthday Stamp"
    >
      <defs>
        {/* grain texture */}
        <filter id="stampGrain" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1"
            numOctaves="2"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" result="mono" />
          <feComponentTransfer in="mono" result="grain">
            <feFuncA type="table" tableValues="0 0 0.15 0.45" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" in2="grain" mode="multiply" />
        </filter>
      </defs>

      {/* perforated edge (auto-generated 24 dots) */}
      <g fill={color} opacity="0.85" filter="url(#stampGrain)">
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * Math.PI * 2;
          const r = 88;
          const x = 100 + r * Math.cos(angle);
          const y = 100 + r * Math.sin(angle);
          return <circle key={i} cx={x} cy={y} r="3.2" />;
        })}
      </g>

      {/* outer & inner rings */}
      <circle
        cx="100"
        cy="100"
        r="72"
        stroke={color}
        strokeWidth="4"
        fill="none"
        opacity="0.9"
      />
      <circle
        cx="100"
        cy="100"
        r="54"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity="0.75"
      />

      {/* Center Cake & Candle Icon */}
      <g fill={color} opacity="0.95" transform="translate(100, 102) scale(0.85)">
        {/* Cake base */}
        <rect x="-24" y="-2" width="48" height="24" rx="4" fill={color} />
        {/* Icing drip pattern */}
        <path
          d="M -24 -2 Q -18 8 -12 -2 Q -6 8 0 -2 Q 6 8 12 -2 Q 18 8 24 -2 Z"
          fill="#fff"
          opacity="0.8"
        />
        {/* Candles */}
        <rect x="-14" y="-18" width="4" height="16" rx="1.5" fill="#fff" />
        <rect x="-2" y="-20" width="4" height="18" rx="1.5" fill="#fff" />
        <rect x="10" y="-18" width="4" height="16" rx="1.5" fill="#fff" />
        {/* Flame */}
        <path d="M -12 -22 Q -10 -26 -12 -28 Q -14 -26 -12 -22 Z" fill="#ffd166" />
        <path d="M 0 -24 Q 2 -29 0 -31 Q -2 -29 0 -24 Z" fill="#ffd166" />
        <path d="M 12 -22 Q 14 -26 12 -28 Q 10 -26 12 -22 Z" fill="#ffd166" />
      </g>

      {/* top curved text */}
      <path id="topStampArc" d="M 45 92 A 52 52 0 0 1 155 92" fill="none" />
      <text
        fontSize="12"
        textAnchor="middle"
        fill={color}
        style={{
          fontFamily: "'Montserrat', sans-serif",
          letterSpacing: "0.22em",
          fontWeight: 700,
        }}
      >
        <textPath href="#topStampArc" startOffset="50%">
          {topText}
        </textPath>
      </text>

      {/* bottom curved text */}
      <path id="bottomStampArc" d="M 155 110 A 54 54 0 0 1 45 110" fill="none" />
      <text
        fontSize="10.5"
        textAnchor="middle"
        fill={color}
        style={{
          fontFamily: "'Montserrat', sans-serif",
          letterSpacing: "0.2em",
          fontWeight: 600,
        }}
      >
        <textPath href="#bottomStampArc" startOffset="50%">
          {bottomText}
        </textPath>
      </text>
    </svg>
  );
}
