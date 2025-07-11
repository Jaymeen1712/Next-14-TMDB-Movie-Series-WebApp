"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { memo, useMemo } from "react";
import {
  A11y,
  Autoplay,
  EffectCoverflow,
  Keyboard,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useCarousel, useCarouselA11y } from "@/hooks/use-carousel";
import { CarouselProps } from "@/types";
import { TMDB_IMAGE_BASE_URL, capitalizeFirstLetter } from "@/utils";
import ErrorBoundary from "../ui/error-boundary";
import { CarouselSkeleton } from "../ui/skeleton";

// Enhanced Carousel Image Component
interface EnhancedCarouselImageProps {
  src: string;
  alt: string;
  type: string;
  detailId: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const EnhancedCarouselImage: React.FC<EnhancedCarouselImageProps> = ({
  src,
  alt,
  type,
  detailId,
  priority = false,
  onLoad,
  onError,
}) => {
  const aspectRatio = 16 / 9;
  const width = 783;
  const height = Math.round(width / aspectRatio);

  return (
    <motion.div
      className="group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-3xl"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Play Button Overlay */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform"
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="rounded-full bg-white bg-opacity-10 p-7 backdrop-blur-md duration-200 group-hover:bg-opacity-20">
          <svg
            className="pl-2 text-white"
            width={35}
            height={35}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </motion.div>

      {/* Image */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        onLoad={onLoad}
        onError={onError}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
};

// Enhanced Carousel Details Component
interface EnhancedCarouselDetailsProps {
  chips?: string[];
  title: string;
  rating: number;
  description: string;
  detailId: number;
  type: string;
}

const EnhancedCarouselDetails: React.FC<EnhancedCarouselDetailsProps> = ({
  chips,
  title,
  rating,
  description,
  detailId,
  type,
}) => {
  const watchUrl = `/watch/${type === "tv" ? "series" : "movie"}/${detailId}`;
  const detailUrl = `/${type === "tv" ? "series" : "movie"}/${detailId}`;

  return (
    <motion.div
      className="grid h-[75%] gap-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Chips */}
      {chips && chips.length > 0 && (
        <motion.div
          className="flex items-center justify-start space-x-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {chips.map((chip, index) => (
            <motion.span
              key={chip}
              className="rounded-md bg-neutral-800 px-3 py-1 text-sm text-primary"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.4 + index * 0.1 }}
            >
              {chip}
            </motion.span>
          ))}
        </motion.div>
      )}

      {/* Title */}
      <motion.h1
        className="text-4xl font-bold tracking-wide text-white transition-colors hover:text-primary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <a href={detailUrl} className="hover:underline">
          {title}
        </a>
      </motion.h1>

      {/* Rating */}
      <motion.div
        className="flex items-center space-x-2 text-white"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-5 w-5 ${
                i < Math.floor(rating / 2) ? "text-yellow-400" : "text-gray-600"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-2 text-sm">{rating.toFixed(1)}</span>
        </div>
      </motion.div>

      {/* Description */}
      <motion.p
        className="line-clamp-3 text-white/80"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        {description}
      </motion.p>

      {/* Watch Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <motion.a
          href={watchUrl}
          className="group inline-flex w-[12rem] items-center justify-center rounded-full bg-primary bg-opacity-30 px-8 py-4 transition-all duration-300 hover:bg-opacity-100"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="mr-2 text-primary transition-colors group-hover:text-black"
            width={15}
            height={15}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="text-primary transition-colors group-hover:text-black">
            Watch now
          </span>
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

// Enhanced Carousel Navigation
interface CarouselNavigationProps {
  swiperRef: React.RefObject<SwiperRef>;
  disabled?: boolean;
  controls: { goToNext: () => void; goToPrev: () => void; toggle: () => void };
  state: { isPlaying: boolean; isBeginning: boolean; isEnd: boolean };
}

const CarouselNavigation: React.FC<CarouselNavigationProps> = memo(
  ({ swiperRef, disabled = false, controls, state }) => {
    if (disabled) return null;

    return (
      <div className="flex flex-col items-center justify-center gap-6">
        <motion.button
          onClick={controls.goToNext}
          aria-label="Next slide"
          className="rounded-full bg-white/10 p-4 backdrop-blur-md transition-all hover:bg-white/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={disabled}
        >
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>

        <motion.button
          onClick={controls.goToPrev}
          aria-label="Previous slide"
          className="rounded-full bg-white/10 p-4 backdrop-blur-md transition-all hover:bg-white/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={disabled}
        >
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </motion.button>
      </div>
    );
  },
);

// Main Enhanced Carousel Component
const EnhancedCarousel: React.FC<CarouselProps> = memo(
  ({ commonDetails, setDashboardImage, isLoading }) => {
    const processedData = useMemo(() => {
      return commonDetails.slice(0, 10).map((detail) => {
        const chips: string[] = ["HD"];

        if (detail.media_type) {
          chips.push(
            detail.media_type.toLowerCase() === "movie" ? "Movie" : "TV Series",
          );
        }

        if (
          "release_date" in detail &&
          detail.release_date &&
          detail.release_date.length > 0
        ) {
          chips.push(detail.release_date!.split("-")[0]);
        } else if (
          "first_air_date" in detail &&
          detail.first_air_date &&
          detail.first_air_date.length > 0
        ) {
          chips.push(detail.first_air_date!.split("-")[0]);
        }

        const title =
          ("title" in detail
            ? detail.title
            : "name" in detail
              ? detail.name
              : "Title") || "Title";

        return {
          ...detail,
          chips,
          processedTitle: capitalizeFirstLetter(title),
        };
      });
    }, [commonDetails]);

    const { swiperRef, state, controls, handlers } = useCarousel(
      processedData.length,
      {
        autoplay: true,
        autoplayDelay: 5000,
        loop: true,
        pauseOnHover: true,
        keyboard: true,
      },
      (index) => {
        const detail = processedData[index];
        if (detail && "backdrop_path" in detail && detail.backdrop_path) {
          const filename =
            detail.backdrop_path.split("/").pop()?.split(".")[0] + ".jpg";
          setDashboardImage(filename || "");
        }
      },
    );

    const { getAriaLabel } = useCarouselA11y(
      state.activeIndex,
      state.slidesCount,
      state.isPlaying,
    );

    // Loading state
    if (isLoading) {
      return (
        <ErrorBoundary level="section">
          <CarouselSkeleton />
        </ErrorBoundary>
      );
    }

    // Empty state
    if (!processedData.length) {
      return (
        <div className="grid grid-cols-12 items-center justify-center">
          <div className="col-span-11 my-16">
            <div className="flex h-[400px] items-center justify-center">
              <p className="text-neutral-400">No content available</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <ErrorBoundary level="section">
        <div
          className="grid grid-cols-12 items-center justify-center"
          role="region"
          aria-label={getAriaLabel()}
          aria-live="polite"
        >
          <div className="col-span-11 my-16">
            <Swiper
              ref={swiperRef}
              effect="coverflow"
              grabCursor
              centeredSlides
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 20,
                stretch: 25,
                depth: 250,
                modifier: 1,
                slideShadows: false,
              }}
              modules={[
                EffectCoverflow,
                Navigation,
                Pagination,
                Autoplay,
                Keyboard,
                A11y,
              ]}
              onActiveIndexChange={handlers.onSlideChange}
              onReachBeginning={handlers.onReachBeginning}
              onReachEnd={handlers.onReachEnd}
              onAutoplayStart={handlers.onAutoplayStart}
              onAutoplayStop={handlers.onAutoplayStop}
              onAutoplayPause={handlers.onAutoplayPause}
              onAutoplayResume={handlers.onAutoplayResume}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              keyboard={{ enabled: true, onlyInViewport: true }}
              a11y={{
                enabled: true,
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}",
              }}
              loop={true}
              className="enhanced-carousel"
            >
              <AnimatePresence>
                {processedData.map((detail, index) => (
                  <SwiperSlide key={detail.id}>
                    <motion.div
                      className="grid grid-cols-2 items-center gap-14"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <EnhancedCarouselImage
                        src={`${TMDB_IMAGE_BASE_URL}/original${
                          "backdrop_path" in detail
                            ? detail.backdrop_path
                            : detail.profile_path
                        }`}
                        alt={detail.processedTitle}
                        type={detail.media_type || "movie"}
                        detailId={detail.id}
                        priority={index === 0}
                      />
                      <EnhancedCarouselDetails
                        detailId={detail.id}
                        chips={detail.chips}
                        title={detail.processedTitle}
                        rating={
                          "vote_average" in detail ? detail.vote_average : 0
                        }
                        description={
                          "overview" in detail ? detail.overview : ""
                        }
                        type={detail.media_type || "movie"}
                      />
                    </motion.div>
                  </SwiperSlide>
                ))}
              </AnimatePresence>
            </Swiper>
          </div>
          <CarouselNavigation
            swiperRef={swiperRef}
            disabled={isLoading || !processedData.length}
            controls={controls}
            state={state}
          />
        </div>
      </ErrorBoundary>
    );
  },
);

EnhancedCarousel.displayName = "EnhancedCarousel";

export default EnhancedCarousel;
