"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EXPERIENCES = [
  { id: "wedding", label: "Wedding", icon: "💍" },
  { id: "corporate", label: "Corporate", icon: "💼" },
  { id: "private", label: "Private Party", icon: "🎉" },
  { id: "festival", label: "Festival", icon: "🎪" },
  { id: "other", label: "Other", icon: "✨" },
];

interface Step1Props {
  onSelect: (type: string) => void;
  currentValue: string | null;
}

export default function Step1Experience({ onSelect, currentValue }: Step1Props) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-display text-primary mb-2">Select the Occasion</h3>
        <p className="text-secondary text-sm">Tell us what you're celebrating.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {EXPERIENCES.map((exp) => (
          <motion.button
            key={exp.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(exp.label)}
            className={cn(
              "flex flex-col items-center justify-center p-8 rounded-3xl border-2 transition-all duration-300",
              currentValue === exp.label
                ? "bg-accent/10 border-accent text-accent"
                : "bg-surface border-divider/20 text-primary hover:border-accent/40"
            )}
          >
            <span className="text-4xl mb-4">{exp.icon}</span>
            <span className="font-semibold tracking-wide">{exp.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
