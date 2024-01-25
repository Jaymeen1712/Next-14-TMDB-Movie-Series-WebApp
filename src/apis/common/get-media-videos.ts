"use server";

import apiClient from "../api-client";
import { API_ROUTES } from "@/utils/enum";

const getMediaVideosAPI = async (media: string, mediaId: number) => {
  let errors = null;
  let response = null;
  try {
    response = await apiClient.get(
      API_ROUTES.MEDIA_VIDEOS.replace(":media", media).replace(
        ":mediaId",
        mediaId.toString(),
      ),
    );
    response = response.data;
    return { response, errors };
  } catch (error) {
    return { response, errors: error };
  }
};

export default getMediaVideosAPI;
