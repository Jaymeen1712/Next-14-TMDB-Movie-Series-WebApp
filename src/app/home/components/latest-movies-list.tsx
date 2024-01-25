import MovieListContainer from "@/components/movie-list/container";
import { CommonCardType } from "@/types";
import Link from "next/link";
import React from "react";
import { FaAngleRight } from "react-icons/fa";

interface LatestMoviesListProps {
  data: CommonCardType[] | null;
}

const LatestMoviesList = ({ data }: LatestMoviesListProps) => {
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
      data={data}
      type="carousel"
    />
  );
};

export default LatestMoviesList;
