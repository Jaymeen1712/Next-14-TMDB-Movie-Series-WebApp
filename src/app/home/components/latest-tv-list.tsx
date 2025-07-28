"use client";

import { getTvLatestAPI } from "@/apis/tv-series";
import MovieListContainer from "@/components/movie-list/container";
import { CommonCardType } from "@/types";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";

const LatestTvList = () => {
  const [latestTv, setLatestTv] = useState<CommonCardType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { response: latestTv, errors: latestTvErrors } =
        await getTvLatestAPI();

      if (!latestTvErrors) {
        latestTv.results.length > 20
          ? setLatestTv(latestTv.results.slice(0, 20))
          : setLatestTv(latestTv.results);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <MovieListContainer
      title="Latest TV Series"
      headerRight={
        <button
          className="group bg-none pt-1"
          onClick={() => router.push("/tv-series")}
        >
          <FaAngleRight
            className={`text-white group-hover:text-primary`}
            size={22}
          />
        </button>
      }
      data={latestTv}
      type="carousel"
      isLoading={isLoading}
    />
  );
};

export default LatestTvList;
