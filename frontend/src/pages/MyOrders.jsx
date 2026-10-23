import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MOCK_ORDERS } from '../data/products';
import { getApiBase } from '../services/api';
import './MyOrders.css';

export default function MyOrders() {
  const navigate = useNavigate();
  const location = useLocation();
  const { customer, customerToken, isAuthenticated, logoutCustomer, updateCustomerProfile } = useAuth();

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(customer || {
    fullName: 'Khushi',
    email: 'khushi@test.com',
    mobile: '+91 91564 35456',
    address: '124 Rose Garden Lane, Heritage Enclave, Jaipur, Rajasthan - 302001',
    createdAt: new Date().toISOString(),
  });

  // Redirect unauthenticated customers to login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', {
        replace: true,
        state: {
          from: location,
          message: 'Please sign in to view your profile and orders.',
        },
      });
    }
  }, [isAuthenticated, navigate, location]);

  // Load customer profile and customer's own orders
  useEffect(() => {
    if (!customerToken) return;

    let isMounted = true;

    const fetchCustomerData = async () => {
      try {
        // Fetch current profile
        const profRes = await fetch(`${getApiBase()}/auth/me`, {
          headers: { Authorization: `Bearer ${customerToken}` },
        });
        const profData = await profRes.json();
        if (isMounted && profRes.ok && profData.success) {
          setProfile(profData.customer);
          updateCustomerProfile(profData.customer);
        }

        // Fetch customer's own orders (strictly isolated by customer ID on backend)
        const orderRes = await fetch(`${getApiBase()}/orders/my-orders`, {
          headers: { Authorization: `Bearer ${customerToken}` },
        });
        const orderData = await orderRes.json();

        if (isMounted && orderRes.ok && orderData.success) {
          // Format backend orders for UI display
          const formattedOrders = orderData.orders.map((o) => {
            const statusSlug = (o.status || 'New').toLowerCase();
            return {
              id: o.orderId || o._id,
              productName: o.product?.name || 'Personalised Keepsake',
              price: o.product?.price || 899,
              status: o.status || 'New',
              statusClass: `status-${statusSlug}`,
              orderDate: new Date(o.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              }),
              image: o.product?.image || 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=400&q=80',
              customisationSummary: Object.entries(o.customisation || {})
                .map(([k, v]) => `${k}: ${v}`)
                .join(', ') || 'Handcrafted bespoke order',
            };
          });

          // If customer has placed orders, show them; otherwise show empty state
          setOrders(formattedOrders);
        }
      } catch (err) {
        // Fallback to sample orders if backend is unreachable
        if (isMounted) {
          setOrders(MOCK_ORDERS);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchCustomerData();

    return () => {
      isMounted = false;
    };
  }, [customerToken]);

  const handleLogout = () => {
    logoutCustomer();
    navigate('/login', { replace: true });
  };

  const memberYear = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : '2026';

  return (
    <div className="my-orders-page page-wrapper">
      <header className="page-header">
        <div className="container">
          <span className="page-tag">Customer Account</span>
          <h1>My Account & Orders</h1>
          <p>
            Manage your personal profile, review your contact details, and view your handcrafted orders.
          </p>
        </div>
      </header>

      <main className="container my-orders-container">
        {/* Customer Privacy Assurance Banner */}
        <div className="account-privacy-banner">
          <span className="privacy-icon">🔒</span>
          <div>
            <strong>Private Customer Dashboard</strong>
            <p>
              You are securely viewing only your own personal orders and custom requests. Other customer records cannot be accessed.
            </p>
          </div>
        </div>

        <div className="account-dashboard-layout">
          {/* Left Column: Customer Profile & Contact Information & Logout */}
          <aside className="account-sidebar">
            {/* Customer Profile Card */}
            <div className="account-card profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  {(profile.fullName || profile.name || 'C').charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="profile-name">{profile.fullName || profile.name || 'Customer'}</h2>
                  <span className="profile-badge">Customer Account</span>
                </div>
              </div>
              <div className="profile-details">
                <div className="profile-meta-item">
                  <span className="meta-label">Member Since:</span>
                  <span className="meta-value">{memberYear}</span>
                </div>
                <div className="profile-meta-item">
                  <span className="meta-label">Total Orders Placed:</span>
                  <span className="meta-value">{orders.length}</span>
                </div>
              </div>
            </div>

            {/* Contact Information Card */}
            <div className="account-card contact-card">
              <h3 className="card-section-title">Contact Information</h3>
              <div className="contact-info-list">
                <div className="contact-info-item">
                  <span className="contact-label">Email Address</span>
                  <span className="contact-value">{profile.email || 'Not provided'}</span>
                </div>
                <div className="contact-info-item">
                  <span className="contact-label">WhatsApp / Mobile</span>
                  <span className="contact-value">{profile.mobile || profile.phone || 'Not provided'}</span>
                </div>
                <div className="contact-info-item">
                  <span className="contact-label">Primary Delivery Address</span>
                  <p className="contact-address">
                    {profile.address
                      ? `${profile.address}${profile.city ? `, ${profile.city}` : ''}${profile.state ? `, ${profile.state}` : ''}${profile.pincode ? ` - ${profile.pincode}` : ''}`
                      : 'Address will be saved when placing your first order'}
                  </p>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="account-card logout-card">
              <button
                type="button"
                className="btn-secondary btn-block logout-btn"
                onClick={handleLogout}
              >
                <span>🚪</span> Sign Out
              </button>
            </div>
          </aside>

          {/* Right Column: My Orders */}
          <section className="account-orders-section">
            <div className="orders-header-bar">
              <div>
                <h2>My Orders</h2>
                <p className="orders-subtitle">
                  Showing <strong>{orders.length}</strong> personal orders placed with your contact info
                </p>
              </div>
              <Link to="/shop" className="btn-rose btn-sm">
                + Order New Keepsake
              </Link>
            </div>

            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                Loading your orders...
              </div>
            ) : orders.length === 0 ? (
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  padding: '3.5rem 2rem',
                  textAlign: 'center',
                  border: '1px solid var(--border-soft)',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📦</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--brand-brown)', marginBottom: '0.5rem' }}>
                  No orders placed yet
                </h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                  You haven't placed any handcrafted keepsake orders yet. Browse our collection and personalize your first gift!
                </p>
                <Link to="/shop" className="btn-primary">
                  Explore Products &rarr;
                </Link>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-card-header">
                      <div className="order-meta-group">
                        <span className="order-id-tag">Order ID: #{order.id}</span>
                        <span className="order-date-text">Ordered on {order.orderDate}</span>
                      </div>
                      {/* Status Badge using exact project statuses: New, Contacted, Confirmed, Processing, Completed, Cancelled */}
                      <span className={`badge-status ${order.statusClass}`}>
                        ● {order.status}
                      </span>
                    </div>

                    <div className="order-card-body">
                      <img
                        src={order.image}
                        alt={order.productName}
                        className="order-img"
                      />

                      <div className="order-details-col">
                        <span className="order-product-label">Product</span>
                        <h3 className="order-product-title">{order.productName}</h3>
                        <p className="order-custom-summary">
                          <strong>Customisation:</strong> {order.customisationSummary}
                        </p>
                      </div>

                      <div className="order-price-col">
                        <span className="order-price-label">Total Amount</span>
                        <div className="order-price-tag">
                          ₹{order.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
