<script setup>
import { useI18n } from '../../../composables/useI18n';
import { useIntersectionObserver } from '../../../composables/useIntersectionObserver';

const { t } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });
</script>

<template>
  <section
    class="relative max-h-screen py-24 md:py-32 bg-gradient-to-br from-secondary via-primary to-primary text-white overflow-hidden transition-all duration-700"
    ref="targetRef"
  >
    <!-- Decorative Elements -->
    <div
      class="absolute top-10 start-4 w-48 h-48 sm:top-20 sm:start-10 sm:w-72 sm:h-72 bg-white/5 rounded-full blur-3xl"
      aria-hidden="true"
    ></div>
    <div
      class="absolute bottom-10 end-4 w-64 h-64 sm:bottom-20 sm:end-10 sm:w-96 sm:h-96 bg-accent/10 rounded-full blur-3xl"
      aria-hidden="true"
    ></div>

    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          <!-- Text Content -->
          <div
            class="text-center md:text-start space-y-4 sm:space-y-6 md:-translate-y-20 md:space-y-8 order-2 md:order-1 z-50"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up': isVisible,
            }"
          >
            <h1
              class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            >
              {{ t('appPage.hero.title') }}
            </h1>

            <p
              class="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed"
            >
              {{ t('appPage.hero.subtitle') }}
            </p>

            <div
              class="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-4 md:pt-8"
            >
              <a
                href="https://apps.apple.com/ly/app/%D9%84%D8%A7%D8%A8%D8%A7%D8%B3-labas-appointments/id6746457351"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block"
                aria-label="Download on the App Store"
              >
                <img
                  src="/images/icons/App Store.svg"
                  alt="Download on the App Store"
                  class="h-9 sm:h-10 md:h-12 lg:h-14"
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
                  class="h-9 sm:h-10 md:h-12 lg:h-14"
                />
              </a>
            </div>
          </div>

          <!-- Phone Mockup -->
          <div
            class="relative flex justify-center order-1 md:order-2 mb-4 sm:mb-6 md:mb-0"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up delay-200': isVisible,
            }"
          >
            <div
              class="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg"
            >
              <img
                src="/images/screenshots/Phone - Home Screen.png"
                alt="Labas App"
                class="w-full h-auto object-contain"
                loading="eager"
              />
              <!-- Fade to hero background overlay -->
              <!-- <div
                class="absolute bottom-0 left-0 right-0 h-40 sm:h-48 md:h-56 lg:h-64 pointer-events-none"
                style="
                  background: linear-gradient(
                    to top,
                    #0b3954 0%,
                    #0b3954 20%,
                    rgba(11, 57, 84, 0.95) 40%,
                    rgba(11, 57, 84, 0.7) 60%,
                    rgba(11, 57, 84, 0.3) 80%,
                    transparent 100%
                  );
                  mask-image: linear-gradient(
                    to top,
                    black 0%,
                    black 15%,
                    rgba(0, 0, 0, 0.9) 35%,
                    rgba(0, 0, 0, 0.6) 55%,
                    rgba(0, 0, 0, 0.3) 75%,
                    transparent 100%
                  );
                  -webkit-mask-image: linear-gradient(
                    to top,
                    black 0%,
                    black 15%,
                    rgba(0, 0, 0, 0.9) 35%,
                    rgba(0, 0, 0, 0.6) 55%,
                    rgba(0, 0, 0, 0.3) 75%,
                    transparent 100%
                  );
                "
                aria-hidden="true"
              ></div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute inset-x-0 bottom-0 h-16 sm:h-20 md:h-1/5 bg-gradient-to-t from-primary to-transparent pointer-events-none z-10"
    ></div>
  </section>
</template>
