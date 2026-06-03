import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon, Eyebrow, Reveal, Btn, ScrollScrubText, Magnetic } from './site-ui';

gsap.registerPlugin(ScrollTrigger);

export default function FounderV2() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glossRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const quoteBorderRef = useRef(null);
  const quoteTextRef = useRef(null);
  const markersRef = useRef([]);
  const p1Ref = useRef(null);
  const p2Ref = useRef(null);

  // 3D Tilt Effect
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    
    const rotateX = -(y / (height / 2)) * 12;
    const rotateY = (x / (width / 2)) * 12;
    
    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4
    });

    const gloss = glossRef.current;
    if (gloss) {
      const px = ((e.clientX - left) / width) * 100;
      const py = ((e.clientY - top) / height) * 100;
      gsap.to(gloss, {
        background: `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 60%)`,
        duration: 0.2
      });
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      ease: "power3.out",
      duration: 0.8
    });
    
    const gloss = glossRef.current;
    if (gloss) {
      gsap.to(gloss, {
        background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)",
        duration: 0.8
      });
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // 1. Quote line drawing animation
    const quoteBorder = quoteBorderRef.current;
    const quoteText = quoteTextRef.current;
    let quoteAnim;
    if (quoteBorder && quoteText) {
      quoteAnim = gsap.timeline({
        scrollTrigger: {
          trigger: quoteBorder,
          start: "top 88%",
          toggleActions: "play none none none"
        }
      });
      
      quoteAnim.fromTo(quoteBorder, 
        { scaleY: 0 },
        { scaleY: 1, duration: 0.8, ease: "power2.out" }
      ).fromTo(quoteText,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }

    // 2. Credibility markers stagger reveal
    let markersAnim;
    if (markersRef.current.length > 0) {
      markersAnim = gsap.fromTo(markersRef.current,
        { opacity: 0, y: 24, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.65,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: markersRef.current[0],
            start: "top 92%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // 3. Ambient floating particle scroll parallax
    const p1 = p1Ref.current;
    const p2 = p2Ref.current;
    let p1Anim, p2Anim;
    if (p1) {
      p1Anim = gsap.to(p1, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2
        }
      });
    }
    if (p2) {
      p2Anim = gsap.to(p2, {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2
        }
      });
    }

    // 4. Image parallax zoom on scroll
    const imgWrapper = imageWrapperRef.current;
    let imgAnim;
    if (imgWrapper) {
      imgAnim = gsap.fromTo(imgWrapper,
        { scale: 1.12, filter: "brightness(0.9)" },
        {
          scale: 1.0,
          filter: "brightness(1)",
          ease: "none",
          scrollTrigger: {
            trigger: imgWrapper,
            start: "top bottom",
            end: "bottom center",
            scrub: 0.5
          }
        }
      );
    }

    return () => {
      if (quoteAnim) {
        if (quoteAnim.scrollTrigger) quoteAnim.scrollTrigger.kill();
        quoteAnim.kill();
      }
      if (markersAnim) {
        if (markersAnim.scrollTrigger) markersAnim.scrollTrigger.kill();
        markersAnim.kill();
      }
      if (p1Anim) {
        if (p1Anim.scrollTrigger) p1Anim.scrollTrigger.kill();
        p1Anim.kill();
      }
      if (p2Anim) {
        if (p2Anim.scrollTrigger) p2Anim.scrollTrigger.kill();
        p2Anim.kill();
      }
      if (imgAnim) {
        if (imgAnim.scrollTrigger) imgAnim.scrollTrigger.kill();
        imgAnim.kill();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="section" id="founder" style={{ position: "relative", overflow: "hidden" }}>
      {/* Ambient Moving Particles */}
      <div ref={p1Ref} style={{ position: "absolute", top: "15%", left: "5%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,255,0.09) 0%, rgba(124,58,237,0.03) 70%, transparent 100%)", filter: "blur(24px)", pointerEvents: "none", zIndex: 0 }} />
      <div ref={p2Ref} style={{ position: "absolute", bottom: "10%", right: "8%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, rgba(37,99,255,0.02) 70%, transparent 100%)", filter: "blur(32px)", pointerEvents: "none", zIndex: 0 }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="v2-hero-grid" style={{ display: "grid", gridTemplateColumns: "0.82fr 1.18fr", gap: 60, alignItems: "center" }}>
          {/* portrait with 3D tilt */}
          <Reveal variant="slide-left">
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ 
                position: "relative",
                cursor: "pointer",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Backglow shadow layer */}
              <div style={{ position: "absolute", inset: -14, borderRadius: 28, background: "linear-gradient(150deg, rgba(37,99,255,0.14), rgba(124,58,237,0.10))", filter: "blur(3px)", transform: "translateZ(-10px)", pointerEvents: "none" }} />
              
              {/* Card wrapper */}
              <div 
                ref={cardRef}
                style={{ 
                  position: "relative", 
                  borderRadius: 22, 
                  overflow: "hidden", 
                  border: "1px solid var(--line)", 
                  boxShadow: "var(--sh-xl)", 
                  background: "#fff",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Image scale parallax wrapper */}
                <div ref={imageWrapperRef} style={{ overflow: "hidden", borderRadius: 22, transformOrigin: "center center" }}>
                  <image-slot id="founder-photo-v2" src="/assets/founder_hd.png" style={{ display: "block", width: "100%", height: "440px" }} shape="rect" placeholder="Drop founder photo"></image-slot>
                </div>
                
                {/* Reflection Overlay */}
                <div 
                  ref={glossRef} 
                  style={{ 
                    position: "absolute", 
                    inset: 0, 
                    pointerEvents: "none", 
                    mixBlendMode: "screen", 
                    zIndex: 2,
                    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)" 
                  }} 
                />

                {/* Floating Glass Info Badge */}
                <div className="glass" style={{ position: "absolute", bottom: 16, left: 16, right: 16, borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 3, transform: "translateZ(35px)" }}>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.01em" }}>Shiven Juneja</div>
                    <div style={{ fontSize: 13, color: "var(--muted)" }}>Founder &amp; CEO</div>
                  </div>
                  <span className="pill"><span className="dot" />10+ yrs delivery</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* story */}
          <div>
            <Reveal variant="slide-right">
              <Eyebrow>The founder</Eyebrow>
              <h2 className="h2" style={{ marginTop: 16 }}>Built by engineers who understand delivery.</h2>
            </Reveal>
            
            <ScrollScrubText 
              className="lead"
              style={{ marginTop: 20 }}
              text="Over the last **10+ years**, Shiven Juneja has led the delivery of software products across **identity**, **healthcare**, **logistics**, **education**, **fintech**, **retail**, and **energy**."
            />
            
            <Reveal variant="slide-right" delay={150}>
              <p className="body" style={{ marginTop: 16, fontSize: 16.5 }}>
                KeyMouse IT was built to help companies turn complex operational challenges into scalable software systems — engineered to perform, secure by default, and ready for AI.
              </p>
            </Reveal>

            {/* founder quote with animated vertical border */}
            <div style={{ position: "relative", marginTop: 24, padding: "20px 24px 20px 28px", background: "linear-gradient(180deg, rgba(37,99,255,0.05), rgba(124,58,237,0.03))", borderRadius: "0 14px 14px 0" }}>
              <span ref={quoteBorderRef} style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "linear-gradient(180deg, var(--blue), var(--purple))", transformOrigin: "top", transform: "scaleY(0)" }} />
              <p ref={quoteTextRef} style={{ fontSize: 17.5, lineHeight: 1.6, color: "var(--text)", fontWeight: 500, fontStyle: "italic", letterSpacing: "-0.01em", margin: 0, opacity: 0 }}>
                “We don't just build software. We build systems that make operations faster, clearer, and easier to scale.”
              </p>
            </div>

            {/* credibility markers with stagger pop-in */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 24px", marginTop: 26 }}>
              {[
                ["Briefcase,Award", "10+ years in product engineering"],
                ["Boxes,Box", "50+ projects delivered"],
                ["Globe,Layers", "Multiple industries served"],
                ["UserCheck,Users", "Founder-led delivery"]
              ].map(([ic, t], idx) => (
                <div 
                  key={t} 
                  ref={el => markersRef.current[idx] = el}
                  style={{ display: "flex", alignItems: "center", gap: 12, opacity: 0 }}
                >
                  <span style={{ width: 32, height: 32, flexShrink: 0, borderRadius: 9, background: "var(--blue-50)", color: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(37,99,255,0.08)" }}>
                    <Icon name={ic} size={16} stroke={2} />
                  </span>
                  <span style={{ fontSize: 14.5, fontWeight: 600, color: "var(--text-2)", letterSpacing: "-0.005em" }}>{t}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32 }}>
              <Reveal variant="slide-right" delay={300}>
                <Magnetic>
                  <Btn variant="primary" href="#contact" icon>Talk to the founder</Btn>
                </Magnetic>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
