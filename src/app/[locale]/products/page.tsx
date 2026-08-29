import { useTranslations } from "next-intl";
import { BotanicalGarden } from "@/components/botanical-garden";

export default function ProductsPage() {
  const t = useTranslations("products");

  return (
    <section className="px-4 pt-14 pb-24 md:pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl font-medium text-ink md:text-5xl">
            {t("heading")}
          </h1>
          <p className="mt-3 text-ink-soft">{t("subheading")}</p>
        </div>
        <div className="mt-14 md:mt-20">
          <BotanicalGarden />
        </div>
      </div>
    </section>
  );
}
