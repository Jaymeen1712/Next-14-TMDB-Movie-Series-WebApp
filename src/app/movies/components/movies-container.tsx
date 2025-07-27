"use client";

import { getMoviesPopularAPI } from "@/apis/movie";
import MovieListContainer from "@/components/movie-list/container";
import { CommonCardType } from "@/types";
import { useEffect, useState } from "react";

const MoviesContainer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [movieData, setMovieData] = useState<CommonCardType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMovieData = async () => {
      setIsLoading(true);
      const { response: moviesPopularResponse, errors: moviesPopularErrors } =
        await getMoviesPopularAPI(currentPage);

      if (!moviesPopularErrors) {
        setMovieData(moviesPopularResponse.results);
      }
      setIsLoading(false);
    };
    getMovieData();

    return () => {
      setMovieData([]);
    };
  }, [currentPage]);

  return (
    <div>
      <MovieListContainer
        data={movieData}
        title="Movies"
        pagination={true}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default MoviesContainer;
