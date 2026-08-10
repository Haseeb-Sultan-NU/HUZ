
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

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & Mission */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <span className="text-2xl font-bold tracking-tight text-white">
              HUZ<span className="text-[#635BFF]">.</span>
            </span>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Engineered for speed, built for scale. We deliver bespoke web platforms and autonomous AI systems that eliminate technical debt.
            </p>
            <div className="flex items-center gap-4 mt-2">
              {[TwitterXIcon, LinkedinIcon, InstagramIcon].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="text-white/50 hover:text-white transition-colors duration-300"
                  aria-label="Social Link"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Capabilities */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm tracking-wide">Services</h4>
            <ul className="flex flex-col gap-3">
              {["Web Development", "AI Automation", "Data & Analytics", "Software Integration", "UI/UX Design"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors duration-300">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm tracking-wide">Agency</h4>
            <ul className="flex flex-col gap-3">
              {["About Us", "Engineering Process", "Case Studies", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors duration-300">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal & Resources */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm tracking-wide">Compliance</h4>
            <ul className="flex flex-col gap-3">
              {["Privacy Policy", "Terms of Service", "Cookie Preferences"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors duration-300">{link}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/70">
            &copy; {currentYear} HUZ. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-white/70">All services online.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
