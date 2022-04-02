import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDataProvider } from "../../context/data-context";

export function SearchBarContainer() {
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
      dispatch({ type: "TOGGLE_LOADING", payload: { videos: true } });
      setTimeout(() => {
        dispatch({ type: "TOGGLE_LOADING", payload: { videos: false } });
      }, 1000);
      if (pathname !== "/videos") {
        navigate("/videos");
      }
    }
  };

  const searchClickHandler = () => {
    dispatch({ type: "SET_SEARCH", payload: searchInput });
    dispatch({ type: "TOGGLE_LOADING", payload: { videos: true } });
    setTimeout(() => {
      dispatch({ type: "TOGGLE_LOADING", payload: { videos: false } });
    }, 1000);
    if (pathname !== "/videos") {
      navigate("/videos");
    }
  };

  const clearHandler = () => {
    dispatch({ type: "SET_SEARCH", payload: "" });
    setSearchInput("");
  };

  return {
    searchInput,
    changeHandler,
    searchHandler,
    clearHandler,
    searchClickHandler,
  };
}
