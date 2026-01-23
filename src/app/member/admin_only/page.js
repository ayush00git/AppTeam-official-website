"use client";
import Link from "next/link";
import { Space_Grotesk } from "next/font/google";
import { motion } from "framer-motion";

const spaceGrotesk = Space_Grotesk({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
});

function AdminOnly() {
    return (
        <div className={`min-h-screen w-full bg-[#050505] text-[#f4f4f5] flex flex-col items-center justify-center relative overflow-hidden ${spaceGrotesk.className}`}>

            {/* Background Ambience */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#00e1ff]/[0.02] blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00e1ff]/[0.01] blur-[120px]" />
            </div>

            {/* Central Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-2xl w-full px-6 text-center"
            >

                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 mb-8 border border-white/10 bg-white/[0.02] backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="w-2 h-2 bg-[#00e1ff] rounded-full animate-pulse" />
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em]">
                        Error 403
                    </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-none mb-6">
                    Access<br />Denie<span className="text-[#00e1ff]">d</span>
                </h1>

                {/* Description */}
                <p className="text-gray-400 text-xl md:text-2xl font-light leading-relaxed mb-12 max-w-xl mx-auto">
                    This area is restricted to administrators only.
                </p>

                {/* Return Button */}
                <Link href="/">
                    <button className="px-8 py-4 bg-[#00e1ff] text-black font-bold uppercase tracking-[0.3em] text-sm hover:bg-white transition-all duration-300 rounded-lg active:scale-95 flex items-center gap-3 mx-auto">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Return Home
                    </button>
                </Link>
            </motion.div>

        </div>
    )
}

export default AdminOnly;