<script setup>
import { onMounted } from 'vue';
import { useSEO } from '../../composables/useSEO';
import { useI18n } from '../../composables/useI18n';
import ContactSection from '../Home/sections/ContactSection.vue';

const { updateMetaTags } = useSEO();
const { t, locale } = useI18n();

onMounted(() => {
  const isArabic = locale.value === 'ar';
  updateMetaTags({
    title: isArabic ? 'تواصل معنا - لا باس' : 'Contact Us - Labas',
    description: isArabic
      ? 'تواصل مع فريق لا باس للإجابة على استفساراتك ومساعدتك في بدء رحلتك الصحية الرقمية'
      : 'Get in touch with the Labas team to answer your questions and help you start your digital health journey',
  });
});
</script>

<template>
  <div class="contact-page">
    <ContactSection />
  </div>
</template>

