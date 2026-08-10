"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X, Send, Loader2, Upload, Mail, Phone, MessageCircle } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────────
interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// ─── Pill Option Arrays ─────────────────────────────────────────────────────────
const SERVICE_PILLS = ["Web Development", "AI Automation", "UI/UX", "Software Integration", "Data & Analytics"];
const BUDGET_PILLS = ["$400 - $600", "$600 - $1,000", "$1,000 - $3,000", "$3,000+"];
const TIMELINE_PILLS = ["ASAP", "3-4 Weeks", "2-3 Months", "Flexible"];
const REFERRAL_PILLS = ["Google Search", "LinkedIn", "Instagram", "Facebook", "Friend", "Email", "X (Twitter)"];
const CONTACT_METHODS = [
  { value: "email", label: "Email", Icon: Mail },
  { value: "phone", label: "Phone", Icon: Phone },
  { value: "whatsapp", label: "WhatsApp", Icon: MessageCircle },
] as const;

// ─── Animation Configs ──────────────────────────────────────────────────────────
const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.15 },
  },
};

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Shared Styles ──────────────────────────────────────────────────────────────
const labelClasses =
  "block text-[0.7rem] font-medium text-text-muted uppercase tracking-[0.08em] mb-2";

const inputClasses =
  "drawer-input w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-xl text-text-primary text-sm font-[inherit] outline-none transition-all duration-200 placeholder:text-text-muted/60 focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/20 focus:bg-[#1e1e24]";

const pillClasses =
  "px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-medium text-text-secondary cursor-pointer transition-all duration-200 hover:bg-white/5 hover:border-white/20 hover:text-text-primary select-none";

const pillActiveClasses =
  "px-3.5 py-1.5 rounded-full border border-[#635BFF]/50 text-xs font-medium text-[#635BFF] cursor-pointer transition-all duration-200 bg-[#635BFF]/10 select-none";

// ─── Sub-components ─────────────────────────────────────────────────────────────

/** Hybrid field: text input + clickable pill buttons below it */
function PillField({
  id,
  label,
  value,
  pills,
  placeholder,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  pills: string[];
  placeholder: string;
  onChange: (val: string) => void;
}) {
  return (
    <motion.div variants={fadeUpItem}>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClasses}
      />
      <div className="flex flex-wrap gap-2 mt-2.5">
        {pills.map((pill) => (
          <button
            key={pill}
            type="button"
            className={value === pill ? pillActiveClasses : pillClasses}
            onClick={() => onChange(pill)}
          >
            {pill}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Component ──────────────────────────────────────────────────────────────────
export default function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    services: "",
    budget: "",
    timeline: "",
    contactMethod: "",
    projectDetails: "",
    referral: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const setField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call — replace with your real endpoint
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after a brief delay so the user sees the success state
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        services: "",
        budget: "",
        timeline: "",
        contactMethod: "",
        projectDetails: "",
        referral: "",
      });
      setFiles([]);
      onClose();
    }, 2400);
  };

  const isPhoneRequired = formData.contactMethod === "phone" || formData.contactMethod === "whatsapp";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ───────────────────────────────────────────────────── */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* ── Drawer Panel ───────────────────────────────────────────────── */}
          <motion.aside
            key="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Contact form"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-3xl z-[110] flex flex-col bg-[#0A0A0A] border-l border-white/10"
            style={{
              boxShadow:
                "-8px 0 60px rgba(0,0,0,0.6), -2px 0 20px rgba(99,91,255,0.08)",
            }}
          >
            {/* Subtle ambient glow at the top */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-[220px] pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,91,255,0.10) 0%, transparent 100%)",
              }}
            />

            {/* ── Header (sticky) ─────────────────────────────────────────── */}
            <div className="relative z-10 flex-shrink-0 px-8 pt-8 pb-2">
              {/* Close button — properly wired to onClose */}
              <div className="flex justify-end mb-4">
                <motion.button
                  id="drawer-close-btn"
                  type="button"
                  onClick={onClose}
                  aria-label="Close contact drawer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-transparent border border-white/8 text-text-secondary cursor-pointer transition-all duration-200 hover:bg-white/8 hover:border-white/18 hover:text-text-primary"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Title & subtitle */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.h2
                  variants={fadeUpItem}
                  className="text-[1.65rem] font-bold text-text-primary leading-tight mb-2 tracking-[-0.02em]"
                >
                  Let&apos;s Build Something{" "}
                  <span className="glow-text">Great.</span>
                </motion.h2>

                <motion.p
                  variants={fadeUpItem}
                  className="text-sm text-text-secondary leading-relaxed mb-6"
                >
                  Drop us a line. We typically respond within 24 hours.
                </motion.p>
              </motion.div>
            </div>

            {/* ── Scrollable form area ─────────────────────────────────────── */}
            <div className="relative z-10 flex-1 overflow-y-auto px-8 pb-8">
              <motion.form
                onSubmit={handleSubmit}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-6"
              >
                {/* ═══ TWO-COLUMN GRID: Basic fields ═══ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <motion.div variants={fadeUpItem}>
                    <label htmlFor="drawer-name" className={labelClasses}>
                      Name
                    </label>
                    <input
                      id="drawer-name"
                      name="name"
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </motion.div>

                  {/* Email (required) */}
                  <motion.div variants={fadeUpItem}>
                    <label htmlFor="drawer-email" className={labelClasses}>
                      Email <span className="text-[#635BFF]">*</span>
                    </label>
                    <input
                      id="drawer-email"
                      name="email"
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </motion.div>

                  {/* Phone (dynamic) */}
                  <motion.div variants={fadeUpItem}>
                    <label htmlFor="drawer-phone" className={labelClasses}>
                      Phone{" "}
                      {isPhoneRequired ? (
                        <span className="text-[#635BFF]">*</span>
                      ) : (
                        <span className="normal-case tracking-normal text-text-muted/70 font-normal">
                          (optional)
                        </span>
                      )}
                    </label>
                    <input
                      id="drawer-phone"
                      name="phone"
                      type="tel"
                      required={isPhoneRequired}
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                    <p className="text-[0.68rem] text-text-muted/60 mt-1.5 italic leading-snug">
                      {isPhoneRequired
                        ? "Since you prefer phone/WhatsApp, we need this to reach you."
                        : "Optional, but drop it if you want. We promise not to call you at 3 AM."}
                    </p>
                  </motion.div>

                  {/* Company Name (optional) */}
                  <motion.div variants={fadeUpItem}>
                    <label htmlFor="drawer-company" className={labelClasses}>
                      Company{" "}
                      <span className="normal-case tracking-normal text-text-muted/70 font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      id="drawer-company"
                      name="company"
                      type="text"
                      placeholder="Acme Inc."
                      value={formData.company}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </motion.div>
                </div>

                {/* ═══ HYBRID PILL FIELDS ═══ */}

                {/* Services */}
                <PillField
                  id="drawer-services"
                  label="Services"
                  value={formData.services}
                  pills={SERVICE_PILLS}
                  placeholder="What do you need help with?"
                  onChange={(val) => setField("services", val)}
                />

                {/* Budget */}
                <PillField
                  id="drawer-budget"
                  label="Budget"
                  value={formData.budget}
                  pills={BUDGET_PILLS}
                  placeholder="What's your budget range?"
                  onChange={(val) => setField("budget", val)}
                />

                {/* Project Timeline */}
                <PillField
                  id="drawer-timeline"
                  label="Project Timeline"
                  value={formData.timeline}
                  pills={TIMELINE_PILLS}
                  placeholder="When do you need it done?"
                  onChange={(val) => setField("timeline", val)}
                />

                {/* ═══ BOTTOM FIELDS (Full Width) ═══ */}

                {/* Preferred Contact Method — toggle group */}
                <motion.div variants={fadeUpItem}>
                  <label className={labelClasses}>Preferred Contact Method</label>
                  <div className="flex flex-wrap gap-2">
                    {CONTACT_METHODS.map(({ value, label, Icon }) => {
                      const isActive = formData.contactMethod === value;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setField("contactMethod", value)}
                          className={`
                            inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                            transition-all duration-200 cursor-pointer border
                            ${
                              isActive
                                ? "bg-[#635BFF]/15 border-[#635BFF]/50 text-[#635BFF] shadow-[0_0_16px_rgba(99,91,255,0.15)]"
                                : "bg-transparent border-white/10 text-text-secondary hover:bg-white/5 hover:border-white/20 hover:text-text-primary"
                            }
                          `}
                        >
                          <Icon size={15} />
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Project Details (renamed from Message) */}
                <motion.div variants={fadeUpItem}>
                  <label htmlFor="drawer-details" className={labelClasses}>
                    Project Details
                  </label>
                  <p className="text-[0.68rem] text-text-muted/60 mb-2 italic leading-snug">
                    Too tired to type? Leave this blank and we&apos;ll just
                    interrogate you on the call.
                  </p>
                  <textarea
                    id="drawer-details"
                    name="projectDetails"
                    rows={4}
                    placeholder="Tell us about your project…"
                    value={formData.projectDetails}
                    onChange={handleChange}
                    className={`${inputClasses} resize-none min-h-[120px]`}
                  />
                </motion.div>

                {/* Attach Files */}
                <motion.div variants={fadeUpItem}>
                  <label className={labelClasses}>Attach Files</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="drawer-file-upload"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex flex-col items-center justify-center gap-2 py-5 px-4 rounded-xl border border-dashed border-white/10 bg-white/[0.02] cursor-pointer transition-all duration-200 hover:border-[#635BFF]/40 hover:bg-[#635BFF]/[0.04] group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#635BFF]/10 transition-colors duration-200">
                      <Upload
                        size={18}
                        className="text-text-muted group-hover:text-[#635BFF] transition-colors duration-200"
                      />
                    </div>
                    <span className="text-xs text-text-muted group-hover:text-text-secondary transition-colors duration-200">
                      Click to browse or drag files here
                    </span>
                  </button>
                  {files.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {files.map((file, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#635BFF]/10 border border-[#635BFF]/20 text-[0.7rem] text-[#635BFF]"
                        >
                          {file.name}
                          <button
                            type="button"
                            onClick={() =>
                              setFiles((prev) =>
                                prev.filter((_, idx) => idx !== i)
                              )
                            }
                            className="hover:text-white transition-colors"
                            aria-label={`Remove ${file.name}`}
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Referral */}
                <PillField
                  id="drawer-referral"
                  label="Referral"
                  value={formData.referral}
                  pills={REFERRAL_PILLS}
                  placeholder="How did you hear about us?"
                  onChange={(val) => setField("referral", val)}
                />

                {/* ═══ SUBMIT BUTTON ═══ */}
                <motion.div variants={fadeUpItem}>
                  <motion.button
                    id="drawer-submit-btn"
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    whileHover={
                      !isSubmitting && !isSubmitted ? { scale: 1.015 } : {}
                    }
                    whileTap={
                      !isSubmitting && !isSubmitted ? { scale: 0.985 } : {}
                    }
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border-none font-semibold text-[0.95rem] tracking-[-0.01em] text-white relative overflow-hidden transition-all duration-300"
                    style={{
                      cursor:
                        isSubmitting || isSubmitted ? "not-allowed" : "pointer",
                      background: isSubmitted
                        ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
                        : "linear-gradient(135deg, #635BFF 0%, #7c6dff 100%)",
                      boxShadow: isSubmitted
                        ? "0 0 24px rgba(34,197,94,0.3)"
                        : "0 0 24px rgba(99,91,255,0.25), 0 4px 16px rgba(0,0,0,0.3)",
                    }}
                  >
                    {/* Shimmer overlay */}
                    {!isSubmitting && !isSubmitted && (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)",
                        }}
                      />
                    )}

                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="inline-flex"
                        >
                          <Loader2 size={18} />
                        </motion.span>
                        Sending…
                      </>
                    ) : isSubmitted ? (
                      <>
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            damping: 12,
                            stiffness: 300,
                          }}
                        >
                          ✓
                        </motion.span>
                        Message Sent!
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={16} />
                      </>
                    )}
                  </motion.button>
                </motion.div>

                {/* Privacy note */}
                <motion.p
                  variants={fadeUpItem}
                  className="text-[0.72rem] text-text-muted text-center leading-relaxed mt-1"
                >
                  By submitting, you agree to our privacy policy.
                  <br />
                  We&apos;ll never share your information.
                </motion.p>
              </motion.form>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
