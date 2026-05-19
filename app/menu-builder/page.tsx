"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import FloatingNav from "@/components/layout/FloatingNav";
import Footer from "@/components/layout/Footer";
import SilkBackground from "@/components/layout/SilkBackground";
import { cn } from "@/lib/utils";

// Occasions Inline Data
const OCCASIONS = [
  { id: "wedding", name: "Wedding" },
  { id: "annaprashan", name: "Annaprashan" },
  { id: "shraddho", name: "Shraddho" },
  { id: "corporate", name: "Corporate" },
  { id: "festive", name: "Festive Gatherings" },
  { id: "private", name: "Private Dining" }
];

// Food Preference Inline Data
const FOOD_PREFS = [
  { id: "veg", name: "Veg" },
  { id: "mixed", name: "Mixed" },
  { id: "nonveg", name: "Pure Non-Veg" }
];

// Serving Style Inline Data
const SERVICE_STYLES = [
  { id: "buffet", name: "Buffet" },
  { id: "plated", name: "Fine Dining" }
];

// Live Counters Data
const LIVES = [
  { id: "chaat", label: "Bengali Chaat Theatre", desc: "Interactive customized street food stations featuring spicy Gondhoraj water fountains.", src: "/images/durga puja.png" },
  { id: "kebab", label: "Mughlai Kebab Station", desc: "Succulent skewered signature kebabs slow-grilled over charcoal embers.", src: "/images/exp-private.png" },
  { id: "roll", label: "Kolkata Roll Counter", desc: "Flaky hot parathas hand-rolled with spiced premium fillings.", src: "/images/exp-weddings.png" },
  { id: "mishti", label: "Mishti Plating Bar", desc: "Hot baked rosogollas and flambéed sandesh presented live by sweets artisans.", src: "/images/durga_puja_bhog.png" },
  { id: "tea", label: "Tea & Adda Corner", desc: "Fragrant clay-cup masala teas served in an authentic elite setting.", src: "/images/exp-corporate.png" },
  { id: "grill", label: "Seafood Grill Experience", desc: "Exquisite whole fresh river fish grilled live with mustard and herbs.", src: "/images/durga-bhog.png" }
];

// Curated Food Categories
const MENU_SECTIONS = [
  {
    id: "starters",
    title: "Starters",
    subtitle: "Exquisite opening delicacies to awaken the palate",
    items: [
      { id: "st-1", name: "Bipodtarini Cutlet", desc: "Gold crumbed traditional fish patty with fresh kasundi.", src: "/images/exp-weddings.png" },
      { id: "st-2", name: "Gondhoraj Fish Fry", desc: "Premium river Bhetki fillet flavored with king lime.", src: "/images/veg.png" },
      { id: "st-3", name: "Mochar Chop", desc: "Crisp spiced croquettes made with wild banana flowers.", src: "/images/exp-private.png" },
      { id: "st-4", name: "Kakra Chop", desc: "Delicate golden cakes stuffed with spiced river crab meat.", src: "/images/exp-festival.png" }
    ]
  },
  {
    id: "mains",
    title: "Main Course",
    subtitle: "Grand centerpiece curations for the royal feast",
    items: [
      { id: "mn-1", name: "Kolkata Mutton Biryani", desc: "Slow-cooked mutton with fragrant rice, egg, and saffron potato.", src: "/images/durga-bhog.png" },
      { id: "mn-2", name: "Chingri Malaikari", desc: "Jumbo gold tiger prawns slow-simmered in coconut cream.", src: "/images/durga-bhog-non-veg.png" },
      { id: "mn-3", name: "Bhetki Paturi", desc: "Mustard marinated river bhetki steamed inside broad banana leaves.", src: "/images/durga_puja_bhog.png" }
    ]
  },
  {
    id: "specials",
    title: "Bengali Specials",
    subtitle: "Authentic slow-paced heritage cooking elements",
    items: [
      { id: "sp-1", name: "Heritage Kosha Mangsho", desc: "Thick slow-roasted mahogany mutton curry.", src: "/images/zamindari_fine_dining.png" },
      { id: "sp-2", name: "Sona Muger Dal with Narkel", desc: "Golden mung dal finished with crisp coconut chips.", src: "/images/wedding-couple-food.png" },
      { id: "sp-3", name: "Woodfired Luchi & Chholar Dal", desc: "Hot puffed whole wheat bread with savory sweet Bengal gram.", src: "/images/wedding-eat.png" }
    ]
  },
  {
    id: "desserts",
    title: "Desserts & Mishti",
    subtitle: "Heavenly nectarous sweet finishes set in clay",
    items: [
      { id: "ds-1", name: "Baked Mihidana with Rabri", desc: "Baked fine sweet pearls covered in condensed milk cream.", src: "/images/durga puja.png" },
      { id: "ds-2", name: "Nolen Gurer Payesh", desc: "Heritage rice pudding crafted with liquid date palm jaggery.", src: "/images/wedding-bride.png" },
      { id: "ds-3", name: "Traditional Mishti Doi", desc: "Sweet fermented red yogurt set in earthy clay pots.", src: "/images/wedding-couple.png" }
    ]
  },
  {
    id: "beverages",
    title: "Beverages",
    subtitle: "Refreshing local elixirs and hot traditional brews",
    items: [
      { id: "bv-1", name: "Gondhoraj Aam Panna", desc: "Chilled fire-roasted green mango extract with lime leaves.", src: "/images/hero-bg.png" },
      { id: "bv-2", name: "Ahar-Ami Saffron Tea", desc: "Premium tea blend brewed in clay cups with royal saffron.", src: "/images/exp-corporate.png" }
    ]
  }
];

export default function LuxuryFeastConfigurator() {
  const [occasion, setOccasion] = useState("wedding");
  const [guestCount, setGuestCount] = useState(250);
  const [dietary, setDietary] = useState("mixed");
  const [servingStyle, setServingStyle] = useState("buffet");
  const [liveEnabled, setLiveEnabled] = useState(false);
  const [selectedLives, setSelectedLives] = useState<string[]>([]);
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);

  // Bidirectional events scroll tracking for mobile
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const eventScrollRef = useRef<HTMLDivElement>(null);

  const handleEventScroll = () => {
    if (eventScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = eventScrollRef.current;
      setShowLeftArrow(scrollLeft > 2);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    handleEventScroll();
    window.addEventListener("resize", handleEventScroll);
    return () => window.removeEventListener("resize", handleEventScroll);
  }, []);

  // Selection Toggles
  const toggleDish = (id: string) => {
    if (selectedDishes.includes(id)) {
      setSelectedDishes(selectedDishes.filter(d => d !== id));
    } else {
      setSelectedDishes([...selectedDishes, id]);
    }
  };

  const toggleLive = (id: string) => {
    if (selectedLives.includes(id)) {
      setSelectedLives(selectedLives.filter(l => l !== id));
    } else {
      setSelectedLives([...selectedLives, id]);
    }
  };

  const getWhatsAppMessage = () => {
    const occName = OCCASIONS.find(o => o.id === occasion)?.name || occasion;
    const dietName = FOOD_PREFS.find(d => d.id === dietary)?.name || dietary;
    const styleName = servingStyle === "buffet" ? "Royal Buffet" : "Fine Dining Sit-down";
    const livesList = selectedLives.map(id => LIVES.find(l => l.id === id)?.label).join(", ");
    
    const dishesList = selectedDishes.map(dishId => {
      for (const section of MENU_SECTIONS) {
        const d = section.items.find(item => item.id === dishId);
        if (d) return d.name;
      }
      return null;
    }).filter(Boolean).join(", ");

    const msg = `Hi Hessel, I have designed a custom Bengali feast on your minimalist Menu Builder!\n\n` +
      `⚜️ Occasion: ${occName}\n` +
      `⚜️ Expected Count: ${guestCount} Guests\n` +
      `⚜️ Food Direction: ${dietName}\n` +
      `⚜️ Serving Style: ${styleName}\n\n` +
      `🍽️ Custom Selection Details:\n` +
      `• Curated Dishes: ${dishesList || 'Chef Choice Curation'}\n` +
      `• Live Counters: ${livesList || 'None Selected'}\n\n` +
      `Please connect with me to finalize our bespoke feast card arrangement!`;

    return `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919162917996'}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <SilkBackground>
      {/* Floating navigation overlay */}
      <FloatingNav />

      {/* Atmospheric Silk Parallax Layout Container */}
      <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-transparent">
        
        {/* Soft atmospheric flares */}
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#1A050B]/95 via-[#1A050B]/40 to-transparent pointer-events-none z-0" />
        <div className="absolute top-[25%] left-[-10%] w-[500px] h-[500px] bg-accent/[0.01] blur-[140px] rounded-full pointer-events-none z-0" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-accent/[0.02] blur-[140px] rounded-full pointer-events-none z-0" />

        {/* 1. MOBILE STICKY PROGRESS SUMMARY BAR */}
        <div className="fixed top-[70px] inset-x-0 z-40 bg-[#150307]/90 backdrop-blur-xl border-b border-accent/10 px-6 py-3 block md:hidden shadow-lg">
          <div className="flex justify-between items-center max-w-lg mx-auto">
            <div className="flex flex-col">
              <span className="font-body text-[8px] tracking-[0.25em] uppercase text-accent font-bold">Bespoke Feast</span>
              <span className="font-display font-light text-sm text-accent-soft italic mt-0.5">
                {guestCount} Guests · {OCCASIONS.find(o => o.id === occasion)?.name}
              </span>
            </div>
            <a
              href={getWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-accent to-[#D4A373] text-[#1A050B] font-bold text-[10px] uppercase tracking-wider rounded-full shadow-[0_3px_15px_rgba(212,163,115,0.25)]"
            >
              Curate →
            </a>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-[92vw] max-w-[1550px] mx-auto px-[clamp(1.5rem,3vw,3rem)] relative z-10">
          
          {/* Header block with elegant Hessel branding */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1.5 }}
              className="text-accent font-semibold tracking-[0.3em] uppercase text-xs mb-3 inline-block font-body"
            >
              Heritage Configurator
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-display font-light text-5xl md:text-6xl text-accent-soft tracking-wide leading-tight"
            >
              ঐতিহ্যের <span className="italic font-light text-accent">আসর</span>
            </motion.h1>
          </div>

          {/* REDESIGNED CONFIGURATOR: DIRECTLY ON SILK TEXTURED BACKGROUND (No heavy panels/boxes) */}
          <div className="w-full max-w-2xl mx-auto flex flex-col gap-8 md:gap-9 mb-24 relative z-10 px-4 md:px-0">
            
            {/* ROW 1: EVENTS */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full pb-2">
              <span className="font-body text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-accent-soft/40 font-bold shrink-0 select-none">
                EVENTS:
              </span>
              <div className="relative flex-1 w-full flex items-center overflow-hidden">
                <div className={cn(
                  "absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-base via-base/30 to-transparent pointer-events-none z-10 transition-opacity duration-300",
                  showLeftArrow ? "opacity-100" : "opacity-0"
                )} />
                <div className={cn(
                  "absolute left-1 top-1/2 -translate-y-1/2 pointer-events-none z-20 transition-opacity duration-300",
                  showLeftArrow ? "opacity-40 animate-pulse" : "opacity-0"
                )}>
                  <svg className="w-3.5 h-3.5 text-accent rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                <div 
                  ref={eventScrollRef}
                  onScroll={handleEventScroll}
                  className="flex items-center gap-4 md:gap-5 overflow-x-auto scrollbar-hide py-1 px-4 flex-nowrap w-full scroll-smooth justify-start md:justify-center"
                >
                  {OCCASIONS.map((evt, idx) => {
                    const isActive = occasion === evt.id;
                    return (
                      <React.Fragment key={evt.id}>
                        {idx > 0 && <span className="text-accent-soft/20 text-xs shrink-0 select-none">·</span>}
                        <button
                          onClick={() => setOccasion(evt.id)}
                          className={cn(
                            "text-xs font-bold uppercase tracking-[0.22em] transition-all duration-300 pb-0.5 shrink-0 border-b cursor-pointer font-body",
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

                <div className={cn(
                  "absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-base via-base/30 to-transparent pointer-events-none z-10 transition-opacity duration-300",
                  showRightArrow ? "opacity-100" : "opacity-0"
                )} />
                <div className={cn(
                  "absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none z-20 transition-opacity duration-300",
                  showRightArrow ? "opacity-40 animate-pulse" : "opacity-0"
                )}>
                  <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* ROW 2: GUEST COUNT */}
            <div className="flex flex-col gap-5 w-full pb-2">
              <div className="flex justify-between items-center px-1">
                <span className="font-body text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-accent-soft/40 font-bold select-none">
                  GUEST COUNT:
                </span>
                <span className="font-display font-light italic text-xl text-accent tracking-wide">
                  {guestCount === 2500 ? "2500+" : guestCount} <span className="font-body text-[8px] tracking-widest uppercase font-semibold text-accent-soft/40 not-italic ml-0.5">Guests</span>
                </span>
              </div>
              <div className="w-full px-1 py-1">
                <input
                  type="range"
                  min="20"
                  max="2500"
                  step="10"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full h-[4px] bg-accent/20 rounded-lg appearance-none cursor-pointer accent-accent focus:outline-none"
                  style={{
                    background: `linear-gradient(to right, #D4A373 0%, #D4A373 ${((guestCount - 20) / 2480) * 100}%, rgba(212, 163, 115, 0.1) ${((guestCount - 20) / 2480) * 100}%, rgba(212, 163, 115, 0.1) 100%)`
                  }}
                />
              </div>
            </div>

            {/* ROW 3: FOOD PREFERENCE */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full pb-2">
              <span className="font-body text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-accent-soft/40 font-bold select-none">
                FOOD PREFERENCE:
              </span>
              <div className="flex items-center gap-6 py-1">
                {FOOD_PREFS.map((opt, idx) => {
                  const isActive = dietary === opt.id;
                  return (
                    <React.Fragment key={opt.id}>
                      {idx > 0 && <span className="text-accent-soft/20 text-xs select-none">|</span>}
                      <button
                        onClick={() => setDietary(opt.id)}
                        className={cn(
                          "text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 pb-0.5 shrink-0 border-b cursor-pointer font-body",
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
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full pb-2">
              <span className="font-body text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-accent-soft/40 font-bold select-none">
                SERVING STYLE:
              </span>
              <div className="flex items-center gap-6 py-1">
                {SERVICE_STYLES.map((opt, idx) => {
                  const isActive = servingStyle === opt.id;
                  return (
                    <React.Fragment key={opt.id}>
                      {idx > 0 && <span className="text-accent-soft/20 text-xs select-none">|</span>}
                      <button
                        onClick={() => setServingStyle(opt.id)}
                        className={cn(
                          "text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 pb-0.5 shrink-0 border-b cursor-pointer font-body",
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

            {/* ROW 5: LIVE COUNTERS */}
            <div className="flex flex-col gap-6 w-full pb-2">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
                <span className="font-body text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-accent-soft/40 font-bold select-none">
                  LIVE COUNTERS:
                </span>
                <div className="flex items-center gap-6 py-1">
                  {[
                    { id: false, name: "Off" },
                    { id: true, name: "Enabled" }
                  ].map((opt, idx) => {
                    const isActive = liveEnabled === opt.id;
                    return (
                      <React.Fragment key={idx}>
                        {idx > 0 && <span className="text-accent-soft/20 text-xs select-none">|</span>}
                        <button
                          onClick={() => setLiveEnabled(opt.id)}
                          className={cn(
                            "text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 pb-0.5 shrink-0 border-b cursor-pointer font-body",
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

              {/* Reveal Live Subsection: Live Culinary Experiences */}
              <AnimatePresence>
                {liveEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full overflow-hidden pt-2"
                  >
                    <h3 className="font-body text-[9px] tracking-[0.25em] uppercase text-accent/50 mb-6 font-bold text-center md:text-left">
                      Live Culinary Experiences:
                    </h3>
                    
                    {/* Horizontally scrollable live counter cards */}
                    <div className="relative w-full py-1">
                      <div className="flex overflow-x-auto gap-5 pb-5 pt-1 scrollbar-hide snap-x snap-mandatory scroll-smooth w-full">
                        {LIVES.map((item) => {
                          const isSelected = selectedLives.includes(item.id);
                          return (
                            <div
                              key={item.id}
                              onClick={() => toggleLive(item.id)}
                              className={cn(
                                "snap-center p-3.5 rounded-3xl bg-[#1A050B]/60 backdrop-blur-md border w-[240px] md:w-[270px] shrink-0 relative overflow-hidden flex flex-col justify-between min-h-[320px] cursor-pointer transition-all duration-500 hover:scale-[1.01]",
                                isSelected ? "border-accent shadow-[0_0_35px_rgba(212,163,115,0.15)]" : "border-accent/10 hover:border-accent/25"
                              )}
                            >
                              {/* Cinematic photography */}
                              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 border border-white/5">
                                <Image src={item.src} alt={item.label} fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A050B]/50 via-transparent to-transparent pointer-events-none" />
                              </div>
                              <div className="flex-1 flex flex-col justify-between">
                                <div>
                                  <h4 className={cn("font-display text-base tracking-wide transition-colors font-medium", isSelected ? "text-accent" : "text-accent-soft")}>
                                    {item.label}
                                  </h4>
                                  <p className="font-body text-[10px] text-accent-soft/50 font-light mt-1 leading-relaxed">
                                    {item.desc}
                                  </p>
                                </div>
                                <div className="pt-3 flex justify-between items-center border-t border-accent/5">
                                  <span className="font-body text-[7px] tracking-wider uppercase text-accent-soft/20">Live</span>
                                  <span className={cn(
                                    "font-body text-[8px] uppercase tracking-wider font-bold transition-all duration-300",
                                    isSelected ? "text-accent" : "text-accent-soft/40"
                                  )}>
                                    {isSelected ? "✓ Added" : "Add to Experience"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* UNCHANGED SECTIONS: Starters, Main Course, Desserts & Mishti, Beverages */}
          <div className="flex flex-col gap-20 max-w-5xl mx-auto">
            
            <div className="text-center mb-4">
              <span className="font-body text-[9px] tracking-[0.3em] uppercase text-accent font-semibold mb-1 block">
                SELECT COURSES
              </span>
              <h2 className="font-display font-light text-3xl md:text-5xl text-accent-soft">
                Curated Feast Menu
              </h2>
            </div>

            {MENU_SECTIONS.map((section) => (
              <div key={section.id} className="flex flex-col gap-6">
                <div className="border-l-2 border-accent/30 pl-4">
                  <h3 className="font-display font-light text-2xl md:text-3xl text-accent-soft">
                    {section.title}
                  </h3>
                  <p className="font-body text-xs text-accent-soft/40 font-light mt-1 uppercase tracking-wider">
                    {section.subtitle}
                  </p>
                </div>

                {/* Horizontal scroll layout */}
                <div className="relative w-full py-1">
                  <div className="flex overflow-x-auto gap-6 pb-6 pt-2 scrollbar-hide snap-x snap-mandatory scroll-smooth w-full">
                    {section.items.map((item) => {
                      const isSelected = selectedDishes.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleDish(item.id)}
                          className={cn(
                            "snap-center p-4 rounded-3xl bg-[#1A050B]/60 backdrop-blur-md border w-[270px] md:w-[310px] shrink-0 relative overflow-hidden flex flex-col justify-between min-h-[350px] cursor-pointer transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(212,163,115,0.1)]",
                            isSelected ? "border-accent shadow-[0_0_35px_rgba(212,163,115,0.2)]" : "border-accent/10 hover:border-accent/30"
                          )}
                        >
                          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-white/5">
                            <Image src={item.src} alt={item.name} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A050B]/60 via-transparent to-transparent pointer-events-none" />
                          </div>

                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className={cn("font-display text-lg tracking-wide transition-colors font-medium", isSelected ? "text-accent" : "text-accent-soft")}>
                                {item.name}
                              </h4>
                              <p className="font-body text-[11px] text-accent-soft/50 font-light mt-1.5 leading-relaxed font-body">
                                {item.desc}
                              </p>
                            </div>

                            <div className="pt-4 flex justify-between items-center border-t border-accent/5">
                              <span className="font-body text-[8px] tracking-wider uppercase text-accent-soft/20 font-body">Signature Dish</span>
                              <span className={cn(
                                "font-body text-[9px] uppercase tracking-wider font-bold transition-all duration-300 font-body",
                                isSelected ? "text-accent" : "text-accent-soft/40"
                              )}>
                                {isSelected ? "✓ Added" : "Add to Experience"}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* SUMMARY CARD & WHATSAPP CURATOR ACTION */}
            <section className="py-8">
              <div className="max-w-2xl mx-auto p-8 rounded-[40px] bg-[#1C050C]/80 border border-accent/30 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                
                <div className="absolute top-6 right-6 w-12 h-12 opacity-10 mix-blend-screen pointer-events-none">
                  <Image src="/logo/logo-premium.png" alt="" fill className="object-contain" />
                </div>

                <div className="text-center border-b border-accent/20 pb-4 mb-6">
                  <span className="font-body text-[9px] tracking-[0.3em] uppercase text-accent font-bold block mb-1">
                    Bespoke Heritage Design
                  </span>
                  <h2 className="font-display font-light text-3xl text-accent-soft">
                    ঐতিহ্যের আসর
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-6 border-b border-accent/15 pb-6 mb-6 font-body text-xs text-accent-soft">
                  <div>
                    <span className="text-accent/40 block text-[10px] uppercase tracking-wider font-semibold">Occasion</span>
                    <span className="font-medium text-sm mt-0.5 block">{OCCASIONS.find(o => o.id === occasion)?.name}</span>
                  </div>
                  <div>
                    <span className="text-accent/40 block text-[10px] uppercase tracking-wider font-semibold">Expected Count</span>
                    <span className="font-medium text-sm mt-0.5 block">{guestCount} Guests</span>
                  </div>
                  <div>
                    <span className="text-accent/40 block text-[10px] uppercase tracking-wider font-semibold">Dining Curation</span>
                    <span className="font-medium text-sm mt-0.5 block">{FOOD_PREFS.find(d => d.id === dietary)?.name}</span>
                  </div>
                  <div>
                    <span className="text-accent/40 block text-[10px] uppercase tracking-wider font-semibold">Serving Style</span>
                    <span className="font-medium text-sm mt-0.5 block">
                      {servingStyle === "buffet" ? "Royal Buffet" : "Plated Curation"}
                    </span>
                  </div>
                </div>

                {/* Final Curated Dish Summary */}
                <div className="flex flex-col gap-4 font-body text-xs text-accent-soft/90 font-body">
                  {selectedDishes.length > 0 ? (
                    <div>
                      <span className="text-accent/40 block text-[9px] uppercase tracking-wider font-bold mb-1">Curated Dishes</span>
                      <p className="font-light leading-relaxed font-body">
                        {selectedDishes.map(id => {
                          for (const section of MENU_SECTIONS) {
                            const d = section.items.find(item => item.id === id);
                            if (d) return d.name;
                          }
                          return null;
                        }).filter(Boolean).join("  •  ")}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-2 text-accent-soft/30 italic">
                      No custom dishes added yet. Hessel will coordinate chef recommendations.
                    </div>
                  )}

                  {selectedLives.length > 0 && (
                    <div className="mt-2">
                      <span className="text-accent/40 block text-[9px] uppercase tracking-wider font-bold mb-1">Live corners selected</span>
                      <p className="font-light leading-relaxed font-body">
                        {selectedLives.map(id => LIVES.find(l => l.id === id)?.label).join("  •  ")}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-4 border-t border-accent/20 text-center">
                  <a
                    href={getWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-10 py-4 bg-gradient-to-r from-accent to-[#D4A373] text-[#1A050B] font-bold text-xs uppercase tracking-[0.2em] rounded-full shadow-[0_5px_20px_rgba(212,163,115,0.3)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(212,163,115,0.4)] cursor-pointer font-body"
                  >
                    Submit to Hospitality Curator →
                  </a>
                </div>

              </div>
            </section>

          </div>

        </div>

      </div>

      {/* Luxury Footer */}
      <Footer />
    </SilkBackground>
  );
}
