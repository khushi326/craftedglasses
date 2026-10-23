import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { getApiBase } from '../services/api';
import './AdminLogin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated as admin, redirect to admin dashboard
  useEffect(() => {
    const existingToken = localStorage.getItem('craftedglasses_admin_token');
    if (existingToken) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${getApiBase()}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || 'Invalid admin username or password');
        setIsLoading(false);
        return;
      }

      // Store authenticated admin session securely in localStorage
      localStorage.setItem('craftedglasses_admin_token', data.token);
      localStorage.setItem('craftedglasses_admin_user', JSON.stringify(data.admin));

      // Redirect to intended route or admin dashboard
      const destination = location.state?.from?.pathname || '/admin';
      navigate(destination, { replace: true });
    } catch (err) {
      setError('Unable to connect to backend server. Please verify backend is running.');
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-page page-wrapper">
      <div className="admin-login-container">
        <div className="admin-login-card">
          {/* Admin Header */}
          <div className="admin-card-header">
            <div className="admin-logo-mark">
              <span>✦</span>
            </div>
            <span className="admin-portal-tag">Craftedglasses Administration</span>
            <h1 className="admin-login-title">Admin Portal</h1>
            <p className="admin-login-subtitle">
              Sign in with your administrative credentials to manage products, categories, and customer orders.
            </p>
          </div>

          {/* Error Message Banner */}
          {error && (
            <div className="admin-error-banner" role="alert">
              <span className="error-icon">⚠️</span>
              <span className="error-text">{error}</span>
            </div>
          )}

          {/* Admin Login Form */}
          <form onSubmit={handleAdminLogin} className="admin-form">
            <div className="form-group">
              <label className="form-label" htmlFor="adminUsername">
                Admin Username <span className="required">*</span>
              </label>
              <input
                type="text"
                id="adminUsername"
                name="username"
                className="form-input"
                required
                autoComplete="username"
                placeholder="Enter admin username"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="adminPassword">
                Password <span className="required">*</span>
              </label>
              <input
                type="password"
                id="adminPassword"
                name="password"
                className="form-input"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className="btn-primary btn-block admin-submit-btn"
              disabled={isLoading}
            >
              <span>{isLoading ? '⏳' : '🔐'}</span>{' '}
              {isLoading ? 'Authenticating...' : 'Login to Dashboard'}
            </button>
          </form>

          {/* Security & Access Restriction Notice */}
          <div className="admin-security-footer">
            <p className="security-notice">
              🔒 <strong>Restricted Access:</strong> This portal is reserved solely for authorized Craftedglasses studio administrators. Public registration is not permitted.
            </p>
            <div className="admin-back-link">
              <Link to="/">&larr; Return to Customer Storefront</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
