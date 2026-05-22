"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import FloatingNav from "@/components/layout/FloatingNav";
import Footer from "@/components/layout/Footer";
import SilkBackground from "@/components/layout/SilkBackground";
import { cn } from "@/lib/utils";
import type { MenuCategory, MenuItem, Package } from "@/lib/supabase/types";

// Dynamic local WebP file system image mappings (matching filenames in public/images/Menu)
const IMAGE_FILENAME_MAP: Record<string, string> = {
  "afghani chicken": "Afghani Chicken",
  "aloo posto": "Aloo Posto",
  "alur dom": "Alur Dom",
  "assorted pakora": "Assorted Pakora",
  "banarasi paan": "Banarasi Paan",
  "basanti pulao": "Basanti Pulao",
  "beetroot chop": "Beetroot Chop",
  "begun basanti": "Begun Basanti",
  "beguni": "Beguni",
  "belgian chocolate mousse": "Belgian Chocolate Mousse",
  "bhetki paturi": "Bhetki Paturi",
  "bruschetta": "Bruschetta",
  "butter chicken": "Butter Chicken",
  "cajun fish": "Cajun Fish",
  "cheese balls": "Cheese Balls",
  "cheesecake": "Cheesecake",
  "chhanar dalna": "Chhanar Dalna",
  "chhanar payesh": "Chhanar Payesh",
  "chicken 65": "Chicken 65",
  "chicken biryani": "Chicken Biryani",
  "chicken chaap": "Chicken Chaap",
  "chicken curry": "Chicken Curry",
  "chicken daak bungalow": "Chicken Daak Bungalow",
  "chicken do pyaza": "Chicken Do Pyaza",
  "chicken egg biryani": "Chicken Egg Biryani",
  "chicken fried rice": "Chicken Fried Rice",
  "chicken handi": "Chicken Handi",
  "chicken kabiraji": "Chicken Kabiraji",
  "chicken kosha": "Chicken Kosha",
  "chicken lababdar": "Chicken Lababdar",
  "chicken lollipop": "Chicken Lollipop",
  "chicken manchurian": "Chicken Manchurian",
  "chicken nuggets": "Chicken Nuggets",
  "chicken pakora": "Chicken Pakora",
  "chicken rezala": "Chicken Rezala",
  "chicken satay": "Chicken Satay",
  "chicken stroganoff": "Chicken Stroganoff",
  "chicken tikka masala gravy": "Chicken Tikka Masala Gravy",
  "chicken à la kiev": "Chicken à la Kiev",
  "chingri malai curry": "Chingri Malai Curry",
  "chocolate sandesh": "Chocolate Sandesh",
  "corn cheese nuggets": "Corn Cheese Nuggets",
  "crispy baby corn": "Crispy Baby Corn",
  "crispy lotus stem": "Crispy Lotus Stem",
  "dahi puri": "Dahi Puri",
  "dessert shooters": "Dessert Shooters",
  "dhaniya murgh korma": "Dhaniya Murgh Korma",
  "dhokar chop": "Dhokar Chop",
  "dry chilli chicken": "Dry Chilli Chicken",
  "dum pukht biryani": "Dum Pukht Biryani",
  "falafel": "Falafel",
  "fish butter fry": "Fish Butter Fry",
  "fish croquette": "Fish Croquette",
  "fish diamond fry": "Fish Diamond Fry",
  "fish finger": "Fish Finger",
  "fish fry": "Fish Fry",
  "fish kabiraji": "Fish Kabiraji",
  "fried rice": "Fried Rice",
  "fulkopir roast": "Fulkopir Roast",
  "fuluri": "Fuluri",
  "garlic chicken": "Garlic Chicken",
  "golden fried prawn": "Golden Fried Prawn",
  "gondhoraj fish": "Gondhoraj Fish",
  "green mango chutney": "Green Mango Chutney",
  "honey chilli fish": "Honey Chilli Fish",
  "ice cream": "Ice Cream",
  "jalapeno baby corn fritters": "Jalapeno Baby Corn Fritters",
  "jolbhora sandesh": "Jolbhora Sandesh",
  "katla kalia": "Katla Kalia",
  "kheer kadam": "Kheer Kadam",
  "koi macher jhal": "Koi Macher Jhal",
  "komola bhog": "Komola Bhog",
  "koraishutir kochuri": "Koraishutir Kochuri",
  "korean fried chicken": "Korean Fried Chicken",
  "kulfi falooda": "Kulfi Falooda",
  "kumro phuler bora": "Kumro Phuler Bora",
  "lamb chops with jus": "Lamb Chops with Jus",
  "langcha": "Langcha",
  "ledikeni": "Ledikeni",
  "makha sandesh": "Makha sandesh",
  "malai kofta": "Malai Kofta",
  "malpua": "Malpua",
  "mihidana": "Mihidana",
  "mini burgers": "Mini Burgers",
  "misti doi": "Misti Doi",
  "mixed fruit chutney": "Mixed Fruit Chutney",
  "mixed hakka noodles": "Mixed Hakka Noodles",
  "mochar chop": "Mochar Chop",
  "mutton bhuna": "Mutton Bhuna",
  "mutton chop": "Mutton Chop",
  "mutton egg biryani": "Mutton Egg Biryani",
  "mutton handi": "Mutton Handi",
  "mutton rezala": "Mutton Rezala",
  "mutton rogan josh": "Mutton Rogan Josh",
  "mutton shami kebab": "Mutton Shami Kebab",
  "mutton biryani": "Mutton biryani",
  "nolen gurer sandesh": "Nolen Gurer Sandesh",
  "paneer pakora": "Paneer Pakora",
  "pani puri": "Pani Puri",
  "pantua": "Pantua",
  "papad": "Papad",
  "papdi chaat": "Papdi Chaat",
  "payesh": "Payesh",
  "peri peri chicken": "Peri Peri Chicken",
  "peyaji": "Peyaji",
  "popcorn chicken": "Popcorn Chicken",
  "posto bora": "Posto Bora",
  "potato chutney": "Potato Chutney",
  "potoler dorma": "Potoler Dorma",
  "prawn cocktail": "Prawn Cocktail",
  "prawn cutlet": "Prawn Cutlet",
  "rabri": "Rabri",
  "radhaballavi": "Radhaballavi",
  "rajbhog": "Rajbhog",
  "rasmalai": "Rasmalai",
  "rosogolla": "Rosogolla",
  "saffron pulao": "Saffron Pulao",
  "sarbhaja": "Sarbhaja",
  "sarpuria": "Sarpuria",
  "schezwan chicken": "Schezwan Chicken",
  "shukto": "Shukto",
  "sitabhog": "Sitabhog",
  "smoked bhetki canapés": "Smoked Bhetki Canapés",
  "smoked chicken tikka": "Smoked Chicken Tikka",
  "spring roll": "Spring Roll",
  "steamed rice": "Steamed Rice",
  "stuffed jalapeno": "Stuffed Jalapeno",
  "stuffed mushroom": "Stuffed Mushroom",
  "tempura prawns": "Tempura Prawns",
  "thai fish finger": "Thai Fish Finger",
  "tomato chutney": "Tomato Chutney",
  "topse fry": "Topse Fry",
  "vegetable chop": "Vegetable Chop"
};

const getDishImage = (dishName: string): string => {
  const lower = dishName.toLowerCase().trim();
  const filename = IMAGE_FILENAME_MAP[lower];
  if (filename) {
    return `/images/Menu/${filename}.webp`;
  }
  return "/images/Menu/blank.svg";
};

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
  { id: "chaat", label: "Bengali Chaat Theatre", desc: "Interactive customized street food stations featuring spicy Gondhoraj water fountains.", src: "/images/durgapuja.png" },
  { id: "kebab", label: "Mughlai Kebab Station", desc: "Succulent skewered signature kebabs slow-grilled over charcoal embers.", src: "/images/exp-private.png" },
  { id: "roll", label: "Kolkata Roll Counter", desc: "Flaky hot parathas hand-rolled with spiced premium fillings.", src: "/images/exp-weddings.png" },
  { id: "mishti", label: "Mishti Plating Bar", desc: "Hot baked rosogollas and flambéed sandesh presented live by sweets artisans.", src: "/images/durga_puja_bhog.png" },
  { id: "tea", label: "Tea & Adda Corner", desc: "Fragrant clay-cup masala teas served in an authentic elite setting.", src: "/images/exp-corporate.png" },
  { id: "grill", label: "Seafood Grill Experience", desc: "Exquisite whole fresh river fish grilled live with mustard and herbs.", src: "/images/durga-bhog.png" }
];
// Curated Food Categories metadata for subtitles
const CATEGORY_META: Record<string, { subtitle: string }> = {
  "Starters": { subtitle: "Exquisite opening delicacies to awaken the palate" },
  "Main Course": { subtitle: "Grand centerpiece curations for the royal feast" },
  "Desserts": { subtitle: "Heavenly nectarous sweet finishes set in clay" },
  "Drinks": { subtitle: "Refreshing local elixirs and hot traditional brews" },
  "Add-ons": { subtitle: "Bespoke accompaniments to complement your spread" }
};

export default function LuxuryFeastConfigurator() {
  const [occasion, setOccasion] = useState("wedding");
  const [guestCount, setGuestCount] = useState(250);
  const [dietary, setDietary] = useState("mixed");
  const [servingStyle, setServingStyle] = useState("buffet");
  const [liveEnabled, setLiveEnabled] = useState(false);
  const [selectedLives, setSelectedLives] = useState<string[]>([]);
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);

  // Dynamic menu states
  const [categories, setCategories] = useState<(MenuCategory & { items: MenuItem[] })[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Bidirectional events scroll tracking for mobile
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const eventScrollRef = useRef<HTMLDivElement>(null);

  // Fetch menu categories and items from the database
  useEffect(() => {
    async function loadMenuData() {
      try {
        const res = await fetch("/api/menu");
        if (!res.ok) throw new Error("Failed to load menu");
        const data = await res.json();
        if (data.categories) {
          // Sort categories by display_order to maintain luxury flow
          const sortedCategories = [...data.categories].sort((a, b) => a.display_order - b.display_order);
          setCategories(sortedCategories);
        }
        if (data.packages) {
          setPackages(data.packages);
        }
      } catch (err) {
        console.error("Error loading menu database:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadMenuData();
  }, []);

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
      for (const cat of categories) {
        const d = cat.items.find(item => item.id === dishId);
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

  if (isLoading) {
    return (
      <SilkBackground>
        <FloatingNav />
        <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-transparent">
          <div className="w-[92vw] max-w-[1550px] mx-auto px-[clamp(1.5rem,3vw,3rem)] relative z-10">
            {/* Header skeleton */}
            <div className="text-center mb-16 max-w-3xl mx-auto animate-pulse">
              <div className="h-4 w-32 bg-accent/10 mx-auto rounded-full mb-3" />
              <div className="h-12 w-64 bg-accent/10 mx-auto rounded-xl" />
            </div>

            {/* Skeleton Grid */}
            <div className="flex flex-col gap-16 max-w-5xl mx-auto">
              {[1, 2].map((s) => (
                <div key={s} className="flex flex-col gap-6 animate-pulse">
                  <div className="border-l-2 border-accent/20 pl-4">
                    <div className="h-7 w-48 bg-accent/10 rounded-md mb-2" />
                    <div className="h-3 w-72 bg-accent/5 rounded-md" />
                  </div>
                  <div className="flex gap-6 overflow-hidden py-2">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="p-4 rounded-3xl bg-[#1A050B]/30 border border-accent/5 w-[270px] md:w-[310px] shrink-0 min-h-[350px] flex flex-col justify-between">
                        <div className="w-full aspect-[4/3] rounded-2xl bg-accent/5 mb-4" />
                        <div className="flex-1 flex flex-col gap-2">
                          <div className="h-5 w-3/4 bg-accent/10 rounded" />
                          <div className="h-3 w-full bg-accent/5 rounded" />
                          <div className="h-3 w-5/6 bg-accent/5 rounded" />
                        </div>
                        <div className="pt-4 border-t border-accent/5 flex justify-between">
                          <div className="h-3 w-16 bg-accent/5 rounded" />
                          <div className="h-3 w-20 bg-accent/10 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </SilkBackground>
    );
  }

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
                              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 border border-white/5 bg-accent/5">
                                <Image src={item.src} alt={item.label} fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A050B]/50 via-transparent to-transparent pointer-events-none" />
                              </div>
                              <div className="flex-1 flex flex-col justify-between">
                                <div>
                                  <h4 className={cn("font-display text-base tracking-wide transition-colors font-medium", isSelected ? "text-accent" : "text-accent-soft")}>
                                    {item.label}
                                  </h4>
                                  <p className="font-body text-[10px] text-accent-soft/50 font-light mt-1.5 leading-relaxed">
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

          {/* DYNAMIC SECTIONS: Loaded from Supabase DB */}
          <div className="flex flex-col gap-20 max-w-5xl mx-auto">
            
            <div className="text-center mb-4">
              <h2 className="font-display font-light text-3xl md:text-5xl text-accent-soft">
                Select Courses
              </h2>
            </div>

            {categories.map((cat) => {
              // Filter items based on dietary preference
              const filteredItems = cat.items.filter((item) => {
                const isVegItem = item.dietary_flags.includes("veg");
                if (dietary === "veg") return isVegItem;
                if (dietary === "nonveg") return !isVegItem;
                return true;
              });

              const meta = CATEGORY_META[cat.name] || { subtitle: "Bespoke accompaniment curation for the feast" };

              return (
                <div key={cat.id} className="flex flex-col gap-6">
                  <div className="border-l-2 border-accent/30 pl-4">
                    <h3 className="font-display font-light text-2xl md:text-3xl text-accent-soft flex items-center gap-3">
                      {cat.name}
                      {filteredItems.length > 0 && (
                        <span className="text-[10px] uppercase font-bold tracking-widest font-body text-accent-soft/40 px-2.5 py-0.5 rounded-full bg-accent/5 border border-accent/10">
                          {filteredItems.length} {filteredItems.length === 1 ? "Item" : "Items"}
                        </span>
                      )}
                    </h3>
                    <p className="font-body text-xs text-accent-soft/40 font-light mt-1 uppercase tracking-wider">
                      {meta.subtitle}
                    </p>
                  </div>

                  {filteredItems.length === 0 ? (
                    <div className="p-8 rounded-3xl border border-accent/10 bg-[#1A050B]/20 text-center max-w-md mx-auto my-4 w-full">
                      <span className="text-xs font-body text-accent-soft/40 uppercase tracking-widest block mb-2 font-bold">No Selections Available</span>
                      <p className="text-[11px] text-accent-soft/30 font-light leading-relaxed">
                        No dishes match the "{FOOD_PREFS.find(d => d.id === dietary)?.name}" preference in this course. Try switching preference above.
                      </p>
                    </div>
                  ) : (
                    /* Horizontal scroll layout */
                    <div className="relative w-full py-1">
                      <div className="flex overflow-x-auto gap-6 pb-6 pt-2 scrollbar-hide snap-x snap-mandatory scroll-smooth w-full">
                        {filteredItems.map((item) => {
                          const isSelected = selectedDishes.includes(item.id);
                          const isVeg = item.dietary_flags.includes("veg");
                          
                          return (
                            <div
                              key={item.id}
                              onClick={() => toggleDish(item.id)}
                              className={cn(
                                "snap-center p-4 rounded-3xl bg-[#1A050B]/60 backdrop-blur-md border w-[270px] md:w-[310px] shrink-0 relative overflow-hidden flex flex-col justify-between min-h-[360px] cursor-pointer transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(212,163,115,0.1)]",
                                isSelected ? "border-accent shadow-[0_0_35px_rgba(212,163,115,0.2)]" : "border-accent/10 hover:border-accent/30"
                              )}
                            >
                              {/* Cinematic photography & Badges */}
                              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-white/5 bg-accent/5">
                                <Image 
                                  src={getDishImage(item.name)} 
                                  alt={item.name} 
                                  fill 
                                  className="object-cover transition-transform duration-700 hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A050B]/60 via-transparent to-transparent pointer-events-none" />
                                
                                {/* Veg/Non-Veg Badge */}
                                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#150307]/90 border border-white/10 backdrop-blur-md">
                                  <span className={cn(
                                    "w-1.5 h-1.5 rounded-full",
                                    isVeg ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-red-500 shadow-[0_0_8px_#ef4444]"
                                  )} />
                                  <span className="text-[8px] font-bold uppercase tracking-widest text-accent-soft/90 font-body">
                                    {isVeg ? "Veg" : "Non-Veg"}
                                  </span>
                                </div>
                              </div>

                              <div className="flex-1 flex flex-col justify-between">
                                <div>
                                  <h4 className={cn("font-display text-lg tracking-wide transition-colors font-medium", isSelected ? "text-accent" : "text-accent-soft")}>
                                    {item.name}
                                  </h4>
                                  <p className="font-body text-[11px] text-accent-soft/50 font-light mt-1.5 leading-relaxed line-clamp-2">
                                    {item.description || "Artisanal luxury feast curation crafted by Hessel's master culinary team."}
                                  </p>
                                </div>

                                <div className="pt-4 flex justify-between items-center border-t border-accent/5">
                                  {/* Sleek Course Category Badge */}
                                  <span className="font-body text-[8px] tracking-widest uppercase text-accent-soft/30 font-bold">
                                    {cat.name.slice(0, -1)}
                                  </span>
                                  <span className={cn(
                                    "font-body text-[9px] uppercase tracking-wider font-bold transition-all duration-300",
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
                  )}
                </div>
              );
            })}

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
                      <p className="font-light leading-relaxed">
                        {selectedDishes.map(id => {
                          for (const cat of categories) {
                            const d = cat.items.find(item => item.id === id);
                            if (d) {
                              const isVeg = d.dietary_flags.includes("veg");
                              const vegIcon = isVeg ? "🟢" : "🔴";
                              return `${vegIcon} ${d.name}`;
                            }
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
                      <p className="font-light leading-relaxed">
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
