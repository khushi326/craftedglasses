import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    product: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      category: { type: String },
      image: { type: String },
    },
    customisation: {
      type: Object,
      default: {},
    },
    deliveryAddress: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
      deliveryNotes: String,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Confirmed', 'Processing', 'Completed', 'Cancelled'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
