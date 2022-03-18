import React from "react";
import { createContext, useContext } from "react";

export const AuthContext = createContext();
export const useAuthProvider = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const value = {};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
