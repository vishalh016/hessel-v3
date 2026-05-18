"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Event Types Configuration
const EVENT_TYPES = [
  { id: "wedding", name: "Wedding" },
  { id: "annaprashan", name: "Annaprashan" },
  { id: "shradh", name: "Shraddho" },
  { id: "corporate", name: "Corporate" },
  { id: "festive", name: "Festive Gatherings" },
];

// Food Preferences Configuration
const FOOD_PREFS = [
  { id: "veg", name: "Veg" },
  { id: "mixed", name: "Mixed" },
  { id: "non-veg", name: "Pure Non-Veg" },
];

// Serving Styles Configuration
const SERVICE_TYPES = [
  { id: "buffet", name: "Buffet" },
  { id: "sitdown", name: "Fine Dining" },
];

// Fully Dynamic Editorial Signature Menus
const SIGNATURE_MENUS = [
  // --- WEDDING MENUS ---
  {
    id: "wedding-royal-mixed",
    applicableEvents: ["wedding"],
    dietary: "mixed",
    category: "Weddings / Mixed Menu",
    name: "Grand Royal Vivah",
    tagline: "Prestige non-vegetarian wedding feast featuring Hessel's crown jewel recipes.",
    dishes: ["Kolkata Mutton Biryani", "Gondhoraj Bhetki Paturi", "Chicken Rezala", "Baked Mihidana with Rabri"],
  },
  {
    id: "wedding-zamindari-nonveg",
    applicableEvents: ["wedding"],
    dietary: "non-veg",
    category: "Weddings / Pure Non-Veg",
    name: "Zamindari Vivah Bhoj",
    tagline: "Traditional grand Bengali wedding delicacies set in ancestral royal style.",
    dishes: ["Basanti Pulao", "Kosha Mangsho (Mutton)", "Chingri Malaikari", "Nolen Gurer Sandesh"],
  },
  {
    id: "wedding-temple-veg",
    applicableEvents: ["wedding"],
    dietary: "veg",
    category: "Weddings / Vegetarian",
    name: "Devotional Wedding Feast",
    tagline: "A majestic, pure-vegetarian wedding spread inspired by ancient temple legacy recipes.",
    dishes: ["Radhaballabhi & Alur Dom", "Gobindobhog Ghee Bhaat", "Chanar Kofta Kalia", "Narkel Cholar Dal"],
  },

  // --- ANNAPRASHAN MENUS ---
  {
    id: "annaprashan-prasad-veg",
    applicableEvents: ["annaprashan"],
    dietary: "veg",
    category: "Annaprashan / Vegetarian",
    name: "Suno Gobindobhog Prasad",
    tagline: "Auspicious pure-vegetarian offering centering around the baby's first rice feeding.",
    dishes: ["Gobindobhog Payesh (Kheer)", "Gold-Crusted Luchi", "Narkel Cholar Dal", "Chanar Dalna"],
  },
  {
    id: "annaprashan-mukhebhaat-mixed",
    applicableEvents: ["annaprashan"],
    dietary: "mixed",
    category: "Annaprashan / Mixed Menu",
    name: "Mukhe Bhaat Special",
    tagline: "A grand, wholesome family celebration spread featuring classic river fish and sweet delicacies.",
    dishes: ["Traditional Kheer/Payesh", "Katla Kalia", "Basanti Pulao", "Classic Mishti Doi"],
  },
  {
    id: "annaprashan-royal-nonveg",
    applicableEvents: ["annaprashan"],
    dietary: "non-veg",
    category: "Annaprashan / Pure Non-Veg",
    name: "Royal Rice Ceremony Feast",
    tagline: "Elegant modern and classic non-veg offerings for guests celebrating the new milestone.",
    dishes: ["Kaju Kishmish Pulao", "Chingri Malaikari", "Kosha Mangsho", "Nolen Gur Sandesh"],
  },

  // --- SHRADH CEREMONY MENUS ---
  {
    id: "shradh-niramish-veg",
    applicableEvents: ["shradh"],
    dietary: "veg",
    category: "Shradh Ceremony / Vegetarian",
    name: "Niramish Shradh Bhoj",
    tagline: "A pure Satvik, traditional memorial feast served with ultimate devotion.",
    dishes: ["Sada Bhaat & Ghee", "Sona Muger Dal with Veggies", "Alur Dom (Satvik)", "Nolen Gurer Sandesh"],
  },
  {
    id: "shradh-matsyamukhi-mixed",
    applicableEvents: ["shradh"],
    dietary: "mixed",
    category: "Shradh Ceremony / Mixed Menu",
    name: "Matsyamukhi Shanti Bhoj",
    tagline: "The traditional peaceful ending ceremony feast featuring river fish delicacies.",
    dishes: ["Gobindobhog Ghee Bhaat", "Machher Matha Moong Dal", "Rui Machher Kalia", "Classic Mishti Doi"],
  },

  // --- CORPORATE MENUS ---
  {
    id: "corp-buffet-mixed",
    applicableEvents: ["corporate"],
    dietary: "mixed",
    category: "Corporate / Mixed Menu",
    name: "Corporate Premium Buffet",
    tagline: "Polished multi-cuisine and Bengali fusion setup designed for client networking events.",
    dishes: ["Gondhoraj Chicken Scaloppini", "Panch Phoron Sea Bass", "Basanti Pulao", "Nolen Gur Panna Cotta"],
  },
  {
    id: "corp-exec-veg",
    applicableEvents: ["corporate"],
    dietary: "veg",
    category: "Corporate / Vegetarian",
    name: "Corporate Executive Lunch",
    tagline: "Light, healthy, yet sophisticated traditional pure-veg corporate luncheon.",
    dishes: ["Sona Muger Dal", "Radhaballabhi & Kashmiri Alur Dom", "Chanar Jugalbandhi", "Baked Sandesh"],
  },

  // --- FESTIVE MENUS ---
  {
    id: "festive-puja-veg",
    applicableEvents: ["festive"],
    dietary: "veg",
    category: "Festive Gatherings / Vegetarian",
    name: "Durga Puja Bhog Bhoj",
    tagline: "The rich, festive flavors of pure vegetarian Puja Bhog served under a divine atmosphere.",
    dishes: ["Bhuni Khichuri", "Labra (Mixed Veg)", "Beguni & Alur Dum", "Tomato Chutney with Papad"],
  },
  {
    id: "festive-milan-nonveg",
    applicableEvents: ["festive"],
    dietary: "non-veg",
    category: "Festive Gatherings / Pure Non-Veg",
    name: "Bijoya Dashami Milan",
    tagline: "A grand celebratory non-veg spread to mark the joy of victory and festive reunions.",
    dishes: ["Luchi & Kosha Mangsho", "Bhetki Fish Fry", "Basanti Pulao", "Classic Sweet Platter"],
  },
  {
    id: "festive-social-mixed",
    applicableEvents: ["festive"],
    dietary: "mixed",
    category: "Festive Gatherings / Mixed Menu",
    name: "Festive Social Buffet",
    tagline: "Warm, atmospheric gathering menu designed for multi-generational social circles.",
    dishes: ["Mutton Biryani", "Chingri Malaikari", "Radhaballabhi", "Mishti Doi & Payesh"],
  },
];

export default function PackagesSection() {
  const [selectedEvent, setSelectedEvent] = useState("wedding");
  const [guestCount, setGuestCount] = useState(250);
  const [foodPref, setFoodPref] = useState("mixed");
  const [serviceType, setServiceType] = useState("buffet");
  const carouselRef = useRef<HTMLDivElement>(null);

  // Dynamic filter logic that reacts in real-time to both selections
  const filteredMenus = SIGNATURE_MENUS.filter((menu) => {
    const matchesEvent = menu.applicableEvents.includes(selectedEvent);
    
    // Food preference filtering rules
    let matchesFood = false;
    if (foodPref === "mixed") {
      matchesFood = true; 
    } else if (foodPref === "veg") {
      matchesFood = menu.dietary === "veg";
    } else if (foodPref === "non-veg") {
      matchesFood = menu.dietary === "non-veg" || menu.dietary === "mixed";
    }
    
    return matchesEvent && matchesFood;
  });

  // Dynamic WhatsApp consultation link pre-filled with custom configurator choices
  const getWhatsAppLink = (menuName?: string) => {
    const eventName = EVENT_TYPES.find((e) => e.id === selectedEvent)?.name || selectedEvent;
    const foodName = FOOD_PREFS.find((f) => f.id === foodPref)?.name || foodPref;
    const serviceName = SERVICE_TYPES.find((s) => s.id === serviceType)?.name || serviceType;
    
    const baseMessage = `Hi Hessel, I would love to curate a custom menu experience! I used your premium configurator with these details:\n\n- Event: ${eventName}\n- Guests: ${guestCount}${guestCount >= 2500 ? "+" : ""}\n- Food Preference: ${foodName}\n- Serving Style: ${serviceName}`;
    const finalMessage = menuName 
      ? `${baseMessage}\n- Selected Menu Template: ${menuName}`
      : `${baseMessage}\n- I want to curate my own bespoke menu from scratch!`;
    
    return `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919162917996'}?text=${encodeURIComponent(finalMessage)}`;
  };

  return (
    <section id="packages" className="py-14 md:py-16 bg-base relative overflow-hidden border-t border-accent/5">
      {/* Dynamic Range Slider Custom Tactile Styling */}
      <style jsx global>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #E2B680;
          border: 2px solid #1A050B;
          box-shadow: 0 0 10px rgba(226, 182, 128, 0.6);
          cursor: pointer;
          transition: transform 0.2s, background-color 0.2s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          background: #D4A373;
        }
        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #E2B680;
          border: 2px solid #1A050B;
          box-shadow: 0 0 10px rgba(226, 182, 128, 0.6);
          cursor: pointer;
          transition: transform 0.2s, background-color 0.2s;
        }
        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.2);
          background: #D4A373;
        }
      `}</style>

      {/* Cinematic Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Layer 1: THE PHYSICAL SILK SURFACE (High-Res Image) */}
        <div className="absolute inset-0 select-none pointer-events-none opacity-40">
          <Image
            src="/images/bg-1.png"
            alt="Hessel Heritage Silk"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#4A1625]/50 mix-blend-multiply" />
        </div>

        {/* Dynamic slow ambient candlelight shimmer */}
        <motion.div 
            animate={{ opacity: [0.1, 0.16, 0.1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] blur-[120px] rounded-full"
        />
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(26,5,11,0.96)_95%)]" />

        {/* Scattered Alpana Watermark illustration */}
        <div 
            className="absolute inset-0 opacity-[0.06] mix-blend-screen pointer-events-none select-none" 
            style={{ 
                backgroundImage: `url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")`, 
                backgroundSize: "260px", 
                backgroundRepeat: "repeat" 
            }} 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="text-accent font-semibold tracking-[0.25em] uppercase text-xs mb-2 inline-block"
          >
            Bespoke Gatherings
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="font-display font-light text-5xl md:text-6xl text-accent-soft tracking-wide leading-tight"
          >
            Hospitality <span className="italic font-light text-accent">Configurator</span>
          </motion.h2>
        </div>

        {/* 1. CINEMATIC CONTINUOUS INLINE FILTER SYSTEM (Highly Centered & Ultra-Tight) */}
        <div className="w-full py-1 my-2 max-w-2xl mx-auto flex flex-col gap-2.5 relative z-10">
          
          {/* ROW 1: EVENTS */}
          <div className="flex flex-row items-center justify-center gap-3 w-full max-w-2xl mx-auto py-1">
            <span className="font-body text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-accent-soft/40 font-bold shrink-0 select-none">
              Events:
            </span>
            <div className="relative flex-1 flex items-center overflow-hidden">
              <div className="flex items-center gap-4 md:gap-5 overflow-x-auto scrollbar-hide py-1.5 pr-8 flex-nowrap w-full scroll-smooth">
                {EVENT_TYPES.map((evt, idx) => {
                  const isActive = selectedEvent === evt.id;
                  return (
                    <React.Fragment key={evt.id}>
                      {idx > 0 && <span className="text-accent-soft/20 text-xs shrink-0 select-none">·</span>}
                      <button
                        onClick={() => setSelectedEvent(evt.id)}
                        className={cn(
                          "text-xs font-bold uppercase tracking-[0.22em] transition-all duration-300 pb-0.5 shrink-0 border-b",
                          isActive 
                            ? "border-accent text-accent shadow-[0_1px_0_rgba(212,163,115,0.4)]" 
                            : "border-transparent text-accent-soft/45 hover:text-accent-soft"
                        )}
                      >
                        {evt.name}
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>
              {/* Soft right edge discoverability fade */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-base via-base/30 to-transparent pointer-events-none z-10" />
              {/* Minimal pulsing gold arrow indicator */}
              <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none z-20 opacity-40 animate-pulse">
                <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* ROW 2: GUEST COUNT */}
          <div className="flex flex-row items-center justify-center gap-4 py-1 w-full max-w-md mx-auto">
            <span className="font-body text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-accent-soft/40 font-bold shrink-0 select-none">
              Guest Count:
            </span>
            <div className="w-[130px] md:w-[150px] py-1 flex items-center">
              <input
                type="range"
                min="10"
                max="2500"
                step="10"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-[4px] bg-accent/20 rounded-lg appearance-none cursor-pointer accent-accent focus:outline-none"
                style={{
                  background: `linear-gradient(to right, #D4A373 0%, #D4A373 ${((guestCount - 10) / 2490) * 100}%, rgba(212, 163, 115, 0.15) ${((guestCount - 10) / 2490) * 100}%, rgba(212, 163, 115, 0.15) 100%)`
                }}
              />
            </div>
            <span className="font-display font-light italic text-lg text-accent tracking-wide shrink-0">
              {guestCount === 2500 ? "2500+" : guestCount} <span className="font-body text-[8px] tracking-widest uppercase font-semibold text-accent-soft/50 not-italic ml-0.5">Guests</span>
            </span>
          </div>

          {/* ROW 3: FOOD PREFERENCE */}
          <div className="flex flex-row items-center justify-center gap-3 flex-wrap text-center py-1">
            <span className="font-body text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-accent-soft/40 font-bold shrink-0 select-none">
              Food Preference:
            </span>
            <div className="flex items-center gap-3 md:gap-5 flex-wrap justify-center">
              {FOOD_PREFS.map((opt, idx) => {
                const isActive = foodPref === opt.id;
                return (
                  <React.Fragment key={opt.id}>
                    {idx > 0 && <span className="text-accent-soft/20 text-xs select-none">|</span>}
                    <button
                      onClick={() => setFoodPref(opt.id)}
                      className={cn(
                        "text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 pb-0.5 shrink-0 border-b",
                        isActive 
                          ? "border-accent text-accent shadow-[0_1px_0_rgba(212,163,115,0.4)]" 
                          : "border-transparent text-accent-soft/45 hover:text-accent-soft"
                      )}
                    >
                      {opt.name}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* ROW 4: SERVING STYLE */}
          <div className="flex flex-row items-center justify-center gap-3 flex-wrap text-center py-1">
            <span className="font-body text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-accent-soft/40 font-bold shrink-0 select-none">
              Serving Style:
            </span>
            <div className="flex items-center gap-3 md:gap-5 flex-wrap justify-center">
              {SERVICE_TYPES.map((opt, idx) => {
                const isActive = serviceType === opt.id;
                return (
                  <React.Fragment key={opt.id}>
                    {idx > 0 && <span className="text-accent-soft/20 text-xs select-none">|</span>}
                    <button
                      onClick={() => setServiceType(opt.id)}
                      className={cn(
                        "text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 pb-0.5 shrink-0 border-b",
                        isActive 
                          ? "border-accent text-accent shadow-[0_1px_0_rgba(212,163,115,0.4)]" 
                          : "border-transparent text-accent-soft/45 hover:text-accent-soft"
                      )}
                    >
                      {opt.name}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

        </div>

        {/* 2. DYNAMIC HORIZONTAL MENU CAROUSEL */}
        <div className="relative w-full py-1 z-10">
          
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto gap-8 pb-10 pt-4 snap-x snap-mandatory scrollbar-hide w-full cursor-grab active:cursor-grabbing"
            style={{ scrollBehavior: "smooth" }}
          >
            <AnimatePresence mode="popLayout">
              {filteredMenus.length > 0 ? (
                filteredMenus.map((menu) => (
                  <motion.div
                    key={menu.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={cn(
                      "snap-center p-6 md:p-7 rounded-3xl bg-[#1A050B]/60 backdrop-blur-md border border-accent/10 w-[85vw] md:w-[470px] shrink-0 relative overflow-hidden flex flex-col justify-between min-h-[290px] md:min-h-[310px] transition-all duration-500 hover:scale-[1.02] hover:border-accent/40 hover:bg-[#20070e]/80 hover:shadow-[0_0_50px_rgba(212,163,115,0.15)]"
                    )}
                  >
                    {/* Atmospheric soft internal flare */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] via-transparent to-transparent pointer-events-none" />

                    {/* Card Top: Category & Name */}
                    <div className="flex flex-col gap-1.5 relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="font-body text-[7px] tracking-[0.25em] uppercase font-semibold text-accent/40">
                          {menu.category}
                        </span>
                        <span className="font-body text-[6px] tracking-[0.2em] uppercase font-bold text-accent-soft/20">
                          Editorial Showcasing
                        </span>
                      </div>
                      
                      <div>
                        <h3 className="font-display font-light text-3xl md:text-[34px] text-accent-soft tracking-wide leading-tight">
                          {menu.name}
                        </h3>
                        <p className="font-body text-xs text-accent-soft/70 font-light mt-2 italic leading-relaxed">
                          {menu.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Card Mid: Signature Dishes (Refined Typographic Style) */}
                    <div className="flex flex-col gap-1 my-3 relative z-10">
                      <span className="font-body text-[7px] tracking-[0.2em] uppercase text-accent-soft/30 font-bold block mb-0.5">
                        Featured Tasting
                      </span>
                      <p className="font-body text-[13px] md:text-[14px] text-accent-soft/85 tracking-wide font-medium leading-relaxed">
                        {menu.dishes.join("  •  ")}
                      </p>
                    </div>

                    {/* Card Bottom: Refined Underlined CTA (Pristine, atmospheric layout without "Atmospheric Design") */}
                    <div className="flex flex-col gap-2 relative z-10 mt-3 pt-1">
                      <div className="pt-1">
                        <a
                          href={getWhatsAppLink(menu.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/cta inline-flex items-center gap-1.5 font-body text-xs font-bold uppercase tracking-[0.25em] text-accent transition-all duration-300"
                        >
                          <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent after:scale-x-0 group-hover/cta:after:scale-x-100 after:origin-bottom-left after:transition-transform after:duration-300">
                            Request Custom Curation
                          </span>
                          <span className="inline-block transition-transform duration-300 transform group-hover/cta:translate-x-1.5 group-hover/cta:text-accent-soft">
                            →
                          </span>
                        </a>
                      </div>
                    </div>

                  </motion.div>
                ))
              ) : (
                // Safe Satvik / Bespoke fallback card inside the carousel flow
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="snap-center p-6 md:p-7 rounded-3xl bg-[#1A050B]/60 backdrop-blur-md border border-accent/10 w-[85vw] md:w-[470px] shrink-0 relative overflow-hidden flex flex-col justify-between min-h-[290px] md:min-h-[310px]"
                >
                  <div className="flex flex-col gap-3 text-center items-center justify-center flex-1">
                    <span className="text-3xl">🕊️</span>
                    <h3 className="font-display font-light text-2xl text-accent-soft tracking-wide mt-1">
                      Bespoke Consultation
                    </h3>
                    <p className="font-body text-xs text-accent-soft/70 font-light leading-relaxed max-w-sm mt-0.5">
                      For this unique configuration (such as special Satvik or fish memorial feasts), Hessel recommends a highly tailored, custom menu consultation. Let us partner with you directly.
                    </p>
                  </div>
                  
                  <div className="pt-2 w-full text-center">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/cta inline-flex items-center gap-1.5 font-body text-xs font-bold uppercase tracking-[0.25em] text-accent transition-all duration-300"
                    >
                      <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent after:scale-x-0 group-hover/cta:after:scale-x-100 after:origin-bottom-left after:transition-transform after:duration-300">
                        Bespoke Consultation
                      </span>
                      <span className="inline-block transition-transform duration-300 transform group-hover/cta:translate-x-1.5 group-hover/cta:text-accent-soft">
                        →
                      </span>
                    </a>
                  </div>
                </motion.div>
              )}

              {/* INTEGRATED ULTIMATE BESPOKE CAROUSEL CARD */}
              <motion.div
                key="bespoke-card"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="snap-center p-6 md:p-7 rounded-3xl bg-gradient-to-r from-accent/[0.04] to-accent/[0.09] border border-accent/20 w-[85vw] md:w-[470px] shrink-0 relative overflow-hidden flex flex-col justify-between min-h-[290px] md:min-h-[310px] shadow-[0_4px_25px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-[1.02] hover:border-accent/40 hover:shadow-[0_0_50px_rgba(212,163,115,0.15)]"
              >
                {/* Visual Glow */}
                <div className="absolute right-0 top-0 w-44 h-44 bg-accent/5 blur-2xl rounded-full pointer-events-none" />

                <div className="flex flex-col gap-1.5 relative z-10">
                  <span className="font-body text-[7px] tracking-[0.25em] uppercase font-bold text-accent">
                    Bespoke Design
                  </span>
                  <div>
                    <h3 className="font-display font-light text-3xl md:text-[34px] text-accent-soft tracking-wide leading-snug">
                      Curate Your Own Experience
                    </h3>
                    <p className="font-body text-xs text-accent-soft/70 font-light mt-2 leading-relaxed">
                      Prefer a completely customized, bespoke menu built specifically for your culinary tastes? Partner directly with our chefs to build your dream menu card.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 relative z-10 mt-3 pt-1">
                  <div className="pt-1">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/cta inline-flex items-center gap-1.5 font-body text-xs font-bold uppercase tracking-[0.25em] text-accent transition-all duration-300"
                    >
                      <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent after:scale-x-0 group-hover/cta:after:scale-x-100 after:origin-bottom-left after:transition-transform after:duration-300">
                        Begin Bespoke Design
                      </span>
                      <span className="inline-block transition-transform duration-300 transform group-hover/cta:translate-x-1.5 group-hover/cta:text-accent-soft">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Hint indicator */}
          <div className="flex justify-center items-center gap-1.5 mt-2 opacity-40">
            <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
            <span className="font-body text-[8px] tracking-[0.2em] uppercase font-bold text-accent-soft">
              Explore Dynamic Custom Menus
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
          </div>

        </div>

      </div>
    </section>
  );
}
