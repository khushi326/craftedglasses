import React from 'react';

import { useLocation, Link } from 'react-router-dom';

import './OrderConfirmation.css';



export default function OrderConfirmation() {

  const location = useLocation();

  const orderId = location.state?.orderId || 'CG-' + Math.floor(10000 + Math.random() * 90000);

  const product = location.state?.product;

  const customisation = location.state?.customisation || {};

  const deliveryData = location.state?.deliveryData;

  const itemTitle = location.state?.itemTitle;



  return (

    <div className="order-confirmation-page page-wrapper">

      <main className="container confirmation-container">

        <div className="confirmation-card">

          <div className="confirmation-badge-icon">

            <span>✨</span>

          </div>



          <span className="confirmation-tag">Order Submitted Successfully</span>

          <h1 className="confirmation-title">Thank You for Your Order!</h1>



          <p className="confirmation-sub">

            Your heartfelt keepsake request has been received with love. Our artisans are reviewing your personalisation details.

          </p>



          <div className="order-id-box">

            <span className="id-label">Your Reference Order ID:</span>

            <span className="id-number">{orderId}</span>

            <p className="id-sub">Please save this Order ID for tracking.</p>

          </div>



          {/* WhatsApp Review Next Steps Box */}

          <div className="whatsapp-review-box">

            <div className="wa-icon-wrap">💬</div>

            <div className="wa-text-content">

              <h3>What Happens Next?</h3>

              <p>

                1. <strong>Artisan Review:</strong> Our craft team will review your custom notes, photos, and chosen finishes.

              </p>

              <p>

                2. <strong>WhatsApp Preview:</strong> We will send you a direct WhatsApp message at <strong>{deliveryData?.phone || location.state?.whatsapp || '+91 91564 35456'}</strong> with a preview/mock-up of your customisation before crafting.

              </p>

              <p>

                3. <strong>Handcrafted with Care:</strong> Once you confirm the preview, we hand-pour, assemble, wax-seal, and dispatch your keepsake!

              </p>

            </div>

          </div>



          {/* Summary Preview */}

          {(product || itemTitle) && (

            <div className="summary-recap-box">

              <h4>Ordered Keepsake</h4>

              <p className="recap-title">

                {product?.name || itemTitle}

              </p>

              {deliveryData && (

                <p className="recap-delivery">

                  <strong>Delivering to:</strong> {deliveryData.fullName}, {deliveryData.city}, {deliveryData.pincode}

                </p>

              )}

            </div>

          )}



          {/* Action CTAs */}

          <div className="confirmation-actions">

            <a

              href={`https://wa.me/919156435456?text=Hi%20Craftedglasses%2C%20I%20just%20placed%20order%20${orderId}%20and%20would%20like%20to%20confirm%20my%20customisation.`}

              target="_blank"

              rel="noreferrer"

              className="btn-rose"

            >

              <span>💬</span> Contact Us on WhatsApp

            </a>



            <Link to="/shop" className="btn-secondary">

              Continue Shopping <span>→</span>

            </Link>



            <Link to="/orders" className="btn-link-order">

              View in My Orders

            </Link>

          </div>

        </div>

      </main>

    </div>

  );

}
