import express from 'express';
import { adminLogin, verifyAdmin } from '../controllers/adminAuthController.js';
import {
  getAllOrdersAdmin,
  updateOrderStatus,
  getAdminStats,
} from '../controllers/orderController.js';
import { requireAdminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

// Admin Authentication (Public Login)
router.post('/login', adminLogin);

// Admin Protected Routes (All require role: admin)
router.get('/verify', requireAdminAuth, verifyAdmin);
router.get('/stats', requireAdminAuth, getAdminStats);
router.get('/orders', requireAdminAuth, getAllOrdersAdmin);
router.put('/orders/:id/status', requireAdminAuth, updateOrderStatus);

export default router;
