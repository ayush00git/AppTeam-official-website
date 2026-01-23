"use client";
import React, { useState, useEffect } from "react";
import { Space_Grotesk } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const OurTeam = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Parallax effect for Team header
  const { scrollYProgress } = useScroll();
  const eParallax = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  const aParallax = useTransform(scrollYProgress, [0, 0.3], [0, -250]);
  const mParallax = useTransform(scrollYProgress, [0, 0.3], [0, -350]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/member");
        if (!response.ok) throw new Error("Failed to fetch members");
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const categorizeMembers = () => {
    const categories = {
      alumni: { title: "Alumni", members: [], priority: 5 },
      leadership: { title: "Leadership Team", members: [], priority: 1 },
      coordinator: { title: "Coordinators", members: [], priority: 2 },
      executives: { title: "Executives", members: [], priority: 3 },
      volunteers: { title: "Volunteers", members: [], priority: 4 },
    };

    members.forEach((member) => {
      const role = member.role?.toLowerCase() || "";
      if (role.includes("alumni")) categories.alumni.members.push(member);
      else if (role.includes("secretary") || role.includes("convener"))
        categories.leadership.members.push(member);
      else if (role.includes("coordinator"))
        categories.coordinator.members.push(member);
      else if (role.includes("executive"))
        categories.executives.members.push(member);
      else categories.volunteers.members.push(member);
    });

    return Object.values(categories)
      .filter((category) => category.members.length > 0)
      .sort((a, b) => a.priority - b.priority);
  };

  const SocialIcon = ({ type }) => {
    if (type === "linkedin") {
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    );
  };

  const renderMemberCard = (member, index) => (
    <div
      key={member.id || index}
      className="group relative border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-[#00e1ff]/30 transition-all duration-300 flex flex-col rounded-2xl overflow-hidden"
    >
      {/* Image Area */}
      <div className="relative w-full aspect-square overflow-hidden bg-black/40">
        <img
          src={member.profileImageURL}
          alt={member.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Panel */}
      <div className="p-6 flex flex-col flex-grow">
        <div>
          <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-2">
            {member.name}
          </h3>
          <div className="inline-block px-3 py-1 border border-white/10 bg-white/[0.05] rounded-full mb-4">
            <span className="text-[10px] font-bold text-[#00e1ff] uppercase tracking-[0.2em]">
              {member.role}
            </span>
          </div>

          {/* Bio */}
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
            {member.bio || "No bio available."}
          </p>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-white/5">
          {member.linkedInURL ? (
            <a href={member.linkedInURL} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-[#00e1ff] hover:text-black transition-all duration-200 text-gray-400 text-xs font-bold uppercase tracking-wider rounded-lg"
            >
              <SocialIcon type="linkedin" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          ) : (
            <div className="bg-white/5 opacity-30 rounded-lg" />
          )}

          {member.githubURL ? (
            <a href={member.githubURL} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-[#00e1ff] hover:text-black transition-all duration-200 text-gray-400 text-xs font-bold uppercase tracking-wider rounded-lg"
            >
              <SocialIcon type="github" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          ) : (
            <div className="bg-white/5 opacity-30 rounded-lg" />
          )}
        </div>
      </div>
    </div>
  );

  // --- LOADING STATE ---
  if (loading)
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center bg-[#050505] text-[#00e1ff] ${spaceGrotesk.className}`}>
        <div className="text-sm font-bold tracking-[0.3em] uppercase animate-pulse">
          Loading Team...
        </div>
        <div className="w-64 h-1 bg-white/10 mt-4 overflow-hidden rounded-full">
          <div className="h-full bg-[#00e1ff] w-1/3 animate-[translateX_1s_infinite_linear]" />
        </div>
      </div>
    );

  // --- ERROR STATE ---
  if (error)
    return (
      <div className={`min-h-screen flex items-center justify-center bg-[#050505] ${spaceGrotesk.className}`}>
        <div className="border border-red-500/30 bg-red-500/10 p-8 text-center max-w-md rounded-2xl">
          <h2 className="text-red-400 font-bold uppercase tracking-[0.3em] mb-2">Error</h2>
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      </div>
    );

  const categorizedMembers = categorizeMembers();

  return (
    <SmoothScroll>
    <section className={`${spaceGrotesk.className} min-h-screen bg-[#050505] text-[#f4f4f5] py-40 px-6 md:px-16`}>

      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#00e1ff]/[0.02] blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00e1ff]/[0.01] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* --- PAGE HEADER --- */}
        <header className="mb-32 text-center">
          <h1 className="text-8xl md:text-[20vw] font-bold uppercase tracking-tighter leading-none mb-12">
            T<motion.span style={{ y: eParallax }} className="inline-block">e</motion.span><motion.span style={{ y: aParallax }} className="inline-block">a</motion.span><motion.span style={{ y: mParallax }} className="inline-block text-[#00e1ff]">m</motion.span>
          </h1>
          <p className="text-gray-500 text-xl md:text-4xl max-w-5xl mx-auto font-light leading-relaxed">
            Meet the minds behind the innovation.
          </p>
        </header>

        {/* --- CATEGORY SECTIONS --- */}
        {categorizedMembers.map((category) => (
          <div key={category.title} className="mb-32">

            {/* Category Header */}
            <div className="mb-12">
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white mb-4">
                {category.title}
              </h2>
              <div className="h-px w-full bg-white/5" />
            </div>

            {/* Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {category.members.map((member, index) =>
                renderMemberCard(member, index)
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
    </SmoothScroll>
  );
};

export default OurTeam;