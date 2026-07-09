import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Logo, Reveal, Eyebrow } from './site-ui';
import Footer from './Footer';
import {
  FEATURED_TESTIMONIALS,
  SORTED_TESTIMONIALS,
  TESTIMONIAL_CATEGORIES,
} from '../data/testimonials';
import './testimonials.css';

const CATEGORY_LABELS = Object.fromEntries(
  TESTIMONIAL_CATEGORIES.filter((c) => c.id !== 'all').map((c) => [c.id, c.label])
);

function Stars({ rating = 5, size = 13 }) {
  return (
    <span className="t-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={i < Math.round(rating) ? '#F59E0B' : '#E2E8F0'}
        >
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.26l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

function TestimonialCard({ item }) {
  return (
    <article className="t-card">
      <div className="t-card-head">
        <Stars rating={item.rating} />
        <span className="t-card-badge">{CATEGORY_LABELS[item.category]}</span>
      </div>
      <blockquote className="t-card-quote">“{item.quote}”</blockquote>
      <div className="t-card-foot">
        <div className="t-card-project">{item.project}</div>
        <div className="t-card-date">{item.dateRange}</div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return SORTED_TESTIMONIALS;
    return SORTED_TESTIMONIALS.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  const fiveStarCount = SORTED_TESTIMONIALS.filter((t) => t.rating === 5).length;

  return (
    <div className="testimonials-page">
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Logo height={40} />
          </Link>
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: 'var(--blue)', textDecoration: 'none' }}
          >
            <Icon name="ArrowLeft" size={16} stroke={2.2} />
            Back to Home
          </Link>
        </div>
      </nav>

      <header className="t-hero">
        <div className="grid-lines" aria-hidden="true" />
        <div className="container t-hero-inner">
          <Eyebrow>Client testimonials</Eyebrow>
          <h1>
            Trusted by teams{' '}
            <span className="grad-text">worldwide</span>
          </h1>
          <p className="t-hero-lead">
            Real client feedback from mobile, web, QA, and design projects — built by the KeyMouse IT team since 2018.
          </p>
          <div className="t-stats">
            <div className="t-stat">
              <strong>{SORTED_TESTIMONIALS.length}+</strong>
              <span>reviews</span>
            </div>
            <div className="t-stat">
              <strong>{fiveStarCount}</strong>
              <span>five-star</span>
            </div>
            <div className="t-stat">
              <strong>Since 2018</strong>
              <span>delivering</span>
            </div>
          </div>
        </div>
      </header>

      <main style={{ padding: '48px 0 80px' }}>
        <div className="container" style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="t-grid t-grid--featured">
            {FEATURED_TESTIMONIALS.slice(0, 3).map((item, i) => (
              <Reveal key={item.id} delay={i * 60} style={{ height: '100%' }}>
                <TestimonialCard item={item} />
              </Reveal>
            ))}
          </div>

          <div className="t-toolbar">
            <div>
              <h2>All client reviews</h2>
              <span className="t-toolbar-count">{filtered.length} testimonials</span>
            </div>
            <div className="t-filters">
              {TESTIMONIAL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`t-filter${activeCategory === cat.id ? ' is-active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="t-grid">
            {filtered.map((item, i) => (
              <Reveal key={item.id} delay={(i % 9) * 50} style={{ height: '100%' }}>
                <TestimonialCard item={item} />
              </Reveal>
            ))}
          </div>

          <section className="t-cta">
            <h2>Ready to work with our team?</h2>
            <p>Book a free strategy call and tell us about your product or operational challenge.</p>
            <Link to="/#contact" className="btn btn-primary btn-shimmer" style={{ textDecoration: 'none' }}>
              Book Strategy Call <Icon name="ArrowRight" size={16} stroke={2.2} color="#fff" />
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
