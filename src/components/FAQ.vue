<script setup>
import { ref } from 'vue';
import { useI18n } from '../composables/useI18n';
import { useIntersectionObserver } from '../composables/useIntersectionObserver';

const { t } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver({ threshold: 0.2 });

const faqs = [
  { key: 'appointments' },
  { key: 'security' },
  { key: 'records' },
  { key: 'support' },
  { key: 'organizations' },
  { key: 'cost' },
];

const openItem = ref(null);

const toggle = (key) => {
  openItem.value = openItem.value === key ? null : key;
};
</script>

<template>
  <section
    id="faq"
    class="py-32 bg-white transition-all duration-700"
    ref="targetRef"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div
        class="max-w-3xl mx-auto text-center space-y-4 mb-16"
        :class="{ 'opacity-0': !isVisible, 'animate-fade-in-up': isVisible }"
      >
        <div class="inline-block px-4 py-2 bg-accent/10 rounded-full mb-4">
          <span class="text-sm font-medium text-accent">
            {{ t('faq.badge') }}
          </span>
        </div>

        <h2 class="text-4xl md:text-5xl font-bold text-text">
          {{ t('faq.title') }}
        </h2>

        <p class="text-lg text-text/70 leading-relaxed">
          {{ t('faq.subtitle') }}
        </p>
      </div>

      <!-- FAQ Accordion -->
      <div class="max-w-3xl mx-auto">
        <div
          v-for="(faq, index) in faqs"
          :key="faq.key"
          class="border-b border-text/10"
          :class="{
            'opacity-0': !isVisible,
            'animate-fade-in-up': isVisible,
            'delay-100': index === 0,
            'delay-200': index === 1,
            'delay-300': index === 2,
          }"
        >
          <h3>
            <button
              @click="toggle(faq.key)"
              type="button"
              class="flex items-center justify-between w-full py-5 font-medium text-start text-text hover:text-primary transition-colors"
            >
              <span class="text-lg">{{
                t(`faq.items.${faq.key}.question`)
              }}</span>
              <svg
                class="w-6 h-6 flex-shrink-0 transition-transform duration-200"
                :class="{ 'rotate-180': openItem === faq.key }"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </h3>

          <transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-96 opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="max-h-96 opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div v-show="openItem === faq.key" class="overflow-hidden">
              <div class="pb-5 text-text/70 leading-relaxed">
                {{ t(`faq.items.${faq.key}.answer`) }}
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- CTA at bottom -->
      <div
        class="mt-16 text-center"
        :class="{
          'opacity-0': !isVisible,
          'animate-fade-in-up delay-400': isVisible,
        }"
      >
        <p class="text-text/70 mb-4">
          {{ t('faq.stillHaveQuestions') }}
        </p>
        <a
          href="#contact"
          class="inline-flex items-center gap-2 px-6 py-3 bg-primary !text-white rounded-lg font-medium hover:bg-primary/90 transition-colors mt-3"
        >
          {{ t('faq.contactUs') }}
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>
