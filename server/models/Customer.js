const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  company: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Pending'],
    default: 'Active'
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  lastContact: {
    type: Date
  },
  totalOrders: {
    type: Number,
    default: 0
  },
  totalSpent: {
    type: Number,
    default: 0
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

// Indexes for better query performance
customerSchema.index({ email: 1 });
customerSchema.index({ company: 1 });
customerSchema.index({ status: 1 });

module.exports = mongoose.model('Customer', customerSchema);