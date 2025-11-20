<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { APP_LINKS } from '../../constants';

const { t, locale, toggleLocale } = useI18n();

const currentYear = new Date().getFullYear();
const mobileMenuOpen = ref(false);
const isScrolled = ref(false);

// Handle scroll for frosted glass effect
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- This page is self-contained with its own header and footer -->
    <main class="flex-grow bg-gradient-to-br from-bg via-white to-bg">
      <div class="container mx-auto px-4 sm:px-6 py-16">
        <div class="max-w-4xl mx-auto">
          <!-- Header -->
          <div class="text-center mb-12">
            <div class="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span class="text-sm font-medium text-primary">{{
                t('terms.badge')
              }}</span>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold text-text mb-4">
              {{ t('terms.title') }}
            </h1>
            <p class="text-text/60">{{ t('terms.effectiveDate') }}</p>
          </div>

          <!-- Content -->
          <div class="bg-white rounded-2xl shadow-soft p-8 md:p-12 space-y-8">
            <!-- Ownership Statement -->
            <div
              class="bg-accent/10 border-s-4 border-accent rounded-lg p-6 mb-8"
            >
              <p class="text-text/90 leading-relaxed mb-0">
                {{ t('terms.ownership') }}
              </p>
            </div>

            <!-- Terms Sections -->
            <section v-for="i in 22" :key="i">
              <h2 class="text-2xl font-bold text-text mb-4">
                {{ t(`terms.section${i}.title`) }}
              </h2>
              <p class="text-text/80 leading-relaxed">
                {{ t(`terms.section${i}.description`) }}
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

