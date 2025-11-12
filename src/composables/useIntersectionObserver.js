import { onMounted, onUnmounted, ref } from 'vue';

export function useIntersectionObserver(options = {}) {
  const isVisible = ref(false);
  const targetRef = ref(null);
  let observer = null;

  onMounted(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          // Optionally disconnect after first intersection
          if (options.once !== false) {
            observer.disconnect();
          }
        } else if (options.once === false) {
          isVisible.value = false;
        }
      },
      {
        threshold:
          options.threshold !== undefined && options.threshold !== null
            ? options.threshold
            : 0.25,
        rootMargin:
          options.rootMargin !== undefined && options.rootMargin !== null
            ? options.rootMargin
            : '-10% 0px -25% 0px',
      }
    );

    if (targetRef.value) {
      observer.observe(targetRef.value);
    }
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return {
    targetRef,
    isVisible,
  };
}
