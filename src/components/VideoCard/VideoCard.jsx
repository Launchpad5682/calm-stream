import React from "react";
import "./VideoCard.css";
import {
  BsStopwatchFill,
  BsFillCollectionPlayFill,
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BadgeButton } from "../Buttons/BadgeButton";
import { useVideoLike } from "../../hooks/useVideoLike";
import { useDataProvider } from "../../context/data-context";
import { openPlaylist } from "../../utils";

export function VideoCard({ video }) {
  const { _id, title, creator, categoryName, thumbnail } = video;

  const navigate = useNavigate();

  const videoCardClickHandler = () => {
    navigate(`/videos/${_id}`);
  };

  const { likedVideo, likeHandler } = useVideoLike(video);
  const { dispatch } = useDataProvider();
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
          <BadgeButton active={false} clickHandler={() => {}}>
            <BsFillHandThumbsDownFill />
          </BadgeButton>
          <BadgeButton
            active={false}
            clickHandler={() => openPlaylist(video, dispatch)}
          >
            <BsFillCollectionPlayFill />
          </BadgeButton>
          <BadgeButton active={false} clickHandler={() => {}}>
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
