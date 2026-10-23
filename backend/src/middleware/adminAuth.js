import jwt from 'jsonwebtoken';

/**
 * Middleware to protect admin routes using JWT
 */
export const requireAdminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No admin authorization token provided.',
      });
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET || 'craftedglasses_admin_secure_secret_key_2026';

    const decoded = jwt.verify(token, jwtSecret);

    if (!decoded || decoded.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.',
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired admin session. Please log in again.',
    });
  }
};
