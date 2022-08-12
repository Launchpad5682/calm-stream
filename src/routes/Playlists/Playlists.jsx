import React from "react";
import { PlaylistCard } from "../../components/PlaylistCard/PlaylistCard";
import { useAuthProvider } from "../../context/auth-context";
import { useDataProvider } from "../../context/data-context";
import { deletePlaylist } from "../../utils";

export function Playlists() {
  const { playlists, dispatch } = useDataProvider();
  const { token } = useAuthProvider();

  return (
    <>
      <div className="subheading">
        <span className="h5__typography typography--white bold--typography">
          Playlists {playlists?.length}
        </span>
      </div>
      {playlists.length > 0 ? (
        <div className="flex--column padding--sm--vertical">
          {playlists?.map((playlist) => (
            <PlaylistCard
              playlist={playlist}
              key={playlist._id}
              deleteHandler={() => deletePlaylist(playlist, token, dispatch)}
            />
          ))}
        </div>
      ) : (
        <div className="h6__typography padding--xs">No Playlists to show</div>
      )}
    </>
  );
}
