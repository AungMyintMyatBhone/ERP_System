// Example script to add additional data to MongoDB
require('dotenv').config({ path: './server.env' });
const mongoose = require('mongoose');

// Import models
const Customer = require('./models/Customer');
const Inventory = require('./models/Inventory');
const Sales = require('./models/Sales');
const Transaction = require('./models/Transaction');
const Employee = require('./models/Employee');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🔗 Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ Connection error:', error);
    process.exit(1);
  }
};

// Example: Add a new customer
const addNewCustomer = async () => {
  try {
    const newCustomer = new Customer({
      name: 'David Wilson',
      email: 'david.wilson@newcompany.com',
      phone: '+1-555-0999',
      company: 'Wilson Enterprises',
      address: '999 Business Blvd, Miami, FL 33101',
      status: 'Active',
      totalOrders: 0,
      totalSpent: 0
    });

    const savedCustomer = await newCustomer.save();
    console.log('✅ New customer added:', savedCustomer.name);
    return savedCustomer;
  } catch (error) {
    console.error('❌ Error adding customer:', error.message);
  }
};

// Example: Add a new inventory item
const addNewInventoryItem = async () => {
  try {
    const newItem = new Inventory({
      name: 'Mechanical Keyboard',
      sku: 'KB001',
      category: 'Electronics',
      quantity: 50,
      minStock: 10,
      maxStock: 100,
      price: 149.99,
      cost: 85.00,
      supplier: 'Tech Distributor',
      location: 'Warehouse A',
      reorderPoint: 15,
      description: 'RGB mechanical gaming keyboard'
    });

    const savedItem = await newItem.save();
    console.log('✅ New inventory item added:', savedItem.name);
    return savedItem;
  } catch (error) {
    console.error('❌ Error adding inventory item:', error.message);
  }
};

// Example: Create a new sales order
const createNewSalesOrder = async (customer, inventoryItem) => {
  try {
    const orderNumber = `ORD${Date.now().toString().slice(-6)}`;
    
    const newSale = new Sales({
      orderNumber: orderNumber,
      customer: customer._id,
      customerName: customer.name,
      customerEmail: customer.email,
      items: [{
        product: inventoryItem._id,
        productName: inventoryItem.name,
        quantity: 2,
        unitPrice: inventoryItem.price
      }],
      subtotal: inventoryItem.price * 2,
      tax: inventoryItem.price * 2 * 0.08, // 8% tax
      discount: 0,
      total: (inventoryItem.price * 2) * 1.08,
      status: 'Pending',
      salesRep: 'John Doe',
      paymentMethod: 'Credit Card',
      shippingAddress: customer.address
    });

    const savedSale = await newSale.save();
    console.log('✅ New sales order created:', savedSale.orderNumber);
    return savedSale;
  } catch (error) {
    console.error('❌ Error creating sales order:', error.message);
  }
};

// Example: Add a financial transaction
const addNewTransaction = async () => {
  try {
    const newTransaction = new Transaction({
      description: 'Office Supplies Purchase',
      amount: -250.00,
      type: 'Expense',
      category: 'Office Supplies',
      reference: `EXP${Date.now().toString().slice(-6)}`,
      account: 'Operating Expenses',
      tags: ['supplies', 'office', 'monthly']
    });

    const savedTransaction = await newTransaction.save();
    console.log('✅ New transaction added:', savedTransaction.description);
    return savedTransaction;
  } catch (error) {
    console.error('❌ Error adding transaction:', error.message);
  }
};

// Example: Add a new employee
const addNewEmployee = async () => {
  try {
    const newEmployee = new Employee({
      employeeId: 'EMP003',
      firstName: 'Carol',
      lastName: 'Davis',
      email: 'carol.davis@company.com',
      phone: '+1-555-0103',
      position: 'Marketing Manager',
      department: 'Marketing',
      salary: 70000,
      hireDate: new Date('2024-01-01'),
      status: 'Active',
      manager: 'Sarah Johnson',
      address: '789 Marketing St, Boston, MA',
      emergencyContact: 'Tom Davis - +1-555-0104',
      benefits: ['Health Insurance', 'Dental', 'Vision'],
      skills: ['Digital Marketing', 'SEO', 'Content Strategy']
    });

    const savedEmployee = await newEmployee.save();
    console.log('✅ New employee added:', `${savedEmployee.firstName} ${savedEmployee.lastName}`);
    return savedEmployee;
  } catch (error) {
    console.error('❌ Error adding employee:', error.message);
  }
};

// Main function to demonstrate adding data
const addSampleData = async () => {
  console.log('🚀 Adding sample data to MongoDB...\n');
  
  try {
    await connectDB();
    
    // Add sample data
    const customer = await addNewCustomer();
    const inventoryItem = await addNewInventoryItem();
    const transaction = await addNewTransaction();
    const employee = await addNewEmployee();
    
    // Create a sales order using the new customer and inventory item
    if (customer && inventoryItem) {
      await createNewSalesOrder(customer, inventoryItem);
    }
    
    console.log('\n🎉 Sample data added successfully!');
    
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    
  } catch (error) {
    console.error('❌ Error adding sample data:', error);
  }
};

// Export functions for use in other scripts
module.exports = {
  addNewCustomer,
  addNewInventoryItem,
  createNewSalesOrder,
  addNewTransaction,
  addNewEmployee,
  addSampleData
};

// Run if executed directly
if (require.main === module) {
  addSampleData();
}