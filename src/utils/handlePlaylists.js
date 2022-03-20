import axios from "axios";

export const openPlaylist = (video, dispatch) => {
  dispatch({ type: "SELECTED_VIDEO", payload: video });
  dispatch({ type: "TOGGLE_MODAL" });
};

export const deletePlaylist = async (playlist, token, dispatch) => {
  console.info(playlist);
  try {
    const response = await axios.delete(
      ` /api/user/playlists/${playlist._id}`,
      { headers: { authorization: token } }
    );
    const { data } = response;
    dispatch({ type: "SET_PLAYLISTS", payload: data.playlists });
  } catch (error) {
    console.error(error);
  }
};

export const deleteVideoFromPlaylist = async (
  playlistID,
  videoID,
  token,
  setVideos
) => {
  try {
    const response = await axios.delete(
      `/api/user/playlists/${playlistID}/${videoID}`,
      {
        headers: { authorization: token },
      }
    );
    const { data } = response;
    setVideos(data.playlist.videos);
  } catch (error) {
    console.error(error);
  }
};
