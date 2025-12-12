import { useRoute } from 'vue-router';
import { useI18n } from './useI18n';

export function useSEO() {
  const route = useRoute();
  const { t, locale } = useI18n();
  
  const addStructuredData = (schema) => {
    // Remove existing structured data with same @type if exists
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach((script) => {
      try {
        const data = JSON.parse(script.textContent);
        if (data['@type'] === schema['@type']) {
          script.remove();
        }
      } catch (e) {
        // Ignore parsing errors
      }
    });
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  };

  const updateMetaTags = (meta = {}) => {
    const baseUrl = 'https://labas.ly';
    const currentPath = route.path;
    const isArabic = locale.value === 'ar';
    
    // Handle language-specific URLs
    // If path doesn't start with /en and we're in English, add /en prefix
    // If path starts with /en and we're in Arabic, remove /en prefix
    let canonicalPath = currentPath;
    if (!isArabic && !currentPath.startsWith('/en')) {
      canonicalPath = `/en${currentPath}`;
    } else if (isArabic && currentPath.startsWith('/en')) {
      canonicalPath = currentPath.replace('/en', '');
    }
    
    const fullUrl = `${baseUrl}${canonicalPath}`;
    const arabicUrl = `${baseUrl}${currentPath.startsWith('/en') ? currentPath.replace('/en', '') : currentPath}`;
    const englishUrl = `${baseUrl}${currentPath.startsWith('/en') ? currentPath : `/en${currentPath}`}`;

    // Default values
    const defaults = {
      title: isArabic ? 'لا باس - Labas' : 'Labas - لا باس',
      description: isArabic
        ? 'منصة «لا باس» تربط المرضى بالأطباء والمستشفيات في ليبيا، مع مواعيد رقمية، تقارير طبية آمنة، ودردشة مع فريق الرعاية'
        : 'Labas connects patients, doctors, and hospitals across Libya with secure digital tools.',
      image: `${baseUrl}/images/logos/brand-mark.png`,
      imageAlt: isArabic 
        ? 'شعار لا باس - منصة الصحة الرقمية في ليبيا'
        : 'Labas logo - Digital health platform for Libya',
    };

    const title = meta.title || defaults.title;
    const description = meta.description || defaults.description;
    const image = meta.image || defaults.image;
    const imageAlt = meta.imageAlt || defaults.imageAlt;

    // Update document title
    document.title = title;

    // Update HTML lang and dir attributes
    document.documentElement.lang = isArabic ? 'ar' : 'en';
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';

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
    updateMetaTag('og:image:alt', imageAlt, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:site_name', 'Labas', 'property');
    updateMetaTag('og:locale', isArabic ? 'ar_LY' : 'en_US', 'property');
    updateMetaTag('og:locale:alternate', isArabic ? 'en_US' : 'ar_LY', 'property');
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:image:alt', imageAlt);

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

    updateHreflang('ar', arabicUrl);
    updateHreflang('en', englishUrl);
    updateHreflang('x-default', `${baseUrl}${currentPath.startsWith('/en') ? currentPath.replace('/en', '') : currentPath}`);
    
    // Add breadcrumb structured data
    const breadcrumbs = generateBreadcrumbs(currentPath, isArabic);
    if (breadcrumbs.length > 1) {
      addStructuredData({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      });
    }
  };
  
  const generateBreadcrumbs = (path, isArabic) => {
    const baseUrl = 'https://labas.ly';
    const breadcrumbs = [];
    
    // Home
    breadcrumbs.push({
      name: isArabic ? 'الرئيسية' : 'Home',
      url: `${baseUrl}${isArabic ? '' : '/en'}`,
    });
    
    // Parse path segments
    const segments = path.split('/').filter(Boolean);
    if (segments[0] === 'en') {
      segments.shift();
    }
    
    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const fullPath = isArabic ? currentPath : `/en${currentPath}`;
      
      let name = segment;
      if (segment === 'solutions') {
        name = isArabic ? 'الحلول' : 'Solutions';
      } else if (segment === 'app') {
        name = isArabic ? 'تطبيق لا باس' : 'Labas App';
      } else if (segment === 'dashboard') {
        name = isArabic ? 'لوحة التحكم' : 'Dashboard';
      } else if (segment === 'appointments') {
        name = isArabic ? 'المواعيد والحجوزات' : 'Appointments & Bookings';
      } else if (segment === 'booking-info') {
        name = isArabic ? 'معلومات الحجز' : 'Booking Information';
      } else if (segment === 'schedules') {
        name = isArabic ? 'الجداول والمواعيد' : 'Schedules & Timetables';
      } else if (segment === 'contact') {
        name = isArabic ? 'اتصل بنا' : 'Contact';
      } else if (segment === 'kyc') {
        name = isArabic ? 'تسجيل المؤسسة' : 'Organization Registration';
      } else if (segment === 'v1') {
        return; // Skip v1 segment
      } else if (segment === 'Privacy-and-Policy') {
        name = isArabic ? 'سياسة الخصوصية' : 'Privacy Policy';
      } else if (segment === 'terms-of-use') {
        name = isArabic ? 'شروط الاستخدام' : 'Terms of Use';
      }
      
      breadcrumbs.push({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        url: `${baseUrl}${fullPath}`,
      });
    });
    
    return breadcrumbs;
  };

  return { updateMetaTags, addStructuredData };
}

