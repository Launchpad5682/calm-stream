import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useVideoLike } from "../../hooks/useVideoLike";

export function SingleVideoContainer() {
  const [video, setVideo] = useState({});
  const { pathname } = useLocation();

  useEffect(() => {
    const id = pathname.split("/")[2];
    (async () => {
      try {
        const response = await axios.get(`/api/video/${id}`);
        const { data } = response;
        setVideo({ ...data.video });
      } catch (error) {
        console.error("Error from video page", error);
      }
    })();
  }, [pathname]);

  const { likedVideo, likeHandler } = useVideoLike(video);
  return { video, likedVideo, likeHandler };
}
