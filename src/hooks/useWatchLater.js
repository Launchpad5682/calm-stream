import { useEffect, useState } from "react";
import { useAuthProvider } from "../context/auth-context";
import { useDataProvider } from "../context/data-context";
import { ACTION_TYPE, addToWatchLater, removeFromWatchLater } from "../utils";
import { useAuth } from "./useAuth";

export function useWatchLater(video) {
  const [inWatchLater, setInWatchLater] = useState(false);
  const { watchlater, dispatch } = useDataProvider();
  const { token } = useAuthProvider();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (watchlater.find((watch) => watch._id === video._id)) {
      setInWatchLater(true);
    } else {
      setInWatchLater(false);
    }
  }, [video, watchlater]);

  const watchLaterHandler = () => {
    if (isAuthenticated) {
      if (inWatchLater) {
        removeFromWatchLater(video, token, dispatch);
      } else {
        addToWatchLater(video, token, dispatch);
      }
    } else {
      dispatch({
        type: ACTION_TYPE.ACTIVATE_ALERT,
        payload: { message: "You need to login", color: "green" },
      });
    }
  };

  return { inWatchLater, watchLaterHandler };
}
