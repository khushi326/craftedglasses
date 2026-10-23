import express from 'express';

import mongoose from 'mongoose';

import adminRoutes from './adminRoutes.js';

import customerRoutes from './customerRoutes.js';

import orderRoutes from './orderRoutes.js';

import productRoutes from './productRoutes.js';

import categoryRoutes from './categoryRoutes.js';

const router = express.Router();

/**

 * @route   GET /api

 * @desc    API Root status

 */

router.get('/', (req, res) => {

  res.json({

    message: 'Craftedglasses API is running',

    version: '1.0.0',

    phase: 'Full Backend - Products, Categories, Orders, Auth',

  });

});

/**

 * @route   GET /api/health

 * @desc    Health check endpoint (server & DB status)

 */

router.get('/health', (req, res) => {

  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

  res.status(200).json({

    status: 'ok',

    timestamp: new Date().toISOString(),

    uptime: process.uptime(),

    database: {

      status: dbStatus,

      readyState: mongoose.connection.readyState,

    },

  });

});

// Customer Authentication Routes (/api/auth/register, /api/auth/login, /api/auth/me)

router.use('/auth', customerRoutes);

// Customer Order Routes (/api/orders, /api/orders/my-orders)

router.use('/orders', orderRoutes);

// Admin Routes (/api/admin/login, /api/admin/verify, /api/admin/stats, /api/admin/orders)

router.use('/admin', adminRoutes);

// Product Routes (/api/products, /api/products/:id)

router.use('/products', productRoutes);

// Category Routes (/api/categories, /api/categories/:id)

router.use('/categories', categoryRoutes);

export default router;
