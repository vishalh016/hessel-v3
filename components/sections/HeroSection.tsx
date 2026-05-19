"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import ExperienceAccordion, { EXPERIENCES } from "./ExperienceAccordion";
import { BorderRotate } from "../ui/BorderRotate";

const SymmetricalMandala = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 200 200"
    className={`absolute text-accent/25 pointer-events-none drop-shadow-[0_4px_30px_rgba(212,163,115,0.18)] ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="0.4"
  >
    {/* Multi-layered Royal Lotus Mandala - Replicating reference style */}
    <circle cx="100" cy="100" r="95" opacity="0.08" />
    <circle cx="100" cy="100" r="18" fill="currentColor" opacity="0.2" stroke="none" />
    {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map(deg => (
      <g key={deg} transform={`rotate(${deg} 100 100)`}>
        <path d="M100 100 Q 140 60, 100 10 Q 60 60, 100 100" />
        <path d="M100 100 Q 120 80, 100 40 Q 80 80, 100 100" opacity="0.5" />
      </g>
    ))}
    <rect x="70" y="70" width="60" height="60" transform="rotate(22.5 100 100)" opacity="0.2" />
  </svg>
);

const LeafyBranch = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 150 150"
    className={`absolute text-accent/35 pointer-events-none ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="0.4"
  >
    {/* Simplified, More Elegant Top-Left structure */}
    <path d="M5 5 Q 85 5, 145 8" strokeWidth="0.5" />
    <path d="M5 5 Q 5 85, 8 145" strokeWidth="0.5" />

    {/* Minimalist leaves - single stem focus */}
    <path d="M40 5 Q 45 25, 35 35 Q 25 25, 30 5" fill="currentColor" opacity="0.12" />
    <path d="M65 6 Q 70 20, 60 30 Q 53 20, 57 6" />
    <path d="M5 40 Q 25 45, 35 35 Q 25 25, 5 30" fill="currentColor" opacity="0.12" />
    <path d="M8 65 Q 20 70, 30 60 Q 20 53, 8 57" />

    {/* Elegant Line termination diamond */}
    <rect x="145" y="6" width="3.5" height="3.5" transform="rotate(45 147 8)" fill="currentColor" opacity="0.45" />
    <rect x="6" y="145" width="3.5" height="3.5" transform="rotate(45 8 147)" fill="currentColor" opacity="0.45" />

    <circle cx="5" cy="5" r="3" fill="currentColor" stroke="none" />
  </svg>
);

export default function HeroSection() {
  const [activeId, setActiveId] = useState(EXPERIENCES[0].id);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveId((current) => {
        const index = EXPERIENCES.findIndex(e => e.id === current);
        const nextIndex = (index + 1) % EXPERIENCES.length;
        return EXPERIENCES[nextIndex].id;
      });
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const activeExperience = EXPERIENCES.find(e => e.id === activeId);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center bg-transparent overflow-hidden pt-32 md:pt-0"
    >

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Left Side: Branding + Content (45%) */}
          <div className="w-full lg:w-[45%] text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col items-center"
            >
              {/* Static Branding Block - Clean & Minimalist */}
              <div className="mb-4">
                <div className="relative w-40 h-40 md:w-56 md:h-56 lg:w-64 md:h-56 lg:h-56 mx-auto">
                  <Image
                    src="/logo/logo-h.png"
                    alt="Hessel Logo"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Cinematic Main Headline with Ambient Depth */}
              <h2 className="text-2xl md:text-3xl font-display text-primary leading-[1.4] mb-3 tracking-wide [text-shadow:0_2px_4px_rgba(0,0,0,0.4)] opacity-95">
                ঐতিহ্যে ভরে উঠুক আপনার
              </h2>

              <div className="h-12 md:h-14 flex items-center justify-center overflow-hidden mb-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="text-display-md font-display italic text-accent-soft [text-shadow:0_2px_4px_rgba(0,0,0,0.6),_0_0_30px_rgba(212,163,115,0.4)]"
                  >
                    {activeExperience?.title}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* New Premium CTA Buttons - Unified Storytelling Block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="mt-1 lg:mt-2 flex flex-col sm:flex-row items-center gap-6"
              >
                <BorderRotate
                  animationMode="rotate-on-hover"
                  borderRadius={9999}
                  borderWidth={2}
                  animationSpeed={5}
                  backgroundColor="transparent"
                  gradientColors={{
                    primary: '#4A1625',
                    secondary: '#D4A373',
                    accent: '#F9EBC7'
                  }}
                  className="w-full sm:w-auto"
                >
                  <button 
                    onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}
                    className="group relative w-full sm:w-auto sm:min-w-[200px] h-[52px] px-6 bg-gradient-to-br from-[#D4A373] via-[#F3D19E] to-[#D4A373] font-semibold uppercase tracking-[0.25em] text-[13px] rounded-full overflow-hidden shadow-[0_0_20px_rgba(212,163,115,0.25)] cursor-pointer"
                  >
                    <span className="relative z-10 text-[#1A050B] font-bold">Book Your Event</span>
                  </button>
                </BorderRotate>

                <BorderRotate
                  animationMode="rotate-on-hover"
                  borderRadius={9999}
                  borderWidth={2}
                  animationSpeed={5}
                  backgroundColor="transparent"
                  gradientColors={{
                    primary: '#4A1625',
                    secondary: '#D4A373',
                    accent: '#F9EBC7'
                  }}
                  className="w-full sm:w-auto"
                >
                  <button 
                    onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}
                    className="group relative w-full sm:w-auto sm:min-w-[200px] h-[52px] px-6 bg-gradient-to-br from-[#D4A373] via-[#F3D19E] to-[#D4A373] font-semibold uppercase tracking-[0.25em] text-[13px] rounded-full overflow-hidden shadow-[0_0_20px_rgba(212,163,115,0.25)] cursor-pointer"
                  >
                    <span className="relative z-10 text-[#1A050B] font-bold">Explore Menu</span>
                  </button>
                </BorderRotate>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side: Interactive Showcase (55%) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            className="w-full lg:w-[55%]"
          >
            <ExperienceAccordion activeId={activeId} setActiveId={setActiveId} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
