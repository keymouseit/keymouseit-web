import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------- Icon Bridge ---------- */
const iconKeys = Object.keys(LucideIcons);
const keyMap = {};
iconKeys.forEach(k => {
  keyMap[k.toLowerCase()] = k;
});

export function Icon({ name, size = 20, stroke = 1.9, color = "currentColor", style }) {
  if (!name) return null;
  
  const candidates = String(name).split(",");
  let SelectedIcon = null;
  
  for (const raw of candidates) {
    const clean = raw.trim();
    if (LucideIcons[clean]) {
      SelectedIcon = LucideIcons[clean];
      break;
    }
    const lower = clean.toLowerCase();
    const matchedKey = keyMap[lower];
    if (matchedKey && LucideIcons[matchedKey]) {
      SelectedIcon = LucideIcons[matchedKey];
      break;
    }
  }

  if (!SelectedIcon) {
    return <span style={{ display: "inline-block", width: size, height: size, borderRadius: 3, background: "currentColor", opacity: 0.22, ...style }} />;
  }

  return <SelectedIcon size={size} strokeWidth={stroke} color={color} style={style} />;
}

export const Arrow = ({ size = 17 }) => <Icon name="ArrowRight" size={size} stroke={2.2} />;

export function withAlpha(hex, a) {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16), g = parseInt(m.slice(2, 4), 16), b = parseInt(m.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

/* ---------- Scroll Reveal Hooks & Components ---------- */
export function useInView(opts = {}) {
  const ref = useRef(null);
  const [state, setState] = useState({ seen: false, instant: false });
  
  const inViewNow = () => {
    const el = ref.current; if (!el) return false;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top < vh * (opts.margin ?? 0.92) && r.bottom > 0;
  };

  useLayoutEffect(() => {
    if (inViewNow()) setState({ seen: true, instant: true });
  }, []);

  useEffect(() => {
    if (ref.current && state.seen) return;
    let done = state.seen;
    const check = () => {
      if (done || !ref.current) return;
      if (inViewNow()) {
        done = true;
        setState({ seen: true, instant: false });
        cleanup();
      }
    };
    const cleanup = () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      clearTimeout(t);
    };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    const t = setTimeout(() => {
      if (!done) {
        done = true;
        setState({ seen: true, instant: true });
        cleanup();
      }
    }, 1800);
    return cleanup;
  }, []);

  return [ref, state.seen, state.instant];
}

export function Reveal({ children, delay = 0, as = "div", className = "", style, direction = "up" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const yOffset = direction === "up" ? 32 : direction === "down" ? -32 : 0;
    const xOffset = direction === "left" ? 32 : direction === "right" ? -32 : 0;

    const anim = gsap.fromTo(el, 
      { 
        opacity: 0, 
        y: yOffset,
        x: xOffset
      },
      { 
        opacity: 1, 
        y: 0, 
        x: 0,
        duration: 0.85,
        ease: "power3.out",
        delay: delay / 1000,
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          toggleActions: "play none none none"
        }
      }
    );

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, [delay, direction]);

  return React.createElement(as, {
    ref, 
    className: className,
    style: { opacity: 0, ...style },
  }, children);
}

/* ---------- Layout & Text Primitives ---------- */
export function Eyebrow({ children, muted }) {
  return <div className={`eyebrow ${muted ? "muted" : ""}`}><span className="sq" />{children}</div>;
}

export function SectionHead({ eyebrow, title, lead, center, maxWidth, style }) {
  return (
    <div className={`section-head ${center ? "center" : ""}`} style={{ maxWidth, ...style }}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="h2">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

export function Btn({ variant = "primary", lg, block, children, href = "#", icon, onClick, type }) {
  const cls = `btn btn-${variant} ${lg ? "btn-lg" : ""} ${block ? "btn-block" : ""}`;
  const inner = <>{children}{icon && <Arrow />}</>;
  if (type === "button" || type === "submit") return <button type={type} className={cls} onClick={onClick}>{inner}</button>;
  return <a className={cls} href={href} onClick={onClick}>{inner}</a>;
}

/* ---------- Dynamic CountUp ---------- */
export function CountUp({ value, dur = 1300 }) {
  const m = String(value).match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  const [ref, seen] = useInView();
  const target = m ? parseFloat(m[2]) : 0;
  const decimals = m ? ((m[2].split(".")[1] || "").length) : 0;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!m || !seen) return;
    let raf; const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setN(target * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen]);

  if (!m) return <span ref={ref}>{value}</span>;
  return <span ref={ref}>{m[1]}{n.toFixed(decimals)}{m[3]}</span>;
}
