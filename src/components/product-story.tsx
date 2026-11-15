"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { PRODUCTS, getProduct, type AccentColor } from "@/data/products";
import { CineOverlay } from "@/components/cine";
import { FeatureImage } from "@/components/feature-image";
import { Reveal } from "@/components/reveal";
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";

const HERO_SIZES = "(min-width: 1024px) 760px, 100vw";

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
  const rtl = useLocale() === "ar";
  const index = PRODUCTS.findIndex((p) => p.slug === slug);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });
  // Ranges span 0–1 explicitly: the native scroll timeline fades back to the base value past the last keyframe otherwise.
  const midOpacity = useTransform(heroProgress, [0, 0.16, 0.42, 1], [0, 0, 1, 1]);
  const endOpacity = useTransform(heroProgress, [0, 0.56, 0.84, 1], [0, 0, 1, 1]);
  const stageScale = useTransform(heroProgress, [0, 1], [1, 1.12]);

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

      {/* 1 — hero: a pinned film stage; scrolling pours the product into the bowl */}
      <section ref={heroRef} dir="ltr" className="relative h-[280dvh] w-full">
        <div className="sticky top-0 h-dvh w-full overflow-hidden bg-black">
          <div
            className={`absolute bottom-[3dvh] left-1/2 aspect-[880/1168] h-[min(140vw,72dvh)] -translate-x-1/2 lg:top-1/2 lg:bottom-auto lg:h-[112dvh] lg:-translate-y-1/2 ${
              rtl ? "lg:left-[32%]" : "lg:left-[68%]"
            }`}
          >
            <div className="cine-fade-x h-full w-full">
              <div className="cine-fade-top h-full w-full [--fade-top:26%] lg:[--fade-top:10%]">
                <motion.div style={{ scale: stageScale }} className="relative h-full w-full origin-[50%_72%]">
                  <div className="cine-kenburns absolute inset-0">
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
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div
            aria-hidden
            className={`absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-transparent ${
              rtl
                ? "lg:bg-gradient-to-l lg:from-black/85 lg:via-black/20 lg:to-transparent"
                : "lg:bg-gradient-to-r lg:from-black/85 lg:via-black/20 lg:to-transparent"
            }`}
          />
          <CineOverlay />

          <div
            dir={rtl ? "rtl" : "ltr"}
            className="absolute inset-y-0 start-0 flex w-full flex-col items-center px-6 pt-[13dvh] text-center lg:w-[48%] lg:items-start lg:justify-center lg:px-14 lg:pt-0 lg:text-start"
          >
            <Reveal className="flex flex-col items-center lg:items-start">
              <p className="text-xs font-semibold tracking-[0.3em] text-white/60 uppercase">
                {t("origin")}
              </p>
              <h1 className="mt-4 text-balance font-display text-[clamp(2.4rem,6vw,5.4rem)] leading-[0.96] font-medium text-white">
                {t("name")}
              </h1>
              <p className="mt-4 max-w-md text-lg text-white/75">{t("tagline")}</p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Link
                  href={rfqHref}
                  className="inline-flex items-center gap-2 rounded-full bg-electric-blue px-6 py-3.5 text-sm font-semibold text-on-accent shadow-[0_10px_30px_rgb(var(--accent-rgb)/0.4)] transition-transform hover:scale-[1.03]"
                >
                  {tc("rfqButton")}
                  <ArrowUpRight size={16} />
                </Link>
                <span className="hidden rounded-full bg-white/12 px-5 py-3.5 text-sm font-medium text-white backdrop-blur-md sm:inline-block">
                  {tc("specLabels.minOrder")}: {spec.minOrder}
                </span>
              </div>
            </Reveal>
          </div>

          <div aria-hidden className="absolute inset-x-0 bottom-[9dvh] h-px bg-white/15">
            <motion.div
              style={{ scaleX: heroProgress, background: accent }}
              className={`h-full ${rtl ? "origin-right" : "origin-left"}`}
            />
          </div>
          <ArrowDown
            size={20}
            className="absolute bottom-[10.5dvh] left-1/2 -translate-x-1/2 animate-bounce text-white/60"
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
                className="inline-flex items-center gap-2 self-start rounded-full bg-electric-blue px-6 py-3.5 text-sm font-semibold text-on-accent shadow-[0_10px_30px_rgb(var(--accent-rgb)/0.4)] transition-transform hover:scale-[1.03]"
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
              <span className="mt-7 grid h-12 w-12 place-items-center rounded-full bg-electric-blue text-on-accent transition-transform duration-500 group-hover:translate-x-2 rtl:rotate-180 rtl:group-hover:-translate-x-2">
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
