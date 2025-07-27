import { useEffect, useState, useRef } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

// Make the hook generic, defaulting to HTMLElement
const useScrollAnimation = <T extends HTMLElement = HTMLElement>(options?: ScrollAnimationOptions) => {
  const [isInView, setIsInView] = useState(false);
  // Use a generic HTMLElement type for the ref, or be more specific if needed.
  const ref = useRef<T | null>(null); // Use the generic type T

  const defaultOptions: Required<ScrollAnimationOptions> = {
    threshold: 0.1, // 10% of the element is visible
    triggerOnce: true,
    rootMargin: '0px 0px -50px 0px', // Trigger a bit before it's fully in view from bottom
    ...options,
  };

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (defaultOptions.triggerOnce && currentRef) {
            observer.unobserve(currentRef);
          }
        } else {
          if (!defaultOptions.triggerOnce) {
            setIsInView(false); // Only reset if not triggerOnce
          }
        }
      },
      {
        threshold: defaultOptions.threshold,
        rootMargin: defaultOptions.rootMargin,
        root: null, // Use the viewport as the root
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  // Dependencies are the properties from defaultOptions that affect the observer.
  }, [defaultOptions.threshold, defaultOptions.triggerOnce, defaultOptions.rootMargin]);

  return [ref, isInView] as const;
};

export default useScrollAnimation;