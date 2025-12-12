<script setup>
import { onMounted } from 'vue';
import { useSEO } from '../../composables/useSEO';
import { useI18n } from '../../composables/useI18n';
import ContactSection from '../Home/sections/ContactSection.vue';

const { updateMetaTags, addStructuredData } = useSEO();
const { t, locale } = useI18n();

onMounted(() => {
  const isArabic = locale.value === 'ar';
  updateMetaTags({
    title: isArabic ? 'تواصل معنا - لا باس' : 'Contact Us - Labas',
    description: isArabic
      ? 'تواصل مع فريق لا باس للإجابة على استفساراتك ومساعدتك في بدء رحلتك الصحية الرقمية'
      : 'Get in touch with the Labas team to answer your questions and help you start your digital health journey',
  });
  
  // Add ContactPage structured data
  addStructuredData({
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: isArabic ? 'تواصل معنا' : 'Contact Us',
    description: isArabic
      ? 'صفحة الاتصال بلا باس'
      : 'Labas contact page',
    mainEntity: {
      '@type': 'Organization',
      name: 'Labas',
      email: 'support@labas.ly',
      url: 'https://labas.ly',
    },
  });
});
</script>

<template>
  <div class="contact-page">
    <ContactSection />
  </div>
</template>

