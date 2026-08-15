"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  Brain,
  Webhook,
  MessageSquareText,
  ShieldAlert,
  Clock,
  Layers,
  Cpu,
  Server,
  Workflow,
  Gauge,
  MailWarning,
  Tag,
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
const CATEGORY_TAGS = ["AI Automation", "NLP", "Customer Support"];

// ─── Tech Stack Data ────────────────────────────────────────────────────────────
const STACK_ITEMS = [
  {
    name: "Python",
    role: "Core Runtime & Orchestration",
    description:
      "The entire pipeline — from webhook ingestion through classification to response generation — runs on Python 3.11+ with async/await throughout. Type-hinted, linted, and structured for production reliability.",
    icon: <Cpu size={22} className="text-[#3776AB]" />,
    color: "#3776AB",
  },
  {
    name: "LLM APIs",
    role: "Language Intelligence Layer",
    description:
      "GPT-4o and Claude models power urgency classification, topic extraction, and response drafting. Prompts are version-controlled and A/B tested against labeled ticket corpora for accuracy regression tracking.",
    icon: <Brain size={22} className="text-[#a78bfa]" />,
    color: "#a78bfa",
  },
  {
    name: "LangChain / LangGraph",
    role: "Multi-Agent Orchestration",
    description:
      "LangGraph coordinates a stateful agent graph where each node — classifier, retriever, drafter, escalation checker — executes independently and passes structured state to the next. Retries and fallbacks are built into the graph edges.",
    icon: <Workflow size={22} className="text-[#22d3ee]" />,
    color: "#22d3ee",
  },
  {
    name: "FastAPI",
    role: "Webhook Gateway & REST API",
    description:
      "Async FastAPI endpoints catch inbound webhooks from Zendesk, Intercom, or custom ticketing systems. Pydantic models validate every payload before it enters the processing pipeline. Health checks and Prometheus metrics are exposed by default.",
    icon: <Server size={22} className="text-[#009688]" />,
    color: "#009688",
  },
];

// ─── Impact Metrics ─────────────────────────────────────────────────────────────
const IMPACT_METRICS = [
  {
    value: "<2s",
    label: "Triage Latency",
    detail: "From webhook receipt to fully categorized, tagged, and routed ticket",
  },
  {
    value: "94%",
    label: "Classification Accuracy",
    detail: "Urgency and topic labels validated against human-reviewed datasets",
  },
  {
    value: "70%",
    label: "First-Response Automation",
    detail: "Tickets resolved or responded to without human agent involvement",
  },
  {
    value: "24/7",
    label: "Uptime Coverage",
    detail: "No shift gaps, no queue buildup — the pipeline never sleeps",
  },
];

// ─── Architecture Cards ─────────────────────────────────────────────────────────
const ARCHITECTURE_CARDS = [
  {
    icon: <Tag size={24} className="text-[#818cf8]" />,
    badge: "CLASSIFICATION",
    badgeColor: "#818cf8",
    title: "NLP Urgency & Topic Tagging",
    body: "Every incoming ticket passes through a two-stage classification pipeline. Stage one: a fine-tuned prompt chain analyzes sentiment polarity, detects frustration markers, and assigns an urgency tier (P0 through P3). Stage two: a topic extractor maps the ticket body to a predefined taxonomy — billing disputes, authentication failures, feature requests, onboarding friction — using few-shot contextual examples. Both stages run concurrently, and the combined output is written to a structured schema before downstream routing begins.",
    span: "md:col-span-1",
  },
  {
    icon: <Webhook size={24} className="text-[#22d3ee]" />,
    badge: "INGESTION",
    badgeColor: "#22d3ee",
    title: "High-Speed Webhook Ingestion",
    body: "FastAPI endpoints accept inbound payloads from any ticketing platform — Zendesk, Intercom, Freshdesk, or custom REST sources. Each webhook is validated against a Pydantic schema, deduplicated via idempotency keys, and pushed into an async processing queue. The ingestion layer handles burst traffic gracefully, buffering spikes without dropping tickets. Structured logging captures every payload for post-hoc audit and debugging.",
    span: "md:col-span-1",
  },
  {
    icon: <MessageSquareText size={24} className="text-[#a78bfa]" />,
    badge: "RAG PIPELINE",
    badgeColor: "#a78bfa",
    title: "Autonomous Response Drafting",
    body: "A multi-agent RAG pipeline retrieves relevant knowledge base articles, past resolution patterns, and product documentation to generate context-aware draft responses. The retriever queries a vector store of historical tickets and help center content. The drafter synthesizes retrieved context with the current ticket body, producing a response that mirrors the brand's tone and addresses the specific issue. Drafts are confidence-scored — high-confidence responses auto-send; lower scores are queued for human review.",
    span: "md:col-span-2",
  },
  {
    icon: <ShieldAlert size={24} className="text-[#f87171]" />,
    badge: "ESCALATION",
    badgeColor: "#f87171",
    title: "Intelligent Escalation Engine",
    body: "Not every ticket should be handled by automation. The escalation engine identifies signals that demand immediate human attention: VIP account flags, legal or compliance keywords, repeat contacts from the same user within a short window, and extreme negative sentiment scores. Flagged tickets bypass the auto-response pipeline entirely and are routed to the appropriate team lead with a pre-built context summary — so the human agent picks up with full situational awareness, not a cold start.",
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
          x: [0, 40, -30, 0],
          y: [0, -25, 30, 0],
          scale: [1, 1.08, 0.96, 1],
          opacity: [0.4, 0.7, 0.35, 0.4],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: "15%",
          top: "-8%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(167,139,250,0.14) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <motion.div
        animate={{
          x: [0, -40, 25, 0],
          y: [0, 30, -25, 0],
          opacity: [0.3, 0.55, 0.25, 0.3],
        }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut", delay: -10 }}
        style={{
          position: "absolute",
          right: "8%",
          bottom: "10%",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,91,255,0.12) 0%, transparent 70%)",
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
            "radial-gradient(ellipse 70% 50% at 50% 35%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 50% at 50% 35%, black 20%, transparent 100%)",
          opacity: 0.35,
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

// ─── AI Pipeline Visual ─────────────────────────────────────────────────────────
function AIPipelineVisual() {
  const pipelineStages = [
    { label: "Ingest", icon: <Webhook size={14} />, status: "done" },
    { label: "Classify", icon: <Tag size={14} />, status: "done" },
    { label: "Retrieve", icon: <Brain size={14} />, status: "active" },
    { label: "Draft", icon: <MessageSquareText size={14} />, status: "pending" },
    { label: "Route", icon: <Workflow size={14} />, status: "pending" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl overflow-hidden mx-auto max-w-4xl"
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
            triage-agent — pipeline monitor
          </span>
        </div>
      </div>

      {/* Pipeline content */}
      <div className="relative p-6 md:p-10" style={{ minHeight: 340 }}>
        {/* Pipeline stages visualization */}
        <div className="flex flex-col gap-6">
          {/* Stage progress bar */}
          <div className="flex items-center justify-between gap-2 md:gap-4">
            {pipelineStages.map((stage, idx) => (
              <div key={stage.label} className="flex items-center gap-2 md:gap-3 flex-1">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + idx * 0.12 }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div
                    className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        stage.status === "done"
                          ? "rgba(34,197,94,0.15)"
                          : stage.status === "active"
                          ? "rgba(99,91,255,0.2)"
                          : "rgba(255,255,255,0.04)",
                      border: `1px solid ${
                        stage.status === "done"
                          ? "rgba(34,197,94,0.3)"
                          : stage.status === "active"
                          ? "rgba(99,91,255,0.4)"
                          : "rgba(255,255,255,0.08)"
                      }`,
                      color:
                        stage.status === "done"
                          ? "#4ade80"
                          : stage.status === "active"
                          ? "#a78bfa"
                          : "var(--text-muted)",
                    }}
                  >
                    {stage.icon}
                  </div>
                  <span
                    className="text-[10px] font-medium uppercase tracking-wider"
                    style={{
                      color:
                        stage.status === "done"
                          ? "#4ade80"
                          : stage.status === "active"
                          ? "#a78bfa"
                          : "var(--text-muted)",
                    }}
                  >
                    {stage.label}
                  </span>
                </motion.div>
                {idx < pipelineStages.length - 1 && (
                  <div
                    className="flex-1 h-px hidden md:block"
                    style={{
                      background:
                        stage.status === "done"
                          ? "rgba(34,197,94,0.3)"
                          : "rgba(255,255,255,0.06)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Active ticket card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="rounded-xl p-4 md:p-5"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MailWarning size={14} style={{ color: "#f87171" }} />
                <span className="text-xs font-mono" style={{ color: "#818cf8" }}>
                  TKT-2847
                </span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase"
                  style={{
                    background: "rgba(248,113,113,0.15)",
                    border: "1px solid rgba(248,113,113,0.3)",
                    color: "#f87171",
                  }}
                >
                  P0 — Urgent
                </span>
              </div>
              <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                1.2s ago
              </span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed mb-3">
              &quot;I&apos;ve been charged three times for the same subscription renewal. This
              is the second time I&apos;m writing about this. I need an immediate refund
              or I&apos;m escalating to my bank.&quot;
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: "rgba(99,91,255,0.12)",
                  border: "1px solid rgba(99,91,255,0.25)",
                  color: "#a78bfa",
                }}
              >
                billing-dispute
              </span>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: "rgba(248,113,113,0.1)",
                  border: "1px solid rgba(248,113,113,0.25)",
                  color: "#f87171",
                }}
              >
                repeat-contact
              </span>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: "rgba(251,191,36,0.1)",
                  border: "1px solid rgba(251,191,36,0.25)",
                  color: "#fbbf24",
                }}
              >
                sentiment: -0.87
              </span>
            </div>
          </motion.div>

          {/* Agent action log */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.3 }}
            className="rounded-xl p-4"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="text-[10px] uppercase tracking-wider mb-2.5 font-semibold"
              style={{ color: "var(--text-muted)" }}
            >
              Agent Activity Log
            </div>
            {[
              { time: "00:00.00", msg: "Webhook received — payload validated", color: "#4ade80" },
              { time: "00:00.34", msg: "Urgency classified → P0 (frustration + repeat contact)", color: "#f87171" },
              { time: "00:00.81", msg: "Topic tagged → billing-dispute (confidence: 0.97)", color: "#a78bfa" },
              { time: "00:01.12", msg: "Escalation triggered — routing to billing-lead@support", color: "#fbbf24" },
            ].map((log, idx) => (
              <motion.div
                key={log.time}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 1.4 + idx * 0.15 }}
                className="flex items-start gap-3 py-1.5"
                style={{
                  borderBottom: idx < 3 ? "1px solid rgba(255,255,255,0.03)" : "none",
                }}
              >
                <span
                  className="text-[10px] font-mono shrink-0 mt-px"
                  style={{ color: "var(--text-muted)" }}
                >
                  {log.time}
                </span>
                <span className="text-[11px]" style={{ color: log.color }}>
                  {log.msg}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Glow overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 30% 70%, rgba(167,139,250,0.05) 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />
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
            style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span
            className="text-[10px] font-mono"
            style={{ color: "var(--text-muted)" }}
          >
            Pipeline Active · 847 tickets triaged today · avg 1.4s
          </span>
        </div>
        <span
          className="text-[10px] font-mono"
          style={{ color: "var(--text-muted)" }}
        >
          LangGraph v0.2
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
export default function TriageBotPage() {
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
          aria-labelledby="triage-hero-headline"
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
              id="triage-hero-headline"
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
              Customer Support Ticket
              <br />
              <span className="glow-text">Triage Bot</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-6"
              style={{ color: "var(--text-secondary)" }}
            >
              Smarter, faster ticket routing via autonomous AI. An NLP-powered
              pipeline that reads, classifies, drafts responses, and escalates —
              all before a human agent opens their inbox.
            </motion.p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* HERO VISUAL — AI Pipeline Dashboard                                  */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        <section className="relative z-10 pb-16 md:pb-24">
          <div className="container mx-auto max-w-5xl px-6">
            <AIPipelineVisual />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* THE SUPPORT BOTTLENECK — Layman Overview                             */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        <section
          className="relative z-10 py-20 md:py-28"
          aria-labelledby="bottleneck-headline"
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
                <Gauge size={12} />
                The Support Bottleneck
              </motion.span>

              <motion.h2
                id="bottleneck-headline"
                variants={fadeUp}
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white"
                style={{ letterSpacing: "-0.025em" }}
              >
                What happens when your queue
                <br />
                <span className="glow-text">grows faster than your team?</span>
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
                    Support teams don&apos;t fail because they&apos;re slow — they fail
                    because the incoming volume overwhelms their capacity to triage.
                    When 300 tickets hit the queue overnight and a human agent has
                    to manually read each one, decide its urgency, tag its category,
                    and route it to the right specialist — critical issues get buried
                    under a pile of password resets and shipping updates.
                  </p>
                  <p>
                    The result: VIP customers wait hours for a response that should
                    have taken minutes. Billing disputes escalate to chargebacks
                    because they weren&apos;t flagged in time. Repeat contacts pile up
                    because the first response didn&apos;t actually resolve the issue —
                    it was a rushed, template-pasted reply from an agent triaging
                    forty other tickets simultaneously.
                  </p>
                </div>
                <div
                  className="text-[0.95rem] leading-[1.8] flex flex-col gap-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <p>
                    This system was built to eliminate that triage bottleneck
                    entirely. Every ticket that enters the pipeline — whether via
                    Zendesk webhook, Intercom event, or direct API call — is
                    immediately classified by urgency and topic, enriched with
                    relevant context from the knowledge base, and either auto-responded
                    to with a context-aware draft or escalated to the correct human
                    specialist with a pre-built briefing.
                  </p>
                  <p>
                    The goal was not to replace support agents. It was to ensure that
                    when a human does pick up a ticket, they&apos;re looking at a
                    pre-classified, pre-contextualized issue with a suggested response
                    already drafted — turning a 6-minute triage cycle into a 30-second
                    review-and-send.
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
                <Clock size={12} />
                Pipeline Performance
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-bold tracking-tight text-white"
                style={{ letterSpacing: "-0.025em" }}
              >
                Measured in seconds.{" "}
                <span className="glow-text">Not business days.</span>
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
          aria-labelledby="triage-stack-headline"
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
                Technology Stack
              </motion.span>
              <motion.h2
                id="triage-stack-headline"
                variants={fadeUp}
                className="text-3xl md:text-5xl font-bold tracking-tight text-white"
                style={{ letterSpacing: "-0.025em" }}
              >
                Four layers.{" "}
                <span className="glow-text">One autonomous pipeline.</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-base md:text-lg max-w-2xl"
                style={{ color: "var(--text-secondary)" }}
              >
                Each technology handles a specific stage of the ticket lifecycle —
                from the moment a webhook fires to the moment a response is sent
                or an escalation lands in a human&apos;s inbox.
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
          aria-labelledby="triage-arch-headline"
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
                <Bot size={12} />
                Core Architecture
              </motion.span>
              <motion.h2
                id="triage-arch-headline"
                variants={fadeUp}
                className="text-3xl md:text-5xl font-bold tracking-tight text-white"
                style={{ letterSpacing: "-0.025em" }}
              >
                Four agents.{" "}
                <span className="glow-text">One decision graph.</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-base md:text-lg max-w-2xl"
                style={{ color: "var(--text-secondary)" }}
              >
                Each subsystem operates as an independent node in a LangGraph
                state machine — executing its task, passing structured output
                downstream, and handling its own retries and fallbacks.
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
          aria-labelledby="triage-cta-headline"
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
                Automate Your Support
              </span>

              <h2
                id="triage-cta-headline"
                className="text-3xl md:text-5xl font-bold tracking-tight relative z-10"
                style={{ letterSpacing: "-0.025em" }}
              >
                Need a pipeline built
                <br />
                <span className="glow-text">this intelligent?</span>
              </h2>

              <p
                className="text-base max-w-lg relative z-10"
                style={{ color: "var(--text-secondary)" }}
              >
                Whether it&apos;s ticket triage, document processing, or any
                workflow where AI agents can replace manual decision-making —
                we design and ship production-grade automation pipelines.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                <button
                  onClick={openDrawer}
                  className="btn-primary"
                >
                  Discuss a Similar Automation
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
