import { useEffect, useState } from "react";
import { useAuthProvider } from "../context/auth-context";
import { useDataProvider } from "../context/data-context";
import { ACTION_TYPE, likeVideo, unLikeVideo } from "../utils";
import { useAuth } from "./useAuth";

export function useVideoLike(video) {
  const [likedVideo, setLikedVideo] = useState(false);
  const { likes, dispatch } = useDataProvider();
  const { token } = useAuthProvider();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (likes.find((like) => like._id === video._id)) {
      setLikedVideo(true);
    } else {
      setLikedVideo(false);
    }
  }, [likes, video]);

  const likeHandler = () => {
    if (isAuthenticated) {
      if (likedVideo) {
        unLikeVideo(video, token, dispatch);
        dispatch({
          type: ACTION_TYPE.ACTIVATE_ALERT,
          payload: { message: "Video removed from liked", color: "red" },
        });
      } else {
        likeVideo(video, token, dispatch);
        dispatch({
          type: ACTION_TYPE.ACTIVATE_ALERT,
          payload: { message: "Video added to liked", color: "green" },
        });
      }
    } else {
      dispatch({
        type: ACTION_TYPE.ACTIVATE_ALERT,
        payload: { message: "You need to login", color: "green" },
      });
    }
  };

  return { likedVideo, likeHandler };
}
