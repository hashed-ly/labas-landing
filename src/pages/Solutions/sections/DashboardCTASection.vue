<script setup>
import { useI18n } from '../../../composables/useI18n';
import { useIntersectionObserver } from '../../../composables/useIntersectionObserver';
import CTAButton from '../../../components/ui/CTAButton.vue';

const { t } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });
</script>

<template>
  <section
    class="relative py-24 md:py-32 bg-gradient-to-br from-secondary via-primary to-primary text-white overflow-hidden transition-all duration-700"
    ref="targetRef"
  >
    <!-- Decorative Elements -->
    <div
      class="absolute top-20 start-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"
      aria-hidden="true"
    ></div>
    <div
      class="absolute bottom-20 end-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
      aria-hidden="true"
    ></div>

    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <div class="max-w-4xl mx-auto text-center">
        <div
          class="space-y-8"
          :class="{
            'opacity-0': !isVisible,
            'animate-fade-in-up': isVisible,
          }"
        >
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {{ t('dashboardPage.cta.title') }}
          </h2>

          <div class="w-full flex justify-center">
            <p
              class="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-4xl text-center"
            >
              {{ t('dashboardPage.cta.subtitle') }}
            </p>
          </div>

          <div class="flex flex-wrap justify-center gap-4 pt-4">
            <CTAButton
              :href="'/contact'"
              :text="t('contact.title')"
              variant="accent"
              size="lg"
            />
          </div>

          <!-- Support Information -->
          <div
            class="mt-12 pt-8 border-t border-white/20"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up delay-200': isVisible,
            }"
          >
            <p class="text-white/80 mb-4">
              {{ t('dashboardPage.cta.supportTitle') }}
            </p>
            <div
              class="flex flex-wrap justify-center gap-6 text-sm sm:text-base"
            >
              <a
                href="mailto:support@labas.com"
                class="text-white/90 hover:text-white transition-colors"
              >
                {{ t('dashboardPage.cta.email') }}
              </a>
              <span class="text-white/50">|</span>
              <a
                href="tel:+218914285424"
                class="text-white/90 hover:text-white transition-colors"
                dir="ltr"
              >
                {{ t('dashboardPage.cta.phone') }}
              </a>
              <span class="text-white/50">|</span>
              <span class="text-white/90">
                {{ t('dashboardPage.cta.liveChat') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
