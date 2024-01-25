"use client";

import React, { MutableRefObject } from "react";
import CarouselPaginationButton from "../controls/button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { forwardRef } from "@nextui-org/react";
import { SwiperRef } from "swiper/react";

const CarouselPaginationButtons = forwardRef((props, ref) => {
  return (
    <div className="grid grid-row-2 gap-6 items-center justify-center">
      <CarouselPaginationButton
        Icon={FaAngleRight}
        handleClick={() => {
          if (ref) {
            (ref as MutableRefObject<SwiperRef>).current.swiper.slideNext();
          }
        }}
      />
      <CarouselPaginationButton
        Icon={FaAngleLeft}
        handleClick={() => {
          if (ref) {
            (ref as MutableRefObject<SwiperRef>).current.swiper.slidePrev();
          }
        }}
      />
    </div>
  );
});

export default CarouselPaginationButtons;
