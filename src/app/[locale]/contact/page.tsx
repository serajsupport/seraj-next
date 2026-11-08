import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { RfqForm } from "@/components/rfq-form";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <section className="px-4 pt-14 pb-24 md:pt-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="inline-block rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-electric-blue-dark">
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
      </div>
    </section>
  );
}
