/* eslint-disable */

function CaseNav() {
  return (
    <nav className="nav" data-screen-label="Nav">
      <div className="wrap nav-inner">
        <a href="/" className="brand" style={{ display: "inline-flex", alignItems: "center" }}>
          <Logo height={40} mode="light" />
        </a>

        <div className="crumbs" style={{ display: "flex" }}>
          <a href="index.html">Case Studies</a>
          <span className="sep">/</span>
          <span className="cur">Predictive Inventory Planning</span>
        </div>

        <div className="nav-cta" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="index.html#audit" className="btn btn-ghost" style={{ padding: "9px 14px", fontSize: 13 }}>
            Contact
          </a>
          <a href="#cta" className="btn btn-primary" style={{ padding: "9px 14px", fontSize: 13 }}>
            Get System Map <ArrowRight />
          </a>
        </div>
      </div>
    </nav>
  );
}

window.CaseNav = CaseNav;
