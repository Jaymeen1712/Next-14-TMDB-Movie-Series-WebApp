import { Button, Chip } from "@nextui-org/react";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import Rating from "../rating";

interface CarouselDetailsProps {
  chips?: string[];
  title: string;
  rating: number;
  description: string;
  detailId: number;
  type: string;
}

const CarouselDetails = ({
  chips,
  title,
  rating,
  description,
  detailId,
  type,
}: CarouselDetailsProps) => {
  return (
    <div className="grid h-auto space-y-3 sm:space-y-4 lg:h-[75%]">
      <div className="flex items-center justify-start space-x-1 sm:space-x-2">
        {chips?.map((chip) => (
          <Chip
            key={chip}
            className={`rounded-md bg-neutral-800 text-primary`}
            size="sm"
          >
            <span className="text-xs sm:text-sm">{chip}</span>
          </Chip>
        ))}
      </div>
      <h1
        className={
          "hover:textColor xs:text-2xl line-clamp-2 text-xl font-bold tracking-wide text-white hover:text-primary sm:text-3xl lg:text-4xl"
        }
      >
        <Link href={`/${type === "tv" ? "series" : "movie"}/${detailId}`}>
          {title}
        </Link>
      </h1>
      <div className="text-white">
        <Rating stop={rating} />
      </div>
      <div className="line-clamp-2 text-sm text-white sm:line-clamp-3 sm:text-base lg:line-clamp-1">
        {description}
      </div>
      <Link href={`/watch/${type === "tv" ? "series" : "movie"}/${detailId}`}>
        <Button
          className={`xs:w-[10rem] group w-full items-center justify-center rounded-full bg-primary bg-opacity-30 px-6 py-5 hover:scale-110 hover:cursor-pointer hover:bg-opacity-100 sm:w-[12rem] sm:px-8 sm:py-7`}
          disableRipple
        >
          <FaPlay className={`text-primary group-hover:text-black`} size={12} />
          <h1
            className={`ml-1 text-sm text-primary group-hover:text-black sm:text-base`}
          >
            Watch now
          </h1>
        </Button>
      </Link>
    </div>
  );
};

export default CarouselDetails;
