"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const OrnateDivider = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center justify-center w-full opacity-20", className)}>
    <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
    <div className="px-3 text-accent/20 flex items-center justify-center">
      {/* Exceedingly subtle ornamental diamond motif disappearing into the background */}
      <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" strokeLinejoin="round"/>
      </svg>
    </div>
    <div className="h-[0.5px] flex-1 bg-gradient-to-l from-transparent via-accent/15 to-transparent" />
  </div>
);

const ContactButton = ({ 
  icon, 
  href, 
  label,
  delay 
}: { 
  icon: React.ReactNode, 
  href: string, 
  label: string,
  delay: number 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.a 
        href={href} 
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        className="group relative flex items-center justify-center w-24 h-24 cursor-pointer animate-none"
    >
      {/* Premium thin circular border - reveals beautifully on hover */}
      <div className={cn(
        "absolute inset-0 rounded-full border border-accent/0 transition-all duration-700 ease-out",
        isHovered && "border-accent/20"
      )} />
      
      {/* Icon circle body - Restyled with confident scale and soft borders */}
      <div className={cn(
        "flex items-center justify-center w-20 h-20 rounded-full border border-accent/20 text-accent/75 transition-all duration-700 ease-out bg-base shrink-0 relative overflow-hidden",
        isHovered && "text-accent/95 border-accent/40"
      )}>
        {/* Soft gold hover glow */}
        <div className={cn(
          "absolute inset-0 bg-accent/0 blur-sm transition-all duration-700 ease-out",
          isHovered && "bg-accent/5"
        )} />
        {icon}
      </div>

      {/* Muted soft glowing underline under the icon */}
      <div className={cn(
        "absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-8 h-[1px] bg-accent/0 transition-all duration-700 ease-out rounded-full",
        isHovered && "bg-accent/55 shadow-[0_0_8px_rgba(212,163,115,0.25)]"
      )} />

      {/* Individual Hover Label - Perfectly centered and visually attached beneath the icon */}
      <div className="absolute top-[102%] left-1/2 -translate-x-1/2 w-max pointer-events-none z-20">
        <AnimatePresence>
          {isHovered && (
            <motion.p
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 0.65, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-body text-[14px] sm:text-[15px] tracking-[0.18em] uppercase text-accent-soft font-medium text-center whitespace-nowrap bg-base/80 px-3 py-1 rounded backdrop-blur-[2px]"
            >
              {label}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.a>
  )
}

export default function Footer({ className }: { className?: string }) {
  const contactDetails = [
    { label: "Chat With Us", href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919162917996'}` },
    { label: "+91 91629 17996", href: "tel:+919162917996" },
    { label: "hello@hessel.in", href: "mailto:hello@hessel.in" },
    { label: "View Location", href: "https://maps.google.com/?q=Kolkata,+West+Bengal" }
  ];

  return (
    <footer className={cn("relative w-full bg-base overflow-hidden border-t border-accent/5", className)}>
        {/* Cinematic Background Atmosphere */}
        <div className="absolute inset-0 pointer-events-none z-0">
            {/* Warmer emotional lighting near Bengali identity on the left */}
            <motion.div 
                animate={{ opacity: [0.15, 0.25, 0.15], scale: [1, 1.04, 1] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-[15%] md:left-[20%] -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-accent/5 blur-[95px] rounded-full"
            />

            {/* Subtle atmospheric interaction glow centered behind interaction cluster */}
            <motion.div 
                animate={{ opacity: [0.08, 0.14, 0.08] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-accent/[0.03] blur-[85px] rounded-full"
            />

            {/* Deep Cinematic Vignette casting darkness towards the far right */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(26,5,11,0.96)_95%)]" />
            
            {/* Subtle Texture Layering (Alpana/Jamdani Vibe) */}
            <div 
                className="absolute inset-0 opacity-[0.012] mix-blend-overlay" 
                style={{ 
                    backgroundImage: `url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")`, 
                    backgroundSize: "200px", 
                    backgroundRepeat: "repeat" 
                }} 
            />
            
            {/* Asymmetrical Crest/Logo Watermark - Magnified, deep atmospheric blur on far right fade */}
            <motion.div 
                animate={{ 
                    y: [0, -6, 0],
                    x: [0, 4, 0],
                    rotate: [0, 0.5, 0]
                }}
                transition={{ 
                    duration: 30, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
                className="absolute -right-20 bottom-[-30px] opacity-[0.04] mix-blend-screen w-[260px] h-[260px] md:w-[320px] md:h-[320px] pointer-events-none blur-[8px]"
            >
                <Image src="/logo/logo-premium.png" alt="" fill className="object-contain" priority />
            </motion.div>

            {/* Ultra-Soft Film Grain for Velvety Depth */}
            <svg className="absolute w-0 h-0 hidden">
              <filter id="grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.06 0" />
              </filter>
            </svg>
            <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-25" style={{ filter: "url(#grain)" }} />
        </div>

        {/* Soft visual dissolve fade layer at the absolute bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-base via-base/30 to-transparent pointer-events-none z-10" />

        {/* Subtle horizontal gold mist trace subconsciously connecting the sides */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[90%] h-[0.5px] bg-gradient-to-r from-transparent via-accent/5 to-transparent pointer-events-none z-0" />

        {/* Cinematic Asymmetrical Editorial Layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-14 flex flex-col justify-center">
            
            {/* 3-Column Editorial Grid for True Asymmetrical Pacing (Identity -> Interaction -> Atmosphere) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-center justify-between pb-6 relative z-10">
                
                {/* COLUMN 1: LEFT SIDE — BENGALI IDENTITY SYSTEM */}
                <div className="relative flex flex-col items-center md:items-start text-center md:text-left w-full gap-3 col-span-1">
                    {/* Slow, ambient candlelight shimmer backlight specifically behind the typography */}
                    <motion.div 
                        animate={{ opacity: [0.015, 0.03, 0.015], scale: [0.97, 1.03, 0.97] }}
                        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 w-[260px] h-[90px] bg-accent blur-[55px] rounded-full pointer-events-none z-0" 
                    />
                    
                    {/* Primary wordmark - Grand scale, left-aligned, emotional anchor */}
                    <motion.h2
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
                        viewport={{ once: true }}
                        className="relative z-10 font-display font-light italic text-6xl md:text-[5.2rem] lg:text-[6.3rem] text-accent-soft tracking-wide leading-[1.15] [text-shadow:0_4px_30px_rgba(212,163,115,0.08)] opacity-95 md:max-w-md"
                    >
                        হেঁশেল
                    </motion.h2>

                    {/* Supporting subline - Spacing tightened for robust visual weight, opacity boosted */}
                    <motion.p
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 0.85, x: 0 }}
                        transition={{ duration: 1.6, delay: 0.2, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="font-body text-[16px] sm:text-[18px] tracking-[0.12em] sm:tracking-[0.16em] text-accent-soft z-10 font-medium mt-1 opacity-85"
                    >
                        আভিজাত্যে বাঙালিয়ানা
                    </motion.p>
                </div>

                {/* COLUMN 2: CENTER — THE INTERACTION CLUSTER */}
                <div className="flex flex-col items-center justify-center text-center relative z-10 w-full col-span-1">
                    
                    {/* Speak With Us Invitation Label - Center human invitation header */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.35 }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="font-body text-[16px] sm:text-[18px] tracking-[0.25em] uppercase text-accent-soft mb-6 font-medium w-full text-center"
                    >
                        Speak With Us
                    </motion.p>

                    {/* Icon Row - Perfectly visually centered cluster */}
                    <div className="flex flex-row items-center justify-center gap-7.5 mb-5 relative w-full">
                        <ContactButton 
                            icon={<WhatsAppIcon />} 
                            href={contactDetails[0].href} 
                            label={contactDetails[0].label}
                            delay={0.3} 
                        />

                        <ContactButton 
                            icon={<Phone className="w-[32px] h-[32px]" strokeWidth={1.4} />} 
                            href={contactDetails[1].href}
                            label={contactDetails[1].label}
                            delay={0.4} 
                        />

                        <ContactButton 
                            icon={<Mail className="w-[32px] h-[32px]" strokeWidth={1.4} />} 
                            href={contactDetails[2].href}
                            label={contactDetails[2].label}
                            delay={0.5} 
                        />

                        <ContactButton 
                            icon={<MapPin className="w-[32px] h-[32px]" strokeWidth={1.4} />} 
                            href={contactDetails[3].href}
                            label={contactDetails[3].label}
                            delay={0.6} 
                        />
                    </div>

                    {/* Grounding Baseline / Divider under the center row */}
                    <div className="w-full max-w-[80px] mx-auto opacity-75 mt-1">
                        <OrnateDivider />
                    </div>

                </div>

                {/* COLUMN 3: RIGHT SIDE — EMPTY ATMOSPHERIC FADE SPACE (Desktop Only) */}
                <div className="hidden md:block col-span-1 pointer-events-none w-full h-full relative" />

            </div>

            {/* Subtle baseline structural separator grounding the layout at the very end */}
            <div className="w-full h-[0.5px] bg-gradient-to-r from-transparent via-accent/10 to-transparent opacity-10 mt-12 mb-4" />

            {/* BOTTOM CENTER UNIFIED HANDCRAFTED SIGNATURE */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.7 }}
                viewport={{ once: true }}
                className="flex flex-row items-center justify-center text-center w-full z-10 relative pt-2"
            >
                {/* Unified Luxury Signature Line */}
                <p className="font-display font-light italic text-[18px] sm:text-[19px] text-accent-soft/45 tracking-wider">
                    Crafted by হেঁশেল • Since 2024
                </p>
            </motion.div>

        </div>
    </footer>
  );
}
