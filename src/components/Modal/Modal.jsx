import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BsX } from "react-icons/bs";
import { useAuthProvider } from "../../context/auth-context";
import { useDataProvider } from "../../context/data-context";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { CheckBoxInput } from "../Input/CheckBoxInput/CheckBoxInput";
import "./Modal.css";

export function Modal() {
  const modalRef = useRef();
  const { token } = useAuthProvider();
  const { dispatch, selectedVideo, playlists } = useDataProvider();

  const [playListsCheck, setPlayListsCheck] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  useEffect(() => {
    const temp = playlists.map((playlist) => {
      return {
        title: playlist.title,
        _id: playlist._id,
        checked:
          playlist.videos.find((video) => video._id === selectedVideo._id) !==
          undefined,
      };
    });
    setPlayListsCheck(temp);
  }, [playlists, selectedVideo._id]);

  const callUpdatedPlaylists = async () => {
    (async () => {
      try {
        const response = await axios.get("/api/user/playlists", {
          headers: { authorization: token },
        });
        const { data, status } = response;
        if (status === 200) {
          dispatch({ type: "SET_PLAYLISTS", payload: data.playlists });
        }
      } catch (error) {
        console.error("Error while fetching playlists", error);
      }
    })();
  };

  const modalOff = () => {
    dispatch({ type: "TOGGLE_MODAL" });
    dispatch({ type: "SELECTED_VIDEO", payload: null });
  };

  useOnClickOutside(modalRef, modalOff);

  const createPlaylist = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "/api/user/playlists",
        {
          playlist: {
            title: playlistName,
            description: `Playlist description for ${playlistName}`,
          },
        },
        { headers: { authorization: token } }
      );
      console.log(response.data.playlists);
      setPlaylistName("");
      dispatch({ type: "SET_PLAYLISTS", payload: response.data.playlists });
    } catch (error) {
      console.error(error);
    }
  };

  const inputChangeHandler = (event) => {
    setPlaylistName(event.target.value);
  };

  const playlistCheckHandler = async (event) => {
    if (event.target.checked) {
      try {
        const repsonse = await axios.post(
          `/api/user/playlists/${event.target.id}`,
          { video: selectedVideo },
          { headers: { authorization: token } }
        );
        console.info(repsonse);
        setPlayListsCheck((prev) =>
          prev.map((playlist) =>
            playlist._id === event.target.id
              ? { ...playlist, checked: true }
              : { ...playlist }
          )
        );
        callUpdatedPlaylists();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.delete(
          `/api/user/playlists/${event.target.id}/${selectedVideo._id}`,
          { headers: { authorization: token } }
        );
        console.log(response);
        setPlayListsCheck((prev) =>
          prev.map((playlist) =>
            playlist._id === event.target.id
              ? { ...playlist, checked: false }
              : { ...playlist }
          )
        );
        callUpdatedPlaylists();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="fullscreen modal">
      <div className="modal__container modal__container--dark" ref={modalRef}>
        <div className="modal__container--header">
          <span className="h6__typography typography--white">
            Add to Playlist
          </span>
          <span className="h6__typography typography--white" onClick={modalOff}>
            <BsX />
          </span>
        </div>
        <div className="modal__container--body">
          <div className="checkboxes">
            {playListsCheck?.length > 0 &&
              playListsCheck?.map((playlist) => (
                <CheckBoxInput
                  name={playlist._id}
                  value={playlist._id}
                  id={playlist._id}
                  checked={playlist.checked}
                  displayName={playlist.title}
                  checkHandler={playlistCheckHandler}
                  key={playlist._id}
                />
              ))}
          </div>
          <form className="create--new" onSubmit={createPlaylist}>
            <div className="field__container">
              <div className="inputbox__container">
                <input
                  type="text"
                  autoComplete="off"
                  className="input--white"
                  required
                  value={playlistName}
                  onChange={inputChangeHandler}
                />
                <label className="inputbox__label--name label__name--white inputbox__label--green">
                  <span className="inputbox__label--content">
                    Playlist Name
                  </span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="button--sm button__solid button--green button__rounded--lg"
            >
              <span className="button__typography typography--white">
                Create
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
