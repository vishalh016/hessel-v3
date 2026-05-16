"use client";

import { motion } from "framer-motion";

interface Step6Props {
  whatsappUrl: string;
  onReset: () => void;
}

export default function Step6WhatsApp({ whatsappUrl, onReset }: Step6Props) {
  return (
    <div className="space-y-12 text-center py-12">
      <div className="flex justify-center">
        <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 bg-accent/20 rounded-full"
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent relative z-10">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-3xl font-display text-primary">Ready to connect!</h3>
        <p className="text-secondary text-sm max-w-xs mx-auto">
          Your menu curation is ready. Click the button below to start your conversation on WhatsApp.
        </p>
      </div>

      <div className="space-y-6">
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-12 py-5 bg-[#25D366] text-white font-bold uppercase tracking-widest rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          Open WhatsApp
        </motion.a>
        
        <button
          onClick={onReset}
          className="block w-full text-[10px] text-secondary/40 uppercase tracking-[0.3em] hover:text-accent transition-colors"
        >
          Build a New Menu
        </button>
      </div>
    </div>
  );
}
