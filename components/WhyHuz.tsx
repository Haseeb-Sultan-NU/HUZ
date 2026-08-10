"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Sparkles, Layers, MessageCircle, ShieldCheck } from "lucide-react";

// ─── Card Data ──────────────────────────────────────────────────────────────────
const CARDS = [
  {
    Icon: Layers,
    title: "Modern Architecture Only",
    body: "We don\u2019t recycle old templates or use outdated legacy code. Every project is engineered from the ground up using the latest frameworks for maximum speed, security, and scalability.",
  },
  {
    Icon: MessageCircle,
    title: "Direct, Agile Communication",
    body: "No getting lost in a maze of account managers. You work directly with the engineers building your systems, ensuring your vision is translated perfectly without the telephone game.",
  },
  {
    Icon: ShieldCheck,
    title: "Zero Technical Debt",
    body: "We build clean, modular, and containerized systems. Whether it\u2019s a Next.js web app or an AI workflow, we hand over architecture that is easy to maintain and ready to scale the day it launches.",
  },
];

// ─── Animation Variants ─────────────────────────────────────────────────────────
const sectionFade: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemFade: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Glass Card Sub-component ───────────────────────────────────────────────────
function GlassCard({ card }: { card: (typeof CARDS)[number] }) {
  const [hovered, setHovered] = useState(false);
  const Icon = card.Icon;

  return (
    <motion.div
      variants={itemFade}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative cursor-default"
    >
      <motion.div
        animate={{
          scale: hovered ? 1.02 : 1,
          borderColor: hovered
            ? "rgba(99,91,255,0.45)"
            : "rgba(255,255,255,0.10)",
          boxShadow: hovered
            ? "0 20px 48px rgba(0,0,0,0.4), 0 0 40px rgba(99,91,255,0.10)"
            : "0 4px 24px rgba(0,0,0,0.2)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="rounded-2xl p-6 md:p-7"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        {/* Icon + Title row */}
        <div className="flex items-center gap-3.5 mb-3.5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
            style={{
              background: hovered
                ? "rgba(99,91,255,0.15)"
                : "rgba(99,91,255,0.08)",
              border: `1px solid ${hovered ? "rgba(99,91,255,0.40)" : "rgba(99,91,255,0.15)"}`,
            }}
          >
            <Icon
              size={19}
              className="transition-all duration-300"
              style={{
                color: hovered ? "#a78bfa" : "#635BFF",
                filter: hovered
                  ? "drop-shadow(0 0 6px rgba(99,91,255,0.6))"
                  : "none",
              }}
            />
          </div>

          <h3
            className="text-base md:text-lg font-bold tracking-tight transition-colors duration-300"
            style={{
              color: hovered ? "var(--text-primary)" : "var(--text-primary)",
              letterSpacing: "-0.015em",
            }}
          >
            {card.title}
          </h3>
        </div>

        {/* Body */}
        <p
          className="text-sm leading-relaxed transition-colors duration-300"
          style={{
            color: hovered
              ? "rgba(255,255,255,0.85)"
              : "rgba(255,255,255,0.50)",
          }}
        >
          {card.body}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────
export default function WhyHuz() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="why-headline"
      style={{ background: "#0A0A0A" }}
    >
      {/* ── Slow-moving ambient orb behind right column ────────────────── */}
      <motion.div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          right: "-5%",
          top: "10%",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(99,91,255,0.10) 0%, rgba(99,91,255,0.04) 40%, transparent 70%)",
          filter: "blur(60px)",
          willChange: "transform",
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container relative z-10">
        {/* ── Badge ────────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionFade}
          className="mb-14 md:mb-20"
        >
          <span className="badge inline-flex mb-0">
            <Sparkles size={12} />
            Why HUZ
          </span>
        </motion.div>

        {/* ── 2-Column Layout ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* ─ Left: The Manifesto ─────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="lg:sticky lg:top-32"
          >
            <motion.h2
              id="why-headline"
              variants={itemFade}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.08] tracking-tight mb-8"
              style={{ letterSpacing: "-0.035em" }}
            >
              We don&apos;t do bloat.
              <br />
              We build for{" "}
              <span className="glow-text">speed</span> and{" "}
              <span className="glow-text">scale.</span>
            </motion.h2>

            <motion.p
              variants={itemFade}
              className="text-base md:text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Most agencies are slowed down by legacy tech and layers of middle
              management. We operate differently. We use cutting-edge frameworks
              and lean engineering principles to deliver bespoke web platforms
              and AI automation systems faster, cleaner, and with zero technical
              debt.
            </motion.p>

            {/* Decorative accent line */}
            <motion.div
              variants={itemFade}
              className="mt-8 h-px w-24"
              style={{
                background:
                  "linear-gradient(90deg, #635BFF 0%, transparent 100%)",
              }}
              aria-hidden="true"
            />
          </motion.div>

          {/* ─ Right: Contrast Glass-Cards ─────────────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-col gap-5"
          >
            {CARDS.map((card) => (
              <GlassCard key={card.title} card={card} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
