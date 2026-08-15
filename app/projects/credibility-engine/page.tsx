"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Brain,
  Database,
  Network,
  Activity,
  Server,
  Layers,
  Cpu,
  Search,
  ShieldCheck,
  AlertTriangle,
  FileText,
  LineChart,
  Sparkles,
} from "lucide-react";
import ContactDrawer from "@/components/ContactDrawer";

// ─── Animation Variants ─────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Category Tags ──────────────────────────────────────────────────────────────
const CATEGORY_TAGS = ["Machine Learning", "Data Engineering", "NLP"];

// ─── Tech Stack Data ────────────────────────────────────────────────────────────
const STACK_ITEMS = [
  {
    name: "Python",
    role: "Data Engineering & MLOps",
    description:
      "The backbone of the entire data pipeline. Python orchestrates data ingestion, cleaning, vectorization, model training, and evaluation scripts, ensuring a scalable and maintainable machine learning architecture.",
    icon: <Cpu size={22} className="text-[#3776AB]" />,
    color: "#3776AB",
  },
  {
    name: "Scikit-learn",
    role: "Supervised & Unsupervised Modeling",
    description:
      "Leveraged for robust machine learning implementations. It powers our ensemble of 5 supervised classifiers (including Random Forest and SVM) as well as the unsupervised DBSCAN clustering algorithms.",
    icon: <Brain size={22} className="text-[#F7931E]" />,
    color: "#F7931E",
  },
  {
    name: "TF-IDF",
    role: "Linguistic Feature Extraction",
    description:
      "Term Frequency-Inverse Document Frequency is utilized to transform raw article text into high-dimensional numerical vectors, highlighting deceptive linguistic patterns and statistically significant word frequencies.",
    icon: <FileText size={22} className="text-[#a78bfa]" />,
    color: "#a78bfa",
  },
  {
    name: "Flask",
    role: "Lightweight API & Inference Engine",
    description:
      "A fast, lightweight web framework serving the trained models. It exposes RESTful API endpoints that consume article text and return real-time credibility scores and cluster assignments to downstream clients.",
    icon: <Server size={22} className="text-[#ffffff]" />,
    color: "#ffffff",
  },
];

// ─── Impact Metrics ─────────────────────────────────────────────────────────────
const IMPACT_METRICS = [
  {
    value: "250K+",
    label: "Articles Analyzed",
    detail: "High-throughput pipeline capable of processing massive text corpora",
  },
  {
    value: "92%",
    label: "Classification F1-Score",
    detail: "Consistent high accuracy across deceptive and reliable news categories",
  },
  {
    value: "5",
    label: "Ensemble Models",
    detail: "A voting mechanism ensuring robust and bias-resistant predictions",
  },
  {
    value: "<100ms",
    label: "Inference Latency",
    detail: "Real-time credibility scoring delivered via the Flask API",
  },
];

// ─── Architecture Cards ─────────────────────────────────────────────────────────
const ARCHITECTURE_CARDS = [
  {
    icon: <Search size={24} className="text-[#818cf8]" />,
    badge: "NLP Vectorization",
    badgeColor: "#818cf8",
    title: "TF-IDF Linguistic Profiling",
    body: "Misinformation often relies on specific linguistic signatures—hyperbolic phrasing, emotional manipulation, and repetitive deceptive constructs. By applying TF-IDF (Term Frequency-Inverse Document Frequency) vectorization, the engine converts thousands of raw articles into dense numerical matrices. This process algorithmically down-weights common stop words and highlights unique, highly discriminative language patterns that reliably separate factual reporting from fabricated content.",
    span: "md:col-span-1",
  },
  {
    icon: <ShieldCheck size={24} className="text-[#34d399]" />,
    badge: "Ensemble Modeling",
    badgeColor: "#34d399",
    title: "Multi-Model Classification Pipeline",
    body: "Relying on a single model for credibility scoring is brittle. Instead, the engine deploys an ensemble of five distinct supervised classifiers—ranging from Logistic Regression and Naive Bayes to Support Vector Machines and Random Forests. Each model analyzes the TF-IDF vectors independently, and their outputs are aggregated through a soft-voting mechanism. This ensemble approach drastically reduces overfitting and provides a highly calibrated confidence score for every article.",
    span: "md:col-span-1",
  },
  {
    icon: <Network size={24} className="text-[#f472b6]" />,
    badge: "Unsupervised Learning",
    badgeColor: "#f472b6",
    title: "DBSCAN Unsupervised Clustering",
    body: "Misinformation rarely exists in isolation; it spreads through coordinated campaigns and echo chambers. To detect emerging narratives before they are explicitly labeled, the engine utilizes DBSCAN (Density-Based Spatial Clustering of Applications with Noise). This unsupervised algorithm groups semantically similar articles together in high-dimensional space, instantly surfacing coordinated disinformation clusters and novel fake news trends without requiring prior human annotation.",
    span: "md:col-span-2",
  },
  {
    icon: <Activity size={24} className="text-[#fbbf24]" />,
    badge: "API Serving",
    badgeColor: "#fbbf24",
    title: "Flask Inference Engine",
    body: "Data science is only valuable when deployed into production. The entire NLP and machine learning pipeline is encapsulated within a lightweight, stateless Flask application. This API endpoint ingests raw text via POST requests, performs on-the-fly TF-IDF vectorization using serialized transformers, routes the data through the ensemble models, and returns a JSON payload containing the final credibility score and cluster metrics—all in under 100 milliseconds.",
    span: "md:col-span-2",
  },
];

// ─── Spotlight Card ─────────────────────────────────────────────────────────────
function ArchitectureCard({
  icon,
  badge,
  badgeColor,
  title,
  body,
  className = "",
}: {
  icon: React.ReactNode;
  badge: string;
  badgeColor: string;
  title: string;
  body: string;
  className?: string;
}) {
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
      variants={staggerItem}
      className={`group relative rounded-3xl border border-white/[0.08] bg-[#121212] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[#818cf8]/30 hover:shadow-[0_12px_40px_-12px_rgba(129,140,248,0.25)] ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(129, 140, 248, 0.10), transparent 80%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 p-8 md:p-10">
        <div className="flex items-center justify-between gap-4 mb-7">
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
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-3">
          {title}
        </h3>
        <p className="text-[0.92rem] text-white/60 leading-relaxed">{body}</p>
      </div>
    </motion.div>
  );
}

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
          x: [0, -30, 40, 0],
          y: [0, 25, -30, 0],
          scale: [1, 1.05, 0.95, 1],
          opacity: [0.3, 0.6, 0.3, 0.3],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          right: "15%",
          top: "-10%",
          width: 550,
          height: 550,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,91,255,0.15) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <motion.div
        animate={{
          x: [0, 40, -25, 0],
          y: [0, -30, 25, 0],
          opacity: [0.2, 0.5, 0.2, 0.2],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: -5 }}
        style={{
          position: "absolute",
          left: "5%",
          bottom: "15%",
          width: 500,
          height: 500,
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
            "radial-gradient(circle, rgba(167,139,250,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 80% 50% at 50% 35%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 50% at 50% 35%, black 20%, transparent 100%)",
          opacity: 0.4,
        }}
      />
    </div>
  );
}

// ─── Navigation ─────────────────────────────────────────────────────────────────
function SubpageNav() {
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
            <Link
              href="/#work"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200 text-sm font-medium group/back"
            >
              <ArrowLeft
                size={16}
                className="transition-transform duration-200 group-hover/back:-translate-x-0.5"
              />
              <span className="hidden sm:inline">Back to Work</span>
            </Link>
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
          <div className="hidden sm:flex items-center gap-2">
            <span
              className="text-xs font-mono px-3 py-1 rounded-lg"
              style={{
                background: "rgba(99,91,255,0.1)",
                border: "1px solid rgba(99,91,255,0.25)",
                color: "#a78bfa",
              }}
            >
              Case Study
            </span>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

// ─── ML Data Cluster Visual ─────────────────────────────────────────────────────
function MLClusterVisual() {
  const nodes = Array.from({ length: 45 }).map((_, i) => {
    // Generate scattered points with a rough center
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 140;
    const isCore = distance < 60;
    const isOutlier = distance > 120;
    
    return {
      id: i,
      x: 180 + Math.cos(angle) * distance,
      y: 180 + Math.sin(angle) * distance,
      size: isCore ? Math.random() * 6 + 4 : Math.random() * 4 + 2,
      color: isOutlier ? "#f87171" : isCore ? "#a78bfa" : "#635BFF",
      opacity: isOutlier ? 0.9 : Math.random() * 0.5 + 0.3,
      delay: Math.random() * 2,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl mx-auto max-w-3xl overflow-hidden"
      style={{
        border: "1px solid rgba(167,139,250,0.2)",
        background:
          "linear-gradient(145deg, rgba(18,18,18,0.95) 0%, rgba(20,14,35,0.85) 100%)",
        boxShadow:
          "0 0 80px rgba(99,91,255,0.10), 0 25px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "14px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="flex items-center gap-2">
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,95,87,0.7)" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,189,46,0.7)" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(39,201,63,0.7)" }} />
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
            model-inference — dbscan_cluster_view
          </span>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="relative w-full aspect-video min-h-[300px] flex items-center justify-center overflow-hidden">
        {/* Connection lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 360 360" preserveAspectRatio="xMidYMid meet">
          {nodes.map((node, i) => (
            nodes.slice(i + 1, i + 4).map((target) => {
              // Only connect close nodes to simulate density clustering
              const dx = node.x - target.x;
              const dy = node.y - target.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist > 40) return null;
              
              return (
                <motion.line
                  key={`line-${i}-${target.id}`}
                  x1={`${(node.x / 360) * 100}%`}
                  y1={`${(node.y / 360) * 100}%`}
                  x2={`${(target.x / 360) * 100}%`}
                  y2={`${(target.y / 360) * 100}%`}
                  stroke="rgba(167, 139, 250, 0.2)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: node.delay + 0.5, ease: "easeInOut" }}
                />
              );
            })
          ))}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute rounded-full"
            style={{
              left: `${(node.x / 360) * 100}%`,
              top: `${(node.y / 360) * 100}%`,
              width: node.size,
              height: node.size,
              backgroundColor: node.color,
              boxShadow: `0 0 ${node.size * 2}px ${node.color}`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              opacity: node.opacity,
            }}
            transition={{ 
              scale: { duration: 0.6, delay: node.delay },
              opacity: { duration: 0.3, delay: node.delay }
            }}
          />
        ))}

        {/* Radar Scanner Sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{
            border: "1px solid rgba(167,139,250,0.1)",
            left: "10%",
            right: "10%",
            top: "10%",
            bottom: "10%",
          }}
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0, 0.5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating overlays */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="absolute right-6 top-6 rounded-lg p-3 backdrop-blur-md"
          style={{ background: "rgba(10,10,10,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <AlertTriangle size={12} className="text-[#f87171]" />
            <span className="text-[10px] font-bold text-[#f87171] tracking-wider uppercase">Misinformation Detected</span>
          </div>
          <span className="text-xs text-white/70 block">Cluster Alpha-9</span>
          <span className="text-[10px] text-white/40 block mt-1">Confidence: 98.2%</span>
        </motion.div>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(0,0,0,0.2)",
        }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#a78bfa", boxShadow: "0 0 6px #a78bfa" }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <span
            className="text-[10px] font-mono"
            style={{ color: "var(--text-muted)" }}
          >
            Processing... 1,402 articles/sec · eps: 0.5 · min_samples: 5
          </span>
        </div>
        <span
          className="text-[10px] font-mono"
          style={{ color: "var(--text-muted)" }}
        >
          DBSCAN Active
        </span>
      </div>
    </motion.div>
  );
}

// ─── Stat Card ──────────────────────────────────────────────────────────────────
function StatCard({
  value,
  label,
  detail,
}: {
  value: string;
  label: string;
  detail: string;
}) {
  return (
    <motion.div
      variants={staggerItem}
      className="flex flex-col items-center text-center gap-3 flex-1 px-4 py-8"
    >
      <span
        className="text-xs font-semibold tracking-widest uppercase"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>
      <span
        className="text-4xl md:text-5xl font-black tracking-tight"
        style={{
          background:
            "linear-gradient(135deg, #ffffff 0%, #a78bfa 50%, #635BFF 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 0 20px rgba(99,91,255,0.2))",
          letterSpacing: "-0.04em",
        }}
      >
        {value}
      </span>
      <span
        className="text-sm max-w-[220px] leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {detail}
      </span>
    </motion.div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// PAGE COMPONENT
// ═════════════════════════════════════════════════════════════════════════════════
export default function CredibilityEnginePage() {
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
      <SubpageNav />

      <main>
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* HEADER                                                               */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        <section
          className="relative z-10 pt-40 pb-8 md:pt-48 md:pb-12"
          aria-labelledby="credibility-hero-headline"
        >
          <div className="container mx-auto max-w-4xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center justify-center gap-2 mb-8"
            >
              {CATEGORY_TAGS.map((tag) => (
                <span key={tag} className="badge">
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.h1
              id="credibility-hero-headline"
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
              style={{ letterSpacing: "-0.04em", lineHeight: 1.08 }}
            >
              AI-Powered
              <br />
              <span className="glow-text">Credibility Engine</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-6"
              style={{ color: "var(--text-secondary)" }}
            >
              Classifying and combating digital misinformation at scale. 
              A highly robust NLP pipeline that detects deceptive language patterns 
              and surfaces emerging fake news networks in real-time.
            </motion.p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* HERO VISUAL — Data Cluster Graph                                       */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        <section className="relative z-10 pb-16 md:pb-24">
          <div className="container mx-auto max-w-5xl px-6">
            <MLClusterVisual />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* THE MISINFORMATION EPIDEMIC — Layman Overview                        */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        <section
          className="relative z-10 py-20 md:py-28"
          aria-labelledby="epidemic-headline"
        >
          <div className="container mx-auto max-w-4xl px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="flex flex-col gap-6"
            >
              <motion.span variants={fadeUp} className="badge w-fit">
                <AlertTriangle size={12} />
                The Misinformation Epidemic
              </motion.span>

              <motion.h2
                id="epidemic-headline"
                variants={fadeUp}
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white"
                style={{ letterSpacing: "-0.025em" }}
              >
                Fake news travels fast.
                <br />
                <span className="glow-text">The response must be faster.</span>
              </motion.h2>

              <motion.div
                variants={fadeUp}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4"
              >
                <div
                  className="text-[0.95rem] leading-[1.8] flex flex-col gap-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <p>
                    Digital platforms face an escalating arms race against 
                    coordinated disinformation. Traditional moderation relies on 
                    human fact-checkers manually verifying claims or simple keyword 
                    blocklists. But misinformation evolves rapidly, changing keywords 
                    and spreading across networks faster than any human team can track.
                  </p>
                  <p>
                    By the time an article is manually flagged as false, the damage 
                    is often already done—it has gone viral, spawned dozens of 
                    copycat articles, and manipulated public perception. A reactive, 
                    human-in-the-loop approach simply cannot scale to the volume 
                    of modern content generation.
                  </p>
                </div>
                <div
                  className="text-[0.95rem] leading-[1.8] flex flex-col gap-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <p>
                    The Credibility Engine takes a fundamentally different approach. 
                    Instead of fact-checking individual claims, it analyzes the 
                    underlying linguistic DNA of the text. Deceptive content often 
                    exhibits distinct syntactic patterns: over-reliance on emotional 
                    hyperbole, rigid vocabulary structures, and predictable 
                    grammatical anomalies.
                  </p>
                  <p>
                    By vectorizing text and routing it through an ensemble of trained 
                    machine learning models, this system can instantly assign a 
                    confidence score to new articles. Furthermore, by clustering 
                    similar articles together in high-dimensional space, it can 
                    automatically highlight coordinated misinformation campaigns as 
                    they form—neutralizing the threat before it spreads.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* IMPACT METRICS                                                       */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        <section className="relative z-10 py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.span variants={fadeUp} className="badge inline-flex mb-4">
                <LineChart size={12} />
                System Impact
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-bold tracking-tight text-white"
                style={{ letterSpacing: "-0.025em" }}
              >
                Scalable analysis.{" "}
                <span className="glow-text">Actionable intelligence.</span>
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="relative rounded-3xl border border-white/[0.08] overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(18,18,18,0.95) 0%, rgba(20,14,35,0.85) 50%, rgba(18,18,18,0.95) 100%)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(167,139,250,0.06) 0%, transparent 100%)",
                }}
                aria-hidden="true"
              />
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
                {IMPACT_METRICS.map((metric) => (
                  <StatCard
                    key={metric.label}
                    value={metric.value}
                    label={metric.label}
                    detail={metric.detail}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* TECH STACK GRID                                                       */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        <section
          className="relative z-10 py-20 md:py-28"
          aria-labelledby="engine-stack-headline"
        >
          <div className="container mx-auto max-w-6xl px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col gap-4 mb-16 text-center items-center"
            >
              <motion.span variants={fadeUp} className="badge w-fit">
                <Layers size={12} />
                Data Engineering Stack
              </motion.span>
              <motion.h2
                id="engine-stack-headline"
                variants={fadeUp}
                className="text-3xl md:text-5xl font-bold tracking-tight text-white"
                style={{ letterSpacing: "-0.025em" }}
              >
                Robust tooling.{" "}
                <span className="glow-text">Precision MLOps.</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-base md:text-lg max-w-2xl"
                style={{ color: "var(--text-secondary)" }}
              >
                A modern data science architecture built for speed and reliability, 
                moving seamlessly from exploratory analysis to a deployed API.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {STACK_ITEMS.map((item) => (
                <motion.div
                  key={item.name}
                  variants={staggerItem}
                  className="group relative rounded-2xl border border-white/[0.08] bg-[#121212] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.15] hover:shadow-card-hover"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `${item.color}15`,
                        border: `1px solid ${item.color}35`,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {item.name}
                      </h3>
                      <span
                        className="text-xs font-mono mt-0.5 block"
                        style={{ color: item.color }}
                      >
                        {item.role}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* CORE ARCHITECTURE — Bento Grid                                        */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        <section
          className="relative z-10 py-20 md:py-28"
          aria-labelledby="engine-arch-headline"
        >
          <div className="container mx-auto max-w-6xl px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col gap-4 mb-16 text-center items-center"
            >
              <motion.span variants={fadeUp} className="badge w-fit">
                <Database size={12} />
                Model Architecture
              </motion.span>
              <motion.h2
                id="engine-arch-headline"
                variants={fadeUp}
                className="text-3xl md:text-5xl font-bold tracking-tight text-white"
                style={{ letterSpacing: "-0.025em" }}
              >
                From raw text to{" "}
                <span className="glow-text">real-time classification.</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-base md:text-lg max-w-2xl"
                style={{ color: "var(--text-secondary)" }}
              >
                A multi-stage machine learning pipeline combining NLP feature 
                extraction, supervised ensemble voting, and unsupervised clustering 
                to maximize detection accuracy.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {ARCHITECTURE_CARDS.map((card) => (
                <ArchitectureCard
                  key={card.title}
                  icon={card.icon}
                  badge={card.badge}
                  badgeColor={card.badgeColor}
                  title={card.title}
                  body={card.body}
                  className={card.span}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* CTA / CLOSING                                                         */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        <section
          className="relative z-10 py-20 md:py-28"
          aria-labelledby="engine-cta-headline"
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
                borderColor: "rgba(167, 139, 250, 0.25)",
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center top, rgba(167,139,250,0.10) 0%, transparent 60%)",
                }}
                aria-hidden="true"
              />

              <span className="badge relative z-10">
                <Sparkles size={12} />
                Deploy Machine Learning
              </span>

              <h2
                id="engine-cta-headline"
                className="text-3xl md:text-5xl font-bold tracking-tight relative z-10"
                style={{ letterSpacing: "-0.025em" }}
              >
                Have a complex dataset
                <br />
                <span className="glow-text">that needs intelligence?</span>
              </h2>

              <p
                className="text-base max-w-lg relative z-10"
                style={{ color: "var(--text-secondary)" }}
              >
                Whether you need predictive modeling, natural language processing, 
                or automated clustering, we build robust ML pipelines that turn raw 
                data into actionable, deployed systems.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                <button
                  onClick={openDrawer}
                  className="btn-primary"
                >
                  Discuss a Data Project
                  <ArrowUpRight size={18} />
                </button>
                <Link
                  href="/#work"
                  className="btn-secondary text-sm"
                >
                  View All Work
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
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
              <Link
                href="/#work"
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
                Back to Work
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Contact Drawer ───────────────────────────────────────────────── */}
      <ContactDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
}
