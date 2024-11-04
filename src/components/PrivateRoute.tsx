import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/" replace />;
};

export { PrivateRoute };
