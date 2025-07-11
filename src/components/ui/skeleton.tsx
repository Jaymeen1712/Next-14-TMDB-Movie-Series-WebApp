"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

// Base Skeleton Component
interface SkeletonProps {
  className?: string;
  variant?: "rectangular" | "circular" | "text" | "rounded";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
  children?: React.ReactNode;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = "rectangular",
  width,
  height,
  animation = "pulse",
  children,
}) => {
  const baseClasses = "bg-neutral-700 animate-pulse";
  
  const variantClasses = {
    rectangular: "rounded-md",
    circular: "rounded-full",
    text: "rounded-sm",
    rounded: "rounded-lg",
  };

  const animationVariants = {
    pulse: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    wave: {
      backgroundPosition: ["-200px 0", "calc(200px + 100%) 0"],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
      },
    },
    none: {},
  };

  const style: React.CSSProperties = {
    width: width || "100%",
    height: height || "1rem",
  };

  if (animation === "wave") {
    style.background = `linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)`;
    style.backgroundSize = "200px 100%";
  }

  return (
    <motion.div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={style}
      variants={animationVariants}
      animate={animation}
    >
      {children}
    </motion.div>
  );
};

// Card Skeleton Component
interface CardSkeletonProps {
  showImage?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  showRating?: boolean;
  showChips?: boolean;
  className?: string;
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({
  showImage = true,
  showTitle = true,
  showDescription = true,
  showRating = true,
  showChips = true,
  className,
}) => {
  return (
    <div className={cn("space-y-4 p-4", className)}>
      {showImage && (
        <Skeleton
          variant="rounded"
          height="200px"
          className="w-full"
        />
      )}
      
      {showChips && (
        <div className="flex space-x-2">
          <Skeleton width="60px" height="24px" variant="rounded" />
          <Skeleton width="80px" height="24px" variant="rounded" />
          <Skeleton width="50px" height="24px" variant="rounded" />
        </div>
      )}
      
      {showTitle && (
        <Skeleton
          variant="text"
          height="28px"
          width="80%"
        />
      )}
      
      {showRating && (
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton
                key={i}
                variant="circular"
                width="16px"
                height="16px"
              />
            ))}
          </div>
          <Skeleton width="40px" height="16px" />
        </div>
      )}
      
      {showDescription && (
        <div className="space-y-2">
          <Skeleton variant="text" height="16px" width="100%" />
          <Skeleton variant="text" height="16px" width="90%" />
          <Skeleton variant="text" height="16px" width="75%" />
        </div>
      )}
    </div>
  );
};

// Carousel Skeleton Component
const CarouselSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-12 items-center justify-center">
      <div className="col-span-11 my-16">
        <div className="grid grid-cols-2 items-center gap-14">
          {/* Image Skeleton */}
          <Skeleton
            variant="rounded"
            height="440px"
            className="w-full"
          />
          
          {/* Details Skeleton */}
          <div className="space-y-6">
            {/* Chips */}
            <div className="flex space-x-2">
              <Skeleton width="40px" height="28px" variant="rounded" />
              <Skeleton width="60px" height="28px" variant="rounded" />
              <Skeleton width="50px" height="28px" variant="rounded" />
            </div>
            
            {/* Title */}
            <Skeleton height="48px" width="85%" variant="text" />
            
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Skeleton
                    key={i}
                    variant="circular"
                    width="20px"
                    height="20px"
                  />
                ))}
              </div>
              <Skeleton width="40px" height="20px" />
            </div>
            
            {/* Description */}
            <div className="space-y-3">
              <Skeleton height="20px" width="100%" />
              <Skeleton height="20px" width="95%" />
              <Skeleton height="20px" width="80%" />
            </div>
            
            {/* Button */}
            <Skeleton
              width="192px"
              height="56px"
              variant="rounded"
              className="mt-8"
            />
          </div>
        </div>
      </div>
      
      {/* Navigation Skeleton */}
      <div className="flex flex-col items-center justify-center gap-6">
        <Skeleton variant="circular" width="56px" height="56px" />
        <Skeleton variant="circular" width="56px" height="56px" />
      </div>
    </div>
  );
};

// List Skeleton Component
interface ListSkeletonProps {
  count?: number;
  orientation?: "horizontal" | "vertical";
  showImage?: boolean;
  className?: string;
}

const ListSkeleton: React.FC<ListSkeletonProps> = ({
  count = 6,
  orientation = "horizontal",
  showImage = true,
  className,
}) => {
  const containerClasses = orientation === "horizontal" 
    ? "flex space-x-4 overflow-hidden" 
    : "grid grid-cols-1 gap-4";

  return (
    <div className={cn(containerClasses, className)}>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className={cn(
            "flex-shrink-0",
            orientation === "horizontal" ? "w-64" : "w-full"
          )}
        >
          <CardSkeleton
            showImage={showImage}
            showTitle={true}
            showDescription={orientation === "vertical"}
            showRating={true}
            showChips={false}
          />
        </div>
      ))}
    </div>
  );
};

// Table Skeleton Component
interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  className?: string;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 4,
  showHeader = true,
  className,
}) => {
  return (
    <div className={cn("w-full", className)}>
      {showHeader && (
        <div className="mb-4 grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {[...Array(columns)].map((_, index) => (
            <Skeleton key={index} height="24px" width="80%" />
          ))}
        </div>
      )}
      
      <div className="space-y-3">
        {[...Array(rows)].map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {[...Array(columns)].map((_, colIndex) => (
              <Skeleton key={colIndex} height="20px" width="90%" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Text Block Skeleton Component
interface TextSkeletonProps {
  lines?: number;
  className?: string;
}

const TextSkeleton: React.FC<TextSkeletonProps> = ({
  lines = 3,
  className,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {[...Array(lines)].map((_, index) => (
        <Skeleton
          key={index}
          height="16px"
          width={index === lines - 1 ? "75%" : "100%"}
          variant="text"
        />
      ))}
    </div>
  );
};

// Avatar Skeleton Component
interface AvatarSkeletonProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const AvatarSkeleton: React.FC<AvatarSkeletonProps> = ({
  size = "md",
  className,
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  return (
    <Skeleton
      variant="circular"
      className={cn(sizeClasses[size], className)}
    />
  );
};

export {
  Skeleton,
  CardSkeleton,
  CarouselSkeleton,
  ListSkeleton,
  TableSkeleton,
  TextSkeleton,
  AvatarSkeleton,
};

export type {
  SkeletonProps,
  CardSkeletonProps,
  ListSkeletonProps,
  TableSkeletonProps,
  TextSkeletonProps,
  AvatarSkeletonProps,
};
