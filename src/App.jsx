import React from 'react';
import NavV2 from './components/NavV2';
import HeroV2 from './components/HeroV2';
import SignatureRibbon from './components/SignatureRibbon';
import ProblemV2 from './components/ProblemV2';
import CasesV2 from './components/CasesV2';
import WhyV2 from './components/WhyV2';
import FounderV2 from './components/FounderV2';
import CoFounderV2 from './components/CoFounderV2';
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
.whatsapp-float-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 58px;
  height: 58px;
  background-color: #25D366;
  color: #fff !important;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4);
  z-index: 999;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  animation: pulse-wa 2.2s infinite ease-in-out;
}
.whatsapp-float-btn:hover {
  transform: scale(1.08) translateY(-3px);
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.55);
  background-color: #20BA5A;
}
.whatsapp-float-btn svg {
  width: 28px;
  height: 28px;
}
@keyframes pulse-wa {
  0% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
  }
}
@media (max-width: 959px) {
  .whatsapp-float-btn {
    bottom: 96px;
    right: 20px;
    width: 50px;
    height: 50px;
  }
  .whatsapp-float-btn svg {
    width: 24px;
    height: 24px;
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
      <CoFounderV2 />
      <SolutionsV2 />
      <IndustrySolutions />
      <CapabilitiesV2 />
      <EngagementV2 />
      <ProcessV2 />
      <FaqSection />
      <FinalCTAV2 />
      <Footer />
      <a
        href="https://wa.me/919501055574"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        aria-label="Contact on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.004 2C6.516 2 2.059 6.458 2.059 11.947c0 1.755.459 3.473 1.33 4.993l-1.413 5.163 5.289-1.387c1.468.802 3.125 1.225 4.739 1.225h.005c5.485 0 9.941-4.457 9.941-9.947C22 6.458 17.502 2 12.004 2z" fill="#FFFFFF"/>
          <path d="M16.55 13.7c-.25-.12-1.47-.72-1.7-.8-.22-.08-.38-.12-.55.12-.17.25-.66.8-.8 1-.15.17-.3.2-.55.08-1.25-.62-2.18-1.2-3.02-2.65-.22-.38.22-.35.63-1.18.08-.17.04-.3-.02-.42-.06-.12-.54-1.3-.75-1.8-.2-.5-.4-.4-.55-.4-.14 0-.3 0-.47 0-.17 0-.44.06-.67.3-.23.25-.87.85-.87 2.07 0 1.22.9 2.4 1.02 2.57.12.17 1.76 2.68 4.26 3.75.6.25 1.06.4 1.42.5.6.18 1.15.16 1.58.1.48-.07 1.47-.6 1.7-1.18.23-.58.23-1.08.16-1.18-.07-.1-.25-.16-.5-.28z" fill="#25D366"/>
        </svg>
      </a>
      <MobileCTABar />
    </>
  );
}
