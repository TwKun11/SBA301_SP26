import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.accountRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
