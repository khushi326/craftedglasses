import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getApiBase } from '../services/api';
import { PRODUCTS, CATEGORIES } from '../data/products';
import './Shop.css';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const [products, setProducts] = useState(PRODUCTS);
  const [categories, setCategories] = useState(CATEGORIES);

  // Catalog is shown immediately. API can replace it if it actually returns items.
  // A timeout is required: a sleeping Render instance or dead Vite proxy can hang fetch forever.
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);

    const fetchData = async () => {
      try {
        const base = getApiBase();
        const [prodRes, catRes] = await Promise.all([
          fetch(`${base}/products`, { signal: controller.signal }),
          fetch(`${base}/categories`, { signal: controller.signal }),
        ]);

        if (prodRes.ok) {
          const prodData = await prodRes.json();
          const apiProducts = Array.isArray(prodData.data)
            ? prodData.data
            : Array.isArray(prodData.products)
              ? prodData.products
              : [];
          if (apiProducts.length > 0) setProducts(apiProducts);
        }

        if (catRes.ok) {
          const catData = await catRes.json();
          const apiCategories = Array.isArray(catData.categories) ? catData.categories : [];
          if (apiCategories.length > 1) setCategories(apiCategories);
        }
      } catch {
        // Keep the local catalog already on screen.
      } finally {
        clearTimeout(timer);
      }
    };

    fetchData();
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        (product.name || '').toLowerCase().includes(q) ||
        (product.shortDescription || '').toLowerCase().includes(q) ||
        (product.categoryName || '').toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="shop-page page-wrapper">
      <header className="page-header">
        <div className="container">
          <span className="page-tag">Handcrafted Catalog</span>
          <h1>Shop Our Collection</h1>
          <p>
            Explore unique, romantic, and thoughtful keepsakes. Each item is individually made with genuine materials and artisanal precision.
          </p>
        </div>
      </header>

      <main className="container shop-container">
        {/* Search Bar */}
        <div className="shop-controls">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search keepsakes, phone cases, letters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button className="clear-btn" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="category-pills">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`cat-pill ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              <span className="pill-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="results-count">
          Showing <strong>{filteredProducts.length}</strong> handcrafted item{filteredProducts.length !== 1 ? 's' : ''}
          {selectedCategory !== 'all' && (
            <span className="active-filter-badge">
              Category: {categories.find(c => c.id === selectedCategory)?.name}
              <button onClick={() => handleCategoryChange('all')}>✕</button>
            </span>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid-3 shop-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-shop-state">
            <span className="empty-icon">🌿</span>
            <h3>No matching keepsakes found</h3>
            <p>Try clearing your search or browsing another category.</p>
            <button
              className="btn-primary"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
