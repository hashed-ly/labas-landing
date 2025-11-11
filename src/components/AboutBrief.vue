<script setup>
import { useI18n } from '../composables/useI18n';
import { useIntersectionObserver } from '../composables/useIntersectionObserver';

const { t, locale } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver({ threshold: 0.2 });
</script>

<template>
  <section
    id="about"
    class="py-32 bg-bg transition-all duration-700 overflow-hidden"
    ref="targetRef"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div
        class="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center max-w-6xl mx-auto pb-12 md:pb-0"
      >
        <!-- Text Content -->
        <div
          class="space-y-6"
          :class="{ 'opacity-0': !isVisible, 'animate-fade-in-up': isVisible }"
        >
          <h2 class="text-4xl md:text-5xl font-bold text-text leading-tight">
            {{ t('about.title') }}
          </h2>

          <p class="text-lg text-text/80 leading-relaxed">
            {{ t('about.description') }}
          </p>

          <p class="text-lg text-text/80 leading-relaxed">
            {{ t('about.paragraph1') }}
          </p>

          <div class="pt-4 ps-6 border-s-4 border-secondary">
            <p class="text-lg font-medium text-text/90 leading-relaxed">
              {{ t('about.vision') }}
            </p>
          </div>

          <!-- Location Badge -->
          <div class="pt-6">
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
          </div>
        </div>

        <!-- Illustration/Map Side -->
        <div
          class="relative mb-8 md:mb-0"
          :class="{
            'opacity-0': !isVisible,
            'animate-fade-in-up delay-200': isVisible,
          }"
        >
          <!-- Map/Illustration -->
          <div class="relative">
            <div
              class="aspect-square bg-gradient-to-br from-secondary/10 via-primary/5 to-accent/10 rounded-2xl flex items-center justify-center relative overflow-hidden p-8"
            >
              <!-- Libya Map SVG -->
              <div
                class="relative w-full h-full flex items-center justify-center"
              >
                <img
                  src="/Libya/ly.svg"
                  alt="Libya Map"
                  class="w-full h-full object-contain opacity-30"
                  style="
                    filter: brightness(0) saturate(100%) invert(20%) sepia(50%)
                      saturate(2000%) hue-rotate(180deg);
                  "
                />
              </div>

              <!-- Benghazi Marker (positioned in northeastern Libya, coastal) -->
              <div class="absolute top-[14%] end-[62%]">
                <div class="relative">
                  <!-- Pulsing ring -->
                  <div
                    class="w-8 h-8 bg-secondary/30 rounded-full animate-ping absolute -inset-2"
                  ></div>
                  <!-- Marker pin -->
                  <div class="relative z-10">
                    <svg
                      class="w-8 h-8 text-secondary drop-shadow-lg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      />
                    </svg>
                  </div>
                  <!-- Label -->
                  <div
                    class="absolute top-10 start-1/2 -translate-x-1/2 whitespace-nowrap"
                  >
                    <span
                      class="text-xs font-semibold text-secondary bg-white px-2 py-1 rounded shadow-sm"
                    >
                      {{ locale === 'ar' ? 'بنغازي' : 'Benghazi' }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Decorative Elements -->
              <div
                class="absolute top-4 end-4 w-20 h-20 bg-accent/20 rounded-full blur-2xl"
              ></div>
              <div
                class="absolute bottom-4 start-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl"
              ></div>
            </div>

            <!-- Stats Badge -->
            <div
              class="absolute -bottom-6 sm:-bottom-4 start-2 end-2 sm:start-4 sm:end-4 md:start-1/2 md:-translate-x-1/2 md:w-auto md:max-w-xs"
            >
              <div
                class="bg-white rounded-xl shadow-lg border border-text/5 p-3 sm:p-4 mx-auto max-w-xs"
              >
                <div
                  class="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 text-center"
                >
                  <div>
                    <div
                      class="text-lg sm:text-xl md:text-2xl font-bold text-primary"
                    >
                      2024
                    </div>
                    <div
                      class="text-[9px] sm:text-[10px] md:text-xs text-text/60"
                    >
                      {{ locale === 'ar' ? 'التأسيس' : 'Founded' }}
                    </div>
                  </div>
                  <div>
                    <div
                      class="text-lg sm:text-xl md:text-2xl font-bold text-secondary"
                    >
                      1k+
                    </div>
                    <div
                      class="text-[9px] sm:text-[10px] md:text-xs text-text/60"
                    >
                      {{ locale === 'ar' ? 'مستخدم' : 'Users' }}
                    </div>
                  </div>
                  <div>
                    <div
                      class="text-lg sm:text-xl md:text-2xl font-bold text-accent"
                    >
                      50+
                    </div>
                    <div
                      class="text-[9px] sm:text-[10px] md:text-xs text-text/60"
                    >
                      {{ locale === 'ar' ? 'مركز' : 'Clinics' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
