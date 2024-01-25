import { CommonCardType } from "@/types";
import Link from "next/link";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const PlayerContainerDetails = ({ data }: { data: CommonCardType }) => {
  return (
    <div className="flex h-[90px] items-center justify-between bg-neutral-900 px-12">
      <h1 className="text-lg font-bold text-white">{data.title || data.name}</h1>
      <Link
        href={`${!data.first_air_date || data.media_type === "movie" ? "/movie" : "/series"}/${data.id}`}
      >
        <div className="flex items-center justify-center text-lg font-bold text-white">
          <FaInfoCircle color="white" className="mr-2" />
          Detail
        </div>
      </Link>
    </div>
  );
};

export default PlayerContainerDetails;
