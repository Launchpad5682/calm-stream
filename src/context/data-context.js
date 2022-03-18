import React from "react";
import { createContext, useContext } from "react";

export const DataContext = createContext();
export const useDataProvider = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const value = { catgories: [] };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
