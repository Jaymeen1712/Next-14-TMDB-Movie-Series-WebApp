import { CommonCardType } from "@/types";
import { TMDB_IMAGE_BASE_URL, capitalizeFirstLetter } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";

interface SearchListProps {
  data: CommonCardType;
}

const roundDot = <span className="mx-1 text-white/50">•</span>;

const SearchList = ({ data }: SearchListProps) => {
  return (
    <Link
      href={`/${data.media_type === "movie" ? "movie" : "series"}/${data.id}`}
    >
      <div className="group mt-1 text-white hover:cursor-pointer">
        <div className="flex items-center">
          <Image
            alt={data.title || data.name}
            src={`${TMDB_IMAGE_BASE_URL}/original${data.media_type === ("movie" || "tv") ? data.poster_path : data.profile_path}`}
            width={50}
            height={50}
          />
          <div className="p-6">
            <h1 className="text-sm group-hover:text-primary">
              {capitalizeFirstLetter(data.title || data.name)}
            </h1>
            {data.media_type === ("movie" || "tv") && (
              <span className="flex items-center text-xs">
                {capitalizeFirstLetter(data.media_type)}
                {roundDot}
                <FaStar size={10} className="mr-2 text-white" />
                {data.vote_average.toFixed(1)}
                {roundDot}
                {data.release_date
                  ? data.release_date.split("-")[0]
                  : data.first_air_date && data.first_air_date.split("-")[0]}
              </span>
            )}
            {data.media_type === "person" && (
              <span className="flex items-center text-xs">
                {capitalizeFirstLetter(data.known_for_department)}
                {roundDot}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchList;
