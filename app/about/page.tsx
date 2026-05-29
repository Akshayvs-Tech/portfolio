"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import "./about.css";

const BIO =
  "I'm a passionate fullstack developer and AI/ML engineer who loves crafting seamless digital experiences — from elegant, performant frontends to intelligent backend systems. I thrive at the intersection of design and technology, building products that are both visually compelling and technically robust.";

/* ── ABOUT ME: cinematic zoom-contract (slow) ── */
const headingVariants = {
  hidden: { opacity: 0, scale: 1.55, letterSpacing: "0.55em", filter: "blur(18px)" },
  visible: {
    opacity: 1, scale: 1, letterSpacing: "0.04em", filter: "blur(0px)",
    transition: { duration: 2.0, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── Photo: slow slide in from left ── */
const photoVariants = {
  hidden: { opacity: 0, x: -80, scale: 0.93 },
  visible: {
    opacity: 1, x: 0, scale: 1,
    transition: { duration: 2.0, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
  },
};

/* ── Bio: slow letter-by-letter rise ── */
const bioContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035, delayChildren: 0.8 } },
};
const bioLetter = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /* ── Scroll-linked opacity — drives fade in AND fade out in both directions.
     The opacity wrapper covers the "reset to hidden" that happens when inView
     flips false, so the user never sees elements snapping back.
     Progress 0  = section bottom at viewport bottom (entering from below)
     Progress 1  = section top at viewport top (exiting from above)         ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  /* Wider range = more gradual fade in and out */
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.72, 1],
    [0,  1,    1,    0]
  );

  /* ── once: false → entrance animations replay every visit.
     amount: 0.25 = 25 % of the content wrapper must be in view to trigger.  ── */
  const inView = useInView(contentRef, { once: false, amount: 0.25 });

  return (
    <section id="about" className="about-section" ref={sectionRef}>

      {/* Opacity wrapper — scroll-linked, background untouched */}
      <motion.div
        ref={contentRef}
        style={{
          opacity,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* ── ABOUT ME heading ── */}
        <motion.h2
          className="about-heading"
          variants={headingVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          ABOUT ME
        </motion.h2>

        {/* ── Two-column layout ── */}
        <div className="about-layout">

          {/* LEFT — photo */}
          <motion.div
            className="about-image-col"
            variants={photoVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="about-image-wrapper">
              <Image
                src="/portfolioimag.jpeg"
                alt="Akshay V S — profile photo"
                width={0}
                height={0}
                sizes="100vw"
                unoptimized
                style={{ width: "auto", height: "auto", maxWidth: "340px" }}
              />
            </div>
          </motion.div>

          {/* RIGHT — bio letter by letter */}
          <motion.div
            className="about-content-col"
            variants={bioContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <p className="about-bio" aria-label={BIO}>
              {BIO.split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={bioLetter}
                  style={{ display: "inline", whiteSpace: "pre-wrap" }}
                >
                  {char}
                </motion.span>
              ))}
            </p>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
