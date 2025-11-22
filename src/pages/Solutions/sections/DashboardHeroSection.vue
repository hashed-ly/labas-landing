<script setup>
import { useI18n } from '../../../composables/useI18n';
import { useIntersectionObserver } from '../../../composables/useIntersectionObserver';
import CTAButton from '../../../components/ui/CTAButton.vue';

const { t } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });
</script>

<template>
  <section
    class="relative min-h-screen flex items-center py-16 sm:py-20 md:py-32 bg-gradient-to-br from-secondary via-primary to-primary text-white overflow-hidden transition-all duration-700"
    ref="targetRef"
  >
    <!-- Decorative Elements -->
    <div
      class="absolute top-10 start-4 w-48 h-48 sm:top-20 sm:start-10 sm:w-72 sm:h-72 bg-white/5 rounded-full blur-3xl"
      aria-hidden="true"
    ></div>
    <div
      class="absolute bottom-10 end-4 w-64 h-64 sm:bottom-20 sm:end-10 sm:w-96 sm:h-96 bg-accent/10 rounded-full blur-3xl"
      aria-hidden="true"
    ></div>

    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <div class="max-w-6xl mx-auto">
        <div class="text-center space-y-6 sm:space-y-8 md:space-y-10">
          <!-- Text Content -->
          <div
            class="space-y-4 sm:space-y-6 md:space-y-8 text-center"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up': isVisible,
            }"
          >
            <h1
              class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              {{ t('dashboardPage.hero.title') }}
            </h1>

            <div class="w-full flex justify-center">
              <p
                class="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-4xl text-center"
              >
                {{ t('dashboardPage.hero.subtitle') }}
              </p>
            </div>

            <div
              class="flex flex-wrap justify-center gap-4 pt-4 sm:pt-6 md:pt-8"
            >
              <CTAButton
                :href="'/contact'"
                :text="t('dashboardPage.hero.requestAccess')"
                variant="accent"
                size="lg"
              />
            </div>
          </div>

          <!-- Feature Highlights -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up delay-200': isVisible,
            }"
          >
            <div
              v-for="(feature, index) in [
                'appointments',
                'bookings',
                'profiles',
              ]"
              :key="feature"
              class="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20"
            >
              <div class="flex items-center gap-3 mb-2">
                <div
                  class="w-10 h-10 sm:w-12 sm:h-12 bg-accent/20 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 sm:w-7 sm:h-7 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      v-if="feature === 'appointments'"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                    <path
                      v-else-if="feature === 'bookings'"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                    <path
                      v-else-if="feature === 'profiles'"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 class="text-lg sm:text-xl font-bold">
                  {{ t(`dashboardPage.hero.features.${feature}.title`) }}
                </h3>
              </div>
              <p class="text-sm sm:text-base text-white/80">
                {{ t(`dashboardPage.hero.features.${feature}.description`) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute inset-x-0 bottom-0 h-16 sm:h-20 md:h-1/5 bg-gradient-to-t from-primary to-transparent pointer-events-none z-10"
    ></div>
  </section>
</template>
