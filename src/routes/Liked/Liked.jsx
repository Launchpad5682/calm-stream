import React from "react";
import { VerticalCard } from "../../components/VerticalCard/VerticalCard";
import { useAuthProvider } from "../../context/auth-context";
import { useDataProvider } from "../../context/data-context";
import { unLikeVideo } from "../../utils";

export function Liked() {
  const { likes, dispatch } = useDataProvider();
  const { token } = useAuthProvider();

  return (
    <>
      <div className="subheading">
        <span className="h5__typography typography--white bold--typography">
          Liked Videos {likes.length}
        </span>
      </div>
      {likes.length > 0 ? (
        <div className="flex--column padding--sm--vertical">
          {likes?.map((video) => (
            <VerticalCard
              video={video}
              key={video._id}
              clickHandler={() => unLikeVideo(video, token, dispatch)}
            />
          ))}
        </div>
      ) : (
        <div className="h6__typography padding--xs">
          No Liked videos to show
        </div>
      )}
    </>
  );
}
