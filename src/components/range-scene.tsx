"use client";

import { useRef, useState, type CSSProperties } from "react";
import {
  AnimatePresence,
  easeInOut,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

// Left-to-right order of the bowls in the photo; focus is each bowl's centre as a % of the image width.
const STOPS = [
  { slug: "dried-figs", focus: 13.4 },
  { slug: "pistachios", focus: 31.3 },
  { slug: "saffron", focus: 50 },
  { slug: "almonds", focus: 69.2 },
  { slug: "pine-nuts", focus: 88 },
];

const HOLDS = [0, 0.11, 0.23, 0.33, 0.45, 0.55, 0.67, 0.77, 0.89, 1];
const FOCUS = STOPS.flatMap((s) => [s.focus, s.focus]);

function stopAt(progress: number) {
  if (progress < 0.17) return 0;
  if (progress < 0.39) return 1;
  if (progress < 0.61) return 2;
  if (progress < 0.83) return 3;
  return 4;
}

export function RangeScene() {
  const ref = useRef<HTMLElement>(null);
  const rtl = useLocale() === "ar";
  const tp = useTranslations("products");
  const tg = useTranslations("grove");
  const tgarden = useTranslations("garden");
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const focus = useTransform(scrollYProgress, HOLDS, FOCUS, { ease: easeInOut });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(stopAt(v)));

  const stop = STOPS[active];

  return (
    <motion.section
      ref={ref}
      dir="ltr"
      className="relative h-[440dvh]"
      style={{ "--focus": focus } as CSSProperties}
    >
      <div
        className={`sticky top-0 h-dvh overflow-hidden bg-black [--focus-x:50vw] lg:[--edge:36vw] ${
          rtl ? "lg:[--focus-x:34vw]" : "lg:[--focus-x:66vw]"
        }`}
      >
        <div className="range-track absolute top-[60%] left-0 aspect-[21/9] h-[min(193vw,100dvh)] lg:h-[min(111vw,190dvh)]">
          <Image
            src="/media/range-wide.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 200vw, 170vw"
            className="object-cover"
          />
          <div className="range-spot absolute inset-0" />
        </div>

        <div
          aria-hidden
          className={`absolute inset-0 bg-gradient-to-b from-black/85 via-black/10 to-black/40 ${
            rtl
              ? "lg:bg-gradient-to-l lg:from-black/85 lg:via-black/25 lg:to-transparent"
              : "lg:bg-gradient-to-r lg:from-black/85 lg:via-black/25 lg:to-transparent"
          }`}
        />
        <div aria-hidden className="absolute inset-x-0 top-0 h-[9dvh] bg-black" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[9dvh] bg-black" />

        <div
          dir={rtl ? "rtl" : "ltr"}
          className="absolute inset-y-0 start-0 flex w-full flex-col items-center px-6 pt-[15dvh] text-center lg:w-[46%] lg:items-start lg:justify-center lg:px-14 lg:pt-0 lg:text-start"
        >
          <p className="text-xs font-semibold tracking-[0.3em] text-white/60 uppercase">
            {tgarden("title")}
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={stop.slug}
              initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 flex flex-col items-center lg:items-start"
            >
              <span dir="ltr" className="font-display text-lg text-white/55">
                {String(active + 1).padStart(2, "0")} / {String(STOPS.length).padStart(2, "0")}
              </span>
              <h2 className="mt-2 text-balance font-display text-[clamp(2.3rem,5.2vw,4.6rem)] leading-[0.98] font-medium text-white">
                {tp(`${stop.slug}.name`)}
              </h2>
              <p className="mt-4 max-w-sm text-base text-white/75">{tp(`${stop.slug}.tagline`)}</p>
              <Link
                href={`/products/${stop.slug}`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/12 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/22"
              >
                {tg("enter")}
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <div aria-hidden className="absolute inset-x-0 bottom-[11.5dvh] flex justify-center gap-2">
          {STOPS.map((s, i) => (
            <span
              key={s.slug}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === active ? "w-10 bg-white" : "w-3 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
