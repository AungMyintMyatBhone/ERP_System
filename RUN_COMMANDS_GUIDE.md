# 🚀 Complete Run Commands Guide - ERP System with MongoDB Atlas

## 📋 **STEP-BY-STEP EXECUTION COMMANDS**

### **STEP 1: Open Terminal and Navigate to Project**
```powershell
# Open PowerShell as Administrator (recommended)
# Navigate to your project directory
cd "c:\Totals-inc\Code Testing\test2_ERP_system\Test2_react_Base"
```

### **STEP 2: Start Backend Server (Terminal 1)**
```powershell
# Navigate to server directory
cd server

# Install dependencies (first time only)
npm install

# Start the MongoDB-connected backend server
npm start
```

**✅ Expected Output:**
```
🔗 Mongoose connected to MongoDB Atlas
✅ MongoDB Atlas connected successfully!
📍 Connected to database: test
🚀 ERP Server running on port 5001
📍 API endpoint: http://localhost:5001/api
🧪 Test endpoint: http://localhost:5001/api/test
```

### **STEP 3: Populate Database with Data (Terminal 2 - One Time Only)**
```powershell
# Open NEW terminal window, navigate to server directory
cd "c:\Totals-inc\Code Testing\test2_ERP_system\Test2_react_Base\server"

# Run data migration script (populates MongoDB with mock data)
npm run migrate

# Verify data migration
node test-migration.js
```

**✅ Expected Output:**
```
🚀 Starting data migration...
🔗 MongoDB Connected: ac-4hnrw5d-shard-00-01.8cat7vu.mongodb.net
🧹 Existing data cleared
✅ Migrated 3 customers
✅ Migrated 3 inventory items
✅ Migrated 3 transactions
✅ Migrated 2 employees
✅ Migrated 2 sales orders
🎉 Data migration completed successfully!
```

### **STEP 4: Start Frontend Application (Terminal 3)**
```powershell
# Open NEW terminal window, navigate to main project directory
cd "c:\Totals-inc\Code Testing\test2_ERP_system\Test2_react_Base"

# Install dependencies (first time only)
npm install

# Start React frontend application
npm start
```

**✅ Expected Output:**
```
Starting the development server...
Compiled successfully!

You can now view test2-erp-system in the browser.
  Local:            http://localhost:3001
  On Your Network:  http://172.20.10.2:3001
```

### **STEP 5: Access the Application**
```
🌐 Open your web browser
📍 Navigate to: http://localhost:3001
🔐 Login with demo credentials (if authentication is implemented)
```

---

## 🔄 **QUICK START COMMANDS (All in One)**

### **Option A: Manual Startup (Recommended)**
```powershell
# Terminal 1 - Backend Server
cd "c:\Totals-inc\Code Testing\test2_ERP_system\Test2_react_Base\server"
npm start

# Terminal 2 - Data Migration (first time only)
cd "c:\Totals-inc\Code Testing\test2_ERP_system\Test2_react_Base\server"
npm run migrate

# Terminal 3 - Frontend App
cd "c:\Totals-inc\Code Testing\test2_ERP_system\Test2_react_Base"
npm start
```

### **Option B: Using Batch Script**
```powershell
# Double-click the batch file to start everything automatically
start-erp-system.bat
```

---

## 🗄️ **DATABASE CONNECTION VERIFICATION**

### **Test Database Connection:**
```powershell
cd "c:\Totals-inc\Code Testing\test2_ERP_system\Test2_react_Base\server"
node test-migration.js
```

### **Add More Sample Data:**
```powershell
cd "c:\Totals-inc\Code Testing\test2_ERP_system\Test2_react_Base\server"
node add-sample-data.js
```

### **Reset Database (Clear All Data):**
```powershell
cd "c:\Totals-inc\Code Testing\test2_ERP_system\Test2_react_Base\server"
npm run migrate
```

---

## 🔧 **DEVELOPMENT COMMANDS**

### **Backend Development:**
```powershell
cd "c:\Totals-inc\Code Testing\test2_ERP_system\Test2_react_Base\server"

# Start with auto-restart on changes
npm run dev

# Test specific API endpoints
curl http://localhost:5001/api/customers
curl http://localhost:5001/api/inventory
curl http://localhost:5001/api/sales
```

### **Frontend Development:**
```powershell
cd "c:\Totals-inc\Code Testing\test2_ERP_system\Test2_react_Base"

# Start with hot reload
npm start

# Build for production
npm run build

# Test build locally
npm run serve
```

---

## 🏗️ **SYSTEM ARCHITECTURE**

```
┌─────────────────────────────────────────────────────────────┐
│                    ERP SYSTEM ARCHITECTURE                  │
├─────────────────────────────────────────────────────────────┤
│  Frontend (React)           Backend (Node.js)              │
│  ┌─────────────────┐      ┌─────────────────────────────┐   │
│  │  Port: 3001     │ ───► │  Port: 5001                 │   │
│  │  React App      │      │  Express Server             │   │
│  │  Material-UI    │      │  API Endpoints              │   │
│  │  API Calls      │      │  Mongoose ODM               │   │
│  └─────────────────┘      └─────────────────────────────┘   │
│           │                            │                    │
│           └────────────────────────────┼────────────────────┘
│                                        ▼
│                            ┌─────────────────────────────┐
│                            │     MongoDB Atlas           │
│                            │  ┌─────────────────────────┐ │
│                            │  │ Collections:            │ │
│                            │  │ • customers             │ │
│                            │  │ • inventories           │ │
│                            │  │ • sales                 │ │
│                            │  │ • transactions          │ │
│                            │  │ • employees             │ │
│                            │  └─────────────────────────┘ │
│                            └─────────────────────────────┘
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 **CURRENT STATUS CHECKLIST**

### **✅ Completed Features:**
- [x] MongoDB Atlas connection established
- [x] Mock data migrated to database
- [x] All API endpoints working
- [x] Frontend components updated to use database
- [x] CRUD operations implemented
- [x] Real-time data synchronization
- [x] Error handling implemented

### **🔧 System Configuration:**
- **Database**: MongoDB Atlas (Cloud)
- **Backend**: Express.js + Mongoose
- **Frontend**: React 18 + Material-UI 5
- **API**: RESTful endpoints
- **Data**: Persistent storage with real-time updates

### **📍 Endpoints Available:**
- `GET/POST/PUT/DELETE /api/customers` - Customer management
- `GET/POST/PUT/DELETE /api/inventory` - Inventory management  
- `GET/POST/PUT/DELETE /api/sales` - Sales management
- `GET/POST/PUT/DELETE /api/financial/transactions` - Financial transactions
- `GET/POST/PUT/DELETE /api/hr/employees` - HR management
- `GET /api/dashboard/overview` - Dashboard metrics

---

## 🎯 **NEXT STEPS AFTER STARTUP**

1. **Verify Data Loading**: Check that all modules display database data
2. **Test CRUD Operations**: Create, edit, delete records in each module
3. **Check API Responses**: Ensure all endpoints return proper data
4. **Monitor Performance**: Watch for any slow API calls
5. **Error Testing**: Test error scenarios (network issues, invalid data)

---

## 🐛 **TROUBLESHOOTING**

### **If Backend Server Won't Start:**
```powershell
# Check if port 5001 is in use
netstat -an | findstr 5001

# Kill process using port 5001
taskkill /PID <process_id> /F

# Restart server
npm start
```

### **If Frontend Won't Start:**
```powershell
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Start again
npm start
```

### **If Database Connection Fails:**
```powershell
# Check environment variables
cat server.env

# Test MongoDB connection
node -e "
const mongoose = require('mongoose');
require('dotenv').config({ path: './server.env' });
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('✅ Connection successful');
  process.exit(0);
}).catch(err => {
  console.error('❌ Connection failed:', err);
  process.exit(1);
});
"
```

---

**🎉 Your ERP system is now fully integrated with MongoDB Atlas and ready for production use!**