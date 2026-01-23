"use client";
import React from "react";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const timelineData = [
  {
    id: "01",
    title: "OUR JOURNEY",
    text: "We began as a small group of passionate individuals united by a vision to build something impactful. What started in a modest setting quickly evolved through our shared drive, creativity, and relentless effort. Along the way, we took on challenges that tested and strengthened our bond—most notably organizing HACKONHILLS, the biggest hackathon in North India. Countless late nights, problem-solving sessions, and team wins shaped our path.",
    image: "/events/hoh7/HOH1.webp",
  },
  {
    id: "02",
    title: "INNOVATION & TECH",
    text: "From humble beginnings, our team came together with a shared passion for innovation and a drive to make an impact through technology. We evolved into a force behind meaningful projects—developing the official Nimbus and Hillfair apps for NIT Hamirpur. Our journey has been shaped by late-night coding sprints, creative problem-solving, and an unshakable commitment to excellence.",
    image: "/events/hoh7/HOH3.webp",
  },
  {
    id: "03",
    title: "ACCOLADES",
    text: "Our journey has been marked by dedication, creativity, and a relentless pursuit of excellence. One of our proudest milestones was being honored with the title of 'Best Tech Innovation Team', a recognition of the impact we've made. From building official apps to leading large-scale events, we've consistently pushed boundaries and delivered with purpose.",
    image: "/aboutUs/ach1.webp",
  },
];

const LogEntry = ({ data, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative border-l border-white/5 pl-8 md:pl-16 pb-32 last:pb-8 group"
    >
      {/* Timeline Node */}
      <span className="absolute left-[-3px] top-0 w-1.5 h-1.5 bg-white/10 rounded-full group-hover:bg-[#00e1ff] transition-colors duration-500 shadow-[0_0_10px_rgba(0,225,255,0)] group-hover:shadow-[0_0_10px_rgba(0,225,255,0.5)]" />

      {/* Header */}
      <div className="mb-12 text-left">
        <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter text-white leading-none">
          {data.title}
        </h2>
      </div>

      {/* Content Stack */}
      <div className="flex flex-col gap-12">
        {/* Text Area */}
        <div className="max-w-4xl">
          <p className="text-gray-400 text-xl md:text-3xl font-light leading-relaxed mb-8">
            {data.text}
          </p>
          <div className="w-16 h-px bg-[#00e1ff]/30" />
        </div>

        {/* Full Width Image */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.6 }}
          className="relative w-full aspect-[21/9] overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm p-1 rounded-2xl"
        >
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="w-full h-full object-cover brightness-90 hover:brightness-100 transition-all duration-700"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const AboutUs = () => {
  // Parallax effect for About Us header
  const { scrollYProgress } = useScroll();
  const uParallax = useTransform(scrollYProgress, [0, 0.3], [0, -250]);
  const sParallax = useTransform(scrollYProgress, [0, 0.3], [0, -350]);

  return (
    <SmoothScroll>
      <section className={`${spaceGrotesk.className} min-h-screen bg-[#050505] text-[#f4f4f5] py-40 px-6 md:px-16 overflow-hidden`}>

        {/* Deep Background Ambience */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#00e1ff]/[0.02] blur-[150px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00e1ff]/[0.01] blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* --- PAGE HEADER --- */}
          <header className="mb-40">
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="text-8xl md:text-[18vw] font-bold uppercase tracking-tighter leading-none mb-12 text-center"
            >
              About <motion.span style={{ y: uParallax }} className="inline-block">U</motion.span><motion.span style={{ y: sParallax }} className="inline-block text-[#00e1ff]">s</motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-500 text-xl md:text-3xl max-w-4xl mx-auto font-light text-center leading-relaxed"
            >
              Architects of digital excellence, specialized in building sophisticated high-performance solutions.
            </motion.p>
          </header>

          {/* --- TIMELINE SECTION --- */}
          <div className="mb-60">
            {timelineData.map((item, index) => (
              <LogEntry key={item.id} data={item} index={index} />
            ))}
          </div>

          {/* --- FOOTER CLUSTER --- */}
          <div className="pt-24 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
              <h3 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none">
                Team<br /><span className="text-[#00e1ff]">Culture</span>
              </h3>
              <p className="text-gray-500 max-w-xs text-lg font-light leading-relaxed">
                Built on shared vision and relentless innovation.
              </p>
            </div>

            {/* BENTO GRID GALLERY */}
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[80vh]">
              {/* Bento Item 1 - Large Tall */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="md:col-span-2 md:row-span-2 group relative overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm p-1 rounded-2xl min-h-[400px]"
              >
                <Image
                  src='/aboutUs/end2.webp'
                  alt="Culture 1"
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-105"
                />
              </motion.div>

              {/* Bento Item 2 - Wide Top */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="md:col-span-2 md:row-span-1 group relative overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm p-1 rounded-2xl min-h-[300px]"
              >
                <Image
                  src='/aboutUs/end1.webp'
                  alt="Culture 2"
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-105"
                />
              </motion.div>

              {/* Bento Item 3 - Wide Bottom */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="md:col-span-2 md:row-span-1 group relative overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm p-1 rounded-2xl min-h-[300px]"
              >
                <Image
                  src='/aboutUs/end3.webp'
                  alt="Culture 3"
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-105"
                />
              </motion.div>
            </div>
          </div>

        </div>
      </section>
    </SmoothScroll>
  );
};

export default AboutUs;