const mongoose = require('mongoose');

const salesItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0
  },
  totalPrice: {
    type: Number,
    min: 0
  }
});

// Calculate total price before saving
salesItemSchema.pre('save', function(next) {
  this.totalPrice = this.quantity * this.unitPrice;
  next();
});

const salesSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  items: [salesItemSchema],
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  tax: {
    type: Number,
    default: 0,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  date: {
    type: Date,
    default: Date.now
  },
  salesRep: {
    type: String,
    trim: true
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Check', 'Other'],
    default: 'Cash'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Partially Paid', 'Refunded'],
    default: 'Pending'
  },
  shippingAddress: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
salesSchema.index({ orderNumber: 1 });
salesSchema.index({ customer: 1 });
salesSchema.index({ date: -1 });
salesSchema.index({ status: 1 });

module.exports = mongoose.model('Sales', salesSchema);