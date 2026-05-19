"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BorderRotate } from "@/components/ui/BorderRotate";

export const EXPERIENCES = [
  {
    id: "weddings",
    title: "Weddings",
    image: "/images/exp-weddings.png",
  },
  {
    id: "corporate",
    title: "Family Gatherings",
    image: "/images/exp-corporate.png",
  },
  {
    id: "private",
    title: "Private Dinners",
    image: "/images/exp-private.png",
  },
  {
    id: "festival",
    title: "Festive Celebrations",
    image: "/images/exp-festival.png",
  },
  {
    id: "signature",
    title: "Special Occasions",
    image: "/images/hero-bg.png",
  },
];

interface ExperienceAccordionProps {
  activeId: string;
  setActiveId: (id: string) => void;
}

/**
 * Premium Experience Accordion.
 * Features a curated depth falloff (subtle blur and dimming) to focus the eye on the central active card,
 * with elegant bottom vignettes and zero vertical text overlays.
 * Completely optimized with a cinematic scroll-driven mobile view and static hoverable desktop accordion.
 */
export default function ExperienceAccordion({ activeId, setActiveId }: ExperienceAccordionProps) {
  const activeIndex = EXPERIENCES.findIndex((exp) => exp.id === activeId);

  // Mobile scroll-driven tracking hooks
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const parent = mobileScrollRef.current;
    const parentCenter = parent.getBoundingClientRect().top + parent.clientHeight / 2;
    
    let closestIndex = 0;
    let minDistance = Infinity;
    
    const cards = parent.querySelectorAll("[data-card-index]");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const distance = Math.abs(parentCenter - cardCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = parseInt(card.getAttribute("data-card-index") || "0", 10);
      }
    });

    if (closestIndex !== activeMobileIndex) {
      setActiveMobileIndex(closestIndex);
      setActiveId(EXPERIENCES[closestIndex].id);
    }
  };

  // Sync initial state and prevent snap glitching
  useEffect(() => {
    const activeIdx = EXPERIENCES.findIndex((exp) => exp.id === activeId);
    if (activeIdx !== -1 && activeIdx !== activeMobileIndex) {
      setActiveMobileIndex(activeIdx);
    }
  }, [activeId]);

  return (
    <div className="w-full">
      {/* ── MOBILE SCROLL-DRIVEN EXPERIENCE (Cinematic Scroll Journey) ── */}
      <div className="block md:hidden w-full relative">
        <div 
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="flex flex-col gap-3 overflow-y-auto max-h-[380px] scrollbar-hide py-12 px-1 relative snap-y snap-mandatory"
          style={{ scrollBehavior: "smooth" }}
        >
          {/* Top spacer for perfect center alignment of the first card */}
          <div className="h-[40px] w-full shrink-0 spacer" />

          {EXPERIENCES.map((exp, index) => {
            const isActive = activeMobileIndex === index;

            // Inactive cards: compressed preview strips (40-60px), soft blur, low opacity
            const depthEffectClass = isActive
              ? "blur-none saturate-100 contrast-100 brightness-100 scale-100"
              : "blur-[3px] saturate-[0.6] contrast-[0.9] brightness-[0.6] opacity-40 scale-[0.96]";

            const MobileCardContent = (
              <>
                {/* Image */}
                <div className="absolute inset-0 transition-all duration-1000 ease-out">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    sizes="100vw"
                    className={cn(
                      "object-cover transition-all duration-1000 ease-out",
                      depthEffectClass
                    )}
                  />
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-[#1A050B] via-[#1A050B]/30 to-transparent transition-opacity duration-1000",
                    isActive ? "opacity-90" : "opacity-60"
                  )} />
                </div>

                {/* Active Info */}
                {isActive ? (
                  <div className="absolute inset-0 flex flex-col justify-end p-5 z-20">
                    <motion.h3 
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-display text-primary text-xl tracking-wide"
                    >
                      {exp.title}
                    </motion.h3>
                  </div>
                ) : (
                  /* Slim Inactive preview label & discoverability indicator */
                  <div className="absolute inset-0 flex items-center justify-between px-5 z-20">
                    <span className="font-display text-primary/75 text-xs tracking-wider font-semibold">
                      {exp.title}
                    </span>
                    <span className="text-[8px] uppercase tracking-widest text-accent-soft/40 font-semibold">
                      Reveal
                    </span>
                  </div>
                )}

                {/* Inner Border */}
                {!isActive && (
                  <div className="absolute inset-0 border border-white/5 pointer-events-none rounded-[1.2rem]" />
                )}
              </>
            );

            return (
              <motion.div
                key={exp.id}
                layout
                data-card-index={index}
                onClick={() => {
                  const cardEl = mobileScrollRef.current?.querySelector(`[data-card-index="${index}"]`);
                  if (cardEl) {
                    cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
                  }
                }}
                className={cn(
                  "relative rounded-[1.2rem] overflow-hidden cursor-pointer transition-all duration-700 ease-[0.25,0.1,0.25,1] snap-center shrink-0 border border-[#1A050B]/20 shadow-md",
                  isActive ? "h-[220px]" : "h-[50px]"
                )}
              >
                {isActive ? (
                  <BorderRotate
                    className="w-full h-full p-0"
                    borderRadius={20}
                    borderWidth={1.5}
                    backgroundColor="transparent"
                    animationSpeed={4}
                    gradientColors={{
                      primary: '#4A1625',
                      secondary: '#D4A373',
                      accent: '#F9EBC7'
                    }}
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-[1.1rem]">
                      {MobileCardContent}
                    </div>
                  </BorderRotate>
                ) : (
                  <div className="relative w-full h-full overflow-hidden rounded-[1.2rem]">
                    {MobileCardContent}
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Bottom spacer to allow last card to center perfectly in scroll view */}
          <div className="h-[40px] w-full shrink-0 spacer" />
        </div>
      </div>

      {/* ── DESKTOP INTERACTIVE SHOWCASE (Completely Unchanged) ── */}
      <div className="hidden md:block w-full h-[500px] md:h-[600px]">
        <div className="flex flex-row h-full gap-3 md:gap-4">
          {EXPERIENCES.map((exp, index) => {
            const isExpanded = activeId === exp.id;
            const distance = Math.abs(index - activeIndex);

            // Curated Depth Falloff Classes
            let depthEffectClass = "blur-none saturate-100 contrast-100 brightness-100 sepia-0";
            if (distance === 1) {
              depthEffectClass = "blur-[1.5px] saturate-[0.85] contrast-[0.95] brightness-[0.85] sepia-[.30]";
            } else if (distance >= 2) {
              depthEffectClass = "blur-[2.5px] saturate-[0.7] contrast-[0.9] brightness-[0.75] sepia-[.50]";
            }

            const CardContent = (
              <>
                {/* Background Image with Cinematic Depth Falloff */}
                <div className="absolute inset-0 transition-all duration-1000 ease-out">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={cn(
                      "object-cover transition-all duration-1000 ease-out",
                      isExpanded ? "scale-105" : "scale-115",
                      depthEffectClass
                    )}
                  />
                  {/* Cinematic Bottom Vignette Gradient */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-[#1A050B] via-[#1A050B]/30 to-transparent transition-opacity duration-1000",
                    isExpanded ? "opacity-90" : "opacity-60"
                  )} />
                </div>

                {/* Elegant Text Overlay - Active Panel Only (No Vertical Text on Collapsed Strips) */}
                {isExpanded && (
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 z-20">
                    <div className="flex items-center gap-4">
                      <h3 className="font-display text-primary whitespace-nowrap text-2xl md:text-4xl tracking-tight">
                        {exp.title}
                      </h3>
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-px flex-1 bg-accent/40 hidden md:block origin-left" 
                      />
                    </div>
                  </div>
                )}

                {/* Inactive Subtle Internal Border for Layered Depth */}
                {!isExpanded && (
                  <div className="absolute inset-0 border border-white/5 pointer-events-none rounded-[1.5rem] md:rounded-[2.5rem] transition-opacity duration-700" />
                )}
              </>
            );

            return (
              <motion.div
                key={exp.id}
                layout
                onHoverStart={() => setActiveId(exp.id)}
                onClick={() => setActiveId(exp.id)}
                className={cn(
                  "relative rounded-[1.5rem] md:rounded-[2.5rem] cursor-pointer transition-all duration-1000 ease-[0.25,0.1,0.25,1] shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-[#1A050B]/30",
                  isExpanded ? "flex-[4]" : "flex-1"
                )}
              >
                {isExpanded ? (
                  <BorderRotate
                    className="w-full h-full p-0"
                    borderRadius={40} // 2.5rem
                    borderWidth={2}
                    backgroundColor="transparent"
                    animationSpeed={4}
                    gradientColors={{
                      primary: '#4A1625',
                      secondary: '#D4A373',
                      accent: '#F9EBC7'
                    }}
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-[2.4rem] md:rounded-[2.4rem]">
                      {CardContent}
                    </div>
                  </BorderRotate>
                ) : (
                  <div className="relative w-full h-full overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem]">
                    {CardContent}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
