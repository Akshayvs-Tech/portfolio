"use client";

import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "ABOUT",      href: "#about" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "PROJECTS",   href: "#projects" },
  { label: "CONTACT",    href: "#contact" },
  { label: "RESUME",     href: "#resume" },
];

/* Intro animation takes ~3.3 s — delay nav until after it finishes */
const INTRO_DURATION = 3.3;

export default function GlobalNav() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: INTRO_DURATION }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        /* near-invisible tint + heavy blur = transparent-looking but nothing reads through */
        background: "rgba(0, 0, 0, 0.02)",
        backdropFilter: "blur(28px) saturate(160%)",
        WebkitBackdropFilter: "blur(28px) saturate(160%)",
        /* very faint bottom line for definition */
        borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
        boxShadow: "0 1px 16px rgba(0, 0, 0, 0.25)",
      }}
    >
      <nav style={{ display: "flex", alignItems: "center", padding: "18px 48px" }}>
        <ul
          style={{
            display: "flex",
            width: "100%",
            listStyle: "none",
            alignItems: "center",
            justifyContent: "space-evenly",
            margin: 0,
            padding: 0,
          }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="nav-link"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
