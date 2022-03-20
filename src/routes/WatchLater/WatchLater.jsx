import React from "react";
import { useDataProvider } from "../../context/data-context";

export function WatchLater() {
  const { playlists } = useDataProvider();

  return (
    <>
      <div className="subheading">
        <span className="h5__typography typography--white bold--typography">
          Watch Later {playlists.length}
        </span>
      </div>
      {playlists.length > 0 ? (
        <div className="grid-4-item padding--sm--vertical">
          {/* {history?.map((video) => (
              <VideoCard video={video} key={video._id} />
            ))} */}
        </div>
      ) : (
        <div className="h6__typography">No Playlists to show</div>
      )}
    </>
  );
}
