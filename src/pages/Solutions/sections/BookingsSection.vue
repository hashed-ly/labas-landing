<script setup>
import { useI18n } from '../../../composables/useI18n';
import { useIntersectionObserver } from '../../../composables/useIntersectionObserver';

const { t } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });

const actions = [
  { key: 'view', icon: 'eye' },
  { key: 'approve', icon: 'check' },
  { key: 'reschedule', icon: 'calendar' },
  { key: 'cancel', icon: 'x' },
  { key: 'filter', icon: 'filter' },
];
</script>

<template>
  <section
    class="py-24 md:py-32 bg-white transition-all duration-700"
    ref="targetRef"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-6xl mx-auto">
        <div
          class="text-center mb-16"
          :class="{ 'opacity-0': !isVisible, 'animate-fade-in-up': isVisible }"
        >
          <h2 class="text-4xl md:text-5xl font-bold text-text mb-4">
            {{ t('dashboardAppointments.bookings.title') }}
          </h2>
          <div class="w-full flex justify-center">
            <p class="text-lg text-text/70 max-w-3xl text-center">
              {{ t('dashboardAppointments.bookings.subtitle') }}
            </p>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(action, index) in actions"
            :key="action.key"
            class="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up': isVisible,
              'delay-100': index === 0,
              'delay-200': index === 1,
              'delay-300': index === 2,
              'delay-400': index === 3,
              'delay-500': index === 4,
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
                  v-if="action.icon === 'eye'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  v-if="action.icon === 'eye'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
                <path
                  v-else-if="action.icon === 'check'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
                <path
                  v-else-if="action.icon === 'calendar'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
                <path
                  v-else-if="action.icon === 'x'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
                <path
                  v-else-if="action.icon === 'filter'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-text mb-2">
              {{ t(`dashboardAppointments.bookings.actions.${action.key}.title`) }}
            </h3>
            <p class="text-text/70 leading-relaxed">
              {{ t(`dashboardAppointments.bookings.actions.${action.key}.description`) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

