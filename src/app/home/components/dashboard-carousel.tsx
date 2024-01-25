"use client";

import CarouselContainer from "@/components/carousel/container";
import { CommonCardType } from "@/types";
import React, { useEffect, useState } from "react";
import GradientImageContainer from "@/components/gradient-image-container";

const DashboardCarousel = ({ data }: { data: CommonCardType[] }) => {
  const [dashboardImage, setDashboardImage] = useState<string>("");

  useEffect(() => {
    if(data) {
      setDashboardImage(data[0].backdrop_path)
    }
  },[data])

  return (
    <>
      <GradientImageContainer path={dashboardImage} />
      <div className="min-h-[550px] my-32">
        <CarouselContainer
          commonDetails={data.length > 10 ? data.slice(0, 10) : data}
          setDashboardImage={setDashboardImage}
        />
      </div>
    </>
  );
};

export default DashboardCarousel;
