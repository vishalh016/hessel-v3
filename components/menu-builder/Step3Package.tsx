"use client";

import { motion } from "framer-motion";
import { Package } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

interface Step3Props {
  packages: Package[];
  onSelect: (id: string) => void;
  currentValue: string | null;
}

export default function Step3Package({ packages, onSelect, currentValue }: Step3Props) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-display text-primary mb-2">Choose a Package</h3>
        <p className="text-secondary text-sm">Select the base tier for your menu.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packages.map((pkg) => (
          <motion.button
            key={pkg.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelect(pkg.id)}
            className={cn(
              "flex flex-col p-6 rounded-2xl border-2 text-left transition-all duration-300",
              currentValue === pkg.id
                ? "bg-accent/10 border-accent shadow-accent-glow"
                : "bg-surface border-divider/20 hover:border-accent/40"
            )}
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-display text-xl text-primary">{pkg.name}</h4>
              <span className="text-accent font-bold">₹{pkg.base_price_per_plate}<small className="text-[10px] uppercase ml-1">/pp</small></span>
            </div>
            <p className="text-secondary text-xs mb-4 line-clamp-2">{pkg.positioning}</p>
            
            <div className="flex gap-2 flex-wrap mt-auto">
              {["Silver", "Gold", "Royal"].includes(pkg.name) && (
                <span className="px-2 py-1 bg-base text-[9px] uppercase tracking-tighter text-secondary/60 rounded">
                  {pkg.name} Tier
                </span>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
