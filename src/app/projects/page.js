"use client";
import React, { useState } from "react";
import { Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

// Mock Data
const allProjects = [
  {
    id: "001",
    title: "HackOnHills 7.0",
    category: "WEB",
    status: "STABLE",
    year: "2024",
    description: "The official platform for North India's largest hackathon. Handles 5000+ registrations with high-concurrency architecture.",
    tech: ["Next.js", "Node.js", "Postgres"],
    link: "https://hackonhills.com"
  },
  {
    id: "002",
    title: "Nimbus 2k25",
    category: "APP",
    status: "STABLE",
    year: "2025",
    description: "Comprehensive fest utility app. Features include real-time navigation, event scheduling, and QR-based attendance systems.",
    tech: ["React Native", "Firebase", "Google Maps"],
    link: "#"
  },
  {
    id: "003",
    title: "Hillfair 2k24",
    category: "APP",
    status: "ARCHIVED",
    year: "2024",
    description: "Cultural fest companion application. Focused on fluid animations and media sharing capabilities for attendees.",
    tech: ["Flutter", "Dart", "AWS S3"],
    link: "#"
  },
  {
    id: "004",
    title: "AppTeam.api",
    category: "BACKEND",
    status: "BETA",
    year: "2025",
    description: "Centralized API gateway for all club activities, member management, and recruitment processing.",
    tech: ["Go", "Docker", "Redis"],
    link: "#"
  },
  {
    id: "005",
    title: "Campus Connect",
    category: "WEB",
    status: "DEV",
    year: "2025",
    description: "Internal communication portal for college administration and student bodies.",
    tech: ["React", "Socket.io", "MongoDB"],
    link: "#"
  },
  {
    id: "006",
    title: "Vision AI",
    category: "AI/ML",
    status: "R&D",
    year: "2025",
    description: "Experimental computer vision model for automated attendance tracking using classroom feeds.",
    tech: ["Python", "TensorFlow", "OpenCV"],
    link: "#"
  }
];

const ProjectCard = ({ project }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    className="group relative bg-[#0a0a0a] border border-[#333] hover:border-[#ccff00] transition-colors duration-300 flex flex-col h-full"
  >
    {/* Card Header: ID & Status */}
    <div className="flex justify-between items-center px-4 py-3 border-b border-[#333] group-hover:bg-[#ccff00] transition-colors duration-300">
      <span className="font-mono text-xs text-[#666] group-hover:text-black transition-colors">
        PRJ_{project.id}
      </span>
      <div className="flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'STABLE' ? 'bg-green-500' : project.status === 'DEV' ? 'bg-yellow-500' : 'bg-gray-500'}`} />
        <span className="font-mono text-[10px] tracking-widest text-[#666] group-hover:text-black transition-colors">
          {project.status}
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-6 flex-grow flex flex-col">
      <div className="mb-4">
        <span className="inline-block px-2 py-0.5 border border-[#333] text-[10px] font-bold text-[#888] mb-3 group-hover:border-[#ccff00] group-hover:text-[#ccff00] transition-colors">
          {project.category} {"//"} {project.year}
        </span>
        <h3 className="text-2xl font-bold uppercase text-[#f4f4f5] leading-none mb-3 group-hover:text-[#ccff00] transition-colors">
          {project.title}
        </h3>
        <p className="text-[#666] text-sm leading-relaxed font-mono">
          {project.description}
        </p>
      </div>

      {/* Tech Stack */}
      <div className="mt-auto pt-6 border-t border-[#222] group-hover:border-[#333]">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map(t => (
            <span key={t} className="text-[10px] text-[#555] bg-[#111] px-1.5 py-0.5 border border-[#222]">
              {t}
            </span>
          ))}
        </div>

        {/* Link */}
        <a
          href={project.link}
          target="_blank"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f4f4f5] group-hover:text-[#ccff00] transition-colors"
        >
          View Source
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        </a>
      </div>
    </div>

    {/* Decorative Corners */}
    <div className="absolute top-0 left-0 w-1 h-1 bg-[#333] group-hover:bg-black z-10" />
    <div className="absolute top-0 right-0 w-1 h-1 bg-[#333] group-hover:bg-black z-10" />
    <div className="absolute bottom-0 left-0 w-1 h-1 bg-[#333] group-hover:bg-black z-10" />
    <div className="absolute bottom-0 right-0 w-1 h-1 bg-[#333] group-hover:bg-black z-10" />
  </motion.div>
);

function Projects() {
  const [filter, setFilter] = useState("ALL");

  const filteredProjects = filter === "ALL"
    ? allProjects
    : allProjects.filter(p => p.category.includes(filter));

  const tabs = ["ALL", "WEB", "APP", "BACKEND", "AI/ML"];

  return (
    <div className={`min-h-screen bg-[#080808] text-[#f4f4f5] pb-24 ${spaceGrotesk.className}`}>

      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24">

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-[#333] pb-8">
          <div>
            <span className="text-[#ccff00] text-sm font-bold tracking-widest uppercase mb-2 block">
              {"//"} Repository
            </span>
            <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none">
              Project<br />Archive
            </h1>
          </div>

          {/* Filter Tabs */}
          <div className="mt-8 md:mt-0 flex flex-wrap gap-2">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 text-xs font-bold tracking-widest uppercase border transition-all duration-300 ${filter === tab
                    ? "bg-[#ccff00] text-black border-[#ccff00]"
                    : "bg-transparent text-[#666] border-[#333] hover:border-[#ccff00] hover:text-[#ccff00]"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* --- GRID --- */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- EMPTY STATE (If filter has no results) --- */}
        {filteredProjects.length === 0 && (
          <div className="py-24 text-center border border-dashed border-[#333]">
            <p className="text-[#666] font-mono uppercase">
              No deployments found in this sector.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Projects;