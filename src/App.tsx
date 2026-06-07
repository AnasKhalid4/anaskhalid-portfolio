/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, animate } from "motion/react";
import * as Icons from "./icons";
import ScrollReveal from "./components/ScrollReveal";
import ProjectFlowDiagram from "./components/ProjectFlowDiagram";
import altayraImg from '../assets/altayra.png';
import medicalImg from '../assets/medical-fitness-pros.png';
import cronotaxImg from '../assets/cronotax.png';
import devlabyrinthImg from '../assets/devlabyrinth.png';
import nouryxImg from '../assets/nouryx.png';
import calorisImg from '../assets/caloris.png';
import medtekImg from '../assets/medtek.png';
import sevenkingsImg from '../assets/sevenkings.png';
import metrolabsImg from '../assets/metrolabs.png';
import fiveelementImg from '../assets/fiveelement.png';
import altayraAppImg from '../assets/altayra_app.png';


const ICON_SIZE = 20;

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const scale = useMotionValue(1);
  const opacity = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const scaleSpring = useSpring(scale, { damping: 25, stiffness: 300, mass: 0.2 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      opacity.set(1);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        scale.set(2.5);
      } else {
        scale.set(1);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{
          x: useTransform(cursorX, (x) => x - 6),
          y: useTransform(cursorY, (y) => y - 6),
          opacity,
          willChange: "transform"
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-white/40 rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{
          x: useTransform(cursorXSpring, (x) => x - 20),
          y: useTransform(cursorYSpring, (y) => y - 20),
          scale: scaleSpring,
          opacity,
          willChange: "transform"
        }}
      />
    </>
  );
};

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);
  const motionCount = useMotionValue(0);

  useEffect(() => {
    // Listen to value changes to update local display count
    const unsubscribe = motionCount.onChange((latest) => {
      setCount(Math.round(latest));
    });

    const controls = animate(motionCount, 100, {
      duration: 2.8, // 2.8 seconds loading time for smooth showcase
      ease: [0.16, 1, 0.3, 1], // beautiful custom ease-out
      onComplete: () => {
        // Wait a brief moment before triggering the slide-up
        setTimeout(onComplete, 400);
      }
    });

    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [motionCount, onComplete]);

  const progressPercent = count / 100;

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      exit={{ 
        y: "-100%",
        transition: { duration: 1.2, ease: [0.85, 0, 0.15, 1] } // ultra smooth ease-in-out curve
      }}
      className="fixed inset-0 z-[200] bg-[#050505] flex flex-col justify-between px-6 md:px-12 py-8 md:py-12 overflow-hidden select-none"
    >
      {/* Ambient background glows jljlthat charge up with the loading percentage */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Left blue glow */}
        <div 
          className="absolute -left-[10%] top-[20%] w-[60%] h-[60%] rounded-full bg-[#006DFF] opacity-0 blur-[120px] transition-all duration-500"
          style={{ 
            opacity: progressPercent * 0.25, 
            transform: `scale(${0.8 + progressPercent * 0.4})` 
          }} 
        />
        {/* Right orange glowjljljlljljl */}
        <div 
          className="absolute -right-[10%] top-[20%] w-[60%] h-[60%] rounded-full bg-[#FF5A00] opacity-0 blur-[120px] transition-all duration-500"
          style={{ 
            opacity: progressPercent * 0.2, 
            transform: `scale(${0.8 + progressPercent * 0.4})` 
          }} 
        />
        {/* Top purple glow */}
        <div 
          className="absolute left-[20%] -top-[10%] w-[60%] h-[60%] rounded-full bg-[rgba(168,85,247,0.5)] opacity-0 blur-[120px] transition-all duration-500"
          style={{ 
            opacity: progressPercent * 0.15, 
            transform: `scale(${0.8 + progressPercent * 0.4})` 
          }} 
        />
        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%%22 height=%22100%%22 filter=%22url(%23noise)%22 opacity=%220.02%22/></svg>')] pointer-events-none opacity-40" />
      </div>

      {/* Top Header — Branding */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex justify-between items-start"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
          SYSTEM INITIALIZATION
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
         
        </span>
      </motion.div>

      {/* Center Logo / Typographic Composition */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col items-start gap-4 relative select-none">
          {/* First Name with gold dot */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%", rotate: 2 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-[14vw] md:text-[8vw] text-white uppercase leading-none tracking-[-0.04em] flex items-baseline gap-3 md:gap-5"
            >
              ANAS
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 200 }}
                className="inline-block w-4 h-4 md:w-6 md:h-6 bg-gold rounded-full shadow-[0_0_15px_rgba(234,179,8,0.6)] animate-pulse"
              />
            </motion.h1>
          </div>

          {/* Hairline Separator */}
          <div className="w-full pr-12 md:pr-24">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent origin-left"
            />
          </div>

          {/* Last Name Offset */}
          <div className="overflow-hidden pl-[10vw] md:pl-[6vw]">
            <motion.h1
              initial={{ y: "110%", rotate: -1 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-[14vw] md:text-[8vw] text-transparent uppercase leading-none tracking-[-0.04em]"
              style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.3)' }}
            >
              KHALID
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Bottom Control / Status Bar */}
      <div className="relative z-10 flex flex-col gap-6 md:gap-8">
        {/* Metadata + Counter */}
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1 text-left">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/50"
            >
              IoT · AI · FULL STACK DEVELOPER
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30"
            >
              PRE-COMPILING RESOURCES...
            </motion.span>
          </div>
          
          <div className="flex items-baseline">
            <span className="font-display text-[12vw] md:text-[7vw] font-black tracking-tighter text-white/95 leading-none tabular-nums">
              {count}
            </span>
            <span className="font-display text-[4vw] md:text-[2vw] font-black text-white/40 leading-none ml-1">
              %
            </span>
          </div>
        </div>

        {/* Triple Gradient Custom Progress Bar */}
        <div className="w-full h-[2px] bg-white/5 overflow-hidden rounded-full relative">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progressPercent }}
            transition={{ duration: 0.1, ease: "linear" }}
            className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#006DFF] via-[rgba(168,85,247,0.8)] to-[#FF5A00] origin-left"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'web' | 'mobile'>('web');
  const [projectViews, setProjectViews] = useState<Record<string, 'mockup' | 'flow'>>({});
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 20, stiffness: 80, mass: 0.5 });
  const heroY = useTransform(smoothScrollY, [0, 1000], [0, 250]);
  const heroOpacity = useTransform(smoothScrollY, [0, 500], [1, 0]);

  useEffect(() => {
    if (isLoading) return; // Don't start smooth scrolling until loading is done

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 0.95,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Global anchor click listener for buttery smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        const targetId = anchor.getAttribute('href');
        if (targetId) {
          e.preventDefault();
          const targetElement = document.querySelector(targetId) as HTMLElement;
          if (targetElement) {
            lenis.scrollTo(targetElement, {
              offset: -80, // match header height spacing
              duration: 1.5,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [isLoading]);

  return (
    <div className={`bg-surface ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
      <AnimatePresence>
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <CustomCursor />
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-8 flex justify-between items-center pointer-events-none text-white"
      >
        <div className="font-cursive text-3xl md:text-5xl tracking-normal pointer-events-auto select-none">Anas Khalid</div>

        <div className="flex items-center gap-4 pointer-events-auto">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-4 border border-white px-6 py-3 text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
          >
            <div className="flex flex-col gap-1.5 mt-0.5">
              <div className="w-5 h-[1px] bg-current"></div>
              <div className="w-5 h-[1px] bg-current"></div>
            </div>
            MENU
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[60] bg-surface flex flex-col p-10"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:rotate-90 transition-transform duration-300"
              >
                <Icons.X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8 mt-20">
              {["About", "Experience", "Work"].map((item, i) => (
                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-display font-medium text-6xl hover:text-gold transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-6">
              {/* Social icons */}
              <div className="flex gap-6 items-center">
                <motion.a
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  href="https://www.linkedin.com/in/anas-khalid1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  <Icons.Linkedin size={16} /> LinkedIn
                </motion.a>
                <motion.a
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  href="https://github.com/AnasKhalid4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  <Icons.Github size={16} /> GitHub
                </motion.a>
              </div>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                href="mailto:anaskhalid40400@gmail.com"
                className="block w-full text-center font-mono text-sm uppercase tracking-[0.2em] border border-white bg-white text-black py-6 hover:bg-transparent hover:text-white transition-colors"
              >
                GET IN TOUCH
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* ═══════════════════════════════════════════════════════
            HERO SECTION — Editorial Split Layout
            Inspired by Awwwards-winning portfolios:
            Dennis Snellenberg, Bruno Cisco, Brittany Chiang
        ═══════════════════════════════════════════════════════ */}
        <section
          className="hero-full relative flex flex-col justify-end overflow-hidden bg-surface text-white"
        >
          {/* Hero Background Image Container with full-screen object-cover behavior */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.img
              initial={{ scale: 1.15, filter: "blur(4px)" }}
              animate={!isLoading ? { scale: 1, filter: "blur(0px)" } : { scale: 1.15, filter: "blur(4px)" }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              src="/hero-image.webp"
              alt="Anas Khalid"
              className="w-full h-full object-cover"
            />
            {/* Soft bottom fade to blend image into the next section's dark background */}
            <div className="absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-[#131313] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-[15%] bg-gradient-to-b from-[#131313]/40 to-transparent pointer-events-none" />
            {/* Readability gradient overlay to ensure high contrast for text */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />
          </div>

          {/* Subtle noise texture overlay for editorial feel */}
          <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          />

          <motion.div
            variants={{
              initial: {},
              animate: {
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.15
                }
              }
            }}
            initial="initial"
            animate={isLoading ? "initial" : "animate"}
            className="relative z-20 w-full px-6 md:px-10 pb-10 lg:pb-16"
            style={{ y: heroY, opacity: heroOpacity, willChange: "transform, opacity" }}
          >

            {/* Cinematic Left-Aligned Layout — Keeps the right side completely clear for the hero image portrait */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end">
              {/* LEFT — Name */}
              <div className="lg:col-span-8 flex flex-col items-start">
                <h1 className="font-display font-black uppercase select-none leading-[0.82] tracking-[-0.04em] text-left">
                  {/* First name */}
                  <span className="block overflow-hidden">
                    <motion.span
                      variants={{
                        initial: { y: "115%" },
                        animate: { y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      className="block text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[7.5vw] text-white"
                    >
                      Anas
                    </motion.span>
                  </span>
                  {/* Last name — outlined stroke */}
                  <span className="block overflow-hidden mt-3 lg:mt-0">
                    <motion.span
                      variants={{
                        initial: { y: "115%" },
                        animate: { y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      className="block text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[7.5vw] text-transparent hero-stroke"
                    >
                      Khalid
                    </motion.span>
                  </span>
                </h1>
              </div>

              {/* RIGHT — Subtitle + CTAs */}
              <div className="lg:col-span-4 flex flex-col items-start gap-6 pb-2">
                <motion.p
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="text-white/70 text-sm md:text-[15px] font-light leading-[1.7] max-w-sm text-left"
                >
                  I craft high-performance <span className="text-white font-medium">IoT platforms</span>, intelligent <span className="text-white font-medium">AI systems</span>, and scalable <span className="text-white font-medium">web & mobile</span> products — engineered for impact.
                </motion.p>

                <motion.div
                  variants={{
                    initial: { opacity: 0, y: 15 },
                    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="flex items-center gap-6"
                >
                  <a
                    href="#work"
                    className="group relative inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white border-b border-white/30 pb-2 hover:border-white transition-colors duration-300"
                  >
                    My Work
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                  <a
                    href="mailto:anaskhalid40400@gmail.com"
                    className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300"
                  >
                    Get in Touch
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Bottom bar — socials left, scroll right */}
            <motion.div
              variants={{
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="flex justify-between items-center mt-8 md:mt-12 pt-6 border-t border-white/10"
            >
              {/* Social links */}
              <div className="flex items-center gap-6 pointer-events-auto">
                <a
                  href="https://www.linkedin.com/in/anas-khalid1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300 group"
                >
                  <Icons.Linkedin size={13} className="group-hover:text-white transition-colors" />
                  <span className="hidden sm:inline">LinkedIn</span>
                </a>
                <a
                  href="https://github.com/AnasKhalid4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 hover:text-white transition-colors duration-300 group"
                >
                  <Icons.Github size={13} className="group-hover:text-white transition-colors" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </div>

              {/* Scroll indicator */}
              <a
                href="#about"
                className="group flex items-center gap-3 pointer-events-auto cursor-pointer"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45 group-hover:text-white transition-colors">
                  Explore my work
                </span>
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg className="w-3 h-3 text-white/45 group-hover:text-white/70 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M19 14l-7 7m0 0l-7-7" />
                  </svg>
                </motion.div>
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* Intro */}
        <section id="about" className="max-w-7xl mx-auto px-6 py-20 md:py-40">
          <div className="flex items-center gap-4 mb-10 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-10 h-[1px] bg-white origin-left"
            />
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
            >
              INTRO
            </motion.span>
          </div>
          <h2 className="font-display text-[1.65rem] sm:text-4xl md:text-7xl font-semibold leading-[1.15] max-w-5xl tracking-tight md:tracking-tighter uppercase">
            {"I engineer intelligent platforms that push the boundaries of digital reality.".split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-2 -mb-2 md:pb-4 md:-mb-4 mr-[0.18em] sm:mr-[0.22em] md:mr-[0.25em]">
                <motion.span
                  initial={{ y: "100%", opacity: 0, rotate: 5 }}
                  whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.9,
                    delay: i * 0.05,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={`inline-block origin-bottom-left ${["intelligent", "platforms", "digital", "reality."].includes(word.toLowerCase()) ? "text-white/40" : "text-white"}`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-8 md:mt-12 text-white/60 text-base md:text-2xl font-light leading-relaxed max-w-3xl"
          >
            As a Software Engineer with two years of dedicated experience, I specialize in transforming complex problems into elegant, scalable code. My core expertise spans across building interconnected <strong className="text-white font-normal">IoT architectures</strong>, high-performance <strong className="text-white font-normal">SaaS applications</strong>, and cutting-edge <strong className="text-white font-normal">AI-powered platforms</strong>.
          </motion.p>
        </section>

        {/* Expertise Grid - Hidden for individual portfolio */}
        {false && (
          <section id="expertise" className="max-w-7xl mx-auto px-6 py-40 border-t border-white/10">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-[1px] bg-white opacity-20" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">WHAT WE BUILD</span>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              <div className="lg:col-span-5">
                <ScrollReveal>
                  <h2 className="font-display text-6xl md:text-7xl leading-[0.9] font-bold uppercase tracking-tighter mb-8">
                    AI SYSTEMS THAT SHIP IN WEEKS, NOT QUARTERS
                  </h2>
                  <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-sm">
                    We build working AI systems for operations-heavy businesses. No strategy decks. No proof-of-concepts that never reach production.
                  </p>
                </ScrollReveal>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
                {[
                  { id: "01", title: "Agentic AI Systems", tag: "MULTI-AGENT", icon: <Icons.Hub size={ICON_SIZE} /> },
                  { id: "02", title: "Workflow Automation", tag: "AUTOMATION", icon: <Icons.GitBranch size={ICON_SIZE} /> },
                  { id: "03", title: "Voice AI Agents", tag: "VOICE AI", icon: <Icons.Mic size={ICON_SIZE} /> },
                  { id: "04", title: "RAG & Custom Assistants", tag: "RAG / LLM", icon: <Icons.Database size={ICON_SIZE} /> }
                ].map((item, i) => (
                  <ScrollReveal
                    key={item.id}
                    delay={i * 0.1}
                    className="bg-surface p-10 h-[240px] flex flex-col justify-between hover:bg-gold/5 group transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-transparent hover:border-white/10"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-xs text-white/20 group-hover:text-gold transition-colors">{item.id}</span>
                      <div className="text-white/20 group-hover:text-gold transition-colors">
                        {item.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-3xl font-semibold tracking-tight mb-2 group-hover:translate-x-1 transition-transform uppercase">{item.title}</h3>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-gold/70">{item.tag}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Products Showcase - Hidden for individual portfolio */}
        {false && (
          <section id="products" className="max-w-7xl mx-auto px-6 py-40 border-t border-white/10">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-[1px] bg-white opacity-20" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">PRODUCTS WE'VE BUILT</span>
              </div>
            </ScrollReveal>

            <div className="max-w-3xl mb-32">
              <ScrollReveal>
                <h2 className="font-display text-6xl md:text-7xl leading-[0.9] font-bold uppercase tracking-tighter mb-8">
                  TOOLS WE BUILT TO SOLVE REAL PROBLEMS
                </h2>
                <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
                  Not demos. Shipped products used by real teams, each one built around a specific operational problem we kept seeing across clients.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  name: "EZLY",
                  tag: "SALES AI",
                  desc: "An AI sales persona that replicates your team's communication style across email, SMS, WhatsApp, and social."
                },
                {
                  name: "BLOGGEN",
                  tag: "CONTENT AI",
                  desc: "AI content tools for developers. Blog posts, technical guides, and docs in MDX, with SEO metadata generated automatically."
                },
                {
                  name: "DESIGNRIFT",
                  tag: "DESIGN TOOLING",
                  desc: "Theme builder for design systems. Generate CSS custom properties and Tailwind variables from any color palette."
                }
              ].map((product, i) => (
                <ScrollReveal key={product.name} delay={i * 0.15} className="group cursor-pointer bg-surface p-8 border border-white/5 hover:border-gold/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 h-[320px] flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-8">
                      <span className="font-mono text-[10px] text-white/20">0{i + 1}</span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-gold">{product.tag}</span>
                    </div>
                    <h3 className="text-4xl font-display font-bold uppercase tracking-wide mb-6 group-hover:text-gold transition-colors">{product.name}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{product.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/30 group-hover:text-white transition-colors mt-8">
                    VIEW PRODUCT <Icons.ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

        {/* Experience & Education */}
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-40 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 border-t border-white/10">
          {/* Experience */}
          <div id="experience">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-[1px] bg-white opacity-20" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">EXPERIENCE</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold leading-[0.9] uppercase mb-10 md:mb-16 tracking-tighter">
                BUILDING THE <span className="text-gold">FUTURE</span> OF WORK
              </h2>
            </ScrollReveal>

            <div className="flex flex-col gap-16">
              {[
                {
                  title: "Software Engineer",
                  company: "DEVBEINGS",
                  date: "2026 – Present",
                  desc: "Building enterprise-grade IoT asset tracking platforms with real-time GPS, geofencing, and multi-tenant RBAC. Architecting AI-powered SaaS products including movement assessment pipelines using multimodal LLMs (OpenAI & Gemini) and RAG systems for clinical report generation."
                },
                {
                  title: "Junior Full Stack Developer",
                  company: "7 KINGS CODE",
                  date: "2024 – 2025",
                  desc: "Delivered full-stack B2B and B2C e-commerce platforms serving multiple clients. Integrated 5+ payment gateways including Stripe and regional providers. Built custom admin dashboards, multi-vendor architectures, and optimized SEO pipelines for production storefronts."
                }
              ].map((job, i) => (
                <ScrollReveal key={job.title} delay={i * 0.1}>
                  <h3 className="font-display text-3xl font-semibold tracking-tight mb-2 uppercase hover:text-white transition-colors cursor-default">{job.title}</h3>
                  <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">{job.company} • {job.date}</div>
                  <p className="text-white/50 text-sm leading-relaxed">{job.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Education */}
          <div id="education">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-[1px] bg-white opacity-20" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">EDUCATION</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold leading-[0.9] uppercase mb-10 md:mb-16 tracking-tighter">
                ACADEMIC <span className="text-gold">FOUNDATION</span>
              </h2>
            </ScrollReveal>

            <div className="flex flex-col gap-16">
              {[
                {
                  degree: "Bachelor of Sciences in Computer Science",
                  school: "Comsats University Islamabad",
                  date: "2020 – 2024",
                  desc: "Focused on software engineering, data structures, algorithms, and system design. Built a strong foundation in full-stack development and distributed systems that underpins every production system built today."
                }
              ].map((edu, i) => (
                <ScrollReveal key={edu.degree} delay={i * 0.1}>
                  <h3 className="font-display text-3xl font-semibold tracking-tight mb-2 uppercase hover:text-white transition-colors cursor-default">{edu.degree}</h3>
                  <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">{edu.school} • {edu.date}</div>
                  <p className="text-white/50 text-sm leading-relaxed">{edu.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee */}
        <section className="py-8 md:py-12 bg-white/5 border-y border-white/10 relative overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[1, 2, 3].map((set) => (
              <div key={set} className="flex gap-10 md:gap-20 px-6 md:px-10 items-center font-display text-2xl sm:text-3xl md:text-6xl text-white/20 tracking-[0.1em] md:tracking-[0.2em] font-semibold uppercase">
                <span className="hover:text-gold transition-colors cursor-default">NEXT.JS</span>
                <span className="text-gold/30">•</span>
                <span className="hover:text-gold transition-colors cursor-default">SUPABASE</span>
                <span className="text-gold/30">•</span>
                <span className="hover:text-gold transition-colors cursor-default">REACT.JS</span>
                <span className="text-gold/30">•</span>
                <span className="hover:text-gold transition-colors cursor-default">TAILWIND CSS</span>
                <span className="text-gold/30">•</span>
                <span className="hover:text-gold transition-colors cursor-default">NODE.JS</span>
                <span className="text-gold/30">•</span>
                <span className="hover:text-gold transition-colors cursor-default">DJANGO</span>
                <span className="text-gold/30">•</span>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Work - Custom Projects */}
        <section id="work" className="max-w-7xl mx-auto px-6 py-20 md:py-40 border-t border-white/10" style={{ contain: 'layout style' }}>
          <ScrollReveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-12 md:mb-20">
              <div className="flex items-center gap-4">
                <div className="w-10 h-[1px] bg-white opacity-20" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">FEATURED WORK</span>
              </div>

              {/* Tabs */}
              <div className="flex w-fit border border-white/10">
                {(['web', 'mobile'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`font-mono text-[10px] uppercase tracking-widest px-6 sm:px-8 py-3 transition-all duration-300 ${activeTab === tab
                      ? 'bg-white text-black'
                      : 'text-white/40 hover:text-white'
                      }`}
                  >
                    {tab === 'web' ? 'Web Apps' : 'Mobile Apps'}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-20 md:gap-32" style={{ contentVisibility: 'auto' }}>
            {[
              {
                title: "ALTAYRA",
                desc: "Enterprise IoT asset tracking platform featuring real-time GPS mapping, automated geofencing alerts, and fully synchronized web-mobile workflows.",
                tech: ["Next.js", "Nest.js", "Supabase", "TanStack Query", "GPS"],
                imgSrc: altayraImg,
                link: "https://altayra.com/",
                category: 'web' as const
              },
              {
                title: "CRONOTAX",
                desc: "AI-powered tax automation platform built with Next.js and Supabase, utilizing Gemini AI for intelligent document analysis and processing.",
                tech: ["Next.js", "Supabase", "Gemini AI", "Tailwind CSS"],
                imgSrc: cronotaxImg,
                link: "https://cronotax-web-production.up.railway.app/",
                category: 'web' as const
              },
              {
                title: "5TH ELEMENT BIO",
                desc: "Premium B2C & B2B peptide distribution platform built with Next.js and Stripe. Implements granular role-based access control (Super Admin, Sub-Admin, Manufacturer, Distributor, Service Provider), private customized pricing agreements, and a multi-tenant order fulfillment workflow.",
                tech: ["Next.js", "Stripe", "RBAC", "Multi-Tenant Architecture"],
                imgSrc: fiveelementImg,
                link: "https://5thelementbio.com/",
                category: 'web' as const
              },
              {
                title: "MEDICAL FITNESS PROS",
                desc: "End-to-end AI movement assessment platform utilizing a multimodal LLM pipeline to generate clinical-grade reports and custom workout plans.",
                tech: ["Next.js", "Supabase", "OpenAI & Gemini", "RAG", "Tailwind CSS"],
                imgSrc: medicalImg,
                link: "https://mfp.solutions/auth",
                category: 'web' as const
              },
              {
                title: "NOURYX",
                desc: "Premium online booking platform for top-tier beauty salons, spas, and barbers across France, featuring real-time availability and secure payments.",
                tech: ["Next.js", "Firebase", "Stripe", "Tailwind CSS"],
                imgSrc: nouryxImg,
                link: "https://nouryx.com/",
                category: 'web' as const
              },
              {
                title: "MEDTEK SERVICES",
                desc: "Medical billing, credentialing, and healthcare administrative solutions platform optimizing revenue cycle management and workflow operations for multi-specialty clinical practices.",
                tech: ["Next.js", "Tailwind CSS", "SEO", "Responsive Design"],
                imgSrc: medtekImg,
                link: "https://medtekservices.com/",
                category: 'web' as const
              },
              {
                title: "7 KINGS MARKETING",
                desc: "High-impact digital marketing and brand strategy agency platform delivering bespoke advertising solutions, high-performance lead generation campaigns, and premium UI designs.",
                tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Agency Solutions"],
                imgSrc: sevenkingsImg,
                link: "https://7kingsmarketing.com/",
                category: 'web' as const
              },
              {
                title: "METRO LABS BIO",
                desc: "Scientific biotechnology research and diagnostics portal showcasing innovative laboratory services, testing suites, research pipelines, and comprehensive clinical healthcare analytics.",
                tech: ["Next.js", "Tailwind CSS", "Microdata Schema", "Medical Analytics"],
                imgSrc: metrolabsImg,
                link: "https://metrolabsbio.com/",
                category: 'web' as const
              },
              {
                title: "DEVLABYRINTH",
                desc: "Enterprise-grade digital agency platform providing custom software development, cloud solutions, and AI automation services.",
                tech: ["Next.js", "Tailwind CSS"],
                imgSrc: devlabyrinthImg,
                link: "https://devlabyrinth.com/",
                category: 'web' as const
              },
              {
                title: "ALTAYRA MOBILE",
                desc: "Enterprise IoT tracking application allowing real-time asset monitoring, technician dispatch, geofenced alerts, and mobile synchronization.",
                tech: ["React Native", "Expo", "GPS", "IoT Real-time", "App Store"],
                imgSrc: altayraAppImg,
                link: "https://apps.apple.com/us/app/altayra/id6763271344",
                category: 'mobile' as const
              },
              {
                title: "CALORIS",
                desc: "AI-powered calorie tracker that uses computer vision to instantly identify food and log nutritional data — making healthy eating effortless.",
                tech: ["React Native", "Expo", "AI Vision", "Supabase"],
                imgSrc: calorisImg,
                link: "https://caloris.app/",
                category: 'mobile' as const
              }
            ]
              .filter(p => p.category === activeTab)
              .map((project, i) => {
                const hasDiagram = ["ALTAYRA", "ALTAYRA MOBILE", "5TH ELEMENT BIO", "MEDICAL FITNESS PROS", "CRONOTAX", "NOURYX", "CALORIS"].includes(project.title);
                const activeView = projectViews[project.title] || (hasDiagram ? 'flow' : 'mockup');
                return (
                  <div key={project.title} className="group relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 500px' }}>
                    <div className={`${activeView === 'flow' ? 'lg:col-span-7' : 'lg:col-span-6'} ${i % 2 !== 0 ? 'lg:order-last' : ''} transition-all duration-500`}>
                      {hasDiagram && (
                        <div className="flex justify-between items-center mb-4 max-w-lg mx-auto">
                          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">System Visualizer</span>
                          <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 p-0.5 rounded-full select-none">
                            <button
                              onClick={() => setProjectViews(prev => ({ ...prev, [project.title]: 'mockup' }))}
                              className={`px-3.5 py-1.5 rounded-full font-mono text-[8px] sm:text-[9px] uppercase tracking-widest transition-all duration-300 cursor-pointer ${activeView === 'mockup'
                                ? 'bg-white text-black font-semibold'
                                : 'text-white/40 hover:text-white'
                                }`}
                            >
                              Interface
                            </button>
                            <button
                              onClick={() => setProjectViews(prev => ({ ...prev, [project.title]: 'flow' }))}
                              className={`px-3.5 py-1.5 rounded-full font-mono text-[8px] sm:text-[9px] uppercase tracking-widest transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${activeView === 'flow'
                                ? 'bg-gold text-black font-semibold shadow-[0_0_10px_rgba(234,179,8,0.3)]'
                                : 'text-white/40 hover:text-white'
                                }`}
                            >
                              System Flow
                              <span className={`inline-block w-1.5 h-1.5 rounded-full ${activeView === 'flow' ? 'bg-black animate-ping' : 'bg-gold/60'}`} />
                            </button>
                          </div>
                        </div>
                      )}

                      <ScrollReveal direction="none">
                        <AnimatePresence mode="wait">
                          {activeView === 'flow' ? (
                            <motion.div
                              key="flow"
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -15 }}
                              transition={{ duration: 0.35, ease: "easeOut" }}
                              className="w-full max-w-5xl mx-auto"
                            >
                              <ProjectFlowDiagram projectTitle={project.title} />
                            </motion.div>
                          ) : project.category === 'mobile' ? (
                            /* Mobile: clean image, no dark box */
                            <motion.div
                              key="mockup-mobile"
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -15 }}
                              transition={{ duration: 0.35, ease: "easeOut" }}
                              className="relative max-w-xs mx-auto"
                            >
                              <img
                                src={project.imgSrc}
                                alt={`${project.title} - Software Engineering Project by Anas Khalid`}
                                className="w-full h-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-500"
                              />
                            </motion.div>
                          ) : (
                            /* Web: premium static glow box */
                            <motion.div
                              key="mockup-web"
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -15 }}
                              transition={{ duration: 0.35, ease: "easeOut" }}
                              className="relative aspect-video max-w-lg mx-auto rounded-lg overflow-hidden p-[1px] bg-gradient-to-b from-white/10 to-white/[0.02] hover:from-gold/40 hover:to-gold/10 transition-all duration-500 shadow-xl shadow-black/60 hover:shadow-gold/5"
                              style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                            >
                              {/* Inner Box */}
                              <div className="relative w-full h-full bg-[#050505] rounded-sm flex flex-col items-center justify-center gap-4 overflow-hidden z-10">
                                {/* Static subtle inner border and background */}
                                <div className="absolute inset-0 bg-white/[0.02] border border-white/5 rounded-sm" />

                                <img
                                  src={project.imgSrc}
                                  alt={`${project.title} - Enterprise System Architecture by Anas Khalid`}
                                  className="absolute inset-0 z-20 w-full h-full object-contain p-6 opacity-80 hover:opacity-100 transition-opacity duration-500"
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </ScrollReveal>
                    </div>

                    <div className={`${activeView === 'flow' ? 'lg:col-span-5' : 'lg:col-span-6'} transition-all duration-500`}>
                      <ScrollReveal>
                        <h3 className="font-display text-3xl sm:text-4xl md:text-[5vw] leading-[0.9] text-gold font-bold uppercase mb-6 md:mb-8 tracking-tighter group-hover:scale-[1.02] transition-transform duration-500 origin-left">
                          {project.title}
                        </h3>
                        <p className="text-white/60 text-base md:text-xl font-light leading-relaxed max-w-xl mb-6 md:mb-8">
                          {project.desc}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-12">
                          {project.tech.map(tech => (
                            <div key={tech} className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-white/50 font-mono text-[10px] uppercase tracking-widest hover:border-gold/30 hover:text-gold transition-colors cursor-default">
                              {tech}
                            </div>
                          ))}
                        </div>

                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-28 w-28 md:h-40 md:w-40 rounded-full border border-white/20 flex items-center justify-center group/btn hover:bg-white hover:border-white hover:text-black hover:scale-110 transition-all duration-500 font-mono text-[10px] uppercase tracking-widest"
                        >
                          VIEW LIVE
                        </a>
                      </ScrollReveal>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        {/* Philosophy CTA - Hidden for individual portfolio */}
        {true && (
          <section id="philosophy" className="max-w-7xl mx-auto px-6 py-20 md:py-40 border-t border-white/5 text-center">
            <ScrollReveal direction="none">
              <h2 className="font-display text-2xl sm:text-4xl md:text-[6vw] font-bold leading-[1.1] uppercase tracking-tighter mb-16 md:mb-40">
                Experience The <span className="text-white/30 italic font-medium">Extraordinary.</span><br />
                I BUILD IT. IT SHIPS. IT RUNS.
              </h2>
            </ScrollReveal>

            <div className="max-w-4xl mx-auto flex flex-col gap-px bg-white/10">
              {[
                { label: "SHIPS FAST", val: "< 5 WEEKS" },
                { label: "EXPERTISE", val: "2+ YEARS" },

              ].map((item, i) => (
                <ScrollReveal key={item.label} delay={i * 0.1} className="bg-surface flex justify-between items-center p-12 group hover:bg-white transition-all duration-500">
                  <span className="font-display text-xl sm:text-3xl md:text-5xl font-bold tracking-wider md:tracking-widest group-hover:text-black transition-colors">{item.label}</span>
                  <span className="font-mono text-[10px] md:text-xs text-white/30 border border-white/10 rounded-full px-3 md:px-4 py-1.5 md:py-2 group-hover:border-black group-hover:text-black transition-all">{item.val}</span>
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-16 md:mt-40">
              <ScrollReveal direction="none">
                <a
                  href="mailto:anaskhalid40400@gmail.com"
                  className="inline-flex items-center gap-4 md:gap-6 border border-white px-8 py-6 md:px-16 md:py-10 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.4em] hover:bg-white hover:text-black transition-all hover:scale-105 active:scale-95"
                >
                  Contact Me <Icons.ArrowRight size={16} />
                </a>
              </ScrollReveal>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="font-cursive text-3xl tracking-normal">Anas Khalid</div>
        <div className="font-mono text-[9px] uppercase tracking-widest text-white/20">
          © 2024 Anas khalid.
        </div>
        <div className="flex gap-8">
          <a href="https://www.linkedin.com/in/anas-khalid1/" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-widest text-white/40 hover:text-gold transition-colors">LinkedIn</a>
          <a href="https://github.com/AnasKhalid4" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-widest text-white/40 hover:text-gold transition-colors">GitHub</a>
          <a href="mailto:anaskhalid40400@gmail.com" className="font-mono text-[10px] uppercase tracking-widest text-white/40 hover:text-gold transition-colors">Email</a>
        </div>
      </footer>
    </div>
  );
}
