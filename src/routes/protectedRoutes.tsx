import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { state } = useAuth();

  if (!state.token) {
    return <Navigate to="/login" />;
  }

  return children;
}