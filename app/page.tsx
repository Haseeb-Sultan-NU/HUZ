"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Sparkles,
  Mail,
} from "lucide-react";
import CompanyMarquee from "@/components/CompanyMarquee";
import ServicesSection from "@/components/ServicesSection";
import ContactDrawer from "@/components/ContactDrawer";
import ProcessTimeline from "@/components/ProcessTimeline";
import FeaturedWork from "@/components/FeaturedWork";
import WhyHuz from "@/components/WhyHuz";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";




// ─── Animated Background ───────────────────────────────────────────────────────
const ORBS = [
  { size: 700, x: "10%", y: "-15%", color: "rgba(99,91,255,0.22)", dur: 22, delay: 0 },
  { size: 480, x: "70%", y: "30%", color: "rgba(99,91,255,0.14)", dur: 28, delay: -6 },
  { size: 380, x: "40%", y: "65%", color: "rgba(167,139,250,0.10)", dur: 18, delay: -11 },
  { size: 300, x: "-5%", y: "55%", color: "rgba(99,91,255,0.09)", dur: 32, delay: -4 },
];

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  dur: Math.random() * 14 + 10,
  delay: -(Math.random() * 20),
  driftX: (Math.random() - 0.5) * 120,
  driftY: (Math.random() - 0.5) * 80,
}));

function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none"
      style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}
    >
      <div className="noise-overlay" />

      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            borderRadius: "50%",
            background: `radial-gradient(circle at 40% 40%, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(80px)",
            willChange: "transform, opacity",
          }}
          animate={{
            x: [0, 60 * (i % 2 === 0 ? 1 : -1), -40, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.12, 0.95, 1],
            opacity: [0.8, 1, 0.7, 0.8],
          }}
          transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(99,91,255,0.7)",
            boxShadow: `0 0 ${p.size * 3}px rgba(99,91,255,0.5)`,
            willChange: "transform, opacity",
          }}
          animate={{
            x: [0, p.driftX, 0],
            y: [0, p.driftY, 0],
            opacity: [0, 0.6, 0.2, 0.7, 0],
          }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(99,91,255,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
          opacity: 0.35,
        }}
      />
    </div>
  );
}

// ─── Animated Headline ─────────────────────────────────────────────────────────
function AnimatedHeadline() {
  return (
    <motion.h1
      id="hero-headline"
      className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-center text-white max-w-5xl mx-auto"
      style={{
        lineHeight: 1.1,
      }}
      aria-label="Stop doing manual work. Start scaling your web presence."
    >
      <motion.span
        className="inline-block"
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        Stop doing <span className="text-[#635BFF]">manual work.</span>
      </motion.span>
      <br className="hidden md:block" />
      <motion.span
        className="inline-block"
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.65, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
      >
        {" "}Start scaling your <span className="text-[#635BFF]">web presence.</span>
      </motion.span>
    </motion.h1>
  );
}

// ─── Hero Section ──────────────────────────────────────────────────────────────
function HeroSection({ openDrawer }: { openDrawer: () => void }) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#0A0A0A]"
      style={{ minHeight: "80vh", paddingTop: "200px", paddingBottom: "160px" }}
      aria-labelledby="hero-headline"
    >
      {/* ── Static Ambient Glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(99,91,255,0.1), transparent 50%)`,
        }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 container">
        <div className="flex flex-col items-center text-center max-w-6xl mx-auto">
          <AnimatedHeadline />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mt-6 text-center leading-relaxed"
          >
            Your business shouldn&apos;t be slowed down by repetitive tasks or a sluggish website. We engineer custom web apps and AI workflows that run your operations on autopilot.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex justify-center gap-4 mt-10"
          >
            <MagneticButton id="hero-cta-primary" onClick={openDrawer} className="bg-[#635BFF] hover:bg-[#524be3] text-white">
              Start a Project
              <ArrowRight size={18} />
            </MagneticButton>
            <a id="hero-cta-secondary" href="#services" className="btn-secondary border border-white/10 bg-white/5 text-white hover:bg-white/10 flex items-center justify-center px-6 rounded-full font-medium transition-colors">
              Explore Services
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="w-full mt-16"
          >
            <div className="accent-line mb-10" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.15 + i * 0.08, duration: 0.5 }}
                  className="flex flex-col gap-1"
                >
                  <span className="text-3xl font-bold tracking-tight" style={{ color: "var(--accent)" }}>
                    {stat.value}
                  </span>
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MagneticButton({
  children,
  className = "",
  href,
  id,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  id?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
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
      ref={ref as React.Ref<HTMLButtonElement>}
      id={id}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`btn-primary ${className}`}
      whileTap={{ scale: 0.97 }}
      onClick={onClick ? onClick : href ? () => window.open(href, "_blank") : undefined}
    >
      {children}
    </motion.button>
  );
}

// ─── Nav ───────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Capabilities", href: "#services" },
  { label: "Deployments", href: "#work" },
  { label: "Architecture", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Navbar({ onLaunchProject }: { onLaunchProject: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      aria-label="Main navigation"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}
    >
      {/* Outer padding shell — creates the floating gap */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: scrolled ? "10px 24px" : "18px 24px",
          transition: "padding 0.4s ease",
        }}
      >
        {/* Glassmorphic pill container */}
        <motion.div
          animate={{
            backgroundColor: scrolled ? "rgba(10,10,10,0.88)" : "rgba(10,10,10,0.50)",
            borderColor: scrolled ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)",
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,91,255,0.1)"
              : "0 4px 20px rgba(0,0,0,0.3)",
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 20px",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          {/* ── Brand + status ── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            {/* Logo mark */}
            <div
              style={{
                width: 32, height: 32, borderRadius: 10,
                background: "linear-gradient(135deg, #635BFF 0%, #a78bfa 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 16px rgba(99,91,255,0.45)",
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              <Zap size={15} color="#fff" fill="#fff" />
            </div>

            {/* Wordmark */}
            <span
              style={{ fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-0.03em", color: "var(--text-primary)" }}
            >
              HUZ<span style={{ color: "var(--accent)" }}>.</span>
            </span>


          </motion.div>

          {/* ── Nav links ── */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hidden md:flex items-center gap-1"
          >
            {NAV_LINKS.map((link) =>
              link.label === "Contact" ? (
                <button key={link.label} onClick={onLaunchProject} className="nav-link">
                  {link.label}
                </button>
              ) : (
                <a key={link.label} href={link.href} className="nav-link">
                  {link.label}
                </a>
              )
            )}
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block"
          >
            <MagneticButton id="nav-cta" onClick={onLaunchProject} className="text-sm !py-2.5 !px-5">
              Launch Project
              <ArrowRight size={14} />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
}


// ─── Stats ─────────────────────────────────────────────────────────────────────
const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "99%", label: "Client Satisfaction" },
  { value: "3x", label: "Avg. Faster Time-to-Market" },
  { value: "24/7", label: "AI Systems Uptime" },
];


// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
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
      {/* Immersive interactive background */}
      <AnimatedBackground />

      {/* Navbar */}
      <Navbar onLaunchProject={openDrawer} />

      <main>
        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <HeroSection openDrawer={openDrawer} />

        {/* ── MARQUEE ──────────────────────────────────────────────────────── */}
        <CompanyMarquee />

        {/* ── SERVICES ──────────────────────────────────────────────────────── */}
        <ServicesSection />

        {/* ── PROCESS TIMELINE ────────────────────────────────────────────── */}
        <ProcessTimeline />

        {/* ── FEATURED WORK / CASE STUDIES ────────────────────────────────── */}
        <FeaturedWork />

        {/* ── WHY HUZ? ───────────────────────────────────────────────────── */}
        <WhyHuz />

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <FAQ />
      </main>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* PRE-FOOTER CTA                                                              */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section style={{ borderTop: "1px solid var(--border)" }}>

        {/* ─ Pre-footer CTA card ──────────────────────────────────────────── */}
        <div className="container" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="footer-cta-card"
          >
            <div className="footer-cta-glow" aria-hidden="true" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex flex-col gap-3 max-w-xl">
                <span className="badge w-fit">
                  <Sparkles size={12} />
                  Start a Conversation
                </span>
                <h2
                  className="text-2xl md:text-3xl font-bold tracking-tight"
                  style={{ letterSpacing: "-0.025em" }}
                >
                  Ready to automate your operations
                  <br />
                  and <span className="glow-text">scale your web footprint?</span>
                </h2>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Reach out directly — we respond within 24 hours.
                </p>
              </div>

              <div className="flex flex-col items-start gap-3">
                <MagneticButton id="footer-cta-btn" onClick={openDrawer}>
                  <Mail size={16} />
                  Initiate Build
                  <ArrowRight size={16} />
                </MagneticButton>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  hello@huzagency.com
                </span>
              </div>
            </div>
          </motion.div>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* GLOBAL FOOTER                                                       */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <Footer />

      {/* ── Contact Drawer ──────────────────────────────────────────────── */}
      <ContactDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
}
