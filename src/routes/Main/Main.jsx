import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../../components";
import { Alert } from "../../components/Alert/Alert";

export function Main() {
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
