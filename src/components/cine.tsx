import type { CSSProperties } from "react";

// Deterministic scatter, so server and client render the same dust.
function rand(i: number, salt: number) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const MOTES = Array.from({ length: 28 }, (_, i) => ({
  left: `${(rand(i, 1) * 100).toFixed(2)}%`,
  top: `${(8 + rand(i, 2) * 84).toFixed(2)}%`,
  size: `${(1.5 + rand(i, 3) * 3).toFixed(2)}px`,
  duration: `${(10 + rand(i, 4) * 14).toFixed(2)}s`,
  delay: `${(rand(i, 5) * -24).toFixed(2)}s`,
  drift: `${((rand(i, 6) - 0.5) * 140).toFixed(1)}px`,
  opacity: (0.3 + rand(i, 7) * 0.5).toFixed(2),
}));

export function CineOverlay({ beam = true, letterbox = true }: { beam?: boolean; letterbox?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {beam && <div className="cine-beam absolute inset-0" />}
      {MOTES.map((m, i) => (
        <span
          key={i}
          className="cine-mote absolute rounded-full"
          style={
            {
              left: m.left,
              top: m.top,
              width: m.size,
              height: m.size,
              animationDuration: m.duration,
              animationDelay: m.delay,
              "--mote-x": m.drift,
              "--mote-o": m.opacity,
            } as CSSProperties
          }
        />
      ))}
      <div className="cine-grain absolute -inset-[60%]" />
      <div className="cine-vignette absolute inset-0" />
      {letterbox && (
        <>
          <div className="absolute inset-x-0 top-0 h-[9dvh] bg-black" />
          <div className="absolute inset-x-0 bottom-0 h-[9dvh] bg-black" />
        </>
      )}
    </div>
  );
}
