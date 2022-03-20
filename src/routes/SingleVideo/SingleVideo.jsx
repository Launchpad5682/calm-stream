import axios from "axios";
import React, { useEffect } from "react";
import {
  BsFillCollectionPlayFill,
  BsFillHandThumbsDownFill,
  BsFillHandThumbsUpFill,
  BsStopwatchFill,
} from "react-icons/bs";
import { BadgeButton } from "../../components";
import { Modal } from "../../components/Modal/Modal";
import { useAuthProvider } from "../../context/auth-context";
import { useDataProvider } from "../../context/data-context";
import { openPlaylist } from "../../utils";
import "./SingleVideo.css";
import { SingleVideoContainer } from "./SingleVideoContainer";

export function SingleVideo() {
  const { video, likedVideo, likeHandler } = SingleVideoContainer();
  const { modal, dispatch } = useDataProvider();
  const { token } = useAuthProvider();

  useEffect(() => {
    if (token && Object.entries(video).length !== 0) {
      (async () => {
        const response = await axios.post(
          "/api/user/history",
          { video: video },
          {
            headers: { authorization: token },
          }
        );
        console.info(response);
        dispatch({ type: "SET_HISTORY", payload: response.data.history });
      })();
    }
  }, [video]);

  return (
    <>
      <div className="single__video--page">
        <div className="single__video--container">
          <div className="iframe--container">
            <iframe
              className="iframe--video"
              src={`https://www.youtube.com/embed/${video._id}`}
              title="YouTube video player"
            ></iframe>
          </div>
          <span className="typography--white h4__typography">
            {video.title}
          </span>
          <div className="single__video--container">
            <div className="typography--white h5__typography button--container">
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
      {modal && <Modal />}
    </>
  );
}
