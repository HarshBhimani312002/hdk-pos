import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import NotFound from "../pages/not-found/NotFound";

import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />

      <Route path="/register" element={<Register />} />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;