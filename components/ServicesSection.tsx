"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Globe,
  BarChart3,
  Code2,
  PenTool,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

// ─── Bento Card Wrapper with Spotlight Hover Effect ─────────────────────────────
interface BentoBoxProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: string;
  index: number;
}

function BentoBox({ children, className = "", colSpan = "", index }: BentoBoxProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-3xl border border-white/10 bg-[#121212] p-8 md:p-10 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[#635BFF]/40 hover:shadow-[0_12px_40px_-12px_rgba(99,91,255,0.35)] flex flex-col justify-between ${colSpan} ${className}`}
    >
      {/* Spotlight hover effect tracking mouse position */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(99, 91, 255, 0.15), transparent 80%)",
        }}
        aria-hidden="true"
      />

      {children}
    </motion.div>
  );
}

// ─── Badge Component ──────────────────────────────────────────────────────────
function ServiceBadge({
  label,
  accent = "#635BFF",
}: {
  label: string;
  accent?: string;
}) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase w-fit transition-all duration-300"
      style={{
        background: `${accent}15`,
        border: `1px solid ${accent}35`,
        color: accent,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: accent,
          boxShadow: `0 0 8px ${accent}`,
        }}
      />
      {label}
    </div>
  );
}

// ─── ServicesSection Component ────────────────────────────────────────────────
export default function ServicesSection() {
  return (
    <section
      id="services"
      className="section relative z-10 py-24"
      aria-labelledby="services-headline"
    >
      <div className="container mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 mb-16"
        >
          <ServiceBadge label="Capabilities" accent="#a78bfa" />
          <h2
            id="services-headline"
            className="text-4xl md:text-5xl font-bold tracking-tight text-white"
            style={{ letterSpacing: "-0.025em" }}
          >
            Fewer bottlenecks.
            <br />
            <span className="text-[#635BFF]">Infinite scalability.</span>
          </h2>
          <p className="text-base md:text-lg max-w-xl text-white/70">
            We engineer bespoke digital systems that eliminate repetitive manual labor. Fast web apps to acquire users, and intelligent AI workflows to handle the rest.
          </p>
        </motion.div>

        {/* ── Asymmetrical Bento Grid (6-Column Container for 50/50 Top Row & 33/33/33 Bottom Row) ── */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* ── Card 1: AI Automation Systems (Flagship 50% Top Row, spans 3 cols) ──────── */}
          <BentoBox index={0} colSpan="md:col-span-3">
            {/* Texture: Dot-matrix pattern + pulsing violet radial glow */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(#334155 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
              aria-hidden="true"
            />
            <motion.div
              animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.05, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-20 -top-20 w-96 h-96 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(99,91,255,0.22) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
              aria-hidden="true"
            />

            {/* Top Row: Icon + Badge */}
            <div className="relative z-10 flex items-center justify-between gap-4 mb-12">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "rgba(167, 139, 250, 0.12)",
                  border: "1px solid rgba(167, 139, 250, 0.3)",
                }}
              >
                <Cpu size={24} className="text-[#a78bfa]" />
              </div>
              <ServiceBadge label="FLAGSHIP" accent="#a78bfa" />
            </div>

            {/* Bottom Content + CTA */}
            <div className="relative z-10 flex flex-col justify-between gap-6 h-full">
              <div className="flex flex-col gap-3 max-w-xl">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                  AI Automation Systems
                </h3>
                <p className="text-base text-white/70 leading-relaxed">
                  We build smart, general AI systems that automate your repetitive
                  tasks, saving you time and helping your business run smoothly
                  without constant human oversight.
                </p>
              </div>

              <a href="/services/ai-automation" className="flex items-center gap-1 text-sm font-semibold text-[#a78bfa] transition-transform duration-200 group-hover:translate-x-1 shrink-0">
                <span>Explore AI Systems</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </BentoBox>

          {/* ── Card 2: Web Development (Custom & WordPress) (Flagship 50% Top Row, spans 3 cols) ── */}
          <BentoBox index={1} colSpan="md:col-span-3">
            {/* Texture: Architectural grid mesh + Illuminated top border highlight */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#635BFF] to-transparent opacity-80"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 pointer-events-none opacity-25"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
              aria-hidden="true"
            />

            {/* Top Row: Icon + Badge */}
            <div className="relative z-10 flex items-center justify-between gap-4 mb-12">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "rgba(99, 91, 255, 0.12)",
                  border: "1px solid rgba(99, 91, 255, 0.3)",
                }}
              >
                <Globe size={24} className="text-[#635BFF]" />
              </div>
              <ServiceBadge label="FLAGSHIP" accent="#635BFF" />
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 flex flex-col justify-between gap-6 h-full">
              <div className="flex flex-col gap-3 max-w-xl">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                  Web Development (Custom &amp; WordPress)
                </h3>
                <p className="text-base text-white/70 leading-relaxed">
                  From high-performance custom coded applications to easy-to-manage
                  WordPress sites, we build fast, reliable websites designed to grow
                  with your business and drive sales.
                </p>
              </div>

              <a href="/services/web-development" className="flex items-center gap-1 text-sm font-semibold text-[#635BFF] transition-transform duration-200 group-hover:translate-x-1 shrink-0">
                <span>Explore Web Dev</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </BentoBox>

          {/* ── Card 3: Data & Analytics (Bottom Row, spans 2 cols = 33.3%) ───────── */}
          <BentoBox index={2} colSpan="md:col-span-2">
            {/* Texture: Faint animated vector bar chart graphic in bottom corner */}
            <div
              className="absolute -right-4 -bottom-4 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity duration-300"
              aria-hidden="true"
            >
              <svg width="180" height="130" viewBox="0 0 180 130" fill="none">
                <rect x="20" y="80" width="22" height="40" rx="4" fill="#818cf8" />
                <rect x="52" y="55" width="22" height="65" rx="4" fill="#818cf8" />
                <rect x="84" y="30" width="22" height="90" rx="4" fill="#635BFF" />
                <rect x="116" y="45" width="22" height="75" rx="4" fill="#a78bfa" />
                <rect x="148" y="15" width="22" height="105" rx="4" fill="#818cf8" />
                <path
                  d="M31 75L63 50L95 25L127 40L159 10"
                  stroke="#818cf8"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Top Row */}
            <div className="relative z-10 flex items-center justify-between gap-4 mb-10">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "rgba(129, 140, 248, 0.12)",
                  border: "1px solid rgba(129, 140, 248, 0.3)",
                }}
              >
                <BarChart3 size={24} className="text-[#818cf8]" />
              </div>
              <ServiceBadge label="GROWTH" accent="#818cf8" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between gap-6 h-full">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold tracking-tight text-white">
                  Data &amp; Analytics
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Easy-to-understand dashboards that show exactly how your business
                  is performing in real-time, helping you make better decisions.
                </p>
              </div>

              <a href="/services/data-analytics" className="flex items-center gap-1 text-sm font-semibold text-[#818cf8] transition-transform duration-200 group-hover:translate-x-1">
                <span>Explore Analytics</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </BentoBox>

          {/* ── Card 4: Software Integration (Bottom Row, spans 2 cols = 33.3%) ────── */}
          <BentoBox index={3} colSpan="md:col-span-2">
            {/* Texture: Styled terminal code snippet faded in background */}
            <div
              className="absolute inset-0 p-6 pointer-events-none opacity-10 font-mono text-xs overflow-hidden select-none flex flex-col justify-end text-right"
              aria-hidden="true"
            >
              <pre className="text-emerald-400">
                {`const api = await huZAgent.deploy({
  target: "edge-global",
  concurrency: 10000,
  zeroDowntime: true
});
// => Deploy status: 200 OK
// => Latency: 12ms (p99)`}
              </pre>
            </div>

            {/* Top Row */}
            <div className="relative z-10 flex items-center justify-between gap-4 mb-10">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "rgba(99, 91, 255, 0.12)",
                  border: "1px solid rgba(99, 91, 255, 0.3)",
                }}
              >
                <Code2 size={24} className="text-[#635BFF]" />
              </div>
              <ServiceBadge label="DEV" accent="#635BFF" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between gap-6 h-full">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold tracking-tight text-white">
                  Software Integration
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  We connect all your favorite apps and software tools together
                  so they share data automatically and work as one seamless system.
                </p>
              </div>

              <a href="/services/software-integration" className="flex items-center gap-1 text-sm font-semibold text-[#635BFF] transition-transform duration-200 group-hover:translate-x-1">
                <span>Explore Integration</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </BentoBox>

          {/* ── Card 5: UI/UX Design (Bottom Row, spans 2 cols = 33.3%) ───────────── */}
          <BentoBox index={4} colSpan="md:col-span-2">
            {/* Texture: Overlapping geometric glass wireframe shapes in 3D perspective */}
            <div
              className="absolute -right-10 -bottom-10 pointer-events-none opacity-15 group-hover:opacity-25 transition-opacity duration-300"
              aria-hidden="true"
            >
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                <polygon
                  points="100,20 180,60 180,140 100,180 20,140 20,60"
                  stroke="#c4b5fd"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <polygon
                  points="100,50 160,80 160,130 100,160 40,130 40,80"
                  stroke="#635BFF"
                  strokeWidth="2"
                />
                <line x1="100" y1="20" x2="100" y2="180" stroke="#c4b5fd" strokeWidth="1" />
                <line x1="20" y1="60" x2="180" y2="140" stroke="#c4b5fd" strokeWidth="1" />
                <line x1="180" y1="60" x2="20" y2="140" stroke="#c4b5fd" strokeWidth="1" />
              </svg>
            </div>

            {/* Top Row */}
            <div className="relative z-10 flex items-center justify-between gap-4 mb-10">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "rgba(196, 181, 253, 0.12)",
                  border: "1px solid rgba(196, 181, 253, 0.3)",
                }}
              >
                <PenTool size={22} className="text-[#c4b5fd]" />
              </div>
              <ServiceBadge label="DESIGN" accent="#c4b5fd" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between gap-6 h-full">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold tracking-tight text-white">
                  UI/UX Design
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Clean, beautiful, and intuitive designs that make your
                  customers love using your website or application.
                </p>
              </div>

              <div className="flex items-center gap-1 text-sm font-semibold text-[#c4b5fd] transition-transform duration-200 group-hover:translate-x-1">
                <span>Learn more</span>
                <ChevronRight size={16} />
              </div>
            </div>
          </BentoBox>
        </div>
      </div>
    </section>
  );
}
