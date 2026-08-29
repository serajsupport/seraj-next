import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Check } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("about");
  const tc = useTranslations("common");
  const points = t.raw("points") as string[];

  return (
    <section className="px-4 pt-14 pb-24 md:pt-20">
      <div className="mx-auto max-w-4xl">
        <span className="inline-block rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-terracotta-dark">
          {t("eyebrow")}
        </span>
        <h1 className="mt-6 font-display text-4xl font-medium text-ink md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {t("intro")}
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
          {t("body")}
        </p>

        <div className="mt-12 rounded-[2rem] glass-strong p-8 md:p-10">
          <p className="font-display text-xl font-medium text-ink">
            {t("pointsTitle")}
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-olive/15 text-olive">
                  <Check size={14} />
                </span>
                <span className="text-sm leading-relaxed text-ink">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/contact"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3.5 text-sm font-semibold text-paper shadow-[0_10px_30px_rgba(140,54,35,0.35)] transition-transform hover:scale-[1.03]"
        >
          {tc("rfqButton")}
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
