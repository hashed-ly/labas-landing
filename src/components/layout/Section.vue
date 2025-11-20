<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) =>
      ['default', 'primary', 'secondary', 'accent', 'gradient'].includes(value),
  },
  padding: {
    type: String,
    default: 'default',
    validator: (value) => ['none', 'sm', 'default', 'lg', 'xl'].includes(value),
  },
});

const variantClasses = {
  default: 'bg-white',
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-white',
  accent: 'bg-accent',
  gradient: 'bg-gradient-to-br from-bg via-white to-bg',
};

const paddingClasses = {
  none: '',
  sm: 'py-16',
  default: 'py-24 md:py-32',
  lg: 'py-32 md:py-40',
  xl: 'py-40 md:py-48',
};
</script>

<template>
  <section :class="[variantClasses[variant], paddingClasses[padding]]">
    <slot />
  </section>
</template>

