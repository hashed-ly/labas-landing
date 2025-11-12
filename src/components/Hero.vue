<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useI18n } from '../composables/useI18n';

const { t, locale } = useI18n();

const heroRef = ref<HTMLElement | null>(null);
const screensVisible = ref(false);
const copyStages = ref([false, false, false, false]);

let observer: IntersectionObserver | null = null;
let animationStarted = false;
const timeouts: number[] = [];

const startAnimations = () => {
  if (animationStarted) return;
  animationStarted = true;

  const reduceMotionQuery = window.matchMedia?.(
    '(prefers-reduced-motion: reduce)'
  );
  if (reduceMotionQuery?.matches) {
    copyStages.value = copyStages.value.map(() => true);
    screensVisible.value = true;
    return;
  }

  timeouts.push(
    window.setTimeout(() => {
      copyStages.value.forEach((_, index) => {
        timeouts.push(
          window.setTimeout(() => {
            copyStages.value[index] = true;
          }, index * 400)
        );
      });

      timeouts.push(
        window.setTimeout(() => {
          screensVisible.value = true;
        }, 500)
      );
    }, 500)
  );
};

onMounted(() => {
  if ('IntersectionObserver' in window && heroRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimations();
            observer?.disconnect();
          }
        });
      },
      { threshold: 0.6, rootMargin: '-10% 0px -25% 0px' }
    );

    observer.observe(heroRef.value);
  } else {
    startAnimations();
  }
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;

  timeouts.forEach((id) => window.clearTimeout(id));
  timeouts.length = 0;
});
</script>

<template>
  <section
    ref="heroRef"
    class="relative bg-gradient-to-br from-bg via-white to-bg overflow-hidden lg:max-h-screen"
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
        <div
          class="text-center mb-16 md:mb-20 space-y-6 md:space-y-12 max-w-3xl mx-auto flex flex-col items-center"
        >
          <div
            class="inline-block px-4 py-2 bg-primary/5 rounded-full mb-4 hero-copy"
            :class="{ 'hero-copy--visible': copyStages[0] }"
          >
            <span class="text-sm font-medium text-primary">{{
              locale === 'ar' ? 'مرحبًا بكم' : 'Welcome'
            }}</span>
          </div>

          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight hero-copy"
            :class="{ 'hero-copy--visible': copyStages[1] }"
          >
            {{ t('hero.title') }}
          </h1>

          <p
            class="text-lg md:text-xl text-center md:text-center lg:text-center text-text/70 leading-relaxed max-w-2xl w-full mx-auto hero-copy"
            :class="{ 'hero-copy--visible': copyStages[2] }"
          >
            {{ t('hero.subtitle') }}
          </p>

          <!-- Download Buttons -->
          <div
            class="flex flex-wrap justify-center gap-4 pt-6 hero-copy"
            :class="{ 'hero-copy--visible': copyStages[3] }"
          >
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
          class="relative flex justify-center items-end gap-2 sm:gap-4 md:gap-6 max-w-5xl mx-auto px-0 sm:px-4"
        >
          <!-- Left Phone -->
          <div
            class="w-[42%] sm:w-[30%] max-w-none sm:max-w-[280px] hero-screen"
            :class="{ 'hero-screen--visible': screensVisible }"
            :style="screensVisible ? { transitionDelay: '0.1s' } : undefined"
          >
            <img
              src="/images/screenshots/Asset 2.png"
              alt="Labas App - Screen 1"
              class="w-full h-auto drop-shadow-2xl"
              loading="eager"
            />
          </div>

          <!-- Center Phone (Largest) -->
          <div
            class="w-[58%] sm:w-[35%] max-w-none sm:max-w-[320px] relative z-10 -mt-2 sm:-mt-4 hero-screen"
            :class="{ 'hero-screen--visible': screensVisible }"
            :style="screensVisible ? { transitionDelay: '0.2s' } : undefined"
          >
            <img
              src="/images/screenshots/Asset 5.png"
              alt="Labas App - Screen 2"
              class="w-full h-auto drop-shadow-2xl"
              loading="eager"
            />
          </div>

          <!-- Right Phone -->
          <div
            class="w-[42%] sm:w-[30%] max-w-none sm:max-w-[280px] hero-screen"
            :class="{ 'hero-screen--visible': screensVisible }"
            :style="screensVisible ? { transitionDelay: '0.3s' } : undefined"
          >
            <img
              src="/images/screenshots/Asset 8.png"
              alt="Labas App - Screen 3"
              class="w-full h-auto drop-shadow-2xl"
              loading="eager"
            />
          </div>

          <!-- Glow Effect -->
          <div
            class="absolute -bottom-10 sm:-bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-24 sm:h-32 bg-radial-to-t from-accent/80 via-accent/70 to-transparent blur-3xl -z-10"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </div>

    <!-- Fade Clip Overlay -->
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/70 to-transparent"
      aria-hidden="true"
    ></div>
  </section>
</template>

<style scoped>
.hero-copy {
  opacity: 0;
  transform: translateY(1.5rem);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.hero-copy--visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-screen {
  opacity: 0;
  transform: translateY(3rem);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.hero-screen--visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .hero-copy,
  .hero-copy--visible,
  .hero-screen,
  .hero-screen--visible {
    transition: none;
    transform: none;
    opacity: 1;
  }
}
</style>
