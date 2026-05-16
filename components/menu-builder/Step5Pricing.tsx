"use client";

import { motion } from "framer-motion";
import { Package, MenuItem } from "@/lib/supabase/types";
import { formatINR } from "@/lib/utils";

interface Step5Props {
  pkg: Package;
  guestCount: number;
  selectedDishes: MenuItem[];
  estimate: {
    baseTotal: number;
    addOnTotal: number;
    grandTotal: number;
  } | null;
  onContinue: () => void;
}

export default function Step5Pricing({ 
  pkg, 
  guestCount, 
  selectedDishes, 
  estimate, 
  onContinue 
}: Step5Props) {
  if (!estimate) return null;

  return (
    <div className="space-y-8 flex flex-col h-full">
      <div className="text-center">
        <h3 className="text-2xl font-display text-primary mb-2">Estimate Summary</h3>
        <p className="text-secondary text-sm">Review your selection before we connect.</p>
      </div>

      <div className="flex-1 space-y-6">
        {/* Pricing Card */}
        <div className="bg-surface p-8 rounded-3xl border-2 border-accent/20 shadow-accent-glow">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-accent text-[10px] font-bold uppercase tracking-widest mb-1">Total Estimate</p>
              <h2 className="text-4xl font-display text-primary">{formatINR(estimate.grandTotal)}</h2>
            </div>
            <div className="text-right">
              <p className="text-secondary text-xs uppercase tracking-widest mb-1">Guests</p>
              <p className="text-primary font-bold">{guestCount}</p>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-divider/10">
            <div className="flex justify-between text-sm">
              <span className="text-secondary">Base Menu ({pkg.name})</span>
              <span className="text-primary font-medium">{formatINR(estimate.baseTotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary">Add-ons ({selectedDishes.filter(d => d.price_per_plate_addon > 0).length} items)</span>
              <span className="text-primary font-medium">{formatINR(estimate.addOnTotal)}</span>
            </div>
          </div>
        </div>

        {/* Selection Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-base/40 p-4 rounded-xl border border-divider/10">
            <p className="text-[9px] uppercase tracking-widest text-accent font-bold mb-1">Package</p>
            <p className="text-sm font-medium text-primary">{pkg.name}</p>
          </div>
          <div className="bg-base/40 p-4 rounded-xl border border-divider/10">
            <p className="text-[9px] uppercase tracking-widest text-accent font-bold mb-1">Menu Items</p>
            <p className="text-sm font-medium text-primary">{selectedDishes.length} total</p>
          </div>
        </div>
      </div>

      <div className="pt-8 flex flex-col gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          className="w-full py-5 bg-accent text-base font-bold uppercase tracking-widest rounded-xl shadow-accent-glow flex items-center justify-center gap-3"
        >
          Send to WhatsApp
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
        <p className="text-[10px] text-secondary/40 text-center uppercase tracking-widest">
          *Estimates are subject to review by our event experts.
        </p>
      </div>
    </div>
  );
}
