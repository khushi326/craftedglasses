import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES, MOCK_ORDERS } from '../data/products';
import { getApiBase } from '../services/api';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Navigation state for required admin sections
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State for products and orders (for UI display and interaction)
  const [productList, setProductList] = useState(PRODUCTS);
  const [orderList, setOrderList] = useState(MOCK_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState(MOCK_ORDERS[0]?.id || '');

  // Exact Project Statuses
  const ORDER_STATUSES = [
    'New',
    'Contacted',
    'Confirmed',
    'Processing',
    'Completed',
    'Cancelled',
  ];

  // Fetch live orders from backend admin API
  useEffect(() => {
    const adminToken = localStorage.getItem('craftedglasses_admin_token');
    if (!adminToken) return;

    fetch(`${getApiBase()}/admin/orders`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.orders) && data.orders.length > 0) {
          const mapped = data.orders.map((o) => {
            const statusSlug = (o.status || 'New').toLowerCase();
            return {
              id: o.orderId || o._id,
              customerName: o.customerName || o.deliveryAddress?.fullName || 'Customer',
              email: o.customerEmail || '',
              phone: o.customerPhone || o.deliveryAddress?.phone || '',
              address: o.deliveryAddress?.address
                ? `${o.deliveryAddress.address}, ${o.deliveryAddress.city || ''} ${o.deliveryAddress.pincode || ''}`
                : 'Direct studio address',
              productName: o.product?.name || 'Personalised Gift',
              productId: o.product?.id || 'pressed-flower-case',
              price: o.product?.price || 899,
              status: o.status || 'New',
              statusClass: `status-${statusSlug}`,
              orderDate: new Date(o.createdAt || Date.now()).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              }),
              customisation: o.customisation || {},
              customisationSummary:
                Object.entries(o.customisation || {})
                  .map(([k, v]) => `${k}: ${v}`)
                  .join(', ') || 'Standard handcrafted order',
              image:
                o.product?.image ||
                'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=400&q=80',
            };
          });

          // Merge backend orders with mock orders for comprehensive demonstration
          setOrderList(mapped);
          if (mapped.length > 0) {
            setSelectedOrderId(mapped[0].id);
          }
        }
      })
      .catch((err) => {
        console.warn('Backend orders fetch notice:', err.message);
      });
  }, []);

  // Exact Statistics Required
  const stats = {
    totalProducts: productList.length,
    availableProducts: productList.filter((p) => p.availability !== 'Out of Stock').length,
    totalOrders: orderList.length,
    newOrders: orderList.filter((o) => o.status === 'New').length,
    confirmedOrders: orderList.filter((o) => o.status === 'Confirmed').length,
    processingOrders: orderList.filter((o) => o.status === 'Processing').length,
    completedOrders: orderList.filter((o) => o.status === 'Completed').length,
    cancelledOrders: orderList.filter((o) => o.status === 'Cancelled').length,
  };

  // Find currently selected order for Customer Order Details section
  const currentOrder =
    orderList.find((o) => o.id === selectedOrderId) || orderList[0];

  const handleStatusChange = async (orderId, newStatus) => {
    // Optimistic UI state update
    setOrderList((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const statusSlug = newStatus.toLowerCase();
          return {
            ...order,
            status: newStatus,
            statusClass: `status-${statusSlug}`,
          };
        }
        return order;
      })
    );

    // Call backend API with admin auth token
    const adminToken = localStorage.getItem('craftedglasses_admin_token');
    if (adminToken) {
      try {
        await fetch(`${getApiBase()}/admin/orders/${orderId}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({ status: newStatus }),
        });
      } catch (err) {
        console.warn('Failed to persist status to backend:', err);
      }
    }
  };

  const handleAvailabilityChange = (productId, newAvailability) => {
    setProductList((prev) =>
      prev.map((prod) => {
        if (prod.id === productId) {
          return {
            ...prod,
            availability: newAvailability,
          };
        }
        return prod;
      })
    );
  };

  // Read authenticated admin info from localStorage
  const adminUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('craftedglasses_admin_user') || '{}');
    } catch {
      return {};
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem('craftedglasses_admin_token');
    localStorage.removeItem('craftedglasses_admin_user');
    navigate('/admin/login', { replace: true });
  };

  const selectOrderAndNavigate = (orderId) => {
    setSelectedOrderId(orderId);
    setActiveSection('order-details');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <Link to="/" className="admin-brand-link" title="View Customer Storefront">
            <span className="admin-brand-icon">✦</span>
            <div className="admin-brand-text">
              <span className="admin-brand-title">Craftedglasses</span>
              <span className="admin-brand-sub">Admin Workspace</span>
            </div>
          </Link>
          <button
            className="sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close admin menu"
          >
            ✕
          </button>
        </div>

        {/* Required Admin Navigation Sections */}
        <nav className="admin-nav-menu">
          <button
            className={`admin-nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('dashboard');
              setSidebarOpen(false);
            }}
          >
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </button>

          <button
            className={`admin-nav-item ${activeSection === 'products' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('products');
              setSidebarOpen(false);
            }}
          >
            <span className="nav-icon">📦</span>
            <span>Product Management</span>
          </button>

          <button
            className={`admin-nav-item ${activeSection === 'categories' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('categories');
              setSidebarOpen(false);
            }}
          >
            <span className="nav-icon">🗂️</span>
            <span>Category Management</span>
          </button>

          <button
            className={`admin-nav-item ${activeSection === 'orders' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('orders');
              setSidebarOpen(false);
            }}
          >
            <span className="nav-icon">📋</span>
            <span>Order Management</span>
            {stats.newOrders > 0 && (
              <span className="nav-counter">{stats.newOrders}</span>
            )}
          </button>

          <button
            className={`admin-nav-item ${activeSection === 'order-details' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('order-details');
              setSidebarOpen(false);
            }}
          >
            <span className="nav-icon">🔍</span>
            <span>Customer Order Details</span>
          </button>

          <button
            className={`admin-nav-item ${activeSection === 'availability' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('availability');
              setSidebarOpen(false);
            }}
          >
            <span className="nav-icon">⚡</span>
            <span>Product Availability</span>
          </button>
        </nav>

        {/* Sidebar Footer Logout */}
        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <span className="admin-avatar">👤</span>
            <div className="admin-user-text">
              <strong>Studio Admin</strong>
              <small>@{adminUser.username || 'admin'}</small>
            </div>
          </div>
          <button
            type="button"
            className="admin-logout-btn"
            onClick={handleLogout}
            title="Log out of admin"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <div className="admin-main">
        {/* Admin Topbar */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <button
              className="admin-mobile-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              ☰
            </button>
            <div className="topbar-heading">
              <span className="topbar-badge">Admin Workspace</span>
              <h1>
                {activeSection === 'dashboard' && 'Dashboard Overview'}
                {activeSection === 'products' && 'Product Management'}
                {activeSection === 'categories' && 'Category Management'}
                {activeSection === 'orders' && 'Order Management'}
                {activeSection === 'order-details' && 'Customer Order Details'}
                {activeSection === 'availability' && 'Product Availability Management'}
              </h1>
            </div>
          </div>

          <div className="topbar-right">
            <Link to="/" className="btn-secondary btn-sm" target="_blank" rel="noreferrer">
              <span>↗</span> View Storefront
            </Link>
            <button className="btn-primary btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {/* Section View: 1. DASHBOARD */}
        {activeSection === 'dashboard' && (
          <div className="admin-content-area">
            {/* Required Statistics Section */}
            <div className="stats-section-header">
              <h2>Key Statistics</h2>
              <p>Real-time operational summary of products, inventory, and order statuses.</p>
            </div>

            <div className="stats-grid-8">
              {/* Stat 1: Total Products */}
              <div className="stat-card">
                <div className="stat-icon-wrapper icon-brown">📦</div>
                <div className="stat-info">
                  <span className="stat-label">Total Products</span>
                  <span className="stat-value">{stats.totalProducts}</span>
                </div>
              </div>

              {/* Stat 2: Available Products */}
              <div className="stat-card">
                <div className="stat-icon-wrapper icon-green">✅</div>
                <div className="stat-info">
                  <span className="stat-label">Available Products</span>
                  <span className="stat-value">{stats.availableProducts}</span>
                </div>
              </div>

              {/* Stat 3: Total Orders */}
              <div className="stat-card">
                <div className="stat-icon-wrapper icon-blue">📋</div>
                <div className="stat-info">
                  <span className="stat-label">Total Orders</span>
                  <span className="stat-value">{stats.totalOrders}</span>
                </div>
              </div>

              {/* Stat 4: New Orders */}
              <div className="stat-card">
                <div className="stat-icon-wrapper icon-new">✨</div>
                <div className="stat-info">
                  <span className="stat-label">New Orders</span>
                  <span className="stat-value">{stats.newOrders}</span>
                </div>
              </div>

              {/* Stat 5: Confirmed Orders */}
              <div className="stat-card">
                <div className="stat-icon-wrapper icon-confirmed">🤝</div>
                <div className="stat-info">
                  <span className="stat-label">Confirmed Orders</span>
                  <span className="stat-value">{stats.confirmedOrders}</span>
                </div>
              </div>

              {/* Stat 6: Processing Orders */}
              <div className="stat-card">
                <div className="stat-icon-wrapper icon-purple">⏳</div>
                <div className="stat-info">
                  <span className="stat-label">Processing Orders</span>
                  <span className="stat-value">{stats.processingOrders}</span>
                </div>
              </div>

              {/* Stat 7: Completed Orders */}
              <div className="stat-card">
                <div className="stat-icon-wrapper icon-completed">🎉</div>
                <div className="stat-info">
                  <span className="stat-label">Completed Orders</span>
                  <span className="stat-value">{stats.completedOrders}</span>
                </div>
              </div>

              {/* Stat 8: Cancelled Orders */}
              <div className="stat-card">
                <div className="stat-icon-wrapper icon-cancelled">✕</div>
                <div className="stat-info">
                  <span className="stat-label">Cancelled Orders</span>
                  <span className="stat-value">{stats.cancelledOrders}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Snapshot */}
            <div className="dashboard-summary-cards">
              <div className="admin-panel-card">
                <div className="panel-card-header">
                  <h3>Recent Customer Orders</h3>
                  <button
                    className="btn-link"
                    onClick={() => setActiveSection('orders')}
                  >
                    Manage All Orders &rarr;
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderList.slice(0, 4).map((order) => (
                        <tr key={order.id}>
                          <td><strong>#{order.id}</strong></td>
                          <td>{order.customerName}</td>
                          <td>{order.productName}</td>
                          <td>
                            <span className={`badge-status ${order.statusClass}`}>
                              ● {order.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="table-action-btn"
                              onClick={() => selectOrderAndNavigate(order.id)}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="admin-panel-card">
                <div className="panel-card-header">
                  <h3>Product Availability Summary</h3>
                  <button
                    className="btn-link"
                    onClick={() => setActiveSection('availability')}
                  >
                    Adjust Availability &rarr;
                  </button>
                </div>
                <ul className="quick-product-list">
                  {productList.slice(0, 5).map((prod) => (
                    <li key={prod.id} className="quick-product-item">
                      <img src={prod.image} alt={prod.name} className="quick-prod-thumb" />
                      <div className="quick-prod-info">
                        <strong>{prod.name}</strong>
                        <span>{prod.categoryName} &bull; ₹{prod.price}</span>
                      </div>
                      <span className={`availability-tag ${prod.availability === 'In Stock' ? 'tag-in-stock' : 'tag-custom'}`}>
                        {prod.availability}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Section View: 2. PRODUCT MANAGEMENT */}
        {activeSection === 'products' && (
          <div className="admin-content-area">
            <div className="admin-panel-card">
              <div className="panel-card-header">
                <div>
                  <h2>All Products ({productList.length})</h2>
                  <p>Comprehensive listing of handmade items and custom keepsakes.</p>
                </div>
                <button
                  className="btn-rose btn-sm"
                  onClick={() => setActiveSection('availability')}
                >
                  Manage Availability
                </button>
              </div>

              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Availability</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((prod) => (
                      <tr key={prod.id}>
                        <td>
                          <img src={prod.image} alt={prod.name} className="table-thumb" />
                        </td>
                        <td>
                          <strong>{prod.name}</strong>
                          <span className="table-subtext">{prod.shortDescription}</span>
                        </td>
                        <td>{prod.categoryName}</td>
                        <td>₹{prod.price.toLocaleString('en-IN')}</td>
                        <td>
                          <span className={`availability-tag ${prod.availability === 'In Stock' ? 'tag-in-stock' : 'tag-custom'}`}>
                            {prod.availability}
                          </span>
                        </td>
                        <td>
                          <Link
                            to={`/product/${prod.id}`}
                            target="_blank"
                            className="table-action-btn"
                          >
                            View Live
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Section View: 3. CATEGORY MANAGEMENT */}
        {activeSection === 'categories' && (
          <div className="admin-content-area">
            <div className="admin-panel-card">
              <div className="panel-card-header">
                <div>
                  <h2>Product Categories ({CATEGORIES.length})</h2>
                  <p>Catalog taxonomy and groupings for Craftedglasses collections.</p>
                </div>
              </div>

              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Category Name</th>
                      <th>ID Slug</th>
                      <th>Total Products</th>
                      <th>Customer Shop Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CATEGORIES.map((cat) => {
                      const count =
                        cat.id === 'all'
                          ? productList.length
                          : productList.filter((p) => p.category === cat.id).length;
                      return (
                        <tr key={cat.id}>
                          <td>
                            <div className="cat-name-cell">
                              <span className="cat-icon-badge">{cat.icon}</span>
                              <strong>{cat.name}</strong>
                            </div>
                          </td>
                          <td><code>{cat.id}</code></td>
                          <td><strong>{count} item{count !== 1 ? 's' : ''}</strong></td>
                          <td>
                            <Link
                              to={`/shop?category=${cat.id}`}
                              target="_blank"
                              className="table-action-btn"
                            >
                              Explore Category &rarr;
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Section View: 4. ORDER MANAGEMENT */}
        {activeSection === 'orders' && (
          <div className="admin-content-area">
            <div className="admin-panel-card">
              <div className="panel-card-header">
                <div>
                  <h2>Order Management ({orderList.length})</h2>
                  <p>Review customer orders and update project statuses.</p>
                </div>
              </div>

              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Product</th>
                      <th>Order Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Change Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderList.map((order) => (
                      <tr key={order.id}>
                        <td><strong>#{order.id}</strong></td>
                        <td>
                          <strong>{order.customerName}</strong>
                          <span className="table-subtext">{order.customerPhone}</span>
                        </td>
                        <td>{order.productName}</td>
                        <td>{order.orderDate}</td>
                        <td>₹{order.price.toLocaleString('en-IN')}</td>
                        <td>
                          <span className={`badge-status ${order.statusClass}`}>
                            ● {order.status}
                          </span>
                        </td>
                        <td>
                          <select
                            className="admin-status-select"
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          >
                            {ORDER_STATUSES.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <button
                            className="table-action-btn"
                            onClick={() => selectOrderAndNavigate(order.id)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Section View: 5. CUSTOMER ORDER DETAILS */}
        {activeSection === 'order-details' && (
          <div className="admin-content-area">
            <div className="order-details-selector-bar">
              <label htmlFor="orderPicker">Select Order to Inspect:</label>
              <select
                id="orderPicker"
                className="form-select order-picker-select"
                value={currentOrder?.id}
                onChange={(e) => setSelectedOrderId(e.target.value)}
              >
                {orderList.map((o) => (
                  <option key={o.id} value={o.id}>
                    #{o.id} - {o.customerName} ({o.productName} - {o.status})
                  </option>
                ))}
              </select>
            </div>

            {currentOrder && (
              <div className="order-details-view-grid">
                {/* Customer Details Box */}
                <div className="admin-panel-card">
                  <div className="panel-card-header">
                    <h3>Customer Profile & Contact</h3>
                    <span className={`badge-status ${currentOrder.statusClass}`}>
                      ● {currentOrder.status}
                    </span>
                  </div>
                  <div className="details-list">
                    <div className="detail-item">
                      <span className="detail-label">Customer Name:</span>
                      <strong className="detail-val">{currentOrder.customerName}</strong>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">WhatsApp / Phone:</span>
                      <strong className="detail-val">{currentOrder.customerPhone}</strong>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Email Address:</span>
                      <span className="detail-val">{currentOrder.customerEmail}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Delivery Address:</span>
                      <p className="detail-address">{currentOrder.deliveryAddress}</p>
                    </div>
                  </div>

                  <div className="order-status-editor-box">
                    <label>Update Order Status:</label>
                    <div className="status-editor-row">
                      <select
                        className="form-select"
                        value={currentOrder.status}
                        onChange={(e) => handleStatusChange(currentOrder.id, e.target.value)}
                      >
                        {ORDER_STATUSES.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                      <a
                        href={`https://wa.me/${currentOrder.customerPhone.replace(/[^0-9]/g, '')}?text=Hi%20${currentOrder.customerName}%2C%20regarding%20your%20Craftedglasses%20order%20%23${currentOrder.id}...`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-rose btn-sm"
                      >
                        💬 Chat Customer
                      </a>
                    </div>
                  </div>
                </div>

                {/* Ordered Product & Customisation Requirements */}
                <div className="admin-panel-card">
                  <div className="panel-card-header">
                    <h3>Ordered Product & Customisation</h3>
                    <span className="order-id-badge">Order ID: #{currentOrder.id}</span>
                  </div>

                  <div className="order-product-highlight">
                    <img
                      src={currentOrder.image}
                      alt={currentOrder.productName}
                      className="highlight-thumb"
                    />
                    <div>
                      <h4>{currentOrder.productName}</h4>
                      <span className="table-subtext">Ordered on {currentOrder.orderDate}</span>
                      <div className="highlight-price">₹{currentOrder.price.toLocaleString('en-IN')}</div>
                    </div>
                  </div>

                  <div className="customisation-specs-box">
                    <h4>Artisan Customisation Notes:</h4>
                    <div className="specs-content-bubble">
                      <p>{currentOrder.customisationSummary}</p>
                    </div>
                  </div>

                  <div className="order-actions-bar">
                    <button
                      className="btn-secondary btn-sm"
                      onClick={() => setActiveSection('orders')}
                    >
                      &larr; Back to Order Management
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Section View: 6. PRODUCT AVAILABILITY MANAGEMENT */}
        {activeSection === 'availability' && (
          <div className="admin-content-area">
            <div className="admin-panel-card">
              <div className="panel-card-header">
                <div>
                  <h2>Product Availability Management</h2>
                  <p>Toggle and update product stock status. Currently <strong>{stats.availableProducts}</strong> of <strong>{stats.totalProducts}</strong> products are available.</p>
                </div>
              </div>

              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Current Availability</th>
                      <th>Change Availability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((prod) => (
                      <tr key={prod.id}>
                        <td>
                          <div className="table-product-cell">
                            <img src={prod.image} alt={prod.name} className="table-thumb" />
                            <div>
                              <strong>{prod.name}</strong>
                              <span className="table-subtext">{prod.materials?.join(', ')}</span>
                            </div>
                          </div>
                        </td>
                        <td>{prod.categoryName}</td>
                        <td>₹{prod.price.toLocaleString('en-IN')}</td>
                        <td>
                          <span
                            className={`availability-tag ${
                              prod.availability === 'In Stock'
                                ? 'tag-in-stock'
                                : prod.availability === 'Made to Order'
                                ? 'tag-custom'
                                : 'tag-out-of-stock'
                            }`}
                          >
                            {prod.availability}
                          </span>
                        </td>
                        <td>
                          <select
                            className="admin-availability-select"
                            value={prod.availability}
                            onChange={(e) => handleAvailabilityChange(prod.id, e.target.value)}
                          >
                            <option value="In Stock">In Stock</option>
                            <option value="Made to Order">Made to Order</option>
                            <option value="Out of Stock">Out of Stock</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
