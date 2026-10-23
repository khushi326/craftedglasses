import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getApiBase } from '../services/api';
import { PRODUCTS } from '../data/products';
import './ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const localProduct = PRODUCTS.find((p) => p.id === id) || null;
  const [product, setProduct] = useState(localProduct);
  const [loading, setLoading] = useState(!localProduct);
  const [error, setError] = useState(localProduct ? null : 'Product not found');
  // Must be declared unconditionally (Rules of Hooks)
  const [selectedImage, setSelectedImage] = useState(localProduct?.gallery?.[0] || localProduct?.image || null);

  useEffect(() => {
    const fromCatalog = PRODUCTS.find((p) => p.id === id) || null;
    if (fromCatalog) {
      setProduct(fromCatalog);
      setSelectedImage(fromCatalog.gallery?.[0] || fromCatalog.image || null);
      setError(null);
      setLoading(false);
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${getApiBase()}/products/${id}`, { signal: controller.signal });
        if (!res.ok) return;
        const json = await res.json();
        const productData = json.data || json;
        if (productData?.id) {
          setProduct(productData);
          setSelectedImage(productData.gallery?.[0] || productData.image || null);
          setError(null);
          setLoading(false);
        }
      } catch {
        if (!fromCatalog) {
          setError('Product not found');
          setLoading(false);
        }
      } finally {
        clearTimeout(timer);
      }
    };

    fetchProduct();
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return (
      <div className="product-details-page page-wrapper">
        <p>Loading product…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-details-page page-wrapper">
        <p className="error">{error}</p>
        <button onClick={() => navigate(-1)} className="btn-primary">← Back</button>
      </div>
    );
  }

  // At this point `product` is guaranteed to be an object

  return (
    <div className="product-details-page page-wrapper">
      {/* Breadcrumbs */}
      <div className="container breadcrumb-container">
        <nav className="breadcrumbs">
          <Link to="/">Home</Link>
          <span className="crumb-sep">/</span>
          <Link to="/shop">Shop</Link>
          <span className="crumb-sep">/</span>
          <Link to={`/shop?category=${product.category}`}>{product.categoryName}</Link>
          <span className="crumb-sep">/</span>
          <span className="current-crumb">{product.name}</span>
        </nav>
      </div>

      <main className="container product-details-container">
        <div className="product-details-grid">
          {/* Left Column – Image Gallery */}
          <div className="product-gallery-col">
            <div className="main-image-wrap">
              <img src={selectedImage} alt={product.name} className="main-preview-img" />
              <span className={`availability-badge ${product.availability === 'In Stock' ? 'tag-in-stock' : 'tag-custom'}`}>
                {product.availability}
              </span>
            </div>
            {product.gallery && product.gallery.length > 1 && (
              <div className="thumbnail-row">
                {product.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${selectedImage === imgUrl ? 'active' : ''}`}
                    onClick={() => setSelectedImage(imgUrl)}
                  >
                    <img src={imgUrl} alt={`${product.name} view ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column – Details & Customisation */}
          <div className="product-info-col">
            <span className="product-category-tag">{product.categoryName}</span>
            <h1 className="product-detail-title">{product.name}</h1>
            <div className="product-price-box">
              <span className="price-label">Handcrafted Price</span>
              <div className="price-amount">
                <span className="curr">₹</span>
                <span className="val">{(product.price || 0).toLocaleString('en-IN')}</span>
              </div>
              <span className="tax-inclusive">Includes all custom artisanal craftwork &amp; packaging</span>
            </div>
            <p className="product-full-desc">{product.description}</p>

            {/* Materials list */}
            {product.materials && product.materials.length > 0 && (
              <div className="detail-section">
                <h3>Artisanal Materials</h3>
                <ul className="materials-list">
                  {product.materials.map((mat, i) => (
                    <li key={i}><span className="mat-dot">✦</span> {mat}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Available Options */}
            {product.availableOptions && (
              <div className="detail-section">
                <h3>Available Styles &amp; Finishes</h3>
                <div className="options-group">
                  {Object.entries(product.availableOptions).map(([key, opts]) => (
                    <div key={key} className="option-row">
                      <strong className="option-title">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}:
                      </strong>
                      <div className="option-pills">
                        {opts.map((opt, oIdx) => (
                          <span key={oIdx} className="option-pill">{opt}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Customisation preview */}
            <div className="customisation-preview-box">
              <div className="custom-box-header">
                <span className="box-icon">🎨</span>
                <h4>Personalisation Required for this Item:</h4>
              </div>
              <p className="custom-box-text">When you proceed, you will be prompted to provide:</p>
              <ul className="custom-fields-preview">
                {product.customisationSchema?.fields?.map(field => (
                  <li key={field.id}>
                    <strong>{field.label}</strong> {field.required ? <span className="req-text">(Required)</span> : '(Optional)'}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action buttons */}
            <div className="product-actions-bar">
              <button className="btn-rose btn-block" onClick={() => navigate(`/customise/${product.id}`)}>
                Customise &amp; Order Now <span>→</span>
              </button>
              <Link to="/custom-gift" className="btn-secondary btn-block">Request a Bespoke Variation</Link>
            </div>

            {/* Reassurance badges */}
            <div className="reassurance-grid">
              <div className="reassure-item"><span>🛡️</span> 100% Quality Checked</div>
              <div className="reassure-item"><span>💬</span> WhatsApp Preview Verification</div>
              <div className="reassure-item"><span>🎁</span> Luxury Gift Box Packaging</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
