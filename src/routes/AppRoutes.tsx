import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../auth/ProtectedRoute";
import OwnerRoute from "../auth/OwnerRoute";
import StaffRoute from "../auth/StaffRoute";

import Dashboard from "../pages/dashboard/Dashboard";
import StaffDashboard from "../pages/dashboard/StaffDashboard";
import StaffManagement from "../pages/dashboard/StaffManagement";
import Billing from "../pages/billing/Billing";

import Login from "../pages/auth/Login";
import StaffLogin from "../pages/auth/StaffLogin";
import Register from "../pages/auth/Register";

import NotFound from "../pages/not-found/NotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Owner Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <OwnerRoute>
                <Dashboard />
              </OwnerRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <Billing />
            </ProtectedRoute>
          }
        />

        {/* Staff Dashboard */}
        <Route
          path="/staff-dashboard"
          element={
            <ProtectedRoute>
              <StaffRoute>
                <StaffDashboard />
              </StaffRoute>
            </ProtectedRoute>
          }
        />

        {/* Staff Management (Owner Only) */}
        <Route
          path="/staff-management"
          element={
            <ProtectedRoute>
              <OwnerRoute>
                <StaffManagement />
              </OwnerRoute>
            </ProtectedRoute>
          }
        />

        {/* Owner Login */}
        <Route path="/login" element={<Login />} />

        {/* Staff Login */}
        <Route path="/staff-login" element={<StaffLogin />} />

        {/* Owner Register */}
        <Route path="/register" element={<Register />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
