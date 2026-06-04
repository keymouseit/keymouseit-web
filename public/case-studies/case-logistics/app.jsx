/* eslint-disable */

function App() {
  return (
    <>
      <CaseNav/>
      <CaseHero/>
      <WhoFor/>
      <Breaking/>
      <Incident/>
      <MidCTA
        headline="Sounds painfully familiar?"
        sub="Skip the deep dive — 30 min, no slides. We'll map your gaps directly."
        btn="Book Audit"
      />
      <Insight/>
      <Built/>
      <AISection/>
      <Impact/>
      <Relevant/>
      <TrustLayerL/>
      <CaseCTA/>
      <CaseFooter/>
      <MobileCaseCTA/>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App/>);
