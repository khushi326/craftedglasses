import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductAvailability,
} from '../controllers/productController.js';
import { requireAdminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Admin-only routes
router.post('/', requireAdminAuth, createProduct);
router.put('/:id', requireAdminAuth, updateProduct);
router.delete('/:id', requireAdminAuth, deleteProduct);
router.patch('/:id/availability', requireAdminAuth, updateProductAvailability);

export default router;
