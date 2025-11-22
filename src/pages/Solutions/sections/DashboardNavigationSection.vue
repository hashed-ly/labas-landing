<script setup>
import { computed } from 'vue';
import { useI18n } from '../../../composables/useI18n';
import { useIntersectionObserver } from '../../../composables/useIntersectionObserver';
import { useRouter } from 'vue-router';

const { t, locale } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });
const router = useRouter();

const isArabic = computed(() => locale.value === 'ar');

const pages = [
  {
    key: 'appointments',
    route: '/solutions/dashboard/appointments',
    icon: 'calendar',
    color: 'primary',
  },
  {
    key: 'bookingInfo',
    route: '/solutions/dashboard/booking-info',
    icon: 'info',
    color: 'secondary',
  },
  {
    key: 'schedules',
    route: '/solutions/dashboard/schedules',
    icon: 'clock',
    color: 'accent',
  },
];

const handleClick = (page) => {
  router.push(page.route);
};
</script>

<template>
  <section
    class="py-24 md:py-32 bg-gradient-to-br from-secondary/20 via-primary/10 to-secondary/20 transition-all duration-700"
    ref="targetRef"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-6xl mx-auto">
        <div
          class="text-center mb-12"
          :class="{ 'opacity-0': !isVisible, 'animate-fade-in-up': isVisible }"
        >
          <h2 class="text-3xl md:text-4xl font-bold text-text mb-4">
            {{ t('dashboardPage.navigation.title') }}
          </h2>
          <div class="w-full flex justify-center">
            <p class="text-lg text-text/70 max-w-3xl text-center">
              {{ t('dashboardPage.navigation.subtitle') }}
            </p>
          </div>
        </div>

        <div class="grid sm:grid-cols-3 gap-6">
          <a
            v-for="(page, index) in pages"
            :key="page.key"
            :href="page.route"
            @click.prevent="handleClick(page)"
            class="group bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up': isVisible,
              'delay-100': index === 0,
              'delay-200': index === 1,
              'delay-300': index === 2,
            }"
          >
            <div class="flex flex-col items-center text-center gap-4">
              <div
                class="w-16 h-16 rounded-xl flex items-center justify-center"
                :class="{
                  'bg-primary/20': page.color === 'primary',
                  'bg-secondary/20': page.color === 'secondary',
                  'bg-accent/20': page.color === 'accent',
                }"
              >
                <svg
                  class="w-8 h-8"
                  :class="{
                    'text-primary': page.color === 'primary',
                    'text-secondary': page.color === 'secondary',
                    'text-accent': page.color === 'accent',
                  }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    v-if="page.icon === 'calendar'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                  <path
                    v-else-if="page.icon === 'info'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    v-else-if="page.icon === 'clock'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-text">
                {{ t(`dashboardPage.navigation.pages.${page.key}.title`) }}
              </h3>
              <p class="text-text/70 leading-relaxed">
                {{ t(`dashboardPage.navigation.pages.${page.key}.description`) }}
              </p>
              <div
                class="mt-4 inline-flex items-center gap-2 font-medium"
                :class="{
                  'text-primary': page.color === 'primary',
                  'text-secondary': page.color === 'secondary',
                  'text-accent': page.color === 'accent',
                }"
              >
                <span>{{ t('dashboardPage.navigation.viewDetails') }}</span>
                <svg
                  class="w-5 h-5 transition-transform"
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
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

