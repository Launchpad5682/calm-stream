import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { VerticalCard } from "../../components/VerticalCard/VerticalCard";
import { useAuthProvider } from "../../context/auth-context";
import { useDataProvider } from "../../context/data-context";
import { ACTION_TYPE } from "../../utils";

export function History() {
  const { history } = useDataProvider();
  const { dispatch } = useDataProvider();
  const { token } = useAuthProvider();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URI}/history`,
            {
              headers: { authorization: token },
            }
          );
          const { data, status } = response;
          if (status === 200) {
            dispatch({
              type: ACTION_TYPE.SET_HISTORY,
              payload: data.history,
            });
          }
        } catch (error) {
          console.error("Error while fetching history videos", error);
        }
      })();
    }
  }, [dispatch, token]);

  const deleteVideoHistory = async (video) => {
    console.info(video);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URI}/history/${video._id}`,
        {
          headers: { authorization: token },
        }
      );
      console.log(response);
      dispatch({
        type: ACTION_TYPE.SET_HISTORY,
        payload: response.data.history,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAllHistory = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URI}/history`,
        {
          headers: { authorization: token },
        }
      );
      console.log(response);
      dispatch({
        type: ACTION_TYPE.SET_HISTORY,
        payload: response.data.history,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="subheading">
        <span className="h5__typography typography--white bold--typography">
          Watch History {history.length > 0 && history.length}
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
        <div className="h6__typography padding--xs">
          Nothing in watch history
        </div>
      )}
    </>
  );
}
