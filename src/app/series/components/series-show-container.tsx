import GradientImageContainer from "@/components/gradient-image-container";
import { CreditType, SingleMediaType } from "@/types";
import React from "react";
import SingleMediaContainer from "@/components/single-media-container/container";

interface SeriesShowContainerProps {
  data: SingleMediaType | null;
  credits: CreditType[] | null;
}

const SeriesShowContainer = ({ data, credits }: SeriesShowContainerProps) => {
  return (
    <div>
      {data && <GradientImageContainer path={data.backdrop_path} />}
      <SingleMediaContainer credits={credits} data={data} type="TV Series" />
    </div>
  );
};

export default SeriesShowContainer;
