<script setup>
import { computed } from 'vue';
import { useI18n } from '../../composables/useI18n';

const props = defineProps({
  href: {
    type: String,
    default: '#contact',
  },
  text: {
    type: String,
    default: null,
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) =>
      ['primary', 'secondary', 'accent', 'outline'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
});

const { locale, t } = useI18n();

const buttonClasses = computed(() => {
  const classes = [
    'inline-flex items-center gap-2',
    'font-medium rounded-lg transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
  ];

  // Variant styles
  const variantClasses = {
    primary: 'bg-primary !text-white hover:bg-primary/90 focus:ring-primary/20',
    secondary:
      'bg-secondary !text-white hover:bg-secondary/90 focus:ring-secondary/20',
    accent: 'bg-accent !text-primary hover:bg-accent/90 focus:ring-accent/20',
    outline:
      'bg-transparent border-2 border-primary text-primary hover:bg-primary/5 focus:ring-primary/20',
  };

  // Size styles
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  classes.push(variantClasses[props.variant]);
  classes.push(sizeClasses[props.size]);

  if (props.fullWidth) {
    classes.push('w-full justify-center');
  }

  return classes.join(' ');
});

const arrowClasses = computed(() => {
  const baseClasses = 'w-5 h-5';
  const rotationClass = locale.value === 'ar' ? 'rotate-90' : '-rotate-90';
  return `${baseClasses} ${rotationClass}`;
});

const buttonText = computed(() => {
  if (props.text) {
    return props.text;
  }
  // If slot has content, it will override this
  return t('faq.contactUs');
});
</script>

<template>
  <a :href="href" :class="buttonClasses">
    <slot>{{ buttonText }}</slot>
    <svg
      :class="arrowClasses"
      viewBox="0 0 1562 1177"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.9"
        d="M975.964 201.508L584.2 587.435C475.289 694.724 473.974 869.988 581.262 978.9C688.551 1087.81 863.816 1089.13 972.727 981.838L1364.49 595.911C1473.4 488.622 1474.72 313.357 1367.43 204.446C1260.14 95.5347 1084.87 94.2194 975.964 201.508Z"
        fill="currentColor"
      />
      <path
        opacity="0.9"
        d="M194.264 585.728L580.19 977.491C687.479 1086.4 862.744 1087.72 971.655 980.429C1080.57 873.14 1081.88 697.875 974.593 588.964L588.666 197.201C481.378 88.2896 306.113 86.9741 197.202 194.263C88.2902 301.552 86.9748 476.816 194.264 585.728Z"
        fill="currentColor"
      />
    </svg>
  </a>
</template>

