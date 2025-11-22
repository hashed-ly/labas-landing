<script setup>
import { useI18n } from '../../../composables/useI18n';
import { useIntersectionObserver } from '../../../composables/useIntersectionObserver';
import CTAButton from '../../../components/ui/CTAButton.vue';

const { t } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });
</script>

<template>
  <section
    class="relative py-16 sm:py-20 md:py-32 bg-gradient-to-br from-secondary via-primary to-primary text-white overflow-hidden transition-all duration-700"
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
      <div class="max-w-4xl mx-auto text-center">
        <div
          class="space-y-6 sm:space-y-8"
          :class="{
            'opacity-0': !isVisible,
            'animate-fade-in-up': isVisible,
          }"
        >
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {{ t('dashboardBookingInfo.heroTitle') }}
          </h1>

          <div class="w-full flex justify-center">
            <p class="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-4xl text-center">
              {{ t('dashboardBookingInfo.heroSubtitle') }}
            </p>
          </div>

          <div class="flex flex-wrap justify-center gap-4 pt-4 sm:pt-6 md:pt-8">
            <CTAButton
              :href="'/contact'"
              :text="t('dashboardPage.hero.requestAccess')"
              variant="accent"
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute inset-x-0 bottom-0 h-16 sm:h-20 md:h-1/5 bg-gradient-to-t from-primary to-transparent pointer-events-none z-10"
    ></div>
  </section>
</template>

