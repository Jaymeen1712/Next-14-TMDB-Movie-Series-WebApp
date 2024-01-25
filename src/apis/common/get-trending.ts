"use server";

import { API_ROUTES } from "@/utils/enum";
import apiClient from "../api-client";

const getTrendingAPI = async () => {
  let errors = null;
  let response = null;
  try {
    response = await apiClient.get(API_ROUTES.ALL_TRENDING);
    response = response.data;
    return { response, errors };
  } catch (error) {
    return { response, errors: error };
  }
};

export default getTrendingAPI;
