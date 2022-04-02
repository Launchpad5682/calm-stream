import axios from "axios";
import { ACTION_TYPE } from "./constants";

export const unLikeVideo = async (video, token, dispatch) => {
  try {
    const response = await axios.delete(`/api/user/likes/${video._id}`, {
      headers: { authorization: token },
    });
    const { data, status } = response;
    if (status === 200) {
      dispatch({ type: ACTION_TYPE.SET_LIKED_VIDEOS, payload: data.likes });
    }
  } catch (error) {
    console.error(error);
  }
};

export const likeVideo = async (video, token, dispatch) => {
  try {
    const response = await axios.post(
      "/api/user/likes",
      { video: video },
      { headers: { authorization: token } }
    );
    const { data, status } = response;
    if (status === 201) {
      dispatch({ type: ACTION_TYPE.SET_LIKED_VIDEOS, payload: data.likes });
    }
  } catch (error) {
    console.error(error);
  }
};
