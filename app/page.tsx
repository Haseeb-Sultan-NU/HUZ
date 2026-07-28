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

// Inline SVG brand icons (lucide-react v1+ removed brand icons)
const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const TwitterXIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ─── Animated Background ───────────────────────────────────────────────────────
const ORBS = [
  { size: 700, x: "10%",  y: "-15%", color: "rgba(99,91,255,0.22)",  dur: 22, delay: 0   },
  { size: 480, x: "70%",  y: "30%",  color: "rgba(99,91,255,0.14)",  dur: 28, delay: -6  },
  { size: 380, x: "40%",  y: "65%",  color: "rgba(167,139,250,0.10)",dur: 18, delay: -11 },
  { size: 300, x: "-5%",  y: "55%",  color: "rgba(99,91,255,0.09)",  dur: 32, delay: -4  },
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
const HEADLINE_WORDS = [
  { text: "Intelligent",  gradient: false },
  { text: "Automation.",  gradient: true  },
  { text: "Flawless",     gradient: false },
  { text: "Web",          gradient: false },
  { text: "Execution.",   gradient: true  },
];

function AnimatedHeadline() {
  return (
    <motion.h1
      id="hero-headline"
      className="flex flex-wrap justify-center gap-x-5 gap-y-2"
      style={{
        fontSize: "clamp(3rem, 7vw, 6.5rem)",
        fontWeight: 900,
        lineHeight: 1.0,
        letterSpacing: "-0.04em",
      }}
      aria-label="Intelligent Automation. Flawless Web Execution."
    >
      {HEADLINE_WORDS.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.65, delay: 0.15 + i * 0.11, ease: [0.22, 1, 0.36, 1] }}
          className={word.gradient ? "glow-text" : ""}
          style={word.gradient ? {} : { color: "var(--text-primary)" }}
        >
          {word.text}
        </motion.span>
      ))}
    </motion.h1>
  );
}

// ─── Magnetic Button ───────────────────────────────────────────────────────────
function MagneticButton({
  children,
  className = "",
  href,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  id?: string;
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
      onClick={href ? () => window.open(href, "_blank") : undefined}
    >
      {children}
    </motion.button>
  );
}

// ─── Nav ───────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Capabilities", href: "#services" },
  { label: "Deployments",  href: "#work"     },
  { label: "Architecture", href: "#about"    },
  { label: "Contact",      href: "#contact"  },
];

function Navbar() {
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

            {/* Live status badge */}
            <div
              className="hidden sm:flex items-center gap-1.5"
              style={{
                padding: "3px 10px",
                borderRadius: 100,
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.2)",
                fontSize: "0.68rem",
                fontWeight: 500,
                color: "#4ade80",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
              aria-label="System status: operational"
            >
              <span className="nav-status-dot" aria-hidden="true" />
              Systems Operational
            </div>
          </motion.div>

          {/* ── Nav links ── */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hidden md:flex items-center gap-1"
          >
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block"
          >
            <MagneticButton id="nav-cta" href="#contact" className="text-sm !py-2.5 !px-5">
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
  { value: "3x",  label: "Avg. Faster Time-to-Market" },
  { value: "24/7",label: "AI Systems Uptime" },
];

// ─── Footer data ───────────────────────────────────────────────────────────────
const FOOTER_COLS = [
  {
    heading: "Capabilities",
    links: ["Web Engineering", "AI Automation", "Custom Agents", "Performance Optimization"],
  },
  {
    heading: "Company",
    links: ["Architecture", "Case Studies", "Tech Stack", "Process"],
  },
  {
    heading: "Resources",
    links: ["Documentation", "Open Source", "Blog", "Changelog"],
  },
];

const SOCIAL_LINKS = [
  { Icon: GithubIcon,   href: "https://github.com",   label: "GitHub",     id: "footer-github"   },
  { Icon: TwitterXIcon, href: "https://twitter.com",  label: "Twitter / X", id: "footer-twitter"  },
  { Icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn",    id: "footer-linkedin" },
];

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      {/* Immersive interactive background */}
      <AnimatedBackground />

      {/* Navbar */}
      <Navbar />

      <main>
        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section
          id="hero"
          className="section"
          style={{ paddingTop: "200px", paddingBottom: "160px" }}
          aria-labelledby="hero-headline"
        >
          <div className="container">
            <div className="flex flex-col items-center text-center gap-10 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="badge">
                  <Sparkles size={12} />
                  AI-First Digital Agency
                </span>
              </motion.div>

              <AnimatedHeadline />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.75 }}
                className="text-lg md:text-xl leading-relaxed max-w-3xl"
                style={{ color: "var(--text-secondary)" }}
              >
                HUZ engineers high-performance web platforms and autonomous AI
                systems for ambitious teams — shipping fast, scaling reliably,
                and looking exceptional at every breakpoint.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <MagneticButton id="hero-cta-primary" href="#contact">
                  Start a Project
                  <ArrowRight size={18} />
                </MagneticButton>
                <a id="hero-cta-secondary" href="#services" className="btn-secondary">
                  Explore Services
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="w-full mt-4"
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

        {/* ── MARQUEE ──────────────────────────────────────────────────────── */}
        <CompanyMarquee />

        {/* ── SERVICES ──────────────────────────────────────────────────────── */}
        <ServicesSection />


        {/* ── CTA BAND ──────────────────────────────────────────────────────── */}
        <section id="contact" className="section" aria-labelledby="contact-headline">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bento-card p-12 md:p-16 text-center flex flex-col items-center gap-8"
              style={{
                background: "linear-gradient(135deg, #1A1A1A 0%, #131320 50%, #1A1A1A 100%)",
                borderColor: "rgba(99, 91, 255, 0.25)",
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center top, rgba(99,91,255,0.12) 0%, transparent 60%)" }}
                aria-hidden="true"
              />

              <span className="badge relative z-10">
                <Sparkles size={12} />
                Let&apos;s Build Together
              </span>

              <h2
                id="contact-headline"
                className="text-4xl md:text-5xl font-bold tracking-tight relative z-10"
                style={{ letterSpacing: "-0.025em" }}
              >
                Ready to ship <span className="glow-text">something great?</span>
              </h2>

              <p className="text-base max-w-lg relative z-10" style={{ color: "var(--text-secondary)" }}>
                Drop us a line and let&apos;s talk about your next project. We typically respond within 24 hours.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                <MagneticButton id="contact-cta-primary" href="mailto:hello@huzagency.com">
                  <Mail size={18} />
                  Send us a message
                </MagneticButton>
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                  hello@huzagency.com
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* FOOTER                                                              */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <footer role="contentinfo" style={{ borderTop: "1px solid var(--border)" }}>

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
                <MagneticButton id="footer-cta-btn" href="mailto:hello@huzagency.com">
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

        {/* ─ Gradient divider ─────────────────────────────────────────────── */}
        <div className="footer-divider" aria-hidden="true" />

        {/* ─ 4-column bento grid ──────────────────────────────────────────── */}
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

            {/* Col 1: Brand */}
            <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <div
                  style={{
                    width: 30, height: 30, borderRadius: 9,
                    background: "linear-gradient(135deg, #635BFF 0%, #a78bfa 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 0 14px rgba(99,91,255,0.4)",
                  }}
                  aria-hidden="true"
                >
                  <Zap size={13} color="#fff" fill="#fff" />
                </div>
                <span style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.03em", color: "var(--text-primary)" }}>
                  HUZ<span style={{ color: "var(--accent)" }}>.</span>
                </span>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Engineered for speed,<br />built for scale.
              </p>

              <div className="flex items-center gap-2" aria-label="Social links">
                {SOCIAL_LINKS.map(({ Icon, href, label, id }) => (
                  <motion.a
                    key={label}
                    id={id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="footer-social-icon"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Icon size={15} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Cols 2–4: Link groups */}
            {FOOTER_COLS.map((col) => (
              <div key={col.heading} className="flex flex-col gap-4">
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  {col.heading}
                </span>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="footer-link">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Col 4: Contact & Status */}
            <div className="flex flex-col gap-4">
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                Contact
              </span>
              <div className="flex flex-col gap-3">
                <a href="mailto:hello@huzagency.com" className="footer-link" id="footer-email">
                  hello@huzagency.com
                </a>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Response within 24h<br />Mon – Fri, 9am – 6pm UTC
                </p>
                <div
                  className="flex items-center gap-1.5 w-fit"
                  style={{
                    padding: "4px 10px",
                    borderRadius: 100,
                    background: "rgba(34,197,94,0.08)",
                    border: "1px solid rgba(34,197,94,0.2)",
                    fontSize: "0.68rem",
                    fontWeight: 500,
                    color: "#4ade80",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  <span className="nav-status-dot" aria-hidden="true" />
                  All Systems Nominal
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ─ Bottom bar ───────────────────────────────────────────────────── */}
        <div className="footer-divider" aria-hidden="true" />
        <div className="container">
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ paddingTop: 20, paddingBottom: 20 }}
          >
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              &copy; {new Date().getFullYear()} HUZ Agency. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {["Privacy Policy", "Terms of Service"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs transition-colors duration-200"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}
