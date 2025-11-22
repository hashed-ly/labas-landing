<script setup>
import { onMounted } from 'vue';
import { useSEO } from '../../composables/useSEO';
import { useI18n } from '../../composables/useI18n';
import DashboardSchedulesHeroSection from './sections/DashboardSchedulesHeroSection.vue';
import SchedulesSection from './sections/SchedulesSection.vue';
import DashboardCTASection from './sections/DashboardCTASection.vue';

const { updateMetaTags } = useSEO();
const { t, locale } = useI18n();

onMounted(() => {
  const isArabic = locale.value === 'ar';
  updateMetaTags({
    title: isArabic ? 'الجداول والجداول الزمنية - لا باس' : 'Schedules & Timetables - Labas',
    description: isArabic
      ? 'إعداد وإدارة الجداول للأطباء والمجموعات والخدمات في لوحة تحكم لا باس'
      : 'Set up and manage schedules for doctors, groups, and services with Labas dashboard',
  });
});
</script>

<template>
  <div class="dashboard-schedules-page">
    <DashboardSchedulesHeroSection />
    <SchedulesSection />
    <DashboardCTASection />
  </div>
</template>

