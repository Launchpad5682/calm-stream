import React from "react";
import { useDataProvider } from "../../context/data-context";
import "./Chip.css";

export function Chip({ value, children }) {
  const { filterCategory, dispatch } = useDataProvider();
  const clickHandler = () => {
    dispatch({ type: "SET_CATEGORY", payload: value });
  };

  const active = filterCategory === value;

  return (
    <span
      className={`chip chip--${active ? "active" : "base"}`}
      onClick={clickHandler}
    >
      {children}
    </span>
  );
}
