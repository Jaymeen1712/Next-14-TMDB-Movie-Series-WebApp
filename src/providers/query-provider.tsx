"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Query client configuration
const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Stale time: 5 minutes
        staleTime: 5 * 60 * 1000,
        // Cache time: 10 minutes
        gcTime: 10 * 60 * 1000,
        // Retry failed requests 3 times
        retry: 3,
        // Retry delay with exponential backoff
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // Refetch on window focus in production
        refetchOnWindowFocus: process.env.NODE_ENV === "production",
        // Refetch on reconnect
        refetchOnReconnect: true,
        // Background refetch interval: 5 minutes
        refetchInterval: 5 * 60 * 1000,
        // Only refetch in background if data is stale
        refetchIntervalInBackground: false,
      },
      mutations: {
        // Retry failed mutations once
        retry: 1,
        // Retry delay: 1 second
        retryDelay: 1000,
      },
    },
  });
};

// Query provider component
interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  // Create query client instance (only once per component lifecycle)
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Show React Query DevTools in development */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools
          initialIsOpen={false}
          position="bottom-right"
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  );
}

// Query keys factory for consistent key management
export const queryKeys = {
  // Movies
  movies: {
    all: ["movies"] as const,
    lists: () => [...queryKeys.movies.all, "list"] as const,
    list: (filters: Record<string, any>) =>
      [...queryKeys.movies.lists(), filters] as const,
    details: () => [...queryKeys.movies.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.movies.details(), id] as const,
    trending: (timeWindow: "day" | "week" = "week") =>
      [...queryKeys.movies.all, "trending", timeWindow] as const,
    popular: (page: number = 1) =>
      [...queryKeys.movies.all, "popular", page] as const,
    topRated: (page: number = 1) =>
      [...queryKeys.movies.all, "top-rated", page] as const,
    nowPlaying: (page: number = 1) =>
      [...queryKeys.movies.all, "now-playing", page] as const,
    upcoming: (page: number = 1) =>
      [...queryKeys.movies.all, "upcoming", page] as const,
    similar: (id: number, page: number = 1) =>
      [...queryKeys.movies.detail(id), "similar", page] as const,
    recommendations: (id: number, page: number = 1) =>
      [...queryKeys.movies.detail(id), "recommendations", page] as const,
    credits: (id: number) =>
      [...queryKeys.movies.detail(id), "credits"] as const,
    images: (id: number) =>
      [...queryKeys.movies.detail(id), "images"] as const,
    videos: (id: number) =>
      [...queryKeys.movies.detail(id), "videos"] as const,
    reviews: (id: number, page: number = 1) =>
      [...queryKeys.movies.detail(id), "reviews", page] as const,
    search: (query: string, page: number = 1) =>
      [...queryKeys.movies.all, "search", query, page] as const,
    discover: (filters: Record<string, any>) =>
      [...queryKeys.movies.all, "discover", filters] as const,
  },

  // TV Series
  tv: {
    all: ["tv"] as const,
    lists: () => [...queryKeys.tv.all, "list"] as const,
    list: (filters: Record<string, any>) =>
      [...queryKeys.tv.lists(), filters] as const,
    details: () => [...queryKeys.tv.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.tv.details(), id] as const,
    trending: (timeWindow: "day" | "week" = "week") =>
      [...queryKeys.tv.all, "trending", timeWindow] as const,
    popular: (page: number = 1) =>
      [...queryKeys.tv.all, "popular", page] as const,
    topRated: (page: number = 1) =>
      [...queryKeys.tv.all, "top-rated", page] as const,
    onTheAir: (page: number = 1) =>
      [...queryKeys.tv.all, "on-the-air", page] as const,
    airingToday: (page: number = 1) =>
      [...queryKeys.tv.all, "airing-today", page] as const,
    similar: (id: number, page: number = 1) =>
      [...queryKeys.tv.detail(id), "similar", page] as const,
    recommendations: (id: number, page: number = 1) =>
      [...queryKeys.tv.detail(id), "recommendations", page] as const,
    credits: (id: number) => [...queryKeys.tv.detail(id), "credits"] as const,
    images: (id: number) => [...queryKeys.tv.detail(id), "images"] as const,
    videos: (id: number) => [...queryKeys.tv.detail(id), "videos"] as const,
    reviews: (id: number, page: number = 1) =>
      [...queryKeys.tv.detail(id), "reviews", page] as const,
    search: (query: string, page: number = 1) =>
      [...queryKeys.tv.all, "search", query, page] as const,
    discover: (filters: Record<string, any>) =>
      [...queryKeys.tv.all, "discover", filters] as const,
    season: (seriesId: number, seasonNumber: number) =>
      [...queryKeys.tv.detail(seriesId), "season", seasonNumber] as const,
    episode: (seriesId: number, seasonNumber: number, episodeNumber: number) =>
      [
        ...queryKeys.tv.season(seriesId, seasonNumber),
        "episode",
        episodeNumber,
      ] as const,
  },

  // People
  people: {
    all: ["people"] as const,
    lists: () => [...queryKeys.people.all, "list"] as const,
    list: (filters: Record<string, any>) =>
      [...queryKeys.people.lists(), filters] as const,
    details: () => [...queryKeys.people.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.people.details(), id] as const,
    popular: (page: number = 1) =>
      [...queryKeys.people.all, "popular", page] as const,
    search: (query: string, page: number = 1) =>
      [...queryKeys.people.all, "search", query, page] as const,
    movieCredits: (id: number) =>
      [...queryKeys.people.detail(id), "movie-credits"] as const,
    tvCredits: (id: number) =>
      [...queryKeys.people.detail(id), "tv-credits"] as const,
    combinedCredits: (id: number) =>
      [...queryKeys.people.detail(id), "combined-credits"] as const,
    images: (id: number) =>
      [...queryKeys.people.detail(id), "images"] as const,
  },

  // Genres
  genres: {
    all: ["genres"] as const,
    movies: () => [...queryKeys.genres.all, "movies"] as const,
    tv: () => [...queryKeys.genres.all, "tv"] as const,
  },

  // Configuration
  configuration: {
    all: ["configuration"] as const,
    api: () => [...queryKeys.configuration.all, "api"] as const,
    countries: () => [...queryKeys.configuration.all, "countries"] as const,
    languages: () => [...queryKeys.configuration.all, "languages"] as const,
    timezones: () => [...queryKeys.configuration.all, "timezones"] as const,
  },

  // Search
  search: {
    all: ["search"] as const,
    multi: (query: string, page: number = 1) =>
      [...queryKeys.search.all, "multi", query, page] as const,
    movies: (query: string, page: number = 1) =>
      [...queryKeys.search.all, "movies", query, page] as const,
    tv: (query: string, page: number = 1) =>
      [...queryKeys.search.all, "tv", query, page] as const,
    people: (query: string, page: number = 1) =>
      [...queryKeys.search.all, "people", query, page] as const,
    collections: (query: string, page: number = 1) =>
      [...queryKeys.search.all, "collections", query, page] as const,
    companies: (query: string, page: number = 1) =>
      [...queryKeys.search.all, "companies", query, page] as const,
    keywords: (query: string, page: number = 1) =>
      [...queryKeys.search.all, "keywords", query, page] as const,
  },

  // Trending
  trending: {
    all: ["trending"] as const,
    movies: (timeWindow: "day" | "week" = "week") =>
      [...queryKeys.trending.all, "movies", timeWindow] as const,
    tv: (timeWindow: "day" | "week" = "week") =>
      [...queryKeys.trending.all, "tv", timeWindow] as const,
    people: (timeWindow: "day" | "week" = "week") =>
      [...queryKeys.trending.all, "people", timeWindow] as const,
    all: (timeWindow: "day" | "week" = "week") =>
      [...queryKeys.trending.all, "all", timeWindow] as const,
  },
} as const;

// Query client utilities
export const queryClientUtils = {
  // Invalidate all queries for a specific entity
  invalidateMovies: (queryClient: QueryClient) => {
    return queryClient.invalidateQueries({
      queryKey: queryKeys.movies.all,
    });
  },

  invalidateTV: (queryClient: QueryClient) => {
    return queryClient.invalidateQueries({
      queryKey: queryKeys.tv.all,
    });
  },

  invalidatePeople: (queryClient: QueryClient) => {
    return queryClient.invalidateQueries({
      queryKey: queryKeys.people.all,
    });
  },

  // Prefetch common queries
  prefetchTrending: (queryClient: QueryClient) => {
    return Promise.all([
      queryClient.prefetchQuery({
        queryKey: queryKeys.movies.trending(),
        staleTime: 10 * 60 * 1000, // 10 minutes
      }),
      queryClient.prefetchQuery({
        queryKey: queryKeys.tv.trending(),
        staleTime: 10 * 60 * 1000, // 10 minutes
      }),
    ]);
  },

  // Remove specific queries from cache
  removeMovieQueries: (queryClient: QueryClient, movieId: number) => {
    return queryClient.removeQueries({
      queryKey: queryKeys.movies.detail(movieId),
    });
  },

  removeTVQueries: (queryClient: QueryClient, tvId: number) => {
    return queryClient.removeQueries({
      queryKey: queryKeys.tv.detail(tvId),
    });
  },

  // Set query data manually (for optimistic updates)
  setMovieData: (
    queryClient: QueryClient,
    movieId: number,
    data: any
  ) => {
    return queryClient.setQueryData(queryKeys.movies.detail(movieId), data);
  },

  setTVData: (queryClient: QueryClient, tvId: number, data: any) => {
    return queryClient.setQueryData(queryKeys.tv.detail(tvId), data);
  },
};
