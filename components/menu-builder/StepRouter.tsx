"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMenuBuilder } from "@/hooks/useMenuBuilder";
import { usePricingEngine } from "@/hooks/usePricingEngine";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { 
  Package, 
  MenuCategory, 
  MenuItem, 
  MenuApiResponse 
} from "@/lib/supabase/types";

// Import Steps
import Step1Experience from "./Step1Experience";
import Step2GuestCount from "./Step2GuestCount";
import Step3Package from "./Step3Package";
import Step4MenuCuration from "./Step4MenuCuration";
import Step5Pricing from "./Step5Pricing";
import Step6WhatsApp from "./Step6WhatsApp";

/**
 * Orchestrator for the 6-step Menu Builder.
 * Handles data fetching, step transitions, and API submission.
 */
export default function StepRouter() {
  const { 
    state, 
    setEventType, 
    setGuestCount, 
    setPackage, 
    toggleDish, 
    nextStep, 
    prevStep,
    reset 
  } = useMenuBuilder();

  const [data, setData] = useState<MenuApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch initial menu data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/menu");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch menu data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const selectedPackage = data?.packages.find(p => p.id === state.package_id) || null;
  const allDishes = data?.categories.flatMap(c => c.items) || [];
  const { estimate, selectedDishes } = usePricingEngine(
    selectedPackage,
    state.guest_count,
    allDishes,
    state.selected_dishes
  );

  const handleFinalize = async () => {
    // 1. Save to database
    try {
      await fetch("/api/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_type: state.event_type,
          guest_count: state.guest_count,
          package_id: state.package_id,
          selected_dishes: state.selected_dishes,
          estimate: estimate?.grandTotal,
        }),
      });
    } catch (err) {
      console.error("Failed to save quotation", err);
    }

    // 2. Move to WhatsApp step
    nextStep();
  };

  const whatsappMessage = (data && selectedPackage) ? buildWhatsAppMessage({
    state: { ...state, estimate: estimate?.grandTotal || null },
    pkg: selectedPackage,
    dishes: selectedDishes,
    categoryNames: Object.fromEntries(data.categories.map(c => [c.id, c.name])),
  }) : "";

  const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4">
      <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
      <p className="text-secondary text-sm animate-pulse">Loading menu data...</p>
    </div>
  );

  return (
    <div className="w-full relative">
      {/* Progress Indicator */}
      {state.step < 6 && (
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 flex gap-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                s === state.step ? "w-12 bg-accent" : s < state.step ? "w-6 bg-accent/40" : "w-6 bg-divider/10"
              }`}
            />
          ))}
        </div>
      )}

      {/* Back Button */}
      {state.step > 1 && state.step < 6 && (
        <button
          onClick={prevStep}
          className="absolute -top-12 left-0 text-secondary hover:text-accent flex items-center gap-2 transition-colors group"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:-translate-x-1 transition-transform">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-widest">Back</span>
        </button>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={state.step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="min-h-[400px]"
        >
          {state.step === 1 && (
            <Step1Experience onSelect={setEventType} currentValue={state.event_type} />
          )}
          {state.step === 2 && (
            <Step2GuestCount onSelect={setGuestCount} currentValue={state.guest_count} />
          )}
          {state.step === 3 && (
            <Step3Package 
              packages={data?.packages || []} 
              onSelect={setPackage} 
              currentValue={state.package_id} 
            />
          )}
          {state.step === 4 && (
            <Step4MenuCuration 
              categories={data?.categories || []} 
              selectedDishes={state.selected_dishes} 
              onToggle={toggleDish} 
              onContinue={nextStep}
            />
          )}
          {state.step === 5 && (
            <Step5Pricing 
              pkg={selectedPackage!} 
              guestCount={state.guest_count!} 
              selectedDishes={selectedDishes} 
              estimate={estimate} 
              onContinue={handleFinalize}
            />
          )}
          {state.step === 6 && (
            <Step6WhatsApp whatsappUrl={whatsappUrl} onReset={reset} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
