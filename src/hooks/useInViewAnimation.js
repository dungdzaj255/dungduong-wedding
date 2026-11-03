
import { useEffect, useRef, useCallback } from 'react';

const OBSERVER_OPTIONS = {
  threshold: 0.1
};

const ANIMATION_TYPES = [
  'fadeIn',
  'fadeInUp',
  'fadeInDown',
  'fadeInLeft',
  'fadeInRight',
  'zoomIn'
];

export default function useInViewAnimation() {
  const observerRef = useRef(null);
  const elementsRef = useRef(new Map());
  const configsRef = useRef(new Map());
  const callbacksRef = useRef(new Map());

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      elementsRef.current.forEach((node) => {
        node.classList.add('is-visible');
      });
      return;
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const node = entry.target;
        const id = node.dataset.animationId;

        if (configsRef.current.has(id)) {
          node.classList.add('is-visible');
        }

        observerRef.current?.unobserve(node);
      });
    }, OBSERVER_OPTIONS);

    elementsRef.current.forEach((node) => {
      observerRef.current.observe(node);
    });

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  const getAnimationRef = useCallback((id, transition) => {
    configsRef.current.set(id, transition);

    if (callbacksRef.current.has(id)) {
      return callbacksRef.current.get(id);
    }

    const callback = (node) => {
      const previousNode = elementsRef.current.get(id);

      if (!node) {
        if (previousNode) {
          observerRef.current?.unobserve(previousNode);
          elementsRef.current.delete(id);
        }
        return;
      }

      if (previousNode && previousNode !== node) {
        observerRef.current?.unobserve(previousNode);
        elementsRef.current.delete(id);
      }

      const config = configsRef.current.get(id);

      if (
        !config?.effectEnabled ||
        !config.effectType ||
        config.effectType === 'none'
      ) {
        observerRef.current?.unobserve(node);
        elementsRef.current.delete(id);

        node.classList.remove(
          'scroll-reveal',
          'is-visible',
          ...ANIMATION_TYPES.map(type => `animate-${type}`)
        );

        return;
      }

      node.dataset.animationId = String(id);

      node.style.setProperty(
        '--animation-duration',
        `${config.effectDuration ?? 1}s`
      );

      node.style.setProperty(
        '--animation-delay',
        `${config.effectDelay ?? 0}s`
      );

      node.style.setProperty(
        '--animation-easing',
        config.effectEasing || 'ease'
      );

      node.classList.remove(
        ...ANIMATION_TYPES.map(type => `animate-${type}`)
      );

      node.classList.add(
        'scroll-reveal',
        `animate-${config.effectType}`
      );

      elementsRef.current.set(id, node);

      if (observerRef.current) {
        observerRef.current.observe(node);
      }
    };

    callbacksRef.current.set(id, callback);

    return callback;
  }, []);

  return getAnimationRef;
}
