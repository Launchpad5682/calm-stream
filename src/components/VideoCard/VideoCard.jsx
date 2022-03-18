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

export function VideoCard({ video }) {
  const { _id, title, creator, categoryName, thumbnail } = video;
  const navigate = useNavigate();
  const videoCardClickHandler = () => navigate(`/videos/${_id}`);
  return (
    <div className="card__flexcolumn card__flexcolumn--lg card__border--green video--card">
      <div className="item--image" onClick={videoCardClickHandler}>
        <img src={thumbnail} className="image--fitwidth img--fitheight" />
      </div>
      <div className="card--detail">
        <span className="h6__typography typography--white bold--typography">
          {title}
        </span>
        <span className="subtitle1__typography typography--white">
          {creator}
        </span>

        <div className="card--btns">
          <BadgeButton>
            <BsFillHandThumbsUpFill />
          </BadgeButton>
          <BadgeButton>
            <BsFillHandThumbsDownFill />
          </BadgeButton>
          <BadgeButton>
            <BsFillCollectionPlayFill />
          </BadgeButton>
          <BadgeButton>
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
