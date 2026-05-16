"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BorderRotate } from "@/components/ui/BorderRotate";

export const EXPERIENCES = [
  {
    id: "weddings",
    title: "Luxury Weddings",
    image: "/images/exp-weddings.png",
  },
  {
    id: "corporate",
    title: "Corporate Galas",
    image: "/images/exp-corporate.png",
  },
  {
    id: "private",
    title: "Private Dinners",
    image: "/images/exp-private.png",
  },
  {
    id: "festival",
    title: "Cultural Events",
    image: "/images/exp-festival.png",
  },
  {
    id: "signature",
    title: "Signature Tasting",
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
 */
export default function ExperienceAccordion({ activeId, setActiveId }: ExperienceAccordionProps) {
  const activeIndex = EXPERIENCES.findIndex((exp) => exp.id === activeId);

  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <div className="flex flex-col md:flex-row h-full gap-3 md:gap-4">
        {EXPERIENCES.map((exp, index) => {
          const isExpanded = activeId === exp.id;
          const distance = Math.abs(index - activeIndex);

          // Curated Depth Falloff Classes
          let depthEffectClass = "blur-none saturate-100 contrast-100 brightness-100 sepia-0";
          if (distance === 1) {
            // Inner supporting panels: very subtle blur, warm golden tone, slightly dimmed
            depthEffectClass = "blur-[1.5px] saturate-[0.85] contrast-[0.95] brightness-[0.85] sepia-[.30]";
          } else if (distance >= 2) {
            // Outermost edge panels: soft depth falloff, warmer golden tone, dimmer but not too dark
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
  );
}
