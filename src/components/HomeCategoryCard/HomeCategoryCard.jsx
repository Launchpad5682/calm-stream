import React from "react";
import { useNavigate } from "react-router-dom";
import { useDataProvider } from "../../context/data-context";
import { ACTION_TYPE } from "../../utils";
import "./HomeCategoryCard.css";

export function HomeCategoryCard({ category }) {
  const { displayName, categoryName, path } = category;
  const navigate = useNavigate();
  const { dispatch } = useDataProvider();
  const categoryNavigate = () => {
    dispatch({ type: ACTION_TYPE.SET_CATEGORY, payload: categoryName });
    navigate("/videos");
  };

  return (
    <div className="category__card" onClick={categoryNavigate}>
      <div className="category__image">
        <img src={path} className="image__fit" alt="category" />
      </div>
      <div className="category__card--overlay h4__typography typography--white">
        {displayName}
      </div>
    </div>
  );
}
