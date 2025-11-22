<script setup>
import { useI18n } from '../../../composables/useI18n';
import { useIntersectionObserver } from '../../../composables/useIntersectionObserver';

const { t } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });

const subsections = [
  { key: 'doctorProfile', icon: 'user' },
  { key: 'group', icon: 'users' },
  { key: 'imaging', icon: 'image' },
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
          class="text-center mb-16"
          :class="{ 'opacity-0': !isVisible, 'animate-fade-in-up': isVisible }"
        >
          <h2 class="text-4xl md:text-5xl font-bold text-text mb-4">
            {{ t('dashboardBookingInfo.title') }}
          </h2>
          <div class="w-full flex justify-center">
            <p class="text-lg text-text/70 max-w-3xl text-center">
              {{ t('dashboardBookingInfo.subtitle') }}
            </p>
          </div>
        </div>

        <div class="space-y-12">
          <div
            v-for="(subsection, index) in subsections"
            :key="subsection.key"
            class="bg-gray-50 rounded-xl p-8"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up': isVisible,
              'delay-100': index === 0,
              'delay-200': index === 1,
              'delay-300': index === 2,
            }"
          >
            <div class="flex items-start gap-6 mb-6">
              <div class="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center shrink-0">
                <svg
                  class="w-8 h-8 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    v-if="subsection.icon === 'user'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                  <path
                    v-else-if="subsection.icon === 'users'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                  <path
                    v-else-if="subsection.icon === 'image'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-2xl md:text-3xl font-bold text-text mb-3">
                  {{ t(`dashboardBookingInfo.${subsection.key}.title`) }}
                </h3>
                <p class="text-text/70 leading-relaxed mb-4">
                  {{ t(`dashboardBookingInfo.${subsection.key}.description`) }}
                </p>

                <!-- Steps for adding -->
                <div class="mt-6 space-y-4">
                  <h4 class="text-lg font-bold text-text mb-3">
                    {{ t(`dashboardBookingInfo.${subsection.key}.stepsTitle`) }}
                  </h4>
                  <div
                    v-for="stepNum in (subsection.key === 'imaging' ? 7 : subsection.key === 'group' ? 4 : 6)"
                    :key="stepNum"
                    class="flex gap-3"
                  >
                    <div class="shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-1">
                      {{ stepNum }}
                    </div>
                    <p class="text-text/70 flex-1">
                      {{ t(`dashboardBookingInfo.${subsection.key}.step${stepNum}`) }}
                    </p>
                  </div>
                </div>

                <!-- Note if exists -->
                <div
                  v-if="t(`dashboardBookingInfo.${subsection.key}.note`, null) !== null"
                  class="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg"
                >
                  <p class="text-sm text-text/80">
                    <strong>{{ t('dashboardBookingInfo.noteLabel') }}:</strong>
                    {{ t(`dashboardBookingInfo.${subsection.key}.note`) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

