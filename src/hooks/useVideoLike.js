import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthProvider } from "../context/auth-context";
import { useDataProvider } from "../context/data-context";

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

  const likeHandler = async () => {
    if (likedVideo) {
      try {
        const response = await axios.delete(`/api/user/likes/${video._id}`, {
          headers: { authorization: token },
        });
        const { data, status } = response;
        if (status === 200) {
          dispatch({ type: "SET_LIKED_VIDEOS", payload: data.likes });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.post(
          "/api/user/likes",
          { video: video },
          { headers: { authorization: token } }
        );
        const { data, status } = response;
        if (status === 201) {
          dispatch({ type: "SET_LIKED_VIDEOS", payload: data.likes });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return { likedVideo, likeHandler };
}
