import { apiClient } from '../enhanced-api-client';
import { 
  Movie, 
  MovieDetails, 
  PaginatedResponse, 
  Credits,
  TMDBResponse 
} from '@/types';

// Movie service class with improved error handling and caching
export class MovieService {
  private static readonly ENDPOINTS = {
    TRENDING: '/trending/movie/week',
    POPULAR: '/movie/popular',
    TOP_RATED: '/movie/top_rated',
    NOW_PLAYING: '/movie/now_playing',
    UPCOMING: '/movie/upcoming',
    LATEST: '/movie/latest',
    DETAILS: (id: number) => `/movie/${id}`,
    CREDITS: (id: number) => `/movie/${id}/credits`,
    SIMILAR: (id: number) => `/movie/${id}/similar`,
    RECOMMENDATIONS: (id: number) => `/movie/${id}/recommendations`,
    IMAGES: (id: number) => `/movie/${id}/images`,
    VIDEOS: (id: number) => `/movie/${id}/videos`,
    REVIEWS: (id: number) => `/movie/${id}/reviews`,
    SEARCH: '/search/movie',
  } as const;

  private static readonly CACHE_TTL = {
    SHORT: 5 * 60 * 1000,      // 5 minutes
    MEDIUM: 30 * 60 * 1000,    // 30 minutes
    LONG: 24 * 60 * 60 * 1000, // 24 hours
  } as const;

  /**
   * Get trending movies for the week
   */
  static async getTrending(page: number = 1): Promise<TMDBResponse<PaginatedResponse<Movie>>> {
    return apiClient.getTMDB<PaginatedResponse<Movie>>(
      this.ENDPOINTS.TRENDING,
      { page },
      { useCache: true, cacheTtl: this.CACHE_TTL.SHORT }
    );
  }

  /**
   * Get popular movies
   */
  static async getPopular(page: number = 1): Promise<TMDBResponse<PaginatedResponse<Movie>>> {
    return apiClient.getTMDB<PaginatedResponse<Movie>>(
      this.ENDPOINTS.POPULAR,
      { page },
      { useCache: true, cacheTtl: this.CACHE_TTL.MEDIUM }
    );
  }

  /**
   * Get top rated movies
   */
  static async getTopRated(page: number = 1): Promise<TMDBResponse<PaginatedResponse<Movie>>> {
    return apiClient.getTMDB<PaginatedResponse<Movie>>(
      this.ENDPOINTS.TOP_RATED,
      { page },
      { useCache: true, cacheTtl: this.CACHE_TTL.LONG }
    );
  }

  /**
   * Get now playing movies
   */
  static async getNowPlaying(page: number = 1): Promise<TMDBResponse<PaginatedResponse<Movie>>> {
    return apiClient.getTMDB<PaginatedResponse<Movie>>(
      this.ENDPOINTS.NOW_PLAYING,
      { page },
      { useCache: true, cacheTtl: this.CACHE_TTL.SHORT }
    );
  }

  /**
   * Get upcoming movies
   */
  static async getUpcoming(page: number = 1): Promise<TMDBResponse<PaginatedResponse<Movie>>> {
    return apiClient.getTMDB<PaginatedResponse<Movie>>(
      this.ENDPOINTS.UPCOMING,
      { page },
      { useCache: true, cacheTtl: this.CACHE_TTL.MEDIUM }
    );
  }

  /**
   * Get latest movie
   */
  static async getLatest(): Promise<TMDBResponse<Movie>> {
    return apiClient.getTMDB<Movie>(
      this.ENDPOINTS.LATEST,
      {},
      { useCache: true, cacheTtl: this.CACHE_TTL.SHORT }
    );
  }

  /**
   * Get movie details by ID
   */
  static async getDetails(
    movieId: number,
    appendToResponse?: string[]
  ): Promise<TMDBResponse<MovieDetails>> {
    const params: Record<string, any> = {};
    
    if (appendToResponse && appendToResponse.length > 0) {
      params.append_to_response = appendToResponse.join(',');
    }

    return apiClient.getTMDB<MovieDetails>(
      this.ENDPOINTS.DETAILS(movieId),
      params,
      { useCache: true, cacheTtl: this.CACHE_TTL.LONG }
    );
  }

  /**
   * Get movie credits (cast and crew)
   */
  static async getCredits(movieId: number): Promise<TMDBResponse<Credits>> {
    return apiClient.getTMDB<Credits>(
      this.ENDPOINTS.CREDITS(movieId),
      {},
      { useCache: true, cacheTtl: this.CACHE_TTL.LONG }
    );
  }

  /**
   * Get similar movies
   */
  static async getSimilar(
    movieId: number,
    page: number = 1
  ): Promise<TMDBResponse<PaginatedResponse<Movie>>> {
    return apiClient.getTMDB<PaginatedResponse<Movie>>(
      this.ENDPOINTS.SIMILAR(movieId),
      { page },
      { useCache: true, cacheTtl: this.CACHE_TTL.MEDIUM }
    );
  }

  /**
   * Get movie recommendations
   */
  static async getRecommendations(
    movieId: number,
    page: number = 1
  ): Promise<TMDBResponse<PaginatedResponse<Movie>>> {
    return apiClient.getTMDB<PaginatedResponse<Movie>>(
      this.ENDPOINTS.RECOMMENDATIONS(movieId),
      { page },
      { useCache: true, cacheTtl: this.CACHE_TTL.MEDIUM }
    );
  }

  /**
   * Get movie images
   */
  static async getImages(movieId: number): Promise<TMDBResponse<any>> {
    return apiClient.getTMDB<any>(
      this.ENDPOINTS.IMAGES(movieId),
      {},
      { useCache: true, cacheTtl: this.CACHE_TTL.LONG }
    );
  }

  /**
   * Get movie videos
   */
  static async getVideos(movieId: number): Promise<TMDBResponse<any>> {
    return apiClient.getTMDB<any>(
      this.ENDPOINTS.VIDEOS(movieId),
      {},
      { useCache: true, cacheTtl: this.CACHE_TTL.MEDIUM }
    );
  }

  /**
   * Get movie reviews
   */
  static async getReviews(
    movieId: number,
    page: number = 1
  ): Promise<TMDBResponse<any>> {
    return apiClient.getTMDB<any>(
      this.ENDPOINTS.REVIEWS(movieId),
      { page },
      { useCache: true, cacheTtl: this.CACHE_TTL.MEDIUM }
    );
  }

  /**
   * Search movies
   */
  static async search(
    query: string,
    page: number = 1,
    options?: {
      includeAdult?: boolean;
      region?: string;
      year?: number;
      primaryReleaseYear?: number;
    }
  ): Promise<TMDBResponse<PaginatedResponse<Movie>>> {
    const params: Record<string, any> = {
      query,
      page,
      include_adult: options?.includeAdult || false,
    };

    if (options?.region) params.region = options.region;
    if (options?.year) params.year = options.year;
    if (options?.primaryReleaseYear) params.primary_release_year = options.primaryReleaseYear;

    return apiClient.getTMDB<PaginatedResponse<Movie>>(
      this.ENDPOINTS.SEARCH,
      params,
      { useCache: true, cacheTtl: this.CACHE_TTL.SHORT }
    );
  }

  /**
   * Discover movies with filters
   */
  static async discover(options?: {
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
  }): Promise<TMDBResponse<PaginatedResponse<Movie>>> {
    const params: Record<string, any> = {
      page: options?.page || 1,
      sort_by: options?.sortBy || 'popularity.desc',
    };

    if (options?.genreIds?.length) {
      params.with_genres = options.genreIds.join(',');
    }
    if (options?.year) params.year = options.year;
    if (options?.releaseDateGte) params['release_date.gte'] = options.releaseDateGte;
    if (options?.releaseDateLte) params['release_date.lte'] = options.releaseDateLte;
    if (options?.voteAverageGte) params['vote_average.gte'] = options.voteAverageGte;
    if (options?.voteAverageLte) params['vote_average.lte'] = options.voteAverageLte;
    if (options?.withCast?.length) params.with_cast = options.withCast.join(',');
    if (options?.withCrew?.length) params.with_crew = options.withCrew.join(',');
    if (options?.withCompanies?.length) params.with_companies = options.withCompanies.join(',');
    if (options?.withKeywords?.length) params.with_keywords = options.withKeywords.join(',');
    if (options?.withoutGenres?.length) params.without_genres = options.withoutGenres.join(',');
    if (options?.withRuntimeGte) params['with_runtime.gte'] = options.withRuntimeGte;
    if (options?.withRuntimeLte) params['with_runtime.lte'] = options.withRuntimeLte;

    return apiClient.getTMDB<PaginatedResponse<Movie>>(
      '/discover/movie',
      params,
      { useCache: true, cacheTtl: this.CACHE_TTL.MEDIUM }
    );
  }
}

// Export legacy functions for backward compatibility
export const getMovieTrending = MovieService.getTrending;
export const getMoviePopular = MovieService.getPopular;
export const getMovieTopRated = MovieService.getTopRated;
export const getMovieNowPlaying = MovieService.getNowPlaying;
export const getMovieUpcoming = MovieService.getUpcoming;
export const getMovieLatest = MovieService.getLatest;
export const getMovieDetails = MovieService.getDetails;
export const getMovieCredits = MovieService.getCredits;
export const getMovieSimilar = MovieService.getSimilar;
export const getMovieImages = MovieService.getImages;
export const getMovieVideos = MovieService.getVideos;
export const searchMovies = MovieService.search;
