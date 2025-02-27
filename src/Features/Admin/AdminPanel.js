import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Settings from './pages/Settings';
import AdminLogin from './AdminLogin';
import theme from './theme';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminToken');
  return isAuthenticated ? children : <Navigate to="/loginSignUp" />;
};

const AdminPanel = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="products" element={<Products />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="customers" element={<Customers />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </ThemeProvider>
  );
};

export default AdminPanel;
