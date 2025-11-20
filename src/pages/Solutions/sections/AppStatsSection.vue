<script setup>
import { computed } from 'vue';
import { useI18n } from '../../../composables/useI18n';
import { useIntersectionObserver } from '../../../composables/useIntersectionObserver';

const { t, locale } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver();

const stats = computed(() => [
  {
    value: '45k+',
    label: t('appPage.stats.careSessions'),
    color: 'primary',
  },
  {
    value: '60+',
    label: t('appPage.stats.facilities'),
    color: 'secondary',
  },
  {
    value: '2024',
    label: t('appPage.stats.launchYear'),
    color: 'accent',
  },
]);
</script>

<template>
  <section
    class="py-24 md:py-32 bg-white transition-all duration-700"
    ref="targetRef"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-4xl mx-auto text-center">
        <div
          class="mb-12"
          :class="{ 'opacity-0': !isVisible, 'animate-fade-in-up': isVisible }"
        >
          <h2 class="text-3xl md:text-4xl font-bold text-text mb-4">
            {{ t('appPage.stats.title') }}
          </h2>
          <p class="text-lg text-text/70">
            {{ t('appPage.stats.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            class="bg-gray-50 rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up': isVisible,
              'delay-100': index === 0,
              'delay-200': index === 1,
              'delay-300': index === 2,
            }"
          >
            <div
              class="text-3xl md:text-4xl font-bold mb-2"
              :class="{
                'text-primary': stat.color === 'primary',
                'text-secondary': stat.color === 'secondary',
                'text-accent': stat.color === 'accent',
              }"
            >
              {{ stat.value }}
            </div>
            <div class="text-sm md:text-base text-text/60">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

