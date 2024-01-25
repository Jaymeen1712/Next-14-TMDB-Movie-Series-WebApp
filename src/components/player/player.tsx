"use client";

import { MediaVideoType } from "@/types";
import React, { useEffect, useState } from "react";

import Plyr, { PlyrSource } from "plyr-react";
import "plyr-react/plyr.css";
import { YOUTUBE_VIDEO_BASE_URL } from "@/utils";

interface PlayerProps {
  data: MediaVideoType[] | null;
}

const options = {
  keyboard: { focused: true, global: true },
  ratio: "16:9",
  quality: {
    default: 1080,
    options: [2160, 1440, 1080, 720, 576, 480, 360, 240],
  },
};

const Player = ({ data }: PlayerProps) => {
  const [sources, setSources] = useState<PlyrSource["sources"]>([]);

  useEffect(() => {
    if (data) {
      const filteredSources = data
        .filter(
          (subData) =>
            (subData.type === "Trailer" && subData.size === 2160) ||
            subData.type === "Trailer",
        )
        .map((subData) => ({
          src: `${YOUTUBE_VIDEO_BASE_URL}${subData.key}`,
          provider: "youtube",
        }));

      const allSources = data.map((subData) => ({
        src: `${YOUTUBE_VIDEO_BASE_URL}${subData.key}`,
        provider: "youtube",
      }));

      // @ts-ignore
      setSources([...filteredSources, ...allSources]);
    }
  }, [data]);

  return (
    <div className="w-[1200px]">
      {data && (
        <Plyr
          source={{
            sources,
            type: "video",
          }}
          options={options}
        />
      )}
    </div>
  );
};

export default Player;
