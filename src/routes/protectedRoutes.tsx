import { JSX } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { state } = useAuth();

  if (!state.token) return <Navigate to="/login" />;

  if (allowedRoles && (!state.user || !allowedRoles.includes(state.user.role))) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
