"use client";

import { getMoviesTrendingAPI } from "@/apis/movie";
import { getTvTrendingAPI } from "@/apis/tv-series";
import MovieListContainer from "@/components/movie-list/container";
import { CommonCardType } from "@/types";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface TrendingMovieListProps {
  movieData: CommonCardType[] | null;
  tvData: CommonCardType[] | null;
}

const TrendingList = () => {
  const [currentTab, setCurrentTab] = useState("movies");
  const [trendingMovies, setTrendingMovies] = useState<CommonCardType[]>([]);
  const [trendingTv, setTrendingTv] = useState<CommonCardType[]>([]);

  useEffect(() => {
    (async () => {
      const { response: trendingMovies, errors: trendingMoviesErrors } =
        await getMoviesTrendingAPI();
      const { response: trendingTv, errors: trendingTvErrors } =
        await getTvTrendingAPI();

      if (!trendingMoviesErrors) {
        setTrendingMovies(trendingMovies.results);
      }

      if (!trendingTvErrors) {
        setTrendingTv(trendingTv.results);
      }
    })();
  }, []);

  return (
    <MovieListContainer
      data={currentTab === "movies" ? trendingMovies : trendingTv}
      title="Trending"
      headerRight={
        <div className="ml-4 space-x-3">
          <Button
            onClick={() => {
              setCurrentTab("movies");
            }}
            className={`px-6 text-base ${
              currentTab === "movies"
                ? `bg-primary text-black`
                : `border-1 bg-transparent text-white hover:text-primary `
            }`}
            radius="full"
            disableRipple
            disableAnimation
          >
            Movies
          </Button>
          <Button
            onClick={() => {
              setCurrentTab("tvSeries");
            }}
            className={`px-6 text-base ${
              currentTab === "tvSeries"
                ? "bg-primary text-black"
                : `border-1 bg-transparent text-white hover:text-primary `
            }`}
            radius="full"
            disableRipple
            disableAnimation
          >
            TV Series
          </Button>
        </div>
      }
    />
  );
};

export default TrendingList;
