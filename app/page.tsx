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
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

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

  const Tag = href ? "a" : "button";

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
      {/* Background effects */}
      <div className="noise-overlay" aria-hidden="true" />
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />

      {/* Navbar */}
      <Navbar />

      <main>
        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section
          id="hero"
          className="section"
          style={{ paddingTop: "180px", paddingBottom: "140px" }}
          aria-labelledby="hero-headline"
        >
          <div className="container">
            <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
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

              {/* H1 Headline */}
              <motion.h1
                id="hero-headline"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[1.02]"
                style={{ letterSpacing: "-0.03em" }}
              >
                We Build the{" "}
                <span className="glow-text">Web of Tomorrow.</span>
              </motion.h1>

              {/* Sub-headline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl leading-relaxed max-w-2xl"
                style={{ color: "var(--text-secondary)" }}
              >
                HUZ is a premium agency crafting world-class web experiences and
                intelligent AI automation systems. From concept to deployment —
                we make ideas unforgettable.
              </motion.p>

              {/* CTA Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
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
                transition={{ duration: 0.8, delay: 0.5 }}
                className="w-full mt-8"
              >
                <div className="accent-line mb-8" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 + i * 0.08, duration: 0.5 }}
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
                Icon: Github,
                href: "https://github.com",
                label: "GitHub",
                id: "footer-github",
              },
              {
                Icon: Twitter,
                href: "https://twitter.com",
                label: "Twitter / X",
                id: "footer-twitter",
              },
              {
                Icon: Linkedin,
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
