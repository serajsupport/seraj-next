"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PRODUCTS } from "@/data/products";
import { accentText, accentBg } from "@/lib/accent";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

export function GroveBrowser() {
  const [index, setIndex] = useState(0);
  const tp = useTranslations("products");
  const tg = useTranslations("grove");
  const product = PRODUCTS[index];
  const total = PRODUCTS.length;

  function go(delta: number) {
    setIndex((i) => (i + delta + total) % total);
  }

  return (
    <div className="relative mx-auto max-w-3xl">
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label={tg("prev")}
        className="absolute start-0 top-1/2 z-10 -translate-y-1/2 -translate-x-3 sm:-translate-x-6 grid h-11 w-11 place-items-center rounded-full glass text-ink transition-transform hover:scale-105 rtl:rotate-180"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label={tg("next")}
        className="absolute end-0 top-1/2 z-10 -translate-y-1/2 translate-x-3 sm:translate-x-6 grid h-11 w-11 place-items-center rounded-full glass text-ink transition-transform hover:scale-105 rtl:rotate-180"
      >
        <ChevronRight size={20} />
      </button>

      <div className="flex items-stretch gap-3">
        <Shutter accent={product.accent} />

        <div className="relative flex-1 overflow-hidden rounded-[2rem] glass-strong">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="px-6 py-10 text-center sm:px-12 sm:py-14"
            >
              <span className="inline-block rounded-full bg-electric-blue/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
                {tg("chapter")} {String(index + 1).padStart(2, "0")}
              </span>

              <div
                className={`relative mx-auto mt-6 aspect-square w-40 sm:w-48 ${accentText[product.accent]}`}
              >
                <div
                  className="absolute inset-0 rounded-full opacity-20"
                  style={{ background: "currentColor" }}
                />
                <product.Icon className="relative h-full w-full p-6" />
              </div>

              <h3 className="mt-6 font-display text-3xl font-medium text-ink sm:text-4xl">
                {tp(`${product.slug}.name`)}
              </h3>
              <p className="mt-2 text-sm text-ink-soft">
                {tp(`${product.slug}.tagline`)}
              </p>

              <Link
                href={`/products/${product.slug}`}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-electric-blue px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
              >
                {tg("enter")}
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <Shutter accent={product.accent} flip />
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {PRODUCTS.map((p, i) => (
          <button
            key={p.slug}
            aria-label={tp(`${p.slug}.name`)}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-electric-blue" : "w-1.5 bg-electric-blue/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Shutter({
  accent,
  flip,
}: {
  accent: (typeof PRODUCTS)[number]["accent"];
  flip?: boolean;
}) {
  return (
    <div
      className={`hidden w-6 shrink-0 overflow-hidden rounded-2xl sm:block ${accentBg[accent]} ${flip ? "opacity-70" : "opacity-90"}`}
    >
      <div className="flex h-full flex-col justify-between py-3">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="mx-2 h-1.5 rounded-full bg-paper/25" />
        ))}
      </div>
    </div>
  );
}
