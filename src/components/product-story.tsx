"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { PRODUCTS, getProduct, type AccentColor } from "@/data/products";
import { FeatureImage } from "@/components/feature-image";
import { Parallax, Reveal } from "@/components/reveal";
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";

const HERO_SIZES = "(min-width: 1024px) 520px, 300px";

const accentVar: Record<AccentColor, string> = {
  almond: "var(--almond)",
  pistachio: "var(--pistachio)",
  pine: "var(--pine)",
  fig: "var(--fig)",
  saffron: "var(--saffron-red)",
};

type Spec = {
  grade?: string;
  form: string;
  minOrder: string;
  packing?: string;
  analysis: string;
};

export function ProductStory({ slug }: { slug: string }) {
  const product = getProduct(slug);
  const t = useTranslations(`products.${slug}`);
  const tc = useTranslations("common");
  const tp = useTranslations("products");
  const tg = useTranslations("grove");
  const index = PRODUCTS.findIndex((p) => p.slug === slug);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });
  // Ranges span 0–1 explicitly: the native scroll timeline fades back to the base value past the last keyframe otherwise.
  const midOpacity = useTransform(heroProgress, [0, 0.16, 0.42, 1], [0, 0, 1, 1]);
  const endOpacity = useTransform(heroProgress, [0, 0.56, 0.84, 1], [0, 0, 1, 1]);
  const cardScale = useTransform(heroProgress, [0, 1], [0.94, 1]);
  const photoScale = useTransform(heroProgress, [0, 1], [1.14, 1]);

  if (!product) return null;

  const accent = accentVar[product.accent];
  const prev = PRODUCTS[(index - 1 + PRODUCTS.length) % PRODUCTS.length];
  const next = PRODUCTS[(index + 1) % PRODUCTS.length];
  const spec = t.raw("spec") as Spec;
  const usedFor = t.raw("usedFor") as string[];
  const nutrition = t("nutrition");
  const rfqHref = `/contact?product=${product.slug}`;

  const specRows: { label: string; value: string }[] = [
    ...(spec.grade ? [{ label: tc("specLabels.grade"), value: spec.grade }] : []),
    { label: tc("specLabels.form"), value: spec.form },
    { label: tc("specLabels.minOrder"), value: spec.minOrder },
    ...(spec.packing ? [{ label: tc("specLabels.packing"), value: spec.packing }] : []),
    { label: tc("specLabels.analysis"), value: spec.analysis },
  ];

  return (
    <div>
      {/* persistent chrome */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between p-5">
        <Link
          href="/products"
          aria-label={tg("backToGrove")}
          className="glass grid h-10 w-10 place-items-center rounded-full text-ink transition-transform hover:scale-105"
        >
          <X size={18} />
        </Link>
        <span dir="ltr" className="glass rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink">
          {String(index + 1).padStart(2, "0")} / {String(PRODUCTS.length).padStart(2, "0")}
        </span>
      </div>

      {/* 1 — hero: pinned while the photo scrubs through its pouring sequence */}
      <section ref={heroRef} className="relative h-[260dvh] w-full">
        <div className="sticky top-0 flex h-dvh w-full items-center overflow-hidden px-6">
          <Parallax speed={0.08} className="pointer-events-none absolute start-[-6%] top-[14%] h-[70%] w-[60%] max-w-xl opacity-[0.08]">
            <product.Icon className="h-full w-full text-ink" />
          </Parallax>
          <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-6 lg:grid-cols-2 lg:gap-16">
            <Reveal className="order-2 text-center lg:order-1 lg:text-start">
              <span className="glass inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink">
                {t("origin")}
              </span>
              <h1 className="mt-5 text-balance font-display text-[clamp(2.2rem,6vw,5rem)] font-medium leading-[0.98] text-ink">
                {t("name")}
              </h1>
              <p className="mt-4 text-lg text-ink-soft">{t("tagline")}</p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Link
                  href={rfqHref}
                  className="inline-flex items-center gap-2 rounded-full bg-electric-blue px-6 py-3.5 text-sm font-semibold text-ink shadow-[0_10px_30px_rgba(47,111,239,0.4)] transition-transform hover:scale-[1.03]"
                >
                  {tc("rfqButton")}
                  <ArrowUpRight size={16} />
                </Link>
                <span className="glass hidden rounded-full px-5 py-3.5 text-sm font-medium text-ink sm:inline-block">
                  {tc("specLabels.minOrder")}: {spec.minOrder}
                </span>
              </div>
            </Reveal>
            <motion.div
              style={{ scale: cardScale }}
              className="relative order-1 mx-auto aspect-[880/1168] h-[min(40dvh,360px)] overflow-hidden rounded-[1.75rem] shadow-[0_30px_80px_rgba(0,0,0,0.6)] lg:order-2 lg:h-[min(78dvh,680px)]"
            >
              <motion.div style={{ scale: photoScale }} className="absolute inset-0">
                <Image
                  src={`/products/${product.slug}-start.jpg`}
                  alt={t("name")}
                  fill
                  preload
                  quality={90}
                  sizes={HERO_SIZES}
                  className="object-cover"
                />
                {(
                  [
                    [`/products/${product.slug}.jpg`, midOpacity],
                    [`/products/${product.slug}-end.jpg`, endOpacity],
                  ] as const
                ).map(([src, opacity]) => (
                  <motion.div key={src} style={{ opacity }} className="absolute inset-0">
                    <Image
                      src={src}
                      alt=""
                      fill
                      loading="eager"
                      quality={90}
                      sizes={HERO_SIZES}
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                aria-hidden
                style={{ scaleX: heroProgress, background: accent }}
                className="absolute inset-x-0 bottom-0 h-1 origin-left rtl:origin-right"
              />
            </motion.div>
          </div>
          <ArrowDown
            size={20}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce text-ink-soft"
          />
        </div>
      </section>

      {/* 2 — origin */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FeatureImage
            src={`/products/${product.slug}-end.jpg`}
            aspect="aspect-[3/4]"
            className="mx-auto w-full max-w-md"
          />
          <Reveal delay={120}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">
              {tc("origin")}
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-medium text-ink sm:text-5xl">
              {t("origin")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">{t("description")}</p>
          </Reveal>
        </div>
      </section>

      {/* 3 — specification */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">
              {t("name")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium text-ink sm:text-5xl">
              {tc("specification")}
            </h2>
            <dl className="mt-8 overflow-hidden rounded-[2rem] glass-strong">
              {specRows.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid gap-x-6 gap-y-1 px-6 py-5 sm:grid-cols-[11rem_1fr] ${
                    i > 0 ? "border-t border-electric-blue/12" : ""
                  }`}
                >
                  <dt className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                    {row.label}
                  </dt>
                  <dd className="text-sm font-medium text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <FallingPhoto
            src={`/products/${product.slug}.jpg`}
            alt={t("name")}
            rotate={4}
            delay={0.1}
            className="w-[230px] lg:w-[320px]"
          />
        </div>
      </section>

      {/* 4 — used for + price */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="lift h-full rounded-[2rem] glass p-8 md:p-10">
              <div className="mb-5 h-14 w-14 text-ink">
                <product.Icon className="h-full w-full" />
              </div>
              <h2 className="font-display text-2xl font-medium text-ink">{tc("usedFor")}</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {usedFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink-soft">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-blue" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120} className="h-full">
            <div className="lift flex h-full flex-col justify-between gap-8 rounded-[2rem] glass p-8 md:p-10">
              <div className="flex flex-col gap-5">
                <p className="font-display text-2xl leading-snug font-medium text-ink">
                  {tc("priceNote")}
                </p>
                {nutrition && <p className="leading-relaxed text-ink-soft">{nutrition}</p>}
                <div className="flex flex-wrap gap-2">
                  {[
                    `${tc("specLabels.minOrder")}: ${spec.minOrder}`,
                    `${tc("specLabels.form")}: ${spec.form}`,
                  ].map((fact) => (
                    <span
                      key={fact}
                      className="rounded-full bg-electric-blue/10 px-4 py-2 text-sm font-medium text-ink"
                    >
                      {fact}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href={rfqHref}
                className="inline-flex items-center gap-2 self-start rounded-full bg-electric-blue px-6 py-3.5 text-sm font-semibold text-ink shadow-[0_10px_30px_rgba(47,111,239,0.4)] transition-transform hover:scale-[1.03]"
              >
                {tc("rfqButton")}
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5 — next product */}
      <section className="px-6 pt-8 pb-24 md:pt-12">
        <Reveal>
          <Link
            href={`/products/${next.slug}`}
            className="group relative mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[2.5rem] glass sm:block sm:min-h-[24rem]"
          >
            <div className="relative z-10 px-8 pt-10 sm:w-[52%] sm:px-12 sm:py-16">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">
                {tg("next")}
              </p>
              <p className="mt-3 text-balance font-display text-4xl font-medium text-ink sm:text-6xl">
                {tp(`${next.slug}.name`)}
              </p>
              <p className="mt-4 text-ink-soft">{tp(`${next.slug}.tagline`)}</p>
              <span className="mt-7 grid h-12 w-12 place-items-center rounded-full bg-electric-blue text-ink transition-transform duration-500 group-hover:translate-x-2 rtl:rotate-180 rtl:group-hover:-translate-x-2">
                <ChevronRight size={20} />
              </span>
            </div>
            <div className="relative mt-8 h-60 [mask-image:linear-gradient(to_top,#000_60%,transparent)] sm:absolute sm:inset-y-0 sm:end-0 sm:mt-0 sm:h-auto sm:w-[56%] sm:[mask-image:linear-gradient(to_left,#000_55%,transparent)] sm:rtl:[mask-image:linear-gradient(to_right,#000_55%,transparent)]">
              <Image
                src={`/products/${next.slug}.jpg`}
                alt=""
                fill
                sizes="(min-width: 640px) 645px, 100vw"
                className="object-cover object-[center_62%] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
              />
            </div>
          </Link>
        </Reveal>

        <div className="mt-10 flex items-center justify-center gap-3">
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

function FallingPhoto({
  src,
  alt,
  rotate = -3,
  delay = 0,
  className = "",
}: {
  src: string;
  alt: string;
  rotate?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ y: -160, rotate: rotate * 3, opacity: 0 }}
      whileInView={{ y: 0, rotate, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: "spring", stiffness: 110, damping: 13, delay }}
      className={`relative mx-auto overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.55)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={880}
        height={1168}
        sizes="(min-width: 1024px) 320px, 230px"
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}
