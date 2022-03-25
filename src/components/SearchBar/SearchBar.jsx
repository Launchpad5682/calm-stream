import React, { useState } from "react";
import { BsSearch, BsXLg } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { useDataProvider } from "../../context/data-context";
// import { useDebounce } from "../../hooks/useDebounce";
import "./SearchBar.css";

export function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const { dispatch } = useDataProvider();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const changeHandler = (event) => {
    if (event.target.value === "")
      dispatch({ type: "SET_SEARCH", payload: event.target.value });
    setSearchInput(event.target.value);
  };

  const searchHandler = (event) => {
    if (event.key === "Enter") {
      dispatch({ type: "SET_SEARCH", payload: event.target.value });
      if (pathname !== "/videos") {
        navigate("/videos");
      }
    }
  };

  const searchClickHandler = () => {
    dispatch({ type: "SET_SEARCH", payload: searchInput });
    if (pathname !== "/videos") {
      navigate("/videos");
    }
  };

  const clearHandler = () => {
    dispatch({ type: "SET_SEARCH", payload: "" });
    setSearchInput("");
  };

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
