import React from "react";
import Carousel from "./carousel";
import { CommonCardType } from "@/types";

const CarouselContainer = ({
  commonDetails,
  setDashboardImage,
}: {
  commonDetails: CommonCardType[];
  setDashboardImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="items-center mx-16">
      <Carousel
        commonDetails={commonDetails}
        setDashboardImage={setDashboardImage}
      />
    </div>
  );
};

export default CarouselContainer;
