import { getMovieCreditsAPI, getMovieSingleAPI, getMoviesSimilarAPI } from "@/apis/movie";
import React from "react";
import MovieShowContainer from "../components/movie-show-container";
import SimilarContainer from "../components/similar-container";

interface MoviePageProps {
  params: {
    movieId: number;
  };
}

const MoviePage = async ({ params }: MoviePageProps) => {
  const { response: movieSingleResponse, errors: movieSingleErrors } =
    await getMovieSingleAPI(params.movieId);
  const {
    response: movieSingleCreditsResponse,
    errors: movieSingleCreditsErrors,
  } = await getMovieCreditsAPI(params.movieId);
  const { response: moviesSimilarResponse, errors: moviesSimilarErrors } =
  await getMoviesSimilarAPI(params.movieId);

  return (
    <div className="flex-1 bg-neutral-900">
      {(!movieSingleErrors || !movieSingleCreditsErrors) && (
        <MovieShowContainer
          data={movieSingleResponse}
          credits={movieSingleCreditsResponse.cast}
        />
      )}
      {!moviesSimilarErrors && (
        <SimilarContainer data={moviesSimilarResponse.results} />
      )}
    </div>
  );
};

export default MoviePage;
