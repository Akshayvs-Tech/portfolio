"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import "./hero.css";

/* ──────────────────────────────────────────────────────────────
   Navigation Bar
   ────────────────────────────────────────────────────────────── */
function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative z-10 flex items-center justify-between px-12 py-[22px]"
    >
      {/* Left nav links */}
      <ul className="flex list-none gap-8">
        <li>
          <a href="#" className="nav-link active text-sm font-medium tracking-wide text-white/75">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-sm font-medium tracking-wide text-white/75">
            Services
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-sm font-medium tracking-wide text-white/75">
            Portfolio
          </a>
        </li>
      </ul>

      {/* Center — empty spacer */}
      <div />

      {/* Right — empty (Get Started removed) */}
      <div className="min-w-[120px]" />
    </motion.nav>
  );
}

/* ──────────────────────────────────────────────────────────────
   Animated Title — letter-by-letter left → right reveal
   ────────────────────────────────────────────────────────────── */
const NAME = "AKSHAY";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.35 },
  },
};

const letterVariants = {
  hidden: { opacity: 0, x: -70, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

function AnimatedTitle() {
  return (
    <motion.h1
      className="hero-title font-normal text-white will-change-transform select-none overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={NAME}
    >
      {NAME.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}

/* ──────────────────────────────────────────────────────────────
   Hero Section
   ────────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);

  // AKSHAY has 6 chars → last letter at ~0.35 + 5×0.07 + 0.7 ≈ 1.4s
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 1.7 }
      );
      gsap.fromTo(
        btnsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1.95 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-black" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ── Background image ── */}
      <div className="hero-bg absolute inset-0 z-0">
        <Image
          src="/portfoliobg.png"
          alt="Portfolio background"
          fill
          priority
          quality={90}
        />
      </div>

      {/* ── Dark vignette overlay ── */}
      <div className="hero-overlay absolute inset-0 z-[1]" />

      {/* ── Nav ── */}
      <Navbar />

      {/* ── Main content ── */}
      <div className="hero-content relative z-[5] flex flex-1 flex-col px-12 pb-[60px]">
        {/* Big name — letter-by-letter reveal */}
        <AnimatedTitle />

        {/* Bottom row: subtitle + badge + buttons */}
        <div className="mt-auto flex items-end justify-between gap-6">
          <div className="max-w-[360px]">

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="mb-7 text-[14.5px] font-light leading-[1.65] text-white/72"
              style={{ opacity: 0 }}
            >
              Hi I&apos;m Akshay v s, currently working as{" "}
              <strong
                style={{ fontWeight: 800, color: "#e0fafa", whiteSpace: "nowrap" }}
              >
                Frontend Intern at µLearn
              </strong>
              .
            </p>

            {/* CTA buttons — shadcn/ui Button */}
            <div ref={btnsRef} className="flex flex-wrap gap-4" style={{ opacity: 0 }}>
              {/* Contact Me — cyan filled (custom variant via className override) */}
              <Button
                className="btn-contact h-auto cursor-pointer rounded-md bg-[#00d4d4] px-7 py-3 text-[13.5px] font-semibold tracking-wide text-black hover:bg-[#00efef]"
              >
                Contact Me
              </Button>

              {/* View My Work — outlined ghost */}
              <Button
                variant="outline"
                className="btn-view h-auto cursor-pointer rounded-md border-white/45 bg-transparent px-7 py-3 text-[13.5px] font-medium tracking-wide text-white backdrop-blur-sm hover:border-cyan-400 hover:bg-cyan-400/8 hover:text-white"
              >
                View My Work
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
