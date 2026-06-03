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

export function Magnetic({ children, range = 50, tolerance = 0.28 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < range) {
        gsap.to(el, {
          x: distanceX * tolerance,
          y: distanceY * tolerance,
          duration: 0.35,
          ease: "power2.out"
        });
      } else {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power3.out"
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power3.out"
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [range, tolerance]);

  return <div ref={ref} style={{ display: "inline-block", position: "relative" }}>{children}</div>;
}

export function Btn({ variant = "primary", lg, block, children, href = "#", icon, onClick, type, style }) {
  const cls = `btn btn-${variant} ${lg ? "btn-lg" : ""} ${block ? "btn-block" : ""} btn-shimmer`;
  const inner = <>{children}{icon && <Arrow />}</>;
  const el = type === "button" || type === "submit"
    ? <button type={type} className={cls} style={style} onClick={onClick}>{inner}</button>
    : <a className={cls} href={href} style={style} onClick={onClick}>{inner}</a>;
  return <Magnetic>{el}</Magnetic>;
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

/* ---------- Scroll Scrub Text (GSAP-powered) ---------- */
export function ScrollScrubText({ text, style, className }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Split text into tokens, keeping **highlight** markers intact
    const tokens = text.split(/(\*\*[^*]+\*\*|\s+)/);
    
    let html = "";
    tokens.forEach(token => {
      if (!token) return;
      if (token.startsWith("**") && token.endsWith("**")) {
        const clean = token.slice(2, -2);
        const innerWords = clean.split(/\s+/);
        innerWords.forEach((w, idx) => {
          html += `<span class="scrub-word scrub-highlight grad-text" style="opacity: 0.15; display: inline-block; font-weight: 800; background-image: linear-gradient(110deg,#2563EB,#7C3AED); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${w}</span>${idx < innerWords.length - 1 ? ' ' : ''}`;
        });
      } else if (token.trim() === "") {
        html += token;
      } else {
        html += `<span class="scrub-word" style="opacity: 0.15; display: inline-block; color: var(--text-2);">${token}</span>`;
      }
    });

    el.innerHTML = html;

    const spans = el.querySelectorAll(".scrub-word");
    const anim = gsap.to(spans, {
      opacity: 1,
      stagger: 0.12,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        end: "bottom 58%",
        scrub: 0.5,
      }
    });

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, [text]);

  return (
    <p ref={containerRef} className={className} style={{ margin: 0, ...style }}>
      {text}
    </p>
  );
}

/* ---------- Brand SVG Logo Component ---------- */
export function Logo({ height = 38, className, mode = "light", style }) {
  const textColor = mode === "dark" ? "#FFFFFF" : "#343434";

  return (
    <div
      className={className}
      style={{
        display: "inline-block",
        height: `${height}px`,
        ...style
      }}
    >
      <svg
        viewBox="300 0 2300 650"
        height="100%"
        style={{ height: "100%", width: "auto", display: "block" }}
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="optimizeQuality"
      >
        <g transform="matrix(1.3333333,0,0,-1.3333333,0,1109.3333)">
          {/* ICON GROUP */}
          <g transform="translate(100, 130) scale(0.78)">
            {/* Arrow pointer (light blue) */}
            <g transform="translate(551.8407,340.2126)">
              <path
                fill="#2eb2ef"
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                d="M 0,0 C -1.926,-2.682 -3.825,-2.193 -4.222,1.082 L -22.78,154.503 c -0.397,3.276 1.43,4.325 4.058,2.33 L 104.386,63.42 c 2.629,-1.994 2.092,-3.879 -1.194,-4.188 L 44.14,53.688 c -3.286,-0.309 -7.549,-2.754 -9.475,-5.434 z"
              />
            </g>
            {/* Dark grey laptop panel back */}
            <g transform="translate(523.873,406.3806)">
              <path
                fill={textColor}
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                d="M 0,0 -2.533,26.293 -155.508,67.594 -170.709,49.975 Z"
              />
            </g>
            {/* Yellow accent */}
            <g transform="translate(253.5898,485.5061)">
              <path
                fill="#f6c342"
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                d="m 0,0 99.575,-29.151 15.2,17.619 -45.025,12.157 77.429,25.402 25.682,29.768 z"
              />
            </g>
            {/* Dark grey connector */}
            <g transform="translate(510.0898,538.0061)">
              <path
                fill={textColor}
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                d="m 0,0 129.409,10.082 -11.97,10.513 z"
              />
            </g>
            {/* Red accent */}
            <g transform="translate(461.5942,705.3835)">
              <path
                fill="#f0463b"
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                d="m 0,0 20.132,-17.663 102.272,36.486 29.638,35.344 z"
              />
            </g>
            {/* Teal accent right */}
            <g transform="translate(725.0898,676.0822)">
              <path
                fill="#00a9a0"
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                d="m 0,0 -21.125,-23.554 v -80.522 l -76.436,-13.405 11.97,-10.513 85.591,6.668 z"
              />
            </g>
            {/* Dark grey right outline */}
            <g transform="translate(725.0898,799.2561)">
              <path
                fill={textColor}
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                d="m 0,0 -111.453,-39.706 -29.639,-35.343 119.967,42.799 V -146.728 L 0,-123.174 Z"
              />
            </g>
            {/* Dark grey left outline */}
            <g transform="translate(452.4648,702.1311)">
              <path
                fill={textColor}
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                d="m 0,0 -13.375,-156.75 -12.639,-4.08 -25.682,-29.768 57.071,18.723 L 18.5,-18.25 29.261,-14.411 9.129,3.252 Z"
              />
            </g>
            {/* Teal connector inner */}
            <g transform="translate(686.5887,506.7273)">
              <path
                fill="#00a9a0"
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                d="M 0,0 3.562,-3.129 34.084,27.279 Z"
              />
            </g>
            {/* Dark grey connector inner */}
            <g transform="translate(621.3398,454.5056)">
              <path
                fill={textColor}
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                d="m 0,0 11.5,-8 57.31,57.093 -3.561,3.129 z"
              />
            </g>
          </g>

          {/* TEXT GROUP shifted horizontally to the right, scaled up and vertically aligned */}
          <g transform="translate(680, 290) scale(1.35)">
            {/* Letter K */}
            <g transform="translate(103.2385,249.6384)">
              <path
                fill={textColor}
                fillOpacity={1}
                stroke="none"
                d="m 0,0 38.803,69.933 1.648,2.97 H 37.054 19.511 18.329 L 17.759,71.867 -19.792,3.63 v 67.273 2 h -2 -17.321 -2 v -2 -155.442 -2 h 2 17.321 2 v 2 51.635 l 6.942,11.682 31.678,-64.202 0.551,-1.115 h 1.243 17.765 3.179 l -1.377,2.866 z"
              />
            </g>
            {/* Letter E */}
            <g transform="translate(154.9461,322.5417)">
              <path
                fill={textColor}
                fillOpacity={1}
                stroke="none"
                d="m 0,0 h -2 v -2 -155.442 -2 h 2 63.954 2 v 2 15.766 2 h -2 -44.633 v 51.293 h 35.972 2 v 2 15.544 2 h -2 -35.972 v 49.073 h 44.633 2 v 2 V -2 0 h -2 z"
              />
            </g>
            {/* Letter Y */}
            <g transform="translate(296.1721,322.5417)">
              <path
                fill={textColor}
                fillOpacity={1}
                stroke="none"
                d="M 0,0 H -1.46 L -1.905,-1.391 -24.418,-71.795 -46.725,-1.395 -47.167,0 h -1.464 -17.988 -2.765 l 0.866,-2.626 32.765,-99.4 v -55.416 -2 h 2 17.098 2 v 2 55.414 L 18.331,-2.63 19.204,0 h -2.771 z"
              />
            </g>
            {/* Letter M */}
            <g transform="translate(399.2044,322.5417)">
              <path
                fill="#2eb2ef"
                fillOpacity={1}
                stroke="none"
                d="M 0,0 H -1.642 L -1.961,-1.61 -24.684,-116.038 -48.227,-1.597 -48.555,0 h -1.631 -24.205 -2 v -2 -155.442 -2 h 2 15.101 2 v 2 104.497 l 21.801,-104.684 0.331,-1.592 h 1.627 16.655 1.643 l 0.318,1.613 20.687,104.738 v -104.572 -2 h 2 16.433 2 v 2 V -2 0 h -2 z"
              />
            </g>
            {/* Letter O */}
            <g transform="translate(458.9368,283.9021)">
              <path
                fill="#2eb2ef"
                fillOpacity={1}
                stroke="none"
                d="M 0,0 C 0,13.555 5.528,20.428 16.431,20.428 27.333,20.428 32.862,13.555 32.862,0 v -82.163 c 0,-13.746 -5.375,-20.428 -16.431,-20.428 C 5.528,-102.591 0,-95.718 0,-82.163 Z m 16.431,40.194 c -23.85,0 -37.53,-14.974 -37.53,-41.083 v -80.385 c 0,-12.357 3.231,-22.619 9.343,-29.678 6.553,-7.568 16.036,-11.405 28.187,-11.405 12.249,0 21.797,3.836 28.378,11.402 6.133,7.049 9.374,17.312 9.374,29.681 v 80.385 c 0,26.109 -13.76,41.083 -37.752,41.083"
              />
            </g>
            {/* Letter U */}
            <g transform="translate(580.1765,322.5417)">
              <path
                fill="#2eb2ef"
                fillOpacity={1}
                stroke="none"
                d="m 0,0 h -2 v -2 -118.803 c 0,-13.746 -5.229,-20.427 -15.986,-20.427 -10.907,0 -16.209,6.681 -16.209,20.427 V -2 0 h -2 -17.1 -2 v -2 -117.914 c 0,-12.623 2.985,-22.634 8.869,-29.753 6.336,-7.665 15.68,-11.552 27.773,-11.552 12.191,0 21.599,3.885 27.964,11.548 5.906,7.11 8.9,17.121 8.9,29.757 V -2 0 h -2 z"
              />
            </g>
            {/* Letter S */}
            <g transform="translate(653.9421,250.0622)">
              <path
                fill="#2eb2ef"
                fillOpacity={1}
                stroke="none"
                d="m 0,0 c -11.898,9.664 -23.137,18.792 -23.137,34.284 0,13.446 5.157,19.984 15.765,19.984 10.608,0 15.765,-6.61 15.765,-20.206 v -5.108 -2 h 2 16.432 2 v 2 4.22 c 0,12.559 -3.016,22.501 -8.966,29.547 -6.338,7.507 -15.649,11.313 -27.675,11.313 -23.486,0 -36.42,-14.511 -36.42,-40.86 0,-24.099 15.4,-36.624 28.988,-47.674 11.814,-9.608 22.975,-18.684 22.975,-34.045 0,-13.408 -5.454,-20.206 -16.209,-20.206 -10.756,0 -16.209,6.798 -16.209,20.206 v 9.771 2 h -2 -16.211 -2 v -2 -8.882 c 0,-12.573 3.027,-22.515 8.997,-29.552 6.366,-7.505 15.742,-11.31 27.867,-11.31 23.568,0 37.085,14.894 37.085,40.862 C 29.047,-23.592 13.615,-11.058 0,0"
              />
            </g>
            {/* Letter E */}
            <g transform="translate(696.0867,322.5417)">
              <path
                fill="#2eb2ef"
                fillOpacity={1}
                stroke="none"
                d="m 0,0 h -2 v -2 -155.442 -2 h 2 63.953 2 v 2 15.766 2 h -2 -44.633 v 51.293 h 35.973 2 v 2 15.544 2 h -2 -35.973 v 49.073 h 44.633 2 v 2 V -2 0 h -2 z"
              />
            </g>
            {/* Letter T */}
            <g transform="translate(914.1414,322.5417)">
              <path
                fill={textColor}
                fillOpacity={1}
                stroke="none"
                d="m 0,0 h -74.612 -2 v -2 -15.766 -2 h 2 26.645 v -137.676 -2 h 2 17.321 2 v 2 137.676 H 0 2 v 2 L 2,-2 v 2 z"
              />
            </g>
            {/* Letter i dot */}
            <g transform="translate(829.7625,302.7761)">
              <path
                fill={textColor}
                fillOpacity={1}
                stroke="none"
                d="m 0,0 v 17.766 2 h -2 -17.32 -2 v -2 V 0 Z"
              />
            </g>
            {/* Letter i stem */}
            <g transform="translate(808.4421,291.0349)">
              <path
                fill={textColor}
                fillOpacity={1}
                stroke="none"
                d="m 0,0 v -125.936 -2 h 2 17.32 2 v 2 V 0 Z"
              />
            </g>


            {/* Horizontal separator line */}
            <g transform="translate(54.0286, 146.0993)">
              <path
                stroke={textColor}
                strokeWidth={2}
                strokeLinecap="butt"
                strokeLinejoin="miter"
                d="M 0,0 H 870.21"
              />
            </g>
          </g>
        </g>

        {/* Tagline Text rendered outside the Y-flipped parent group for subpixel clarity */}
        <text
          x={1025}
          y={560}
          fill={textColor}
          style={{
            fontVariant: "normal",
            fontWeight: "bold",
            fontStretch: "normal",
            fontSize: "100px",
            fontFamily: "Montserrat, sans-serif"
          }}
        >
          KEY TO YOUR IT CHALLENGES
        </text>
      </svg>
    </div>
  );
}
