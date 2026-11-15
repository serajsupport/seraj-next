"use client";

import { useEffect, useState } from "react";

const PALETTES = [
  { value: "default", label: "Midnight / Saffron Gold", dot: "#e2b14a" },
  { value: "artdeco", label: "Art Deco Palace", dot: "#0f5c45" },
] as const;

type PaletteValue = (typeof PALETTES)[number]["value"];

function readPalette(): PaletteValue {
  const current = document.documentElement.getAttribute("data-palette");
  return current === "artdeco" ? current : "default";
}

export function PaletteSwitcher({ className = "" }: { className?: string }) {
  // Starts at "default" to match server-rendered markup, then reads the real
  // value set by the inline anti-flash script once mounted on the client.
  const [palette, setPalette] = useState<PaletteValue>("default");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from a DOM attribute an inline script set before hydration, not derivable during render
    setPalette(readPalette());
  }, []);

  function apply(value: PaletteValue) {
    setPalette(value);
    if (value === "default") {
      document.documentElement.removeAttribute("data-palette");
    } else {
      document.documentElement.setAttribute("data-palette", value);
    }
    try {
      localStorage.setItem("seraj-palette", value);
    } catch {}
  }

  return (
    <div className={`flex items-center gap-1 rounded-full bg-electric-blue/10 p-1 ${className}`}>
      {PALETTES.map((p) => (
        <button
          key={p.value}
          type="button"
          aria-pressed={palette === p.value}
          aria-label={p.label}
          title={p.label}
          onClick={() => apply(p.value)}
          className={`grid h-6 w-6 place-items-center rounded-full transition-transform ${
            palette === p.value ? "scale-110 ring-2 ring-ink/50" : "opacity-70 hover:opacity-100"
          }`}
        >
          <span className="h-3.5 w-3.5 rounded-full" style={{ background: p.dot }} />
        </button>
      ))}
    </div>
  );
}
