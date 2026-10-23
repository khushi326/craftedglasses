import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}
        <span className={`availability-tag ${product.availability === 'In Stock' ? 'tag-in-stock' : 'tag-custom'}`}>
          {product.availability}
        </span>
      </div>

      <div className="product-info">
        <span className="product-category">{product.categoryName}</span>
        <h3 className="product-name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="product-desc">{product.shortDescription}</p>

        <div className="product-bottom-row">
          <div className="product-price">
            <span className="currency">₹</span>
            <span className="amount">{Number(product.price || 0).toLocaleString('en-IN')}</span>
          </div>

          <div className="product-card-actions">
            <Link
              to={`/product/${product.id}`}
              className="btn-secondary btn-sm"
            >
              View Details
            </Link>
            <Link
              to={`/customise/${product.id}`}
              className="btn-rose btn-sm"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
