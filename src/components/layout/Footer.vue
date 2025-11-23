<script setup>
import { useI18n } from '../../composables/useI18n';

const { t, locale } = useI18n();

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-primary text-white pt-16 pb-8">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <!-- About -->
        <div class="space-y-4">
          <img
            src="/images/logos/logo-horizontal-white.svg"
            alt="لا باس - La Bas"
            class="h-10 mb-4"
          />
          <p class="text-white/70 leading-relaxed">
            {{ t('about.description') }}
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-bold mb-4">
            {{ locale === 'ar' ? 'روابط سريعة' : 'Quick Links' }}
          </h3>
          <ul class="space-y-3">
            <li>
              <a
                href="/#about-brief"
                class="text-white/70 hover:text-white transition-colors"
              >
                {{ t('footer.about') }}
              </a>
            </li>
            <li>
              <a
                href="/#features"
                class="text-white/70 hover:text-white transition-colors"
              >
                {{ t('nav.features') }}
              </a>
            </li>
            <li>
              <a
                href="/#solutions"
                class="text-white/70 hover:text-white transition-colors"
              >
                {{ t('nav.solutions') }}
              </a>
            </li>
            <li>
              <a
                href="/#contact"
                class="text-white/70 hover:text-white transition-colors"
              >
                {{ t('footer.contact') }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="text-lg font-bold mb-4">
            {{ locale === 'ar' ? 'قانوني' : 'Legal' }}
          </h3>
          <ul class="space-y-3">
            <li>
              <a
                href="/v1/Privacy-and-Policy"
                class="text-white/70 hover:text-white transition-colors"
              >
                {{ t('footer.privacy') }}
              </a>
            </li>
            <li>
              <a
                href="/v1/terms-of-use"
                class="text-white/70 hover:text-white transition-colors"
              >
                {{ t('footer.terms') }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-bold mb-4">
            {{ locale === 'ar' ? 'تواصل معنا' : 'Contact Us' }}
          </h3>
          <ul class="space-y-3">
            <li>
              <a
                href="mailto:info@labas.ly"
                class="text-white/70 hover:text-white transition-colors"
              >
                info@labas.ly
              </a>
            </li>
            <li>
              <a
                :href="`tel:${t('contact.phone').replace(/[\s-]/g, '')}`"
                class="text-white/70 hover:text-white transition-colors"
                dir="ltr"
              >
                {{ t('contact.phone') }}
              </a>
            </li>
            <li>
              <a
                :href="`tel:${t('contact.phone2').replace(/[\s-]/g, '')}`"
                class="text-white/70 hover:text-white transition-colors"
                dir="ltr"
              >
                {{ t('contact.phone2') }}
              </a>
            </li>
            <li>
              <p class="text-white/70">{{ t('footer.location') }}</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <p class="text-white/70 text-sm text-center md:text-start">
          {{ t('footer.copyright').replace('2025', currentYear.toString()) }}
        </p>

        <!-- Social Links -->
        <div class="flex gap-4">
          <a
            href="https://www.facebook.com/LabasAppLy"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Facebook"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/labasapply"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Instagram"
          >
            <svg
              fill="currentColor"
              aria-hidden="true"
              class="size-6"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.9 4.9 0 0 1 1.772 1.153 4.9 4.9 0 0 1 1.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.9 4.9 0 0 1-1.153 1.772 4.9 4.9 0 0 1-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.9 4.9 0 0 1-1.772-1.153 4.9 4.9 0 0 1-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.9 4.9 0 0 1 1.153-1.772A4.9 4.9 0 0 1 5.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748s-.566.683-.748 1.15c-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748s.566-.683.748-1.15c.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.1 3.1 0 0 0-.748-1.15 3.1 3.1 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058M12 6.865a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27m0 1.802a3.333 3.333 0 1 0 0 6.666 3.333 3.333 0 0 0 0-6.666m5.338-3.205a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4"
                clip-rule="evenodd"
              />
            </svg>
          </a>
          <a
            href="https://x.com/LabasAppLy"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="X (Twitter)"
          >
            <svg
              fill="currentColor"
              aria-hidden="true"
              class="size-6"
              viewBox="0 0 24 24"
            >
              <path
                d="M13.682 10.622 20.24 3h-1.554l-5.693 6.618L8.445 3H3.2l6.876 10.007L3.2 21h1.554l6.012-6.989L15.57 21h5.244zm-2.128 2.474-.697-.997-5.543-7.93H7.7l4.473 6.4.697.996 5.815 8.319H16.3z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

