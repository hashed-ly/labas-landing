<script setup>
import { useI18n } from '../composables/useI18n';
import { useIntersectionObserver } from '../composables/useIntersectionObserver';

const { locale } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver();

const stats = [
  {
    value: '2024',
    label: locale.value === 'ar' ? 'عام الإطلاق' : 'Launch year',
    color: 'primary',
  },
  {
    value: '45k+',
    label:
      locale.value === 'ar' ? 'جلسة رعاية ميسّرة' : 'Care sessions powered',
    color: 'secondary',
  },
  {
    value: '60+',
    label: locale.value === 'ar' ? 'منشآت متصلة' : 'Connected facilities',
    color: 'accent',
  },
];
</script>

<template>
  <section
    class="py-12 md:py-16 bg-bg relative overflow-hidden"
    ref="targetRef"
  >
    <!-- Brand pattern transition -->
    <div
      class="absolute inset-x-0 top-0 h-24 bg-repeat-x opacity-10 pointer-events-none"
      style="
        background-image: url('/images/shapes-patterns/Turquoise Pattern.svg');
        background-size: auto 100%;
      "
      aria-hidden="true"
    ></div>

    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            class="bg-white rounded-2xl border border-text/5 px-6 py-8 shadow-soft hover:shadow-lg transition-all"
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
