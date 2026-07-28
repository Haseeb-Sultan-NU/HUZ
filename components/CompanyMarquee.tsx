"use client";

// ─── CompanyMarquee ────────────────────────────────────────────────────────────
// Infinite horizontal scrolling ticker with monochrome logos, edge fade masks,
// and a violet glow on hover. Zero-hitch loop via duplicated item array.

const COMPANIES = [
  {
    name: "Supabase",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.150 12.84.737 14 1.75 14H11V22.964c.015.986 1.26 1.41 1.874.637l9.262-11.65c.614-.79.027-1.951-.985-1.951H13L11.9 1.036z" />
      </svg>
    ),
  },
  {
    name: "Retool",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 3.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
      </svg>
    ),
  },
  {
    name: "Linear",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M3.338 17.375a12 12 0 0 0 3.287 3.287l13.7-13.7a12 12 0 0 0-3.287-3.287L3.338 17.375zm-1.06-1.06L15.664 2.93a12 12 0 0 0-13.386 13.386zM21.722 8.336L8.336 21.722a12 12 0 0 0 13.386-13.386zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
  {
    name: "Pinecone",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 2C6.5 2 4 6 4 9c0 2.5 1.2 4.7 3 6.1V20a1 1 0 0 0 1.5.87l3.5-2 3.5 2A1 1 0 0 0 17 20v-4.9c1.8-1.4 3-3.6 3-6.1C20 6 17.5 2 12 2zm0 2c4 0 6 3 6 5a6 6 0 0 1-12 0c0-2 2-5 6-5z" />
      </svg>
    ),
  },
  {
    name: "Lovable",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 21.593c-.525-.438-10.65-8.698-10.65-13.277C1.35 4.62 4.003 2 7.3 2c1.98 0 3.738.994 4.7 2.497C13.963 2.994 15.72 2 17.7 2c3.297 0 5.95 2.62 5.95 6.316 0 4.579-10.125 12.839-10.65 13.277l-.5.407-.5-.407z" />
      </svg>
    ),
  },
  {
    name: "Resend",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M3 3h18a1 1 0 0 1 1 1v4.586l-9 9-9-9V4a1 1 0 0 1 1-1zm-1 8.414V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8.586l-8 8-10-8z" />
      </svg>
    ),
  },
  {
    name: "Vercel",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 1L24 22H0L12 1z" />
      </svg>
    ),
  },
  {
    name: "n8n",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="12" r="3" />
        <path d="M9 12h6M6 9V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3M6 15v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
];

// Duplicate for seamless loop
const ITEMS = [...COMPANIES, ...COMPANIES];

export default function CompanyMarquee() {
  return (
    <section
      aria-label="Trusted technologies and partners"
      className="marquee-section"
    >
      {/* Section label */}
      <p className="marquee-label">
        Trusted by Innovative Teams &amp; Powered by Modern Tech
      </p>

      {/* Ticker strip */}
      <div className="marquee-track-wrapper">
        {/* Left fade mask */}
        <div className="marquee-fade marquee-fade-left" aria-hidden="true" />

        {/* Scrolling track */}
        <div className="marquee-track">
          <div className="marquee-inner">
            {ITEMS.map((company, i) => (
              <div
                key={`${company.name}-${i}`}
                className="marquee-item"
                role="img"
                aria-label={company.name}
              >
                <span className="marquee-icon" aria-hidden="true">
                  {company.icon}
                </span>
                <span className="marquee-name">{company.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right fade mask */}
        <div className="marquee-fade marquee-fade-right" aria-hidden="true" />
      </div>
    </section>
  );
}
