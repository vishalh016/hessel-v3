"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import ExperienceAccordion, { EXPERIENCES } from "./ExperienceAccordion";
import { BorderRotate } from "../ui/BorderRotate";

/**
 * Refined Cinematic Hero Section.
 * A synchronized storytelling system where left-side content and 
 * right-side imagery behave as one unified experience.
 */
export default function HeroSection() {
  const [activeId, setActiveId] = useState(EXPERIENCES[0].id);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax for background depth
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  // Auto-slide logic to keep the experience alive
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveId((current) => {
        const index = EXPERIENCES.findIndex(e => e.id === current);
        const nextIndex = (index + 1) % EXPERIENCES.length;
        return EXPERIENCES[nextIndex].id;
      });
    }, 8000); // Cinematic duration
    return () => clearInterval(timer);
  }, []);

  const activeExperience = EXPERIENCES.find(e => e.id === activeId);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-screen flex items-center bg-base overflow-hidden pt-32 md:pt-0"
    >
      {/* --- Advanced Ethereal Shadow Background System --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#1A050B]" />
        
        <svg className="absolute w-0 h-0 invisible">
          <defs>
            <filter id="ethereal-shadow-filter">
              <feTurbulence
                numOctaves="2"
                baseFrequency="0.001,0.004"
                seed="0"
                type="turbulence"
                result="undulation"
              >
                <animate 
                  attributeName="baseFrequency" 
                  dur="60s" 
                  values="0.001,0.004;0.002,0.006;0.001,0.004" 
                  repeatCount="indefinite" 
                />
              </feTurbulence>
              <feColorMatrix
                in="undulation"
                type="hueRotate"
                values="0"
                result="animatedHue"
              >
                <animate 
                  attributeName="values" 
                  dur="120s" 
                  from="0" 
                  to="360" 
                  repeatCount="indefinite" 
                />
              </feColorMatrix>
              <feColorMatrix
                in="animatedHue"
                type="matrix"
                values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
                result="circulation"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="circulation"
                scale="40"
                result="dist"
              />
              <feDisplacementMap
                in="dist"
                in2="undulation"
                scale="40"
              />
            </filter>
          </defs>
        </svg>

        <div className="absolute inset-0">
          <motion.div
            animate={{
              opacity: [0.6, 0.8, 0.6],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: "-40px",
              backgroundColor: "#7A1C2E",
              maskImage: `url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')`,
              maskSize: "cover",
              maskRepeat: "no-repeat",
              maskPosition: "center",
              filter: "url(#ethereal-shadow-filter) blur(8px)",
              mixBlendMode: "screen",
            }}
          />

          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: "-60px",
              backgroundColor: "#D4A373",
              maskImage: `url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')`,
              maskSize: "cover",
              maskRepeat: "no-repeat",
              maskPosition: "center",
              filter: "url(#ethereal-shadow-filter) blur(12px)",
              mixBlendMode: "color-dodge",
              transform: "rotate(180deg) scale(1.2)",
            }}
          />
        </div>

        <div 
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")`,
            backgroundSize: "200px",
            backgroundRepeat: "repeat",
          }}
        />
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)]" />
      </div>

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
              {/* Refined Premium Logo Block - Ceremonial Focal Anchor */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.95, y: 0 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="mb-6 lg:mb-8"
              >
                <div className="relative inline-block group">
                  {/* Subtle Gold Border Ring - Thinner for Elegant Restraint */}
                  <div className="relative w-36 h-36 md:w-48 h-48 lg:w-56 h-56 p-[2px] rounded-full bg-gradient-to-br from-accent/60 via-accent/20 to-accent/60 shadow-[0_4px_30px_rgba(212,163,115,0.15)]">
                    {/* Ceremonial Framing Layer */}
                    <div className="w-full h-full rounded-full overflow-hidden bg-[#1A050B] flex items-center justify-center border border-accent/10">
                      <Image
                        src="/logo/logo-premium.png"
                        alt="Hessel Logo"
                        width={600}
                        height={600}
                        priority
                        className="w-[102%] h-[102%] object-contain brightness-[1.03] opacity-95 transition-all duration-1000 group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                  
                  {/* Soft Atmospheric Glow - Reduced Intensity */}
                  <div className="absolute inset-0 bg-accent/5 blur-[140px] -z-10 opacity-20" />
                </div>
              </motion.div>

              {/* Cinematic Main Headline with Ambient Depth */}
              <h1 className="text-display-lg font-display text-primary leading-[1.05] mb-4 tracking-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.6),_0_8px_40px_rgba(26,5,11,0.8)]">
                Creating Hassle-Free <br />
                Celebrations For
              </h1>
              
              <div className="h-16 md:h-20 overflow-hidden mb-2">
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
                  animationSpeed={3}
                  backgroundColor="#4A1625"
                  gradientColors={{
                    primary: '#D4A373',
                    secondary: '#F9EBC7',
                    accent: '#FFFFFF'
                  }}
                  className="w-full sm:w-auto"
                >
                  <button className="group relative w-full sm:w-auto sm:min-w-[240px] px-12 py-5 bg-gradient-to-br from-[#D4A373] via-[#E9C46A] to-[#C08C5D] text-base font-semibold uppercase tracking-[0.2em] text-[10px] rounded-full overflow-hidden transition-all duration-700 hover:shadow-[0_0_40px_rgba(212,163,115,0.4)] hover:scale-[1.02] active:scale-[0.98]">
                    <span className="relative z-10 text-[#2D0B13] font-bold">Book Your Event</span>
                    {/* Cinematic Inner Light Leak */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </button>
                </BorderRotate>
                
                <BorderRotate
                  animationMode="rotate-on-hover"
                  borderRadius={9999}
                  borderWidth={1}
                  animationSpeed={5}
                  backgroundColor="transparent"
                  gradientColors={{
                    primary: 'rgba(212, 163, 115, 0.1)',
                    secondary: 'rgba(212, 163, 115, 0.4)',
                    accent: '#D4A373'
                  }}
                  className="w-full sm:w-auto"
                >
                  <button className="w-full sm:w-auto sm:min-w-[240px] px-12 py-5 bg-[#4A1625]/30 backdrop-blur-xl border border-accent/30 text-accent font-semibold uppercase tracking-[0.2em] text-[10px] rounded-full transition-all duration-700 hover:bg-[#4A1625]/50 hover:border-accent hover:scale-[1.02] active:scale-[0.98] shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                    Explore Menu
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
