import GradientImageContainer from "@/components/gradient-image-container";
import { CreditType, SingleMediaType } from "@/types";
import React from "react";
import SingleMediaContainer from "@/components/single-media-container/container";

interface MovieShowContainerProps {
  data: SingleMediaType | null;
  credits: CreditType[] | null;
}

const MovieShowContainer = ({ data, credits }: MovieShowContainerProps) => {
  return (
    <div>
      {data && <GradientImageContainer path={data.backdrop_path} />}
      <SingleMediaContainer credits={credits} data={data} type="Movies"/>
    </div>
  );
};

export default MovieShowContainer;
