import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Header, Sidebar, Alert } from "./components";

export function App() {
  return (
    <div className="body--section">
      <Header />
      <div className="main--section">
        <Sidebar />
        <main className="main__section">
          <Outlet />
          <Alert />
        </main>
      </div>
    </div>
  );
}
