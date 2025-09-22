const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
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
  position: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  salary: {
    type: Number,
    required: true,
    min: 0
  },
  hireDate: {
    type: Date,
    required: true
  },
  terminationDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'On Leave', 'Terminated'],
    default: 'Active'
  },
  manager: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  emergencyContact: {
    type: String,
    trim: true
  },
  benefits: [{
    type: String,
    trim: true
  }],
  skills: [{
    type: String,
    trim: true
  }],
  performanceRating: {
    type: Number,
    min: 1,
    max: 5
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
employeeSchema.index({ employeeId: 1 });
employeeSchema.index({ email: 1 });
employeeSchema.index({ department: 1 });
employeeSchema.index({ status: 1 });

// Virtual for full name
employeeSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for years of service
employeeSchema.virtual('yearsOfService').get(function() {
  const endDate = this.terminationDate || new Date();
  const years = (endDate - this.hireDate) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(years);
});

module.exports = mongoose.model('Employee', employeeSchema);