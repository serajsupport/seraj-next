import {
  AlmondBlossomIcon,
  FigBranchIcon,
  PineBranchIcon,
  PistachioBranchIcon,
  SaffronCrocusIcon,
} from "@/components/botanicals";

export type AccentColor = "mustard" | "olive" | "terracotta" | "rust";

export type Product = {
  slug: string;
  accent: AccentColor;
  Icon: typeof AlmondBlossomIcon;
};

export const PRODUCTS: Product[] = [
  { slug: "almonds", accent: "mustard", Icon: AlmondBlossomIcon },
  { slug: "pistachios", accent: "olive", Icon: PistachioBranchIcon },
  { slug: "pine-nuts", accent: "terracotta", Icon: PineBranchIcon },
  { slug: "dried-figs", accent: "rust", Icon: FigBranchIcon },
  { slug: "saffron", accent: "terracotta", Icon: SaffronCrocusIcon },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
