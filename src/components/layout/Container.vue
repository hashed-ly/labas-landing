<script setup>
defineProps({
  size: {
    type: String,
    default: 'default',
    validator: (value) =>
      ['default', 'sm', 'md', 'lg', 'xl', '2xl', 'full'].includes(value),
  },
  noPadding: {
    type: Boolean,
    default: false,
  },
});

const sizeClasses = {
  default: 'container mx-auto',
  sm: 'max-w-screen-sm mx-auto',
  md: 'max-w-screen-md mx-auto',
  lg: 'max-w-screen-lg mx-auto',
  xl: 'max-w-screen-xl mx-auto',
  '2xl': 'max-w-screen-2xl mx-auto',
  full: 'w-full',
};
</script>

<template>
  <div :class="[sizeClasses[size], noPadding ? '' : 'px-4 sm:px-6']">
    <slot />
  </div>
</template>

