<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
});

const emit = defineEmits(['update:modelValue']);

const inputClasses = computed(() => {
  const classes = [
    'w-full rounded-lg border bg-white',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ];

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };

  classes.push(sizeClasses[props.size]);

  // Error state
  if (props.error) {
    classes.push('border-danger focus:border-danger focus:ring-danger/20');
  } else {
    classes.push(
      'border-text/10 focus:border-primary focus:ring-primary/20'
    );
  }

  return classes.join(' ');
});

const handleInput = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<template>
  <div class="w-full">
    <!-- Label -->
    <label v-if="label" class="block text-sm font-medium text-text mb-2">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>

    <!-- Input -->
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :class="inputClasses"
      @input="handleInput"
    />

    <!-- Error Message -->
    <p v-if="error" class="mt-1.5 text-sm text-danger">
      {{ error }}
    </p>
  </div>
</template>

