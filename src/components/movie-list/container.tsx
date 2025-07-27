import { CommonCardType } from "@/types";
import React from "react";
import MovieListBodyCarousel from "./body-carousel";
import MovieListBodyScroll from "./body-scroll";
import MovieListHeader from "./header";

interface MovieListContainerProps {
  title: string;
  data: CommonCardType[] | undefined;
  headerRight?: React.ReactNode;
  type?: "scroll" | "carousel";
  pagination?: boolean;
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
  isLoading?: boolean;
}

const MovieListContainer = ({
  title,
  headerRight,
  data,
  type = "scroll",
  pagination = false,
  setCurrentPage,
  isLoading = false,
}: MovieListContainerProps) => {
  return (
    <div className="mx-16 my-24">
      <MovieListHeader title={title} headerRight={headerRight} />
      <div className="min-h-1300 my-6">
        {(data || isLoading) &&
          (type === "scroll" ? (
            <MovieListBodyScroll
              data={data || []}
              pagination={pagination}
              setCurrentPage={setCurrentPage}
              isLoading={isLoading}
            />
          ) : (
            <MovieListBodyCarousel data={data || []} isLoading={isLoading} />
          ))}
      </div>
    </div>
  );
};

export default MovieListContainer;
