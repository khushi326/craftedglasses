import jwt from 'jsonwebtoken';
import Customer from '../models/Customer.js';

/**
 * Middleware to protect customer routes and enforce customer role
 */
export const requireCustomerAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in to your account.',
      });
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET || 'craftedglasses_admin_secure_secret_key_2026';

    const decoded = jwt.verify(token, jwtSecret);

    if (!decoded || decoded.role !== 'customer') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Valid customer account required.',
      });
    }

    // Attach customer payload
    req.customer = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Your session has expired. Please log in again.',
    });
  }
};
