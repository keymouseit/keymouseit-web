import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon, Eyebrow, Arrow, Reveal, CountUp } from './site-ui';
import { CASES } from '../data/site-data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function CaseCard({ c }) {
  return (
    <div className="case-slide" style={{
      background: "#fff",
      border: "1px solid var(--line)",
      borderRadius: 24,
      boxShadow: "var(--sh-xl)",
      display: "grid",
      gridTemplateColumns: "1.2fr 0.8fr",
      overflow: "hidden",
      flexShrink: 0,
    }}>
      {/* Left side details */}
      <div style={{ padding: "36px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span className="icon-chip" style={{ width: 44, height: 44, borderRadius: 12, background: "var(--blue-50)", color: "var(--blue)" }}><Icon name={c.icon} size={20} stroke={2} /></span>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", color: "var(--muted)" }}>{c.industry}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", marginTop: 2, letterSpacing: "-0.01em" }}>{c.title}</div>
            </div>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ position: "relative", paddingLeft: 36 }}>
              <span style={{ position: "absolute", left: 13, top: 22, bottom: -10, width: 2, background: "var(--line)" }} />
              <span style={{ position: "absolute", left: 0, top: 0, width: 26, height: 26, borderRadius: 7, background: "#FEF2F2", color: "#E11D48", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="CircleAlert,AlertCircle" size={13} stroke={2.2} />
              </span>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: 1, textTransform: "uppercase", color: "var(--faint)", marginBottom: 3 }}>Challenge</div>
              <div style={{ fontSize: 14.5, color: "var(--text-2)", lineHeight: 1.45 }}>{c.challenge}</div>
            </div>

            <div style={{ position: "relative", paddingLeft: 36 }}>
              <span style={{ position: "absolute", left: 13, top: 22, bottom: -10, width: 2, background: "var(--line)" }} />
              <span style={{ position: "absolute", left: 0, top: 0, width: 26, height: 26, borderRadius: 7, background: "var(--blue-50)", color: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="Lightbulb,Wrench" size={13} stroke={2.2} />
              </span>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: 1, textTransform: "uppercase", color: "var(--faint)", marginBottom: 3 }}>Solution</div>
              <div style={{ fontSize: 14.5, color: "var(--text-2)", lineHeight: 1.45 }}>{c.solution}</div>
            </div>

            <div style={{ position: "relative", paddingLeft: 36 }}>
              <span style={{ position: "absolute", left: 0, top: 0, width: 26, height: 26, borderRadius: 7, background: "var(--green-50)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="TrendingUp" size={13} stroke={2.2} />
              </span>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: 1, textTransform: "uppercase", color: "var(--faint)", marginBottom: 3 }}>Outcome</div>
              <div style={{ fontSize: 14.5, color: "var(--text)", fontWeight: 600, lineHeight: 1.45 }}>Measurable performance enhancements built to scale automatically.</div>
            </div>
          </div>
        </div>

        <a className="linka" href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 700, color: "var(--blue)", marginTop: 20 }}>
          View Full Case Study <Arrow size={14} />
        </a>
      </div>

      {/* Right side metrics rail */}
      <div style={{
        background: "linear-gradient(160deg,#0B1120,#131A2C)",
        padding: "36px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 24,
        position: "relative",
        overflow: "hidden"
      }}>
        <div className="mesh" style={{ opacity: 0.6 }} />
        {c.impact.map((m) => (
          <div key={m.l} style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 38, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>
              <CountUp value={m.v} />
            </div>
            <div style={{ fontSize: 12.5, color: "#9FB0C8", marginTop: 4, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 500 }}>{m.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CasesV2() {
  const triggerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 960px)": function() {
          const track = trackRef.current;
          if (!track) return;
          
          const getScrollAmount = () => track.scrollWidth - window.innerWidth;
          
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: triggerRef.current,
              pin: true,
              scrub: 0.5,
              start: "top 80px",
              end: () => `+=${getScrollAmount() + 250}`,
              invalidateOnRefresh: true,
            }
          });

          tl.to(track, {
            x: () => -getScrollAmount(),
            ease: "none",
            duration: 1
          });
          
          tl.to({}, { duration: 0.25 }); // scroll-hold after final card is fully visible
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="cases-section-wrapper" style={{ background: "linear-gradient(180deg,#F6F8FE,#FFFFFF)" }}>
      <section className="section" id="cases" style={{ overflow: "hidden", paddingBottom: "8vh" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 44 }}>
            <Reveal>
              <Eyebrow>Featured case studies</Eyebrow>
              <h2 className="h2" style={{ marginTop: 16 }}>Real systems. Real outcomes.</h2>
            </Reveal>
            <Reveal delay={80}>
              <a className="linka" href="#contact">Browse all work <Arrow /></a>
            </Reveal>
          </div>
        </div>

        <div className="cases-track-container">
          <div ref={trackRef} className="cases-track">
            {CASES.map((c, idx) => (
              <CaseCard key={c.title} c={c} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
