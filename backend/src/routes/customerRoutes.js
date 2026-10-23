import express from 'express';
import {
  registerCustomer,
  loginCustomer,
  getCustomerProfile,
} from '../controllers/customerAuthController.js';
import { requireCustomerAuth } from '../middleware/customerAuth.js';

const router = express.Router();

// Public routes for customer authentication
router.post('/register', registerCustomer);
router.post('/login', loginCustomer);

// Protected customer routes
router.get('/me', requireCustomerAuth, getCustomerProfile);

export default router;
