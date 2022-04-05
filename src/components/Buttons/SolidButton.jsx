import React from "react";

export function SolidButton({ caption, icon, clickHandler }) {
  return (
    <button
      className="button--sm button__solid button--green button__rounded--md card-btn bold--typography full__width--btn"
      onClick={clickHandler}
    >
      <span className="h6__typography typography--white">{icon}</span>
      <span className="subtitle1__typography typography--white bold--typography">
        {caption}
      </span>
    </button>
  );
}
