<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from '../../composables/useI18n';
import { APP_LINKS } from '../../constants';
import Dropdown from '../ui/Dropdown.vue';

const { t, locale, toggleLocale } = useI18n();
const route = useRoute();
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
  <header
    class="fixed top-0 start-0 end-0 transition-all duration-300"
    style="z-index: var(--z-fixed)"
    :class="
      (isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm'
        : 'md:bg-transparent bg-white',
      route.name === 'solutions-app' && !isScrolled
        ? 'text-white bg-gradient-to-b from-primary to-transparent backdrop-blur-md shadow-sm'
        : 'text-text bg-white/95 backdrop-blur-md shadow-sm')
    "
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Logo + Desktop Navigation -->
        <div class="flex items-center gap-12">
          <a href="/" class="flex items-center">
            <img
              :src="
                route.name === 'solutions-app' && !isScrolled
                  ? '/images/logos/logo-horizontal-cw.svg'
                  : '/images/logos/logo-horizontal.svg'
              "
              alt="لا باس - La Bas"
              class="h-8"
            />
          </a>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-8">
            <a
              href="/#about-brief"
              class="text-md font-medium text-text/70 hover:text-text transition-colors"
            >
              {{ t('nav.about') }}
            </a>
            <a
              href="/#features"
              class="text-md font-medium text-text/70 hover:text-text transition-colors"
            >
              {{ t('nav.features') }}
            </a>
            <!-- Solutions Dropdown -->
            <Dropdown
              trigger="hover"
              :placement="locale === 'ar' ? 'bottom-end' : 'bottom-start'"
              :align="locale === 'ar' ? 'end' : 'start'"
            >
              <template #trigger="{ isOpen }">
                <button
                  type="button"
                  class="flex items-center gap-1 text-md font-medium transition-colors"
                  :class="{
                    'text-white': route.name === 'solutions-app' && !isScrolled,
                    'text-text':
                      (isOpen && route.name !== 'solutions-app') ||
                      (route.name === 'solutions-app' && isScrolled),
                    'text-white': route.name === 'solutions-app' && isScrolled,
                  }"
                >
                  <span
                    :class="{
                      'text-text/70':
                        route.name !== 'solutions-app' || isScrolled,
                    }"
                    >{{ t('nav.solutions') }}</span
                  >
                  <svg
                    class="w-4 h-4 transition-transform duration-200"
                    :class="{ 'rotate-180': isOpen }"
                    fill="none"
                    :stroke="
                      route.name === 'solutions-app' && !isScrolled
                        ? 'white'
                        : 'black'
                    "
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </template>
              <template #content="{ handleItemClick }">
                <a
                  href="/solutions/app"
                  class="block px-4 py-2.5 text-sm text-text/70 hover:text-text hover:bg-bg transition-colors"
                  @click="handleItemClick({ href: '/solutions/app' })"
                >
                  {{ t('nav.solutionsApp') }}
                </a>
                <a
                  href="/solutions/dashboard"
                  class="block px-4 py-2.5 text-sm text-text/70 hover:text-text hover:bg-bg transition-colors"
                  @click="handleItemClick({ href: '/solutions/dashboard' })"
                >
                  {{ t('nav.solutionsDashboard') }}
                </a>
              </template>
            </Dropdown>
            <a
              href="/contact"
              class="text-md font-medium hover:text-text transition-colors"
            >
              {{ t('nav.contact') }}
            </a>
          </nav>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center gap-3">
          <!-- Download Button -->
          <a
            :href="APP_LINKS.onelink"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden md:inline-flex px-5 py-2 bg-primary !text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {{ locale === 'ar' ? 'تحميل التطبيق' : 'Download App' }}
          </a>

          <!-- Language Toggle -->
          <button
            @click="toggleLocale"
            class="p-2 hover:text-text transition-colors rounded-lg hover:bg-bg"
            :aria-label="
              locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'
            "
          >
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
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
          </button>

          <!-- Mobile Menu Button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 text-text/70 hover:text-text transition-colors rounded-lg hover:bg-bg"
            :class="
              route.name === 'solutions-app' && !isScrolled
                ? 'text-white bg-gradient-to-b from-primary to-transparent backdrop-blur-md shadow-sm '
                : 'text-text'
            "
            aria-label="Toggle menu"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <nav
          v-show="mobileMenuOpen"
          class="md:hidden py-4 border-t border-text/10"
        >
          <div class="flex flex-col gap-2">
            <a
              href="/#about-brief"
              class="px-4 py-3 text-text/70 hover:text-text hover:bg-bg rounded-lg transition-colors"
              @click="mobileMenuOpen = false"
            >
              {{ t('nav.about') }}
            </a>
            <a
              href="/#features"
              class="px-4 py-3 text-text/70 hover:text-text hover:bg-bg rounded-lg transition-colors"
              @click="mobileMenuOpen = false"
            >
              {{ t('nav.features') }}
            </a>
            <div class="px-4 py-2">
              <p class="text-sm font-semibold text-text/50 mb-1">
                {{ t('nav.solutions') }}
              </p>
              <a
                href="/solutions/app"
                class="block px-4 py-2 text-sm text-text/70 hover:text-text hover:bg-bg rounded-lg transition-colors"
                @click="mobileMenuOpen = false"
              >
                {{ t('nav.solutionsApp') }}
              </a>
              <a
                href="/solutions/dashboard"
                class="block px-4 py-2 text-sm text-text/70 hover:text-text hover:bg-bg rounded-lg transition-colors"
                @click="mobileMenuOpen = false"
              >
                {{ t('nav.solutionsDashboard') }}
              </a>
            </div>
            <a
              href="/#contact"
              class="px-4 py-3 text-text/70 hover:text-text hover:bg-bg rounded-lg transition-colors"
              @click="mobileMenuOpen = false"
            >
              {{ t('nav.contact') }}
            </a>
            <a
              :href="APP_LINKS.onelink"
              target="_blank"
              rel="noopener noreferrer"
              class="mx-4 mt-2 px-4 py-3 bg-primary !text-white text-center rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              {{ locale === 'ar' ? 'تحميل التطبيق' : 'Download App' }}
            </a>
          </div>
        </nav>
      </Transition>
    </div>
  </header>
</template>
