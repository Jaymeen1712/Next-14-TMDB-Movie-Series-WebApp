import { TMDB_IMAGE_BASE_URL } from "@/utils";
import Image from "next/image";
import React from "react";
import MediaDetailsContainer from "./detail";
import { CreditType, SingleMediaType } from "@/types";

interface SingleMediaContainerProps {
  data: SingleMediaType | null;
  credits: CreditType[] | null;
  type: string;
}

const SingleMediaContainer = ({ data, credits, type }: SingleMediaContainerProps) => {
  return (
    <div className="w-full px-60">
      <div className="relative z-30 mx-auto pb-36 pt-48">
        <div className="flex justify-center">
          <div className="flex justify-center">
            <div className="relative h-full w-[10%] bg-transparent pt-2 backdrop-blur-xl backdrop-brightness-150">
              <div className="absolute inset-0 left-auto top-[10%] w-[180%]">
                {data && (
                  <>
                    <div className="absolute left-5 top-5 text-xl font-bold text-white drop-shadow-xl">
                      HD
                    </div>
                    <Image
                      src={`${TMDB_IMAGE_BASE_URL}/original${data.poster_path}`}
                      alt={data.title}
                      width={1920}
                      height={1080}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="w-[90%] bg-transparent backdrop-blur-xl backdrop-brightness-125">
              {data && credits && (
                <MediaDetailsContainer
                  data={data}
                  credits={credits}
                  mediaType={type}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMediaContainer;
