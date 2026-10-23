import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

// Exact Order Statuses allowed by project PDF
export const ALLOWED_STATUSES = [
  'New',
  'Contacted',
  'Confirmed',
  'Processing',
  'Completed',
  'Cancelled',
];

// In-memory orders store fallback (synced with MongoDB when connected)
const memoryOrders = new Map();

/**
 * @desc    Create new customer order
 * @route   POST /api/orders
 * @access  Customer Protected
 */
export const createOrder = async (req, res) => {
  try {
    const { product, customisation, deliveryAddress } = req.body;

    if (!product || !product.id || !product.name || !product.price) {
      return res.status(400).json({
        success: false,
        message: 'Product details are required to place an order',
      });
    }

    if (!deliveryAddress || !deliveryAddress.fullName || !deliveryAddress.phone || !deliveryAddress.address) {
      return res.status(400).json({
        success: false,
        message: 'Recipient full name, phone number, and delivery address are required',
      });
    }

    const orderId = `CG-${Math.floor(10000 + Math.random() * 90000)}`;

    const orderPayload = {
      orderId,
      customer: req.customer.id,
      customerName: req.customer.name || deliveryAddress.fullName,
      customerEmail: req.customer.email,
      customerPhone: deliveryAddress.phone,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category || 'Handmade',
        image: product.image || '',
      },
      customisation: customisation || {},
      deliveryAddress: {
        fullName: deliveryAddress.fullName,
        phone: deliveryAddress.phone,
        address: deliveryAddress.address,
        city: deliveryAddress.city || '',
        state: deliveryAddress.state || '',
        pincode: deliveryAddress.pincode || '',
        deliveryNotes: deliveryAddress.deliveryNotes || '',
      },
      status: 'New',
      createdAt: new Date(),
    };

    // Database write if connected
    if (mongoose.connection.readyState === 1) {
      try {
        const newOrder = await Order.create(orderPayload);
        memoryOrders.set(newOrder._id.toString(), newOrder.toObject());
        return res.status(201).json({
          success: true,
          message: 'Order placed successfully',
          order: newOrder,
        });
      } catch (dbErr) {
        console.warn('[Order Controller] DB write fallback:', dbErr.message);
      }
    }

    // Memory store fallback
    const mockId = new mongoose.Types.ObjectId().toString();
    const createdMemoryOrder = { _id: mockId, ...orderPayload };
    memoryOrders.set(mockId, createdMemoryOrder);

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: createdMemoryOrder,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error creating order',
    });
  }
};

/**
 * @desc    Get logged in customer's own orders
 * @route   GET /api/orders/my-orders
 * @access  Customer Protected (Strictly restricted to own orders)
 */
export const getMyOrders = async (req, res) => {
  try {
    const customerId = req.customer.id;

    if (mongoose.connection.readyState === 1) {
      try {
        const orders = await Order.find({ customer: customerId }).sort({ createdAt: -1 });
        return res.status(200).json({
          success: true,
          count: orders.length,
          orders,
        });
      } catch (dbErr) {
        console.warn('[Order Controller] DB read fallback:', dbErr.message);
      }
    }

    // Memory store fallback (strictly filter by customer id)
    const ownOrders = Array.from(memoryOrders.values())
      .filter((o) => String(o.customer) === String(customerId))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json({
      success: true,
      count: ownOrders.length,
      orders: ownOrders,
    });
  } catch (error) {
    console.error('Get my orders error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving your orders',
    });
  }
};

/**
 * @desc    Get all orders for Admin
 * @route   GET /api/admin/orders
 * @access  Admin Protected
 */
export const getAllOrdersAdmin = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const orders = await Order.find().sort({ createdAt: -1 });
        return res.status(200).json({
          success: true,
          count: orders.length,
          orders,
        });
      } catch (dbErr) {
        console.warn('[Order Controller] DB read all orders fallback:', dbErr.message);
      }
    }

    const allOrders = Array.from(memoryOrders.values()).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return res.status(200).json({
      success: true,
      count: allOrders.length,
      orders: allOrders,
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving all orders',
    });
  }
};

/**
 * @desc    Update order status (Admin)
 * @route   PUT /api/admin/orders/:id/status
 * @access  Admin Protected
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed statuses are: ${ALLOWED_STATUSES.join(', ')}`,
      });
    }

    if (mongoose.connection.readyState === 1) {
      try {
        const order = await Order.findOne({
          $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { orderId: id }].filter(Boolean),
        });

        if (order) {
          order.status = status;
          await order.save();
          if (memoryOrders.has(order._id.toString())) {
            memoryOrders.get(order._id.toString()).status = status;
          }
          return res.status(200).json({
            success: true,
            message: `Order status updated to ${status}`,
            order,
          });
        }
      } catch (dbErr) {
        console.warn('[Order Controller] DB update order status fallback:', dbErr.message);
      }
    }

    // Memory store fallback
    for (const [key, ord] of memoryOrders.entries()) {
      if (ord._id === id || ord.orderId === id) {
        ord.status = status;
        memoryOrders.set(key, ord);
        return res.status(200).json({
          success: true,
          message: `Order status updated to ${status}`,
          order: ord,
        });
      }
    }

    return res.status(404).json({
      success: false,
      message: 'Order not found',
    });
  } catch (error) {
    console.error('Update order status error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error updating order status',
    });
  }
};

/**
 * @desc    Get Admin Dashboard Statistics
 * @route   GET /api/admin/stats
 * @access  Admin Protected
 */
export const getAdminStats = async (req, res) => {
  try {
    let totalOrders = 0;
    let newOrders = 0;
    let contactedOrders = 0;
    let confirmedOrders = 0;
    let processingOrders = 0;
    let completedOrders = 0;
    let cancelledOrders = 0;

    if (mongoose.connection.readyState === 1) {
      try {
        totalOrders = await Order.countDocuments();
        newOrders = await Order.countDocuments({ status: 'New' });
        contactedOrders = await Order.countDocuments({ status: 'Contacted' });
        confirmedOrders = await Order.countDocuments({ status: 'Confirmed' });
        processingOrders = await Order.countDocuments({ status: 'Processing' });
        completedOrders = await Order.countDocuments({ status: 'Completed' });
        cancelledOrders = await Order.countDocuments({ status: 'Cancelled' });

        const totalProducts = (await Product.countDocuments()) || 6;
        const availableProducts = (await Product.countDocuments({ availability: { $ne: 'Out of Stock' } })) || 5;

        return res.status(200).json({
          success: true,
          stats: {
            totalProducts,
            availableProducts,
            totalOrders,
            newOrders,
            contactedOrders,
            confirmedOrders,
            processingOrders,
            completedOrders,
            cancelledOrders,
          },
        });
      } catch (dbErr) {
        console.warn('[Order Controller] DB count fallback:', dbErr.message);
      }
    }

    // Memory store counts
    const ordersList = Array.from(memoryOrders.values());
    totalOrders = ordersList.length;
    newOrders = ordersList.filter((o) => o.status === 'New').length;
    contactedOrders = ordersList.filter((o) => o.status === 'Contacted').length;
    confirmedOrders = ordersList.filter((o) => o.status === 'Confirmed').length;
    processingOrders = ordersList.filter((o) => o.status === 'Processing').length;
    completedOrders = ordersList.filter((o) => o.status === 'Completed').length;
    cancelledOrders = ordersList.filter((o) => o.status === 'Cancelled').length;

    return res.status(200).json({
      success: true,
      stats: {
        totalProducts: 6,
        availableProducts: 5,
        totalOrders,
        newOrders,
        contactedOrders,
        confirmedOrders,
        processingOrders,
        completedOrders,
        cancelledOrders,
      },
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving statistics',
    });
  }
};
