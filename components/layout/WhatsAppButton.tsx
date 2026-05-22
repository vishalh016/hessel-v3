"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "916291799615";

const QUICK_MESSAGES = [
  {
    id: "general",
    label: "General Enquiry",
    icon: "💬",
    text: "Hi Hessel! I'd like to enquire about your catering services. Could you please help me?",
  },
  {
    id: "wedding",
    label: "Wedding Catering",
    icon: "💍",
    text: "Hi Hessel! I'm planning a wedding and would love to discuss your premium catering packages. Please connect with me.",
  },
  {
    id: "corporate",
    label: "Corporate Event",
    icon: "🏢",
    text: "Hi Hessel! I need catering for a corporate event. Could you share details about your Corporate package?",
  },
  {
    id: "custom",
    label: "Custom Menu",
    icon: "🍽️",
    text: "Hi Hessel! I'd like to build a completely custom menu for my event. Please help me get started.",
  },
  {
    id: "quote",
    label: "Get a Quote",
    icon: "📋",
    text: "Hi Hessel! I'd like to get a pricing quote for catering. Could you guide me through the options?",
  },
];

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShownPulse, setHasShownPulse] = useState(false);

  // Show attention pulse after 3s on first load
  useEffect(() => {
    const t = setTimeout(() => setHasShownPulse(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const openWhatsApp = (text: string) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <>
      {/* Backdrop to close panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="wa-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[59]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="wa-panel"
            initial={{ opacity: 0, x: -24, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed left-20 bottom-8 z-[60] w-[270px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10"
            style={{ background: "linear-gradient(145deg, #1C050C 0%, #2A0A14 100%)" }}
          >
            {/* Header */}
            <div className="px-5 py-4 flex items-center gap-3 border-b border-white/[0.07]"
              style={{ background: "linear-gradient(90deg, #128C7E 0%, #0d7066 100%)" }}
            >
              {/* WhatsApp Icon */}
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight">Hessel Hospitality</p>
                <p className="text-white/70 text-[10px] tracking-wide mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block shadow-[0_0_5px_#4ade80]" />
                  Online · Usually replies instantly
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white/60 hover:text-white shrink-0"
                aria-label="Close WhatsApp panel"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                </svg>
              </button>
            </div>

            {/* Quick message options */}
            <div className="px-4 py-4 flex flex-col gap-2">
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#D4A373]/50 font-semibold font-sans mb-1">
                How can we help?
              </p>
              {QUICK_MESSAGES.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => openWhatsApp(msg.text)}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-[#D4A373]/10 hover:border-[#D4A373]/30 transition-all duration-200 group flex items-center gap-2.5"
                >
                  <span className="text-base leading-none">{msg.icon}</span>
                  <span className="text-[11px] text-[#E6BE8A]/80 group-hover:text-[#D4A373] font-medium transition-colors leading-tight">
                    {msg.label}
                  </span>
                  <svg className="ml-auto w-3 h-3 text-[#D4A373]/30 group-hover:text-[#D4A373]/70 transition-colors shrink-0" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 6h7m-3-3l3 3-3 3" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 pb-4">
              <p className="text-[8.5px] text-center text-white/20 tracking-wider font-sans">
                Messages open WhatsApp · We respond within minutes
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Button — fixed on left */}
      <motion.button
        id="whatsapp-contact-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 400, damping: 28, delay: 1.2 }}
        aria-label="Contact us on WhatsApp"
        className="fixed left-6 bottom-8 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] focus:outline-none"
        style={{ background: "linear-gradient(145deg, #25D366 0%, #128C7E 100%)" }}
      >
        {/* Attention pulse rings — shown for the first few seconds */}
        {hasShownPulse && !isOpen && (
          <>
            <span className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ background: "#25D366" }} />
            <span className="absolute inset-[-6px] rounded-full opacity-10 animate-pulse"
              style={{ background: "#25D366" }} />
          </>
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            // X icon when open
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white"
            >
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
            </motion.svg>
          ) : (
            // WhatsApp icon when closed
            <motion.svg
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              viewBox="0 0 24 24" className="w-7 h-7 fill-white"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
