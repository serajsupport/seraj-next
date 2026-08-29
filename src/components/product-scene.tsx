"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PRODUCTS, getProduct } from "@/data/products";
import { accentText } from "@/lib/accent";
import { Hotspot, HotspotSheet } from "@/components/hotspot";
import { BasketIcon, SackIcon } from "@/components/scene-props";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";

type Panel = "about" | "grades" | "packaging" | null;

export function ProductScene({ slug }: { slug: string }) {
  const product = getProduct(slug);
  const t = useTranslations(`products.${slug}`);
  const tp = useTranslations("products");
  const tc = useTranslations("common");
  const tg = useTranslations("grove");
  const [panel, setPanel] = useState<Panel>(null);

  if (!product) return null;

  const index = PRODUCTS.findIndex((p) => p.slug === slug);
  const prev = PRODUCTS[(index - 1 + PRODUCTS.length) % PRODUCTS.length];
  const next = PRODUCTS[(index + 1) % PRODUCTS.length];

  const grades = t.raw("grades") as string[];
  const packaging = t.raw("packaging") as string[];
  const uses = t.raw("uses") as string[];

  return (
    <div
      className={`relative h-dvh w-full overflow-hidden ${accentText[product.accent]}`}
    >
      {/* sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 60% at 50% 0%, currentColor 0%, transparent 60%)",
          opacity: 0.18,
        }}
      />
      {/* ground */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40%] rounded-t-[50%] opacity-[0.16]"
        style={{ background: "currentColor" }}
      />

      {/* top overlay */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-5">
        <Link
          href="/products"
          aria-label={tg("backToGrove")}
          className="grid h-10 w-10 place-items-center rounded-full bg-paper/80 text-ink shadow-sm backdrop-blur-sm transition-transform hover:scale-105"
        >
          <X size={18} />
        </Link>
        <span className="rounded-full bg-paper/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink shadow-sm backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")} / {String(PRODUCTS.length).padStart(2, "0")}
        </span>
      </div>

      {/* centered composition column */}
      <div className="pointer-events-none absolute inset-0 mx-auto max-w-xl">
        <div className="pointer-events-auto absolute inset-x-0 top-[9%] text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
            {tg("chapter")} {String(index + 1).padStart(2, "0")}
          </p>
          <h1 className="mt-2 font-display text-4xl font-medium text-ink sm:text-5xl">
            {t("name")}
          </h1>
          <p className="mt-1 text-sm text-ink-soft">{t("tagline")}</p>
        </div>

        {/* tree / plant */}
        <div className="pointer-events-none absolute left-1/2 top-[26%] h-[46%] w-[52%] -translate-x-1/2 sm:w-[38%]">
          <product.Icon className="h-full w-full" />
        </div>
        <div className="pointer-events-auto">
          <Hotspot
            label={t("name")}
            style={{ left: "50%", top: "50%" }}
            onClick={() => setPanel("about")}
          />

          {/* basket */}
          <div className="pointer-events-none absolute bottom-[16%] left-[16%] h-[16%] w-[16%] opacity-90 sm:left-[20%]">
            <BasketIcon className="h-full w-full" />
          </div>
          <Hotspot
            label={tc("grades")}
            style={{ left: "24%", top: "84%" }}
            onClick={() => setPanel("grades")}
          />

          {/* sack */}
          <div className="pointer-events-none absolute bottom-[15%] right-[16%] h-[18%] w-[18%] opacity-90 sm:right-[20%]">
            <SackIcon className="h-full w-full" />
          </div>
          <Hotspot
            label={tc("packaging")}
            style={{ left: "76%", top: "83%" }}
            onClick={() => setPanel("packaging")}
          />
        </div>
      </div>

      {/* bottom overlay */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-center gap-3 p-5 sm:gap-4">
        <Link
          href={`/products/${prev.slug}`}
          aria-label={tp(`${prev.slug}.name`)}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper/80 text-ink shadow-sm backdrop-blur-sm transition-transform hover:scale-105 rtl:rotate-180"
        >
          <ChevronLeft size={18} />
        </Link>

        <Link
          href={`/contact?product=${product.slug}`}
          className="inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-3 text-sm font-semibold text-paper shadow-[0_10px_30px_rgba(140,54,35,0.35)] transition-transform hover:scale-[1.03] sm:px-6 sm:py-3.5"
        >
          {tc("rfqButton")}
          <ArrowUpRight size={16} />
        </Link>

        <Link
          href={`/products/${next.slug}`}
          aria-label={tp(`${next.slug}.name`)}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper/80 text-ink shadow-sm backdrop-blur-sm transition-transform hover:scale-105 rtl:rotate-180"
        >
          <ChevronRight size={18} />
        </Link>
      </div>

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
