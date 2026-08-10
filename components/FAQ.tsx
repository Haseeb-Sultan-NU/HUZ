"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Plus, Minus, MessageSquare } from "lucide-react";

// ─── FAQ Data ───────────────────────────────────────────────────────────────────
const FAQS = [
  {
    question: "Do you build with custom code or use platforms like WordPress?",
    answer:
      "Both. For high-performance, complex applications, we engineer custom solutions using Next.js and React. For clients who need a highly independent, easy-to-manage marketing site, we build heavily optimized, custom-themed WordPress platforms.",
  },
  {
    question: "What kind of tasks can your AI systems automate?",
    answer:
      "We build systems for almost any repetitive digital task. This includes automated lead qualification, intelligent data entry, voice/audio processing pipelines, and connecting your CRM directly to your daily workflow.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on the scope. A standard high-performance web deployment usually takes 3 to 4 weeks. Complex AI automation pipelines or full custom web apps can take 2 to 3 months. We map out the exact timeline during discovery.",
  },
  {
    question: "Do you maintain the systems after they are launched?",
    answer:
      "Yes. We offer ongoing retainer packages to ensure your web architecture stays secure, lightning-fast, and your automation pipelines adapt to any new software updates in your business.",
  },
  {
    question: "What do you need from me to get started?",
    answer:
      "Just a conversation. Once you fill out our contact form, we'll hop on a quick call to understand your bottlenecks. From there, we handle the architecture, design, and deployment.",
  },
];

// ─── Animation Variants ─────────────────────────────────────────────────────────
const sectionFade: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemFade: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Individual FAQ Item ────────────────────────────────────────────────────────
function FAQItem({ item, isOpen, onClick }: { item: (typeof FAQS)[number]; isOpen: boolean; onClick: () => void }) {
  return (
    <motion.div variants={itemFade} className="border-b border-white/10 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left transition-colors duration-300 hover:bg-white/5 px-4 -mx-4 rounded-lg focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-base md:text-lg font-bold text-white pr-8">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0 text-[#635BFF]"
        >
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 px-4 -mx-4">
              <p className="text-sm md:text-base leading-relaxed text-white/70">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-24 md:py-32"
      aria-labelledby="faq-headline"
      style={{ background: "#0A0A0A" }}
    >
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionFade}
          className="max-w-3xl mx-auto"
        >
          {/* ── Header ────────────────────────────────────────────────────── */}
          <div className="text-center mb-16">
            <span className="badge inline-flex mb-6">
              <MessageSquare size={12} />
              FAQ
            </span>

            <h2
              id="faq-headline"
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white"
              style={{ letterSpacing: "-0.03em" }}
            >
              Common Questions.
            </h2>

            <p
              className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-white/70"
            >
              Everything you need to know about our process, capabilities, and timelines.
            </p>
          </div>

          {/* ── Accordion List ────────────────────────────────────────────── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {FAQS.map((faq, index) => (
              <FAQItem
                key={index}
                item={faq}
                isOpen={openIndex === index}
                onClick={() => toggleFAQ(index)}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
