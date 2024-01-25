"use server";

import apiClient from "../api-client";
import { API_ROUTES } from "@/utils/enum";

const getMovieCreditsAPI = async (movieId: number) => {
  let errors = null;
  let response = null;
  try {
    response = await apiClient.get(
      API_ROUTES.MOVIE_CREDITS.replace(":movieId", movieId.toString()),
    );
    response = response.data;
    return { response, errors };
  } catch (error) {
    return { response, errors: error };
  }
};

export default getMovieCreditsAPI;
