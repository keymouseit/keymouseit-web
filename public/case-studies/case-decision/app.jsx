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
        headline="Recognise the decision drag?"
        sub="Skip the deep dive — 30 minutes to map where data latency, reconciliation, and distrust slow leadership down."
        btn="Get Decision Map"
      />
      <Insight/>
      <Built/>
      <AISection/>
      <Impact/>
      <LeadershipShift/>
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
