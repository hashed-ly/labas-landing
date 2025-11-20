<script setup>
import { useI18n } from '../../../composables/useI18n';
import { useIntersectionObserver } from '../../../composables/useIntersectionObserver';

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

    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <!-- Text Content -->
          <div
            class="text-center md:text-start space-y-6 md:space-y-8 order-2 md:order-1"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up': isVisible,
            }"
          >
            <h2
              class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            >
              <span>{{ t('cta.title') }}</span>
              <br />
              <span>{{ t('cta.titleSuffix') }}</span>
            </h2>

            <p
              class="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed"
            >
              {{ t('hero.subtitle') }}
            </p>

            <div
              class="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 pt-4 md:pt-8"
            >
              <a
                href="https://apps.apple.com/ly/app/%D9%84%D8%A7%D8%A8%D8%A7%D8%B3-labas-appointments/id6746457351"
                class="inline-block"
                aria-label="Download on the App Store"
              >
                <img
                  src="/images/icons/App Store.svg"
                  alt="Download on the App Store"
                  class="h-10 sm:h-12 md:h-14"
                />
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=ly.labas.app"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block"
                aria-label="Get it on Google Play"
              >
                <img
                  src="/images/icons/Google Play.svg"
                  alt="Get it on Google Play"
                  class="h-10 sm:h-12 md:h-14"
                />
              </a>
            </div>
          </div>

          <!-- iPhone Mockup -->
          <div
            class="relative flex justify-center order-1 md:order-2 mb-8 md:mb-0"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up delay-200': isVisible,
            }"
          >
            <div class="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
              <img
                src="/images/screenshots/Screens.png"
                alt="Labas App"
                class="w-full h-auto object-contain drop-shadow-2xl"
                loading="lazy"
              />
              <!-- Glow Effect -->
              <div
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 sm:h-32 bg-gradient-to-t from-white/20 via-accent/10 to-transparent blur-3xl -z-10"
                aria-hidden="true"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

