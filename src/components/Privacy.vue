<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from '../composables/useI18n';
import { APP_LINKS } from '../constants';

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
  <div class="min-h-screen">
    <!-- Navigation -->
    <header
      class="fixed top-0 start-0 end-0 z-50 transition-all duration-300"
      :class="
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
      "
    >
      <div class="container mx-auto px-4 sm:px-6">
        <div class="flex items-center justify-between h-16">
          <!-- Logo + Desktop Navigation -->
          <div class="flex items-center gap-12">
            <a href="/" class="flex items-center">
              <img
                src="/images/logos/logo-horizontal.svg"
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
              <a
                href="/#solutions"
                class="text-md font-medium text-text/70 hover:text-text transition-colors"
              >
                {{ t('nav.solutions') }}
              </a>
              <a
                href="/#contact"
                class="text-md font-medium text-text/70 hover:text-text transition-colors"
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
              class="p-2 text-text/70 hover:text-text transition-colors rounded-lg hover:bg-bg"
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
              class="md:hidden p-2 text-text/70 hover:text-text transition-colors"
              :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
            >
              <svg
                v-if="!mobileMenuOpen"
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                v-else
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
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
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div
            v-if="mobileMenuOpen"
            class="md:hidden py-4 border-t border-text/10"
          >
            <nav class="flex flex-col gap-1">
              <a
                href="/#about-brief"
                @click="mobileMenuOpen = false"
                class="px-4 py-3 text-sm font-medium text-text/70 hover:text-text hover:bg-bg rounded-lg transition-all"
              >
                {{ t('nav.about') }}
              </a>
              <a
                href="/#features"
                @click="mobileMenuOpen = false"
                class="px-4 py-3 text-sm font-medium text-text/70 hover:text-text hover:bg-bg rounded-lg transition-all"
              >
                {{ t('nav.features') }}
              </a>
              <a
                href="/#solutions"
                @click="mobileMenuOpen = false"
                class="px-4 py-3 text-sm font-medium text-text/70 hover:text-text hover:bg-bg rounded-lg transition-all"
              >
                {{ t('nav.solutions') }}
              </a>
              <a
                href="/#contact"
                @click="mobileMenuOpen = false"
                class="px-4 py-3 text-sm font-medium text-text/70 hover:text-text hover:bg-bg rounded-lg transition-all"
              >
                {{ t('nav.contact') }}
              </a>
              <div class="border-t border-text/10 my-2"></div>
              <a
                :href="APP_LINKS.onelink"
                target="_blank"
                rel="noopener noreferrer"
                @click="mobileMenuOpen = false"
                class="mx-4 px-4 py-3 bg-primary text-white text-sm font-medium rounded-lg text-center hover:bg-primary/90 transition-colors"
              >
                {{ locale === 'ar' ? 'تحميل التطبيق' : 'Download App' }}
              </a>
            </nav>
          </div>
        </transition>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <section class="py-32 bg-white">
        <div class="container mx-auto px-4 sm:px-6">
          <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-16">
              <div
                class="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4"
              >
                <span class="text-sm font-medium text-primary">
                  {{ t('privacy.badge') }}
                </span>
              </div>
              <h1 class="text-4xl md:text-5xl font-bold text-text mb-6">
                {{ t('privacy.title') }}
              </h1>
              <p class="text-lg text-text/70">
                {{ t('privacy.intro') }}
              </p>
            </div>

            <!-- Content -->
            <div class="prose prose-lg max-w-none">
              <!-- Ownership -->
              <div class="mb-12">
                <div
                  class="bg-accent/10 border-s-4 border-accent rounded-lg p-6 mb-8"
                >
                  <p class="text-text/90 leading-relaxed mb-0">
                    {{ t('privacy.ownership') }}
                  </p>
                </div>
              </div>

              <!-- Section 1: Information We Collect -->
              <div class="mb-12">
                <h2 class="text-2xl font-bold text-text mb-4">
                  {{ t('privacy.section1.title') }}
                </h2>
                <p class="text-text/80 leading-relaxed mb-6">
                  {{ t('privacy.section1.intro') }}
                </p>

                <div class="space-y-6">
                  <div>
                    <h3 class="text-xl font-semibold text-text mb-3">
                      {{ t('privacy.section1.registration.title') }}
                    </h3>
                    <ul class="list-disc list-inside space-y-2 text-text/80">
                      <li>
                        {{ t('privacy.section1.registration.items.name') }}
                      </li>
                      <li>
                        {{ t('privacy.section1.registration.items.phone') }}
                      </li>
                      <li>
                        {{ t('privacy.section1.registration.items.city') }}
                      </li>
                      <li>
                        {{ t('privacy.section1.registration.items.bloodType') }}
                      </li>
                      <li>
                        {{ t('privacy.section1.registration.items.password') }}
                      </li>
                      <li>
                        {{ t('privacy.section1.registration.items.picture') }}
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 class="text-xl font-semibold text-text mb-3">
                      {{ t('privacy.section1.location.title') }}
                    </h3>
                    <p class="text-text/80 leading-relaxed">
                      {{ t('privacy.section1.location.description') }}
                    </p>
                  </div>

                  <div>
                    <h3 class="text-xl font-semibold text-text mb-3">
                      {{ t('privacy.section1.payment.title') }}
                    </h3>
                    <p class="text-text/80 leading-relaxed">
                      {{ t('privacy.section1.payment.description') }}
                    </p>
                  </div>

                  <div>
                    <h3 class="text-xl font-semibold text-text mb-3">
                      {{ t('privacy.section1.documents.title') }}
                    </h3>
                    <p class="text-text/80 leading-relaxed">
                      {{ t('privacy.section1.documents.description') }}
                    </p>
                  </div>

                  <div>
                    <h3 class="text-xl font-semibold text-text mb-3">
                      {{ t('privacy.section1.other.title') }}
                    </h3>
                    <p class="text-text/80 leading-relaxed">
                      {{ t('privacy.section1.other.description') }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Section 2: How We Use Your Information -->
              <div class="mb-12">
                <h2 class="text-2xl font-bold text-text mb-4">
                  {{ t('privacy.section2.title') }}
                </h2>
                <p class="text-text/80 leading-relaxed mb-6">
                  {{ t('privacy.section2.intro') }}
                </p>
                <ul class="space-y-3">
                  <li class="flex items-start gap-3">
                    <svg
                      class="w-6 h-6 text-secondary shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-text/80">{{
                      t('privacy.section2.uses.services')
                    }}</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg
                      class="w-6 h-6 text-secondary shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-text/80">{{
                      t('privacy.section2.uses.communication')
                    }}</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg
                      class="w-6 h-6 text-secondary shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-text/80">{{
                      t('privacy.section2.uses.improvement')
                    }}</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg
                      class="w-6 h-6 text-secondary shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-text/80">{{
                      t('privacy.section2.uses.marketing')
                    }}</span>
                  </li>
                </ul>
              </div>

              <!-- Section 3: Sharing Your Information -->
              <div class="mb-12">
                <h2 class="text-2xl font-bold text-text mb-4">
                  {{ t('privacy.section3.title') }}
                </h2>
                <p class="text-text/80 leading-relaxed mb-4">
                  {{ t('privacy.section3.intro') }}
                </p>
                <ul class="space-y-2 mb-6 text-text/80">
                  <li>• {{ t('privacy.section3.parties.providers') }}</li>
                  <li>• {{ t('privacy.section3.parties.suppliers') }}</li>
                  <li>• {{ t('privacy.section3.parties.government') }}</li>
                </ul>
                <div class="bg-bg rounded-lg p-6">
                  <h3 class="text-lg font-semibold text-text mb-3">
                    {{ t('privacy.section3.confidentiality.title') }}
                  </h3>
                  <p class="text-text/80 leading-relaxed mb-3">
                    {{ t('privacy.section3.confidentiality.standards') }}
                  </p>
                  <p class="text-text/80 leading-relaxed">
                    {{ t('privacy.section3.confidentiality.noSale') }}
                  </p>
                </div>
              </div>

              <!-- Section 4: Information Security -->
              <div class="mb-12">
                <h2 class="text-2xl font-bold text-text mb-4">
                  {{ t('privacy.section4.title') }}
                </h2>
                <p class="text-text/80 leading-relaxed mb-6">
                  {{ t('privacy.section4.intro') }}
                </p>
                <ul class="space-y-2 mb-6 text-text/80">
                  <li>• {{ t('privacy.section4.measures.encryption') }}</li>
                  <li>• {{ t('privacy.section4.measures.passwords') }}</li>
                  <li>• {{ t('privacy.section4.measures.monitoring') }}</li>
                </ul>
                <p class="text-text/70 text-sm italic">
                  {{ t('privacy.section4.disclaimer') }}
                </p>
                <p class="text-text/80 leading-relaxed mt-4">
                  {{ t('privacy.section4.management') }}
                </p>
              </div>

              <!-- Section 5: User Rights -->
              <div class="mb-12">
                <h2 class="text-2xl font-bold text-text mb-4">
                  {{ t('privacy.section5.title') }}
                </h2>
                <div class="grid md:grid-cols-2 gap-6">
                  <div class="bg-bg rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-text mb-2">
                      {{ t('privacy.section5.rights.access.title') }}
                    </h3>
                    <p class="text-text/70 text-sm">
                      {{ t('privacy.section5.rights.access.description') }}
                    </p>
                  </div>
                  <div class="bg-bg rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-text mb-2">
                      {{ t('privacy.section5.rights.modify.title') }}
                    </h3>
                    <p class="text-text/70 text-sm">
                      {{ t('privacy.section5.rights.modify.description') }}
                    </p>
                  </div>
                  <div class="bg-bg rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-text mb-2">
                      {{ t('privacy.section5.rights.delete.title') }}
                    </h3>
                    <p class="text-text/70 text-sm">
                      {{ t('privacy.section5.rights.delete.description') }}
                    </p>
                  </div>
                  <div class="bg-bg rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-text mb-2">
                      {{ t('privacy.section5.rights.unsubscribe.title') }}
                    </h3>
                    <p class="text-text/70 text-sm">
                      {{ t('privacy.section5.rights.unsubscribe.description') }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Remaining Sections -->
              <div class="space-y-12">
                <div>
                  <h2 class="text-2xl font-bold text-text mb-4">
                    {{ t('privacy.section6.title') }}
                  </h2>
                  <p class="text-text/80 leading-relaxed">
                    {{ t('privacy.section6.description') }}
                  </p>
                </div>

                <div>
                  <h2 class="text-2xl font-bold text-text mb-4">
                    {{ t('privacy.section7.title') }}
                  </h2>
                  <p class="text-text/80 leading-relaxed">
                    {{ t('privacy.section7.description') }}
                  </p>
                </div>

                <div>
                  <h2 class="text-2xl font-bold text-text mb-4">
                    {{ t('privacy.section8.title') }}
                  </h2>
                  <p class="text-text/80 leading-relaxed">
                    {{ t('privacy.section8.description') }}
                  </p>
                </div>

                <div>
                  <h2 class="text-2xl font-bold text-text mb-4">
                    {{ t('privacy.section9.title') }}
                  </h2>
                  <p class="text-text/80 leading-relaxed mb-4">
                    {{ t('privacy.section9.intro') }}
                  </p>
                  <ul class="space-y-2 text-text/80">
                    <li>
                      • {{ t('privacy.section9.contact.email') }}:
                      support@labas.ly
                    </li>
                    <li>
                      • {{ t('privacy.section9.contact.phone1') }}:
                      <span dir="ltr">+218 91-057 9911</span>
                    </li>
                    <li>
                      • {{ t('privacy.section9.contact.phone2') }}:
                      <span dir="ltr">+218 92-057 9911</span>
                    </li>
                    <li>• {{ t('privacy.section9.contact.app') }}</li>
                  </ul>
                </div>

                <div>
                  <h2 class="text-2xl font-bold text-text mb-4">
                    {{ t('privacy.section10.title') }}
                  </h2>
                  <p class="text-text/80 leading-relaxed">
                    {{ t('privacy.section10.description') }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Back to Home CTA -->
            <div class="mt-16 text-center">
              <a
                href="/"
                class="inline-flex items-center gap-2 px-6 py-3 bg-primary !text-white rounded-lg font-medium hover:bg-primary/90 transition-colors mt-3"
              >
                <svg
                  class="w-5 h-5"
                  :class="locale === 'ar' ? '-rotate-90' : 'rotate-90'"
                  viewBox="0 0 1562 1177"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.9"
                    d="M975.964 201.508L584.2 587.435C475.289 694.724 473.974 869.988 581.262 978.9C688.551 1087.81 863.816 1089.13 972.727 981.838L1364.49 595.911C1473.4 488.622 1474.72 313.357 1367.43 204.446C1260.14 95.5347 1084.87 94.2194 975.964 201.508Z"
                    fill="white"
                  />
                  <path
                    opacity="0.9"
                    d="M194.264 585.728L580.19 977.491C687.479 1086.4 862.744 1087.72 971.655 980.429C1080.57 873.14 1081.88 697.875 974.593 588.964L588.666 197.201C481.378 88.2896 306.113 86.9741 197.202 194.263C88.2902 301.552 86.9748 476.816 194.264 585.728Z"
                    fill="white"
                  />
                </svg>
                {{
                  locale === 'ar'
                    ? 'العودة إلى الصفحة الرئيسية'
                    : 'Back to Home'
                }}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
