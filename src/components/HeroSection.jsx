"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
    weight: ["300", "500", "700"],
    subsets: ["latin"],
});

function HeroSection() {
    const router = useRouter();
    const { scrollYProgress } = useScroll();

    // Smooth Parallax
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Float animation for the last 3 letters in TEAM (staggered)
    const eFloat = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
    const aFloat = useTransform(scrollYProgress, [0, 0.3], [0, -250]);
    const mFloat = useTransform(scrollYProgress, [0, 0.3], [0, -350]);

    return (
        <section className={`relative min-h-screen w-full bg-[#050505] text-[#f4f4f5] overflow-hidden ${spaceGrotesk.className}`}>

            {/* --- PREMIUM BACKGROUND (Soft Radial Gradient) --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#00e1ff] opacity-[0.03] blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] bg-[#00e1ff] opacity-[0.02] blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 flex flex-col justify-between min-h-screen px-6 md:px-16 py-12">

                {/* 1. CENTERPIECE TYPOGRAPHY */}
                <main className="flex-1 flex flex-col justify-center">
                    <motion.div
                        style={{ y, opacity }}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                            <h1 className="text-[14vw] md:text-[12vw] leading-none font-bold tracking-tight uppercase">
                                APP T<motion.span style={{ y: eFloat }} className="inline-block">E</motion.span><motion.span style={{ y: aFloat }} className="inline-block">A</motion.span><motion.span style={{ y: mFloat }} className="inline-block text-[#00e1ff]">M</motion.span>
                            </h1>

                            {/* Integrated Arrow - Now Draggable */}
                            <motion.div
                                drag
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                dragElastic={0.8}
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 100 }}
                                className="w-16 h-16 md:w-24 md:h-24 bg-[#00e1ff] rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(0,225,255,0.3)] cursor-grab active:cursor-grabbing z-20"
                            >
                                <svg width="40%" height="40%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </motion.div>
                        </div>

                        <motion.p
                            className="mt-8 text-xl md:text-3xl font-light text-[#888] max-w-2xl leading-relaxed"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: { transition: { staggerChildren: 0.03, delayChildren: 1.5 } }
                            }}
                        >
                            {/* Part 1 */}
                            {"Crafting premium digital experiences through ".split("").map((char, i) => (
                                <motion.span key={`part1-${i}`} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                                    {char}
                                </motion.span>
                            ))}

                            {/* Styled Part */}
                            <span className="text-white font-normal underline decoration-[#00e1ff]/30 decoration-2 underline-offset-8">
                                {"thoughtful design".split("").map((char, i) => (
                                    <motion.span key={`part2-${i}`} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                                        {char}
                                    </motion.span>
                                ))}
                            </span>

                            {/* Part 3 */}
                            {" and elite engineering.".split("").map((char, i) => (
                                <motion.span key={`part3-${i}`} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                                    {char}
                                </motion.span>
                            ))}
                        </motion.p>
                    </motion.div>
                </main>

                {/* 2. ELEGANT FOOTER */}
                <footer className="flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="hidden md:block">
                        <div className="w-12 h-px bg-[#333] mb-4" />
                        <p className="text-xs tracking-widest text-[#444] uppercase font-medium">Creative / Modular / Precise</p>
                    </div>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        onClick={() => router.push('/member')}
                        className="group relative px-10 py-5 bg-white text-black cursor-pointer font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-[#00e1ff]"
                    >
                        <span className="relative z-10">Meet the Team</span>
                        <div className="absolute inset-0 bg-[#00e1ff] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </motion.button>
                </footer>

            </div>

        </section>
    );
}

export default HeroSection;