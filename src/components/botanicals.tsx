type IconProps = {
  className?: string;
};

/**
 * Shared retro linocut styling: currentColor strokes with a soft
 * translucent fill, so each illustration inherits its accent color
 * from the parent via the `text-*` utility.
 */
const STROKE = 3.2;

function Petals({
  cx,
  cy,
  count,
  length,
  width,
  innerGap = 8,
  rotate = 0,
}: {
  cx: number;
  cy: number;
  count: number;
  length: number;
  width: number;
  innerGap?: number;
  rotate?: number;
}) {
  const petals = Array.from({ length: count }, (_, i) => {
    const angle = rotate + (360 / count) * i;
    return (
      <ellipse
        key={i}
        cx={cx}
        cy={cy - innerGap - length / 2}
        rx={width / 2}
        ry={length / 2}
        fill="currentColor"
        fillOpacity={0.14}
        stroke="currentColor"
        strokeWidth={STROKE * 0.55}
        transform={`rotate(${angle} ${cx} ${cy})`}
      />
    );
  });
  return <>{petals}</>;
}

export function AlmondBlossomIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M34 208 Q88 160 108 128 T196 40"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
      <path
        d="M108 128 Q90 140 70 150"
        stroke="currentColor"
        strokeWidth={STROKE * 0.7}
        strokeLinecap="round"
      />
      <path
        d="M150 84 Q168 88 182 78"
        stroke="currentColor"
        strokeWidth={STROKE * 0.7}
        strokeLinecap="round"
      />

      <g>
        <Petals cx={64} cy={158} count={5} length={30} width={17} innerGap={4} />
        <circle cx={64} cy={158} r={4.5} fill="currentColor" />
      </g>
      <g>
        <Petals cx={112} cy={122} count={5} length={38} width={21} innerGap={5} rotate={18} />
        <circle cx={112} cy={122} r={5.5} fill="currentColor" />
      </g>
      <g>
        <Petals cx={186} cy={70} count={5} length={26} width={15} innerGap={4} rotate={40} />
        <circle cx={186} cy={70} r={4} fill="currentColor" />
      </g>

      <path
        d="M156 132 Q150 148 158 168 Q166 180 158 196 Q152 182 144 168 Q140 150 148 132 Z"
        fill="currentColor"
        fillOpacity={0.16}
        stroke="currentColor"
        strokeWidth={STROKE * 0.6}
      />
    </svg>
  );
}

export function PistachioBranchIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 210 Q90 170 100 130 Q108 96 190 44"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
      <path
        d="M96 150 Q78 158 60 156"
        stroke="currentColor"
        strokeWidth={STROKE * 0.7}
        strokeLinecap="round"
      />
      <ellipse
        cx={54}
        cy={150}
        rx={20}
        ry={12}
        fill="currentColor"
        fillOpacity={0.15}
        stroke="currentColor"
        strokeWidth={STROKE * 0.6}
        transform="rotate(-18 54 150)"
      />

      {[
        { x: 118, y: 108, r: -12 },
        { x: 146, y: 86, r: 8 },
        { x: 168, y: 62, r: -6 },
      ].map((shell, i) => (
        <g key={i} transform={`rotate(${shell.r} ${shell.x} ${shell.y})`}>
          <path
            d={`M${shell.x - 16} ${shell.y}
                C${shell.x - 16} ${shell.y - 20} ${shell.x + 16} ${shell.y - 20} ${shell.x + 16} ${shell.y}
                C${shell.x + 16} ${shell.y + 20} ${shell.x - 16} ${shell.y + 20} ${shell.x - 16} ${shell.y} Z`}
            fill="currentColor"
            fillOpacity={0.12}
            stroke="currentColor"
            strokeWidth={STROKE * 0.55}
          />
          <path
            d={`M${shell.x - 2} ${shell.y - 15} Q${shell.x + 6} ${shell.y} ${shell.x - 2} ${shell.y + 15}`}
            stroke="currentColor"
            strokeWidth={STROKE * 0.5}
          />
          <ellipse
            cx={shell.x - 5}
            cy={shell.y}
            rx={7}
            ry={11}
            fill="currentColor"
            fillOpacity={0.32}
          />
        </g>
      ))}
    </svg>
  );
}

export function PineBranchIcon({ className }: IconProps) {
  const needleClusterAt = (x: number, y: number, r: number) => {
    const angles = [-55, -30, -8, 15, 38];
    return angles.map((a, i) => {
      const rad = (a * Math.PI) / 180;
      const x2 = x + Math.cos(rad) * 30;
      const y2 = y - Math.sin(rad) * 30;
      return (
        <line
          key={i}
          x1={x}
          y1={y}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth={STROKE * 0.45}
          strokeLinecap="round"
          transform={`rotate(${r} ${x} ${y})`}
        />
      );
    });
  };

  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 40 Q80 110 90 150 Q98 185 130 208"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
      {needleClusterAt(64, 76, -10)}
      {needleClusterAt(80, 118, -6)}
      {needleClusterAt(94, 160, 4)}

      <g transform="translate(160 96)">
        {[0, 1, 2, 3].map((row) =>
          [0, 1].map((col) => (
            <ellipse
              key={`${row}-${col}`}
              cx={col === 0 ? -11 : 11}
              cy={row * 20 - 26}
              rx={13}
              ry={12}
              fill="currentColor"
              fillOpacity={0.14}
              stroke="currentColor"
              strokeWidth={STROKE * 0.5}
              transform={`translate(0 ${row % 2 === 0 ? 0 : 10})`}
            />
          )),
        )}
        <path
          d="M0 -46 Q-26 -10 0 60 Q26 -10 0 -46 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE * 0.7}
        />
      </g>

      <ellipse
        cx={116}
        cy={186}
        rx={9}
        ry={13}
        fill="currentColor"
        fillOpacity={0.3}
        transform="rotate(-20 116 186)"
      />
      <ellipse
        cx={140}
        cy={196}
        rx={8}
        ry={11}
        fill="currentColor"
        fillOpacity={0.3}
        transform="rotate(-8 140 196)"
      />
    </svg>
  );
}

export function FigBranchIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36 206 Q80 180 96 150 Q110 122 108 90"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinecap="round"
      />

      <g transform="translate(150 92) scale(1.15)">
        <path
          d="M0 -52
             C16 -46 20 -30 34 -26
             C30 -12 40 -4 36 12
             C48 16 50 32 38 42
             C40 54 30 62 16 58
             C10 68 -10 68 -16 58
             C-30 62 -40 54 -38 42
             C-50 32 -48 16 -36 12
             C-40 -4 -30 -12 -34 -26
             C-20 -30 -16 -46 0 -52 Z"
          fill="currentColor"
          fillOpacity={0.13}
          stroke="currentColor"
          strokeWidth={STROKE * 0.6}
        />
        <path d="M0 -52 L0 58" stroke="currentColor" strokeWidth={STROKE * 0.35} />
        <path d="M0 -20 L-30 8" stroke="currentColor" strokeWidth={STROKE * 0.3} />
        <path d="M0 -20 L30 8" stroke="currentColor" strokeWidth={STROKE * 0.3} />
        <path d="M0 10 L-32 34" stroke="currentColor" strokeWidth={STROKE * 0.3} />
        <path d="M0 10 L32 34" stroke="currentColor" strokeWidth={STROKE * 0.3} />
      </g>

      <path
        d="M96 150 Q104 168 100 190 Q98 206 112 216 Q114 200 122 190 Q130 172 118 152 Q108 144 96 150 Z"
        fill="currentColor"
        fillOpacity={0.2}
        stroke="currentColor"
        strokeWidth={STROKE * 0.6}
      />
      <circle cx={109} cy={182} r={13} fill="none" stroke="currentColor" strokeWidth={STROKE * 0.35} strokeDasharray="2 3" />
    </svg>
  );
}

export function SaffronCrocusIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M120 190 L120 130" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" />
      <path d="M120 168 Q96 176 82 200" stroke="currentColor" strokeWidth={STROKE * 0.6} strokeLinecap="round" />
      <path d="M120 168 Q144 176 158 200" stroke="currentColor" strokeWidth={STROKE * 0.6} strokeLinecap="round" />

      <g>
        <Petals cx={120} cy={112} count={6} length={64} width={26} innerGap={2} />
      </g>

      {[
        { angle: -18, len: 34 },
        { angle: 0, len: 40 },
        { angle: 18, len: 34 },
      ].map((thread, i) => (
        <g key={i} transform={`rotate(${thread.angle} 120 112)`}>
          <path
            d={`M120 112 Q${120 + 4} ${112 - thread.len * 0.6} 120 ${112 - thread.len}`}
            stroke="currentColor"
            strokeWidth={STROKE * 0.55}
            strokeLinecap="round"
          />
          <path
            d={`M120 ${112 - thread.len} q-6 -4 -3 -12 q7 2 3 12`}
            fill="currentColor"
            fillOpacity={0.85}
          />
        </g>
      ))}
      <circle cx={120} cy={112} r={5} fill="currentColor" />
    </svg>
  );
}
