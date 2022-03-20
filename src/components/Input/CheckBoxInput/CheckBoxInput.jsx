import React from "react";
import "./CheckBoxInput.css";

export function CheckBoxInput({
  name,
  id,
  value,
  checked,
  checkHandler,
  displayName,
}) {
  return (
    <label className="checkbox__input--options">
      <input
        type="checkbox"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onChange={checkHandler}
      />
      <span className="subtitle1__typography typography--white">
        {displayName}
      </span>
    </label>
  );
}
