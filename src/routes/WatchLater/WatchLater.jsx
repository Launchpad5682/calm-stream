import axios from "axios";
import React, { useEffect } from "react";
import { VerticalCard } from "../../components";
import { useAuthProvider } from "../../context/auth-context";
import { useDataProvider } from "../../context/data-context";
import { ACTION_TYPE, removeFromWatchLater } from "../../utils";

export function WatchLater() {
  const { watchlater, dispatch } = useDataProvider();
  const { token } = useAuthProvider();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URI}/watchLater/`,
          {
            headers: { authorization: token },
          }
        );
        const { data, status } = response;
        if (status === 200) {
          dispatch({
            type: ACTION_TYPE.SET_WATCHLATER,
            payload: data.watchLater,
          });
        }
      } catch (error) {
        console.error(error, "Error from remove from watch later");
      }
    })();
  }, [dispatch, token]);

  return (
    <>
      <div className="subheading">
        <span className="h5__typography typography--white bold--typography">
          Watch Later {watchlater.length > 0 && watchlater.length}
        </span>
      </div>
      {watchlater.length > 0 ? (
        <div className="flex--column padding--sm--vertical">
          {watchlater?.map((video) => (
            <VerticalCard
              video={video}
              key={video._id}
              clickHandler={() => removeFromWatchLater(video, token, dispatch)}
            />
          ))}
        </div>
      ) : (
        <div className="h6__typography padding--xs">Nothing in watch later</div>
      )}
    </>
  );
}
