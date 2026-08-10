"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

// ─── Case Study Data ────────────────────────────────────────────────────────────
const CASE_STUDIES = [
  {
    tags: ["Full-Stack Systems", "Healthcare Infrastructure"],
    headline: "Enterprise Pharmacy Operating System",
    body: "Engineered a complete, production-ready management platform for a medical facility. We digitized their entire operational workflow, building secure, automated pipelines for complex inventory tracking, vendor management, and dynamic billing.",
    stat: "100%",
    statLabel: "End-to-End Operational Digitization",
    gradient: "linear-gradient(135deg, #0d1117 0%, #111827 40%, #0f0a1f 100%)",
    accentOrb: "radial-gradient(ellipse 60% 60% at 30% 70%, rgba(99,91,255,0.25) 0%, transparent 70%)",
  },
  {
    tags: ["AI Automation", "NLP"],
    headline: "Autonomous Support Routing Pipeline",
    body: "Built an intelligent AI agent that reads, understands, and categorizes incoming customer support tickets in real-time. The system instantly routes urgent issues and drafts preliminary responses, drastically reducing manual triage time.",
    stat: "Instant",
    statLabel: "Ticket Triage",
    gradient: "linear-gradient(135deg, #1a1030 0%, #0d1b2a 40%, #1b0a2e 100%)",
    accentOrb: "radial-gradient(ellipse 50% 50% at 70% 30%, rgba(167,139,250,0.20) 0%, transparent 70%)",
  },
  {
    tags: ["Machine Learning", "Data Engineering"],
    headline: "AI-Powered Credibility Engine",
    body: "Developed an advanced machine learning pipeline designed to classify and combat digital misinformation at scale. By analyzing linguistic patterns across thousands of articles, the engine accurately clusters and flags unreliable data sources before they spread.",
    stat: "Auto",
    statLabel: "Automated Credibility Verification",
    gradient: "linear-gradient(135deg, #0a1628 0%, #0d1117 40%, #0a0f1a 100%)",
    accentOrb: "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(99,91,255,0.18) 0%, transparent 70%)",
  },
];

// ─── Animation Variants ─────────────────────────────────────────────────────────
const sectionFade: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const cardFade: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Visual 1: Pharmacy Dashboard Skeleton ──────────────────────────────────────
// A sleek, glowing mini-dashboard with sidebar, header, stat cards, and an
// animated inventory bar chart — all floating with a subtle translateY.
function PharmacyDashboardVisual() {
  const barHeights = [0.55, 0.85, 0.4, 0.95, 0.65];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
      {/* Subtle dot grid backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(99,91,255,0.08) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Floating dashboard shell */}
      <motion.div
        className="relative w-[85%] max-w-[340px] h-[75%] rounded-xl border border-white/10 overflow-hidden"
        style={{
          background: "rgba(10,10,10,0.7)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(99,91,255,0.08)",
        }}
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* ── Sidebar ── */}
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-white/[0.03] border-r border-white/[0.06] flex flex-col items-center pt-4 gap-3">
          {/* Sidebar icon placeholders */}
          <div className="w-5 h-5 rounded-md bg-[#635BFF]/20 border border-[#635BFF]/30" />
          <div className="w-5 h-5 rounded-md bg-white/5 border border-white/[0.06]" />
          <div className="w-5 h-5 rounded-md bg-white/5 border border-white/[0.06]" />
          <div className="w-5 h-5 rounded-md bg-white/5 border border-white/[0.06]" />
          {/* Active indicator */}
          <div className="absolute left-0 top-[14px] w-[2px] h-5 rounded-r-full bg-[#635BFF] shadow-[0_0_8px_#635BFF]" />
        </div>

        {/* ── Main content area ── */}
        <div className="ml-10 h-full flex flex-col">
          {/* Header bar */}
          <div className="h-8 border-b border-white/[0.06] flex items-center justify-between px-3">
            <div className="flex items-center gap-1.5">
              <div className="w-14 h-2 rounded-full bg-white/10" />
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-white/5 border border-white/[0.08]" />
              <div className="w-4 h-4 rounded-full bg-[#635BFF]/15 border border-[#635BFF]/20" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-3 flex flex-col gap-2.5 overflow-hidden">
            {/* 3 Stat cards row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { color: "bg-[#635BFF]/15 border-[#635BFF]/25", barW: "w-8" },
                { color: "bg-emerald-500/10 border-emerald-500/20", barW: "w-6" },
                { color: "bg-amber-500/10 border-amber-500/20", barW: "w-10" },
              ].map((card, i) => (
                <div
                  key={i}
                  className={`rounded-lg ${card.color} border p-2 flex flex-col gap-1`}
                >
                  <div className="h-1.5 rounded-full bg-white/10 w-8" />
                  <div className={`h-2.5 rounded-full bg-white/20 ${card.barW}`} />
                </div>
              ))}
            </div>

            {/* Chart card (inventory levels) */}
            <div className="flex-1 rounded-lg bg-white/[0.03] border border-white/[0.06] p-3 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="h-1.5 rounded-full bg-white/10 w-16" />
                <div className="h-1.5 rounded-full bg-white/[0.06] w-8" />
              </div>
              {/* Animated bar chart */}
              <div className="flex-1 flex items-end justify-around gap-1 pt-1">
                {barHeights.map((peak, i) => (
                  <motion.div
                    key={i}
                    className="w-full rounded-t-sm"
                    style={{
                      background: `linear-gradient(to top, rgba(99,91,255,${0.3 + i * 0.1}), rgba(99,91,255,${0.6 + i * 0.05}))`,
                      boxShadow: "0 0 8px rgba(99,91,255,0.15)",
                    }}
                    animate={{ height: [`${peak * 40}%`, `${peak * 100}%`, `${peak * 40}%`] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
              {/* X-axis line */}
              <div className="h-[1px] bg-white/[0.06] mt-1.5" />
            </div>
          </div>
        </div>

        {/* Edge glow */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
        />
      </motion.div>
    </div>
  );
}

// ─── Visual 2: AI Support Terminal ──────────────────────────────────────────────
// Glassmorphic terminal window with macOS traffic lights, a user message bubble,
// an AI processing indicator, and a color-coded routing tag that pops in.
function SupportTerminalVisual() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
      {/* Subtle radial glow behind terminal */}
      <div
        className="absolute"
        style={{
          width: "60%",
          height: "60%",
          left: "20%",
          top: "20%",
          background: "radial-gradient(circle, rgba(99,91,255,0.12) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Terminal window */}
      <motion.div
        className="relative w-[82%] max-w-[320px] rounded-xl overflow-hidden"
        style={{
          background: "rgba(10,10,10,0.80)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 32px rgba(99,91,255,0.06)",
        }}
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* ── Title bar with traffic lights ── */}
        <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-white/[0.06]">
          <div className="w-[9px] h-[9px] rounded-full bg-[#ff5f57]" />
          <div className="w-[9px] h-[9px] rounded-full bg-[#febc2e]" />
          <div className="w-[9px] h-[9px] rounded-full bg-[#28c840]" />
          <span className="ml-3 text-[9px] font-medium text-white/30 tracking-wide uppercase">
            support-agent.ai
          </span>
        </div>

        {/* ── Terminal body ── */}
        <div className="p-4 flex flex-col gap-3 min-h-[140px]">
          {/* User message bubble */}
          <motion.div
            className="self-end max-w-[80%] rounded-xl rounded-br-sm px-3 py-2"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[10px] text-white/60 leading-relaxed">
              Login page is broken and users cannot access their accounts.
            </p>
          </motion.div>

          {/* AI Processing badge — slides in */}
          <motion.div
            className="flex items-center gap-1.5 self-start"
            animate={{
              opacity: [0, 0, 1, 1, 1, 1, 0],
              x: [-12, -12, 0, 0, 0, 0, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.1, 0.18, 0.35, 0.45, 0.85, 1],
            }}
          >
            {/* Pulsing dot */}
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#635BFF]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-[9px] font-mono text-[#635BFF]/70 tracking-wide">
              Analyzing...
            </span>
          </motion.div>

          {/* AI Response — routing tag pops in */}
          <motion.div
            className="self-start max-w-[90%] rounded-xl rounded-bl-sm px-3 py-2"
            style={{
              background: "rgba(99,91,255,0.06)",
              border: "1px solid rgba(99,91,255,0.15)",
            }}
            animate={{
              opacity: [0, 0, 0, 1, 1, 1, 0],
              y: [8, 8, 8, 0, 0, 0, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.25, 0.35, 0.42, 0.85, 0.92, 1],
            }}
          >
            <p className="text-[10px] text-white/50 leading-relaxed mb-2">
              Critical authentication failure detected.
            </p>
            {/* Routing tag */}
            <motion.div
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider"
              style={{
                background: "rgba(99,91,255,0.15)",
                border: "1px solid rgba(99,91,255,0.35)",
                color: "#a78bfa",
                boxShadow: "0 0 12px rgba(99,91,255,0.2)",
              }}
              animate={{
                scale: [0, 0, 0, 1.15, 1, 1, 1],
                opacity: [0, 0, 0, 1, 1, 1, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.3, 0.4, 0.47, 0.52, 0.88, 1],
              }}
            >
              <div className="w-1 h-1 rounded-full bg-[#635BFF] shadow-[0_0_4px_#635BFF]" />
              Urgent — Routing to Engineering
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Visual 3: ML Credibility Data Grid ─────────────────────────────────────────
// Two overlapping glassmorphic cards with a scanner line sweeping over text lines,
// then a "99% CREDIBLE" badge stamps on with a spring bounce.
function CredibilityGridVisual() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <div className="relative w-[80%] max-w-[300px] h-[70%]">
        {/* ── Back card (slowly pulses) ── */}
        <motion.div
          className="absolute rounded-xl border border-white/[0.06] overflow-hidden"
          style={{
            width: "88%",
            height: "82%",
            top: "4%",
            left: "12%",
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(8px)",
          }}
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.98, 1.01, 0.98] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Skeleton text lines */}
          <div className="p-4 flex flex-col gap-2 pt-6">
            <div className="h-1.5 rounded-full bg-white/[0.06] w-[80%]" />
            <div className="h-1.5 rounded-full bg-white/[0.04] w-[60%]" />
            <div className="h-1.5 rounded-full bg-white/[0.06] w-[90%]" />
            <div className="h-1.5 rounded-full bg-white/[0.04] w-[45%]" />
            <div className="h-1.5 rounded-full bg-white/[0.06] w-[70%]" />
          </div>
        </motion.div>

        {/* ── Front card (with scanner & badge) ── */}
        <motion.div
          className="absolute rounded-xl border border-white/[0.08] overflow-hidden"
          style={{
            width: "88%",
            height: "82%",
            top: "14%",
            left: "0%",
            background: "rgba(10,10,10,0.75)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 24px rgba(99,91,255,0.06)",
          }}
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Card header */}
          <div className="px-4 pt-3 pb-2 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#635BFF]/20 border border-[#635BFF]/30" />
              <div className="h-1.5 rounded-full bg-white/15 w-16" />
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.06] w-8" />
          </div>

          {/* Text lines area — relative container for scanner */}
          <div className="relative p-4 flex flex-col gap-2.5">
            {/* Mock text lines */}
            {[85, 60, 92, 48, 75, 55, 88].map((w, i) => (
              <div
                key={i}
                className="h-[5px] rounded-full"
                style={{
                  width: `${w}%`,
                  background: i % 2 === 0 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)",
                }}
              />
            ))}

            {/* Scanner line — sweeps top to bottom */}
            <motion.div
              className="absolute left-0 right-0 h-[2px]"
              style={{
                background: "linear-gradient(90deg, transparent 0%, #635BFF 30%, #635BFF 70%, transparent 100%)",
                boxShadow: "0 0 12px rgba(99,91,255,0.6), 0 0 24px rgba(99,91,255,0.3)",
              }}
              animate={{
                top: ["0%", "100%", "100%"],
                opacity: [0.9, 0.9, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.55, 0.6],
              }}
            />
          </div>

          {/* ── VERIFIED badge — stamps on with spring bounce ── */}
          <motion.div
            className="absolute bottom-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
            style={{
              background: "rgba(34,197,94,0.10)",
              border: "1px solid rgba(34,197,94,0.30)",
              boxShadow: "0 0 16px rgba(34,197,94,0.15)",
            }}
            animate={{
              scale: [0, 0, 0, 1.2, 0.95, 1, 1, 1, 0],
              opacity: [0, 0, 0, 1, 1, 1, 1, 1, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 0.58, 0.64, 0.68, 0.72, 0.88, 0.93, 1],
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
              99% Credible
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Geometric Pattern ──────────────────────────────────────────────────────────
function GeometricPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.35 }}
      aria-hidden="true"
    >
      <defs>
        <pattern id="feat-grid-fine" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(99,91,255,0.06)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#feat-grid-fine)" />
    </svg>
  );
}

// ─── Single Case Study Card ─────────────────────────────────────────────────────
function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof CASE_STUDIES)[number];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isLarge = index === 0;

  return (
    <motion.article
      variants={cardFade}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-2xl overflow-hidden cursor-default transition-[border-color] duration-300 ${
        isLarge ? "md:col-span-2 md:row-span-2" : ""
      }`}
      style={{
        background: "#1A1A1A",
        border: `1px solid ${isHovered ? "rgba(99,91,255,0.35)" : "rgba(255,255,255,0.07)"}`,
      }}
    >
      {/* ── Image / Visual Placeholder (60%) ──────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ height: isLarge ? "320px" : "220px" }}
      >
        {/* Base gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: study.gradient }}
        />

        {/* Geometric pattern */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <GeometricPattern />
        </motion.div>

        {/* Abstract Visuals */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {index === 0 && <PharmacyDashboardVisual />}
          {index === 1 && <SupportTerminalVisual />}
          {index === 2 && <CredibilityGridVisual />}
        </motion.div>

        {/* Accent orb */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: isHovered ? 1.05 : 1,
            opacity: isHovered ? 1.3 : 1,
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: study.accentOrb }}
        />

        {/* Bottom gradient fade into card */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{ background: "linear-gradient(to top, #1A1A1A, transparent)" }}
          aria-hidden="true"
        />

        {/* Stat badge (top-left) */}
        <div className="absolute top-5 left-5 z-10">
          <div
            className="px-3.5 py-2 rounded-xl backdrop-blur-md"
            style={{
              background: "rgba(10,10,10,0.65)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span
              className="block text-xl font-bold tracking-tight"
              style={{ color: "#635BFF", lineHeight: 1.1 }}
            >
              {study.stat}
            </span>
            <span
              className="block text-[0.65rem] font-medium uppercase tracking-[0.08em] mt-0.5"
              style={{ color: "rgba(255,255,255,0.50)" }}
            >
              {study.statLabel}
            </span>
          </div>
        </div>
      </div>

      {/* ── Text Content (40%) ─────────────────────────────────────────── */}
      <div className="p-6 md:p-7">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-[0.65rem] font-medium uppercase tracking-[0.06em]"
              style={{
                background: "rgba(99,91,255,0.08)",
                border: "1px solid rgba(99,91,255,0.20)",
                color: "#a78bfa",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Headline */}
        <h3
          className="text-lg md:text-xl font-bold tracking-tight mb-2.5"
          style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
        >
          {study.headline}
        </h3>

        {/* Body */}
        <p
          className="text-sm leading-relaxed mb-5"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          {study.body}
        </p>

        {/* View Deployment link */}
        <div
          className="flex items-center gap-2 transition-all duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateX(0)" : "translateX(-8px)",
          }}
        >
          <span className="text-sm font-semibold" style={{ color: "#635BFF" }}>
            View Deployment
          </span>
          <ArrowRight size={14} style={{ color: "#635BFF" }} />
        </div>
      </div>

      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          boxShadow:
            "inset 0 0 60px rgba(99,91,255,0.04), 0 20px 48px rgba(0,0,0,0.3), 0 0 40px rgba(99,91,255,0.08)",
        }}
        aria-hidden="true"
      />
    </motion.article>
  );
}

// ─── Main Section Component ─────────────────────────────────────────────────────
export default function FeaturedWork() {
  return (
    <section
      id="work"
      className="section"
      aria-labelledby="work-headline"
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
            Case Studies
          </span>

          <h2
            id="work-headline"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            Work That Speaks{" "}
            <span className="glow-text">For Itself.</span>
          </h2>

          <p
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            A selection of our latest deployments across web engineering and AI
            automation.
          </p>
        </motion.div>

        {/* ── Staggered Grid ────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
        >
          {CASE_STUDIES.map((study, idx) => (
            <CaseStudyCard key={study.headline} study={study} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
