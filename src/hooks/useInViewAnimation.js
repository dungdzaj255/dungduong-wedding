import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook that provides a callback ref to observe elements entering the viewport.
 * When an element becomes visible, the class 'animate-fade-in-up' is added
 * and the observer stops observing that element.
 */
export default function useInViewAnimation() {
  const observerRef = useRef(null);

  useEffect(() => {
    // Create a single IntersectionObserver instance
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    return () => {
      observerRef.current && observerRef.current.disconnect();
    };
  }, []);

  const callbackRef = useCallback((node) => {
    if (node && observerRef.current) {
      observerRef.current.observe(node);
    }
  }, []);

  return callbackRef;
}
