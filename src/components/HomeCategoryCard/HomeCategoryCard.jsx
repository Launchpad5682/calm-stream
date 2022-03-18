import React from "react";
import "./HomeCategoryCard.css";

export function HomeCategoryCard({ category }) {
  const { displayName, path } = category;

  return (
    <div className="category__card" onClick={() => {}}>
      <div className="category__image">
        <img src={path} className="image__fit" />
      </div>
      <div className="category__card--overlay h4__typography typography--white">
        {displayName}
      </div>
    </div>
  );
}
