import React from "react";
import { Sidebar, VideoCard } from "../../components";
import { useDataProvider } from "../../context/data-context";
import "./VideoListing.css";

export function VideoListing() {
  const { videos } = useDataProvider();

  return (
    <div className="main--section">
      <Sidebar />
      <main className="main--grid padding--sm">
        <div className="subheading">
          <span className="h5__typography typography--white bold--typography">
            Videos {videos.length}
          </span>
          <button
            className="button--sm button__nav button--red button__rounded--sm button__nav--black filter--btn"
            id="open--filter"
          >
            <span className="button__typography typography--black">Filter</span>
          </button>
        </div>
        {videos.length > 0 ? (
          <div className="grid-4-item padding--sm--vertical">
            {videos?.map((video) => (
              <VideoCard video={video} key={video._id} />
            ))}
          </div>
        ) : (
          <div className="h6__typography">No videos to show</div>
        )}
      </main>
    </div>
  );
}
