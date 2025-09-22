// API Service for handling all HTTP requests
import axios from 'axios';

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('erpUser') || '{}');
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('erpUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Customer API
export const customerAPI = {
  getAll: () => apiClient.get('/customers'),
  getById: (id) => apiClient.get(`/customers/${id}`),
  create: (data) => apiClient.post('/customers', data),
  update: (id, data) => apiClient.put(`/customers/${id}`, data),
  delete: (id) => apiClient.delete(`/customers/${id}`),
  search: (query) => apiClient.get(`/customers/search?q=${query}`),
};

// Inventory API
export const inventoryAPI = {
  getAll: () => apiClient.get('/inventory'),
  getById: (id) => apiClient.get(`/inventory/${id}`),
  create: (data) => apiClient.post('/inventory', data),
  update: (id, data) => apiClient.put(`/inventory/${id}`, data),
  delete: (id) => apiClient.delete(`/inventory/${id}`),
  getLowStock: () => apiClient.get('/inventory/low-stock'),
  updateStock: (id, quantity) => apiClient.patch(`/inventory/${id}/stock`, { quantity }),
};

// Sales API
export const salesAPI = {
  getAll: () => apiClient.get('/sales'),
  getById: (id) => apiClient.get(`/sales/${id}`),
  create: (data) => apiClient.post('/sales', data),
  update: (id, data) => apiClient.put(`/sales/${id}`, data),
  delete: (id) => apiClient.delete(`/sales/${id}`),
  getByDateRange: (startDate, endDate) => 
    apiClient.get(`/sales/date-range?start=${startDate}&end=${endDate}`),
  getMetrics: () => apiClient.get('/sales/metrics'),
};

// Financial API
export const financialAPI = {
  getTransactions: () => apiClient.get('/financial/transactions'),
  createTransaction: (data) => apiClient.post('/financial/transactions', data),
  updateTransaction: (id, data) => apiClient.put(`/financial/transactions/${id}`, data),
  deleteTransaction: (id) => apiClient.delete(`/financial/transactions/${id}`),
  getMetrics: () => apiClient.get('/financial/metrics'),
  getReports: (type, period) => apiClient.get(`/financial/reports/${type}?period=${period}`),
};

// HR API
export const hrAPI = {
  getEmployees: () => apiClient.get('/hr/employees'),
  getEmployee: (id) => apiClient.get(`/hr/employees/${id}`),
  createEmployee: (data) => apiClient.post('/hr/employees', data),
  updateEmployee: (id, data) => apiClient.put(`/hr/employees/${id}`, data),
  deleteEmployee: (id) => apiClient.delete(`/hr/employees/${id}`),
  getDepartments: () => apiClient.get('/hr/departments'),
  getAttendance: (employeeId, month) => 
    apiClient.get(`/hr/attendance/${employeeId}?month=${month}`),
  recordAttendance: (data) => apiClient.post('/hr/attendance', data),
};

// Dashboard API
export const dashboardAPI = {
  getOverview: () => apiClient.get('/dashboard/overview'),
  getRecentActivities: () => apiClient.get('/dashboard/activities'),
  getNotifications: () => apiClient.get('/dashboard/notifications'),
};

// Authentication API
export const authAPI = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  logout: () => apiClient.post('/auth/logout'),
  refreshToken: () => apiClient.post('/auth/refresh'),
  resetPassword: (email) => apiClient.post('/auth/reset-password', { email }),
  changePassword: (data) => apiClient.post('/auth/change-password', data),
};

export default apiClient;