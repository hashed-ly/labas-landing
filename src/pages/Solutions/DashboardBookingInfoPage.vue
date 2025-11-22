<script setup>
import { onMounted } from 'vue';
import { useSEO } from '../../composables/useSEO';
import { useI18n } from '../../composables/useI18n';
import DashboardBookingInfoHeroSection from './sections/DashboardBookingInfoHeroSection.vue';
import BookingInformationSection from './sections/BookingInformationSection.vue';
import DashboardCTASection from './sections/DashboardCTASection.vue';

const { updateMetaTags } = useSEO();
const { t, locale } = useI18n();

onMounted(() => {
  const isArabic = locale.value === 'ar';
  updateMetaTags({
    title: isArabic ? 'معلومات الحجز - لا باس' : 'Booking Information - Labas',
    description: isArabic
      ? 'إدارة ملفات الأطباء والمجموعات وخدمات التصوير في لوحة تحكم لا باس'
      : 'Manage doctor profiles, groups, and imaging services with Labas dashboard',
  });
});
</script>

<template>
  <div class="dashboard-booking-info-page">
    <DashboardBookingInfoHeroSection />
    <BookingInformationSection />
    <DashboardCTASection />
  </div>
</template>

