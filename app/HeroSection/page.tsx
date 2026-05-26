"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";

/* ──────────────────────────────────────────────────────────────
   Navigation Bar
   ────────────────────────────────────────────────────────────── */
function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="hero-nav"
    >
      {/* Left links */}
      <ul className="nav-links">
        <li>
          <a href="#" className="nav-link active">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="nav-link">
            Services
          </a>
        </li>
        <li>
          <a href="#" className="nav-link">
            Portfolio
          </a>
        </li>
      </ul>

      {/* Center — empty */}
      <div />

      {/* Right — intentionally empty (Get Started removed) */}
      <div className="nav-right" />
    </motion.nav>
  );
}

/* ──────────────────────────────────────────────────────────────
   Portrait Card (bottom-right)
   ────────────────────────────────────────────────────────────── */
function PortraitCard() {
  return (
    <motion.div
      className="portrait-card"
      initial={{ opacity: 0, x: 80, y: 40 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04, rotate: 1 }}
    >
      <div className="portrait-glow" />
      <Image
        src="/portfolioimg.jpeg"
        alt="Akshay"
        fill
        className="portrait-img"
        sizes="(max-width: 768px) 160px, 220px"
        priority
      />
      <div className="portrait-overlay" />
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Animated Title — letter-by-letter reveal
   ────────────────────────────────────────────────────────────── */
const NAME = "AKSHAY";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.35,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    x: -70,
    y: 20,
    filter: "blur(6px)",
  },
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
      className="hero-title"
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

  // NAME has 10 chars → last letter lands at ~0.35 + 9×0.07 + 0.65 ≈ 1.63s
  // subtitle + buttons animate in after the title finishes
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
    <>
      {/* ── Google Font (Dancing Script for cursive title) ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rampart+One&family=Inter:wght@300;400;500;600&display=swap');

        /* ── Reset / base ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Hero wrapper ── */
        .hero-wrapper {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          background: #000;
          display: flex;
          flex-direction: column;
        }

        /* ── Background image ── */
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero-bg img {
          object-fit: cover;
          object-position: center top;
        }

        /* Dark vignette overlay */
        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            radial-gradient(ellipse 60% 70% at 45% 40%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.75) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.85) 100%);
        }

        /* ── Nav ── */
        .hero-nav {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 48px;
        }
        .nav-links {
          display: flex;
          list-style: none;
          gap: 32px;
        }
        .nav-link {
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.75);
          letter-spacing: 0.02em;
          transition: color 0.25s;
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #00d4d4;
          transition: width 0.3s ease;
        }
        .nav-link:hover,
        .nav-link.active {
          color: #ffffff;
        }
        .nav-link.active::after,
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .logo-text {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #fff;
        }
        .logo-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00d4d4;
          box-shadow: 0 0 8px #00d4d4;
        }
        .nav-right {
          /* Placeholder to balance flex layout */
          min-width: 120px;
        }

        /* ── Hero content ── */
        .hero-content {
          position: relative;
          z-index: 5;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 48px 60px;
        }

        /* ── Giant cursive title ── */
        .hero-title {
          font-family: 'Rampart One', cursive;
          font-size: clamp(64px, 12vw, 148px);
          font-weight: 400;
          color: #fff;
          line-height: 1;
          letter-spacing: 0.04em;
          text-shadow:
            0 0 80px rgba(0,212,212,0.2),
            0 0 30px rgba(0,212,212,0.1),
            2px 4px 24px rgba(0,0,0,0.9);
          will-change: transform, opacity;
          user-select: none;
          overflow: hidden;
        }

        /* ── Sub layout (text + portrait) ── */
        .hero-sub {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-top: 20px;
          gap: 24px;
        }
        .hero-left {
          max-width: 360px;
        }
        .hero-subtitle {
          font-size: 14.5px;
          line-height: 1.65;
          color: rgba(255,255,255,0.72);
          font-weight: 300;
          margin-bottom: 28px;
        }

        /* ── Buttons ── */
        .hero-btns {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .btn-hire {
          padding: 12px 30px;
          font-size: 13.5px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          background: #00d4d4;
          color: #000;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          letter-spacing: 0.03em;
          transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
          box-shadow: 0 0 18px rgba(0,212,212,0.45);
        }
        .btn-hire:hover {
          background: #00efef;
          transform: translateY(-2px);
          box-shadow: 0 0 28px rgba(0,212,212,0.7);
        }
        .btn-view {
          padding: 11px 28px;
          font-size: 13.5px;
          font-weight: 500;
          font-family: 'Inter', sans-serif;
          background: transparent;
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.45);
          border-radius: 6px;
          cursor: pointer;
          letter-spacing: 0.03em;
          transition: border-color 0.25s, background 0.25s, transform 0.2s;
          backdrop-filter: blur(4px);
        }
        .btn-view:hover {
          border-color: #00d4d4;
          background: rgba(0,212,212,0.08);
          transform: translateY(-2px);
        }

        /* ── Portrait card ── */
        .portrait-card {
          position: relative;
          width: clamp(130px, 15vw, 180px);
          aspect-ratio: 3 / 4;
          border-radius: 14px;
          overflow: hidden;
          flex-shrink: 0;
          border: 1.5px solid rgba(0,212,212,0.3);
          cursor: pointer;
        }
        .portrait-glow {
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(0,212,212,0.45), transparent 60%);
          z-index: 1;
          pointer-events: none;
        }
        .portrait-img {
          object-fit: cover;
          object-position: center top;
        }
        .portrait-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.5) 0%,
            transparent 60%
          );
          z-index: 2;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hero-nav { padding: 18px 24px; }
          .nav-links { gap: 20px; }
          .hero-content { padding: 0 24px 40px; }
          .hero-sub { flex-direction: column; align-items: flex-start; }
          .portrait-card { width: 140px; align-self: flex-end; }
        }
        @media (max-width: 480px) {
          .hero-nav { padding: 14px 16px; }
          .hero-content { padding: 0 16px 32px; }
        }
      `}</style>

      <section className="hero-wrapper">
        {/* Background */}
        <div className="hero-bg">
          <Image
            src="/portfoliobg.png"
            alt="Portfolio background"
            fill
            priority
            quality={90}
          />
        </div>

        {/* Overlay */}
        <div className="hero-overlay" />

        {/* Nav */}
        <Navbar />

        {/* Content */}
        <div className="hero-content">
          {/* Big cursive name — letter-by-letter reveal */}
          <AnimatedTitle />

          <div className="hero-sub">
            {/* Left: description + CTA */}
            <div className="hero-left">
              <p ref={subtitleRef} className="hero-subtitle" style={{ opacity: 0 }}>
                Hi I&apos;m Akshay v s, currently working as <strong style={{ fontWeight: 800, color: '#e0fafa', whiteSpace: 'nowrap' }}>Frontend Intern at µLearn</strong>.
              </p>
              <div ref={btnsRef} className="hero-btns" style={{ opacity: 0 }}>
                <button className="btn-hire">Contact Me</button>
                <button className="btn-view">View My Work</button>
              </div>
            </div>

            {/* Right: portrait */}
            <PortraitCard />
          </div>
        </div>
      </section>
    </>
  );
}
