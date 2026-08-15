"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Zap,
  Sparkles,
  Smartphone,
  Search,
  Gauge,
  ShieldCheck,
  Mail,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
          x: [0, 50, -30, 0],
          y: [0, -40, 25, 0],
          scale: [1, 1.1, 0.95, 1],
          opacity: [0.5, 0.8, 0.4, 0.5],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: "-5%",
          top: "10%",
          width: 550,
          height: 550,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(99,91,255,0.16) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <motion.div
        animate={{
          x: [0, -40, 35, 0],
          y: [0, 30, -25, 0],
          scale: [1, 1.08, 0.94, 1],
          opacity: [0.4, 0.7, 0.35, 0.4],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -10,
        }}
        style={{
          position: "absolute",
          right: "0%",
          top: "50%",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(99,91,255,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 70% 50% at 50% 40%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 50% at 50% 40%, black 20%, transparent 100%)",
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

// ─── Floating UI Components (Hero Right Side) ───────────────────────────────────
function FloatingUIElements() {
  return (
    <div
      className="relative w-full h-full min-h-[400px] md:min-h-[480px]"
      aria-hidden="true"
    >
      {/* Floating Navbar skeleton */}
      <motion.div
        animate={{
          y: [0, -12, 4, 0],
          rotateY: [0, 3, -2, 0],
          rotateX: [0, 2, -1, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "8%",
          left: "5%",
          right: "15%",
          perspective: "800px",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          style={{
            background: "rgba(26,26,26,0.85)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,91,255,0.06)",
          }}
        >
          {/* Logo placeholder */}
          <div className="flex items-center gap-3">
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "linear-gradient(135deg, #635BFF, #a78bfa)",
                boxShadow: "0 0 12px rgba(99,91,255,0.4)",
              }}
            />
            <div
              style={{
                width: 60,
                height: 10,
                borderRadius: 5,
                background: "rgba(255,255,255,0.12)",
              }}
            />
          </div>
          {/* Nav link placeholders */}
          <div className="hidden sm:flex items-center gap-3">
            {[50, 40, 55].map((w, i) => (
              <div
                key={i}
                style={{
                  width: w,
                  height: 8,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.08)",
                }}
              />
            ))}
            <div
              style={{
                width: 70,
                height: 28,
                borderRadius: 8,
                background: "rgba(99,91,255,0.25)",
                border: "1px solid rgba(99,91,255,0.4)",
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Floating image placeholder card */}
      <motion.div
        animate={{
          y: [0, 10, -8, 0],
          x: [0, -6, 4, 0],
          rotateY: [0, -4, 3, 0],
          rotateX: [0, 3, -2, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -3,
        }}
        style={{
          position: "absolute",
          top: "28%",
          left: "0%",
          width: "55%",
          perspective: "800px",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          style={{
            background: "rgba(26,26,26,0.7)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 16,
            padding: 16,
            boxShadow:
              "0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,91,255,0.04)",
          }}
        >
          {/* Image skeleton */}
          <div
            style={{
              width: "100%",
              height: 120,
              borderRadius: 10,
              background:
                "linear-gradient(135deg, rgba(99,91,255,0.08) 0%, rgba(167,139,250,0.06) 100%)",
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(99,91,255,0.35)" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
          {/* Text skeleton lines */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                width: "80%",
                height: 10,
                borderRadius: 5,
                background: "rgba(255,255,255,0.10)",
              }}
            />
            <div
              style={{
                width: "55%",
                height: 8,
                borderRadius: 4,
                background: "rgba(255,255,255,0.06)",
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Floating CTA button outline */}
      <motion.div
        animate={{
          y: [0, -8, 6, 0],
          x: [0, 8, -5, 0],
          rotateZ: [0, 1.5, -1, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -5,
        }}
        style={{
          position: "absolute",
          top: "58%",
          right: "5%",
          perspective: "800px",
        }}
      >
        <div
          style={{
            padding: "12px 28px",
            borderRadius: 10,
            background: "linear-gradient(135deg, rgba(99,91,255,0.2), rgba(99,91,255,0.08))",
            border: "1px solid rgba(99,91,255,0.35)",
            boxShadow: "0 0 20px rgba(99,91,255,0.15), 0 8px 24px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div style={{ width: 65, height: 10, borderRadius: 5, background: "rgba(255,255,255,0.18)" }} />
          <ArrowRight size={14} style={{ color: "rgba(99,91,255,0.6)" }} />
        </div>
      </motion.div>

      {/* Floating stats card */}
      <motion.div
        animate={{
          y: [0, 14, -6, 0],
          x: [0, -5, 8, 0],
          rotateY: [0, 5, -3, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -7,
        }}
        style={{
          position: "absolute",
          bottom: "10%",
          left: "10%",
          perspective: "800px",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          style={{
            background: "rgba(26,26,26,0.75)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14,
            padding: "14px 20px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "rgba(99,91,255,0.12)",
              border: "1px solid rgba(99,91,255,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Gauge size={16} style={{ color: "#635BFF" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#a78bfa",
                letterSpacing: "-0.02em",
              }}
            >
              99/100
            </div>
            <div
              style={{
                fontSize: "0.65rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Performance Score
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Timeline Step ──────────────────────────────────────────────────────────────
interface TimelineStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  isLast: boolean;
}

function TimelineStep({ icon, title, description, index, isLast }: TimelineStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex gap-8 md:gap-12"
      style={{ paddingBottom: isLast ? 0 : 64 }}
    >
      {/* Line + Dot */}
      <div className="flex flex-col items-center shrink-0" style={{ width: 48 }}>
        {/* Glowing dot */}
        <div
          className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: "rgba(99,91,255,0.12)",
            border: "2px solid rgba(99,91,255,0.4)",
            boxShadow: "0 0 20px rgba(99,91,255,0.25), 0 0 60px rgba(99,91,255,0.08)",
          }}
        >
          {icon}
        </div>
        {/* Connecting line */}
        {!isLast && (
          <div
            className="flex-1 w-px mt-3"
            style={{
              background:
                "linear-gradient(to bottom, rgba(99,91,255,0.35) 0%, rgba(99,91,255,0.08) 100%)",
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pt-2">
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 tracking-tight">
          {title}
        </h3>
        <p
          className="text-sm md:text-base leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {description}
        </p>
      </div>
    </motion.div>
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
            boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,91,255,0.08)",
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
            <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.10)" }} aria-hidden="true" />
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
          <div className="hidden sm:block">
            <MagneticButton id="webdev-nav-cta" onClick={onLaunchProject} className="text-sm !py-2.5 !px-5">
              Launch Project
              <ArrowRight size={14} />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

// ─── Data ───────────────────────────────────────────────────────────────────────
const TIMELINE_STEPS = [
  {
    icon: <Smartphone size={20} className="text-[#635BFF]" />,
    title: "Mobile-First Design",
    description:
      "Flawless layout across phone, tablet, and desktop. Every site we build starts with mobile and scales up — because that's where your customers are.",
  },
  {
    icon: <Search size={20} className="text-[#a78bfa]" />,
    title: "Search Engine Ready",
    description:
      "Clean SEO structure so Google finds you instantly. Proper headings, meta tags, fast load times, and structured data baked into every page.",
  },
  {
    icon: <Gauge size={20} className="text-[#818cf8]" />,
    title: "Lightning Speed",
    description:
      "Optimized images, lightweight code, and smart caching for instant page loads. Slow websites lose customers — yours won't be one of them.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#c4b5fd]" />,
    title: "Security & Reliability",
    description:
      "SSL setup, automated backups, and clean code that follows best practices. Sleep soundly knowing your site is secure, stable, and always online.",
  },
];

// ─── Page ───────────────────────────────────────────────────────────────────────
export default function WebDevelopmentPage() {
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
        {/* HERO — Left-Aligned with Floating UI on Right                      */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        <section
          className="relative z-10 pt-40 pb-20 md:pt-48 md:pb-28"
          aria-labelledby="webdev-hero-headline"
        >
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">
              {/* Left: Copy */}
              <div className="flex flex-col gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="badge">
                    <Sparkles size={12} />
                    Web Development
                  </span>
                </motion.div>

                <motion.h1
                  id="webdev-hero-headline"
                  initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
                  style={{ letterSpacing: "-0.04em", lineHeight: 1.08 }}
                >
                  Websites Built for
                  <br />
                  Speed, Scale, and{" "}
                  <span className="glow-text">Real Growth.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="text-base md:text-lg leading-relaxed max-w-lg"
                  style={{ color: "var(--text-secondary)" }}
                >
                  High-performance custom applications and easy-to-manage
                  WordPress platforms — built to convert visitors into customers.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-col sm:flex-row items-start gap-4"
                >
                  <MagneticButton id="webdev-hero-cta" onClick={openDrawer}>
                    Start Your Project
                    <ArrowRight size={18} />
                  </MagneticButton>
                  <a href="/#services" className="btn-secondary text-sm">
                    View All Services
                  </a>
                </motion.div>
              </div>

              {/* Right: Floating UI Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="hidden lg:block"
              >
                <FloatingUIElements />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* STICKY SPLIT-SCREEN — Custom vs. WordPress                         */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        <section className="relative z-10 py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Left Column (Sticky) */}
              <div className="lg:col-span-2">
                <div className="lg:sticky lg:top-32">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col gap-5"
                  >
                    <span className="badge w-fit">
                      <Zap size={12} />
                      Our Approach
                    </span>
                    <h2
                      className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight"
                      style={{
                        letterSpacing: "-0.04em",
                        lineHeight: 1.1,
                        color: "var(--text-primary)",
                      }}
                    >
                      The Right Tool
                      <br />
                      for the{" "}
                      <span className="glow-text">Right Job.</span>
                    </h2>
                    <p
                      className="text-sm leading-relaxed max-w-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      We don&apos;t believe in one-size-fits-all. Every project
                      gets the technology stack it deserves.
                    </p>
                    {/* Accent glow line */}
                    <div
                      className="hidden lg:block mt-4"
                      style={{
                        width: "100%",
                        height: 1,
                        background:
                          "linear-gradient(90deg, rgba(99,91,255,0.4) 0%, transparent 100%)",
                      }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Right Column (Scrollable Cards) */}
              <div className="lg:col-span-3 flex flex-col gap-10">
                {/* Card 1: Custom Engineering */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative rounded-3xl border border-white/8 overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(18,18,18,0.95) 0%, rgba(14,14,28,0.8) 100%)",
                  }}
                >
                  {/* Top accent border */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, #635BFF, transparent)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Subtle pattern */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative z-10 p-8 md:p-12">
                    {/* Badge */}
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-8"
                      style={{
                        background: "rgba(99,91,255,0.12)",
                        border: "1px solid rgba(99,91,255,0.3)",
                        color: "#635BFF",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: "#635BFF",
                          boxShadow: "0 0 8px #635BFF",
                        }}
                      />
                      Custom Engineering
                    </div>

                    <h3
                      className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      Tailored Engineering for
                      <br />
                      <span className="glow-text">
                        High-Performance Brands.
                      </span>
                    </h3>

                    <p
                      className="text-base leading-relaxed max-w-lg mb-8"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Perfect for startups needing custom features, maximum
                      speed, and bespoke designs. Built with modern tech that
                      never slows down — Next.js, React, Node.js, and
                      everything in between.
                    </p>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-2">
                      {["Next.js", "React", "TypeScript", "Node.js", "Vercel"].map(
                        (tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium"
                            style={{
                              background: "rgba(99,91,255,0.08)",
                              border: "1px solid rgba(99,91,255,0.15)",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Card 2: WordPress */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative rounded-3xl border border-white/8 overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(18,18,18,0.95) 0%, rgba(18,14,28,0.8) 100%)",
                  }}
                >
                  {/* Top accent border */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, #a78bfa, transparent)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Subtle dot pattern */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-25"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(167,139,250,0.15) 1px, transparent 1px)",
                      backgroundSize: "18px 18px",
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative z-10 p-8 md:p-12">
                    {/* Badge */}
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-8"
                      style={{
                        background: "rgba(167,139,250,0.12)",
                        border: "1px solid rgba(167,139,250,0.3)",
                        color: "#a78bfa",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: "#a78bfa",
                          boxShadow: "0 0 8px #a78bfa",
                        }}
                      />
                      Professional WordPress
                    </div>

                    <h3
                      className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      Easy-to-Manage Sites Built
                      <br />
                      <span
                        style={{
                          background:
                            "linear-gradient(120deg, #ffffff 0%, #c4b5fd 35%, #a78bfa 65%, #c4b5fd 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          filter:
                            "drop-shadow(0 0 20px rgba(167,139,250,0.35))",
                        }}
                      >
                        for Independence.
                      </span>
                    </h3>

                    <p
                      className="text-base leading-relaxed max-w-lg mb-8"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Perfect for businesses that want full control over their
                      content without touching code. Clean, SEO-ready, and easy
                      for your team to update daily — no developer needed for
                      day-to-day changes.
                    </p>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-2">
                      {[
                        "WordPress",
                        "WooCommerce",
                        "Custom Themes",
                        "SEO-Ready",
                        "Easy Updates",
                      ].map((feat) => (
                        <span
                          key={feat}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium"
                          style={{
                            background: "rgba(167,139,250,0.08)",
                            border: "1px solid rgba(167,139,250,0.15)",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* HUZ STANDARD — Vertical Timeline                                   */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        <section
          className="relative z-10 py-20 md:py-28"
          aria-labelledby="standard-headline"
        >
          <div className="container mx-auto max-w-4xl px-6">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4 mb-16"
            >
              <span className="badge w-fit">
                <ShieldCheck size={12} />
                The HUZ Standard
              </span>
              <h2
                id="standard-headline"
                className="text-3xl md:text-5xl font-bold tracking-tight text-white"
                style={{ letterSpacing: "-0.025em" }}
              >
                What Every HUZ Website{" "}
                <span className="glow-text">Includes.</span>
              </h2>
              <p
                className="text-base max-w-xl"
                style={{ color: "var(--text-secondary)" }}
              >
                No matter the technology, every project we ship meets these
                non-negotiable standards.
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="pl-2 md:pl-4">
              {TIMELINE_STEPS.map((step, i) => (
                <TimelineStep
                  key={step.title}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  index={i}
                  isLast={i === TIMELINE_STEPS.length - 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* CTA                                                                */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        <section
          className="relative z-10 py-20 md:py-28"
          aria-labelledby="webdev-cta-headline"
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
                Let&apos;s Talk
              </span>

              <h2
                id="webdev-cta-headline"
                className="text-3xl md:text-5xl font-bold tracking-tight relative z-10"
                style={{ letterSpacing: "-0.025em" }}
              >
                Have a website project
                <br />
                <span className="glow-text">in mind?</span>
              </h2>

              <p
                className="text-base max-w-lg relative z-10"
                style={{ color: "var(--text-secondary)" }}
              >
                Whether it&apos;s a custom-coded application or a WordPress
                site, we&apos;ll build something your customers love.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                <MagneticButton id="webdev-cta-primary" onClick={openDrawer}>
                  <Mail size={18} />
                  Start the Conversation
                </MagneticButton>
                <span
                  className="text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  Free quote · No commitment
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
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                &copy; {new Date().getFullYear()} All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-5">
              <a
                href="/"
                className="text-xs transition-colors duration-200 flex items-center gap-1"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
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
