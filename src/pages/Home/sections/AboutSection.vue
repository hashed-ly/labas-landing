<script setup>
import { useI18n } from '../../../composables/useI18n';
import { useIntersectionObserver } from '../../../composables/useIntersectionObserver';

const { t } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver();
</script>

<template>
  <section
    id="about-brief"
    ref="targetRef"
    class="py-32 bg-gradient-to-br from-bg via-white to-bg relative overflow-hidden"
  >
    <!-- Decorative Elements -->
    <div
      class="absolute top-10 start-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"
      aria-hidden="true"
    ></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="max-w-4xl mx-auto">
        <div
          class="text-center mb-12"
          :class="{ 'opacity-0': !isVisible, 'animate-fade-in-up': isVisible }"
        >
          <h2 class="text-4xl md:text-5xl font-bold text-text mb-6">
            {{ t('about.title') }}
          </h2>
        </div>

        <div
          class="bg-white rounded-2xl p-8 md:p-12 shadow-soft"
          :class="{
            'opacity-0': !isVisible,
            'animate-fade-in-up delay-200': isVisible,
          }"
        >
          <p class="text-lg text-text/80 leading-relaxed text-center mb-8">
            {{ t('about.description') }}
          </p>

          <div class="grid md:grid-cols-3 gap-8 mt-12">
            <div class="text-center">
              <div
                class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  class="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-text mb-2">
                {{ t('about.forPatients') }}
              </h3>
              <p class="text-text/70">
                {{ t('about.patientsDesc') }}
              </p>
            </div>

            <div class="text-center">
              <div
                class="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  class="w-8 h-8 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-text mb-2">
                {{ t('about.forDoctors') }}
              </h3>
              <p class="text-text/70">
                {{ t('about.doctorsDesc') }}
              </p>
            </div>

            <div class="text-center">
              <div
                class="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  class="w-8 h-8 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-text mb-2">
                {{ t('about.forHospitals') }}
              </h3>
              <p class="text-text/70">
                {{ t('about.hospitalsDesc') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

