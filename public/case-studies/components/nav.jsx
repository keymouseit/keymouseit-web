/* eslint-disable */

function Nav() {
  return (
    <nav className="nav" data-screen-label="Nav">
      <div className="wrap nav-inner">
        <a href="#" className="brand" style={{ display: "inline-flex", alignItems: "center" }}>
          <Logo height={40} mode="light" />
          <span style={{
            fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)",
            marginLeft: 12, paddingLeft: 12, borderLeft: "1px solid var(--line-2)"
          }}>OPERATIONAL SYSTEMS</span>
        </a>

        <div className="nav-links">
          <a href="#systems">Case Studies</a>
          <a href="#architecture">Architecture</a>
          <a href="#proof">Proof</a>
        </div>

        <div className="nav-cta">
          <a href="#contact" className="btn btn-ghost" style={{ padding: "9px 14px", fontSize: 13 }}>
            Contact
          </a>
          <a href="#audit" className="btn btn-primary" style={{ padding: "9px 14px", fontSize: 13 }}>
            Get System Map<ArrowRight />
          </a>
        </div>
      </div>
    </nav>
  );
}

window.Nav = Nav;
