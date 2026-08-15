"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Database,
  TrendingUp,
  Mail,
  ChevronLeft,
  Target,
  CheckCircle2,
  Layers,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ContactDrawer from "@/components/ContactDrawer";

// ─── Background ─────────────────────────────────────────────────────────────────
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
          x: [0, 35, -25, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.06, 0.97, 1],
          opacity: [0.45, 0.75, 0.4, 0.45],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: "20%",
          top: "-5%",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(129,140,248,0.14) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <motion.div
        animate={{
          x: [0, -45, 30, 0],
          y: [0, 35, -20, 0],
          opacity: [0.35, 0.6, 0.3, 0.35],
        }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut", delay: -12 }}
        style={{
          position: "absolute",
          right: "5%",
          bottom: "15%",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,91,255,0.11) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(129,140,248,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 70% 50% at 50% 35%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 50% at 50% 35%, black 20%, transparent 100%)",
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

// ─── Animated Bar Chart ─────────────────────────────────────────────────────────
const BAR_DATA = [
  { height: 45,  color: "rgba(129,140,248,0.5)",  delay: 0.3  },
  { height: 72,  color: "rgba(99,91,255,0.55)",    delay: 0.4  },
  { height: 58,  color: "rgba(167,139,250,0.5)",   delay: 0.5  },
  { height: 90,  color: "rgba(99,91,255,0.6)",     delay: 0.6  },
  { height: 65,  color: "rgba(129,140,248,0.45)",  delay: 0.7  },
  { height: 80,  color: "rgba(167,139,250,0.55)",  delay: 0.8  },
  { height: 100, color: "rgba(99,91,255,0.65)",    delay: 0.9  },
  { height: 55,  color: "rgba(129,140,248,0.4)",   delay: 1.0  },
  { height: 85,  color: "rgba(99,91,255,0.5)",     delay: 1.1  },
  { height: 70,  color: "rgba(167,139,250,0.45)",  delay: 1.2  },
  { height: 95,  color: "rgba(99,91,255,0.6)",     delay: 1.3  },
  { height: 60,  color: "rgba(129,140,248,0.5)",   delay: 1.4  },
];

function AnimatedBarChart() {
  return (
    <div
      className="flex items-end justify-center gap-2 sm:gap-3"
      style={{ height: 140 }}
      aria-hidden="true"
    >
      {BAR_DATA.map((bar, i) => (
        <motion.div
          key={i}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: `${bar.height}%`, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: bar.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            width: "clamp(16px, 4vw, 32px)",
            background: `linear-gradient(to top, ${bar.color}, transparent)`,
            borderRadius: "6px 6px 2px 2px",
            border: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "none",
          }}
        />
      ))}
    </div>
  );
}

// ─── Masonry Card ───────────────────────────────────────────────────────────────
interface MasonryCardProps {
  icon: React.ReactNode;
  badge: string;
  badgeColor: string;
  title: string;
  body: string;
  index: number;
  className?: string;
}

function MasonryCard({
  icon,
  badge,
  badgeColor,
  title,
  body,
  index,
  className = "",
}: MasonryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: 0.12 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative rounded-3xl border border-white/8 bg-[#121212] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[#818cf8]/35 hover:shadow-[0_12px_40px_-12px_rgba(129,140,248,0.3)] ${className}`}
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(129, 140, 248, 0.12), transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 p-8 md:p-10">
        {/* Icon + badge */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{
              background: `${badgeColor}18`,
              border: `1px solid ${badgeColor}40`,
            }}
          >
            {icon}
          </div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
            style={{
              background: `${badgeColor}12`,
              border: `1px solid ${badgeColor}30`,
              color: badgeColor,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: badgeColor, boxShadow: `0 0 8px ${badgeColor}` }}
            />
            {badge}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-3">
          {title}
        </h3>
        <p className="text-[0.92rem] text-white/60 leading-relaxed">{body}</p>
      </div>
    </motion.div>
  );
}

// ─── Stat Callout ───────────────────────────────────────────────────────────────
interface StatCalloutProps {
  label: string;
  value: string;
  subtext: string;
  index: number;
}

function StatCallout({ label, value, subtext, index }: StatCalloutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        delay: 0.2 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col items-center text-center gap-3 flex-1 px-4 py-8"
    >
      {/* Label */}
      <span
        className="text-xs font-semibold tracking-widest uppercase"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>

      {/* Value */}
      <span
        className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
        style={{
          background:
            "linear-gradient(135deg, #ffffff 0%, #818cf8 50%, #635BFF 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 0 20px rgba(99,91,255,0.2))",
          letterSpacing: "-0.04em",
        }}
      >
        {value}
      </span>

      {/* Subtext */}
      <span
        className="text-sm max-w-[200px] leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {subtext}
      </span>
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
            <MagneticButton
              id="data-nav-cta"
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

// ─── Page ───────────────────────────────────────────────────────────────────────
export default function DataAnalyticsPage() {
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
        {/* HERO — "Dashboard" framed hero                                     */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        <section
          className="relative z-10 pt-40 pb-16 md:pt-48 md:pb-24"
          aria-labelledby="data-hero-headline"
        >
          <div className="container mx-auto max-w-4xl px-6">
            {/* Glowing interface frame */}
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl overflow-hidden"
              style={{
                border: "1px solid rgba(129,140,248,0.2)",
                background:
                  "linear-gradient(145deg, rgba(18,18,18,0.95) 0%, rgba(14,14,30,0.85) 100%)",
                boxShadow:
                  "0 0 80px rgba(99,91,255,0.08), 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              {/* Top chrome bar (dashboard UI feel) */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 20px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {/* Traffic light dots */}
                <div className="flex items-center gap-2">
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "rgba(255,95,87,0.7)",
                    }}
                  />
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "rgba(255,189,46,0.7)",
                    }}
                  />
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "rgba(39,201,63,0.7)",
                    }}
                  />
                </div>
                <div
                  className="flex-1 mx-4"
                  style={{
                    height: 24,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 12,
                  }}
                >
                  <span
                    className="text-xs"
                    style={{
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    dashboard.huzagency.com
                  </span>
                </div>
              </div>

              {/* Content area */}
              <div className="px-8 pt-12 pb-10 md:px-16 md:pt-16 md:pb-14 flex flex-col items-center text-center gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="badge">
                    <BarChart3 size={12} />
                    Data & Analytics
                  </span>
                </motion.div>

                <motion.h1
                  id="data-hero-headline"
                  initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
                  style={{ letterSpacing: "-0.04em", lineHeight: 1.08 }}
                >
                  Stop Guessing.
                  <br />
                  <span className="glow-text">Start Knowing.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-base md:text-lg leading-relaxed max-w-xl"
                  style={{ color: "var(--text-secondary)" }}
                >
                  We build easy-to-understand dashboards that turn your messy
                  business data into clear, actionable insights.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.65 }}
                  className="flex flex-col sm:flex-row items-center gap-4"
                >
                  <MagneticButton id="data-hero-cta" onClick={openDrawer}>
                    Get a Dashboard Quote
                    <ArrowRight size={18} />
                  </MagneticButton>
                  <a href="/#services" className="btn-secondary text-sm">
                    View All Services
                  </a>
                </motion.div>

                {/* Animated bar chart */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="w-full mt-6"
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    paddingTop: 28,
                  }}
                >
                  <AnimatedBarChart />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* MASONRY GRID — Core Value Proposition                               */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        <section
          className="relative z-10 py-20 md:py-28"
          aria-labelledby="value-headline"
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
                <Sparkles size={12} />
                What We Build
              </span>
              <h2
                id="value-headline"
                className="text-3xl md:text-5xl font-bold tracking-tight text-white"
                style={{ letterSpacing: "-0.025em" }}
              >
                Data that actually{" "}
                <span className="glow-text">makes sense.</span>
              </h2>
              <p
                className="text-base md:text-lg max-w-2xl"
                style={{ color: "var(--text-secondary)" }}
              >
                No more squinting at spreadsheets. We turn your raw numbers into
                clear answers.
              </p>
            </motion.div>

            {/* Masonry grid: 1 wide top, 2 bottom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Wide top card */}
              <div className="md:col-span-2">
                <MasonryCard
                  icon={<BarChart3 size={24} className="text-[#818cf8]" />}
                  badge="CORE"
                  badgeColor="#818cf8"
                  title="Real-Time Business Dashboards"
                  body="See exactly how your business is performing at any given second. We take data from your sales, marketing, and operations and put it all on one beautiful, easy-to-read screen."
                  index={0}
                  className="min-h-0"
                />
              </div>

              {/* Bottom left */}
              <MasonryCard
                icon={<Database size={24} className="text-[#a78bfa]" />}
                badge="FOUNDATION"
                badgeColor="#a78bfa"
                title="Clean Up Your Data"
                body="Got spreadsheets everywhere? We organize, clean, and centralize your scattered information so you can actually trust the numbers you are looking at."
                index={1}
              />

              {/* Bottom right */}
              <MasonryCard
                icon={<TrendingUp size={24} className="text-[#635BFF]" />}
                badge="INTELLIGENCE"
                badgeColor="#635BFF"
                title="Predictive Insights"
                body="Don't just look at what happened yesterday. We set up smart tracking to help you spot trends and predict what your customers will do next."
                index={2}
              />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* HORIZONTAL STAT BAR — "How It Helps You"                           */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        <section className="relative z-10 py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="badge inline-flex mb-4">
                <Target size={12} />
                Business Impact
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight text-white"
                style={{ letterSpacing: "-0.025em" }}
              >
                How it helps <span className="glow-text">you.</span>
              </h2>
            </motion.div>

            {/* Full-width stat bar */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl border border-white/8 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(18,18,18,0.95) 0%, rgba(14,14,28,0.85) 50%, rgba(18,18,18,0.95) 100%)",
              }}
            >
              {/* Ambient glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(129,140,248,0.06) 0%, transparent 100%)",
                }}
                aria-hidden="true"
              />

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
                <StatCallout
                  label="Focus on Growth"
                  value="Zero"
                  subtext="Hours spent manually pulling reports."
                  index={0}
                />
                <StatCallout
                  label="Decision Making"
                  value="100%"
                  subtext="Confidence in your business numbers."
                  index={1}
                />
                <StatCallout
                  label="Data Silos"
                  value="Eliminated"
                  subtext="All your software talking to one central hub."
                  index={2}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* WHAT YOU GET — Quick feature list                                   */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        <section className="relative z-10 py-16 md:py-24">
          <div className="container mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4 mb-12"
            >
              <span className="badge w-fit">
                <Layers size={12} />
                Deliverables
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight text-white"
                style={{ letterSpacing: "-0.025em" }}
              >
                Everything you get,{" "}
                <span className="glow-text">nothing you don&apos;t.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Custom dashboards tailored to your KPIs",
                "Real-time data syncing from all your tools",
                "Weekly & monthly automated reports",
                "Clean data pipelines — no more spreadsheet chaos",
                "Revenue & conversion tracking",
                "Team access with role-based permissions",
                "Mobile-friendly dashboard views",
                "Ongoing support and dashboard iteration",
              ].map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 + i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-start gap-3 p-4 rounded-xl transition-colors duration-200 hover:bg-white/[0.02]"
                >
                  <CheckCircle2
                    size={18}
                    className="shrink-0 mt-0.5"
                    style={{ color: "#818cf8" }}
                  />
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* CTA                                                                */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        <section
          className="relative z-10 py-20 md:py-28"
          aria-labelledby="data-cta-headline"
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
                borderColor: "rgba(129, 140, 248, 0.25)",
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center top, rgba(129,140,248,0.10) 0%, transparent 60%)",
                }}
                aria-hidden="true"
              />

              <span className="badge relative z-10">
                <Sparkles size={12} />
                Let&apos;s Talk Data
              </span>

              <h2
                id="data-cta-headline"
                className="text-3xl md:text-5xl font-bold tracking-tight relative z-10"
                style={{ letterSpacing: "-0.025em" }}
              >
                Ready to see your business
                <br />
                <span className="glow-text">clearly?</span>
              </h2>

              <p
                className="text-base max-w-lg relative z-10"
                style={{ color: "var(--text-secondary)" }}
              >
                Tell us what you&apos;re trying to measure, and we&apos;ll show
                you exactly how to visualize it — clean, fast, and beautiful.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                <MagneticButton id="data-cta-primary" onClick={openDrawer}>
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
