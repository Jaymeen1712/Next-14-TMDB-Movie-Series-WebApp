"use client";

import { getMoviesLatestAPI } from "@/apis/movie";
import MovieListContainer from "@/components/movie-list/container";
import { CommonCardType } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";

const LatestMoviesList = () => {
  const [latestMovies, setLatestMovies] = useState<CommonCardType[]>([]);

  useEffect(() => {
    (async () => {
      const { response: latestMovies, errors: latestMoviesErrors } =
        await getMoviesLatestAPI();

      if (!latestMoviesErrors) {
        latestMovies.results.length > 20
          ? setLatestMovies(latestMovies.results.slice(0, 20))
          : setLatestMovies(latestMovies.results);
      }
    })();
  }, []);

  return (
    <MovieListContainer
      title="Latest Movies"
      headerRight={
        <Link href={"/movies"}>
          <button
            className="group bg-none pt-1"
            // onClick={handleClick}
          >
            <FaAngleRight
              className={"text-white group-hover:text-primary"}
              size={22}
            />
          </button>
        </Link>
      }
      data={latestMovies}
      type="carousel"
    />
  );
};

export default LatestMoviesList;
