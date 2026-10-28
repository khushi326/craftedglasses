import React, { useEffect, useState, useCallback } from 'react';
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
  const [selectedImage, setSelectedImage] = useState(localProduct?.gallery?.[0] || localProduct?.image || null);

  // Lightbox Modal state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  const galleryImages = product?.gallery && product.gallery.length > 0
    ? product.gallery
    : (product?.image ? [product.image] : []);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
  }, [galleryImages.length]);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
  }, [galleryImages.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [lightboxOpen, closeLightbox, prevImage, nextImage]);

  if (loading) {
    return (
      <div className="product-details-page page-wrapper">
        <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
          <p>Loading handcrafted piece details…</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-page page-wrapper">
        <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
          <p className="error">{error || 'Product not found'}</p>
          <button onClick={() => navigate(-1)} className="btn-primary" style={{ marginTop: '1rem' }}>
            ← Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const displayCategory =
    product.categoryName === 'Phone Cases'
      ? 'Mobile Covers'
      : product.categoryName ||
        (product.category === 'mobile-covers' || product.category === 'phone-cases'
          ? 'Mobile Covers'
          : product.category || 'Handcrafted');
  const categoryLink = product.category === 'phone-cases' ? 'mobile-covers' : product.category;

  const currentSelectedIndex = galleryImages.indexOf(selectedImage) !== -1
    ? galleryImages.indexOf(selectedImage)
    : 0;

  return (
    <div className="product-details-page page-wrapper">
      {/* Breadcrumbs */}
      <div className="container breadcrumb-container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="crumb-sep">/</span>
          <Link to="/shop">Shop</Link>
          <span className="crumb-sep">/</span>
          <Link to={`/shop?category=${categoryLink}`}>{displayCategory}</Link>
          <span className="crumb-sep">/</span>
          <span className="current-crumb">{product.name}</span>
        </nav>
      </div>

      <main className="container product-details-container">
        <div className="product-details-grid">
          {/* Left Column – Image Gallery */}
          <div className="product-gallery-col">
            <div
              className="main-image-wrap clickable-preview"
              onClick={() => openLightbox(currentSelectedIndex)}
              title="Click to view full screen gallery"
            >
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="main-preview-img"
              />
              <span className={`availability-badge ${product.availability === 'In Stock' ? 'tag-in-stock' : 'tag-custom'}`}>
                {product.availability}
              </span>
              <div className="zoom-hint-overlay">
                <span className="zoom-icon">🔍</span>
                <span>Click to expand ({galleryImages.length} photos)</span>
              </div>
            </div>

            {/* Thumbnail Carousel / Row */}
            {galleryImages.length > 1 && (
              <div className="gallery-strip-container">
                <div className="thumbnail-row">
                  {galleryImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`thumb-btn ${selectedImage === imgUrl ? 'active' : ''}`}
                      onClick={() => setSelectedImage(imgUrl)}
                      title={`View photo ${idx + 1}`}
                      aria-label={`Select photo ${idx + 1}`}
                    >
                      <img src={imgUrl} alt={`${product.name} view ${idx + 1}`} loading="lazy" />
                      <span className="thumb-idx">{idx + 1}</span>
                    </button>
                  ))}
                </div>
                <div className="strip-scroll-hint">
                  Scroll or click any angle &bull; {galleryImages.length} authentic studio views
                </div>
              </div>
            )}
          </div>

          {/* Right Column – Details & Customisation */}
          <div className="product-info-col">
            <span className="product-category-tag">{displayCategory}</span>
            <h1 className="product-detail-title">{product.name}</h1>

            <div className="product-price-box">
              <span className="price-label">Handcrafted Price</span>
              <div className="price-amount">
                <span className="curr">₹</span>
                <span className="val">{(product.price || 0).toLocaleString('en-IN')}</span>
              </div>
              <span className="tax-inclusive">Includes all custom artisanal craftwork &amp; protective gift wrap</span>
            </div>

            {/* Accurate Availability Banner */}
            <div className={`availability-card ${product.availability === 'In Stock' ? 'avail-stock' : 'avail-mto'}`}>
              <div className="avail-header">
                <span className="avail-icon">{product.availability === 'In Stock' ? '✓' : '⏳'}</span>
                <div>
                  <strong>{product.availability === 'In Stock' ? 'In Stock & Ready to Dispatch' : 'Made to Order (2–4 Days Crafting Time)'}</strong>
                  <span className="avail-sub">
                    {product.availability === 'In Stock'
                      ? 'Pre-crafted studio piece ready for immediate packing and dispatch.'
                      : 'Individually hand-poured with real florals tailored to your exact phone model.'}
                  </span>
                </div>
              </div>
            </div>

            <p className="product-full-desc">{product.description}</p>

            {/* Materials list */}
            {product.materials && product.materials.length > 0 && (
              <div className="detail-section">
                <h3>Artisanal Materials &amp; Quality</h3>
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
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}:
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
            {product.customisationSchema?.fields && (
              <div className="customisation-preview-box">
                <div className="custom-box-header">
                  <span className="box-icon">🎨</span>
                  <h4>Personalisation Required for this Item:</h4>
                </div>
                <p className="custom-box-text">When you proceed, you will be prompted to provide:</p>
                <ul className="custom-fields-preview">
                  {product.customisationSchema.fields.map((field) => (
                    <li key={field.id}>
                      <strong>{field.label}</strong> {field.required ? <span className="req-text">(Required)</span> : '(Optional)'}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action buttons */}
            <div className="product-actions-bar">
              <button className="btn-rose btn-block" onClick={() => navigate(`/customise/${product.id}`)}>
                Customise &amp; Order Now <span>→</span>
              </button>
              <Link to="/custom-gift" className="btn-secondary btn-block">
                Request a Bespoke Variation
              </Link>
            </div>

            {/* Reassurance badges */}
            <div className="reassurance-grid">
              <div className="reassure-item"><span>🛡️</span> 100% Quality Checked</div>
              <div className="reassure-item"><span>💬</span> WhatsApp Preview Verification</div>
              <div className="reassure-item"><span>🎁</span> Luxury Gift Box Packaging</div>
            </div>
          </div>
        </div>

        {/* ---------------- MORE PHOTOS GALLERY SECTION ---------------- */}
        <section className="product-more-photos-section">
          <div className="gallery-section-header">
            <span className="gallery-section-tag">Authentic Product Showcase</span>
            <h2>More Photos &amp; Artisanal Details ({galleryImages.length} Views)</h2>
            <p>
              Explore high-resolution authentic views, close-up botanical details, material textures, and angle perspectives of our handcrafted {product.name}. Click any image to view in fullscreen.
            </p>
          </div>

          <div className="photo-grid-showcase">
            {galleryImages.map((imgUrl, idx) => (
              <div
                key={idx}
                className="photo-showcase-card"
                onClick={() => openLightbox(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') openLightbox(idx); }}
              >
                <div className="photo-card-img-wrap">
                  <img src={imgUrl} alt={`${product.name} artisanal view ${idx + 1}`} loading="lazy" />
                  <div className="photo-card-overlay">
                    <span className="overlay-zoom-icon">🔍</span>
                    <span className="overlay-text">Inspect Detail</span>
                  </div>
                </div>
                <div className="photo-card-caption">
                  <span className="photo-badge">Photo {idx + 1} of {galleryImages.length}</span>
                  <span className="photo-view-name">
                    {idx === 0 ? 'Main Studio Angle' : `Artisanal Detail View ${idx + 1}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- CRAFTING PROCESS & SPECIFICATIONS ---------------- */}
        <section className="product-specs-section">
          <div className="specs-grid">
            <div className="specs-card">
              <h3>🌿 Natural Floral Preservation</h3>
              <p>
                Every flower and botanical element is hand-foraged, pressed over 2–3 weeks, and carefully arranged inside crystal-clear epoxy bio-resin. No two pieces are ever identical, giving you a truly one-of-a-kind keepsake.
              </p>
            </div>
            <div className="specs-card">
              <h3>✨ Care &amp; Longevity Instructions</h3>
              <p>
                Keep away from harsh solvents or alcohol wipes. Clean gently with a soft microfibre cloth. While our resin is UV-stabilised to resist yellowing, avoid leaving in direct high-heat sunlight for extended periods.
              </p>
            </div>
            <div className="specs-card">
              <h3>📦 Safe Luxury Packaging</h3>
              <p>
                Every order is nestled in protective bubble wrap, tissue paper, and a stamped vintage presentation box ready for gifting to yourself or a loved one.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------- FULLSCREEN LIGHTBOX MODAL ---------------- */}
      {lightboxOpen && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Product Image Lightbox"
        >
          <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-header">
              <span className="lightbox-counter">
                {product.name} &bull; Photo {lightboxIndex + 1} of {galleryImages.length}
              </span>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={closeLightbox}
                aria-label="Close Lightbox"
              >
                ✕
              </button>
            </div>

            <div className="lightbox-body">
              <button
                type="button"
                className="lightbox-nav-btn prev-btn"
                onClick={prevImage}
                aria-label="Previous Photo"
              >
                &#10094;
              </button>

              <div className="lightbox-image-container">
                <img
                  src={galleryImages[lightboxIndex]}
                  alt={`${product.name} fullscreen view ${lightboxIndex + 1}`}
                  className="lightbox-main-img"
                />
              </div>

              <button
                type="button"
                className="lightbox-nav-btn next-btn"
                onClick={nextImage}
                aria-label="Next Photo"
              >
                &#10095;
              </button>
            </div>

            {/* Bottom thumbnail selector inside lightbox */}
            <div className="lightbox-footer">
              <div className="lightbox-thumbs">
                {galleryImages.map((thumbUrl, tIdx) => (
                  <button
                    key={tIdx}
                    type="button"
                    className={`lightbox-thumb ${lightboxIndex === tIdx ? 'active' : ''}`}
                    onClick={() => setLightboxIndex(tIdx)}
                    aria-label={`Jump to photo ${tIdx + 1}`}
                  >
                    <img src={thumbUrl} alt={`Thumbnail ${tIdx + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
