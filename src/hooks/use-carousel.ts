"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SwiperRef } from "swiper/react";

// Carousel configuration interface
interface CarouselConfig {
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
  keyboard?: boolean;
  mousewheel?: boolean;
  touchRatio?: number;
  resistance?: boolean;
  resistanceRatio?: number;
}

// Carousel state interface
interface CarouselState {
  activeIndex: number;
  isBeginning: boolean;
  isEnd: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  slidesCount: number;
}

// Carousel controls interface
interface CarouselControls {
  goToSlide: (index: number) => void;
  goToNext: () => void;
  goToPrev: () => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  reset: () => void;
}

// Main hook return type
interface UseCarouselReturn {
  swiperRef: React.RefObject<SwiperRef>;
  state: CarouselState;
  controls: CarouselControls;
  handlers: {
    onSlideChange: (swiper: any) => void;
    onReachBeginning: (swiper: any) => void;
    onReachEnd: (swiper: any) => void;
    onAutoplayStart: () => void;
    onAutoplayStop: () => void;
    onAutoplayPause: () => void;
    onAutoplayResume: () => void;
  };
}

// Default configuration
const DEFAULT_CONFIG: Required<CarouselConfig> = {
  autoplay: true,
  autoplayDelay: 5000,
  loop: true,
  pauseOnHover: true,
  pauseOnFocus: true,
  keyboard: true,
  mousewheel: false,
  touchRatio: 1,
  resistance: true,
  resistanceRatio: 0.85,
};

/**
 * Custom hook for carousel functionality with accessibility and performance optimizations
 */
export function useCarousel(
  slidesCount: number,
  config: CarouselConfig = {},
  onSlideChange?: (index: number) => void
): UseCarouselReturn {
  const swiperRef = useRef<SwiperRef>(null);
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  // Carousel state
  const [state, setState] = useState<CarouselState>({
    activeIndex: 0,
    isBeginning: true,
    isEnd: false,
    isPlaying: mergedConfig.autoplay,
    isPaused: false,
    slidesCount,
  });

  // Update slides count when it changes
  useEffect(() => {
    setState(prev => ({ ...prev, slidesCount }));
  }, [slidesCount]);

  // Autoplay management
  const startAutoplay = useCallback(() => {
    if (!mergedConfig.autoplay || state.isPaused) return;

    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
    }

    autoplayTimeoutRef.current = setTimeout(() => {
      if (swiperRef.current?.swiper) {
        swiperRef.current.swiper.slideNext();
      }
    }, mergedConfig.autoplayDelay);
  }, [mergedConfig.autoplay, mergedConfig.autoplayDelay, state.isPaused]);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }
  }, []);

  // Navigation controls
  const goToSlide = useCallback((index: number) => {
    if (swiperRef.current?.swiper && index >= 0 && index < slidesCount) {
      swiperRef.current.swiper.slideTo(index);
    }
  }, [slidesCount]);

  const goToNext = useCallback(() => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  }, []);

  const goToPrev = useCallback(() => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  }, []);

  // Playback controls
  const play = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: true, isPaused: false }));
    startAutoplay();
  }, [startAutoplay]);

  const pause = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: false, isPaused: true }));
    stopAutoplay();
  }, [stopAutoplay]);

  const toggle = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const reset = useCallback(() => {
    goToSlide(0);
    if (mergedConfig.autoplay) {
      play();
    }
  }, [goToSlide, mergedConfig.autoplay, play]);

  // Event handlers
  const handleSlideChange = useCallback((swiper: any) => {
    const newIndex = swiper.activeIndex;
    const realIndex = swiper.realIndex ?? newIndex;
    
    setState(prev => ({
      ...prev,
      activeIndex: realIndex,
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
    }));

    onSlideChange?.(realIndex);
    
    // Restart autoplay after manual navigation
    if (mergedConfig.autoplay && state.isPlaying) {
      startAutoplay();
    }
  }, [onSlideChange, mergedConfig.autoplay, state.isPlaying, startAutoplay]);

  const handleReachBeginning = useCallback((swiper: any) => {
    setState(prev => ({ ...prev, isBeginning: true }));
  }, []);

  const handleReachEnd = useCallback((swiper: any) => {
    setState(prev => ({ ...prev, isEnd: true }));
  }, []);

  const handleAutoplayStart = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: true, isPaused: false }));
  }, []);

  const handleAutoplayStop = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const handleAutoplayPause = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: true }));
  }, []);

  const handleAutoplayResume = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: false }));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!mergedConfig.keyboard) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          goToPrev();
          break;
        case "ArrowRight":
          event.preventDefault();
          goToNext();
          break;
        case " ":
          event.preventDefault();
          toggle();
          break;
        case "Home":
          event.preventDefault();
          goToSlide(0);
          break;
        case "End":
          event.preventDefault();
          goToSlide(slidesCount - 1);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mergedConfig.keyboard, goToPrev, goToNext, toggle, goToSlide, slidesCount]);

  // Pause on hover/focus
  useEffect(() => {
    if (!mergedConfig.pauseOnHover && !mergedConfig.pauseOnFocus) return;

    const carousel = swiperRef.current?.swiper?.el;
    if (!carousel) return;

    const handleMouseEnter = () => {
      if (mergedConfig.pauseOnHover && state.isPlaying) {
        pause();
      }
    };

    const handleMouseLeave = () => {
      if (mergedConfig.pauseOnHover && !state.isPaused) {
        play();
      }
    };

    const handleFocus = () => {
      if (mergedConfig.pauseOnFocus && state.isPlaying) {
        pause();
      }
    };

    const handleBlur = () => {
      if (mergedConfig.pauseOnFocus && !state.isPaused) {
        play();
      }
    };

    if (mergedConfig.pauseOnHover) {
      carousel.addEventListener("mouseenter", handleMouseEnter);
      carousel.addEventListener("mouseleave", handleMouseLeave);
    }

    if (mergedConfig.pauseOnFocus) {
      carousel.addEventListener("focus", handleFocus);
      carousel.addEventListener("blur", handleBlur);
    }

    return () => {
      if (mergedConfig.pauseOnHover) {
        carousel.removeEventListener("mouseenter", handleMouseEnter);
        carousel.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (mergedConfig.pauseOnFocus) {
        carousel.removeEventListener("focus", handleFocus);
        carousel.removeEventListener("blur", handleBlur);
      }
    };
  }, [
    mergedConfig.pauseOnHover,
    mergedConfig.pauseOnFocus,
    state.isPlaying,
    state.isPaused,
    pause,
    play,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAutoplay();
    };
  }, [stopAutoplay]);

  // Start autoplay on mount
  useEffect(() => {
    if (mergedConfig.autoplay) {
      startAutoplay();
    }
  }, [mergedConfig.autoplay, startAutoplay]);

  return {
    swiperRef,
    state,
    controls: {
      goToSlide,
      goToNext,
      goToPrev,
      play,
      pause,
      toggle,
      reset,
    },
    handlers: {
      onSlideChange: handleSlideChange,
      onReachBeginning: handleReachBeginning,
      onReachEnd: handleReachEnd,
      onAutoplayStart: handleAutoplayStart,
      onAutoplayStop: handleAutoplayStop,
      onAutoplayPause: handleAutoplayPause,
      onAutoplayResume: handleAutoplayResume,
    },
  };
}

// Hook for carousel accessibility
export function useCarouselA11y(
  activeIndex: number,
  slidesCount: number,
  isPlaying: boolean
) {
  const announceSlideChange = useCallback((index: number, total: number) => {
    const message = `Slide ${index + 1} of ${total}`;
    
    // Create or update live region for screen readers
    let liveRegion = document.getElementById("carousel-live-region");
    if (!liveRegion) {
      liveRegion = document.createElement("div");
      liveRegion.id = "carousel-live-region";
      liveRegion.setAttribute("aria-live", "polite");
      liveRegion.setAttribute("aria-atomic", "true");
      liveRegion.className = "sr-only";
      document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = message;
  }, []);

  useEffect(() => {
    announceSlideChange(activeIndex, slidesCount);
  }, [activeIndex, slidesCount, announceSlideChange]);

  const getAriaLabel = useCallback(() => {
    return `Carousel with ${slidesCount} slides. Currently showing slide ${activeIndex + 1}. ${
      isPlaying ? "Autoplay is active" : "Autoplay is paused"
    }. Use arrow keys to navigate.`;
  }, [activeIndex, slidesCount, isPlaying]);

  return {
    getAriaLabel,
    announceSlideChange,
  };
}
