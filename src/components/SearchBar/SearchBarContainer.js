import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDataProvider } from "../../context/data-context";
import { ACTION_TYPE } from "../../utils";

export function SearchBarContainer() {
  const [searchInput, setSearchInput] = useState("");
  const { dispatch } = useDataProvider();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const changeHandler = (event) => {
    if (event.target.value === "")
      dispatch({ type: ACTION_TYPE.SET_SEARCH, payload: event.target.value });
    setSearchInput(event.target.value);
  };

  const searchHandler = (event) => {
    if (event.key === "Enter") {
      dispatch({ type: ACTION_TYPE.SET_SEARCH, payload: event.target.value });
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADING, payload: { videos: true } });
      setTimeout(() => {
        dispatch({
          type: ACTION_TYPE.TOGGLE_LOADING,
          payload: { videos: false },
        });
      }, 1000);
      if (pathname !== "/videos") {
        navigate("/videos");
      }
    }
  };

  const searchClickHandler = () => {
    dispatch({ type: ACTION_TYPE.SET_SEARCH, payload: searchInput });
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADING, payload: { videos: true } });
    setTimeout(() => {
      dispatch({
        type: ACTION_TYPE.TOGGLE_LOADING,
        payload: { videos: false },
      });
    }, 1000);
    if (pathname !== "/videos") {
      navigate("/videos");
    }
  };

  const clearHandler = () => {
    dispatch({ type: ACTION_TYPE.SET_SEARCH, payload: "" });
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
