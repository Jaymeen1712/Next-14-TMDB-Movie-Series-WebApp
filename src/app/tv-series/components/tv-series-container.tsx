"use client";

import { getTvPopularAPI } from "@/apis/tv-series";
import MovieListContainer from "@/components/movie-list/container";
import { CommonCardType } from "@/types";
import { useEffect, useState } from "react";

const TvSeriesContainer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tvSeriesData, setTvSeriesData] = useState<CommonCardType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMovieData = async () => {
      setIsLoading(true);
      const { response: moviesPopularResponse, errors: moviesPopularErrors } =
        await getTvPopularAPI(currentPage);

      if (!moviesPopularErrors) {
        setTvSeriesData(moviesPopularResponse.results);
      }
      setIsLoading(false);
    };
    getMovieData();

    return () => {
      setTvSeriesData([]);
    };
  }, [currentPage]);

  return (
    <div>
      <MovieListContainer
        data={tvSeriesData}
        title="TV Series"
        pagination={true}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TvSeriesContainer;
