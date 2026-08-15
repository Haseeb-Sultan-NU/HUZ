"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Zap,
  Sparkles,
  Bot,
  BrainCircuit,
  Workflow,
  Mail,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ContactDrawer from "@/components/ContactDrawer";

// ─── Animated Background (lighter version for subpage) ──────────────────────────
function PageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none"
      style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}
    >
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Slow-moving radial glow orbs */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.08, 0.96, 1],
          opacity: [0.6, 0.9, 0.5, 0.6],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: "15%",
          top: "-10%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 40% 40%, rgba(167,139,250,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -20, 0],
          scale: [1, 1.1, 0.93, 1],
          opacity: [0.5, 0.8, 0.4, 0.5],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -8,
        }}
        style={{
          position: "absolute",
          right: "5%",
          top: "40%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 60% 50%, rgba(99,91,255,0.14) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Faint dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(99,91,255,0.10) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 100%)",
          opacity: 0.4,
        }}
      />
    </div>
  );
}

// ─── Magnetic Button (reusable) ─────────────────────────────────────────────────
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
  const springConfig = { stiffness: 350, damping: 20, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.35);
    y.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      id={id}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`btn-primary ${className}`}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

// ─── Offering Card ──────────────────────────────────────────────────────────────
interface OfferingCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;
  index: number;
}

function OfferingCard({
  icon,
  title,
  description,
  accent,
  index,
}: OfferingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${mx}px`);
    cardRef.current.style.setProperty("--mouse-y", `${my}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: 0.15 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative rounded-3xl border border-white/10 bg-[#121212] p-8 md:p-10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-[#635BFF]/40 hover:shadow-[0_12px_40px_-12px_rgba(99,91,255,0.35)] flex flex-col"
    >
      {/* Spotlight hover effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(99, 91, 255, 0.12), transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div className="relative z-10 mb-8">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `${accent}18`,
            border: `1px solid ${accent}40`,
          }}
        >
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4 flex-1">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          {title}
        </h3>
        <p className="text-[0.92rem] text-white/65 leading-relaxed flex-1">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Nav (minimal subpage version) ──────────────────────────────────────────────
function SubpageNav({ onLaunchProject }: { onLaunchProject: () => void }) {
  return (
    <motion.nav
      aria-label="Subpage navigation"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "14px 24px",
        }}
      >
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 20px",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.10)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            backgroundColor: "rgba(10,10,10,0.85)",
            boxShadow:
              "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,91,255,0.08)",
          }}
        >
          {/* Left: Back + Brand */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200 text-sm font-medium"
              aria-label="Back to home"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Back</span>
            </a>

            <div
              style={{
                width: 1,
                height: 20,
                background: "rgba(255,255,255,0.10)",
              }}
              aria-hidden="true"
            />

            <Link className="inline-flex items-center gap-3 group focus:outline-none" href="/">
              <Image
                alt="HUZ Logo"
                className="h-7 w-auto object-contain transition-transform group-hover:scale-105"
                height={32}
                priority
                src="/logo.png"
                width={32}
              />
              <span className="text-xl md:text-2xl font-bold tracking-widest text-white select-none">
                HUZ<span className="text-[#635BFF]">.</span>
              </span>
            </Link>
          </div>

          {/* Right: CTA */}
          <div className="hidden sm:block">
            <MagneticButton
              id="ai-nav-cta"
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

// ─── Offerings data ─────────────────────────────────────────────────────────────
const OFFERINGS = [
  {
    icon: <Bot size={26} className="text-[#a78bfa]" />,
    title: "Smart Agentic Systems",
    description:
      "Imagine a digital worker that never sleeps. We build autonomous agentic systems that can read inbound emails, qualify your leads, and schedule meetings directly into your calendar without human intervention.",
    accent: "#a78bfa",
  },
  {
    icon: <BrainCircuit size={26} className="text-[#635BFF]" />,
    title: "Custom AI/ML Systems",
    description:
      "Standard software doesn't always fit. We build bespoke AI/ML systems tailored to your exact business data, helping you analyze trends, predict outcomes, and make smarter decisions instantly.",
    accent: "#635BFF",
  },
  {
    icon: <Workflow size={26} className="text-[#818cf8]" />,
    title: "Seamless Automation Workflows",
    description:
      "Stop copying and pasting data. We connect the apps you already use (like your CRM, email, and accounting software) so that when one thing happens, everything else updates automatically.",
    accent: "#818cf8",
  },
];

// ─── Stats ──────────────────────────────────────────────────────────────────────
const AI_STATS = [
  { value: "10x", label: "Faster Than Manual" },
  { value: "24/7", label: "Always Running" },
  { value: "95%", label: "Error Reduction" },
  { value: "∞", label: "Scalable Operations" },
];

// ─── Page Component ─────────────────────────────────────────────────────────────
export default function AIAutomationPage() {
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
        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section
          className="relative z-10 pt-40 pb-24 md:pt-48 md:pb-32"
          aria-labelledby="ai-hero-headline"
        >
          <div className="container mx-auto max-w-5xl px-6">
            <div className="flex flex-col items-center text-center gap-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="badge">
                  <Sparkles size={12} />
                  AI Automation Systems
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                id="ai-hero-headline"
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
                Turn Hours of Manual Work
                <br />
                <span className="glow-text">into Seconds.</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl"
                style={{ color: "var(--text-secondary)" }}
              >
                We build custom AI/ML systems and intelligent workflows that
                handle your repetitive tasks, giving your team their time back
                to focus on growth.
              </motion.p>

              {/* Hero CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <MagneticButton id="ai-hero-cta" onClick={openDrawer}>
                  Get a Free Consultation
                  <ArrowRight size={18} />
                </MagneticButton>
                <a href="/#services" className="btn-secondary text-sm">
                  View All Services
                </a>
              </motion.div>

              {/* Stats bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="w-full mt-8"
              >
                <div className="accent-line mb-8" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {AI_STATS.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.9 + i * 0.08,
                        duration: 0.5,
                      }}
                      className="flex flex-col gap-1 items-center"
                    >
                      <span
                        className="text-3xl font-bold tracking-tight"
                        style={{ color: "var(--accent)" }}
                      >
                        {stat.value}
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {stat.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CORE OFFERINGS ────────────────────────────────────────────────── */}
        <section
          className="relative z-10 py-20 md:py-28"
          aria-labelledby="offerings-headline"
        >
          <div className="container mx-auto max-w-6xl px-6">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4 mb-16 text-center items-center"
            >
              <span className="badge w-fit">
                <Zap size={12} />
                What We Build
              </span>
              <h2
                id="offerings-headline"
                className="text-3xl md:text-5xl font-bold tracking-tight text-white"
                style={{ letterSpacing: "-0.025em" }}
              >
                Solutions that work{" "}
                <span className="glow-text">while you sleep.</span>
              </h2>
              <p
                className="text-base md:text-lg max-w-2xl"
                style={{ color: "var(--text-secondary)" }}
              >
                We don&apos;t just build technology — we build systems that
                eliminate busywork so your team can focus on the work that
                actually moves the needle.
              </p>
            </motion.div>

            {/* 3-Column Offering Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {OFFERINGS.map((offering, i) => (
                <OfferingCard
                  key={offering.title}
                  icon={offering.icon}
                  title={offering.title}
                  description={offering.description}
                  accent={offering.accent}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
        <section className="relative z-10 py-20 md:py-28">
          <div className="container mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4 mb-16 text-center items-center"
            >
              <span className="badge w-fit">
                <Sparkles size={12} />
                Our Process
              </span>
              <h2
                className="text-3xl md:text-5xl font-bold tracking-tight text-white"
                style={{ letterSpacing: "-0.025em" }}
              >
                From idea to <span className="glow-text">production</span> in
                weeks.
              </h2>
            </motion.div>

            {/* Process Steps */}
            <div className="relative">
              {/* Connecting line */}
              <div
                className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(99,91,255,0.3), rgba(99,91,255,0.3), transparent)",
                }}
                aria-hidden="true"
              />

              {[
                {
                  step: "01",
                  title: "Discovery Call",
                  desc: "We learn about your business, identify the tasks that drain your team's time, and pinpoint exactly where AI can make the biggest impact.",
                },
                {
                  step: "02",
                  title: "Architecture & Design",
                  desc: "We map out the system, choose the right tools and models, and design workflows that fit naturally into how your team already operates.",
                },
                {
                  step: "03",
                  title: "Build & Iterate",
                  desc: "We build your system in focused sprints, testing with real data and refining until everything runs flawlessly and reliably.",
                },
                {
                  step: "04",
                  title: "Launch & Support",
                  desc: "We deploy to production, monitor performance, and provide ongoing support to ensure your AI systems keep delivering value as your business grows.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 mb-12 last:mb-0 ${
                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Step number circle */}
                  <div
                    className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #635BFF 0%, #a78bfa 100%)",
                      boxShadow: "0 0 24px rgba(99,91,255,0.35)",
                    }}
                  >
                    <span className="text-white font-bold text-sm">
                      {item.step}
                    </span>
                  </div>

                  {/* Content card */}
                  <div
                    className="flex-1 rounded-2xl border border-white/8 p-6 md:p-8"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(18,18,18,0.9) 0%, rgba(18,18,30,0.6) 100%)",
                    }}
                  >
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p
                      className="text-sm md:text-base leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA SECTION ───────────────────────────────────────────────────── */}
        <section
          className="relative z-10 py-20 md:py-28"
          aria-labelledby="ai-cta-headline"
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
              {/* Ambient glow */}
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
                Let&apos;s Talk
              </span>

              <h2
                id="ai-cta-headline"
                className="text-3xl md:text-5xl font-bold tracking-tight relative z-10"
                style={{ letterSpacing: "-0.025em" }}
              >
                Ready to put AI to work
                <br />
                <span className="glow-text">for your business?</span>
              </h2>

              <p
                className="text-base max-w-lg relative z-10"
                style={{ color: "var(--text-secondary)" }}
              >
                Tell us about your biggest operational bottleneck. We&apos;ll
                show you exactly how AI can solve it — no jargon, no BS.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                <MagneticButton id="ai-cta-primary" onClick={openDrawer}>
                  <Mail size={18} />
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

      {/* ── Footer (Minimal) ─────────────────────────────────────────────── */}
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
              <Link className="inline-flex items-center gap-3 group focus:outline-none" href="/">
                <Image
                  alt="HUZ Logo"
                  className="h-7 w-auto object-contain transition-transform group-hover:scale-105"
                  height={32}
                  src="/logo.png"
                  width={32}
                />
                <span className="text-xl md:text-2xl font-bold tracking-widest text-white select-none">
                  HUZ<span className="text-[#635BFF]">.</span>
                </span>
              </Link>
              <span
                className="text-xs"
                style={{ color: "var(--text-muted)" }}
              >
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
