import React from "react";
import { VideoCard } from "../../components";
import { Modal } from "../../components/Modal/Modal";
import { useDataProvider } from "../../context/data-context";
import "./VideoListing.css";

export function VideoListing() {
  const { videos, modal, searchTerm } = useDataProvider();

  const searchVideos = (videos, searchTerm) => {
    const searchVideos = videos.filter((video) =>
      video.title.toLowerCase().includes(searchTerm)
    );
    return searchVideos;
  };

  const filteredVideos = searchVideos(videos, searchTerm);

  return (
    <>
      <div className="subheading">
        <span className="h5__typography typography--white bold--typography">
          Videos {filteredVideos.length}
        </span>
        <button
          className="button--sm button__nav button--red button__rounded--sm button__nav--black filter--btn"
          id="open--filter"
        >
          <span className="button__typography typography--black">Filter</span>
        </button>
      </div>
      {filteredVideos.length > 0 ? (
        <div className="grid-4-item padding--sm--vertical">
          {filteredVideos?.map((video) => (
            <VideoCard video={video} key={video._id} />
          ))}
        </div>
      ) : (
        <div className="h6__typography">No videos to show</div>
      )}
      {modal && <Modal />}
    </>
  );
}
