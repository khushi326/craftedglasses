import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomGiftRequest.css';

export default function CustomGiftRequest() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    address: '',
    giftType: 'Bespoke Memory Trunk',
    occasion: '',
    description: '',
    photos: '',
    budget: '₹3,500 - ₹5,000',
    additionalMessage: '',
  });

  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFormData((prev) => ({ ...prev, photos: file.name }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In Phase 2 (UI only), navigate to Order Confirmation demo with placeholder ID
    navigate('/order-confirmation', {
      state: {
        orderId: 'CG-REQ-' + Math.floor(100000 + Math.random() * 900000),
        itemTitle: `Custom Gift Request: ${formData.giftType} (${formData.occasion || 'Personalized'})`,
        whatsapp: formData.whatsapp,
        isCustomRequest: true,
      },
    });
  };

  return (
    <div className="custom-gift-page page-wrapper">
      <header className="page-header">
        <div className="container">
          <span className="page-tag">One-of-a-Kind Creations</span>
          <h1>Request a Bespoke Custom Gift</h1>
          <p>
            Have a unique vision or a special occasion you want to commemorate? Share your ideas, and our artisans will handcraft a bespoke gift made solely for you.
          </p>
        </div>
      </header>

      <main className="container custom-gift-container">
        <div className="custom-gift-wrapper">
          <div className="gift-intro-box">
            <div className="gift-intro-step">
              <span className="step-num">1</span>
              <div>
                <h4>Share Your Vision</h4>
                <p>Fill out the details below with your story, desired items, and occasion.</p>
              </div>
            </div>
            <div className="gift-intro-step">
              <span className="step-num">2</span>
              <div>
                <h4>WhatsApp Consultation</h4>
                <p>We’ll review your request and connect on WhatsApp with bespoke sketches and ideas.</p>
              </div>
            </div>
            <div className="gift-intro-step">
              <span className="step-num">3</span>
              <div>
                <h4>Handcrafted & Shipped</h4>
                <p>Once approved, your bespoke keepsake is crafted and securely delivered.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="custom-gift-form">
            <h3 className="form-section-heading">Contact & Delivery Information</h3>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  required
                  placeholder="e.g., Khushi"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="whatsapp">
                  WhatsApp <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  className="form-input"
                  required
                  placeholder="e.g., +91 91564 35456"
                  value={formData.whatsapp}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="address">
                Address <span className="required">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                className="form-textarea"
                required
                rows={2}
                placeholder="House/Flat No, Street, Landmark, City, State, Pincode"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <h3 className="form-section-heading">Gift Specifications</h3>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="giftType">
                  Gift Type <span className="required">*</span>
                </label>
                <select
                  id="giftType"
                  name="giftType"
                  className="form-select"
                  required
                  value={formData.giftType}
                  onChange={handleChange}
                >
                  <option value="Bespoke Memory Trunk">Bespoke Memory Trunk</option>
                  <option value="Anniversary Keepsake Hamper">Anniversary Keepsake Hamper</option>
                  <option value="Custom Pressed Botanical Artwork">Custom Pressed Botanical Artwork</option>
                  <option value="Vintage Letter & Memory Frame Combo">Vintage Letter & Memory Frame Combo</option>
                  <option value="Hand-bound Leather Photo Journal">Hand-bound Leather Photo Journal</option>
                  <option value="Other Custom Idea">Other (Explain in Description)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="occasion">
                  Occasion <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="occasion"
                  name="occasion"
                  className="form-input"
                  required
                  placeholder="e.g., 1st Wedding Anniversary, Birthday, Proposal"
                  value={formData.occasion}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">
                Description <span className="required">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                required
                rows={4}
                placeholder="Describe your vision, important memories, colors, favorite themes, quotes, or items you'd love included..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="budget">
                  Budget <span className="required">*</span>
                </label>
                <select
                  id="budget"
                  name="budget"
                  className="form-select"
                  required
                  value={formData.budget}
                  onChange={handleChange}
                >
                  <option value="₹1,500 - ₹2,500">₹1,500 - ₹2,500</option>
                  <option value="₹2,500 - ₹4,000">₹2,500 - ₹4,000</option>
                  <option value="₹4,000 - ₹6,500">₹4,000 - ₹6,500</option>
                  <option value="₹6,500 - ₹10,000+">₹6,500 - ₹10,000+ (Luxury Hamper)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Photos <span className="helper">(Optional)</span>
                </label>
                <label className="file-upload-box" htmlFor="custom-gift-file">
                  <div className="upload-icon">📷</div>
                  <strong>{fileName || 'Upload inspiration or photos'}</strong>
                  <p>JPG, PNG up to 25MB (UI Placeholder)</p>
                  <input
                    type="file"
                    id="custom-gift-file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="additionalMessage">
                Additional Message
              </label>
              <textarea
                id="additionalMessage"
                name="additionalMessage"
                className="form-textarea"
                rows={2}
                placeholder="Any special deadline date, packaging preferences, or notes..."
                value={formData.additionalMessage}
                onChange={handleChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-rose btn-block">
                Submit Custom Gift Request <span>→</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
