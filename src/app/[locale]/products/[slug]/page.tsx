import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { PRODUCTS, getProduct } from "@/data/products";
import { accentText } from "@/lib/accent";
import { ArrowUpRight, ChevronLeft } from "lucide-react";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PRODUCTS.map((p) => ({ locale, slug: p.slug })),
  );
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/[locale]/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const t = await getTranslations(`products.${slug}`);
  const tc = await getTranslations("common");

  const grades = t.raw("grades") as string[];
  const packaging = t.raw("packaging") as string[];
  const uses = t.raw("uses") as string[];

  return (
    <section className="px-4 pt-10 pb-24">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
        >
          <ChevronLeft size={16} className="rtl:rotate-180" />
          {tc("backToProducts")}
        </Link>

        <div className="mt-8 grid gap-10 md:grid-cols-2 md:items-center md:gap-6">
          <div
            className={`glass-strong flex aspect-square items-center justify-center p-10 md:p-14 ${accentText[product.accent]}`}
          >
            <product.Icon className="h-full w-full" />
          </div>

          <div>
            <p className={`text-sm font-semibold ${accentText[product.accent]}`}>
              {t("tagline")}
            </p>
            <h1 className="mt-2 font-display text-4xl font-medium text-ink md:text-5xl">
              {t("name")}
            </h1>
            <p className="mt-5 leading-relaxed text-ink-soft">
              {t("description")}
            </p>

            <div className="mt-6 rounded-2xl glass px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                {tc("origin")}
              </p>
              <p className="mt-1 font-display text-lg text-ink">{t("origin")}</p>
            </div>

            <Link
              href={`/contact?product=${product.slug}`}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3.5 text-sm font-semibold text-paper shadow-[0_10px_30px_rgba(140,54,35,0.35)] transition-transform hover:scale-[1.03]"
            >
              {tc("rfqButton")}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <SpecCard title={tc("grades")} items={grades} />
          <SpecCard title={tc("packaging")} items={packaging} />
          <SpecCard title={tc("uses")} items={uses} />
        </div>
      </div>
    </section>
  );
}

function SpecCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="glass p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
        {title}
      </p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-ink">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mustard" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
