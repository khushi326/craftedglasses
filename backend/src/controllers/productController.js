import Product from '../models/Product.js';
import { PRODUCTS_DATA } from '../data/catalog.js';

/**
 * @desc Get all products (public)
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products.length) {
      return res.json({ success: true, count: PRODUCTS_DATA.length, data: PRODUCTS_DATA });
    }
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    console.error('[Product] getAllProducts error:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching products' });
  }
};

/**
 * @desc Get a single product by custom id (public)
 */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      const fallback = PRODUCTS_DATA.find((p) => p.id === req.params.id);
      if (fallback) {
        return res.json({ success: true, data: fallback });
      }
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    console.error('[Product] getProductById error:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching product' });
  }
};

/**
 * @desc Create a new product (admin only)
 */
export const createProduct = async (req, res) => {
  try {
    // Expect full product object in request body
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error('[Product] createProduct error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc Update existing product (admin only)
 */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    console.error('[Product] updateProduct error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc Delete a product (admin only)
 */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.error('[Product] deleteProduct error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Update product availability status (admin only)
 * Expected body: { availability: 'In Stock' | 'Out of Stock' | 'Limited Edition' | 'Made to Order' }
 */
export const updateProductAvailability = async (req, res) => {
  const { availability } = req.body;
  if (!availability) {
    return res.status(400).json({ success: false, message: 'Availability field required' });
  }
  try {
    const product = await Product.findOneAndUpdate(
      { id: req.params.id },
      { availability },
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    console.error('[Product] updateProductAvailability error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};
