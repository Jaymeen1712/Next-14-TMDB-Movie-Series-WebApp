import React from "react";
import MovieListHeader from "./header";
import MovieListBodyScroll from "./body-scroll";
import { CommonCardType } from "@/types";
import MovieListBodyCarousel from "./body-carousel";

interface MovieListContainerProps {
  title: string;
  data: CommonCardType[] | null;
  headerRight?: React.ReactNode;
  type?: "scroll" | "carousel";
  pagination?: boolean;
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
}

const MovieListContainer = ({
  title,
  headerRight,
  data,
  type = "scroll",
  pagination = false,
  setCurrentPage,
}: MovieListContainerProps) => {
  return (
    <div className="mx-16 my-24">
      <MovieListHeader title={title} headerRight={headerRight} />
      <div className="min-h-1300 my-6">
        {data &&
          (type === "scroll" ? (
            <MovieListBodyScroll data={data} pagination={pagination} setCurrentPage={setCurrentPage} />
          ) : (
            <MovieListBodyCarousel data={data} />
          ))}
      </div>
    </div>
  );
};

export default MovieListContainer;
