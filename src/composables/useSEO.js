import { useRoute } from 'vue-router';
import { useI18n } from './useI18n';

export function useSEO() {
  const route = useRoute();
  const { t, locale } = useI18n();

  const updateMetaTags = (meta = {}) => {
    const baseUrl = 'https://labas.ly';
    const currentPath = route.path;
    const fullUrl = `${baseUrl}${currentPath}`;
    const isArabic = locale.value === 'ar';

    // Default values
    const defaults = {
      title: isArabic ? 'لا باس - Labas' : 'Labas - لا باس',
      description: isArabic
        ? 'منصة «لا باس» تربط المرضى بالأطباء والمستشفيات في ليبيا، مع مواعيد رقمية، تقارير طبية آمنة، ودردشة مع فريق الرعاية'
        : 'Labas connects patients, doctors, and hospitals across Libya with secure digital tools.',
      image: `${baseUrl}/images/logos/brand-mark.png`,
    };

    const title = meta.title || defaults.title;
    const description = meta.description || defaults.description;
    const image = meta.image || defaults.image;

    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:url', fullUrl, 'property');
    updateMetaTag('og:image', image, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:locale', isArabic ? 'ar_LY' : 'en_US', 'property');
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // Update hreflang
    const updateHreflang = (lang, href) => {
      let hreflang = document.querySelector(`link[hreflang="${lang}"]`);
      if (!hreflang) {
        hreflang = document.createElement('link');
        hreflang.setAttribute('rel', 'alternate');
        hreflang.setAttribute('hreflang', lang);
        document.head.appendChild(hreflang);
      }
      hreflang.setAttribute('href', href);
    };

    updateHreflang('ar', `${baseUrl}${currentPath}`);
    updateHreflang('en', `${baseUrl}${currentPath}`);
  };

  return { updateMetaTags };
}

