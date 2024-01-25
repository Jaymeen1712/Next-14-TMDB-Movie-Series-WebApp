import { getSearchMediaAPI } from "@/apis/common";
import React from "react";
import SearchResultsContainer from "./components/search-results-container";

interface SearchPageProps {
  searchParams: {
    keyword: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { response: searchMediaResponse, errors: searchMediaErrors } =
    await getSearchMediaAPI(searchParams.keyword);

  return (
    <div className="flex-1 bg-neutral-900">
      {!searchMediaErrors && (
        <SearchResultsContainer
          data={searchMediaResponse.results}
          searchMedia={searchParams.keyword}
        />
      )}
    </div>
  );
};

export default SearchPage;
