<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) =>
      ['default', 'primary', 'secondary', 'accent', 'success', 'warning', 'danger'].includes(
        value
      ),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  rounded: {
    type: Boolean,
    default: false,
  },
});

const badgeClasses = computed(() => {
  const classes = ['inline-flex items-center justify-center font-medium'];

  // Variant styles
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-danger/10 text-danger',
  };

  // Size styles
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  classes.push(variantClasses[props.variant]);
  classes.push(sizeClasses[props.size]);
  classes.push(props.rounded ? 'rounded-full' : 'rounded-md');

  return classes.join(' ');
});
</script>

<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

