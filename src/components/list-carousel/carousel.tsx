"use client";

import React from "react";
import { CommonCardType } from "@/types";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/free-mode';

import "./carousel.css";
import MovieCard from "../movie-card";

const ListCarousel = ({ data }: { data: CommonCardType[] }) => {
  const renderMovieList = data.map((subData) => (
    <SwiperSlide key={subData.id}>
      <MovieCard data={subData} />
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
      <>{renderMovieList}</>
    </Swiper>
  );
};

export default ListCarousel;
