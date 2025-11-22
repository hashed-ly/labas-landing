<script setup>
import { onMounted } from 'vue';
import { useSEO } from '../../composables/useSEO';
import { useI18n } from '../../composables/useI18n';
import DashboardHeroSection from './sections/DashboardHeroSection.vue';
import DashboardOverviewSection from './sections/DashboardOverviewSection.vue';
import DashboardNavigationSection from './sections/DashboardNavigationSection.vue';
import OnboardingSection from './sections/OnboardingSection.vue';
import DashboardFAQSection from './sections/DashboardFAQSection.vue';
import DashboardCTASection from './sections/DashboardCTASection.vue';

const { updateMetaTags } = useSEO();
const { t, locale } = useI18n();

onMounted(() => {
  const isArabic = locale.value === 'ar';
  updateMetaTags({
    title: isArabic
      ? 'لوحة تحكم لا باس للمؤسسات الطبية'
      : 'Labas Medical Institutions Dashboard',
    description: isArabic
      ? 'منصة سهلة الاستخدام مصممة لتبسيط العمليات الصحية اليومية. إدارة المواعيد والحجوزات وملفات الأطباء وخدمات التصوير والجداول الزمنية في مكان واحد'
      : 'A user-friendly platform designed to streamline daily healthcare operations. Manage appointments, bookings, doctor profiles, imaging services, and timetables all in one place.',
  });
});
</script>

<template>
  <div class="dashboard-page">
    <DashboardHeroSection />
    <DashboardOverviewSection />
    <DashboardNavigationSection />
    <OnboardingSection />
    <DashboardFAQSection />
    <DashboardCTASection />
  </div>
</template>

