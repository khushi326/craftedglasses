import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import './ProductCustomisation.css';

export default function ProductCustomisation() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find target product
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  // Dynamic customisation form state based on product schema
  const [formData, setFormData] = useState({});
  const [selectedFileName, setSelectedFileName] = useState('');
  const [previewNote, setPreviewNote] = useState('');

  const handleFieldChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleFileChange = (fieldId, e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      handleFieldChange(fieldId, file.name);
    }
  };

  const handleProceedToOrder = (e) => {
    e.preventDefault();
    // Navigate to order form with product ID & state
    navigate(`/order/${product.id}`, {
      state: {
        product,
        customisation: formData,
      },
    });
  };

  return (
    <div className="customisation-page page-wrapper">
      <header className="page-header">
        <div className="container">
          <span className="page-tag">Personalisation Studio</span>
          <h1>Customise Your {product.name}</h1>
          <p>
            Tell our artisans your exact preferences. Each detail is handcrafted uniquely for your story.
          </p>
        </div>
      </header>

      <main className="container customisation-container">
        <div className="customisation-layout">
          {/* Left Column: Customisation Form */}
          <div className="custom-form-col">
            <div className="custom-card">
              <div className="card-top-header">
                <h3>Personalisation Details</h3>
                <span className="schema-badge">Product Type: {product.categoryName}</span>
              </div>

              <form onSubmit={handleProceedToOrder}>
                {product.customisationSchema?.fields?.map((field) => (
                  <div key={field.id} className="form-group">
                    <label className="form-label" htmlFor={field.type === 'file' ? `file-${field.id}` : field.id}>
                      {field.label}
                      {field.required && <span className="required">*</span>}
                      {field.helper && <span className="helper">({field.helper})</span>}
                    </label>

                    {/* Render specific field type */}
                    {field.type === 'select' && (
                      <select
                        id={field.id}
                        className="form-select"
                        required={field.required}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      >
                        <option value="">-- Please select an option --</option>
                        {field.options?.map((opt, oIdx) => (
                          <option key={oIdx} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    )}

                    {field.type === 'text' && (
                      <input
                        type="text"
                        id={field.id}
                        className="form-input"
                        required={field.required}
                        placeholder={field.placeholder || ''}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      />
                    )}

                    {field.type === 'textarea' && (
                      <textarea
                        id={field.id}
                        className="form-textarea"
                        required={field.required}
                        placeholder={field.placeholder || ''}
                        rows={4}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      />
                    )}

                    {field.type === 'file' && (
                      <div className="file-upload-wrapper">
                        <label className="file-upload-box" htmlFor={`file-${field.id}`}>
                          <div className="upload-icon">{selectedFileName ? '✨' : '📸'}</div>
                          <strong>{selectedFileName || 'Click to select photo / document'}</strong>
                          <p>{selectedFileName ? 'Photo attached! Click to change' : 'Supports JPG, PNG, HEIC up to 25MB (UI Placeholder)'}</p>
                          <input
                            type="file"
                            id={`file-${field.id}`}
                            style={{ display: 'none' }}
                            onChange={(e) => handleFileChange(field.id, e)}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                ))}

                <div className="form-notice">
                  <span>💡</span>
                  <p>
                    <strong>Artisan Verification:</strong> Don’t worry about exact formatting! Our team will share a WhatsApp mock-up with you before creating the physical keepsake.
                  </p>
                </div>

                <div className="form-submit-row">
                  <button type="submit" className="btn-rose btn-block">
                    Continue to Order Form <span>→</span>
                  </button>
                  <Link to={`/product/${product.id}`} className="btn-secondary btn-block">
                    ← Back to Product Details
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Live Order Summary Card */}
          <div className="custom-summary-col">
            <div className="summary-sticky-card">
              <h3>Selected Keepsake</h3>
              <div className="summary-product-item">
                <img src={product.image} alt={product.name} className="summary-img" />
                <div>
                  <h4 className="summary-title">{product.name}</h4>
                  <span className="summary-cat">{product.categoryName}</span>
                  <div className="summary-price">₹{product.price.toLocaleString('en-IN')}</div>
                </div>
              </div>

              <div className="custom-preview-summary">
                <h4>Your Customisation Summary:</h4>
                {Object.keys(formData).length === 0 ? (
                  <p className="empty-preview-text">Fill in the fields on the left to see your customisation preview.</p>
                ) : (
                  <ul className="preview-items-list">
                    {Object.entries(formData).map(([k, v]) => (
                      <li key={k}>
                        <strong>{product.customisationSchema?.fields?.find(f => f.id === k)?.label || k}:</strong>
                        <span>{v || 'None'}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="summary-timeline">
                <div className="timeline-step">
                  <span className="t-icon">⏳</span>
                  <span>Handmade preparation: <strong>3-5 Days</strong></span>
                </div>
                <div className="timeline-step">
                  <span className="t-icon">🚚</span>
                  <span>Safe Express Delivery: <strong>Pan-India</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
