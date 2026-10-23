import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { CATEGORIES_DATA, PRODUCTS_DATA } from '../data/catalog.js';

/**
 * Insert missing catalog records without overwriting items that already exist.
 * Safe to run on every server start (including Render).
 */
export const ensureCatalog = async () => {
  try {
    let createdCategories = 0;
    let createdProducts = 0;

    for (const cat of CATEGORIES_DATA) {
      const result = await Category.updateOne(
        { slug: cat.slug },
        { $setOnInsert: cat },
        { upsert: true }
      );
      if (result.upsertedCount) createdCategories += 1;
    }

    for (const prod of PRODUCTS_DATA) {
      const result = await Product.updateOne(
        { id: prod.id },
        { $setOnInsert: prod },
        { upsert: true }
      );
      if (result.upsertedCount) createdProducts += 1;
    }

    const [categoryCount, productCount] = await Promise.all([
      Category.countDocuments(),
      Product.countDocuments(),
    ]);

    console.log(
      `[Catalog] Ready — categories: ${categoryCount} (+${createdCategories}), products: ${productCount} (+${createdProducts})`
    );
  } catch (error) {
    console.error('[Catalog] Failed to ensure catalog:', error.message);
  }
};
