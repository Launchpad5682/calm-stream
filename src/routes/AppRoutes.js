import MockmanEs from "mockman-js";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { App } from "../App";
import { Login } from "./Auth/Login";
import { SingleVideo } from "./SingleVideo/SingleVideo";
import { VideoListing } from "./VideoLisitng/VideoListing";
import { History } from "./History/History";
import { Playlists } from "./Playlists/Playlists";
import { Liked } from "./Liked/Liked";
import { WatchLater } from "./WatchLater/WatchLater";
import { PlayList } from "./PlayList/PlayList";
import { useAuthProvider } from "../context/auth-context";
import { useDataProvider } from "../context/data-context";
import axios from "axios";
import { PrivateRoute } from "../helper/PrivateRoute";
import { ACTION_TYPE } from "../utils";
import { NotFound } from "./NotFound/NotFound";
import { User } from "./User/User";
import { Signup } from "./Auth/Signup";

export function AppRoutes() {
  const { token } = useAuthProvider();
  const { dispatch } = useDataProvider();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URI}/likes/`,
            {
              headers: { authorization: token },
            }
          );
          const { data, status } = response;
          if (status === 200) {
            dispatch({
              type: ACTION_TYPE.SET_LIKED_VIDEOS,
              payload: data.likes,
            });
          }
        } catch (error) {
          console.error("Error while fetching liked videos", error);
        }
      })();
      (async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URI}/history`,
            {
              headers: { authorization: token },
            }
          );
          const { data, status } = response;
          if (status === 200) {
            dispatch({ type: ACTION_TYPE.SET_HISTORY, payload: data.history });
          }
        } catch (error) {
          console.error("Error while fetching history videos", error);
        }
      })();
      (async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URI}/playlists`,
            {
              headers: { authorization: token },
            }
          );
          const { data, status } = response;
          if (status === 200) {
            dispatch({
              type: ACTION_TYPE.SET_PLAYLISTS,
              payload: data.playlists,
            });
          }
        } catch (error) {
          console.error("Error while fetching playlists", error);
        }
      })();
    }
  }, [dispatch, token]);

  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<VideoListing />} />
        <Route path="videos/:videoID" element={<SingleVideo />} />
        <Route path="login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="liked-videos" element={<Liked />} />
          <Route path="playlists" element={<Playlists />} />
          <Route path="playlists/:playlistID" element={<PlayList />} />
          <Route path="history" element={<History />} />
          <Route path="watch-later" element={<WatchLater />} />
          <Route path="user" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
      <Route path="/api/mockman" element={<MockmanEs />} />
    </Routes>
  );
}
