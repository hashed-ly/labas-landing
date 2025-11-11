<script setup>
import { ref } from 'vue';
import { useI18n } from '../composables/useI18n';
import { useIntersectionObserver } from '../composables/useIntersectionObserver';

const { t, locale } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver({ threshold: 0.2 });

const formData = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
});

const handleSubmit = () => {
  // Handle form submission
  console.log('Form submitted:', formData.value);
};
</script>

<template>
  <section
    id="contact"
    class="py-32 bg-white transition-all duration-700"
    ref="targetRef"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div
          class="text-center mb-16"
          :class="{ 'opacity-0': !isVisible, 'animate-fade-in-up': isVisible }"
        >
          <h2 class="text-4xl md:text-5xl font-bold text-text mb-4">
            {{ locale === 'ar' ? 'تواصل معنا' : 'Get in Touch' }}
          </h2>
          <p class="text-xl text-text/70 max-w-2xl mx-auto">
            {{
              locale === 'ar'
                ? 'نحن هنا للإجابة على استفساراتك ومساعدتك في بدء رحلتك الصحية الرقمية'
                : "We're here to answer your questions and help you start your digital health journey"
            }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-12 items-start">
          <!-- Contact Information -->
          <div
            class="space-y-8"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up delay-100': isVisible,
            }"
          >
            <div>
              <h3 class="text-2xl font-bold text-text mb-6">
                {{
                  locale === 'ar' ? 'معلومات التواصل' : 'Contact Information'
                }}
              </h3>

              <div class="space-y-6">
                <!-- Location -->
                <div class="flex items-start gap-4">
                  <div
                    class="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6 text-primary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-text mb-1">
                      {{ locale === 'ar' ? 'العنوان' : 'Address' }}
                    </h4>
                    <p class="text-text/70">
                      {{ t('contact.location') }}
                    </p>
                  </div>
                </div>

                <!-- Email -->
                <div class="flex items-start gap-4">
                  <div
                    class="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6 text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-text mb-1">
                      {{ locale === 'ar' ? 'البريد الإلكتروني' : 'Email' }}
                    </h4>
                    <a
                      :href="`mailto:${t('contact.email')}`"
                      class="text-text/70 hover:text-secondary transition-colors"
                    >
                      {{ t('contact.email') }}
                    </a>
                  </div>
                </div>

                <!-- Phone -->
                <div class="flex items-start gap-4">
                  <div
                    class="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-text mb-1">
                      {{ locale === 'ar' ? 'الهاتف' : 'Phone' }}
                    </h4>
                    <a
                      :href="`tel:${t('contact.phone').replace(/[\s-]/g, '')}`"
                      class="text-text/70 hover:text-accent transition-colors"
                      dir="ltr"
                    >
                      {{ t('contact.phone') }}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div>
              <h4 class="font-semibold text-text mb-4">
                {{ locale === 'ar' ? 'تابعنا' : 'Follow Us' }}
              </h4>
              <div class="flex gap-3">
                <a
                  href="https://www.facebook.com/labas.ly"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/labas.ly"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg
                    fill="currentColor"
                    aria-hidden="true"
                    class="size-6"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.9 4.9 0 0 1 1.772 1.153 4.9 4.9 0 0 1 1.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.9 4.9 0 0 1-1.153 1.772 4.9 4.9 0 0 1-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.9 4.9 0 0 1-1.772-1.153 4.9 4.9 0 0 1-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.9 4.9 0 0 1 1.153-1.772A4.9 4.9 0 0 1 5.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748s-.566.683-.748 1.15c-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748s.566-.683.748-1.15c.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.1 3.1 0 0 0-.748-1.15 3.1 3.1 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058M12 6.865a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27m0 1.802a3.333 3.333 0 1 0 0 6.666 3.333 3.333 0 0 0 0-6.666m5.338-3.205a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.x.com/labas.ly"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg
                    fill="currentColor"
                    aria-hidden="true"
                    class="size-6"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M13.682 10.622 20.24 3h-1.554l-5.693 6.618L8.445 3H3.2l6.876 10.007L3.2 21h1.554l6.012-6.989L15.57 21h5.244zm-2.128 2.474-.697-.997-5.543-7.93H7.7l4.473 6.4.697.996 5.815 8.319H16.3z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div
            class="bg-bg rounded-2xl p-8 shadow-soft"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up delay-200': isVisible,
            }"
          >
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-text mb-2">
                  {{ locale === 'ar' ? 'الاسم' : 'Name' }}
                </label>
                <input
                  v-model="formData.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  :placeholder="
                    locale === 'ar' ? 'أدخل اسمك' : 'Enter your name'
                  "
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-text mb-2">
                  {{ locale === 'ar' ? 'البريد الإلكتروني' : 'Email' }}
                </label>
                <input
                  v-model="formData.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                  :placeholder="
                    locale === 'ar'
                      ? 'أدخل بريدك الإلكتروني'
                      : 'Enter your email'
                  "
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-text mb-2">
                  {{ locale === 'ar' ? 'رقم الهاتف' : 'Phone' }}
                </label>
                <input
                  v-model="formData.phone"
                  type="tel"
                  class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                  :placeholder="
                    locale === 'ar' ? 'أدخل رقم هاتفك' : 'Enter your phone'
                  "
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-text mb-2">
                  {{ locale === 'ar' ? 'الرسالة' : 'Message' }}
                </label>
                <textarea
                  v-model="formData.message"
                  required
                  rows="4"
                  class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  :placeholder="
                    locale === 'ar'
                      ? 'كيف يمكننا مساعدتك؟'
                      : 'How can we help you?'
                  "
                ></textarea>
              </div>

              <button
                type="submit"
                class="w-full px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
              >
                {{ locale === 'ar' ? 'إرسال الرسالة' : 'Send Message' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
