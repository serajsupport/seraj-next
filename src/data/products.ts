import {
  AlmondBlossomIcon,
  FigBranchIcon,
  PineBranchIcon,
  PistachioBranchIcon,
  SaffronCrocusIcon,
} from "@/components/botanicals";

export type AccentColor = "almond" | "pistachio" | "pine" | "fig" | "saffron";

export type Product = {
  slug: string;
  accent: AccentColor;
  Icon: typeof AlmondBlossomIcon;
};

export const PRODUCTS: Product[] = [
  { slug: "almonds", accent: "almond", Icon: AlmondBlossomIcon },
  { slug: "pistachios", accent: "pistachio", Icon: PistachioBranchIcon },
  { slug: "pine-nuts", accent: "pine", Icon: PineBranchIcon },
  { slug: "dried-figs", accent: "fig", Icon: FigBranchIcon },
  { slug: "saffron", accent: "saffron", Icon: SaffronCrocusIcon },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
