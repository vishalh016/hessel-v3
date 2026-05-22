"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X, ChevronDown, ChevronUp } from "lucide-react";

const FILTERS = [
  { id: "all", name: "All" },
  { id: "weddings", name: "Weddings" },
  { id: "private", name: "Private Dining" },
  { id: "corporate", name: "Corporate" },
  { id: "festive", name: "Festive" },
  { id: "live", name: "Live Culinary" }
];

const GALLERY_ITEMS = [
  {
    id: "gal-1",
    src: "/images/exp-weddings.png",
    alt: "Grand Royal Vivah",
    category: "Weddings",
    spanClass: "lg:col-span-1",
    aspectClass: "aspect-[3/4]",
    desc: "A heritage banquet capturing the essence of classic Bengali matrimony."
  },
  {
    id: "gal-2",
    src: "/images/exp-corporate.png",
    alt: "The Sovereign Conclave",
    category: "Corporate",
    spanClass: "lg:col-span-2",
    aspectClass: "aspect-[16/10]",
    desc: "Plated banquets styled for modern industrial dynasts."
  },
  {
    id: "gal-3",
    src: "/images/exp-private.png",
    alt: "Zamindari Table",
    category: "Private Dining",
    spanClass: "lg:col-span-1",
    aspectClass: "aspect-[1/1]",
    desc: "Curated heirloom dining inside historic architectural chambers."
  },
  {
    id: "gal-4",
    src: "/images/exp-festival.png",
    alt: "Festive Durgotsav Bhoj",
    category: "Festive",
    spanClass: "lg:col-span-1",
    aspectClass: "aspect-[4/5]",
    desc: "A celebration of sacred tastes, crafted with classic devotion."
  },
  {
    id: "gal-5",
    src: "/images/hero-bg.png",
    alt: "The Alchemist Station",
    category: "Live Culinary",
    spanClass: "lg:col-span-1",
    aspectClass: "aspect-[3/4]",
    desc: "Interactive hot sand roasting and dramatic steam cooking setups."
  },
  {
    id: "gal-6",
    src: "/images/exp-weddings.png",
    alt: "Shubho Parinay Setup",
    category: "Weddings",
    spanClass: "lg:col-span-2",
    aspectClass: "aspect-[16/9]",
    desc: "Breathtaking canopies housing signature clay stove displays."
  },
    {
      id: "gal-7",
      src: "/images/durga-bhog-non-veg.png",
      alt: "Durga Bhog – Vegetarian Feast",
      category: "Festive",
      spanClass: "lg:col-span-1",
      aspectClass: "aspect-[4/5]",
      desc: "Traditional vegetarian dishes served during Durga Puja celebrations."
    },
    {
      id: "gal-8",
      src: "/images/durga-bhog.png",
      alt: "Durga Bhog – Mixed Feast",
      category: "Festive",
      spanClass: "lg:col-span-2",
      aspectClass: "aspect-[16/10]",
      desc: "A lavish mix of vegetarian and non‑vegetarian delicacies for the puja."
    },
    {
      id: "gal-9",
      src: "/images/durga_puja_bhog.png",
      alt: "Durga Puja Bhog",
      category: "Festive",
      spanClass: "lg:col-span-1",
      aspectClass: "aspect-[3/4]",
      desc: "Classic bhog offerings with rich sweets and savory dishes."
    },
    {
      id: "gal-10",
      src: "/images/durgapuja.png",
      alt: "Durga Puja Celebration",
      category: "Festive",
      spanClass: "lg:col-span-1",
      aspectClass: "aspect-[1/1]",
      desc: "Vivid ceremonial moments of Durga Puja."
    },
    {
      id: "gal-11",
      src: "/images/veg.png",
      alt: "Vegetarian Culinary Showcase",
      category: "Corporate",
      spanClass: "lg:col-span-1",
      aspectClass: "aspect-[4/5]",
      desc: "Elegant vegetarian platter perfect for corporate events."
    },
    {
      id: "gal-12",
      src: "/images/wedding-bride.png",
      alt: "Bride Portrait",
      category: "Weddings",
      spanClass: "lg:col-span-1",
      aspectClass: "aspect-[3/4]",
      desc: "Intimate bride portrait with traditional jewelry."
    },
    {
      id: "gal-13",
      src: "/images/wedding-couple.png",
      alt: "Wedding Couple",
      category: "Weddings",
      spanClass: "lg:col-span-2",
      aspectClass: "aspect-[16/9]",
      desc: "Romantic couple moment under decorative mandap."
    },
    {
      id: "gal-14",
      src: "/images/wedding-couple-food.png",
      alt: "Couple Sharing Food",
      category: "Weddings",
      spanClass: "lg:col-span-1",
      aspectClass: "aspect-[4/5]",
      desc: "Couple enjoying traditional Bengali delicacies."
    },
    {
      id: "gal-15",
      src: "/images/wedding-eat.png",
      alt: "Guests Dining",
      category: "Weddings",
      spanClass: "lg:col-span-1",
      aspectClass: "aspect-[1/1]",
      desc: "Joyful guests dining at a grand banquet."
    },
    {
      id: "gal-16",
      src: "/images/royal_bengali_wedding.png",
      alt: "Royal Bengali Wedding",
      category: "Weddings",
      spanClass: "lg:col-span-1",
      aspectClass: "aspect-[3/4]",
      desc: "Opulent wedding showcase with traditional decor."
    },
    {
      id: "gal-17",
      src: "/images/zamindari_fine_dining.png",
      alt: "Zamindari Fine Dining",
      category: "Private Dining",
      spanClass: "lg:col-span-1",
      aspectClass: "aspect-[4/5]",
      desc: "Elegant fine dining setting in heritage space."
    },
];

/**
 * Luxury Editorial Gallery Section.
 * Features an asymmetric staggered masonry-style grid with custom aspect ratios,
 * local candlelight shimmers, dynamic Framer Motion filter reflows, and Typography-first navigation.
 */
export default function GallerySection() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Reset expanded state when filter changes to ensure consistent layout
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setIsExpanded(false);
  };

  const filteredItems = selectedFilter === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => 
        item.category.toLowerCase() === selectedFilter.toLowerCase() || 
        (selectedFilter === "private" && item.category === "Private Dining") || 
        (selectedFilter === "live" && item.category === "Live Culinary")
      );

  // Dynamic calculation for exactly 2 rows on desktop (3-column layout)
  const getLimitForTwoRows = (items: typeof GALLERY_ITEMS) => {
    let rowCount = 0;
    let colSum = 0;
    let limit = 0;
    
    for (let i = 0; i < items.length; i++) {
      const span = items[i].spanClass.includes("col-span-2") ? 2 : 1;
      if (colSum + span > 3) {
        rowCount++;
        if (rowCount === 2) {
          break;
        }
        colSum = span;
      } else {
        colSum += span;
      }
      limit++;
    }
    return limit || items.length;
  };

  const collapseLimit = getLimitForTwoRows(filteredItems);
  const visibleItems = isExpanded ? filteredItems : filteredItems.slice(0, collapseLimit);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const handlePrev = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(selectedImageIndex === 0 ? filteredItems.length - 1 : selectedImageIndex - 1);
  };

  const handleNext = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(selectedImageIndex === filteredItems.length - 1 ? 0 : selectedImageIndex + 1);
  };


  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, filteredItems.length]);

  return (
    <section id="gallery" className="py-section bg-transparent relative overflow-hidden snap-y snap-mandatory md:snap-none">
      {/* Cinematic Candlelight Shimmer (Local Ambient Lighting) */}
      <motion.div 
          animate={{ opacity: [0.04, 0.08, 0.04], scale: [1, 1.05, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-[20%] -translate-x-1/2 w-[600px] h-[600px] bg-accent/[0.03] blur-[130px] rounded-full pointer-events-none z-0"
      />
      <motion.div 
          animate={{ opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-[10%] w-[500px] h-[500px] bg-accent/[0.02] blur-[110px] rounded-full pointer-events-none z-0"
      />

      <div className="w-[92vw] max-w-[1550px] mx-auto px-[clamp(1.5rem,3vw,3rem)] relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-accent font-semibold tracking-widest uppercase text-sm mb-4 inline-block font-body"
            >
              Visual Storytelling
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-display-lg text-primary"
            >
              The <span className="italic text-accent">Hessel</span> Collection
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-secondary text-sm max-w-sm font-body leading-relaxed opacity-85"
          >
            A curated look into our most recent events and culinary presentations. Experience the luxury in every detail.
          </motion.p>
        </div>

        {/* Refined Inline gold Filter Navigation (Horizontal Drag-Scroll on mobile) */}
        <div className="w-full border-b border-accent/5 pb-3 mb-16 flex items-center justify-start md:justify-center overflow-x-auto scrollbar-hide snap-x">
          <div className="flex gap-8 md:gap-10 px-4">
            {FILTERS.map((f) => {
              const isActive = selectedFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => handleFilterChange(f.id)}
                  className="relative py-2 text-xs md:text-sm uppercase tracking-[0.25em] font-semibold transition-all duration-300 focus:outline-none shrink-0 cursor-pointer snap-center font-body"
                  style={{
                    color: isActive ? "#FFF8F0" : "rgba(230, 204, 178, 0.55)",
                    textShadow: isActive ? "0 0 12px rgba(212, 163, 115, 0.25)" : "none"
                  }}
                >
                  {f.name}
                  {isActive && (
                    <motion.div
                      layoutId="galleryFilterUnderline"
                      className="absolute bottom-[-13px] left-0 right-0 h-[2px] bg-accent-soft"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Masonry Grid / Responsive Staggered Layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[clamp(1.5rem,2.5vw,3rem)] w-full"
        >
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item) => {
              // Find actual index in filteredItems array for Lightbox navigation
              const actualIndex = filteredItems.findIndex((fi) => fi.id === item.id);
              
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 20 }}
                  onClick={() => openLightbox(actualIndex)}
                  transition={{ 
                    opacity: { duration: 0.5 },
                    layout: { type: "spring", stiffness: 300, damping: 32 },
                    scale: { duration: 0.4 },
                    y: { duration: 0.4 }
                  }}
                  className={cn(
                    "relative rounded-[2rem] md:rounded-[2.8rem] overflow-hidden group border border-accent/10 hover:border-accent/30 shadow-[0_15px_45px_rgba(0,0,0,0.5)] transition-all duration-700 snap-center z-10 cursor-pointer",
                    item.spanClass,
                    item.aspectClass
                  )}
                >
                  {/* Image Component with lazy loading and soft zoom */}
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out md:group-hover:scale-[1.04]"
                    loading="lazy"
                  />

                  {/* Permanent dark cinematic vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A050B]/60 via-transparent to-[#1A050B]/20 transition-opacity duration-700" />

                  {/* Ornate Hover Overlay with details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A050B]/90 via-[#1A050B]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-8 z-20">
                    <span className="text-accent-soft font-body text-[10px] md:text-xs uppercase tracking-[0.2em] mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-primary font-display text-lg md:text-xl mb-1.5 font-medium leading-snug">
                      {item.alt}
                    </h3>
                    <p className="text-secondary/85 font-body text-[11px] md:text-xs line-clamp-2 leading-relaxed mb-3">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-1.5 text-accent text-[10px] md:text-xs font-semibold tracking-wider uppercase font-body">
                      <span>View Showcase</span>
                      <motion.span 
                        className="inline-block text-xs"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>

                  {/* Ornate Gold Watermark Crest Overlay (Top-Right on Hover) */}
                  <div className="absolute top-6 right-6 w-8 h-8 opacity-0 group-hover:opacity-[0.12] transition-all duration-700 pointer-events-none scale-90 group-hover:scale-100 mix-blend-screen z-10">
                    <Image src="/logo/logo-premium.png" alt="" fill className="object-contain" />
                  </div>

                  {/* Thin internal soft gold frame for layered aesthetic */}
                  <div className="absolute inset-0 border border-white/5 pointer-events-none rounded-[2rem] md:rounded-[2.8rem] z-30" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Expand/Collapse Toggle Button */}
        {filteredItems.length > collapseLimit && (
          <div className="flex justify-center mt-12 md:mt-16 relative z-20">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group relative px-7 py-3.5 border border-accent/20 hover:border-accent/60 rounded-full bg-[#1A050B]/80 hover:bg-[#4A1625] transition-all duration-300 text-[11px] md:text-xs text-accent-soft uppercase tracking-[0.25em] font-semibold cursor-pointer shadow-[0_5px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_20px_rgba(212,163,115,0.12)] flex items-center gap-2.5"
            >
              <span>{isExpanded ? "Collapse Collection" : "Explore Full Gallery"}</span>
              <div className="text-accent">
                {isExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
                )}
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Interactive Luxury Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1A050B]/96 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-12 select-none"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 rounded-full border border-accent/10 hover:border-accent/40 bg-black/20 text-accent hover:text-accent-soft transition-all duration-300 cursor-pointer z-50"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Navigation Controls */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 md:left-8 p-3 rounded-full border border-accent/10 hover:border-accent/40 bg-black/20 text-accent hover:text-accent-soft transition-all duration-300 cursor-pointer z-45"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 md:right-8 p-3 rounded-full border border-accent/10 hover:border-accent/40 bg-black/20 text-accent hover:text-accent-soft transition-all duration-300 cursor-pointer z-45"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative max-w-5xl w-full flex flex-col items-center justify-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Frame */}
              <div className="relative w-full h-[55vh] md:h-[68vh] flex items-center justify-center rounded-2xl md:rounded-[2rem] overflow-hidden border border-accent/15 bg-black/35 shadow-2xl">
                <Image
                  src={filteredItems[selectedImageIndex].src}
                  alt={filteredItems[selectedImageIndex].alt}
                  fill
                  className="object-contain p-2 md:p-4"
                  sizes="(max-width: 1200px) 90vw, 1200px"
                  priority
                />
              </div>

              {/* Details Panel */}
              <div className="text-center max-w-2xl px-4 md:px-6">
                <span className="text-accent font-body text-[10px] md:text-xs uppercase tracking-[0.25em] mb-2 inline-block font-semibold">
                  {filteredItems[selectedImageIndex].category}
                </span>
                <h3 className="text-primary font-display text-xl md:text-3xl mb-2.5 font-medium">
                  {filteredItems[selectedImageIndex].alt}
                </h3>
                <p className="text-secondary/80 font-body text-xs md:text-sm leading-relaxed max-w-xl mx-auto">
                  {filteredItems[selectedImageIndex].desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
