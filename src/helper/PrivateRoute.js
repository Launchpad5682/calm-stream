import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthProvider } from "../context/auth-context";

export function PrivateRoute({ children }) {
  const { token } = useAuthProvider();

  if (token) {
    return children;
  }

  return <Navigate to="/login" />;
}
