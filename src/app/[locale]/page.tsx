import type { CSSProperties } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PRODUCTS } from "@/data/products";
import { FeatureImage } from "@/components/feature-image";
import { HowSteps } from "@/components/how-steps";
import { IntroGate } from "@/components/intro-gate";
import { PhotoColumns, PhotoRow } from "@/components/photo-columns";
import { ProductMarquee } from "@/components/product-marquee";
import { RangeScene } from "@/components/range-scene";
import { Reveal } from "@/components/reveal";
import { ArrowUpRight } from "lucide-react";

const GROVE_SPOTS = [
  "start-[1%] top-[4%] h-40 w-40 md:h-52 md:w-52",
  "start-[34%] top-[54%] h-36 w-36 md:h-48 md:w-48",
  "start-[12%] bottom-[2%] h-32 w-32 md:h-44 md:w-44",
  "end-[2%] top-[10%] h-36 w-36 md:h-44 md:w-44 lg:end-[47%] lg:top-[1%]",
  "end-[6%] bottom-[20%] h-32 w-32 md:h-40 md:w-40 lg:end-[52%] lg:bottom-[4%]",
];

const BOTTOM_FADE = "linear-gradient(to bottom, transparent, #000 48%)";

export default function HomePage() {
  const th = useTranslations("hero");
  const thl = useTranslations("highlights");
  const two = useTranslations("whyOrigin");
  const thw = useTranslations("howItWorksHome");
  const tcb = useTranslations("ctaBand");

  const highlightItems = thl.raw("items") as { title: string; body: string }[];
  const whyParagraphs = two.raw("paragraphs") as string[];
  const howSteps = thw.raw("steps") as { title: string; body: string }[];

  return (
    <>
      <IntroGate />

      <section className="relative overflow-hidden px-4 pt-10 md:pt-14">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {PRODUCTS.map((p, i) => (
            <div
              key={p.slug}
              className={`drift draw-on absolute text-ink opacity-[0.1] ${GROVE_SPOTS[i]}`}
              style={
                {
                  "--drift-duration": `${10 + i * 2}s`,
                  "--draw-delay": `${0.3 + i * 0.35}s`,
                  animationDelay: `${i * -2.5}s`,
                } as CSSProperties
              }
            >
              <p.Icon className="h-full w-full" />
            </div>
          ))}
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <Reveal className="text-center lg:text-start">
            <span className="inline-block rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink">
              {th("eyebrow")}
            </span>
            <h1 className="text-balance mt-6 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.015em] text-ink lg:text-[clamp(2.75rem,4.5vw,4.6rem)]">
              {th("title")}
            </h1>
            <p className="text-balance mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg lg:mx-0">
              {th("subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-electric-blue px-6 py-3.5 text-sm font-semibold text-ink shadow-[0_10px_30px_rgba(47,111,239,0.4)] transition-transform hover:scale-[1.03]"
              >
                {th("cta")}
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5 rtl:group-hover:translate-y-0.5"
                />
              </Link>
              <Link
                href="/products"
                className="rounded-full glass px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
              >
                {th("ctaSecondary")}
              </Link>
            </div>
            <p className="mt-6 text-xs font-medium uppercase tracking-wider text-ink-soft">
              {th("smallLine")}
            </p>
          </Reveal>

          <Reveal delay={150} className="hidden lg:block">
            <PhotoColumns />
          </Reveal>
        </div>

        <Reveal delay={150} className="relative -mx-4 mt-10 lg:hidden">
          <PhotoRow />
        </Reveal>
      </section>

      <div className="mt-16 md:mt-24">
        <ProductMarquee />
      </div>

      <RangeScene />

      <section className="px-4 pt-24 md:pt-32">
        <Reveal>
          <div className="mx-auto max-w-6xl rounded-[2.5rem] glass-strong p-8 md:p-14">
            <h2 className="font-display text-3xl font-medium text-ink md:text-4xl">
              {thl("title")}
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {highlightItems.map((item, i) => (
                <Reveal key={i} delay={150 + i * 120}>
                  <span className="font-display text-3xl text-electric-blue">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 font-display text-lg font-medium text-ink">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="px-4 pt-24 md:pt-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FeatureImage src="/media/crocus.jpg" className="mx-auto w-full max-w-md" />
          <Reveal delay={120}>
            <h2 className="text-balance font-display text-3xl font-medium text-ink md:text-4xl">
              {two("heading")}
            </h2>
            <div className="mt-6 flex flex-col gap-4">
              {whyParagraphs.map((p, i) => (
                <p key={i} className="leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 pt-24 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-medium text-ink md:text-4xl">
              {thw("heading")}
            </h2>
          </Reveal>
          <HowSteps steps={howSteps} />
        </div>
      </section>

      <section className="px-4 py-24 md:py-32">
        <Reveal>
          <div className="relative mx-auto min-h-[32rem] max-w-6xl overflow-hidden rounded-[2.5rem] glass sm:min-h-[35rem]">
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-[13rem] sm:h-[72%]"
              style={{ maskImage: BOTTOM_FADE, WebkitMaskImage: BOTTOM_FADE }}
            >
              <Image
                src="/media/range-wide.jpg"
                alt=""
                fill
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="object-cover object-bottom"
              />
            </div>
            <div className="relative px-8 pt-12 text-center md:px-16 md:pt-16">
              <h2 className="text-balance font-display text-3xl font-medium text-ink md:text-5xl">
                {tcb("title")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-ink-soft">{tcb("body")}</p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-electric-blue px-6 py-3.5 text-sm font-semibold text-ink shadow-[0_10px_30px_rgba(47,111,239,0.35)] transition-transform hover:scale-[1.03]"
              >
                {tcb("button")}
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
