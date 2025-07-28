"use client";

import React, { useRef } from "react";
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";
import CarouselImage from "./image";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import CarouselPaginationButtons from "./controls/pagination-buttons";
import CarouselDetails from "./details";

import { CommonCardType } from "@/types";
import { TMDB_IMAGE_BASE_URL, capitalizeFirstLetter } from "@/utils";
import "./controls/pagination.css";

const Carousel = ({
  commonDetails,
  setDashboardImage,
  isLoading,
}: {
  commonDetails: CommonCardType[];
  setDashboardImage: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
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
      <div className="col-span-11 my-16 ">
        {isLoading ? (
          // Show skeleton outside of Swiper
          <div className="grid grid-cols-2 items-center gap-14">
            <div className="relative">
              {/* Main image skeleton - matching real carousel image dimensions */}
              <div className="h-[440px] w-[783px] max-w-full animate-pulse rounded-3xl bg-neutral-700"></div>
            </div>

            <div className="space-y-6">
              {/* Chips skeleton */}
              <div className="flex items-center space-x-3">
                <div className="h-6 w-8 animate-pulse rounded-md bg-neutral-600"></div>
                <div className="h-6 w-16 animate-pulse rounded-md bg-neutral-600"></div>
                <div className="h-6 w-12 animate-pulse rounded-md bg-neutral-600"></div>
              </div>

              {/* Title skeleton */}
              <div className="space-y-2">
                <div className="h-8 w-3/4 animate-pulse rounded bg-neutral-600"></div>
              </div>

              {/* Rating skeleton */}
              <div className="flex items-center space-x-2">
                {Array.from({ length: 5 }, (_, index) => (
                  <div
                    key={index}
                    className="h-5 w-5 animate-pulse rounded bg-neutral-600"
                  ></div>
                ))}
                <div className="h-5 w-12 animate-pulse rounded bg-neutral-600"></div>
              </div>

              {/* Description skeleton */}
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-neutral-600"></div>
                <div className="h-4 w-full animate-pulse rounded bg-neutral-600"></div>
              </div>

              {/* Buttons skeleton */}
              <div className="flex items-center space-x-4">
                <div className="h-12 w-32 animate-pulse rounded-lg bg-neutral-600"></div>
              </div>
            </div>
          </div>
        ) : (
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
        )}
      </div>
      {!isLoading && <CarouselPaginationButtons ref={swiperRef} />}
    </div>
  );
};

export default Carousel;
