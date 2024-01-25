import { getMoviesPopularAPI } from "@/apis/movie";
import React from "react";
import MoviesContainer from "./components/movies-container";

const MoviesPage = async () => {
  return (
    <div className="flex-1 bg-neutral-900">
      <MoviesContainer />
    </div>
  );
};

export default MoviesPage;
