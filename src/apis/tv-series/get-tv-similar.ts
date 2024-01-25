"use server";

import apiClient from "../api-client";
import { API_ROUTES } from "@/utils/enum";

const getTvSimilarAPI = async (tvId: number) => {
  let errors = null;
  let response = null;
  try {
    response = await apiClient.get(API_ROUTES.TV_SIMILAR.replace(":tvId", tvId.toString()));
    response = response.data;
    return { response, errors };
  } catch (error) {
    return { response, errors: error };
  }
};

export default getTvSimilarAPI;
