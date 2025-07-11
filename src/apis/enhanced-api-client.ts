import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse, ApiError, CacheEntry, Result } from '@/types';

// Cache configuration
interface CacheConfig {
  ttl: number; // Time to live in milliseconds
  maxSize: number; // Maximum number of entries
}

// API Client configuration
interface ApiClientConfig {
  baseURL: string;
  timeout: number;
  retries: number;
  retryDelay: number;
  cache: CacheConfig;
  headers?: Record<string, string>;
}

// Default configuration
const DEFAULT_CONFIG: ApiClientConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.themoviedb.org/3',
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
  cache: {
    ttl: 5 * 60 * 1000, // 5 minutes
    maxSize: 100,
  },
  headers: {
    'Authorization': `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
};

class EnhancedApiClient {
  private client: AxiosInstance;
  private cache: Map<string, CacheEntry<any>>;
  private config: ApiClientConfig;

  constructor(config: Partial<ApiClientConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.cache = new Map();
    
    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: this.config.headers,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add timestamp to requests for debugging
        config.metadata = { startTime: Date.now() };
        
        // Log requests in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        }
        
        return config;
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(this.createApiError(error));
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        const duration = Date.now() - response.config.metadata?.startTime;
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`✅ API Response: ${response.config.url} (${duration}ms)`);
        }
        
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        
        // Retry logic
        if (this.shouldRetry(error) && !originalRequest._retry) {
          originalRequest._retry = true;
          originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
          
          if (originalRequest._retryCount <= this.config.retries) {
            await this.delay(this.config.retryDelay * originalRequest._retryCount);
            return this.client(originalRequest);
          }
        }
        
        console.error('❌ API Error:', error.response?.data || error.message);
        return Promise.reject(this.createApiError(error));
      }
    );
  }

  private shouldRetry(error: any): boolean {
    return (
      error.code === 'NETWORK_ERROR' ||
      error.code === 'TIMEOUT' ||
      (error.response && error.response.status >= 500)
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private createApiError(error: any): ApiError {
    return {
      message: error.response?.data?.message || error.message || 'An error occurred',
      status: error.response?.status || 0,
      code: error.code || 'UNKNOWN_ERROR',
    };
  }

  private getCacheKey(url: string, params?: any): string {
    const paramString = params ? JSON.stringify(params) : '';
    return `${url}${paramString}`;
  }

  private getFromCache<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    // Check if cache entry is expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  private setCache<T>(key: string, data: T, ttl?: number): void {
    // Remove oldest entries if cache is full
    if (this.cache.size >= this.config.cache.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.config.cache.ttl,
    });
  }

  public clearCache(): void {
    this.cache.clear();
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig & { useCache?: boolean; cacheTtl?: number }
  ): Promise<Result<T, ApiError>> {
    try {
      const cacheKey = this.getCacheKey(url, config?.params);
      
      // Check cache first
      if (config?.useCache !== false) {
        const cachedData = this.getFromCache<T>(cacheKey);
        if (cachedData) {
          return { success: true, data: cachedData };
        }
      }
      
      const response: AxiosResponse<T> = await this.client.get(url, config);
      
      // Cache the response
      if (config?.useCache !== false) {
        this.setCache(cacheKey, response.data, config?.cacheTtl);
      }
      
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error as ApiError };
    }
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<Result<T, ApiError>> {
    try {
      const response: AxiosResponse<T> = await this.client.post(url, data, config);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error as ApiError };
    }
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<Result<T, ApiError>> {
    try {
      const response: AxiosResponse<T> = await this.client.put(url, data, config);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error as ApiError };
    }
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<Result<T, ApiError>> {
    try {
      const response: AxiosResponse<T> = await this.client.delete(url, config);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error as ApiError };
    }
  }

  // Utility method for handling TMDB API responses
  public async getTMDB<T>(
    endpoint: string,
    params?: Record<string, any>,
    options?: { useCache?: boolean; cacheTtl?: number }
  ): Promise<{ response: T; errors: string | null }> {
    const result = await this.get<T>(endpoint, {
      params,
      useCache: options?.useCache,
      cacheTtl: options?.cacheTtl,
    });

    if (result.success) {
      return { response: result.data, errors: null };
    } else {
      return { response: {} as T, errors: result.error.message };
    }
  }

  // Health check method
  public async healthCheck(): Promise<boolean> {
    try {
      const result = await this.get('/configuration', { useCache: false });
      return result.success;
    } catch {
      return false;
    }
  }

  // Get cache statistics
  public getCacheStats(): { size: number; maxSize: number; hitRate?: number } {
    return {
      size: this.cache.size,
      maxSize: this.config.cache.maxSize,
    };
  }
}

// Create and export a singleton instance
export const apiClient = new EnhancedApiClient();

// Export the class for custom instances
export { EnhancedApiClient };

// Export types
export type { ApiClientConfig, CacheConfig };
