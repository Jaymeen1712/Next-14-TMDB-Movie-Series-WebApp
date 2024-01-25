import { getMediaDetailsAPI, getMediaVideosAPI } from "@/apis/common";
import PlayerContainer from "@/components/player/container";
import React from "react";

interface WatchPageProps {
  params: {
    media: string;
    mediaId: number;
  };
}

const WatchPage = async ({ params }: WatchPageProps) => {
  const { response: mediaVideosResponse, errors: mediaVideosErrors } =
  await getMediaVideosAPI(params.media, params.mediaId);
  const { response: mediaDetailsResponse, errors: mediaDetailsErrors } =
  await getMediaDetailsAPI(params.media, params.mediaId);

  return (
    <div className="flex-1 bg-neutral-800">
      {!mediaVideosErrors && !mediaDetailsErrors && (
        <PlayerContainer
          videoDetails={mediaVideosResponse.results}
          mediaDetails={mediaDetailsResponse}
        />
      )}
    </div>
  );
};

export default WatchPage;
