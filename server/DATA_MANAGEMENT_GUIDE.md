# MongoDB Data Management Guide

## Overview
Your ERP system is now successfully connected to MongoDB Atlas with all mock data migrated. This guide shows you how to manage and work with your data.

## Current Database Status
✅ **Database**: Connected to MongoDB Atlas  
✅ **Collections**: Customers, Inventory, Sales, Transactions, Employees  
✅ **Data**: Mock data successfully migrated  
✅ **API**: All endpoints working with real data  

## Data Migration Summary
The following data was successfully migrated from `mockData.js`:

### Customers (3 records)
- John Smith (Tech Solutions Inc)
- Sarah Johnson (Global Enterprises)  
- Michael Brown (Innovation Corp)

### Inventory (3 items)
- Laptop Computer (SKU: LT001)
- Office Chair (SKU: OC001)
- Wireless Mouse (SKU: WM001)

### Sales Orders (2 orders)
- ORD001: John Smith - $1,958.76
- ORD002: Sarah Johnson - $1,079.94

### Financial Transactions (3 transactions)
- Sales Revenue: +$124,578.00
- Office Rent: -$5,000.00
- Equipment Purchase: -$15,000.00

### Employees (2 employees)
- Alice Johnson (Senior Developer)
- Bob Wilson (Sales Manager)

## How to Add More Data

### Method 1: Using the Migration Script
Edit `migrate-data.js` and add more data to the mock arrays, then run:
```bash
npm run migrate
```

### Method 2: Using the Add Sample Data Script
Run the provided script to add additional sample data:
```bash
node add-sample-data.js
```

### Method 3: Direct API Calls
Use the frontend application or make HTTP requests to the API endpoints:

#### Add a Customer
```bash
POST http://localhost:5001/api/customers
{
  "name": "New Customer",
  "email": "customer@email.com",
  "phone": "+1-555-0000",
  "company": "New Company",
  "address": "123 New St, City, State",
  "status": "Active"
}
```

#### Add an Inventory Item
```bash
POST http://localhost:5001/api/inventory
{
  "name": "New Product",
  "sku": "NP001",
  "category": "Electronics",
  "quantity": 100,
  "minStock": 10,
  "maxStock": 200,
  "price": 99.99,
  "cost": 60.00,
  "supplier": "Supplier Name",
  "location": "Warehouse A"
}
```

### Method 4: Direct MongoDB Operations
Connect to MongoDB Atlas and use MongoDB Compass or command line:

```javascript
// Example: Add customer directly in MongoDB
db.customers.insertOne({
  name: "Direct Customer",
  email: "direct@email.com",
  phone: "+1-555-1111",
  company: "Direct Company",
  status: "Active",
  createdDate: new Date(),
  totalOrders: 0,
  totalSpent: 0
});
```

## Data Validation and Schema
Each collection has validation rules:

### Customer Schema
- **Required**: name, email
- **Unique**: email
- **Enum**: status (Active, Inactive, Pending)

### Inventory Schema
- **Required**: name, sku, quantity, price
- **Unique**: sku
- **Minimum**: quantity ≥ 0, price ≥ 0

### Sales Schema
- **Required**: orderNumber, customer, total
- **Unique**: orderNumber
- **References**: customer (Customer ID), items.product (Inventory ID)

### Transaction Schema
- **Required**: description, amount, type
- **Enum**: type (Income, Expense)

### Employee Schema
- **Required**: firstName, lastName, email
- **Unique**: employeeId, email
- **Enum**: status (Active, Inactive, On Leave, Terminated)

## Useful Scripts

### Check Data Count
```bash
node -e "
const mongoose = require('mongoose');
require('dotenv').config({ path: './server.env' });
const Customer = require('./models/Customer');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const count = await Customer.countDocuments();
  console.log('Total customers:', count);
  process.exit(0);
});
"
```

### Clear All Data
```bash
node -e "
const mongoose = require('mongoose');
require('dotenv').config({ path: './server.env' });

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await mongoose.connection.db.dropDatabase();
  console.log('Database cleared');
  process.exit(0);
});
"
```

### Export Data to JSON
```bash
node -e "
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config({ path: './server.env' });
const Customer = require('./models/Customer');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const customers = await Customer.find().lean();
  fs.writeFileSync('customers-export.json', JSON.stringify(customers, null, 2));
  console.log('Customers exported to customers-export.json');
  process.exit(0);
});
"
```

## API Endpoints Available

### Customers
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Inventory
- `GET /api/inventory` - Get all inventory items
- `POST /api/inventory` - Create new item
- `PUT /api/inventory/:id` - Update item
- `DELETE /api/inventory/:id` - Delete item

### Sales
- `GET /api/sales` - Get all sales orders
- `POST /api/sales` - Create new order
- `PUT /api/sales/:id` - Update order
- `DELETE /api/sales/:id` - Delete order

### Financial Transactions
- `GET /api/financial/transactions` - Get all transactions
- `POST /api/financial/transactions` - Create new transaction
- `PUT /api/financial/transactions/:id` - Update transaction
- `DELETE /api/financial/transactions/:id` - Delete transaction

### HR Employees
- `GET /api/hr/employees` - Get all employees
- `POST /api/hr/employees` - Create new employee
- `PUT /api/hr/employees/:id` - Update employee
- `DELETE /api/hr/employees/:id` - Delete employee

### Dashboard
- `GET /api/dashboard/overview` - Get dashboard metrics
- `GET /api/dashboard/activities` - Get recent activities
- `GET /api/dashboard/notifications` - Get notifications

## Frontend Integration
Your React frontend is automatically connected to the MongoDB data through the API. When you:

1. **View Data**: The frontend fetches real data from MongoDB
2. **Create Records**: New data is saved to MongoDB
3. **Update Records**: Changes are persisted to MongoDB
4. **Delete Records**: Data is removed from MongoDB

## Backup and Recovery

### Manual Backup
Use MongoDB Atlas built-in backup features or export collections:
```bash
mongoexport --uri="your-connection-string" --collection=customers --out=customers-backup.json
```

### Restore from Backup
```bash
mongoimport --uri="your-connection-string" --collection=customers --file=customers-backup.json
```

## Monitoring and Analytics
- **MongoDB Atlas Dashboard**: View real-time metrics
- **Application Logs**: Monitor API usage in terminal
- **Performance**: Check query performance in Atlas

## Next Steps
1. Test the frontend with real data
2. Add more sample data using the scripts
3. Implement user authentication for data security
4. Set up automated backups
5. Create data validation rules
6. Implement audit trails for data changes

Your ERP system now has persistent data storage with MongoDB Atlas! 🎉