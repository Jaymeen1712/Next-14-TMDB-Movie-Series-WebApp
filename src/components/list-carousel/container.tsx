import { CommonCardType } from "@/types";
import React from "react";
import ListCarousel from "./carousel";

interface ListCarouselContainerProps {
  data: CommonCardType[];
}

const ListCarouselContainer = ({ data }: ListCarouselContainerProps) => {
  return <div>{data && <ListCarousel data={data} />}</div>;
};

export default ListCarouselContainer;
