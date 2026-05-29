"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import "./hero.css";

/* ────────────────────────────────────────────────────────────
   Animated Role Cycler — AZONIX font, one role at a time.
   Slides the current role up-out, then slides the next one up-in.
   ──────────────────────────────────────────────────────────── */
const ROLES = [
  "FULLSTACK DEVELOPER",
  "AI/ML DEVELOPER",
  "FRONTEND DEVELOPER",
];

const roleVariants = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: "0%",   opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit:    { y: "-100%", opacity: 0, transition: { duration: 0.45, ease: [0.55, 0, 0.85, 0.06] as [number, number, number, number] } },
};

function AnimatedRoles({ play }: { play: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!play) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length);
    }, 2400);
    return () => clearInterval(id);
  }, [play]);

  return (
    <motion.div
      className="role-cycler-clip mb-7"
      initial={{ opacity: 0, y: 30 }}
      animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.6 }}
      style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: "12px",
        fontWeight: 500,
        letterSpacing: "0.22em",
        color: "#ffffff",
        textShadow: "0 0 10px rgba(255,255,255,0.4)",
        lineHeight: "1.6",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          variants={roleVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ position: "absolute", whiteSpace: "nowrap" }}
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}


/* ──────────────────────────────────────────────────────────────
   Intro Screen — types AKSHAY V S, then erases left-to-right,
   then fades out to reveal the hero section.
   ────────────────────────────────────────────────────────────── */
const INTRO_NAME = "AKSHAY";

const introContainer = {
  initial: {},
  enter: {
    transition: { staggerChildren: 0.09, delayChildren: 0.3 },
  },
  exit: {
    transition: { staggerChildren: 0.065, staggerDirection: 1 },
  },
};

const introLetter = {
  initial: { opacity: 0, y: 50, filter: "blur(12px)" },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    y: -40,
    filter: "blur(8px)",
    transition: { duration: 0.35, ease: [0.55, 0, 0.85, 0.06] as [number, number, number, number] },
  },
};

function IntroScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  const handleAnimationComplete = (def: unknown) => {
    const label =
      typeof def === "string"
        ? def
        : Array.isArray(def)
        ? ""
        : typeof def === "object" && def !== null
        ? Object.keys(def)[0]
        : "";
    if (label === "enter") {
      // Hold for 600ms then erase left-to-right
      setTimeout(() => setPhase("exit"), 600);
    } else if (label === "exit") {
      // All letters gone — fade out overlay
      onDone();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
    >
      {/* Subtle radial glow behind the text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 55% 40% at 50% 50%, rgba(0,212,212,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        className="intro-title flex"
        variants={introContainer}
        initial="initial"
        animate={phase}
        onAnimationComplete={handleAnimationComplete}
        aria-label={INTRO_NAME}
      >
        {INTRO_NAME.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={introLetter}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}


/* ──────────────────────────────────────────────────────────────
   Hero Title — letter-by-letter left → right reveal
   (only plays after intro is done)
   ────────────────────────────────────────────────────────────── */
const NAME = "AKSHAY V S";

const titleContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

const titleLetter = {
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

function AnimatedTitle({ play }: { play: boolean }) {
  return (
    <motion.h1
      className="hero-title font-normal text-white select-none"
      variants={titleContainer}
      initial="hidden"
      animate={play ? "visible" : "hidden"}
      aria-label={NAME}
    >
      {NAME.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={titleLetter}
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
  const [showIntro, setShowIntro] = useState(true);
  const [heroReady, setHeroReady] = useState(false);

  // No GSAP needed — stat blocks animate via Framer Motion


  const handleIntroDone = () => {
    setShowIntro(false);
    // Small delay so overlay fade-out (0.55s) finishes before hero animations kick off
    setTimeout(() => setHeroReady(true), 100);
  };

  return (
    <>
      {/* ── Intro overlay ── */}
      <AnimatePresence>
        {showIntro && <IntroScreen onDone={handleIntroDone} />}
      </AnimatePresence>

      {/* ── Hero ── */}
      <section
        className="relative flex min-h-screen w-full flex-col overflow-hidden bg-black"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Background */}
        <div className="hero-bg absolute inset-0 z-0">
          <Image
            src="/portfoliobg.png"
            alt="Portfolio background"
            fill
            priority
            quality={90}
          />
        </div>

        {/* Dark vignette overlay */}
        <div className="hero-overlay absolute inset-0 z-[1]" />


        {/* Main content */}
        <div className="hero-content relative z-[5] flex flex-1 flex-col px-12 pb-[60px]">
          {/* Name & Tagline Wrapper — w-fit sizes to the title width */}
          <div className="flex flex-col w-fit">
            {/* Big name — plays after intro */}
            <AnimatedTitle play={heroReady} />

            {/* Tagline — fades in after title */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 1.5 }}
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.22em",
                color: "#ffffff",
                marginTop: "10px",
                textShadow: "0 0 10px rgba(255,255,255,0.4)",
                textAlign: "right",
                width: "100%",
              }}
            >
              FROM ALAPUZHA, KERALA
            </motion.p>
          </div>

          {/* Bottom row */}
          <div className="mt-auto flex items-end justify-between gap-6">
            {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.85 }}
                style={{ display: "flex", gap: "48px", alignItems: "flex-end" }}
              >
                {/* Years Experience */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "clamp(28px, 3.5vw, 44px)",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1,
                    letterSpacing: "-0.01em",
                    textShadow: "0 0 24px rgba(0,212,212,0.25)",
                  }}>02+</span>
                  <span style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    color: "rgba(255,255,255,0.55)",
                    textTransform: "uppercase",
                  }}>Years Experience</span>
                </div>

                {/* Projects */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "clamp(28px, 3.5vw, 44px)",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1,
                    letterSpacing: "-0.01em",
                    textShadow: "0 0 24px rgba(0,212,212,0.25)",
                  }}>05+</span>
                  <span style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    color: "rgba(255,255,255,0.55)",
                    textTransform: "uppercase",
                  }}>Projects</span>
                </div>
              </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
