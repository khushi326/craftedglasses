import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  return (
    <div className="about-page page-wrapper">
      <header className="page-header">
        <div className="container">
          <span className="page-tag">Our Heritage & Craft</span>
          <h1>The Story Behind Craftedglasses</h1>
          <p>
            Where authentic human emotion, vintage nostalgia, and mindful artisanal craftsmanship meet.
          </p>
        </div>
      </header>

      <main className="container about-container">
        {/* Brand Story Section */}
        <section className="about-section brand-intro-section">
          <div className="about-grid">
            <div className="about-text-col">
              <span className="section-tag">Brand Philosophy</span>
              <h2>Preserving Emotions in a Digital World</h2>
              <p>
                In an era of instant messages and mass-produced commodities, <strong>Craftedglasses</strong> was born out of a yearning for permanence, touch, and heartfelt intention. We believe that true gifts aren’t merely objects—they are physical vessels holding your most precious stories, unspoken gratitude, and cherished memories.
              </p>
              <p>
                From hand-pressed botanicals sealed in glossy crystal resin to authentic deckle-edged letters hand-inked with dip pens and sealed with genuine hot wax stamps, each piece in our studio is created one at a time.
              </p>
            </div>
            <div className="about-image-col">
              <div className="image-frame">
                <img
                  src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80"
                  alt="Wax seal and calligraphy craft"
                />
              </div>
            </div>
          </div>
        </section>

        {/* The Handmade Process */}
        <section className="about-section process-section">
          <div className="section-header text-center">
            <span className="section-tag">Behind the Scenes</span>
            <h2>Our Slow, Intentional Process</h2>
            <p>Every keepsake takes days of patient care, botanical foraging, and handcrafting.</p>
          </div>

          <div className="process-cards-grid">
            <div className="process-card">
              <span className="process-step">01</span>
              <div className="process-icon">🌸</div>
              <h3>Botanical Foraging & Drying</h3>
              <p>
                We carefully forage real rose petals, baby's breath, and fern leaves, drying them in traditional presses for over two weeks to preserve vibrant natural colors.
              </p>
            </div>

            <div className="process-card">
              <span className="process-step">02</span>
              <div className="process-icon">✒️</div>
              <h3>Dip-Pen Calligraphy & Lettering</h3>
              <p>
                Each custom name, date, and letter is hand-lettered using archival inks and dip pens on textured cotton rag deckle-edged paper.
              </p>
            </div>

            <div className="process-card">
              <span className="process-step">03</span>
              <div className="process-icon">✨</div>
              <h3>Hand-Poured Resin & Assembly</h3>
              <p>
                High-grade, bubble-free bio resin is hand-poured in micro-layers, embedding florals, gold foil, and personalized photos with flawless clarity.
              </p>
            </div>

            <div className="process-card">
              <span className="process-step">04</span>
              <div className="process-icon">🕯️</div>
              <h3>Wax-Sealed Luxury Packaging</h3>
              <p>
                Before dispatch, every order is enveloped in vintage tissue, tied with botanical jute ribbon, and sealed with an authentic hot metallic wax stamp.
              </p>
            </div>
          </div>
        </section>

        {/* Personalisation Concept */}
        <section className="about-section personalisation-concept-section">
          <div className="about-grid reverse-grid">
            <div className="about-image-col">
              <div className="image-frame">
                <img
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
                  alt="Handmade memory frame"
                />
              </div>
            </div>
            <div className="about-text-col">
              <span className="section-tag">The Personalisation Concept</span>
              <h2>No Two Pieces are Ever Identical</h2>
              <p>
                Because no two love stories or friendships are the same, every order at Craftedglasses begins with a clean slate. You share your memories, quotes, and themes, and our artisans tailor every color hue, arrangement, and letter to match your emotional story.
              </p>
              <div className="quote-box">
                <p>
                  "We don't manufacture inventory in bulk. We craft one keepsake, for one person, with all our love."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Values */}
        <section className="about-section values-section">
          <div className="section-header text-center">
            <span className="section-tag">What Guides Us</span>
            <h2>Our Core Values</h2>
          </div>

          <div className="grid-3 values-grid">
            <div className="value-card">
              <span className="value-icon">❤️</span>
              <h3>Human Over Automated</h3>
              <p>
                We prioritize slow, thoughtful craftsmanship over mechanized mass production. Every stroke of ink and resin pour is done by real human hands.
              </p>
            </div>

            <div className="value-card">
              <span className="value-icon">🌿</span>
              <h3>Natural & Sustainable</h3>
              <p>
                We use sustainably sourced reclaimed woods, biodegradable botanical florals, eco-friendly cotton papers, and plastic-free gift wrapping.
              </p>
            </div>

            <div className="value-card">
              <span className="value-icon">🤝</span>
              <h3>Collaborative Care</h3>
              <p>
                We treat every customer as a co-creator. Through WhatsApp previews, we ensure you are 100% in love with your gift before it leaves our studio.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="about-cta-section text-center">
          <h2>Ready to Create a Meaningful Keepsake?</h2>
          <p>Explore our handcrafted catalog or request a bespoke custom gift box today.</p>
          <div className="cta-btn-row">
            <Link to="/shop" className="btn-primary">Explore Products</Link>
            <Link to="/custom-gift" className="btn-rose">Create Custom Gift</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
