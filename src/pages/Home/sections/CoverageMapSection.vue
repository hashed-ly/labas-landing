<script setup>
import { computed } from 'vue';
import { useI18n } from '../../../composables/useI18n';
import { useIntersectionObserver } from '../../../composables/useIntersectionObserver';
import LibyaCoverageMap from '../../../components/LibyaCoverageMap.vue';

const { locale } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver();

const isArabic = computed(() => locale.value === 'ar');

const stats = computed(() => [
  {
    value: '2024',
    label: locale.value === 'ar' ? 'عام الإطلاق' : 'Launch year',
    color: 'primary',
  },
  {
    value: '45k+',
    label:
      locale.value === 'ar' ? 'جلسة رعاية ميسّرة' : 'Care sessions powered',
    color: 'secondary',
  },
  {
    value: '60+',
    label: locale.value === 'ar' ? 'منشآت متصلة' : 'Connected facilities',
    color: 'accent',
  },
]);
</script>

<template>
  <section
    id="coverage"
    class="relative py-16 md:py-32 bg-bg transition-all duration-700 overflow-hidden"
    ref="targetRef"
  >
    <div class="container mx-auto px-4 sm:px-6 relative">
      <div
        class="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-6 md:gap-2 lg:gap-8 xl:gap-12 items-start max-w-6xl mx-auto"
        :style="isArabic ? { direction: 'rtl' } : {}"
      >
        <!-- Text Content -->
        <div
          class="relative z-20 space-y-6 px-5 md:ps-6 md:pe-0 md:col-start-1"
          :class="{ 'opacity-0': !isVisible, 'animate-fade-in-up': isVisible }"
        >
          <span
            class="pointer-events-none absolute -inset-6 sm:-inset-10 -z-10 rounded-[80px] sm:rounded-[120px] bg-white/55 blur-2xl sm:blur-1xl"
            aria-hidden="true"
          ></span>
          <span
            class="pointer-events-none absolute -inset-12 sm:-inset-16 -z-20 rounded-[140px] sm:rounded-[160px] bg-secondary/10 blur-[90px] sm:blur-[120px]"
            aria-hidden="true"
          ></span>
          <h2 class="text-4xl lg:text-5xl font-bold text-text leading-tight">
            {{
              locale === 'ar'
                ? 'أينما كنت، لاباس معك'
                : 'One Platform for All of Libya'
            }}
          </h2>

          <p class="text-lg text-text/80 leading-relaxed">
            {{
              locale === 'ar'
                ? 'لاباس هو تطبيق طبي شامل يربط المرضى بالأطباء والمستشفيات في مختلف أنحاء ليبيا عبر تجربة رقمية سهلة وآمنة.'
                : 'Labas is a comprehensive medical application that connects patients with doctors and hospitals across Libya through an easy and secure digital experience.'
            }}
          </p>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-2 sm:gap-4 pt-4">
            <div
              v-for="(stat, index) in stats"
              :key="index"
              class="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl border border-text/5 px-2 py-3 sm:px-4 sm:py-5 shadow-sm hover:shadow-md transition-all"
              :class="{
                'opacity-0': !isVisible,
                'animate-fade-in-up': isVisible,
                'delay-100': index === 0,
                'delay-200': index === 1,
                'delay-300': index === 2,
              }"
            >
              <div
                class="text-lg sm:text-2xl md:text-3xl font-bold mb-0.5 sm:mb-1"
                :class="{
                  'text-primary': stat.color === 'primary',
                  'text-secondary': stat.color === 'secondary',
                  'text-accent': stat.color === 'accent',
                }"
              >
                {{ stat.value }}
              </div>
              <div
                class="text-[10px] sm:text-xs md:text-sm text-text/60 leading-tight"
              >
                {{ stat.label }}
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Map -->
        <div
          class="relative w-full flex items-center justify-center mt-10 md:mt-0 md:col-start-2 md:ltr:-ms-32 md:rtl:ms-60 -mx-4 sm:-mx-6 md:mx-0 rtl:ms-3"
          :class="[
            {
              'opacity-0': !isVisible,
              'animate-fade-in-up delay-200': isVisible,
            },
          ]"
        >
          <LibyaCoverageMap class="relative mx-auto w-full" />
        </div>
      </div>
    </div>
    <div
      class="absolute inset-x-0 bottom-0 md:h-3/7 h-1/4 bg-linear-to-t from-white via-white/50 to-transparent"
    ></div>
  </section>
</template>
