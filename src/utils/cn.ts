import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with proper conflict resolution
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Conditional class utility
 * @param condition - Boolean condition
 * @param trueClasses - Classes to apply when condition is true
 * @param falseClasses - Classes to apply when condition is false
 * @returns Conditional classes
 */
export function conditionalClass(
  condition: boolean,
  trueClasses: string,
  falseClasses: string = ""
): string {
  return condition ? trueClasses : falseClasses;
}

/**
 * Variant class utility for component variants
 * @param variants - Object mapping variant names to classes
 * @param variant - Current variant
 * @param defaultVariant - Default variant to use if variant is not found
 * @returns Variant classes
 */
export function variantClass<T extends string>(
  variants: Record<T, string>,
  variant: T,
  defaultVariant?: T
): string {
  return variants[variant] || (defaultVariant ? variants[defaultVariant] : "");
}

/**
 * Size class utility for responsive sizing
 * @param sizes - Object mapping size names to classes
 * @param size - Current size
 * @param defaultSize - Default size to use if size is not found
 * @returns Size classes
 */
export function sizeClass<T extends string>(
  sizes: Record<T, string>,
  size: T,
  defaultSize?: T
): string {
  return sizes[size] || (defaultSize ? sizes[defaultSize] : "");
}

/**
 * Focus ring utility for accessibility
 * @param variant - Focus ring variant
 * @returns Focus ring classes
 */
export function focusRing(variant: "default" | "primary" | "error" = "default"): string {
  const variants = {
    default: "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    primary: "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
    error: "focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
  };
  
  return variants[variant];
}

/**
 * Transition utility for smooth animations
 * @param property - CSS property to transition
 * @param duration - Transition duration
 * @param easing - Transition easing function
 * @returns Transition classes
 */
export function transition(
  property: "all" | "colors" | "opacity" | "shadow" | "transform" = "all",
  duration: "75" | "100" | "150" | "200" | "300" | "500" | "700" | "1000" = "150",
  easing: "linear" | "in" | "out" | "in-out" = "in-out"
): string {
  return `transition-${property} duration-${duration} ease-${easing}`;
}

/**
 * Shadow utility for consistent shadows
 * @param size - Shadow size
 * @returns Shadow classes
 */
export function shadow(size: "sm" | "md" | "lg" | "xl" | "2xl" | "none" = "md"): string {
  if (size === "none") return "shadow-none";
  return `shadow-${size}`;
}

/**
 * Border radius utility
 * @param size - Border radius size
 * @returns Border radius classes
 */
export function rounded(size: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full" = "md"): string {
  if (size === "none") return "rounded-none";
  if (size === "full") return "rounded-full";
  return `rounded-${size}`;
}

/**
 * Spacing utility for consistent padding and margin
 * @param type - Spacing type (padding or margin)
 * @param size - Spacing size
 * @param direction - Spacing direction
 * @returns Spacing classes
 */
export function spacing(
  type: "p" | "m",
  size: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16" | "20" | "24",
  direction?: "t" | "r" | "b" | "l" | "x" | "y"
): string {
  if (direction) {
    return `${type}${direction}-${size}`;
  }
  return `${type}-${size}`;
}

/**
 * Text utility for consistent typography
 * @param size - Text size
 * @param weight - Font weight
 * @param color - Text color
 * @returns Text classes
 */
export function text(
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl",
  weight?: "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black",
  color?: string
): string {
  const classes: string[] = [];
  
  if (size) classes.push(`text-${size}`);
  if (weight) classes.push(`font-${weight}`);
  if (color) classes.push(`text-${color}`);
  
  return classes.join(" ");
}

/**
 * Flex utility for flexbox layouts
 * @param direction - Flex direction
 * @param justify - Justify content
 * @param align - Align items
 * @param wrap - Flex wrap
 * @returns Flex classes
 */
export function flex(
  direction?: "row" | "row-reverse" | "col" | "col-reverse",
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly",
  align?: "start" | "end" | "center" | "baseline" | "stretch",
  wrap?: "wrap" | "wrap-reverse" | "nowrap"
): string {
  const classes = ["flex"];
  
  if (direction) classes.push(`flex-${direction}`);
  if (justify) classes.push(`justify-${justify}`);
  if (align) classes.push(`items-${align}`);
  if (wrap) classes.push(`flex-${wrap}`);
  
  return classes.join(" ");
}

/**
 * Grid utility for grid layouts
 * @param cols - Number of columns
 * @param rows - Number of rows
 * @param gap - Grid gap
 * @returns Grid classes
 */
export function grid(
  cols?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12",
  rows?: "1" | "2" | "3" | "4" | "5" | "6",
  gap?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12"
): string {
  const classes = ["grid"];
  
  if (cols) classes.push(`grid-cols-${cols}`);
  if (rows) classes.push(`grid-rows-${rows}`);
  if (gap) classes.push(`gap-${gap}`);
  
  return classes.join(" ");
}

/**
 * Position utility for positioning elements
 * @param position - Position type
 * @param top - Top position
 * @param right - Right position
 * @param bottom - Bottom position
 * @param left - Left position
 * @returns Position classes
 */
export function position(
  position: "static" | "fixed" | "absolute" | "relative" | "sticky",
  top?: string,
  right?: string,
  bottom?: string,
  left?: string
): string {
  const classes = [position];
  
  if (top) classes.push(`top-${top}`);
  if (right) classes.push(`right-${right}`);
  if (bottom) classes.push(`bottom-${bottom}`);
  if (left) classes.push(`left-${left}`);
  
  return classes.join(" ");
}

/**
 * Responsive utility for responsive design
 * @param base - Base classes
 * @param sm - Small screen classes
 * @param md - Medium screen classes
 * @param lg - Large screen classes
 * @param xl - Extra large screen classes
 * @returns Responsive classes
 */
export function responsive(
  base?: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string
): string {
  const classes: string[] = [];
  
  if (base) classes.push(base);
  if (sm) classes.push(`sm:${sm}`);
  if (md) classes.push(`md:${md}`);
  if (lg) classes.push(`lg:${lg}`);
  if (xl) classes.push(`xl:${xl}`);
  
  return classes.join(" ");
}
