"use client";
import React from 'react';
import { Space_Grotesk } from "next/font/google";
import Image from 'next/image';
import { motion, useScroll, useTransform } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const eventsData = [
  {
    id: "01",
    title: "HACK ON HILLS 7.0",
    description: "North India's premier annual hackathon organized by App Team. Bringing together 500+ hackers to compete for a prize pool worth 1.5L+ in a high-intensity 36-hour sprint.",
    images: [
      { src: '/events/hoh7/HOH1.webp', alt: 'HOH7 Execution' },
      { src: '/events/hoh7/HOH2.webp', alt: 'Team Collaboration' },
      { src: '/events/hoh7/HOH3.webp', alt: 'Judgement Round' },
      { src: '/events/hoh7/HOH4.webp', alt: 'Prize Distribution' },
      { src: '/events/hoh7/HOH5.webp', alt: 'Venue Setup' },
      { src: '/events/hoh7/HOH6.webp', alt: 'Closing Ceremony' },
    ]
  },
  {
    id: "02",
    title: "HACK ON HILLS 6.0",
    description: "A landmark operation. We brought together innovators from across the region for North India's largest coding sprint. From initial ideation to final deployment, our team led the initiative, creating a high-performance environment where creativity thrived.",
    images: [
      { src: '/events/hoh6/HOH1.webp', alt: 'HOH6 Crowds' },
      { src: '/events/hoh6/HOH2.webp', alt: 'Coding Sprint' },
      { src: '/events/hoh6/HOH3.webp', alt: 'Mentorship' },
      { src: '/events/hoh6/HOH4.webp', alt: 'Night Shift' },
      { src: '/events/hoh6/HOH5.webp', alt: 'Networking' },
      { src: '/events/hoh6/HOH6.webp', alt: 'Winners' },
    ]
  },
  {
    id: "03",
    title: "NIMBUS 2K25",
    description: "Digital infrastructure deployment. We served as the core technical unit for the college tech fest, building the official flagship application.",
    images: [
      { src: '/events/nimbus/NBS1.webp', alt: 'App Launch' },
      { src: '/events/nimbus/NBS2.webp', alt: 'Tech Showcase' },
      { src: '/events/nimbus/NBS3.webp', alt: 'Team Briefing' },
      { src: '/events/nimbus/NBS4.webp', alt: 'User Testing' },
      { src: '/events/nimbus/NBS5.webp', alt: 'Award Ceremony' },
      { src: '/events/nimbus/NBS6.webp', alt: 'Team Photo' },
    ]
  }
];

const StickyRow = ({ pair, index }) => {
  return (
    <div
      className="sticky top-0 h-auto md:h-screen w-full flex items-center justify-center bg-[#050505] py-4 md:py-0"
      style={{ zIndex: index + 1 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full h-auto md:h-[75vh]">
        {pair.map((img, i) => (
          <div key={i} className="relative w-full h-[50vh] md:h-full border border-white/5 bg-white/[0.02] backdrop-blur-sm p-1 rounded-2xl overflow-hidden">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover rounded-xl"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const EventCard = ({ event }) => {
  // Chunk images into pairs
  const pairs = [];
  for (let i = 0; i < event.images.length; i += 2) {
    pairs.push(event.images.slice(i, i + 2));
  }

  const totalRows = pairs.length;

  return (
    <div className="relative mb-60">
      {/* --- EVENT HEADER --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="flex flex-col gap-6 md:gap-10 mb-20 w-full"
      >
        <h2 className="text-6xl md:text-[14vw] font-bold uppercase tracking-tighter text-white leading-[0.8] md:leading-[0.75]">
          {event.title}
        </h2>
        <p className="text-gray-400 text-xl md:text-3xl font-light leading-relaxed max-w-6xl">
          {event.description}
        </p>
        <div className="h-px w-full bg-white/5" />
      </motion.div>

      {/* --- 2-COLUMN STICKY STACK --- */}
      <div
        className="relative"
        style={{ height: `${totalRows * 100}vh` }}
      >
        {pairs.map((pair, idx) => (
          <div
            key={idx}
            className="absolute top-0 left-0 w-full"
            style={{
              top: `${idx * 100}vh`,
              height: `${(totalRows - idx) * 100}vh`
            }}
          >
            <StickyRow
              pair={pair}
              index={idx}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const Events = () => {
  // Parallax effect for Events header
  const { scrollYProgress } = useScroll();
  const nParallax = useTransform(scrollYProgress, [0, 0.3], [0, -250]);
  const tParallax = useTransform(scrollYProgress, [0, 0.3], [0, -350]);
  const sParallax = useTransform(scrollYProgress, [0, 0.3], [0, -450]);
  return (
    <SmoothScroll>
      <section className={`${spaceGrotesk.className} min-h-screen bg-[#050505] text-[#f4f4f5] py-40 px-6 md:px-16 overflow-hidden`}>

        {/* Background Ambience */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#00e1ff]/[0.02] blur-[150px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00e1ff]/[0.01] blur-[120px]" />
        </div>

        <div className="relative z-10 w-full">

          {/* --- PAGE HEADER --- */}
          <header className="mb-60">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <h1 className="text-8xl md:text-[20vw] font-bold uppercase tracking-tighter leading-none mb-12">
                Eve<motion.span style={{ y: nParallax }} className="inline-block">n</motion.span><motion.span style={{ y: tParallax }} className="inline-block">t</motion.span><motion.span style={{ y: sParallax }} className="inline-block text-[#00e1ff]">s</motion.span>
              </h1>
              <p className="text-gray-500 text-xl md:text-4xl max-w-5xl mx-auto font-light leading-relaxed">
                A definitive archive of operations and large-scale technical infrastructure.
              </p>
            </motion.div>
          </header>

          {/* --- EVENTS LOOP --- */}
          <div className="relative">
            {eventsData.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>

        </div>
      </section>
    </SmoothScroll>
  );
};

export default Events;
