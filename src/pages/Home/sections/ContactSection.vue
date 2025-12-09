<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useI18n } from '../../../composables/useI18n';
import { useIntersectionObserver } from '../../../composables/useIntersectionObserver';

const { t, locale } = useI18n();
const { targetRef, isVisible } = useIntersectionObserver();

const formData = ref({
  name: '',
  email: '',
  phone: '',
  subject: 'general',
  message: '',
});

const turnstileToken = ref('');
const turnstileWidgetId = ref(null);
const siteKey = import.meta.env.VITE_CLOUDFLARE_SITE_KEY;
const submitStatus = ref(''); // 'success', 'error', or ''
const isSubmitting = ref(false);
const errorMessage = ref('');
const turnstileError = ref(false);

const renderTurnstile = () => {
  const widgetContainer = document.getElementById('turnstile-widget');
  if (!widgetContainer || turnstileWidgetId.value !== null) return;
  
  if (!siteKey) {
    console.error('Cloudflare Turnstile site key is not configured');
    turnstileError.value = true;
    return;
  }
  
  if (window.turnstile) {
    try {
      turnstileWidgetId.value = window.turnstile.render('#turnstile-widget', {
        sitekey: siteKey,
        callback: (token) => {
          turnstileToken.value = token;
          turnstileError.value = false;
        },
        'expired-callback': () => {
          turnstileToken.value = '';
        },
        'error-callback': () => {
          console.error('Turnstile error');
          turnstileError.value = true;
        },
      });
    } catch (error) {
      console.error('Turnstile render error:', error);
      turnstileError.value = true;
    }
  } else {
    console.warn('Turnstile not available on window object');
  }
};

onMounted(async () => {
  await nextTick();
  
  // Load Turnstile
  if (!document.getElementById('turnstile-script')) {
    const script = document.createElement('script');
    script.id = 'turnstile-script';
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log('Turnstile script loaded');
      // Wait a bit for the API to be ready
      setTimeout(renderTurnstile, 100);
    };
    
    script.onerror = () => {
      console.error('Failed to load Turnstile script');
    };
    
    document.head.appendChild(script);
  } else if (window.turnstile) {
    renderTurnstile();
  }
});

const handleSubmit = async () => {
  // Reset status
  submitStatus.value = '';
  errorMessage.value = '';

  // Validate Turnstile
  if (!siteKey) {
    errorMessage.value = locale.value === 'ar'
      ? 'خطأ في إعدادات الأمان. يرجى الاتصال بالدعم.'
      : 'Security configuration error. Please contact support.';
    submitStatus.value = 'error';
    return;
  }

  if (!turnstileToken.value) {
    errorMessage.value = locale.value === 'ar' 
      ? 'الرجاء التحقق من أنك لست روبوت' 
      : 'Please verify you are not a robot';
    submitStatus.value = 'error';
    return;
  }

  // Validate required fields
  if (!formData.value.name || !formData.value.email || !formData.value.message) {
    errorMessage.value = locale.value === 'ar'
      ? 'الرجاء ملء جميع الحقول المطلوبة'
      : 'Please fill in all required fields';
    submitStatus.value = 'error';
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.value.email)) {
    errorMessage.value = locale.value === 'ar'
      ? 'الرجاء إدخال بريد إلكتروني صحيح'
      : 'Please enter a valid email address';
    submitStatus.value = 'error';
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData.value,
        token: turnstileToken.value,
      }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      submitStatus.value = 'success';
      // Reset form
      formData.value = {
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
      };
      turnstileToken.value = '';
      // Reset Turnstile widget
      if (window.turnstile && turnstileWidgetId.value !== null) {
        window.turnstile.reset(turnstileWidgetId.value);
      }
    } else {
      submitStatus.value = 'error';
      errorMessage.value = result.error || (locale.value === 'ar'
        ? 'حدث خطأ أثناء إرسال الرسالة. الرجاء المحاولة مرة أخرى.'
        : 'An error occurred while sending your message. Please try again.');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    submitStatus.value = 'error';
    errorMessage.value = locale.value === 'ar'
      ? 'فشل الاتصال بالخادم. الرجاء التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.'
      : 'Failed to connect to the server. Please check your internet connection and try again.';
  } finally {
    isSubmitting.value = false;
  }
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
          class="text-center mb-16 flex flex-col items-center justify-center"
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
                    class="shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6 text-secondary"
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
                    class="shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center"
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
                      href="mailto:info@labas.ly"
                      class="text-text/70 hover:text-secondary transition-colors"
                    >
                      info@labas.ly
                    </a>
                  </div>
                </div>

                <!-- Phone -->
                <div class="flex items-start gap-4">
                  <div
                    class="shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center"
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-text mb-1">
                      {{ locale === 'ar' ? 'الهاتف' : 'Phone' }}
                    </h4>
                    <div class="space-y-1">
                      <a
                        :href="`tel:${t('contact.phone').replace(/[\s-]/g, '')}`"
                        class="block text-text/70 hover:text-accent transition-colors"
                        dir="ltr"
                      >
                        {{ t('contact.phone') }}
                      </a>
                      <a
                        :href="`tel:${t('contact.phone2').replace(/[\s-]/g, '')}`"
                        class="block text-text/70 hover:text-accent transition-colors"
                        dir="ltr"
                      >
                        {{ t('contact.phone2') }}
                      </a>
                    </div>
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
                  href="https://www.facebook.com/LabasAppLy"
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
                  href="https://www.instagram.com/labasapply"
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
                  href="https://x.com/LabasAppLy"
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
            class="bg-bg rounded-2xl p-8 shadow"
            :class="{
              'opacity-0': !isVisible,
              'animate-fade-in-up delay-200': isVisible,
            }"
          >
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Success Message -->
              <div
                v-if="submitStatus === 'success'"
                class="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
              >
                <svg
                  class="w-5 h-5 text-green-600 shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div class="flex-1">
                  <p class="text-sm font-medium text-green-800">
                    {{ locale === 'ar' ? 'تم إرسال رسالتك بنجاح!' : 'Message sent successfully!' }}
                  </p>
                  <p class="text-sm text-green-700 mt-1">
                    {{ locale === 'ar' ? 'سنتواصل معك قريبًا.' : 'We\'ll get back to you soon.' }}
                  </p>
                </div>
              </div>

              <!-- Error Message -->
              <div
                v-if="submitStatus === 'error'"
                class="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
              >
                <svg
                  class="w-5 h-5 text-red-600 shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div class="flex-1">
                  <p class="text-sm font-medium text-red-800">
                    {{ errorMessage }}
                  </p>
                </div>
              </div>

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
                  {{ t('contact.form.subject') }}
                </label>
                <div class="relative">
                  <select
                    v-model="formData.subject"
                    class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all appearance-none"
                  >
                    <option value="general">
                      {{ t('contact.form.subjects.general') }}
                    </option>
                    <option value="support">
                      {{ t('contact.form.subjects.support') }}
                    </option>
                    <option value="sales">
                      {{ t('contact.form.subjects.sales') }}
                    </option>
                    <option value="partnership">
                      {{ t('contact.form.subjects.partnership') }}
                    </option>
                    <option value="other">
                      {{ t('contact.form.subjects.other') }}
                    </option>
                  </select>
                  <div
                    class="absolute top-1/2 end-4 -translate-y-1/2 pointer-events-none text-text/50"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
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

              <div id="turnstile-widget" class="min-h-[65px]"></div>
              <div v-if="turnstileError && !siteKey" class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p class="text-sm text-yellow-800">
                  {{ locale === 'ar' 
                    ? 'خطأ في إعدادات الأمان. يرجى الاتصال بالدعم.' 
                    : 'Security configuration error. Please contact support.' }}
                </p>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full px-6 py-4 bg-secondary text-white rounded-lg font-medium hover:shadow-lg hover:-translate-y-0.5 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
              >
                <span v-if="!isSubmitting">
                  {{ locale === 'ar' ? 'إرسال الرسالة' : 'Send Message' }}
                </span>
                <span v-else class="flex items-center justify-center gap-2">
                  <svg
                    class="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {{ locale === 'ar' ? 'جاري الإرسال...' : 'Sending...' }}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

