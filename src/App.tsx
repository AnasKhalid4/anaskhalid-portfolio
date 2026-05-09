/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import * as Icons from "./icons";
import ScrollReveal from "./components/ScrollReveal";
import altayraImg from '../assets/altayra.png';
import medicalImg from '../assets/medical-fitness-pros.png';
import cronotaxImg from '../assets/cronotax.png';
import devlabyrinthImg from '../assets/devlabyrinth.png';
import nouryxImg from '../assets/nouryx.png';
import calorisImg from '../assets/caloris.png';

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
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center px-6"
    >
      <div className="relative flex items-center justify-center">
        {/* Base Text */}
        <h1 className="font-cursive text-5xl md:text-7xl text-white/20 tracking-normal select-none relative pb-2 pr-8 pl-2">
          Anas Khalid
          
          {/* Fill Text Container */}
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
            onAnimationComplete={onComplete}
            className="absolute top-0 left-0 h-full overflow-hidden whitespace-nowrap"
          >
            <span className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] pr-8 pl-2 inline-block">Anas Khalid</span>
          </motion.div>
        </h1>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'web' | 'mobile'>('web');
  const [heroHeight] = useState(() => window.innerHeight);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 250]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    if (isLoading) return; // Don't start smooth scrolling until loading is done

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [isLoading]);

  return (
    <div className={`bg-surface ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
      <AnimatePresence>
        {isLoading && (
          <Preloader onComplete={() => {
            setTimeout(() => setIsLoading(false), 400);
          }} />
        )}
      </AnimatePresence>

      <CustomCursor />
      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-8 flex justify-between items-center pointer-events-none mix-blend-difference text-white">
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
      </nav>

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
        {/* Hero Section */}
        <section

          className="hero-full relative flex flex-col justify-center items-center px-6 overflow-hidden bg-black text-white"
          style={{ height: heroHeight }}
        >
          {/* Fixed V-Shape Grid Background with Electricity Flow */}
          <div className="absolute inset-0 z-0 bg-black flex justify-center items-center pointer-events-none overflow-hidden">
            <div
              className="relative w-full max-w-[1200px] h-full"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
                WebkitMaskRepeat: 'no-repeat',
              }}
            >
              {/* Fully GPU Accelerated Electricity Flows via SVG Masking */}
              <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_12px_rgba(255,255,255,1)]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Dim Base Pattern */}
                  <pattern id="triangle-grid-base" width="120" height="120" patternUnits="userSpaceOnUse">
                    <path d="M 120 0 L 0 0 0 120 M 0 120 L 120 0" fill="none" stroke="rgba(228, 222, 222, 0.2)" strokeWidth="1.5" />
                  </pattern>
                  {/* Bright Glowing Pattern */}
                  <pattern id="triangle-grid-glow" width="120" height="120" patternUnits="userSpaceOnUse">
                    <path d="M 120 0 L 0 0 0 120 M 0 120 L 120 0" fill="none" stroke="#ffffff" strokeWidth="2" />
                  </pattern>
                  {/* SVG Mask using the Bright Pattern */}
                  <mask id="grid-mask">
                    <rect width="100%" height="100%" fill="url(#triangle-grid-glow)" />
                  </mask>
                  <radialGradient id="glow-grad">
                    <stop offset="10%" stopColor="#ffffff" />
                    <stop offset="70%" stopColor="transparent" />
                  </radialGradient>
                </defs>

                {/* Dim Base Grid (Stationary) */}
                <rect width="100%" height="100%" fill="url(#triangle-grid-base)" />

                {/* Masked Glowing Orbs (Electricity) */}
                <g mask="url(#grid-mask)">
                  {/* Flow 1 */}
                  <motion.circle
                    cx="0" cy="0" r="150" fill="url(#glow-grad)"
                    animate={{ x: [-300, 1500], y: [-300, 1500] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    style={{ willChange: "transform" }}
                  />
                  {/* Flow 2 */}
                  <motion.circle
                    cx="0" cy="0" r="200" fill="url(#glow-grad)"
                    animate={{ x: [1500, -300], y: [-300, 1500] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{ willChange: "transform" }}
                  />
                  {/* Flow 3 */}
                  <motion.circle
                    cx="0" cy="0" r="175" fill="url(#glow-grad)"
                    animate={{ x: [600, 600], y: [-300, 1500] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 2 }}
                    style={{ willChange: "transform" }}
                  />
                </g>
              </svg>
            </div>
          </div>

          {/* Image (Behind) */}
          {/* <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <motion.img
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi_dw7fIiV7cBXPVIsSF768mjMnoBy6-8kZo6pFqdeYTbP6UuLndEerTCl-T2_3ra-DycLSAHBf1figcLQHKeZxKWltfdg68qKCR_ghAlLiD8yreh0jqHjazPktouDXXGfYsAjNxuH6trq5QqiTakNdM6Udlt5fyNuJ0zcoNiCC_6lO8LDe-GD_kweiekyV6geVZxPOydB2TS43tx63WYpNgxe5bKQKeU_JoDOdEoaugy-GKEkrGVyFzXAPsMvJYQxYZDGR1ZKUdI"
              alt="Portrait"
              className="h-[90%] w-auto object-contain grayscale contrast-125 pt-20"
            />
          </div> */}

          {/* Moving Name Marquee (In Front, with Parallax) */}
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden"
            style={{ y: heroY, opacity: heroOpacity, willChange: "transform, opacity" }}
          >
            <motion.div
              className="flex w-max whitespace-nowrap text-[44vw] lg:text-[20vw] font-display font-black text-white/70 leading-[0.8] tracking-tighter uppercase pb-10"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
              style={{ willChange: "transform" }}
            >
              {/* First Half */}
              <span className="mx-8">ANAS KHALID</span>
              <span className="mx-8">ANAS KHALID</span>
              <span className="mx-8">ANAS KHALID</span>
              <span className="mx-8">ANAS KHALID</span>
              {/* Second Half (Exact Match for Seamless Loop) */}
              <span className="mx-8">ANAS KHALID</span>
              <span className="mx-8">ANAS KHALID</span>
              <span className="mx-8">ANAS KHALID</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative z-20 w-full h-full flex flex-col justify-end max-w-7xl pb-12 pointer-events-none"
            style={{ y: heroY, opacity: heroOpacity, willChange: "transform, opacity" }}
          >
            <div className="flex justify-between items-end pointer-events-auto">
              <ScrollReveal delay={0.2} className="flex items-center gap-3 font-sans font-medium text-white hover:text-white/60 transition-colors cursor-pointer group">
                <div className="border border-white p-1.5 rounded-sm">
                  <Icons.Linkedin size={16} />
                </div>
                LinkedIn
              </ScrollReveal>

              <ScrollReveal delay={0.3} className="text-right">
                <p className="font-display font-bold text-3xl md:text-4xl tracking-tight text-white uppercase"> Software Engineer</p>
                <p className="font-display font-bold text-3xl md:text-4xl tracking-tight text-white uppercase">Devbeings</p>
              </ScrollReveal>
            </div>
          </motion.div>
        </section>

        {/* Intro */}
        <section id="about" className="max-w-7xl mx-auto px-6 py-40">
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
          <h2 className="font-display text-4xl md:text-7xl font-semibold leading-[1.1] max-w-5xl tracking-tighter uppercase">
            {"I engineer intelligent platforms that push the boundaries of digital reality.".split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-4 -mb-4 mr-[0.25em]">
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
            className="mt-12 text-white/60 text-lg md:text-2xl font-light leading-relaxed max-w-3xl"
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
        <div className="max-w-7xl mx-auto px-6 py-40 grid grid-cols-1 md:grid-cols-2 gap-24 border-t border-white/10">
          {/* Experience */}
          <div id="experience">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-[1px] bg-white opacity-20" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">EXPERIENCE</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl font-bold leading-[0.9] uppercase mb-16 tracking-tighter">
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
              <h2 className="font-display text-5xl md:text-6xl font-bold leading-[0.9] uppercase mb-16 tracking-tighter">
                ACADEMIC <span className="text-gold">FOUNDATION</span>
              </h2>
            </ScrollReveal>

            <div className="flex flex-col gap-16">
              {[
                {
                  degree: "Bachelor of Science — Computer Science",
                  school: "University of Sargodha",
                  date: "2021 – 2025",
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
        <section className="py-12 bg-white/5 border-y border-white/10 relative overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[1, 2, 3].map((set) => (
              <div key={set} className="flex gap-20 px-10 items-center font-display text-4xl md:text-6xl text-white/20 tracking-[0.2em] font-semibold uppercase">
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
        <section id="work" className="max-w-7xl mx-auto px-6 py-40 border-t border-white/10">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-20">
              <div className="flex items-center gap-4">
                <div className="w-10 h-[1px] bg-white opacity-20" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">FEATURED WORK</span>
              </div>

              {/* Tabs */}
              <div className="flex border border-white/10">
                {(['web', 'mobile'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`font-mono text-[10px] uppercase tracking-widest px-8 py-3 transition-all duration-300 ${activeTab === tab
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

          <div className="flex flex-col gap-32">
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
                title: "MEDICAL FITNESS PROS",
                desc: "End-to-end AI movement assessment platform utilizing a multimodal LLM pipeline to generate clinical-grade reports and custom workout plans.",
                tech: ["Next.js", "Supabase", "OpenAI & Gemini", "RAG", "Tailwind CSS"],
                imgSrc: medicalImg,
                link: "https://mfp.solutions/auth",
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
                title: "DEVLABYRINTH",
                desc: "Enterprise-grade digital agency platform providing custom software development, cloud solutions, and AI automation services.",
                tech: ["Next.js", "Tailwind CSS"],
                imgSrc: devlabyrinthImg,
                link: "https://devlabyrinth.com/",
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
                title: "CALORIS",
                desc: "AI-powered calorie tracker that uses computer vision to instantly identify food and log nutritional data — making healthy eating effortless.",
                tech: ["React Native", "Expo", "AI Vision", "Supabase"],
                imgSrc: calorisImg,
                link: "https://caloris.app/",
                category: 'mobile' as const
              }
            ]
              .filter(p => p.category === activeTab)
              .map((project, i) => (
                <div key={project.title} className="group relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                  <div className={`lg:col-span-6 ${i % 2 !== 0 ? 'lg:order-last' : ''}`}>
                    <ScrollReveal direction="none">
                      {project.category === 'mobile' ? (
                        /* Mobile: clean image, no dark box */
                        <div className="relative max-w-xs mx-auto">
                          <img
                            src={project.imgSrc}
                            alt={project.title}
                            className="w-full h-auto object-contain opacity-90 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 drop-shadow-[0_20px_60px_rgba(255,255,255,0.08)]"
                          />
                        </div>
                      ) : (
                        /* Web: spinning glow box */
                        <div className="relative aspect-video max-w-lg mx-auto rounded-lg overflow-hidden p-[1px]">
                          {/* Spinning Glow */}
                          <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_270deg,rgba(220,220,220,0.8)_360deg)] animate-[spin_8s_linear_infinite]" />

                          {/* Inner Box */}
                          <div className="relative w-full h-full bg-[#050505] rounded-sm flex flex-col items-center justify-center gap-4 overflow-hidden z-10">
                            {/* Static subtle inner border and background */}
                            <div className="absolute inset-0 bg-white/[0.02] border border-white/5 rounded-sm" />

                            <img
                              src={project.imgSrc}
                              alt={project.title}
                              className="absolute inset-0 z-20 w-full h-full object-contain p-6 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                            />
                          </div>
                        </div>
                      )}
                    </ScrollReveal>
                  </div>

                  <div className="lg:col-span-6">
                    <ScrollReveal>
                      <h3 className="font-display text-6xl md:text-[5vw] leading-[0.9] text-gold font-bold uppercase mb-8 tracking-tighter group-hover:scale-[1.02] transition-transform duration-500 origin-left">
                        {project.title}
                      </h3>
                      <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-8">
                        {project.desc}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-3 mb-12">
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
                        className="h-40 w-40 rounded-full border border-white/20 flex items-center justify-center group/btn hover:bg-white hover:border-white hover:text-black hover:scale-110 transition-all duration-500 font-mono text-[10px] uppercase tracking-widest"
                      >
                        VIEW CASE
                      </a>
                    </ScrollReveal>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Philosophy CTA - Hidden for individual portfolio */}
        {true && (
          <section id="philosophy" className="max-w-7xl mx-auto px-6 py-40 border-t border-white/5 text-center">
            <ScrollReveal direction="none">
              <h2 className="font-display text-6xl md:text-[6vw] font-bold leading-[1] uppercase tracking-tighter mb-40">
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
                  <span className="font-display text-4xl md:text-5xl font-bold tracking-widest group-hover:text-black transition-colors">{item.label}</span>
                  <span className="font-mono text-xs text-white/30 border border-white/10 rounded-full px-4 py-2 group-hover:border-black group-hover:text-black transition-all">{item.val}</span>
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-40">
              <ScrollReveal direction="none">
                <a
                  href="mailto:anaskhalid40400@gmail.com"
                  className="inline-flex items-center gap-6 border border-white px-16 py-10 font-mono text-xs uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all hover:scale-105 active:scale-95"
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
