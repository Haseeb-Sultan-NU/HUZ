"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Zap,
  Sparkles,
  Mail,
  CreditCard,
  Database,
  Users,
  Workflow,
  XCircle,
  CheckCircle2,
  ChevronLeft,
  RefreshCw,
  Cpu,
  ArrowRightLeft,
  Layers,
} from "lucide-react";
import ContactDrawer from "@/components/ContactDrawer";

// ─── Animated Background ────────────────────────────────────────────────────────
function PageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none"
      style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}
    >
      <div className="noise-overlay" />
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -35, 25, 0],
          scale: [1, 1.08, 0.95, 1],
          opacity: [0.45, 0.75, 0.4, 0.45],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: "15%",
          top: "-5%",
          width: 550,
          height: 550,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,91,255,0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <motion.div
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 35, -20, 0],
          opacity: [0.35, 0.65, 0.3, 0.35],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: -10 }}
        style={{
          position: "absolute",
          right: "10%",
          bottom: "10%",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(167,139,250,0.13) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(99,91,255,0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 75% 55% at 50% 35%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 55% at 50% 35%, black 20%, transparent 100%)",
          opacity: 0.35,
        }}
      />
    </div>
  );
}

// ─── Magnetic Button ────────────────────────────────────────────────────────────
function MagneticButton({
  children,
  className = "",
  onClick,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 350, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 350, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  };

  return (
    <motion.button
      ref={ref}
      id={id}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={`btn-primary ${className}`}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

// ─── Node Network Hero Graphic (GPU-Accelerated & Collision-Free) ───────────────
interface NodeItem {
  icon: React.ReactNode;
  label: string;
  x: number; // percentage relative to SVG container width
  y: number; // percentage relative to SVG container height
  delay: number; // css animation delay in seconds
}

const NODES: NodeItem[] = [
  { icon: <Mail size={18} />, label: "Email & CRM", x: 16, y: 20, delay: 0 },
  { icon: <CreditCard size={18} />, label: "Payments", x: 84, y: 20, delay: 1.5 },
  { icon: <Database size={18} />, label: "Databases", x: 16, y: 76, delay: 3 },
  { icon: <Users size={18} />, label: "Team Tools", x: 84, y: 76, delay: 4.5 },
];

function NodeNetworkBackground() {
  return (
    <div
      className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* SVG Connecting Lines pointing toward vertically stacked center hub at top (50%, 20%) */}
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0 }}
      >
        {NODES.map((node, i) => (
          <line
            key={i}
            x1={`${node.x}%`}
            y1={`${node.y}%`}
            x2="50%"
            y2="20%"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        ))}
      </svg>

      {/* Floating Nodes (Hardware Accelerated CSS Animation) */}
      {NODES.map((node, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${node.x}%`,
            top: `${node.y}%`,
            animationDelay: `${node.delay}s`,
            zIndex: 10,
          }}
          className="hidden md:flex flex-col items-center gap-2 animate-float-slow transform-gpu will-change-transform"
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(18,18,24,0.9)",
              border: "1px solid rgba(99,91,255,0.35)",
              boxShadow:
                "0 0 20px rgba(99,91,255,0.22), 0 8px 24px rgba(0,0,0,0.6)",
              color: "#a78bfa",
            }}
          >
            {node.icon}
          </div>
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(10,10,12,0.85)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "var(--text-secondary)",
            }}
          >
            {node.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Subpage Nav ────────────────────────────────────────────────────────────────
function SubpageNav({ onLaunchProject }: { onLaunchProject: () => void }) {
  return (
    <motion.nav
      aria-label="Subpage navigation"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 24px" }}>
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 20px",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.10)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            backgroundColor: "rgba(10,10,10,0.85)",
            boxShadow:
              "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,91,255,0.08)",
          }}
        >
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Back</span>
            </a>
            <div
              style={{ width: 1, height: 20, background: "rgba(255,255,255,0.10)" }}
              aria-hidden="true"
            />
            <a href="/" className="flex items-center gap-2">
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 9,
                  background: "linear-gradient(135deg, #635BFF 0%, #a78bfa 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 14px rgba(99,91,255,0.4)",
                }}
                aria-hidden="true"
              >
                <Zap size={13} color="#fff" fill="#fff" />
              </div>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "1.05rem",
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                }}
              >
                HUZ<span style={{ color: "var(--accent)" }}>.</span>
              </span>
            </a>
          </div>
          <div className="hidden sm:block">
            <MagneticButton
              id="integration-nav-cta"
              onClick={onLaunchProject}
              className="text-sm !py-2.5 !px-5"
            >
              Launch Project
              <ArrowRight size={14} />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

// ─── Use-Case Horizontal Block ──────────────────────────────────────────────────
interface UseCaseBlockProps {
  icon: React.ReactNode;
  badge: string;
  title: string;
  description: string;
  accent: string;
  index: number;
}

function UseCaseBlock({
  icon,
  badge,
  title,
  description,
  accent,
  index,
}: UseCaseBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!blockRef.current) return;
    const rect = blockRef.current.getBoundingClientRect();
    blockRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    blockRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={blockRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative rounded-3xl border border-white/8 bg-[#121212] p-8 md:p-10 overflow-hidden transition-all duration-300 hover:border-[#635BFF]/40 hover:shadow-[0_12px_40px_-12px_rgba(99,91,255,0.35)] flex flex-col md:flex-row md:items-center justify-between gap-6"
    >
      {/* Spotlight hover effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(450px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(99, 91, 255, 0.12), transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* Left icon and title */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6 max-w-xl">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `${accent}16`,
            border: `1px solid ${accent}40`,
          }}
        >
          {icon}
        </div>
        <div className="flex flex-col gap-2">
          <div
            className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wider uppercase w-fit"
            style={{
              background: `${accent}14`,
              border: `1px solid ${accent}30`,
              color: accent,
            }}
          >
            {badge}
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {title}
          </h3>
        </div>
      </div>

      {/* Right description */}
      <div className="relative z-10 md:max-w-md">
        <p className="text-sm md:text-base leading-relaxed text-white/70">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────────
export default function SoftwareIntegrationPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
    document.body.classList.add("drawer-open");
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    document.body.classList.remove("drawer-open");
  };

  return (
    <>
      <PageBackground />
      <SubpageNav onLaunchProject={openDrawer} />

      <main>
        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* HERO — "Node Network" Hero Section                                 */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        <section
          className="relative z-10 pt-44 pb-28 md:pt-52 md:pb-36 overflow-hidden"
          aria-labelledby="integration-hero-headline"
        >
          <NodeNetworkBackground />

          <div className="container relative z-20 mx-auto max-w-4xl px-6 flex flex-col items-center text-center">
            {/* Center Hub Node — vertically stacked in normal flow above the badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center mb-6 transform-gpu"
            >
              <div
                style={{
                  position: "absolute",
                  width: 130,
                  height: 130,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(99,91,255,0.25) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
                className="animate-pulse-glow transform-gpu will-change-[opacity]"
              />
              <div
                className="w-16 h-16 rounded-3xl flex items-center justify-center relative z-10"
                style={{
                  background: "linear-gradient(135deg, #635BFF 0%, #a78bfa 100%)",
                  boxShadow:
                    "0 0 32px rgba(99,91,255,0.45), 0 12px 32px rgba(0,0,0,0.5)",
                }}
              >
                <Workflow size={30} color="#fff" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex justify-center mb-6"
            >
              <span className="badge">
                <Workflow size={12} />
                Software Integration
              </span>
            </motion.div>

            <motion.h1
              id="integration-hero-headline"
              initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight"
              style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}
            >
              Make Your Software <span className="glow-text">Talk.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="relative z-10 max-w-2xl mx-auto mt-6 px-6 py-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            >
              <p
                className="text-base md:text-lg lg:text-xl leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                We connect all your favorite apps and tools so they share data
                automatically. Stop copying and pasting, and let your systems do
                the work.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 relative z-10"
            >
              <MagneticButton id="integration-hero-cta" onClick={openDrawer}>
                Connect Your Tools
                <ArrowRight size={18} />
              </MagneticButton>
              <a href="/#services" className="btn-secondary text-sm">
                View All Services
              </a>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* THE OLD WAY VS. THE HUZ WAY — Side-by-Side Comparison               */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        <section className="relative z-10 py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <span className="badge inline-flex mb-4">
                <ArrowRightLeft size={12} />
                Why It Matters
              </span>
              <h2
                className="text-3xl md:text-5xl font-bold tracking-tight text-white"
                style={{ letterSpacing: "-0.025em" }}
              >
                The Old Way vs. <span className="glow-text">The HUZ Way.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: The Old Way */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl border p-8 md:p-12 flex flex-col justify-between"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(16,16,18,0.7) 0%, rgba(12,12,14,0.5) 100%)",
                  borderColor: "rgba(255,255,255,0.06)",
                  opacity: 0.85,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "var(--text-muted)",
                      }}
                    >
                      WITHOUT INTEGRATION
                    </span>
                    <div className="flex items-center gap-2 opacity-50">
                      <XCircle size={22} className="text-red-400" />
                    </div>
                  </div>

                  <h3
                    className="text-2xl md:text-3xl font-bold mb-6 tracking-tight"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    The Old Way
                  </h3>

                  <ul className="flex flex-col gap-5">
                    {[
                      "Manual data entry between spreadsheets",
                      "Lost leads because CRMs don't sync with emails",
                      "Hours wasted doing robot work",
                    ].map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <XCircle
                          size={18}
                          className="shrink-0 mt-0.5 text-red-400/70"
                        />
                        <span
                          className="text-sm md:text-base leading-relaxed"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disjointed Static Visual */}
                <div
                  className="mt-10 p-6 rounded-2xl border border-white/5 flex items-center justify-around"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                    <Mail size={18} />
                  </div>
                  <div className="w-8 h-[1px] bg-red-500/40 border-b border-dashed border-red-500" />
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                    <Database size={18} />
                  </div>
                  <div className="w-8 h-[1px] bg-red-500/40 border-b border-dashed border-red-500" />
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                    <CreditCard size={18} />
                  </div>
                </div>
              </motion.div>

              {/* Right Column: The HUZ Way */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="rounded-3xl border p-8 md:p-12 flex flex-col justify-between relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(18,18,24,0.95) 0%, rgba(16,14,30,0.85) 100%)",
                  borderColor: "rgba(99,91,255,0.4)",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(99,91,255,0.12)",
                }}
              >
                {/* Accent glow top */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #635BFF, #a78bfa, transparent)",
                  }}
                  aria-hidden="true"
                />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(99,91,255,0.15)",
                        border: "1px solid rgba(99,91,255,0.35)",
                        color: "#a78bfa",
                      }}
                    >
                      WITH AUTOMATED SYNC
                    </span>
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 size={22} className="text-[#818cf8]" />
                    </motion.div>
                  </div>

                  <h3
                    className="text-2xl md:text-3xl font-bold mb-6 tracking-tight text-white"
                  >
                    The HUZ Way
                  </h3>

                  <ul className="flex flex-col gap-5">
                    {[
                      "Instant data transfer across all platforms",
                      "A single source of truth for your business",
                      "Zero manual data entry",
                    ].map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2
                          size={18}
                          className="shrink-0 mt-0.5 text-[#818cf8]"
                        />
                        <span className="text-sm md:text-base leading-relaxed text-white/90">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Glowing Synced Visual */}
                <div
                  className="mt-10 p-6 rounded-2xl border border-[#635BFF]/30 flex items-center justify-around relative overflow-hidden"
                  style={{ background: "rgba(99,91,255,0.06)" }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-10 h-10 rounded-xl bg-[#635BFF]/20 border border-[#635BFF]/40 flex items-center justify-center text-[#a78bfa]"
                  >
                    <Mail size={18} />
                  </motion.div>

                  <div className="flex-1 mx-2 flex items-center justify-center relative">
                    <div className="w-full h-[2px] bg-gradient-to-r from-[#635BFF] to-[#a78bfa]" />
                    <motion.div
                      animate={{ x: [-20, 20] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                      className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#fff]"
                    />
                  </div>

                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    className="w-10 h-10 rounded-xl bg-[#635BFF]/20 border border-[#635BFF]/40 flex items-center justify-center text-[#a78bfa]"
                  >
                    <Database size={18} />
                  </motion.div>

                  <div className="flex-1 mx-2 flex items-center justify-center relative">
                    <div className="w-full h-[2px] bg-gradient-to-r from-[#a78bfa] to-[#818cf8]" />
                    <motion.div
                      animate={{ x: [-20, 20] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 0.3,
                      }}
                      className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#fff]"
                    />
                  </div>

                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.0 }}
                    className="w-10 h-10 rounded-xl bg-[#635BFF]/20 border border-[#635BFF]/40 flex items-center justify-center text-[#a78bfa]"
                  >
                    <CreditCard size={18} />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* THE ECOSYSTEM — Three Stacked Use-Case Blocks                      */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        <section
          className="relative z-10 py-20 md:py-28"
          aria-labelledby="ecosystem-headline"
        >
          <div className="container mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4 mb-16 text-center items-center"
            >
              <span className="badge w-fit">
                <Layers size={12} />
                The Ecosystem
              </span>
              <h2
                id="ecosystem-headline"
                className="text-3xl md:text-5xl font-bold tracking-tight text-white"
                style={{ letterSpacing: "-0.025em" }}
              >
                Connect everything you{" "}
                <span className="glow-text">already use.</span>
              </h2>
              <p
                className="text-base md:text-lg max-w-2xl"
                style={{ color: "var(--text-secondary)" }}
              >
                No matter what tools power your business, we make sure they work
                together in complete harmony.
              </p>
            </motion.div>

            {/* Stacked Blocks */}
            <div className="flex flex-col gap-6">
              <UseCaseBlock
                icon={<RefreshCw size={28} className="text-[#a78bfa]" />}
                badge="CRM & SALES"
                title="Sales & CRM Sync"
                description="When a customer buys on your website, their info instantly goes into your CRM and triggers a welcome email. No human required."
                accent="#a78bfa"
                index={0}
              />
              <UseCaseBlock
                icon={<CreditCard size={28} className="text-[#635BFF]" />}
                badge="FINANCE"
                title="Payment & Accounting"
                description="Connect Stripe, PayPal, or your payment gateway directly to your accounting software so every invoice is tracked automatically."
                accent="#635BFF"
                index={1}
              />
              <UseCaseBlock
                icon={<Cpu size={28} className="text-[#818cf8]" />}
                badge="CUSTOM BRIDGES"
                title="Custom API Connections"
                description="Using a niche software for your industry? We can build custom bridges to connect it to the rest of your tools."
                accent="#818cf8"
                index={2}
              />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* CTA SECTION                                                        */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        <section
          className="relative z-10 py-20 md:py-28"
          aria-labelledby="integration-cta-headline"
        >
          <div className="container mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bento-card p-12 md:p-16 text-center flex flex-col items-center gap-8"
              style={{
                background:
                  "linear-gradient(135deg, #1A1A1A 0%, #131320 50%, #1A1A1A 100%)",
                borderColor: "rgba(99, 91, 255, 0.25)",
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center top, rgba(99,91,255,0.12) 0%, transparent 60%)",
                }}
                aria-hidden="true"
              />

              <span className="badge relative z-10">
                <Sparkles size={12} />
                Let&apos;s Connect
              </span>

              <h2
                id="integration-cta-headline"
                className="text-3xl md:text-5xl font-bold tracking-tight relative z-10"
                style={{ letterSpacing: "-0.025em" }}
              >
                Ready to connect
                <br />
                <span className="glow-text">your business?</span>
              </h2>

              <p
                className="text-base max-w-lg relative z-10"
                style={{ color: "var(--text-secondary)" }}
              >
                Tell us which apps you use every day. We&apos;ll build the custom
                connections that automate your workflow from end to end.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                <MagneticButton id="integration-cta-primary" onClick={openDrawer}>
                  <Workflow size={18} />
                  Start the Conversation
                </MagneticButton>
                <span
                  className="text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  Free consultation · No commitment
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer
        className="relative z-10"
        role="contentinfo"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="container mx-auto max-w-6xl px-6">
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ paddingTop: 24, paddingBottom: 24 }}
          >
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center gap-2">
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 7,
                    background:
                      "linear-gradient(135deg, #635BFF 0%, #a78bfa 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-hidden="true"
                >
                  <Zap size={11} color="#fff" fill="#fff" />
                </div>
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    letterSpacing: "-0.03em",
                    color: "var(--text-primary)",
                  }}
                >
                  HUZ<span style={{ color: "var(--accent)" }}>.</span>
                </span>
              </a>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                &copy; {new Date().getFullYear()} All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-5">
              <a
                href="/"
                className="text-xs transition-colors duration-200 flex items-center gap-1"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
              >
                <ArrowUpRight size={12} />
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Contact Drawer ───────────────────────────────────────────────── */}
      <ContactDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
}
