import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import {
  Icon,
  Eyebrow,
  Btn,
  Reveal
} from './site-ui';
import { CONTACT_CONFIG } from '../data/site-data';
import {
  buildCalendlyEmbedUrl,
  useCalendlyBookingListener
} from '../utils/calendly';
import { JOURNEY_STEPS, trackJourneyStep } from '../utils/clarity';

const NET_NODES = [
  [80, 90],
  [240, 200],
  [140, 360],
  [330, 470],
  [60, 520],
  [470, 110],
  [620, 300],
  [560, 520],
  [780, 180],
  [900, 420],
  [1050, 120],
  [1140, 340],
  [1010, 540],
  [380, 80],
  [720, 60]
];

const NET_EDGES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [2, 4],
  [1, 5],
  [5, 6],
  [6, 7],
  [3, 7],
  [5, 8],
  [8, 9],
  [8, 10],
  [9, 11],
  [9, 12],
  [10, 11],
  [13, 5],
  [14, 8],
  [6, 9]
];

function NetworkBg() {
  return (
    <svg
      viewBox="0 0 1200 600"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.5,
        pointerEvents: 'none'
      }}
    >
      {NET_EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={NET_NODES[a][0]}
          y1={NET_NODES[a][1]}
          x2={NET_NODES[b][0]}
          y2={NET_NODES[b][1]}
          stroke="rgba(111,160,255,0.18)"
          strokeWidth="1"
        />
      ))}

      {NET_NODES.map(([x, y], i) => (
        <circle
          key={i}
          className="net-node"
          cx={x}
          cy={y}
          r={i % 4 === 0 ? 4 : 2.5}
          fill={
            i % 4 === 0
              ? '#6FA0FF'
              : 'rgba(111,160,255,0.5)'
          }
          style={{
            animationDelay: `${(i % 6) * 0.5}s`,
            transformBox: 'fill-box',
            transformOrigin: 'center'
          }}
        />
      ))}
    </svg>
  );
}

export default function FinalCTAV2() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    challenge: '',
    budget: '',
    timeline: ''
  });

  const [captchaToken, setCaptchaToken] =
    useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] =
    useState(false);

  const [sent, setSent] = useState(false);

  useCalendlyBookingListener(formData, sent);

  const DISALLOWED_DOMAINS = [
    'mailinator.com',
    'yopmail.com',
    'tempmail.com',
    'dispostable.com',
    'trashmail.com',
    'guerrillamail.com',
    'mailinator2.com'
  ];

  const submit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setErrorMsg('');

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.company.trim()
    ) {
      setErrorMsg('Name, email, and company are required.');
      return;
    }

    const emailLower = formData.email
      .trim()
      .toLowerCase();

    const domain = emailLower.split('@')[1];

    if (!domain) {
      setErrorMsg(
        'Please enter a valid email address.'
      );
      return;
    }

    const isDisposable =
      DISALLOWED_DOMAINS.some((disallowed) =>
        domain.includes(disallowed)
      );

    if (isDisposable) {
      setErrorMsg(
        'Disposable or temporary emails are not allowed. Please use a work email.'
      );
      return;
    }

    // CAPTCHA validation
    if (!captchaToken) {
      setErrorMsg(
        'Please complete the captcha verification.'
      );
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(
        '/.netlify/functions/submit-lead',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            ...formData,
            captchaToken
          })
        }
      );

      const result = await res.json();

      if (result && result.success) {
        trackJourneyStep(JOURNEY_STEPS.LEAD_FORM_SUBMITTED, {
          company: formData.company,
          budget: formData.budget,
          timeline: formData.timeline
        });
        setSent(true);
      } else {
        setErrorMsg(
          result.message ||
            'Failed to submit. Please try again.'
        );
      }
    } catch (err) {
      console.error(
        'Error submitting contact form:',
        err
      );

      setErrorMsg(
        'Connection error. Please try again later.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const notes = [
    ['CircleCheck,CheckCircle', 'Free consultation'],
    ['Lock', 'No commitment'],
    ['Sparkles', 'Expert guidance'],
    ['Zap', 'Quick response']
  ];

  return (
    <section
      className="section ink cta-pad"
      id="contact"
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 130,
        paddingBottom: 130
      }}
    >
      <NetworkBg />

      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 700,
          height: 400,
          background:
            'radial-gradient(circle, rgba(37,99,255,0.22), transparent 68%)',
          pointerEvents: 'none'
        }}
      />

      <div
        className="container"
        style={{ position: 'relative' }}
      >
        <div
          className="v2-hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.04fr',
            gap: 72,
            alignItems: 'center'
          }}
        >
          <Reveal>
            <Eyebrow>Let's talk</Eyebrow>

            <h2
              style={{
                marginTop: 18,
                fontSize:
                  'clamp(44px, 5.6vw, 76px)',
                lineHeight: 1.0,
                fontWeight: 800,
                letterSpacing: '-0.04em',
                color: '#fff'
              }}
            >
              Let's build
              <br />
              what's{' '}
              <span
                className="grad-text"
                style={{
                  backgroundImage:
                    'linear-gradient(110deg,#6FA0FF,#B98CFF)'
                }}
              >
                next.
              </span>
            </h2>

            <p
              className="lead"
              style={{
                marginTop: 24,
                fontSize: 19,
                color: '#B9C6D9',
                maxWidth: '26em'
              }}
            >
              Share your goals and challenges.
              We'll review your requirements and
              recommend the best path forward.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px 28px',
                marginTop: 30
              }}
            >
              {notes.map(([ic, t]) => (
                <div
                  key={t}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 9
                  }}
                >
                  <span style={{ color: '#6FA0FF' }}>
                    <Icon
                      name={ic}
                      size={18}
                      stroke={2}
                    />
                  </span>

                  <span
                    style={{
                      fontSize: 15,
                      color: '#C7D2E0',
                      fontWeight: 500
                    }}
                  >
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div
              className="card"
              style={{
                background:
                  'rgba(255,255,255,0.04)',
                border:
                  '1px solid rgba(255,255,255,0.13)',
                borderRadius: 22,
                padding: 34,
                boxShadow: 'var(--sh-xl)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter:
                  'blur(12px)'
              }}
            >
              {sent ? (
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      marginBottom: 20
                    }}
                  >
                    <span
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        background:
                          'rgba(22,163,74,0.16)',
                        border:
                          '1px solid rgba(22,163,74,0.4)',
                        color: '#4ADE80',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon
                        name="Check"
                        size={15}
                        stroke={2.6}
                      />
                    </span>

                    <span
                      style={{
                        color: '#fff',
                        fontSize: 16,
                        fontWeight: 600
                      }}
                    >
                      Inquiry sent! Now lock in
                      your time slot below:
                    </span>
                  </div>

                  <div
                    style={{
                      width: '100%',
                      height: 550,
                      borderRadius: 14,
                      overflow: 'hidden',
                      background: '#fff',
                      boxShadow:
                        '0 8px 30px rgba(0,0,0,0.12)'
                    }}
                  >
                    <iframe
                      src={buildCalendlyEmbedUrl({
                        name: formData.name,
                        email: formData.email
                      })}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      title="Schedule Strategy Call"
                    />
                  </div>
                </div>
              ) : (
                <form onSubmit={submit}>
                  {errorMsg && (
                    <div
                      style={{
                        color: '#F87171',
                        backgroundColor:
                          'rgba(239,68,68,0.1)',
                        border:
                          '1px solid rgba(239,68,68,0.25)',
                        borderRadius: 12,
                        padding: '12px 16px',
                        marginBottom: 20,
                        fontSize: 14.5,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        lineHeight: 1.5
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          flexShrink: 0,
                          marginTop: 2,
                          color: '#EF4444'
                        }}
                      >
                        <Icon
                          name="AlertCircle"
                          size={16}
                          stroke={2.5}
                        />
                      </span>

                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div
                    className="form-grid"
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        '1fr 1fr',
                      gap: 16
                    }}
                  >
                    <div className="field">
                      <label>
                        Name <span className="required-mark" aria-hidden="true">*</span>
                      </label>

                      <input
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value
                          })
                        }
                        placeholder="Your name"
                      />
                    </div>

                    <div className="field">
                      <label>
                        Work email <span className="required-mark" aria-hidden="true">*</span>
                      </label>

                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value
                          })
                        }
                        placeholder="you@company.com"
                      />
                    </div>

                    <div
                      className="field"
                      style={{
                        gridColumn: '1 / -1'
                      }}
                    >
                      <label>
                        Company <span className="required-mark" aria-hidden="true">*</span>
                      </label>

                      <input
                        required
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            company:
                              e.target.value
                          })
                        }
                        placeholder="Company name"
                      />
                    </div>

                    <div
                      className="field"
                      style={{
                        gridColumn: '1 / -1'
                      }}
                    >
                      <label>
                        Project challenge
                      </label>

                      <textarea
                        rows="3"
                        value={formData.challenge}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            challenge:
                              e.target.value
                          })
                        }
                        placeholder="What operational problem are you trying to solve?"
                      />
                    </div>

                    <div className="field">
                      <label>Budget range</label>

                      <select
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            budget:
                              e.target.value
                          })
                        }
                      >
                        <option value="">
                          Select range
                        </option>

                        <option>
                          {'< $25k'}
                        </option>

                        <option>
                          $25k – $75k
                        </option>

                        <option>
                          $75k – $200k
                        </option>

                        <option>$200k+</option>
                      </select>
                    </div>

                    <div className="field">
                      <label>Timeline</label>

                      <select
                        value={formData.timeline}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            timeline:
                              e.target.value
                          })
                        }
                      >
                        <option value="">
                          Select timeline
                        </option>

                        <option>ASAP</option>

                        <option>
                          1–3 months
                        </option>

                        <option>
                          3–6 months
                        </option>

                        <option>
                          Exploring
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Google reCAPTCHA */}
                  <div
                    style={{
                      marginTop: 22,
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <ReCAPTCHA
                      sitekey={CONTACT_CONFIG.recaptchaSiteKey}
                      onChange={(token) => {
                        setCaptchaToken(token || '');
                      }}
                      theme="dark"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                    style={{ marginTop: 22 }}
                    disabled={submitting}
                  >
                    {submitting
                      ? 'Sending Inquiry...'
                      : 'Book Strategy Call'}
                  </button>

                  <p
                    style={{
                      fontSize: 12.5,
                      color: '#6B7689',
                      textAlign: 'center',
                      marginTop: 14
                    }}
                  >
                    Free consultation · No
                    commitment · Quick response
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}