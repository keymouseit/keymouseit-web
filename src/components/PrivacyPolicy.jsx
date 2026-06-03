import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Logo } from './site-ui';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Privacy Policy — KeyMouse IT";
  }, []);

  const sections = [
    {
      title: "1. Information We Collect",
      content: [
        {
          sub: "1.1 Information You Provide",
          text: "When you contact us, request a consultation, or engage our services, we may collect your name, email address, phone number, company name, job title, and any other information you voluntarily provide through forms, emails, or direct communication."
        },
        {
          sub: "1.2 Automatically Collected Information",
          text: "When you visit our website, we automatically collect certain technical data including your IP address, browser type and version, operating system, referring URLs, pages visited, time and date of visits, and time spent on pages. This data is collected through cookies, log files, and similar technologies."
        },
        {
          sub: "1.3 Cookies & Tracking Technologies",
          text: "We use essential cookies to ensure our website functions properly, analytics cookies to understand how visitors interact with our site, and preference cookies to remember your settings. You can control cookie preferences through your browser settings at any time."
        }
      ]
    },
    {
      title: "2. How We Use Your Information",
      content: [
        {
          text: "We use the information we collect for the following purposes:"
        },
        {
          list: [
            "To respond to your inquiries and provide customer support",
            "To deliver, maintain, and improve our services and products",
            "To send you project updates, technical notices, and administrative communications",
            "To analyze website usage patterns and optimize user experience",
            "To detect, prevent, and address technical issues and security vulnerabilities",
            "To comply with legal obligations and enforce our terms of service",
            "To send marketing communications (only with your explicit consent)"
          ]
        }
      ]
    },
    {
      title: "3. Data Sharing & Disclosure",
      content: [
        {
          text: "We do not sell, trade, or rent your personal information to third parties. We may share your data in the following limited circumstances:"
        },
        {
          list: [
            "With trusted service providers who assist us in operating our website and conducting business (subject to strict confidentiality agreements)",
            "When required by law, regulation, or legal process",
            "To protect the rights, property, or safety of KeyMouse IT, our clients, or the public",
            "In connection with a merger, acquisition, or sale of assets (with prior notice to affected users)"
          ]
        }
      ]
    },
    {
      title: "4. Data Security",
      content: [
        {
          text: "We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include SSL/TLS encryption for data in transit, encrypted storage for sensitive data at rest, regular security audits and vulnerability assessments, access controls and authentication protocols, and employee training on data protection best practices. While we strive to protect your information, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security."
        }
      ]
    },
    {
      title: "5. Data Retention",
      content: [
        {
          text: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law. When data is no longer needed, we securely delete or anonymize it. Typically, client project data is retained for 3 years after project completion, contact form submissions are retained for 2 years, and website analytics data is retained for 26 months."
        }
      ]
    },
    {
      title: "6. Your Rights",
      content: [
        {
          text: "Depending on your jurisdiction, you may have the following rights regarding your personal data:"
        },
        {
          list: [
            "Right of Access — Request a copy of the personal data we hold about you",
            "Right to Rectification — Request correction of inaccurate or incomplete data",
            "Right to Erasure — Request deletion of your personal data under certain conditions",
            "Right to Restrict Processing — Request limitation of how we process your data",
            "Right to Data Portability — Receive your data in a structured, machine-readable format",
            "Right to Object — Object to processing based on legitimate interests or direct marketing",
            "Right to Withdraw Consent — Withdraw previously given consent at any time"
          ]
        },
        {
          text: "To exercise any of these rights, please contact us at privacy@keymouseit.com. We will respond to your request within 30 days."
        }
      ]
    },
    {
      title: "7. Third-Party Links",
      content: [
        {
          text: "Our website may contain links to third-party websites or services that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. We encourage you to review the privacy policy of every site you visit."
        }
      ]
    },
    {
      title: "8. Children's Privacy",
      content: [
        {
          text: "Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal data, we will take steps to delete such information promptly."
        }
      ]
    },
    {
      title: "9. International Data Transfers",
      content: [
        {
          text: "Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country. We ensure appropriate safeguards are in place to protect your personal data in accordance with this privacy policy, including standard contractual clauses and data processing agreements."
        }
      ]
    },
    {
      title: "10. Changes to This Policy",
      content: [
        {
          text: "We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. When we make material changes, we will notify you by updating the \"Last Updated\" date at the top of this page. We encourage you to review this policy periodically to stay informed about how we are protecting your information."
        }
      ]
    },
    {
      title: "11. Contact Us",
      content: [
        {
          text: "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:"
        },
        {
          text: "KeyMouse IT\nEmail: info@keymouseit.com\nWebsite: keymouseit.com"
        }
      ]
    }
  ];

  return (
    <div style={{ background: "#FAFBFE", minHeight: "100vh" }}>
      {/* Navigation */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid var(--line)", padding: "0 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "var(--text)" }}>
            <Logo height={40} />
          </Link>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: "var(--blue)", textDecoration: "none" }}>
            <Icon name="ArrowLeft" size={16} stroke={2.2} />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Header */}
      <header style={{ background: "linear-gradient(180deg, #EEF2FF 0%, #FAFBFE 100%)", padding: "80px 0 60px", position: "relative", overflow: "hidden" }}>
        {/* Decorative elements */}
        <div style={{ position: "absolute", top: "20%", left: "5%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,255,0.06) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "8%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)", filter: "blur(32px)", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, var(--blue), #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="Shield,ShieldCheck" size={18} stroke={2} color="#fff" />
            </span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--blue)" }}>Legal</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--text)", lineHeight: 1.15, marginBottom: 16 }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: "42em", lineHeight: 1.7, fontWeight: 500 }}>
            Your privacy matters to us. This policy explains how KeyMouse IT collects, uses, protects, and handles your personal information when you use our website and services.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 24, flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--faint)", fontWeight: 600 }}>
              <Icon name="Calendar" size={14} stroke={2} />
              Last Updated: June 2026
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--faint)", fontWeight: 600 }}>
              <Icon name="Clock" size={14} stroke={2} />
              ~8 min read
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={{ padding: "0px 0 100px" }}>
        <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
          {sections.map((section, i) => (
            <div key={i} style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 18, paddingBottom: 12, borderBottom: "1px solid var(--line)" }}>
                {section.title}
              </h2>
              {section.content.map((block, j) => (
                <div key={j} style={{ marginBottom: 16 }}>
                  {block.sub && (
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>{block.sub}</h3>
                  )}
                  {block.text && (
                    <p style={{ fontSize: 15.5, color: "var(--muted)", lineHeight: 1.75, whiteSpace: "pre-line", fontWeight: 450 }}>{block.text}</p>
                  )}
                  {block.list && (
                    <ul style={{ paddingLeft: 24, margin: "12px 0" }}>
                      {block.list.map((item, k) => (
                        <li key={k} style={{ fontSize: 15.5, color: "var(--muted)", lineHeight: 1.75, marginBottom: 6, fontWeight: 450 }}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>

      {/* Minimal Footer */}
      <footer style={{ background: "#070B14", color: "#8A97AC", padding: "32px 0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, fontSize: 14 }}>
          <span>© {new Date().getFullYear()} KeyMouse IT. All rights reserved.</span>
          <div style={{ display: "flex", gap: 24 }}>
            <Link to="/privacy" style={{ color: "#fff", textDecoration: "none", fontWeight: 600 }}>Privacy</Link>
            <Link to="/terms" style={{ color: "#8A97AC", textDecoration: "none" }}>Terms</Link>
            <Link to="/" style={{ color: "#8A97AC", textDecoration: "none" }}>Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
