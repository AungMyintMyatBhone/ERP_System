import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('erpUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock authentication - replace with real API call
      if (email === 'admin@erp.com' && password === 'admin123') {
        const userData = {
          id: 1,
          email: 'admin@erp.com',
          name: 'System Administrator',
          role: 'admin',
          permissions: ['all']
        };
        setUser(userData);
        localStorage.setItem('erpUser', JSON.stringify(userData));
        return { success: true };
      } else if (email === 'manager@erp.com' && password === 'manager123') {
        const userData = {
          id: 2,
          email: 'manager@erp.com',
          name: 'Department Manager',
          role: 'manager',
          permissions: ['customers', 'inventory', 'sales']
        };
        setUser(userData);
        localStorage.setItem('erpUser', JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, message: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, message: 'Login failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('erpUser');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};