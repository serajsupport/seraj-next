"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import type { ReactNode } from "react";

export function Hotspot({
  style,
  onClick,
  label,
  dotClassName = "bg-terracotta",
}: {
  style: React.CSSProperties;
  onClick: () => void;
  label: string;
  dotClassName?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      style={style}
      className="group absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center"
    >
      <span className="absolute h-10 w-10 animate-ping rounded-full bg-paper/70" />
      <span className="relative grid h-9 w-9 place-items-center rounded-full border border-ink/15 bg-paper/90 text-ink shadow-[0_6px_18px_rgba(42,35,24,0.25)] transition-transform group-hover:scale-110">
        <span className={`h-2 w-2 rounded-full ${dotClassName}`} />
      </span>
    </button>
  );
}

export function HotspotSheet({
  open,
  onClose,
  eyebrow,
  eyebrowClassName = "text-terracotta-dark",
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  eyebrow: string;
  eyebrowClassName?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="glass-strong relative w-full max-w-md rounded-b-none p-7 sm:rounded-b-[2rem] sm:p-9"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute end-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-ink/8 text-ink transition-transform hover:scale-105"
            >
              <X size={16} />
            </button>
            <p className={`text-xs font-semibold uppercase tracking-wider ${eyebrowClassName}`}>
              {eyebrow}
            </p>
            <h3 className="mt-2 font-display text-2xl font-medium text-ink">
              {title}
            </h3>
            <div className="mt-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
