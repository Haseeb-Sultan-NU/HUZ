"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Sparkles, Search, Palette, Code2, Rocket } from "lucide-react";

// ─── Timeline Steps ─────────────────────────────────────────────────────────────
const STEPS = [
  {
    number: "01",
    title: "Discovery & Architecture",
    body: "We audit your operational bottlenecks, map user flows, and select the exact database schema and tech stack required. Zero guesswork before development begins.",
    Icon: Search,
  },
  {
    number: "02",
    title: "High-Fidelity Prototyping",
    body: "We design interactive, pixel-perfect UI/UX prototypes. You review and test the exact user experience and visual layout before we write a single line of code.",
    Icon: Palette,
  },
  {
    number: "03",
    title: "Full-Stack Development",
    body: "We engineer your web application and background AI pipelines in isolated, containerized environments. Built for high concurrency, zero technical debt, and maximum speed.",
    Icon: Code2,
  },
  {
    number: "04",
    title: "Deployment & Handoff",
    body: "We launch onto high-speed edge infrastructure, run complete security and performance checks, and transfer full ownership and documentation to your team.",
    Icon: Rocket,
  },
];

// ─── Animation variants ─────────────────────────────────────────────────────────
const sectionFade: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemFade: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Component ──────────────────────────────────────────────────────────────────
export default function ProcessTimeline() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="process"
      className="section"
      aria-labelledby="process-headline"
      style={{ background: "#0A0A0A" }}
    >
      <div className="container">
        {/* ── Header ────────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionFade}
          className="text-center mb-16 md:mb-20"
        >
          <span className="badge inline-flex mb-6">
            <Sparkles size={12} />
            EXECUTION PROTOCOL
          </span>

          <h2
            id="process-headline"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            How We{" "}
            <span className="glow-text">Execute.</span>
          </h2>

          <p
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            No fluff, no endless meetings. Just a disciplined, 4-step engineering lifecycle built to ship fast.
          </p>
        </motion.div>

        {/* ── Timeline ──────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="relative max-w-3xl mx-auto"
        >
          {/* Vertical glow line (desktop only) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-8 top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(99,91,255,0.30) 10%, rgba(99,91,255,0.30) 90%, transparent)",
            }}
          />

          {STEPS.map((step, idx) => {
            const isHovered = hoveredIdx === idx;
            const Icon = step.Icon;

            return (
              <motion.div
                key={step.number}
                variants={itemFade}
                className="relative pl-0 md:pl-20 mb-8 last:mb-0"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* ── Dot on the line (desktop) ─────────────────────────── */}
                <div
                  aria-hidden="true"
                  className="hidden md:flex absolute left-[22px] top-8 w-[13px] h-[13px] rounded-full items-center justify-center transition-all duration-300"
                  style={{
                    background: isHovered ? "#635BFF" : "#1A1A1A",
                    border: `2px solid ${isHovered ? "#635BFF" : "rgba(99,91,255,0.40)"}`,
                    boxShadow: isHovered
                      ? "0 0 12px rgba(99,91,255,0.6), 0 0 24px rgba(99,91,255,0.25)"
                      : "none",
                  }}
                />

                {/* Bright line segment on hover */}
                {isHovered && (
                  <motion.div
                    layoutId="active-line"
                    aria-hidden="true"
                    className="hidden md:block absolute left-8 w-px"
                    style={{
                      top: 0,
                      bottom: 0,
                      background:
                        "linear-gradient(to bottom, rgba(99,91,255,0.8), rgba(99,91,255,0.8))",
                      boxShadow: "0 0 8px rgba(99,91,255,0.5)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  />
                )}

                {/* ── Card ──────────────────────────────────────────────── */}
                <motion.div
                  animate={{
                    y: isHovered ? -4 : 0,
                    boxShadow: isHovered
                      ? "0 20px 48px rgba(0,0,0,0.5), 0 0 40px rgba(99,91,255,0.12)"
                      : "0 4px 24px rgba(0,0,0,0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="rounded-2xl p-6 md:p-8 cursor-default transition-colors duration-300"
                  style={{
                    background: isHovered
                      ? "linear-gradient(135deg, #1A1A1A 0%, #1e1e28 100%)"
                      : "#1A1A1A",
                    border: `1px solid ${isHovered ? "rgba(99,91,255,0.35)" : "rgba(255,255,255,0.07)"}`,
                  }}
                >
                  {/* Top row: icon + step number */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{
                        background: isHovered
                          ? "rgba(99,91,255,0.15)"
                          : "rgba(99,91,255,0.08)",
                        border: `1px solid ${isHovered ? "rgba(99,91,255,0.4)" : "rgba(99,91,255,0.15)"}`,
                      }}
                    >
                      <Icon
                        size={20}
                        className="transition-all duration-300"
                        style={{
                          color: isHovered ? "#a78bfa" : "#635BFF",
                          filter: isHovered
                            ? "drop-shadow(0 0 6px rgba(99,91,255,0.6))"
                            : "none",
                        }}
                      />
                    </div>

                    <span
                      className="text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-300"
                      style={{
                        color: isHovered ? "#635BFF" : "var(--text-muted)",
                      }}
                    >
                      Step {step.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg md:text-xl font-bold tracking-tight mb-2 transition-colors duration-300"
                    style={{
                      color: isHovered
                        ? "var(--text-primary)"
                        : "var(--text-primary)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {step.title}
                  </h3>

                  {/* Body */}
                  <p
                    className="text-sm leading-relaxed transition-colors duration-300"
                    style={{
                      color: isHovered
                        ? "var(--text-secondary)"
                        : "var(--text-muted)",
                    }}
                  >
                    {step.body}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
