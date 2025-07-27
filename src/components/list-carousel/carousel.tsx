"use client";

import { CommonCardType } from "@/types";

import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import MovieCard from "../movie-card";
import MovieCardSkeleton from "../movie-card-skeleton";
import "./carousel.css";

interface ListCarouselProps {
  data: CommonCardType[];
  isLoading?: boolean;
}

const ListCarousel = ({ data, isLoading = false }: ListCarouselProps) => {
  const renderMovieList = data.map((subData) => (
    <SwiperSlide key={subData.id}>
      <MovieCard data={subData} />
    </SwiperSlide>
  ));

  const renderSkeletonList = Array.from({ length: 10 }, (_, index) => (
    <SwiperSlide key={`skeleton-${index}`}>
      <MovieCardSkeleton />
    </SwiperSlide>
  ));

  return (
    <Swiper
      navigation={true}
      modules={[Navigation, FreeMode]}
      slidesPerView={"auto"}
      slidesPerGroupAuto
      spaceBetween={4}
      freeMode
    >
      {isLoading ? <>{renderSkeletonList}</> : <>{renderMovieList}</>}
    </Swiper>
  );
};

export default ListCarousel;
