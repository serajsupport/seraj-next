import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("about");
  const tc = useTranslations("common");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section className="px-4 pt-14 pb-24 md:pt-20">
      <div className="mx-auto max-w-4xl">
        <span className="inline-block rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink">
          {t("eyebrow")}
        </span>
        <h1 className="mt-6 font-display text-4xl font-medium text-ink md:text-5xl">
          {t("title")}
        </h1>
        <div className="mt-6 flex max-w-2xl flex-col gap-4">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className={i === 0 ? "text-lg leading-relaxed text-ink-soft" : "leading-relaxed text-ink-soft"}
            >
              {p}
            </p>
          ))}
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
