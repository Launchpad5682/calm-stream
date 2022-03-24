import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal";
import { VerticalCard } from "../../components/VerticalCard/VerticalCard";
import { useAuthProvider } from "../../context/auth-context";
import { useDataProvider } from "../../context/data-context";
import { deleteVideoFromPlaylist } from "../../utils";

export function PlayList() {
  const { modal } = useDataProvider();
  const { pathname } = useLocation();

  const [videos, setVideos] = useState([]);
  const { token } = useAuthProvider();
  const id = pathname.split("/")[2];
  
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/user/playlists/${id}`, {
          headers: { authorization: token },
        });
        const { data } = response;
        console.info(response);
        setVideos(data.playlist.videos);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id, token]);

  return (
    <>
      <div className="subheading">
        <span className="h5__typography typography--white bold--typography">
          Videos {videos.length}
        </span>
        <button
          className="button--sm button__nav button--red button__rounded--sm button__nav--black filter--btn"
          id="open--filter"
        >
          <span className="button__typography typography--black">Filter</span>
        </button>
      </div>
      {videos.length > 0 ? (
        <div className="flex--column padding--sm--vertical">
          {videos?.map((video) => (
            <VerticalCard
              video={video}
              key={video._id}
              clickHandler={() =>
                deleteVideoFromPlaylist(id, video._id, token, setVideos)
              }
            />
          ))}
        </div>
      ) : (
        <div className="h6__typography">No videos to show</div>
      )}
      {modal && <Modal />}
    </>
  );
}
