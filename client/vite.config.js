import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/global.scss";`,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },
  },
});
