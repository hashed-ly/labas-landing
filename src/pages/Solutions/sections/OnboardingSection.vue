<script setup>
import { useI18n } from '../../../composables/useI18n';
import { useIntersectionObserver } from '../../../composables/useIntersectionObserver';
import CTAButton from '../../../components/ui/CTAButton.vue';

const { t } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });

const steps = [
  { key: 'login' },
  { key: 'explore' },
  { key: 'setup' },
  { key: 'start' },
];
</script>

<template>
  <section
    class="py-24 md:py-32 bg-gradient-to-br from-secondary/20 via-primary/10 to-secondary/20 transition-all duration-700"
    ref="targetRef"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div
        class="text-center mb-16"
        :class="{ 'opacity-0': !isVisible, 'animate-fade-in-up': isVisible }"
      >
        <h2 class="text-4xl md:text-5xl font-bold text-text mb-4">
          {{ t('dashboardPage.onboarding.title') }}
        </h2>
        <div class="w-full flex justify-center">
          <p class="text-lg text-text/70 max-w-3xl text-center">
            {{ t('dashboardPage.onboarding.subtitle') }}
          </p>
        </div>
      </div>

      <div class="max-w-4xl mx-auto">
        <div class="space-y-8">
          <div
            v-for="(step, index) in steps"
            :key="step.key"
            class="flex gap-6"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up': isVisible,
              'delay-100': index === 0,
              'delay-200': index === 1,
              'delay-300': index === 2,
              'delay-400': index === 3,
            }"
          >
            <!-- Step Number -->
            <div class="shrink-0">
              <div
                class="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl sm:text-2xl font-bold"
              >
                {{ index + 1 }}
              </div>
            </div>

            <!-- Step Content -->
            <div class="flex-1 bg-white rounded-xl p-6 shadow-sm">
              <h3 class="text-xl sm:text-2xl font-bold text-text mb-3">
                {{ t(`dashboardPage.onboarding.steps.${step.key}.title`) }}
              </h3>
              <p class="text-text/70 leading-relaxed">
                {{
                  t(`dashboardPage.onboarding.steps.${step.key}.description`)
                }}
              </p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div
          class="mt-12 text-center"
          :class="{
            'opacity-0': !isVisible,
            'animate-fade-in-up delay-500': isVisible,
          }"
        >
          <CTAButton
            :href="'/contact'"
            :text="t('dashboardPage.onboarding.cta')"
            variant="primary"
            size="lg"
          />
        </div>
      </div>
    </div>
  </section>
</template>
