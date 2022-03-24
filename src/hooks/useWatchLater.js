import { useEffect, useState } from "react";
import { useAuthProvider } from "../context/auth-context";
import { useDataProvider } from "../context/data-context";
import { addToWatchLater, removeFromWatchLater } from "../utils";

export function useWatchLater(video) {
  const [inWatchLater, setInWatchLater] = useState(false);
  const { watchlater, dispatch } = useDataProvider();
  const { token } = useAuthProvider();

  useEffect(() => {
    if (watchlater.find((watch) => watch._id === video._id)) {
      setInWatchLater(true);
    } else {
      setInWatchLater(false);
    }
  }, [video, watchlater]);

  const watchLaterHandler = () => {
    if (inWatchLater) {
      removeFromWatchLater(video, token, dispatch);
    } else {
      addToWatchLater(video, token, dispatch);
    }
  };

  return { inWatchLater, watchLaterHandler };
}
