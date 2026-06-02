// PanelRail — variant 3. A structurally different take on the same data:
// vertical industry rail (left) + two list "ledgers" feeding a central core.
// Same content + interactivity; different navigation and spatial metaphor.

const { useState: useStateR, useEffect: useEffectR } = React;

function railTheme(theme, accent, accent2) {
  const dark = theme === "dark";
  return {
    dark, accent, accent2,
    grad: `linear-gradient(155deg, ${accent} 0%, ${accent2} 100%)`,
    bg: dark ? "#0A0D14" : "#FBFCFE",
    text: dark ? "#F4F5F7" : "#0F172A",
    sub: dark ? "#8A92A6" : "#64748B",
    faint: dark ? "#5C6478" : "#94A3B8",
    cardBg: dark ? "#12161F" : "#FFFFFF",
    border: dark ? "rgba(255,255,255,0.08)" : "#E7EDF6",
    divider: dark ? "rgba(255,255,255,0.06)" : "#EEF2F8",
    railActive: dark ? "rgba(255,255,255,0.05)" : withAlpha(accent, 0.07),
    railBg: dark ? "#0E121B" : "#FFFFFF",
    chip: dark ? withAlpha(accent, 0.16) : withAlpha(accent, 0.10),
    line: dark ? "rgba(255,255,255,0.16)" : withAlpha(accent, 0.4),
    featBg: dark ? "#0E1320" : "#F5F8FC",
  };
}

function ListPanel({ label, items, t, align }) {
  return (
    <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 16, overflow: "hidden", boxShadow: t.dark ? "none" : "0 1px 3px rgba(15,23,42,0.05)" }}>
      <div style={{ padding: "14px 18px", borderBottom: `1px solid ${t.divider}`, fontSize: 12, fontWeight: 700, letterSpacing: 0.4, color: t.accent, textTransform: "uppercase", textAlign: align }}>{label}</div>
      {items.map((m, i) => (
        <div key={m.title} className="sw-card" style={{
          display: "flex", alignItems: "center", gap: 13, padding: "13px 18px",
          borderTop: i === 0 ? "none" : `1px solid ${t.divider}`,
          flexDirection: align === "right" ? "row-reverse" : "row",
          textAlign: align === "right" ? "right" : "left",
        }}>
          <div style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 9, background: t.chip, border: `1px solid ${t.dark ? "rgba(255,255,255,0.06)" : withAlpha(t.accent, 0.14)}`, display: "flex", alignItems: "center", justifyContent: "center", color: t.accent }}>
            <Icon name={m.icon} size={17} />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1.2 }}>{m.title}</div>
            {m.desc && <div style={{ fontSize: 12, color: t.sub, lineHeight: 1.35, marginTop: 2 }}>{m.desc}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function PanelRail({ theme = "light", initial = 0, autoAdvance = true }) {
  const data = window.INDUSTRIES;
  const [idx, setIdx] = useStateR(initial);
  const [paused, setPaused] = useStateR(false);
  const ind = data[idx];
  const t = railTheme(theme, ind.accent, ind.accent2);

  useEffectR(() => {
    if (!autoAdvance || paused) return;
    const id = setTimeout(() => setIdx((i) => (i + 1) % data.length), 7000);
    return () => clearTimeout(id);
  }, [idx, paused, autoAdvance, data.length]);

  const connector = (dir) => (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minWidth: 26 }}>
      <div style={{ width: "100%", height: 0, borderTop: `1.5px dashed ${t.line}`, position: "relative" }}>
        <span style={{ position: "absolute", top: -3.5, [dir === "in" ? "right" : "left"]: -1, width: 7, height: 7, borderRadius: "50%", background: t.accent }} />
      </div>
    </div>
  );

  return (
    <div style={{ background: t.bg, color: t.text, fontFamily: "var(--font-sans)", padding: "40px 44px 36px", minHeight: 820 }}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.6 }}>Solutions We Build</div>
        <div style={{ fontSize: 16, color: t.sub, marginTop: 8 }}>Industry-focused systems powered by AI and built for scale.</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "264px 1fr", gap: 32, alignItems: "start" }}>
        {/* left rail */}
        <div style={{ background: t.railBg, border: `1px solid ${t.border}`, borderRadius: 16, padding: 8, boxShadow: t.dark ? "none" : "0 1px 3px rgba(15,23,42,0.05)" }}>
          {data.map((d, i) => {
            const on = i === idx;
            return (
              <button key={d.id} className="sw-tab" onClick={() => setIdx(i)} style={{
                width: "100%", textAlign: "left", border: 0, cursor: "pointer", borderRadius: 12,
                background: on ? withAlpha(d.accent, theme === "dark" ? 0.16 : 0.08) : "transparent",
                padding: "13px 14px", display: "flex", alignItems: "center", gap: 12, position: "relative", marginBottom: 2,
              }}>
                {on && <span style={{ position: "absolute", left: 0, top: 12, bottom: 12, width: 3, borderRadius: 3, background: d.grad ? `linear-gradient(180deg, ${d.accent}, ${d.accent2})` : d.accent }} />}
                <div style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 9, background: on ? `linear-gradient(150deg, ${d.accent}, ${d.accent2})` : (theme === "dark" ? "rgba(255,255,255,0.05)" : "#F1F5FB"), display: "flex", alignItems: "center", justifyContent: "center", color: on ? "#fff" : t.faint }}>
                  <Icon name={d.tabIcon} size={18} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: on ? 700 : 600, color: on ? t.text : t.sub, lineHeight: 1.2 }}>{d.tab}</div>
                  {on && <div style={{ fontSize: 11.5, color: t.sub, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 175 }}>{d.hubLabel.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}</div>}
                </div>
              </button>
            );
          })}
          <div style={{ padding: "14px 14px 8px", marginTop: 6, borderTop: `1px solid ${t.divider}` }}>
            <div style={{ fontSize: 11, color: t.faint, letterSpacing: 0.3, lineHeight: 1.5 }}>Tap an industry to explore the system we'd build for it.</div>
          </div>
        </div>

        {/* main */}
        <div key={ind.id}>
          <Reveal style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 23, fontWeight: 800, letterSpacing: -0.3 }}>{ind.title}</div>
            <div style={{ fontSize: 14.5, lineHeight: 1.55, color: t.sub, maxWidth: 620, marginTop: 8 }}>{ind.desc}</div>
          </Reveal>

          <Reveal delay={60} style={{ display: "grid", gridTemplateColumns: "1fr 168px 1fr", alignItems: "stretch", gap: 0 }}>
            <ListPanel label={ind.leftLabel} items={ind.modules} t={t} align="left" />

            {/* core */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {connector("in")}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{ width: 92, height: 92, borderRadius: "50%", background: t.grad, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 16px 44px ${withAlpha(ind.accent, 0.45)}, inset 0 2px 0 rgba(255,255,255,0.25)` }}>
                  <Icon name={ind.hubIcon} size={36} stroke={1.8} color="#fff" />
                </div>
                <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: 0.8, color: t.accent, marginTop: 14, textAlign: "center", maxWidth: 150 }}>{ind.hubLabel}</div>
              </div>
              {connector("out")}
            </div>

            <ListPanel label={ind.rightLabel} items={ind.outcomes} t={t} align="right" />
          </Reveal>

          <Reveal delay={120} style={{ textAlign: "center", margin: "18px 0 4px", fontSize: 13.5, fontWeight: 600, color: t.text, opacity: 0.85 }}>
            {ind.hubTagline}
          </Reveal>

          <Reveal delay={160} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", background: t.featBg, border: `1px solid ${t.border}`, borderRadius: 16, marginTop: 22, overflow: "hidden" }}>
            {ind.features.map((f, i) => (
              <div key={f.title} style={{ padding: "20px 20px", borderLeft: i === 0 ? "none" : `1px solid ${t.divider}`, display: "flex", flexDirection: "column", gap: 8 }}>
                <Icon name={f.icon} size={21} color={t.accent} />
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{f.title}</div>
                <div style={{ fontSize: 12, color: t.sub, lineHeight: 1.4 }}>{f.desc}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </div>
  );
}

window.PanelRail = PanelRail;
