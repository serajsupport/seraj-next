"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PRODUCTS, getProduct, type AccentColor } from "@/data/products";
import { BasketIcon, SackIcon } from "@/components/scene-props";
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";

const accentVar: Record<AccentColor, string> = {
  almond: "var(--almond)",
  pistachio: "var(--pistachio)",
  pine: "var(--pine)",
  fig: "var(--fig)",
  saffron: "var(--saffron-red)",
};

export function ProductStory({ slug }: { slug: string }) {
  const product = getProduct(slug);
  const t = useTranslations(`products.${slug}`);
  const tc = useTranslations("common");
  const tp = useTranslations("products");
  const tg = useTranslations("grove");
  const index = PRODUCTS.findIndex((p) => p.slug === slug);

  if (!product) return null;

  const accent = accentVar[product.accent];
  const prev = PRODUCTS[(index - 1 + PRODUCTS.length) % PRODUCTS.length];
  const next = PRODUCTS[(index + 1) % PRODUCTS.length];
  const grades = t.raw("grades") as string[];
  const packaging = t.raw("packaging") as string[];
  const uses = t.raw("uses") as string[];

  return (
    <div className="snap-y snap-proximity">
      {/* persistent chrome */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between p-5">
        <Link
          href="/products"
          aria-label={tg("backToGrove")}
          className="glass grid h-10 w-10 place-items-center rounded-full text-ink transition-transform hover:scale-105"
        >
          <X size={18} />
        </Link>
        <span className="glass rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink">
          {String(index + 1).padStart(2, "0")} / {String(PRODUCTS.length).padStart(2, "0")}
        </span>
      </div>

      {/* 1 — hero */}
      <section
        className="snap-start relative flex h-dvh w-full items-center justify-center overflow-hidden px-6 text-center"
        style={{ background: `linear-gradient(165deg, var(--midnight), color-mix(in srgb, ${accent} 32%, var(--midnight)))` }}
      >
        <Parallax speed={0.08} className="pointer-events-none absolute left-1/2 top-[8%] h-[70%] w-[70%] max-w-xl -translate-x-1/2 opacity-[0.16]">
          <product.Icon className="h-full w-full text-ink" />
        </Parallax>
        <Reveal className="relative z-10 max-w-2xl">
          <span className="glass inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink">
            {t("origin")}
          </span>
          <h1 className="mt-6 text-balance font-display text-[clamp(2.4rem,7vw,5rem)] font-medium leading-[0.98] text-ink">
            {t("name")}
          </h1>
          <p className="mt-4 text-lg text-ink-soft">{t("tagline")}</p>
        </Reveal>
        <ArrowDown
          size={20}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-ink-soft"
        />
      </section>

      {/* 2 — origin / description */}
      <section
        className="snap-start relative flex min-h-dvh w-full items-center overflow-hidden px-6 py-24"
        style={{ background: `color-mix(in srgb, ${accent} 14%, var(--paper))` }}
      >
        <Parallax
          speed={0.12}
          className="pointer-events-none absolute -right-10 top-1/2 h-72 w-72 -translate-y-1/2 opacity-20 sm:h-96 sm:w-96"
        >
          <div style={{ color: accent }}>
            <product.Icon className="h-full w-full" />
          </div>
        </Parallax>
        <Reveal className="relative z-10 mx-auto max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>
            {tc("origin")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium text-ink-deep sm:text-4xl">
            {t("origin")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-deep/70">{t("description")}</p>
        </Reveal>
      </section>

      {/* 3 — grades (statement block) */}
      <section
        className="snap-start relative flex min-h-dvh w-full items-center overflow-hidden px-6 py-24"
        style={{ background: `color-mix(in srgb, ${accent} 75%, var(--ink-deep))` }}
      >
        <Reveal className="relative z-10 mx-auto w-full max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/85">
            {t("name")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium text-paper sm:text-4xl">
            {tc("grades")}
          </h2>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {grades.map((grade) => (
              <li
                key={grade}
                className="rounded-full border border-paper/40 bg-paper/15 px-4 py-2 text-sm font-medium text-paper"
              >
                {grade}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* 4 — packaging + uses */}
      <section
        className="snap-start relative flex min-h-dvh w-full items-center overflow-hidden px-6 py-24"
        style={{ background: `color-mix(in srgb, ${accent} 10%, var(--paper))` }}
      >
        <Parallax
          speed={0.1}
          className="pointer-events-none absolute -left-12 bottom-[-5%] h-64 w-64 opacity-20 sm:h-80 sm:w-80"
        >
          <div style={{ color: accent }}>
            <SackIcon className="h-full w-full" />
          </div>
        </Parallax>
        <Reveal className="relative z-10 mx-auto grid w-full max-w-3xl gap-10 sm:grid-cols-2">
          <div>
            <div className="mb-4 h-14 w-14 opacity-80" style={{ color: accent }}>
              <SackIcon className="h-full w-full" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>
              {tc("packaging")}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {packaging.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-deep/80">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: accent }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-4 h-14 w-14 opacity-80" style={{ color: accent }}>
              <BasketIcon className="h-full w-full" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>
              {tc("uses")}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {uses.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-deep/80">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: accent }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* 5 — cta + nav */}
      <section
        className="snap-start relative flex min-h-dvh w-full flex-col items-center justify-center gap-10 overflow-hidden px-6 py-24 text-center"
        style={{ background: `linear-gradient(195deg, color-mix(in srgb, ${accent} 26%, var(--midnight)), var(--midnight))` }}
      >
        <Reveal>
          <h2 className="text-balance font-display text-3xl font-medium text-ink sm:text-4xl">
            {tc("rfqButton")}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-ink-soft">{t("tagline")}</p>
          <Link
            href={`/contact?product=${product.slug}`}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-electric-blue px-6 py-3.5 text-sm font-semibold text-ink shadow-[0_10px_30px_rgba(47,111,239,0.4)] transition-transform hover:scale-[1.03]"
          >
            {tc("rfqButton")}
            <ArrowUpRight size={16} />
          </Link>
        </Reveal>

        <div className="flex items-center gap-3">
          <Link
            href={`/products/${prev.slug}`}
            aria-label={tp(`${prev.slug}.name`)}
            className="glass grid h-11 w-11 place-items-center rounded-full text-ink transition-transform hover:scale-105 rtl:rotate-180"
          >
            <ChevronLeft size={18} />
          </Link>
          <Link
            href="/products"
            className="glass rounded-full px-5 py-2.5 text-sm font-medium text-ink"
          >
            {tg("backToGrove")}
          </Link>
          <Link
            href={`/products/${next.slug}`}
            aria-label={tp(`${next.slug}.name`)}
            className="glass grid h-11 w-11 place-items-center rounded-full text-ink transition-transform hover:scale-105 rtl:rotate-180"
          >
            <ChevronRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function Parallax({
  children,
  speed = 0.1,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${offset * -speed}px)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
