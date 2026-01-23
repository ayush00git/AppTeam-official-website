"use client";
import React, { useRef } from 'react';
import { Space_Grotesk } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const projects = [
  {
    title: "Hack On Hills",
    role: "EVENT INFRASTRUCTURE",
    date: "2024 / Q4",
    tech: ["NEXT.JS", "SOCKET.IO", "POSTGRES"],
    desc: "North India's premier annual hackathon organized by App Team. Bringing together 500+ hackers to compete for a prize pool worth 1.5L+ in a high-intensity 36-hour sprint.",
    link: "https://www.hackonhills.com/"
  },
  {
    title: "Nimbus App",
    role: "FEST UTILITY",
    date: "2025 / Q1",
    tech: ["REACT NATIVE", "FIREBASE", "MAPS API"],
    desc: "The central nervous system for NIT Hamirpur's tech fest. Every year with new and fun features.",
    link: "https://play.google.com/store/apps/details?id=com.appteam.nimbus2k25"
  },
  {
    title: "Hillfair App",
    role: "CULTURAL EXPERIENCE",
    date: "2024 / Q3",
    tech: ["FLUTTER", "NODE.JS", "AWS"],
    desc: "A high-performance mobile application for the cultural fest. Focused on haptic feedback, fluid 60fps animations, and a social feed for real-time media sharing.",
    link: "https://play.google.com/store/apps/details?id=com.appteam.hillfair2k24"
  }
];

const Card = ({ project, index, scrollYProgress }) => {
  const container = useRef(null);

  // Segments: 
  // P1: 0 - 0.33
  // P2: 0.33 - 0.66
  // P3: 0.66 - 1.0
  const segment = 1 / projects.length;
  const start = index * segment;
  const end = (index + 1) * segment;

  // Scale: Zooms in from 0.7 to 1.0 as it enters, then stays or sinks slightly on exit
  const scale = useTransform(
    scrollYProgress,
    [start - 0.1, start, end - 0.1, end],
    [0.7, 1, 1, 0.9],
    { clamp: true }
  );

  // Opacity: STRICT segmentation to prevent overlap
  const opacity = useTransform(
    scrollYProgress,
    [start - 0.05, start, end - 0.05, end],
    [0, 1, 1, 0],
    { clamp: true }
  );

  return (
    <div ref={container} className="h-screen w-screen flex items-center justify-center sticky top-0 bg-[#0a0a0a] overflow-hidden">
      <motion.div
        style={{ scale, opacity }}
        className="relative w-full h-full flex items-center justify-center p-6 md:p-24"
      >
        {/* Deep Field Ambient Glow */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#00e1ff]/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#00e1ff]/1 blur-[180px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl w-full text-center flex flex-col items-center">
          <div className="mb-12 overflow-hidden">
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-7xl md:text-[14vw] font-bold uppercase tracking-tighter text-white leading-[0.75]"
            >
              {project.title}
            </motion.h2>
          </div>

          <div className="max-w-4xl">
            <p className="text-gray-400 text-xl md:text-3xl font-light leading-relaxed mb-20 px-4">
              {project.desc}
            </p>

            <a
              href={project.link}
              target="_blank"
              className="group relative inline-flex items-center gap-6 text-white hover:text-[#00e1ff] transition-colors duration-500 font-bold uppercase tracking-[0.5em] text-[11px]"
            >
              <span className="relative">
                Explore
                <div className="absolute -bottom-3 left-0 w-full h-px bg-white/20 scale-x-100 group-hover:bg-[#00e1ff] transition-colors duration-500" />
              </span>
              <span className="text-3xl group-hover:translate-x-3 transition-transform duration-500">→</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProjectStack = () => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={container} className="bg-[#0a0a0a] relative">

      {/* Intro Frame */}
      <div className="h-screen flex items-center justify-center bg-[#050505]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center"
        >
          <h2 className={`${spaceGrotesk.className} text-white text-8xl md:text-[16vw] font-bold uppercase tracking-tighter leading-none`}>
            WHAT WE<br />D<span className="text-[#00e1ff]">O</span> ?
          </h2>
        </motion.div>
      </div>

      {/* Gallery Runway - Increased to 400vh to give more "stay" time per card */}
      <div className="relative h-[400vh]">
        {projects.map((project, i) => (
          <Card
            key={i}
            index={i}
            project={project}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* Outro Spacer */}
      <div className="h-[20vh] bg-[#0a0a0a]" />
    </section>
  );
};

export default ProjectStack;