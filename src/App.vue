<script setup>
import { ref, onMounted } from 'vue';
import SplashScreen from './components/SplashScreen.vue';

const showSplash = ref(true);
const showContent = ref(false);

// Check if splash was already shown in this session
onMounted(() => {
  const splashShown = sessionStorage.getItem('labas_splash_shown');
  if (splashShown === 'true') {
    showSplash.value = false;
    showContent.value = true;
  } else {
    // Show content after a short delay to prevent flash
    setTimeout(() => {
      showContent.value = true;
    }, 100);
  }
});

const handleSplashComplete = () => {
  showSplash.value = false;
  sessionStorage.setItem('labas_splash_shown', 'true');
};
</script>

<template>
  <div>
    <!-- Splash Screen -->
    <SplashScreen
      v-if="showSplash"
      :duration="2500"
      @complete="handleSplashComplete"
    />

    <!-- Main Content -->
    <router-view v-if="showContent" v-slot="{ Component }">
      <transition
        enter-active-class="transition-opacity duration-500"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
