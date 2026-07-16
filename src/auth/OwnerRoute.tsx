import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

type OwnerRouteProps = {
  children: ReactNode;
};

const OwnerRoute = ({ children }: OwnerRouteProps) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "owner") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default OwnerRoute;