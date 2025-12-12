<script setup>
import { onMounted } from 'vue';
import { useSEO } from '../../composables/useSEO';
import { useI18n } from '../../composables/useI18n';
import AppHeroSection from './sections/AppHeroSection.vue';
import AppFeaturesSection from './sections/AppFeaturesSection.vue';
import AppShowcaseSection from './sections/AppShowcaseSection.vue';
import AppTrustSection from './sections/AppTrustSection.vue';
import AppStatsSection from './sections/AppStatsSection.vue';
import CTASection from '../Home/sections/CTASection.vue';

const { updateMetaTags, addStructuredData } = useSEO();
const { t, locale } = useI18n();

onMounted(() => {
  const isArabic = locale.value === 'ar';
  updateMetaTags({
    title: isArabic
      ? 'تطبيق لا باس - مساعدك الصحي الشخصي'
      : 'Labas App - Your Personal Healthcare Assistant',
    description: isArabic
      ? 'احجز مواعيد الأطباء، اطلب توصيل الأدوية، احجز التحاليل المخبرية، واطّلع على خدمات طبية أساسية من تطبيق لا باس'
      : 'Book doctor appointments, request prescription delivery, schedule lab tests, and access essential medical services with Labas app.',
  });
  
  // Add SoftwareApplication structured data
  addStructuredData({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Labas',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'LYD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1000',
    },
    description: isArabic
      ? 'تطبيق لا باس - منصة الصحة الرقمية في ليبيا لربط المرضى بالأطباء والمستشفيات'
      : 'Labas - Libya\'s digital health platform connecting patients with doctors and hospitals',
  });
});
</script>

<template>
  <div class="app-page">
    <AppHeroSection />
    <AppFeaturesSection />
    <AppShowcaseSection />
    <AppTrustSection />
    <AppStatsSection />
    <CTASection />
  </div>
</template>

