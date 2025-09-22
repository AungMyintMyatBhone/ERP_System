const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, 'server.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.url || process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MongoDB connection string not found in environment variables');
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB Atlas connected successfully!');
    console.log(`📍 Connected to database: ${mongoose.connection.db.databaseName}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// MongoDB connection event listeners
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  Mongoose disconnected from MongoDB Atlas');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('🔒 MongoDB connection closed due to application termination');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during graceful shutdown:', error);
    process.exit(1);
  }
});

// Database Models
const Customer = require('./models/Customer');
const Inventory = require('./models/Inventory');
const Sales = require('./models/Sales');
const Transaction = require('./models/Transaction');
const Employee = require('./models/Employee');

// API Routes

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'ERP Server is running!', 
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Customer Routes
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdDate: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/customers', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inventory Routes
app.get('/api/inventory', async (req, res) => {
  try {
    const inventory = await Inventory.find().sort({ lastUpdated: -1 });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/inventory', async (req, res) => {
  try {
    const item = new Inventory(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/inventory/low-stock', async (req, res) => {
  try {
    const lowStockItems = await Inventory.find({
      $expr: { $lte: ['$quantity', '$minStock'] }
    });
    res.json(lowStockItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/inventory/:id', async (req, res) => {
  try {
    const item = await Inventory.findByIdAndUpdate(
      req.params.id, 
      { ...req.body, lastUpdated: new Date() }, 
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/inventory/:id', async (req, res) => {
  try {
    const item = await Inventory.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sales Routes
app.get('/api/sales', async (req, res) => {
  try {
    const sales = await Sales.find().sort({ date: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/sales', async (req, res) => {
  try {
    // Generate order number if not provided
    if (!req.body.orderNumber) {
      const count = await Sales.countDocuments();
      req.body.orderNumber = `ORD${String(count + 1).padStart(4, '0')}`;
    }
    
    const sale = new Sales(req.body);
    await sale.save();
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/sales/metrics', async (req, res) => {
  try {
    const totalSales = await Sales.aggregate([
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    
    const completedSales = await Sales.countDocuments({ status: 'Completed' });
    const pendingSales = await Sales.countDocuments({ status: 'Pending' });
    
    res.json({
      totalRevenue: totalSales[0]?.total || 0,
      completedSales,
      pendingSales,
      totalOrders: await Sales.countDocuments()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Financial Routes
app.get('/api/financial/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/financial/transactions', async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/financial/metrics', async (req, res) => {
  try {
    const income = await Transaction.aggregate([
      { $match: { type: 'Income' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const expenses = await Transaction.aggregate([
      { $match: { type: 'Expense' } },
      { $group: { _id: null, total: { $sum: { $abs: '$amount' } } } }
    ]);
    
    const totalIncome = income[0]?.total || 0;
    const totalExpenses = expenses[0]?.total || 0;
    
    res.json({
      totalIncome,
      totalExpenses,
      netProfit: totalIncome - totalExpenses,
      accountBalance: totalIncome - totalExpenses
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// HR Routes
app.get('/api/hr/employees', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ hireDate: -1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/hr/employees', async (req, res) => {
  try {
    // Generate employee ID if not provided
    if (!req.body.employeeId) {
      const count = await Employee.countDocuments();
      req.body.employeeId = `EMP${String(count + 1).padStart(3, '0')}`;
    }
    
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/hr/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/hr/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dashboard Routes
app.get('/api/dashboard/overview', async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();
    const totalInventoryItems = await Inventory.countDocuments();
    const activeEmployees = await Employee.countDocuments({ status: 'Active' });
    const lowStockItems = await Inventory.countDocuments({
      $expr: { $lte: ['$quantity', '$minStock'] }
    });
    const pendingOrders = await Sales.countDocuments({ status: 'Pending' });
    
    const monthlySales = await Sales.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }
      },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    
    res.json({
      totalCustomers,
      totalInventoryItems,
      monthlySales: monthlySales[0]?.total || 0,
      activeEmployees,
      lowStockItems,
      pendingOrders
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 ERP Server running on port ${PORT}`);
      console.log(`📍 API endpoint: http://localhost:${PORT}/api`);
      console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
