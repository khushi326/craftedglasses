import express from 'express';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { requireAdminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

// Public routes
router.get('/', getAllCategories);

// Admin-only routes
router.post('/', requireAdminAuth, createCategory);
router.put('/:id', requireAdminAuth, updateCategory);
router.delete('/:id', requireAdminAuth, deleteCategory);

export default router;
