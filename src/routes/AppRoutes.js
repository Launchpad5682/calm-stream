import MockmanEs from "mockman-js";
import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import { Home } from "./Home/Home";
import { SingleVideo } from "./SingleVideo/SingleVideo";
import { VideoListing } from "./VideoLisitng/VideoListing";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="videos" element={<VideoListing />} />
        <Route path="videos/:videoid" element={<SingleVideo />} />
      </Route>
      <Route path="/api/mockman" element={<MockmanEs />} />
    </Routes>
  );
}
