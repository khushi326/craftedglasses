import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container footer-grid">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <img
                src="/assets/cg-logo.png"
                alt="Craftedglasses Logo"
                className="footer-logo-img"
              />
              <span className="footer-brand-title">Craftedglasses</span>
            </Link>
            <p className="footer-tagline">
              Handmade gifts, bespoke keepsakes, and pressed botanical art crafted with love, nostalgia, and authentic care for every story.
            </p>
            <div className="social-links">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                title="Follow us on Instagram"
              >
                <span>📷</span> Instagram
              </a>
              <a
                href="https://wa.me"
                target="_blank"
                rel="noreferrer"
                className="social-btn whatsapp-btn"
                title="Chat with us on WhatsApp"
              >
                <span>💬</span> WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-menu">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop Collection</Link></li>
              <li><Link to="/custom-gift">Create a Custom Gift</Link></li>
              <li><Link to="/orders">Track My Order</Link></li>
              <li><Link to="/about">Our Story & Craft</Link></li>
              <li><Link to="/contact">Contact & FAQs</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-col">
            <h4>Collections</h4>
            <ul className="footer-menu">
              <li><Link to="/shop">Pressed Flower Phone Cases</Link></li>
              <li><Link to="/shop">Vintage Memory Frames</Link></li>
              <li><Link to="/shop">Wax-Sealed Handwritten Letters</Link></li>
              <li><Link to="/shop">Pearl & Gem Phone Charms</Link></li>
              <li><Link to="/shop">12-Month Desk Calendars</Link></li>
              <li><Link to="/custom-gift">Bespoke Story Hampers</Link></li>
            </ul>
          </div>

          {/* Studio & Contact Information */}
          <div className="footer-col">
            <h4>Studio & Support</h4>
            <p className="studio-info">
              📍 <strong>Handmade Studio</strong><br />
              Artisan Craft Workshop, New Delhi & Mumbai, India
            </p>
            <p className="studio-info">
              ✉️ <strong>Email:</strong> care@craftedglasses.com<br />
              📞 <strong>WhatsApp:</strong> +91 91564 35456
            </p>
            <p className="response-badge">
              🌿 Orders lovingly hand-crafted in 3-5 business days.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} Craftedglasses. All rights reserved. Handcrafted with heart.</p>
            <div className="legal-links">
              <Link to="/contact">Privacy Policy</Link>
              <span className="dot">•</span>
              <Link to="/contact">Terms & Conditions</Link>
              <span className="dot">•</span>
              <Link to="/contact">Shipping & Returns</Link>
              <span className="dot">•</span>
              <Link to="/admin/login">Admin Portal</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
