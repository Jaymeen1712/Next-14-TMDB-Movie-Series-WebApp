import MovieListContainer from "@/components/movie-list/container";
import { CommonCardType } from "@/types";
import React from "react";

interface SearchResultsContainerProps {
  data: CommonCardType[] | null;
  searchMedia: string;
}

const SearchResultsContainer = ({
  data,
  searchMedia,
}: SearchResultsContainerProps) => {
  return (
    <div>
      {data && (
        <MovieListContainer
          data={data}
          title={`Search results for: "${searchMedia}"`}
        />
      )}
    </div>
  );
};

export default SearchResultsContainer;
