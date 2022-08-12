import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { createContext, useContext } from "react";
import { reducer } from "../reducer/reducer";
import { ACTION_TYPE } from "../utils";

export const DataContext = createContext();
export const useDataProvider = () => useContext(DataContext);

const initialState = {
  videos: [],
  categories: [],
  likes: [],
  playlists: [],
  history: [],
  watchlater: [],
  modal: false,
  selectedVideo: null,
  drawerState: false,
  searchTerm: "",
  filterCategory: "",
  loading: {
    videos: false,
    history: false,
    playlists: false,
    playlist: false,
    liked: false,
    watchlater: false,
  },
  alert: { message: null, active: false, color: "green" },
};

export const DataProvider = ({ children }) => {
  const [
    {
      videos,
      categories,
      history,
      likes,
      modal,
      watchlater,
      selectedVideo,
      playlists,
      searchTerm,
      drawerState,
      filterCategory,
      loading,
      alert,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        dispatch({
          type: ACTION_TYPE.TOGGLE_LOADING,
          payload: { videos: true },
        });
        const response = await axios.get(`${process.env.REACT_APP_API_URI}/videos`);
        // console.log(response);
        const { data, status } = response;
        if (status === 200) {
          dispatch({ type: ACTION_TYPE.SET_VIDEOS, payload: data.videos });
        }
        setTimeout(() => {
          dispatch({
            type: ACTION_TYPE.TOGGLE_LOADING,
            payload: { videos: false },
          });
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    })();

    (async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URI}/categories`);
        // console.log(response);
        const { data, status } = response;
        if (status === 200) {
          dispatch({
            type: ACTION_TYPE.SET_CATEGORIES,
            payload: data.categories,
          });
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
    watchlater,
    searchTerm,
    drawerState,
    filterCategory,
    loading,
    alert,
    dispatch,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
