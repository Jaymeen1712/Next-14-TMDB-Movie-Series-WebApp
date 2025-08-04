"use client";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@nextui-org/react";
import Image from "next/image";

import { CommonCardType } from "@/types";
import { TMDB_IMAGE_BASE_URL } from "@/utils";
import { useRouter } from "next/navigation";

interface MovieCardProps {
  data: CommonCardType;
}

const MovieCard = ({ data }: MovieCardProps) => {
  const router = useRouter();

  const aspectRatio = 16 / 9;
  const width = 216;
  const height = Math.round(width / aspectRatio);

  let chips: string[] = ["HD"];
  if (data.media_type) {
    chips.push(
      data.media_type.toLowerCase() === "movie" ? "Movie" : "TV Series",
    );
  }

  data.release_date
    ? chips.push(data.release_date?.split("-")[0])
    : chips.push(data.first_air_date?.split("-")[0]);

  const title = data.title || data.name || "Title";

  const handleCardPress = () => {
    data.media_type === "tv" || data.first_air_date
      ? router.push(`/series/${data.id}`)
      : router.push(`/movie/${data.id}`);
  };

  return (
    <Card
      radius="none"
      className="xs:w-[160px] xs:h-[240px] 3xl:w-[227px] 3xl:h-[337px] group relative h-[280px] w-full border-none sm:h-[270px] sm:w-[180px] md:h-[300px] md:w-[200px] lg:h-[320px] lg:w-[216px] xl:h-[330px] xl:w-[220px]"
      shadow="md"
      isPressable
      disableRipple
      disableAnimation
      onPress={handleCardPress}
    >
      <CardHeader className="xs:left-2 absolute left-1 top-1">
        <h1 className="xs:text-base text-sm font-bold text-white drop-shadow-xl sm:text-lg lg:text-xl">
          HD
        </h1>
      </CardHeader>
      <CardBody className="overflow-hidden p-0">
        <Image
          alt="Woman listing to music"
          className="h-full w-full transform object-fill transition-transform group-hover:scale-110"
          src={`${TMDB_IMAGE_BASE_URL}/original${data.poster_path}`}
          width={width}
          height={height}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-neutral-800" />
      </CardBody>
      <CardFooter className="delay-20 xs:bottom-3 xs:left-3 xs:w-[89%] xs:py-2 absolute bottom-2 left-2 w-[90%] justify-between rounded-lg py-1 transition ease-in-out group-hover:-translate-y-1 group-hover:bg-white/10 group-hover:backdrop-blur-sm">
        <div className="grid-rows-2">
          <div className="xs:mb-2 xs:space-x-2 mb-1 flex items-center justify-start space-x-1">
            {chips?.map((chip) => (
              <Chip
                key={chip}
                className={`rounded-md bg-primary bg-opacity-30 p-0 text-primary`}
                size="sm"
              >
                <span className="xs:text-sm text-xs">{chip}</span>
              </Chip>
            ))}
          </div>
          <h1 className="xs:text-sm line-clamp-2 text-left text-xs font-bold text-white sm:text-base">
            {title}
          </h1>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
