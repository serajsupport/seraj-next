import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { PRODUCTS } from "@/data/products";

export function ProductMarquee() {
  const tp = useTranslations("products");

  return (
    <div dir="ltr" className="overflow-hidden border-y border-electric-blue/15 py-5 md:py-7">
      <div className="marquee-x flex w-max" style={{ "--marquee-duration": "38s" } as CSSProperties}>
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} aria-hidden={copy > 0 || undefined} className="flex shrink-0 items-center">
            {PRODUCTS.map((p) => (
              <span
                key={p.slug}
                className="flex items-center gap-5 pr-5 font-display text-3xl font-medium whitespace-nowrap text-ink md:gap-8 md:pr-8 md:text-5xl"
              >
                {tp(`${p.slug}.name`)}
                <p.Icon className="h-9 w-9 shrink-0 text-electric-blue md:h-12 md:w-12" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
