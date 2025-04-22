"use client";

import getTrending from "@/apis/common/get-trending";
import CarouselContainer from "@/components/carousel/container";
import GradientImageContainer from "@/components/gradient-image-container";
import { CommonCardType } from "@/types";
import { useEffect, useState } from "react";

const DashboardCarousel = () => {
  const [data, setData] = useState<CommonCardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardImage, setDashboardImage] = useState<string>("");

  const fetchTrendingData = async () => {
    try {
      setIsLoading(true);
      const { response: trending, errors: trendingErrors } =
        await getTrending();

      if (!trendingErrors) {
        setData(trending.results);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingData();
  }, []);

  useEffect(() => {
    if (data && data.length && data[0].backdrop_path) {
      setDashboardImage(data[0].backdrop_path);
    }
  }, [data]);

  return (
    <>
      <GradientImageContainer path={dashboardImage} />
      <div className="my-32 min-h-[550px]">
        <CarouselContainer
          commonDetails={data.length > 10 ? data.slice(0, 10) : data}
          setDashboardImage={setDashboardImage}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default DashboardCarousel;
