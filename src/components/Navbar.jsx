"use client";
import React, { useState, useEffect } from "react";
import { Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: "/member", text: "Team" },
    { href: "/aboutUs", text: "About" },
    { href: "/events", text: "Events" },
    { href: "/contactUs", text: "Contact" },
  ];

  return (
    <>
      <nav
        className={`${spaceGrotesk.className} fixed top-0 left-0 w-full z-50 flex justify-center pt-8 px-6 md:px-12 transition-all duration-500`}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`
            w-full max-w-7xl flex justify-between items-center 
            px-8 py-5 rounded-full border transition-all duration-500
            ${scrolled || isMenuOpen
              ? "bg-black/40 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-transparent border-transparent"
            }
          `}
        >
          {/* --- LOGO --- */}
          <a href="/" className="relative z-50">
            <div className="flex items-center gap-3 group">
              <div className="w-2.5 h-2.5 bg-[#00e1ff] rounded-full transition-shadow duration-500 group-hover:shadow-[0_0_15px_#00e1ff]" />
              <span className="text-xl font-bold tracking-tight text-white uppercase">
                AppTeam
              </span>
            </div>
          </a>

          {/* --- DESKTOP NAV --- */}
          <ul className="hidden md:flex gap-10 items-center">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="relative block py-1 group"
                >
                  <span className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${pathname === link.href ? 'text-white' : 'text-[#666] group-hover:text-white'}`}>
                    {link.text}
                  </span>

                  {/* Underline Indicator */}
                  <div className={`absolute -bottom-1 left-0 h-px bg-[#00e1ff] transition-all duration-500 ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </a>
              </li>
            ))}

            <li>
              <button
                onClick={() => router.push('/member')}
                className="px-8 py-3.5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 hover:bg-[#00e1ff] rounded-full shadow-lg active:scale-95"
              >
                Join Us
              </button>
            </li>
          </ul>

          {/* --- MOBILE HAMBURGER --- */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
              className="w-6 h-px bg-white block"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="w-4 h-px bg-[#00e1ff] block self-end"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
              className="w-6 h-px bg-white block"
            />
          </button>
        </motion.div>
      </nav>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed inset-0 bg-black/95 backdrop-blur-2xl z-40 flex flex-col justify-center items-center ${spaceGrotesk.className}`}
          >
            <ul className="flex flex-col gap-10 text-center">
              {navLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="text-5xl font-bold uppercase tracking-tighter text-white hover:text-[#00e1ff] transition-all duration-300"
                  >
                    {link.text}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;