"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Sprout } from "lucide-react";

const SEEN_KEY = "seraj-intro-seen";

const FLOATERS = [
  { src: "/products/saffron.jpg", depth: 26, rotate: -8, place: "start-[4%] -top-[7vh] hidden sm:block", delay: 0.5 },
  { src: "/products/almonds.jpg", depth: -18, rotate: 7, place: "end-[5%] -top-[7vh]", delay: 0.65 },
  { src: "/products/pistachios.jpg", depth: -22, rotate: 6, place: "start-[6%] -bottom-[7vh]", delay: 0.8 },
  { src: "/products/dried-figs.jpg", depth: 30, rotate: -6, place: "end-[4%] -bottom-[7vh] hidden sm:block", delay: 0.95 },
];

const noopSubscribe = () => () => {};

function readSeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

export function IntroGate() {
  const t = useTranslations("intro");
  const seen = useSyncExternalStore(noopSubscribe, readSeen, () => false);
  const [dismissed, setDismissed] = useState(false);
  const open = !seen && !dismissed;
  const lines = t.raw("lines") as string[];

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 50, damping: 14 });
  const y = useSpring(pointerY, { stiffness: 50, damping: 14 });

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const original = root.style.overflow;
    root.style.overflow = "hidden";
    root.dataset.intro = "open";
    return () => {
      root.style.overflow = original;
      delete root.dataset.intro;
    };
  }, [open]);

  function enter() {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // storage unavailable: the intro simply shows again next time
    }
    setDismissed(true);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden px-6 text-center"
          style={{
            background:
              "radial-gradient(60rem 40rem at 50% -10%, rgb(var(--accent-rgb) / 0.12), transparent 65%), radial-gradient(50rem 36rem at 90% 100%, rgb(var(--cantaloupe-rgb) / 0.12), transparent 70%), var(--midnight)",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: dismissed ? 0.6 : 0, ease: "easeInOut" }}
          onPointerMove={(e) => {
            pointerX.set(e.clientX / window.innerWidth - 0.5);
            pointerY.set(e.clientY / window.innerHeight - 0.5);
          }}
        >
          <div className="bg-grain-dark" />

          {FLOATERS.map((f) => (
            <Floater key={f.src} {...f} x={x} y={y} />
          ))}

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
              onClick={enter}
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-electric-blue px-6 py-3.5 text-sm font-semibold text-on-accent transition-transform hover:scale-[1.03] active:scale-[0.97]"
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

function Floater({
  src,
  depth,
  rotate,
  place,
  delay,
  x,
  y,
}: {
  src: string;
  depth: number;
  rotate: number;
  place: string;
  delay: number;
  x: MotionValue<number>;
  y: MotionValue<number>;
}) {
  const shiftX = useTransform(x, (v) => v * depth * 2);
  const shiftY = useTransform(y, (v) => v * depth * 2);

  return (
    <motion.div style={{ x: shiftX, y: shiftY }} className={`absolute ${place}`}>
      <motion.div
        initial={{ opacity: 0, y: 60, rotate: rotate * 2.5 }}
        animate={{ opacity: 1, y: 0, rotate }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="drift relative aspect-[880/1168] h-[24vh] overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.55)] sm:h-[29vh]"
          style={{ animationDelay: `${delay * -9}s` }}
        >
          <Image src={src} alt="" fill sizes="240px" className="object-cover" />
        </div>
      </motion.div>
    </motion.div>
  );
}
