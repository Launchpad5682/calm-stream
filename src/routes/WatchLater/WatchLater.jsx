import React from "react";
import { VerticalCard } from "../../components";
import { useAuthProvider } from "../../context/auth-context";
import { useDataProvider } from "../../context/data-context";
import { removeFromWatchLater } from "../../utils";

export function WatchLater() {
  const { watchlater, dispatch } = useDataProvider();
  const { token } = useAuthProvider();
  return (
    <>
      <div className="subheading">
        <span className="h5__typography typography--white bold--typography">
          Watch Later {watchlater.length}
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
        <div className="h6__typography">No Videos in watch later</div>
      )}
    </>
  );
}
