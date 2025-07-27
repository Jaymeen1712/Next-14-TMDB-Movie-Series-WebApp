"use client";

import { getMoviesLatestAPI } from "@/apis/movie";
import MovieListContainer from "@/components/movie-list/container";
import { CommonCardType } from "@/types";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";

const LatestMoviesList = () => {
  const [latestMovies, setLatestMovies] = useState<CommonCardType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { response: latestMovies, errors: latestMoviesErrors } =
        await getMoviesLatestAPI();

      if (!latestMoviesErrors) {
        latestMovies.results.length > 20
          ? setLatestMovies(latestMovies.results.slice(0, 20))
          : setLatestMovies(latestMovies.results);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <MovieListContainer
      title="Latest Movies"
      headerRight={
        <button
          className="group bg-none pt-1"
          onClick={() => router.push("/movies")}
        >
          <FaAngleRight
            className={"text-white group-hover:text-primary"}
            size={22}
          />
        </button>
      }
      data={latestMovies}
      type="carousel"
      isLoading={isLoading}
    />
  );
};

export default LatestMoviesList;
