import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { RfqForm } from "@/components/rfq-form";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <section className="px-4 pt-14 pb-24 md:pt-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="inline-block rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink">
            {t("eyebrow")}
          </span>
          <h1 className="mt-6 font-display text-4xl font-medium text-ink md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-ink-soft">{t("subtitle")}</p>
        </div>

        <div className="mt-12">
          <Suspense>
            <RfqForm />
          </Suspense>
        </div>

        <div className="mt-10 rounded-[2rem] glass p-6 text-center sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
            {t("directHeading")}
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink">
            <a href={`mailto:${t("email")}`} className="transition-opacity hover:opacity-70">
              {t("email")}
            </a>
            <span className="text-ink-soft">{t("whatsapp")}</span>
            <span className="text-ink-soft">{t("location")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
