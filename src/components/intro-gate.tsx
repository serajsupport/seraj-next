"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Sprout } from "lucide-react";

export function IntroGate() {
  const t = useTranslations("intro");
  const [open, setOpen] = useState(true);
  const lines = t.raw("lines") as string[];

  useEffect(() => {
    if (!open) return;
    const original = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = original;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden px-6 text-center"
          style={{ background: "linear-gradient(165deg, var(--ink), var(--olive-dark))" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="bg-grain absolute inset-0 opacity-30" />

          <div className="relative max-w-2xl">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 + i * 0.18, ease: "easeOut" }}
                className="text-balance font-display text-3xl font-medium leading-tight text-paper sm:text-5xl"
              >
                {line}
              </motion.p>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.25 + lines.length * 0.18 + 0.15,
              }}
              className="mt-6 text-sm text-paper/70 sm:text-base"
            >
              {t("subtitle")}
            </motion.p>

            <motion.button
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.25 + lines.length * 0.18 + 0.35,
              }}
              onClick={() => setOpen(false)}
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              <Sprout size={16} />
              {t("enter")}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
