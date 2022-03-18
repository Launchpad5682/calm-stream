import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <div className="body--section">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
