"use client";

import { getTvLatestAPI } from "@/apis/tv-series";
import MovieListContainer from "@/components/movie-list/container";
import { CommonCardType } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";

const LatestTvList = () => {
  const [latestTv, setLatestTv] = useState<CommonCardType[]>([]);

  useEffect(() => {
    (async () => {
      const { response: latestTv, errors: latestTvErrors } =
        await getTvLatestAPI();

      if (!latestTvErrors) {
        latestTv.results.length > 20
          ? setLatestTv(latestTv.results.slice(0, 20))
          : setLatestTv(latestTv.results);
      }
    })();
  }, []);

  return (
    <MovieListContainer
      title="Latest TV Series"
      headerRight={
        <Link href={"/tv-series"}>
          <button
            className="group bg-none pt-1"
            // onClick={handleClick}
          >
            <FaAngleRight
              className={`text-white group-hover:text-primary`}
              size={22}
            />
          </button>
        </Link>
      }
      data={latestTv}
      type="carousel"
    />
  );
};

export default LatestTvList;
