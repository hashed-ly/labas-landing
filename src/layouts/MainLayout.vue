<script setup>
import Header from '../components/layout/Header.vue';
import Footer from '../components/layout/Footer.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden">
    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="flex-grow">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>
