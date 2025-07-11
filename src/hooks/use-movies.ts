import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MovieService } from "@/apis/services/movie-service";
import { queryKeys } from "@/providers/query-provider";
import { Movie, MovieDetails, PaginatedResponse, Credits } from "@/types";

// Hook for trending movies
export function useTrendingMovies(timeWindow: "day" | "week" = "week") {
  return useQuery({
    queryKey: queryKeys.movies.trending(timeWindow),
    queryFn: () => MovieService.getTrending(1),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Hook for popular movies
export function usePopularMovies(page: number = 1) {
  return useQuery({
    queryKey: queryKeys.movies.popular(page),
    queryFn: () => MovieService.getPopular(page),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}

// Hook for top rated movies
export function useTopRatedMovies(page: number = 1) {
  return useQuery({
    queryKey: queryKeys.movies.topRated(page),
    queryFn: () => MovieService.getTopRated(page),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

// Hook for now playing movies
export function useNowPlayingMovies(page: number = 1) {
  return useQuery({
    queryKey: queryKeys.movies.nowPlaying(page),
    queryFn: () => MovieService.getNowPlaying(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Hook for upcoming movies
export function useUpcomingMovies(page: number = 1) {
  return useQuery({
    queryKey: queryKeys.movies.upcoming(page),
    queryFn: () => MovieService.getUpcoming(page),
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
  });
}

// Hook for movie details
export function useMovieDetails(
  movieId: number,
  appendToResponse?: string[],
  enabled: boolean = true
) {
  return useQuery({
    queryKey: queryKeys.movies.detail(movieId),
    queryFn: () => MovieService.getDetails(movieId, appendToResponse),
    enabled: enabled && !!movieId,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
  });
}

// Hook for movie credits
export function useMovieCredits(movieId: number, enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.movies.credits(movieId),
    queryFn: () => MovieService.getCredits(movieId),
    enabled: enabled && !!movieId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

// Hook for similar movies
export function useSimilarMovies(
  movieId: number,
  page: number = 1,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: queryKeys.movies.similar(movieId, page),
    queryFn: () => MovieService.getSimilar(movieId, page),
    enabled: enabled && !!movieId,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
  });
}

// Hook for movie recommendations
export function useMovieRecommendations(
  movieId: number,
  page: number = 1,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: queryKeys.movies.recommendations(movieId, page),
    queryFn: () => MovieService.getRecommendations(movieId, page),
    enabled: enabled && !!movieId,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
  });
}

// Hook for movie images
export function useMovieImages(movieId: number, enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.movies.images(movieId),
    queryFn: () => MovieService.getImages(movieId),
    enabled: enabled && !!movieId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

// Hook for movie videos
export function useMovieVideos(movieId: number, enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.movies.videos(movieId),
    queryFn: () => MovieService.getVideos(movieId),
    enabled: enabled && !!movieId,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
  });
}

// Hook for movie reviews
export function useMovieReviews(
  movieId: number,
  page: number = 1,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: queryKeys.movies.reviews(movieId, page),
    queryFn: () => MovieService.getReviews(movieId, page),
    enabled: enabled && !!movieId,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
  });
}

// Hook for movie search
export function useMovieSearch(
  query: string,
  page: number = 1,
  options?: {
    includeAdult?: boolean;
    region?: string;
    year?: number;
    primaryReleaseYear?: number;
  },
  enabled: boolean = true
) {
  return useQuery({
    queryKey: queryKeys.movies.search(query, page),
    queryFn: () => MovieService.search(query, page, options),
    enabled: enabled && !!query.trim(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Hook for movie discovery
export function useMovieDiscover(
  filters: {
    page?: number;
    sortBy?: string;
    genreIds?: number[];
    year?: number;
    releaseDateGte?: string;
    releaseDateLte?: string;
    voteAverageGte?: number;
    voteAverageLte?: number;
    withCast?: number[];
    withCrew?: number[];
    withCompanies?: number[];
    withKeywords?: number[];
    withoutGenres?: number[];
    withRuntimeGte?: number;
    withRuntimeLte?: number;
  } = {},
  enabled: boolean = true
) {
  return useQuery({
    queryKey: queryKeys.movies.discover(filters),
    queryFn: () => MovieService.discover(filters),
    enabled,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}

// Hook for infinite scroll movies
export function useInfiniteMovies(
  queryType: "popular" | "top_rated" | "now_playing" | "upcoming",
  enabled: boolean = true
) {
  const queryFn = {
    popular: MovieService.getPopular,
    top_rated: MovieService.getTopRated,
    now_playing: MovieService.getNowPlaying,
    upcoming: MovieService.getUpcoming,
  }[queryType];

  return useQuery({
    queryKey: queryKeys.movies.list({ type: queryType }),
    queryFn: () => queryFn(1),
    enabled,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}

// Mutation hooks for optimistic updates
export function useMovieActions() {
  const queryClient = useQueryClient();

  // Mutation for adding to watchlist (optimistic update)
  const addToWatchlist = useMutation({
    mutationFn: async (movieId: number) => {
      // This would be an API call to add to watchlist
      // For now, we'll simulate it
      await new Promise(resolve => setTimeout(resolve, 500));
      return movieId;
    },
    onMutate: async (movieId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.movies.detail(movieId) });

      // Snapshot the previous value
      const previousMovie = queryClient.getQueryData(queryKeys.movies.detail(movieId));

      // Optimistically update to the new value
      queryClient.setQueryData(queryKeys.movies.detail(movieId), (old: any) => {
        if (old) {
          return {
            ...old,
            response: {
              ...old.response,
              inWatchlist: true,
            },
          };
        }
        return old;
      });

      // Return a context object with the snapshotted value
      return { previousMovie };
    },
    onError: (err, movieId, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousMovie) {
        queryClient.setQueryData(queryKeys.movies.detail(movieId), context.previousMovie);
      }
    },
    onSettled: (movieId) => {
      // Always refetch after error or success
      if (movieId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.movies.detail(movieId) });
      }
    },
  });

  // Mutation for rating a movie
  const rateMovie = useMutation({
    mutationFn: async ({ movieId, rating }: { movieId: number; rating: number }) => {
      // This would be an API call to rate the movie
      await new Promise(resolve => setTimeout(resolve, 500));
      return { movieId, rating };
    },
    onMutate: async ({ movieId, rating }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.movies.detail(movieId) });

      const previousMovie = queryClient.getQueryData(queryKeys.movies.detail(movieId));

      queryClient.setQueryData(queryKeys.movies.detail(movieId), (old: any) => {
        if (old) {
          return {
            ...old,
            response: {
              ...old.response,
              userRating: rating,
            },
          };
        }
        return old;
      });

      return { previousMovie };
    },
    onError: (err, { movieId }, context) => {
      if (context?.previousMovie) {
        queryClient.setQueryData(queryKeys.movies.detail(movieId), context.previousMovie);
      }
    },
    onSettled: ({ movieId }) => {
      if (movieId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.movies.detail(movieId) });
      }
    },
  });

  return {
    addToWatchlist,
    rateMovie,
  };
}

// Hook for prefetching movie data
export function usePrefetchMovie() {
  const queryClient = useQueryClient();

  const prefetchMovie = (movieId: number) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.movies.detail(movieId),
      queryFn: () => MovieService.getDetails(movieId),
      staleTime: 30 * 60 * 1000, // 30 minutes
    });
  };

  const prefetchMovieCredits = (movieId: number) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.movies.credits(movieId),
      queryFn: () => MovieService.getCredits(movieId),
      staleTime: 60 * 60 * 1000, // 1 hour
    });
  };

  const prefetchSimilarMovies = (movieId: number) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.movies.similar(movieId, 1),
      queryFn: () => MovieService.getSimilar(movieId, 1),
      staleTime: 30 * 60 * 1000, // 30 minutes
    });
  };

  return {
    prefetchMovie,
    prefetchMovieCredits,
    prefetchSimilarMovies,
  };
}
