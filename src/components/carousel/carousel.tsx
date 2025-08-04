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
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="my-8 w-full max-w-7xl sm:my-12 lg:my-16">
        {isLoading ? (
          // Show skeleton outside of Swiper
          <div className="flex flex-col items-center gap-6 sm:gap-8 lg:grid lg:grid-cols-2 lg:gap-14">
            <div className="relative order-2 w-full lg:order-1">
              {/* Main image skeleton - responsive dimensions */}
              <div className="xs:h-[250px] h-[200px] w-full max-w-[783px] animate-pulse rounded-2xl bg-neutral-700 sm:h-[300px] sm:rounded-3xl md:h-[350px] lg:h-[400px] xl:h-[440px]"></div>
            </div>

            <div className="order-1 w-full space-y-4 sm:space-y-6 lg:order-2">
              {/* Chips skeleton */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="h-5 w-6 animate-pulse rounded-md bg-neutral-600 sm:h-6 sm:w-8"></div>
                <div className="h-5 w-12 animate-pulse rounded-md bg-neutral-600 sm:h-6 sm:w-16"></div>
                <div className="h-5 w-8 animate-pulse rounded-md bg-neutral-600 sm:h-6 sm:w-12"></div>
              </div>

              {/* Title skeleton */}
              <div className="space-y-2">
                <div className="h-6 w-3/4 animate-pulse rounded bg-neutral-600 sm:h-8"></div>
              </div>

              {/* Rating skeleton */}
              <div className="flex items-center space-x-2">
                {Array.from({ length: 5 }, (_, index) => (
                  <div
                    key={index}
                    className="h-4 w-4 animate-pulse rounded bg-neutral-600 sm:h-5 sm:w-5"
                  ></div>
                ))}
                <div className="h-4 w-10 animate-pulse rounded bg-neutral-600 sm:h-5 sm:w-12"></div>
              </div>

              {/* Description skeleton */}
              <div className="space-y-2">
                <div className="h-3 w-full animate-pulse rounded bg-neutral-600 sm:h-4"></div>
                <div className="h-3 w-full animate-pulse rounded bg-neutral-600 sm:h-4"></div>
                <div className="h-3 w-2/3 animate-pulse rounded bg-neutral-600 sm:h-4"></div>
              </div>

              {/* Buttons skeleton */}
              <div className="flex items-center space-x-4">
                <div className="h-10 w-28 animate-pulse rounded-lg bg-neutral-600 sm:h-12 sm:w-32"></div>
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
                    <div className="flex flex-col items-center gap-6 sm:gap-8 lg:grid lg:grid-cols-2 lg:gap-14">
                      <div className="order-2 w-full lg:order-1">
                        <CarouselImage
                          src={`${TMDB_IMAGE_BASE_URL}/original${detail.backdrop_path}`}
                          alt="image"
                          type={detail.media_type}
                          detailId={detail.id}
                        />
                      </div>
                      <div className="order-1 w-full lg:order-2">
                        <CarouselDetails
                          detailId={detail.id}
                          chips={chips}
                          title={capitalizeFirstLetter(title)}
                          rating={detail.vote_average}
                          description={detail.overview}
                          type={detail.media_type}
                        />
                      </div>
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
