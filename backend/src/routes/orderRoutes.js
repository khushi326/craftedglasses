import express from 'express';
import { createOrder, getMyOrders } from '../controllers/orderController.js';
import { requireCustomerAuth } from '../middleware/customerAuth.js';

const router = express.Router();

// Customer order routes (require customer login)
router.post('/', requireCustomerAuth, createOrder);
router.get('/my-orders', requireCustomerAuth, getMyOrders);

export default router;
