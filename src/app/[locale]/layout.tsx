import type { Metadata } from "next";
import {
  Fraunces,
  Inter,
  Reem_Kufi,
  Cairo,
  Cinzel_Decorative,
  Marcellus,
  Bevan,
  Archivo_Narrow,
} from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "../globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const reemKufi = Reem_Kufi({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-display-ar",
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-body-ar",
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-cinzel",
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-marcellus",
});

const bevan = Bevan({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bevan",
});

const archivoNarrow = Archivo_Narrow({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-archivo-narrow",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "SERAJ | Afghan Saffron & Nuts in Bulk, from Herat",
  description:
    "Bulk Afghan saffron (Herat, Super Negin), wild pistachios, almonds, dried figs and pine nuts for manufacturers, packers and importers. From 1 kg.",
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fraunces.variable} ${inter.variable} ${reemKufi.variable} ${cairo.variable} ${cinzelDecorative.variable} ${marcellus.variable} ${bevan.variable} ${archivoNarrow.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var p=localStorage.getItem('seraj-palette');if(p==='artdeco'||p==='kodachrome'){document.documentElement.setAttribute('data-palette',p);}}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <div className="bg-mesh" />
        <div className="bg-grain" />
        <NextIntlClientProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
