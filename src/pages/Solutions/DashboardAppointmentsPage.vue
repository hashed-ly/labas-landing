<script setup>
import { onMounted } from 'vue';
import { useSEO } from '../../composables/useSEO';
import { useI18n } from '../../composables/useI18n';
import DashboardAppointmentsHeroSection from './sections/DashboardAppointmentsHeroSection.vue';
import NewAppointmentSection from './sections/NewAppointmentSection.vue';
import AppointmentCalendarSection from './sections/AppointmentCalendarSection.vue';
import BookingsSection from './sections/BookingsSection.vue';
import DashboardCTASection from './sections/DashboardCTASection.vue';

const { updateMetaTags } = useSEO();
const { t, locale } = useI18n();

onMounted(() => {
  const isArabic = locale.value === 'ar';
  updateMetaTags({
    title: isArabic
      ? 'إدارة المواعيد والحجوزات - لا باس'
      : 'Appointments & Bookings Management - Labas',
    description: isArabic
      ? 'تعلم كيفية إنشاء المواعيد وإدارة التقويم والتعامل مع طلبات الحجز في لوحة تحكم لا باس'
      : 'Learn how to create appointments, manage your calendar, and handle booking requests with Labas dashboard',
  });
});
</script>

<template>
  <div class="dashboard-appointments-page">
    <DashboardAppointmentsHeroSection />
    <NewAppointmentSection />
    <AppointmentCalendarSection />
    <BookingsSection />
    <DashboardCTASection />
  </div>
</template>

