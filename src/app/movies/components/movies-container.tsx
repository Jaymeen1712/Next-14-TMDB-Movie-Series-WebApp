"use client";

import MovieListContainer from "@/components/movie-list/container";
import { CommonCardType } from "@/types";
import React, { useEffect, useState } from "react";
import { getMoviesPopularAPI } from "@/apis/movie";

const MoviesContainer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [movieData, setMovieData] = useState<CommonCardType[]>();

  useEffect(() => {
    const getMovieData = async () => {
      const { response: moviesPopularResponse, errors: moviesPopularErrors } =
        await getMoviesPopularAPI(currentPage);

      if (!moviesPopularErrors) {
        setMovieData(moviesPopularResponse.results);
      }
    };
    getMovieData();

    return () => {
      setMovieData([]);
    };
  }, [currentPage]);

  return (
    <div>
      {movieData && (
        <MovieListContainer
          data={movieData}
          title="Movies"
          pagination={true}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default MoviesContainer;
