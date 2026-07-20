import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../auth/ProtectedRoute";

import Dashboard from "../pages/dashboard/Dashboard";
import StaffManagement from "../pages/dashboard/StaffManagement";
import Billing from "../pages/billing/Billing";
import Products from "../pages/products/Products";

import Login from "../pages/auth/Login";
import StaffLogin from "../pages/auth/StaffLogin";
import Register from "../pages/auth/Register";

import NotFound from "../pages/not-found/NotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard (Owner + Staff) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Billing */}
        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <Billing />
            </ProtectedRoute>
          }
        />

        {/* Products */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        {/* Staff Management (Owner Only - check inside component if needed) */}
        <Route
          path="/staff-management"
          element={
            <ProtectedRoute>
              <StaffManagement />
            </ProtectedRoute>
          }
        />

        {/* Owner Login */}
        <Route path="/login" element={<Login />} />

        {/* Staff Login */}
        <Route path="/staff-login" element={<StaffLogin />} />

        {/* Owner Register */}
        <Route path="/register" element={<Register />} />

        {/* Redirect root to dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;