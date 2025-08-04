// Responsive utility classes and constants

export const RESPONSIVE_BREAKPOINTS = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
} as const;

// Common responsive class patterns
export const RESPONSIVE_CLASSES = {
  // Container margins
  containerMargin: 'mx-4 xs:mx-6 sm:mx-8 md:mx-12 lg:mx-16',
  
  // Container padding
  containerPadding: 'px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16',
  
  // Vertical spacing
  sectionSpacing: 'my-8 sm:my-12 lg:my-16',
  elementSpacing: 'my-4 sm:my-6',
  
  // Grid layouts for movie cards
  movieGrid: 'grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 3xl:grid-cols-9',
  
  // Gap spacing
  gridGap: 'gap-2 xs:gap-3 sm:gap-4',
  
  // Text sizes
  headingLarge: 'text-xl xs:text-2xl sm:text-3xl lg:text-4xl',
  headingMedium: 'text-lg xs:text-xl sm:text-2xl',
  headingSmall: 'text-base xs:text-lg sm:text-xl',
  bodyText: 'text-sm sm:text-base',
  smallText: 'text-xs sm:text-sm',
  
  // Button sizes
  buttonLarge: 'px-6 py-5 sm:px-8 sm:py-7',
  buttonMedium: 'px-4 py-3 sm:px-6 sm:py-4',
  buttonSmall: 'px-3 py-2 sm:px-4 sm:py-3',
  
  // Flex layouts
  flexColumn: 'flex flex-col',
  flexRow: 'flex flex-row',
  flexResponsive: 'flex flex-col lg:flex-row',
  
  // Image sizing
  imageResponsive: 'w-full h-auto object-cover',
  
  // Card sizing for movie cards
  movieCardSize: 'w-full h-[280px] xs:w-[160px] xs:h-[240px] sm:w-[180px] sm:h-[270px] md:w-[200px] md:h-[300px] lg:w-[216px] lg:h-[320px] xl:w-[220px] xl:h-[330px] 3xl:w-[227px] 3xl:h-[337px]',
} as const;

// Utility function to combine responsive classes
export const combineResponsiveClasses = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Utility function to get responsive text size based on screen size
export const getResponsiveTextSize = (size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'): string => {
  const sizeMap = {
    xs: 'text-xs sm:text-sm',
    sm: 'text-sm sm:text-base',
    base: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl',
    '2xl': 'text-xl sm:text-2xl lg:text-3xl',
    '3xl': 'text-2xl sm:text-3xl lg:text-4xl',
    '4xl': 'text-3xl sm:text-4xl lg:text-5xl',
  };
  
  return sizeMap[size] || sizeMap.base;
};

// Utility function to get responsive spacing
export const getResponsiveSpacing = (type: 'margin' | 'padding', size: 'sm' | 'md' | 'lg'): string => {
  const prefix = type === 'margin' ? 'm' : 'p';
  
  const sizeMap = {
    sm: `${prefix}-2 sm:${prefix}-3 lg:${prefix}-4`,
    md: `${prefix}-4 sm:${prefix}-6 lg:${prefix}-8`,
    lg: `${prefix}-6 sm:${prefix}-8 lg:${prefix}-12`,
  };
  
  return sizeMap[size] || sizeMap.md;
};

// Mobile-first media query helpers for use in JavaScript
export const MEDIA_QUERIES = {
  xs: `(min-width: ${RESPONSIVE_BREAKPOINTS.xs})`,
  sm: `(min-width: ${RESPONSIVE_BREAKPOINTS.sm})`,
  md: `(min-width: ${RESPONSIVE_BREAKPOINTS.md})`,
  lg: `(min-width: ${RESPONSIVE_BREAKPOINTS.lg})`,
  xl: `(min-width: ${RESPONSIVE_BREAKPOINTS.xl})`,
  '2xl': `(min-width: ${RESPONSIVE_BREAKPOINTS['2xl']})`,
  '3xl': `(min-width: ${RESPONSIVE_BREAKPOINTS['3xl']})`,
} as const;

// Hook for checking screen size (if needed in components)
export const useResponsive = () => {
  if (typeof window === 'undefined') return { isMobile: false, isTablet: false, isDesktop: true };
  
  const isMobile = window.innerWidth < parseInt(RESPONSIVE_BREAKPOINTS.md);
  const isTablet = window.innerWidth >= parseInt(RESPONSIVE_BREAKPOINTS.md) && window.innerWidth < parseInt(RESPONSIVE_BREAKPOINTS.lg);
  const isDesktop = window.innerWidth >= parseInt(RESPONSIVE_BREAKPOINTS.lg);
  
  return { isMobile, isTablet, isDesktop };
};
