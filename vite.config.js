import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { devtools } from 'vite-plugin-vue-devtools';

export default defineConfig({
  plugins: [vue(), devtools(), tailwindcss()],
});
