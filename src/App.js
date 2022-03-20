import React from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Home } from "./routes/Home/Home";

function App() {
  return (
    <div className="body--section">
      <Header />
      <Home />
    </div>
  );
}

export default App;
