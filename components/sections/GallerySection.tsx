"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const GALLERY_ITEMS = [
  { id: 1, src: "/images/exp-weddings.png", alt: "Royal Wedding Catering", category: "Weddings" },
  { id: 2, src: "/images/exp-corporate.png", alt: "Corporate Gala Setup", category: "Corporate" },
  { id: 3, src: "/images/exp-private.png", alt: "Private Celebration Dining", category: "Private" },
  { id: 4, src: "/images/exp-festival.png", alt: "Festival Live Station", category: "Festivals" },
  { id: 5, src: "/images/hero-bg.png", alt: "Signature Dining Atmosphere", category: "Signature" },
];

/**
 * Gallery Section.
 * Implements the "Film Strip" carousel per BRD §9.2.
 * Features staggered entrance animations and hover magnification.
 */
export default function GallerySection() {
  return (
    <section id="gallery" className="py-section bg-base relative overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-accent font-semibold tracking-widest uppercase text-sm mb-4 inline-block"
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
            className="text-secondary text-sm max-w-sm"
          >
            A curated look into our most recent events and culinary presentations. Experience the luxury in every detail.
          </motion.p>
        </div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div className="flex gap-6 overflow-x-auto px-6 md:px-[calc((100vw-1280px)/2)] pb-12 snap-x snap-mandatory scrollbar-hide">
        {GALLERY_ITEMS.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="relative min-w-[300px] md:min-w-[450px] aspect-[4/5] rounded-3xl overflow-hidden snap-center group luxury-shadow"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">
                {item.category}
              </span>
              <h3 className="text-white text-xl font-display">{item.alt}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
