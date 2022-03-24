import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../../components";

export function PlaylistContainer() {
  return (
    <div className="body--section">
      <Header />
      <div className="main--section">
        <Sidebar />
        <main className="main--grid padding--sm">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
