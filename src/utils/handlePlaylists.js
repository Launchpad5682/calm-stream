import axios from "axios";
import { ACTION_TYPE } from "./constants";

export const openPlaylist = (video, dispatch) => {
  dispatch({ type: ACTION_TYPE.SELECTED_VIDEO, payload: video });
  dispatch({ type: ACTION_TYPE.TOGGLE_MODAL });
};

export const deletePlaylist = async (playlist, token, dispatch) => {
  console.info(playlist);
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URI}/playlists/${playlist._id}`,
      { headers: { authorization: token } }
    );
    const { data } = response;
    dispatch({ type: ACTION_TYPE.SET_PLAYLISTS, payload: data.playlists });
  } catch (error) {
    console.error(error);
  }
};

export const deleteVideoFromPlaylist = async (
  playlistID,
  videoID,
  token,
  dispatch
) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URI}/playlist/${playlistID}/${videoID}`,
      {
        headers: { authorization: token },
      }
    );
    const { data } = response;
    dispatch({
      type: ACTION_TYPE.SET_PLAYLISTS,
      payload: data.playlists,
    });
  } catch (error) {
    console.error(error);
  }
};
