import React from "react";
import { BsSearch, BsXLg } from "react-icons/bs";
import "./SearchBar.css";
import { SearchBarContainer } from "./SearchBarContainer";

export function SearchBar() {
  const {
    searchInput,
    changeHandler,
    searchHandler,
    clearHandler,
    searchClickHandler,
  } = SearchBarContainer();

  return (
    <div className="search__container">
      <input
        type="text"
        name=""
        id=""
        className="search__input"
        onChange={changeHandler}
        onKeyDown={searchHandler}
        value={searchInput}
      />
      <span className="search__btn">
        {searchInput.length > 0 && (
          <span
            className="subtitle1__typography typography--white"
            onClick={clearHandler}
          >
            <BsXLg />
          </span>
        )}
        <span className="subtitle1__typography" onClick={searchClickHandler}>
          <BsSearch />
        </span>
      </span>
    </div>
  );
}
