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
          style={{
            background:
              "radial-gradient(60rem 40rem at 50% -10%, rgba(47,111,239,0.14), transparent 65%), radial-gradient(50rem 36rem at 90% 100%, rgba(255,148,82,0.12), transparent 70%), var(--midnight)",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="bg-grain-dark" />

          <div className="relative w-full max-w-4xl">
            {lines.map((line, i) => (
              <div
                key={i}
                className={`overflow-hidden text-center ${i % 2 === 0 ? "sm:text-start" : "sm:text-end"}`}
              >
                <motion.p
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.8,
                    delay: 0.25 + i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-balance font-display text-[clamp(2.25rem,7vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.01em] text-ink"
                >
                  {line}
                </motion.p>
              </div>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.25 + lines.length * 0.15 + 0.15,
              }}
              className="mt-7 text-sm text-ink-soft sm:text-base"
            >
              {t("subtitle")}
            </motion.p>

            <motion.button
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.25 + lines.length * 0.15 + 0.35,
              }}
              onClick={() => setOpen(false)}
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-electric-blue px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-[0.97]"
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
