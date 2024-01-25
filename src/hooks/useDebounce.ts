"use client";

import { useEffect, useState } from "react";

type DebouncedValue<T> = T | undefined;

const useDebounce = <T>(value: T, delay: number): DebouncedValue<T> => {
  const [DebouncedValue, setDebouncedValue] =
    useState<DebouncedValue<T>>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return DebouncedValue;
};

export default useDebounce;
