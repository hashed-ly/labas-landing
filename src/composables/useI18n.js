import { computed } from 'vue';
import { useI18n as useVueI18n } from 'vue-i18n';

export function useI18n() {
  const { locale, t } = useVueI18n();

  const currentLocale = computed(() => locale.value);
  const isRTL = computed(() => locale.value === 'ar');
  const direction = computed(() => (isRTL.value ? 'rtl' : 'ltr'));

  const toggleLocale = () => {
    const newLocale = locale.value === 'ar' ? 'en' : 'ar';
    locale.value = newLocale;
    
    // Update HTML attributes
    document.documentElement.setAttribute('lang', newLocale);
    document.documentElement.setAttribute('dir', newLocale === 'ar' ? 'rtl' : 'ltr');
  };

  const setLocale = (newLocale) => {
    if (['ar', 'en'].includes(newLocale)) {
      locale.value = newLocale;
      document.documentElement.setAttribute('lang', newLocale);
      document.documentElement.setAttribute('dir', newLocale === 'ar' ? 'rtl' : 'ltr');
    }
  };

  return {
    t,
    locale: currentLocale,
    isRTL,
    direction,
    toggleLocale,
    setLocale,
  };
}

