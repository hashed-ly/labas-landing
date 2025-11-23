<script setup>
import { useI18n } from '../../../composables/useI18n';
import { useIntersectionObserver } from '../../../composables/useIntersectionObserver';

const { t, locale } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver();

const services = [
  {
    key: 'centralDashboard',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    key: 'smartScheduling',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
  },
  {
    key: 'unifiedCalendar',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  },
  {
    key: 'flexibleManagement',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
];
</script>

<template>
  <section
    id="solutions"
    class="py-32 bg-bg transition-all duration-700"
    ref="targetRef"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Left: Services Grid -->
          <div
            class="order-2 md:order-1"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up': isVisible,
            }"
          >
            <!-- Section Header -->
            <div class="mb-8">
              <h2 class="text-3xl md:text-4xl font-bold text-text mb-4">
                {{ t('organizations.title') }}
              </h2>
              <p class="text-lg text-text/70 leading-relaxed">
                {{ t('security.description') }}
              </p>
            </div>

            <!-- Services Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div
                v-for="(service, index) in services"
                :key="service.key"
                class="bg-white rounded-xl p-6 shadow-soft border border-accent/20 hover:shadow-lg hover:border-accent/40 transition-all"
              >
                <!-- Icon -->
                <div
                  class="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4"
                >
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
                      :d="service.icon"
                    />
                  </svg>
                </div>

                <!-- Title -->
                <h3 class="text-lg font-bold text-text mb-2">
                  {{ t(`organizations.${service.key}.title`) }}
                </h3>

                <!-- Description -->
                <p class="text-sm text-text/70 leading-relaxed">
                  {{ t(`organizations.${service.key}.description`) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Right: Phone Mockup -->
          <div
            class="order-1 md:order-2 flex justify-center mb-12 md:mb-0"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up delay-200': isVisible,
            }"
          >
            <div class="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm">
              <!-- Phone Image -->
              <img
                src="/images/screenshots/iPhone Air.webp"
                alt="Labas App - Services"
                class="w-full h-auto drop-shadow-2xl"
                loading="lazy"
              />

              <!-- Floating Badge - Bottom Half -->
              <div
                class="absolute bottom-[35%] start-1/2 -translate-x-1/2 z-10"
              >
                <div
                  class="bg-accent text-primary px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full shadow-lg flex items-center gap-1.5 sm:gap-2"
                >
                  <svg
                    class="w-4 h-4 sm:w-5 sm:h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <span class="font-semibold text-xs sm:text-sm">{{
                    locale === 'ar' ? 'دردشة الطبيب' : 'Doctor Chat'
                  }}</span>
                </div>
              </div>

              <!-- Glow Effect -->
              <div
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 sm:h-32 bg-gradient-to-t from-accent/10 via-accent/5 to-transparent blur-3xl -z-10"
                aria-hidden="true"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

