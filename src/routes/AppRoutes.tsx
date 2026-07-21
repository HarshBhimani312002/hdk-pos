import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../auth/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/dashboard/Dashboard";
import StaffManagement from "../pages/dashboard/StaffManagement";
import Billing from "../pages/billing/Billing";
import Products from "../pages/products/Products";
import InventoryPage from "../pages/inventory/InventoryPage";

import Login from "../pages/auth/Login";
import StaffLogin from "../pages/auth/StaffLogin";
import Register from "../pages/auth/Register";

import NotFound from "../pages/not-found/NotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes with Main Layout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/products" element={<Products />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route
            path="/staff-management"
            element={<StaffManagement />}
          />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;