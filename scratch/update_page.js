const fs = require('fs');

let content = fs.readFileSync('app/page.tsx', 'utf8');

// 1. Add import
content = content.replace('import FAQ from "@/components/FAQ";', 'import FAQ from "@/components/FAQ";\nimport Footer from "@/components/Footer";');

// 2. Remove icons
content = content.replace(/const TwitterXIcon[\s\S]*?const LinkedinIcon[\s\S]*?<\/svg>\n\);\n/, '');

// 3. Remove Footer data
content = content.replace(/\/\/ ─── Footer data ───[\s\S]*?(?=\n\/\/ ─── Main Page ───)/, '');

// 4. Change <footer to <section for CTA
content = content.replace('{/* FOOTER', '{/* PRE-FOOTER CTA');
content = content.replace('<footer role="contentinfo" style={{ borderTop: "1px solid var(--border)" }}>', '<section style={{ borderTop: "1px solid var(--border)" }}>');

// 5. Replace rest of footer with </section> and <Footer />
content = content.replace(/        {\/\* ─ Gradient divider ───[\s\S]*?<\/footer>/, 
`      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* GLOBAL FOOTER                                                       */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <Footer />`);

fs.writeFileSync('app/page.tsx', content, 'utf8');
console.log('Updated page.tsx');
