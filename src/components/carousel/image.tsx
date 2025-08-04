import Image, { ImageProps } from "next/image";
import Link from "next/link";
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
      <div className="group relative flex w-full cursor-pointer items-center justify-center">
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="xs:p-5 rounded-full bg-white bg-opacity-10 p-4 backdrop-blur-md duration-200 group-hover:bg-opacity-20 sm:p-6 lg:p-7">
            <FaPlay
              color="white"
              size={20}
              className="xs:pl-2 pl-1 sm:size-[25px] lg:size-[35px]"
            />
          </div>
        </div>
        <Image
          className="h-auto w-full rounded-2xl object-cover sm:rounded-3xl"
          alt={alt}
          {...rest}
          width={width}
          height={height}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 783px"
          priority
        />
      </div>
    </Link>
  );
};

export default CarouselImage;
