import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAuth } from './contexts/AuthContext';
import Login from './components/auth/Login';
import MainLayout from './components/layout/MainLayout';
import DashboardContent from './components/dashboard/DashboardContent';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Module imports
import CustomerManagement from './components/modules/CustomerManagement';
import InventoryManagement from './components/modules/InventoryManagement';
import SalesManagement from './components/modules/SalesManagement';
import FinancialManagement from './components/modules/FinancialManagement';
import HRManagement from './components/modules/HRManagement';

function App() {
  const { user } = useAuth();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout>
              <DashboardContent />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/customers" element={
          <ProtectedRoute>
            <MainLayout>
              <CustomerManagement />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/inventory" element={
          <ProtectedRoute>
            <MainLayout>
              <InventoryManagement />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/sales" element={
          <ProtectedRoute>
            <MainLayout>
              <SalesManagement />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/finance" element={
          <ProtectedRoute>
            <MainLayout>
              <FinancialManagement />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/hr" element={
          <ProtectedRoute>
            <MainLayout>
              <HRManagement />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  );
}

export default App;