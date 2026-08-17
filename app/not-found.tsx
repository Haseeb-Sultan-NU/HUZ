import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 overflow-hidden bg-[#0a0a0a]">
      {/* ── Ambient Glow ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 480,
          height: 480,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -55%)",
          background:
            "radial-gradient(circle, rgba(99,91,255,0.12) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Status badge */}
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wide mb-8"
          style={{
            background: "rgba(99,91,255,0.1)",
            border: "1px solid rgba(99,91,255,0.25)",
            color: "#a78bfa",
          }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"
            aria-hidden="true"
          />
          PROCESS HALTED
        </span>

        {/* Error code */}
        <h1
          className="text-[7rem] sm:text-[9rem] font-black leading-none tracking-tighter select-none"
          style={{
            background: "linear-gradient(180deg, #fff 30%, rgba(255,255,255,0.15) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </h1>

        {/* Headline */}
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-2 mb-4">
          Even our AI couldn&apos;t predict you&apos;d end up here.
        </h2>

        {/* Subtext */}
        <p
          className="text-sm sm:text-base leading-relaxed max-w-md mb-10"
          style={{ color: "var(--text-muted, rgba(255,255,255,0.5))" }}
        >
          The page you&apos;re looking for has been deprecated, relocated, or
          never existed in the first place. Our automated systems have logged
          this anomaly.
        </p>

        {/* CTA Button */}
        <Link
          href="/"
          className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #635BFF 0%, #7c6aff 100%)",
            boxShadow:
              "0 0 24px rgba(99,91,255,0.35), 0 4px 16px rgba(0,0,0,0.4)",
          }}
        >
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Return to Base
        </Link>

        {/* Decorative terminal line */}
        <p
          className="mt-12 text-[0.7rem] font-mono tracking-wider"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          ~/huz/routes $ <span style={{ color: "rgba(255,255,255,0.35)" }}>404 — route not found</span>
        </p>
      </div>
    </main>
  );
}
