<script setup>
import { useI18n } from '../../../composables/useI18n';
import { useIntersectionObserver } from '../../../composables/useIntersectionObserver';

const { t } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });

const features = [
  { key: 'view' },
  { key: 'filter' },
  { key: 'edit' },
];
</script>

<template>
  <section
    class="py-24 md:py-32 bg-gradient-to-br from-secondary/20 via-primary/10 to-secondary/20 transition-all duration-700"
    ref="targetRef"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-6xl mx-auto">
        <div
          class="text-center mb-16"
          :class="{ 'opacity-0': !isVisible, 'animate-fade-in-up': isVisible }"
        >
          <h2 class="text-4xl md:text-5xl font-bold text-text mb-4">
            {{ t('dashboardAppointments.calendar.title') }}
          </h2>
          <div class="w-full flex justify-center">
            <p class="text-lg text-text/70 max-w-3xl text-center">
              {{ t('dashboardAppointments.calendar.subtitle') }}
            </p>
          </div>
        </div>

        <div class="grid sm:grid-cols-3 gap-6">
          <div
            v-for="(feature, index) in features"
            :key="feature.key"
            class="bg-white rounded-xl p-6 shadow-sm"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up': isVisible,
              'delay-100': index === 0,
              'delay-200': index === 1,
              'delay-300': index === 2,
            }"
          >
            <div class="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
              <svg
                class="w-6 h-6 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-text mb-2">
              {{ t(`dashboardAppointments.calendar.features.${feature.key}.title`) }}
            </h3>
            <p class="text-text/70 leading-relaxed">
              {{ t(`dashboardAppointments.calendar.features.${feature.key}.description`) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

