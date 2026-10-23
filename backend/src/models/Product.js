import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    categoryName: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    availability: {
      type: String,
      enum: ['In Stock', 'Out of Stock', 'Limited Edition', 'Made to Order'],
      default: 'In Stock',
    },
    badge: {
      type: String,
      default: '',
    },
    shortDescription: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    materials: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: '',
    },
    gallery: {
      type: [String],
      default: [],
    },
    availableOptions: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    customisationSchema: {
      type: mongoose.Schema.Types.Mixed,
      default: { fields: [] },
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
