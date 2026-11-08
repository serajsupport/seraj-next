import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, FlaskConical } from "lucide-react";

export default function QualityPage() {
  const t = useTranslations("quality");
  const tc = useTranslations("common");
  const spotItems = t.raw("spotItems") as string[];

  return (
    <section className="px-4 pt-14 pb-24 md:pt-20">
      <div className="mx-auto max-w-4xl">
        <span className="inline-block rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink">
          {t("eyebrow")}
        </span>
        <h1 className="mt-6 font-display text-4xl font-medium text-ink md:text-5xl">
          {t("heading")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {t("text")}
        </p>

        <div className="mt-12 rounded-[2rem] glass-strong p-8 md:p-10">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-electric-blue/15 text-electric-blue">
              <FlaskConical size={18} />
            </span>
            <p className="font-display text-xl font-medium text-ink">
              {t("spotHeading")}
            </p>
          </div>
          <ul className="mt-6 flex flex-col gap-4">
            {spotItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-blue" />
                <span className="text-sm leading-relaxed text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>

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
