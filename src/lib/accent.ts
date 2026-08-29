import type { AccentColor } from "@/data/products";

// Tailwind's scanner needs literal class strings, so dynamic
// `text-${accent}` interpolation won't survive the production build.
// These maps keep every accent class spelled out for the scanner.
export const accentText: Record<AccentColor, string> = {
  mustard: "text-mustard",
  olive: "text-olive",
  terracotta: "text-terracotta",
  rust: "text-rust",
};

export const accentBg: Record<AccentColor, string> = {
  mustard: "bg-mustard",
  olive: "bg-olive",
  terracotta: "bg-terracotta",
  rust: "bg-rust",
};

export const accentBorder: Record<AccentColor, string> = {
  mustard: "border-mustard",
  olive: "border-olive",
  terracotta: "border-terracotta",
  rust: "border-rust",
};

export const accentFromBg: Record<AccentColor, string> = {
  mustard: "from-mustard/30",
  olive: "from-olive/30",
  terracotta: "from-terracotta/30",
  rust: "from-rust/30",
};
