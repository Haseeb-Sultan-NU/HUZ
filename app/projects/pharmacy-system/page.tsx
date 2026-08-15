"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Zap,
  Package,
  ShieldCheck,
  Database,
  CreditCard,
  Clock,
  AlertTriangle,
  Server,
  Lock,
  BarChart3,
  Users,
  Cpu,
  Layers,
  RefreshCcw,
  Fingerprint,
  Monitor,
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

// ─── Category Badges ────────────────────────────────────────────────────────────
const CATEGORY_TAGS = ["Full-Stack", "Desktop App", "Healthcare"];

// ─── Tech Stack Data ────────────────────────────────────────────────────────────
const STACK_ITEMS = [
  {
    name: "Electron",
    role: "Desktop Shell & OS Integration",
    description:
      "Wraps the entire React application in a native desktop window with system-level access to file I/O, printer drivers, and OS notifications.",
    icon: <Monitor size={22} className="text-[#47848f]" />,
    color: "#47848f",
  },
  {
    name: "React + Vite",
    role: "Frontend Runtime & Build",
    description:
      "Vite delivers sub-second hot module reloads during development. React handles all UI state — from POS cart mutations to real-time inventory search.",
    icon: <Cpu size={22} className="text-[#61DAFB]" />,
    color: "#61DAFB",
  },
  {
    name: "FastAPI",
    role: "Backend API Layer",
    description:
      "A Python backend running inside the Electron process, exposing RESTful endpoints for every business operation with automatic OpenAPI documentation.",
    icon: <Server size={22} className="text-[#009688]" />,
    color: "#009688",
  },
  {
    name: "SQLite",
    role: "Embedded Relational Database",
    description:
      "Zero-config, file-based SQL database living on the local machine. Handles concurrent read/write across inventory, sales, and user tables without a network round-trip.",
    icon: <Database size={22} className="text-[#44a8e0]" />,
    color: "#44a8e0",
  },
  {
    name: "JWT Auth",
    role: "Session & Token Security",
    description:
      "Stateless JSON Web Tokens authenticate every API request. Tokens carry role claims (Admin vs. Cashier) and expire on configurable intervals.",
    icon: <Lock size={22} className="text-[#f59e0b]" />,
    color: "#f59e0b",
  },
  {
    name: "electron-builder",
    role: "Packaging & Distribution (NSIS)",
    description:
      "Compiles the entire stack into a single .exe installer with NSIS scripting for Windows deployment — including auto-update, desktop shortcuts, and registry entries.",
    icon: <Package size={22} className="text-[#a78bfa]" />,
    color: "#a78bfa",
  },
];

// ─── Impact Metrics ─────────────────────────────────────────────────────────────
const IMPACT_METRICS = [
  {
    value: "<50ms",
    label: "Query Latency",
    detail: "Local SQLite queries resolve without network overhead",
  },
  {
    value: "100%",
    label: "Audit Trail Coverage",
    detail: "Every inventory mutation logged with user, timestamp, and delta",
  },
  {
    value: "0",
    label: "External Dependencies",
    detail: "Runs fully offline — no cloud, no SaaS, no subscription",
  },
  {
    value: "2-Tier",
    label: "RBAC Enforcement",
    detail: "Admin and Cashier roles with isolated permission boundaries",
  },
];

// ─── Bento Architecture Cards ───────────────────────────────────────────────────
const ARCHITECTURE_CARDS = [
  {
    icon: <Package size={24} className="text-[#818cf8]" />,
    badge: "INVENTORY",
    badgeColor: "#818cf8",
    title: "Intelligent Inventory Engine",
    body: "Every medicine entering the system is tracked at the batch level — not just by name or SKU. Each batch carries its own purchase price, expiry date, supplier reference, and remaining quantity. When stock dips below a velocity-based threshold (calculated from historical sales cadence), the system surfaces reorder alerts before a stockout ever happens. Expiry warnings fire at 30, 15, and 7-day horizons, giving operators time to push near-expiry stock through discount channels or return pipelines.",
    span: "md:col-span-2",
  },
  {
    icon: <Server size={24} className="text-[#a78bfa]" />,
    badge: "BACKEND",
    badgeColor: "#a78bfa",
    title: "Containerized FastAPI CRUD",
    body: "The Python FastAPI backend launches as a child process inside Electron, binding to localhost on a randomized port. Every CRUD operation — from creating a purchase order to voiding a sale — resolves against the local SQLite database in single-digit milliseconds. Pydantic models enforce strict schema validation at the API boundary, so malformed requests never touch the database layer.",
    span: "md:col-span-1",
  },
  {
    icon: <ShieldCheck size={24} className="text-[#635BFF]" />,
    badge: "SECURITY",
    badgeColor: "#635BFF",
    title: "Cryptographic JWT & RBAC",
    body: "Authentication uses HS256-signed JWTs with configurable expiry. The Admin role governs inventory write operations, vendor management, and financial reporting. Cashier accounts are scoped to POS billing and customer lookup — they cannot modify purchase prices, delete inventory records, or access audit logs. Token refresh logic prevents session hijacking without forcing disruptive re-logins during a shift.",
    span: "md:col-span-1",
  },
  {
    icon: <CreditCard size={24} className="text-[#22d3ee]" />,
    badge: "POS ENGINE",
    badgeColor: "#22d3ee",
    title: "Advanced POS & Return Logic",
    body: "The billing engine handles multi-item carts with per-item discount logic, tax computation, and real-time stock deduction. Returns are where it gets complex: the system algorithmically reconciles returned quantities back to the correct batches (FIFO-based), recalculates profit margins, and adjusts the inventory ledger — all without leaving ghost quantities or negative stock. Partial returns on a single invoice are supported with line-item granularity.",
    span: "md:col-span-2",
  },
];

// ─── Spotlight Card (for Architecture) ──────────────────────────────────────────
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
      {/* Spotlight follow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(129, 140, 248, 0.10), transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 p-8 md:p-10">
        {/* Icon + Badge */}
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

        {/* Content */}
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

// ─── Subpage Navigation ─────────────────────────────────────────────────────────
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

// ─── Desktop App Frame Mockup ───────────────────────────────────────────────────
function DesktopAppFrame() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl overflow-hidden mx-auto max-w-4xl"
      style={{
        border: "1px solid rgba(129,140,248,0.2)",
        background:
          "linear-gradient(145deg, rgba(18,18,18,0.95) 0%, rgba(14,14,30,0.85) 100%)",
        boxShadow:
          "0 0 80px rgba(99,91,255,0.12), 0 25px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
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
            PharmaSys v2.4.1 — Electron Desktop
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-4 rounded-sm flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 1,
              }}
            />
          </div>
        </div>
      </div>

      {/* App content mockup */}
      <div className="relative p-6 md:p-10" style={{ minHeight: 320 }}>
        {/* Sidebar stub */}
        <div className="flex gap-6">
          <div
            className="hidden md:flex flex-col gap-3 shrink-0"
            style={{ width: 180 }}
          >
            {[
              { icon: <BarChart3 size={14} />, label: "Dashboard", active: true },
              { icon: <Package size={14} />, label: "Inventory", active: false },
              { icon: <CreditCard size={14} />, label: "POS Billing", active: false },
              { icon: <Users size={14} />, label: "Vendors", active: false },
              { icon: <RefreshCcw size={14} />, label: "Returns", active: false },
              { icon: <Fingerprint size={14} />, label: "Access Control", active: false },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium"
                style={{
                  background: item.active
                    ? "rgba(99,91,255,0.15)"
                    : "transparent",
                  border: item.active
                    ? "1px solid rgba(99,91,255,0.3)"
                    : "1px solid transparent",
                  color: item.active ? "#a78bfa" : "var(--text-muted)",
                }}
              >
                {item.icon}
                {item.label}
              </div>
            ))}
          </div>

          {/* Main content area */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Top stat row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Total SKUs", value: "2,847", trend: "+12%" },
                { label: "Today's Sales", value: "₨ 84,320", trend: "+8.2%" },
                { label: "Expiry Alerts", value: "14", trend: "critical" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="rounded-xl p-3 md:p-4"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="text-[10px] uppercase tracking-wider mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {stat.label}
                  </div>
                  <div className="text-sm md:text-lg font-bold text-white">
                    {stat.value}
                  </div>
                  <div
                    className="text-[10px] mt-1 font-medium"
                    style={{
                      color:
                        stat.trend === "critical" ? "#f87171" : "#4ade80",
                    }}
                  >
                    {stat.trend === "critical" ? "⚠ Needs Review" : stat.trend}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Activity rows */}
            <div
              className="rounded-xl p-4"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="text-[10px] uppercase tracking-wider mb-3 font-semibold"
                style={{ color: "var(--text-muted)" }}
              >
                Recent Transactions
              </div>
              {[
                {
                  id: "INV-1847",
                  customer: "Walk-in",
                  amount: "₨ 2,340",
                  time: "2m ago",
                },
                {
                  id: "INV-1846",
                  customer: "Habib Pharma",
                  amount: "₨ 12,890",
                  time: "14m ago",
                },
                {
                  id: "RET-0092",
                  customer: "Walk-in (Return)",
                  amount: "-₨ 450",
                  time: "23m ago",
                },
              ].map((tx, i) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
                  className="flex items-center justify-between py-2"
                  style={{
                    borderBottom:
                      i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[11px] font-mono"
                      style={{ color: "#818cf8" }}
                    >
                      {tx.id}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {tx.customer}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-semibold"
                      style={{
                        color: tx.amount.startsWith("-")
                          ? "#f87171"
                          : "var(--text-primary)",
                      }}
                    >
                      {tx.amount}
                    </span>
                    <span
                      className="text-[10px]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {tx.time}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Glow overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 70% 30%, rgba(99,91,255,0.06) 0%, transparent 100%)",
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
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }}
          />
          <span
            className="text-[10px] font-mono"
            style={{ color: "var(--text-muted)" }}
          >
            Backend Connected · SQLite OK · JWT Active
          </span>
        </div>
        <span
          className="text-[10px] font-mono"
          style={{ color: "var(--text-muted)" }}
        >
          Admin Session
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
export default function PharmacySystemPage() {
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
        {/* HEADER — Category Badges + Gradient Title + Tagline                  */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        <section
          className="relative z-10 pt-40 pb-8 md:pt-48 md:pb-12"
          aria-labelledby="pharmacy-hero-headline"
        >
          <div className="container mx-auto max-w-4xl px-6 text-center">
            {/* Category tags */}
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

            {/* Title */}
            <motion.h1
              id="pharmacy-hero-headline"
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
              Pharmacy &amp; Inventory
              <br />
              <span className="glow-text">Management System</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-6"
              style={{ color: "var(--text-secondary)" }}
            >
              Production-grade desktop system built for real-world retail pharmacy
              operations. From batch-level inventory tracking to cryptographic
              session security — every layer is engineered for the chaos of a
              high-traffic dispensary counter.
            </motion.p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* HERO VISUAL — Desktop App Frame Mockup                               */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        <section className="relative z-10 pb-16 md:pb-24">
          <div className="container mx-auto max-w-5xl px-6">
            <DesktopAppFrame />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* THE OPERATIONAL CHALLENGE — Layman Overview                          */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        <section
          className="relative z-10 py-20 md:py-28"
          aria-labelledby="big-picture-headline"
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
                The Operational Challenge
              </motion.span>

              <motion.h2
                id="big-picture-headline"
                variants={fadeUp}
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white"
                style={{ letterSpacing: "-0.025em" }}
              >
                What happens when a pharmacy
                <br />
                <span className="glow-text">runs on paper and memory?</span>
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
                    A retail pharmacy is not a simple storefront. On any given day, a
                    mid-size dispensary juggles 2,000+ SKUs from dozens of
                    manufacturers, each with different batch numbers, purchase prices,
                    and expiry dates. Medicines arrive in bulk shipments that need to be
                    split, shelved, and tracked at the batch level — not just by name.
                  </p>
                  <p>
                    Most pharmacies still manage this with handwritten registers or
                    Excel sheets. The result? Expired stock slipping onto shelves.
                    Purchase prices forgotten days after delivery. Return disputes
                    escalating because no one can trace which batch a specific strip
                    came from. Cashier errors in billing going unnoticed until end-of-day
                    reconciliation fails.
                  </p>
                </div>
                <div
                  className="text-[0.95rem] leading-[1.8] flex flex-col gap-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <p>
                    This system was built to replace that entire workflow. Every
                    medicine that enters the store is logged with its batch, supplier,
                    cost, and expiry. Every sale deducts from the correct batch using
                    FIFO logic. Every return reconciles quantities back to the ledger
                    without creating phantom stock. Every user action — from a price
                    change to a void — is audit-logged with the operator&apos;s identity
                    and timestamp.
                  </p>
                  <p>
                    The goal was not to build a tech demo. It was to build a system that
                    a 60-year-old pharmacist, working a 12-hour shift, can operate
                    without training — and that surfaces problems before they become
                    financial losses.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* IMPACT METRICS — Stat Cards                                          */}
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
                System Performance
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-bold tracking-tight text-white"
                style={{ letterSpacing: "-0.025em" }}
              >
                Built for speed.{" "}
                <span className="glow-text">Verified by numbers.</span>
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
          aria-labelledby="stack-headline"
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
                id="stack-headline"
                variants={fadeUp}
                className="text-3xl md:text-5xl font-bold tracking-tight text-white"
                style={{ letterSpacing: "-0.025em" }}
              >
                Every layer,{" "}
                <span className="glow-text">purpose-built.</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-base md:text-lg max-w-2xl"
                style={{ color: "var(--text-secondary)" }}
              >
                Six technologies, each chosen for a specific architectural
                responsibility. No bloat, no redundancy.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
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
          aria-labelledby="architecture-headline"
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
                <Cpu size={12} />
                Core Architecture
              </motion.span>
              <motion.h2
                id="architecture-headline"
                variants={fadeUp}
                className="text-3xl md:text-5xl font-bold tracking-tight text-white"
                style={{ letterSpacing: "-0.025em" }}
              >
                Four pillars.{" "}
                <span className="glow-text">Zero compromises.</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-base md:text-lg max-w-2xl"
                style={{ color: "var(--text-secondary)" }}
              >
                The system&apos;s architecture is divided into four independent
                subsystems, each handling a distinct operational domain with its
                own validation, error handling, and audit pipeline.
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
          aria-labelledby="pharmacy-cta-headline"
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
                <Zap size={12} />
                Interested?
              </span>

              <h2
                id="pharmacy-cta-headline"
                className="text-3xl md:text-5xl font-bold tracking-tight relative z-10"
                style={{ letterSpacing: "-0.025em" }}
              >
                Need a system built
                <br />
                <span className="glow-text">this robust?</span>
              </h2>

              <p
                className="text-base max-w-lg relative z-10"
                style={{ color: "var(--text-secondary)" }}
              >
                Whether it&apos;s a desktop application, an internal tool, or a
                full-stack platform — we architect systems that operators trust
                and businesses depend on.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                <button
                  onClick={openDrawer}
                  className="btn-primary"
                >
                  Start the Conversation
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
