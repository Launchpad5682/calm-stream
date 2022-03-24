import { useEffect, useState } from "react";
import { useAuthProvider } from "../context/auth-context";
import { useDataProvider } from "../context/data-context";
import { likeVideo, unLikeVideo } from "../utils";

export function useVideoLike(video) {
  const [likedVideo, setLikedVideo] = useState(false);
  const { likes, dispatch } = useDataProvider();
  const { token } = useAuthProvider();

  useEffect(() => {
    if (likes.find((like) => like._id === video._id)) {
      setLikedVideo(true);
    } else {
      setLikedVideo(false);
    }
  }, [likes, video]);

  const likeHandler = () => {
    if (likedVideo) {
      unLikeVideo(video, token, dispatch);
    } else {
      likeVideo(video, token, dispatch);
    }
  };

  return { likedVideo, likeHandler };
}
