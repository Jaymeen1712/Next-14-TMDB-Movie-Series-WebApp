import MovieListContainer from "@/components/movie-list/container";
import { CommonCardType } from "@/types";
import Link from "next/link";
import React from "react";
import { FaAngleRight } from "react-icons/fa";

interface LatestTvListProps {
  data: CommonCardType[] | null;
}

const LatestTvList = ({ data }: LatestTvListProps) => {
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
      data={data}
      type="carousel"
    />
  );
};

export default LatestTvList;
