import MovieListContainer from "@/components/movie-list/container";
import { CommonCardType } from "@/types";

interface SearchResultsContainerProps {
  data: CommonCardType[] | undefined;
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
