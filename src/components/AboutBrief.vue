<script setup>
import { computed } from 'vue';
import { useI18n } from '../composables/useI18n';
import { useIntersectionObserver } from '../composables/useIntersectionObserver';
import LibyaCoverageMap from './LibyaCoverageMap.vue';

const { t, locale } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver();

const isArabic = computed(() => locale.value === 'ar');
</script>

<template>
  <section
    id="about"
    class="relative py-16 md:py-32 bg-bg transition-all duration-700 overflow-hidden snap-start snap-always md:h-screen"
    ref="targetRef"
  >
    <div class="container mx-auto px-4 sm:px-6 relative">
      <div
        class="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-10 md:gap-12 lg:gap-16 items-start max-w-6xl mx-auto"
      >
        <!-- Text Content -->
        <div
          class="relative z-20 space-y-6 px-5 sm:px-6"
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
          <h2 class="text-4xl md:text-5xl font-bold text-text leading-tight">
            {{ t('about.title') }}
          </h2>

          <p class="text-lg text-text/80 leading-relaxed">
            {{ t('about.description') }}
          </p>

          <p class="text-lg text-text/80 leading-relaxed">
            {{ t('about.paragraph1') }}
          </p>

          <div class="mt-4 md:mt-6 ps-6 border-s-4 border-secondary">
            <p class="text-lg font-medium text-text/90 leading-relaxed">
              {{ t('about.vision') }}
            </p>
          </div>

          <div class="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
            <div
              class="rounded-2xl border border-text/5 bg-white px-4 py-5 shadow-soft"
            >
              <div class="text-2xl font-semibold text-primary">2024</div>
              <div class="text-xs text-text/50 mt-1">
                {{ locale === 'ar' ? 'عام الإطلاق' : 'Launch year' }}
              </div>
            </div>
            <div
              class="rounded-2xl border border-text/5 bg-white px-4 py-5 shadow-soft"
            >
              <div class="text-2xl font-semibold text-secondary">45k+</div>
              <div class="text-xs text-text/50 mt-1">
                {{
                  locale === 'ar'
                    ? 'جلسة رعاية ميسّرة'
                    : 'Care sessions powered'
                }}
              </div>
            </div>
            <div
              class="rounded-2xl border border-text/5 bg-white px-4 py-5 shadow-soft"
            >
              <div class="text-2xl font-semibold text-accent">60+</div>
              <div class="text-xs text-text/50 mt-1">
                {{ locale === 'ar' ? 'منشآت متصلة' : 'Connected facilities' }}
              </div>
            </div>
          </div>

          <!-- Location Badge -->
          <!-- <div class="pt-6">
            <div
              class="inline-flex items-center gap-3 px-5 py-3 bg-white rounded-xl shadow-soft border border-text/5"
            >
              <svg
                class="w-5 h-5 text-secondary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                />
              </svg>
              <span class="font-medium text-text">{{
                t('footer.location')
              }}</span>
            </div>
          </div> -->
        </div>

        <!-- Interactive Map -->
        <div
          class="relative w-full md:max-w-3xl lg:max-w-4xl transform mt-10 md:mt-0"
          :class="[
            isArabic
              ? 'md:translate-x-14 lg:translate-x-20 md:pe-10 lg:pe-14'
              : 'md:-translate-x-10 lg:-translate-x-16 md:ps-10 lg:ps-14',
            {
              'opacity-0': !isVisible,
              'animate-fade-in-up delay-200': isVisible,
            },
          ]"
        >
          <LibyaCoverageMap class="relative" />
        </div>
      </div>
    </div>
    <div
      class="absolute inset-x-0 bottom-0 md:h-3/7 h-1/4 bg-gradient-to-t from-white via-white/50 to-transparent"
    ></div>
  </section>
</template>
