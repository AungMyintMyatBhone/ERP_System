/*
=============================================================================
MOCK DATA FILE - COMMENTED OUT FOR DATABASE INTEGRATION
=============================================================================

This file contains mock data that was previously used for development.
All data has been migrated to MongoDB Atlas through the migrate-data.js script.

The application now uses real database data through API calls instead of this mock data.

To restore mock data functionality, uncomment the exports below and update
the components to use mock data instead of API calls.

Migration Status:
✅ Data migrated to MongoDB Atlas
✅ API endpoints connected to database
✅ Frontend connected to backend
✅ Mock data replaced with real data

Database Connection:
- Backend Server: http://localhost:5001
- Database: MongoDB Atlas
- Migration Script: /server/migrate-data.js
=============================================================================
*/

// Mock data for development and testing - COMMENTED OUT FOR DATABASE INTEGRATION
/*
export const mockCustomers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-0123',
    company: 'Tech Solutions Inc',
    address: '123 Main St, New York, NY 10001',
    status: 'Active',
    createdDate: '2024-01-15',
    lastContact: '2024-03-10',
    totalOrders: 12,
    totalSpent: 15750.00
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    phone: '+1-555-0456',
    company: 'Global Enterprises',
    address: '456 Oak Ave, Los Angeles, CA 90210',
    status: 'Active',
    createdDate: '2024-02-20',
    lastContact: '2024-03-15',
    totalOrders: 8,
    totalSpent: 9250.00
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'mbrown@business.net',
    phone: '+1-555-0789',
    company: 'Innovation Corp',
    address: '789 Pine St, Chicago, IL 60601',
    status: 'Inactive',
    createdDate: '2024-01-10',
    lastContact: '2024-02-28',
    totalOrders: 5,
    totalSpent: 3200.00
  }
];

export const mockInventory = [
  {
    id: 1,
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
    lastUpdated: '2024-03-15',
    reorderPoint: 15,
    description: 'High-performance business laptop'
  },
  {
    id: 2,
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
    lastUpdated: '2024-03-14',
    reorderPoint: 20,
    description: 'Ergonomic office chair with lumbar support'
  },
  {
    id: 3,
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
    lastUpdated: '2024-03-16',
    reorderPoint: 30,
    description: 'Bluetooth wireless mouse'
  }
];

export const mockSales = [
  {
    id: 1,
    orderNumber: 'ORD001',
    customerId: 1,
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    items: [
      { productId: 1, productName: 'Laptop Computer', quantity: 2, unitPrice: 899.99 },
      { productId: 3, productName: 'Wireless Mouse', quantity: 2, unitPrice: 29.99 }
    ],
    subtotal: 1859.96,
    tax: 148.80,
    discount: 50.00,
    total: 1958.76,
    status: 'Completed',
    date: '2024-03-15',
    salesRep: 'Alice Johnson',
    paymentMethod: 'Credit Card',
    shippingAddress: '123 Main St, New York, NY 10001'
  },
  {
    id: 2,
    orderNumber: 'ORD002',
    customerId: 2,
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@company.com',
    items: [
      { productId: 2, productName: 'Office Chair', quantity: 5, unitPrice: 199.99 }
    ],
    subtotal: 999.95,
    tax: 79.99,
    discount: 0,
    total: 1079.94,
    status: 'Pending',
    date: '2024-03-16',
    salesRep: 'Bob Wilson',
    paymentMethod: 'Bank Transfer',
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90210'
  }
];

export const mockTransactions = [
  {
    id: 1,
    description: 'Sales Revenue - March',
    amount: 124578.00,
    type: 'Income',
    category: 'Sales',
    date: '2024-03-15',
    reference: 'REV001',
    account: 'Revenue',
    tags: ['sales', 'monthly']
  },
  {
    id: 2,
    description: 'Office Rent Payment',
    amount: -5000.00,
    type: 'Expense',
    category: 'Rent',
    date: '2024-03-01',
    reference: 'EXP001',
    account: 'Operating Expenses',
    tags: ['rent', 'monthly', 'fixed']
  },
  {
    id: 3,
    description: 'Equipment Purchase',
    amount: -15000.00,
    type: 'Expense',
    category: 'Equipment',
    date: '2024-03-10',
    reference: 'EXP002',
    account: 'Capital Expenditure',
    tags: ['equipment', 'capex']
  }
];

export const mockEmployees = [
  {
    id: 1,
    employeeId: 'EMP001',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@company.com',
    phone: '+1-555-0101',
    position: 'Senior Developer',
    department: 'Engineering',
    salary: 85000,
    hireDate: '2022-01-15',
    status: 'Active',
    manager: 'John Smith',
    address: '123 Tech Street, San Francisco, CA',
    emergencyContact: 'Bob Johnson - +1-555-0102',
    benefits: ['Health Insurance', 'Dental', '401k'],
    skills: ['React', 'Node.js', 'Python', 'AWS']
  },
  {
    id: 2,
    employeeId: 'EMP002',
    firstName: 'Bob',
    lastName: 'Wilson',
    email: 'bob.wilson@company.com',
    phone: '+1-555-0102',
    position: 'Sales Manager',
    department: 'Sales',
    salary: 75000,
    hireDate: '2021-06-20',
    status: 'Active',
    manager: 'Sarah Davis',
    address: '456 Sales Ave, New York, NY',
    emergencyContact: 'Mary Wilson - +1-555-0103',
    benefits: ['Health Insurance', 'Commission', 'Car Allowance'],
    skills: ['CRM', 'Negotiation', 'Lead Generation']
  }
];

export const mockDashboardData = {
  overview: {
    totalCustomers: 1247,
    totalInventoryItems: 8523,
    monthlySales: 124578,
    activeEmployees: 89,
    lowStockItems: 12,
    pendingOrders: 23,
    monthlyRevenue: 156789,
    monthlyExpenses: 89234
  },
  recentActivities: [
    {
      id: 1,
      type: 'customer',
      description: 'New customer registration',
      details: 'John Doe registered 2 hours ago',
      timestamp: '2024-03-16T14:30:00Z',
      icon: 'person_add'
    },
    {
      id: 2,
      type: 'inventory',
      description: 'Inventory update',
      details: 'Stock levels updated for 15 items',
      timestamp: '2024-03-16T13:15:00Z',
      icon: 'inventory'
    },
    {
      id: 3,
      type: 'sales',
      description: 'New order created',
      details: 'Order #ORD003 for $2,450',
      timestamp: '2024-03-16T12:00:00Z',
      icon: 'shopping_cart'
    }
  ],
  notifications: [
    {
      id: 1,
      type: 'warning',
      title: 'Low Stock Alert',
      message: '12 items are below minimum stock levels',
      timestamp: '2024-03-16T10:00:00Z',
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'Monthly Report Ready',
      message: 'March financial report is available for review',
      timestamp: '2024-03-16T09:00:00Z',
      read: false
    }
  ]
};

// Utility functions for mock data
export const generateMockId = () => Date.now() + Math.random();

export const generateOrderNumber = (prefix = 'ORD') => {
  const number = Math.floor(Math.random() * 9999) + 1;
  return `${prefix}${String(number).padStart(4, '0')}`;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date));
};

export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};
*/

// =============================================================================
// ACTIVE EXPORTS FOR DATABASE INTEGRATION
// =============================================================================

// Utility functions still needed by the application
export const generateMockId = () => Date.now() + Math.random();

export const generateOrderNumber = (prefix = 'ORD') => {
  const number = Math.floor(Math.random() * 9999) + 1;
  return `${prefix}${String(number).padStart(4, '0')}`;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date));
};

export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

// =============================================================================
// DATABASE CONNECTION STATUS
// =============================================================================

export const DATABASE_STATUS = {
  connected: true,
  backend_url: 'http://localhost:5001/api',
  database: 'MongoDB Atlas',
  migration_completed: true,
  mock_data_migrated: true
};