"use client";

import React, { useRef } from "react";
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";
import CarouselImage from "./image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import CarouselDetails from "./details";
import CarouselPaginationButtons from "./controls/pagination-buttons";

import "./controls/pagination.css";
import { CommonCardType } from "@/types";
import { TMDB_IMAGE_BASE_URL, capitalizeFirstLetter } from "@/utils";

const Carousel = ({
  commonDetails,
  setDashboardImage,
}: {
  commonDetails: CommonCardType[];
  setDashboardImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const swiperRef = useRef<SwiperRef>(null);

  const handleSlideChange: SwiperProps["onActiveIndexChange"] = (swiper) => {
    if (swiperRef) {
      const activeSlide = swiperRef.current?.swiper.slides[swiper.activeIndex];

      const imageElement = activeSlide?.querySelector("img");

      const encodedUrl = imageElement?.getAttribute("src");

      const decodedUrl = decodeURIComponent(encodedUrl || "");

      const filename =
        decodedUrl.substring(decodedUrl.lastIndexOf("/") + 1).split(".")[0] +
        ".jpg";

      setDashboardImage(filename);
    }
  };

  return (
    <div className="grid grid-cols-12 items-center justify-center">
      <div className="col-span-11 my-16">
        <Swiper
          // pagination={pagination}
          // modules={[Pagination]}
          ref={swiperRef}
          effect="coverflow"
          coverflowEffect={{
            rotate: 20,
            stretch: 25,
            depth: 250,
            modifier: 1,
            slideShadows: false,
          }}
          onActiveIndexChange={handleSlideChange}
        >
          <>
            {commonDetails.map((detail) => {
              let chips: string[] = ["HD"];
              if (detail.media_type) {
                chips.push(
                  detail.media_type.toLowerCase() === "movie"
                    ? "Movie"
                    : "TV Series",
                );
              }

              detail.release_date &&
                chips.push(detail.release_date?.split("-")[0]);

              const title = detail.title || detail.name || "Title";

              return (
                <SwiperSlide key={detail.id}>
                  <div className="grid grid-cols-2 items-center gap-14">
                    <CarouselImage
                      src={`${TMDB_IMAGE_BASE_URL}/original${detail.backdrop_path}`}
                      alt="image"
                      type={detail.media_type}
                      detailId={detail.id}
                    />
                    <CarouselDetails
                      detailId={detail.id}
                      chips={chips}
                      title={capitalizeFirstLetter(title)}
                      rating={detail.vote_average}
                      description={detail.overview}
                      type={detail.media_type}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </>
        </Swiper>
      </div>
      <CarouselPaginationButtons ref={swiperRef} />
    </div>
  );
};

export default Carousel;
