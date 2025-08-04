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
    <div className="xs:mx-6 mx-4 my-12 sm:mx-8 sm:my-16 md:mx-12 lg:mx-16 lg:my-24">
      <MovieListHeader title={title} headerRight={headerRight} />
      <div className="min-h-1300 my-4 sm:my-6">
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
