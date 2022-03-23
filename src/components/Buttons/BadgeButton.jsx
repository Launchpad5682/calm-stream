import React from "react";
import "./BadgeButton.css";

export function BadgeButton({ children, active, clickHandler }) {
  return (
    <div className="badge--button">
      <span
        className={`h5__typography typography--${
          active === true ? "green" : "white"
        }`}
        onClick={clickHandler}
      >
        {children}
      </span>
    </div>
  );
}
