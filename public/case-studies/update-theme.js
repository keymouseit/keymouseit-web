const fs = require('fs');
const path = require('path');

const targetDir = '/Users/vishal/Downloads/logistics-campaign';

const files = [
  'index.html',
  'Decision Intelligence.html',
  'Inventory Intelligence.html',
  'Logistics Control Tower.html',
  'Manufacturing Control Tower.html',
  'Predictive Inventory Planning.html'
];

const fontTarget = /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Geist:wght@300;400;500;600;700&family=Geist\+Mono:wght@400;500&family=Inter\+Tight:wght@400;500;600;700&family=Instrument\+Serif&display=swap" rel="stylesheet" \/>/;
const fontReplacement = '<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />';

const rootReplacement = `  :root {
    --blue:      #2563FF;
    --blue-600:  #1D4ED8;
    --blue-50:   #EFF4FF;
    --blue-100:  #DCE6FF;

    --bg:        #FAFAFA;
    --bg-2:      #F4F6FA;
    --panel:     #FFFFFF;
    --panel-2:   #F4F6FA;
    --card:      #FFFFFF;

    --line:      #EAECF0;
    --line-2:    #F0F2F5;
    --line-3:    #D7DCE3;

    --text:      #111827;
    --text-2:    #475467;
    --muted:     #6B7280;
    --muted-2:   #98A2B3;

    --accent:    #2563FF;
    --accent-2:  #1D4ED8;
    --accent-dim:rgba(37,99,255,0.12);

    --warn:      #FF8E5C;
    --danger:    #FF6B6B;
    --serif:     "Instrument Serif", "Times New Roman", serif;
    --sans:      "Schibsted Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --mono:      "IBM Plex Mono", ui-monospace, SFMono-Regular, monospace;
    --rad:       12px;
    --rad-lg:    16px;
    --maxw:      1280px;
  }`;

const brandMarkTarget = /\.brand-mark\s*\{\s*width:\s*26px;[\s\S]*?\}\s*\.brand-mark::after\s*\{[\s\S]*?\}/;
const brandMarkReplacement = `  .brand-mark {
    width: 26px; height: 26px; border-radius: 7px;
    background: var(--blue);
    position: relative; overflow: hidden;
  }
  .brand-mark::after {
    content:""; position:absolute; inset:5px; border-radius:3px;
    background:
      radial-gradient(circle at 30% 30%, #fff 0 2px, transparent 2.5px),
      radial-gradient(circle at 70% 70%, #fff 0 2px, transparent 2.5px),
      linear-gradient(45deg, transparent 49%, rgba(255,255,255,0.6) 49% 51%, transparent 51%);
  }`;

const linkedinBannerTarget = /\.linkedin-banner\s*\{[\s\S]*?\}\s*\.linkedin-banner:hover\s*\{[\s\S]*?\}\s*\.linkedin-banner\s*\.li-icon\s*\{[\s\S]*?\}\s*\.linkedin-banner\s*b\s*\{[\s\S]*?\}\s*\.linkedin-banner\s*\.li-text\s*\{[\s\S]*?\}\s*\.linkedin-banner\s*\.li-text\s*b\s*\{[\s\S]*?\}\s*\.linkedin-banner\s*\.li-arrow\s*\{[\s\S]*?\}/;
const linkedinBannerReplacement = `  .linkedin-banner {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 14px 10px 12px; margin-bottom: 22px;
    width: fit-content; max-width: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(10,102,194,0.08), rgba(10,102,194,0.01));
    border: 1px solid rgba(10,102,194,0.15);
    font-size: 13px; color: var(--text);
    transition: all .18s ease;
  }
  .linkedin-banner:hover { border-color: rgba(10,102,194,0.3); background: linear-gradient(90deg, rgba(10,102,194,0.12), rgba(10,102,194,0.02)); }
  .linkedin-banner .li-icon {
    width: 22px; height: 22px; border-radius: 5px; flex-shrink: 0;
    background: #0A66C2; color: #fff;
    display: inline-grid; place-items: center;
  }
  .linkedin-banner b { font-weight: 600; }
  .linkedin-banner .li-text { color: var(--text-2); }
  .linkedin-banner .li-text b { color: var(--text); margin-right: 6px; }
  .linkedin-banner .li-arrow { color: var(--accent); font-weight: 500; }`;

const mobileCtaTarget = /\/\*\s*Sticky mobile CTA bar\s*\*\/[\s\S]*?\.mobile-cta\s*\{[\s\S]*?\}\s*\.mobile-cta\s*\.row\s*\{[\s\S]*?\}\s*\.mobile-cta\s*\.slot\s*\{[\s\S]*?\}\s*\.mobile-cta\s*\.slot\s*\.live-dot\s*\{[\s\S]*?\}\s*\.mobile-cta\s*\.btn-primary\s*\{[\s\S]*?\}\s*\.mobile-cta\s*\.btn-ghost\s*\{[\s\S]*?\}/;
const mobileCtaReplacement = `  /* Sticky mobile CTA bar */
  .mobile-cta {
    position: fixed; left: 0; right: 0; bottom: 0; z-index: 60;
    padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
    background: rgba(250,250,250,0.95);
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    border-top: 1px solid var(--line-2);
    display: none;
  }
  .mobile-cta .row { display: flex; gap: 8px; align-items: center; }
  .mobile-cta .slot {
    font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em;
    color: var(--muted); text-transform: uppercase; margin-bottom: 6px;
    display: flex; align-items: center; gap: 6px;
  }
  .mobile-cta .slot .live-dot { width: 5px; height: 5px; }
  .mobile-cta .btn-primary { flex: 1; justify-content: center; padding: 13px 16px; font-size: 14px; color: #fff; }
  .mobile-cta .btn-ghost   { padding: 13px 14px; font-size: 13px; }`;

files.forEach(file => {
  const filePath = path.join(targetDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace font
  content = content.replace(fontTarget, fontReplacement);

  // Replace :root
  content = content.replace(/:root\s*\{[\s\S]*?\}/, rootReplacement);

  // Replace brand mark
  content = content.replace(brandMarkTarget, brandMarkReplacement);

  // Replace linkedin banner
  content = content.replace(linkedinBannerTarget, linkedinBannerReplacement);

  // Replace mobile CTA
  content = content.replace(mobileCtaTarget, mobileCtaReplacement);

  // Replace button primary / ghost (if matching patterns exist)
  content = content.replace(/\.btn-primary\s*\{\s*background:\s*var\(--accent\);\s*color:\s*#07080A;\s*\}/g, 
    '.btn-primary { background: var(--accent); color: #ffffff; box-shadow: 0 4px 14px rgba(37,99,255,0.25); }');
  content = content.replace(/\.btn-primary:hover\s*\{\s*background:\s*#d6ff66;\s*box-shadow:\s*0\s*0\s*0\s*6px\s*rgba\(199,243,82,0\.10\);\s*\}/g, 
    '.btn-primary:hover { background: var(--accent-2); transform: translateY(-1px); box-shadow: 0 10px 24px rgba(37,99,255,0.35); }');
  content = content.replace(/\.btn-ghost\s*\{\s*color:\s*var\(--text\);\s*background:\s*transparent;\s*border-color:\s*var\(--line-2\);\s*\}/g, 
    '.btn-ghost { color: var(--text); background: transparent; border-color: var(--line-3); }');
  content = content.replace(/\.btn-ghost:hover\s*\{\s*border-color:\s*var\(--line-3\);\s*background:\s*rgba\(255,255,255,0\.02\);\s*\}/g, 
    '.btn-ghost:hover { border-color: var(--accent); color: var(--accent); background: rgba(37,99,255,0.04); }');

  // Replace header em rules
  content = content.replace(/\.display em\s*\{\s*font-family:\s*var\(--serif\);\s*font-style:\s*italic;\s*font-weight:\s*400;\s*letter-spacing:\s*-0\.01em;\s*color:\s*#fff;\s*\}/g,
    '.display em { font-style: italic; font-weight: 700; letter-spacing: -0.01em; color: var(--accent); }');
  content = content.replace(/\.h2 em\s*\{\s*font-family:\s*var\(--serif\);\s*font-style:\s*italic;\s*font-weight:\s*400;\s*color:\s*#fff;\s*\}/g,
    '.h2 em { font-style: italic; font-weight: 700; color: var(--accent); }');
  content = content.replace(/\.h3\s*\{\s*font-family:\s*var\(--sans\);\s*font-weight:\s*500;\s*letter-spacing:\s*-0\.015em;\s*line-height:\s*1\.1;\s*font-size:\s*clamp\(20px,\s*1\.6vw,\s*24px\);\s*color:\s*#fff;\s*margin:\s*0;\s*\}/g,
    '.h3 { font-family: var(--sans); font-weight: 500; letter-spacing: -0.015em; line-height: 1.1; font-size: clamp(20px, 1.6vw, 24px); color: var(--text); margin: 0; }');

  // Replace bg-grid and glow spot
  content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.025\)/g, 'rgba(17, 24, 39, 0.035)');
  content = content.replace(/rgba\(199,\s*243,\s*82,\s*0\.10\)/g, 'rgba(37, 99, 255, 0.08)');
  content = content.replace(/rgba\(199,\s*243,\s*82,\s*0\.02\)/g, 'rgba(37, 99, 255, 0.01)');

  // Replace nav
  content = content.replace(/background:\s*rgba\(6,7,10,0.65\);/g, 'background: rgba(250, 250, 250, 0.8);');
  content = content.replace(/backdrop-filter:\s*blur\(14px\);/g, 'backdrop-filter: saturate(180%) blur(16px);');
  content = content.replace(/-webkit-backdrop-filter:\s*blur\(14px\);/g, '-webkit-backdrop-filter: saturate(180%) blur(16px);');

  // Replace template background color attributes and contents
  content = content.replace(/data-bg-color="#06070A"/g, 'data-bg-color="#FAFAFA"');
  content = content.replace(/fill="#06070A"/g, 'fill="#FAFAFA"');
  content = content.replace(/stroke="#1f2530"/g, 'stroke="#EAECF0"');
  content = content.replace(/stroke="#C7F352"/g, 'stroke="#2563FF"');
  content = content.replace(/fill="#C7F352"/g, 'fill="#2563FF"');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed: ${file}`);
});
