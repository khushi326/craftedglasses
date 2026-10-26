import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES, REVIEWS } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Home.css';

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-badge">✦ Handcrafted with Nostalgia & Love</span>
            <h1 className="hero-title">
              Handmade Gifts for <span className="highlight-text">Every Story</span>
            </h1>
            <p className="hero-subtitle">
              Cherish life’s meaningful moments with timeless botanical resin art, vintage handwritten wax-sealed letters, customized memory frames, and bespoke keepsakes crafted by skilled artisans.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="btn-primary">
                Explore Products <span>→</span>
              </Link>
              <Link to="/custom-gift" className="btn-secondary">
                Create a Custom Gift <span>🎁</span>
              </Link>
            </div>
            <div className="hero-perks">
              <div className="perk-item">
                <span className="perk-icon">🌿</span> 100% Real Preserved Botanicals
              </div>
              <div className="perk-item">
                <span className="perk-icon">🖋️</span> Hand-Calligraphed Notes
              </div>
              <div className="perk-item">
                <span className="perk-icon">📦</span> Custom Gift Packaging
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-card main-hero-img">
              <img
                src="/assets/products/bespoke-custom-gift-hamper.png"
                alt="Handcrafted Gift Box"
                className="hero-img"
              />
              <div className="floating-tag tag-top">
                <span className="tag-sparkle">✨</span> Pure Handmade Magic
              </div>
              <div className="floating-tag tag-bottom">
                <span className="tag-star">★ 4.9/5</span> from 1,200+ Storytellers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORIES */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Collections</span>
            <h2>Discover by Category</h2>
            <p>From botanical phone cases to archival love letters, explore our handcrafted collections.</p>
          </div>

          <div className="category-grid">
            {CATEGORIES.filter(c => c.id !== 'all').map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="category-card"
              >
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-title">{category.name}</h3>
                <span className="category-link-text">Browse &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-tag">Curated Pieces</span>
              <h2>Featured Handmade Creations</h2>
              <p>Our most beloved custom keepsakes, handcrafted one at a time.</p>
            </div>
            <Link to="/shop" className="btn-secondary btn-sm">
              View All Products &rarr;
            </Link>
          </div>

          <div className="grid-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Simple & Thoughtful</span>
            <h2>How It Works</h2>
            <p>Bringing your personal stories to life in three easy steps.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-icon">🎁</div>
              <h3>Select a Gift</h3>
              <p>
                Browse our curated collection of botanical phone cases, memory calendars, vintage letters, or choose a bespoke custom hamper.
              </p>
            </div>

            <div className="step-connector">⟶</div>

            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-icon">📸</div>
              <h3>Add Photos & Personalisation</h3>
              <p>
                Share your favorite photos, special dates, custom names, or heartfelt words. Choose your preferred colors, finishes, and wax seals.
              </p>
            </div>

            <div className="step-connector">⟶</div>

            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-icon">✉️</div>
              <h3>Submit Your Order</h3>
              <p>
                Confirm your order details. Our artisans review your customisation and connect with you on WhatsApp for final handcrafted perfection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. REVIEWS SECTION */}
      <section className="reviews-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Heartfelt Words</span>
            <h2>Stories from Our Customers</h2>
            <p>Hear how our handcrafted keepsakes touched the hearts of loved ones across the country.</p>
          </div>

          <div className="grid-3">
            {REVIEWS.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-stars">
                  {'★'.repeat(review.rating)}
                </div>
                <p className="review-text">"{review.comment}"</p>
                <div className="review-author">
                  <img src={review.avatar} alt={review.name} className="review-avatar" />
                  <div>
                    <h4 className="author-name">{review.name}</h4>
                    <span className="author-meta">{review.city} • <span className="review-product">{review.product}</span></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INSTAGRAM SHOWCASE SECTION */}
      <section className="instagram-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Follow Our Journey</span>
            <h2>@craftedglasses on Instagram</h2>
            <p>Behind the scenes, resin pouring, wax seal stamping, and daily studio magic.</p>
          </div>

          <div className="instagram-grid">
            <a href="https://instagram.com/craftedglasses" target="_blank" rel="noreferrer" className="insta-item">
              <img src="/assets/products/pressed-flower-case.jpg" alt="Resin case" />
              <div className="insta-overlay"><span>📷 View Post</span></div>
            </a>
            <a href="https://instagram.com/craftedglasses" target="_blank" rel="noreferrer" className="insta-item">
              <img src="/assets/products/handwritten-wax-sealed-letter.jpg" alt="Wax seal letter" />
              <div className="insta-overlay"><span>📷 View Post</span></div>
            </a>
            <a href="https://instagram.com/craftedglasses" target="_blank" rel="noreferrer" className="insta-item">
              <img src="/assets/products/vintage-wooden-photo-frame.jpg" alt="Wood frame" />
              <div className="insta-overlay"><span>📷 View Post</span></div>
            </a>
            <a href="https://instagram.com/craftedglasses" target="_blank" rel="noreferrer" className="insta-item">
              <img src="/assets/products/beaded-pearl-phone-charm.jpg" alt="Pearl charm" />
              <div className="insta-overlay"><span>📷 View Post</span></div>
            </a>
            <a href="https://instagram.com/craftedglasses" target="_blank" rel="noreferrer" className="insta-item">
              <img src="/assets/products/handcrafted-memory-calendar.jpg" alt="Memory calendar" />
              <div className="insta-overlay"><span>📷 View Post</span></div>
            </a>
          </div>

          <div className="insta-action text-center">
            <a href="https://instagram.com/craftedglasses" target="_blank" rel="noreferrer" className="btn-secondary">
              Follow Us on Instagram &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
