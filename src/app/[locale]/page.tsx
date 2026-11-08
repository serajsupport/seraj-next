import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GroveBrowser } from "@/components/grove-browser";
import { IntroGate } from "@/components/intro-gate";
import { ArrowUpRight } from "lucide-react";

export default function HomePage() {
  const th = useTranslations("hero");
  const tg = useTranslations("garden");
  const tt = useTranslations("trust");
  const tcb = useTranslations("ctaBand");

  const trustItems = tt.raw("items") as { title: string; body: string }[];

  return (
    <>
      <IntroGate />

      <section className="px-4 pt-14 md:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-electric-blue-dark">
            {th("eyebrow")}
          </span>
          <h1 className="text-balance mt-6 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.015em] text-ink">
            {th("title")}
          </h1>
          <p className="text-balance mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
            {th("subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-cantaloupe px-6 py-3.5 text-sm font-semibold text-midnight shadow-[0_10px_30px_rgba(255,148,82,0.4)] transition-transform hover:scale-[1.03]"
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
        </div>
      </section>

      <section className="px-4 pt-20 md:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-medium text-ink md:text-4xl">
              {tg("title")}
            </h2>
            <p className="mt-3 text-ink-soft">{tg("subtitle")}</p>
          </div>
          <div className="mt-12 md:mt-16">
            <GroveBrowser />
          </div>
        </div>
      </section>

      <section className="px-4 pt-24 md:pt-32">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] glass-strong p-8 md:p-14">
          <h2 className="font-display text-3xl font-medium text-ink md:text-4xl">
            {tt("title")}
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {trustItems.map((item, i) => (
              <div key={i}>
                <span className="font-display text-3xl text-electric-blue">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 font-display text-lg font-medium text-ink">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] glass p-10 text-center md:p-16">
          <h2 className="text-balance font-display text-3xl font-medium text-ink md:text-4xl">
            {tcb("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-soft">{tcb("body")}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-electric-blue px-6 py-3.5 text-sm font-semibold text-paper shadow-[0_10px_30px_rgba(47,111,239,0.35)] transition-transform hover:scale-[1.03]"
          >
            {tcb("button")}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
