// PanelRadial — faithful interactive "Solutions We Build" panel.
// One component, two skins via `theme` ("light" | "dark").
// Modules → glowing hub → outcomes, with precise dotted connectors,
// clickable industry tabs, auto-advance, and animated transitions.

const { useState, useEffect, useRef, useCallback } = React;

function radialTheme(theme, accent, accent2) {
  const dark = theme === "dark";
  return {
    dark,
    bg: dark ? "#0A0D14" : "#FFFFFF",
    panelInset: dark ? "#0E121B" : "#FFFFFF",
    text: dark ? "#F4F5F7" : "#0F172A",
    sub: dark ? "#8A92A6" : "#64748B",
    faint: dark ? "#5C6478" : "#94A3B8",
    cardBg: dark ? "#12161F" : "#FFFFFF",
    cardBorder: dark ? "rgba(255,255,255,0.08)" : "#E7EDF6",
    cardHover: dark ? "rgba(255,255,255,0.16)" : withAlpha(accent, 0.35),
    chipBg: dark ? withAlpha(accent, 0.16) : withAlpha(accent, 0.10),
    line: dark ? "rgba(255,255,255,0.14)" : "#CBD7E8",
    tabBox: dark ? "rgba(255,255,255,0.03)" : "#F7FAFD",
    tabBorder: dark ? "rgba(255,255,255,0.07)" : "#EAF0F8",
    featBg: dark ? "#0E1320" : "#F5F8FC",
    featBorder: dark ? "rgba(255,255,255,0.06)" : "#EAF0F8",
    ring: dark ? "rgba(255,255,255,0.10)" : withAlpha(accent, 0.18),
    accent, accent2,
    grad: `linear-gradient(150deg, ${accent} 0%, ${accent2} 100%)`,
  };
}

function IconChip({ name, t, size = 38, glyph = 18, soft }) {
  return (
    <div style={{
      width: size, height: size, flexShrink: 0,
      borderRadius: 10,
      background: soft ? t.chipBg : t.chipBg,
      border: `1px solid ${t.dark ? "rgba(255,255,255,0.06)" : withAlpha(t.accent, 0.14)}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: t.accent,
    }}>
      <Icon name={name} size={glyph} stroke={2} />
    </div>
  );
}

function PanelRadial({ theme = "light", initial = 0, autoAdvance = true }) {
  const data = window.INDUSTRIES;
  const [idx, setIdx] = useState(initial);
  const [paused, setPaused] = useState(false);
  const ind = data[idx];
  const t = radialTheme(theme, ind.accent, ind.accent2);

  useEffect(() => {
    if (!autoAdvance || paused) return;
    const id = setTimeout(() => setIdx((i) => (i + 1) % data.length), 7000);
    return () => clearTimeout(id);
  }, [idx, paused, autoAdvance, data.length]);

  // ---- shared coordinate grid (matches absolute card placement) ----
  const H = 472;
  const W = 1280;
  const colW = 300;
  const leftRight = colW;            // right edge of left column
  const rightLeft = W - colW;        // left edge of right column
  const hubCx = W / 2;
  const hubCy = 206;
  const hubR = 66;

  const isConn = !ind.modules[0].desc;          // AI uses connector-style modules
  const mCount = ind.modules.length;
  const mCardH = isConn ? 58 : 76;
  const mGap = isConn ? 16 : 14;
  const oCount = ind.outcomes.length;
  const oCardH = oCount <= 4 ? 96 : 76;
  const oGap = oCount <= 4 ? 18 : 14;

  const lay = (count, cardH, gap) => {
    const stack = count * cardH + (count - 1) * gap;
    const top = (H - stack) / 2;
    return { top, center: (i) => top + cardH / 2 + i * (cardH + gap), at: (i) => top + i * (cardH + gap) };
  };
  const L = lay(mCount, mCardH, mGap);
  const R = lay(oCount, oCardH, oGap);

  const curve = (x1, y1, x2, y2) => {
    const mx = (x1 + x2) / 2;
    return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
  };

  return (
    <div
      style={{ background: t.bg, color: t.text, fontFamily: "var(--font-sans)", padding: "40px 44px 36px", position: "relative", minHeight: 900 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* header */}
      <div style={{ marginBottom: 26 }}>
        <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.6, color: t.text }}>Solutions We Build</div>
        <div style={{ fontSize: 16, color: t.sub, marginTop: 8 }}>Industry-focused systems powered by AI and built for scale.</div>
      </div>

      {/* tabs */}
      <div style={{
        display: "grid", gridTemplateColumns: `repeat(${data.length}, 1fr)`,
        background: t.tabBox, border: `1px solid ${t.tabBorder}`, borderRadius: 16,
        padding: 8, marginBottom: 34,
      }}>
        {data.map((d, i) => {
          const on = i === idx;
          return (
            <button key={d.id} className="sw-tab" onClick={() => setIdx(i)} style={{
              border: 0, background: on ? (t.dark ? "rgba(255,255,255,0.04)" : "#FFFFFF") : "transparent",
              boxShadow: on && !t.dark ? "0 1px 3px rgba(15,23,42,0.06)" : "none",
              borderRadius: 11, cursor: "pointer", padding: "14px 8px 12px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              position: "relative",
            }}>
              <Icon name={d.tabIcon} size={22} stroke={2} color={on ? d.accent : t.faint} />
              <span style={{ fontSize: 13.5, fontWeight: on ? 700 : 500, color: on ? d.accent : t.sub, letterSpacing: 0.1 }}>{d.tab}</span>
              {on && <span style={{ position: "absolute", bottom: 2, left: "30%", right: "30%", height: 2.5, borderRadius: 2, background: t.grad }} />}
            </button>
          );
        })}
      </div>

      {/* body */}
      <div key={ind.id} style={{ maxWidth: W, margin: "0 auto" }}>
        {/* title + desc */}
        <Reveal style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 23, fontWeight: 800, color: t.text, letterSpacing: -0.3 }}>{ind.title}</div>
          <div style={{ fontSize: 14.5, lineHeight: 1.55, color: t.sub, maxWidth: 560, marginTop: 8 }}>{ind.desc}</div>
        </Reveal>

        <div style={{ position: "relative", width: W, height: H, margin: "0 auto" }}>
          {/* connectors */}
          <svg width={W} height={H} style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}>
            {ind.modules.map((_, i) => (
              <path key={"l" + i} d={curve(leftRight, L.center(i), hubCx - hubR, hubCy)} fill="none" stroke={t.line} strokeWidth={1.5} strokeDasharray="2 6" strokeLinecap="round" />
            ))}
            {ind.outcomes.map((_, j) => (
              <path key={"r" + j} d={curve(hubCx + hubR, hubCy, rightLeft, R.center(j))} fill="none" stroke={t.line} strokeWidth={1.5} strokeDasharray="2 6" strokeLinecap="round" />
            ))}
            {ind.modules.map((_, i) => <circle key={"ld" + i} cx={leftRight} cy={L.center(i)} r={3} fill={t.accent} />)}
            {ind.outcomes.map((_, j) => <circle key={"rd" + j} cx={rightLeft} cy={R.center(j)} r={3} fill={t.accent} />)}
          </svg>

          {/* left column label */}
          <div style={{ position: "absolute", left: 0, top: L.top - 26, fontSize: 12, fontWeight: 700, letterSpacing: 0.3, color: t.accent }}>{ind.leftLabel}</div>

          {/* modules */}
          <div style={{ position: "absolute", left: 0, top: 0, width: colW, height: H }}>
            {ind.modules.map((m, i) => (
              <Reveal key={m.title} delay={i * 55} style={{ position: "absolute", top: L.at(i), left: 0, width: colW, height: mCardH }}>
                <div className="sw-card" style={{
                  height: "100%",
                  background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: 12,
                  display: "flex", alignItems: "center", gap: 12, padding: "0 14px",
                  boxShadow: t.dark ? "none" : "0 1px 2px rgba(15,23,42,0.04)",
                }}>
                  <IconChip name={m.icon} t={t} size={isConn ? 34 : 38} glyph={isConn ? 17 : 18} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: isConn ? 15 : 14.5, fontWeight: 700, color: t.text, lineHeight: 1.2 }}>{m.title}</div>
                    {m.desc && <div style={{ fontSize: 12.5, color: t.sub, lineHeight: 1.35, marginTop: 3 }}>{m.desc}</div>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* hub */}
          <Reveal delay={120} y={0} style={{ position: "absolute", left: hubCx - 150, top: 0, width: 300, height: H, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ position: "relative", width: 300, height: hubCy + hubR + 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "absolute", top: hubCy - 150, left: 0, width: 300, height: 300, borderRadius: "50%", border: `1px solid ${t.ring}` }} />
              <div className="sw-ring" style={{ position: "absolute", top: hubCy - 110, left: 40, width: 220, height: 220, borderRadius: "50%", border: `1px solid ${t.ring}` }} />
              <div className="sw-ring d2" style={{ position: "absolute", top: hubCy - 110, left: 40, width: 220, height: 220, borderRadius: "50%", border: `1px solid ${t.ring}` }} />
              <div style={{ position: "absolute", top: hubCy - hubR, left: 150 - hubR, width: hubR * 2, height: hubR * 2, borderRadius: "50%", background: t.grad, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 18px 50px ${withAlpha(ind.accent, 0.45)}, inset 0 2px 0 rgba(255,255,255,0.25)` }}>
                <Icon name={ind.hubIcon} size={42} stroke={1.8} color="#FFFFFF" />
              </div>
            </div>
            <div style={{ position: "absolute", top: hubCy + hubR + 22, width: 320, textAlign: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 1, color: t.accent }}>{ind.hubLabel}</div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: t.text, marginTop: 8, lineHeight: 1.5, opacity: 0.92 }}>{ind.hubTagline}</div>
            </div>
          </Reveal>

          {/* right column label */}
          <div style={{ position: "absolute", right: 0, top: R.top - 26, fontSize: 12, fontWeight: 700, letterSpacing: 0.3, color: t.accent, textAlign: "right", width: colW }}>{ind.rightLabel}</div>

          {/* outcomes */}
          <div style={{ position: "absolute", right: 0, top: 0, width: colW, height: H }}>
            {ind.outcomes.map((o, j) => (
              <Reveal key={o.title} delay={j * 55} style={{ position: "absolute", top: R.at(j), right: 0, width: colW, height: oCardH }}>
                <div className="sw-card" style={{
                  height: "100%",
                  background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: 12,
                  display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px",
                  boxShadow: t.dark ? "none" : "0 1px 2px rgba(15,23,42,0.04)",
                }}>
                  <IconChip name={o.icon} t={t} size={36} glyph={17} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 700, color: t.text, lineHeight: 1.25 }}>{o.title}</div>
                    <div style={{ fontSize: 12.5, color: t.sub, lineHeight: 1.4, marginTop: 3 }}>{o.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* feature row */}
        <Reveal delay={180} className="" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, background: t.featBg, border: `1px solid ${t.featBorder}`, borderRadius: 16, marginTop: 28, overflow: "hidden" }}>
          {ind.features.map((f, i) => (
            <div key={f.title} style={{ padding: "22px 22px", borderLeft: i === 0 ? "none" : `1px solid ${t.featBorder}`, display: "flex", flexDirection: "column", gap: 8 }}>
              <Icon name={f.icon} size={22} stroke={2} color={t.accent} />
              <div style={{ fontSize: 14.5, fontWeight: 700, color: t.text }}>{f.title}</div>
              <div style={{ fontSize: 12.5, color: t.sub, lineHeight: 1.4 }}>{f.desc}</div>
            </div>
          ))}
        </Reveal>
      </div>

      {/* progress dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 26 }}>
        {data.map((d, i) => (
          <button key={d.id} onClick={() => setIdx(i)} aria-label={d.tab} style={{
            width: i === idx ? 26 : 8, height: 8, borderRadius: 4, border: 0, cursor: "pointer",
            background: i === idx ? t.grad : (t.dark ? "rgba(255,255,255,0.16)" : "#D5DEEC"),
            transition: "width 240ms cubic-bezier(0.2,0.6,0.2,1)",
          }} />
        ))}
      </div>
    </div>
  );
}

window.PanelRadial = PanelRadial;
