import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Logo } from './site-ui';

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Terms of Service — KeyMouse IT";
  }, []);

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: [
        {
          text: "By accessing or using the KeyMouse IT website (keymouseit.com) and any associated services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, you must not access or use our website or services."
        },
        {
          text: "These terms apply to all visitors, users, clients, and any other persons who access or use our services. We reserve the right to update or modify these terms at any time without prior notice. Your continued use of the website after any changes constitutes your acceptance of the revised terms."
        }
      ]
    },
    {
      title: "2. Description of Services",
      content: [
        {
          text: "KeyMouse IT provides custom software development, AI-powered operational systems, enterprise platforms, workflow automation, and related technology consulting services. Our services include but are not limited to:"
        },
        {
          list: [
            "Custom software design, development, and deployment",
            "AI and machine learning solution architecture and implementation",
            "Enterprise platform development and integration",
            "Cloud infrastructure setup, migration, and management",
            "UI/UX design and product strategy consulting",
            "Quality assurance, testing, and security auditing",
            "Ongoing maintenance, support, and optimization services"
          ]
        },
        {
          text: "Specific deliverables, timelines, and pricing for client projects are defined in separate Statements of Work (SOWs) or service agreements executed between KeyMouse IT and the client."
        }
      ]
    },
    {
      title: "3. Client Responsibilities",
      content: [
        {
          text: "When engaging our services, clients agree to the following responsibilities:"
        },
        {
          list: [
            "Provide accurate, complete, and timely information necessary for project execution",
            "Designate an authorized point of contact for project communications and approvals",
            "Review and provide feedback on deliverables within agreed-upon timeframes",
            "Ensure that all content, data, and materials provided to us do not infringe on third-party rights",
            "Maintain the confidentiality of any credentials, access tokens, or sensitive information shared during the engagement",
            "Make payments in accordance with the agreed payment schedule"
          ]
        }
      ]
    },
    {
      title: "4. Intellectual Property",
      content: [
        {
          sub: "4.1 Our Intellectual Property",
          text: "All content on the KeyMouse IT website — including text, graphics, logos, icons, images, code, and design — is the property of KeyMouse IT and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any of our content without our express written permission."
        },
        {
          sub: "4.2 Client Project IP",
          text: "Unless otherwise specified in a separate agreement, upon full payment for services rendered, the client receives full ownership rights to the custom code, designs, and deliverables created specifically for their project. KeyMouse IT retains the right to use general methodologies, frameworks, tools, and know-how developed during the engagement for future projects."
        },
        {
          sub: "4.3 Open Source & Third-Party Components",
          text: "Our solutions may incorporate open-source software or third-party libraries, which remain subject to their respective licenses. We will identify and document any such components used in your project."
        }
      ]
    },
    {
      title: "5. Payment Terms",
      content: [
        {
          text: "Payment terms are specified in individual project agreements and Statements of Work. General payment policies include:"
        },
        {
          list: [
            "All fees are quoted in the currency specified in the project agreement",
            "A deposit or advance payment may be required before project commencement",
            "Milestone-based payments are due upon delivery and approval of corresponding deliverables",
            "Invoices are payable within 15 business days of the invoice date unless otherwise agreed",
            "Late payments may incur interest charges at a rate of 1.5% per month on the outstanding balance",
            "KeyMouse IT reserves the right to pause or suspend work on a project if payments are significantly overdue"
          ]
        }
      ]
    },
    {
      title: "6. Confidentiality",
      content: [
        {
          text: "Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of the engagement. This includes, but is not limited to, business strategies, technical specifications, source code, customer data, and financial information."
        },
        {
          text: "Confidentiality obligations survive the termination of any agreement for a period of two (2) years, unless the information becomes publicly available through no fault of the receiving party, or disclosure is required by law."
        }
      ]
    },
    {
      title: "7. Warranties & Disclaimers",
      content: [
        {
          sub: "7.1 Service Warranty",
          text: "KeyMouse IT warrants that services will be performed in a professional and workmanlike manner consistent with industry standards. If any deliverable does not materially conform to the agreed specifications, we will, at our option, re-perform the deficient services or refund the fees attributable to such services."
        },
        {
          sub: "7.2 Website Disclaimer",
          text: "The information provided on our website is for general informational purposes only. While we strive to keep the information accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information contained on it."
        },
        {
          sub: "7.3 No Guarantee of Results",
          text: "While we design solutions to achieve specific business outcomes, we do not guarantee any particular results, revenue increases, cost savings, or performance metrics unless explicitly stated in a project agreement."
        }
      ]
    },
    {
      title: "8. Limitation of Liability",
      content: [
        {
          text: "To the maximum extent permitted by applicable law, KeyMouse IT shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, business opportunities, or goodwill, arising out of or in connection with our services or website."
        },
        {
          text: "Our total liability for any claim arising out of or relating to our services shall not exceed the total amount of fees paid by the client for the specific services giving rise to the claim during the twelve (12) months preceding the claim."
        }
      ]
    },
    {
      title: "9. Termination",
      content: [
        {
          text: "Either party may terminate a service engagement by providing written notice as specified in the applicable project agreement. Upon termination:"
        },
        {
          list: [
            "The client shall pay for all services rendered and expenses incurred up to the effective date of termination",
            "KeyMouse IT will deliver all completed work and work-in-progress to the client",
            "Both parties shall return or destroy any confidential information belonging to the other party",
            "Sections relating to intellectual property, confidentiality, limitation of liability, and governing law shall survive termination"
          ]
        }
      ]
    },
    {
      title: "10. Indemnification",
      content: [
        {
          text: "You agree to indemnify, defend, and hold harmless KeyMouse IT, its officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or related to your violation of these terms, your use of our services, or any content or materials you provide to us that infringes on the rights of a third party."
        }
      ]
    },
    {
      title: "11. Force Majeure",
      content: [
        {
          text: "Neither party shall be liable for any failure or delay in performing its obligations where such failure or delay results from circumstances beyond the reasonable control of that party, including but not limited to natural disasters, acts of government, power failures, internet disruptions, pandemics, or cyberattacks."
        }
      ]
    },
    {
      title: "12. Governing Law & Dispute Resolution",
      content: [
        {
          text: "These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall first be attempted to be resolved through good faith negotiation. If negotiation fails, disputes shall be submitted to binding arbitration in accordance with applicable arbitration rules, with the seat of arbitration being in India."
        }
      ]
    },
    {
      title: "13. Severability",
      content: [
        {
          text: "If any provision of these Terms is found to be unlawful, void, or unenforceable, that provision shall be deemed severable from these Terms and shall not affect the validity and enforceability of the remaining provisions."
        }
      ]
    },
    {
      title: "14. Entire Agreement",
      content: [
        {
          text: "These Terms of Service, together with our Privacy Policy and any applicable project agreements or SOWs, constitute the entire agreement between you and KeyMouse IT regarding the use of our website and services, and supersede all prior agreements, understandings, and communications."
        }
      ]
    },
    {
      title: "15. Contact Information",
      content: [
        {
          text: "If you have any questions about these Terms of Service, please contact us:"
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
        <div style={{ position: "absolute", top: "20%", right: "5%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,255,0.06) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "8%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)", filter: "blur(32px)", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, var(--blue), #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="FileText,File" size={18} stroke={2} color="#fff" />
            </span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--blue)" }}>Legal</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--text)", lineHeight: 1.15, marginBottom: 16 }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: "42em", lineHeight: 1.7, fontWeight: 500 }}>
            These terms govern your use of KeyMouse IT&apos;s website and services. Please read them carefully before engaging with us.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 24, flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--faint)", fontWeight: 600 }}>
              <Icon name="Calendar" size={14} stroke={2} />
              Effective: June 2026
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--faint)", fontWeight: 600 }}>
              <Icon name="Clock" size={14} stroke={2} />
              ~10 min read
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
            <Link to="/privacy" style={{ color: "#8A97AC", textDecoration: "none" }}>Privacy</Link>
            <Link to="/terms" style={{ color: "#fff", textDecoration: "none", fontWeight: 600 }}>Terms</Link>
            <Link to="/" style={{ color: "#8A97AC", textDecoration: "none" }}>Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
