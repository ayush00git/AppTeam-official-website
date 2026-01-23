"use client";

import SmoothScroll from "@/components/SmoothScroll";
import { useState, useEffect, useRef } from "react";
import { Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    query: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusLog, setStatusLog] = useState(null);
  const messageTimeoutRef = useRef(null);

  // Parallax effect for Contact header
  const { scrollYProgress } = useScroll();
  const cParallax = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const tParallax = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setStatusLog({ type: "process", text: "Sending your message..." });

    if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);

    try {
      const response = await fetch(`/api/contactUs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatusLog({ type: "success", text: "Message sent successfully!" });
        setFormData({ name: "", email: "", query: "" });
      } else {
        setStatusLog({ type: "error", text: data.message || "Failed to send message. Please try again." });
      }
    } catch (error) {
      setStatusLog({ type: "error", text: "Connection error. Please check your network." });
      console.error("Error:", error);
    }

    setIsSubmitting(false);
    messageTimeoutRef.current = setTimeout(() => setStatusLog(null), 5000);
  };

  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
    };
  }, []);

  return (
    <SmoothScroll>
      <section className={`${spaceGrotesk.className} min-h-screen bg-[#050505] text-[#f4f4f5] py-40 px-6 md:px-16 overflow-hidden`}>

        {/* Background Ambience */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#00e1ff]/[0.02] blur-[150px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00e1ff]/[0.01] blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* --- PAGE HEADER --- */}
          <header className="mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <h1 className="text-8xl md:text-[20vw] font-bold uppercase tracking-tighter leading-none mb-12 flex justify-center items-baseline flex-nowrap">
                <span>Conta</span><motion.span style={{ y: cParallax }} className="inline-block">c</motion.span><motion.span style={{ y: tParallax }} className="inline-block text-[#00e1ff]">t</motion.span>
              </h1>
              <p className="text-gray-500 text-xl md:text-4xl max-w-5xl mx-auto font-light leading-relaxed">
                Let&apos;s build something extraordinary together.
              </p>
            </motion.div>
          </header>

          {/* --- MAIN CONTENT GRID --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* --- LEFT COLUMN: INFO --- */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex flex-col justify-center order-2 lg:order-1"
            >
              <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.9] mb-8">
                Get In<br />Touch
              </h2>
              <p className="text-gray-400 text-xl font-light leading-relaxed mb-16 max-w-lg">
                Have a project in mind? Want to collaborate? Or just want to say hello? We&apos;d love to hear from you.
              </p>

              {/* Contact Info Cards */}
              <div className="space-y-8">
                <div className="border border-white/5 bg-white/[0.02] backdrop-blur-sm p-6 rounded-2xl hover:border-[#00e1ff]/30 transition-all duration-300">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-3">Location</h3>
                  <p className="text-lg font-light">NIT Hamirpur, Himachal Pradesh, India</p>
                </div>

                <div className="border border-white/5 bg-white/[0.02] backdrop-blur-sm p-6 rounded-2xl hover:border-[#00e1ff]/30 transition-all duration-300">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-3">Email</h3>
                  <a href="mailto:contact@appteam.nith" className="text-lg font-light text-[#00e1ff] hover:underline">
                    contact@appteam.nith
                  </a>
                </div>

                <div className="border border-white/5 bg-white/[0.02] backdrop-blur-sm p-6 rounded-2xl hover:border-[#00e1ff]/30 transition-all duration-300">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-3">Social</h3>
                  <div className="flex gap-6">
                    <a href="https://www.instagram.com/appteam_nith/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00e1ff] transition-colors">
                      Instagram
                    </a>
                    <a href="https://www.linkedin.com/company/appteam-nith/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00e1ff] transition-colors">
                      LinkedIn
                    </a>
                    <a href="https://github.com/ayush00git/AppTeam-official-website" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00e1ff] transition-colors">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* --- RIGHT COLUMN: FORM --- */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              <div className="border border-white/5 bg-white/[0.02] backdrop-blur-sm p-8 md:p-12 rounded-2xl">

                <h3 className="text-2xl font-bold uppercase tracking-tight mb-8">Send us a message</h3>

                <form className="space-y-6">
                  {/* Name Field */}
                  <div className="group/input">
                    <label className="block text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-3 group-focus-within/input:text-[#00e1ff] transition-colors">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full bg-black/40 border border-white/10 p-4 text-[#f4f4f5] text-sm focus:outline-none focus:border-[#00e1ff] focus:bg-black/60 transition-all placeholder:text-gray-600 rounded-lg"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="group/input">
                    <label className="block text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-3 group-focus-within/input:text-[#00e1ff] transition-colors">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full bg-black/40 border border-white/10 p-4 text-[#f4f4f5] text-sm focus:outline-none focus:border-[#00e1ff] focus:bg-black/60 transition-all placeholder:text-gray-600 rounded-lg"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="group/input">
                    <label className="block text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-3 group-focus-within/input:text-[#00e1ff] transition-colors">
                      Message
                    </label>
                    <textarea
                      name="query"
                      value={formData.query}
                      onChange={handleChange}
                      placeholder="Tell us about your project or inquiry..."
                      rows="5"
                      className="w-full bg-black/40 border border-white/10 p-4 text-[#f4f4f5] text-sm focus:outline-none focus:border-[#00e1ff] focus:bg-black/60 transition-all placeholder:text-gray-600 resize-none rounded-lg"
                    />
                  </div>

                  {/* Status Messages */}
                  <AnimatePresence>
                    {statusLog && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`text-sm p-4 rounded-lg border ${statusLog.type === 'success'
                          ? 'border-green-500/30 text-green-400 bg-green-500/10'
                          : statusLog.type === 'error'
                            ? 'border-red-500/30 text-red-400 bg-red-500/10'
                            : 'border-[#00e1ff]/30 text-[#00e1ff] bg-[#00e1ff]/10'
                          }`}
                      >
                        {statusLog.text}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#00e1ff] text-black font-bold uppercase tracking-[0.3em] text-sm hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg active:scale-95 flex justify-center items-center gap-3 group/btn"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </SmoothScroll>
  );
}