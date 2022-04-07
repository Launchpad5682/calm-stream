import { useNavigate } from "react-router-dom";
import { useDataProvider } from "../../context/data-context";
import { useAuth } from "../../hooks/useAuth";
import { useVideoLike } from "../../hooks/useVideoLike";
import { useWatchLater } from "../../hooks/useWatchLater";
import { ACTION_TYPE, openPlaylist } from "../../utils";

export function useVideoCard(video) {
  const { isAuthenticated } = useAuth();
  const { _id } = video;

  const navigate = useNavigate();
  const videoCardClickHandler = () => {
    console.info("video card clicked");
    navigate(`/videos/${_id}`);
  };

  const { dispatch } = useDataProvider();
  const { likedVideo, likeHandler } = useVideoLike(video);
  const { inWatchLater, watchLaterHandler } = useWatchLater(video);

  const playlistHandler = () => {
    console.log(isAuthenticated, "from playlist handler");
    if (isAuthenticated) {
      openPlaylist(video, dispatch);
    } else {
      dispatch({
        type: ACTION_TYPE.ACTIVATE_ALERT,
        payload: { message: "You need to login", color: "green" },
      });
    }
  };

  return {
    videoCardClickHandler,
    likedVideo,
    likeHandler,
    playlistHandler,
    inWatchLater,
    watchLaterHandler,
  };
}
