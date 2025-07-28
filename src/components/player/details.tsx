"use client";

import { CommonCardType } from "@/types";
import { useRouter } from "next/navigation";
import { FaInfoCircle } from "react-icons/fa";

const PlayerContainerDetails = ({ data }: { data: CommonCardType }) => {
  const router = useRouter();

  const handleDetailClick = () => {
    const path =
      !data.first_air_date || data.media_type === "movie"
        ? "/movie"
        : "/series";
    router.push(`${path}/${data.id}`);
  };

  return (
    <div className="flex h-[90px] items-center justify-between bg-neutral-900 px-12">
      <h1 className="text-lg font-bold text-white">
        {data.title || data.name}
      </h1>
      <button
        onClick={handleDetailClick}
        className="flex items-center justify-center text-lg font-bold text-white transition-colors hover:text-primary"
      >
        <FaInfoCircle color="white" className="mr-2" />
        Detail
      </button>
    </div>
  );
};

export default PlayerContainerDetails;
