import { useState, useEffect } from 'react';

/**
 * Custom hook to preload images before rendering content
 * @param imageUrls - Array of image URLs to preload
 * @param minLoadTime - Minimum time to show loading state (in ms) for smoother UX
 * @returns loading state - true while images are loading, false when complete
 */
export function useImagePreloader(imageUrls: string[], minLoadTime: number = 800): boolean {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    let mounted = true;

    const preloadImages = async () => {
      try {
        // Create promises for all images
        const imagePromises = imageUrls.map((url) => {
          return new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
            img.src = url;
          });
        });

        // Wait for all images to load
        await Promise.all(imagePromises);

        // Ensure minimum loading time for smoother UX
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsedTime);

        setTimeout(() => {
          if (mounted) {
            setIsLoading(false);
          }
        }, remainingTime);
      } catch (error) {
        console.error('Error preloading images:', error);
        // Even if there's an error, stop loading after minLoadTime
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsedTime);
        
        setTimeout(() => {
          if (mounted) {
            setIsLoading(false);
          }
        }, remainingTime);
      }
    };

    preloadImages();

    return () => {
      mounted = false;
    };
  }, [imageUrls, minLoadTime]);

  return isLoading;
}
