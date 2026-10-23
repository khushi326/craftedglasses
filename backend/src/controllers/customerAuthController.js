import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import Customer from '../models/Customer.js';

const getJwtSecret = () => process.env.JWT_SECRET || 'craftedglasses_admin_secure_secret_key_2026';

// Resilient memory store (used if MongoDB is temporarily disconnected)
const memoryCustomers = new Map();

/**
 * @desc    Customer Registration
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerCustomer = async (req, res) => {
  try {
    const { fullName, email, mobile, password, address, city, state, pincode } = req.body;

    // Validate required fields
    if (!fullName || !email || !mobile || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email, mobile number, and password',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedMobile = mobile.trim();

    // Check database if connected
    if (mongoose.connection.readyState === 1) {
      try {
        const existingCustomer = await Customer.findOne({
          $or: [{ email: normalizedEmail }, { mobile: normalizedMobile }],
        });

        if (existingCustomer) {
          if (existingCustomer.email === normalizedEmail) {
            return res.status(400).json({
              success: false,
              message: 'An account with this email address already exists. Please log in.',
            });
          }
          return res.status(400).json({
            success: false,
            message: 'An account with this mobile number already exists. Please log in.',
          });
        }

        // Create in MongoDB (pre-save hook hashes password with bcrypt)
        const customer = await Customer.create({
          fullName: fullName.trim(),
          email: normalizedEmail,
          mobile: normalizedMobile,
          password,
          address: address || '',
          city: city || '',
          state: state || '',
          pincode: pincode || '',
          role: 'customer',
        });

        // Sync to memory store
        memoryCustomers.set(customer._id.toString(), {
          _id: customer._id.toString(),
          fullName: customer.fullName,
          email: customer.email,
          mobile: customer.mobile,
          password: customer.password,
          address: customer.address,
          city: customer.city,
          state: customer.state,
          pincode: customer.pincode,
          role: 'customer',
          createdAt: customer.createdAt,
        });

        const token = jwt.sign(
          {
            id: customer._id.toString(),
            role: 'customer',
            email: customer.email,
            name: customer.fullName,
          },
          getJwtSecret(),
          { expiresIn: '30d' }
        );

        return res.status(201).json({
          success: true,
          message: 'Account registered successfully',
          token,
          customer: {
            id: customer._id.toString(),
            fullName: customer.fullName,
            email: customer.email,
            mobile: customer.mobile,
            address: customer.address,
            city: customer.city,
            state: customer.state,
            pincode: customer.pincode,
            role: 'customer',
            createdAt: customer.createdAt,
          },
        });
      } catch (dbErr) {
        console.warn('[Customer Auth] Database write fallback to memory store:', dbErr.message);
      }
    }

    // Memory store fallback
    for (const cust of memoryCustomers.values()) {
      if (cust.email === normalizedEmail) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email address already exists. Please log in.',
        });
      }
      if (cust.mobile === normalizedMobile) {
        return res.status(400).json({
          success: false,
          message: 'An account with this mobile number already exists. Please log in.',
        });
      }
    }

    // Securely hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const mockId = new mongoose.Types.ObjectId().toString();

    const newCust = {
      _id: mockId,
      fullName: fullName.trim(),
      email: normalizedEmail,
      mobile: normalizedMobile,
      password: hashedPassword,
      address: address || '',
      city: city || '',
      state: state || '',
      pincode: pincode || '',
      role: 'customer',
      createdAt: new Date(),
    };

    memoryCustomers.set(mockId, newCust);

    const token = jwt.sign(
      {
        id: mockId,
        role: 'customer',
        email: newCust.email,
        name: newCust.fullName,
      },
      getJwtSecret(),
      { expiresIn: '30d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      token,
      customer: {
        id: mockId,
        fullName: newCust.fullName,
        email: newCust.email,
        mobile: newCust.mobile,
        address: newCust.address,
        city: newCust.city,
        state: newCust.state,
        pincode: newCust.pincode,
        role: 'customer',
        createdAt: newCust.createdAt,
      },
    });
  } catch (error) {
    console.error('Customer registration error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration',
    });
  }
};

/**
 * @desc    Customer Login
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginCustomer = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email or mobile number along with your password',
      });
    }

    const normalizedIdentifier = identifier.trim().toLowerCase();
    const rawIdentifier = identifier.trim();

    // Check database if connected
    if (mongoose.connection.readyState === 1) {
      try {
        const customer = await Customer.findOne({
          $or: [{ email: normalizedIdentifier }, { mobile: rawIdentifier }],
        });

        if (customer) {
          const isMatch = await customer.matchPassword(password);
          if (!isMatch) {
            return res.status(401).json({
              success: false,
              message: 'Invalid credentials. Password does not match.',
            });
          }

          const token = jwt.sign(
            {
              id: customer._id.toString(),
              role: 'customer',
              email: customer.email,
              name: customer.fullName,
            },
            getJwtSecret(),
            { expiresIn: '30d' }
          );

          return res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            token,
            customer: {
              id: customer._id.toString(),
              fullName: customer.fullName,
              email: customer.email,
              mobile: customer.mobile,
              address: customer.address,
              city: customer.city,
              state: customer.state,
              pincode: customer.pincode,
              role: 'customer',
              createdAt: customer.createdAt,
            },
          });
        }
      } catch (dbErr) {
        console.warn('[Customer Auth] Database read fallback to memory store:', dbErr.message);
      }
    }

    // Memory store fallback
    let matchedCust = null;
    for (const cust of memoryCustomers.values()) {
      if (cust.email === normalizedIdentifier || cust.mobile === rawIdentifier) {
        matchedCust = cust;
        break;
      }
    }

    if (!matchedCust) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. No customer account found with that email or mobile.',
      });
    }

    // Verify password with bcrypt
    const isMatch = await bcrypt.compare(password, matchedCust.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Password does not match.',
      });
    }

    const token = jwt.sign(
      {
        id: matchedCust._id,
        role: 'customer',
        email: matchedCust.email,
        name: matchedCust.fullName,
      },
      getJwtSecret(),
      { expiresIn: '30d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      customer: {
        id: matchedCust._id,
        fullName: matchedCust.fullName,
        email: matchedCust.email,
        mobile: matchedCust.mobile,
        address: matchedCust.address,
        city: matchedCust.city,
        state: matchedCust.state,
        pincode: matchedCust.pincode,
        role: 'customer',
        createdAt: matchedCust.createdAt,
      },
    });
  } catch (error) {
    console.error('Customer login error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during login',
    });
  }
};

/**
 * @desc    Get Current Customer Profile
 * @route   GET /api/auth/me
 * @access  Customer Protected
 */
export const getCustomerProfile = async (req, res) => {
  try {
    const customerId = req.customer.id;

    if (mongoose.connection.readyState === 1) {
      try {
        const customer = await Customer.findById(customerId);
        if (customer) {
          return res.status(200).json({
            success: true,
            customer: {
              id: customer._id.toString(),
              fullName: customer.fullName,
              email: customer.email,
              mobile: customer.mobile,
              address: customer.address,
              city: customer.city,
              state: customer.state,
              pincode: customer.pincode,
              role: 'customer',
              createdAt: customer.createdAt,
            },
          });
        }
      } catch (dbErr) {
        console.warn('[Customer Auth] Database read profile fallback:', dbErr.message);
      }
    }

    const memoryCust = memoryCustomers.get(customerId);
    if (memoryCust) {
      return res.status(200).json({
        success: true,
        customer: {
          id: memoryCust._id,
          fullName: memoryCust.fullName,
          email: memoryCust.email,
          mobile: memoryCust.mobile,
          address: memoryCust.address,
          city: memoryCust.city,
          state: memoryCust.state,
          pincode: memoryCust.pincode,
          role: 'customer',
          createdAt: memoryCust.createdAt,
        },
      });
    }

    // Default fallback from token payload
    return res.status(200).json({
      success: true,
      customer: {
        id: customerId,
        fullName: req.customer.name || 'Customer',
        email: req.customer.email || '',
        mobile: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        role: 'customer',
        createdAt: new Date(),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving profile',
    });
  }
};
