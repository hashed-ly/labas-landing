<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  trigger: {
    type: String,
    default: 'hover', // 'hover' or 'click'
  },
  placement: {
    type: String,
    default: 'bottom-start', // 'bottom-start', 'bottom-end', 'top-start', 'top-end'
    validator: (value) =>
      ['bottom-start', 'bottom-end', 'top-start', 'top-end'].includes(value),
  },
  align: {
    type: String,
    default: 'start', // 'start' or 'end' for RTL support
  },
});

const emit = defineEmits(['item-click']);

const isOpen = ref(false);
const dropdownRef = ref(null);
const triggerRef = ref(null);

const handleItemClick = (item) => {
  emit('item-click', item);
  isOpen.value = false;
};

const handleClickOutside = (event) => {
  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target) &&
    triggerRef.value &&
    !triggerRef.value.contains(event.target)
  ) {
    isOpen.value = false;
  }
};

let closeTimeout = null;

const openDropdown = () => {
  if (closeTimeout) {
    clearTimeout(closeTimeout);
    closeTimeout = null;
  }
  isOpen.value = true;
};

const closeDropdown = () => {
  closeTimeout = window.setTimeout(() => {
    isOpen.value = false;
    closeTimeout = null;
  }, 120);
};

const handleMouseEnter = () => {
  if (props.trigger === 'hover') {
    openDropdown();
  }
};

const handleMouseLeave = () => {
  if (props.trigger === 'hover') {
    closeDropdown();
  }
};

const handleFocusIn = () => {
  if (props.trigger === 'hover') {
    openDropdown();
  }
};

const handleFocusOut = (event) => {
  if (
    props.trigger === 'hover' &&
    !event.currentTarget.contains(event.relatedTarget)
  ) {
    closeDropdown();
  }
};

const toggleDropdown = () => {
  if (props.trigger === 'click') {
    isOpen.value = !isOpen.value;
  }
};

onMounted(() => {
  if (props.trigger === 'click') {
    document.addEventListener('click', handleClickOutside);
  }
});

onUnmounted(() => {
  if (props.trigger === 'click') {
    document.removeEventListener('click', handleClickOutside);
  }
});

const placementClasses = {
  'bottom-start': 'top-full mt-2',
  'bottom-end': 'top-full mt-2',
  'top-start': 'bottom-full mb-2',
  'top-end': 'bottom-full mb-2',
};

const alignClasses = {
  start: 'start-0',
  end: 'end-0',
};
</script>

<template>
  <div
    class="relative"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
  >
    <!-- Trigger Slot -->
    <div ref="triggerRef" @click="toggleDropdown">
      <slot name="trigger" :is-open="isOpen" />
    </div>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-[-10px]"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-[-10px]"
    >
      <div
        v-if="isOpen"
        ref="dropdownRef"
        :class="[
          'absolute z-50 w-56 rounded-xl bg-white border border-text/10 shadow-lg py-2',
          placementClasses[placement],
          alignClasses[align],
        ]"
        role="menu"
        aria-orientation="vertical"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <slot name="content" :handle-item-click="handleItemClick" />
      </div>
    </Transition>
  </div>
</template>

