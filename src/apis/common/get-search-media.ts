"use server";

import apiClient from "../api-client";
import { API_ROUTES } from "@/utils/enum";

const getSearchMediaAPI = async (search: string) => {
  let errors = null;
  let response = null;
  try {
    (response = await apiClient.get(
      `${API_ROUTES.SEARCH_MEDIA}?query=${search.split(" ").join("+")}`,
    )),
      (response = response.data);
    return { response, errors };
  } catch (error) {
    return { response, errors: error };
  }
};

export default getSearchMediaAPI;
