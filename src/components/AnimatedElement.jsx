import React, { cloneElement } from 'react';
import useInViewAnimation from '../hooks/useInViewAnimation';

/**
 * Wraps a child element and applies scroll‑reveal animation based on the
 * `transition` configuration from `pageData.json`.
 *
 * The `useInViewAnimation` hook expects a transition object containing:
 *   - effectEnabled (bool)
 *   - effectType (string, e.g. "fadeInUp")
 *   - effectDuration (number, seconds)
 *   - effectDelay (number, seconds)
 *   - effectEasing (string)
 */
export default function AnimatedElement({ transition, children }) {
  const ref = useInViewAnimation(transition);
  // Ensure the child is a single React element
  return cloneElement(children, { ref });
}
