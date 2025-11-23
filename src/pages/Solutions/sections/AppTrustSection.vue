<script setup>
import { computed } from 'vue';
import { useI18n } from '../../../composables/useI18n';
import { useIntersectionObserver } from '../../../composables/useIntersectionObserver';

const { t, locale } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver();

const isArabic = computed(() => locale.value === 'ar');

const benefits = [
  {
    key: 'secure',
    icon: 'shield',
  },
  {
    key: 'allInOne',
    icon: 'grid',
  },
  {
    key: 'instant',
    icon: 'calendar',
  },
  {
    key: 'support',
    icon: 'headset',
  },
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
          class="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
          :style="isArabic ? { direction: 'rtl' } : {}"
        >
          <!-- Benefits Cards -->
          <div
            class="space-y-6 order-2 md:order-1"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up': isVisible,
            }"
          >
            <h2 class="text-3xl md:text-4xl font-bold text-text mb-8">
              {{ t('appPage.trust.title') }}
            </h2>

            <div
              v-for="(benefit, index) in benefits"
              :key="benefit.key"
              class="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:shadow-md transition-all"
              :class="{
                'opacity-0': !isVisible,
                'animate-fade-in-up': isVisible,
                'delay-100': index === 0,
                'delay-200': index === 1,
                'delay-300': index === 2,
                'delay-400': index === 3,
              }"
            >
              <div
                class="shrink-0 w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    v-if="benefit.icon === 'shield'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                  <path
                    v-else-if="benefit.icon === 'grid'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                  <path
                    v-else-if="benefit.icon === 'calendar'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                  <path
                    v-else-if="benefit.icon === 'headset'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-text mb-2">
                  {{ t(`appPage.trust.${benefit.key}.title`) }}
                </h3>
                <p class="text-text/70 leading-relaxed">
                  {{ t(`appPage.trust.${benefit.key}.description`) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Phone Mockup -->
          <div
            class="relative flex justify-center order-1 md:order-2"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up delay-200': isVisible,
            }"
          >
            <div class="relative w-full max-w-sm md:max-w-md">
              <img
                src="/images/screenshots/Holding Phone - Bookings Screen.webp"
                alt="Labas App - Bookings Screen"
                class="w-full h-auto object-contain"
                loading="lazy"
              />
              <!-- Fade to white overlay -->
              <div
                class="absolute bottom-0 left-0 right-0 h-32 sm:h-40 md:h-48 bg-white pointer-events-none"
                style="mask-image: linear-gradient(to top, black 0%, black 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%); -webkit-mask-image: linear-gradient(to top, black 0%, black 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%);"
                aria-hidden="true"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

