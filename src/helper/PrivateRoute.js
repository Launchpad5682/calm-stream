import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthProvider } from "../context/auth-context";

export function PrivateRoute() {
  const { token } = useAuthProvider();

  if (token) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
}
