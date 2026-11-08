"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { PaletteSwitcher } from "@/components/palette-switcher";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/products", key: "products" },
  { href: "/how-to-order", key: "howToOrder" },
  { href: "/quality", key: "quality" },
  { href: "/about", key: "about" },
  { href: "/faq", key: "faq" },
] as const;

function isRoomRoute(pathname: string) {
  return pathname.startsWith("/products/") && pathname !== "/products/";
}

export function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (isRoomRoute(pathname)) return null;

  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full glass px-5 py-3">
        <Link
          href="/"
          className="font-display text-xl font-medium tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          SERAJ
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  active
                    ? "bg-electric-blue/14 text-ink"
                    : "text-ink-soft hover:bg-electric-blue/8 hover:text-ink"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <PaletteSwitcher />
          <LocaleSwitcher locale={locale} pathname={pathname} />
          <Link
            href="/contact"
            className="rounded-full bg-electric-blue px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_6px_18px_rgba(47,111,239,0.4)] transition-transform hover:scale-[1.03]"
          >
            {t("rfq")}
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-full text-electric-blue lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-3xl glass p-4 lg:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-base font-medium text-ink hover:bg-electric-blue/8"
            >
              {t(item.key)}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-2xl bg-electric-blue px-4 py-3 text-center text-base font-semibold text-ink"
          >
            {t("rfq")}
          </Link>
          <div className="mt-1 flex justify-center gap-2 pt-1">
            <PaletteSwitcher />
            <LocaleSwitcher locale={locale} pathname={pathname} />
          </div>
        </div>
      )}
    </header>
  );
}

function LocaleSwitcher({
  locale,
  pathname,
}: {
  locale: string;
  pathname: string;
}) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-electric-blue/10 p-1 text-xs font-semibold">
      <Link
        href={pathname}
        locale="en"
        className={`rounded-full px-3 py-1.5 transition-colors ${
          locale === "en" ? "bg-electric-blue text-ink shadow-sm" : "text-ink-soft"
        }`}
      >
        EN
      </Link>
      <Link
        href={pathname}
        locale="ar"
        className={`rounded-full px-3 py-1.5 transition-colors ${
          locale === "ar" ? "bg-electric-blue text-ink shadow-sm" : "text-ink-soft"
        }`}
      >
        عربي
      </Link>
    </div>
  );
}
