import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { PRODUCTS, getProduct } from "@/data/products";
import { ProductStory } from "@/components/product-story";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PRODUCTS.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  const t = await getTranslations(`products.${slug}`);
  return {
    title: `${t("name")} | SERAJ`,
    description: t("metaDescription"),
  };
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/[locale]/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return <ProductStory slug={product.slug} />;
}
