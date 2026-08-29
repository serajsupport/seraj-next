"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PRODUCTS } from "@/data/products";
import { accentText } from "@/lib/accent";
import { ArrowUpRight } from "lucide-react";

export function BotanicalGarden() {
  const t = useTranslations("products");
  const tc = useTranslations("common");

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
      {PRODUCTS.map((product, i) => (
        <motion.div
          key={product.slug}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
          className={i % 2 === 1 ? "md:mt-10" : ""}
        >
          <Link
            href={`/products/${product.slug}`}
            className="group flex flex-col items-center gap-3 text-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
              whileHover={{ scale: 1.06 }}
              className={`glass-pod relative flex aspect-square w-full items-center justify-center p-6 transition-shadow duration-300 group-hover:shadow-[0_18px_40px_rgba(42,35,24,0.22)] ${accentText[product.accent]}`}
            >
              <product.Icon className="h-4/5 w-4/5" />
              <span className="absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-ink/8 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 rtl:right-auto rtl:left-3">
                <ArrowUpRight size={16} />
              </span>
            </motion.div>

            <div>
              <p className="font-display text-lg font-medium text-ink">
                {t(`${product.slug}.name`)}
              </p>
              <p className="text-xs text-ink-soft">{t(`${product.slug}.tagline`)}</p>
            </div>
          </Link>
        </motion.div>
      ))}
      <p className="col-span-2 mt-2 text-center text-xs uppercase tracking-widest text-ink-soft sm:col-span-3 md:col-span-5">
        {tc("tapHint")}
      </p>
    </div>
  );
}
