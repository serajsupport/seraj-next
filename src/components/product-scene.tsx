"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { getProduct } from "@/data/products";
import { accentText } from "@/lib/accent";
import { Hotspot, HotspotSheet } from "@/components/hotspot";
import { BasketIcon, SackIcon } from "@/components/scene-props";

type Panel = "about" | "grades" | "packaging" | null;

export function ProductScene({ slug }: { slug: string }) {
  const product = getProduct(slug);
  const t = useTranslations(`products.${slug}`);
  const tc = useTranslations("common");
  const [panel, setPanel] = useState<Panel>(null);

  if (!product) return null;

  const grades = t.raw("grades") as string[];
  const packaging = t.raw("packaging") as string[];
  const uses = t.raw("uses") as string[];

  return (
    <div
      className={`relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] glass-strong sm:aspect-[16/10] ${accentText[product.accent]}`}
    >
      {/* sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, currentColor 0%, transparent 55%)",
          opacity: 0.16,
        }}
      />
      {/* ground */}
      <div
        className="absolute inset-x-0 bottom-0 h-[38%] rounded-t-[45%] opacity-[0.16]"
        style={{ background: "currentColor" }}
      />

      {/* tree / plant */}
      <div className="absolute left-1/2 top-[8%] h-[62%] w-[46%] -translate-x-1/2">
        <product.Icon className="h-full w-full" />
      </div>
      <Hotspot
        label={t("name")}
        style={{ left: "50%", top: "38%" }}
        onClick={() => setPanel("about")}
      />

      {/* basket */}
      <div className="absolute bottom-[10%] left-[12%] h-[22%] w-[22%] opacity-90 sm:left-[16%]">
        <BasketIcon className="h-full w-full" />
      </div>
      <Hotspot
        label={tc("grades")}
        style={{ left: "23%", top: "78%" }}
        onClick={() => setPanel("grades")}
      />

      {/* sack */}
      <div className="absolute bottom-[9%] right-[12%] h-[24%] w-[24%] opacity-90 sm:right-[16%]">
        <SackIcon className="h-full w-full" />
      </div>
      <Hotspot
        label={tc("packaging")}
        style={{ left: "77%", top: "76%" }}
        onClick={() => setPanel("packaging")}
      />

      <HotspotSheet
        open={panel === "about"}
        onClose={() => setPanel(null)}
        eyebrow={t("tagline")}
        title={t("name")}
      >
        <p className="leading-relaxed text-ink-soft">{t("description")}</p>
        <div className="mt-5 rounded-2xl bg-ink/5 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
            {tc("origin")}
          </p>
          <p className="mt-1 font-display text-lg text-ink">{t("origin")}</p>
        </div>
      </HotspotSheet>

      <HotspotSheet
        open={panel === "grades"}
        onClose={() => setPanel(null)}
        eyebrow={t("name")}
        title={tc("grades")}
      >
        <ChipList items={grades} />
      </HotspotSheet>

      <HotspotSheet
        open={panel === "packaging"}
        onClose={() => setPanel(null)}
        eyebrow={t("name")}
        title={tc("packaging")}
      >
        <ChipList items={packaging} />
        <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-ink-soft">
          {tc("uses")}
        </p>
        <ChipList items={uses} className="mt-3" />
      </HotspotSheet>
    </div>
  );
}

function ChipList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-col gap-2.5 ${className ?? ""}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm text-ink">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
          {item}
        </li>
      ))}
    </ul>
  );
}
