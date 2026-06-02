// Shared helpers for the Solutions panels.
// Icon renders a Lucide glyph from its icon-node data (no DOM mutation),
// accepting a comma-separated candidate list so version renames degrade gracefully.

const ICON_DEFAULTS = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function _lucideLookup(n) {
  const L = window.lucide;
  if (!L) return null;
  return L[n] || (L.icons && L.icons[n]) || null;
}

function pickIcon(name) {
  if (!name) return null;
  for (const raw of String(name).split(",")) {
    const n = raw.trim();
    const hit = _lucideLookup(n);
    if (hit) return hit;
  }
  return null;
}

// Normalise a Lucide icon-node into a flat list of [tag, attrs] children.
function iconChildren(node) {
  if (!Array.isArray(node)) return null;
  // Some builds wrap as ["svg", attrs, [children]]
  if (node[0] === "svg" && Array.isArray(node[2])) return node[2];
  return node;
}

function Icon({ name, size = 20, stroke = 2, color = "currentColor", style }) {
  const node = pickIcon(name);
  const kids = iconChildren(node);
  if (!kids) {
    return <span style={{ display: "inline-block", width: size, height: size, borderRadius: 3, background: "currentColor", opacity: 0.25, ...style }} />;
  }
  return React.createElement(
    "svg",
    { ...ICON_DEFAULTS, width: size, height: size, stroke: color, strokeWidth: stroke, style: { display: "block", ...style } },
    kids.map((c, i) => React.createElement(c[0], { ...c[1], key: i }))
  );
}

// Soft tint helpers for icon chips (light theme uses a translucent accent wash).
function withAlpha(hex, a) {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16), g = parseInt(m.slice(2, 4), 16), b = parseInt(m.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

// Reveal — mount-time entrance that RESTS fully visible (opacity 1).
// Uses setTimeout (fires even in throttled/background tabs) so content can
// never get stuck invisible the way an opacity:0 CSS keyframe can.
function Reveal({ delay = 0, y = 10, style, className, children }) {
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    const id = setTimeout(() => setOn(true), 20 + delay);
    return () => clearTimeout(id);
  }, [delay]);
  return (
    <div className={className} style={{
      ...style,
      opacity: on ? 1 : 0,
      transform: on ? "none" : `translateY(${y}px)`,
      transition: "opacity 520ms cubic-bezier(0.16,1,0.3,1), transform 520ms cubic-bezier(0.16,1,0.3,1)",
    }}>{children}</div>
  );
}

Object.assign(window, { Icon, pickIcon, withAlpha, Reveal });
