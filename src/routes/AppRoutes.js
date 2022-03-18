import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import { Home } from "./Home/Home";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}
