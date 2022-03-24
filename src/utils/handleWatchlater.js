import axios from "axios";

export const removeFromWatchLater = async (video, token, dispatch) => {
  try {
    const response = await axios.delete(`/api/user/watchLater/${video._id}`, {
      headers: { authorization: token },
    });
    const { data, status } = response;
    if (status === 200) {
      dispatch({ type: "SET_WATCHLATER", payload: data.watchLater });
    }
  } catch (error) {
    console.error(error, "Error from remove from watch later");
  }
};

export const addToWatchLater = async (video, token, dispatch) => {
  try {
    const response = await axios.post(
      "/api/user/watchLater",
      {
        video: video,
      },
      { headers: { authorization: token } }
    );
    const { data, status } = response;
    if (status === 201) {
      dispatch({ type: "SET_WATCHLATER", payload: data.watchLater });
    }
  } catch (error) {
    console.error(error, "Error from add to watch later");
  }
};
