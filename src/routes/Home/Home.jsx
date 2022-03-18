import React from "react";
import { HomeCategoryCard } from "../../components/HomeCategoryCard/HomeCategoryCard";
import { useDataProvider } from "../../context/data-context";
import "./Home.css";

export function Home() {
  const { categories } = useDataProvider();

  return (
    <main className="main__section">
      <div className="image__container">
        <div className="img--tagline">
          <img
            src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="cover_img"
            className="image__fit"
          />
        </div>
        <div className="tagline">
          <span className="h5__typography typography--white">
            A streaming platform to get all the video content for mindful
            development
          </span>
          <button
            className="button--lg button__solid button--green button__rounded--lg"
            onClick={() => {}}
          >
            <span className="button__typography typography--white">
              Explore <span className="fa fa-arrow-right"></span>
            </span>
          </button>
        </div>
      </div>
      <h4 className="h4__typography center__typography padding--sm">
        Categories
      </h4>
      <div className="grid-2-item padding--sm">
        {categories?.categories?.map((category) => (
          <HomeCategoryCard category={category} key={category._id} />
        ))}
      </div>
    </main>
  );
}
