"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Globe,
  Bot,
  BarChart3,
  Code2,
  Layers,
  Sparkles,
  ChevronRight,
  Mail,
} from "lucide-react";

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
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Noise grain */}
      <div className="noise-overlay" />

      {/* Floating glowing orbs */}
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
          transition={{
            duration: orb.dur,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Drifting particles */}
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
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle architectural grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(99,91,255,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
          opacity: 0.35,
        }}
      />
    </div>
  );
}

// ─── Animated headline — per-word stagger reveal ───────────────────────────────
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
          transition={{
            duration: 0.65,
            delay: 0.15 + i * 0.11,
            ease: [0.22, 1, 0.36, 1],
          }}
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
    const distX = (e.clientX - centerX) * 0.35;
    const distY = (e.clientY - centerY) * 0.35;
    x.set(distX);
    y.set(distY);
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
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} aria-label="Main navigation">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "var(--accent)" }}
            aria-hidden="true"
          >
            <Zap size={16} color="#fff" fill="#fff" />
          </div>
          <span className="font-bold text-xl tracking-tight" style={{ color: "var(--text-primary)" }}>
            HUZ<span style={{ color: "var(--accent)" }}>.</span>
          </span>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center gap-8"
        >
          {["Services", "Work", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              {item}
            </a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="#contact"
            id="nav-cta"
            className="btn-secondary text-sm py-2 px-5 hidden md:inline-flex"
          >
            Get in touch
          </a>
        </motion.div>
      </div>
    </nav>
  );
}

// ─── Services Data ─────────────────────────────────────────────────────────────
const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Blazing-fast, production-grade web apps built with Next.js, TypeScript, and modern tooling — engineered for scale.",
    tag: "Core",
    accent: "#635BFF",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description:
      "Custom LLM pipelines, agentic workflows, and intelligent bots that automate repetitive processes end-to-end.",
    tag: "Flagship",
    accent: "#a78bfa",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description:
      "Data-driven dashboards and real-time intelligence layers that surface what matters most to your business.",
    tag: "Growth",
    accent: "#818cf8",
  },
  {
    icon: Code2,
    title: "API & Integrations",
    description:
      "Seamlessly connect your stack with third-party services, internal tools, and emerging AI APIs.",
    tag: "Dev",
    accent: "#635BFF",
  },
  {
    icon: Layers,
    title: "Design Systems",
    description:
      "Scalable component libraries and design tokens that keep your product consistent across every touchpoint.",
    tag: "Design",
    accent: "#c4b5fd",
  },
  {
    icon: Sparkles,
    title: "AI Consulting",
    description:
      "Strategic guidance on implementing AI across your organisation — from opportunity mapping to production rollout.",
    tag: "Strategy",
    accent: "#a78bfa",
  },
];

// ─── Bento Card ────────────────────────────────────────────────────────────────
function BentoCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="bento-card p-8 flex flex-col gap-5 group cursor-default"
      role="article"
      aria-label={`${service.title} service`}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
        style={{
          background: `${service.accent}18`,
          border: `1px solid ${service.accent}30`,
        }}
      >
        <Icon
          size={22}
          style={{ color: service.accent }}
          className="transition-all duration-300 group-hover:scale-110"
        />
      </div>

      {/* Badge */}
      <span
        className="badge w-fit"
        style={{
          background: `${service.accent}12`,
          borderColor: `${service.accent}35`,
          color: service.accent,
        }}
      >
        {service.tag}
      </span>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3
          className="text-lg font-semibold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {service.title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {service.description}
        </p>
      </div>

      {/* Learn more link */}
      <div className="mt-auto">
        <span
          className="flex items-center gap-1 text-sm font-medium transition-all duration-200 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1"
          style={{ color: service.accent }}
        >
          Learn more <ChevronRight size={14} />
        </span>
      </div>
    </motion.div>
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
              {/* Eyebrow badge */}
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

              {/* H1 — animated word reveal */}
              <AnimatedHeadline />

              {/* Sub-headline */}
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

              {/* CTA Row */}
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
                <a
                  id="hero-cta-secondary"
                  href="#services"
                  className="btn-secondary"
                >
                  Explore Services
                </a>
              </motion.div>

              {/* Stats row */}
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

        {/* ── SERVICES ──────────────────────────────────────────────────────── */}
        <section
          id="services"
          className="section"
          aria-labelledby="services-headline"
        >
          <div className="container">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4 mb-16"
            >
              <span className="badge w-fit">
                <Layers size={12} />
                What We Do
              </span>
              <h2
                id="services-headline"
                className="text-4xl md:text-5xl font-bold tracking-tight"
                style={{ letterSpacing: "-0.025em" }}
              >
                Full-stack expertise,
                <br />
                <span className="glow-text">end-to-end.</span>
              </h2>
              <p
                className="text-base max-w-lg"
                style={{ color: "var(--text-secondary)" }}
              >
                From pixel-perfect UIs to production AI agents — we cover every
                layer of the modern digital stack.
              </p>
            </motion.div>

            {/* 3x2 Bento Grid */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              role="list"
              aria-label="Services offered by HUZ"
            >
              {services.map((service, i) => (
                <BentoCard key={service.title} service={service} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BAND ──────────────────────────────────────────────────────── */}
        <section
          id="contact"
          className="section"
          aria-labelledby="contact-headline"
        >
          <div className="container">
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
              {/* Decorative glow */}
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
                Let&apos;s Build Together
              </span>

              <h2
                id="contact-headline"
                className="text-4xl md:text-5xl font-bold tracking-tight relative z-10"
                style={{ letterSpacing: "-0.025em" }}
              >
                Ready to ship{" "}
                <span className="glow-text">something great?</span>
              </h2>

              <p
                className="text-base max-w-lg relative z-10"
                style={{ color: "var(--text-secondary)" }}
              >
                Drop us a line and let&apos;s talk about your next project. We
                typically respond within 24 hours.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                <MagneticButton
                  id="contact-cta-primary"
                  href="mailto:hello@huzagency.com"
                >
                  <Mail size={18} />
                  Send us a message
                </MagneticButton>
                <span
                  className="text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  hello@huzagency.com
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer
        className="footer-gradient border-t"
        style={{ borderColor: "var(--border)" }}
        role="contentinfo"
      >
        <div className="container py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "var(--accent)" }}
              aria-hidden="true"
            >
              <Zap size={14} color="#fff" fill="#fff" />
            </div>
            <span
              className="font-bold text-lg tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              HUZ<span style={{ color: "var(--accent)" }}>.</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} HUZ Agency. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4" aria-label="Social links">
            {[
              {
                Icon: GithubIcon,
                href: "https://github.com",
                label: "GitHub",
                id: "footer-github",
              },
              {
                Icon: TwitterXIcon,
                href: "https://twitter.com",
                label: "Twitter / X",
                id: "footer-twitter",
              },
              {
                Icon: LinkedinIcon,
                href: "https://linkedin.com",
                label: "LinkedIn",
                id: "footer-linkedin",
              },
            ].map(({ Icon, href, label, id }) => (
              <a
                key={label}
                id={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-accent)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
