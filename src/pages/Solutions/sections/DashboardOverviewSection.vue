<script setup>
import { computed } from 'vue';
import { useI18n } from '../../../composables/useI18n';
import { useIntersectionObserver } from '../../../composables/useIntersectionObserver';
import { useRouter } from 'vue-router';

const { t, locale } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });
const router = useRouter();

const isArabic = computed(() => locale.value === 'ar');

const features = [
  {
    key: 'dashboard',
    icon: 'dashboard',
    route: null,
  },
  {
    key: 'newAppointment',
    icon: 'calendar-plus',
    route: '/solutions/dashboard/appointments',
  },
  {
    key: 'appointmentCalendar',
    icon: 'calendar',
    route: '/solutions/dashboard/appointments',
  },
  {
    key: 'bookings',
    icon: 'bookings',
    route: '/solutions/dashboard/appointments',
  },
  {
    key: 'bookingInfo',
    icon: 'info',
    route: '/solutions/dashboard/booking-info',
  },
  {
    key: 'schedules',
    icon: 'clock',
    route: '/solutions/dashboard/schedules',
  },
];

const handleClick = (feature) => {
  if (feature.route) {
    router.push(feature.route);
  }
};
</script>

<template>
  <section
    class="py-24 md:py-32 bg-white transition-all duration-700"
    ref="targetRef"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div
        class="text-center mb-16"
        :class="{ 'opacity-0': !isVisible, 'animate-fade-in-up': isVisible }"
      >
        <h2 class="text-4xl md:text-5xl font-bold text-text mb-4">
          {{ t('dashboardPage.overview.title') }}
        </h2>
        <div class="w-full flex justify-center">
          <p class="text-lg text-text/70 max-w-3xl text-center">
            {{ t('dashboardPage.overview.subtitle') }}
          </p>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div
          v-for="(feature, index) in features"
          :key="feature.key"
          class="bg-gray-50 rounded-xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all"
          :class="{
            'opacity-0': !isVisible,
            'animate-fade-in-up': isVisible,
            'delay-100': index === 0,
            'delay-200': index === 1,
            'delay-300': index === 2,
            'delay-400': index === 3,
            'delay-500': index === 4,
            'delay-600': index === 5,
            'cursor-pointer': feature.route,
          }"
        >
          <div class="flex flex-col items-start gap-4">
            <div
              class="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-accent/20"
            >
              <svg
                class="w-6 h-6 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  v-if="feature.icon === 'dashboard'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
                <path
                  v-else-if="feature.icon === 'calendar-plus'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zM12 11v6m3-3H9"
                />
                <path
                  v-else-if="feature.icon === 'calendar'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
                <path
                  v-else-if="feature.icon === 'bookings'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
                <path
                  v-else-if="feature.icon === 'info'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  v-else-if="feature.icon === 'clock'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold mb-2 text-text">
                {{ t(`dashboardPage.overview.features.${feature.key}.title`) }}
              </h3>
              <p class="leading-relaxed text-text/70 mb-4">
                {{ t(`dashboardPage.overview.features.${feature.key}.description`) }}
              </p>
              <a
                v-if="feature.route"
                :href="feature.route"
                @click.prevent="handleClick(feature)"
                class="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors group"
              >
                <span>{{ t('dashboardPage.overview.learnMore') }}</span>
                <svg
                  class="w-4 h-4 transition-transform"
                  :class="isArabic ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    v-if="isArabic"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

