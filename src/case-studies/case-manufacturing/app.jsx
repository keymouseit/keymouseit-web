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
        headline="Recognise your dock?"
        sub="Skip the deep dive — 30 min, no slides. We'll map where the workflow is breaking."
        btn="Book Audit"
      />
      <Insight/>
      <Built/>
      <AISection/>
      <Impact/>
      <Relevant/>
      <CrossSell/>
      <CaseCTA/>
      <CaseFooter/>
      <MobileCaseCTA/>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App/>);
