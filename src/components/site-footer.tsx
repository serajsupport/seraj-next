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

  const socials = [
    { key: "instagram", href: "https://instagram.com/o.seraj.store" },
    { key: "tiktok", href: "https://tiktok.com/@oserajstore" },
    { key: "facebook", href: "https://facebook.com" },
    { key: "youtube", href: "https://youtube.com" },
  ] as const;

  return (
    <footer className="mt-24 px-4 pb-6">
      <div className="mx-auto max-w-6xl rounded-[2.5rem] glass-strong p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-medium text-ink">SERAJ</p>
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
                <Link href="/how-to-order" className="text-sm text-ink hover:opacity-70">
                  {tn("howToOrder")}
                </Link>
              </li>
              <li>
                <Link href="/quality" className="text-sm text-ink hover:opacity-70">
                  {tn("quality")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-ink hover:opacity-70">
                  {tn("about")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-ink hover:opacity-70">
                  {tn("faq")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
              {t("contactHeading")}
            </p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-ink">
              <li>
                <a href={`mailto:${t("email")}`} className="transition-opacity hover:opacity-70">
                  {t("email")}
                </a>
              </li>
              <li className="text-ink-soft">{t("whatsapp")}</li>
              <li className="text-ink-soft">{t("location")}</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-soft">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-70"
                >
                  {t(`social.${s.key}`)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-electric-blue/15 pt-6 text-xs text-ink-soft">
          <p className="leading-relaxed">{t("smallPrint")}</p>
          <p>
            © {new Date().getFullYear()} SERAJ. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
