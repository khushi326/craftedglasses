import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { CATEGORIES_DATA, PRODUCTS_DATA } from '../data/catalog.js';

/**
 * Insert or synchronize catalog records so both local and production databases
 * reflect the latest product categories, names, and images.
 * Safe to run on every server start (including Render).
 */
export const ensureCatalog = async () => {
  try {
    let createdCategories = 0;
    let createdProducts = 0;

    // Clean up obsolete slugs to ensure category filtering matches exactly
    await Category.deleteMany({ slug: 'phone-cases' });

    for (const cat of CATEGORIES_DATA) {
      const result = await Category.updateOne(
        { slug: cat.slug },
        {
          $set: {
            name: cat.name,
            slug: cat.slug,
            icon: cat.icon,
            description: cat.description,
          },
        },
        { upsert: true }
      );
      if (result.upsertedCount) createdCategories += 1;
    }

    for (const prod of PRODUCTS_DATA) {
      const result = await Product.updateOne(
        { id: prod.id },
        {
          $set: {
            id: prod.id,
            name: prod.name,
            type: prod.type,
            category: prod.category,
            categoryName: prod.categoryName,
            price: prod.price,
            availability: prod.availability,
            badge: prod.badge,
            shortDescription: prod.shortDescription,
            description: prod.description,
            materials: prod.materials,
            image: prod.image,
            gallery: prod.gallery,
            availableOptions: prod.availableOptions,
            customisationSchema: prod.customisationSchema,
          },
        },
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
