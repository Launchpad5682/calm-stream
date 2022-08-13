import axios from "axios";
import React, { useEffect } from "react";
import {
  BsFillCollectionPlayFill,
  BsFillHandThumbsUpFill,
  BsStopwatchFill,
} from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { BadgeButton } from "../../components";
import { Modal } from "../../components/Modal/Modal";
import { useAuthProvider } from "../../context/auth-context";
import { useDataProvider } from "../../context/data-context";
import { ACTION_TYPE, openPlaylist } from "../../utils";
import "./SingleVideo.css";
import { useSingleVideo } from "./useSingleVideo";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

export function SingleVideo() {
  const { video, likedVideo, likeHandler, inWatchLater, watchLaterHandler } =
    useSingleVideo();
  const { modal, history, dispatch } = useDataProvider();
  const { token } = useAuthProvider();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      token &&
      Object.entries(video).length !== 0 &&
      !history.find((curr) => curr._id === video._id)
    ) {
      (async () => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URI}/history/${video._id}`,
            null,
            {
              headers: { authorization: token },
            }
          );
          dispatch({
            type: ACTION_TYPE.SET_HISTORY,
            payload: response.data.history,
          });
        } catch (error) {
          console.info(error, "error from history");
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, token, video]);

  return (
    <>
      {Object.keys(video).length === 0 ? (
        <Loader />
      ) : (
        <>
          <div className="single__video--page">
            <div className="single__video--container">
              <span
                className="h6__typography cursor--pointer"
                onClick={() => navigate(-1)}
              >
                <BiArrowBack />
              </span>
              <div className="iframe--container">
                <iframe
                  className="iframe--video"
                  src={`https://www.youtube.com/embed/${video._id}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
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
                  {/* <BadgeButton active={false} clickHandler={() => {}}>
                    <BsFillHandThumbsDownFill />
                  </BadgeButton> */}
                  <BadgeButton
                    active={false}
                    clickHandler={() => openPlaylist(video, dispatch)}
                  >
                    <BsFillCollectionPlayFill />
                  </BadgeButton>
                  <BadgeButton
                    active={inWatchLater}
                    clickHandler={() => watchLaterHandler()}
                  >
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
      )}
    </>
  );
}
