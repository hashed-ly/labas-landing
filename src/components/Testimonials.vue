<script setup>
import { useI18n } from '../composables/useI18n';
import { useIntersectionObserver } from '../composables/useIntersectionObserver';

const { t, locale } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver();

// Placeholder testimonials - you can replace with real data
const testimonials = [
  {
    name: locale.value === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
    role: locale.value === 'ar' ? 'مريض' : 'Patient',
    company: locale.value === 'ar' ? 'بنغازي' : 'Benghazi',
    quote:
      locale.value === 'ar'
        ? 'تطبيق لا باس غيّر طريقة تعاملي مع الرعاية الصحية. أصبح حجز المواعيد سهلاً جداً وأستطيع الوصول لنتائجي في أي وقت.'
        : 'Labas app has transformed how I manage my healthcare. Booking appointments is so easy and I can access my results anytime.',
    avatar: '👤',
  },
  {
    name: locale.value === 'ar' ? 'د. فاطمة علي' : 'Dr. Fatima Ali',
    role: locale.value === 'ar' ? 'طبيبة' : 'Doctor',
    company: locale.value === 'ar' ? 'مستشفى الشفاء' : 'Al-Shifa Hospital',
    quote:
      locale.value === 'ar'
        ? 'منصة رائعة لإدارة المواعيد والمرضى. وفرت علينا الكثير من الوقت والجهد في العيادة.'
        : 'An excellent platform for managing appointments and patients. It has saved us so much time and effort at the clinic.',
    avatar: '👩‍⚕️',
  },
  {
    name: locale.value === 'ar' ? 'سارة خالد' : 'Sara Khaled',
    role: locale.value === 'ar' ? 'مريضة' : 'Patient',
    company: locale.value === 'ar' ? 'طرابلس' : 'Tripoli',
    quote:
      locale.value === 'ar'
        ? 'أحب أن أتمكن من إدارة مواعيد عائلتي كلها من مكان واحد. المحفظة الإلكترونية أيضاً مريحة جداً.'
        : 'I love being able to manage all my family appointments from one place. The digital wallet is also very convenient.',
    avatar: '👩',
  },
  {
    name: locale.value === 'ar' ? 'م. خالد إبراهيم' : 'Eng. Khaled Ibrahim',
    role: locale.value === 'ar' ? 'مدير عيادة' : 'Clinic Manager',
    company: locale.value === 'ar' ? 'عيادة النور' : 'Al-Noor Clinic',
    quote:
      locale.value === 'ar'
        ? 'لوحة التحكم ساعدتنا في تنظيم العمل بشكل أفضل. التقارير والإحصائيات مفيدة جداً.'
        : 'The dashboard has helped us organize work much better. The reports and statistics are very useful.',
    avatar: '👨‍💼',
  },
];
</script>

<template>
  <section
    id="testimonials"
    class="py-32 bg-bg relative overflow-hidden transition-all duration-700"
    ref="targetRef"
  >
    <!-- Brand pattern transition -->
    <div
      class="absolute inset-x-0 top-0 h-32 bg-repeat-x opacity-10 pointer-events-none"
      style="background-image: url('/images/shapes-patterns/Yellow Pattern.svg'); background-size: auto 100%;"
      aria-hidden="true"
    ></div>

    <!-- Brand mark decoration -->
    <div
      class="absolute bottom-10 right-10 opacity-10"
      aria-hidden="true"
    >
      <img
        src="/images/logos/brand-mark.svg"
        alt=""
        class="w-32 h-32"
      />
    </div>

    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <!-- Header -->
      <div
        class="max-w-3xl mx-auto text-center space-y-4 mb-16"
        :class="{ 'opacity-0': !isVisible, 'animate-fade-in-up': isVisible }"
      >
        <div class="inline-block px-4 py-2 bg-accent/10 rounded-full mb-4">
          <span class="text-sm font-medium text-accent">
            {{ locale === 'ar' ? 'آراء العملاء' : 'Testimonials' }}
          </span>
        </div>

        <h2 class="text-4xl md:text-5xl font-bold text-text">
          {{ locale === 'ar' ? 'ماذا يقول عملاؤنا' : 'What our users say' }}
        </h2>

        <p class="text-lg text-text/70 leading-relaxed">
          {{
            locale === 'ar'
              ? 'اكتشف كيف يساعد لا باس المرضى والمؤسسات الطبية في جميع أنحاء ليبيا'
              : 'Discover how Labas is helping patients and medical facilities across Libya'
          }}
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-text/5 hover:shadow-lg transition-all"
          :class="{
            'opacity-0': !isVisible,
            'animate-fade-in-up': isVisible,
            'delay-100': index === 0,
            'delay-200': index === 1,
            'delay-300': index === 2,
            'delay-400': index === 3,
          }"
        >
          <!-- Quote -->
          <div class="mb-6">
            <svg
              class="w-8 h-8 text-secondary/30 mb-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10z"
              />
            </svg>
            <p class="text-text/80 leading-relaxed text-base md:text-lg">
              {{ testimonial.quote }}
            </p>
          </div>

          <!-- Author -->
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-2xl"
            >
              {{ testimonial.avatar }}
            </div>
            <div>
              <div class="font-semibold text-text">{{ testimonial.name }}</div>
              <div class="text-sm text-text/60">
                {{ testimonial.role }} • {{ testimonial.company }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

