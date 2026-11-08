import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

export default function FaqPage() {
  const t = useTranslations("faq");
  const tc = useTranslations("common");
  const items = t.raw("items") as { q: string; a: string }[];

  return (
    <section className="px-4 pt-14 pb-24 md:pt-20">
      <div className="mx-auto max-w-3xl">
        <span className="inline-block rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink">
          {t("eyebrow")}
        </span>
        <h1 className="mt-6 font-display text-4xl font-medium text-ink md:text-5xl">
          {t("heading")}
        </h1>

        <div className="mt-12 flex flex-col gap-4">
          {items.map((item, i) => (
            <div key={i} className="rounded-[1.75rem] glass-strong p-6 sm:p-7">
              <p className="font-display text-lg font-medium text-ink">{item.q}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.a}</p>
            </div>
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
