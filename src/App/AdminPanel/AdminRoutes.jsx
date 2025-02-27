import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import SettingsPage from "./pages/SettingsPage";
import SalesPage from "./pages/SalesPage";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<DashboardPage />} />
      <Route path="/admin/users" element={<UsersPage />} />
      <Route path="/admin/products" element={<ProductsPage />} />
      <Route path="/admin/orders" element={<OrdersPage />} />
      <Route path="/admin/sales" element={<SalesPage />} />
      <Route path="/admin/settings" element={<SettingsPage />} />
    </Routes>
  );
};

export default AdminRoutes;
