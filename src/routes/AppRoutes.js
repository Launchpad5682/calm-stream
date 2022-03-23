import MockmanEs from "mockman-js";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import { Login } from "./Auth/Login";
import { SingleVideo } from "./SingleVideo/SingleVideo";
import { VideoListing } from "./VideoLisitng/VideoListing";
import { History } from "./History/History";
import { Playlists } from "./Playlists/Playlists";
import { Liked } from "./Liked/Liked";
import { WatchLater } from "./WatchLater/WatchLater";
import { PlaylistContainer } from "./PlayListContainer/PlayListContainer";
import { PlayList } from "./PlayList/PlayList";
import { useAuthProvider } from "../context/auth-context";
import { useDataProvider } from "../context/data-context";
import axios from "axios";
import { PrivateRoute } from "../helper/PrivateRoute";

export function AppRoutes() {
  const { token } = useAuthProvider();
  const { dispatch } = useDataProvider();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const response = await axios.get("/api/user/likes", {
            headers: { authorization: token },
          });
          console.info(response);
          const { data, status } = response;
          if (status === 200) {
            dispatch({ type: "SET_LIKED_VIDEOS", payload: data.likes });
          }
        } catch (error) {
          console.error("Error while fetching liked videos", error);
        }
      })();
      (async () => {
        try {
          const response = await axios.get("/api/user/history", {
            headers: { authorization: token },
          });
          console.info(response);
          const { data, status } = response;
          if (status === 200) {
            dispatch({ type: "SET_HISTORY", payload: data.history });
          }
        } catch (error) {
          console.error("Error while fetching history videos", error);
        }
      })();
      (async () => {
        try {
          const response = await axios.get("/api/user/playlists", {
            headers: { authorization: token },
          });
          console.info(response);
          const { data, status } = response;
          if (status === 200) {
            dispatch({ type: "SET_PLAYLISTS", payload: data.playlists });
          }
        } catch (error) {
          console.error("Error while fetching playlists", error);
        }
      })();
    }
    console.log("hululllljk");
  }, [dispatch, token]);

  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/" element={<PlaylistContainer />}>
        <Route path="videos" element={<VideoListing />} />
        <Route path="videos/:videoID" element={<SingleVideo />} />
        <Route path="login" element={<Login />} />
        <Route
          path="liked-videos"
          element={
            <PrivateRoute>
              <Liked />
            </PrivateRoute>
          }
        />
        <Route
          path="playlists"
          element={
            <PrivateRoute>
              <Playlists />
            </PrivateRoute>
          }
        />
        <Route
          path="playlists/:playlistID"
          element={
            <PrivateRoute>
              <PlayList />
            </PrivateRoute>
          }
        />
        <Route
          path="history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />
        <Route
          path="watch-later"
          element={
            <PrivateRoute>
              <WatchLater />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="/api/mockman" element={<MockmanEs />} />
    </Routes>
  );
}
