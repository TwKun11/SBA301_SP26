import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && state.user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}
