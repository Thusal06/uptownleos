"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center" | "right";
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "items-center text-center"
      : align === "right"
      ? "items-end text-right"
      : "items-start text-left";

  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
      className={`w-full flex flex-col gap-3 ${alignment}`}
    >
      {eyebrow ? (
        <span className="text-sm tracking-[0.4em] uppercase text-sky-400/80">
          {eyebrow}
        </span>
      ) : null}
      <div className="text-balance text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-50">
        {title}
      </div>
      {subtitle ? (
        <p className="max-w-3xl text-base sm:text-lg text-slate-300/80">
          {subtitle}
        </p>
      ) : null}
    </motion.header>
  );
}
