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
import { ACTION_TYPE, openPlaylist } from "../../utils";
import { useWatchLater } from "../../hooks/useWatchLater";
import { useAuth } from "../../hooks/useAuth";

export function VideoCard({ video }) {
  const { _id, title, creator, categoryName, thumbnail } = video;
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const videoCardClickHandler = () => {
    navigate(`/videos/${_id}`);
  };

  const { dispatch } = useDataProvider();
  const { likedVideo, likeHandler } = useVideoLike(video);
  const { inWatchLater, watchLaterHandler } = useWatchLater(video);

  const playlistHandler = () => {
    if (isAuthenticated) {
      openPlaylist(video, dispatch);
    } else {
      dispatch({
        type: ACTION_TYPE.ACTIVATE_ALERT,
        payload: { message: "You need to login", color: "green" },
      });
    }
  };

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
