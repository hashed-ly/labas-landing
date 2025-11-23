<script setup>
import { computed } from 'vue';
import { useI18n } from '../../../composables/useI18n';
import { useIntersectionObserver } from '../../../composables/useIntersectionObserver';
import CTAButton from '../../../components/ui/CTAButton.vue';
import { APP_LINKS } from '../../../constants';

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
            <div
              class="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl"
            >
              <img
                src="/images/screenshots/Holding Phone - Facilities Screen.webp"
                alt="Labas App - Facilities Screen"
                class="w-full h-auto object-contain"
                loading="lazy"
              />
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
            <div class="pt-4 flex flex-col sm:flex-row gap-3">
              <CTAButton
                :text="t('appPage.hero.downloadTitle')"
                :href="APP_LINKS.onelink"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
