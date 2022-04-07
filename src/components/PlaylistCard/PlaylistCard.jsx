import React from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./PlaylistCard.css";

export function PlaylistCard({ playlist, deleteHandler }) {
  const { title, description } = playlist;
  const navigate = useNavigate();

  const playlistClickHandler = (playlist) => {
    navigate(`/playlists/${playlist._id}`);
  };

  return (
    <div className="playlist--card padding--xs card__shadow--green cursor--pointer">
      <div
        className="playlist--card__detail padding--xs"
        onClick={() => playlistClickHandler(playlist)}
      >
        <>
          <span className="h6__typography typography--white bold--typography">
            {title}
          </span>
          <span className="subtitle1__typography typography--white">
            {description}
          </span>
        </>
      </div>
      <span
        className="typography--white h5__typography delete--close"
        onClick={deleteHandler}
      >
        <IoMdClose />
      </span>
    </div>
  );
}
