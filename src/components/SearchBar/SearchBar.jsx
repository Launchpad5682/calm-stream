import React from "react";
import { BsSearch } from "react-icons/bs";
import "./SearchBar.css";

export function SearchBar() {
  return (
    <div className="search__container">
      <input type="text" name="" id="" className="search__input" />
      <span className="search__btn">
        <BsSearch />
      </span>
    </div>
  );
}
