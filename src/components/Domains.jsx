"use client";
import React, { useState } from 'react';
import { Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const domains = [
  {
    id: "01",
    title: 'WEB DEV',
    description: 'Full-stack architecture using Next.js, React, and Node. Scalable, SEO-optimized, and performance-driven solutions.',
  },
  {
    id: "02",
    title: 'APP DEV',
    description: 'Native and cross-platform ecosystems (iOS/Android). React Native & Flutter solutions focused on haptic UX.',
  },
  {
    id: "03",
    title: 'AI / ML',
    description: 'Neural networks, NLP processing, and predictive modeling. Integrating intelligent agents into existing infrastructures.',
  },
  {
    id: "04",
    title: 'BLOCKCHAIN',
    description: 'Smart contracts (Solidity), dApp development, and Web3 integration. Decentralized security protocols.',
  },
  {
    id: "05",
    title: 'OPEN SOURCE',
    description: 'Community-driven development. Building public tools, libraries, and frameworks for the global dev ecosystem.',
  },
  {
    id: "06",
    title: 'CLOUD OPS',
    description: 'Serverless architecture (AWS/Azure). CI/CD pipelines, Docker containerization, and Kubernetes orchestration.',
  }
];

const DomainCard = ({ domain, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative p-12 h-80 flex flex-col justify-between overflow-hidden cursor-crosshair border-b border-white/5 md:border-r"
    >
      {/* Soft Glow */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-linear-to-br from-[#00e1ff]/5 to-transparent z-0"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mt-4 transition-all duration-500 group-hover:tracking-normal group-hover:text-white text-[#f4f4f5]/60">
          {domain.title}
        </h3>
      </div>

      <div className="relative z-10 overflow-hidden">
        <motion.p
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-gray-400 text-lg max-w-sm leading-relaxed"
        >
          {domain.description}
        </motion.p>
      </div>

      {/* Decorative Line */}
      <div className={`absolute bottom-0 left-0 w-full h-px transition-all duration-700 origin-left scale-x-0 group-hover:scale-x-100 bg-[#00e1ff]/40`} />
    </motion.div>
  );
};

const OurDomains = () => {
  return (
    <section className={`relative w-full bg-[#050505] text-[#f4f4f5] py-40 px-6 md:px-16 ${spaceGrotesk.className} overflow-hidden`}>

      {/* Background Ambience */}
      <div className="absolute top-0 right-[-10%] w-[60%] h-[60%] bg-[#00e1ff]/2 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">

        {/* --- HEADER --- */}
        <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-7xl md:text-[10vw] font-bold uppercase tracking-tighter leading-none"
            >
              Core<br />Domain<span className="text-[#00e1ff]">s</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 max-w-xs text-lg md:text-xl font-light leading-relaxed text-right md:mb-6"
          >
            We focus on high-end engineering and design across specialized technical environments.
          </motion.p>
        </header>

        {/* --- THE GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-white/5">
          {domains.map((domain, index) => (
            <DomainCard key={index} domain={domain} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurDomains;