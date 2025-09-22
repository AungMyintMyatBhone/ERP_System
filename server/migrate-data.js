// Data migration script to populate MongoDB with mock data
require('dotenv').config({ path: './server.env' });
const mongoose = require('mongoose');

// Import the Mongoose models from server.js
const Customer = require('./models/Customer');
const Inventory = require('./models/Inventory');
const Sales = require('./models/Sales');
const Transaction = require('./models/Transaction');
const Employee = require('./models/Employee');

// Mock data (copied from frontend mockData.js)
const mockCustomers = [
  {
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-0123',
    company: 'Tech Solutions Inc',
    address: '123 Main St, New York, NY 10001',
    status: 'Active',
    createdDate: new Date('2024-01-15'),
    lastContact: new Date('2024-03-10'),
    totalOrders: 12,
    totalSpent: 15750.00
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    phone: '+1-555-0456',
    company: 'Global Enterprises',
    address: '456 Oak Ave, Los Angeles, CA 90210',
    status: 'Active',
    createdDate: new Date('2024-02-20'),
    lastContact: new Date('2024-03-15'),
    totalOrders: 8,
    totalSpent: 9250.00
  },
  {
    name: 'Michael Brown',
    email: 'mbrown@business.net',
    phone: '+1-555-0789',
    company: 'Innovation Corp',
    address: '789 Pine St, Chicago, IL 60601',
    status: 'Inactive',
    createdDate: new Date('2024-01-10'),
    lastContact: new Date('2024-02-28'),
    totalOrders: 5,
    totalSpent: 3200.00
  }
];

const mockInventory = [
  {
    name: 'Laptop Computer',
    sku: 'LT001',
    category: 'Electronics',
    quantity: 45,
    minStock: 10,
    maxStock: 100,
    price: 899.99,
    cost: 650.00,
    supplier: 'Tech Distributor',
    location: 'Warehouse A',
    lastUpdated: new Date('2024-03-15'),
    reorderPoint: 15,
    description: 'High-performance business laptop'
  },
  {
    name: 'Office Chair',
    sku: 'OC001',
    category: 'Furniture',
    quantity: 8,
    minStock: 15,
    maxStock: 50,
    price: 199.99,
    cost: 120.00,
    supplier: 'Furniture Plus',
    location: 'Warehouse B',
    lastUpdated: new Date('2024-03-14'),
    reorderPoint: 20,
    description: 'Ergonomic office chair with lumbar support'
  },
  {
    name: 'Wireless Mouse',
    sku: 'WM001',
    category: 'Electronics',
    quantity: 120,
    minStock: 25,
    maxStock: 200,
    price: 29.99,
    cost: 18.00,
    supplier: 'Tech Distributor',
    location: 'Warehouse A',
    lastUpdated: new Date('2024-03-16'),
    reorderPoint: 30,
    description: 'Bluetooth wireless mouse'
  }
];

const mockTransactions = [
  {
    description: 'Sales Revenue - March',
    amount: 124578.00,
    type: 'Income',
    category: 'Sales',
    date: new Date('2024-03-15'),
    reference: 'REV001',
    account: 'Revenue',
    tags: ['sales', 'monthly']
  },
  {
    description: 'Office Rent Payment',
    amount: -5000.00,
    type: 'Expense',
    category: 'Rent',
    date: new Date('2024-03-01'),
    reference: 'EXP001',
    account: 'Operating Expenses',
    tags: ['rent', 'monthly', 'fixed']
  },
  {
    description: 'Equipment Purchase',
    amount: -15000.00,
    type: 'Expense',
    category: 'Equipment',
    date: new Date('2024-03-10'),
    reference: 'EXP002',
    account: 'Capital Expenditure',
    tags: ['equipment', 'capex']
  }
];

const mockEmployees = [
  {
    employeeId: 'EMP001',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@company.com',
    phone: '+1-555-0101',
    position: 'Senior Developer',
    department: 'Engineering',
    salary: 85000,
    hireDate: new Date('2022-01-15'),
    status: 'Active',
    manager: 'John Smith',
    address: '123 Tech Street, San Francisco, CA',
    emergencyContact: 'Bob Johnson - +1-555-0102',
    benefits: ['Health Insurance', 'Dental', '401k'],
    skills: ['React', 'Node.js', 'Python', 'AWS']
  },
  {
    employeeId: 'EMP002',
    firstName: 'Bob',
    lastName: 'Wilson',
    email: 'bob.wilson@company.com',
    phone: '+1-555-0102',
    position: 'Sales Manager',
    department: 'Sales',
    salary: 75000,
    hireDate: new Date('2021-06-20'),
    status: 'Active',
    manager: 'Sarah Davis',
    address: '456 Sales Ave, New York, NY',
    emergencyContact: 'Mary Wilson - +1-555-0103',
    benefits: ['Health Insurance', 'Commission', 'Car Allowance'],
    skills: ['CRM', 'Negotiation', 'Lead Generation']
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`🔗 MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Clear existing data
const clearCollections = async () => {
  try {
    await Customer.deleteMany({});
    await Inventory.deleteMany({});
    await Transaction.deleteMany({});
    await Employee.deleteMany({});
    await Sales.deleteMany({});
    console.log('🧹 Existing data cleared');
  } catch (error) {
    console.error('❌ Error clearing collections:', error);
    throw error;
  }
};

// Migrate customers
const migrateCustomers = async () => {
  try {
    const customers = await Customer.insertMany(mockCustomers);
    console.log(`✅ Migrated ${customers.length} customers`);
    return customers;
  } catch (error) {
    console.error('❌ Error migrating customers:', error);
    throw error;
  }
};

// Migrate inventory
const migrateInventory = async () => {
  try {
    const inventory = await Inventory.insertMany(mockInventory);
    console.log(`✅ Migrated ${inventory.length} inventory items`);
    return inventory;
  } catch (error) {
    console.error('❌ Error migrating inventory:', error);
    throw error;
  }
};

// Migrate transactions
const migrateTransactions = async () => {
  try {
    const transactions = await Transaction.insertMany(mockTransactions);
    console.log(`✅ Migrated ${transactions.length} transactions`);
    return transactions;
  } catch (error) {
    console.error('❌ Error migrating transactions:', error);
    throw error;
  }
};

// Migrate employees
const migrateEmployees = async () => {
  try {
    const employees = await Employee.insertMany(mockEmployees);
    console.log(`✅ Migrated ${employees.length} employees`);
    return employees;
  } catch (error) {
    console.error('❌ Error migrating employees:', error);
    throw error;
  }
};

// Migrate sales (depends on customers and inventory)
const migrateSales = async (customers, inventory) => {
  try {
    // Create sales orders with references to actual MongoDB documents
    const mockSales = [
      {
        orderNumber: 'ORD001',
        customer: customers[0]._id, // Reference to John Smith
        customerName: customers[0].name,
        customerEmail: customers[0].email,
        items: [
          { 
            product: inventory[0]._id, // Laptop Computer
            productName: inventory[0].name,
            quantity: 2, 
            unitPrice: inventory[0].price 
          },
          { 
            product: inventory[2]._id, // Wireless Mouse
            productName: inventory[2].name,
            quantity: 2, 
            unitPrice: inventory[2].price 
          }
        ],
        subtotal: 1859.96,
        tax: 148.80,
        discount: 50.00,
        total: 1958.76,
        status: 'Completed',
        date: new Date('2024-03-15'),
        salesRep: 'Alice Johnson',
        paymentMethod: 'Credit Card',
        shippingAddress: customers[0].address
      },
      {
        orderNumber: 'ORD002',
        customer: customers[1]._id, // Reference to Sarah Johnson
        customerName: customers[1].name,
        customerEmail: customers[1].email,
        items: [
          { 
            product: inventory[1]._id, // Office Chair
            productName: inventory[1].name,
            quantity: 5, 
            unitPrice: inventory[1].price 
          }
        ],
        subtotal: 999.95,
        tax: 79.99,
        discount: 0,
        total: 1079.94,
        status: 'Pending',
        date: new Date('2024-03-16'),
        salesRep: 'Bob Wilson',
        paymentMethod: 'Bank Transfer',
        shippingAddress: customers[1].address
      }
    ];

    const sales = await Sales.insertMany(mockSales);
    console.log(`✅ Migrated ${sales.length} sales orders`);
    return sales;
  } catch (error) {
    console.error('❌ Error migrating sales:', error);
    throw error;
  }
};

// Main migration function
const migrateData = async () => {
  try {
    console.log('🚀 Starting data migration...');
    
    // Connect to database
    await connectDB();
    
    // Clear existing data
    await clearCollections();
    
    // Migrate data in order
    const customers = await migrateCustomers();
    const inventory = await migrateInventory();
    const transactions = await migrateTransactions();
    const employees = await migrateEmployees();
    const sales = await migrateSales(customers, inventory);
    
    console.log('\n🎉 Data migration completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Customers: ${customers.length}`);
    console.log(`   - Inventory Items: ${inventory.length}`);
    console.log(`   - Transactions: ${transactions.length}`);
    console.log(`   - Employees: ${employees.length}`);
    console.log(`   - Sales Orders: ${sales.length}`);
    
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

// Run migration if this file is executed directly
if (require.main === module) {
  migrateData();
}

module.exports = { migrateData };