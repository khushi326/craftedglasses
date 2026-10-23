import jwt from 'jsonwebtoken';

/**
 * @desc    Fixed Admin Login
 * @route   POST /api/admin/login
 * @access  Public
 */
export const adminLogin = (req, res) => {
  try {
    const { username, password } = req.body;

    const envUsername = process.env.ADMIN_USERNAME || 'admin';
    const envPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const jwtSecret = process.env.JWT_SECRET || 'craftedglasses_admin_secure_secret_key_2026';

    // Validate inputs
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required',
      });
    }

    // Trim whitespace and compare
    const inputUsername = username.trim();
    const inputPassword = password;

    // Check credentials strictly against environment variables
    if (inputUsername !== envUsername || inputPassword !== envPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin username or password',
      });
    }

    // Generate JWT token for admin session
    const token = jwt.sign(
      {
        role: 'admin',
        username: envUsername,
      },
      jwtSecret,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Admin authenticated successfully',
      token,
      admin: {
        username: envUsername,
        role: 'admin',
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error during admin authentication',
    });
  }
};

/**
 * @desc    Verify Admin Token
 * @route   GET /api/admin/verify
 * @access  Admin Protected
 */
export const verifyAdmin = (req, res) => {
  return res.status(200).json({
    success: true,
    authenticated: true,
    admin: req.admin,
  });
};
