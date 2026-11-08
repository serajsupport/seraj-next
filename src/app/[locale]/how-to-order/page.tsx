import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

export default function HowToOrderPage() {
  const t = useTranslations("howToOrder");
  const tc = useTranslations("common");
  const steps = t.raw("steps") as { title: string; body: string }[];

  return (
    <section className="px-4 pt-14 pb-24 md:pt-20">
      <div className="mx-auto max-w-4xl">
        <span className="inline-block rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink">
          {t("eyebrow")}
        </span>
        <h1 className="mt-6 font-display text-4xl font-medium text-ink md:text-5xl">
          {t("heading")}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {t("intro")}
        </p>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2">
          {steps.map((step, i) => (
            <li key={i} className="rounded-[1.75rem] glass-strong p-6">
              <span className="font-display text-2xl text-electric-blue">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 font-display text-lg font-medium text-ink">
                {step.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 rounded-[1.75rem] bg-electric-blue/8 p-6 text-sm font-medium text-ink">
          <p>{t("minOrderNote")}</p>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          {t("documentsNote")}
        </p>

        <Link
          href="/contact"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-electric-blue px-6 py-3.5 text-sm font-semibold text-ink shadow-[0_10px_30px_rgba(47,111,239,0.4)] transition-transform hover:scale-[1.03]"
        >
          {tc("rfqButton")}
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
