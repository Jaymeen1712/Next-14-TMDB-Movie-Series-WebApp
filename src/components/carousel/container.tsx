import { CommonCardType } from "@/types";
import React from "react";
import Carousel from "./carousel";

const CarouselContainer = ({
  commonDetails,
  setDashboardImage,
  isLoading,
}: {
  commonDetails: CommonCardType[];
  setDashboardImage: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}) => {
  return (
    <div className="mx-16 flex min-h-[550px] items-center">
      <Carousel
        commonDetails={commonDetails}
        setDashboardImage={setDashboardImage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CarouselContainer;
