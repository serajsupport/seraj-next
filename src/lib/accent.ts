import type { AccentColor } from "@/data/products";

// Tailwind's scanner needs literal class strings, so dynamic
// `text-${accent}` interpolation won't survive the production build.
// These maps keep every accent class spelled out for the scanner.
export const accentText: Record<AccentColor, string> = {
  almond: "text-almond-dark",
  pistachio: "text-pistachio-dark",
  pine: "text-pine",
  fig: "text-fig",
  saffron: "text-saffron-red",
};

export const accentBg: Record<AccentColor, string> = {
  almond: "bg-almond",
  pistachio: "bg-pistachio",
  pine: "bg-pine",
  fig: "bg-fig",
  saffron: "bg-saffron-red",
};

export const accentBorder: Record<AccentColor, string> = {
  almond: "border-almond",
  pistachio: "border-pistachio",
  pine: "border-pine",
  fig: "border-fig",
  saffron: "border-saffron-red",
};

export const accentFromBg: Record<AccentColor, string> = {
  almond: "from-almond/30",
  pistachio: "from-pistachio/30",
  pine: "from-pine/30",
  fig: "from-fig/30",
  saffron: "from-saffron-red/30",
};
