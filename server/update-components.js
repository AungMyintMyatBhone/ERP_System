// Script to update all components to use database API instead of mock data
const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '..', 'src', 'components', 'modules');

const updateCustomerManagement = () => {
  const filePath = path.join(componentsDir, 'CustomerManagement.js');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add API import if not present
  if (!content.includes("import { customerAPI }")) {
    content = content.replace(
      "} from '@mui/icons-material';",
      "} from '@mui/icons-material';\nimport { customerAPI } from '../../services/api';"
    );
  }
  
  // Replace mock data with API call (already done)
  
  // Update save and delete functions to use _id instead of id
  content = content.replace(/customer\.id/g, 'customer._id');
  content = content.replace(/editingCustomer\.id/g, 'editingCustomer._id');
  
  fs.writeFileSync(filePath, content);
  console.log('✅ Updated CustomerManagement.js');
};

const updateInventoryManagement = () => {
  const filePath = path.join(componentsDir, 'InventoryManagement.js');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add API import if not present
  if (!content.includes("import { inventoryAPI }")) {
    content = content.replace(
      "} from '@mui/icons-material';",
      "} from '@mui/icons-material';\nimport { inventoryAPI } from '../../services/api';"
    );
  }
  
  // Update save and delete functions
  content = content.replace(
    /const handleSave = \(\) => {[\s\S]*?};/,
    `const handleSave = async () => {
    try {
      if (editingItem) {
        const response = await inventoryAPI.update(editingItem._id, formData);
        setInventory(inventory.map(item => 
          item._id === editingItem._id ? response.data : item
        ));
      } else {
        const response = await inventoryAPI.create(formData);
        setInventory([...inventory, response.data]);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving inventory item:', error);
    }
  };`
  );
  
  content = content.replace(
    /const handleDelete = \(id\) => {[\s\S]*?};/,
    `const handleDelete = async (id) => {
    try {
      await inventoryAPI.delete(id);
      setInventory(inventory.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting inventory item:', error);
    }
  };`
  );
  
  // Update id references to _id
  content = content.replace(/item\.id/g, 'item._id');
  content = content.replace(/editingItem\.id/g, 'editingItem._id');
  
  fs.writeFileSync(filePath, content);
  console.log('✅ Updated InventoryManagement.js');
};

const updateSalesManagement = () => {
  const filePath = path.join(componentsDir, 'SalesManagement.js');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add API import
  if (!content.includes("import { salesAPI }")) {
    content = content.replace(
      "} from '@mui/icons-material';",
      "} from '@mui/icons-material';\nimport { salesAPI } from '../../services/api';"
    );
  }
  
  // Replace mock data useEffect
  content = content.replace(
    /\/\/ Mock data\s*useEffect\(\(\) => {[\s\S]*?setS ales\(mockSales\);[\s\S]*?}, \[\]\);/,
    `// Load sales from database
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await salesAPI.getAll();
        setSales(response.data);
      } catch (error) {
        console.error('Error fetching sales:', error);
        setSales([]);
      }
    };
    fetchSales();
  }, []);`
  );
  
  fs.writeFileSync(filePath, content);
  console.log('✅ Updated SalesManagement.js');
};

const updateFinancialManagement = () => {
  const filePath = path.join(componentsDir, 'FinancialManagement.js');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add API import
  if (!content.includes("import { financialAPI }")) {
    content = content.replace(
      "} from '@mui/icons-material';",
      "} from '@mui/icons-material';\nimport { financialAPI } from '../../services/api';"
    );
  }
  
  // Replace mock data useEffect
  content = content.replace(
    /\/\/ Mock data\s*useEffect\(\(\) => {[\s\S]*?setTransactions\(mockTransactions\);[\s\S]*?}, \[\]\);/,
    `// Load transactions from database
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await financialAPI.getTransactions();
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setTransactions([]);
      }
    };
    fetchTransactions();
  }, []);`
  );
  
  fs.writeFileSync(filePath, content);
  console.log('✅ Updated FinancialManagement.js');
};

const updateHRManagement = () => {
  const filePath = path.join(componentsDir, 'HRManagement.js');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add API import
  if (!content.includes("import { hrAPI }")) {
    content = content.replace(
      "} from '@mui/icons-material';",
      "} from '@mui/icons-material';\nimport { hrAPI } from '../../services/api';"
    );
  }
  
  // Replace mock data useEffect
  content = content.replace(
    /\/\/ Mock data\s*useEffect\(\(\) => {[\s\S]*?setEmployees\(mockEmployees\);[\s\S]*?}, \[\]\);/,
    `// Load employees from database
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await hrAPI.getEmployees();
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setEmployees([]);
      }
    };
    fetchEmployees();
  }, []);`
  );
  
  fs.writeFileSync(filePath, content);
  console.log('✅ Updated HRManagement.js');
};

// Run all updates
const updateAllComponents = () => {
  console.log('🚀 Updating all components to use database API...\n');
  
  try {
    updateCustomerManagement();
    updateInventoryManagement();
    updateSalesManagement();
    updateFinancialManagement();
    updateHRManagement();
    
    console.log('\n🎉 All components updated successfully!');
    console.log('📊 Components now connected to MongoDB database');
    console.log('🔗 Frontend will now use real data from backend API');
  } catch (error) {
    console.error('❌ Error updating components:', error);
  }
};

updateAllComponents();