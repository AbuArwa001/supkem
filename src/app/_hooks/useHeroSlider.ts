"use client";

import { useState, useEffect } from "react";

/**
 * Logic for the hero slider with auto-advancing slides.
 * @param slideCount Total number of slides
 * @param interval Duration in milliseconds between slide transitions
 * @returns Object containing the current slide index
 */
export const useHeroSlider = (slideCount: number, interval: number = 8000) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slideCount <= 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slideCount);
    }, interval);

    return () => clearInterval(timer);
  }, [slideCount, interval]);

  return { index };
};
