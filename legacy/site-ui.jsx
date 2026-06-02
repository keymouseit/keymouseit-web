// KeyMouse IT — shared UI primitives.
// Self-contained Icon (Lucide icon-node renderer with candidate fallbacks),
// scroll-reveal, and small layout/typography helpers.

const { useState, useEffect, useRef, useCallback } = React;

/* ---------- Icon ---------- */
const _ICON_ATTRS = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };
function _look(n) { const L = window.lucide; if (!L) return null; return L[n] || (L.icons && L.icons[n]) || null; }
function pickIcon(name) {
  if (!name) return null;
  for (const raw of String(name).split(",")) { const hit = _look(raw.trim()); if (hit) return hit; }
  return null;
}
function _kids(node) {
  if (!Array.isArray(node)) return null;
  if (node[0] === "svg" && Array.isArray(node[2])) return node[2];
  return node;
}
function Icon({ name, size = 20, stroke = 1.9, color = "currentColor", style }) {
  const kids = _kids(pickIcon(name));
  if (!kids) return <span style={{ display: "inline-block", width: size, height: size, borderRadius: 3, background: "currentColor", opacity: 0.22, ...style }} />;
  return React.createElement("svg", { ..._ICON_ATTRS, width: size, height: size, stroke: color, strokeWidth: stroke, style: { display: "block", flexShrink: 0, ...style } },
    kids.map((c, i) => React.createElement(c[0], { ...c[1], key: i })));
}
const Arrow = ({ size = 17 }) => <Icon name="ArrowRight" size={size} stroke={2.2} />;

function withAlpha(hex, a) {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16), g = parseInt(m.slice(2, 4), 16), b = parseInt(m.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

/* ---------- Scroll reveal (rect-based; robust in offscreen/background iframes) ----------
   In-view-at-mount elements render at final state instantly (no transition to freeze).
   Below-fold elements animate when scrolled into a VISIBLE tab. A safety timer
   guarantees nothing ever stays hidden. */
function useInView(opts = {}) {
  const ref = useRef(null);
  const [state, setState] = useState({ seen: false, instant: false });
  const inViewNow = () => {
    const el = ref.current; if (!el) return false;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top < vh * (opts.margin ?? 0.92) && r.bottom > 0;
  };
  // Before first paint: if already in view, show instantly with no transition.
  React.useLayoutEffect(() => {
    if (inViewNow()) setState({ seen: true, instant: true });
  }, []);
  useEffect(() => {
    if (ref.current && state.seen) return;
    let done = state.seen;
    const check = () => {
      if (done || !ref.current) return;
      if (inViewNow()) { done = true; setState({ seen: true, instant: false }); cleanup(); }
    };
    const cleanup = () => { window.removeEventListener("scroll", check); window.removeEventListener("resize", check); clearTimeout(t); };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    const t = setTimeout(() => { if (!done) { done = true; setState({ seen: true, instant: true }); cleanup(); } }, 1800);
    return cleanup;
  }, []);
  return [ref, state.seen, state.instant];
}

// Reveal — fades+rises into view. In-view-at-mount = instant (no freeze risk).
function Reveal({ children, delay = 0, as = "div", className = "", style }) {
  const [ref, seen, instant] = useInView();
  return React.createElement(as, {
    ref, className: `reveal ${seen ? "in" : ""} ${instant ? "instant" : ""} ${className}`,
    style: { transitionDelay: instant ? "0ms" : `${delay}ms`, ...style },
  }, children);
}

/* ---------- Layout / type helpers ---------- */
function Eyebrow({ children, muted }) {
  return <div className={`eyebrow ${muted ? "muted" : ""}`}><span className="sq" />{children}</div>;
}

function SectionHead({ eyebrow, title, lead, center, maxWidth, style }) {
  return (
    <div className={`section-head ${center ? "center" : ""}`} style={{ maxWidth, ...style }}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="h2">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

function Btn({ variant = "primary", lg, block, children, href = "#", icon, onClick, type }) {
  const cls = `btn btn-${variant} ${lg ? "btn-lg" : ""} ${block ? "btn-block" : ""}`;
  const inner = <>{children}{icon && <Arrow />}</>;
  if (type === "button" || type === "submit") return <button type={type} className={cls} onClick={onClick}>{inner}</button>;
  return <a className={cls} href={href} onClick={onClick}>{inner}</a>;
}

/* ---------- Count-up number ---------- */
function CountUp({ value, dur = 1300 }) {
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

Object.assign(window, { Icon, Arrow, pickIcon, withAlpha, useInView, Reveal, Eyebrow, SectionHead, Btn, CountUp });
