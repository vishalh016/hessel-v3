"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PACKAGES = [
  {
    id: "silver",
    name: "Silver",
    positioning: "Elegant essentials for intimate occasions",
    guests: "20–100",
    price: "650",
    inclusions: ["3 starters", "2 mains", "2 desserts", "Standard setup"],
    popular: false,
  },
  {
    id: "gold",
    name: "Gold",
    positioning: "Elevated experience with extended menu choice",
    guests: "50–300",
    price: "950",
    inclusions: ["5 starters", "4 mains", "3 desserts", "Live station", "Décor"],
    popular: true,
  },
  {
    id: "royal",
    name: "Royal",
    positioning: "Signature Hessel experience, no compromise",
    guests: "100–1000",
    price: "1400",
    inclusions: ["Full menu access", "Multiple live stations", "Premium service staff"],
    popular: false,
  },
  {
    id: "corporate",
    name: "Corporate",
    positioning: "Professional catering for business events",
    guests: "30–500",
    price: "800",
    inclusions: ["Tailored business menu", "Branded setup", "Dietary accommodations"],
    popular: false,
  },
];

/**
 * Packages Section.
 * Displays curated catering tiers with hover elevation.
 * BRD §7.3: Gold is highlighted as "Most Popular".
 */
export default function PackagesSection() {
  return (
    <section id="packages" className="py-section bg-base relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-semibold tracking-widest uppercase text-sm mb-4 inline-block"
          >
            Curated Selections
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-display-lg text-primary"
          >
            Experience <span className="italic text-accent">Tiers</span>
          </motion.h2>
        </div>

        {/* Desktop: Grid | Mobile: Horizontal Scroll */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 snap-x snap-mandatory scrollbar-hide">
          {PACKAGES.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className={cn(
                "min-w-[300px] md:min-w-0 snap-center p-8 rounded-3xl transition-all duration-500 flex flex-col",
                pkg.popular 
                  ? "bg-elevated border-2 border-accent shadow-accent-glow relative" 
                  : "bg-surface border border-divider/20"
              )}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-base text-[10px] font-bold uppercase tracking-widest py-1 px-4 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="font-display text-2xl text-primary mb-2">{pkg.name}</h3>
                <p className="text-secondary text-sm leading-relaxed h-10">
                  {pkg.positioning}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-accent text-sm font-semibold">from</span>
                  <span className="text-primary text-4xl font-display">₹{pkg.price}</span>
                  <span className="text-secondary text-sm">/ plate</span>
                </div>
                <p className="text-secondary/60 text-xs mt-2 uppercase tracking-widest">
                  Ideal for {pkg.guests} guests
                </p>
              </div>

              <div className="flex-1 space-y-4 mb-10">
                <p className="text-accent text-[10px] font-bold uppercase tracking-widest">Key Inclusions</p>
                <ul className="space-y-3">
                  {pkg.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-secondary">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent shrink-0 mt-0.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button className={cn(
                "w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all",
                pkg.popular
                  ? "bg-accent text-base hover:bg-accent-soft"
                  : "bg-base text-primary border border-divider/40 hover:border-accent hover:text-accent"
              )}>
                Customize Menu
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
