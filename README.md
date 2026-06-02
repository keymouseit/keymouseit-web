# 🚀 KeyMouse IT Modernized Landing Platform

Welcome to the modernized, high-performance React implementation of the KeyMouse IT landing page. The application has been engineered with a modular architecture and built-in **GSAP + ScrollTrigger** entrance animations, alongside hardware-accelerated **interactive micro-animations** that match the focus of each section.

---

## 🛠️ Getting Started

Follow these steps to run, build, and maintain the project locally.

### 1. Install Dependencies
Initialize and install the necessary modular UI dependencies (React, GSAP, Lucide Icons, Vite):
```bash
npm install
```

### 2. Launch Local Development Server
Spin up the hot-reloading development server on port `5173`:
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser to preview the platform with instant local compilation.

### 3. Build for Production
Compile and minify the React codebase into highly optimized static production assets inside the `/dist` directory:
```bash
npm run build
```

### 4. Deploy Updates to Surge
When you make changes and are ready to deploy to the live production server, run:
```bash
# 1. Compile the production assets
npm run build

# 2. Copy static files (fonts, images, assets) to the build folder
cp -R assets dist/

# 3. Deploy to the custom domain
npx surge dist keymouseit-modern.surge.sh
```

---

## 🎨 Motion Design Architecture

The motion experience is driven by two main layers: **Section Entrance Reveals** (ScrollTrigger) and **Interactive Micro-Animations** (CSS Keyframes).

### 1. Section Entrance Reveals (`src/components/site-ui.jsx`)
We re-engineered the legacy reveal engine to utilize **GSAP + ScrollTrigger**. Wrap components inside `<Reveal>` and specify a bespoke `variant` to match the behavior of the content:

| Variant | Entrance Direction | Perfect For |
| :--- | :--- | :--- |
| `fade-in` | Pure opacity fade-up | Section headings and descriptions |
| `slide-left` | Glides in from left to right | Inputs blocks, featured left cards, portraits |
| `slide-right` | Glides in from right to left | Outcomes blocks, editorial text grids |
| `scale-in` | Elastic central spring zoom | Center processing nodes, supporting cards |

#### *Example Usage:*
```jsx
import { Reveal } from './site-ui';

<Reveal variant="slide-left" delay={100}>
  <div>This slides in beautifully from the left on scroll!</div>
</Reveal>
```

### 2. Interactive Micro-Animations
Universal premium animations are globally declared in `src/App.jsx` under `PREMIUM_EFFECTS`:

* **`flow-line`**: Animates dotted flow paths continuously from left-to-right to visualize information traveling across data pipelines.
* **`pulse-warning-badge`**: Generates warning ripples around disconnected legacy tools (Before state).
* **`pulse-core-glow-ring`**: Creates double breathing wave overlays around the active AI Processing hub.
* **`hover-card-tilt`**: Gives all cards a physical 3D tilt response when hovered (rotates slightly, lifts, and projects a deep shadow).
* **`btn-shimmer`**: Sweeps a reflective bright overlay across CTA buttons on hover.

---

## 📂 Modular File Structure

* **`src/App.jsx`**: Platform entry point containing layout wrappers and global premium animation declarations.
* **`src/components/site-ui.jsx`**: UI Primitive components (Icons, Eyebrows, Section Headers, GSAP Reveal factory).
* **`src/components/HeroV2.jsx`**: Hero layout with vertical title phrase staggers and the interactive mockup dashboard.
* **`src/components/SignatureRibbon.jsx`**: Workflow ribbon utilizing data-flow reveal variants.
* **`src/components/ProblemV2.jsx`**: Side-by-side comparative grid mapping before/after states, pulsing rings, and custom flow lines.
* **`src/components/CasesV2.jsx`**: Case study card system utilizing staggered scales and 3D card tilt hovers.
* **`src/components/WhyV2.jsx`**: Split typical agency vs KeyMouse comparison curtain reveal.
* **`src/data/site-data.js`**: Centralized copy content, metrics data, capabilities list, and FAQ items.
