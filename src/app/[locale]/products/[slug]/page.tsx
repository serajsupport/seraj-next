import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { PRODUCTS, getProduct } from "@/data/products";
import { ProductScene } from "@/components/product-scene";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

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

  const index = PRODUCTS.findIndex((p) => p.slug === slug);
  const prev = PRODUCTS[(index - 1 + PRODUCTS.length) % PRODUCTS.length];
  const next = PRODUCTS[(index + 1) % PRODUCTS.length];

  const t = await getTranslations(`products.${slug}`);
  const tp = await getTranslations("products");
  const tc = await getTranslations("common");
  const tg = await getTranslations("grove");

  return (
    <section className="px-4 pt-8 pb-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            <ChevronLeft size={16} className="rtl:rotate-180" />
            {tg("backToGrove")}
          </Link>
          <span className="rounded-full bg-ink/6 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink-soft">
            {String(index + 1).padStart(2, "0")} / {String(PRODUCTS.length).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
            {tg("chapter")} {String(index + 1).padStart(2, "0")}
          </p>
          <h1 className="mt-2 font-display text-4xl font-medium text-ink md:text-5xl">
            {t("name")}
          </h1>
          <p className="mt-2 text-ink-soft">{t("tagline")}</p>
        </div>

        <div className="mt-8">
          <ProductScene slug={product.slug} />
        </div>

        <p className="mt-4 text-center text-xs uppercase tracking-widest text-ink-soft">
          {tc("tapHint")}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <Link
            href={`/products/${prev.slug}`}
            className="group inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.02]"
          >
            <ChevronLeft size={16} className="rtl:rotate-180" />
            {tp(`${prev.slug}.name`)}
          </Link>

          <Link
            href={`/contact?product=${product.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3.5 text-sm font-semibold text-paper shadow-[0_10px_30px_rgba(140,54,35,0.35)] transition-transform hover:scale-[1.03]"
          >
            {tc("rfqButton")}
            <ArrowUpRight size={16} />
          </Link>

          <Link
            href={`/products/${next.slug}`}
            className="group inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.02]"
          >
            {tp(`${next.slug}.name`)}
            <ChevronRight size={16} className="rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
