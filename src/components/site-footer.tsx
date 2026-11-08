"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { PRODUCTS } from "@/data/products";

function isRoomRoute(pathname: string) {
  return pathname.startsWith("/products/") && pathname !== "/products/";
}

export function SiteFooter() {
  const t = useTranslations("footer");
  const tp = useTranslations("products");
  const tn = useTranslations("nav");
  const pathname = usePathname();

  if (isRoomRoute(pathname)) return null;

  return (
    <footer className="mt-24 px-4 pb-6">
      <div className="mx-auto max-w-6xl rounded-[2.5rem] glass-strong p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-medium text-ink">
              Seraj Store
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
              {t("tagline")}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
              {t("productsHeading")}
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {PRODUCTS.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="text-sm text-ink transition-opacity hover:opacity-70"
                  >
                    {tp(`${p.slug}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
              {t("companyHeading")}
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <Link href="/about" className="text-sm text-ink hover:opacity-70">
                  {tn("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-ink hover:opacity-70">
                  {tn("rfq")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-center gap-3 border-t border-electric-blue/15 pt-6 text-xs text-ink-soft md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} Seraj Store. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
