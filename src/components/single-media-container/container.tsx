import { CreditType, SingleMediaType } from "@/types";
import { TMDB_IMAGE_BASE_URL } from "@/utils";
import Image from "next/image";
import MediaDetailsContainer from "./detail";

interface SingleMediaContainerProps {
  data: SingleMediaType | null;
  credits: CreditType[] | null;
  type: string;
}

const SingleMediaContainer = ({
  data,
  credits,
  type,
}: SingleMediaContainerProps) => {
  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60">
      <div className="relative z-30 mx-auto pb-16 pt-24 sm:pb-24 sm:pt-32 lg:pb-36 lg:pt-48">
        <div className="flex flex-col justify-center gap-6 lg:flex-row lg:gap-0">
          <div className="flex justify-center lg:justify-start">
            <div className="relative h-full w-full max-w-[300px] bg-transparent pt-2 backdrop-blur-xl backdrop-brightness-150 lg:w-[10%]">
              <div className="relative lg:absolute lg:inset-0 lg:left-auto lg:top-[10%] lg:w-[180%]">
                {data && (
                  <>
                    <div className="absolute left-3 top-3 z-10 text-sm font-bold text-white drop-shadow-xl sm:left-5 sm:top-5 sm:text-xl">
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
            <div className="mt-4 w-full bg-transparent backdrop-blur-xl backdrop-brightness-125 lg:mt-0 lg:w-[90%]">
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
