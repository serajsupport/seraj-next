"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { Reveal } from "@/components/reveal";

export function HowSteps({ steps }: { steps: { title: string; body: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });

  return (
    <div ref={ref} className="relative mt-12">
      <div aria-hidden className="absolute inset-x-0 -top-5 hidden h-px bg-electric-blue/20 lg:block">
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="h-full origin-left bg-electric-blue rtl:origin-right"
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, i) => (
          <Reveal key={i} delay={i * 90} className="h-full">
            <div className="lift h-full rounded-[1.75rem] glass p-6">
              <span className="font-display text-2xl text-electric-blue">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 font-display text-base font-medium text-ink">{step.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
