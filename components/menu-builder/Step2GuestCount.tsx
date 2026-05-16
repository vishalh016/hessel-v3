"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Step2Props {
  onSelect: (count: number) => void;
  currentValue: number | null;
}

export default function Step2GuestCount({ onSelect, currentValue }: Step2Props) {
  const [inputValue, setInputValue] = useState(currentValue?.toString() || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const count = parseInt(inputValue);
    if (count > 0) {
      onSelect(count);
    }
  };

  return (
    <div className="space-y-8 max-w-sm mx-auto">
      <div className="text-center">
        <h3 className="text-2xl font-display text-primary mb-2">Guest Count</h3>
        <p className="text-secondary text-sm">How many guests are we serving?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="number"
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="0"
            className="w-full bg-surface border-2 border-divider/20 rounded-2xl py-6 px-8 text-center text-4xl font-display text-primary focus:border-accent focus:outline-none transition-colors"
          />
          <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none text-secondary">
            <span className="text-sm font-bold uppercase tracking-widest">Guests</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!inputValue || parseInt(inputValue) <= 0}
          className="w-full py-4 bg-accent text-base font-bold uppercase tracking-widest rounded-xl shadow-accent-glow disabled:opacity-50 disabled:shadow-none transition-all"
        >
          Continue
        </motion.button>
      </form>

      <div className="flex justify-center gap-4">
        {[50, 100, 250, 500].map((preset) => (
          <button
            key={preset}
            onClick={() => {
              setInputValue(preset.toString());
              onSelect(preset);
            }}
            className="px-4 py-2 bg-surface border border-divider/20 rounded-lg text-xs text-secondary hover:border-accent/40 hover:text-accent transition-colors"
          >
            {preset}+
          </button>
        ))}
      </div>
    </div>
  );
}
