<script setup>
import { onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl', 'full'].includes(value),
  },
  closeable: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['close', 'update:show']);

const close = () => {
  if (props.closeable) {
    emit('close');
    emit('update:show', false);
  }
};

const handleEscape = (e) => {
  if (e.key === 'Escape' && props.show && props.closeable) {
    close();
  }
};

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
);

onMounted(() => {
  document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
  document.body.style.overflow = '';
});

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4',
};
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm"
        style="z-index: var(--z-modal-backdrop)"
        @click="close"
      >
        <div class="flex items-center justify-center min-h-screen p-4">
          <Transition
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-300"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="show"
              :class="['bg-white rounded-2xl shadow-2xl w-full', sizeClasses[size]]"
              style="z-index: var(--z-modal)"
              @click.stop
            >
              <!-- Header -->
              <div
                v-if="$slots.header || closeable"
                class="flex items-center justify-between p-6 border-b border-text/10"
              >
                <div class="flex-1">
                  <slot name="header" />
                </div>
                <button
                  v-if="closeable"
                  @click="close"
                  class="p-2 text-text/70 hover:text-text hover:bg-bg rounded-lg transition-colors"
                  aria-label="Close modal"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <!-- Body -->
              <div class="p-6">
                <slot />
              </div>

              <!-- Footer -->
              <div
                v-if="$slots.footer"
                class="p-6 border-t border-text/10 bg-bg/50 rounded-b-2xl"
              >
                <slot name="footer" />
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

