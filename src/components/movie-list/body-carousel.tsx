import { CommonCardType } from "@/types";
import React from "react";
import ListCarouselContainer from "../list-carousel/container";

interface MovieListBodyCarouselProps {
  data: CommonCardType[];
}

const MovieListBodyCarousel = ({ data }: MovieListBodyCarouselProps) => {
  return <ListCarouselContainer data={data} />;
};

export default MovieListBodyCarousel;
