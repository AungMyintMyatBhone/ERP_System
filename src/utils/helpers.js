// Utility functions for the ERP system
import { format, parseISO, isValid, addDays, subDays, startOfMonth, endOfMonth } from 'date-fns';

// Date utilities
export const formatDate = (date, formatString = 'MMM dd, yyyy') => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isValid(dateObj) ? format(dateObj, formatString) : '';
};

export const formatDateTime = (date) => {
  return formatDate(date, 'MMM dd, yyyy HH:mm');
};

export const getDateRange = (period) => {
  const now = new Date();
  switch (period) {
    case 'today':
      return { start: now, end: now };
    case 'week':
      return { start: subDays(now, 7), end: now };
    case 'month':
      return { start: startOfMonth(now), end: endOfMonth(now) };
    case 'quarter':
      return { start: subDays(now, 90), end: now };
    case 'year':
      return { start: subDays(now, 365), end: now };
    default:
      return { start: now, end: now };
  }
};

// Currency utilities
export const formatCurrency = (amount, currency = 'USD') => {
  if (typeof amount !== 'number') return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const parseCurrency = (currencyString) => {
  const number = parseFloat(currencyString.replace(/[^0-9.-]+/g, ''));
  return isNaN(number) ? 0 : number;
};

// Number utilities
export const formatNumber = (number, decimals = 0) => {
  if (typeof number !== 'number') return '0';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(number);
};

export const formatPercentage = (value, total) => {
  if (!total || total === 0) return '0%';
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(1)}%`;
};

// String utilities
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const generateSKU = (category, index) => {
  const categoryCode = category.substring(0, 3).toUpperCase();
  const number = String(index).padStart(3, '0');
  return `${categoryCode}${number}`;
};

// Validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.length >= 10;
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

// Array utilities
export const sortByProperty = (array, property, direction = 'asc') => {
  return [...array].sort((a, b) => {
    const aValue = a[property];
    const bValue = b[property];
    
    if (direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

export const filterBySearchTerm = (array, searchTerm, searchFields) => {
  if (!searchTerm) return array;
  
  const term = searchTerm.toLowerCase();
  return array.filter(item => {
    return searchFields.some(field => {
      const value = getNestedProperty(item, field);
      return value && value.toString().toLowerCase().includes(term);
    });
  });
};

export const getNestedProperty = (obj, path) => {
  return path.split('.').reduce((current, property) => {
    return current && current[property] !== undefined ? current[property] : null;
  }, obj);
};

export const groupBy = (array, property) => {
  return array.reduce((groups, item) => {
    const value = item[property];
    if (!groups[value]) {
      groups[value] = [];
    }
    groups[value].push(item);
    return groups;
  }, {});
};

// Status utilities
export const getStatusColor = (status) => {
  const statusColors = {
    'active': 'success',
    'inactive': 'default',
    'pending': 'warning',
    'completed': 'success',
    'cancelled': 'error',
    'shipped': 'info',
    'in-stock': 'success',
    'low-stock': 'warning',
    'out-of-stock': 'error'
  };
  
  return statusColors[status.toLowerCase()] || 'default';
};

export const getStatusIcon = (status) => {
  const statusIcons = {
    'active': 'check_circle',
    'inactive': 'cancel',
    'pending': 'schedule',
    'completed': 'check_circle',
    'cancelled': 'cancel',
    'shipped': 'local_shipping',
    'in-stock': 'inventory',
    'low-stock': 'warning',
    'out-of-stock': 'error'
  };
  
  return statusIcons[status.toLowerCase()] || 'help';
};

// Export utilities
export const exportToCSV = (data, filename) => {
  if (!data || !data.length) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes in the value
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Local storage utilities
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

// Error handling utilities
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data.message || 'An error occurred',
      status: error.response.status,
      details: error.response.data
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: 'Network error - please check your connection',
      status: 0,
      details: error.request
    };
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      status: -1,
      details: error
    };
  }
};

// Debounce utility for search
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
