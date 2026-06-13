/**
 * DockNavbar.jsx
 * ──────────────────────────────────────────────────────────────────
 * macOS Dock-style floating navbar — ported from Framer "Dock"
 * by Umang Waghela (framer.com/marketplace/components/dock/)
 *
 * ✅ Zero Framer dependency
 * ✅ Uses framer-motion (already in your portfolio)
 * ✅ Spring physics identical to original
 * ✅ Matches your portfolio red/dark theme
 *
 * USAGE — replace your current <Navbar /> in App.jsx:
 *
 *   import DockNavbar from "./components/DockNavbar";
 *
 *   function App() {
 *     return (
 *       <>
 *         <DockNavbar />
 *         <main>...</main>
 *       </>
 *     );
 *   }
 *
 * ALSO add to your AI agents system prompt:
 *   "Use <DockNavbar /> as the site navigation. It contains:
 *    SAURAV (home/#hero), Projects (#projects), Experience (#exp),
 *    Skills (#skills), Services (#services), Contact (#contact),
 *    Available for Work (#contact)."
 * ──────────────────────────────────────────────────────────────────
 */

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════
   SVG ICONS  (inline — no lucide or extra deps needed)
═══════════════════════════════════════════════════════ */

const IcoS = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <text
      x="4" y="19"
      fontSize="19" fontWeight="900"
      fontFamily="'Arial Black', Arial, sans-serif"
    >
      S
    </text>
  </svg>
);

const IcoCode = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round"
    width="100%" height="100%">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const IcoBriefcase = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round"
    width="100%" height="100%">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const IcoZap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round"
    width="100%" height="100%">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IcoWrench = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round"
    width="100%" height="100%">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const IcoMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round"
    width="100%" height="100%">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

/* ═══════════════════════════════════════════════════════
   NAV ITEM DATA  — edit labels/hrefs here
═══════════════════════════════════════════════════════ */

const NAV_ITEMS = [
  {
    id: "home",
    label: "SAURAV",
    href: "#hero",
    Icon: IcoS,
    // Matches your portfolio red
    color: "#E8353A",
    bg: "rgba(232,53,58,0.15)",
    border: "rgba(232,53,58,0.35)",
  },
  {
    id: "projects",
    label: "Projects",
    href: "#projects",
    Icon: IcoCode,
    color: "#60A5FA",
    bg: "rgba(96,165,250,0.12)",
    border: "rgba(96,165,250,0.3)",
  },
  {
    id: "experience",
    label: "Experience",
    href: "#exp",
    Icon: IcoBriefcase,
    color: "#FBBF24",
    bg: "rgba(251,191,36,0.12)",
    border: "rgba(251,191,36,0.3)",
  },
  {
    id: "skills",
    label: "Skills",
    href: "#skills",
    Icon: IcoZap,
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.12)",
    border: "rgba(167,139,250,0.3)",
  },
  {
    id: "services",
    label: "Services",
    href: "#skills",
    Icon: IcoWrench,
    color: "#34D399",
    bg: "rgba(52,211,153,0.12)",
    border: "rgba(52,211,153,0.3)",
  },
  {
    id: "contact",
    label: "Contact",
    href: "#contact",
    Icon: IcoMail,
    color: "#FB923C",
    bg: "rgba(251,146,60,0.12)",
    border: "rgba(251,146,60,0.3)",
  },
];

/* ═══════════════════════════════════════════════════════
   DOCK CONSTANTS  — tweak these to taste
═══════════════════════════════════════════════════════ */

const BASE_SIZE   = 46;   // px — resting icon size
const MAX_SIZE    = 76;   // px — icon size at cursor
const MAGNET_RANGE = 150; // px — how far the magnification reaches
const SPRING_CFG  = { mass: 0.1, stiffness: 200, damping: 14 };

/* ═══════════════════════════════════════════════════════
   DOCK ITEM  (single magnifiable nav icon)
═══════════════════════════════════════════════════════ */

function DockItem({ label, href, Icon, color, bg, border, mouseX }) {
  const ref      = useRef(null);
  const [tip, setTip] = useState(false);

  /* distance: cursor x → center of this icon */
  const distance = useTransform(mouseX, (mx) => {
    if (!ref.current) return Infinity;
    const r = ref.current.getBoundingClientRect();
    return mx - (r.left + r.width / 2);
  });

  /* size: falls off with distance */
  const rawSize = useTransform(
    distance,
    [-MAGNET_RANGE, 0, MAGNET_RANGE],
    [BASE_SIZE, MAX_SIZE, BASE_SIZE],
    { clamp: true }
  );
  const size    = useSpring(rawSize, SPRING_CFG);
  const iconSz  = useTransform(size, (s) => s * 0.48);
  const radius  = useTransform(size, (s) => Math.round(s * 0.26));

  const handleClick = (e) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) window.scrollTo(0, el.offsetTop);
  };

  return (
    <div
      ref={ref}
      style={{ position: "relative", display: "flex", alignItems: "flex-end" }}
    >
      {/* ── tooltip ── */}
      <AnimatePresence>
        {tip && (
          <motion.div
            style={{
              position: "absolute",
              bottom: "calc(100% + 10px)",
              left: "50%",
              transform: "translateX(-50%)",
              pointerEvents: "none",
              zIndex: 10,
            }}
            initial={{ opacity: 0, y: 6, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.85 }}
            transition={{ duration: 0.14 }}
          >
            <span
              style={{
                display: "block",
                padding: "4px 10px",
                background: "rgba(12,12,12,0.92)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 14px rgba(0,0,0,0.45)",
              }}
            >
              {label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── icon button ── */}
      <motion.a
        href={href}
        onClick={handleClick}
        onMouseEnter={() => setTip(true)}
        onMouseLeave={() => setTip(false)}
        style={{
          width:        size,
          height:       size,
          borderRadius: radius,
          background:   bg,
          border:       `1.5px solid ${border}`,
          color,
          display:       "flex",
          alignItems:    "center",
          justifyContent: "center",
          cursor:        "pointer",
          textDecoration: "none",
          flexShrink:    0,
        }}
        whileTap={{ scale: 0.87 }}
      >
        <motion.span
          style={{
            width:  iconSz,
            height: iconSz,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <Icon />
        </motion.span>
      </motion.a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   DOCK DIVIDER  (vertical hairline)
═══════════════════════════════════════════════════════ */

function DockDivider() {
  return (
    <div
      style={{
        alignSelf: "stretch",
        display: "flex",
        alignItems: "flex-end",
        paddingBottom: "3px",
        margin: "0 4px",
      }}
    >
      <div
        style={{
          width: "1px",
          height: "36px",
          borderRadius: "999px",
          background: "rgba(255,255,255,0.11)",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   AVAILABLE FOR WORK  (magnifiable pill)
═══════════════════════════════════════════════════════ */

function AvailableBadge({ mouseX }) {
  const ref = useRef(null);
  const [tip, setTip] = useState(false);

  const distance = useTransform(mouseX, (mx) => {
    if (!ref.current) return Infinity;
    const r = ref.current.getBoundingClientRect();
    return mx - (r.left + r.width / 2);
  });

  const rawH  = useTransform(distance, [-MAGNET_RANGE, 0, MAGNET_RANGE], [36, 56, 36], { clamp: true });
  const h     = useSpring(rawH, SPRING_CFG);
  const px    = useTransform(h, (v) => v * 0.32);
  const fz    = useTransform(h, (v) => Math.round(v * 0.225));
  const dot   = useTransform(h, (v) => Math.round(v * 0.175));

  const handleClick = (e) => {
    e.preventDefault();
    const el = document.querySelector("#contact");
    if (el) window.scrollTo(0, el.offsetTop);
  };

  return (
    <div ref={ref} style={{ position: "relative", display: "flex", alignItems: "flex-end" }}>
      <AnimatePresence>
        {tip && (
          <motion.div
            style={{
              position: "absolute",
              bottom: "calc(100% + 10px)",
              left: "50%",
              transform: "translateX(-50%)",
              pointerEvents: "none",
              zIndex: 10,
            }}
            initial={{ opacity: 0, y: 6, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.85 }}
            transition={{ duration: 0.14 }}
          >
            <span
              style={{
                display: "block",
                padding: "4px 10px",
                background: "rgba(12,12,12,0.92)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#22C55E",
                fontSize: "12px",
                fontWeight: 600,
                whiteSpace: "nowrap",
                boxShadow: "0 4px 14px rgba(0,0,0,0.45)",
              }}
            >
              Let's work together →
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href="#contact"
        onClick={handleClick}
        onMouseEnter={() => setTip(true)}
        onMouseLeave={() => setTip(false)}
        style={{
          height:         h,
          paddingLeft:    px,
          paddingRight:   px,
          border:         "1.5px solid rgba(34,197,94,0.4)",
          background:     "rgba(34,197,94,0.11)",
          borderRadius:   999,
          display:        "flex",
          alignItems:     "center",
          gap:            "7px",
          cursor:         "pointer",
          color:          "#22C55E",
          textDecoration: "none",
          whiteSpace:     "nowrap",
          flexShrink:     0,
        }}
        whileTap={{ scale: 0.92 }}
      >
        {/* pulsing green dot */}
        <motion.span
          style={{
            width:        dot,
            height:       dot,
            borderRadius: "50%",
            background:   "#22C55E",
            boxShadow:    "0 0 6px #22C55E88",
            flexShrink:   0,
          }}
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
        <motion.span
          style={{
            fontSize:      fz,
            fontWeight:    700,
            letterSpacing: "0.04em",
          }}
        >
          Available for Work
        </motion.span>
      </motion.a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   DOCK NAVBAR  (main export)
═══════════════════════════════════════════════════════ */

export default function DockNavbar() {
  const mouseX = useMotionValue(Infinity);

  return (
    <nav
      style={{
        position:  "fixed",
        top:       "14px",
        left:      "50%",
        transform: "translateX(-50%)",
        zIndex:    1000,
        /* stops dock getting cut on mobile — scroll or adjust */
        maxWidth:  "calc(100vw - 24px)",
      }}
    >
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        style={{
          display:        "flex",
          alignItems:     "flex-end",
          gap:            "6px",
          padding:        "10px 14px 10px",
          borderRadius:   "24px",
          background:     "rgba(14, 14, 14, 0.84)",
          backdropFilter: "blur(24px) saturate(1.8)",
          WebkitBackdropFilter: "blur(24px) saturate(1.8)",
          border:         "1px solid rgba(255,255,255,0.07)",
          boxShadow:      [
            "0 8px 32px rgba(0,0,0,0.55)",
            "0 1px 0 rgba(255,255,255,0.04) inset",
            "0 0 0 0.5px rgba(255,255,255,0.03) inset",
          ].join(", "),
          /* prevent overflow clipping tooltips */
          overflow:       "visible",
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.15 }}
      >
        {NAV_ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            style={{ display: "contents" }}
          >
            {/* divider between logo and nav items */}
            {i === 1 && <DockDivider />}

            <DockItem {...item} mouseX={mouseX} />
          </motion.div>
        ))}

        {/* divider before "Available for Work" */}
        <DockDivider />
        <AvailableBadge mouseX={mouseX} />
      </motion.div>
    </nav>
  );
}
