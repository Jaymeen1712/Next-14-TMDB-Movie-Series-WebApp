"use server";

import apiClient from "../api-client";
import { API_ROUTES } from "@/utils/enum";

const getMediaDetailsAPI = async (media: string, mediaId: number) => {
  let errors = null;
  let response = null;
  try {
    response = await apiClient.get(
      API_ROUTES.MEDIA_DETAILS.replace(":media", media).replace(
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

export default getMediaDetailsAPI;
