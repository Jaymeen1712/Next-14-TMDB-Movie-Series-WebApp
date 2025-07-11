import { ReactNode } from 'react';
import { MediaItem, MediaItemWithPerson, Cast } from './api';

// Common Component Props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Loading States
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

// Carousel Component Types
export interface CarouselProps extends LoadingState {
  commonDetails: MediaItemWithPerson[];
  setDashboardImage: (image: string) => void;
}

export interface CarouselImageProps {
  src: string;
  alt: string;
  type: string;
  detailId: number;
  width?: number;
  height?: number;
}

export interface CarouselDetailsProps {
  chips?: string[];
  title: string;
  rating: number;
  description: string;
  detailId: number;
  type: string;
}

// Movie Card Component Types
export interface MovieCardProps {
  data: MediaItemWithPerson;
  variant?: 'default' | 'compact' | 'detailed';
  showRating?: boolean;
  showOverview?: boolean;
}

// List Components
export interface MovieListProps extends LoadingState {
  data: MediaItemWithPerson[];
  title?: string;
  showPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export interface ListCarouselProps {
  data: MediaItemWithPerson[];
  title?: string;
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  navigation?: boolean;
  pagination?: boolean;
}

// Media Detail Components
export interface MediaShowContainerProps {
  data: any; // Will be typed more specifically later
  credits: Cast[];
}

export interface SimilarContainerProps {
  data: MediaItemWithPerson[];
  title?: string;
}

// Search Component Types
export interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
  isLoading?: boolean;
}

export interface SearchResultsProps extends LoadingState {
  results: MediaItemWithPerson[];
  query: string;
  totalResults?: number;
}

// Rating Component Types
export interface RatingProps {
  stop: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  variant?: 'stars' | 'circle' | 'bar';
}

// Header Component Types
export interface HeaderProps {
  transparent?: boolean;
  fixed?: boolean;
}

// Navigation Types
export interface NavigationItem {
  key: string;
  name: string;
  link: string;
  icon?: ReactNode;
}

// Player Component Types
export interface PlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoplay?: boolean;
  controls?: boolean;
}

// Pagination Types
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
}

// Filter Types
export interface FilterOption {
  label: string;
  value: string | number;
}

export interface FilterProps {
  options: FilterOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  multiple?: boolean;
}

// Sort Types
export interface SortOption {
  label: string;
  value: string;
  direction?: 'asc' | 'desc';
}

export interface SortProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
}

// Modal Types
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

// Toast/Notification Types
export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
}

// Form Types
export interface FormFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
}

// Theme Types
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    warning: string;
    success: string;
    info: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

// Responsive Types
export interface ResponsiveValue<T> {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}

// Animation Types
export interface AnimationProps {
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  whileHover?: any;
  whileTap?: any;
}
