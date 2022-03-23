import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { createContext, useContext } from "react";
import { reducer } from "../reducer/reducer"

export const DataContext = createContext();
export const useDataProvider = () => useContext(DataContext);

const initialState = {
  videos: [],
  categories: [],
  likes: [],
  playlists: [],
  history: [],
  modal: false,
  selectedVideo: null,
  drawerState: false,
};

export const DataProvider = ({ children }) => {
  const [
    {
      videos,
      categories,
      history,
      likes,
      modal,
      selectedVideo,
      playlists,
      drawerState,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/videos");
        // console.log(response);
        const { data, status } = response;
        if (status === 200) {
          dispatch({ type: "SET_VIDEOS", payload: data.videos });
        }
      } catch (error) {
        console.error(error);
      }
    })();

    (async () => {
      try {
        const response = await axios.get("/api/categories");
        // console.log(response);
        const { data, status } = response;
        if (status === 200) {
          dispatch({ type: "SET_CATEGORIES", payload: data.categories });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const value = {
    videos,
    categories,
    likes,
    history,
    modal,
    selectedVideo,
    playlists,
    drawerState,
    dispatch,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
