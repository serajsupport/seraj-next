const STROKE = 3;

export function BasketIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 140"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 56 L34 118 Q36 128 46 128 L114 128 Q124 128 126 118 L136 56 Z"
        fill="currentColor"
        fillOpacity={0.14}
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
      {[40, 60, 80, 100, 120].map((x) => (
        <path
          key={x}
          d={`M${x - 6} 56 L${x} 128`}
          stroke="currentColor"
          strokeWidth={STROKE * 0.5}
          opacity={0.6}
        />
      ))}
      <path
        d="M24 56 Q80 70 136 56"
        stroke="currentColor"
        strokeWidth={STROKE}
        fill="none"
      />
      <path
        d="M50 56 Q80 8 110 56"
        stroke="currentColor"
        strokeWidth={STROKE}
        fill="none"
      />
      <ellipse cx={70} cy={48} rx={9} ry={7} fill="currentColor" fillOpacity={0.3} />
      <ellipse cx={88} cy={44} rx={9} ry={7} fill="currentColor" fillOpacity={0.3} />
      <ellipse cx={78} cy={54} rx={9} ry={7} fill="currentColor" fillOpacity={0.3} />
    </svg>
  );
}

export function SackIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M56 26 Q80 14 104 26 L112 40 Q136 60 132 96 Q128 140 80 146 Q32 140 28 96 Q24 60 48 40 Z"
        fill="currentColor"
        fillOpacity={0.14}
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
      <path
        d="M56 26 Q80 40 104 26"
        stroke="currentColor"
        strokeWidth={STROKE}
        fill="none"
      />
      <path
        d="M50 36 L110 36"
        stroke="currentColor"
        strokeWidth={STROKE * 0.6}
        strokeDasharray="3 5"
      />
      <path
        d="M40 76 Q80 88 120 76"
        stroke="currentColor"
        strokeWidth={STROKE * 0.5}
        opacity={0.5}
        fill="none"
      />
      <path
        d="M36 104 Q80 118 124 104"
        stroke="currentColor"
        strokeWidth={STROKE * 0.5}
        opacity={0.5}
        fill="none"
      />
    </svg>
  );
}
