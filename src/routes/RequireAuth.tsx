import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

// Sends unauthenticated visitors back to the login page.
const RequireAuth: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.authUser.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default RequireAuth;
