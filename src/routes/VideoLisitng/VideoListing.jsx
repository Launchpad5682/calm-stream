import React from "react";
import { VideoCard } from "../../components";
import { Chip } from "../../components/Chip/Chip";
import { Modal } from "../../components/Modal/Modal";
import { useDataProvider } from "../../context/data-context";
import "./VideoListing.css";

export function VideoListing() {
  const { videos, modal, categories, filterCategory, searchTerm } =
    useDataProvider();

  const searchVideos = (videos, searchTerm) => {
    return videos.filter((video) =>
      video.title.toLowerCase().includes(searchTerm)
    );
  };

  const filterVideos = (videos, filterCategory) => {
    if (filterCategory === "" || filterCategory === "all") return videos;
    return videos.filter((video) => video.categoryName === filterCategory);
  };
  const searchedVideos = searchVideos(videos, searchTerm);
  const filteredVideos = filterVideos(searchedVideos, filterCategory);

  return (
    <>
      <div className="subheading">
        <span className="h5__typography typography--white bold--typography">
          Videos {filteredVideos.length}
        </span>
        <div className="chip--container">
          <Chip value="all">All</Chip>
          {categories?.map((category) => (
            <Chip value={category.categoryName}>{category.displayName}</Chip>
          ))}
        </div>
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
