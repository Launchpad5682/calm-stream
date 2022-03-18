import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BsFillCollectionPlayFill,
  BsFillHandThumbsDownFill,
  BsFillHandThumbsUpFill,
  BsStopwatchFill,
} from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { BadgeButton } from "../../components";
import "./SingleVideo.css";

export function SingleVideo() {
  const [video, setVideo] = useState({});
  const { pathname } = useLocation();
  console.info(video);
  useEffect(() => {
    console.log(pathname.split("/"));
    const id = pathname.split("/")[2];
    // const id = 1;
    console.log(id);
    (async () => {
      try {
        const response = await axios.get(`/api/video/${id}`);
        console.info(response);
        const { data } = response;
        setVideo({ ...data.video });
      } catch (error) {
        console.error("Error from video page", error);
      }
    })();
  }, [pathname]);

  return (
    <div className="single__video--page">
      <div className="single__video--container">
        <div className="iframe--container">
          <iframe
            className="iframe--video"
            src={`https://www.youtube.com/embed/${video._id}`}
            title="YouTube video player"
          ></iframe>
        </div>
        <span className="typography--white h4__typography">{video.title}</span>
        <div className="single__video--container">
          <div className="typography--white h5__typography button--container">
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
          </div>
          <p className="typography--white body1__typography paragraph">
            {video.description}
          </p>
          <div className="paragraph"></div>
        </div>
      </div>
    </div>
  );
}
