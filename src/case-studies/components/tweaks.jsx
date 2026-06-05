/* eslint-disable */

// Tweaks defaults — host parses this JSON and writes back via __edit_mode_set_keys.
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent":   "blue",
  "tone":     "light",
  "display":  "schibsted",
  "showGrid": true
}/*EDITMODE-END*/;

// Theming maps
const ACCENTS = {
  blue:  { hex: "#2563FF", dim: "rgba(37,99,255,0.12)", dim2: "rgba(37,99,255,0.30)", glow: "rgba(37,99,255,0.18)" },
  amber: { hex: "#FF8E5C", dim: "rgba(255,142,92,0.12)",  dim2: "rgba(255,142,92,0.30)",  glow: "rgba(255,142,92,0.20)" },
  cyan:  { hex: "#00AEFF", dim: "rgba(0,174,255,0.12)", dim2: "rgba(0,174,255,0.30)", glow: "rgba(0,174,255,0.20)" },
};
const TONES = {
  light:    { bg: "#FAFAFA", bg2: "#F4F6FA", panel: "#FFFFFF" },
  warm:     { bg: "#FCFAF7", bg2: "#F7F3EC", panel: "#FFFFFF" },
  gray:     { bg: "#F8F9FA", bg2: "#E9ECEF", panel: "#FFFFFF" },
};
const DISPLAYS = {
  schibsted:    '"Schibsted Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  inter:        '"Inter Tight", "Inter", ui-sans-serif, sans-serif',
  serif:        '"Instrument Serif", "Times New Roman", serif',
};

function applyTweaks(t) {
  const a = ACCENTS[t.accent] || ACCENTS.blue;
  const tone = TONES[t.tone] || TONES.light;
  const disp = DISPLAYS[t.display] || DISPLAYS.schibsted;
  const r = document.documentElement.style;
  r.setProperty("--accent",     a.hex);
  r.setProperty("--accent-dim", a.dim);
  r.setProperty("--bg",         tone.bg);
  r.setProperty("--bg-2",       tone.bg2);
  r.setProperty("--panel",      tone.panel);
  r.setProperty("--sans",       disp);
  
  // Set appropriate light text / line colors since tones are all light now
  r.setProperty("--text",       "#111827");
  r.setProperty("--text-2",     "#475467");
  r.setProperty("--muted",      "#6B7280");
  r.setProperty("--muted-2",    "#98A2B3");
  r.setProperty("--line",       "#EAECF0");
  r.setProperty("--line-2",     "#F0F2F5");
  r.setProperty("--line-3",     "#D7DCE3");

  document.body.style.background = tone.bg;
  // grid visibility
  document.documentElement.classList.toggle("no-grid", !t.showGrid);
}

function TweaksRoot() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => applyTweaks(t), [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Accent" />
      <TweakColor
        label="Color"
        value={ACCENTS[t.accent].hex}
        options={[ACCENTS.blue.hex, ACCENTS.amber.hex, ACCENTS.cyan.hex]}
        onChange={(hex) => {
          const key = Object.keys(ACCENTS).find(k => ACCENTS[k].hex === hex) || "blue";
          setTweak('accent', key);
        }}
      />

      <TweakSection label="Background tone" />
      <TweakRadio
        label="Tone"
        value={t.tone}
        options={["light", "warm", "gray"]}
        onChange={(v) => setTweak('tone', v)}
      />

      <TweakSection label="Display type" />
      <TweakRadio
        label="Font"
        value={t.display}
        options={["schibsted", "inter", "serif"]}
        onChange={(v) => setTweak('display', v)}
      />

      <TweakSection label="Surface" />
      <TweakToggle
        label="Show grid"
        value={t.showGrid}
        onChange={(v) => setTweak('showGrid', v)}
      />
    </TweaksPanel>
  );
}

window.TweaksRoot = TweaksRoot;
window.applyTweaks = applyTweaks;
window.TWEAK_DEFAULTS = TWEAK_DEFAULTS;
