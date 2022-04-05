import React from "react";
import "./VideoCard.css";
import {
  BsStopwatchFill,
  BsFillCollectionPlayFill,
  BsFillHandThumbsUpFill,
} from "react-icons/bs";
import { BadgeButton } from "../Buttons/BadgeButton";
import { useVideoCard } from "./useVideoCard";

export function VideoCard({ video }) {
  const { title, creator, categoryName, thumbnail } = video;

  const {
    videoCardClickHandler,
    likedVideo,
    likeHandler,
    playlistHandler,
    inWatchLater,
    watchLaterHandler,
  } = useVideoCard(video);

  return (
    <div className="card__flexcolumn card__flexcolumn--lg card__shadow--green video--card">
      <div className="item--image" onClick={videoCardClickHandler}>
        <img
          src={thumbnail}
          className="image--fitwidth img--fitheight"
          alt="thumbnail"
        />
      </div>
      <div className="card--detail">
        <span className="h6__typography typography--white bold--typography">
          {title}
        </span>
        <span className="subtitle1__typography typography--white">
          {creator}
        </span>
        <div className="card--btns">
          <BadgeButton active={likedVideo} clickHandler={likeHandler}>
            <BsFillHandThumbsUpFill />
          </BadgeButton>
          {/* <BadgeButton active={false} clickHandler={() => {}}>
            <BsFillHandThumbsDownFill />
          </BadgeButton> */}
          <BadgeButton active={false} clickHandler={playlistHandler}>
            <BsFillCollectionPlayFill />
          </BadgeButton>
          <BadgeButton active={inWatchLater} clickHandler={watchLaterHandler}>
            <BsStopwatchFill />
          </BadgeButton>
          <span className="subtitle1__typography typography--white category--tag h6__typography">
            {categoryName}
          </span>
        </div>
      </div>
    </div>
  );
}
