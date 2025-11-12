<script setup>
import { useI18n } from '../composables/useI18n';

const { t, locale } = useI18n();
</script>

<template>
  <section
    class="relative bg-gradient-to-br from-bg via-white to-bg overflow-hidden"
  >
    <!-- Decorative Elements -->
    <div
      class="absolute top-20 end-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
      aria-hidden="true"
    ></div>
    <div
      class="absolute bottom-20 start-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
      aria-hidden="true"
    ></div>

    <div class="container mx-auto px-4 sm:px-6 pt-32 pb-20">
      <div class="max-w-7xl mx-auto">
        <!-- Text Content -->
        <div class="text-center mb-16 md:mb-20 space-y-6 max-w-3xl mx-auto">
          <div class="inline-block px-4 py-2 bg-primary/5 rounded-full mb-4">
            <span class="text-sm font-medium text-primary">{{
              locale === 'ar' ? 'مرحبًا بكم' : 'Welcome'
            }}</span>
          </div>

          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight"
          >
            {{ t('hero.title') }}
          </h1>

          <p
            class="text-lg md:text-xl text-center text-text/70 leading-relaxed max-w-2xl mx-auto"
          >
            {{ t('hero.subtitle') }}
          </p>

          <!-- Download Buttons -->
          <div class="flex flex-wrap justify-center gap-4 pt-6">
            <a
              href="https://apps.apple.com/ly/app/%D9%84%D8%A7%D8%A8%D8%A7%D8%B3-labas-appointments/id6746457351"
              class="inline-block"
              aria-label="Download on the App Store"
            >
              <img
                src="/images/icons/App Store.svg"
                alt="Download on the App Store"
                class="h-12"
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
                class="h-12"
              />
            </a>
          </div>
        </div>

        <!-- Phone Mockups -->
        <div
          class="relative flex justify-center items-end gap-2 sm:gap-4 md:gap-6 max-w-5xl mx-auto px-4"
        >
          <!-- Left Phone -->
          <div class="w-[28%] sm:w-[30%] max-w-[280px]">
            <img
              src="/images/screenshots/Asset 2.png"
              alt="Labas App - Screen 1"
              class="w-full h-auto drop-shadow-2xl"
              loading="eager"
            />
          </div>

          <!-- Center Phone (Largest) -->
          <div
            class="w-[38%] sm:w-[35%] max-w-[320px] relative z-10 -mt-2 sm:-mt-4"
          >
            <img
              src="/images/screenshots/Asset 5.png"
              alt="Labas App - Screen 2"
              class="w-full h-auto drop-shadow-2xl"
              loading="eager"
            />
          </div>

          <!-- Right Phone -->
          <div class="w-[28%] sm:w-[30%] max-w-[280px]">
            <img
              src="/images/screenshots/Asset 8.png"
              alt="Labas App - Screen 3"
              class="w-full h-auto drop-shadow-2xl"
              loading="eager"
            />
          </div>

          <!-- Glow Effect -->
          <div
            class="absolute -bottom-10 sm:-bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-24 sm:h-32 bg-gradient-to-t from-primary/10 via-secondary/5 to-transparent blur-3xl -z-10"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>
