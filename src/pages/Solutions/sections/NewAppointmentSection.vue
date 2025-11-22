<script setup>
import { useI18n } from '../../../composables/useI18n';
import { useIntersectionObserver } from '../../../composables/useIntersectionObserver';

const { t } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });

const steps = [
  { key: 'click' },
  { key: 'select' },
  { key: 'enter' },
  { key: 'choose' },
  { key: 'fill' },
  { key: 'save' },
];
</script>

<template>
  <section
    class="py-24 md:py-32 bg-white transition-all duration-700"
    ref="targetRef"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-4xl mx-auto">
        <div
          class="text-center mb-16"
          :class="{ 'opacity-0': !isVisible, 'animate-fade-in-up': isVisible }"
        >
          <div class="inline-block px-4 py-2 bg-accent/10 rounded-full mb-4">
            <span class="text-sm font-medium text-accent">
              {{ t('dashboardAppointments.newAppointment.badge') }}
            </span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-text mb-4">
            {{ t('dashboardAppointments.newAppointment.title') }}
          </h2>
          <div class="w-full flex justify-center">
            <p class="text-lg text-text/70 max-w-3xl text-center">
              {{ t('dashboardAppointments.newAppointment.subtitle') }}
            </p>
          </div>
        </div>

        <!-- Steps -->
        <div class="space-y-6">
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
              'delay-500': index === 4,
              'delay-600': index === 5,
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
            <div class="flex-1 bg-gray-50 rounded-xl p-6">
              <h3 class="text-xl sm:text-2xl font-bold text-text mb-2">
                {{ t(`dashboardAppointments.newAppointment.steps.${step.key}.title`) }}
              </h3>
              <p class="text-text/70 leading-relaxed">
                {{ t(`dashboardAppointments.newAppointment.steps.${step.key}.description`) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

