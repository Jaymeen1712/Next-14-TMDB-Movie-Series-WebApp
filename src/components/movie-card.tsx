"use client";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@nextui-org/react";
import Image from "next/image";
import React from "react";

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
      className="3xl:w-[227px] 3xl:h-[337px] group relative border-none lg:h-[320px] lg:w-[216px]"
      shadow="md"
      isPressable
      disableRipple
      disableAnimation
      onPress={handleCardPress}
    >
      <CardHeader className="absolute left-2 top-1">
        <h1 className="text-xl font-bold text-white drop-shadow-xl">HD</h1>
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
      <CardFooter className="delay-20 absolute bottom-3 left-3 w-[89%] justify-between rounded-lg py-2 transition ease-in-out group-hover:-translate-y-1 group-hover:bg-white/10 group-hover:backdrop-blur-sm">
        <div className="grid-rows-2">
          <div className="mb-2 flex items-center justify-start space-x-2">
            {chips?.map((chip) => (
              <Chip
                key={chip}
                className={`rounded-md bg-primary bg-opacity-30 p-0 text-primary`}
                size="sm"
              >
                {chip}
              </Chip>
            ))}
          </div>
          <h1 className="text-left font-bold text-white">{title}</h1>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
