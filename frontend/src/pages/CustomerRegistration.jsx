import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getApiBase } from '../services/api';
import './Auth.css';

export default function CustomerRegistration() {
  const navigate = useNavigate();
  const { loginCustomer } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${getApiBase()}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || 'Registration failed. Please check your information.');
        setIsLoading(false);
        return;
      }

      // Automatically log the customer in
      loginCustomer(data.token, data.customer);
      navigate('/orders', { replace: true });
    } catch (err) {
      setError('Unable to reach server. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page page-wrapper">
      <div className="auth-card-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Join Craftedglasses to personalize keepsakes and track orders</p>
          </div>

          {error && (
            <div className="auth-error-banner" role="alert">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="auth-form">
            {/* Full Name */}
            <div className="modern-form-group">
              <label className="modern-label" htmlFor="fullName">
                FULL NAME <span className="label-required">*</span>
              </label>
              <div className="input-with-icon">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="modern-input"
                  required
                  placeholder="Khushi"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="modern-form-group">
              <label className="modern-label" htmlFor="email">
                EMAIL ADDRESS <span className="label-required">*</span>
              </label>
              <div className="input-with-icon">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="modern-input"
                  required
                  placeholder="khushi@test.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* WhatsApp / Mobile */}
            <div className="modern-form-group">
              <label className="modern-label" htmlFor="mobile">
                WHATSAPP / MOBILE NUMBER <span className="label-required">*</span>
              </label>
              <div className="input-with-icon">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  className="modern-input"
                  required
                  placeholder="+91 91564 35456"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div className="modern-form-group">
              <label className="modern-label" htmlFor="password">
                PASSWORD <span className="label-required">*</span>
              </label>
              <div className="input-with-icon">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="7.5" cy="15.5" r="4.5" />
                    <path d="m21 3-9.5 9.5" />
                    <path d="m15.5 7.5 3 3" />
                    <path d="m18 5 2 2" />
                  </svg>
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="modern-input"
                  required
                  placeholder="Min 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="modern-form-group">
              <label className="modern-label" htmlFor="confirmPassword">
                CONFIRM PASSWORD <span className="label-required">*</span>
              </label>
              <div className="input-with-icon">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="7.5" cy="15.5" r="4.5" />
                    <path d="m21 3-9.5 9.5" />
                    <path d="m15.5 7.5 3 3" />
                    <path d="m18 5 2 2" />
                  </svg>
                </span>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="modern-input"
                  required
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="modern-submit-btn" disabled={isLoading}>
              <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
            </button>
          </form>

          {/* Footer Link */}
          <div className="modern-auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="modern-signup-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
