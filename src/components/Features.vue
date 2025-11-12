<script setup>
import { useI18n } from '../composables/useI18n';
import { useIntersectionObserver } from '../composables/useIntersectionObserver';

const { t } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver();

const features = [
  {
    key: 'easyAppointments',
    icon: 'calendar',
  },
  {
    key: 'accessResults',
    icon: 'document',
  },
  {
    key: 'secureMessaging',
    icon: 'chat',
  },
  {
    key: 'healthRecord',
    icon: 'folder',
  },
];
</script>

<template>
  <section id="features" class="py-32 bg-white transition-all duration-700" ref="targetRef">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16" :class="{ 'opacity-0': !isVisible, 'animate-fade-in-up': isVisible }">
        <h2 class="text-4xl md:text-5xl font-bold text-text mb-4">
          {{ t('features.title') }}
        </h2>
      </div>

      <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div
          v-for="(feature, index) in features"
          :key="feature.key"
          class="bg-white rounded-base p-8 shadow-soft hover:shadow-lg transition-shadow"
          :class="{ 
            'opacity-0': !isVisible, 
            'animate-fade-in-up': isVisible,
            'delay-100': index === 0,
            'delay-200': index === 1,
            'delay-300': index === 2,
            'delay-400': index === 3
          }"
        >
          <div class="flex items-start gap-4">
            <div class="shrink-0 w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  v-if="feature.icon === 'calendar'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
                <path
                  v-else-if="feature.icon === 'document'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
                <path
                  v-else-if="feature.icon === 'chat'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
                <path
                  v-else-if="feature.icon === 'folder'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-text mb-2">
                {{ t(`features.${feature.key}.title`) }}
              </h3>
              <p class="text-text/70 leading-relaxed">
                {{ t(`features.${feature.key}.description`) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

