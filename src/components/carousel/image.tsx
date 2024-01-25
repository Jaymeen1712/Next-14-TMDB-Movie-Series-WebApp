import Image, { ImageProps } from "next/image";
import Link from "next/link";
import React from "react";
import { FaPlay } from "react-icons/fa";

interface CarouselImageProps extends ImageProps {
  type: string;
  detailId: number;
}

const CarouselImage = ({
  alt,
  type,
  detailId,
  ...rest
}: CarouselImageProps) => {
  const aspectRatio = 16 / 9;
  const width = 783;
  const height = Math.round(width / aspectRatio);

  return (
    <Link href={`/${type === "tv" ? "series" : "movie"}/${detailId}`}>
      <div className="group relative flex cursor-pointer items-center justify-center">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform ">
          <div className="rounded-full bg-white bg-opacity-10 p-7 backdrop-blur-md duration-200 group-hover:bg-opacity-20">
            <FaPlay color="white" size={35} className="pl-2" />
          </div>
        </div>
        <Image
          className="rounded-3xl"
          alt={alt}
          {...rest}
          width={width}
          height={height}
        />
      </div>
    </Link>
  );
};

export default CarouselImage;
