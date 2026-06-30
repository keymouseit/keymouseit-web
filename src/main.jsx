import React, { useLayoutEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CaseStudiesIndex from './case-studies/CaseStudiesIndex';
import ManufacturingControlTower from './case-studies/ManufacturingControlTower';
import DecisionIntelligence from './case-studies/DecisionIntelligence';
import InventoryIntelligence from './case-studies/InventoryIntelligence';
import LogisticsControlTower from './case-studies/LogisticsControlTower';
import PredictiveInventoryPlanning from './case-studies/PredictiveInventoryPlanning';
import ConnectedCareOperations from './case-studies/ConnectedCareOperations';
import { initClarity, initGoogleAnalytics } from './utils/clarity';
import { applyPageSeo } from './utils/page-seo';
import ClarityJourney from './components/ClarityJourney';
import '../image-slot.js';

initGoogleAnalytics();
initClarity();

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    applyPageSeo(pathname);
  }, [pathname]);

  return null;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <ClarityJourney />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/case-studies" element={<CaseStudiesIndex />} />
        <Route path="/case-studies/manufacturing-control-tower" element={<ManufacturingControlTower />} />
        <Route path="/case-studies/decision-intelligence" element={<DecisionIntelligence />} />
        <Route path="/case-studies/inventory-intelligence" element={<InventoryIntelligence />} />
        <Route path="/case-studies/logistics-control-tower" element={<LogisticsControlTower />} />
        <Route path="/case-studies/predictive-inventory-planning" element={<PredictiveInventoryPlanning />} />
        <Route path="/case-studies/connected-care-operations" element={<ConnectedCareOperations />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
