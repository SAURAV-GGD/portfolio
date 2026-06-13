/**
 * SmoothScroll.jsx
 * ─────────────────────────────────────────────────────
 * Exact port of the Framer "SexyScroll" component by Baco
 * ( https://www.framer.com/marketplace/components/sexyscroll/ )
 *
 * ✅ Zero Framer dependency
 * ✅ Drop-in for React / Vite / Next.js portfolio
 * ✅ Spring physics identical to the original (Unity-style SmoothDamp)
 *
 * USAGE ─ mount ONCE, anywhere in your app:
 *
 *   // main.jsx  ────────────────────────────────
 *   import SmoothScroll from "./SmoothScroll";
 *
 *   ReactDOM.createRoot(document.getElementById("root")).render(
 *     <React.StrictMode>
 *       <SmoothScroll />   ← add this line
 *       <App />
 *     </React.StrictMode>
 *   );
 *
 *   // Or inside App.jsx at the top of the return:
 *   return (
 *     <>
 *       <SmoothScroll />
 *       ...rest of your app
 *     </>
 *   );
 *
 * PROPS (all optional, defaults match the "Portfolio" preset):
 *
 *   enabled          {boolean}  – toggle on/off           [true]
 *   smoothTime       {number}   – spring response in sec  [0.6]
 *   maxSpeed         {number}   – max px/s                [4500]
 *   touchEnabled     {boolean}  – smooth on mobile        [false]
 *   clampToDocument  {boolean}  – prevent over-scroll     [true]
 *   respectReduceMotion {boolean} – a11y kill-switch      [true]
 * ─────────────────────────────────────────────────────
 */

import { useEffect, useRef, useMemo } from "react";

/* ─── Core physics (Unity-style critically-damped spring) ─── */
function smoothDamp(current, target, currentVelocity, smoothTime, maxSpeed, dt) {
  const EPS = 1e-4;
  smoothTime = Math.max(EPS, smoothTime);

  const maxChange = maxSpeed * smoothTime;
  let delta = target - current;
  const originalTarget = target;

  if (Math.abs(delta) > maxChange) {
    target = current + Math.sign(delta) * maxChange;
  }

  const omega = 2 / smoothTime;
  const x = omega * dt;
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const change = current - target;
  const temp = (currentVelocity + omega * change) * dt;
  let newVelocity = (currentVelocity - omega * temp) * exp;
  let newValue = target + (change + temp) * exp;

  // Prevent overshoot
  const origToCurrent = originalTarget - current;
  const newToOrig = newValue - originalTarget;
  if (origToCurrent > 0 === newToOrig > 0) {
    newValue = originalTarget;
    newVelocity = 0;
  }

  return [newValue, newVelocity];
}

/* ─── Component ─── */
export default function SmoothScroll({
  enabled = true,
  smoothTime = 0.6,
  maxSpeed = 4500,
  keyboardStepLines = 1,
  pageJumpRatio = 0.9,
  touchEnabled = false,
  clampToDocument = true,
  respectReduceMotion = true,
}) {
  /* ── a11y: prefers-reduced-motion ── */
  const prefersReduced = useMemo(() => {
    if (typeof window === "undefined" || typeof matchMedia === "undefined") return false;
    try { return matchMedia("(prefers-reduced-motion: reduce)").matches; }
    catch { return false; }
  }, []);

  const active = enabled && !(respectReduceMotion && prefersReduced);

  /* ── Physics state (all in refs so no re-renders) ── */
  const yRef        = useRef(0);
  const vRef        = useRef(0);
  const targetRef   = useRef(0);
  const rafRef      = useRef(null);
  const lastTsRef   = useRef(null);

  /* ── clamp helper ── */
  const clampY = (y) => {
    if (!clampToDocument) return y;
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    return Math.min(Math.max(0, y), max);
  };

  /* ── rAF loop ── */
  const loopRef = useRef(null);
  loopRef.current = (ts) => {
    if (lastTsRef.current == null) lastTsRef.current = ts;
    const dt = Math.max(0.001, Math.min(0.033, (ts - lastTsRef.current) / 1000));
    lastTsRef.current = ts;

    const target = clampY(targetRef.current);
    const [ny, nv] = smoothDamp(yRef.current, target, vRef.current, smoothTime, maxSpeed, dt);

    yRef.current = ny;
    vRef.current = nv;
    window.scrollTo(0, ny);

    rafRef.current = requestAnimationFrame(loopRef.current);
  };

  const ensureLoop = () => {
    if (rafRef.current == null) {
      yRef.current = window.scrollY;
      targetRef.current = window.scrollY;
      rafRef.current = requestAnimationFrame(loopRef.current);
    }
  };

  const cancel = () => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    lastTsRef.current = null;
  };

  const nudge = (dy) => {
    targetRef.current = clampY(targetRef.current + dy);
    ensureLoop();
  };

  /* ── Wheel / trackpad ── */
  useEffect(() => {
    if (!active) return;
    const onWheel = (e) => {
      if (e.ctrlKey || e.shiftKey || e.altKey) return; // let pinch-zoom etc. through
      e.preventDefault();
      const factor = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      nudge(e.deltaY * factor);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel, false);
      cancel();
    };
  }, [active, smoothTime, maxSpeed, clampToDocument]);

  /* ── Keyboard ── */
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      const el = e.target;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      const line = 48 * keyboardStepLines;
      const h = window.innerHeight * pageJumpRatio;
      switch (e.code) {
        case "ArrowDown": e.preventDefault(); nudge(line);  break;
        case "ArrowUp":   e.preventDefault(); nudge(-line); break;
        case "PageDown":  e.preventDefault(); nudge(h);     break;
        case "PageUp":    e.preventDefault(); nudge(-h);    break;
        case "Space":     e.preventDefault(); nudge(h);     break;
      }
    };
    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, [active, keyboardStepLines, pageJumpRatio, smoothTime, maxSpeed, clampToDocument]);

  /* ── Touch (optional) ── */
  useEffect(() => {
    if (!active || !touchEnabled) return;
    let lastY = 0;
    const onTouchMove = (e) => {
      if (e.touches.length !== 1) return;
      const y = e.touches[0].clientY;
      const dy = lastY ? lastY - y : 0;
      lastY = y;
      if (Math.abs(dy) > 0) { e.preventDefault(); nudge(dy); }
    };
    const onTouchEnd = () => { lastY = 0; };
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [active, touchEnabled, smoothTime, maxSpeed, clampToDocument]);

  /* ── Sync with external scroll changes (hash links, anchor jumps) ── */
  useEffect(() => {
    const onScroll = () => {
      if (!active) return;
      if (rafRef.current == null) {
        yRef.current = window.scrollY;
        targetRef.current = window.scrollY;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [active]);

  /* Renders nothing — purely a side-effect controller */
  return null;
}
