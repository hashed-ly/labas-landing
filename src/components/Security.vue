<script setup>
import { useI18n } from '../composables/useI18n';
import { useIntersectionObserver } from '../composables/useIntersectionObserver';

const { t } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver();
</script>

<template>
  <section
    class="py-32 bg-secondary transition-all duration-700"
    ref="targetRef"
  >
    <div class="container mx-auto px-6">
      <div
        class="max-w-3xl mx-auto text-center space-y-6"
        :class="{ 'opacity-0': !isVisible, 'animate-fade-in-up': isVisible }"
      >
        <div class="flex justify-center mb-6">
          <div
            class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-10 h-10 text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        <h2 class="text-4xl md:text-5xl font-bold text-white">
          {{ t('security.title') }}
        </h2>

        <p class="text-xl text-white/70 leading-relaxed">
          {{ t('security.description') }}
        </p>
      </div>
    </div>
  </section>
</template>
