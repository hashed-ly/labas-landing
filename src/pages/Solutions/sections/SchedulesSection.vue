<script setup>
import { useI18n } from '../../../composables/useI18n';
import { useIntersectionObserver } from '../../../composables/useIntersectionObserver';

const { t } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });

const capabilities = [
  { key: 'view' },
  { key: 'edit' },
];

const editFields = [
  { key: 'startTime' },
  { key: 'endTime' },
  { key: 'days' },
  { key: 'capacity' },
  { key: 'bookingWindow' },
  { key: 'active' },
];
</script>

<template>
  <section
    class="py-24 md:py-32 bg-gradient-to-br from-secondary/20 via-primary/10 to-secondary/20 transition-all duration-700"
    ref="targetRef"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-6xl mx-auto">
        <div
          class="text-center mb-16"
          :class="{ 'opacity-0': !isVisible, 'animate-fade-in-up': isVisible }"
        >
          <h2 class="text-4xl md:text-5xl font-bold text-text mb-4">
            {{ t('dashboardSchedules.title') }}
          </h2>
          <div class="w-full flex justify-center">
            <p class="text-lg text-text/70 max-w-3xl text-center">
              {{ t('dashboardSchedules.subtitle') }}
            </p>
          </div>
        </div>

        <!-- Capabilities -->
        <div class="grid sm:grid-cols-2 gap-6 mb-12">
          <div
            v-for="(capability, index) in capabilities"
            :key="capability.key"
            class="bg-white rounded-xl p-6 shadow-sm"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up': isVisible,
              'delay-100': index === 0,
              'delay-200': index === 1,
            }"
          >
            <div class="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-text mb-2">
              {{ t(`dashboardSchedules.capabilities.${capability.key}.title`) }}
            </h3>
            <p class="text-text/70 leading-relaxed">
              {{ t(`dashboardSchedules.capabilities.${capability.key}.description`) }}
            </p>
          </div>
        </div>

        <!-- Editing Guide -->
        <div class="bg-white rounded-xl p-8">
          <h3 class="text-2xl md:text-3xl font-bold text-text mb-6">
            {{ t('dashboardSchedules.editing.title') }}
          </h3>
          <div class="space-y-4 mb-6">
            <div class="flex gap-3">
              <div class="shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-1">
                1
              </div>
              <p class="text-text/70 flex-1">
                {{ t('dashboardSchedules.editing.step1') }}
              </p>
            </div>
            <div class="flex gap-3">
              <div class="shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-1">
                2
              </div>
              <p class="text-text/70 flex-1">
                {{ t('dashboardSchedules.editing.step2') }}
              </p>
            </div>
          </div>

          <!-- Fields to Update -->
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            <div
              v-for="(field, index) in editFields"
              :key="field.key"
              class="bg-gray-50 rounded-lg p-4"
            >
              <h4 class="font-bold text-text mb-1">
                {{ t(`dashboardSchedules.editing.fields.${field.key}.title`) }}
              </h4>
              <p class="text-sm text-text/70">
                {{ t(`dashboardSchedules.editing.fields.${field.key}.description`) }}
              </p>
            </div>
          </div>

          <div class="flex gap-3 mt-6">
            <div class="shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-1">
              3
            </div>
            <p class="text-text/70 flex-1">
              {{ t('dashboardSchedules.editing.step3') }}
            </p>
          </div>
          <div class="flex gap-3 mt-4">
            <div class="shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-1">
              4
            </div>
            <p class="text-text/70 flex-1">
              {{ t('dashboardSchedules.editing.step4') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

