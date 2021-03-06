import React from "react";
import "./VerticalCard.css";
import { IoMdClose } from "react-icons/io";
import { useAuthProvider } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { useDataProvider } from "../../context/data-context";
import axios from "axios";
import { ACTION_TYPE } from "../../utils";

export function VerticalCard({ video, clickHandler }) {
  const { _id, title, creator, thumbnail } = video;
  const { dispatch } = useDataProvider();

  const { token } = useAuthProvider();
  const navigate = useNavigate();

  const videoCardClickHandler = () => {
    navigate(`/videos/${_id}`);
    if (token) {
      (async () => {
        const response = await axios.post(
          "/api/user/history",
          { video: video },
          {
            headers: { authorization: token },
          }
        );
        dispatch({
          type: ACTION_TYPE.SET_HISTORY,
          payload: response.data.history,
        });
      })();
    }
  };

  return (
    <div className="vertical--card card__shadow--green cursor--pointer">
      <div
        className="vertical__card--detail"
        onClick={() => videoCardClickHandler()}
      >
        <div className="vertical--thumbnail">
          <img src={thumbnail} className="image__fit" alt="thumbnail" />
        </div>
        <div className="vertical--card__detail padding--xs">
          <>
            <span className="h6__typography typography--white bold--typography">
              {title}
            </span>
            <span className="subtitle1__typography typography--white">
              {creator}
            </span>
          </>
        </div>
      </div>
      <span
        className="typography--white h5__typography delete--close"
        onClick={clickHandler}
      >
        <IoMdClose />
      </span>
    </div>
  );
}
