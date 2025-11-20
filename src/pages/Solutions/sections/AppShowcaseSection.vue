<script setup>
import { computed } from 'vue';
import { useI18n } from '../../../composables/useI18n';
import { useIntersectionObserver } from '../../../composables/useIntersectionObserver';

const { t, locale } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver();

const isArabic = computed(() => locale.value === 'ar');
</script>

<template>
  <section
    class="relative py-24 md:py-32 bg-gradient-to-br from-secondary/20 via-primary/10 to-secondary/20 overflow-hidden transition-all duration-700"
    ref="targetRef"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-6xl mx-auto">
        <div
          class="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
          :style="isArabic ? { direction: 'rtl' } : {}"
        >
          <!-- Phone Mockup -->
          <div
            class="relative flex justify-center order-1"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up': isVisible,
            }"
          >
            <div class="relative w-full max-w-sm md:max-w-md">
              <img
                src="/images/screenshots/Holding Phone - Facilities Screen.png"
                alt="Labas App - Facilities Screen"
                class="w-full h-auto object-contain"
                loading="lazy"
              />
              <!-- Fade to section background overlay -->
              <div
                class="absolute bottom-0 left-0 right-0 h-32 sm:h-40 md:h-48 pointer-events-none"
                style="background: linear-gradient(to top, rgba(246, 248, 250, 1) 0%, rgba(246, 248, 250, 0.8) 50%, transparent 100%);"
                aria-hidden="true"
              ></div>
            </div>
          </div>

          <!-- Text Content -->
          <div
            class="space-y-8 order-2"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up delay-200': isVisible,
            }"
          >
            <div>
              <h2
                class="text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-6"
              >
                <span>{{ t('appPage.showcase.title') }}</span>
                <br />
                <span>{{ t('appPage.showcase.titleSuffix') }}</span>
              </h2>
            </div>

            <!-- Download Block -->
            <div class="space-y-3">
              <h3 class="text-xl font-bold text-text">
                {{ t('appPage.showcase.download.title') }}
              </h3>
              <p class="text-text/70 leading-relaxed">
                {{ t('appPage.showcase.download.description') }}
              </p>
            </div>

            <!-- Choose Service Block -->
            <div class="space-y-3">
              <h3 class="text-xl font-bold text-text">
                {{ t('appPage.showcase.chooseService.title') }}
              </h3>
              <p class="text-text/70 leading-relaxed">
                {{ t('appPage.showcase.chooseService.description') }}
              </p>
            </div>

            <!-- Get Care Fast Block -->
            <div class="space-y-3">
              <h3 class="text-xl font-bold text-text">
                {{ t('appPage.showcase.getCareFast.title') }}
              </h3>
              <p class="text-text/70 leading-relaxed">
                {{ t('appPage.showcase.getCareFast.description') }}
              </p>
            </div>

            <!-- Download Button -->
            <div class="pt-4">
              <a
                href="https://apps.apple.com/ly/app/%D9%84%D8%A7%D8%A8%D8%A7%D8%B3-labas-appointments/id6746457351"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                {{ t('appPage.hero.downloadTitle') }}
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
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

