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
    <div className="xs:mx-6 mx-4 flex min-h-[400px] items-center sm:mx-8 sm:min-h-[500px] md:mx-12 lg:mx-16 lg:min-h-[550px]">
      <Carousel
        commonDetails={commonDetails}
        setDashboardImage={setDashboardImage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CarouselContainer;
