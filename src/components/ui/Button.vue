<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) =>
      ['primary', 'secondary', 'accent', 'danger', 'ghost', 'outline'].includes(
        value
      ),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  as: {
    type: String,
    default: 'button',
  },
});

const buttonClasses = computed(() => {
  const classes = [
    'inline-flex items-center justify-center',
    'font-medium rounded-lg transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ];

  // Variant styles
  const variantClasses = {
    primary:
      'bg-primary text-white hover:bg-primary/90 focus:ring-primary/20 shadow-sm hover:shadow-md',
    secondary:
      'bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary/20 shadow-sm hover:shadow-md',
    accent:
      'bg-accent text-primary hover:bg-accent/90 focus:ring-accent/20 shadow-sm hover:shadow-md',
    danger:
      'bg-danger text-white hover:bg-danger/90 focus:ring-danger/20 shadow-sm hover:shadow-md',
    ghost: 'bg-transparent text-text hover:bg-bg focus:ring-text/10',
    outline:
      'bg-transparent border-2 border-primary text-primary hover:bg-primary/5 focus:ring-primary/20',
  };

  // Size styles
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  classes.push(variantClasses[props.variant]);
  classes.push(sizeClasses[props.size]);

  if (props.fullWidth) {
    classes.push('w-full');
  }

  return classes.join(' ');
});
</script>

<template>
  <component
    :is="as"
    :class="buttonClasses"
    :disabled="disabled || loading"
  >
    <!-- Loading Spinner -->
    <svg
      v-if="loading"
      class="animate-spin -ms-1 me-2 h-4 w-4"
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

    <!-- Slot for button content -->
    <slot />
  </component>
</template>

