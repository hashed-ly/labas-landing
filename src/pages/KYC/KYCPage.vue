<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from '../../composables/useI18n';
import { useSEO } from '../../composables/useSEO';
import { useIntersectionObserver } from '../../composables/useIntersectionObserver';

const { t, locale } = useI18n();
const { updateMetaTags, addStructuredData } = useSEO();
const { targetRef, isVisible } = useIntersectionObserver();

const formData = ref({
  // Organization Information
  organizationNameArabic: '',
  organizationNameEnglish: '',
  organizationType: '',
  organizationTypeOther: '',
  commercialRegistrationNumber: '',
  taxId: '',
  city: '',
  address: '',
  officialEmail: '',
  officialPhone: '',
  website: '',
  facebook: '',
  instagram: '',

  // Authorized Person Details
  authorizedPersonName: '',
  authorizedPersonPosition: '',
  authorizedPersonNationalId: '',
  authorizedPersonPhone: '',
  authorizedPersonEmail: '',

  // Banking Information
  bankName: '',
  accountHolderName: '',
  iban: '',

  // Terms
  termsAccepted: false,
});

const turnstileToken = ref('');
const turnstileWidgetId = ref(null);
const siteKey = import.meta.env.VITE_CLOUDFLARE_SITE_KEY;
const submitStatus = ref(''); // 'success', 'error', or ''
const isSubmitting = ref(false);
const errorMessage = ref('');
const turnstileError = ref(false);

const organizationTypes = [
  { value: 'hospital', label: t('kyc.sections.organization.types.hospital') },
  { value: 'clinic', label: t('kyc.sections.organization.types.clinic') },
  { value: 'laboratory', label: t('kyc.sections.organization.types.laboratory') },
  { value: 'pharmacy', label: t('kyc.sections.organization.types.pharmacy') },
  { value: 'radiology', label: t('kyc.sections.organization.types.radiology') },
  { value: 'medicalProvider', label: t('kyc.sections.organization.types.medicalProvider') },
  { value: 'ambulanceCompany', label: t('kyc.sections.organization.types.ambulanceCompany') },
  { value: 'other', label: t('kyc.sections.organization.types.other') },
];

const libyanCities = [
  { value: 'tripoli', label: { en: 'Tripoli', ar: 'طرابلس' } },
  { value: 'benghazi', label: { en: 'Benghazi', ar: 'بنغازي' } },
  { value: 'misratah', label: { en: 'Misratah', ar: 'مصراتة' } },
  { value: 'sabha', label: { en: 'Sabha', ar: 'سبها' } },
  { value: 'surt', label: { en: 'Surt', ar: 'سرت' } },
  { value: 'azZawiyah', label: { en: 'Az Zawiyah', ar: 'الزاوية' } },
  { value: 'alMarqab', label: { en: 'Al Marqab', ar: 'المرقب' } },
  { value: 'derna', label: { en: 'Derna', ar: 'درنة' } },
  { value: 'alMarj', label: { en: 'Al Marj', ar: 'المرج' } },
  { value: 'alJabalAkhdar', label: { en: 'Al Jabal al Akhdar', ar: 'الجبل الأخضر' } },
  { value: 'alJifarah', label: { en: 'Al Jifarah', ar: 'الجفارة' } },
  { value: 'alJabalGharbi', label: { en: 'Al Jabal al Gharbi', ar: 'الجبل الغربي' } },
  { value: 'alJufrah', label: { en: 'Al Jufrah', ar: 'الجفرة' } },
  { value: 'wadiHayaa', label: { en: 'Wadi al Hayaa', ar: 'وادي الحياة' } },
  { value: 'ghat', label: { en: 'Ghat', ar: 'غات' } },
  { value: 'murzuq', label: { en: 'Murzuq', ar: 'مرزق' } },
  { value: 'alKufrah', label: { en: 'Al Kufrah', ar: 'الكفرة' } },
  { value: 'ashShati', label: { en: "Ash Shati'", ar: 'الشاطئ' } },
  { value: 'alButnan', label: { en: 'Al Butnan', ar: 'البطنان' } },
  { value: 'oases', label: { en: 'Oases', ar: 'الواحات' } },
  { value: 'anNuqatKhams', label: { en: 'An Nuqat al Khams', ar: 'النقاط الخمس' } },
  { value: 'nalut', label: { en: 'Nalut', ar: 'نالوت' } },
];

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
  }
};

onMounted(async () => {
  const isArabic = locale.value === 'ar';
  updateMetaTags({
    title: isArabic ? 'تسجيل المؤسسة - لا باس' : 'Organization Registration - Labas',
    description: isArabic
      ? 'سجل مؤسستك الطبية مع لا باس وابدأ في إدارة عملياتك الصحية بكفاءة'
      : 'Register your medical organization with Labas and start managing your healthcare operations efficiently',
  });
  
  // Add WebPage structured data for KYC page
  addStructuredData({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isArabic ? 'تسجيل المؤسسة' : 'Organization Registration',
    description: isArabic
      ? 'صفحة تسجيل المؤسسات الطبية في لا باس'
      : 'Medical organization registration page for Labas',
  });
  
  // Add WebPage structured data for KYC page
  addStructuredData({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isArabic ? 'تسجيل المؤسسة' : 'Organization Registration',
    description: isArabic
      ? 'صفحة تسجيل المؤسسات الطبية في لا باس'
      : 'Medical organization registration page for Labas',
  });

  await nextTick();
  
  // Load Turnstile
  if (!document.getElementById('turnstile-script')) {
    const script = document.createElement('script');
    script.id = 'turnstile-script';
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
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

const validateForm = () => {
  // Organization Information
  if (!formData.value.organizationNameArabic) {
    return locale.value === 'ar' ? 'يرجى إدخال اسم المؤسسة بالعربية' : 'Please enter organization name in Arabic';
  }
  if (!formData.value.organizationType) {
    return locale.value === 'ar' ? 'يرجى اختيار نوع المؤسسة' : 'Please select organization type';
  }
  if (!formData.value.city) {
    return locale.value === 'ar' ? 'يرجى اختيار المدينة' : 'Please select city';
  }
  if (!formData.value.officialEmail) {
    return locale.value === 'ar' ? 'يرجى إدخال البريد الإلكتروني الرسمي' : 'Please enter official email';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.value.officialEmail)) {
    return locale.value === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address';
  }
  if (!formData.value.officialPhone) {
    return locale.value === 'ar' ? 'يرجى إدخال رقم الهاتف الرسمي' : 'Please enter official phone number';
  }

  // Authorized Person Details (Hidden - validation skipped for now)
  // TODO: Re-enable validation when section is re-added
  // if (!formData.value.authorizedPersonName) {
  //   return locale.value === 'ar' ? 'يرجى إدخال اسم الشخص المصرح' : 'Please enter authorized person name';
  // }
  // if (!formData.value.authorizedPersonPosition) {
  //   return locale.value === 'ar' ? 'يرجى إدخال المنصب' : 'Please enter position';
  // }
  // if (!formData.value.authorizedPersonNationalId) {
  //   return locale.value === 'ar' ? 'يرجى إدخال رقم الهوية الوطنية' : 'Please enter national ID';
  // }
  // if (!formData.value.authorizedPersonPhone) {
  //   return locale.value === 'ar' ? 'يرجى إدخال رقم هاتف الشخص المصرح' : 'Please enter authorized person phone';
  // }
  // if (!formData.value.authorizedPersonEmail) {
  //   return locale.value === 'ar' ? 'يرجى إدخال بريد الشخص المصرح' : 'Please enter authorized person email';
  // }
  // if (!emailRegex.test(formData.value.authorizedPersonEmail)) {
  //   return locale.value === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح للشخص المصرح' : 'Please enter a valid email address for authorized person';
  // }

  // Banking Information (Hidden - validation skipped for now)
  // TODO: Re-enable validation when section is re-added
  // if (!formData.value.bankName) {
  //   return locale.value === 'ar' ? 'يرجى إدخال اسم البنك' : 'Please enter bank name';
  // }
  // if (!formData.value.accountHolderName) {
  //   return locale.value === 'ar' ? 'يرجى إدخال اسم صاحب الحساب' : 'Please enter account holder name';
  // }
  // if (!formData.value.iban) {
  //   return locale.value === 'ar' ? 'يرجى إدخال رقم الآيبان' : 'Please enter IBAN';
  // }

  // Terms
  if (!formData.value.termsAccepted) {
    return locale.value === 'ar' ? 'يرجى الموافقة على الشروط والأحكام' : 'Please accept the terms and conditions';
  }

  return null;
};

const handleSubmit = async () => {
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

  // Validate form
  const validationError = validateForm();
  if (validationError) {
    errorMessage.value = validationError;
    submitStatus.value = 'error';
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await fetch('/api/kyc', {
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
        organizationNameArabic: '',
        organizationNameEnglish: '',
        organizationType: '',
        organizationTypeOther: '',
        commercialRegistrationNumber: '',
        taxId: '',
        city: '',
        address: '',
        officialEmail: '',
        officialPhone: '',
        website: '',
        facebook: '',
        instagram: '',
        authorizedPersonName: '',
        authorizedPersonPosition: '',
        authorizedPersonNationalId: '',
        authorizedPersonPhone: '',
        authorizedPersonEmail: '',
        bankName: '',
        accountHolderName: '',
        iban: '',
        termsAccepted: false,
      };
      turnstileToken.value = '';
      if (window.turnstile && turnstileWidgetId.value !== null) {
        window.turnstile.reset(turnstileWidgetId.value);
      }
    } else {
      submitStatus.value = 'error';
      errorMessage.value = result.error || (locale.value === 'ar'
        ? 'حدث خطأ أثناء إرسال التسجيل. الرجاء المحاولة مرة أخرى.'
        : 'An error occurred while submitting your registration. Please try again.');
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
  <div class="kyc-page min-h-screen bg-white pt-16 md:pt-24 pb-12 md:pb-20 transition-all duration-700" ref="targetRef">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div
          class="text-center mb-8 md:mb-12 flex flex-col items-center justify-center"
          :class="{ 'opacity-0': !isVisible, 'animate-fade-in-up': isVisible }"
        >
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-text mb-3 md:mb-4 px-4">
            {{ t('kyc.title') }}
          </h1>
          <p class="text-lg md:text-xl text-text/70 max-w-2xl mx-auto px-4">
            {{ t('kyc.subtitle') }}
          </p>
        </div>

        <!-- Form -->
        <div
          class="bg-bg rounded-2xl p-8 shadow"
          :class="{
            'opacity-0': !isVisible,
            'animate-fade-in-up delay-100': isVisible,
          }"
        >
          <form @submit.prevent="handleSubmit" class="space-y-6 md:space-y-8">
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
                  {{ t('kyc.form.success.title') }}
                </p>
                <p class="text-sm text-green-700 mt-1">
                  {{ t('kyc.form.success.message') }}
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

            <!-- Section 1: Organization Information -->
            <div class="space-y-6">
              <h2 class="text-xl md:text-2xl font-bold text-text mb-6">
                {{ t('kyc.sections.organization.title') }}
              </h2>

                <div class="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label class="block text-sm font-medium text-text mb-2">
                      {{ t('kyc.sections.organization.nameArabic') }} <span class="text-danger">*</span>
                    </label>
                    <input
                      v-model="formData.organizationNameArabic"
                      type="text"
                      required
                      class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base"
                      :placeholder="t('kyc.sections.organization.nameArabicPlaceholder')"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-text mb-2">
                      {{ t('kyc.sections.organization.nameEnglish') }}
                    </label>
                    <input
                      v-model="formData.organizationNameEnglish"
                      type="text"
                      class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base"
                      :placeholder="t('kyc.sections.organization.nameEnglishPlaceholder')"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-text mb-2">
                    {{ t('kyc.sections.organization.type') }} <span class="text-danger">*</span>
                  </label>
                  <div class="relative">
                    <select
                      v-model="formData.organizationType"
                      required
                      class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none text-sm md:text-base"
                    >
                      <option value="">{{ locale === 'ar' ? 'اختر نوع المؤسسة' : 'Select organization type' }}</option>
                      <option
                        v-for="type in organizationTypes"
                        :key="type.value"
                        :value="type.value"
                      >
                        {{ type.label }}
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

                <div v-if="formData.organizationType === 'other'">
                  <label class="block text-sm font-medium text-text mb-2">
                    {{ locale === 'ar' ? 'حدد نوع المؤسسة' : 'Specify organization type' }} <span class="text-danger">*</span>
                  </label>
                  <input
                    v-model="formData.organizationTypeOther"
                    type="text"
                    required
                    class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base"
                    :placeholder="locale === 'ar' ? 'أدخل نوع المؤسسة' : 'Enter organization type'"
                  />
                </div>

                <!-- Hidden: Commercial Registration and Tax ID -->
                <div v-show="false" class="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label class="block text-sm font-medium text-text mb-2">
                      {{ t('kyc.sections.organization.commercialRegistration') }}
                    </label>
                    <input
                      v-model="formData.commercialRegistrationNumber"
                      type="text"
                      class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base"
                      :placeholder="t('kyc.sections.organization.commercialRegistrationPlaceholder')"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-text mb-2">
                      {{ t('kyc.sections.organization.taxId') }}
                    </label>
                    <input
                      v-model="formData.taxId"
                      type="text"
                      class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base"
                      :placeholder="t('kyc.sections.organization.taxIdPlaceholder')"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-text mb-2">
                    {{ t('kyc.sections.organization.city') }} <span class="text-danger">*</span>
                  </label>
                  <div class="relative">
                    <select
                      v-model="formData.city"
                      required
                      class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none text-sm md:text-base"
                    >
                      <option value="">{{ locale === 'ar' ? 'اختر المدينة' : 'Select city' }}</option>
                      <option
                        v-for="city in libyanCities"
                        :key="city.value"
                        :value="city.value"
                      >
                        {{ locale === 'ar' ? city.label.ar : city.label.en }}
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
                    {{ t('kyc.sections.organization.address') }}
                  </label>
                  <input
                    v-model="formData.address"
                    type="text"
                    class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base"
                    :placeholder="t('kyc.sections.organization.addressPlaceholder')"
                  />
                </div>

                <div class="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label class="block text-sm font-medium text-text mb-2">
                      {{ t('kyc.sections.organization.email') }} <span class="text-danger">*</span>
                    </label>
                    <input
                      v-model="formData.officialEmail"
                      type="email"
                      required
                      class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base"
                      :placeholder="t('kyc.sections.organization.emailPlaceholder')"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-text mb-2">
                      {{ t('kyc.sections.organization.phone') }} <span class="text-danger">*</span>
                    </label>
                    <input
                      v-model="formData.officialPhone"
                      type="tel"
                      required
                      class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base"
                      :placeholder="t('kyc.sections.organization.phonePlaceholder')"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-text mb-2">
                    {{ t('kyc.sections.organization.website') }}
                  </label>
                  <input
                    v-model="formData.website"
                    type="url"
                    class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base"
                    :placeholder="t('kyc.sections.organization.websitePlaceholder')"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-text mb-4">
                    {{ t('kyc.sections.organization.socialLinks') }}
                  </label>
                  <div class="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label class="flex items-center gap-2 text-sm font-medium text-text/70 mb-2">
                        <svg class="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"/>
                        </svg>
                        {{ t('kyc.sections.organization.facebook') }}
                      </label>
                      <input
                        v-model="formData.facebook"
                        type="url"
                        class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base"
                        :placeholder="t('kyc.sections.organization.facebookPlaceholder')"
                      />
                    </div>

                    <div>
                      <label class="flex items-center gap-2 text-sm font-medium text-text/70 mb-2">
                        <svg class="w-5 h-5 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.051-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.051-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"/>
                        </svg>
                        {{ t('kyc.sections.organization.instagram') }}
                      </label>
                      <input
                        v-model="formData.instagram"
                        type="url"
                        class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base"
                        :placeholder="t('kyc.sections.organization.instagramPlaceholder')"
                      />
                    </div>
                  </div>
                </div>
            </div>

            <!-- Section 2: Authorized Person Details (Hidden - will be re-added later) -->
            <div v-show="false" class="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-text/5">
              <h2 class="text-xl md:text-2xl font-bold text-text mb-6">
                {{ t('kyc.sections.authorizedPerson.title') }}
              </h2>
              <div class="space-y-6">
                <div class="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label class="block text-sm font-medium text-text mb-2">
                      {{ t('kyc.sections.authorizedPerson.fullName') }}
                    </label>
                    <input
                      v-model="formData.authorizedPersonName"
                      type="text"
                      class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base"
                      :placeholder="t('kyc.sections.authorizedPerson.fullNamePlaceholder')"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-text mb-2">
                      {{ t('kyc.sections.authorizedPerson.position') }}
                    </label>
                    <input
                      v-model="formData.authorizedPersonPosition"
                      type="text"
                      class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base"
                      :placeholder="t('kyc.sections.authorizedPerson.positionPlaceholder')"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-text mb-2">
                    {{ t('kyc.sections.authorizedPerson.nationalId') }}
                  </label>
                  <input
                    v-model="formData.authorizedPersonNationalId"
                    type="text"
                    class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base"
                    :placeholder="t('kyc.sections.authorizedPerson.nationalIdPlaceholder')"
                  />
                </div>

                <div class="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label class="block text-sm font-medium text-text mb-2">
                      {{ t('kyc.sections.authorizedPerson.phone') }}
                    </label>
                    <input
                      v-model="formData.authorizedPersonPhone"
                      type="tel"
                      class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base"
                      :placeholder="t('kyc.sections.authorizedPerson.phonePlaceholder')"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-text mb-2">
                      {{ t('kyc.sections.authorizedPerson.email') }}
                    </label>
                    <input
                      v-model="formData.authorizedPersonEmail"
                      type="email"
                      class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base"
                      :placeholder="t('kyc.sections.authorizedPerson.emailPlaceholder')"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 3: Banking Information (Hidden - will be re-added later) -->
            <div v-show="false" class="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-text/5">
              <h2 class="text-xl md:text-2xl font-bold text-text mb-6">
                {{ t('kyc.sections.banking.title') }}
              </h2>
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-text mb-2">
                    {{ t('kyc.sections.banking.bankName') }}
                  </label>
                  <input
                    v-model="formData.bankName"
                    type="text"
                    class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base"
                    :placeholder="t('kyc.sections.banking.bankNamePlaceholder')"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-text mb-2">
                    {{ t('kyc.sections.banking.accountHolder') }}
                  </label>
                  <input
                    v-model="formData.accountHolderName"
                    type="text"
                    class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base"
                    :placeholder="t('kyc.sections.banking.accountHolderPlaceholder')"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-text mb-2">
                    {{ t('kyc.sections.banking.iban') }}
                  </label>
                  <input
                    v-model="formData.iban"
                    type="text"
                    class="w-full px-4 py-3 rounded-lg border border-text/10 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base"
                    :placeholder="t('kyc.sections.banking.ibanPlaceholder')"
                  />
                </div>
              </div>
            </div>

            <!-- Section 4: Terms & Conditions -->
            <div class="pt-8 border-t border-text/10">
              <h2 class="text-xl md:text-2xl font-bold text-text mb-6">
                {{ t('kyc.sections.terms.title') }}
              </h2>
              <div class="flex items-start gap-3">
                <input
                  v-model="formData.termsAccepted"
                  type="checkbox"
                  required
                  id="terms-checkbox"
                  class="mt-1 w-5 h-5 rounded border-text/20 text-secondary focus:ring-secondary/20 cursor-pointer"
                />
                <label for="terms-checkbox" class="text-sm md:text-base text-text cursor-pointer flex-1">
                  {{ t('kyc.sections.terms.confirmationPrefix') }}
                  <RouterLink
                    :to="{ name: 'terms' }"
                    target="_blank"
                    class="text-primary hover:text-primary/80 underline font-medium"
                  >
                    {{ t('kyc.sections.terms.termsLink') }}
                  </RouterLink>
                  {{ locale === 'ar' ? ' ' : ' ' }}
                  {{ t('kyc.sections.terms.confirmationMiddle') }}
                  <RouterLink
                    :to="{ name: 'privacy' }"
                    target="_blank"
                    class="text-primary hover:text-primary/80 underline font-medium"
                  >
                    {{ t('kyc.sections.terms.privacyLink') }}
                  </RouterLink>
                  {{ t('kyc.sections.terms.confirmationSuffix') }}
                </label>
              </div>
            </div>

            <!-- Turnstile -->
            <div id="turnstile-widget" class="min-h-[65px]"></div>
            <div v-if="turnstileError && !siteKey" class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p class="text-sm text-yellow-800">
                {{ locale === 'ar' 
                  ? 'خطأ في إعدادات الأمان. يرجى الاتصال بالدعم.' 
                  : 'Security configuration error. Please contact support.' }}
              </p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isSubmitting || !formData.termsAccepted"
              class="w-full px-6 py-3 md:py-4 bg-secondary text-white rounded-lg font-medium hover:shadow-lg hover:-translate-y-0.5 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0 text-sm md:text-base"
            >
              <span v-if="!isSubmitting">
                {{ t('kyc.form.submit') }}
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
                {{ t('kyc.form.submitting') }}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

