import { computed, watch } from 'vue';
import { useI18n as useVueI18n } from 'vue-i18n';

const LOCALE_STORAGE_KEY = 'labas_preferred_locale';

export function useI18n() {
  const { locale, t, tm } = useVueI18n();

  // Load saved locale on init
  const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (savedLocale && ['ar', 'en'].includes(savedLocale)) {
    locale.value = savedLocale;
    updateHtmlAttributes(savedLocale);
  }

  // Watch for locale changes and persist
  watch(locale, (newLocale) => {
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
  });

  const currentLocale = computed(() => locale.value);
  const isRTL = computed(() => locale.value === 'ar');
  const direction = computed(() => (isRTL.value ? 'rtl' : 'ltr'));

  /**
   * Update HTML document attributes for locale
   * @param {string} newLocale - The locale code (ar/en)
   */
  function updateHtmlAttributes(newLocale) {
    document.documentElement.setAttribute('lang', newLocale);
    document.documentElement.setAttribute('dir', newLocale === 'ar' ? 'rtl' : 'ltr');
  }

  const toggleLocale = () => {
    const newLocale = locale.value === 'ar' ? 'en' : 'ar';
    locale.value = newLocale;
    updateHtmlAttributes(newLocale);
  };

  const setLocale = (newLocale) => {
    if (['ar', 'en'].includes(newLocale)) {
      locale.value = newLocale;
      updateHtmlAttributes(newLocale);
    }
  };

  return {
    t,
    tm,
    locale: currentLocale,
    isRTL,
    direction,
    toggleLocale,
    setLocale,
  };
}

