// Utility Types for better type safety and reusability

// Make all properties optional
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Make all properties required
export type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Pick specific properties from a type
export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Omit specific properties from a type
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Extract non-nullable types
export type NonNullable<T> = T extends null | undefined ? never : T;

// Create a type with some properties optional
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Create a type with some properties required
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// Deep partial type
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Deep readonly type
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Array element type
export type ArrayElement<ArrayType extends readonly unknown[]> = 
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

// Function parameter types
export type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

// Function return type
export type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

// Promise type extraction
export type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

// Key-value pair type
export type KeyValuePair<K extends string | number | symbol = string, V = any> = {
  [key in K]: V;
};

// String literal union to object type
export type StringToObject<T extends string> = {
  [K in T]: K;
};

// Conditional types for better type inference
export type If<C extends boolean, T, F> = C extends true ? T : F;

// Tuple to union type
export type TupleToUnion<T extends readonly any[]> = T[number];

// Union to intersection type
export type UnionToIntersection<U> = 
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

// Brand types for better type safety
export type Brand<T, B> = T & { __brand: B };

// ID types
export type MovieId = Brand<number, 'MovieId'>;
export type TVSeriesId = Brand<number, 'TVSeriesId'>;
export type PersonId = Brand<number, 'PersonId'>;
export type GenreId = Brand<number, 'GenreId'>;

// URL types
export type ImageURL = Brand<string, 'ImageURL'>;
export type VideoURL = Brand<string, 'VideoURL'>;
export type ExternalURL = Brand<string, 'ExternalURL'>;

// Date types
export type DateString = Brand<string, 'DateString'>; // YYYY-MM-DD format
export type DateTimeString = Brand<string, 'DateTimeString'>; // ISO 8601 format

// Rating types
export type Rating = Brand<number, 'Rating'>; // 0-10 scale
export type Percentage = Brand<number, 'Percentage'>; // 0-100 scale

// Language and country codes
export type LanguageCode = Brand<string, 'LanguageCode'>; // ISO 639-1
export type CountryCode = Brand<string, 'CountryCode'>; // ISO 3166-1

// Status types
export type MediaStatus = 
  | 'Rumored'
  | 'Planned'
  | 'In Production'
  | 'Post Production'
  | 'Released'
  | 'Canceled'
  | 'Returning Series'
  | 'Ended';

// Size types for responsive design
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

// Color types
export type ColorVariant = 
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

// Loading states
export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

// Sort directions
export type SortDirection = 'asc' | 'desc';

// HTTP methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// API endpoint types
export type APIEndpoint = Brand<string, 'APIEndpoint'>;

// Error types
export interface TypedError<T = any> extends Error {
  code?: string;
  data?: T;
  status?: number;
}

// Result type for error handling
export type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

// Option type for nullable values
export type Option<T> = T | null | undefined;

// Maybe type for functional programming
export type Maybe<T> = T | null;

// Either type for functional programming
export type Either<L, R> = 
  | { type: 'left'; value: L }
  | { type: 'right'; value: R };

// Validation result type
export type ValidationResult<T> = 
  | { valid: true; data: T }
  | { valid: false; errors: string[] };

// Async data state
export interface AsyncData<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastFetch: Date | null;
}

// Cache entry type
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// Event handler types
export type EventHandler<T = Event> = (event: T) => void;
export type AsyncEventHandler<T = Event> = (event: T) => Promise<void>;

// Component ref types
export type ComponentRef<T = HTMLElement> = React.RefObject<T>;

// Style types
export type CSSProperties = React.CSSProperties;
export type ClassName = string | undefined | null | false;

// Environment types
export type Environment = 'development' | 'production' | 'test';

// Feature flag types
export type FeatureFlag = Brand<string, 'FeatureFlag'>;

// Analytics event types
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: Date;
}

// Localization types
export type LocaleCode = Brand<string, 'LocaleCode'>;
export type TranslationKey = Brand<string, 'TranslationKey'>;

// Configuration types
export interface AppConfig {
  apiBaseUrl: string;
  imageBaseUrl: string;
  environment: Environment;
  features: Record<FeatureFlag, boolean>;
  analytics: {
    enabled: boolean;
    trackingId?: string;
  };
}

// Metadata types
export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: ImageURL;
  url?: ExternalURL;
}
