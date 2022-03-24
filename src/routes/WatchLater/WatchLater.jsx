import React from "react";
import { VerticalCard } from "../../components";
import { useDataProvider } from "../../context/data-context";

export function WatchLater() {
  const { watchlater } = useDataProvider();

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
            <VerticalCard video={video} key={video._id} />
          ))}
        </div>
      ) : (
        <div className="h6__typography">No Playlists to show</div>
      )}
    </>
  );
}
