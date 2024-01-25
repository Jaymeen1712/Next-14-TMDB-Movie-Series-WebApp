import React from "react";
import TvSeriesContainer from "./components/tv-series-container";

const MoviesPage = async () => {
  return (
    <div className="flex-1 bg-neutral-900">
      <TvSeriesContainer />
    </div>
  );
};

export default MoviesPage;
