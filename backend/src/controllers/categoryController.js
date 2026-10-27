import Category from '../models/Category.js';
import { CATEGORIES_DATA } from '../data/catalog.js';

// @desc  Get all categories (public)
// @route GET /api/categories
export const getAllCategories = async (req, res) => {
  try {
    const raw = await Category.find();
    const source = raw.length ? raw : CATEGORIES_DATA;

    // Preserve the curated order defined in CATEGORIES_DATA
    const slugOrder = CATEGORIES_DATA.map((c) => c.slug);
    const sortedSource = [...source].sort((a, b) => {
      const idxA = slugOrder.indexOf(a.slug);
      const idxB = slugOrder.indexOf(b.slug);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.name.localeCompare(b.name);
    });

    // Map slug -> id so the frontend category filter (category.id) works consistently
    const categories = [
      { id: 'all', name: 'All Products', icon: '✨', slug: 'all', description: 'Browse all handcrafted products.' },
      ...sortedSource.map((c) => ({
        id: c.slug,
        name: c.name,
        icon: c.icon,
        slug: c.slug,
        description: c.description,
      })),
    ];
    res.json({ success: true, categories });
  } catch (error) {
    console.error('[Category] getAllCategories error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching categories.' });
  }
};

// @desc  Create a category (admin only)
// @route POST /api/categories
export const createCategory = async (req, res) => {
  try {
    const { name, slug, icon, description } = req.body;
    if (!name || !slug) {
      return res.status(400).json({ success: false, message: 'Name and slug are required.' });
    }
    const existing = await Category.findOne({ $or: [{ name }, { slug }] });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Category with this name or slug already exists.' });
    }
    const category = await Category.create({ name, slug, icon, description });
    res.status(201).json({ success: true, category });
  } catch (error) {
    console.error('[Category] createCategory error:', error);
    res.status(500).json({ success: false, message: 'Server error creating category.' });
  }
};

// @desc  Update a category (admin only)
// @route PUT /api/categories/:id
export const updateCategory = async (req, res) => {
  try {
    const { name, slug, icon, description } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, slug, icon, description },
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found.' });
    }
    res.json({ success: true, category });
  } catch (error) {
    console.error('[Category] updateCategory error:', error);
    res.status(500).json({ success: false, message: 'Server error updating category.' });
  }
};

// @desc  Delete a category (admin only)
// @route DELETE /api/categories/:id
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found.' });
    }
    res.json({ success: true, message: 'Category deleted successfully.' });
  } catch (error) {
    console.error('[Category] deleteCategory error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting category.' });
  }
};
