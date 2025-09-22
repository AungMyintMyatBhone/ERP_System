// Test script to verify data migration and API endpoints
const axios = require('axios');

const API_BASE = 'http://localhost:5001/api';

// Test all API endpoints
const testEndpoints = async () => {
  console.log('🧪 Testing API endpoints after data migration...\n');

  try {
    // Test customers endpoint
    console.log('📋 Testing Customers API...');
    const customersResponse = await axios.get(`${API_BASE}/customers`);
    console.log(`✅ Found ${customersResponse.data.length} customers`);
    if (customersResponse.data.length > 0) {
      console.log(`   - First customer: ${customersResponse.data[0].name} (${customersResponse.data[0].email})`);
    }

    // Test inventory endpoint
    console.log('\n📦 Testing Inventory API...');
    const inventoryResponse = await axios.get(`${API_BASE}/inventory`);
    console.log(`✅ Found ${inventoryResponse.data.length} inventory items`);
    if (inventoryResponse.data.length > 0) {
      console.log(`   - First item: ${inventoryResponse.data[0].name} (SKU: ${inventoryResponse.data[0].sku})`);
    }

    // Test sales endpoint
    console.log('\n💰 Testing Sales API...');
    const salesResponse = await axios.get(`${API_BASE}/sales`);
    console.log(`✅ Found ${salesResponse.data.length} sales orders`);
    if (salesResponse.data.length > 0) {
      console.log(`   - First order: ${salesResponse.data[0].orderNumber} - $${salesResponse.data[0].total}`);
    }

    // Test financial transactions endpoint
    console.log('\n💼 Testing Financial Transactions API...');
    const transactionsResponse = await axios.get(`${API_BASE}/financial/transactions`);
    console.log(`✅ Found ${transactionsResponse.data.length} transactions`);
    if (transactionsResponse.data.length > 0) {
      console.log(`   - First transaction: ${transactionsResponse.data[0].description} - $${transactionsResponse.data[0].amount}`);
    }

    // Test HR employees endpoint
    console.log('\n👥 Testing HR Employees API...');
    const employeesResponse = await axios.get(`${API_BASE}/hr/employees`);
    console.log(`✅ Found ${employeesResponse.data.length} employees`);
    if (employeesResponse.data.length > 0) {
      console.log(`   - First employee: ${employeesResponse.data[0].firstName} ${employeesResponse.data[0].lastName} (${employeesResponse.data[0].position})`);
    }

    // Test dashboard overview endpoint
    console.log('\n📊 Testing Dashboard Overview API...');
    const dashboardResponse = await axios.get(`${API_BASE}/dashboard/overview`);
    console.log(`✅ Dashboard overview data retrieved`);
    console.log(`   - Total Customers: ${dashboardResponse.data.totalCustomers || 'N/A'}`);
    console.log(`   - Total Inventory Items: ${dashboardResponse.data.totalInventoryItems || 'N/A'}`);
    console.log(`   - Total Revenue: $${dashboardResponse.data.totalRevenue || 'N/A'}`);

    console.log('\n🎉 All API endpoints are working correctly!');
    console.log('✅ Data migration verification completed successfully!');

  } catch (error) {
    console.error('❌ Error testing API endpoints:', error.message);
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Response: ${error.response.data?.message || error.response.data}`);
    }
  }
};

// Run the test
testEndpoints();