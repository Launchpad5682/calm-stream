import axios from "axios";
import React from "react";
import { VerticalCard } from "../../components/VerticalCard/VerticalCard";
import { useAuthProvider } from "../../context/auth-context";
import { useDataProvider } from "../../context/data-context";

export function History() {
  const { history } = useDataProvider();
  const { dispatch } = useDataProvider();
  const { token } = useAuthProvider();

  const deleteVideoHistory = async (video) => {
    console.info(video);
    try {
      const response = await axios.delete(`/api/user/history/${video._id}`, {
        headers: { authorization: token },
      });
      console.log(response);
      dispatch({ type: "SET_HISTORY", payload: response.data.history });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAllHistory = async () => {
    try {
      const response = await axios.delete("/api/user/history/all", {
        headers: { authorization: token },
      });
      console.log(response);
      dispatch({ type: "SET_HISTORY", payload: response.data.history });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="subheading">
        <span className="h5__typography typography--white bold--typography">
          Watch History {history.length}
        </span>
        <button
          className="button--sm button__outline button__outline--green button__rounded--md button__icon button__icon"
          onClick={deleteAllHistory}
        >
          <span className="button__typography typography--green">
            Clear history
          </span>
        </button>
      </div>
      {history.length > 0 ? (
        <div className="flex--column padding--sm--vertical">
          {history?.map((video) => (
            <VerticalCard
              video={video}
              key={video._id}
              clickHandler={() => deleteVideoHistory(video)}
            />
          ))}
        </div>
      ) : (
        <div className="h6__typography">No videos to show</div>
      )}
    </>
  );
}
