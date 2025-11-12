<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from '../composables/useI18n';

const props = defineProps({
  duration: {
    type: Number,
    default: 2500, // 2.5 seconds
  },
});

const emit = defineEmits(['complete']);

const { t } = useI18n();
const isVisible = ref(true);
const isAnimatingOut = ref(false);

onMounted(() => {
  // Lock scrolling when splash screen is visible
  document.body.style.overflow = 'hidden';
  
  // Start fade out animation before hiding
  setTimeout(() => {
    isAnimatingOut.value = true;
  }, props.duration - 500);

  // Hide splash screen and emit complete event
  setTimeout(() => {
    isVisible.value = false;
    // Unlock scrolling
    document.body.style.overflow = '';
    emit('complete');
  }, props.duration);
});

onUnmounted(() => {
  // Ensure scrolling is unlocked if component is unmounted
  document.body.style.overflow = '';
});
</script>

<template>
  <transition
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-500"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isVisible"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-secondary"
      :class="{ 'animate-fade-out': isAnimatingOut }"
    >
      <!-- Animated Background Gradients -->
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute top-1/4 -start-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"
        ></div>
        <div
          class="absolute bottom-1/4 -end-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow"
          style="animation-delay: 0.5s"
        ></div>
      </div>

      <!-- Logo Container -->
      <div class="relative z-10 flex flex-col items-center gap-8">
        <!-- Logo with scale animation (colored icon + white wordmark) -->
        <div class="animate-scale-in">
          <img
            src="/images/logos/logo-horizontal-cw.svg"
            alt="لا باس - Labas"
            class="h-16 sm:h-20 md:h-24 w-auto"
          />
        </div>

        <!-- Tagline with fade-in -->
        <div class="animate-fade-in-delayed">
          <p class="text-white/90 text-lg sm:text-xl font-medium text-center px-4">
            {{ t('splash.tagline') }}
          </p>
        </div>

        <!-- Loading indicator -->
        <div class="animate-fade-in-more-delayed">
          <div class="flex gap-2">
            <div
              class="w-2 h-2 bg-white/80 rounded-full animate-bounce"
              style="animation-delay: 0s"
            ></div>
            <div
              class="w-2 h-2 bg-white/80 rounded-full animate-bounce"
              style="animation-delay: 0.2s"
            ></div>
            <div
              class="w-2 h-2 bg-white/80 rounded-full animate-bounce"
              style="animation-delay: 0.4s"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@keyframes scale-in {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
  }
}

.animate-scale-in {
  animation: scale-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.animate-fade-in-delayed {
  opacity: 0;
  animation: fadeIn 0.6s ease-out 0.5s forwards;
}

.animate-fade-in-more-delayed {
  opacity: 0;
  animation: fadeIn 0.6s ease-out 0.8s forwards;
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.animate-fade-out {
  animation: fadeOut 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>

