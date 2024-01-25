import {
  getTvCreditsAPI,
  getTvSimilarAPI,
  getTvSingleAPI,
} from "@/apis/tv-series";
import React from "react";
import SeriesShowContainer from "../components/series-show-container";
import SimilarContainer from "../components/similar-container";

interface SeriesPageProps {
  params: {
    seriesId: number;
  };
}

const SeriesPage = async ({ params }: SeriesPageProps) => {
  const { response: seriesSingleResponse, errors: seriesSingleErrors } =
    await getTvSingleAPI(params.seriesId);
  const {
    response: seriesSingleCreditsResponse,
    errors: seriesSingleCreditsErrors,
  } = await getTvCreditsAPI(params.seriesId);
  const { response: seriesSimilarResponse, errors: seriesSimilarErrors } =
    await getTvSimilarAPI(params.seriesId);

  return (
    <div className="flex-1 bg-neutral-900">
      {(!seriesSingleErrors || !seriesSingleCreditsErrors) && (
        <SeriesShowContainer
          data={seriesSingleResponse}
          credits={seriesSingleCreditsResponse.cast}
        />
      )}
      {!seriesSimilarErrors && (
        <SimilarContainer data={seriesSimilarResponse.results} />
      )}
    </div>
  );
};

export default SeriesPage;
