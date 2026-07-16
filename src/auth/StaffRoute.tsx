import { Navigate } from "react-router-dom";

const StaffRoute = ({ children }: { children: React.ReactNode }) => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  if (!currentUser) {
    return <Navigate to="/staff-login" replace />;
  }

  if (currentUser.role !== "staff") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default StaffRoute;