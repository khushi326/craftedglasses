import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getApiBase } from '../services/api';
import './Auth.css';

export default function CustomerLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginCustomer, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Informational banner if redirected (e.g. from Order Form checkout)
  const redirectNotice = location.state?.message || '';

  // If already authenticated, redirect to orders or destination
  useEffect(() => {
    if (isAuthenticated) {
      const destination = location.state?.from || '/orders';
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${getApiBase()}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: formData.identifier,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || 'Invalid email/mobile or password.');
        setIsLoading(false);
        return;
      }

      // Log in customer
      loginCustomer(data.token, data.customer);

      const destination = location.state?.from || '/orders';
      navigate(destination, { replace: true });
    } catch (err) {
      setError('Unable to reach server. Please check your connection and try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page page-wrapper">
      <div className="auth-card-container">
        <div className="auth-card">
          {/* Craftedglasses Branding & Header */}
          <div className="auth-header">
            <Link to="/" className="auth-brand-badge" title="Craftedglasses Home">
              <span className="auth-sparkle">✦</span>
              <span className="auth-brand-name">Craftedglasses</span>
            </Link>
            <h2 className="auth-title">Customer Login</h2>
            <p className="auth-subtitle">
              Sign in to view your personalised keepsakes and order history
            </p>
          </div>

          {/* Checkout Redirection Notice */}
          {redirectNotice && (
            <div className="auth-success-banner" role="status">
              <span>🛍️</span>
              <span>{redirectNotice}</span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="auth-error-banner" role="alert">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="auth-form">
            {/* Email / Mobile Number */}
            <div className="form-group">
              <label className="form-label" htmlFor="identifier">
                Email Address or Mobile Number <span className="required">*</span>
              </label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                className="form-input"
                required
                autoComplete="username"
                placeholder="name@example.com or +91 91564 35456"
                value={formData.identifier}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <div className="label-row">
                <label className="form-label" htmlFor="password">
                  Password <span className="required">*</span>
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('For password resets, our studio team can verify your email/WhatsApp.');
                  }}
                  className="forgot-link"
                >
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn-primary btn-block auth-submit-btn"
              disabled={isLoading}
            >
              <span>{isLoading ? '⏳ Signing in...' : 'Sign In to Your Account →'}</span>
            </button>
          </form>

          {/* Link to Registration */}
          <div className="auth-footer">
            <p>
              New to Craftedglasses?{' '}
              <Link to="/register" className="auth-link">
                Register for an Account &rarr;
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
