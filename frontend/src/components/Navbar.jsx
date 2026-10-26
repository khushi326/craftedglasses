import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { customer, isAuthenticated } = useAuth();

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="site-navbar">
      {/* Top vintage announcement ribbon */}
      <div className="top-banner">
        <p>✨ Free Handwritten Wax-Sealed Note with Every Order Above ₹999 ✨</p>
      </div>

      <nav className="nav-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={closeMenu}>
          <img
            src="/assets/cg-logo.png"
            alt="Craftedglasses logo"
            className="brand-logo-img"
          />
          <div className="brand-text-wrap">
            <span className="brand-title">Craftedglasses</span>
            <span className="brand-subtitle">Handmade Keepsakes &amp; Stories</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={({ isActive }) => (isActive ? 'active' : '')}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/custom-gift" className={({ isActive }) => (isActive ? 'active' : '')}>
              Custom Gifts
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* User / Orders Navigation Actions */}
        <div className="nav-actions">
          <Link to="/orders" className="nav-action-link" title="My Orders">
            <span className="action-icon">📦</span>
            <span className="action-label">My Orders</span>
          </Link>

          {isAuthenticated ? (
            <Link to="/orders" className="btn-secondary btn-sm" title="My Account">
              <span>👤</span> {customer?.fullName?.split(' ')[0] || 'My Account'}
            </Link>
          ) : (
            <Link to="/login" className="btn-secondary btn-sm" title="Sign In">
              <span>👤</span> Sign In
            </Link>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-toggle mobile-toggle-container"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <ul className="mobile-nav-links">
            <li>
              <NavLink to="/" onClick={closeMenu}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/shop" onClick={closeMenu}>Shop</NavLink>
            </li>
            <li>
              <NavLink to="/custom-gift" onClick={closeMenu}>Custom Gifts</NavLink>
            </li>
            <li>
              <NavLink to="/orders" onClick={closeMenu}>My Orders</NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={closeMenu}>About Us</NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
            </li>
            <li className="mobile-auth-row">
              {isAuthenticated ? (
                <Link to="/orders" className="btn-primary btn-block btn-sm" onClick={closeMenu}>
                  👤 Account ({customer?.fullName?.split(' ')[0] || 'Customer'})
                </Link>
              ) : (
                <Link to="/login" className="btn-primary btn-block btn-sm" onClick={closeMenu}>
                  Customer Login / Register
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
