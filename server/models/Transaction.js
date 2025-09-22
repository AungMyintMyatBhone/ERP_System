const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['Income', 'Expense'],
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  reference: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  account: {
    type: String,
    required: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  attachments: [{
    filename: String,
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringFrequency: {
    type: String,
    enum: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'],
    required: function() { return this.isRecurring; }
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
transactionSchema.index({ date: -1 });
transactionSchema.index({ type: 1 });
transactionSchema.index({ category: 1 });
transactionSchema.index({ reference: 1 });

// Virtual for absolute amount (always positive)
transactionSchema.virtual('absoluteAmount').get(function() {
  return Math.abs(this.amount);
});

module.exports = mongoose.model('Transaction', transactionSchema);