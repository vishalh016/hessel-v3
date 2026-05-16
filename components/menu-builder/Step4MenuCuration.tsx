"use client";

import { motion } from "framer-motion";
import { MenuItem, MenuCategory } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

interface Step4Props {
  categories: (MenuCategory & { items: MenuItem[] })[];
  selectedDishes: string[];
  onToggle: (id: string) => void;
  onContinue: () => void;
}

export default function Step4MenuCuration({ 
  categories, 
  selectedDishes, 
  onToggle, 
  onContinue 
}: Step4Props) {
  return (
    <div className="space-y-8 flex flex-col h-full">
      <div className="text-center">
        <h3 className="text-2xl font-display text-primary mb-2">Curate Your Menu</h3>
        <p className="text-secondary text-sm">Select dishes from each category.</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-12 max-h-[400px] scrollbar-hide">
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-4">
            <div className="flex items-center gap-4">
              <h4 className="text-accent font-bold uppercase tracking-widest text-xs">{cat.name}</h4>
              <div className="h-px flex-1 bg-divider/10" />
              <span className="text-[10px] text-secondary/40 italic">
                {cat.min_selections}–{cat.max_selections} items
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cat.items.map((item) => {
                const isSelected = selectedDishes.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => onToggle(item.id)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl border transition-all text-left",
                      isSelected
                        ? "bg-accent/10 border-accent/40 text-accent"
                        : "bg-base/40 border-divider/10 text-primary hover:border-divider/30"
                    )}
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      {item.price_per_plate_addon > 0 && (
                        <p className="text-[10px] text-accent/60 font-bold uppercase mt-1">
                          +₹{item.price_per_plate_addon} addon
                        </p>
                      )}
                    </div>
                    {isSelected && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent ml-2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-divider/10 flex justify-between items-center">
        <div className="text-secondary text-sm">
          <span className="text-primary font-bold">{selectedDishes.length}</span> items selected
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          className="px-12 py-4 bg-accent text-base font-bold uppercase tracking-widest rounded-xl shadow-accent-glow"
        >
          Review Summary
        </motion.button>
      </div>
    </div>
  );
}
