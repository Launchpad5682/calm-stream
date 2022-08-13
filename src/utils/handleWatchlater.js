import axios from "axios";
import { ACTION_TYPE } from "./constants";

export const removeFromWatchLater = async (video, token, dispatch) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URI}/watchLater/${video._id}`,
      {
        headers: { authorization: token },
      }
    );
    const { data, status } = response;
    if (status === 200) {
      dispatch({ type: ACTION_TYPE.SET_WATCHLATER, payload: data.watchLater });
    }
  } catch (error) {
    console.error(error, "Error from remove from watch later");
  }
};

export const addToWatchLater = async (video, token, dispatch) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URI}/watchLater/${video._id}`,
      null,
      {
        headers: { authorization: token },
      }
    );
    const { data, status } = response;
    if (status === 201) {
      dispatch({ type: ACTION_TYPE.SET_WATCHLATER, payload: data.watchLater });
    }
  } catch (error) {
    console.error(error, "Error from add to watch later");
  }
};
