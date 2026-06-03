import React from 'react';
import NavV2 from './components/NavV2';
import HeroV2 from './components/HeroV2';
import SignatureRibbon from './components/SignatureRibbon';
import ProblemV2 from './components/ProblemV2';
import CasesV2 from './components/CasesV2';
import WhyV2 from './components/WhyV2';
import FounderV2 from './components/FounderV2';
import SolutionsV2 from './components/SolutionsV2';
import IndustrySolutions from './components/IndustrySolutions';
import CapabilitiesV2 from './components/CapabilitiesV2';
import EngagementV2 from './components/EngagementV2';
import ProcessV2 from './components/ProcessV2';
import FaqSection from './components/FaqSection';
import FinalCTAV2 from './components/FinalCTAV2';
import Footer from './components/Footer';
import MobileCTABar from './components/MobileCTABar';

const PREMIUM_EFFECTS = `
@keyframes pulse-warning {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(217, 83, 30, 0.4); }
  50% { transform: scale(1.04); box-shadow: 0 0 0 8px rgba(217, 83, 30, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(217, 83, 30, 0); }
}
@keyframes pulse-core-ring {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(1.4); opacity: 0; }
}
@keyframes glow-flow {
  0% { stroke-dashoffset: 24; }
  100% { stroke-dashoffset: 0; }
}
@keyframes shimmer-sweep {
  0% { left: -100%; }
  100% { left: 100%; }
}
.pulse-warning-badge {
  animation: pulse-warning 2s infinite ease-in-out !important;
}
.pulse-core-glow-ring {
  animation: pulse-core-ring 2.2s infinite cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.pulse-core-glow-ring-delay {
  animation: pulse-core-ring 2.2s infinite cubic-bezier(0.16, 1, 0.3, 1) !important;
  animation-delay: 1.1s !important;
}
.flow-line {
  stroke-dasharray: 4 6 !important;
  animation: glow-flow 0.9s infinite linear !important;
}
.hover-card-tilt {
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease, border-color 0.3s ease !important;
}
.hover-card-tilt:hover {
  transform: translateY(-8px) scale(1.015) rotate(0.4deg) !important;
  box-shadow: 0 20px 48px rgba(11, 17, 32, 0.08) !important;
  border-color: var(--blue) !important;
}
.btn-shimmer {
  position: relative;
  overflow: hidden;
}
.btn-shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.24), transparent);
  transform: skewX(-25deg);
}
.btn-shimmer:hover::after {
  animation: shimmer-sweep 1s ease-in-out forwards;
}

/* ---------- Horizontal Scroll Pinning & Responsiveness ---------- */
@media (min-width: 960px) {
  .cases-section-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .cases-track-container {
    width: 100%;
    overflow: visible;
  }
  .cases-track {
    display: flex;
    flex-wrap: nowrap;
    gap: 60px;
    width: max-content;
    will-change: transform;
    padding-left: max(32px, calc((100vw - 1200px) / 2 + 32px));
    padding-right: max(32px, calc((100vw - 1200px) / 2 + 32px));
  }
  .case-slide {
    width: 880px !important;
    height: 480px !important;
  }
}
@media (max-width: 959px) {
  .cases-track-container {
    padding: 0 32px;
  }
  .cases-track {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
  }
  .case-slide {
    width: 100% !important;
    grid-template-columns: 1fr !important;
    border-radius: 20px !important;
  }
  .case-slide > div:last-child {
    border-top: 1px solid var(--line);
    padding: 28px !important;
    gap: 20px !important;
  }
}
`;

export default function App() {
  return (
    <>
      <style>{PREMIUM_EFFECTS}</style>
      <NavV2 />
      <HeroV2 />
      <SignatureRibbon />
      <ProblemV2 />
      <CasesV2 />
      <WhyV2 />
      <FounderV2 />
      <SolutionsV2 />
      <IndustrySolutions />
      <CapabilitiesV2 />
      <EngagementV2 />
      <ProcessV2 />
      <FaqSection />
      <FinalCTAV2 />
      <Footer />
      <MobileCTABar />
    </>
  );
}
