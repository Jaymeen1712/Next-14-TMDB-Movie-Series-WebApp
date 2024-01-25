"use client";

import { getTvPopularAPI } from "@/apis/tv-series";
import MovieListContainer from "@/components/movie-list/container";
import { CommonCardType } from "@/types";
import React, { useEffect, useState } from "react";

const TvSeriesContainer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tvSeriesData, setTvSeriesData] = useState<CommonCardType[]>();

  useEffect(() => {
    const getMovieData = async () => {
      const { response: moviesPopularResponse, errors: moviesPopularErrors } =
        await getTvPopularAPI(currentPage);

      if (!moviesPopularErrors) {
        setTvSeriesData(moviesPopularResponse.results);
      }
    };
    getMovieData();

    return () => {
      setTvSeriesData([]);
    };
  }, [currentPage]);

  return (
    <div>
      {tvSeriesData && (
        <MovieListContainer
          data={tvSeriesData}
          title="TV Series"
          pagination={true}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default TvSeriesContainer;
