import { CommonCardType, MediaVideoType } from "@/types";
import React from "react";
import Player from "./player";
import PlayerContainerDetails from "./details";

interface PlayerContainerProps {
  videoDetails: MediaVideoType[] | null;
  mediaDetails: CommonCardType | null;
}

const PlayerContainer = ({
  videoDetails,
  mediaDetails,
}: PlayerContainerProps) => {
  return (
    <div className="w-full px-60">
      <div className="mx-auto py-12">
        <div className="flex justify-center">
          <div className="items-center justify-center">
            {mediaDetails && <PlayerContainerDetails data={mediaDetails} />}
            {videoDetails && <Player data={videoDetails} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerContainer;
