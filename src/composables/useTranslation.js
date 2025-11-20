import { ref, computed, onMounted } from 'vue';
import { fetchTranslations } from '../lib/sanity';

// Global state for translations
const translations = ref({ en: {}, ar: {} });
const currentLocale = ref('en');
const loading = ref(true);
const error = ref(null);

/**
 * Composable for managing translations from Sanity CMS
 * @returns {Object} Translation functions and state
 */
export function useTranslation() {
  // Load translations on first use
  const loadTranslations = async () => {
    try {
      loading.value = true;
      error.value = null;
      translations.value = await fetchTranslations();
    } catch (err) {
      error.value = err;
      console.error('Error loading translations:', err);
      // Fall back to empty translations
      translations.value = { en: {}, ar: {} };
    } finally {
      loading.value = false;
    }
  };

  // Load translations if not already loaded
  onMounted(() => {
    if (Object.keys(translations.value.en).length === 0) {
      loadTranslations();
    }
  });

  /**
   * Get translation by key
   * @param {string} key - Translation key (e.g., 'nav.about')
   * @param {string} fallback - Fallback text if translation not found
   * @returns {string} Translated text
   */
  const t = (key, fallback = key) => {
    if (!key) return fallback;

    const keys = key.split('.');
    let current = translations.value[currentLocale.value];

    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        return fallback;
      }
    }

    return current || fallback;
  };

  /**
   * Set current locale
   * @param {string} locale - Locale code ('en' or 'ar')
   */
  const setLocale = (locale) => {
    if (['en', 'ar'].includes(locale)) {
      currentLocale.value = locale;
      
      // Update document direction
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute(
          'dir',
          locale === 'ar' ? 'rtl' : 'ltr'
        );
        document.documentElement.setAttribute('lang', locale);
      }
    }
  };

  /**
   * Toggle between English and Arabic
   */
  const toggleLocale = () => {
    setLocale(currentLocale.value === 'en' ? 'ar' : 'en');
  };

  return {
    t,
    locale: computed(() => currentLocale.value),
    setLocale,
    toggleLocale,
    translations: computed(() => translations.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    refetch: loadTranslations,
  };
}

