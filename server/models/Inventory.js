const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  minStock: {
    type: Number,
    required: true,
    min: 0
  },
  maxStock: {
    type: Number,
    required: true,
    min: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  cost: {
    type: Number,
    required: true,
    min: 0
  },
  supplier: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  reorderPoint: {
    type: Number,
    min: 0
  },
  description: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
inventorySchema.index({ sku: 1 });
inventorySchema.index({ category: 1 });
inventorySchema.index({ quantity: 1 });

// Virtual for low stock indicator
inventorySchema.virtual('isLowStock').get(function() {
  return this.quantity <= this.reorderPoint;
});

module.exports = mongoose.model('Inventory', inventorySchema);