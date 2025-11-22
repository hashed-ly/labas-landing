<script setup>
import { onMounted } from 'vue';
import { useSEO } from '../../composables/useSEO';
import { useI18n } from '../../composables/useI18n';
import HeroSection from './sections/HeroSection.vue';
import CoverageMapSection from './sections/CoverageMapSection.vue';
import FeaturesSection from './sections/FeaturesSection.vue';
import OrganizationsSection from './sections/OrganizationsSection.vue';
import SecuritySection from './sections/SecuritySection.vue';
import FAQSection from './sections/FAQSection.vue';
import ContactSection from './sections/ContactSection.vue';
import CTASection from './sections/CTASection.vue';

const { updateMetaTags } = useSEO();
const { t, locale } = useI18n();

onMounted(() => {
  const isArabic = locale.value === 'ar';
  updateMetaTags({
    title: isArabic ? 'لا باس - Labas' : 'Labas - لا باس',
    description: isArabic
      ? 'منصة «لا باس» تربط المرضى بالأطباء والمستشفيات في ليبيا، مع مواعيد رقمية، تقارير طبية آمنة، ودردشة مع فريق الرعاية'
      : 'Labas connects patients, doctors, and hospitals across Libya with secure digital tools.',
  });
});
</script>

<template>
  <div class="home-page">
    <HeroSection />
    <CoverageMapSection />
    <FeaturesSection />
    <OrganizationsSection />
    <SecuritySection />
    <FAQSection />
    <ContactSection />
    <CTASection />
  </div>
</template>
