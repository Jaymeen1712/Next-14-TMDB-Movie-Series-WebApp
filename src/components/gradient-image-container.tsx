"use client";

import { TMDB_IMAGE_BASE_URL } from "@/utils";
import Image from "next/image";
import React from "react";

const GradientImageContainer = ({ path }: { path: string }) => {
  return (
    <>
      <div className="absolute w-full h-full bg-gradient-to-b from-[#2a8085] to-neutral-900 opacity-50" />
      <div className="absolute opacity-20 w-full h-full blur-lg">
        <Image
          src={`${TMDB_IMAGE_BASE_URL}/original/${path}`}
          alt="Your Image"
          fill
        />
      </div>
    </>
  );
};

export default GradientImageContainer;
