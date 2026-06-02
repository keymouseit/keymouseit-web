import React, { useState, useEffect } from 'react';
import { Arrow } from './site-ui';

export default function MobileCTABar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const de = document.documentElement;
      const scrolled = (de.scrollTop) / (de.scrollHeight - de.clientHeight || 1);
      const contact = document.getElementById("contact");
      let nearContact = false;
      if (contact) {
        const r = contact.getBoundingClientRect();
        nearContact = r.top < (window.innerHeight || 800) * 0.9;
      }
      setShow(scrolled > 0.3 && !nearContact);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={`mobile-cta-bar ${show ? "show" : ""}`}>
      <div className="mc-txt">Build your operational system<span>Free consultation · 1-day response</span></div>
      <a className="mc-btn" href="#contact">Book Call <Arrow size={15} /></a>
    </div>
  );
}
