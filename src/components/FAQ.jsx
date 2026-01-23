"use client";
import React, { useState } from 'react';
import { Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const faqData = [
  {
    id: "01",
    question: "How can I join the APP Team?",
    answer: "Recruitment drives occur at the start of each semester. Monitor our comms channels for the 'Recruitment Protocol' link. Candidates undergo a two-stage evaluation: Technical Assessment and Core Interview."
  },
  {
    id: "02",
    question: "Is prior experience mandatory?",
    answer: "Negative. While existing knowledge helps, we value raw potential and learning velocity. We provide the mentorship; you provide the dedication."
  },
  {
    id: "03",
    question: "What is the project scope?",
    answer: "We engineer utility platforms for campus fests (Nimbus, Hillfair), maintain the official college web infrastructure, and deploy open-source tools. Our stack covers Web, Mobile (Native/Cross), and AI integration."
  },
  {
    id: "04",
    question: "Are First-Year students eligible?",
    answer: "Affirmative. Freshmen are our primary investment target. Joining early allows for a longer growth trajectory within the ecosystem."
  },
  {
    id: "05",
    question: "Required Tech Stack?",
    answer: "Domain specific. Web: React/Next.js. App: Flutter/React Native/Swift/Kotlin. Backend: Node/Go/Python. We prioritize engineering fundamentals over syntax memorization."
  },
  {
    id: "06",
    question: "Expected Time Commitment?",
    answer: "Standard load is 10-12 hours/week. This scales up during 'Crunch Mode' (Hackathons/Fest releases). Active contribution is the only metric that matters."
  }
];

const FAQItem = ({ item, index, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/5">
      <button
        onClick={onClick}
        className="w-full py-12 flex items-center justify-between text-left group transition-all duration-300"
      >
        <div className="flex items-center gap-8 md:gap-16">
          <span className={`text-[10px] font-mono tracking-widest transition-colors duration-500 ${isOpen ? 'text-[#00e1ff]' : 'text-[#333]'}`}>
            /{item.id}
          </span>
          <h3 className={`text-2xl md:text-5xl font-bold uppercase tracking-tighter transition-colors duration-500 ${isOpen ? 'text-white' : 'text-[#f4f4f5]/30 group-hover:text-[#f4f4f5]/60'}`}>
            {item.question}
          </h3>
        </div>

        <div className={`text-3xl transition-transform duration-500 ${isOpen ? 'rotate-45 text-[#00e1ff]' : 'text-[#333]'}`}>
          +
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-16 pl-16 md:pl-32 max-w-4xl">
              <p className="text-[#888] text-xl md:text-2xl font-light leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`bg-[#050505] py-40 px-6 md:px-16 ${spaceGrotesk.className}`}>
      <div className="max-w-7xl mx-auto">

        <header className="mb-32">
          <h2 className="text-7xl md:text-[10vw] font-bold uppercase tracking-tighter leading-none text-white">
            Fa<span className="text-[#00e1ff]">q</span>
          </h2>
        </header>

        <div className="border-t border-white/5">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;