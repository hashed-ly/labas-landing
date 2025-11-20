<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'bordered', 'elevated', 'flat'].includes(value),
  },
  padding: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg', 'xl'].includes(value),
  },
  hoverable: {
    type: Boolean,
    default: false,
  },
});

const cardClasses = computed(() => {
  const classes = ['rounded-2xl transition-all duration-300'];

  // Variant styles
  const variantClasses = {
    default: 'bg-white shadow-soft',
    bordered: 'bg-white border-2 border-text/10',
    elevated: 'bg-white shadow-lg',
    flat: 'bg-bg',
  };

  // Padding styles
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  };

  classes.push(variantClasses[props.variant]);
  classes.push(paddingClasses[props.padding]);

  if (props.hoverable) {
    classes.push('hover:shadow-lg hover:-translate-y-0.5 cursor-pointer');
  }

  return classes.join(' ');
});
</script>

<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

