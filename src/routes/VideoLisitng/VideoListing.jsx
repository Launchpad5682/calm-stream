import React from "react";
import { VideoCard } from "../../components";
import { Chip } from "../../components/Chip/Chip";
import { Loader } from "../../components/Loader/Loader";
import { Modal } from "../../components/Modal/Modal";
import "./VideoListing.css";
import { useVideoListing } from "./useVideoListing";

export function VideoListing() {
  const { modal, categories, loading, filteredVideos } = useVideoListing();

  return (
    <>
      <div className="subheading">
        <span className="h5__typography typography--white bold--typography">
          Videos {!loading.videos && filteredVideos.length}
        </span>
        <div className="chip--container">
          <Chip value="all">All</Chip>
          {categories?.map((category) => (
            <Chip value={category.categoryName}>{category.displayName}</Chip>
          ))}
        </div>
      </div>
      {loading.videos ? (
        <Loader />
      ) : filteredVideos.length > 0 ? (
        <div className="main--grid grid-4-item padding--sm--vertical">
          {filteredVideos?.map((video) => (
            <VideoCard video={video} key={video._id} />
          ))}
        </div>
      ) : (
        <div className="h6__typography padding--xs">No videos to show</div>
      )}
      {modal && <Modal />}
    </>
  );
}
